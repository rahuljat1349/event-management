import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { v4 as uuidV4 } from 'uuid'

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_ACCESS_KEY_SECRET!,
  },
})

export async function uploadImageToR2(
  file: File,
): Promise<{ success: boolean; message: string; imageUrl?: string }> {
  if (!file) {
    return {
      success: false,
      message: 'Please select an image to upload',
    }
  }

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    console.log(process.env.CLOUDFLARE_R2_BUCKET_NAME)

    // Create a unique image name using UUID
    const uniqueImageName = `${uuidV4()}_${file.name}`

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: uniqueImageName,
      Body: buffer,
    })

    await r2.send(putObjectCommand)

    const fileUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${uniqueImageName}`
    return {
      success: true,
      message: 'Image uploaded successfully',
      imageUrl: fileUrl,
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error?.message || 'Image upload failed',
      }
    }
    return { success: false, message: 'Image upload failed' }
  }
}

export async function deleteImageFromR2(
  url: string,
): Promise<{ success: boolean; message: string }> {
  if (!url) {
    return { success: false, message: 'URL is required for deletion' }
  }

  try {
    // Extract the filename from the URL
    const urlObject = new URL(url)
    const fileName = urlObject.pathname.substring(1) // Removes the leading '/'

    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
      Key: fileName,
    })
    await r2.send(deleteObjectCommand)

    return { success: true, message: 'Image deleted successfully' }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error?.message || 'Image deletion failed',
      }
    }
    return { success: false, message: 'Image deletion failed' }
  }
}

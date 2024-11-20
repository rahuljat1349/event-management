'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Trash, UploadIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface ProfileImageProps {
  image: string | null
  username: string
}

const ProfileImage = ({ image: initialImage, username }: ProfileImageProps) => {
  const [image, setImage] = useState<string | null>(initialImage)
  const [loading, setLoading] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  const handleUploadClick = () => inputRef.current?.click()

  const handleFileChange = async (file: File) => {
    setLoading(true)
    try {
      const uploadedImage = await uploadImage(file)
      console.log(uploadImage)
      setImage(uploadedImage)
      router.refresh()
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/user/edit-profile-image', {
      method: 'PUT',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Failed to upload image')
    }

    const data = await response.json()
    return data.user?.image
  }

  const handleRemoveImage = async () => {
    setRemoveLoading(true)
    try {
      const response = await fetch('/api/user/delete-profile-image', {
        method: 'PUT',
      })
      const res = await response.json()
      if (response.ok) {
        toast.success(res.message || 'Image removed successfully')
        setImage(null)
        router.refresh()
      } else {
        toast.error(res.message || 'Failed to remove image')
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Failed to remove image')
      }
    } finally {
      setRemoveLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="inline-block rounded-md border-[0.5px] p-6 shadow-lg dark:border-gray-500">
        <div className="flex items-center gap-7">
          <div className="flex items-center gap-3">
            {image ? (
              <img src={image} alt={username} className="size-14 rounded-md" />
            ) : (
              <div className="flex size-20 items-center justify-center rounded-md bg-black text-white dark:bg-gray-900">
                {username.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h3 className="mb-0 font-[600]">Select and Upload an image</h3>
              <p className="text-sm text-[#757575]"> .png, .jpg</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div>
              <input
                ref={inputRef}
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
                onChange={(e) =>
                  e.target.files && handleFileChange(e.target.files[0])
                }
              />
              <Button
                className="bg-black dark:bg-white"
                onClick={handleUploadClick}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="mr-1 size-4 animate-spin" />
                ) : (
                  <UploadIcon className="mr-2 size-4" />
                )}
                {loading ? 'Uploading' : 'Upload Avatar'}
              </Button>
            </div>
            {image && (
              <Button
                variant={'destructive'}
                className="bg-red-500 text-white"
                onClick={handleRemoveImage}
                disabled={removeLoading}
              >
                {removeLoading ? (
                  <>
                    <Loader2 className="mr-1 size-4 animate-spin" /> Removing
                  </>
                ) : (
                  <>
                    <Trash className="mr-1 size-4" /> Remove
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileImage

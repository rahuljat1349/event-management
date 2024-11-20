import { auth } from '@/auth'
import { uploadImageToR2 } from '@/lib/imageToR2'
import prisma from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function PUT(req: Request) {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized',
      },
      {
        status: 401,
      },
    )
  }

  const userId = session.user.id
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json(
      {
        success: false,
        message: 'Image is required',
      },
      {
        status: 401,
      },
    )
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found',
        },
        { status: 404 },
      )
    }

    const uploadRes = await uploadImageToR2(file)
    if (!uploadRes.success) {
      return NextResponse.json(
        {
          success: false,
          message: uploadRes.message,
        },
        {
          status: 500,
        },
      )
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        image: uploadRes.imageUrl,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Profile Image Updated',
        user: updatedUser,
      },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 },
      )
    }
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while updating the user profile image',
      },
      { status: 500 },
    )
  }
}

import { auth } from '@/auth'
import prisma from '@/lib/prismaClient'
import { NextResponse } from 'next/server'

export async function PUT() {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unauthorized',
      },
      { status: 401 },
    )
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { image: null },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Image Removed Successfully',
        user,
      },
      { status: 200 },
    )
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error?.message || 'Failed to remvoe profile image',
        },
        { status: 500 },
      )
    }
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to remvoe profile image',
      },
      { status: 500 },
    )
  }
}

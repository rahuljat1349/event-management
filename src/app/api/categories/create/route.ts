import { auth } from '@/auth'
import prisma from '@/lib/prismaClient'
import { NextResponse } from 'next/server'
export async function POST(req: Request) {
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

  const password = 1243
  try {
    const { categoryName, passPhrase } = await req.json()
    if (!passPhrase || !categoryName) {
      return NextResponse.json(
        {
          success: false,
          message: 'All fields are required',
        },
        {
          status: 400,
        },
      )
    }
    if (passPhrase != password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Wrong password',
        },
        {
          status: 403,
        },
      )
    }

    console.log(categoryName)
    const category = await prisma.category.create({
      data: {
        name: categoryName,
      },
    })

    return NextResponse.json(
      {
        success: true,
        message: 'category created successfuly',
        category,
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error,
        },
        { status: 500 },
      )
    }
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while creating category',
      },
      { status: 500 },
    )
  }
}

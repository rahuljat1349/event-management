import { auth } from '@/auth'
import { uploadImageToR2 } from '@/lib/imageToR2'
import prisma from '@/lib/prismaClient'
import { eventSchema } from '@/schemas/eventSchema'
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
  const userId = session.user.id
  try {
    const formData = await req.formData()
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      location: formData.get('location') as string,
      startDate: formData.get('startDate') as string,
      endDate: formData.get('endDate') as string,
      eventURL: formData.get('eventURL') as string,
      featuredImage: formData.get('featuredImage') as File,
      content: formData.get('content') as string,
      ticketPrice: formData.get('ticketPrice') as string,
      categoryId: formData.get('categoryId') as string,
      seats: formData.get('seats') as string,
      isSeatsLimited: formData.get('isSeatsLimited') as string,
      isPaidEvent: formData.get('isPaidEvent') as string,
      isPrivate: formData.get('isPrivate') as string,
      isVenue: formData.get('isVenue') as string,
    }
    console.log(data)
    if (!(data.title && data.startDate && data.categoryId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Necessary fields are required!',
        },
        { status: 400 },
      )
    }

    const validatedData = await eventSchema.parseAsync(data)
    if (!validatedData) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed!',
        },
        { status: 422 },
      )
    }
    const category = await prisma.category.findUnique({
      where: { id: validatedData.categoryId },
    })
    if (!category || !category.id) {
      return NextResponse.json(
        {
          success: false,
          message: 'Category not found!',
        },
        { status: 404 },
      )
    }

    const file = data.featuredImage
    let uploadRes
    if (file) {
      uploadRes = await uploadImageToR2(file)
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
    }
    const newData = {
      ...validatedData,
      categoryId: category?.id as string,
      featuredImage: uploadRes?.imageUrl || '',
      organizerId: userId as string,
      isSeatsLimited: validatedData.isSeatsLimited === 'true',
      isPaidEvent: validatedData.isPaidEvent === 'true',
      isPrivate: validatedData.isPrivate === 'true',
      isVenue: validatedData.isVenue === 'true',
    }

    const createdEvent = await prisma.event.create({
      data: newData,
    })
    return NextResponse.json(
      {
        success: true,
        message: 'event created successfully',
        event: createdEvent,
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Unexpected error occured',
        error,
      },
      {
        status: 500,
      },
    )
  }
}

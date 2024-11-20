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
  try {
    const userId = session.user.id
    const { eventId } = await req.json()

    if (!eventId) {
      return NextResponse.json(
        {
          success: false,
          message: 'not allowed (eventId is necessary)',
        },
        {
          status: 403,
        },
      )
    }

    const createdTicket = await prisma.ticket.create({
      data: {
        eventId,
        userId,
      },
    })
    return NextResponse.json(
      {
        success: true,
        message: 'Ticket created successfully',
        event: createdTicket,
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

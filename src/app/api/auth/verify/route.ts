import prisma from '@/lib/prismaClient'

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json()

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    })

    if (!existingUser) {
      return Response.json(
        {
          success: false,
          message: 'Username not found!',
        },
        { status: 400 },
      )
    }
    if (existingUser.isVerified) {
      return Response.json(
        {
          success: false,
          message: 'You are already vrified!',
        },
        { status: 400 },
      )
    }
    const isCodeValid = existingUser.verifyCode === code
    const isCodeNotExpired =
      new Date(existingUser.verifyCodeExpiry) > new Date()

    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: 'Incorrect verify code.',
        },
        { status: 400 },
      )
    }
    if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: 'Code is expired. please Send another code to your email.',
        },
        { status: 400 },
      )
    }
    await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        isVerified: true,
      },
    })

    return Response.json(
      {
        success: true,
        message: 'Account verified successfully.',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error veryfying user', error)
    return Response.json(
      {
        success: false,
        Message: 'Error verifying user',
      },
      {
        status: 500,
      },
    )
  }
}

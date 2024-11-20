import { signIn } from '@/auth'
import prisma from '@/lib/prismaClient'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name, email, password, confirmPassword } = await req.json()

    // Validate the required fields
    if (!email || !password || !confirmPassword || !name) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 },
      )
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 },
      )
    }
    if (password != confirmPassword) {
      return NextResponse.json(
        { message: 'Password does not match.' },
        { status: 401 },
      )
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'USER',
      },
    })

    await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    // Respond with success and exclude password
    return NextResponse.json(
      {
        message: 'Signed Up successfully',
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
        success: true,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}

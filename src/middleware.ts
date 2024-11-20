import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const url = request.nextUrl

  if (
    (token && url.pathname.startsWith('/signin')) ||
    (token && url.pathname.startsWith('/signup')) ||
    (token && url.pathname.startsWith('/verify')) ||
    (token && url.pathname.startsWith('/'))
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/signin', '/signup', '/verify/:path*'],
}

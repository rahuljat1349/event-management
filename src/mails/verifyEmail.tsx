import Head from 'next/head'
import React from 'react'

function VerificationEmail({ name, otp }: { name: string; otp: string }) {
  return (
    <html>
      <Head>
        <body>
          Hello dear {name}, your otp to verify your email is {otp}
        </body>
      </Head>
    </html>
  )
}

export default VerificationEmail

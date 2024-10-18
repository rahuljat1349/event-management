import { resend } from '@/lib/resend'
import VerificationEmail from '../mails/verifyEmail'

export async function sendVerificationEmail(
  email: string,
  name: string,
  otp: string,
) {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'EVENTS | Verification code',
      react: VerificationEmail({ name, otp }),
    })

    return {
      success: true,
      message: 'verification code sent successfully.',
    }
  } catch (emailError) {
    console.error('Error sending verification Email', emailError)
    return { success: false, message: 'failed to send verification email!' }
  }
}

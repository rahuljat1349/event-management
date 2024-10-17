'use server'
import { signIn } from '@/auth'

export const SignIn = async (provider: string) => {
  const result = await signIn(provider)
  return result
}

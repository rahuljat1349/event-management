import { signIn } from '@/auth'

const useSignin = async (email: string, password: string) => {
  const result = await signIn('credentials', {
    redirect: false,
    email: email,
    password: password,
  })

  if (result?.error) {
    return { success: false }
  }

  return { success: true }
}

export default useSignin

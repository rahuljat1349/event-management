import {
  GoogleSigninButton,
  GithubSigninButton,
} from '@/app/components/auth/SigninButtons'
import { signIn } from '@/auth'
import SignupForm from './SignupForm'
const Page = async () => {
  return (
    <div className="flex min-h-screen items-center justify-center py-28">
      <div className="mx-auto w-full max-w-[430px] rounded-xl bg-[#ffffffef] p-10 text-black shadow-2xl">
        <div>
          <SignupForm />
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <form
            action={async () => {
              'use server'
              await signIn('google')
            }}
          >
            <GoogleSigninButton />
          </form>
          <div className="min-h-[16px]"></div>
          <form
            action={async () => {
              'use server'
              await signIn('github')
            }}
          >
            <GithubSigninButton />
          </form>
        </div>
        <p className="mt-4 text-center text-sm text-[#607D8B]">
          {' '}
          Already have an account?{' '}
          <a className="font-semibold text-black" href="/signin">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Page

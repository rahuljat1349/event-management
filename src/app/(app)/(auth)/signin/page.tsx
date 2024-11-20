import {
  GoogleSigninButton,
  GithubSigninButton,
} from '@/app/components/auth/SigninButtons'
import { signIn } from '@/auth'
import SignInForm from './SigninForm'
import Link from 'next/link'

const Page = async () => {
  return (
    <div className="flex min-h-screen py-28 items-center justify-center px-4">
      <div className="mx-auto max-w-[536px] rounded-xl bg-white p-10 text-black shadow-2xl">
        <div>
          <div>
            <SignInForm />
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
              className="mt-3"
              action={async () => {
                'use server'
                await signIn('github')
              }}
            >
              <GithubSigninButton />
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#607D8B]">
                Not registered?
                <Link
                  className="ml-1 font-bold text-[#212121]"
                  href={'/signup'}
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page

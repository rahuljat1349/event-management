'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  GoogleSigninButton,
  GithubSigninButton,
} from '@/app/components/auth/SigninButtons'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { signIn as reactSignIn } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { SignInSchema } from '@/app/schemas/signin'
import { SignIn } from '@/lib/signin'

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    setIsSubmitting(true)
    console.log(data)
    try {
      const result = await reactSignIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })
      console.log(result)

      if (result?.error) {
        // toast error
      }
      //toast success
    } catch (error) {
      console.log(error)
      // toast error (unexpected)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-xl bg-white p-10 text-black md:w-1/2 xl:w-1/4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <span className="text-4xl font-bold">Sign In</span>
            <p className="text-[#607D8B]">
              Enter your email and password to sign in.
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Your email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-gray-700"
                      placeholder="name@gmail.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-gray-700"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-end text-xs font-semibold">
              <a href="">Forgot Password?</a>
            </p>
            <Button
              className="w-full bg-black p-2 text-xs font-bold text-white hover:bg-[#3d3d3d]"
              type="submit"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'SIGN IN'
              )}
            </Button>

            <p className="text-center text-xs text-[#607D8B]">Or</p>
          </form>
          <div className="my-4">
            <div
              onClick={() => {
                SignIn('google')
              }}
            >
              <GoogleSigninButton />
            </div>

            <Separator className="my-1 bg-gray-300" />

            <div
              onClick={() => {
                SignIn('github')
              }}
            >
              <GithubSigninButton />
            </div>
          </div>

          <p className="text-center text-sm text-[#607D8B]">
            {' '}
            Not registered?{' '}
            <a className="font-semibold text-black" href="/signup">
              Create Account
            </a>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Page

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
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { SignUpSchema } from '@/app/schemas/auth'
import { SignIn } from '@/lib/signin'
import axios from 'axios'
import { ApiResponse } from '@/types/axiosResponse'

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: z.infer<typeof SignUpSchema>) {
    setIsSubmitting(true)
    console.log(data)
    try {
      const result = await axios.post<ApiResponse>('/api/auth/signup', {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
      console.log(result)

      if (!result) {
        // toast error
      }
      //toast success
      if (result.data.success == true) {
        alert('Signed Up successfully.')
      }
    } catch (error) {
      console.log(error)
      // toast error (unexpected)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="rounded-xl bg-white p-10 text-black md:w-[30%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <span className="text-4xl font-bold">Create Your Account</span>
            <p className="text-[#607D8B]">
              Enter your email and password to create an account for free.
            </p>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Your name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-gray-700"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
                  <FormLabel className="font-semibold">
                    Create a password
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Confirn Password
                  </FormLabel>
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

            <Button
              className="w-full bg-black p-2 text-xs font-bold text-white hover:bg-[#3d3d3d]"
              type="submit"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'CREATE ACCOUNT'
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
            Already have an account?{' '}
            <a className="font-semibold text-black" href="/signin">
              Login Here
            </a>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default Page

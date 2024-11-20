'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signIn, getSession } from 'next-auth/react'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { SignInSchema } from '@/schemas/auth'

const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof SignInSchema>) {
    setIsSubmitting(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (result?.error) {
        // TODO: Implement error handling
        toast.error(result?.error)
        console.error(result.error)
      } else {
        // TODO: Implement success handling
        console.log('Sign in successful')
        toast.success('Sign in successful')
        const session = await getSession()
        if (session) {
          window.location.reload()
          router.push('/')
        }
      }
    } catch (error) {
      console.error(error)
      // @ts-expect-error: Error have any type
      toast.error(error?.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="">
      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="mb-[7px] text-4xl font-bold">Sign In 👋</h2>
            <p className="text-[#607D8B]">
              Enter your email and password to sign in.
            </p>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-gray-900"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
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
                      type="password"
                      className="border-gray-300 focus:border-gray-700"
                      placeholder="********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <p className="mb-6 text-end text-sm font-semibold">
              <Link href="/forgot-password">Forgot Password?</Link>
            </p>
            <Button
              className={`w-full border-black bg-black px-4 py-[20px] font-bold text-white hover:bg-black/80 ${isSubmitting && 'cursor-not-allowed'}`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                'SIGN IN'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default SignInForm

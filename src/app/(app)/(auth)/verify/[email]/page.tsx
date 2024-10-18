'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { verifyCodeSchema } from '@/app/schemas/auth'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const params = useParams()
  const email = params.email[0] || ''

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      email: email,
      code: '',
    },
  })

  async function onSubmit(data: z.infer<typeof verifyCodeSchema>) {
    setIsSubmitting(true)
    console.log(data)
    try {
      const result = await axios.post('/api/auth/verify', {
        email: data.email,
        code: data.code,
      })
      console.log(result)

      if (!result) {
        // toast error
      }
      //toast success
      if (result.data.success == true) {
        alert('Verified successfully.')
        router.replace('/')
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
            <span className="text-4xl font-bold">VeriFy Your Email</span>
            <p className="text-[#607D8B]">
              Enter your email and code sent to your email below.
            </p>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Enter Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-gray-700"
                      placeholder="name@example.com"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Enter Code</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-gray-700"
                      placeholder="******"
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
                'VERIFY'
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Page

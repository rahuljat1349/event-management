'use client'

import React, { useState } from 'react'
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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

const categorySchema = z.object({
  categoryName: z.string(),
  passPhrase: z.string(),
})
export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      categoryName: '',
      passPhrase: '',
    },
  })

  async function onSubmit(data: z.infer<typeof categorySchema>) {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/categories/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName: data.categoryName,
          passPhrase: data.passPhrase,
        }),
      })
      const res = await response.json()
      if (res.success) {
        toast.success(res.message)
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
    <div className="flex h-2/3 w-full items-center justify-center">
      <div className="w-1/3 rounded-md border-[1px] border-solid border-gray-800 p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <h2 className="mb-[7px] text-4xl font-bold">Create category 👋</h2>
            <p className="text-[#607D8B]">
              Enter a category name and password(1243) to create.
            </p>
            <FormField
              control={form.control}
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="border-gray-300 focus:border-gray-900"
                      placeholder="event Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passPhrase"
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

            <div className="flex w-full justify-end">
              <Button
                className={` ${isSubmitting && 'cursor-not-allowed'}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  'Create'
                )}
              </Button>{' '}
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

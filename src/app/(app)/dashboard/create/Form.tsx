'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
// import { useRouter } from 'next/navigation'
import { AiOutlineUpload } from 'react-icons/ai'

import { toast } from 'sonner'
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
import { eventSchema } from '@/schemas/eventSchema'
import dynamic from 'next/dynamic'

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'
// import BasicDateTimePicker from '@/app/components/DateTimePicker'
import Image from 'next/image'
import { DatePickerWithRange } from '@/app/components/DatePickerRange'
import { DateRange } from 'react-day-picker'
// import { DatePickerWithRange } from '@/app/components/DatePickerRange'

export const CreateEventForm = ({
  categories,
}: {
  categories: { name: string; id: string }[]
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isPlaceHolderImage, isSetPlaceHolderImage] = useState(true)
  const [placeHolderImage, setPlaceHolderImage] = useState<string>(
    'https://images.pexels.com/photos/2526105/pexels-photo-2526105.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  )
  // const router = useRouter()
  const [previewImageLink, setPreviewImageLink] =
    useState<string>(placeHolderImage)
  const [image, setImage] = useState<File | null>(null)
  const form = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      eventURL: '',
      featuredImage: image,
      content: '',
      ticketPrice: '',
      categoryId: '',
      seats: '',
      isSeatsLimited: 'true',
      isPaidEvent: 'true',
      isPrivate: 'false',
      isVenue: 'true',
    },
  })

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      try {
        setImage(file)
        form.setValue('featuredImage', file)
        // console.log(form.getValues('image'))
        const imageUrl = URL.createObjectURL(file) // Create URL for image preview
        setPreviewImageLink(imageUrl!)
      } catch (error) {
        console.log(error)
      } finally {
        isSetPlaceHolderImage(false)
        setPlaceHolderImage('')
      }
    }
  }

  const handleDateChange = (dateRange: DateRange | undefined) => {
    form.setValue('startDate', dateRange?.from?.toISOString() || '')
    form.setValue('endDate', dateRange?.to?.toISOString() || '')
  }

  const formSubmitHandler = async (data: z.infer<typeof eventSchema>) => {
    setIsSubmitting(true)
    console.log('data')
    console.log(data)

    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('location', data.location || '')
    formData.append('startDate', data.startDate)
    formData.append('endDate', data.endDate)
    formData.append('eventURL', data.eventURL)
    formData.append('content', data.content)
    formData.append('ticketPrice', data.ticketPrice)
    formData.append('seats', data.seats)
    formData.append('isSeatsLimited', data.isSeatsLimited)
    formData.append('isPaidEvent', data.isPaidEvent)
    formData.append('isPrivate', data.isPrivate)
    formData.append('isVenue', data.isVenue)
    formData.append('categoryId', data.categoryId)
    if (form.getValues('featuredImage')) {
      formData.append('featuredImage', data.featuredImage!)
    }
    try {
      const response = await fetch('/api/event/create', {
        method: 'POST',

        body: formData,
      })

      const res = await response.json()

      if (!response.ok) {
        toast.warning(res.message ? res.message : 'Faild to Create')
        return
      }
      toast.success(res.message ? res.message : 'Created Successfully')
      // window.location.reload()
      // router.push('/')
      console.log(response)
    } catch (error) {
      console.error(error)
      // @ts-expect-error: Error any type
      toast.error(error?.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  const seatsLimited = form.watch('isSeatsLimited')
  const paidEvent = form.watch('isPaidEvent')
  const isVenue = form.watch('isVenue')
  const isPrivate = form.watch('isPrivate')
  console.log(form.formState.errors)
  return (
    <div className="w-full bg-gray-100 dark:bg-black">
      <div className="flex min-h-screen w-full flex-col items-center justify-center p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(formSubmitHandler)}
            className="mb-12 flex w-full max-w-4xl flex-col rounded-lg border-[1px] px-6 py-8 shadow-lg dark:border-gray-500"
          >
            <div>
              <h2 className="mb-[0px] text-center text-3xl font-bold">
                {' '}
                Create an Event
              </h2>
            </div>
            <div className="flex flex-col gap-6 rounded-2xl px-6 py-6">
              {isPlaceHolderImage && (
                <h2 className="my-4 text-2xl font-semibold dark:text-gray-300">
                  Let we start with an Image.
                </h2>
              )}
              <FormField
                control={form.control}
                name="featuredImage"
                render={() => (
                  <FormItem>
                    <FormControl>
                      <div className="mb-4 flex max-h-[50vh] flex-col gap-3">
                        <div className="overflow-hidden rounded-md">
                          <Image
                            className="min-h-[450px] w-full object-contain"
                            height={0}
                            width={0}
                            src={previewImageLink}
                            alt="Event Featured Image"
                          />
                        </div>

                        <Input
                          type="file"
                          id="imageInput"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <label
                          className="flex w-full cursor-pointer items-center justify-center rounded-md border-[1px] border-slate-400 bg-gray-200 bg-transparent p-3 font-semibold dark:text-gray-100"
                          htmlFor="imageInput"
                        >
                          <AiOutlineUpload className="mr-2" />{' '}
                          {isPlaceHolderImage ? 'Upload' : 'Change'} Image
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-6 rounded-2xl px-6 py-6">
              <h2 className="my-4 text-2xl font-semibold dark:text-gray-300">
                Event Overview
              </h2>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-gray-400">
                      Event Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="mt-[6px] h-full py-3"
                        placeholder="Title or Name of Your Event"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-gray-400">
                      Summary
                    </FormLabel>
                    <FormControl>
                      <textarea
                        rows={5}
                        className="flex w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Brief Description of Your Event"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-6 rounded-2xl px-6 py-6">
              <h2 className="my-4 text-2xl font-semibold dark:text-gray-300">
                Time and Place
              </h2>
              <div className="flex w-full items-center justify-center gap-2">
                <div className="flex w-full flex-col gap-2">
                  <label
                    htmlFor=""
                    className="font-semibold dark:text-gray-400"
                  >
                    Event Date/s
                  </label>
                  <DatePickerWithRange onDateChange={handleDateChange} />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="isVenue"
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-semibold dark:text-gray-400">
                          Is the event in-person or online?
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue('isVenue', value)
                            }}
                          >
                            <SelectTrigger className="h-full w-full py-3 font-semibold dark:text-gray-400">
                              <SelectValue placeholder="select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">In Person</SelectItem>
                              <SelectItem value="false">Online</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="w-full">
                  {isVenue === 'true' && (
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold dark:text-gray-400">
                            Location
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="mt-[6px] h-full py-3"
                              type="text"
                              placeholder="Enter or Search for the address "
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {isVenue === 'false' && (
                    <FormField
                      control={form.control}
                      name="eventURL"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold dark:text-gray-400">
                            URl to Online Event
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="mt-[6px] h-full py-3"
                              type="text"
                              placeholder="Please provide a URL to online event"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 rounded-2xl px-6 py-6">
              <h2 className="my-4 text-2xl font-semibold dark:text-gray-300">
                Tickets and Pricing
              </h2>
              <div className="flex gap-6">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="isPaidEvent"
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-semibold dark:text-gray-400">
                          Is the event free of charge?
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue('isPaidEvent', value)
                            }}
                          >
                            <SelectTrigger className="h-full w-full py-3 font-semibold dark:text-gray-400">
                              <SelectValue placeholder="select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">No</SelectItem>
                              <SelectItem value="false">Yes</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  {paidEvent === 'true' && (
                    <FormField
                      control={form.control}
                      name="ticketPrice"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold dark:text-gray-400">
                            What is the ticket price for the event?
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="mt-[6px] h-full py-3"
                              type="number"
                              placeholder="$5"
                              onChange={(e) => {
                                form.setValue(
                                  'ticketPrice',
                                  e.target.value.toString() || '',
                                )
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-full">
                  {' '}
                  <FormField
                    control={form.control}
                    name="isSeatsLimited"
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-semibold dark:text-gray-400">
                          Is the event seating capacity limited?
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue('isSeatsLimited', value)
                            }}
                          >
                            <SelectTrigger className="h-full w-full py-3 font-semibold dark:text-gray-400">
                              <SelectValue placeholder="select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Yes</SelectItem>
                              <SelectItem value="false">No</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  {seatsLimited === 'true' && (
                    <FormField
                      control={form.control}
                      name="seats"
                      render={() => (
                        <FormItem>
                          <FormLabel className="font-semibold dark:text-gray-400">
                            What is the seating capacity for the event?
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="mt-[6px] h-full py-3"
                              type="number"
                              placeholder="500"
                              onChange={(e) => {
                                form.setValue(
                                  'seats',
                                  e.target.value.toString(),
                                )
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6 rounded-2xl px-6 py-6">
              <h2 className="my-4 text-2xl font-semibold dark:text-gray-300">
                Event Type
              </h2>
              <div className="flex gap-6">
                <div className="w-full">
                  {' '}
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-semibold dark:text-gray-400">
                          Event Category
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue('categoryId', value)
                              console.log(value)
                            }}
                          >
                            <SelectTrigger className="h-full w-full py-3 font-semibold dark:text-gray-400">
                              <SelectValue placeholder="select" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories &&
                                categories.map((category, index) => {
                                  return (
                                    <SelectItem
                                      key={index}
                                      value={category?.id}
                                    >
                                      {category?.name}
                                    </SelectItem>
                                  )
                                })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="isPrivate"
                    render={() => (
                      <FormItem>
                        <FormLabel className="font-semibold dark:text-gray-400">
                          Is the event private or open to the public?
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              form.setValue('isPrivate', value)
                            }}
                          >
                            <SelectTrigger className="h-full w-full py-3 font-semibold dark:text-gray-400">
                              <SelectValue placeholder="select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Private</SelectItem>
                              <SelectItem value="false">Public</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {isPrivate === 'true' && (
                <p className="text-sm font-semibold dark:text-gray-400">
                  Private events will remain hidden from everyone unless you
                  invite specific individuals.
                </p>
              )}
            </div>

            <div className="mb-10 flex flex-col gap-4 rounded-2xl px-6 py-6">
              <h2 className="my-4 text-2xl font-semibold dark:text-gray-300">
                {' '}
                More detailed information about the event.
              </h2>
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold dark:text-gray-400">
                      Agenda
                    </FormLabel>
                    <FormControl>
                      <ReactQuill
                        {...field}
                        // value=""
                        //   onChange={(value) => setValue('content', value)}
                        className="h-72 rounded-md"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end rounded-2xl px-6 py-6">
              <Button
                className={` ${isSubmitting && 'cursor-not-allowed'}`}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating ...
                  </>
                ) : (
                  'Create Event'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

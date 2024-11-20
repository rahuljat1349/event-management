import { z } from 'zod'
const MAX_FILE_SIZE = 10 * 1024 * 1024

function checkFileType(file: File) {
  if (file?.name) {
    const fileType = file.name.split('.').pop()
    if (fileType === 'img' || fileType === 'png' || fileType === 'jpg')
      return true
  }
  return false
}

export const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  ticketPrice: z.string().refine((val) => !val || parseInt(val) > 0, {
    message: 'Ticket price must be greater than zero',
  }),
  categoryId: z.string().min(1, 'Category is required'),
  isPrivate: z.string(),
  isSeatsLimited: z.string(),
  eventURL: z.string(),
  isPaidEvent: z.string(),
  isVenue: z.string(),
  featuredImage: z
    .instanceof(File)
    .refine((file: File) => file?.size !== 0, 'File is required')
    .refine((file) => file.size < MAX_FILE_SIZE, 'Max size is 5MB.')
    .refine(
      (file) => checkFileType(file),
      'Only .img, .png, .jpeg formats are supported.',
    )
    .nullable(),
  seats: z
    .string()

    .refine((val) => !val || parseInt(val) > 0, {
      message: 'Seats must be greater than zero',
    }),
  content: z.string(),
})

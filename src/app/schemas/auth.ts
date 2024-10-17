import { z } from 'zod'
export const SignInSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address.' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters.' }),
})
export const SignUpSchema = z.object({
  name: z.string().min(3, { message: 'Name should be at 3 characters long' }),
  email: z.string().email({ message: 'Must be a valid email address.' }),
  password: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters.' }),
  confirmPassword: z
    .string()
    .min(4, { message: 'Password must be at least 4 characters.' }),
})

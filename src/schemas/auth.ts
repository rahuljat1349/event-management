import { z } from 'zod'
export const SignInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})
export const SignUpSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ['confirmPassword'],
  })

export const verifyCodeSchema = z.object({
  email: z.string().email({ message: 'Must be a valid email address.' }),
  code: z
    .string()
    .min(6, { message: 'Code must be 6 characters long.' })
    .max(6, { message: 'Code must be 6 characters long.' }),
})

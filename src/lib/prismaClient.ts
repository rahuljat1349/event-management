import { PrismaClient } from '@prisma/client'

// @ts-expect-error: `prisma` might not be defined globally on first load
const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  // @ts-expect-error: `prisma` might not be defined globally on first load
  global.prisma = prisma
}

export default prisma

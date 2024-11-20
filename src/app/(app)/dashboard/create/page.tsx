import prisma from '@/lib/prismaClient'
import { CreateEventForm } from './Form'

async function getCategories() {
  const categories = await prisma.category.findMany()
  return categories
}

async function page() {
  const categories = await getCategories()
  return (
    <>
      <CreateEventForm categories={categories} />
    </>
  )
}

export default page

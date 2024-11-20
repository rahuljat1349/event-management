import ProfileImage from './components/ProfileImage'
import ProfileInfoSettings from './components/ProfileInfoSettings'
import requireUser from '@/lib/requireUser'
import prisma from '@/lib/prismaClient'
import { redirect } from 'next/navigation'

const getData = async (id: string | undefined) => {
  if (!id) {
    return redirect('/signup')
  }
  const data = await prisma.user.findUnique({
    where: { id: id },
    select: {
      image: true,
    },
  })

  return data
}

const Page = async () => {
  const session = await requireUser()
  const userProfileImageData = await getData(session.user?.id)
  return (
    <>
      <div className="pt-24">
        <div className="container px-4">
          <ProfileImage
            username={session.user?.name || 'User'}
            image={userProfileImageData?.image || ''}
          />
          <ProfileInfoSettings />
        </div>
      </div>
    </>
  )
}

export default Page

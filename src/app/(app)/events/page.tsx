import EventCard from '@/app/components/EventCard'
import Sidebar from '@/app/components/Sidebar'
import { Separator } from '@/components/ui/separator'
import prisma from '@/lib/prismaClient'

async function getEvents() {
  const events = await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      eventURL: true,
      startDate: true,
      endDate: true,
      content: true,
      ticketPrice: true,
      categoryId: true,
      location: true,
      isPrivate: true,
      isVenue: true,
      isPaidEvent: true,
      isSeatsLimited: true,
      seats: true,
      attendees: true,
      featuredImage: true,
      organizer: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  })
  return events
}
async function page() {
  const events = await getEvents()
  // const upcomingEvents = events.filter((events) => {
  //   return events && new Date(events.startDate!) > new Date(Date.now())
  // })
  return (
    <>
      <div className="flex min-h-screen flex-row p-4 px-12">
        {/* <div className="h-36">Events here</div> */}
        <div className="min-h-screen w-4/5 p-6">
          {events &&
            events.map((item) => <EventCard key={item.id} event={item} />)}
        </div>

        <Separator />
        <Sidebar />
      </div>
    </>
  )
}

export default page

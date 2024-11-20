import { Button } from '@/components/ui/button'
import prisma from '@/lib/prismaClient'
import { format } from 'date-fns'
import { auth } from '@/auth'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  TrendingUp,
  Calendar,
  MapPin,
  CalendarClock,
  Users,
  CircleDollarSign,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import BuyTicketCard from './buyTicketModal'

async function getEvent(eventId: string) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
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
            organizedEvents: {
              select: {
                id: true,
                startDate: true,
                endDate: true,
                location: true,
                featuredImage: true,
              },
            },
          },
        },
      },
    })
    return event
  } catch (error) {
    console.error('Failed to fetch event:', error)
    return null
  }
}

export const EventPage = async ({
  params,
}: {
  params: { eventId: string }
}) => {
  const session = await auth()
  const eventId = params.eventId

  const event = await getEvent(eventId)
  const organizedEvents = event?.organizer.organizedEvents.filter((events) => {
    return events && new Date(events.startDate) < new Date(Date.now())
  })
  const upcomingEvents = event?.organizer.organizedEvents.filter((events) => {
    return (
      events &&
      new Date(events.startDate!) > new Date(Date.now()) &&
      event.id != events.id
    )
  })

  if (!event) {
    return <p className="text-center text-red-500">Event not found</p>
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-6 dark:bg-black">
        <div
          className={`relative mb-6 flex max-h-[550px] min-h-[550px] w-full max-w-7xl items-center justify-center overflow-hidden rounded-[30px] py-8 blur-3xl`}
          style={{
            backgroundImage: `url(${event?.featuredImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="z-10 -mt-[550px] w-full max-w-6xl">
          <div
            style={{
              backgroundImage: `url(${event?.featuredImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="max-h-[500px] min-h-[500px] overflow-hidden rounded-lg"
          ></div>
        </div>
        <div className="mt-4 flex w-full max-w-6xl items-center gap-4 py-3 font-semibold text-gray-500">
          <div className="flex items-center">
            <Calendar className="mr-2 size-5" />{' '}
            <p>
              {format(new Date(event.startDate), 'LLL dd')}
              {event.endDate &&
                ' - ' + format(new Date(event.endDate), 'LLL dd y')}
            </p>
          </div>
          <p>{event.location ? '@' + event.location : '(Virtual)'}</p>
        </div>
        <div className="flex w-full max-w-6xl justify-between">
          <div className="">
            <div className="flex w-full max-w-3xl p-2 font-semibold">
              <p className="text-wrap text-5xl"> {event.title}</p>
            </div>
            <header className="my-6 mb-8 flex w-full max-w-3xl cursor-pointer justify-between gap-3 rounded-md bg-[#57561042] p-6">
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image
                    src={(event && event.organizer?.image) || ''}
                    alt={`${event.organizer.name} Image`}
                    layout="fill"
                    objectFit="cover"
                    priority
                  ></Image>
                </div>
                <div className="flex flex-col gap-4 text-sm">
                  <span className="px-2">
                    By{' '}
                    <span className="font-semibold">
                      {event.organizer.name}
                    </span>
                    &#8195; &bull; &#8195;
                    <span className="font-semibold">5.9k</span> followers
                  </span>
                  {organizedEvents && organizedEvents.length > 0 && (
                    <div>
                      <span className="flex items-center justify-center gap-1 rounded-full bg-[#5e5d3371] px-2 py-1 dark:bg-[#d4d22b42] dark:text-gray-300">
                        <span className="font-semibold">
                          {organizedEvents.length}
                        </span>
                        {organizedEvents.length > 1
                          ? 'events hosted'
                          : 'event hosted'}
                        <TrendingUp />
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button className="font-semibold">Follow</Button>
              </div>
            </header>

            {/* Event Details */}
            <section className="w-full max-w-3xl space-y-4 rounded-lg">
              <div className="my-8">
                <p>{event.description}</p>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100">
                    <CalendarClock />
                    <strong>Date and Time:</strong>{' '}
                    {format(new Date(event.startDate), 'LLL dd')}
                    {event.endDate &&
                      ' - ' + format(new Date(event.endDate), 'LLL dd y')}
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100">
                    <MapPin />
                    <strong>Location:</strong>{' '}
                    <p>
                      {event.location ? (
                        '@' + event.location
                      ) : (
                        <>
                          Virtual{' '}
                          <Link href={event.eventURL!}>{event.eventURL}</Link>
                        </>
                      )}
                    </p>
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100">
                    <CircleDollarSign />
                    <strong>Ticket Price:</strong> ${event.ticketPrice}
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-3 text-gray-800 dark:text-gray-100">
                    <Users />
                    <strong>Attendees:</strong>
                    <span className="font-semibold">
                      {event.attendees.length}
                    </span>
                    {event.isSeatsLimited && (
                      <>
                        <span className="text-gray-400">/ {event.seats}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div>
                <p
                  dangerouslySetInnerHTML={{ __html: event.content || ' ' }}
                  className="mt-12 text-gray-700 dark:text-gray-300"
                ></p>
              </div>
            </section>
          </div>
          <div className="max-w-80">
            <Card className="sticky top-48 bg-transparent shadow-lg">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="font-semibold">
                  <BuyTicketCard event={event} user={session?.user} />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        {upcomingEvents && upcomingEvents.length > 0 && (
          <div className="my-6 w-full max-w-6xl">
            <p className="my-6 text-lg font-semibold">
              Upcoming Events from this organizer -
            </p>

            <div>
              <Carousel className="w-full">
                <CarouselContent className="-ml-1">
                  {upcomingEvents.map((event) => (
                    <CarouselItem
                      key={event.id}
                      className="pl-1 md:basis-1/2 lg:basis-1/3"
                    >
                      <Link
                        href={`/events/${event.id}`}
                        className="flex h-full w-full cursor-pointer flex-col items-center justify-between overflow-hidden rounded-md border shadow-md"
                      >
                        <div className="flex items-center justify-center gap-1 py-2 text-sm font-semibold">
                          <Calendar className="mr-2 size-5" />
                          <p>
                            {format(new Date(event.startDate), 'LLL dd')}
                            {event.endDate &&
                              ' - ' + format(new Date(event.endDate), 'LLL dd')}
                          </p>
                          <p>
                            {event.location
                              ? '@' + event.location.split(',')[0]
                              : '(Virtual)'}
                          </p>
                        </div>
                        <div className="relative max-h-48 min-h-48 w-full overflow-hidden">
                          <Image
                            src={event.featuredImage}
                            alt={`${event.id} Image`}
                            layout="fill"
                            objectFit="cover"
                            priority
                          />
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default EventPage

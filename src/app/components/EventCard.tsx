import { Button } from '@/components/ui/button'
import { EventCardProps } from '@/types/event/types'
import Link from 'next/link'
import {
  Bookmark,
  Calendar,
  MapPin,
  Share2,
  Users,
  UsersRound,
} from 'lucide-react'
import Image from 'next/image'
import BuyTicketCard from '../(app)/events/[eventId]/buyTicketModal'
import { auth } from '@/auth'

const EventCard = async ({ event }: { event: EventCardProps }) => {
  const session = await auth()
  return (
    <>
      <div className="mt-9 max-h-[390px] overflow-hidden rounded-[18px] bg-white shadow-2xl backdrop-blur dark:bg-[#3a3a3a14]">
        <div className="group flex">
          <Link
            className="relative w-[45%] overflow-hidden"
            key={event.id}
            href={`/events/${event.id}`}
          >
            <Image
              fill
              className="h-full w-full rounded-bl-[18px] rounded-tl-[18px] object-cover transition-transform duration-200 group-hover:scale-110"
              alt="Event featured iamge"
              src={event.featuredImage}
            />
          </Link>
          <div className="w-[55%] rounded-r-[18px] border border-l-0 px-6 py-5 text-sm transition-transform dark:border-[#FFFFFF30] dark:group-hover:border-[#a7a7a730]">
            <div>
              <div className="flex items-center justify-between gap-5">
                <div className="text-md flex gap-2 font-bold">
                  <Calendar className="mr-1 size-6" />{' '}
                  <>
                    {new Date(event.startDate).toDateString()}{' '}
                    {event.endDate &&
                      ' - ' + new Date(event.endDate).toDateString()}
                  </>
                </div>
                <div className="flex items-center justify-end gap-[18px]">
                  <span
                    className={`flex cursor-pointer items-center justify-center rounded-2xl ${event.isPaidEvent ? 'bg-[#2f9734ce]' : 'bg-[#d8a257]'} px-4 py-1 font-semibold text-white`}
                  >
                    {event.isPaidEvent ? 'For $' + event.ticketPrice : 'Free'}
                  </span>
                  <span className="flex cursor-pointer items-center justify-center rounded-2xl border border-black bg-transparent px-2 py-1 text-black dark:border-[#bfc1c2] dark:text-[#bfc1c2]">
                    <UsersRound className="mr-2 size-4" />

                    {event.isVenue ? 'In-Person' : 'Virtual'}
                  </span>
                  <span>
                    <Bookmark className="size-6 cursor-pointer text-black dark:text-gray-600" />
                  </span>
                  <Share2 className="size-6 cursor-pointer text-black dark:text-gray-600" />
                </div>
              </div>

              <div className="mt-6">
                <Link key={event.id} href={`/events/${event.id}`}>
                  <h2 className="line-clamp-1 text-2xl font-semibold text-black dark:text-white">
                    {event.title}
                  </h2>
                  <p className="mt-2 line-clamp-2">{event.description}</p>
                </Link>
                <div className="mt-5 flex items-center justify-start gap-4">
                  <div>
                    {event.organizer.image ? (
                      <Image
                        height={80}
                        width={80}
                        alt="Organizer"
                        src={event.organizer.image}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <>Organizer</>
                    )}
                  </div>
                  <div>
                    <div className="text-lg font-bold">
                      {event.organizer.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Organizer
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1">
                  <MapPin className="mr-2 size-6" />
                  <span> {event.isVenue ? event.location : 'Online'}</span>
                </div>
                {/* <div className="mt-3 flex items-center gap-1">
                  <MapPinCheck className="mr-2 size-6" />
                  <span> {event.location}</span>
                </div> */}

                <div className="mt-3 flex items-center gap-1">
                  <Users className="mr-2 size-6" />
                  <span className="font-semibold">
                    {event.attendees.length}
                  </span>
                  {event.isSeatsLimited && (
                    <>
                      <span className="text-gray-400">/ {event.seats}</span>
                    </>
                  )}
                </div>
                {event.seats &&
                  new Date(event.startDate!) > new Date(Date.now()) && (
                    <Button
                      disabled={
                        event.attendees.length == parseInt(event?.seats)
                      }
                      className={`mt-7 ${
                        event.attendees.length < parseInt(event?.seats)
                          ? 'border-[#22c55e] text-[#22c55e] dark:hover:bg-[#0f4423be]'
                          : 'relative z-20 cursor-not-allowed border-[#2c2e2d] text-muted-foreground'
                      } rounded-xl border bg-transparent px-5 py-5 font-semibold hover:bg-transparent`}
                    >
                      {event.attendees.length < parseInt(event?.seats)
                        ? 'Reserve Your Spot'
                        : 'Sold Out Event'}
                    </Button>
                  )}

                {event.seats === '' &&
                  new Date(event.startDate!) > new Date(Date.now()) && (
                    <Button className="mt-7 rounded-xl border border-[#22c55e] bg-transparent px-5 py-5 font-semibold text-[#22c55e] hover:bg-transparent dark:hover:bg-[#0f4423be]">
                      <BuyTicketCard event={event} user={session?.user} />
                    </Button>
                  )}

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventCard

'use client'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { UserType } from '@/types/user/type'
import { EventCardProps } from '@/types/event/types'

const BuyTicketCard = ({
  user,
  event,
}: {
  user: UserType
  event: EventCardProps
}) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>Get Tickets</DialogTrigger>
        <DialogContent className="w-full max-w-lg">
          <DialogHeader>
            <DialogTitle>Get ticket for this Event</DialogTitle>
          </DialogHeader>

          <div className="flex max-h-52 min-h-52 w-full overflow-hidden rounded-lg border px-1 font-mono">
            <div className="flex w-[40%] flex-col justify-between px-2">
              <p className="text-wrap px-2 py-4 text-lg font-bold">
                Event Ticket
              </p>
              <div className="px-1 text-sm">
                <div className="text-nowrap p-1">
                  <p className="">
                    Date: {format(new Date(event.startDate), 'LLL dd,yyyy')}
                  </p>
                </div>

                <div className="text-nowrap p-1">
                  <p className="">
                    {event.isVenue
                      ? '@' +
                        event.location?.split(',')[0] +
                        ',' +
                        event.location?.split(',')[1]
                      : `Virtual`}
                  </p>
                </div>
              </div>
              <div className="flex flex-col px-2 py-2 text-sm font-semibold">
                <p>{user?.name}</p>
                <p>{user?.email}</p>
              </div>
            </div>

            <div className="w-[60%] px-2">
              <div className="flex h-full w-full flex-col items-center justify-between gap-2 py-2">
                <div
                  className="h-[70%] w-full rounded-md"
                  style={{
                    backgroundImage: `url(${event?.featuredImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>
                <div className="text-end text-sm">
                  <p>
                    Ticket Price:
                    {event.isPaidEvent ? ` $${event.ticketPrice}` : ' Free'}
                  </p>
                </div>
                <div className="flex text-nowrap text-xs">
                  <p className="font-semibold">UID: </p>
                  <p className="">your unique ticket ID </p>
                </div>
              </div>
            </div>
          </div>

          <Button className="p-2 font-semibold">Get Now</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BuyTicketCard

import React from 'react'
import { InputWithButton } from '@/app/components/inputWithButton'
import { InputLoaction } from '@/app/components/inputForLocation'
import EventsWithTime from '@/app/components/eventsWithTime'
import CalenderPage from '@/app/components/CalenderPage'
import { Separator } from '@/components/ui/separator'
import CreateEventBtn from './CreateEventBtn'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <div className="flex w-1/5 flex-col gap-4 p-6">
      {/* <div className="h-36 ">Sidebar</div> */}
      <Link href={'/dashboard/create'}>
        <CreateEventBtn />
      </Link>
      <Separator orientation="horizontal" />
      <InputWithButton />
      <Separator orientation="horizontal" />

      <div className="py-2">
        <span className="border-b-[2px] border-solid border-gray-500 p-1 font-semibold text-gray-500">
          Filters
        </span>
      </div>
      <CalenderPage />
      <InputLoaction />
      <EventsWithTime />
    </div>
  )
}

export default Sidebar

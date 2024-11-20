import { PlusIcon } from 'lucide-react'
import React from 'react'

const CreateEventBtn = () => {
  return (
    <>
      <div className="flex w-full max-w-sm cursor-pointer items-center justify-center gap-1 space-x-2 rounded-full border-[1px] border-solid px-2 py-3 font-semibold duration-200 hover:border-[#97603352] hover:bg-[#9b653952] dark:border-gray-800">
        <PlusIcon
          size={50}
          className="rounded-full bg-yellow-700 text-3xl text-white"
        />{' '}
        <span className="">Create an Event..</span>
      </div>
    </>
  )
}

export default CreateEventBtn

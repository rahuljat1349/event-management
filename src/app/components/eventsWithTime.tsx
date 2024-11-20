function EventsWithTime() {
  return (
    <>
      <div className="flex w-full max-w-sm items-center justify-around space-x-2 text-sm font-semibold">
        <button className="w-1/3 rounded-md border-[1px] border-dashed border-gray-500 p-1 text-gray-500 duration-150 hover:bg-[#1F2937]">
          past
        </button>

        <button className="w-1/3 rounded-md border-[1px] border-solid border-green-500 p-1 text-green-500 duration-150 hover:bg-[#0f4423be]">
          live
        </button>

        <button className="w-1/3 rounded-md border-[1px] border-solid border-yellow-700 p-1 text-yellow-600 duration-150 hover:bg-[#634a26b9]">
          upcoming
        </button>
      </div>
    </>
  )
}

export default EventsWithTime

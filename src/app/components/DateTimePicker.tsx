import * as React from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import type {} from '@mui/x-date-pickers/themeAugmentation'

export default function BasicDateTimePicker({ label }: { label: string }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <div className="text-white">
          <DateTimePicker
            slotProps={{
              monthButton: {
                sx: {
                  color: '#1565c0',
                  borderRadius: '2px',
                  borderColor: '#2196f3',
                  border: '1px solid',
                  backgroundColor: '#90caf9',
                },
              },
            }}
            disablePast
            className="flex w-full rounded-md border border-input bg-transparent py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
            label={label}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  )
}

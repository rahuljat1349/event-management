import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LocateIcon } from 'lucide-react'

export function InputLoaction() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Enter Location" />
      <Button type="submit">
        <LocateIcon />
      </Button>
    </div>
  )
}

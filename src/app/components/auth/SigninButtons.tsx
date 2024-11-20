'use client'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'
import { Loader2 } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { SiGithub } from 'react-icons/si'

export function GoogleSigninButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button
          variant={'outline'}
          className="w-full py-[20px] text-black dark:text-white"
        >
          <Loader2 className="size-2 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button className="w-full text-center" variant={'default'}>
          <FcGoogle />
          <span className="font-semibold">SIGN IN WITH GOOGLE</span>
        </Button>
      )}
    </>
  )
}

export function GithubSigninButton() {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button
          variant={'outline'}
          className="w-full py-[20px] text-black dark:text-white"
        >
          <Loader2 className="size-2 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button className="w-full text-center" variant={'default'}>
          <SiGithub />
          <span className="font-semibold">SIGN IN WITH GITHUB</span>
        </Button>
      )}
    </>
  )
}

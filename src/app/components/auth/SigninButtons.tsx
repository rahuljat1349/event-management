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
        <Button variant={'outline'}>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={'outline'}>
          <FcGoogle className="mr-2 size-4" />
          Continue With Google
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
        <Button variant={'outline'}>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Please Wait
        </Button>
      ) : (
        <Button variant={'outline'}>
          <SiGithub className="mr-2 size-4" />
          Continue With GitHub
        </Button>
      )}
    </>
  )
}

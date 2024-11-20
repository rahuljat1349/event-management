import Image from 'next/image'
import Logo from '@/app/public/images/logo.svg'
import Link from 'next/link'
import {
  House,
  CalendarCog,
  BadgeInfo,
  Contact,
  User,
  LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ToggleThemeButton } from './ThemeToggleButton'
import { auth, signOut } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { headers } from 'next/headers'
import MobileMenu from './MobileMenu'
// import prisma from '@/lib/prismaClient'

// const getData = async (userId: string) => {
//   const user = await prisma.user.findUnique({
//     where: { id: userId },
//   })

//   return user
// }

const navItems = [
  {
    id: 1,
    link: '/',
    text: 'Home',
    icon: <House className="size-4" />,
  },
  {
    id: 2,
    link: '/events',
    text: 'Events',
    icon: <CalendarCog className="size-4" />,
  },
  {
    id: 3,
    link: '/about',
    text: 'About',
    icon: <BadgeInfo className="size-4" />,
  },
  {
    id: 4,
    link: '/contact',
    text: 'Contact Us',
    icon: <Contact className="size-4" />,
  },
]

const Navbar = async () => {
  const session = await auth()
  const currentPath = headers().get('x-invoke-path') || '/'
  const isSession = session && session.user

  const userData = session?.user
  // if (session && session.user) {
  // userData = await getData(session.user.id as string)
  // }

  const isActive = (link: string) => currentPath === link
  return (
    <div className="min-h-16 px-4">
      <div className="nav-container fixed z-50 mx-auto mb-4 w-full bg-[#FFFFFFB2] px-8 py-[14px] dark:bg-[#000000b2]">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <Link href={'/'}>
              <Image src={Logo.src} height={50} width={50} alt="Logo" />
            </Link>
          </div>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-[32px]">
              {navItems &&
                navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.link}
                      className={`flex items-center text-[#212121] ${isActive(item.link) ? 'dark:text-white' : 'dark:text-[#a1a1aa]'} `}
                    >
                      <span
                        className={`mr-1 text-[#90A4AE] ${isActive(item.link) ? 'dark:text-white' : 'dark:text-[#a1a1aa]'}`}
                      >
                        {item.icon}
                      </span>
                      {item.text}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="flex items-center justify-end gap-4">
            <div className="hidden md:block">
              <ToggleThemeButton />
            </div>
            {session && session.user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    {userData && userData.image ? (
                      <>
                        <Avatar>
                          <AvatarImage src={userData && userData.image} />
                        </Avatar>
                      </>
                    ) : (
                      <Avatar>
                        <AvatarFallback>
                          {session.user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="/profile" className="flex items-center">
                          <User className="mr-2 size-5" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Link href="/evnts" className="flex items-center">
                          <CalendarCog className="mr-2 size-5" />
                          Events
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <div className="flex items-center">
                          <form
                            action={async () => {
                              'use server'
                              await signOut()
                            }}
                          >
                            <button type="submit" className="flex items-center">
                              <LogOut className="mr-2 size-5" />
                              Logout
                            </button>
                          </form>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href={'/signin'} className="hidden sm:block">
                  <Button
                    variant={'link'}
                    className="text-black no-underline hover:text-black hover:no-underline dark:text-white"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  href={'/signup'}
                  className="hidden rounded-md dark:border sm:block"
                >
                  <Button variant={'black'}>SignUp</Button>
                </Link>
              </>
            )}
            <div className="block md:hidden">
              <MobileMenu
                navItems={navItems}
                isSession={isSession ? false : true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

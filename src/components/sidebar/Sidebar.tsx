import Image from 'next/image'
import Link from 'next/link'
import { CiBookmarkCheck, CiLogout } from 'react-icons/ci'

import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5'
import { SidebarItem } from './SidebarItem'
import { LogoutButton } from '..'
import { getServerSession } from 'next-auth'
import { authOption } from '@/app/api/auth/[...nextauth]/route'

const navLinks = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <IoCalendarOutline />,
  },
  {
    title: 'TODOs',
    href: '/dashboard/rest-todos',
    icon: <CiBookmarkCheck />,
  },
  {
    title: 'Server Actions',
    href: '/dashboard/server-todos',
    icon: <IoListOutline />,
  },
  {
    title: 'Cookies',
    href: '/dashboard/cookies',
    icon: <IoCodeWorkingOutline />,
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: <IoBasketOutline />,
  },
  {
    title: 'My profile',
    href: '/dashboard/profile',
    icon: <IoPersonOutline />,
  },
]

export const Sidebar = async () => {
  const session = await getServerSession(authOption)
  if (!session) {
    // redirect('/api/auth/signin')
  }

  const username = session?.user?.name || 'Guest'
  const role = 'GUEST'
  // const role = session?.user?.role || 'Guest'
  const avatar =
    session?.user?.image ||
    'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard">
            <Image
              className="w-32"
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              alt="tailus logo"
              priority={true}
              width={100}
              height={100}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={avatar}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            width={100}
            height={100}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {username}
          </h5>
          <span className="hidden text-gray-400 lg:block">{role}</span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {navLinks.map((link) => (
            <SidebarItem
              key={link.href}
              title={link.title}
              href={link.href}
              icon={link.icon}
            />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-center items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  )
}

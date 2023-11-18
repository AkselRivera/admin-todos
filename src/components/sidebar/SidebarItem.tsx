'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  title: string
  href: string
  icon: React.ReactNode
}
export const SidebarItem = ({ title, icon, href }: Props) => {
  const pathname = usePathname()

  return (
    <li>
      <Link
        href={href}
        className={`relative px-3 py-3 flex items-center space-x-4 rounded-xl ease-in-out duration-300 ${
          pathname === href
            ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
            : ' hover:text-white hover:bg-sky-600/80'
        }  `}
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  )
}

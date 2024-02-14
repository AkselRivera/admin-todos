'use client'

import { CiLogout } from 'react-icons/ci'
import { useSession, signOut, signIn } from 'next-auth/react'
import { IoShieldOutline } from 'react-icons/io5'

export const LogoutButton = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-red-500 hover:text-white ease-in-out duration-300">
        <IoShieldOutline />
        <span className="group-hover:text-white/80">Loading...</span>
      </button>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <button
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-red-500 hover:text-white ease-in-out duration-300"
        onClick={() => {
          signIn()
        }}
      >
        <IoShieldOutline />
        <span className="group-hover:text-white/80">Login</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => {
        signOut()
      }}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-red-500 hover:text-white ease-in-out duration-300"
    >
      <CiLogout />
      <span className="group-hover:text-white/80">Logout</span>
    </button>
  )
}

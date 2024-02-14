'use client'

import { useSession } from 'next-auth/react'

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div>
      <h1 className="text-3xl">My profile</h1>
      <div className="w-full flex flex-col">
        <p>Username: {session?.user?.name || 'Guest'}</p>
        {/* <p>Role: {session?.user?.role || 'GUEST'}</p> */}
        <p>Email: {session?.user?.email || 'No email'}</p>
        <p>Image: {session?.user?.image || 'No image'}</p>
      </div>
      <pre className="mt-8 overflow-auto text-xs">
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  )
}

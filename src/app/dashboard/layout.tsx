// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { getServerSession } from 'next-auth'

import { Sidebar, TopMenu } from '@/components'
import { authOption } from '../api/auth/[...nextauth]/route'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Sidebar />

      {/* Main Layout content - Contenido principal del Layout */}
      <div className="flex flex-col min-h-screen ml-auto  lg:w-[75%] xl:w-[80%] 2xl:w-[85%] ">
        <TopMenu />

        <div className="px-6 pt-6 bg-gray-200  flex-1">{children}</div>
      </div>
    </>
  )
}

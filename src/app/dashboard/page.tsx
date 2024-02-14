import { Widget } from '@/components'
import { getServerSession } from 'next-auth'
import { authOption } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOption)
  if (!session) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="light grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <Widget title="Usuario conectado S-Side">
        <div className="w-full break-words overflow-auto">
          <pre className=" text-sm">{JSON.stringify(session, null, 2)}</pre>
        </div>
      </Widget>
      <Widget title="My Budget">
        <div className="mt-2 flex justify-center gap-4">
          <h3 className="text-3xl font-bold text-gray-700">$ 26,535</h3>
          <div className="flex items-end gap-1 text-green-500">
            <svg
              className="w-3"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.00001 0L12 8H-3.05176e-05L6.00001 0Z"
                fill="currentColor"
              />
            </svg>
            <span>2%</span>
          </div>
        </div>
      </Widget>
    </div>
  )
}

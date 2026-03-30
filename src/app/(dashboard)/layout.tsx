import React from 'react'
import { cookies } from 'next/headers'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

type SessionUser = {
  id: string
  email: string
  name: string
  picture: string | null
  provider: string
} | null

async function getSessionUser(): Promise<SessionUser> {
  try {
    const cookieStore = await cookies()
    const raw = cookieStore.get('aegis_session')?.value
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.email && data.provider) return data
    return null
  } catch {
    return null
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSessionUser()

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      <Sidebar user={user} />
      <div className="flex-1 flex flex-col w-full">
        <Navbar user={user} />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

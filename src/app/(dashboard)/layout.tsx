import React from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // User session is read client-side in Sidebar/Navbar via cookies
  // This keeps the layout static-compatible
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      <Sidebar user={null} />
      <div className="flex-1 flex flex-col w-full">
        <Navbar user={null} />
        <main className="flex-1 overflow-y-auto w-full">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

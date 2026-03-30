import React from 'react'
import prisma from '@/lib/prisma'
import { SettingsClient } from './SettingsClient'

export default async function SettingsPage() {
  const keywords = await prisma.keyword.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 w-full h-full">
      <SettingsClient keywords={keywords} />
    </div>
  )
}

import React from 'react'
import prisma from '@/lib/prisma'
import LiveDashboardView from './LiveDashboardView'

export default async function DashboardPage() {
  const totalListings = await prisma.listing.count()
  const highRisk = await prisma.listing.count({ where: { riskLevel: 'HIGH_RISK' } })
  const suspicious = await prisma.listing.count({ where: { riskLevel: 'SUSPICIOUS' } })
  const platforms = await prisma.platform.count({ where: { enabled: true } })

  const recentAlerts = await prisma.listing.findMany({
    where: { riskLevel: { in: ['HIGH_RISK', 'SUSPICIOUS'] } },
    orderBy: { postedTime: 'desc' },
    take: 5,
    include: { platform: true }
  })

  const initialData = {
    totalListings,
    highRisk,
    suspicious,
    platforms,
    recentAlerts
  }

  return <LiveDashboardView initialData={initialData} />
}

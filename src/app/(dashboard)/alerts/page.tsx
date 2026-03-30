import React, { Suspense } from 'react'
import prisma from '@/lib/prisma'
import { AlertListClient } from './AlertListClient'
import { AlertsFilterBar } from './AlertsFilterBar'
import { Activity } from 'lucide-react'

export const dynamic = 'force-static'
export const revalidate = false

export default async function AlertsPage() {
  const [alerts, platforms] = await Promise.all([
    prisma.listing.findMany({
      where: { riskLevel: { in: ['HIGH_RISK', 'SUSPICIOUS'] } },
      orderBy: { postedTime: 'desc' },
      include: { platform: true },
      take: 50,
    }),
    prisma.platform.findMany({ select: { name: true } }),
  ])

  const formattedAlerts = alerts.map((a: any) => ({
    ...a,
    createdAt: a.createdAt.toISOString(),
    updatedAt: a.updatedAt.toISOString(),
    postedTime: a.postedTime.toISOString(),
  }))

  const platformNames = platforms.map((p: any) => p.name)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
            Intercepted Transmissions
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
            Global Suspicious Market Activity Feed
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          {alerts.length} Intercepts
        </div>
      </div>

      {/* Filter Bar */}
      <Suspense fallback={null}>
        <AlertsFilterBar platforms={platformNames} />
      </Suspense>

      {/* Alerts Table */}
      <div className="border border-border/50 bg-card/30 backdrop-blur-md rounded-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5 pointer-events-none" />
        <AlertListClient alerts={formattedAlerts} />
      </div>
    </div>
  )
}

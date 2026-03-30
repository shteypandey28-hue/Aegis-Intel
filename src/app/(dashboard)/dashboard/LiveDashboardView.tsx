'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertOctagon, Activity, FileText, Globe,
  TrendingUp, ArrowRight, ShieldAlert, BarChart2, Dna, Zap
} from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock 7-day spark data
const SPARK_DATA = [
  { day: 'Mon', alerts: 40 },
  { day: 'Tue', alerts: 65 },
  { day: 'Wed', alerts: 45 },
  { day: 'Thu', alerts: 88 },
  { day: 'Fri', alerts: 72 },
  { day: 'Sat', alerts: 55 },
  { day: 'Sun', alerts: 94 },
]

// Mock recent activity feed
const RECENT_ACTIVITY = [
  { time: '2 min ago', event: 'New HIGH_RISK intercept on eBay', type: 'critical' },
  { time: '8 min ago', event: 'Case #7F3A1C marked as Resolved', type: 'resolved' },
  { time: '14 min ago', event: 'Keyword "elephant ivory" triggered on Facebook', type: 'warning' },
  { time: '21 min ago', event: 'Platform "Taobao" returned 18 new listings', type: 'info' },
  { time: '35 min ago', event: 'Analyst notes saved on case #2B9E44', type: 'info' },
]

const TOOLTIP_STYLE = {
  backgroundColor: '#0f172a',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '8px',
  color: '#f8fafc',
  fontSize: '11px',
  fontFamily: 'monospace',
}

export default function LiveDashboardView({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev: any) => ({
        ...prev,
        totalListings: prev.totalListings + Math.floor(Math.random() * 5) + 1,
        suspicious: prev.suspicious + (Math.random() > 0.8 ? 1 : 0),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex justify-between items-end flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
            Intelligence Overview
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] uppercase font-mono tracking-widest text-primary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              Live Sync
            </span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm mt-1">Real-time status of monitored platforms and identified threats.</p>
        </div>
        <Link href="/analytics" className="flex items-center gap-2 text-xs font-mono text-primary border border-primary/30 bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-md transition-colors">
          <BarChart2 className="w-3.5 h-3.5" /> Full Analytics <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: 'Total Scanned',
            value: data.totalListings.toLocaleString(),
            sub: 'across all active nodes',
            icon: FileText,
            iconClass: 'text-primary animate-pulse',
            cardClass: 'border-border/50',
            valueClass: '',
          },
          {
            title: 'High Risk',
            value: data.highRisk.toLocaleString(),
            sub: 'immediate review required',
            icon: AlertOctagon,
            iconClass: 'text-destructive',
            cardClass: 'border-destructive/20 bg-destructive/5',
            valueClass: 'text-destructive',
          },
          {
            title: 'Suspicious',
            value: data.suspicious.toLocaleString(),
            sub: 'flagged by pattern match',
            icon: ShieldAlert,
            iconClass: 'text-amber-500',
            cardClass: 'border-amber-500/20 bg-amber-500/5',
            valueClass: 'text-amber-500',
          },
          {
            title: 'Platforms Active',
            value: data.platforms.toString(),
            sub: 'networks under surveillance',
            icon: Globe,
            iconClass: 'text-primary',
            cardClass: 'border-primary/20 bg-primary/5',
            valueClass: 'text-primary',
          },
        ].map((card) => (
          <motion.div key={card.title} whileHover={{ y: -2 }} transition={{ type: 'spring', stiffness: 300 }}>
            <Card className={`bg-card/60 backdrop-blur-sm overflow-hidden relative group ${card.cardClass}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                <card.icon className={`h-4 w-4 ${card.iconClass}`} />
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-black font-mono tracking-tighter ${card.valueClass}`}>{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main content row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        {/* Recent Alerts Table */}
        <Card className="col-span-1 lg:col-span-4 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Critical Alerts</CardTitle>
              <CardDescription>Latest high-confidence threat detections across all networks.</CardDescription>
            </div>
            <Link href="/alerts" className="text-xs text-primary hover:text-primary/80 font-mono flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Listing</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.recentAlerts.map((alert: any) => (
                  <TableRow key={alert.id} className="border-border border-b-0 hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex gap-2 items-center">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${alert.riskLevel === 'HIGH_RISK' ? 'bg-destructive shadow-[0_0_6px_var(--color-destructive)]' : 'bg-amber-500'}`} />
                        <span className="truncate max-w-[180px]">{alert.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-background/50 border-border font-normal text-muted-foreground text-[10px]">
                        {alert.platform?.name ?? 'Unknown'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {alert.riskLevel === 'HIGH_RISK' ? (
                        <Badge className="bg-destructive/10 text-destructive border-none text-[10px] font-black uppercase">Critical</Badge>
                      ) : (
                        <Badge className="bg-amber-500/10 text-amber-500 border-none text-[10px] font-bold uppercase">Suspicious</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/alerts/${alert.id}`} className="text-xs text-primary hover:text-primary/80 font-medium transition-colors">
                        View
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {data.recentAlerts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground text-sm font-mono py-8">
                      No alerts yet. Run the seeder to populate data.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="col-span-1 lg:col-span-3 space-y-6">
          {/* Alert Trend Spark */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> 7-Day Alert Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={120}>
                <AreaChart data={SPARK_DATA} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={TOOLTIP_STYLE} />
                  <Area type="monotone" dataKey="alerts" stroke="#10b981" strokeWidth={2} fill="url(#sparkGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Live Activity Feed */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary animate-pulse" /> Live Activity Feed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              {RECENT_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${item.type === 'critical' ? 'bg-destructive' : item.type === 'resolved' ? 'bg-emerald-400' : item.type === 'warning' ? 'bg-amber-400' : 'bg-primary'}`} />
                  <div>
                    <p className="text-xs text-foreground/70">{item.event}</p>
                    <p className="text-[10px] font-mono text-muted-foreground/50 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Quick Access
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 grid grid-cols-2 gap-2">
              {[
                { href: '/analytics', label: 'Analytics', icon: BarChart2 },
                { href: '/species', label: 'Species DB', icon: Dna },
                { href: '/alerts', label: 'All Alerts', icon: AlertOctagon },
                { href: '/settings', label: 'Config', icon: Globe },
              ].map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}
                  className="flex items-center gap-2 px-3 py-2 rounded-md border border-border/40 bg-background/30 hover:border-primary/40 hover:bg-primary/5 text-xs font-mono text-muted-foreground hover:text-primary transition-all">
                  <Icon className="w-3.5 h-3.5" /> {label}
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

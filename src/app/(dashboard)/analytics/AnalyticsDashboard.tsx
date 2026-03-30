'use client'

import React from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { ThreatGlobe } from '@/components/3d/ThreatGlobe'
import {
  TrendingUp, PieChart as PieIcon, BarChart2,
  Globe, AlertTriangle, Activity
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

// ── Mock Data ────────────────────────────────────────────────────────────────
const DAILY_ALERTS = [
  { day: 'Mon', high: 12, suspicious: 28, total: 180 },
  { day: 'Tue', high: 19, suspicious: 35, total: 230 },
  { day: 'Wed', high: 8,  suspicious: 22, total: 160 },
  { day: 'Thu', high: 27, suspicious: 41, total: 310 },
  { day: 'Fri', high: 22, suspicious: 38, total: 270 },
  { day: 'Sat', high: 15, suspicious: 29, total: 190 },
  { day: 'Sun', high: 31, suspicious: 52, total: 390 },
]

const PLATFORM_DATA = [
  { name: 'eBay', value: 34, color: '#10b981' },
  { name: 'Instagram', value: 28, color: '#f59e0b' },
  { name: 'Facebook', value: 19, color: '#e11d48' },
  { name: 'Taobao', value: 12, color: '#6366f1' },
  { name: 'Other', value: 7, color: '#64748b' },
]

const SPECIES_DATA = [
  { name: 'Elephant', count: 147, sci: 'Loxodonta africana' },
  { name: 'Pangolin', count: 98,  sci: 'Manis javanica' },
  { name: 'Rhino',    count: 73,  sci: 'Rhinocerotidae' },
  { name: 'Tiger',    count: 61,  sci: 'Panthera tigris' },
  { name: 'Turtle',   count: 44,  sci: 'Testudines' },
  { name: 'Wild Buffalo', count: 29, sci: 'Bubalus arnee' },
  { name: 'Gaur',     count: 21,  sci: 'Bos gaurus' },
  { name: 'Banteng',  count: 17,  sci: 'Bos javanicus' },
  { name: 'Leopard',  count: 38,  sci: 'Panthera pardus' },
]

const REGION_DATA = [
  { region: 'East Asia', intercepts: 312 },
  { region: 'West Africa', intercepts: 241 },
  { region: 'South Asia', intercepts: 188 },
  { region: 'Europe', intercepts: 134 },
  { region: 'Americas', intercepts: 97 },
  { region: 'Middle East', intercepts: 61 },
]

const TOOLTIP_STYLE = {
  backgroundColor: '#0f172a',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: '8px',
  color: '#f8fafc',
  fontSize: '12px',
  fontFamily: 'monospace',
}

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight">Analytics</h2>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
          Global intelligence metrics · Last 7 days
        </p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Intercepts', value: '1,730', sub: '+12% vs last week', icon: Activity, color: 'text-primary', border: 'border-primary/20' },
          { label: 'Critical Alerts', value: '134', sub: 'Require enforcement', icon: AlertTriangle, color: 'text-destructive', border: 'border-destructive/20' },
          { label: 'Species Detected', value: '6', sub: 'Across all listings', icon: PieIcon, color: 'text-amber-400', border: 'border-amber-400/20' },
          { label: 'Platforms Monitored', value: '30+', sub: '8 regions active', icon: Globe, color: 'text-indigo-400', border: 'border-indigo-400/20' },
        ].map(({ label, value, sub, icon: Icon, color, border }) => (
          <Card key={label} className={`border ${border} bg-card/60 backdrop-blur-sm`}>
            <CardContent className="pt-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">{label}</span>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className={`text-3xl font-black font-mono tabular-nums tracking-tighter ${color}`}>{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{sub}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Row 1: Area Chart + Globe */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Alert Volume Trend */}
        <Card className="col-span-1 lg:col-span-3 border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-wide">
              <TrendingUp className="w-4 h-4 text-primary" /> Weekly Alert Volume
            </CardTitle>
            <CardDescription>Daily intercepts by risk classification</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={DAILY_ALERTS} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="suspGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Area type="monotone" dataKey="high" name="Critical" stroke="#e11d48" strokeWidth={2} fill="url(#highGrad)" />
                <Area type="monotone" dataKey="suspicious" name="Suspicious" stroke="#f59e0b" strokeWidth={2} fill="url(#suspGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 3D Globe */}
        <Card className="col-span-1 lg:col-span-2 border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-wide">
              <Globe className="w-4 h-4 text-primary" /> Threat Origin Map
            </CardTitle>
            <CardDescription className="text-[11px]">Live interception nodes by geographic cluster</CardDescription>
          </CardHeader>
          <CardContent className="p-0 h-[248px]">
            <ThreatGlobe />
          </CardContent>
          {/* Legend */}
          <div className="flex gap-4 px-6 pb-4 text-[11px] font-mono text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" />Critical</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" />Suspicious</span>
          </div>
        </Card>
      </div>

      {/* Row 2: Platform Pie + Species Bar + Region Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Pie */}
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-wide">
              <PieIcon className="w-4 h-4 text-primary" /> Platform Breakdown
            </CardTitle>
            <CardDescription>Intercepts by source platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={PLATFORM_DATA} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                  dataKey="value" nameKey="name" paddingAngle={3}>
                  {PLATFORM_DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip contentStyle={TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
              {PLATFORM_DATA.map(p => (
                <div key={p.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <span className="text-[11px] font-mono text-muted-foreground">{p.name} {p.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Species Bar */}
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-wide">
              <BarChart2 className="w-4 h-4 text-primary" /> Top Species Detected
            </CardTitle>
            <CardDescription>This week's most trafficked animals</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={SPECIES_DATA} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={60} tick={{ fontSize: 11, fill: '#94a3b8', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                <Bar dataKey="count" name="Intercepts" radius={[0, 4, 4, 0]}>
                  {SPECIES_DATA.map((_, i) => (
                    <Cell key={i} fill={i < 2 ? '#e11d48' : i < 4 ? '#f59e0b' : '#10b981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Region Bar */}
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base uppercase tracking-wide">
              <Globe className="w-4 h-4 text-primary" /> Intercepts by Region
            </CardTitle>
            <CardDescription>Geographic distribution of threats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mt-2">
              {REGION_DATA.map((r, i) => {
                const max = REGION_DATA[0].intercepts
                const pct = (r.intercepts / max) * 100
                return (
                  <div key={r.region}>
                    <div className="flex justify-between text-xs font-mono mb-1">
                      <span className="text-foreground/70">{r.region}</span>
                      <span className="text-muted-foreground">{r.intercepts}</span>
                    </div>
                    <div className="w-full h-1.5 bg-border/30 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${pct}%`,
                          background: i === 0 ? '#e11d48' : i === 1 ? '#f59e0b' : '#10b981'
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

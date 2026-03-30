'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, AlertOctagon, Settings, ShieldAlert, LogOut, UserCircle, BarChart2, Dna } from 'lucide-react'
import { logout } from '@/app/login/actions'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/alerts', label: 'Threat Alerts', icon: AlertOctagon },
  { href: '/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/species', label: 'Species Database', icon: Dna },
  { href: '/settings', label: 'Configuration', icon: Settings },
  { href: '/profile', label: 'Agent Profile', icon: UserCircle },
]

type UserData = { id: string; email: string; name: string; picture: string | null; provider: string } | null

export default function Sidebar({ user }: { user?: UserData }) {
  const displayName = user?.name || 'SHADOW-WARDEN'
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen hidden md:flex flex-col border-r border-border bg-sidebar backdrop-blur-3xl sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
          <ShieldAlert className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="font-semibold text-lg tracking-tight">Aegis Intel</span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary font-medium border border-primary/20' 
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto space-y-2">
        {/* Agent quick-link */}
        <Link
          href="/profile"
          className="flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 border border-primary/40 overflow-hidden">
            {user?.picture ? (
              <img src={user.picture} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <UserCircle className="w-4 h-4 text-primary" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground/80">{displayName}</span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">View Profile</span>
          </div>
        </Link>

        <form action={logout}>
          <button type="submit" className="flex w-full items-center gap-3 px-3 py-2.5 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors group">
            <LogOut className="w-5 h-5 group-hover:text-destructive transition-colors" />
            <span className="font-medium">Disconnect Node</span>
          </button>
        </form>
      </div>
    </aside>
  )
}

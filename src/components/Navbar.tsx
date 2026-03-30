'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Bell, Search, X, ShieldAlert, CheckCircle2, AlertTriangle, Info, ChevronRight, User, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { logout } from '@/app/login/actions'
import { useSession } from '@/lib/useSession'

// ── Mock Notifications ──────────────────────────────────────────────────────
const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'critical',
    title: 'New HIGH_RISK intercept',
    body: 'Banteng carcass listing detected on Marketplace B with 99% confidence.',
    time: '2 min ago',
    read: false,
    href: '/alerts',
  },
  {
    id: '2',
    type: 'critical',
    title: 'Seller flagged: Exotic_Game_ID',
    body: 'Repeat offender detected. 3 HIGH_RISK listings in 24 hours.',
    time: '8 min ago',
    read: false,
    href: '/alerts',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Keyword trigger: "Tembadau"',
    body: 'New coded phrase match across 2 platforms. Case file auto-generated.',
    time: '24 min ago',
    read: false,
    href: '/alerts',
  },
  {
    id: '4',
    type: 'info',
    title: 'Platform scan complete',
    body: 'Marketplace A returned 47 new listings. 6 flagged for review.',
    time: '1 hr ago',
    read: true,
    href: '/analytics',
  },
  {
    id: '5',
    type: 'success',
    title: 'Case #G1 marked Resolved',
    body: 'Analyst closed the Gaur horn trophy case after enforcement action.',
    time: '2 hr ago',
    read: true,
    href: '/alerts',
  },
]

const NOTIF_ICON = {
  critical: { icon: ShieldAlert, color: 'text-destructive', bg: 'bg-destructive/10' },
  warning:  { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  info:     { icon: Info, color: 'text-primary', bg: 'bg-primary/10' },
  success:  { icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
}

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}

type UserData = { id: string; email: string; name: string; picture: string | null; provider: string } | null

export default function Navbar({ user: userProp }: { user?: UserData }) {
  const session = useSession()
  const user = session || userProp
  const displayName = user?.name || 'Agent Alpha'
  const displayEmail = user?.email || 'agent@aegis.io'
  const initials = displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'A'
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS)

  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useClickOutside(notifRef, () => setNotifOpen(false))
  useClickOutside(profileRef, () => setProfileOpen(false))

  const unread = notifications.filter(n => !n.read).length

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function dismissNotif(id: string) {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between gap-x-4 border-b border-border bg-background/80 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8 backdrop-blur-md">
      {/* Search */}
      <form className="relative flex flex-1 max-w-lg" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">Search Alerts</label>
        <Search className="pointer-events-none absolute inset-y-0 left-2 h-full w-4 text-muted-foreground" aria-hidden="true" />
        <input
          id="search-field"
          className="block h-full w-full border-0 py-0 pl-8 pr-0 text-foreground placeholder:text-muted-foreground/50 focus:ring-0 sm:text-sm bg-transparent outline-none font-mono"
          placeholder="Search keywords or seller handles..."
          type="search"
          name="search"
        />
      </form>

      <div className="flex items-center gap-x-3 lg:gap-x-5">

        {/* ── Notification Bell ── */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(v => !v); setProfileOpen(false) }}
            className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-full transition-all relative"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-destructive text-[9px] font-black text-white flex items-center justify-center shadow-[0_0_6px_var(--color-destructive)]">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-[360px] rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold tracking-wide">Alerts</span>
                    {unread > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-destructive text-[10px] font-black text-white">{unread}</span>
                    )}
                  </div>
                  {unread > 0 && (
                    <button onClick={markAllRead} className="text-[11px] font-mono text-primary hover:text-primary/80 transition-colors">
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="max-h-[360px] overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="py-10 text-center text-xs font-mono text-muted-foreground">
                      No notifications
                    </div>
                  ) : (
                    notifications.map((n) => {
                      const cfg = NOTIF_ICON[n.type as keyof typeof NOTIF_ICON]
                      const Icon = cfg.icon
                      return (
                        <div
                          key={n.id}
                          className={`flex items-start gap-3 px-4 py-3 border-b border-border/20 hover:bg-white/[0.02] transition-colors group ${!n.read ? 'bg-primary/[0.03]' : ''}`}
                        >
                          <div className={`w-8 h-8 rounded-full ${cfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                            <Icon className={`w-4 h-4 ${cfg.color}`} />
                          </div>
                          <Link href={n.href} onClick={() => setNotifOpen(false)} className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className={`text-xs font-semibold leading-tight ${!n.read ? 'text-foreground' : 'text-foreground/70'}`}>
                                {n.title}
                                {!n.read && <span className="inline-block ml-1.5 w-1.5 h-1.5 rounded-full bg-destructive align-middle" />}
                              </p>
                              <span className="text-[10px] font-mono text-muted-foreground/50 flex-shrink-0">{n.time}</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground/60 mt-0.5 leading-relaxed">{n.body}</p>
                          </Link>
                          <button
                            onClick={() => dismissNotif(n.id)}
                            className="opacity-0 group-hover:opacity-100 text-muted-foreground/40 hover:text-muted-foreground transition-all flex-shrink-0 mt-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )
                    })
                  )}
                </div>

                {/* Footer */}
                <Link href="/alerts" onClick={() => setNotifOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-mono text-primary hover:bg-primary/5 transition-colors border-t border-border/40">
                  View all intercepts <ChevronRight className="w-3 h-3" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" />

        {/* ── Profile Avatar ── */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setProfileOpen(v => !v); setNotifOpen(false) }}
            className="w-9 h-9 rounded-full bg-primary/20 hover:bg-primary/30 text-primary flex items-center justify-center font-black cursor-pointer transition-all border border-primary/50 hover:border-primary text-sm shadow-[0_0_10px_-3px_var(--color-primary)] hover:shadow-[0_0_14px_-2px_var(--color-primary)] overflow-hidden"
          >
            {user?.picture ? (
              <img src={user.picture} alt={displayName} className="w-full h-full object-cover rounded-full" referrerPolicy="no-referrer" />
            ) : (
              initials
            )}
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-56 rounded-xl border border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
              >
                {/* Agent identity */}
                <div className="px-4 py-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/50 text-primary flex items-center justify-center font-black text-sm shadow-[0_0_10px_-3px_var(--color-primary)] overflow-hidden">
                      {user?.picture ? (
                        <img src={user.picture} alt={displayName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      ) : (
                        initials
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground/90">{displayName}</p>
                      <p className="text-[10px] font-mono text-muted-foreground truncate max-w-[140px]">{displayEmail}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Active Session</span>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1.5">
                  {[
                    { href: '/profile', label: 'Agent Profile', icon: User },
                    { href: '/settings', label: 'Configuration', icon: Settings },
                  ].map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground/70 hover:text-foreground hover:bg-white/[0.04] transition-colors"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      {label}
                    </Link>
                  ))}
                </div>

                <div className="border-t border-border/40 py-1.5">
                  <form action={logout}>
                    <button
                      type="submit"
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive/80 hover:text-destructive hover:bg-destructive/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </header>
  )
}

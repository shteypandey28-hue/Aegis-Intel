'use client'

import React, { useState, useEffect, useTransition } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const PLATFORMS = ['All Platforms', 'eBay', 'Instagram', 'Facebook Marketplace', 'OLX', 'Craigslist', 'WeChat', 'Taobao']
const RISK_LEVELS = [
  { value: '', label: 'All Risk Levels' },
  { value: 'HIGH_RISK', label: 'Critical' },
  { value: 'SUSPICIOUS', label: 'Suspicious' },
]
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'confidence', label: 'Highest Confidence' },
  { value: 'risk', label: 'Highest Risk' },
]

export function AlertsFilterBar({ platforms }: { platforms: string[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [risk, setRisk] = useState(searchParams.get('risk') ?? '')
  const [platform, setPlatform] = useState(searchParams.get('platform') ?? '')
  const [sort, setSort] = useState(searchParams.get('sort') ?? 'newest')
  const [showFilters, setShowFilters] = useState(false)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => push(), 400)
    return () => clearTimeout(timer)
  }, [query])

  function push() {
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (risk) params.set('risk', risk)
    if (platform) params.set('platform', platform)
    if (sort && sort !== 'newest') params.set('sort', sort)
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  function handleFilter(key: string, val: string) {
    if (key === 'risk') setRisk(val)
    if (key === 'platform') setPlatform(val)
    if (key === 'sort') setSort(val)
    const params = new URLSearchParams()
    if (query) params.set('q', query)
    if (key === 'risk' ? val : risk) params.set('risk', key === 'risk' ? val : risk)
    if (key === 'platform' ? val : platform) params.set('platform', key === 'platform' ? val : platform)
    const s = key === 'sort' ? val : sort
    if (s && s !== 'newest') params.set('sort', s)
    startTransition(() => router.push(`${pathname}?${params.toString()}`))
  }

  function clearAll() {
    setQuery(''); setRisk(''); setPlatform(''); setSort('newest')
    startTransition(() => router.push(pathname))
  }

  const hasFilters = query || risk || platform || sort !== 'newest'

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          {isPending && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          )}
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by title, species, keyword..."
            className="w-full bg-background/60 border border-border/60 rounded-md pl-9 pr-9 py-2.5 text-sm font-mono outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/40"
          />
        </div>

        <button
          onClick={() => setShowFilters(v => !v)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-md border text-sm font-bold transition-all ${showFilters ? 'border-primary/50 bg-primary/10 text-primary' : 'border-border/60 bg-background/60 text-muted-foreground hover:text-foreground hover:border-border'}`}
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
          {hasFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
        </button>

        {hasFilters && (
          <button onClick={clearAll} className="flex items-center gap-1.5 px-3 py-2.5 rounded-md border border-border/40 text-xs font-mono text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-all">
            <X className="w-3.5 h-3.5" /> Clear
          </button>
        )}
      </div>

      {/* Filter Row */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex gap-3 flex-wrap pt-1 pb-2">
              {/* Risk Level */}
              <div className="relative">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Risk Level</label>
                <div className="relative">
                  <select
                    value={risk}
                    onChange={e => handleFilter('risk', e.target.value)}
                    className="appearance-none bg-background/60 border border-border/60 rounded-md px-3 py-2 pr-8 text-sm font-mono outline-none focus:border-primary/60 transition-all cursor-pointer text-foreground/80"
                  >
                    {RISK_LEVELS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Platform */}
              <div className="relative">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Platform</label>
                <div className="relative">
                  <select
                    value={platform}
                    onChange={e => handleFilter('platform', e.target.value)}
                    className="appearance-none bg-background/60 border border-border/60 rounded-md px-3 py-2 pr-8 text-sm font-mono outline-none focus:border-primary/60 transition-all cursor-pointer text-foreground/80"
                  >
                    {['', ...platforms].map(p => <option key={p} value={p}>{p || 'All Platforms'}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Sort */}
              <div className="relative">
                <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-1.5">Sort By</label>
                <div className="relative">
                  <select
                    value={sort}
                    onChange={e => handleFilter('sort', e.target.value)}
                    className="appearance-none bg-background/60 border border-border/60 rounded-md px-3 py-2 pr-8 text-sm font-mono outline-none focus:border-primary/60 transition-all cursor-pointer text-foreground/80"
                  >
                    {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filter Pills */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2">
          {query && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest">
              Search: "{query}" <button onClick={() => { setQuery(''); push() }}><X className="w-3 h-3" /></button>
            </span>
          )}
          {risk && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-destructive/30 bg-destructive/10 text-destructive text-[10px] font-mono uppercase tracking-widest">
              {RISK_LEVELS.find(r => r.value === risk)?.label} <button onClick={() => handleFilter('risk', '')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {platform && (
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border/50 bg-card/60 text-muted-foreground text-[10px] font-mono uppercase tracking-widest">
              {platform} <button onClick={() => handleFilter('platform', '')}><X className="w-3 h-3" /></button>
            </span>
          )}
        </div>
      )}
    </div>
  )
}

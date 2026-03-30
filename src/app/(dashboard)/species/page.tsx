'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ExternalLink, ShieldAlert, Activity, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const SPECIES = [
  {
    common: 'African Elephant',
    scientific: 'Loxodonta africana',
    family: 'Elephantidae',
    status: 'VULNERABLE',
    population: '~415,000',
    detections: 147,
    trend: '+12% this week',
    trendUp: true,
    region: 'Sub-Saharan Africa',
    emoji: '🐘',
    keywords: ['ivory', 'tusk', 'white gold', 'elephantidae', 'loxodonta'],
    trafficMethod: 'Ivory carved products sold as antiques, raw tusk listed under "antique carving"',
    description: 'Most frequently trafficked large mammal. Ivory trade drives 96% of detections, often disguised as antique artifacts or art pieces.',
    cites: 'Appendix I',
    color: 'from-emerald-500/20 to-transparent',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
  },
  {
    common: 'Sunda Pangolin',
    scientific: 'Manis javanica',
    family: 'Manidae',
    status: 'CRITICALLY ENDANGERED',
    population: '<10,000',
    detections: 98,
    trend: '+8% this week',
    trendUp: true,
    region: 'Southeast Asia',
    emoji: '🦔',
    keywords: ['scales', 'manis', 'jelly', 'pangolin'],
    trafficMethod: 'Scales sold as "traditional medicine", shipped as seafood consignments',
    description: 'Most trafficked wild mammal globally. Scales used in traditional medicine. Live animals smuggled through food trade channels.',
    cites: 'Appendix I',
    color: 'from-amber-500/20 to-transparent',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-500/30',
  },
  {
    common: 'White Rhinoceros',
    scientific: 'Ceratotherium simum',
    family: 'Rhinocerotidae',
    status: 'NEAR THREATENED',
    population: '~17,500',
    detections: 73,
    trend: '-3% this week',
    trendUp: false,
    region: 'Southern Africa',
    emoji: '🦏',
    keywords: ['horn', 'rhinocerotidae', 'blood red', 'rhino'],
    trafficMethod: 'Horn sold as medicine powder, transported via diplomatic pouches and smuggler networks',
    description: 'Rhino horn worth more than gold by weight. Traffickers use coded language like "blood red" in listings for horn products.',
    cites: 'Appendix II',
    color: 'from-rose-500/20 to-transparent',
    accentColor: 'text-rose-400',
    borderColor: 'border-rose-500/30',
  },
  {
    common: 'Bengal Tiger',
    scientific: 'Panthera tigris tigris',
    family: 'Felidae',
    status: 'ENDANGERED',
    population: '~2,600',
    detections: 61,
    trend: '+5% this week',
    trendUp: true,
    region: 'South & Southeast Asia',
    emoji: '🐯',
    keywords: ['panthera', 'tiger bone', 'tiger skin', 'tiger wine'],
    trafficMethod: 'Bones sold as medicine, skins as luxury decor, through private auction channels',
    description: 'Tiger bones ground into "tiger bone wine" — a traditional medicine. Skins sold at premium through encrypted channels.',
    cites: 'Appendix I',
    color: 'from-orange-500/20 to-transparent',
    accentColor: 'text-orange-400',
    borderColor: 'border-orange-500/30',
  },
  {
    common: 'Green Sea Turtle',
    scientific: 'Chelonia mydas',
    family: 'Cheloniidae',
    status: 'ENDANGERED',
    population: '~85,000',
    detections: 44,
    trend: '-1% this week',
    trendUp: false,
    region: 'Tropical Oceans',
    emoji: '🐢',
    keywords: ['testudines', 'turtle shell', 'tortoiseshell', 'sea turtle'],
    trafficMethod: 'Shell ("tortoiseshell") used in jewelry. Eggs sold online, live turtles as exotic pets',
    description: 'Classic case of coded language — "tortoiseshell" used for jewelry listings referencing real shell material from protected species.',
    cites: 'Appendix I',
    color: 'from-teal-500/20 to-transparent',
    accentColor: 'text-teal-400',
    borderColor: 'border-teal-500/30',
  },
  {
    common: 'Leopard',
    scientific: 'Panthera pardus',
    family: 'Felidae',
    status: 'VULNERABLE',
    population: '~250,000',
    detections: 38,
    trend: '+2% this week',
    trendUp: true,
    region: 'Africa & South Asia',
    emoji: '🐆',
    keywords: ['panthera', 'leopard skin', 'big cat', 'spotted fur'],
    trafficMethod: 'Pelts sold openly as luxury fashion, claws used in ornamental jewelry',
    description: 'Leopard skins are high-value luxury items. Often listed as "vintage fur" or "antique pelt" to evade detection.',
    cites: 'Appendix I',
    color: 'from-yellow-500/20 to-transparent',
    accentColor: 'text-yellow-400',
    borderColor: 'border-yellow-500/30',
  },

  // ── Wild Cattle / Bovidae ────────────────────────────────────────────
  {
    common: 'Wild Water Buffalo',
    scientific: 'Bubalus arnee',
    family: 'Bovidae',
    status: 'CRITICALLY ENDANGERED',
    population: '<4,000',
    detections: 29,
    trend: '+14% this week',
    trendUp: true,
    region: 'South & Southeast Asia (India, Nepal, Thailand)',
    emoji: '🦬',
    keywords: ['bubalus', 'arnee', 'wild buffalo', 'buffalo horn', 'buffalo meat', 'bushmeat'],
    trafficMethod: 'Poached for meat and horns. Live animals captured for illegal crossbreeding. Sold as "exotic beef" or "forest buffalo" in dark web markets',
    description: 'Critically endangered — fewer than 4,000 remain. Distinct from domestic buffalo. Poached for bushmeat and horns used as trophies. CITES Appendix III protection often bypassed by mislabeling carcasses as domestic livestock.',
    cites: 'Appendix III',
    color: 'from-stone-500/20 to-transparent',
    accentColor: 'text-stone-400',
    borderColor: 'border-stone-500/30',
  },
  {
    common: 'Gaur (Indian Bison)',
    scientific: 'Bos gaurus',
    family: 'Bovidae',
    status: 'VULNERABLE',
    population: '~13,000–30,000',
    detections: 21,
    trend: '+6% this week',
    trendUp: true,
    region: 'South & Southeast Asia',
    emoji: '🐂',
    keywords: ['bos gaurus', 'gaur', 'gayal', 'indian bison', 'seladang', 'wild beef'],
    trafficMethod: 'Poached as exotic bushmeat and sold in illegal wildlife markets. Horns used as trophies. Sometimes mislabeled as "gayal" (domestic hybrid) to avoid detection',
    description: 'Largest wild cattle species on Earth. Declining due to poaching for bushmeat and horns. Often listed in trafficking markets as "gayal" or "seladang" — regional names that evade keyword filters.',
    cites: 'Appendix I',
    color: 'from-lime-500/20 to-transparent',
    accentColor: 'text-lime-400',
    borderColor: 'border-lime-500/30',
  },
  {
    common: 'Banteng',
    scientific: 'Bos javanicus',
    family: 'Bovidae',
    status: 'ENDANGERED',
    population: '~8,000',
    detections: 17,
    trend: '+9% this week',
    trendUp: true,
    region: 'Southeast Asia (Java, Borneo, Myanmar)',
    emoji: '🐃',
    keywords: ['bos javanicus', 'banteng', 'tembadau', 'wild ox', 'east java beef', 'jungle beef'],
    trafficMethod: 'Sold as exotic bushmeat "tembadau" or "wild ox" in online markets. Hide used for leather. Poached in protected forest zones, carcasses transported alongside legal livestock',
    description: 'Endangered wild cattle native to Southeast Asia. Easily confused with domestic cattle, allowing traffickers to smuggle carcasses undetected through livestock transport channels. CITES Appendix I protected.',
    cites: 'Appendix I',
    color: 'from-cyan-500/20 to-transparent',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/30',
  },
]

const STATUS_COLORS: Record<string, string> = {
  'CRITICALLY ENDANGERED': 'bg-destructive/20 text-destructive border-destructive/30',
  'ENDANGERED': 'bg-red-500/20 text-red-400 border-red-500/30',
  'VULNERABLE': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'NEAR THREATENED': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
}

export default function SpeciesPage() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<typeof SPECIES[0] | null>(null)

  const filtered = SPECIES.filter(s =>
    s.common.toLowerCase().includes(search.toLowerCase()) ||
    s.scientific.toLowerCase().includes(search.toLowerCase()) ||
    s.keywords.some(k => k.includes(search.toLowerCase()))
  )

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-black tracking-tight">Species Encyclopedia</h2>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
          Protected Animals Linked to the Detection Engine
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search species, scientific name, or keyword..."
          className="w-full bg-background/60 border border-border/60 rounded-md pl-9 py-2.5 text-sm font-mono outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/40"
        />
      </div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((species, i) => (
          <motion.div
            key={species.scientific}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            onClick={() => setSelected(species)}
            className={`cursor-pointer group relative p-6 rounded-xl border ${species.borderColor} bg-gradient-to-br ${species.color} bg-card/60 backdrop-blur-sm hover:border-opacity-60 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden`}
          >
            {/* Detection dot */}
            <div className={`absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full border ${species.borderColor} bg-background/40`}>
              <Activity className={`w-3 h-3 ${species.accentColor} ${species.trendUp ? 'animate-pulse' : ''}`} />
              <span className={`text-[10px] font-mono ${species.accentColor}`}>{species.detections} hits</span>
            </div>

            <div className="text-4xl mb-4">{species.emoji}</div>

            <div className="space-y-1 mb-4">
              <h3 className="font-black text-lg tracking-tight text-foreground/90 group-hover:text-white transition-colors">{species.common}</h3>
              <p className={`text-xs font-mono italic ${species.accentColor}`}>{species.scientific}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={`text-[10px] border font-mono ${STATUS_COLORS[species.status] || 'bg-muted text-muted-foreground'}`}>
                {species.status}
              </Badge>
              <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground border-border/40">
                {species.cites}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>Population</span>
                <span className="text-foreground/70 font-semibold">{species.population}</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>Region</span>
                <span className="text-foreground/70 font-semibold">{species.region}</span>
              </div>
              <div className="flex justify-between text-xs font-mono text-muted-foreground">
                <span>Trend</span>
                <span className={`font-semibold ${species.trendUp ? 'text-destructive' : 'text-emerald-400'}`}>{species.trend}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">
              <ExternalLink className="w-3 h-3" /> View full case data
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className={`w-full max-w-2xl rounded-2xl border ${selected.borderColor} bg-card/95 backdrop-blur-xl p-8 relative shadow-2xl`}
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full border border-border/50 text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-5 mb-6">
                <div className="text-5xl">{selected.emoji}</div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">{selected.common}</h3>
                  <p className={`text-sm font-mono italic ${selected.accentColor} mt-0.5`}>{selected.scientific}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge className={`text-[10px] border ${STATUS_COLORS[selected.status]}`}>{selected.status}</Badge>
                    <Badge variant="outline" className="text-[10px] font-mono text-muted-foreground">{selected.cites}</Badge>
                  </div>
                </div>
              </div>

              <p className="text-sm text-foreground/70 leading-relaxed mb-6 border-l-2 pl-4 border-primary/40">{selected.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { label: 'Population', value: selected.population },
                  { label: 'Detections (7d)', value: `${selected.detections} intercepts` },
                  { label: 'Region', value: selected.region },
                  { label: 'Family', value: selected.family },
                ].map(({ label, value }) => (
                  <div key={label} className="p-3 rounded-lg bg-background/40 border border-border/30">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">{label}</div>
                    <div className="text-sm font-bold text-foreground/80">{value}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1 flex items-center gap-1.5">
                    <ShieldAlert className="w-3 h-3 text-destructive" /> Known Traffic Method
                  </div>
                  <p className="text-sm font-mono text-foreground/70">{selected.trafficMethod}</p>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">Detection Keywords</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.keywords.map(k => (
                      <Badge key={k} className={`text-[10px] font-mono ${selected.accentColor} bg-background/40 border ${selected.borderColor}`}>{k}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

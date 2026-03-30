'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ShieldAlert, Info, ExternalLink } from 'lucide-react'

// Variants for Staggered List
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, x: -10, y: 10 },
  visible: { opacity: 1, x: 0, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
}

export function AlertListClient({ alerts }: { alerts: any[] }) {
  if (alerts.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground w-full font-mono text-sm uppercase tracking-widest">
        No active threats detected.
      </div>
    )
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col relative z-10 w-full"
    >
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border/50 text-xs font-mono text-muted-foreground uppercase tracking-wider bg-card/50">
        <div className="col-span-5">Listing Title / Intercept</div>
        <div className="col-span-2">Platform</div>
        <div className="col-span-2">Risk Level</div>
        <div className="col-span-2">Confidence</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      <div className="flex flex-col max-h-[600px] overflow-y-auto">
        {alerts.map((a) => (
          <motion.div
            key={a.id}
            variants={itemVariants}
            className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-border/20 hover:bg-white/[0.02] hover:pl-8 transition-all duration-300 group"
          >
            {/* Title Column */}
            <div className="col-span-5 pr-4">
              <div className="font-semibold text-foreground/90 truncate flex items-center gap-2 group-hover:text-primary transition-colors">
                {a.riskLevel === 'HIGH_RISK' && <ShieldAlert className="w-4 h-4 text-destructive flex-shrink-0" />}
                <span className="truncate">{a.title}</span>
              </div>
              <div className="text-xs text-muted-foreground font-mono mt-1 opacity-60">Intercepted: {new Date(a.postedTime).toLocaleString()}</div>
            </div>

            {/* Platform Column */}
            <div className="col-span-2">
              <Badge variant="outline" className="bg-background/80 font-mono tracking-widest text-[10px] text-muted-foreground border-primary/20">
                {a.platform.name}
              </Badge>
            </div>

            {/* Risk Column */}
            <div className="col-span-2">
              {a.riskLevel === 'HIGH_RISK' ? (
                <Badge className="bg-destructive/10 text-destructive border-none shadow-none uppercase font-black tracking-widest hover:bg-destructive/20 text-[10px]">
                  Critical
                </Badge>
              ) : (
                <Badge className="bg-amber-500/10 text-amber-500 border-none shadow-none uppercase font-bold tracking-widest hover:bg-amber-500/20 text-[10px]">
                  Suspicious
                </Badge>
              )}
            </div>

            {/* Confidence Score Column */}
            <div className="col-span-2 flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="text-xs font-mono font-bold">{a.confidenceScore}%</span>
                <Info className="w-3 h-3 text-muted-foreground opacity-50" />
              </div>
              <div className="w-full h-1.5 bg-background rounded-full overflow-hidden block">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${a.confidenceScore}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className={`h-full ${a.confidenceScore > 80 ? 'bg-destructive shadow-[0_0_10px_var(--color-destructive)]' : 'bg-primary shadow-[0_0_10px_var(--color-primary)]'}`}
                />
              </div>
            </div>

            {/* Action Column */}
            <div className="col-span-1 text-right">
              <Link 
                href={`/alerts/${a.id}`} 
                className="w-8 h-8 rounded-full border border-border/50 flex items-center justify-center ml-auto hover:bg-primary/20 hover:border-primary/50 text-muted-foreground hover:text-primary transition-all shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

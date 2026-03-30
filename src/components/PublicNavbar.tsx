'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldAlert, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function PublicNavbar() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-5 flex justify-between items-center bg-background/80 backdrop-blur-xl border-b border-white/5">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center space-x-3 font-semibold text-lg"
      >
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="h-8 w-8 rounded-md bg-primary/20 border border-primary/50 flex items-center justify-center shadow-[0_0_15px_var(--color-primary)] group-hover:bg-primary/30 transition-colors">
            <ShieldAlert className="w-5 h-5 text-primary" />
          </div>
          <span className="tracking-widest uppercase text-sm font-bold group-hover:text-primary transition-colors">Aegis Intel</span>
        </Link>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="hidden md:flex items-center space-x-8 text-sm font-medium text-muted-foreground"
      >
        <Link href="/mission" className={`hover:text-primary transition-colors ${pathname === '/mission' ? 'text-primary' : ''}`}>Mission</Link>
        <Link href="/technology" className={`hover:text-primary transition-colors ${pathname === '/technology' ? 'text-primary' : ''}`}>Technology</Link>
        <Link href="/login" className="hover:text-primary transition-colors">Live Matrix</Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link href="/login" className="px-5 py-2.5 rounded-sm bg-primary/20 hover:bg-primary border border-primary/50 text-primary hover:text-primary-foreground transition-all flex items-center space-x-2 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
          <span>System Login</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </nav>
  )
}

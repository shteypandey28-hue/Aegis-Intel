'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck, Search, Activity, ArrowRight, ShieldAlert, Database } from 'lucide-react'
import HeroScene from '@/components/3d/HeroScene'
import PublicNavbar from '@/components/PublicNavbar'

const mockAlerts = [
  { term: 'Elephantidae', platform: 'Marketplace A', time: '12s ago', location: 'UK Node' },
  { term: 'Dragon powder', platform: 'Social X', time: '45s ago', location: 'Asia Node' },
  { term: 'Antique carving', platform: 'Auction B', time: '1m ago', location: 'EU Node' },
  { term: 'Yellow material', platform: 'Marketplace C', time: '3m ago', location: 'US Node' },
  { term: 'Manis javanica', platform: 'Social Y', time: '4m ago', location: 'Asia Node' },
]

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* 3D Background */}
      <HeroScene />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />

      {/* Shared Public Navbar */}
      <PublicNavbar />

      {/* Hero Content */}
      <main className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center max-w-5xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="inline-flex items-center space-x-2 px-3 py-1 mb-8 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest backdrop-blur-md shadow-[0_0_10px_var(--color-primary)]/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span>Global Surveillance Active</span>
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          AI-POWERED <br className="hidden md:block"/> WILDLIFE <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-300">PROTECTION</span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-2xl font-light mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Wildlife trafficking listings appear and vanish in hours. Our detection matrix monitors e-commerce and social networks in real-time, instantly classifying threats for rapid enforcement.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Link href="/login" className="px-8 py-4 rounded-sm bg-primary/20 border border-primary/50 text-primary font-bold tracking-widest uppercase text-sm transition-all hover:bg-primary hover:text-primary-foreground backdrop-blur-md group">
            <span className="flex items-center justify-center gap-2">
              Deploy Matrix
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link href="/technology" className="px-8 py-4 rounded-sm border border-border bg-background/50 hover:bg-accent text-foreground font-bold tracking-widest uppercase text-sm transition-all backdrop-blur-md">
            View Architecture
          </Link>
        </motion.div>

        {/* Live Detection Ticker Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="w-full max-w-3xl mt-24 text-left"
        >
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-widest font-mono text-muted-foreground">Live Intelligence Feed</span>
          </div>
          <div className="rounded-md border border-border/50 bg-background/40 backdrop-blur-md overflow-hidden p-1 shadow-2xl">
            {mounted && (
              <div className="relative h-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 z-10 pointer-events-none" />
                <motion.div 
                  animate={{ y: [0, -200] }}
                  transition={{ ease: "linear", duration: 15, repeat: Infinity }}
                  className="space-y-2 pt-10"
                >
                  {[...mockAlerts, ...mockAlerts, ...mockAlerts].map((alert, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded bg-sidebar/50 border border-border/30 backdrop-blur-sm">
                      <div className="flex items-center gap-4">
                        <span className="flex h-2 w-2 rounded-full bg-destructive/80 animate-pulse" />
                        <span className="text-sm font-mono text-foreground/80">{alert.term}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                        <span className="hidden sm:inline">{alert.platform}</span>
                        <span className="text-primary/70">{alert.location}</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* Global Impact Metrics */}
      <section className="relative z-20 w-full border-y border-border/50 bg-black/50 backdrop-blur-2xl py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-border/50">
          <div className="px-6">
            <h4 className="text-5xl font-black text-white mb-2 font-mono tracking-tighter">1.2<span className="text-primary text-3xl">M</span></h4>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Listings Scanned</p>
          </div>
          <div className="px-6">
            <h4 className="text-5xl font-black text-white mb-2 font-mono tracking-tighter">48<span className="text-primary text-3xl">H</span></h4>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Removal Latency</p>
          </div>
          <div className="px-6">
            <h4 className="text-5xl font-black text-white mb-2 font-mono tracking-tighter">8<span className="text-primary text-3xl">+</span></h4>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Global Nodes</p>
          </div>
          <div className="px-6">
            <h4 className="text-5xl font-black text-white mb-2 font-mono tracking-tighter">99<span className="text-primary text-3xl">%</span></h4>
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Detection Accuracy</p>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative z-10 w-full bg-background py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">The Surveillance <br/><span className="text-primary">Architecture</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-sm bg-gradient-to-b from-card to-background border border-border hover:border-primary/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <Database className="w-12 h-12 text-primary mb-8" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Multi-Platform Ingestion</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Continuously scraping APIs and public firehoses across e-commerce hubs and social media networks before illicit listings are removed by sellers.</p>
            </div>
            
            <div className="p-8 rounded-sm bg-gradient-to-b from-card to-background border border-border hover:border-primary/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <Search className="w-12 h-12 text-primary mb-8" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Natural Language Processing</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Scanning unstructured descriptions for scientific taxonomy, common trade terms, and evolving coded language used by criminal syndicates.</p>
            </div>

            <div className="p-8 rounded-sm bg-gradient-to-b from-card to-background border border-border hover:border-primary/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              <ShieldCheck className="w-12 h-12 text-primary mb-8" strokeWidth={1.5} />
              <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">Actionable Intelligence</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">Classifying listings by confidence score and packaging evidence into secure, archived case files for rapid law enforcement intervention.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Intercept Workflow */}
      <section className="relative z-10 w-full py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-20 text-center">
            <span className="inline-block text-[10px] font-mono uppercase tracking-[0.3em] text-primary border border-primary/30 bg-primary/10 px-4 py-1.5 rounded-full mb-6">Intelligence Pipeline</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase">How An Intercept <br /><span className="text-primary">Actually Works</span></h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">From raw marketplace data to a secured case file in seconds.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-border/30 to-transparent hidden md:block" />
            <div className="space-y-16">
              {([
                { step: '01', side: 'left', icon: '🌐', title: 'Platform Ingestion', body: 'Our crawlers silently monitor 30+ e-commerce platforms and social networks simultaneously, pulling new listings every 60 seconds before they are taken down.', tag: 'Real-time Scraping', isAlert: false },
                { step: '02', side: 'right', icon: '🧬', title: 'Taxonomy Fingerprinting', body: 'Each listing is parsed against CITES scientific databases and criminal trade slang dictionaries. Matches assign a weighted risk score per keyword category.', tag: 'NLP + Species DB', isAlert: false },
                { step: '03', side: 'left', icon: '🎯', title: 'Confidence Scoring', body: 'A logarithmic model combines keyword density, taxonomy hits, and behavioral signals to produce a 0–99% confidence index for each flagged listing.', tag: 'AI Risk Engine', isAlert: true },
                { step: '04', side: 'right', icon: '📁', title: 'Case File Generation', body: 'High-risk intercepts are instantly archived into secure Case Files with evidence capture, seller metadata, and full explanation of AI reasoning.', tag: 'Auto-archived Evidence', isAlert: false },
              ] as const).map((item, i) => (
                <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 group">
                    <div className="relative p-8 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all shadow-xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="flex items-start gap-4 relative z-10">
                        <div className="text-3xl">{item.icon}</div>
                        <div>
                          <span className={`inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border mb-3 ${item.isAlert ? 'text-destructive border-destructive/30 bg-destructive/10' : 'text-primary border-primary/30 bg-primary/10'}`}>{item.tag}</span>
                          <h3 className="text-xl font-black tracking-tight mb-2 uppercase">{item.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 z-10 w-14 h-14 rounded-full border-2 border-primary/50 bg-background flex items-center justify-center shadow-[0_0_20px_-5px_var(--color-primary)] font-black font-mono text-primary text-sm">{item.step}</div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 w-full py-32 px-6 border-t border-border/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-destructive/30 bg-destructive/10 text-destructive text-xs font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
            Every Hour Counts
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-none">
            Wildlife Cannot Wait.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-300 to-primary">Neither Can We.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Every listing that goes undetected is an animal that does not make it home. Join the global enforcement network today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login" className="px-10 py-4 rounded-sm bg-primary border border-primary text-primary-foreground font-black tracking-widest uppercase text-sm transition-all hover:bg-primary/90 shadow-[0_0_30px_-5px_var(--color-primary)] flex items-center justify-center gap-2 group">
              Access Intelligence Matrix <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/mission" className="px-10 py-4 rounded-sm border border-border bg-background/50 hover:bg-accent text-foreground font-bold tracking-widest uppercase text-sm transition-all backdrop-blur-md flex items-center justify-center">
              Our Mission
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border/50 bg-background py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-mono text-muted-foreground">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ShieldAlert className="w-4 h-4 text-primary" />
            AEGIS INTELLIGENCE PLATFORM v1.4.2
          </div>
          <div>
            &copy; {new Date().getFullYear()} Global Conservation Enforcement Network.
          </div>
        </div>
      </footer>
    </div>
  )
}

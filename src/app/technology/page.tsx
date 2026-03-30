'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Database, Search, ShieldCheck, ArrowRight, Server, Activity, ChevronRight } from 'lucide-react'
import PublicNavbar from '@/components/PublicNavbar'

export default function TechnologyPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans">
      <PublicNavbar />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none fixed" />

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="max-w-3xl mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              THE <span className="text-primary">ARCHITECTURE</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              We leverage distributed scraping nodes, fuzzy string matching, and a proprietary wildlife taxonomy matrix to identify illicit commerce faster than humanly possible.
            </p>
          </motion.div>
        </div>

        {/* Technical Pipeline */}
        <div className="space-y-32">
          
          {/* Step 1: Ingestion */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-sm bg-primary/10 border border-primary/20 text-primary uppercase tracking-widest text-xs font-mono">
                <span className="text-primary/50">Phase 01</span>
                <span>/</span>
                <span>Data Ingestion</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Distributed Data Nodes</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Wildlife traffickers use major e-commerce platforms and social networks, but listings are actively policed and rapidly deleted. Our system deploys scraping nodes across various regions to capture unstructured listing data immediately upon publication.
              </p>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> API Firehose Integration</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Headless Browser Automation</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-primary" /> Text Translation & Checksumming</li>
              </ul>
            </div>
            <div className="relative h-80 rounded-lg border border-border/50 bg-sidebar/50 backdrop-blur-md overflow-hidden flex items-center justify-center p-8 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
               <div className="w-full h-full border border-dashed border-border/50 rounded-md relative flex items-center justify-center">
                 <Server className="w-16 h-16 text-primary/40 absolute" />
                 {/* Decorative connecting lines */}
                 <div className="absolute left-0 top-1/2 w-1/4 h-px bg-primary/30" />
                 <div className="absolute right-0 top-1/2 w-1/4 h-px bg-primary/30" />
                 <div className="absolute top-0 left-1/2 w-px h-1/4 bg-primary/30" />
                 <div className="absolute bottom-0 left-1/2 w-px h-1/4 bg-primary/30" />
               </div>
            </div>
          </motion.div>

          {/* Step 2: Detection */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse"
          >
            <div className="order-2 md:order-1 relative h-80 rounded-lg border border-border/50 bg-sidebar/50 backdrop-blur-md overflow-hidden flex items-center justify-center p-8 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent pointer-events-none" />
               <div className="grid grid-cols-2 gap-4 w-full h-full relative z-10">
                 <div className="border border-border/50 bg-background/50 rounded-sm p-4 flex flex-col justify-center">
                   <div className="text-xs uppercase font-mono text-muted-foreground mb-1">Taxonomy Match</div>
                   <div className="font-mono text-amber-500 text-sm">Rhinocerotidae</div>
                 </div>
                 <div className="border border-border/50 bg-background/50 rounded-sm p-4 flex flex-col justify-center">
                   <div className="text-xs uppercase font-mono text-muted-foreground mb-1">Coded Phrase</div>
                   <div className="font-mono text-destructive text-sm">"White Gold"</div>
                 </div>
                 <div className="border border-border/50 bg-background/50 rounded-sm p-4 flex flex-col justify-center">
                   <div className="text-xs uppercase font-mono text-muted-foreground mb-1">Fuzzy Logic</div>
                   <div className="font-mono text-primary text-sm">Pangol1n -&gt; Pangolin</div>
                 </div>
                 <div className="border border-primary/20 bg-primary/5 rounded-sm p-4 flex items-center justify-center">
                   <Search className="w-8 h-8 text-primary/50 animate-pulse" />
                 </div>
               </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-sm bg-amber-500/10 border border-amber-500/20 text-amber-500 uppercase tracking-widest text-xs font-mono">
                <span className="text-amber-500/50">Phase 02</span>
                <span>/</span>
                <span>Natural Language Processing</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">The Detection Matrix</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Traffickers constantly evolve their language to bypass basic filters. Aegis Intel uses a rigorously maintained dictionary of scientific names, common trade terms, and coded phrases. Our engine scores unstructured text against this matrix.
              </p>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-amber-500" /> Fuzzy String Matching</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-amber-500" /> Multi-lingual Support</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-amber-500" /> Evolving Coded Lexicon</li>
              </ul>
            </div>
          </motion.div>

          {/* Step 3: Classification */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-sm bg-destructive/10 border border-destructive/20 text-destructive uppercase tracking-widest text-xs font-mono">
                <span className="text-destructive/50">Phase 03</span>
                <span>/</span>
                <span>Actionable Intelligence</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Risk Triage & Archival</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                When a listing crosses the threshold, it is instantly classified by risk severity. The system generates an immutable 'Case File', preserving evidence even if the original listing is scrubbed from the internet.
              </p>
              <ul className="space-y-3 font-mono text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-destructive" /> 0-100 Confidence Scoring</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-destructive" /> Evidence Archival & Checksums</li>
                <li className="flex items-center gap-2"><ChevronRight className="w-4 h-4 text-destructive" /> Law Enforcement Dashboards</li>
              </ul>
            </div>
            <div className="relative h-80 rounded-lg border border-border/50 bg-sidebar/50 backdrop-blur-md overflow-hidden flex items-center justify-center p-8 shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-bl from-destructive/5 to-transparent pointer-events-none" />
               <div className="w-full max-w-sm border border-destructive/50 bg-background/80 rounded-md p-6 relative">
                 <div className="flex justify-between items-center mb-6">
                   <div className="font-mono text-xs text-muted-foreground">CASE ID: 8F92-A1</div>
                   <div className="px-2 py-0.5 bg-destructive/20 text-destructive text-[10px] uppercase font-bold rounded-sm border border-destructive/30">High Risk</div>
                 </div>
                 <div className="space-y-2 mb-6">
                   <div className="h-2 w-full bg-muted rounded-full" />
                   <div className="h-2 w-4/5 bg-muted rounded-full" />
                   <div className="h-2 w-3/4 bg-muted rounded-full" />
                 </div>
                 <div className="flex items-center gap-4 border-t border-border pt-4">
                   <div className="w-10 h-10 rounded-full border-2 border-destructive flex items-center justify-center text-xs font-bold text-destructive">98%</div>
                   <div className="text-xs text-muted-foreground font-mono">Confidence Threshold Met</div>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  )
}

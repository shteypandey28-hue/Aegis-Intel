'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertOctagon, Heart, Scale, FileWarning, Globe } from 'lucide-react'
import PublicNavbar from '@/components/PublicNavbar'

export default function MissionPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground font-sans">
      <PublicNavbar />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none fixed" />

      <main className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 mb-6 rounded-sm bg-primary/10 border border-primary/20 text-primary uppercase tracking-widest text-xs font-mono">
              <Globe className="w-3 h-3" />
              <span>Global Imperative</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
              STOPPING THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-destructive">SILENT EXTINCTION</span>
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-3xl mx-auto">
              Wildlife trafficking is a $23 billion illicit industry pushing the world's most vulnerable species closer to the brink. It no longer relies solely on back-alley markets; it thrives in plain sight on the internet.
            </p>
          </motion.div>
        </div>

        {/* The Crisis Section */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-8 rounded-md bg-sidebar/50 border border-destructive/20 relative group hover:bg-destructive/10 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-destructive/10 blur-2xl rounded-full" />
            <AlertOctagon className="w-10 h-10 text-destructive mb-6" />
            <h3 className="text-2xl font-bold mb-3 tracking-tight">The Digital Black Market</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Social networks and e-commerce platforms have become massive facilitators for the illegal wildlife trade, exploiting algorithmic reach to connect poachers directly to buyers masked by coded language.
            </p>
          </div>
          
          <div className="p-8 rounded-md bg-sidebar/50 border border-background hover:border-amber-500/30 relative group hover:bg-amber-500/10 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full" />
            <FileWarning className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="text-2xl font-bold mb-3 tracking-tight">The Enforcement Gap</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Human moderators cannot keep up. Listings disappear within hours, and law enforcement agencies are constantly playing catch-up against an overwhelming influx of unstructured multi-lingual data.
            </p>
          </div>

          <div className="p-8 rounded-md bg-sidebar/50 border border-background hover:border-emerald-500/30 relative group hover:bg-emerald-500/10 transition-colors">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full" />
            <Scale className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold mb-3 tracking-tight">AI as the Equalizer</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Scalable, automated detection systems like Aegis Intel level the playing field, triaging tens of millions of listings into highly-confident, actionable intelligence files for immediate intervention.
            </p>
          </div>
        </motion.div>

        {/* Story Section */}
        <motion.div 
          className="relative rounded-lg overflow-hidden border border-border bg-sidebar/50 backdrop-blur-xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent pointer-events-none z-10 hidden md:block" />
          
          <div className="relative z-20 flex-1 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-destructive" />
              <span className="uppercase text-xs font-mono tracking-widest text-muted-foreground">Our Core Purpose</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Built For Conservation</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Elephants slaughtered for ivory. Rhinos poached for horn. Pangolins trafficked for scales. Every illicit listing taken down represents an obstruction to the syndicates threatening these irreplaceable species.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Technology cannot reverse extinction, but intelligent software can cripple the commerce that drives it.
            </p>
            
            <div className="pt-8">
              <div className="inline-flex items-center space-x-2 font-mono text-sm border-b border-primary text-primary pb-1 uppercase tracking-widest">
                <span>The Aegis Initiative</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full relative h-[400px]">
             {/* This could hold an emotionally resonant image, but we'll use an abstract styled box */}
             <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-background to-sidebar rounded-md border border-border/50 flex flex-col items-center justify-center p-8 text-center shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-destructive/40 via-transparent to-transparent"></div>
                
                <h4 className="text-5xl font-black mb-4 font-mono text-white tracking-tighter shadow-sm relative z-10">
                  CRITICAL <br/> STATUS
                </h4>
                <div className="flex flex-wrap items-center justify-center gap-2 relative z-10">
                  <span className="px-3 py-1 bg-background/80 border border-border text-xs uppercase tracking-widest rounded-sm backdrop-blur-md">Pangolin</span>
                  <span className="px-3 py-1 bg-background/80 border border-border text-xs uppercase tracking-widest rounded-sm backdrop-blur-md">Rhinoceros</span>
                  <span className="px-3 py-1 bg-background/80 border border-border text-xs uppercase tracking-widest rounded-sm backdrop-blur-md">Elephant</span>
                  <span className="px-3 py-1 bg-background/80 border border-border text-xs uppercase tracking-widest rounded-sm backdrop-blur-md">Tiger</span>
                </div>
             </div>
          </div>
        </motion.div>

      </main>
      
      <footer className="w-full border-t border-border/50 bg-background py-12 px-6 mt-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs font-mono text-muted-foreground">
          <div>Conservation Enforcement Network</div>
          <div>We do not own the earth, we protect it.</div>
        </div>
      </footer>
    </div>
  )
}

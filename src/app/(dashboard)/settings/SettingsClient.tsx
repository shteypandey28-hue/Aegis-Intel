'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { addKeyword, deleteKeyword } from './actions'
import { Trash2, Plus, Database, AlertOctagon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function SettingsClient({ keywords }: { keywords: any[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    await addKeyword(formData)
    setIsSubmitting(false)
    e.currentTarget.reset()
  }

  const handleDelete = async (id: string) => {
    await deleteKeyword(id)
  }

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12 w-full">
      <div>
        <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
          Deep Matrix Configuration
        </h2>
        <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest mt-1">
          Adjust taxonomy strings and street slang intelligence dictionaries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Panel */}
        <div className="col-span-1 border border-border/50 bg-card/60 backdrop-blur-sm rounded-xl p-6 h-fit shadow-2xl">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-6 uppercase tracking-wider">
            <Plus className="w-5 h-5 text-primary" />
            Inject Identifier
          </h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Target String</label>
              <input name="term" required className="w-full bg-background/50 border border-border/50 rounded-md p-2 text-sm outline-none focus:border-primary transition-colors" placeholder="e.g. Loxodonta, White Gold" />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Classification</label>
              <select name="type" className="w-full bg-background/50 border border-border/50 rounded-md p-2 text-sm outline-none focus:border-primary transition-colors cursor-pointer appearance-none">
                <option value="SCIENTIFIC">Scientific Taxonomy</option>
                <option value="SLANG">Trade Slang</option>
                <option value="CODED_PHRASE">Coded Phrase</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Intelligence Weight (1-5)</label>
              <input type="number" name="riskWeight" min="1" max="5" defaultValue="1" required className="w-full bg-background/50 border border-border/50 rounded-md p-2 text-sm outline-none focus:border-primary transition-colors" />
            </div>

            <button disabled={isSubmitting} className="w-full font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-primary-foreground p-3 rounded-md transition-all shadow-[0_0_15px_-3px_var(--color-primary)] disabled:opacity-50 mt-4">
              {isSubmitting ? 'Syncing...' : 'Deploy Identifier'}
            </button>
          </form>
        </div>

        {/* List Panel */}
        <div className="col-span-2 border border-border/50 bg-card/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl overflow-hidden flex flex-col">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-6 uppercase tracking-wider">
            <Database className="w-5 h-5 text-primary" />
            Active Surveillance Dictionaries
          </h3>
          
          <div className="flex-1 overflow-y-auto pr-2 pb-4 space-y-3">
            <AnimatePresence>
              {keywords.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground font-mono text-sm uppercase tracking-widest">
                  Intelligence Dictionary is Empty.
                </div>
              ) : (
                keywords.map((kw: any) => (
                  <motion.div
                    key={kw.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/30 group hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-lg font-mono tracking-tight text-foreground/90 group-hover:text-primary transition-colors cursor-default">
                          {kw.term}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px] font-mono tracking-widest bg-card border-border px-2 text-muted-foreground">
                            {kw.type}
                          </Badge>
                          <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                            Weight: {kw.riskWeight} <AlertOctagon className="w-3 h-3 text-destructive opacity-50" />
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(kw.id)}
                      className="p-2 rounded-md bg-destructive/10 text-destructive hover:bg-destructive hover:text-white transition-colors opacity-50 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

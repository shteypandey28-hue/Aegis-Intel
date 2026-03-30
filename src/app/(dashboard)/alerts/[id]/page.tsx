import React from 'react'
import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import {
  ArrowLeft, ExternalLink, FileSearch, Fingerprint,
  BrainCircuit, Camera, Globe, Calendar, User, Link as LinkIcon,
  FlaskConical, Leaf, AlertTriangle, Shield
} from 'lucide-react'
import Link from 'next/link'
import { CaseFileClient } from './CaseFileClient'

// Mirror detection.ts constants for categorization
const TAXONOMY_DICT = ['loxodonta', 'panthera', 'rhinocerotidae', 'manis', 'testudines', 'elephantidae']
const SLANG_DICT = ['white gold', 'jelly', 'scales', 'horn', 'ivory', 'tusk', 'blood red', 'turtle shell']

export default async function AlertDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { platform: true },
  })

  if (!listing) notFound()

  // Parse matched words
  let matchedWords: string[] = []
  try { matchedWords = JSON.parse(listing.matchedWords) } catch {}

  // Categorize matched words
  const scientificMatches = matchedWords.filter(w => TAXONOMY_DICT.includes(w.toLowerCase()))
  const slangMatches = matchedWords.filter(w => SLANG_DICT.includes(w.toLowerCase()))
  const codedMatches = matchedWords.filter(w =>
    !TAXONOMY_DICT.includes(w.toLowerCase()) && !SLANG_DICT.includes(w.toLowerCase())
  )

  // Find similar cases
  const similar = await prisma.listing.findMany({
    where: {
      id: { not: id },
      OR: [{ seller: listing.seller }, { platformId: listing.platformId }],
      riskLevel: { in: ['HIGH_RISK', 'SUSPICIOUS'] },
    },
    include: { platform: true },
    orderBy: { confidenceScore: 'desc' },
    take: 4,
  })

  // Serialize dates
  const serializedListing = {
    ...listing,
    postedTime: listing.postedTime.toISOString(),
    createdAt: listing.createdAt.toISOString(),
    updatedAt: listing.updatedAt.toISOString(),
  }
  const serializedSimilar = similar.map((s: typeof similar[0]) => ({
    ...s,
    postedTime: s.postedTime.toISOString(),
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }))

  const riskColor = listing.confidenceScore >= 80
    ? 'text-destructive drop-shadow-[0_0_8px_rgba(225,29,72,0.5)]'
    : 'text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-12">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link href="/alerts" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-2 group transition-colors w-max">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Matrix
        </Link>

        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              {listing.riskLevel === 'HIGH_RISK' ? (
                <Badge className="bg-destructive hover:bg-destructive text-white uppercase tracking-widest px-3 py-1 text-xs font-black shadow-[0_0_15px_-3px_var(--color-destructive)]">Critical Priority</Badge>
              ) : (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white uppercase tracking-widest px-3 py-1 text-xs shadow-sm">Suspicious Activity</Badge>
              )}
              <Badge variant="outline" className="border-primary/50 text-muted-foreground font-mono tracking-wider">
                Platform: {listing.platform.name}
              </Badge>
              <Badge variant="outline" className="border-border/50 text-muted-foreground font-mono tracking-wider text-[10px]">
                CASE: {listing.id.split('-')[0].toUpperCase()}
              </Badge>
            </div>
            <h1 className="text-3xl font-black font-sans leading-tight mt-3 text-foreground/90">{listing.title}</h1>
            <p className="text-sm font-mono text-muted-foreground mt-2 flex items-center gap-4 flex-wrap">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(listing.postedTime).toLocaleString()}</span>
              <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {listing.seller}</span>
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-5 bg-card/40 border border-border/50 rounded-xl backdrop-blur-md relative overflow-hidden group min-w-[110px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">AI Confidence</span>
            <div className="text-5xl font-black tabular-nums tracking-tighter flex items-start gap-1">
              <span className={riskColor}>{listing.confidenceScore}</span>
              <span className="text-2xl text-muted-foreground mt-1">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Action Bar + Notes + Similar Cases (CaseFileClient handles interactive parts) ── */}
      <CaseFileClient
        listing={serializedListing as any}
        similar={serializedSimilar as any}
        matchedWords={matchedWords}
      />

      {/* ══════════════════════════════════════════════════════════════════
          STATIC SERVER-RENDERED SECTIONS BELOW (no interactivity needed)
      ══════════════════════════════════════════════════════════════════ */}

      {/* ── 1. EVIDENCE CAPTURE (Full Structured Panel) ── */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4 flex items-center gap-2">
          <Camera className="w-3.5 h-3.5 text-primary" /> Evidence Capture Record
        </h3>
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider">
              <FileSearch className="w-4 h-4 text-primary" />
              Archived Listing Snapshot
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-0">
            {/* Screenshot Placeholder */}
            <div className="relative w-full h-40 rounded-lg border-2 border-dashed border-border/50 bg-background/30 flex flex-col items-center justify-center mb-6 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-destructive/5" />
              <Camera className="w-8 h-8 text-muted-foreground/30 mb-2" />
              <p className="text-xs font-mono text-muted-foreground/40 uppercase tracking-widest">Screenshot Captured at Intercept</p>
              <p className="text-[10px] font-mono text-muted-foreground/30 mt-1">{new Date(listing.postedTime).toLocaleString()}</p>
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary/10 border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] font-mono text-primary uppercase tracking-widest">Archived</span>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border/30 border border-border/30 rounded-lg overflow-hidden">
              {[
                { icon: Fingerprint, label: 'Archived Title', value: listing.title },
                { icon: User, label: 'Seller Handle', value: listing.seller },
                { icon: Globe, label: 'Platform Source', value: listing.platform.name },
                { icon: Calendar, label: 'Captured Timestamp', value: new Date(listing.postedTime).toLocaleString() },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col gap-1 p-4 bg-background/20">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                    <Icon className="w-3 h-3 text-primary" /> {label}
                  </span>
                  <span className="text-sm font-semibold text-foreground/80 font-mono truncate">{value}</span>
                </div>
              ))}
            </div>

            {/* URL Row */}
            <div className="mt-3 p-4 rounded-lg border border-border/30 bg-background/20 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-1">
                  <LinkIcon className="w-3 h-3 text-primary" /> Original Listing URL
                </span>
                <span className="text-xs font-mono text-muted-foreground/70 break-all">{listing.url}</span>
              </div>
              <a href={listing.url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-primary/30 bg-primary/10 text-primary text-xs font-mono hover:bg-primary/20 transition-colors flex-shrink-0">
                <ExternalLink className="w-3.5 h-3.5" /> Visit Source
              </a>
            </div>

            {/* Archived Description */}
            <div className="mt-3 p-4 rounded-lg border border-border/30 bg-background/20">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-2">Archived Description</span>
              <p className="text-sm font-mono text-foreground/70 leading-relaxed whitespace-pre-wrap border-l-2 border-primary/30 pl-4">
                {/* Highlight matched words in archived text */}
                {listing.description.split(new RegExp(`(${matchedWords.filter(Boolean).join('|')})`, 'gi')).map((part, i) =>
                  matchedWords.some(w => w.toLowerCase() === part.toLowerCase()) ? (
                    <mark key={i} className="bg-destructive/20 text-destructive-foreground px-0.5 rounded-sm border border-destructive/30 font-bold">{part}</mark>
                  ) : <span key={i}>{part}</span>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── 2. DETECTION BREAKDOWN PANEL ── */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4 flex items-center gap-2">
          <BrainCircuit className="w-3.5 h-3.5 text-primary" /> Detection Breakdown
        </h3>
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              Why This Was Flagged
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* Matched Species (Scientific Taxonomy) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Scientific Species Names</span>
              </div>
              <div className="flex flex-wrap gap-2 pl-6">
                {scientificMatches.length > 0 ? scientificMatches.map((w, i) => (
                  <Badge key={i} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono lowercase px-3 py-1 text-xs">
                    {w}
                  </Badge>
                )) : <span className="text-xs font-mono text-muted-foreground/40">None detected</span>}
              </div>
            </div>

            <div className="h-px bg-border/40" />

            {/* Common Trade Names (Slang) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Common Trade Names / Slang</span>
              </div>
              <div className="flex flex-wrap gap-2 pl-6">
                {slangMatches.length > 0 ? slangMatches.map((w, i) => (
                  <Badge key={i} className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono lowercase px-3 py-1 text-xs">
                    {w}
                  </Badge>
                )) : <span className="text-xs font-mono text-muted-foreground/40">None detected</span>}
              </div>
            </div>

            <div className="h-px bg-border/40" />

            {/* Coded / Admin-Configured Keywords */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-destructive" />
                <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Coded Suspicious Phrases</span>
              </div>
              <div className="flex flex-wrap gap-2 pl-6">
                {codedMatches.length > 0 ? codedMatches.map((w, i) => (
                  <Badge key={i} className="bg-destructive/10 text-destructive border border-destructive/30 font-mono lowercase px-3 py-1 text-xs">
                    {w}
                  </Badge>
                )) : <span className="text-xs font-mono text-muted-foreground/40">None detected</span>}
              </div>
            </div>

            <div className="h-px bg-border/40" />

            {/* Final Verdict Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Confidence Score */}
              <div className="p-4 rounded-lg bg-background/30 border border-border/30 text-center">
                <div className="text-3xl font-black tabular-nums">
                  <span className={listing.confidenceScore >= 80 ? 'text-destructive' : 'text-primary'}>
                    {listing.confidenceScore}
                  </span>
                  <span className="text-lg text-muted-foreground">%</span>
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Confidence Score</div>
                <div className="mt-2 w-full h-1.5 bg-border/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${listing.confidenceScore >= 80 ? 'bg-destructive' : 'bg-primary'}`}
                    style={{ width: `${listing.confidenceScore}%` }}
                  />
                </div>
              </div>

              {/* Risk Classification */}
              <div className="p-4 rounded-lg bg-background/30 border border-border/30 text-center flex flex-col items-center justify-center gap-2">
                <Shield className={`w-8 h-8 ${listing.riskLevel === 'HIGH_RISK' ? 'text-destructive' : 'text-amber-400'}`} />
                <div>
                  <div className={`text-sm font-black uppercase tracking-widest ${listing.riskLevel === 'HIGH_RISK' ? 'text-destructive' : 'text-amber-400'}`}>
                    {listing.riskLevel === 'HIGH_RISK' ? 'Critical' : 'Suspicious'}
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5">Risk Classification</div>
                </div>
              </div>

              {/* Total Triggers */}
              <div className="p-4 rounded-lg bg-background/30 border border-border/30 text-center">
                <div className="text-3xl font-black tabular-nums text-primary">{matchedWords.length}</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mt-1">Trigger Words</div>
                <div className="text-xs text-muted-foreground/60 font-mono mt-2">
                  {scientificMatches.length} scientific · {slangMatches.length} slang · {codedMatches.length} coded
                </div>
              </div>
            </div>

            {/* Short Explanation */}
            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-1.5">
                <BrainCircuit className="w-3 h-3 text-primary" /> Engine Explanation
              </div>
              <p className="text-sm font-mono text-foreground/70 leading-relaxed">{listing.explanation}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

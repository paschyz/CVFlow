'use client'
import { motion } from 'motion/react'
import { EASE_BRAND, VIEWPORT } from '@/lib/motion'
import { ScoreRing } from '@/components/common/score-ring'

const skeletonLines = [
  ['w-3/4', 'w-1/2', 'w-5/6'],
  ['w-2/3', 'w-4/5', 'w-1/3'],
]

const greenPills = ['Structure', 'Clarté', 'Impact']
const redPills = ['Trop long', 'Jargon']
const bars = [
  { label: 'Structure', pct: 92 },
  { label: 'Clarté', pct: 78 },
  { label: 'Impact', pct: 85 },
  { label: 'Concision', pct: 64 },
]

export function ProductFrame() {
  return (
    <motion.div
      className="mt-16 max-w-5xl mx-auto relative"
      initial={{ opacity: 0, y: 48, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, delay: 0.45, ease: EASE_BRAND }}
    >
      {/* Halo */}
      <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,rgb(59_130_246/.12),rgb(168_85_247/.06),transparent_70%)] blur-[40px] pointer-events-none" />

      <div className="relative gradient-border rounded-2xl shadow-frame overflow-hidden" role="img" aria-label="Aperçu de l'interface">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-4 h-11 border-b border-hairline bg-surface-base/80" aria-hidden="true">
          <span className="w-3 h-3 rounded-full bg-brand-red/80" />
          <span className="w-3 h-3 rounded-full bg-brand-amber/80" />
          <span className="w-3 h-3 rounded-full bg-brand-green/80" />
          <span className="mx-auto rounded-full bg-surface-deep px-4 py-1 font-mono text-[11px] text-faint">
            cvflow.app/app
          </span>
        </div>

        {/* Body */}
        <div className="grid lg:grid-cols-[0.42fr_0.58fr] bg-surface-card" aria-hidden="true">
          {/* Left */}
          <div className="hidden lg:flex flex-col p-5 gap-4 border-r border-hairline">
            {skeletonLines.map((group, gi) => (
              <div key={gi} className="space-y-2">
                {group.map((w, li) => (
                  <div key={li} className={`h-2 rounded-full bg-faint/25 ${w}`} />
                ))}
              </div>
            ))}
            <div className="rounded-lg border border-brand-green/30 bg-brand-green/5 p-3 mt-auto">
              <div className="h-2 w-2/3 rounded-full bg-brand-green/30" />
              <div className="h-2 w-1/2 rounded-full bg-brand-green/20 mt-2" />
            </div>
          </div>

          {/* Right */}
          <div className="p-5 flex flex-col gap-4">
            {/* Score */}
            <div className="flex items-center gap-4">
              <ScoreRing value={87} color="text-brand-blue" size={80} strokeWidth={6} />
              <div>
                <span className="inline-block rounded-full bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 px-3 py-1 text-xs font-semibold text-brand-blue">
                  Excellent
                </span>
              </div>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {greenPills.map((p) => (
                <span key={p} className="rounded-full bg-brand-green/10 text-brand-green px-2.5 py-0.5 text-xs font-medium">{p}</span>
              ))}
              {redPills.map((p) => (
                <span key={p} className="rounded-full bg-brand-red/10 text-brand-red px-2.5 py-0.5 text-xs font-medium">{p}</span>
              ))}
            </div>

            {/* Bars */}
            <div className="grid grid-cols-2 gap-3">
              {bars.map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-[11px] text-muted-foreground mb-1">
                    <span>{b.label}</span><span>{b.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-hover overflow-hidden">
                    <div className="h-full rounded-full bg-brand-blue" style={{ width: `${b.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendation */}
            <div className="rounded-lg bg-brand-blue/5 border border-brand-blue/20 p-3 text-xs text-muted-foreground">
              <span className="font-medium text-brand-blue">Recommandation : </span>
              Réduisez la section expérience et quantifiez vos résultats.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

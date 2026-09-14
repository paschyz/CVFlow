import { FileCheck, Gauge, PenLine, Zap, BarChart3, Lock } from 'lucide-react'
import { cn } from 'cn'
import { SITE } from '@/content/site'
import { Reveal } from '@/components/landing/reveal'
import { ScoreRing } from '@/components/common/score-ring'

const iconMap = { FileCheck, Gauge, PenLine, Zap, BarChart3, Lock } as const

const spans = ['lg:col-span-2', 'lg:row-span-2', '', '', '', '']

const greenPills = ['Structure', 'Clarté', 'Impact', 'Concision', 'Pertinence']
const redPills = ['Trop long', 'Jargon', 'Vague', 'Redondant']

function VisualPills() {
  return (
    <div className="flex flex-wrap gap-1.5">
      {greenPills.map((p) => (
        <span key={p} className="rounded-full bg-brand-green/10 text-brand-green px-2 py-0.5 text-[10px]">{p}</span>
      ))}
      {redPills.map((p) => (
        <span key={p} className="rounded-full bg-brand-red/10 text-brand-red px-2 py-0.5 text-[10px]">{p}</span>
      ))}
    </div>
  )
}

function VisualScore() {
  const bars = [
    { label: 'Structure', pct: 92 },
    { label: 'Clarté', pct: 78 },
    { label: 'Impact', pct: 85 },
    { label: 'Concision', pct: 64 },
  ]
  return (
    <div className="flex items-start gap-4">
      <ScoreRing value={87} color="text-brand-blue" size={80} strokeWidth={6} className="shrink-0" />
      <div className="flex-1 space-y-2">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="flex justify-between text-[10px] text-muted-foreground mb-0.5">
              <span>{b.label}</span><span>{b.pct}%</span>
            </div>
            <div className="h-1 rounded-full bg-surface-hover overflow-hidden">
              <div className="h-full rounded-full bg-brand-blue" style={{ width: `${b.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function VisualRewrite() {
  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="rounded-lg bg-brand-red/5 border border-brand-red/20 px-3 py-2">
        <span className="line-through text-brand-red/70">Responsable de la gestion des projets</span>
      </div>
      <div className="rounded-lg bg-brand-green/5 border border-brand-green/20 px-3 py-2">
        <span className="text-brand-green">Piloté 12 projets (+30% d&apos;efficacité)</span>
      </div>
    </div>
  )
}

function VisualConsole() {
  return (
    <div className="bg-surface-deep rounded-xl p-3 font-mono text-xs text-brand-cyan">
      <span className="text-faint">{'>'} </span>Analyse en cours...
      <br />
      <span className="text-faint">{'>'} </span>Score global : <span className="text-brand-green">87/100</span>
      <br />
      <span className="text-faint">{'>'} </span>Points forts détectés<span className="cursor-blink">_</span>
    </div>
  )
}

function VisualBars() {
  const segments = [
    { label: 'Tech', pct: 45 },
    { label: 'Finance', pct: 60 },
    { label: 'Marketing', pct: 72 },
    { label: 'Votre CV', pct: 85 },
  ]
  return (
    <div className="space-y-2">
      {segments.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2 text-[10px]">
          <span className="w-16 text-muted-foreground truncate">{s.label}</span>
          <div className="flex-1 h-1.5 rounded-full bg-surface-hover overflow-hidden">
            <div
              className={cn('h-full rounded-full', i === segments.length - 1 ? 'bg-brand-blue' : 'bg-faint/40')}
              style={{ width: `${s.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

function VisualKey() {
  return (
    <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
      <Lock className="size-3 text-brand-purple" />
      <span>sk-•••••••••••••••</span>
      <span className="text-faint">·</span>
      <span className="text-brand-green text-[10px]">localStorage ✓</span>
    </div>
  )
}

const visuals: Record<string, () => React.JSX.Element> = {
  pills: VisualPills,
  score: VisualScore,
  rewrite: VisualRewrite,
  console: VisualConsole,
  bars: VisualBars,
  key: VisualKey,
}

export function BentoFeatures() {
  return (
    <section id="features" className="py-28 px-5 bg-surface-base/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-brand-blue">FONCTIONNALITÉS</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Tout pour un CV parfait
            <br />
            <span className="text-subtle">en une seule analyse.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr mt-16">
          {SITE.features.map((feat, i) => {
            const Icon = iconMap[feat.icon as keyof typeof iconMap]
            const Visual = visuals[feat.visual]
            return (
              <Reveal key={feat.title} delay={i * 0.08}>
                <div className={cn(
                  'group relative overflow-hidden rounded-2xl bg-surface-card border border-hairline p-6 hover:border-hairline-hover transition-all duration-300 h-full flex flex-col',
                  spans[i]
                )}>
                  <Icon className={`w-4 h-4 text-${feat.color}`} />
                  <h3 className="text-base font-semibold mt-3">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">{feat.description}</p>
                  <div className="mt-4 flex-1">
                    {Visual && <Visual />}
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

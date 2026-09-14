'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import { Sparkles, ArrowRight } from 'lucide-react'
import { SITE } from '@/content/site'
import { EASE_BRAND } from '@/lib/motion'
import { Button } from '@/components/ui/button'
import { GeminiIcon, ClaudeIcon, OpenAIIcon } from '@/components/common/brand-icons'

const VIEWPORT = { once: true, amount: 0.2 as const }

function anim(i: number) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.6, ease: EASE_BRAND, delay: i * 0.12 },
  }
}

const providers = [
  { name: 'Gemini', Icon: GeminiIcon, sub: 'Gratuit' },
  { name: 'Claude', Icon: ClaudeIcon, sub: 'Pro' },
  { name: 'OpenAI', Icon: OpenAIIcon, sub: 'Pro' },
] as const

function highlightWord(line: string, word: string) {
  const idx = line.indexOf(word)
  if (idx === -1) return line
  return (
    <>
      {line.slice(0, idx)}
      <span className="gradient-text">{word}</span>
      {line.slice(idx + word.length)}
    </>
  )
}

const particles = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 41 + 17) % 100,
  y: (i * 29 + 11) % 90,
  size: 1 + (i % 3),
  duration: 5 + (i % 5) * 2,
  delay: (i * 0.7) % 6,
  opacity: 0.08 + (i % 4) * 0.07,
}))

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative pt-36 pb-20 px-5 overflow-hidden noise">
      {/* Aurora */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none aurora"
        style={{
          background: 'radial-gradient(ellipse at center, rgb(59 130 246 / .16) 0%, rgb(168 85 247 / .07) 45%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Line grid */}
      <div className="absolute inset-0 bg-line-grid mask-fade-bottom pointer-events-none" />
      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-brand-blue particle pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div {...anim(0)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-card/80 px-4 py-1.5">
            <Sparkles className="size-3.5 text-brand-blue" />
            <span className="font-mono text-xs tracking-[0.2em] text-brand-blue">{SITE.hero.eyebrow}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/10 px-2 py-0.5 text-[10px] font-medium text-brand-green">
              <span className="size-1.5 rounded-full bg-brand-green" />
              {SITE.hero.badge}
            </span>
          </span>
        </motion.div>

        {/* Provider pills */}
        <motion.div {...anim(1)} className="mt-5 flex flex-wrap justify-center gap-3">
          {providers.map(({ name, Icon, sub }) => (
            <span key={name} className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-card/60 px-3 py-1.5 text-sm">
              <span className="w-6 h-6 rounded-lg bg-surface-hover flex items-center justify-center">
                <Icon className="size-3.5" />
              </span>
              <span className="font-medium">{name}</span>
              <span className="text-xs text-muted-foreground">{sub}</span>
            </span>
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1 {...anim(2)} id="hero-heading"
          className="text-[2.6rem] sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mt-8"
        >
          {highlightWord(SITE.hero.headline[0], SITE.hero.highlight)}
          <br />
          {highlightWord(SITE.hero.headline[1], SITE.hero.highlight)}
        </motion.h1>

        {/* Sub */}
        <motion.p {...anim(3)}
          className="mt-6 text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto"
        >
          {SITE.hero.sub}{' '}
          <span className="text-foreground font-medium">{SITE.hero.emphasis}</span>
        </motion.p>

        {/* CTAs */}
        <motion.div {...anim(4)} className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="glow" size="xl" className="rounded-full" render={<Link href="/app" />}>
            {SITE.ctaPrimary}
            <ArrowRight className="size-4 ml-2" />
          </Button>
          <Button variant="ghost" size="xl" className="border border-hairline rounded-full" render={<a href="#how-it-works" />}>
            {SITE.ctaSecondary}
          </Button>
        </motion.div>

        {/* Micro */}
        <motion.p {...anim(5)} className="mt-6 text-xs text-subtle">
          {SITE.hero.micro}
        </motion.p>
      </div>
    </section>
  )
}

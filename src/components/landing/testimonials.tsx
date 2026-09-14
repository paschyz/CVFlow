'use client'
import { Star } from 'lucide-react'
import { SITE } from '@/content/site'

function TestimonialCard({ t }: { t: typeof SITE.testimonials[number] }) {
  return (
    <figure className="w-[300px] sm:w-[380px] shrink-0 rounded-2xl bg-surface-card border border-hairline p-5">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, j) => (
          <Star key={j} className="w-3.5 h-3.5 fill-brand-amber text-brand-amber" />
        ))}
      </div>
      <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {t.quote}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-[10px] font-bold text-white">
          {t.initials}
        </span>
        <div>
          <p className="text-sm font-medium text-foreground">{t.name}</p>
          <p className="text-xs text-subtle">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  )
}

function MarqueeRow({ items, duration, reverse }: {
  items: typeof SITE.testimonials[number][]; duration: string; reverse?: boolean
}) {
  return (
    <div className="marquee-row overflow-hidden">
      <div
        className={`animate-marquee flex w-max gap-4 pr-4 ${reverse ? 'marquee-reverse' : ''}`}
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        {items.map((t, i) => <TestimonialCard key={i} t={t} />)}
        {items.map((t, i) => (
          <div key={`dup-${i}`} aria-hidden="true">
            <TestimonialCard t={t} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  const row1 = SITE.testimonials.slice(0, 4)
  const row2 = SITE.testimonials.slice(4, 8)

  return (
    <section className="py-28 overflow-hidden relative">
      {/* Background halo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_50%,rgb(168_85_247/.05),transparent_70%)] pointer-events-none" />

      <div className="relative space-y-4">
        <MarqueeRow items={row1} duration="38s" />
        <MarqueeRow items={row2} duration="46s" reverse />
      </div>

      {/* Edge masks */}
      <div className="absolute inset-y-0 left-0 w-10 sm:w-40 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute inset-y-0 right-0 w-10 sm:w-40 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />
    </section>
  )
}

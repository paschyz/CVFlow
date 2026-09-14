import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SITE } from '@/content/site'
import { Reveal } from '@/components/landing/reveal'
import { Button } from '@/components/ui/button'

export function FinalCta() {
  return (
    <section className="py-32 px-5 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_65%_at_50%_100%,rgb(59_130_246/.18),rgb(168_85_247/.06)_50%,transparent_75%)] pointer-events-none" />
      <div className="absolute inset-0 bg-dot-grid opacity-40 mask-fade-bottom pointer-events-none" />

      <Reveal className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.08]">
          {SITE.finalCta.headline[0]}
          <br />
          <span className="shimmer-text">{SITE.finalCta.headline[1]}</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
          {SITE.finalCta.sub}
        </p>
        <Button variant="glow" size="2xl" className="rounded-full mt-10" render={<Link href="/app" />}>
          {SITE.ctaPrimary}
          <ArrowRight className="size-5 ml-2" />
        </Button>
        <p className="mt-5 text-xs text-subtle">{SITE.finalCta.micro}</p>
      </Reveal>
    </section>
  )
}

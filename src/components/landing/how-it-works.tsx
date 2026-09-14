import { Key, Upload, BarChart3 } from 'lucide-react'
import { SITE } from '@/content/site'
import { Reveal } from '@/components/landing/reveal'

const icons = [Key, Upload, BarChart3]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-brand-blue">COMMENT &Ccedil;A MARCHE</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Trois étapes simples
            <br />
            <span className="text-subtle">pour un CV optimisé.</span>
          </h2>
        </div>

        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-[4.5rem] left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />

          {SITE.steps.map((step, i) => {
            const Icon = icons[i]
            return (
              <li key={step.step}>
                <Reveal delay={i * 0.12}>
                  <div className="relative rounded-2xl bg-surface-card border border-hairline p-7 h-full hover:border-hairline-hover hover:bg-surface-hover hover:-translate-y-1 transition-all duration-300">
                    <span className="absolute top-5 right-6 font-mono text-xs text-faint" aria-hidden="true">
                      {step.step}
                    </span>
                    <div className="w-14 h-14 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center mb-4 transition-transform hover:scale-110">
                      <Icon className="size-6 text-brand-blue" />
                    </div>
                    <h3 className="text-base font-semibold mt-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.description}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

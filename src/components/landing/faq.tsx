'use client'
import { SITE } from '@/content/site'
import { Reveal } from '@/components/landing/reveal'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'

export function Faq() {
  return (
    <section id="faq" className="py-28 px-5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-brand-blue">FAQ</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight">
            Questions fréquentes
          </h2>
        </div>

        <Reveal className="mt-16">
          <Accordion className="border-t border-hairline">
            {SITE.faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-hairline">
                <AccordionTrigger className="py-5 text-base font-medium hover:text-brand-blue transition-colors [&:hover]:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}

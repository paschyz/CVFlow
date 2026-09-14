'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from 'cn'
import { SITE } from '@/content/site'
import { BrandLogo } from '@/components/common/brand-logo'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'bg-background/75 backdrop-blur-xl border-hairline'
          : 'bg-transparent border-transparent'
      )}
    >
      <nav aria-label="Principale" className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <BrandLogo />

        <div className="hidden md:flex gap-8">
          {SITE.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="pill" render={<Link href="/app" />} className="group gap-2">
            {SITE.ctaPrimary}
            <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>
      </nav>
    </header>
  )
}

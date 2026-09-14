import Link from 'next/link'
import { cn } from 'cn'

const sizes = {
  sm: { icon: 20, text: 'text-sm' },
  md: { icon: 28, text: 'text-lg' },
  lg: { icon: 36, text: 'text-xl' },
} as const

export function BrandLogo({
  size = 'md',
  withWordmark = true,
  className,
}: {
  size?: 'sm' | 'md' | 'lg'
  withWordmark?: boolean
  className?: string
}) {
  const s = sizes[size]
  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="20" height="26" rx="3" stroke="currentColor" strokeWidth="2.2" />
        <path d="M9 12h8M9 17h10M9 22h6" stroke="var(--brand-blue)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="24" cy="8" r="7" fill="var(--brand-blue)" />
        <path d="M21.5 8l2 2 3.5-3.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {withWordmark && (
        <span className={cn('font-bold', s.text)}>
          <span className="text-foreground">CV</span>
          <span className="gradient-text">Flow</span>
        </span>
      )}
    </Link>
  )
}

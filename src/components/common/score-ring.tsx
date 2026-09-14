'use client'

import { useRef } from 'react'
import { useInView } from 'motion/react'
import { cn } from 'cn'

export function ScoreRing({
  value,
  color = 'text-brand-blue',
  size = 120,
  strokeWidth = 9,
  className,
}: {
  value: number
  color?: string
  size?: number
  strokeWidth?: number
  className?: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })

  const r = (size - strokeWidth) / 2
  const C = 2 * Math.PI * r

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--hairline)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          className={color}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={inView ? C * (1 - value / 100) : C}
          style={{
            transition: 'stroke-dashoffset 1.4s ease-out',
            filter: 'drop-shadow(0 0 10px rgb(59 130 246 / .45))',
          }}
        />
      </svg>
      <span className="absolute font-mono font-bold">
        {value}%
      </span>
    </div>
  )
}

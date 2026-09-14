'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView, useReducedMotion } from 'motion/react'
import { cn } from 'cn'

export function CountUp({
  value,
  suffix,
  duration = 1200,
  className,
}: {
  value: number
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (prefersReduced) {
      setDisplay(value)
      return
    }

    let raf: number
    const start = performance.now()

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - (1 - p) ** 3 // easeOutCubic
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration, prefersReduced])

  return (
    <span ref={ref} className={cn('tabular-nums', className)} aria-live="off">
      {display}
      {suffix && <span className="gradient-text">{suffix}</span>}
    </span>
  )
}

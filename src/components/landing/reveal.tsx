'use client'
import { motion, useReducedMotion } from 'motion/react'
import { REVEAL, VIEWPORT } from '@/lib/motion'

export function Reveal({ children, delay = 0, y = 28, className }: {
  children: React.ReactNode; delay?: number; y?: number; className?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT} transition={{ ...REVEAL, delay }}>
      {children}
    </motion.div>
  )
}

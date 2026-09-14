export const EASE_BRAND = [0.21, 0.47, 0.32, 0.98] as const

export const fadeUp = {
  hidden: (y = 28) => ({ opacity: 0, y }),
  visible: { opacity: 1, y: 0 },
}

export const REVEAL = { duration: 0.6, ease: EASE_BRAND } as const
export const VIEWPORT = { once: true, amount: 0.2 } as const
export const STAGGER = 0.12
export const STAGGER_CARDS = 0.08

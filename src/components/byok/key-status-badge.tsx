'use client'

import { Badge } from '@/components/ui/badge'
import { cn } from 'cn'
import type { KeyStatus } from '@/hooks/use-api-key'

const STATUS_CONFIG: Record<KeyStatus, { label: string; className: string }> = {
  absent: { label: 'Non configurée', className: 'bg-muted text-muted-foreground' },
  untested: { label: 'À tester', className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
  valid: { label: 'Valide', className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
  invalid: { label: 'Invalide', className: 'bg-red-500/10 text-red-600 dark:text-red-400' },
}

export function KeyStatusBadge({ status }: { status: KeyStatus }) {
  const { label, className } = STATUS_CONFIG[status]
  return <Badge className={cn(className)}>{label}</Badge>
}

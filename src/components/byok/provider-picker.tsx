'use client'

import { cn } from 'cn'
import type { ProviderId } from '@/lib/ai/types'
import { PROVIDER_ORDER, PROVIDERS } from '@/lib/ai/registry'
import { GeminiIcon, ClaudeIcon, OpenAIIcon } from '@/components/common/brand-icons'

const ICONS: Record<ProviderId, React.FC<{ className?: string }>> = {
  gemini: GeminiIcon,
  anthropic: ClaudeIcon,
  openai: OpenAIIcon,
}

export function ProviderPicker({
  value,
  onChange,
}: {
  value: ProviderId
  onChange: (id: ProviderId) => void
}) {
  return (
    <div role="radiogroup" aria-label="Fournisseur d'IA" className="flex gap-2">
      {PROVIDER_ORDER.map((id) => {
        const p = PROVIDERS[id]
        const Icon = ICONS[id]
        const selected = id === value
        return (
          <button
            key={id}
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(id)}
            className={cn(
              'flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
              selected
                ? 'border-brand-blue bg-brand-blue/10'
                : 'border-hairline hover:border-hairline-hover',
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="font-medium">{p.label}</span>
            <span
              className={cn(
                'ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-semibold',
                p.isFreeTier
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
              )}
            >
              {p.isFreeTier ? 'Gratuit' : 'Pro'}
            </span>
          </button>
        )
      })}
    </div>
  )
}

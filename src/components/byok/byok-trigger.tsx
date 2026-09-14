'use client'

import { Button } from '@/components/ui/button'
import { ApiKeyDialog } from './api-key-dialog'
import { KeyStatusBadge } from './key-status-badge'
import { useApiKey } from '@/hooks/use-api-key'
import { useAppStore } from '@/store/use-app-store'
import { PROVIDERS } from '@/lib/ai/registry'
import { GeminiIcon, ClaudeIcon, OpenAIIcon } from '@/components/common/brand-icons'
import { KeyRound } from 'lucide-react'
import type { ProviderId } from '@/lib/ai/types'

const ICONS: Record<ProviderId, React.FC<{ className?: string }>> = {
  gemini: GeminiIcon,
  anthropic: ClaudeIcon,
  openai: OpenAIIcon,
}

export function ByokTrigger() {
  const { provider } = useAppStore()
  const { status } = useApiKey(provider)
  const Icon = ICONS[provider]

  return (
    <ApiKeyDialog>
      <Button variant="outline" size="sm" className="gap-1.5">
        <Icon className="size-4" />
        <span className="hidden sm:inline">{PROVIDERS[provider].vendor}</span>
        <KeyStatusBadge status={status} />
      </Button>
    </ApiKeyDialog>
  )
}

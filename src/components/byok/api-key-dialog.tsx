'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ProviderPicker } from './provider-picker'
import { ApiKeyField } from './api-key-field'
import { KeyStatusBadge } from './key-status-badge'
import { useApiKey } from '@/hooks/use-api-key'
import { useAppStore } from '@/store/use-app-store'
import { PROVIDERS } from '@/lib/ai/registry'
import { ExternalLink } from 'lucide-react'

export function ApiKeyDialog({ children }: { children: React.ReactNode }) {
  const { provider, setProvider } = useAppStore()
  const { key, setKey, removeKey, status, validate, validating } = useApiKey(provider)
  const meta = PROVIDERS[provider]

  return (
    <Dialog>
      <DialogTrigger render={<>{children}</>} />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Clé API</DialogTitle>
          <DialogDescription>
            Configurez votre clé pour utiliser l&apos;IA.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <ProviderPicker value={provider} onChange={setProvider} />

          <ApiKeyField
            apiKey={key}
            onKeyChange={setKey}
            onValidate={validate}
            onRemove={removeKey}
            status={status}
            validating={validating}
            keyPattern={meta.keyPattern}
            placeholder={meta.keyPlaceholder}
          />

          <div className="flex items-center justify-between">
            <a
              href={meta.consoleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Obtenir une clé <ExternalLink className="size-3" />
            </a>
            <KeyStatusBadge status={status} />
          </div>

          <p className="text-xs text-muted-foreground">
            Votre clé est stockée uniquement dans votre navigateur.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

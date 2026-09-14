'use client'

import { useAppStore } from '@/store/use-app-store'
import { useAiStream } from '@/hooks/use-ai-stream'
import { useApiKey } from '@/hooks/use-api-key'
import { BrandLogo } from '@/components/common/brand-logo'
import { ThemeToggle } from '@/components/common/theme-toggle'
import { StreamConsole } from '@/components/common/stream-console'
import { ByokTrigger } from '@/components/byok/byok-trigger'
import { Button } from '@/components/ui/button'
import { Send } from 'lucide-react'

export default function AppPage() {
  const { provider, prompt, setPrompt, output, isStreaming } = useAppStore()
  const { key, status } = useApiKey(provider)
  const { stream, abort } = useAiStream()
  const canSubmit = status === 'valid' && prompt.trim() && !isStreaming

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canSubmit) stream(prompt, key)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-8 flex items-center justify-between">
        <BrandLogo size="sm" />
        <div className="flex items-center gap-2">
          <ByokTrigger />
          <ThemeToggle />
        </div>
      </header>

      {status !== 'valid' && (
        <p className="mb-4 text-sm text-muted-foreground">
          Configurez votre clé API pour commencer.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Votre prompt…"
          rows={4}
          className="w-full resize-y rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <div className="flex gap-2">
          <Button type="submit" disabled={!canSubmit} className="gap-1.5">
            <Send className="size-4" />
            Envoyer
          </Button>
          {isStreaming && (
            <Button type="button" variant="outline" onClick={abort}>
              Arrêter
            </Button>
          )}
        </div>
      </form>

      <StreamConsole content={output} isStreaming={isStreaming} />
    </div>
  )
}

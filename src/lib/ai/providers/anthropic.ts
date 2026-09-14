import type { AIProvider, StreamOptions, ValidationResult } from '../types'
import { AIError, normalizeProviderError } from '../errors'
import { parseSSE } from '../sse'

export const anthropic: AIProvider = {
  id: 'anthropic',
  label: 'Claude Sonnet',
  vendor: 'Anthropic',
  defaultModel: 'claude-sonnet-4-6',
  models: ['claude-sonnet-4-6', 'claude-haiku-4-5-20251001'],
  keyPlaceholder: 'sk-ant-api03-…',
  keyPattern: /^sk-ant-[\w-]{20,}$/,
  consoleUrl: 'https://console.anthropic.com/settings/keys',
  isFreeTier: false,

  async *stream(prompt: string, options: StreamOptions): AsyncIterable<string> {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': options.apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model ?? this.defaultModel,
        max_tokens: options.maxTokens ?? 2048,
        temperature: options.temperature ?? 0.7,
        stream: true,
        ...(options.system ? { system: options.system } : {}),
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: options.signal,
    }).catch(err => { throw normalizeProviderError(err, 'anthropic') })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw normalizeProviderError(new Error(text), 'anthropic', res.status)
    }

    for await (const { event, data } of parseSSE(res.body!)) {
      if (event === 'content_block_delta') {
        try {
          const parsed = JSON.parse(data)
          const text = parsed?.delta?.text
          if (text) yield text
        } catch { /* skip */ }
      }
    }
  },

  async validate(apiKey: string, signal?: AbortSignal): Promise<ValidationResult> {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 1,
          messages: [{ role: 'user', content: 'hi' }],
        }),
        signal,
      })
      if (res.ok) return { valid: true }
      throw normalizeProviderError(new Error(), 'anthropic', res.status)
    } catch (err) {
      if (err instanceof AIError) return { valid: false, code: err.code, detail: err.message }
      return { valid: false, code: 'NETWORK', detail: 'Impossible de joindre Anthropic.' }
    }
  },
}

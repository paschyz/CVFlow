import type { AIProvider, StreamOptions, ValidationResult } from '../types'
import { AIError, normalizeProviderError } from '../errors'
import { parseSSE } from '../sse'

export const openai: AIProvider = {
  id: 'openai',
  label: 'GPT-4o mini',
  vendor: 'OpenAI',
  defaultModel: 'gpt-4o-mini',
  models: ['gpt-4o-mini', 'gpt-4o', 'gpt-4.1-nano'],
  keyPlaceholder: 'sk-proj-…',
  keyPattern: /^sk-[\w-]{20,}$/,
  consoleUrl: 'https://platform.openai.com/api-keys',
  isFreeTier: false,

  async *stream(prompt: string, options: StreamOptions): AsyncIterable<string> {
    const messages: Array<{ role: string; content: string }> = []
    if (options.system) messages.push({ role: 'system', content: options.system })
    messages.push({ role: 'user', content: prompt })

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${options.apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: options.model ?? this.defaultModel,
        stream: true,
        max_tokens: options.maxTokens ?? 2048,
        temperature: options.temperature ?? 0.7,
        messages,
      }),
      signal: options.signal,
    }).catch(err => { throw normalizeProviderError(err, 'openai') })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw normalizeProviderError(new Error(text), 'openai', res.status)
    }

    for await (const { data } of parseSSE(res.body!)) {
      if (data === '[DONE]') break
      try {
        const parsed = JSON.parse(data)
        const text = parsed?.choices?.[0]?.delta?.content
        if (text) yield text
      } catch { /* skip */ }
    }
  },

  async validate(apiKey: string, signal?: AbortSignal): Promise<ValidationResult> {
    try {
      const res = await fetch('https://api.openai.com/v1/models', {
        headers: { authorization: `Bearer ${apiKey}` },
        signal,
      })
      if (res.ok) return { valid: true }
      throw normalizeProviderError(new Error(), 'openai', res.status)
    } catch (err) {
      if (err instanceof AIError) return { valid: false, code: err.code, detail: err.message }
      return { valid: false, code: 'NETWORK', detail: 'Impossible de joindre OpenAI.' }
    }
  },
}

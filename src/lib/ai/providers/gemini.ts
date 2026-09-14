import type { AIProvider, StreamOptions, ValidationResult } from '../types'
import { AIError, normalizeProviderError } from '../errors'
import { parseSSE } from '../sse'

export const gemini: AIProvider = {
  id: 'gemini',
  label: 'Gemini 2.5 Flash',
  vendor: 'Google',
  defaultModel: 'gemini-2.5-flash',
  models: ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'],
  keyPlaceholder: 'AIza…',
  keyPattern: /^AIza[\w-]{30,}$/,
  consoleUrl: 'https://aistudio.google.com/apikey',
  isFreeTier: true,

  async *stream(prompt: string, options: StreamOptions): AsyncIterable<string> {
    const model = options.model ?? this.defaultModel
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`

    const body: Record<string, unknown> = {
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: options.maxTokens ?? 2048,
        temperature: options.temperature ?? 0.7,
      },
    }
    if (options.system) {
      body.systemInstruction = { parts: [{ text: options.system }] }
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'x-goog-api-key': options.apiKey, 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: options.signal,
    }).catch(err => { throw normalizeProviderError(err, 'gemini') })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw normalizeProviderError(new Error(text), 'gemini', res.status)
    }

    for await (const { data } of parseSSE(res.body!)) {
      try {
        const parsed = JSON.parse(data)
        const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) yield text
      } catch { /* skip malformed chunks */ }
    }
  },

  async validate(apiKey: string, signal?: AbortSignal): Promise<ValidationResult> {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
        { signal },
      )
      if (res.ok) return { valid: true }
      throw normalizeProviderError(new Error(), 'gemini', res.status)
    } catch (err) {
      if (err instanceof AIError) return { valid: false, code: err.code, detail: err.message }
      return { valid: false, code: 'NETWORK', detail: 'Impossible de joindre Google AI.' }
    }
  },
}

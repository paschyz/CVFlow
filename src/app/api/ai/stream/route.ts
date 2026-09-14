import { NextRequest } from 'next/server'
import { streamRequestSchema } from '@/lib/schemas'
import { getProvider } from '@/lib/ai/registry'
import { encodeSSE } from '@/lib/ai/sse'
import { normalizeProviderError } from '@/lib/ai/errors'
import { redact } from '@/lib/redact'
import type { ProviderId } from '@/lib/ai/types'

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key')
  if (!apiKey) {
    return Response.json({ error: 'API key required' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = streamRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error }, { status: 400 })
  }

  const { provider: providerId, prompt, model, system, maxTokens, temperature } = parsed.data
  const provider = getProvider(providerId)
  const controller = new AbortController()

  req.signal.addEventListener('abort', () => controller.abort())

  const stream = new ReadableStream({
    async start(ctrl) {
      try {
        for await (const text of provider.stream(prompt, {
          apiKey,
          model,
          system,
          maxTokens,
          temperature,
          signal: controller.signal,
        })) {
          ctrl.enqueue(encodeSSE('token', { text }))
        }
        ctrl.enqueue(encodeSSE('done', { reason: 'complete' }))
      } catch (err) {
        const aiErr = normalizeProviderError(err, providerId as ProviderId)
        ctrl.enqueue(encodeSSE('error', { code: aiErr.code, status: aiErr.status, message: aiErr.message }))
        console.error('[ai/stream]', redact(aiErr.message))
      } finally {
        ctrl.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache, no-store',
      'connection': 'keep-alive',
      'x-content-type-options': 'nosniff',
    },
  })
}

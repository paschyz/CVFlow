import { describe, it, expect } from 'vitest'
import { encodeSSE, parseSSE } from '@/lib/ai/sse'

describe('encodeSSE', () => {
  it('produces correct SSE format', () => {
    const bytes = encodeSSE('token', { text: 'hello' })
    const text = new TextDecoder().decode(bytes)
    expect(text).toBe('event: token\ndata: {"text":"hello"}\n\n')
  })
})

describe('parseSSE', () => {
  function makeStream(chunks: string[]): ReadableStream<Uint8Array> {
    const encoder = new TextEncoder()
    return new ReadableStream({
      start(ctrl) {
        for (const chunk of chunks) ctrl.enqueue(encoder.encode(chunk))
        ctrl.close()
      },
    })
  }

  it('handles complete events', async () => {
    const stream = makeStream(['event: token\ndata: {"text":"hi"}\n\n'])
    const events = []
    for await (const e of parseSSE(stream)) events.push(e)
    expect(events).toEqual([{ event: 'token', data: '{"text":"hi"}' }])
  })

  it('handles chunks split mid-event', async () => {
    const full = 'event: token\ndata: {"text":"split"}\n\n'
    const mid = Math.floor(full.length / 2)
    const stream = makeStream([full.slice(0, mid), full.slice(mid)])
    const events = []
    for await (const e of parseSSE(stream)) events.push(e)
    expect(events).toEqual([{ event: 'token', data: '{"text":"split"}' }])
  })

  it('handles empty data gracefully', async () => {
    const stream = makeStream(['\n\n'])
    const events = []
    for await (const e of parseSSE(stream)) events.push(e)
    expect(events).toEqual([])
  })
})

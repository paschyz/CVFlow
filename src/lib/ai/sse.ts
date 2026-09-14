const encoder = new TextEncoder()
const decoder = new TextDecoder()

export function encodeSSE(event: string, data: unknown): Uint8Array {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
}

export async function* parseSSE(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<{ event: string; data: string }> {
  const reader = stream.getReader()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      const parts = buffer.split('\n\n')
      buffer = parts.pop() ?? ''

      for (const part of parts) {
        if (!part.trim()) continue
        let event = 'message'
        let data = ''
        for (const line of part.split('\n')) {
          if (line.startsWith('event: ')) event = line.slice(7).trim()
          else if (line.startsWith('data: ')) data = line.slice(6)
          else if (line.startsWith('data:')) data = line.slice(5)
        }
        if (data) yield { event, data }
      }
    }

    if (buffer.trim()) {
      let event = 'message'
      let data = ''
      for (const line of buffer.split('\n')) {
        if (line.startsWith('event: ')) event = line.slice(7).trim()
        else if (line.startsWith('data: ')) data = line.slice(6)
        else if (line.startsWith('data:')) data = line.slice(5)
      }
      if (data) yield { event, data }
    }
  } finally {
    reader.releaseLock()
  }
}

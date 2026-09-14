'use client'
import { useRef, useCallback } from 'react'
import { useAppStore } from '@/store/use-app-store'
import { toast } from 'sonner'

export function useAiStream() {
  const abortRef = useRef<AbortController | null>(null)
  const { provider, appendOutput, clearOutput, setStreaming } = useAppStore()

  const stream = useCallback(async (prompt: string, apiKey: string) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    clearOutput()
    setStreaming(true)

    try {
      const res = await fetch('/api/ai/stream', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify({ provider, prompt }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ message: 'Erreur inconnue' }))
        toast.error(err.message ?? 'Erreur de streaming')
        return
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        const parts = buffer.split('\n\n')
        buffer = parts.pop() ?? ''

        for (const part of parts) {
          if (!part.trim()) continue
          let event = ''
          let data = ''
          for (const line of part.split('\n')) {
            if (line.startsWith('event: ')) event = line.slice(7).trim()
            else if (line.startsWith('data: ')) data = line.slice(6)
          }
          if (event === 'token' && data) {
            try { appendOutput(JSON.parse(data).text) } catch { /* skip */ }
          }
          if (event === 'error' && data) {
            try { toast.error(JSON.parse(data).message) } catch { /* skip */ }
          }
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return
      toast.error('Erreur de connexion au serveur.')
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }, [provider, appendOutput, clearOutput, setStreaming])

  const abort = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  return { stream, abort }
}

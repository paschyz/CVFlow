'use client'
import { useState, useCallback, useEffect } from 'react'
import type { ProviderId } from '@/lib/ai/types'
import { useMounted } from './use-mounted'

export type KeyStatus = 'absent' | 'untested' | 'valid' | 'invalid'

const storageKey = (provider: ProviderId) => `cvflow:apikey:${provider}`

export function useApiKey(provider: ProviderId) {
  const mounted = useMounted()
  const [key, setKeyState] = useState('')
  const [status, setStatus] = useState<KeyStatus>('absent')
  const [validating, setValidating] = useState(false)

  useEffect(() => {
    if (!mounted) return
    const stored = localStorage.getItem(storageKey(provider))
    if (stored) {
      setKeyState(stored)
      setStatus('untested')
    } else {
      setKeyState('')
      setStatus('absent')
    }
  }, [mounted, provider])

  const setKey = useCallback((value: string) => {
    setKeyState(value)
    if (!value) {
      localStorage.removeItem(storageKey(provider))
      setStatus('absent')
    } else {
      localStorage.setItem(storageKey(provider), value)
      setStatus('untested')
    }
  }, [provider])

  const removeKey = useCallback(() => {
    localStorage.removeItem(storageKey(provider))
    setKeyState('')
    setStatus('absent')
  }, [provider])

  const validate = useCallback(async () => {
    if (!key) return
    setValidating(true)
    try {
      const res = await fetch('/api/ai/validate', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': key },
        body: JSON.stringify({ provider }),
      })
      const data = await res.json()
      setStatus(data.valid ? 'valid' : 'invalid')
    } catch {
      setStatus('invalid')
    } finally {
      setValidating(false)
    }
  }, [key, provider])

  return { key, setKey, removeKey, status, setStatus, validate, validating, mounted }
}

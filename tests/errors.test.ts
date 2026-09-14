import { describe, it, expect } from 'vitest'
import { normalizeProviderError, AIError } from '@/lib/ai/errors'

describe('normalizeProviderError', () => {
  it('maps 401 to AUTH_INVALID', () => {
    const err = normalizeProviderError(new Error('nope'), 'gemini', 401)
    expect(err).toBeInstanceOf(AIError)
    expect(err.code).toBe('AUTH_INVALID')
  })

  it('maps 429 to RATE_LIMITED', () => {
    const err = normalizeProviderError(new Error('slow down'), 'openai', 429)
    expect(err.code).toBe('RATE_LIMITED')
  })

  it('maps 429 with quota message to QUOTA_EXCEEDED', () => {
    const err = normalizeProviderError(new Error('quota exceeded'), 'anthropic', 429)
    expect(err.code).toBe('QUOTA_EXCEEDED')
  })

  it('maps 404 to MODEL_NOT_FOUND', () => {
    const err = normalizeProviderError(new Error('not found'), 'gemini', 404)
    expect(err.code).toBe('MODEL_NOT_FOUND')
  })

  it('maps AbortError to ABORTED', () => {
    const abort = new DOMException('aborted', 'AbortError')
    const err = normalizeProviderError(abort, 'openai')
    expect(err.code).toBe('ABORTED')
  })

  it('maps TypeError to NETWORK', () => {
    const err = normalizeProviderError(new TypeError('fetch failed'), 'anthropic')
    expect(err.code).toBe('NETWORK')
  })
})

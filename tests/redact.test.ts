import { describe, it, expect } from 'vitest'
import { redact } from '@/lib/redact'

describe('redact', () => {
  it('redacts Gemini keys', () => {
    expect(redact('key: AIzaSyA1234567890123456789012345678901')).toContain('[REDACTED]')
  })

  it('redacts Anthropic keys', () => {
    expect(redact('sk-ant-api03-abcdefghijklmnopqrstuvwx')).toContain('[REDACTED]')
  })

  it('redacts OpenAI keys', () => {
    expect(redact('sk-proj-abcdefghijklmnopqrstuvwxyz')).toContain('[REDACTED]')
  })

  it('leaves non-key text untouched', () => {
    expect(redact('hello world')).toBe('hello world')
  })

  it('handles multiple keys in one string', () => {
    const input = 'a=AIzaSyA1234567890123456789012345678901 b=sk-ant-api03-abcdefghijklmnopqrstuvwx'
    const result = redact(input)
    expect(result).not.toContain('AIza')
    expect(result).not.toContain('sk-ant')
    expect(result.match(/\[REDACTED\]/g)?.length).toBe(2)
  })
})

import type { AIProvider, ProviderId } from './types'
import { AIError, USER_MESSAGE } from './errors'
import { gemini } from './providers/gemini'
import { anthropic } from './providers/anthropic'
import { openai } from './providers/openai'

// Vérifier ces identifiants dans la doc de chaque provider avant mise en production.
export const PROVIDERS: Record<ProviderId, AIProvider> = { gemini, anthropic, openai }
export const PROVIDER_ORDER: readonly ProviderId[] = ['gemini', 'anthropic', 'openai']
export const DEFAULT_PROVIDER: ProviderId = 'gemini'

export function getProvider(id: string): AIProvider {
  const provider = PROVIDERS[id as ProviderId]
  if (!provider) throw new AIError('BAD_REQUEST', USER_MESSAGE.BAD_REQUEST, 400, undefined)
  return provider
}

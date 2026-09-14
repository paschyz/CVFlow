import type { AIErrorCode, ProviderId } from './types'

export class AIError extends Error {
  constructor(
    readonly code: AIErrorCode,
    message: string,
    readonly status?: number,
    readonly provider?: ProviderId,
  ) {
    super(message)
    this.name = 'AIError'
  }
}

export const USER_MESSAGE: Record<AIErrorCode, string> = {
  AUTH_INVALID: 'Clé refusée par le fournisseur. Vérifie qu\'elle est complète et toujours active.',
  RATE_LIMITED: 'Trop de requêtes. Réessaie dans quelques secondes.',
  QUOTA_EXCEEDED: 'Quota épuisé sur ton compte. Vérifie ta facturation chez le fournisseur.',
  MODEL_NOT_FOUND: 'Modèle introuvable. Il a peut-être été renommé ou retiré.',
  BAD_REQUEST: 'Requête invalide. Vérifie le contenu envoyé.',
  NETWORK: 'Erreur réseau. Vérifie ta connexion ou réessaie.',
  ABORTED: 'Requête annulée.',
  UNKNOWN: 'Erreur inattendue. Réessaie ou change de fournisseur.',
}

export function normalizeProviderError(
  err: unknown,
  provider: ProviderId,
  status?: number,
): AIError {
  if (err instanceof AIError) return err

  if (err instanceof DOMException && err.name === 'AbortError') {
    return new AIError('ABORTED', USER_MESSAGE.ABORTED, undefined, provider)
  }

  if (err instanceof TypeError) {
    return new AIError('NETWORK', USER_MESSAGE.NETWORK, undefined, provider)
  }

  if (status) {
    if (status === 401 || status === 403) {
      return new AIError('AUTH_INVALID', USER_MESSAGE.AUTH_INVALID, status, provider)
    }
    if (status === 429) {
      const body = err instanceof Error ? err.message : String(err)
      const isQuota = /quota|billing|insufficient/i.test(body)
      const code = isQuota ? 'QUOTA_EXCEEDED' : 'RATE_LIMITED'
      return new AIError(code, USER_MESSAGE[code], status, provider)
    }
    if (status === 404) {
      return new AIError('MODEL_NOT_FOUND', USER_MESSAGE.MODEL_NOT_FOUND, status, provider)
    }
    if (status === 400) {
      return new AIError('BAD_REQUEST', USER_MESSAGE.BAD_REQUEST, status, provider)
    }
    if (status >= 500) {
      return new AIError('NETWORK', USER_MESSAGE.NETWORK, status, provider)
    }
  }

  return new AIError('UNKNOWN', USER_MESSAGE.UNKNOWN, undefined, provider)
}

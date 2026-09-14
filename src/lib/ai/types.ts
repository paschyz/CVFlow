export type ProviderId = 'gemini' | 'anthropic' | 'openai'

export interface StreamOptions {
  apiKey: string
  model?: string
  system?: string
  maxTokens?: number
  temperature?: number
  signal: AbortSignal
}

export interface ValidationResult {
  valid: boolean
  code?: AIErrorCode
  detail?: string
}

export interface ProviderMeta {
  id: ProviderId
  label: string
  vendor: string
  defaultModel: string
  models: readonly string[]
  keyPlaceholder: string
  keyPattern: RegExp
  consoleUrl: string
  isFreeTier: boolean
}

export interface AIProvider extends ProviderMeta {
  stream(prompt: string, options: StreamOptions): AsyncIterable<string>
  validate(apiKey: string, signal?: AbortSignal): Promise<ValidationResult>
}

export type AIErrorCode =
  | 'AUTH_INVALID'
  | 'RATE_LIMITED'
  | 'QUOTA_EXCEEDED'
  | 'MODEL_NOT_FOUND'
  | 'BAD_REQUEST'
  | 'NETWORK'
  | 'ABORTED'
  | 'UNKNOWN'

export type SSEEvent =
  | { event: 'token'; data: { text: string } }
  | { event: 'error'; data: { code: AIErrorCode; status?: number; message: string } }
  | { event: 'done'; data: { reason: 'complete' | 'aborted' } }

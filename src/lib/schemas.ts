import { z } from 'zod/v4'

export const streamRequestSchema = z.object({
  provider: z.enum(['gemini', 'anthropic', 'openai']),
  prompt: z.string().min(1).max(32_000),
  model: z.string().optional(),
  system: z.string().max(8_000).optional(),
  maxTokens: z.number().int().min(1).max(16_384).optional(),
  temperature: z.number().min(0).max(2).optional(),
})

export const validateRequestSchema = z.object({
  provider: z.enum(['gemini', 'anthropic', 'openai']),
})

export type StreamRequest = z.infer<typeof streamRequestSchema>
export type ValidateRequest = z.infer<typeof validateRequestSchema>

import { NextRequest } from 'next/server'
import { validateRequestSchema } from '@/lib/schemas'
import { getProvider } from '@/lib/ai/registry'

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get('x-api-key')
  if (!apiKey) {
    return Response.json({ error: 'API key required' }, { status: 401 })
  }

  const body = await req.json().catch(() => null)
  const parsed = validateRequestSchema.safeParse(body)
  if (!parsed.success) {
    return Response.json({ error: parsed.error }, { status: 400 })
  }

  const provider = getProvider(parsed.data.provider)
  const result = await provider.validate(apiKey)

  return Response.json(result)
}

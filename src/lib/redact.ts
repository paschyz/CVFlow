const KEY_PATTERNS = [
  /AIza[\w-]{30,}/g,
  /sk-ant-[\w-]{20,}/g,
  /sk-[\w-]{20,}/g,
]

export function redact(input: string): string {
  let result = input
  for (const pattern of KEY_PATTERNS) {
    result = result.replace(pattern, '[REDACTED]')
  }
  return result
}

import { cn } from 'cn'

export function StreamConsole({
  content,
  isStreaming,
  className,
}: {
  content: string
  isStreaming?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-xl bg-surface-deep border border-hairline p-4 font-mono text-sm text-brand-cyan min-h-[120px] overflow-auto',
        className,
      )}
    >
      <pre className="whitespace-pre-wrap break-words">
        {content}
        {isStreaming && (
          <span className="cursor-blink ml-0.5 inline-block w-2 h-4 bg-brand-cyan align-middle" />
        )}
      </pre>
      {!content && !isStreaming && (
        <span className="text-faint text-xs">En attente d&#39;une requ&#xEA;te&hellip;</span>
      )}
    </div>
  )
}

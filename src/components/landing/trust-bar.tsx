import { SITE } from '@/content/site'
import { GeminiIcon, ClaudeIcon, OpenAIIcon } from '@/components/common/brand-icons'
import { CountUp } from '@/components/common/count-up'

const providers = [
  { name: 'Gemini', Icon: GeminiIcon },
  { name: 'Claude', Icon: ClaudeIcon },
  { name: 'OpenAI', Icon: OpenAIIcon },
] as const

export function TrustBar() {
  return (
    <section className="py-16 px-5 border-y border-hairline bg-surface-base/50">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-subtle text-center">
          Compatible avec les leaders de l&apos;IA
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {providers.map(({ name, Icon }) => (
            <span key={name} className="flex items-center gap-2 text-sm text-muted-foreground opacity-70 hover:opacity-100 transition-opacity">
              <Icon className="size-5" />
              {name}
            </span>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8">
          {SITE.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-4xl font-bold tabular-nums">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

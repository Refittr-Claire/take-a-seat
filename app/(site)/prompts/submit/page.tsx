import type { Metadata } from 'next'
import { SuggestForm } from '@/components/suggest-form'

export const metadata: Metadata = {
  title: 'Suggest a question',
  description:
    'Suggest a gentle conversation starter for the benches. A person reads every one, nothing is published automatically.',
}

export default function SuggestPromptPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <header>
        <h1 className="text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
          Suggest a question
        </h1>
        <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
          The best questions are the easy ones, simple to answer, and just as easy to leave. If one
          comes to mind, send it our way.
        </p>
      </header>

      <div className="mt-8 rounded-xl border border-border bg-secondary/40 p-5 text-base leading-relaxed text-foreground/80">
        A gentle steer: nothing that leans on memory, health, money or family, and nothing a
        stranger would find nosy. Think warm, light, easy to say out loud.
      </div>

      <div className="mt-8">
        <SuggestForm />
      </div>

      <p className="mt-8 text-base text-muted-foreground">
        Nothing you send appears on a bench automatically. A person reads each one, and only adds it
        by hand if it&apos;s right.
      </p>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Shuffle } from 'lucide-react'
import { prompts } from '@/lib/prompts'

// Progressive enhancement: the server already rendered a real question into
// `initial`, so the screen is complete before this component hydrates and works
// fully with JavaScript switched off. When JS is on, the button quietly appears
// and lets people move to another question.
export function PromptCard({ initial }: { initial: string }) {
  const [prompt, setPrompt] = useState(initial)

  function shuffle() {
    let next = prompt
    // avoid repeating the same question twice in a row
    while (next === prompt && prompts.length > 1) {
      next = prompts[Math.floor(Math.random() * prompts.length)]
    }
    setPrompt(next)
  }

  return (
    <div className="flex flex-col items-center">
      <p
        aria-live="polite"
        className="text-balance text-center font-serif text-[2rem] font-medium leading-tight text-foreground sm:text-4xl md:text-5xl"
      >
        {prompt}
      </p>

      <button
        type="button"
        onClick={shuffle}
        className="mt-10 inline-flex min-h-14 items-center gap-2 rounded-full border border-border bg-card px-6 text-lg font-medium text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      >
        <Shuffle className="h-5 w-5 text-primary" aria-hidden />
        Ask me another
      </button>
    </div>
  )
}

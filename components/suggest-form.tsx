'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitPromptSuggestion, type FormState } from '@/app/actions'
import { Button } from '@/components/ui/button'

const initial: FormState = { ok: false, message: '' }
const MAX = 140

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" className="w-full text-lg sm:w-auto" disabled={pending}>
      {pending ? 'Sending…' : 'Send it in'}
    </Button>
  )
}

export function SuggestForm() {
  const [state, formAction] = useActionState(submitPromptSuggestion, initial)
  const [value, setValue] = useState('')

  if (state.ok) {
    return (
      <div role="status" className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
        <h2 className="font-serif text-2xl font-semibold text-primary">Thank you</h2>
        <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-foreground/90">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-5" noValidate>
      {!state.ok && state.message && (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-destructive">
          {state.message}
        </p>
      )}

      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label htmlFor="question" className="text-lg font-medium">
          Your question
        </label>
        <textarea
          id="question"
          name="question"
          required
          rows={3}
          maxLength={MAX}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="What's the best thing you've eaten this week?"
          className="mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-lg outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
        />
        <p className="mt-2 text-base text-muted-foreground" aria-live="polite">
          {MAX - value.length} characters left
        </p>
      </div>

      <SubmitButton />
    </form>
  )
}

'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitBenchRequest, type FormState } from '@/app/actions'
import { Button } from '@/components/ui/button'

const initial: FormState = { ok: false, message: '' }

const fieldClass =
  'mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-lg text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" className="w-full text-lg sm:w-auto" disabled={pending}>
      {pending ? 'Sending…' : 'Send the request'}
    </Button>
  )
}

export function RequestForm() {
  const [state, formAction] = useActionState(submitBenchRequest, initial)

  if (state.ok) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center"
      >
        <h2 className="font-serif text-2xl font-semibold text-primary">That&apos;s with us</h2>
        <p className="mx-auto mt-3 max-w-md text-lg leading-relaxed text-foreground/90">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {!state.ok && state.message && (
        <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-destructive">
          {state.message}
        </p>
      )}

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="organisation" className="text-lg font-medium">
            The place <span className="text-muted-foreground">(garden, charity, group…)</span>
          </label>
          <input id="organisation" name="organisation" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="name" className="text-lg font-medium">
            Your name
          </label>
          <input id="name" name="name" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="text-lg font-medium">
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="phone" className="text-lg font-medium">
            Phone <span className="text-muted-foreground">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="location" className="text-lg font-medium">
            Where it&apos;ll go <span className="text-muted-foreground">(town or postcode)</span>
          </label>
          <input id="location" name="location" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="quantity" className="text-lg font-medium">
            How many
          </label>
          <input id="quantity" name="quantity" type="number" min={1} defaultValue={1} className={fieldClass} />
        </div>
      </div>

      <fieldset>
        <legend className="text-lg font-medium">Indoor or outdoor?</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {[
            { v: 'outdoor', label: 'Outdoor' },
            { v: 'indoor', label: 'Indoor' },
            { v: 'either', label: 'Either / not sure' },
          ].map((o, i) => (
            <label
              key={o.v}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-card px-4 py-3 text-lg has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <input
                type="radio"
                name="setting"
                value={o.v}
                defaultChecked={i === 0}
                className="h-5 w-5 accent-primary"
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="text-lg font-medium">
          Anything else? <span className="text-muted-foreground">(optional)</span>
        </label>
        <textarea id="message" name="message" rows={4} className={fieldClass} />
      </div>

      <SubmitButton />
      <p className="text-base text-muted-foreground">
        We&apos;ll only use this to reply about a bench. No lists, no sharing it about.
      </p>
    </form>
  )
}

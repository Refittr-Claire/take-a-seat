'use client'

import { useActionState, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { submitSponsorRequest, type FormState } from '@/app/actions'
import { Button } from '@/components/ui/button'

const initial: FormState = { ok: false, message: '' }

const fieldClass =
  'mt-2 w-full rounded-lg border border-input bg-card px-4 py-3 text-lg text-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" className="w-full sm:w-auto" disabled={pending}>
      {pending ? 'Sending…' : 'Send'}
    </Button>
  )
}

export function SponsorButton({ benchId, label }: { benchId: string; label: string }) {
  const [open, setOpen] = useState(false)
  // Held in state so a failed attempt doesn't wipe what they typed.
  const [email, setEmail] = useState('')
  const [state, formAction] = useActionState(submitSponsorRequest, initial)
  const formId = `sponsor-form-${benchId}`
  const emailId = `sponsor-email-${benchId}`

  if (state.ok) {
    return (
      <p role="status" className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-foreground">
        {state.message}
      </p>
    )
  }

  if (!open) {
    return (
      <Button
        type="button"
        className="w-full sm:w-auto"
        aria-expanded={false}
        aria-controls={formId}
        onClick={() => setOpen(true)}
      >
        Sponsor this bench, £300
        <span className="sr-only"> ({label})</span>
      </Button>
    )
  }

  return (
    <form id={formId} action={formAction} noValidate className="space-y-3">
      {state.message && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-destructive"
        >
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

      <input type="hidden" name="benchId" value={benchId} />

      <div>
        <label htmlFor={emailId} className="text-base font-medium">
          Your email, and we&apos;ll be in touch about sponsoring this bench
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={fieldClass}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <SubmitButton />
        <Button type="button" variant="outline" className="w-full sm:w-auto" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

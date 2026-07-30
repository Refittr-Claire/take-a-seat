'use server'

import { headers } from 'next/headers'
import { sendBenchRequest, sendPromptSuggestion } from '@/lib/email'
import { rateLimit } from '@/lib/rate-limit'

export type FormState = {
  ok: boolean
  message: string
}

async function callerKey(scope: string) {
  const h = await headers()
  const ip =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() || h.get('x-real-ip') || 'unknown'
  return `${scope}:${ip}`
}

function str(v: FormDataEntryValue | null): string {
  return typeof v === 'string' ? v.trim() : ''
}

export async function submitBenchRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  // Honeypot, real people leave it empty.
  if (str(formData.get('website'))) {
    return { ok: true, message: "Thanks, we've got that." }
  }

  if (!rateLimit(await callerKey('request'))) {
    return {
      ok: false,
      message: "You've sent this a few times just now. Give it a few minutes and try again.",
    }
  }

  const data = {
    organisation: str(formData.get('organisation')),
    name: str(formData.get('name')),
    email: str(formData.get('email')),
    phone: str(formData.get('phone')),
    location: str(formData.get('location')),
    quantity: str(formData.get('quantity')),
    setting: str(formData.get('setting')),
    message: str(formData.get('message')),
  }

  if (!data.organisation)
    return { ok: false, message: 'Could you tell us the name of the place? A group or garden name is plenty.' }
  if (!data.name) return { ok: false, message: 'And your name, so we know who we\u2019re talking to?' }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
    return { ok: false, message: 'We\u2019ll need an email address that works, so we can write back.' }
  if (!data.location)
    return { ok: false, message: 'A rough location would help, a town or postcode is plenty.' }

  try {
    await sendBenchRequest(data)
  } catch (err) {
    console.log('[v0] bench request send failed:', err)
    return {
      ok: false,
      message:
        'Sorry, something went wrong our end. Please try again, or just email us at admin@refittr.co.uk.',
    }
  }

  return {
    ok: true,
    message:
      'Thank you, we\u2019ve got it. Someone will be in touch, and there\u2019s a note in your inbox to say we heard you.',
  }
}

export async function submitPromptSuggestion(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  if (str(formData.get('website'))) {
    return { ok: true, message: 'Thank you, that\u2019s in the pile.' }
  }

  if (!rateLimit(await callerKey('prompt'))) {
    return {
      ok: false,
      message: "You've sent a few just now. Give it a few minutes and try again.",
    }
  }

  const question = str(formData.get('question'))
  if (!question) return { ok: false, message: 'Pop your question in the box first.' }
  if (question.length > 140)
    return { ok: false, message: 'Keep it to 140 characters or fewer, so it fits on the bench.' }

  try {
    await sendPromptSuggestion(question)
  } catch (err) {
    console.log('[v0] prompt suggestion send failed:', err)
    return {
      ok: false,
      message: 'Sorry, something went wrong our end. Please try again in a moment.',
    }
  }

  return {
    ok: true,
    message:
      'Thank you. A person reads every one of these. Nothing goes on a bench without a good look first.',
  }
}

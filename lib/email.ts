import { Resend } from 'resend'

const ADMIN = 'admin@refittr.co.uk'
// Until a verified sending domain is added in Resend, use their shared sender.
const FROM = 'Take a Seat <onboarding@resend.dev>'

type SendArgs = {
  to: string
  subject: string
  text: string
  replyTo?: string
}

async function send({ to, subject, text, replyTo }: SendArgs) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    // No key yet: log so the flow still works end-to-end during the POC.
    console.log('[v0] RESEND_API_KEY not set, email not sent. Would have sent:', {
      to,
      subject,
      replyTo,
      text,
    })
    return { delivered: false as const }
  }

  const resend = new Resend(key)
  await resend.emails.send({ from: FROM, to, subject, text, replyTo })
  return { delivered: true as const }
}

export async function sendBenchRequest(data: {
  organisation: string
  name: string
  email: string
  phone?: string
  location: string
  quantity: string
  setting: string
  message?: string
}) {
  const body = [
    'New bench request',
    '------------------',
    `Organisation: ${data.organisation}`,
    `Contact:      ${data.name}`,
    `Email:        ${data.email}`,
    `Phone:        ${data.phone || '-'}`,
    `Location:     ${data.location}`,
    `Benches:      ${data.quantity}`,
    `Setting:      ${data.setting}`,
    '',
    'Message:',
    data.message || '-',
  ].join('\n')

  // Notify the team.
  await send({
    to: ADMIN,
    subject: `Bench request - ${data.organisation}`,
    text: body,
    replyTo: data.email,
  })

  // Acknowledge the submitter (best-effort).
  await send({
    to: data.email,
    subject: 'We got your bench request',
    text: [
      `Hello ${data.name},`,
      '',
      "Thanks for asking for a bench, we've got your message and someone will be in touch.",
      "There's no cost and no catch. We'll talk through sizes and getting it to you.",
      '',
      'Take a Seat',
    ].join('\n'),
  })
}

export async function sendPromptSuggestion(question: string) {
  await send({
    to: ADMIN,
    subject: 'New conversation prompt suggestion',
    text: [
      'Someone suggested a conversation starter.',
      '',
      `"${question}"`,
      '',
      'Nothing is published automatically. To use it, add it to lib/prompts.ts by hand and deploy.',
    ].join('\n'),
  })
}

import { Resend } from 'resend'

const ADMIN = 'admin@refittr.co.uk'

// With no EMAIL_FROM we fall back to Resend's shared sender, which needs no
// domain and no DNS, but will only deliver to the Resend account's own address.
// That is enough to get every request through to us. Set EMAIL_FROM to a
// verified domain later and the requester acknowledgements start working too.
const SHARED_SENDER = 'Take a Seat <onboarding@resend.dev>'
const FROM = process.env.EMAIL_FROM || SHARED_SENDER
const canEmailAnyone = Boolean(process.env.EMAIL_FROM)

type SendArgs = {
  to: string
  subject: string
  text: string
  replyTo?: string
}

async function send({ to, subject, text, replyTo }: SendArgs) {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    // Loud on purpose. A missing key used to log and return quietly, which made
    // every dropped request look like a delivered one.
    throw new Error('RESEND_API_KEY is not set, so no email could be sent.')
  }

  const resend = new Resend(key)
  // The SDK resolves with { data, error } instead of throwing, so a refusal
  // (unverified domain, bad key, blocked recipient) passes for success unless
  // the error is checked by hand.
  const { data, error } = await resend.emails.send({ from: FROM, to, subject, text, replyTo })
  if (error) {
    throw new Error(`Resend refused the email to ${to}: ${error.name}, ${error.message}`)
  }

  return { id: data?.id }
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
}): Promise<{ acknowledged: boolean }> {
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

  // Notify the team. If this one fails the request is lost, so let it throw and
  // let the form tell the person to email us instead.
  await send({
    to: ADMIN,
    subject: `Bench request: ${data.organisation}`,
    text: body,
    replyTo: data.email,
  })

  // On the shared sender the acknowledgement would be refused every time, so
  // don't try, and let the caller know not to promise one.
  if (!canEmailAnyone) {
    console.warn(
      '[take-a-seat] EMAIL_FROM is not set, so the request reached us but the sender got no acknowledgement.',
    )
    return { acknowledged: false }
  }

  // Acknowledge the requester, genuinely best-effort. Their request is already
  // with us, so a failed thank-you must not report the whole thing as broken and
  // have them send it all over again.
  try {
    await send({
      to: data.email,
      subject: 'We got your bench request',
      // So a reply lands in a read inbox, whatever EMAIL_FROM is set to.
      replyTo: ADMIN,
      text: [
        `Hello ${data.name},`,
        '',
        "Thanks for asking for a bench, we've got your message and someone will be in touch.",
        "There's no cost and no catch. We'll talk through sizes and getting it to you.",
        '',
        'Take a Seat',
      ].join('\n'),
    })
    return { acknowledged: true }
  } catch (err) {
    console.error('[take-a-seat] request reached us, acknowledgement to sender failed:', err)
    return { acknowledged: false }
  }
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

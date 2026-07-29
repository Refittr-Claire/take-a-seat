import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'For partners',
  description:
    'Information for parks teams, hospices, care homes, schools, libraries and community organisations thinking about taking a bench.',
}

const faqs = [
  {
    q: 'Is it really free?',
    a: "Yes. There's no cost to you and no invoice later. We save the pews and give them away  -  that's the whole model.",
  },
  {
    q: 'How many can we have?',
    a: 'Tell us what you need. Some places take one for a quiet corner; some take a dozen across a site. We\u2019ll talk it through.',
  },
  {
    q: 'What sizes are there?',
    a: 'Roughly two sizes: a long one (about 456cm) and a shorter one (about 213cm). Styles vary a little between batches.',
  },
  {
    q: 'How long will they last outdoors?',
    a: '[CONFIRM]  -  we\u2019ll give you an honest answer for your setting rather than a marketing one. The timber is not treated, so an exposed spot and a sheltered one will behave differently. Ask us and we\u2019ll be straight with you.',
  },
  {
    q: "What's the tag on the bench?",
    a: "A small plastic tag with a number and a QR code. Scanning it shows one gentle conversation question  -  nothing to install, nothing tracked, no personal data.",
  },
  {
    q: 'Do you deliver?',
    a: 'Delivery is arranged case by case. You choose where it sits, and we\u2019d love a photo once it\u2019s in.',
  },
]

export default function PartnersPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <header>
        <h1 className="text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
          For partners
        </h1>
        <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
          If you run a place where people gather  -  a park, a hospice, a care home, a school, a
          library, a community centre  -  we&apos;d like to give you somewhere to sit.
        </p>
      </header>

      <section className="mt-10 space-y-6 text-lg leading-relaxed text-foreground/90">
        <p>
          The offer is simple. We have salvaged church pews, made into benches, free to good homes
          across Merseyside. Indoor or outdoor, one or many. You tell us where, we find the right
          one and bring it over.
        </p>
      </section>

      {/* Dementia recognition note  -  kept close to the draft */}
      <section className="mt-10 rounded-2xl border border-border bg-card p-8">
        <h2 className="font-serif text-2xl font-semibold text-primary">A note for dementia care</h2>
        <p className="mt-4 text-lg leading-relaxed text-foreground/90">
          The QR code on each bench offers a single, gentle question  -  the kind that&apos;s easy to
          answer and easy to leave. We&apos;ve written the questions to avoid anything that assumes
          memory, or that a stranger would find intrusive. We&apos;re not claiming this is therapy.
          It&apos;s a prompt to sit down together and talk, nothing more  -  and we&apos;d welcome
          review of the questions by someone with dementia-care experience before they go out.
        </p>
      </section>

      {/* FAQ  -  native details, keyboard and no-JS friendly */}
      <section className="mt-12">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Questions people ask</h2>
        <div className="mt-6 divide-y divide-border rounded-2xl border border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group px-6 py-4 [&_summary]:list-none">
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-2 text-lg font-medium text-foreground">
                {f.q}
                <span
                  aria-hidden
                  className="text-2xl leading-none text-primary transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="pb-2 text-lg leading-relaxed text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="font-serif text-2xl text-foreground">Somewhere in mind?</p>
        <div className="mt-5 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="text-lg">
            <Link href="/request">Request a bench</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg">
            <Link href="/contact">Ask us something first</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

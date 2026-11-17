import type { Metadata } from 'next'
import Link from 'next/link'
import { getBench } from '@/lib/benches'
import { getSponsorship } from '@/lib/sponsorship'
import { pickPrompt } from '@/lib/prompts'
import { PromptCard } from '@/components/prompt-card'

export const metadata: Metadata = {
  title: 'A question for whoever\u2019s sitting here',
  robots: { index: false }, // per-bench screens shouldn't show up in search
}

function SponsorCredit({ name, url, logo }: { name: string; url?: string; logo?: string }) {
  const content = (
    <>
      {logo && (
        // Plain img: logos come in any shape, so let the browser keep the ratio.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={name}
          className="mx-auto h-auto max-h-20 w-auto max-w-full object-contain"
        />
      )}
      <span className={logo ? 'mt-2 block' : 'block'}>{name}</span>
    </>
  )

  if (!url) {
    return <div className="mt-2 text-base font-medium text-foreground">{content}</div>
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      className="mt-2 inline-block rounded-md px-2 py-1 text-base font-medium text-primary underline underline-offset-4"
    >
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export default async function BenchPromptPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const bench = getBench(id)
  const sponsorship = getSponsorship(id)

  // A different question each visit, chosen on the server so it works with JS off.
  const initial = pickPrompt(Date.now())

  return (
    <main className="flex min-h-dvh flex-col bg-background px-6 py-10">
      {/* Gentle top line, sets the tone, no logo shouting */}
      <p className="text-center text-base text-muted-foreground">
        Have a seat. Here&apos;s a little something to talk about.
      </p>

      {/* The question, centred and large */}
      <div className="flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-2xl">
          <PromptCard initial={initial} />

          {/* Works with JavaScript switched off */}
          <noscript>
            <p className="mt-8 text-center text-lg text-muted-foreground">
              Come back any time for a different question.
            </p>
          </noscript>
        </div>
      </div>

      {/* Sponsor credit, below the question so the question stays the main thing */}
      {sponsorship?.sponsorName && (
        <section aria-label="Sponsor" className="mx-auto mb-10 w-full max-w-2xl text-center">
          <p className="text-sm text-muted-foreground">Sponsored by</p>
          <SponsorCredit
            name={sponsorship.sponsorName}
            url={sponsorship.sponsorUrl}
            logo={sponsorship.sponsorLogo}
          />
        </section>
      )}

      {/* Quiet footer */}
      <footer className="mx-auto w-full max-w-2xl text-center">
        {bench ? (
          <p className="text-sm text-muted-foreground">
            This bench once stood in {bench.source.building}, {bench.source.place}.
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">A pew that found a second life outdoors.</p>
        )}
        <p className="mt-3 text-sm text-muted-foreground">
          A free bench from{' '}
          <Link href="/" className="font-medium text-primary underline underline-offset-4">
            Take a Seat
          </Link>
          . Want one where you are?{' '}
          <Link href="/request" className="font-medium text-primary underline underline-offset-4">
            Ask us.
          </Link>
        </p>
      </footer>
    </main>
  )
}

import type { Metadata } from 'next'
import { SponsorButton } from '@/components/sponsor-button'
import { getWaitingGroups } from '@/lib/sponsorship'

export const metadata: Metadata = {
  title: 'Sponsor a bench',
  description:
    '£300 sponsors one bench for a community group in Merseyside that has asked for one and is waiting.',
}

export default function SponsorPage() {
  const groups = getWaitingGroups()

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-4xl font-semibold md:text-5xl">
          Sponsor a bench
        </h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          £300 sponsors one bench. It goes to a community group that has asked for one and is
          waiting. Your logo goes on that bench&apos;s page, so it shows every time someone scans
          it, and we post a thank you when it is handed over.
        </p>
      </header>

      {groups.length > 0 ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2">
          {groups.map(({ next: b }) => (
            <li
              key={b.id}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 text-card-foreground"
            >
              <h2 className="font-serif text-2xl font-semibold text-foreground">{b.placeType}</h2>
              {b.canName && b.recipientName && (
                <p className="mt-1 text-lg text-foreground">{b.recipientName}</p>
              )}
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-base">
                <dt className="text-muted-foreground">Area</dt>
                <dd className="text-foreground">{b.area}</dd>
              </dl>
              <div className="mt-auto pt-6">
                <SponsorButton benchId={b.id} label={`${b.placeType}, ${b.area}`} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 text-lg text-muted-foreground">
          Every bench on our list has a sponsor right now.
        </p>
      )}

      <p className="mt-12 text-lg text-foreground">
        Want to talk first? Email{' '}
        <a
          href="mailto:hello@takeaseatproject.org"
          className="font-medium text-primary underline underline-offset-4"
        >
          hello@takeaseatproject.org
        </a>
      </p>
    </div>
  )
}

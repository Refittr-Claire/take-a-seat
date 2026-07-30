import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { stock } from '@/lib/benches'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-8 pt-12 md:grid-cols-2 md:pt-20">
        <div>
          <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-foreground md:text-6xl">
            Take a seat, start a conversation.
          </h1>
          <p className="mt-6 text-pretty text-xl leading-relaxed text-foreground/90">
            Old church pews, saved from the skip and given away, free, to the places people go to be
            a little less alone.
          </p>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Somewhere to sit down next to someone, have a chat, or just watch the world go by.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild size="lg" className="text-lg">
              <Link href="/request">Request a bench</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link href="/find">Find one near you</Link>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/pew-bench-park.png"
            alt="A wooden church pew being used as a bench in a leafy park, two people sitting a little apart"
            width={900}
            height={700}
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </section>

      {/* The free bit */}
      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
          <h2 className="font-serif text-3xl font-semibold text-primary">It&apos;s free, honestly.</h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed">
            We&apos;re not selling anything, and we won&apos;t come back later with a collection tin.
            Benches go to communities, charities, CICs and the like. If you&apos;ve got a garden, a
            courtyard, or a quiet corner that could hold one, just send us a message and we&apos;ll
            take it from there.
          </p>
        </div>
      </section>

      {/* The pew idea */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 md:grid-cols-2">
        <div className="order-2 overflow-hidden rounded-2xl border border-border md:order-1">
          <Image
            src="/images/timber-grain.png"
            alt="Close-up of old pew timber, honey-coloured where freshly cut, darker where hands have worn it smooth"
            width={800}
            height={640}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            A pew already knows how to do this.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed">
            Shoulder to shoulder, facing the same way, no need to talk and no hurry to leave. People
            have sat through the biggest days of their lives on these, and a lot of ordinary Sundays
            too. So we&apos;re taking something that already works and setting it down wherever
            people gather: a hospice garden, a sheltered courtyard, a library, a park, the quiet
            corner of a corridor.
          </p>
        </div>
      </section>

      {/* Where they go */}
      <section className="mx-auto max-w-4xl px-5 py-12">
        <h2 className="font-serif text-2xl font-semibold text-primary">Where they go</h2>
        <p className="mt-4 text-balance font-serif text-2xl leading-snug text-foreground md:text-3xl">
          Hospice gardens and schools. Sheltered courtyards. Parks, libraries, community centres.
          Anywhere someone might sit down next to someone else.
        </p>
        <p className="mt-4 text-lg text-muted-foreground">Each one gets a small number of its own.</p>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-12">
        <h2 className="font-serif text-3xl font-semibold text-foreground">How it works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              n: '1',
              t: 'Tell us where.',
              d: 'A garden, a courtyard, a green space, a quiet corner of a corridor.',
            },
            {
              n: '2',
              t: 'We find the right one.',
              d: 'We have different sizes, and sometimes different styles.',
            },
            {
              n: '3',
              t: 'Delivery arranged case by case.',
              d: 'You choose where it sits, and we\u2019d love a photo once it\u2019s in.',
            },
          ].map((s) => (
            <li key={s.n} className="rounded-2xl border border-border bg-card p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary font-serif text-xl font-semibold text-primary-foreground">
                {s.n}
              </span>
              <h3 className="mt-4 font-serif text-xl font-semibold">{s.t}</h3>
              <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Quiet counters, engraved facts, low on the page */}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <dl className="grid grid-cols-1 gap-8 border-y border-border py-10 sm:grid-cols-3">
          <div className="text-center">
            <dt className="text-sm uppercase tracking-wide text-muted-foreground">Benches placed</dt>
            <dd className="mt-2 font-serif text-4xl font-semibold text-foreground">{stock.benchesPlaced}</dd>
          </div>
          <div className="text-center">
            <dt className="text-sm uppercase tracking-wide text-muted-foreground">Available now</dt>
            <dd className="mt-2 font-serif text-4xl font-semibold text-foreground">{stock.availableNow}</dd>
          </div>
          <div className="text-center">
            <dt className="text-sm uppercase tracking-wide text-muted-foreground">Of old timber saved</dt>
            <dd className="mt-2 font-serif text-4xl font-semibold text-foreground">{stock.timberMetres}m</dd>
          </div>
        </dl>
      </section>

      {/* Closing */}
      <section className="mx-auto max-w-3xl px-5 pb-8 text-center">
        <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
          Tell us where yours goes.
        </h2>
        <div className="mt-7">
          <Button asChild size="lg" className="text-lg">
            <Link href="/request">Request a bench</Link>
          </Button>
        </div>
      </section>
    </>
  )
}

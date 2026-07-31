import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Take a Seat is a project by Refittr and Corkery Smith in Merseyside, saving old church pews and giving them away as benches.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <header>
        <h1 className="text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
          Who&apos;s behind it
        </h1>
        <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
          Take a Seat is a small project run by two Merseyside companies who kept meeting at the same
          skip from opposite ends, and neither of us much liked what was going into it.
        </p>
      </header>

      {/* Corkery Smith */}
      <section className="mt-12">
        <div className="flex items-center">
          <a href="https://corkerysmithltd.com" className="transition-opacity hover:opacity-80">
            <Image
              src="/logos/corkery-smith.png"
              alt="Corkery Smith"
              width={320}
              height={64}
              className="h-10 w-auto"
            />
          </a>
        </div>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/90">
          <p>
            <a
              href="https://corkerysmithltd.com"
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              Corkery Smith
            </a>{' '}
            is a Liverpool demolition and construction firm, the people who are in the
            building as it comes out of use. When a church is stripped out, the pews are usually the
            first thing to the skip. Being the ones holding the crowbar, they&apos;re also the ones
            who can set the good timber aside instead.
          </p>
          <p>
            They work in demolition, site preparation and groundworks across Merseyside, with a
            leaning toward doing it sustainably, keeping what can be kept out of landfill. Saving
            pews grew straight out of that.
          </p>
          <p className="rounded-lg border border-dashed border-border bg-muted/50 px-4 py-3 text-base text-muted-foreground">
            [TO SUPPLY] Corkery Smith company details and Leanne&apos;s origin story, the moment she
            decided the pews were coming out whole. To be written by the team, not to be invented
            here.
          </p>
        </div>
      </section>

      {/* Refittr */}
      <section className="mt-12">
        <a
          href="https://refittr.co.uk"
          className="inline-flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          <Image
            src="/logos/refittr.jpg"
            alt=""
            width={48}
            height={48}
            className="h-11 w-11 rounded-md"
          />
          <span className="font-serif text-2xl font-semibold text-primary underline underline-offset-4">
            Refittr
          </span>
        </a>
        <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/90">
          <p>
            <a
              href="https://refittr.co.uk"
              className="font-medium text-primary underline underline-offset-4 hover:no-underline"
            >
              Refittr
            </a>{' '}
            is a Merseyside startup built on a stubborn idea: perfectly good things
            shouldn&apos;t go to landfill just because nobody joined the dots between what&apos;s
            being thrown out and who could use it. Their day job is matching second-hand home
            fixtures to the people they&apos;ll fit.
          </p>
          <p>
            Take a Seat is the same instinct pointed at church pews, find the good stuff before the
            skip does, and get it to someone who&apos;ll use it. Refittr built and runs this site.
          </p>
          <p className="rounded-lg border border-dashed border-border bg-muted/50 px-4 py-3 text-base text-muted-foreground">
            [TO SUPPLY] Confirmed Refittr company details and how the two teams came to work together.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8">
        <p className="text-lg leading-relaxed text-foreground/90">
          Between them, one company saves the timber and the other finds it a home. There&apos;s no
          more to us than that. If you fancy a chat with an actual person, we&apos;re at{' '}
          <a
            href="mailto:admin@refittr.co.uk"
            className="font-medium text-primary underline underline-offset-4"
          >
            admin@refittr.co.uk
          </a>
          .
        </p>
      </section>
    </div>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'The story',
  description:
    'The pews, the timber and the building they came from. How an old church pew becomes a bench to sit next to someone.',
}

export default function StoryPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <header>
        <h1 className="text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
          The story
        </h1>
        <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
          A pew spends its whole life being sat on by people, side by side. We didn&apos;t want that
          to end in a skip.
        </p>
      </header>

      <div className="my-10 overflow-hidden rounded-2xl border border-border">
        <Image
          src="/images/timber-grain.png"
          alt="The grain of an old pew, honey where freshly cut, dark where hands have worn it"
          width={900}
          height={560}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-6 text-lg leading-relaxed text-foreground/90">
        <p>
          The timber is honey-coloured where it&apos;s freshly cut and dark where hands have worn it.
          Every mark was put there by someone sitting down. We&apos;re keeping them.
        </p>

        <h2 className="pt-4 font-serif text-2xl font-semibold text-primary">
          It starts at St Patrick&apos;s
        </h2>
        <p>
          The first batch came from St Patrick&apos;s Church in Newton-le-Willows, sixty-four pews
          of pitch pine, saved as the building came out of use. That&apos;s where the idea got its
          legs, but it isn&apos;t the whole of it. More buildings and other salvaged woods will
          follow, so mostly we&apos;ll just call it old timber.
        </p>
        <p>
          Of those sixty-four, some go out just as they are. We don&apos;t do much to them: we save
          the timber, fix a small numbered tag on, and sort out getting it to you. Five went to an
          allotments group and four to the Irish Centre before we started counting properly.
        </p>

        <h2 className="pt-4 font-serif text-2xl font-semibold text-primary">The little tag</h2>
        <p>
          Each bench gets a small plastic tag with its own number and a QR code, quiet, tucked to one
          side, easy to miss. Scan it and you get a question to ask whoever&apos;s next to you.
          That&apos;s all it does. No app, no sign-up, nothing to buy.
        </p>
      </div>

      <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="font-serif text-2xl text-foreground">Know somewhere one should go?</p>
        <div className="mt-5">
          <Button asChild size="lg" className="text-lg">
            <Link href="/request">Request a bench</Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Contact and press',
  description: 'Get in touch about a bench, or for press enquiries. A person reads every email.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14">
      <header>
        <h1 className="text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
          Say hello
        </h1>
        <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
          A person reads every email, no ticket numbers, no bots. Whichever of these fits, we&apos;d
          love to hear from you.
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-7">
          <h2 className="font-serif text-2xl font-semibold text-primary">Want a bench?</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            The quickest way is the form, it tells us what we need to find you the right one.
          </p>
          <div className="mt-5">
            <Button asChild className="text-base">
              <Link href="/request">Request a bench</Link>
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-7">
          <h2 className="font-serif text-2xl font-semibold text-primary">Just a question?</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            Email us and we&apos;ll write back like a human being.
          </p>
          <div className="mt-5">
            <Button asChild variant="outline" className="text-base">
              <a href="mailto:admin@refittr.co.uk">admin@refittr.co.uk</a>
            </Button>
          </div>
        </section>
      </div>

      <section className="mt-10 rounded-2xl border border-border bg-secondary/40 p-8">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Press</h2>
        <p className="mt-3 text-lg leading-relaxed text-foreground/90">
          Writing something about the pews? We&apos;re glad to help, and happy to talk you through
          how it works and where the benches are going. Email{' '}
          <a
            href="mailto:admin@refittr.co.uk"
            className="font-medium text-primary underline underline-offset-4"
          >
            admin@refittr.co.uk
          </a>{' '}
          with &ldquo;Press&rdquo; in the subject and we&apos;ll come back quickly.
        </p>
        <p className="mt-4 rounded-lg border border-dashed border-border bg-muted/50 px-4 py-3 text-base text-muted-foreground">
          [TO SUPPLY] Named press contact and phone number, if you&apos;d like one listed.
        </p>
      </section>
    </div>
  )
}

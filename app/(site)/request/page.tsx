import type { Metadata } from 'next'
import { RequestForm } from '@/components/request-form'

export const metadata: Metadata = {
  title: 'Request a bench',
  description:
    'Ask for a free salvaged-pew bench for your community space in Merseyside. No cost, no catch, just tell us where it will go.',
}

export default function RequestPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-14">
      <header>
        <h1 className="text-balance font-serif text-4xl font-semibold text-foreground md:text-5xl">
          Request a bench
        </h1>
        <p className="mt-5 text-pretty text-xl leading-relaxed text-muted-foreground">
          Tell us where it&apos;ll go and we&apos;ll take it from there. It&apos;s free, and
          there&apos;s no catch. We just need enough to find you the right one.
        </p>
      </header>

      <div className="mt-10">
        <RequestForm />
      </div>
    </div>
  )
}

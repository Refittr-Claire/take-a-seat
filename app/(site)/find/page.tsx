import type { Metadata } from 'next'
import { getAllBenches } from '@/lib/benches'
import { FindBench } from '@/components/find-bench'

export const metadata: Metadata = {
  title: 'Find a bench',
  description:
    'The benches we\u2019ve placed so far, on a map and as a plain list. Sort by where you are.',
}

export default function FindPage() {
  const benches = getAllBenches()

  return (
    <div className="mx-auto max-w-4xl px-5 py-14 md:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-4xl font-semibold md:text-5xl">Find a bench</h1>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
          Here&apos;s where the benches are so far. The pins marked as tests are just us checking the
          map works, so there&apos;s no bench there yet. Every bench is in the list too, so this page
          works fine without the map. Each bench has a small number and a QR code that shows a short,
          easy conversation starter.
        </p>
      </header>

      <div className="mt-10">
        <FindBench benches={benches} />
      </div>
    </div>
  )
}

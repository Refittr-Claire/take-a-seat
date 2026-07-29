'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { MapPin, LocateFixed } from 'lucide-react'
import type { Bench } from '@/lib/benches'
import { Button } from '@/components/ui/button'

// Map must only load in the browser.
const BenchMap = dynamic(() => import('@/components/bench-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-muted text-muted-foreground">
      Loading map…
    </div>
  ),
})

function milesBetween(a: [number, number], b: [number, number]) {
  const toRad = (n: number) => (n * Math.PI) / 180
  const R = 3958.8 // Earth radius in miles
  const dLat = toRad(b[0] - a[0])
  const dLng = toRad(b[1] - a[1])
  const lat1 = toRad(a[0])
  const lat2 = toRad(b[0])
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

export function FindBench({ benches }: { benches: Bench[] }) {
  const [origin, setOrigin] = useState<[number, number] | null>(null)
  const [status, setStatus] = useState<string>('')
  const [busy, setBusy] = useState(false)
  const [place, setPlace] = useState('')

  const ranked = useMemo(() => {
    if (!origin) return benches
    return [...benches]
      .map((b) => ({ b, miles: milesBetween(origin, [b.location.lat, b.location.lng]) }))
      .sort((x, y) => x.miles - y.miles)
      .map((x) => ({ ...x.b, _miles: x.miles }) as Bench & { _miles: number })
  }, [origin, benches])

  const nearest = origin ? (ranked[0] as Bench & { _miles: number }) : null

  function useMyLocation() {
    if (!('geolocation' in navigator)) {
      setStatus('Your device can\u2019t share a location. Try a town or postcode below.')
      return
    }
    setBusy(true)
    setStatus('')
      navigator.geolocation.getCurrentPosition(
      (pos) => {
        // Coordinates stay in the browser - never sent anywhere.
        setOrigin([pos.coords.latitude, pos.coords.longitude])
        setBusy(false)
      },
      () => {
        setBusy(false)
        setStatus('No worries - pop a town or postcode in below and we\u2019ll sort by that.')
      },
      { enableHighAccuracy: false, timeout: 8000 },
    )
  }

  async function geocodePlace(e: React.FormEvent) {
    e.preventDefault()
    if (!place.trim()) return
    setBusy(true)
    setStatus('')
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=gb&q=${encodeURIComponent(place)}`,
        { headers: { Accept: 'application/json' } },
      )
      const data = (await res.json()) as Array<{ lat: string; lon: string }>
      if (data.length) {
        setOrigin([parseFloat(data[0].lat), parseFloat(data[0].lon)])
      } else {
        setStatus('Couldn\u2019t find that one. The full list is just below the map.')
      }
    } catch {
      setStatus('Couldn\u2019t look that up just now. The full list is just below the map.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      {/* Near me controls */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={useMyLocation} disabled={busy} size="lg" className="text-lg">
            <LocateFixed aria-hidden />
            Find one near me
          </Button>
          <form onSubmit={geocodePlace} className="flex flex-1 flex-wrap items-center gap-3">
            <label htmlFor="place" className="sr-only">
              Town or postcode
            </label>
            <input
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="…or type a town or postcode"
              className="h-13 min-w-[12rem] flex-1 rounded-lg border border-input bg-background px-4 text-lg outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            />
            <Button type="submit" variant="outline" size="lg" disabled={busy} className="text-lg">
              Sort by this
            </Button>
          </form>
        </div>

        {status && (
          <p role="status" className="mt-3 text-base text-muted-foreground">
            {status}
          </p>
        )}

        {nearest && (
          <p role="status" className="mt-4 text-lg">
            Nearest is{' '}
            <Link href={`/b/${nearest.id}`} className="font-semibold text-primary underline underline-offset-4">
              {nearest.location.name}
            </Link>
            , about <strong>{nearest._miles.toFixed(1)} miles</strong> away.
            {nearest.status === 'test' && (
              <span className="ml-1 text-muted-foreground">(A test pin - no bench there yet.)</span>
            )}
          </p>
        )}
      </div>

      {/* Map */}
      <div className="mt-6 h-[420px] w-full overflow-hidden rounded-2xl border border-border">
        <BenchMap benches={benches} center={origin ?? undefined} />
      </div>

      {/* Legend */}
      <p className="mt-3 flex flex-wrap items-center gap-4 text-base text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-primary" /> A placed bench
        </span>
          <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full border border-dashed border-[#7a5410] bg-[#c98a1a]" />{' '}
          Test pin - no bench here yet
        </span>
      </p>

      {/* Accessible plain-text list - always present, works without the map */}
      <div className="mt-10">
        <h2 className="font-serif text-2xl font-semibold text-foreground">Every bench, as a list</h2>
        <ul className="mt-5 divide-y divide-border rounded-2xl border border-border">
          {ranked.map((b) => {
            const miles = (b as Bench & { _miles?: number })._miles
            return (
              <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div>
                  <p className="flex items-center gap-2 text-lg font-medium">
                    <MapPin className="h-5 w-5 text-primary" aria-hidden />
                    {b.location.name}
                    {b.status === 'test' && (
                      <span className="rounded-md bg-accent/40 px-2 py-0.5 text-sm font-semibold text-accent-foreground">
                          Test pin - no bench here yet
                        </span>
                    )}
                  </p>
                  <p className="mt-1 text-base text-muted-foreground">
                    Bench {b.id} · from {b.source.building}, {b.source.place}
                    {typeof miles === 'number' ? ` · about ${miles.toFixed(1)} miles away` : ''}
                  </p>
                </div>
                <Link
                  href={`/b/${b.id}`}
                  className="font-medium text-primary underline underline-offset-4"
                >
                  See its question
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

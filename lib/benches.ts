// -----------------------------------------------------------------------------
// Single source of truth + single access point for bench data.
// Swap the `benches` array for a database query later and nothing else changes.
//
// TEST SAFEGUARD: every seed row below is status: "test" with a T-prefixed id.
// Deleting the test benches is a five-line change - remove the five entries.
// -----------------------------------------------------------------------------

export type Bench = {
  id: string // the number on the tag, e.g. "24"
  source: {
    building: string // "St Patrick's Church"
    place: string // "Newton-le-Willows"
  }
  location: {
    name: string // "Sefton Park"
    lat: number
    lng: number
    postcode?: string
  }
  host?: string // organisation, if any
  placedOn?: string // ISO date
  size: 'long' | 'short' // 456cm pew stock | 213cm pew stock
  setting: 'outdoor' | 'indoor'
  status: 'placed' | 'test' // test rows must be flagged
  photo?: string
}

// NOTE: coordinates are approximate placeholders - verify before relying on them.
const benches: Bench[] = [
  {
    id: 'T1',
    source: { building: "St Patrick's Church", place: 'Newton-le-Willows' },
    location: { name: 'Sefton Park', lat: 53.3809, lng: -2.9445, postcode: 'L17 1AP' },
    size: 'long',
    setting: 'outdoor',
    status: 'test',
  },
  {
    id: 'T2',
    source: { building: "St Patrick's Church", place: 'Newton-le-Willows' },
    location: { name: 'Princes Park', lat: 53.3866, lng: -2.956, postcode: 'L8 3SA' },
    size: 'short',
    setting: 'outdoor',
    status: 'test',
  },
  {
    id: 'T3',
    source: { building: "St Patrick's Church", place: 'Newton-le-Willows' },
    location: { name: 'Newsham Park', lat: 53.4204, lng: -2.9385, postcode: 'L6 7UN' },
    size: 'long',
    setting: 'outdoor',
    status: 'test',
  },
  {
    id: 'T4',
    source: { building: "St Patrick's Church", place: 'Newton-le-Willows' },
    location: { name: 'Calderstones Park', lat: 53.3766, lng: -2.8965, postcode: 'L18 3JB' },
    size: 'short',
    setting: 'outdoor',
    status: 'test',
  },
  {
    id: 'T5',
    source: { building: "St Patrick's Church", place: 'Newton-le-Willows' },
    location: { name: 'Stanley Park', lat: 53.4341, lng: -2.9584, postcode: 'L4 2SL' },
    size: 'long',
    setting: 'outdoor',
    status: 'test',
  },
]

// --- Access helpers (the one module everything else goes through) -------------

export function getAllBenches(): Bench[] {
  return benches
}

export function getBench(id: string): Bench | undefined {
  if (!id) return undefined
  const needle = id.trim().toUpperCase()
  return benches.find((b) => b.id.toUpperCase() === needle)
}

export function getPlacedBenches(): Bench[] {
  return benches.filter((b) => b.status === 'placed')
}

// --- Counters: computed, never hard-coded -------------------------------------

export const stock = {
  benchesPlaced: benches.filter((b) => b.status === 'placed').length,
  availableNow: 55, // 64 pews less 5 to the allotments group and 4 to the Irish Centre
  timberMetres: 175, // approximate - confirm before launch
}

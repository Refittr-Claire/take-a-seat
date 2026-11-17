// -----------------------------------------------------------------------------
// Sponsorship data: benches that groups have asked for, and who paid for them.
// Kept beside lib/benches.ts in the same style. A row here is matched to a
// placed bench by `id`, which is the number on the bench's tag.
//
// EDITING BY HAND after a Stripe payment:
//   1. Find the row whose id matches the payment's client_reference_id.
//   2. Set status to 'sponsored' and fill in sponsorName (and sponsorUrl).
//   3. Set status to 'delivered' once it has been handed over.
// Only rows with status 'waiting' are listed on /sponsor.
//
// Benches only ever go to organisations and constituted groups.
// recipientName is shown publicly only when canName is true.
// -----------------------------------------------------------------------------

export type SponsorBench = {
  id: string // matches the tag number, e.g. "0001"
  placeType: string // plain description, e.g. "School prayer garden"
  area: string // e.g. "Wavertree"
  size: '7ft' | '14ft'
  status: 'waiting' | 'sponsored' | 'delivered'
  recipientName?: string // shown only when canName is true
  canName: boolean // false unless the group has said we can name them
  sponsorName?: string
  sponsorUrl?: string
}

const sponsorBenches: SponsorBench[] = [
  {
    id: '0001',
    placeType: 'School prayer garden',
    area: 'Liverpool',
    size: '7ft',
    status: 'waiting',
    canName: false,
  },
  {
    id: '0002',
    placeType: 'Allotment group for mental health',
    area: 'Walton',
    size: '7ft',
    status: 'waiting',
    canName: false,
  },
  {
    id: '0003',
    placeType: 'Community centre',
    area: 'Wavertree',
    size: '14ft',
    status: 'waiting',
    canName: false,
  },
  {
    id: '0004',
    placeType: 'Care home garden',
    area: 'Liverpool',
    size: '7ft',
    status: 'waiting',
    canName: false,
  },
  {
    id: '0005',
    placeType: 'Day centre',
    area: 'Halton',
    size: '7ft',
    status: 'waiting',
    canName: false,
  },
]

// --- Access helpers ------------------------------------------------------------

export function getWaitingBenches(): SponsorBench[] {
  return sponsorBenches.filter((b) => b.status === 'waiting')
}

export function getSponsorship(id: string): SponsorBench | undefined {
  if (!id) return undefined
  const needle = id.trim().toUpperCase()
  return sponsorBenches.find((b) => b.id.toUpperCase() === needle)
}

// Stripe Payment Link with the bench id attached, or a mailto if the link
// is not configured. Never throws, so a missing env var cannot break the build.
export function sponsorHref(id: string): string {
  const link = process.env.NEXT_PUBLIC_SPONSOR_PAYMENT_LINK?.trim()
  if (link) {
    const sep = link.includes('?') ? '&' : '?'
    return `${link}${sep}client_reference_id=${encodeURIComponent(id)}`
  }
  return `mailto:hello@takeaseatproject.org?subject=${encodeURIComponent(`Sponsor bench ${id}`)}`
}

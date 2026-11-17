// -----------------------------------------------------------------------------
// Sponsorship data: benches that groups have asked for, and who paid for them.
// Kept beside lib/benches.ts in the same style. A row here is matched to a
// placed bench by `id`, which is the number on the bench's tag.
//
// EDITING BY HAND after a Stripe payment:
//   1. Find the row whose id matches the payment's client_reference_id.
//   2. Set status to 'sponsored' and fill in sponsorName (and sponsorUrl).
//   3. For a logo, put the image in public/sponsors/ and set
//      sponsorLogo: '/sponsors/their-logo.png'.
//   4. Set status to 'delivered' once it has been handed over.
// Only rows with status 'waiting' are listed on /sponsor.
//
// Example of a sponsored row:
//   { id: '0001', placeType: 'Homeless hostel', area: 'Liverpool city centre', size: '7ft',
//     status: 'sponsored', canName: false, sponsorName: 'Acme Ltd',
//     sponsorUrl: 'https://acme.co.uk', sponsorLogo: '/sponsors/acme.png' },
//
// Benches only ever go to organisations and constituted groups.
// recipientName is shown publicly only when canName is true.
// -----------------------------------------------------------------------------

export type SponsorBench = {
  id: string // matches the tag number, e.g. "0001"
  placeType: string // plain description, e.g. "School prayer garden"
  area: string // e.g. "Wavertree"
  size: '7ft' | '15ft' | 'either'
  status: 'waiting' | 'sponsored' | 'delivered'
  recipientName?: string // shown only when canName is true
  canName: boolean // false unless the group has said we can name them
  sponsorName?: string
  sponsorUrl?: string
  sponsorLogo?: string // e.g. "/sponsors/acme.png", file lives in public/sponsors/
}

const sponsorBenches: SponsorBench[] = [
  { id: '0001', placeType: 'Homeless hostel', area: 'Liverpool city centre', size: '7ft', status: 'waiting', canName: false },
  { id: '0002', placeType: 'Homeless hostel', area: 'Liverpool city centre', size: '7ft', status: 'waiting', canName: false },
  { id: '0003', placeType: 'Homeless hostel', area: 'Liverpool city centre', size: '7ft', status: 'waiting', canName: false },
  { id: '0004', placeType: 'Homeless hostel', area: 'Liverpool city centre', size: '7ft', status: 'waiting', canName: false },
  { id: '0005', placeType: 'Sheltered housing for older people', area: 'Orrell, Wigan', size: '7ft', status: 'waiting', canName: false },
  { id: '0006', placeType: 'Sheltered housing for older people', area: 'Beech Hill, Wigan', size: '15ft', status: 'waiting', canName: false },
  { id: '0007', placeType: 'Sheltered housing for older people', area: 'Scholes, Wigan', size: 'either', status: 'waiting', canName: false },
  { id: '0008', placeType: 'Sheltered housing for older people', area: 'Aspull, Wigan', size: '7ft', status: 'waiting', canName: false },
  { id: '0009', placeType: 'Sheltered housing for older people', area: 'Atherton, Wigan', size: 'either', status: 'waiting', canName: false },
  { id: '0010', placeType: 'Sheltered housing for older people', area: 'Atherton, Wigan', size: 'either', status: 'waiting', canName: false },
  { id: '0011', placeType: 'Sheltered housing for older people', area: 'Tyldesley, Wigan', size: 'either', status: 'waiting', canName: false },
  { id: '0012', placeType: 'Sheltered housing for older people', area: 'Leigh, Wigan', size: '15ft', status: 'waiting', canName: false },
  { id: '0013', placeType: 'Care home', area: 'Norris Green', size: 'either', status: 'waiting', canName: false },
  { id: '0014', placeType: 'Care home', area: 'Norris Green', size: 'either', status: 'waiting', canName: false },
  { id: '0015', placeType: 'Care home', area: 'Norris Green', size: 'either', status: 'waiting', canName: false },
  { id: '0016', placeType: 'Care home', area: 'Norris Green', size: 'either', status: 'waiting', canName: false },
  { id: '0017', placeType: 'Nursing home', area: 'Speke', size: 'either', status: 'waiting', canName: false },
  { id: '0018', placeType: 'Nursing home', area: 'Speke', size: 'either', status: 'waiting', canName: false },
  { id: '0019', placeType: 'Care home garden', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0020', placeType: 'Care home garden', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0021', placeType: 'Care home garden', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0022', placeType: 'Care home garden', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0023', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0024', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0025', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0026', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0027', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0028', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0029', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0030', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0031', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0032', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0033', placeType: 'Community charity', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0034', placeType: 'Community charity', area: 'Birkenhead', size: 'either', status: 'waiting', canName: false },
  { id: '0035', placeType: 'Community charity', area: 'Birkenhead', size: 'either', status: 'waiting', canName: false },
  { id: '0036', placeType: 'Community charity', area: 'Birkenhead', size: 'either', status: 'waiting', canName: false },
  { id: '0037', placeType: 'Community charity', area: 'Birkenhead', size: 'either', status: 'waiting', canName: false },
  { id: '0038', placeType: 'Community centre garden', area: 'Wavertree', size: '15ft', status: 'waiting', canName: false },
  { id: '0039', placeType: 'Community centre garden', area: 'Wavertree', size: '15ft', status: 'waiting', canName: false },
  { id: '0040', placeType: 'Community centre', area: 'Liverpool', size: '7ft', status: 'waiting', canName: false },
  { id: '0041', placeType: 'Community centre', area: 'Liverpool', size: '7ft', status: 'waiting', canName: false },
  { id: '0042', placeType: 'Community centre', area: 'Liverpool', size: '7ft', status: 'waiting', canName: false },
  { id: '0043', placeType: 'Community centre', area: 'Liverpool', size: '7ft', status: 'waiting', canName: false },
  { id: '0044', placeType: 'Day centre for adults with support needs', area: 'Runcorn and Widnes', size: '7ft', status: 'waiting', canName: false },
  { id: '0045', placeType: 'Day centre for adults with support needs', area: 'Runcorn and Widnes', size: '7ft', status: 'waiting', canName: false },
  { id: '0046', placeType: 'Day centre for adults with support needs', area: 'Runcorn and Widnes', size: '7ft', status: 'waiting', canName: false },
  { id: '0047', placeType: 'Day centre for adults with support needs', area: 'Runcorn and Widnes', size: '7ft', status: 'waiting', canName: false },
  { id: '0048', placeType: 'Day centre for adults with support needs', area: 'Runcorn and Widnes', size: '7ft', status: 'waiting', canName: false },
  { id: '0049', placeType: 'Community allotment', area: 'St Helens', size: '15ft', status: 'waiting', canName: false },
  { id: '0050', placeType: 'Community allotment', area: 'St Helens', size: '15ft', status: 'waiting', canName: false },
  { id: '0051', placeType: 'Community allotment', area: 'St Helens', size: '15ft', status: 'waiting', canName: false },
  { id: '0052', placeType: 'Community allotment', area: 'St Helens', size: '15ft', status: 'waiting', canName: false },
  { id: '0053', placeType: 'Community allotment', area: 'St Helens', size: '15ft', status: 'waiting', canName: false },
  { id: '0054', placeType: 'Allotment group for mental health', area: 'Walton', size: '7ft', status: 'waiting', canName: false },
  { id: '0055', placeType: 'Allotment group for mental health', area: 'Walton', size: '7ft', status: 'waiting', canName: false },
  { id: '0056', placeType: 'Scout group', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0057', placeType: 'Scout group', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0058', placeType: 'Scout group', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0059', placeType: 'Scout group', area: 'Liverpool', size: 'either', status: 'waiting', canName: false },
  { id: '0060', placeType: 'Secondary school chapel', area: 'Liverpool', size: '7ft', status: 'waiting', canName: false },
  { id: '0061', placeType: 'Primary school prayer garden', area: 'Liverpool', size: '7ft', status: 'waiting', canName: false },
  { id: '0062', placeType: 'Church community garden', area: 'Wavertree', size: 'either', status: 'waiting', canName: false },
  { id: '0063', placeType: 'Church community garden', area: 'Wavertree', size: 'either', status: 'waiting', canName: false },
  { id: '0064', placeType: 'Church', area: 'Aigburth', size: 'either', status: 'waiting', canName: false },
  { id: '0065', placeType: 'Community gardens at a volunteer-run miniature railway', area: 'Calderstones Park', size: 'either', status: 'waiting', canName: false },
  { id: '0066', placeType: 'Community gardens at a volunteer-run miniature railway', area: 'Calderstones Park', size: 'either', status: 'waiting', canName: false },
]

// --- Access helpers ------------------------------------------------------------

export function getSponsorship(id: string): SponsorBench | undefined {
  if (!id) return undefined
  const needle = id.trim().toUpperCase()
  return sponsorBenches.find((b) => b.id.toUpperCase() === needle)
}

export function sizeLabel(size: SponsorBench['size']): string {
  return size === 'either' ? '7ft or 15ft' : size
}

export type WaitingGroup = {
  next: SponsorBench // the bench the sponsor button pays for
  count: number
}

// Waiting benches that share a place type, area and size (and a public name,
// if any) become one group, in the order they appear above.
export function getWaitingGroups(): WaitingGroup[] {
  const groups = new Map<string, WaitingGroup>()
  for (const b of sponsorBenches) {
    if (b.status !== 'waiting') continue
    const shownName = b.canName ? (b.recipientName ?? '') : ''
    const key = [b.placeType, b.area, b.size, shownName].join('|')
    const group = groups.get(key)
    if (group) group.count += 1
    else groups.set(key, { next: b, count: 1 })
  }
  return [...groups.values()]
}

// Payment links are switched off for now, so every Sponsor button sends an
// email instead. To turn Stripe on, set this to true and add
// NEXT_PUBLIC_SPONSOR_PAYMENT_LINK in Vercel.
const USE_PAYMENT_LINK = false

// Stripe Payment Link with the bench id attached, or an email naming the bench.
// Never throws, so a missing env var cannot break the build.
export function sponsorHref(b: SponsorBench): string {
  const link = process.env.NEXT_PUBLIC_SPONSOR_PAYMENT_LINK?.trim()
  if (USE_PAYMENT_LINK && link) {
    const sep = link.includes('?') ? '&' : '?'
    return `${link}${sep}client_reference_id=${encodeURIComponent(b.id)}`
  }
  const subject = `Sponsor bench ${b.id}: ${b.placeType}, ${b.area} (${sizeLabel(b.size)})`
  return `mailto:hello@takeaseatproject.org?subject=${encodeURIComponent(subject)}`
}

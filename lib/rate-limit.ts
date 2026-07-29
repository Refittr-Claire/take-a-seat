// Simple in-memory rate limit. Fine for a POC; swap for a shared store (e.g.
// Upstash) if the site ever runs on multiple instances.

const hits = new Map<string, number[]>()

/**
 * Returns true if the caller is allowed, false if they've exceeded the limit.
 * Default: 5 requests per 10 minutes per key.
 */
export function rateLimit(key: string, limit = 5, windowMs = 10 * 60 * 1000): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
  if (recent.length >= limit) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}

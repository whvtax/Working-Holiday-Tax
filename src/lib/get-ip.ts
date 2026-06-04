// Extract the real client IP for rate limiting.
//
// Trust order (most-trusted first):
//   1. x-vercel-forwarded-for — set by Vercel's edge; clients CANNOT spoof it.
//   2. x-real-ip             — set by many trusted reverse proxies.
//   3. x-forwarded-for       — only as a last resort. The header is a
//      client-appendable list, so we take the FIRST entry and validate it.
//
// A spoofed/invalid value collapses to 'unknown', which still rate-limits
// (all spoofers share one bucket) rather than handing each request a fresh one.
const IPV4 = /^(?:\d{1,3}\.){3}\d{1,3}$/
const IPV6 = /^[0-9a-fA-F:]+$/

function valid(ip: string | undefined | null): string | null {
  if (!ip) return null
  const v = ip.trim()
  if (IPV4.test(v) || (v.includes(':') && IPV6.test(v))) return v
  return null
}

export function getClientIp(req: Request): string {
  const vercel = valid(req.headers.get('x-vercel-forwarded-for')?.split(',')[0])
  if (vercel) return vercel

  const real = valid(req.headers.get('x-real-ip'))
  if (real) return real

  const xff = req.headers.get('x-forwarded-for')
  if (xff) {
    const first = valid(xff.split(',')[0])
    if (first) return first
  }
  return 'unknown'
}

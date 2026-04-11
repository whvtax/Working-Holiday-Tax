// Extract real client IP — prefer x-vercel-forwarded-for (set by Vercel edge, not spoofable)
// Falls back to x-forwarded-for last entry for non-Vercel environments
export function getClientIp(req: Request): string {
  // x-vercel-forwarded-for is set by Vercel's edge network and cannot be spoofed by clients
  const vercelIp = req.headers.get('x-vercel-forwarded-for')
  if (vercelIp) {
    const first = vercelIp.split(',')[0].trim()
    if (first) return first
  }

  // Fallback for non-Vercel / local dev: take last entry of x-forwarded-for
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded.split(',').map(s => s.trim()).filter(Boolean)
    const last = parts[parts.length - 1]
    if (last) return last
  }

  return req.headers.get('x-real-ip') ?? 'unknown'
}

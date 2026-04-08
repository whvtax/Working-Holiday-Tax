/**
 * Extract the real client IP from a Next.js request.
 *
 * On Vercel, the edge appends the true client IP as the LAST entry in
 * x-forwarded-for. Using the FIRST entry is dangerous — it is user-supplied
 * and can be spoofed to bypass rate limiting.
 *
 * Falls back to x-real-ip (set by some proxies), then 'unknown'.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded.split(',').map(s => s.trim()).filter(Boolean)
    // Last entry is appended by Vercel's edge — trust it
    const last = parts[parts.length - 1]
    if (last) return last
  }
  return req.headers.get('x-real-ip') ?? 'unknown'
}

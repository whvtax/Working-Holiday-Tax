// Extract real client IP.
// On Vercel: the FIRST entry in x-forwarded-for is the real client IP
// (Vercel overwrites this header on ingress to prevent spoofing).
// Fallback to x-real-ip when x-forwarded-for is unavailable.
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded.split(',').map(s => s.trim()).filter(Boolean)
    // First entry is the original client (Vercel's edge appends its own IP, but
    // the original client IP remains first).
    const first = parts[0]
    if (first) return first
  }
  return req.headers.get('x-real-ip') ?? 'unknown'
}

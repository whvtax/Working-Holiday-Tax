// Extract real client IP — use LAST x-forwarded-for entry (Vercel appends it)
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

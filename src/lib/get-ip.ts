// Extract the real client IP for rate limiting / lockout keying.
// DOS-02: `x-forwarded-for` is client-supplied and, depending on ingress
// behaviour, its leftmost entry can be spoofed (letting an attacker rotate the
// rate-limit key). Prefer `x-real-ip`, which Vercel sets to the true client
// address and clients cannot forge through the proxy. Only fall back to XFF —
// and then the RIGHTMOST hop (closest trusted proxy), never the leftmost
// attacker-controlled value.
export function getClientIp(req: Request): string {
  const real = req.headers.get('x-real-ip')?.trim()
  if (real) return real
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded.split(',').map(s => s.trim()).filter(Boolean)
    const rightmost = parts[parts.length - 1]
    if (rightmost) return rightmost
  }
  return 'unknown'
}

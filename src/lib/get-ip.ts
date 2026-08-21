// Extract the real client IP for rate limiting / lockout keying.
//
// DOS-02: `x-forwarded-for` is client-supplied and, depending on ingress
// behaviour, its leftmost entry can be spoofed (letting an attacker rotate the
// rate-limit key). Prefer `x-real-ip`, which Vercel sets to the true client
// address and clients cannot forge through the proxy. Only fall back to XFF —
// and then the RIGHTMOST hop (closest trusted proxy), never the leftmost
// attacker-controlled value.
//
// APPSEC: the header was previously returned VERBATIM, with no parsing and no
// length cap. That assumption ("clients cannot forge x-real-ip") is load-bearing
// and holds only behind the Vercel edge — not for direct origin access, a
// self-host, or any additional CDN in front. An attacker who can set the header
// gets a fresh rate-limit key and a fresh login-lockout key on every request,
// which makes both controls no-ops and, against a single shared password,
// permits unlimited online guessing.
//
// It is now validated as an actual IP address before being trusted. That does
// not make a spoofable header trustworthy — nothing in code can — but it bounds
// the keyspace to real IP shapes and removes the unbounded-key growth in Redis.
// The deployment question (does the ingress overwrite inbound X-Real-IP?) still
// has to be answered outside the code.

function isIpv4(v: string): boolean {
  if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(v)) return false
  return v.split('.').every((o) => {
    const n = Number(o)
    return n >= 0 && n <= 255 && String(n) === o.replace(/^0+(?=\d)/, '')
  })
}

/**
 * Structurally valid IPv6.
 *
 * A charset-only check ("hex digits and colons") was tried first and was not
 * enough: `aaaa:bbbb:cccc:<anything hex>` passed, so an attacker could still
 * mint an unbounded number of distinct rate-limit and login-lockout keys, which
 * is the entire attack this function exists to bound. The group structure has to
 * be checked, not just the alphabet.
 *
 * Accepts the IPv4-mapped form (`::ffff:1.2.3.4`) and a zone id (`fe80::1%eth0`),
 * both of which real ingresses emit. Rejecting those was worse than useless: it
 * collapsed every such client into one shared `'unknown'` bucket, so three bad
 * logins from anywhere would lock out everyone behind that ingress.
 */
function isIpv6(v: string): boolean {
  const body = v.split('%')[0] // drop an optional zone id
  if (!body.includes(':')) return false
  if ((body.match(/::/g) ?? []).length > 1) return false // '::' may appear once

  // A trailing IPv4 part is allowed (::ffff:192.0.2.1).
  const lastColon = body.lastIndexOf(':')
  const tail = body.slice(lastColon + 1)
  const hasV4Tail = tail.includes('.')
  if (hasV4Tail && !isIpv4(tail)) return false

  const hexPart = hasV4Tail ? body.slice(0, lastColon + 1) : body
  const groups = hexPart.split(':').filter((g) => g !== '')
  if (!groups.every((g) => /^[0-9a-fA-F]{1,4}$/.test(g))) return false

  const maxGroups = hasV4Tail ? 6 : 8
  if (body.includes('::')) return groups.length <= maxGroups
  return groups.length === maxGroups
}

function isIpAddress(v: string): boolean {
  if (!v || v.length > 45) return false // 45 = longest valid IPv6 text form
  return isIpv4(v) || isIpv6(v)
}

/** Strip an optional :port and IPv6 brackets, e.g. "[::1]:443" -> "::1". */
function normalise(v: string): string {
  let s = v.trim()
  if (s.startsWith('[')) {
    const end = s.indexOf(']')
    if (end > 0) return s.slice(1, end)
  }
  // Only strip a port for IPv4-with-port; a bare IPv6 is full of colons.
  const colons = (s.match(/:/g) ?? []).length
  if (colons === 1) s = s.slice(0, s.indexOf(':'))
  return s
}

export function getClientIp(req: Request): string {
  const real = normalise(req.headers.get('x-real-ip') ?? '')
  if (real && isIpAddress(real)) return real

  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    const parts = forwarded.split(',').map((s) => normalise(s)).filter(Boolean)
    // RIGHTMOST hop: the one appended by the closest trusted proxy. The leftmost
    // is whatever the client claimed.
    for (let i = parts.length - 1; i >= 0; i--) {
      if (isIpAddress(parts[i])) return parts[i]
    }
  }
  return 'unknown'
}

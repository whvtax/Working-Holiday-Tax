// Cross-site request guard for state-changing CRM and Will routes (round 2,
// AUTH2-01). Pure functions so the proxy and the tests share one definition.
//
// Why this exists on top of SameSite=Strict on crm_session:
//   - SameSite treats sibling subdomains of the registrable domain as "same
//     site", so a page on any other *.workingholidaytax.com.au host could send
//     the cookie. An Origin / Sec-Fetch-Site check closes that.
//   - The old per-route check in /api/will/actions ignored a malformed Origin
//     header, and the literal value `Origin: null` (sandboxed iframe, data: URL,
//     some redirects) fails URL parsing, so it FAILED OPEN. Here it fails closed.
//
// Non-browser callers (Meta's webhook, Vercel cron, curl) send neither header
// and are allowed: they are authenticated by their own secret, not by a cookie.

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS'])

export type GuardRequest = { method: string; url: string; headers: { get(name: string): string | null } }

/** Returns a short reason when the request must be refused, otherwise null. */
export function crossSiteMutationReason(req: GuardRequest): string | null {
  if (SAFE_METHODS.has(req.method.toUpperCase())) return null

  // Fetch Metadata: sent by every current browser, cannot be set by page script.
  const site = req.headers.get('sec-fetch-site')
  if (site && site !== 'same-origin' && site !== 'none') return `sec-fetch-site:${site}`

  const origin = req.headers.get('origin')
  if (origin === null) return null // not a browser cross-origin request
  let originHost: string
  try {
    originHost = new URL(origin).host
  } catch {
    return 'origin:unparseable' // includes the literal "null"
  }
  const allowed = new Set<string>()
  try { allowed.add(new URL(req.url).host) } catch { /* fall through to the host header */ }
  const hostHeader = req.headers.get('host')
  if (hostHeader) allowed.add(hostHeader)
  return allowed.has(originHost) ? null : 'origin:mismatch'
}

/** API prefixes the proxy guards. Login and OTP are included on purpose. */
export const GUARDED_API_PREFIXES = ['/api/crm/', '/api/will/'] as const

export function isGuardedApiPath(pathname: string): boolean {
  return GUARDED_API_PREFIXES.some((p) => pathname.startsWith(p))
}

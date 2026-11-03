// Outbound URL checks for URLs that Meta's API hands back to us (round 2, sec2-api-svt).
//
// The WhatsApp media download and the template listing follow a URL taken from
// a Meta JSON response and send our bearer token with it. The mediaId comes
// from the HMAC-verified webhook and Meta is trusted, but "trusted third party
// returns the URL" is exactly the assumption a compromised or misconfigured
// upstream breaks, and the token would go to whatever host it names. So:
//   - never fetch http, credentials in the URL, a non-443 port, an IP literal
//     or a single-label (internal) host, whatever the upstream says;
//   - attach the bearer token only to Meta's own hosts.
// A media host outside the Meta list is still downloaded (without the token)
// so a legitimate CDN change cannot silently drop a customer's document.

const META_SUFFIXES = ['fbsbx.com', 'facebook.com', 'fbcdn.net', 'whatsapp.net', 'whatsapp.com', 'facebook.net'] as const

function parse(raw: string): URL | null {
  try { return new URL(raw) } catch { return null }
}

/** True when it is safe to fetch this URL at all from a server. */
export function isSafeOutboundHttpsUrl(raw: string): boolean {
  const u = parse(raw)
  if (!u) return false
  if (u.protocol !== 'https:') return false
  if (u.username || u.password) return false
  if (u.port && u.port !== '443') return false
  const h = u.hostname.toLowerCase()
  if (!h || !h.includes('.')) return false // localhost, metadata, single-label internal names
  if (h.startsWith('[') || h.includes(':')) return false // IPv6 literal
  if (/^[0-9.]+$/.test(h) || /^0x[0-9a-f]+$/i.test(h)) return false // IPv4 literal in any common spelling
  if (h.endsWith('.local') || h.endsWith('.internal') || h.endsWith('.localhost')) return false
  return true
}

/** True when the host is one of Meta's, so our bearer token may be sent to it. */
export function isMetaHost(raw: string): boolean {
  const u = parse(raw)
  if (!u || !isSafeOutboundHttpsUrl(raw)) return false
  const h = u.hostname.toLowerCase()
  return META_SUFFIXES.some((s) => h === s || h.endsWith(`.${s}`))
}

/** The only host a Graph API `paging.next` link may point to. */
export function isGraphPagingUrl(raw: string): boolean {
  const u = parse(raw)
  return !!u && isSafeOutboundHttpsUrl(raw) && u.hostname.toLowerCase() === 'graph.facebook.com'
}

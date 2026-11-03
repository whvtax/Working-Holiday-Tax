/**
 * Is a postMessage origin Facebook's? Used by the WhatsApp Embedded Signup
 * listener on /crm/whatsapp/connect.
 *
 * The previous check, /facebook\.com$/ on the hostname, also accepted
 * "evilfacebook.com" (no dot boundary) and threw on the opaque "null" origin.
 * This requires https and an exact facebook.com or *.facebook.com host, and
 * returns false rather than throwing.
 */
export function isFacebookOrigin(origin: string): boolean {
  let u: URL
  try { u = new URL(origin) } catch { return false }
  if (u.protocol !== 'https:') return false
  return u.hostname === 'facebook.com' || u.hostname.endsWith('.facebook.com')
}

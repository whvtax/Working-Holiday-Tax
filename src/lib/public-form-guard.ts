/**
 * Cross-site guard for the PUBLIC, unauthenticated form endpoints (round 2,
 * sec2-forms-uploads; round 1 F-12).
 *
 * These routes take multipart/form-data, which is a "simple" request: any web
 * page can make a visitor's browser POST to them with no preflight. There is no
 * cookie to ride, so it is not CSRF, but it lets an attacker's page spend the
 * VISITOR's IP rate-limit budget (locking a real customer out of their own form)
 * and lets one attacker spread spam and phone-number probing across the IP
 * addresses of everyone who opens the page.
 *
 * Deliberately narrower than lib/request-guard.ts (which guards cookie-authed
 * CRM routes): only `Sec-Fetch-Site: cross-site` is refused. `same-site` is
 * allowed because www and the apex of one brand are the same site; a request
 * with no Fetch Metadata (old browsers, curl, server-to-server, the e2e suite) is
 * allowed because it cannot be a browser acting for an attacker's page. The header
 * is set by the browser and cannot be forged by page script.
 */
export function crossSiteFormReason(req: { headers: { get(name: string): string | null } }): string | null {
  return req.headers.get('sec-fetch-site')?.toLowerCase() === 'cross-site' ? 'sec-fetch-site:cross-site' : null
}

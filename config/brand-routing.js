// ─────────────────────────────────────────────────────────────────────────
// Host → brand routing for the two brands that share this codebase.
// Decision: docs/engineering/decisions/001-host-routing-with-rewrites.md
//
// Working Holiday Tax (WHT) is the default and is served exactly as before.
// Student Visa Tax (SVT) lives under the internal segment /svt-site and is
// reached ONLY through the SVT hosts below, by a host-conditioned rewrite.
//
// Why rewrites and not proxy.ts: proxy.ts was narrowed to /crm on purpose so
// public pages are pure CDN hits. Host rewrites run in the platform router,
// need no function invocation, and keep every page static.
//
// Isolation is default-deny in both directions:
//   - On an SVT host, every path goes to /svt-site/... (so no WHT page,
//     WHT public file, /crm or /de, /ja page can load), every /api route that
//     is not on SVT_API_ALLOWLIST is a 404, and no WHT redirect fires.
//   - On any other host, /svt-site and /svt-assets are a 404.
//
// Plain CommonJS so next.config.js can require it; src/lib/brand.ts reads the
// same host list, and a test keeps the two in step.
// ─────────────────────────────────────────────────────────────────────────

/** Hosts that serve Student Visa Tax. `svt.localhost` is for local and
 *  end-to-end testing (browsers resolve *.localhost to the loopback address);
 *  a public request cannot carry it to a Vercel deployment, which routes by
 *  the project's own domains. Matched without the port. */
const SVT_HOSTS = ['studentvisatax.com.au', 'www.studentvisatax.com.au', 'svt.localhost']

/** Internal path segment that holds the SVT app tree. Never linked to. */
const SVT_SEGMENT = 'svt-site'

/** Public folder for SVT-only static files (logo, favicon, images). */
const SVT_ASSETS = 'svt-assets'

/** API routes the SVT host may call. EMPTY unless the build sets
 *  SVT_FORMS_ENABLED=true (decision 003), and then ONLY the tax form and its
 *  upload. Turn it on only after migration 047 is applied and Will is
 *  brand-aware, so an SVT submission is tagged and answered as SVT. */
const SVT_FORM_ROUTES = ['/api/tax-form', '/api/tax-form/upload']
const svtApiAllowlist = (env = process.env) => (env.SVT_FORMS_ENABLED === 'true' ? [...SVT_FORM_ROUTES] : [])
const SVT_API_ALLOWLIST = svtApiAllowlist()

/** A path that matches nothing, so the rewrite renders the default 404. */
const NOT_FOUND_PATH = '/__brand-isolation-404'

const escapeHost = (h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Next matches `has.value` as `^value$`. The group matters: without it the
 *  anchors bind only to the first and last alternatives (`^a|b|c$`), so a host
 *  that merely CONTAINS an SVT host name would match. */
const svtHostPattern = () => `(?:${SVT_HOSTS.map(escapeHost).join('|')})`

const svtHost = () => ({ type: 'host', value: svtHostPattern() })

/** beforeFiles rewrites: they run before the filesystem and the app routes,
 *  so on an SVT host nothing from WHT can be matched. */
function brandRewrites(allowlist = SVT_API_ALLOWLIST) {
  const apiAllow = allowlist.map((p) => p.replace(/^\/api\//, ''))
  const apiBlock = apiAllow.length
    ? `/api/:path((?!(?:${apiAllow.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})$).*)`
    : '/api/:path*'
  // ORDER MATTERS. Next applies beforeFiles rewrites in sequence and keeps
  // going with the REWRITTEN path, so a later rule sees the output of an
  // earlier one (verified against `next start`, 26 Oct). Hence rule 1 is the
  // only one that sees the path as the client sent it, and the catch-all must
  // not match its own output (/svt-site/...).
  return [
    // 1. SVT host: the internal segment cannot be requested directly, so no
    //    page has two URLs.
    { source: `/${SVT_SEGMENT}`, has: [svtHost()], destination: NOT_FOUND_PATH },
    { source: `/${SVT_SEGMENT}/:path*`, has: [svtHost()], destination: NOT_FOUND_PATH },
    // 2. SVT host: API default-deny.
    { source: apiBlock, has: [svtHost()], destination: NOT_FOUND_PATH },
    { source: '/api', has: [svtHost()], destination: NOT_FOUND_PATH },
    // 3. SVT host: home, then everything else into the SVT tree. Next's own
    //    assets (/_next), SVT public files, allowed API routes and paths that
    //    are already inside the SVT tree are left alone.
    { source: '/', has: [svtHost()], destination: `/${SVT_SEGMENT}` },
    {
      source: `/:path((?!_next/|${SVT_ASSETS}/|api/|api$|${SVT_SEGMENT}/|${SVT_SEGMENT}$).+)`,
      has: [svtHost()],
      destination: `/${SVT_SEGMENT}/:path`,
    },
    // 4. Every other host: the SVT tree and SVT files do not exist.
    { source: `/${SVT_SEGMENT}`, missing: [svtHost()], destination: NOT_FOUND_PATH },
    { source: `/${SVT_SEGMENT}/:path*`, missing: [svtHost()], destination: NOT_FOUND_PATH },
    { source: `/${SVT_ASSETS}/:path*`, missing: [svtHost()], destination: NOT_FOUND_PATH },
  ]
}

/** WHT redirects must never fire on an SVT host (they point at WHT paths). */
function whtOnly(rules) {
  return rules.map((r) => ({ ...r, missing: [...(r.missing || []), svtHost()] }))
}

module.exports = {
  SVT_HOSTS,
  SVT_SEGMENT,
  SVT_ASSETS,
  SVT_API_ALLOWLIST,
  SVT_FORM_ROUTES,
  svtApiAllowlist,
  NOT_FOUND_PATH,
  svtHost,
  svtHostPattern,
  brandRewrites,
  whtOnly,
}

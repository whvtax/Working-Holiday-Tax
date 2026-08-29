/** @type {import('next').NextConfig} */
// When CSP_NONCE_ENABLED=true, the CSP is set per-request (with a nonce) by
// middleware instead, so we must NOT also emit a static CSP here or the two
// headers conflict. All OTHER security headers stay regardless.
// Nonce CSP on /crm is ON BY DEFAULT (Jo, 29 Aug). The /crm surface renders
// text a stranger typed into WhatsApp, so it is the one screen that most needs
// a strict script policy; browser-verified that CRM login and the public site
// both work under it. CSP_NONCE_DISABLED=true is the one-variable escape hatch
// if the Facebook WhatsApp-connect popup ever misbehaves in production.
const CSP_NONCE_ENABLED = process.env.CSP_NONCE_DISABLED !== 'true'

const staticCsp = {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for hydration chunks. 'unsafe-eval' is only
      // needed for dev HMR, so it's excluded from production builds.
      // https://www.googletagmanager.com: GA4's gtag.js loader script.
      // https://connect.facebook.net: WhatsApp Embedded Signup (Facebook JS SDK) on /crm/whatsapp/connect.
      `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net${process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : ''}`,
      // Tailwind inline styles + Google Fonts stylesheet
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Google Fonts files
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self, data URIs, blob (object URLs), Supabase Storage, own domain (OG image)
      "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://workingholidaytax.com.au https://lh3.googleusercontent.com",
      // PDF preview iframes (blob: object URLs) + YouTube embeds + Facebook login dialog (Embedded Signup)
      "frame-src 'self' blob: https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com https://www.facebook.com https://web.facebook.com https://staticxx.facebook.com",
      // Supabase API calls + same-origin
      // + GA4 beacons (google-analytics.com + regional subdomains, googletagmanager.com config fetch)
      // + Facebook Graph / login endpoints (Embedded Signup)
      "connect-src 'self' https://*.supabase.co https://*.supabase.in https://api.resend.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://graph.facebook.com https://www.facebook.com https://connect.facebook.net",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "upgrade-insecure-requests",
    ].join('; '),
  }

const securityHeaders = [
  { key: 'X-Content-Type-Options',  value: 'nosniff' },
  { key: 'X-Frame-Options',         value: 'DENY' },
  { key: 'X-XSS-Protection',        value: '1; mode=block' },
  { key: 'Referrer-Policy',         value: 'strict-origin-when-cross-origin' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy',      value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), accelerometer=(), gyroscope=()' },
  // 'same-origin-allow-popups' (not 'same-origin') so the Facebook Embedded
  // Signup login popup can post its result back to the opener. Still isolates
  // this site from being reached by other windows.
  { key: 'Cross-Origin-Opener-Policy',   value: 'same-origin-allow-popups' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control',       value: 'on' },
]

// ─────────────────────────────────────────────────────────────────────────
// WHERE EACH CSP APPLIES — decided empirically, 29 Aug.
//
// Nonce CSP was designed as all-or-nothing (this flag used to swap the static
// CSP out for the whole site). Tested in a real browser with the flag on: all
// ~540 prerendered pages broke — every _next/static chunk refused, no
// hydration, a dead tax form. That is structural, not a bug: the nonce changes
// per request and prerendered HTML cannot carry it. Public pages therefore
// KEEP the static CSP with 'unsafe-inline', always.
//
// The CRM is the opposite case on both axes: its pages are dynamically
// rendered (cookies() on every one), so Next can stamp the per-request nonce
// into its scripts — and it is where the strict policy actually matters,
// because it renders text written by customers over WhatsApp. So the flag now
// means: nonce CSP on /crm only, set by middleware. The static CSP is scoped
// off /crm in that mode so the two policies never apply to the same response
// (two CSPs enforce their intersection, which is a debugging trap).
// ─────────────────────────────────────────────────────────────────────────
const publicHeaders = [...securityHeaders, staticCsp]
const crmHeaders    = CSP_NONCE_ENABLED ? securityHeaders : publicHeaders

const nextConfig = {
  trailingSlash: false,
  compress: true,
  // Build-time safety net. The codebase typechecks clean, so failing the build
  // on real type errors is worth it for a site handling financial PII. (The
  // eslint key is gone: Next 16 removed `next lint` and no longer runs ESLint
  // during builds — `npm run lint` calls eslint directly instead.)
  typescript: { ignoreBuildErrors: false },
  experimental: {
    serverActions: { bodySizeLimit: '15mb' },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.supabase.in' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      // Order matters to a reader, not to Next (all matching rules merge, later
      // wins per key): /crm gets its own rule so the CSP key can differ there.
      { source: '/crm/:path*', headers: crmHeaders },
      { source: '/crm', headers: crmHeaders },
      { source: '/((?!crm).*)', headers: publicHeaders },
      // Serve llms.txt and llms-full.txt as plain text with cache headers
      // so AI crawlers can ingest the structured content map.
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=3600, must-revalidate' },
        ],
      },
      // Static assets - long cache (immutable file content)
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/:path(favicon\\.svg|icon-192\\.png|icon-512\\.png|apple-touch-icon\\.png|og-image\\.png|manifest\\.json)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=2592000' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // The two-stage intake (/start + /complete/<token>) has been removed in
      // favour of the single full /tax-form. These redirects are NOT for SEO,
      // both routes were noindex. They exist so a customer who still has one
      // of those links sitting in their WhatsApp lands on the real form instead
      // of a 404. A dead link is a lost customer.
      // Temporary (302) on purpose: these are not canonical URLs and should not
      // be cached permanently by anyone's browser.
      {
        source: '/complete/:token',
        destination: '/tax-form',
        permanent: false,
      },
      { source: '/start',    destination: '/tax-form',    permanent: false },
      { source: '/de/start', destination: '/de/tax-form', permanent: false },
      { source: '/ja/start', destination: '/ja/tax-form', permanent: false },
      // ─── Superannuation cluster consolidation (Aug 2026) ──────────────────
      // Five broad "how do I claim my super" guides were merged into the
      // /superannuation answer hub. They ranked 21-33 while narrow DASP guides
      // with a unique intent ranked 7-13, which is cannibalisation rather than
      // an authority problem. Their unique content was folded into the hub and
      // into /blog/dasp-documents-required before removal.
      // Two near-dead super-rate guides were merged into
      // /blog/how-much-super-should-employer-pay.
      // 301 in all three languages so no accrued authority is thrown away.
      // The /guides/* variants are listed explicitly to avoid a double hop on
      // mobile: /guides/:path* would otherwise 301 to /blog/* and then again.
      ...[
        ['best-way-to-claim-super-leaving-australia', 'superannuation'],
        ['how-to-apply-for-super-back',               'superannuation'],
        ['what-is-dasp-super-withdrawal',             'superannuation'],
        ['can-you-withdraw-super-in-australia',       'superannuation'],
        ['what-is-superannuation',                    'superannuation'],
        ['super-stapling-rule-australia',             'blog/how-much-super-should-employer-pay'],
        ['super-rate-12-percent-2025-2026-increase',  'blog/how-much-super-should-employer-pay'],
      ].flatMap(([slug, target]) => [
        { source: `/blog/${slug}`,    destination: `/${target}`,     permanent: true },
        { source: `/guides/${slug}`,  destination: `/${target}`,     permanent: true },
        { source: `/de/blog/${slug}`, destination: `/de/${target}`,  permanent: true },
        { source: `/ja/blog/${slug}`, destination: `/ja/${target}`,  permanent: true },
      ]),

      // Permanent 301 redirects: old /guides URLs to the new /blog URLs
      // Preserves SEO authority of any external links pointing to the old paths.
      {
        source: '/guides',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/guides/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      // Slug update: minimum-wage-australia-2024-25 → 2025-26 (kept old URL working)
      {
        source: '/blog/minimum-wage-australia-2024-25',
        destination: '/blog/minimum-wage-australia-2026-27',
        permanent: true,
      },
      // Annual slug roll-forward: 2025-26 -> 2026-27 (FWC review effective 1 July 2026)
      {
        source: '/blog/minimum-wage-australia-2025-26',
        destination: '/blog/minimum-wage-australia-2026-27',
        permanent: true,
      },
      {
        source: '/de/blog/minimum-wage-australia-2025-26',
        destination: '/de/blog/minimum-wage-australia-2026-27',
        permanent: true,
      },
      {
        source: '/ja/blog/minimum-wage-australia-2025-26',
        destination: '/ja/blog/minimum-wage-australia-2026-27',
        permanent: true,
      },

    ]
  },
}

module.exports = nextConfig

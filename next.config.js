/** @type {import('next').NextConfig} */
// When CSP_NONCE_ENABLED=true, the CSP is set per-request (with a nonce) by
// middleware instead, so we must NOT also emit a static CSP here or the two
// headers conflict. All OTHER security headers stay regardless.
const CSP_NONCE_ENABLED = process.env.CSP_NONCE_ENABLED === 'true'

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
  // Static CSP only when NOT in nonce mode (middleware owns CSP in nonce mode).
  ...(CSP_NONCE_ENABLED ? [] : [staticCsp]),
]

const nextConfig = {
  trailingSlash: false,
  compress: true,
  // Build-time safety nets. The codebase typechecks clean and lint emits only
  // warnings, so failing the build on real type errors is worth it for a site
  // handling financial PII. Flip back to true only as a temporary escape hatch.
  eslint:     { ignoreDuringBuilds: false },
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
      { source: '/(.*)', headers: securityHeaders },
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
      // favour of the single full /tax-form. These redirects are NOT for SEO —
      // both routes were noindex — they exist so a customer who still has one
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
      // Permanent 301 redirects: old /guides URLs → new /blog URLs
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

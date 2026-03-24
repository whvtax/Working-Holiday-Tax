/** @type {import('next').NextConfig} */

// ─── SECURITY HEADERS ────────────────────────────────────────────────────────
// Applied to every response via Next.js middleware layer.
//
// CSP NOTES:
//   • Next.js 14 App Router injects inline <script> tags for hydration
//     and uses eval() in development.  In production builds, eval() is not
//     used by framework code, but 'unsafe-inline' is still required for the
//     Next.js script chunks until nonce-based CSP is wired in.
//   • 'unsafe-eval' is scoped to development only (see conditional below).
//   • To fully remove 'unsafe-inline' in a future hardening pass, implement
//     nonce injection via Next.js middleware + generateNonce().
// ─────────────────────────────────────────────────────────────────────────────

const isProd = process.env.NODE_ENV === 'production'

const cspDirectives = [
  // Fallback for any unspecified resource type
  "default-src 'self'",

  // Scripts:
  //   - 'self'           → app JS bundles
  //   - 'unsafe-inline'  → Next.js hydration scripts (required until nonce CSP)
  //   - 'unsafe-eval'    → dev only (Next.js hot reload); REMOVED in production
  isProd
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'",

  // Styles: Next.js / Tailwind inject inline styles
  "style-src 'self' 'unsafe-inline'",

  // Images: self + data URIs (inline SVG/grain texture)
  "img-src 'self' data:",

  // Fonts: self only (next/font self-hosts all Google Fonts at build time)
  "font-src 'self'",

  // Fetch/XHR: self only — no client-side API calls to third parties
  "connect-src 'self'",

  // Forms: only submit to same origin
  "form-action 'self'",

  // No iframes embedded anywhere on the site
  "frame-src 'none'",

  // Prevent this site being embedded in external iframes (clickjacking)
  "frame-ancestors 'none'",

  // Force all sub-resource requests over HTTPS
  "upgrade-insecure-requests",
]

const securityHeaders = [
  // ── Anti-clickjacking (belt + suspenders with frame-ancestors above) ────────
  {
    key: 'X-Frame-Options',
    value: 'DENY',                       // upgraded from SAMEORIGIN → DENY (no iframes used)
  },

  // ── MIME sniffing protection ────────────────────────────────────────────────
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },

  // ── Referrer: send origin only on cross-origin, full URL on same-origin ─────
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },

  // ── Feature/permissions policy: disable all unused browser APIs ────────────
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'interest-cohort=()',  // disable FLoC
      'payment=()',
      'usb=()',
      'bluetooth=()',
    ].join(', '),
  },

  // ── DNS prefetch (performance, no security downside) ────────────────────────
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },

  // ── Legacy XSS filter for IE/old browsers (still harmless to send) ──────────
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },

  // ── HSTS: enforce HTTPS for 2 years, include subdomains, opt into preload ───
  // IMPORTANT: only activate preload after registering at hstspreload.org
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },

  // ── Content Security Policy ─────────────────────────────────────────────────
  {
    key: 'Content-Security-Policy',
    value: cspDirectives.join('; '),
  },

  // ── Cross-Origin policies (isolation) ───────────────────────────────────────
  // Prevents Spectre-class side-channel attacks via SharedArrayBuffer
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'require-corp',
  },
]

// ─── NEXT.JS CONFIG ──────────────────────────────────────────────────────────
const nextConfig = {
  // Remove X-Powered-By: Next.js (prevents version fingerprinting)
  poweredByHeader: false,

  // React Strict Mode: surfaces double-render bugs and unsafe lifecycle usage
  reactStrictMode: true,

  // Disable source maps in production (prevent source code exposure)
  productionBrowserSourceMaps: false,

  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig

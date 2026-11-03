// ─────────────────────────────────────────────────────────────────────────
// Content-Security-Policy-REPORT-ONLY candidate (security audit, sec-frontend).
//
// This file only BUILDS a header value. Nothing here enforces anything, and
// next.config.js attaches it ONLY when CSP_REPORT_ONLY=true is set in the
// environment (off by default, so production behaviour is unchanged).
//
// Why a separate candidate rather than editing the enforced CSP: the enforced
// policy works today and must not be disturbed. This candidate is the policy
// we would like to move to - the same shape, but with every origin that the
// code does not actually need removed - so a Report-Only period can prove the
// tightening is safe before anyone touches the enforced header.
//
// What was removed versus the enforced WHT policy, and the evidence:
//   - fonts.googleapis.com / fonts.gstatic.com: fonts are self-hosted by
//     next/font at build time (RootDocument.tsx; src/lib/__tests__/font-imports.test.ts).
//   - connect.facebook.net, facebook.com frames, graph.facebook.com: the Facebook
//     SDK is only loaded by /crm/whatsapp/connect (ConnectClient.tsx), and /crm
//     has its own nonce CSP from src/proxy.ts. No public page uses it.
//   - api.resend.com in connect-src: Resend is called from server routes only.
//   - *.supabase.co / *.supabase.in: no client component imports Supabase;
//     uploads go through /api/*, and next/image fetches Supabase images
//     server-side via /_next/image.
//   - the bare youtube.com frame origin (embeds use www.youtube.com).
//   - the site's own absolute origin in img-src (covered by 'self').
// What was ADDED (Google documents these for GA4; the enforced policy lacks
// them, so GA4 may already be losing hits - the report will show):
//   - https://*.analytics.google.com and https://stats.g.doubleclick.net in
//     connect-src, and the GA/GTM origins in img-src (GA4's image fallback).
//
// 'unsafe-inline' stays on script-src and style-src ON PURPOSE. Next.js emits
// inline bootstrap scripts into ~520 prerendered pages, and a per-request nonce
// cannot exist in static HTML (proven empirically 29 Aug, see next.config.js).
// Removing it needs a different mechanism (hash-based CSP) and is a separate,
// later experiment. The public site renders no user-supplied HTML, so the
// residual XSS exposure of 'unsafe-inline' here is low.
// ─────────────────────────────────────────────────────────────────────────

const HEADER_NAME = 'Content-Security-Policy-Report-Only'

const GA_CONNECT = [
  'https://www.google-analytics.com',
  'https://*.google-analytics.com',
  'https://*.analytics.google.com',
  'https://www.googletagmanager.com',
  'https://stats.g.doubleclick.net',
]
const GA_IMG = ['https://www.google-analytics.com', 'https://www.googletagmanager.com']

/** Only a same-site path or an https URL may be used as the report receiver. */
function safeReportUri(value) {
  if (typeof value !== 'string') return null
  const v = value.trim()
  if (!v || /[\s;,'"]/.test(v)) return null
  if (v.startsWith('/') && !v.startsWith('//')) return v
  if (/^https:\/\/[A-Za-z0-9.-]+(?::\d+)?(\/[^\s;,'"]*)?$/.test(v)) return v
  return null
}

/**
 * @param {'wht'|'svt'} brand
 * @param {{ reportUri?: string, isDev?: boolean }} [opts]
 */
function buildReportOnlyCsp(brand, opts = {}) {
  const isDev = !!opts.isDev
  const unsafeEval = isDev ? " 'unsafe-eval'" : ''
  const wht = brand !== 'svt'
  const directives = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${unsafeEval}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    // lh3.googleusercontent.com: Google reviewer avatars on the WHT review carousel only.
    `img-src 'self' data: blob:${wht ? ' https://lh3.googleusercontent.com' : ''} ${GA_IMG.join(' ')}`,
    // blob: for in-page PDF/image previews of the visitor's own uploads (WHT tax form).
    wht
      ? "frame-src 'self' blob: https://www.youtube.com https://www.youtube-nocookie.com"
      : "frame-src 'none'",
    `connect-src 'self' ${GA_CONNECT.join(' ')}`,
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    // upgrade-insecure-requests is deliberately absent: browsers ignore it in a
    // Report-Only policy and log a console warning. The enforced CSP keeps it.
  ]
  const report = safeReportUri(opts.reportUri)
  if (report) directives.push(`report-uri ${report}`)
  return directives.join('; ')
}

/** Header objects in Next's shape. Empty unless enabled, so spreading is free. */
function reportOnlyHeaders(brand, env = process.env) {
  if (env.CSP_REPORT_ONLY !== 'true') return []
  return [{
    key: HEADER_NAME,
    value: buildReportOnlyCsp(brand, {
      reportUri: env.CSP_REPORT_URI,
      isDev: env.NODE_ENV === 'development',
    }),
  }]
}

module.exports = { HEADER_NAME, buildReportOnlyCsp, reportOnlyHeaders, safeReportUri }

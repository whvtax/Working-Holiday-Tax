import { NextRequest, NextResponse } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────
// Middleware: (1) locale header for server-side <html lang>, and
// (2) OPTIONAL nonce-based Content-Security-Policy.
//
// CSP nonce mode is OFF by default and only activates when the environment
// variable CSP_NONCE_ENABLED === 'true'. When OFF, behaviour is identical to
// before and the static CSP in next.config.js (with 'unsafe-inline') applies.
//
// ⚠️ BEFORE enabling in production: set CSP_NONCE_ENABLED=true in a Vercel
// PREVIEW deployment, open the site, and confirm in DevTools that no scripts
// are blocked (hydration works, JSON-LD present, YouTube embeds load). A
// misconfigured nonce CSP blocks ALL inline scripts and breaks the page, so
// this must be verified in a browser before promoting to prod.
// ─────────────────────────────────────────────────────────────────────────

const CSP_NONCE_ENABLED = process.env.CSP_NONCE_ENABLED === 'true'

function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV === 'development'
  return [
    "default-src 'self'",
    // Nonce + strict-dynamic: only scripts carrying this request's nonce (and
    // scripts they load) execute. Next.js auto-applies the nonce to its own
    // hydration scripts when it sees a nonce in the CSP. 'unsafe-eval' dev-only.
    // connect.facebook.net: Meta's Embedded Signup SDK (admin-only WhatsApp
    // connect page). Note: strict-dynamic means scripts loaded BY a nonce'd
    // script are trusted automatically, so this entry is mainly documentation
    // — but kept explicit in case strict-dynamic support changes.
    // https://www.googletagmanager.com: GA4's gtag.js loader script.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://connect.facebook.net https://www.googletagmanager.com${isDev ? " 'unsafe-eval'" : ''}`,
    // Styles still use 'unsafe-inline' (next/font + many inline styles); style
    // nonces are lower-value and high-churn here.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://workingholidaytax.com.au https://lh3.googleusercontent.com",
    "frame-src 'self' blob: https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com https://www.facebook.com https://web.facebook.com",
    // GA4 beacons: google-analytics.com (+ regional subdomains) and the
    // googletagmanager.com config fetch.
    "connect-src 'self' https://*.supabase.co https://*.supabase.in https://api.resend.com https://graph.facebook.com https://connect.facebook.net https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ')
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const locale = pathname === '/ja' || pathname.startsWith('/ja/')
    ? 'ja'
    : pathname === '/de' || pathname.startsWith('/de/')
      ? 'de'
      : 'en-AU'

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-locale', locale)
  // Used by the root layout to skip GA4 tagging on /crm (internal staff area),
  // so admin/staff usage doesn't pollute public-site analytics.
  requestHeaders.set('x-pathname', pathname)

  if (!CSP_NONCE_ENABLED) {
    // Default path - unchanged behaviour. Static CSP from next.config.js applies.
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // Nonce mode: generate a per-request nonce, expose it to the app via x-nonce,
  // and set the CSP on both request and response headers.
  const nonce = btoa(crypto.randomUUID())
  const csp = buildCsp(nonce)
  requestHeaders.set('x-nonce', nonce)
  requestHeaders.set('content-security-policy', csp)

  const res = NextResponse.next({ request: { headers: requestHeaders } })
  res.headers.set('content-security-policy', csp)
  return res
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\.[\\w]+$).*)'],
}

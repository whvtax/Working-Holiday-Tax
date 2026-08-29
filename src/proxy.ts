import { NextRequest, NextResponse } from 'next/server'

// ─────────────────────────────────────────────────────────────────────────
// Proxy (the Next 16 name for middleware): (1) locale header for
// server-side <html lang>, and
// (2) OPTIONAL nonce-based Content-Security-Policy.
//
// CSP nonce mode is OFF by default and only activates when the environment
// nonce CSP is ON by default and applies only to /crm. The public
// site always keeps the static CSP from next.config.js (with 'unsafe-inline'):
// its ~540 pages are prerendered, a per-request nonce cannot exist in static
// HTML, and turning nonce mode on site-wide was tested in a real browser and
// broke every page. See the comment above `isCrm` below.
//
// To DISABLE (fall back to the static CSP on /crm too): set CSP_NONCE_DISABLED=true in a Vercel
// PREVIEW deployment, open the site, and confirm in DevTools that no scripts
// are blocked (hydration works, JSON-LD present, YouTube embeds load). A
// misconfigured nonce CSP blocks ALL inline scripts and breaks the page, so
// this must be verified in a browser before promoting to prod.
// ─────────────────────────────────────────────────────────────────────────

// ON by default for /crm; set CSP_NONCE_DISABLED=true to fall back to the
// static CSP everywhere. See next.config.js for the reasoning.
const CSP_NONCE_ENABLED = process.env.CSP_NONCE_DISABLED !== 'true'

function buildCsp(nonce: string): string {
  const isDev = process.env.NODE_ENV === 'development'
  return [
    "default-src 'self'",
    // Nonce + strict-dynamic: only scripts carrying this request's nonce (and
    // scripts they load) execute. Next.js auto-applies the nonce to its own
    // hydration scripts when it sees a nonce in the CSP. 'unsafe-eval' dev-only.
    // https://www.googletagmanager.com: GA4's gtag.js loader script.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://www.googletagmanager.com https://connect.facebook.net${isDev ? " 'unsafe-eval'" : ''}`,
    // Styles still use 'unsafe-inline' (next/font + many inline styles); style
    // nonces are lower-value and high-churn here.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://workingholidaytax.com.au https://lh3.googleusercontent.com",
    "frame-src 'self' blob: https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com https://www.facebook.com https://web.facebook.com https://staticxx.facebook.com",
    // GA4 beacons: google-analytics.com (+ regional subdomains) and the
    // googletagmanager.com config fetch.
    "connect-src 'self' https://*.supabase.co https://*.supabase.in https://api.resend.com https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://graph.facebook.com https://www.facebook.com https://connect.facebook.net",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join('; ')
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const locale = pathname === '/ja' || pathname.startsWith('/ja/')
    ? 'ja'
    : pathname === '/de' || pathname.startsWith('/de/')
      ? 'de'
      : 'en-AU'

  // Nonce CSP is CRM-ONLY, and that is empirical, not taste (29 Aug): with the
  // old site-wide behaviour every prerendered page broke in a real browser —
  // the nonce changes per request and static HTML cannot carry it, so every
  // chunk was refused and the tax form was dead. The CRM's pages are all
  // dynamically rendered (cookies() on each), Next stamps this nonce into
  // their scripts at request time, and the CRM is where customer-authored
  // WhatsApp text gets rendered — the one surface that deserves the strict
  // policy. Public pages keep the static CSP from next.config.js.
  const isCrm = pathname === '/crm' || pathname.startsWith('/crm/')

  if (!CSP_NONCE_ENABLED || !isCrm) {
    // Default path. NOTHING READS x-locale OR x-pathname ANY MORE.
    //
    // Both were set on every request for consumers that no longer exist: the
    // root layout stopped reading headers() precisely to regain static
    // generation (see its comment), and Analytics derives the path client-side.
    // Setting them meant cloning the header set and returning a modified
    // request on all 523 prerendered pages, so every page view paid for an edge
    // invocation ahead of what is otherwise a pure CDN hit. With nonce mode off
    // this branch now does nothing at all, which is the correct amount.
    return NextResponse.next()
  }

  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-locale', locale)
  requestHeaders.set('x-pathname', pathname)

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

// The proxy now does exactly one thing: set the nonce CSP on /crm. It used to
// match every non-asset, non-API path, so it ran an invocation in front of all
// ~519 static pages to do nothing (it returned NextResponse.next() for anything
// that was not /crm). Narrowing the matcher to /crm removes that hop from every
// public page view, so those are pure CDN hits again. Nothing reads x-locale or
// x-pathname any more, so no public page needs the proxy.
export const config = {
  matcher: ['/crm', '/crm/:path*'],
}

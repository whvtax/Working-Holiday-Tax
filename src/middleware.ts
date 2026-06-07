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
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ''}`,
    // Styles still use 'unsafe-inline' (next/font + many inline styles); style
    // nonces are lower-value and high-churn here.
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https://*.supabase.co https://*.supabase.in https://workingholidaytax.com.au https://lh3.googleusercontent.com",
    "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com",
    "connect-src 'self' https://*.supabase.co https://*.supabase.in https://api.resend.com",
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

  if (!CSP_NONCE_ENABLED) {
    // Default path — unchanged behaviour. Static CSP from next.config.js applies.
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

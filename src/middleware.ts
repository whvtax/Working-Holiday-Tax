import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { parseSession } from '@/lib/crm-store'

/**
 * Nonce-based CSP middleware.
 * SECURITY FIX: style-src now also uses nonce (removes unsafe-inline for styles).
 * SECURITY FIX 2: Server-side auth guard for /crm/* routes.
 *   Previously /crm/dashboard relied entirely on client-side redirect after logout.
 *   Now the middleware redirects unauthenticated requests server-side.
 *   Note: this is a lightweight sync check (HMAC + expiry only). The full Redis
 *   revocation check still happens inside each API route via validateSessionAsync().
 * SECURITY FIX 3: CVE-2025-29927 mitigation — block x-middleware-subrequest header.
 *   This header was used to bypass middleware auth checks in Next.js <14.2.25.
 *   Blocking it here provides defence-in-depth even on patched versions.
 */

const CRM_PUBLIC_PATHS = [
  '/crm',
  '/api/crm/login',
  '/api/crm/verify-otp',
  '/api/crm/session',
  '/api/crm/logout',
]

export function middleware(req: NextRequest) {
  // SECURITY: CVE-2025-29927 mitigation — reject requests carrying the internal
  // Next.js subrequest header. Attackers used this to skip middleware entirely.
  // Defence-in-depth: also fixed by upgrading to next@14.2.29.
  if (req.headers.get('x-middleware-subrequest')) {
    return NextResponse.json({ ok: false }, { status: 403 })
  }

  const { pathname } = req.nextUrl

  // ── Server-side CRM auth guard ─────────────────────────────────────────
  const isCrmRoute = pathname.startsWith('/crm/') || pathname.startsWith('/api/crm/')
  const isPublicCrmPath = CRM_PUBLIC_PATHS.some(p => pathname === p)

  if (isCrmRoute && !isPublicCrmPath) {
    const token = req.cookies.get('crm_session')?.value
    const session = parseSession(token)
    if (!session) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ ok: false }, { status: 401 })
      }
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/crm'
      return NextResponse.redirect(loginUrl)
    }
  }

  // ── Nonce-based CSP (all routes) ───────────────────────────────────────
  const nonce = randomBytes(16).toString('base64')

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.resend.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ')

  const res = NextResponse.next()

  res.headers.set('Content-Security-Policy', csp)
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()')
  res.headers.set('x-nonce', nonce)

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/).*)'],
}

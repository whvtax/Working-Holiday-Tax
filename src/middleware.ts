import { NextRequest, NextResponse } from 'next/server'
import { parseSessionEdge } from '@/lib/session-edge'

/**
 * Nonce-based CSP middleware.
 * SECURITY FIX: style-src now also uses nonce (removes unsafe-inline for styles).
 * SECURITY FIX 2: Server-side auth guard for /crm/* routes.
 * SECURITY FIX 3: CVE-2025-29927 mitigation — block x-middleware-subrequest header.
 * EDGE FIX: Removed Node.js `crypto` import — middleware runs in the Vercel Edge
 *   Runtime which does not support Node crypto. Now uses Web Crypto API via
 *   session-edge.ts for session parsing and crypto.getRandomValues() for nonces.
 */

const CRM_PUBLIC_PATHS = [
  '/crm',
  '/api/crm/login',
  '/api/crm/verify-otp',
  '/api/crm/session',
  '/api/crm/logout',
]

export async function middleware(req: NextRequest) {
  if (req.headers.get('x-middleware-subrequest')) {
    return NextResponse.json({ ok: false }, { status: 403 })
  }

  const { pathname } = req.nextUrl

  const isCrmRoute = pathname.startsWith('/crm/') || pathname.startsWith('/api/crm/')
  const isPublicCrmPath = CRM_PUBLIC_PATHS.some(p => pathname === p)

  if (isCrmRoute && !isPublicCrmPath) {
    const token = req.cookies.get('crm_session')?.value
    const session = await parseSessionEdge(token)
    if (!session) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ ok: false }, { status: 401 })
      }
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/crm'
      return NextResponse.redirect(loginUrl)
    }
  }

  // Use Web Crypto (Edge-compatible) instead of Node's randomBytes
  const nonceBytes = new Uint8Array(16)
  crypto.getRandomValues(nonceBytes)
  const nonce = btoa(Array.from(nonceBytes, b => String.fromCharCode(b)).join(""))

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

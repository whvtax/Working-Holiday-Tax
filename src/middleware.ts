import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

/**
 * Nonce-based Content Security Policy middleware.
 *
 * On every request we:
 *   1. Generate a cryptographically random nonce (base64, 16 bytes → 24 chars).
 *   2. Build a strict CSP that whitelists only scripts carrying this nonce.
 *      'unsafe-inline' is intentionally omitted — inline scripts require the nonce.
 *   3. Set the CSP as a response header AND forward the nonce in
 *      `x-nonce` so the layout server component can inject it into <head>.
 *
 * Why middleware and not next.config.js headers()?
 *   next.config.js headers are static — they cannot contain a per-request nonce.
 *   Middleware runs in the Edge runtime before every response, making dynamic
 *   CSP headers possible without a custom server.
 */
export function middleware(req: NextRequest) {
  const nonce = randomBytes(16).toString('base64')

  const csp = [
    "default-src 'self'",
    // Allow scripts only with the matching nonce (no unsafe-inline, no unsafe-eval)
    `script-src 'self' 'nonce-${nonce}'`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.resend.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ')

  const res = NextResponse.next()

  // Security headers — applied on every response (complements next.config.js for non-Vercel hosts)
  res.headers.set('Content-Security-Policy', csp)
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()')

  // Forward nonce to layout via request header (server components can read request headers)
  res.headers.set('x-nonce', nonce)

  return res
}

export const config = {
  // Apply to all routes except static assets and Next.js internals
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|assets/).*)',
  ],
}

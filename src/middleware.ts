import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'

/**
 * Nonce-based CSP middleware.
 * SECURITY FIX: style-src now also uses nonce (removes unsafe-inline for styles).
 * All inline styles in JSX should use Tailwind classes or CSS modules.
 */
export function middleware(req: NextRequest) {
  const nonce = randomBytes(16).toString('base64')

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}'`,
    // SECURITY FIX: nonce-based style-src — removes unsafe-inline
    // If any pages break, add nonce to their <style> tags or convert to Tailwind classes
    `style-src 'self' 'nonce-${nonce}' https://fonts.googleapis.com`,
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https://api.resend.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
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

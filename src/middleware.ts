import { NextRequest, NextResponse } from 'next/server'

// Locale middleware: sets an `x-locale` request header from the URL prefix so the
// root layout can server-render the correct <html lang> for /de and /ja pages.
// TRADE-OFF: reading this header in the root layout makes pages render dynamically
// rather than statically. Verify with `next build`.
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const locale = pathname === '/ja' || pathname.startsWith('/ja/')
    ? 'ja'
    : pathname === '/de' || pathname.startsWith('/de/')
      ? 'de'
      : 'en-AU'
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-locale', locale)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/|api/|.*\\.[\\w]+$).*)'],
}

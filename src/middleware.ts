import { NextRequest, NextResponse } from 'next/server'

// CSRF protection: all state-mutating API requests must carry the custom header.
// Browser cross-origin requests (CSRF) cannot set custom headers without a preflight,
// so an attacker-controlled page cannot trigger mutations silently.
const MUTATION_METHODS = new Set(['POST', 'PATCH', 'PUT', 'DELETE'])
const CSRF_HEADER = 'x-requested-with'
const CSRF_VALUE  = 'XMLHttpRequest'

// Routes exempt from CSRF check (public form submissions that are already rate-limited)
// FIX: use exact match or trailing-slash prefix to prevent path-traversal bypass
const CSRF_EXEMPT = [
  '/api/abn-form',
  '/api/super-form',
  '/api/tax-form',
  '/api/tfn-form',
  '/api/tax-form/upload',
]

export function middleware(req: NextRequest) {
  const { pathname, method } = { pathname: req.nextUrl.pathname, method: req.method }

  if (
    pathname.startsWith('/api/') &&
    MUTATION_METHODS.has(method) &&
    // FIX: require exact match OR prefix followed by '/' to prevent bypass via e.g. /api/abn-form-evil
    !CSRF_EXEMPT.some(p => pathname === p || pathname.startsWith(p + '/'))
  ) {
    const header = req.headers.get(CSRF_HEADER)
    if (!header || header.toLowerCase() !== CSRF_VALUE.toLowerCase()) {
      return NextResponse.json({ ok: false, error: 'csrf' }, { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}

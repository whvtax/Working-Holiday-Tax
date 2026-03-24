import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function validateToken(token: string | undefined): boolean {
  if (!token) return false
  try {
    const dot = token.lastIndexOf('.')
    if (dot < 0) return false
    const payload  = token.slice(0, dot)
    const sig      = token.slice(dot + 1)
    const secret   = process.env.JWT_SECRET ?? 'whvtax-crm-secret-2024-changeme'
    const expected = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
    // timingSafeEqual requires same length buffers
    const sigBuf = Buffer.from(sig)
    const expBuf = Buffer.from(expected)
    if (sigBuf.length !== expBuf.length) return false
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return false
    const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return Date.now() < exp
  } catch {
    return false
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected =
    pathname.startsWith('/crm/dashboard') ||
    pathname.startsWith('/crm/client')

  if (!isProtected) return NextResponse.next()

  const token = req.cookies.get('crm_session')?.value

  if (!validateToken(token)) {
    const url = req.nextUrl.clone()
    url.pathname = '/crm'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/crm/dashboard', '/crm/dashboard/:path*', '/crm/client/:path*'],
}

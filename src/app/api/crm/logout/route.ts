export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { destroySession, validateSession } from '@/lib/crm-store'

// ─────────────────────────────────────────────────────────────────────────
// Logout.
//
// SECURITY: this route MUST require a valid session.
//
// destroySession() bumps a global "revoked-before" epoch, which invalidates
// EVERY staff session at once. Without a guard, an anonymous
// `curl -X POST /api/crm/logout` logged out the entire company, and in a loop
// nobody could stay logged in at all. It also handed an unauthenticated caller
// an unbounded Redis write.
//
// SameSite=strict stops a browser being tricked into calling this, but the
// endpoint needed no cookie, so it was directly callable by anyone.
//
// The cookie is still cleared on an unauthenticated call: clearing a cookie
// the caller already holds harms nobody, and it lets a client with an expired
// or already-revoked token tidy up its own browser state. What an
// unauthenticated caller can no longer do is revoke everyone else's session.
// ─────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const authorised = validateSession(req.cookies.get('crm_session')?.value)
  if (authorised) await destroySession()

  const res = NextResponse.json({ ok: true })
  // Clear with identical flags to the set - browsers require flag parity to
  // remove a cookie. Missing httpOnly/secure/sameSite means the clear may
  // not remove the cookie in strict environments.
  res.cookies.set('crm_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return res
}

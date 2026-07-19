export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// POST /api/whatsapp/exchange-code
// Server-side-only step of Embedded Signup: exchanges the short-lived
// authorization code (from the browser) for an access token, using the
// App Secret — which must never reach the browser. Admin-session-protected,
// since this effectively mints a credential for the WhatsApp account.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  const { code, wabaId, phoneNumberId } = await req.json().catch(() => ({}))
  if (!code) return NextResponse.json({ ok: false, error: 'Missing code' }, { status: 400 })

  const appId = process.env.NEXT_PUBLIC_META_APP_ID
  const appSecret = process.env.WHATSAPP_APP_SECRET
  if (!appId || !appSecret) {
    return NextResponse.json({ ok: false, error: 'Server missing NEXT_PUBLIC_META_APP_ID / WHATSAPP_APP_SECRET' }, { status: 500 })
  }

  try {
    const url = new URL('https://graph.facebook.com/v21.0/oauth/access_token')
    url.searchParams.set('client_id', appId)
    url.searchParams.set('client_secret', appSecret)
    url.searchParams.set('code', code)

    const res = await fetch(url.toString())
    const data = await res.json()

    if (!res.ok || !data.access_token) {
      return NextResponse.json({ ok: false, error: data?.error?.message ?? 'Token exchange failed' }, { status: 502 })
    }

    // Never log the token itself.
    console.log('[whatsapp exchange-code] success', { wabaId, phoneNumberId })

    return NextResponse.json({
      ok: true,
      accessToken: data.access_token,
      wabaId: wabaId ?? null,
      phoneNumberId: phoneNumberId ?? null,
    })
  } catch (err) {
    console.error('[whatsapp exchange-code]', err)
    return NextResponse.json({ ok: false, error: 'Network error during token exchange' }, { status: 500 })
  }
}

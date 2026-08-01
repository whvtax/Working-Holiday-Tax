export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'

const ALLOWED_EVENTS = new Set(['view', 'step1_complete', 'submit_success'])
const ALLOWED_FORMS = new Set(['tax-form'])

// POST /api/analytics/funnel
// Fire-and-forget funnel event logging for public forms - no auth (these are
// public, unauthenticated pages), rate-limited per IP to prevent abuse.
// Never throws in a way that could break the form itself; the form always
// calls this with .catch(() => {}) so a logging hiccup never blocks a
// real client from submitting.
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (await isRateLimited(ip, 'form-funnel')) {
      return NextResponse.json({ ok: false }, { status: 429 })
    }

    const body = await req.json().catch(() => ({}))
    const formName = typeof body.formName === 'string' ? body.formName : ''
    const eventType = typeof body.eventType === 'string' ? body.eventType : ''
    const sessionId = typeof body.sessionId === 'string' ? body.sessionId.slice(0, 100) : ''
    const lang = typeof body.lang === 'string' ? body.lang.slice(0, 10) : null

    if (!ALLOWED_FORMS.has(formName) || !ALLOWED_EVENTS.has(eventType) || !sessionId) {
      return NextResponse.json({ ok: false, error: 'invalid_event' }, { status: 400 })
    }

    const sb = getSupabase()
    await sb.from('form_funnel_events').insert({
      form_name: formName,
      event_type: eventType,
      session_id: sessionId,
      lang,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[analytics/funnel]', err)
    // Never let analytics failures surface as a real error to the client.
    return NextResponse.json({ ok: true })
  }
}

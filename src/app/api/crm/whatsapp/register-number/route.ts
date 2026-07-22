export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { registerPhoneNumber } from '@/lib/whatsapp'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// POST /api/crm/whatsapp/register-number
// Registers the phone number for Cloud API messaging via a direct API
// call — per Meta's own docs, this is the ONLY way to do this correctly;
// the "Register your WhatsApp phone number" button in the App Dashboard
// leads to a different (non-coexistence) wizard.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  const { pin } = await req.json().catch(() => ({}))
  if (typeof pin !== 'string' || !/^\d{6}$/.test(pin)) {
    return NextResponse.json({ ok: false, error: 'PIN must be exactly 6 digits' }, { status: 400 })
  }

  const result = await registerPhoneNumber(pin)
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}

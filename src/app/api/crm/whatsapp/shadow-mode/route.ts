export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// POST /api/crm/whatsapp/shadow-mode — the on/off switch for shadow mode.
// Turning this off means automated replies start sending themselves
// without approval — only do this once you trust the queue.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const { enabled } = await req.json().catch(() => ({}))
  if (typeof enabled !== 'boolean') {
    return NextResponse.json({ ok: false, error: 'Missing enabled (boolean)' }, { status: 400 })
  }

  const sb = getSupabase()
  const { error } = await sb.from('wa_system_status').update({ shadow_mode: enabled }).eq('id', 1)
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true, shadowMode: enabled })
}

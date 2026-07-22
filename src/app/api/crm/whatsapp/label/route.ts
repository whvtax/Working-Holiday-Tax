export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// POST /api/crm/whatsapp/label — manual, human-only categorisation.
// Completely separate from the automated `stage` pipeline: no bot logic
// reads or writes this. It's just a sorting tool for the tax agent, same
// idea as the labels already used in the WhatsApp Business App.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const { conversationId, label } = await req.json().catch(() => ({}))
  if (!conversationId || typeof conversationId !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing conversationId' }, { status: 400 })
  }
  // label can be null/empty string to clear it.
  const value = typeof label === 'string' && label.trim() ? label.trim() : null

  const sb = getSupabase()
  const { error } = await sb
    .from('wa_conversations')
    .update({ manual_label: value, updated_at: new Date().toISOString() })
    .eq('id', conversationId)

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

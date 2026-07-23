export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// Each pipeline "tab" the CRM board shows can map to more than one raw DB
// stage (e.g. New = opening_sent OR pitch_sent). When the tax agent manually
// drags a conversation onto a tab, this is the single concrete stage we set
// it to — chosen to be whichever of that tab's stages represents "already
// at this point", not a transient in-between one.
const CANONICAL_STAGE_FOR_TAB: Record<string, string> = {
  new:          'pitch_sent',
  reminder1:    'reminder_1_sent',
  reminder2:    'reminder_2_sent',
  abn:          'abn_pending',
  ready:        'ready',
  urgent:       'urgent',
  not_relevant: 'not_relevant',
}

// POST /api/crm/whatsapp/stage
// Manual override of a conversation's pipeline stage — the tax agent
// dragging a card to a different column on the board. This is deliberately
// separate from the automated stage transitions the webhook makes: no bot
// logic depends on this ever being called, it's purely "I decided this
// client belongs here now, right now, regardless of what the automated
// flow thinks." Moving something OUT of Urgent also clears the escalation
// flag, since the agent just resolved it by hand.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const { conversationId, tab } = await req.json().catch(() => ({}))
  if (!conversationId || typeof conversationId !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing conversationId' }, { status: 400 })
  }
  const stage = typeof tab === 'string' ? CANONICAL_STAGE_FOR_TAB[tab] : undefined
  if (!stage) {
    return NextResponse.json({ ok: false, error: 'Unknown tab' }, { status: 400 })
  }

  const sb = getSupabase()

  const update: Record<string, unknown> = { stage, updated_at: new Date().toISOString() }
  if (tab !== 'urgent') {
    update.needs_human = false
    update.escalation_reason = null
  }

  const { error } = await sb
    .from('wa_conversations')
    .update(update)
    .eq('id', conversationId)

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  // Lightweight audit trail — same table already used elsewhere for
  // diagnostics, so a manual override is traceable later if a client's
  // history ever looks surprising.
  await sb.from('wa_system_events').insert({
    event_type: 'manual_stage_move',
    severity: 'info',
    detail: JSON.stringify({ conversationId, movedTo: stage }),
  }).then(() => {}, () => {}) // best-effort, never block the move on this

  return NextResponse.json({ ok: true, stage })
}

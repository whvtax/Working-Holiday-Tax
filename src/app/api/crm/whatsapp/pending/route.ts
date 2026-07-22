export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'
import { sendTextMessage } from '@/lib/whatsapp'
import { logMessage, updateStage, tagIfCompletionMessage } from '@/lib/wa-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// GET /api/crm/whatsapp/pending — the shadow-mode approval queue, plus the
// current shadow_mode on/off state so the CRM can show the toggle.
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const sb = getSupabase()

  const [{ data: pending, error: pendingErr }, { data: status }] = await Promise.all([
    sb.from('wa_pending_messages')
      .select('id, conversation_id, phone, proposed_text, script_key, created_at')
      .eq('status', 'pending')
      .order('created_at', { ascending: true })
      .limit(100),
    sb.from('wa_system_status').select('shadow_mode').eq('id', 1).maybeSingle(),
  ])

  if (pendingErr) return NextResponse.json({ ok: false, error: pendingErr.message }, { status: 500 })

  // Enrich with the client's first name for readability (best-effort).
  const conversationIds = [...new Set((pending ?? []).map(p => p.conversation_id))]
  const namesById: Record<string, string> = {}
  if (conversationIds.length > 0) {
    const { data: convos } = await sb.from('wa_conversations').select('id, first_name').in('id', conversationIds)
    for (const c of convos ?? []) namesById[c.id] = c.first_name
  }

  const items = (pending ?? []).map(p => ({
    id: p.id,
    conversationId: p.conversation_id,
    phone: p.phone,
    firstName: namesById[p.conversation_id] || '',
    proposedText: p.proposed_text,
    scriptKey: p.script_key,
    createdAt: p.created_at,
  }))

  return NextResponse.json({ ok: true, items, shadowMode: status?.shadow_mode ?? true })
}

// POST /api/crm/whatsapp/pending — approve (optionally with edited text) or
// reject a queued message. Approving here is the ONLY way a shadow-mode
// message actually reaches the client.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const { id, action, editedText } = await req.json().catch(() => ({}))
  if (!id || (action !== 'approve' && action !== 'reject')) {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 })
  }

  const sb = getSupabase()
  const { data: item } = await sb.from('wa_pending_messages').select('*').eq('id', id).maybeSingle()
  if (!item) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 })
  if (item.status !== 'pending') return NextResponse.json({ ok: false, error: 'Already handled' }, { status: 409 })

  if (action === 'reject') {
    await sb.from('wa_pending_messages').update({
      status: 'rejected', reviewed_at: new Date().toISOString(),
    }).eq('id', id)
    return NextResponse.json({ ok: true, sent: false })
  }

  const finalText = typeof editedText === 'string' && editedText.trim() ? editedText.trim() : item.proposed_text

  const result = await sendTextMessage(item.phone, finalText)
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error || 'Failed to send' }, { status: 502 })
  }

  await logMessage(item.conversation_id, 'outbound', finalText, item.script_key, result.messageId)

  if (item.next_stage_json?.stage) {
    await updateStage(item.conversation_id, item.next_stage_json.stage, item.next_stage_json.extra)
  }

  await sb.from('wa_pending_messages').update({
    status: 'approved', final_text: finalText, reviewed_at: new Date().toISOString(),
  }).eq('id', id)

  await tagIfCompletionMessage(item.conversation_id, finalText)

  return NextResponse.json({ ok: true, sent: true })
}

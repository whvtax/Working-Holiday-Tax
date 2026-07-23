export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'
import { sendTextMessage } from '@/lib/whatsapp'
import { logMessage, tagIfCompletionMessage } from '@/lib/wa-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// POST /api/crm/whatsapp/respond
// The tax agent's manual reply from the "Urgent" tab (Section 8/9 handoff).
// Sends the message and clears the escalation flag. Deliberately does NOT
// save to a knowledge base anymore — every future message is always
// re-drafted fresh from the full conversation history (see
// ai-reply-draft.ts), never short-circuited by a previously saved answer.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  const { conversationId, answerText } = await req.json().catch(() => ({}))
  if (!conversationId || typeof conversationId !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing conversationId' }, { status: 400 })
  }
  if (!answerText || typeof answerText !== 'string' || !answerText.trim()) {
    return NextResponse.json({ ok: false, error: 'Missing answerText' }, { status: 400 })
  }

  const sb = getSupabase()
  const { data: conversation } = await sb
    .from('wa_conversations')
    .select('id, phone, stage')
    .eq('id', conversationId)
    .maybeSingle()

  if (!conversation) return NextResponse.json({ ok: false, error: 'Conversation not found' }, { status: 404 })

  const result = await sendTextMessage(conversation.phone, answerText)
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error || 'Failed to send message' }, { status: 502 })
  }

  await logMessage(conversationId, 'outbound', answerText, 'human_reply', result.messageId)
  await tagIfCompletionMessage(conversationId, answerText)

  // BUGFIX: logMessage() always stamps last_outbound_at, but a manual reply
  // sent while the conversation is still 'opening_sent' left the state
  // machine in an impossible combination (opening_sent + lastOutboundAt
  // set) that no branch in the webhook handler matches — every future
  // inbound message from that client was silently dropped, with no error
  // logged anywhere. If we've now manually replied to a brand-new
  // conversation, treat it the same as the automated opening message: the
  // client has received a reply, so move them into the normal pipeline.
  if (conversation.stage === 'opening_sent') {
    await sb.from('wa_conversations').update({ stage: 'pitch_sent' }).eq('id', conversationId)
  }

  // Clear the escalation flag — this conversation no longer needs attention.
  await sb.from('wa_conversations').update({
    needs_human: false,
    escalation_reason: null,
    updated_at: new Date().toISOString(),
  }).eq('id', conversationId)

  return NextResponse.json({ ok: true })
}

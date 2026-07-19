export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'
import { sendTextMessage } from '@/lib/whatsapp'
import { logMessage } from '@/lib/wa-store'
import { saveKnowledgeBaseAnswer } from '@/lib/knowledge-base'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// POST /api/crm/whatsapp/respond
// The tax agent's manual reply from the "Urgent" tab (Section 8/9 handoff).
// This sends the message, clears the escalation flag, AND — this is the
// "every question gets asked once" loop — saves the Q&A pair to the
// knowledge base so the bot can answer the same question itself next time.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })

  const { conversationId, answerText, saveToKnowledgeBase = true } = await req.json().catch(() => ({}))
  if (!conversationId || typeof conversationId !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing conversationId' }, { status: 400 })
  }
  if (!answerText || typeof answerText !== 'string' || !answerText.trim()) {
    return NextResponse.json({ ok: false, error: 'Missing answerText' }, { status: 400 })
  }

  const sb = getSupabase()
  const { data: conversation } = await sb
    .from('wa_conversations')
    .select('id, phone')
    .eq('id', conversationId)
    .maybeSingle()

  if (!conversation) return NextResponse.json({ ok: false, error: 'Conversation not found' }, { status: 404 })

  const result = await sendTextMessage(conversation.phone, answerText)
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error || 'Failed to send message' }, { status: 502 })
  }

  await logMessage(conversationId, 'outbound', answerText, 'human_reply', result.messageId)

  // Clear the escalation flag — this conversation no longer needs attention.
  await sb.from('wa_conversations').update({
    needs_human: false,
    escalation_reason: null,
    updated_at: new Date().toISOString(),
  }).eq('id', conversationId)

  // Save to the knowledge base using the most recent inbound message as
  // the "question" — that's what actually triggered the escalation.
  if (saveToKnowledgeBase) {
    const { data: lastInbound } = await sb
      .from('wa_messages')
      .select('body')
      .eq('conversation_id', conversationId)
      .eq('direction', 'inbound')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (lastInbound?.body) {
      await saveKnowledgeBaseAnswer(lastInbound.body, answerText)
    }
  }

  return NextResponse.json({ ok: true })
}

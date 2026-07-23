export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// POST /api/crm/whatsapp/mark-not-relevant
// Manual, human-only override: moves a conversation to stage='not_relevant'
// from WHATEVER stage it's currently in — new, reminder1/2, abn_pending,
// ready, urgent, or already not_relevant. Unlike the automated
// not_relevant transitions (self-lodge close, non-resident result), this
// is a direct human decision and always wins immediately, no matter what
// the bot was in the middle of doing with this conversation.
//
// Also clears any pending human-review flag, since "not relevant" is a
// closed/resolved state — nothing about it should still be sitting in the
// Urgent queue waiting for review.
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const { conversationId } = await req.json().catch(() => ({}))
  if (!conversationId || typeof conversationId !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing conversationId' }, { status: 400 })
  }

  const sb = getSupabase()
  const { error } = await sb
    .from('wa_conversations')
    .update({
      stage: 'not_relevant',
      needs_human: false,
      escalation_reason: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', conversationId)

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

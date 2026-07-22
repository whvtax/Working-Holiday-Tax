export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// GET /api/crm/whatsapp/messages?conversationId=WA-xxx
// Full chronological message thread for one conversation — what the
// "open a conversation" view in the CRM renders.
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const conversationId = req.nextUrl.searchParams.get('conversationId')
  if (!conversationId) return NextResponse.json({ ok: false, error: 'Missing conversationId' }, { status: 400 })

  const sb = getSupabase()
  const { data, error } = await sb
    .from('wa_messages')
    .select('id, direction, body, script_key, created_at')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
    .limit(500)

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  const messages = (data ?? []).map(m => ({
    id: m.id,
    direction: m.direction,
    body: m.body,
    scriptKey: m.script_key,
    createdAt: m.created_at,
  }))

  return NextResponse.json({ ok: true, messages })
}

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

  // TEMP DIAGNOSTIC — remove once the "SQL shows more messages than this
  // endpoint returns" mystery is resolved. Reports ground truth from the
  // live server itself: which project it's actually talking to, and raw
  // counts, bypassing any query-shape assumptions.
  if (req.nextUrl.searchParams.get('debug') === '1') {
    const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '(unset)'
    const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? ''
    const keyMasked = rawKey ? `${rawKey.slice(0, 12)}...${rawKey.slice(-6)} (len=${rawKey.length})` : '(unset)'

    const { count: matchingCount, error: matchErr } = await sb
      .from('wa_messages')
      .select('*', { count: 'exact', head: true })
      .eq('conversation_id', conversationId)

    const { count: totalCount, error: totalErr } = await sb
      .from('wa_messages')
      .select('*', { count: 'exact', head: true })

    const { data: sampleRows, error: sampleErr } = await sb
      .from('wa_messages')
      .select('id, conversation_id, body, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .limit(500)

    return NextResponse.json({
      ok: true,
      debug: true,
      resolvedSupabaseUrl: rawUrl,
      resolvedServiceRoleKey: keyMasked,
      conversationIdReceived: conversationId,
      matchingRowCount: matchingCount,
      matchingRowCountError: matchErr?.message ?? null,
      totalMessagesInTable: totalCount,
      totalMessagesError: totalErr?.message ?? null,
      sampleRowsReturned: sampleRows?.length ?? 0,
      sampleRowsError: sampleErr?.message ?? null,
      sampleRows,
    })
  }

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

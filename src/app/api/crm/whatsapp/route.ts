export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// GET /api/crm/whatsapp - list WhatsApp leads, grouped by stage
// (the "waiting room" before someone becomes a real crm_tasks record)
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const sb = getSupabase()

  const { data, error, status, statusText, count } = await sb
    .from('wa_conversations')
    .select('*', { count: 'exact' })
    .order('last_inbound_at', { ascending: false })
    .limit(500)

  // TEMP DIAGNOSTIC — remove after debugging the empty-list issue.
  if (req.nextUrl.searchParams.get('debug') === '1') {
    return NextResponse.json({
      ok: true,
      debug: true,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      rowCountReturned: data?.length ?? null,
      countHeader: count ?? null,
      pgStatus: status,
      pgStatusText: statusText,
      error: error ? { message: error.message, details: error.details, hint: error.hint, code: error.code } : null,
      rawData: data,
    })
  }

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  const conversations = (data ?? []).map(row => ({
    id:                    row.id,
    phone:                 row.phone,
    firstName:             row.first_name,
    language:              row.language,
    stage:                 row.stage,
    hasAbn:                row.has_abn,
    residencyCheckResult:  row.residency_check_result,
    needsHuman:            row.needs_human,
    escalationReason:      row.escalation_reason,
    lastInboundAt:         row.last_inbound_at,
    lastOutboundAt:        row.last_outbound_at,
    crmTaskId:             row.crm_task_id,
    createdAt:             row.created_at,
    manualLabel:           row.manual_label,
  }))

  return NextResponse.json({ ok: true, conversations })
}

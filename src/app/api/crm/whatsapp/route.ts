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

  const { data, error } = await sb
    .from('wa_conversations')
    .select('*')
    .order('last_inbound_at', { ascending: false })
    .limit(500)

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
  }))

  return NextResponse.json({ ok: true, conversations })
}

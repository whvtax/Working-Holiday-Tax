export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// Comfortably above real-world usage today, but NOT unlimited — if the
// pipeline ever actually grows past this, the response below will say so
// explicitly (`truncated: true`) instead of silently dropping the oldest
// leads with no visible symptom. That's the signal it's time to build real
// server-side pagination rather than a fixed cap.
const LIST_LIMIT = 3000

// GET /api/crm/whatsapp - list WhatsApp leads, grouped by stage
// (the "waiting room" before someone becomes a real crm_tasks record)
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const sb = getSupabase()

  const { data, error, count } = await sb
    .from('wa_conversations')
    .select(
      'id, phone, first_name, language, stage, has_abn, residency_check_result, needs_human, escalation_reason, last_inbound_at, last_outbound_at, last_read_at, crm_task_id, created_at, manual_label',
      { count: 'exact' }
    )
    .order('last_inbound_at', { ascending: false })
    .limit(LIST_LIMIT)

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  const truncated = typeof count === 'number' && count > (data?.length ?? 0)
  if (truncated) {
    console.warn(`[api/crm/whatsapp] Hit the ${LIST_LIMIT}-row list cap (actual count: ${count}). Time to build real pagination.`)
  }

  const conversations = (data ?? []).map(row => {
    const lastInboundAt = row.last_inbound_at as string
    const lastReadAt = row.last_read_at as string | null
    const unread = !lastReadAt || new Date(lastInboundAt).getTime() > new Date(lastReadAt).getTime()
    return {
      id:                    row.id,
      phone:                 row.phone,
      firstName:             row.first_name,
      language:              row.language,
      stage:                 row.stage,
      hasAbn:                row.has_abn,
      residencyCheckResult:  row.residency_check_result,
      needsHuman:            row.needs_human,
      escalationReason:      row.escalation_reason,
      lastInboundAt,
      lastOutboundAt:        row.last_outbound_at,
      lastReadAt,
      unread,
      crmTaskId:             row.crm_task_id,
      createdAt:             row.created_at,
      manualLabel:           row.manual_label,
    }
  })

  return NextResponse.json({ ok: true, conversations, truncated, totalCount: count })
}

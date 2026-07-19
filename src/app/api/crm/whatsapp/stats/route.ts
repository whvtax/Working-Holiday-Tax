export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

interface ScriptStats {
  scriptKey: string
  approvedUnedited: number   // sent exactly as proposed — the strongest "this script is proven" signal
  approvedEdited: number     // you had to change the wording — script needs work
  rejected: number           // you blocked it entirely — script may be wrong for this situation
  total: number
  readinessScore: number     // approvedUnedited / total, 0–1 — a rough "how proven is this" signal
}

// GET /api/crm/whatsapp/stats — per-script approval history, so it's
// visible which scripts are consistently approved untouched (candidates to
// graduate out of shadow mode) vs frequently edited or rejected (still
// need work). This is the data the gradual-autonomy decision runs on —
// today made by a human reading this table, but the same numbers are what
// an automated "graduate this script" rule would use later.
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const sb = getSupabase()
  const { data, error } = await sb
    .from('wa_pending_messages')
    .select('script_key, status, proposed_text, final_text')
    .in('status', ['approved', 'rejected'])
    .limit(2000)

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  const byScript = new Map<string, ScriptStats>()
  for (const row of data ?? []) {
    const key = row.script_key || '(unlabelled)'
    if (!byScript.has(key)) {
      byScript.set(key, { scriptKey: key, approvedUnedited: 0, approvedEdited: 0, rejected: 0, total: 0, readinessScore: 0 })
    }
    const s = byScript.get(key)!
    s.total++
    if (row.status === 'rejected') {
      s.rejected++
    } else if (row.final_text && row.final_text !== row.proposed_text) {
      s.approvedEdited++
    } else {
      s.approvedUnedited++
    }
  }

  const stats = [...byScript.values()]
    .map(s => ({ ...s, readinessScore: s.total > 0 ? s.approvedUnedited / s.total : 0 }))
    .sort((a, b) => b.total - a.total)

  return NextResponse.json({ ok: true, stats })
}

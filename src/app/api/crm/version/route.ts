export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

// Cheap change-token for the CRM dashboard. The 20s auto-refresh polls this
// (one light query) and only reloads the heavy task/client/stats payloads when
// the token moves. Catches the cross-session cases that matter: new leads, new
// clients, tasks marked done, and review-status changes. On any error the caller
// falls back to a full reload, so it can never be staler than before.
export async function GET(req: NextRequest) {
  if (!validateSession(req.cookies.get('crm_session')?.value)) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  try {
    const sb = getSupabase()
    const [taskCount, clientCount, lastTask, lastClient, openTasks, pendingReview] = await Promise.all([
      sb.from('crm_tasks').select('id', { count: 'exact', head: true }),
      sb.from('crm_clients').select('id', { count: 'exact', head: true }),
      sb.from('crm_tasks').select('submitted_at').order('submitted_at', { ascending: false }).limit(1).maybeSingle(),
      sb.from('crm_clients').select('created_at').order('created_at', { ascending: false }).limit(1).maybeSingle(),
      sb.from('crm_tasks').select('id', { count: 'exact', head: true }).eq('done', false),
      sb.from('crm_tasks').select('id', { count: 'exact', head: true }).eq('review_status', 'pending'),
    ])
    const token = [
      taskCount.count ?? 0, clientCount.count ?? 0,
      (lastTask.data?.submitted_at as string) ?? '0',
      (lastClient.data?.created_at as string) ?? '0',
      openTasks.count ?? 0, pendingReview.count ?? 0,
    ].join('|')
    return NextResponse.json({ ok: true, token })
  } catch {
    // No token => caller treats it as "changed" and reloads (fail-safe).
    return NextResponse.json({ ok: true, token: '' })
  }
}

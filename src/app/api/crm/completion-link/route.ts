export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'
import { issueCompletionToken, revokeCompletionToken, TOKEN_TTL_DAYS } from '@/lib/intake'
import { SITE_URL } from '@/lib/constants'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

/**
 * GET /api/crm/completion-link?taskId=...
 *
 * Reports whether a live link already exists. Without this the panel resets
 * every time the task is reopened, and pressing "create" would mint a second
 * token - silently killing the link already sitting in the client's WhatsApp.
 */
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const taskId = new URL(req.url).searchParams.get('taskId') ?? ''
  if (!taskId) return NextResponse.json({ ok: false, error: 'missing_task' }, { status: 400 })

  try {
    const { data, error } = await getSupabase()
      .from('crm_tasks')
      .select('completion_token, token_expires_at')
      .eq('id', taskId)
      .single()
    if (error) throw error

    const token = data?.completion_token as string | null
    const expiresAt = data?.token_expires_at as string | null
    const live = !!token && (!expiresAt || new Date(expiresAt) > new Date())

    return NextResponse.json({
      ok: true,
      url: live ? `${SITE_URL}/complete/${token}` : '',
      expiresAt: live ? expiresAt : '',
    })
  } catch (err) {
    console.error('[crm/completion-link GET]', err)
    return NextResponse.json({ ok: false, error: 'read_failed' }, { status: 500 })
  }
}

/**
 * POST /api/crm/completion-link
 * Body: { taskId, action: 'issue' | 'revoke' }
 *
 * Issuing always mints a fresh token and invalidates the previous one, so
 * "send a new link" and "the old link stops working" are the same action - a
 * client who lost the first link can't end up with two live ones.
 */
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  try {
    const body = await req.json().catch(() => ({}))
    const taskId = typeof body.taskId === 'string' ? body.taskId : ''
    const action = body.action === 'revoke' ? 'revoke' : 'issue'
    if (!taskId) return NextResponse.json({ ok: false, error: 'missing_task' }, { status: 400 })

    if (action === 'revoke') {
      await revokeCompletionToken(taskId)
      await logAudit(taskId, 'intake.link_revoked')
      return NextResponse.json({ ok: true, revoked: true })
    }

    const { token, expiresAt } = await issueCompletionToken(taskId)
    await logAudit(taskId, 'intake.link_issued')

    return NextResponse.json({
      ok: true,
      url: `${SITE_URL}/complete/${token}`,
      expiresAt,
      ttlDays: TOKEN_TTL_DAYS,
    })
  } catch (err) {
    console.error('[crm/completion-link]', err)
    return NextResponse.json({ ok: false, error: 'failed' }, { status: 500 })
  }
}

/** Best-effort: a failed audit write must not undo the action itself. */
async function logAudit(taskId: string, action: string) {
  try {
    await getSupabase().from('crm_audit').insert({
      actor: 'crm-admin', action, target_id: taskId, detail: '',
    })
  } catch (err) {
    console.error('[crm/completion-link audit]', err)
  }
}

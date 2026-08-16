export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

/** GET /api/crm/settings - current form settings, for the dashboard toggle. */
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const sb = getSupabase()
    const { data, error } = await sb
      .from('form_settings')
      .select('allow_whm_submissions, updated_at, updated_by')
      .eq('id', 1)
      .single()
    if (error) throw error

    return NextResponse.json({
      ok: true,
      allowWhmSubmissions: data?.allow_whm_submissions === true,
      updatedAt: data?.updated_at ?? null,
      updatedBy: data?.updated_by ?? null,
    })
  } catch (err) {
    console.error('[crm/settings GET]', err)
    return NextResponse.json({ ok: false, error: 'read_failed' }, { status: 500 })
  }
}

/**
 * POST /api/crm/settings - flip the working-holiday-maker override.
 * Body: { allowWhmSubmissions: boolean }
 *
 * Every change is written to the audit log: this switch decides whether a
 * whole category of client can submit at all, so who turned it on and when
 * needs to be answerable later.
 */
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  try {
    const body = await req.json().catch(() => ({}))
    if (typeof body.allowWhmSubmissions !== 'boolean') {
      return NextResponse.json({ ok: false, error: 'invalid_value' }, { status: 400 })
    }
    const next = body.allowWhmSubmissions
    const who = 'crm-admin'

    const sb = getSupabase()
    const { error } = await sb
      .from('form_settings')
      .update({ allow_whm_submissions: next, updated_at: new Date().toISOString(), updated_by: who })
      .eq('id', 1)
    if (error) throw error

    try {
      await sb.from('crm_audit').insert({
        actor: who,
        action: next ? 'form_settings.whm_enabled' : 'form_settings.whm_disabled',
        target_id: 'form_settings',
        detail: `allow_whm_submissions = ${next}`,
      })
    } catch (logErr) {
      // The switch itself already flipped; a failed audit write must not undo it.
      console.error('[crm/settings audit]', logErr)
    }

    return NextResponse.json({ ok: true, allowWhmSubmissions: next })
  } catch (err) {
    console.error('[crm/settings POST]', err)
    return NextResponse.json({ ok: false, error: 'write_failed' }, { status: 500 })
  }
}

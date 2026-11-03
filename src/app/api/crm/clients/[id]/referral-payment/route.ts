export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateSessionFresh } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSessionFresh(req.cookies.get('crm_session')?.value) }

// PATCH /api/crm/clients/[id]/referral-payment - { paid: boolean }
// Marks (or un-marks) the referral commission for this specific client as paid.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ ok: false }, { status: 401 })

  const { paid } = await req.json().catch(() => ({}))
  if (typeof paid !== 'boolean') {
    return NextResponse.json({ ok: false, error: 'Invalid body: expected { paid: boolean }' }, { status: 400 })
  }

  const sb = getSupabase()
  const { error } = await sb
    .from('crm_clients')
    .update({ referral_commission_paid_at: paid ? new Date().toISOString() : null })
    .eq('id', (await params).id)

  if (error) console.error('[crm] db error:', (error as { message?: string }).message)

  if (error) return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })

  return NextResponse.json({ ok: true })
}

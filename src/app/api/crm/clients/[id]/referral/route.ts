export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateSessionFresh } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSessionFresh(req.cookies.get('crm_session')?.value) }

// PATCH /api/crm/clients/[id]/referral
// body: { partnerId: string | null }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await auth(req))) return NextResponse.json({ ok: false }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const partnerId = body?.partnerId
  // AUTH2-06: accept only null or a plain id string; anything else (objects,
  // operators, oversized strings) used to be passed straight to PostgREST and
  // its error text came back in the response.
  if (partnerId !== null && partnerId !== undefined && (typeof partnerId !== 'string' || !/^[A-Za-z0-9_-]{1,64}$/.test(partnerId))) {
    return NextResponse.json({ ok: false, error: 'invalid_partner' }, { status: 400 })
  }
  const sb = getSupabase()
  if (typeof partnerId === 'string') {
    const { data: partner } = await sb.from('partners').select('id').eq('id', partnerId).maybeSingle()
    if (!partner) return NextResponse.json({ ok: false, error: 'partner_not_found' }, { status: 404 })
  }

  const { error } = await sb
    .from('crm_clients')
    .update({ referred_by: partnerId ?? null })
    .eq('id', (await params).id)

  if (error) console.error('[crm] db error:', (error as { message?: string }).message)

  if (error) return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })

  return NextResponse.json({ ok: true })
}

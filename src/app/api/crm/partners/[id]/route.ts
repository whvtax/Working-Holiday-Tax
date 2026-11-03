export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateSessionFresh } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSessionFresh(req.cookies.get('crm_session')?.value) }

// GET /api/crm/partners/[id] - partner details + list of referred clients
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ ok: false }, { status: 401 })

  const sb = getSupabase()
  const { id } = await params

  const { data: partner, error: partnerErr } = await sb
    .from('partners')
    .select('id, name, email, code, created_at')
    .eq('id', id)
    .maybeSingle()

  if (partnerErr) console.error('[crm] db error:', (partnerErr as { message?: string }).message)

  if (partnerErr) return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  if (!partner) return NextResponse.json({ ok: false, error: 'Partner not found' }, { status: 404 })

  const { data: clients, error: clientsErr } = await sb
    .from('crm_clients')
    .select('id, full_name, created_at, tax_returns, referral_commission_paid_at')
    .eq('referred_by', id)
    .order('created_at', { ascending: false })

  if (clientsErr) console.error('[crm] db error:', (clientsErr as { message?: string }).message)

  if (clientsErr) return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })

  const referredClients = (clients ?? []).map(c => ({
    id: c.id,
    fullName: c.full_name,
    createdAt: c.created_at,
    qualified: !!c.tax_returns && c.tax_returns !== '[]',
    commissionPaidAt: c.referral_commission_paid_at,
  }))

  return NextResponse.json({
    ok: true,
    partner: {
      id: partner.id,
      name: partner.name,
      email: partner.email ?? '',
      code: partner.code,
      createdAt: partner.created_at,
    },
    referredClients,
  })
}

// DELETE /api/crm/partners/[id] - remove a partner.
// Referred clients are not deleted; their referred_by simply reverts to
// null (the DB foreign key is ON DELETE SET NULL), so client records and
// their tax history are never affected by removing a partner.
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ ok: false }, { status: 401 })

  const sb = getSupabase()
  const { error } = await sb.from('partners').delete().eq('id', (await params).id)

  if (error) console.error('[crm] db error:', (error as { message?: string }).message)

  if (error) return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })

  return NextResponse.json({ ok: true })
}

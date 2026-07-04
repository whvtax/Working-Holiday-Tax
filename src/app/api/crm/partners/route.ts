export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// GET /api/crm/partners - list all partners with referral counts
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const sb = getSupabase()

  const { data: partners, error } = await sb
    .from('partners')
    .select('id, name, email, code, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  // For each partner, pull their referred clients to compute counts/commission.
  // Commission owed = $20 per qualified (completed tax-return) referral that
  // hasn't been marked paid yet (referral_commission_paid_at IS NULL).
  const enriched = await Promise.all((partners ?? []).map(async (p) => {
    const { data: referred } = await sb
      .from('crm_clients')
      .select('tax_returns, referral_commission_paid_at')
      .eq('referred_by', p.id)

    const rows = referred ?? []
    const totalReferrals = rows.length
    const qualified = rows.filter(r => r.tax_returns && r.tax_returns !== '[]')
    const paidReferrals = qualified.length
    const unpaidQualified = qualified.filter(r => !r.referral_commission_paid_at)
    const totalPaidHistorically = qualified.length - unpaidQualified.length

    return {
      id: p.id,
      name: p.name,
      email: p.email ?? '',
      code: p.code,
      createdAt: p.created_at,
      totalReferrals,
      paidReferrals,
      commission: unpaidQualified.length * 20,
      totalPaidHistorically,
    }
  }))

  return NextResponse.json({ ok: true, partners: enriched })
}

// POST /api/crm/partners - create a new partner
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''

  if (!name) return NextResponse.json({ ok: false, error: 'Name required' }, { status: 400 })
  if (name.length > 200) return NextResponse.json({ ok: false, error: 'Name too long' }, { status: 400 })

  // Generate code from name: "Backpacker Co" → "BPCO"
  let code = name
    .toUpperCase()
    .replace(/[^A-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .map((w: string) => w.slice(0, 2))
    .join('')
    .slice(0, 8)

  // Fall back to a random code if the name had no usable letters/numbers
  // (e.g. an emoji-only or punctuation-only name)
  if (!code) code = 'PTR' + Math.random().toString(36).slice(2, 6).toUpperCase()

  const sb = getSupabase()

  // Ensure unique code
  let finalCode = code
  let suffix = 1
  while (true) {
    const { data } = await sb.from('partners').select('id').eq('code', finalCode).maybeSingle()
    if (!data) break
    finalCode = `${code}${suffix++}`
  }

  const { data, error } = await sb
    .from('partners')
    .insert({ name, email: email || null, code: finalCode })
    .select()
    .single()

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true, partner: data })
}

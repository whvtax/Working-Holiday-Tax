export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { getSupabase } from '@/lib/supabase'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// PATCH /api/crm/clients/[id]/referral
// body: { partnerId: string | null }
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })

  const { partnerId } = await req.json()
  const sb = getSupabase()

  const { error } = await sb
    .from('crm_clients')
    .update({ referred_by: partnerId ?? null })
    .eq('id', (await params).id)

  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}

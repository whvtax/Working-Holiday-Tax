import { NextRequest, NextResponse } from 'next/server'
import { requireAuthAndCsrf } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  try {
    const { notes } = await req.json()
    const { sql } = await import('@vercel/postgres')
    await sql`UPDATE crm_clients SET notes = ${notes} WHERE id = ${params.id}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[PATCH /api/crm/clients/[id]/notes]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

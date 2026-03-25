import { NextRequest, NextResponse } from 'next/server'
import { addTaxReturn, removeTaxReturn } from '@/lib/db'
import { requireAuthAndCsrf } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  try {
    const { year, refundAmount, type } = await req.json()
    await addTaxReturn(params.id, { year, refundAmount: Number(refundAmount), type: type ?? 'refund', completedAt: new Date().toISOString() })
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 }) }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  try {
    const { year } = await req.json()
    await removeTaxReturn(params.id, year)
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 }) }
}

import { NextRequest, NextResponse } from 'next/server'
import { addTaxReturn, removeTaxReturn } from '@/lib/db'
import { requireAuthAndCsrf } from '@/lib/auth'

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  try {
    const { year, refundAmount, type } = await req.json()
    if (typeof year !== 'string' || !year.trim()) {
      return NextResponse.json({ ok: false, error: 'invalid_year' }, { status: 400 })
    }
    const amount = Number(refundAmount)
    if (!isFinite(amount) || amount < 0) {
      return NextResponse.json({ ok: false, error: 'invalid_amount' }, { status: 400 })
    }
    const returnType = type === 'owed' ? 'owed' : 'refund'
    await addTaxReturn(params.id, { year: year.trim().slice(0, 10), refundAmount: amount, type: returnType, completedAt: new Date().toISOString() })
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 }) }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  try {
    const { year } = await req.json()
    if (typeof year !== 'string' || !year.trim()) {
      return NextResponse.json({ ok: false, error: 'invalid_year' }, { status: 400 })
    }
    await removeTaxReturn(params.id, year.trim())
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 }) }
}

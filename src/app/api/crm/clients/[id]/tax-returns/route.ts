import { NextRequest, NextResponse } from 'next/server'
import { addTaxReturn, removeTaxReturn } from '@/lib/db'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

const VALID_TYPES = new Set(['refund', 'owed'])
const YEAR_RE = /^\d{4}-\d{2}$/  // e.g. 2023-24

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { year, refundAmount, type } = await req.json()

    // Strict field validation
    if (typeof year !== 'string' || !YEAR_RE.test(year)) {
      return NextResponse.json({ ok: false, error: 'invalid_year' }, { status: 400 })
    }
    const amount = Number(refundAmount)
    if (!isFinite(amount) || amount < 0 || amount > 1_000_000) {
      return NextResponse.json({ ok: false, error: 'invalid_amount' }, { status: 400 })
    }
    const safeType = VALID_TYPES.has(type) ? (type as 'refund' | 'owed') : 'refund'

    await addTaxReturn(params.id, {
      year,
      refundAmount: amount,
      type: safeType,
      completedAt: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[POST tax-return]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { year } = await req.json()
    if (typeof year !== 'string' || !YEAR_RE.test(year)) {
      return NextResponse.json({ ok: false, error: 'invalid_year' }, { status: 400 })
    }
    await removeTaxReturn(params.id, year)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[DELETE tax-return]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

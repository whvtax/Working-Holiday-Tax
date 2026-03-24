import { NextRequest, NextResponse } from 'next/server'
import { addTaxReturn, removeTaxReturn } from '@/lib/db'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { year, refundAmount } = await req.json()
    await addTaxReturn(params.id, { year, refundAmount: Number(refundAmount), completedAt: new Date().toISOString() })
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { year } = await req.json()
    await removeTaxReturn(params.id, year)
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

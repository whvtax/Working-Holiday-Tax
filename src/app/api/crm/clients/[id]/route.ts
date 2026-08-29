export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

// AU tax year format: e.g. "2023-24"
const YEAR_RE = /^\d{4}-\d{2}$/
const safeYear = (v: unknown): string => {
  if (typeof v !== 'string') return ''
  return YEAR_RE.test(v) ? v : ''
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const { getClientById } = await import('@/lib/db')
    const client = await getClientById((await params).id)
    if (!client) return NextResponse.json({ ok:false }, { status:404 })
    return NextResponse.json({ ok:true, client })
  } catch (err) {
    console.error('[GET client]', err)
    return NextResponse.json({ ok:false, error: 'db_error' }, { status:500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const body = await req.json()
    const db = await import('@/lib/db')

    // Actions from DashboardClient
    if (body.action === 'notes')        { const notes = typeof body.notes === 'string' ? body.notes.slice(0, 10_000) : ''; await db.updateClientNotes((await params).id, notes); return NextResponse.json({ ok:true }) }
    if (body.action === 'service')      {
      const svc = body.service === 'tfn' || body.service === 'abn' ? body.service : null
      if (!svc) return NextResponse.json({ ok:false, error:'invalid_service' }, { status:400 })
      const rawData = body.data ?? {}
      const safeData = {
        done: rawData.done === true,
        completedAt: typeof rawData.completedAt === 'string' ? rawData.completedAt.slice(0, 50) : '',
        notes: typeof rawData.notes === 'string' ? rawData.notes.slice(0, 2000) : '',
      }
      await db.updateService((await params).id, svc, safeData)
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'add-tax') {
      const d = body.data ?? {}
      const year = safeYear(d.year)
      if (!year) return NextResponse.json({ ok:false, error:'invalid_year' }, { status:400 })
      const rawAmt = Number(d.refundAmount)
      const refundAmount = Math.max(0, Math.min(1_000_000, Number.isFinite(rawAmt) ? rawAmt : 0))
      const type = d.type === 'owed' ? 'owed' : 'refund'
      await db.addTaxReturn((await params).id, { year, refundAmount, type, completedAt: new Date().toISOString() })
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'remove-tax')   {
      const year = safeYear(body.year)
      if (!year) return NextResponse.json({ ok:false, error:'invalid_year' }, { status:400 })
      await db.removeTaxReturn((await params).id, year)
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'add-super') {
      const d = body.data ?? {}
      const year = safeYear(d.year)
      if (!year) return NextResponse.json({ ok:false, error:'invalid_year' }, { status:400 })
      const rawAmt = Number(d.amount)
      const amount = Math.max(0, Math.min(1_000_000, Number.isFinite(rawAmt) ? rawAmt : 0))
      await db.addSuperReturn((await params).id, { year, amount, completedAt: new Date().toISOString() })
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'remove-super') {
      const year = safeYear(body.year)
      if (!year) return NextResponse.json({ ok:false, error:'invalid_year' }, { status:400 })
      await db.removeSuperReturn((await params).id, year)
      return NextResponse.json({ ok:true })
    }

    // Actions from ClientPageClient (detail page)
    if (body.action === 'update') {
      const client = await db.updateClient((await params).id, body.data)
      if (!client) return NextResponse.json({ ok:false }, { status:404 })
      return NextResponse.json({ ok:true, client })
    }
    // 'clear' and 'handle' were removed on 29 Aug with /crm/client/[id], the
    // orphan page that was their only caller. Jo does not use that page: he
    // works from the client card in the main CRM and presses Done. Neither
    // action was reachable from there, and 'handle' only prefixed the notes
    // string with "[HANDLED]" (there is no handled column), so nothing that is
    // actually used depended on either.
    if (body.action === 'archive') {
      await db.archiveClient((await params).id)
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'unarchive') {
      await db.unarchiveClient((await params).id)
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'checkin') {
      const year = safeYear(body.year)
      if (!year) return NextResponse.json({ ok:false, error:'invalid_year' }, { status:400 })
      const done = body.done === true
      await db.setYearlyCheckin((await params).id, year, done)
      return NextResponse.json({ ok:true })
    }

    return NextResponse.json({ ok:false, error: 'unknown_action' }, { status:400 })
  } catch (err) {
    console.error('[PATCH client]', err)
    return NextResponse.json({ ok:false, error: 'db_error' }, { status:500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const { deleteClient } = await import('@/lib/db')
    await deleteClient((await params).id)
    return NextResponse.json({ ok:true })
  } catch (err) {
    console.error('[DELETE client]', err)
    return NextResponse.json({ ok:false, error: 'db_error' }, { status:500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { getAllClients, upsertClient } from '@/lib/db'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  try {
    const clients = await getAllClients()
    const { searchParams } = new URL(req.url)
    const taxYear     = searchParams.get('taxYear')
    const showHandled = searchParams.get('showHandled') === 'true'
    let filtered = clients
    if (taxYear) filtered = filtered.filter(c => c.taxYear === taxYear)
    if (!showHandled) filtered = filtered.filter(c => !c.handled)
    return NextResponse.json({ ok: true, clients: filtered })
  } catch (err) {
    console.error('[GET /clients]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  try {
    const body   = await req.json()
    const client = await upsertClient(body)
    return NextResponse.json({ ok: true, client })
  } catch (err) {
    console.error('[POST /clients]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

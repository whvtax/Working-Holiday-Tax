import { NextRequest, NextResponse } from 'next/server'
import {
  getAllClients, upsertClient, markHandled, clearClientDetails, validateSession
} from '@/lib/crm-store'

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('crm_session')?.value)
}

// GET /api/crm/clients — list all
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const taxYear = searchParams.get('taxYear')
  const showHandled = searchParams.get('showHandled') === 'true'

  let clients = getAllClients()
  if (taxYear) clients = clients.filter(c => c.taxYear === taxYear)
  if (!showHandled) clients = clients.filter(c => !c.handled)

  return NextResponse.json({ ok: true, clients })
}

// POST /api/crm/clients — create or update client
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })

  const body = await req.json()
  const client = upsertClient(body)
  return NextResponse.json({ ok: true, client })
}

import { NextRequest, NextResponse } from 'next/server'
import { getClient, upsertClient, markHandled, clearClientDetails, deleteClient } from '@/lib/db'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  try {
    const client = await getClient(params.id)
    if (!client) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
    return NextResponse.json({ ok: true, client })
  } catch (err) {
    console.error('[GET /clients/id]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  try {
    const body = await req.json()

    if (body.action === 'handle') {
      await markHandled(params.id)
      return NextResponse.json({ ok: true })
    }
    if (body.action === 'clear') {
      await clearClientDetails(params.id)
      return NextResponse.json({ ok: true })
    }
    if (body.action === 'delete') {
      await deleteClient(params.id)
      return NextResponse.json({ ok: true })
    }
    if (body.action === 'update') {
      const existing = await getClient(params.id)
      if (!existing) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
      const updated = await upsertClient({ ...existing, ...body.data, id: params.id })
      return NextResponse.json({ ok: true, client: updated })
    }
    return NextResponse.json({ ok: false, error: 'unknown_action' }, { status: 400 })
  } catch (err) {
    console.error('[PATCH /clients/id]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

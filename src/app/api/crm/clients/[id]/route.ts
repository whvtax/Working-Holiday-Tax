import { NextRequest, NextResponse } from 'next/server'
import { getClient, markHandled, clearClientDetails, validateSession, upsertClient } from '@/lib/crm-store'

function auth(req: NextRequest): boolean {
  return validateSession(req.cookies.get('crm_session')?.value)
}

// GET /api/crm/clients/[id]
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })
  const client = getClient(params.id)
  if (!client) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
  return NextResponse.json({ ok: true, client })
}

// PATCH /api/crm/clients/[id] — mark handled, clear details, or update
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 })

  const body = await req.json()

  if (body.action === 'handle') {
    const ok = markHandled(params.id)
    return NextResponse.json({ ok })
  }

  if (body.action === 'clear') {
    const ok = clearClientDetails(params.id)
    return NextResponse.json({ ok })
  }

  if (body.action === 'update') {
    const existing = getClient(params.id)
    if (!existing) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
    const updated = upsertClient({ ...existing, ...body.data, id: params.id })
    return NextResponse.json({ ok: true, client: updated })
  }

  return NextResponse.json({ ok: false, error: 'unknown_action' }, { status: 400 })
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get('q') ?? '').slice(0, 100)
    const archived = searchParams.get('archived') === 'true'
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '50')))
    const { searchClients } = await import('@/lib/db')
    const clients = await searchClients(q, limit, archived)
    return NextResponse.json({ ok: true, clients })
  } catch (err) {
    console.error('[GET search]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

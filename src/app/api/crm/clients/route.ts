import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const { searchParams } = new URL(req.url)
    const archived = searchParams.get('archived') === 'true'
    const limit  = Math.min(200, Math.max(1, parseInt(searchParams.get('limit')  ?? '100')))
    const offset = Math.max(0, parseInt(searchParams.get('offset') ?? '0'))
    const { getAllActiveClients, getAllArchivedClients, countActiveClients, countArchivedClients } = await import('@/lib/db')
    const [clients, total] = archived
      ? await Promise.all([getAllArchivedClients(limit, offset), countArchivedClients()])
      : await Promise.all([getAllActiveClients(limit, offset),  countActiveClients()])
    return NextResponse.json({ ok:true, clients, total, limit, offset })
  } catch {
    return NextResponse.json({ ok:true, clients:[], total:0, limit:100, offset:0 })
  }
}


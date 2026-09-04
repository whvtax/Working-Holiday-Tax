export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const { searchParams } = new URL(req.url)
    const archived = searchParams.get('archived') === 'true'
    const parseNum = (v: string | null, def: number) => {
      const n = parseInt(v ?? '', 10)
      return Number.isFinite(n) ? n : def
    }
    const limit  = Math.min(200, Math.max(1, parseNum(searchParams.get('limit'),  100)))
    const offset = Math.max(0, parseNum(searchParams.get('offset'), 0))
    const { getAllActiveClients, getAllArchivedClients, countActiveClients, countArchivedClients } = await import('@/lib/db')
    const [clients, total] = archived
      ? await Promise.all([getAllArchivedClients(limit, offset), countArchivedClients()])
      : await Promise.all([getAllActiveClients(limit, offset),  countActiveClients()])
    return NextResponse.json({ ok:true, clients, total, limit, offset })
  } catch (err) {
    // A database failure is NOT an empty clients list. Answering ok:true with []
    // made the CRM say "No clients yet." and wipe the rows it already had, on a
    // 20-second poll, with nothing on screen to say anything had gone wrong
    // (audit, 4 Sep). The client keeps what it has and shows the error.
    console.error('[crm/clients] read failed:', err)
    return NextResponse.json({ ok:false, error:'db_error' }, { status:503 })
  }
}


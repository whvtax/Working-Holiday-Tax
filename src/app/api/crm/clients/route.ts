import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const { searchParams } = new URL(req.url)
    const archived = searchParams.get('archived') === 'true'
    const { getAllActiveClients, getAllArchivedClients } = await import('@/lib/db')
    const clients = archived ? await getAllArchivedClients() : await getAllActiveClients()
    return NextResponse.json({ ok:true, clients })
  } catch {
    return NextResponse.json({ ok:true, clients: [] })
  }
}


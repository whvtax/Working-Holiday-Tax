import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const { getClientById } = await import('@/lib/db')
    const client = await getClientById(params.id)
    if (!client) return NextResponse.json({ ok:false }, { status:404 })
    return NextResponse.json({ ok:true, client })
  } catch (err) {
    console.error('[GET client]', err)
    return NextResponse.json({ ok:false, error: 'db_error' }, { status:500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const body = await req.json()
    const db = await import('@/lib/db')

    // Actions from DashboardClient
    if (body.action === 'notes')        { const notes = typeof body.notes === 'string' ? body.notes.slice(0, 10_000) : ''; await db.updateClientNotes(params.id, notes); return NextResponse.json({ ok:true }) }
    if (body.action === 'service')      { await db.updateService(params.id, body.service, body.data);     return NextResponse.json({ ok:true }) }
    if (body.action === 'add-tax')      { await db.addTaxReturn(params.id, body.data);                    return NextResponse.json({ ok:true }) }
    if (body.action === 'remove-tax')   { await db.removeTaxReturn(params.id, body.year);                 return NextResponse.json({ ok:true }) }
    if (body.action === 'add-super')    { await db.addSuperReturn(params.id, body.data);                  return NextResponse.json({ ok:true }) }
    if (body.action === 'remove-super') { await db.removeSuperReturn(params.id, body.year);               return NextResponse.json({ ok:true }) }

    // Actions from ClientPageClient (detail page)
    if (body.action === 'update') {
      const client = await db.updateClient(params.id, body.data)
      if (!client) return NextResponse.json({ ok:false }, { status:404 })
      return NextResponse.json({ ok:true, client })
    }
    if (body.action === 'clear') {
      const client = await db.clearClientSensitiveData(params.id)
      if (!client) return NextResponse.json({ ok:false }, { status:404 })
      return NextResponse.json({ ok:true, client })
    }
    if (body.action === 'handle') {
      const client = await db.markClientHandled(params.id)
      if (!client) return NextResponse.json({ ok:false }, { status:404 })
      return NextResponse.json({ ok:true, client })
    }
    if (body.action === 'archive') {
      await db.archiveClient(params.id)
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'unarchive') {
      await db.unarchiveClient(params.id)
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'checkin') {
      await db.setYearlyCheckin(params.id, body.year, body.done)
      return NextResponse.json({ ok:true })
    }

    return NextResponse.json({ ok:false, error: 'unknown_action' }, { status:400 })
  } catch (err) {
    console.error('[PATCH client]', err)
    return NextResponse.json({ ok:false, error: 'db_error' }, { status:500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const { deleteClient } = await import('@/lib/db')
    await deleteClient(params.id)
    return NextResponse.json({ ok:true })
  } catch (err) {
    console.error('[DELETE client]', err)
    return NextResponse.json({ ok:false, error: 'db_error' }, { status:500 })
  }
}

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
    const { updateClientNotes, updateService, addTaxReturn, removeTaxReturn, addSuperReturn, removeSuperReturn } = await import('@/lib/db')
    if (body.action === 'notes')          { await updateClientNotes(params.id, body.notes);                return NextResponse.json({ ok:true }) }
    if (body.action === 'service')        { await updateService(params.id, body.service, body.data);       return NextResponse.json({ ok:true }) }
    if (body.action === 'add-tax')        { await addTaxReturn(params.id, body.data);                      return NextResponse.json({ ok:true }) }
    if (body.action === 'remove-tax')     { await removeTaxReturn(params.id, body.year);                   return NextResponse.json({ ok:true }) }
    if (body.action === 'add-super')      { await addSuperReturn(params.id, body.data);                    return NextResponse.json({ ok:true }) }
    if (body.action === 'remove-super')   { await removeSuperReturn(params.id, body.year);                 return NextResponse.json({ ok:true }) }
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

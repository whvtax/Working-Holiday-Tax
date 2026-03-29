import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const body = await req.json()
    const { markTaskDone, updateTaskNotes, deleteTaskAndArchive } = await import('@/lib/db')
    if (body.action === 'done')    { await markTaskDone(params.id);                return NextResponse.json({ ok:true }) }
    if (body.action === 'notes')   { const notes = typeof body.notes === 'string' ? body.notes.slice(0, 10_000) : ''; await updateTaskNotes(params.id, notes); return NextResponse.json({ ok:true }) }
    if (body.action === 'delete')  { await deleteTaskAndArchive(params.id);        return NextResponse.json({ ok:true }) }
    return NextResponse.json({ ok:false, error: 'unknown_action' }, { status:400 })
  } catch (err) {
    console.error('[PATCH task]', err)
    return NextResponse.json({ ok:false, error: 'db_error' }, { status:500 })
  }
}

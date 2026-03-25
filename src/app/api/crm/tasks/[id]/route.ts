import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const body = await req.json()
    const { markTaskDone, updateTaskNotes, deleteTaskAndArchive } = await import('@/lib/db')
    if (body.action === 'done')   { await markTaskDone(params.id);                return NextResponse.json({ ok: true }) }
    if (body.action === 'notes')  { await updateTaskNotes(params.id, body.notes ?? ''); return NextResponse.json({ ok: true }) }
    if (body.action === 'delete') { await deleteTaskAndArchive(params.id);        return NextResponse.json({ ok: true }) }
    return NextResponse.json({ ok: false, error: 'unknown_action' }, { status: 400 })
  } catch (err) {
    console.error('[PATCH task]', err)
    // Return 500 instead of silently returning ok:true on failure
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}

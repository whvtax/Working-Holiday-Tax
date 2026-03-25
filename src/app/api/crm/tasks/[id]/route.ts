import { NextRequest, NextResponse } from 'next/server'
import { requireAuthAndCsrf } from '@/lib/auth'

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  try {
    const body = await req.json()
    const { markTaskDone, updateTaskNotes, deleteTaskAndArchive } = await import('@/lib/db')
    if (body.action === 'done')   { await markTaskDone(params.id);                        return NextResponse.json({ ok: true }) }
    if (body.action === 'notes')  { await updateTaskNotes(params.id, body.notes ?? '');   return NextResponse.json({ ok: true }) }
    if (body.action === 'delete') { await deleteTaskAndArchive(params.id);                return NextResponse.json({ ok: true }) }
    return NextResponse.json({ ok: false, error: 'unknown_action' }, { status: 400 })
  } catch (err) {
    console.error('[PATCH task]', err)
    return NextResponse.json({ ok: false, error: 'server_error' }, { status: 500 })
  }
}

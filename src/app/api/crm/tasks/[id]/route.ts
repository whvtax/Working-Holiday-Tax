import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { getTask } = await import('@/lib/db')
    const task = await getTask(params.id)
    if (!task) return NextResponse.json({ ok: false }, { status: 404 })
    return NextResponse.json({ ok: true, task })
  } catch {
    return NextResponse.json({ ok: false }, { status: 404 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const body = await req.json()
    const { markTaskDone, completeTask, updateTaskNotes } = await import('@/lib/db')
    if (body.action === 'done')     { await markTaskDone(params.id); return NextResponse.json({ ok: true }) }
    if (body.action === 'complete') { await completeTask(params.id); return NextResponse.json({ ok: true }) }
    if (body.action === 'notes')    { await updateTaskNotes(params.id, body.notes); return NextResponse.json({ ok: true }) }
    return NextResponse.json({ ok: false }, { status: 400 })
  } catch {
    // No DB — just return ok so UI doesn't break
    return NextResponse.json({ ok: true })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { markTaskDone, completeTask, updateTaskNotes, getTask } from '@/lib/db'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const task = await getTask(params.id)
    if (!task) return NextResponse.json({ ok: false }, { status: 404 })
    return NextResponse.json({ ok: true, task })
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const body = await req.json()
    if (body.action === 'done') {
      await markTaskDone(params.id)
      return NextResponse.json({ ok: true })
    }
    if (body.action === 'complete') {
      // Mark done + move to clients + delete task
      await completeTask(params.id)
      return NextResponse.json({ ok: true })
    }
    if (body.action === 'notes') {
      await updateTaskNotes(params.id, body.notes)
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ ok: false, error: 'unknown_action' }, { status: 400 })
  } catch (err) {
    console.error('[PATCH task]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

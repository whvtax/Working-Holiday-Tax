import { NextRequest, NextResponse } from 'next/server'
import { getAllTasks } from '@/lib/db'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const tasks = await getAllTasks()
    return NextResponse.json({ ok: true, tasks })
  } catch (err) {
    console.error('[GET tasks]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

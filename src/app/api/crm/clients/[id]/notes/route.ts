export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { validateSessionFresh } from '@/lib/crm-store'
import { updateClientNotes } from '@/lib/db'
import { safeErr } from '@/lib/log-safe'

function auth(req: NextRequest) {
  return validateSessionFresh(req.cookies.get('crm_session')?.value)
}

const MAX_NOTES_LENGTH = 10_000

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const body = await req.json()
    const notes = typeof body.notes === 'string' ? body.notes.slice(0, MAX_NOTES_LENGTH) : ''
    await updateClientNotes((await params).id, notes)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[PATCH notes]', safeErr(err))
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

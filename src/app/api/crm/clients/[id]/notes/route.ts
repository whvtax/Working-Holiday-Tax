export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { updateClientNotes } from '@/lib/db'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

const MAX_NOTES_LENGTH = 10_000

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const body = await req.json()
    const notes = typeof body.notes === 'string' ? body.notes.slice(0, MAX_NOTES_LENGTH) : ''
    await updateClientNotes(params.id, notes)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[PATCH notes]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

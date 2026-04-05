export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

const MAX_NOTES_LENGTH = 10_000

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const body = await req.json()
    const notes = typeof body.notes === 'string' ? body.notes.slice(0, MAX_NOTES_LENGTH) : ''
    const { sql } = await import('@vercel/postgres')
    await sql`UPDATE crm_clients SET notes = ${notes} WHERE id = ${params.id}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[PATCH notes]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

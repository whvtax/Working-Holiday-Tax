// SECURITY FIX: requireAuthAndCsrf enforced (was missing auth — unauthenticated callers
// could overwrite any client's notes by hitting this route directly)
import { NextRequest, NextResponse } from 'next/server'
import { requireAuthAndCsrf } from '@/lib/auth'
import { sanitizeString } from '@/lib/form-protection'

const MAX_NOTES_LENGTH = 5000

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth

  // Validate client id param — must be non-empty string with safe chars only
  const clientId = params.id
  if (!clientId || typeof clientId !== 'string' || !/^[A-Za-z0-9_-]+$/.test(clientId)) {
    return NextResponse.json({ ok: false, error: 'invalid_id' }, { status: 400 })
  }

  try {
    const body = await req.json()
    if (!body || typeof body.notes !== 'string') {
      return NextResponse.json({ ok: false, error: 'invalid_notes' }, { status: 400 })
    }
    const sanitized = sanitizeString(body.notes, MAX_NOTES_LENGTH)
    const { sql } = await import('@vercel/postgres')
    await sql`UPDATE crm_clients SET notes = ${sanitized} WHERE id = ${clientId}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[PATCH /api/crm/clients/[id]/notes]', err)
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 500 })
  }
}

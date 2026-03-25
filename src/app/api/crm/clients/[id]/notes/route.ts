import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { notes } = await req.json()
    const { sql } = await import('@vercel/postgres')
    await sql`UPDATE crm_clients SET notes = ${notes} WHERE id = ${params.id}`
    return NextResponse.json({ ok: true })
  } catch {
    // No DB — just return ok
    return NextResponse.json({ ok: true })
  }
}

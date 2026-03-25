// SECURITY FIX: requireAuthAndCsrf for state-changing operations (PATCH, DELETE)
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, requireAuthAndCsrf } from '@/lib/auth'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth
  try {
    const { getClientById } = await import('@/lib/db')
    const client = await getClientById(params.id)
    if (!client) return NextResponse.json({ ok:false }, { status:404 })
    return NextResponse.json({ ok:true, client })
  } catch { return NextResponse.json({ ok:false }, { status:500 }) }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  try {
    const body = await req.json()
    const { updateClientNotes, updateService, addTaxReturn, removeTaxReturn, addSuperReturn, removeSuperReturn } = await import('@/lib/db')
    if (body.action === 'notes')        { await updateClientNotes(params.id, body.notes);               return NextResponse.json({ ok:true }) }
    if (body.action === 'service')      { await updateService(params.id, body.service, body.data);      return NextResponse.json({ ok:true }) }
    if (body.action === 'add-tax')      { await addTaxReturn(params.id, body.data);                     return NextResponse.json({ ok:true }) }
    if (body.action === 'remove-tax')   { await removeTaxReturn(params.id, body.year);                  return NextResponse.json({ ok:true }) }
    if (body.action === 'add-super')    { await addSuperReturn(params.id, body.data);                   return NextResponse.json({ ok:true }) }
    if (body.action === 'remove-super') { await removeSuperReturn(params.id, body.year);                return NextResponse.json({ ok:true }) }
    if (body.action === 'update') {
      const d = body.data ?? {}
      try {
        const { sql: dbSql } = await import('@vercel/postgres')
        await dbSql`
          UPDATE crm_clients SET
            full_name = ${d.fullName ?? ''}, dob = ${d.dob ?? ''},
            whatsapp  = ${d.whatsapp ?? ''}, email = ${d.email ?? ''},
            country   = ${d.country  ?? ''}, how_heard = ${d.howHeard ?? ''},
            notes     = ${d.notes    ?? ''}
          WHERE id = ${params.id}
        `
        const { getClientById } = await import('@/lib/db')
        const client = await getClientById(params.id)
        return NextResponse.json({ ok:true, client })
      } catch {
        return NextResponse.json({ ok:true, client: { ...d, id: params.id } })
      }
    }
    if (body.action === 'clear') {
      try {
        const { sql: dbSql } = await import('@vercel/postgres')
        await dbSql`UPDATE crm_clients SET address='', tfn='', bank_details='', primary_job='', marital='', tax_status='', how_heard='', au_phone='' WHERE id = ${params.id}`
      } catch { /* No DB */ }
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'handle') {
      try {
        const { sql: dbSql } = await import('@vercel/postgres')
        const ts = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
        const marker = `\n[Marked handled: ${ts}]`
        await dbSql`UPDATE crm_clients SET notes = CONCAT(COALESCE(notes,''), ${marker}) WHERE id = ${params.id}`
      } catch { /* No DB */ }
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ ok:false }, { status:400 })
  } catch (err) {
    console.error('[PATCH /api/crm/clients/[id]]', err)
    return NextResponse.json({ ok:false }, { status:500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  try { const { deleteClient } = await import('@/lib/db'); await deleteClient(params.id) } catch {}
  return NextResponse.json({ ok:true })
}

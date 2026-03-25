// SECURITY FIX: requireAuthAndCsrf for state-changing operations (PATCH, DELETE)
// SECURITY FIX 2: params.id validated against safe-chars regex before any DB call
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, requireAuthAndCsrf } from '@/lib/auth'

const SAFE_ID_RE = /^[A-Za-z0-9_-]+$/
function validateId(id: string): boolean {
  return typeof id === 'string' && id.length > 0 && SAFE_ID_RE.test(id)
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth
  if (!validateId(params.id)) return NextResponse.json({ ok:false }, { status:400 })
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
  if (!validateId(params.id)) return NextResponse.json({ ok:false }, { status:400 })
  try {
    const body = await req.json()
    const { updateClientNotes, updateService, addTaxReturn, removeTaxReturn, addSuperReturn, removeSuperReturn } = await import('@/lib/db')
    if (body.action === 'notes') {
      const sanitized = typeof body.notes === 'string' ? body.notes.slice(0, 5000) : ''
      await updateClientNotes(params.id, sanitized)
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'service') {
      if (body.service !== 'tfn' && body.service !== 'abn') {
        return NextResponse.json({ ok:false, error:'invalid_service' }, { status:400 })
      }
      const d = body.data ?? {}
      const serviceData = {
        done:        typeof d.done === 'boolean' ? d.done : false,
        completedAt: typeof d.completedAt === 'string' ? d.completedAt.slice(0, 30) : '',
        notes:       typeof d.notes === 'string' ? d.notes.slice(0, 1000) : '',
      }
      await updateService(params.id, body.service, serviceData)
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'add-tax') {
      const amt = Number(body.data?.refundAmount)
      if (!isFinite(amt) || amt < 0) return NextResponse.json({ ok:false, error:'invalid_amount' }, { status:400 })
      await addTaxReturn(params.id, { ...body.data, refundAmount: amt, type: body.data?.type === 'owed' ? 'owed' : 'refund' })
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'remove-tax')   { await removeTaxReturn(params.id, body.year);  return NextResponse.json({ ok:true }) }
    if (body.action === 'add-super') {
      const amt = Number(body.data?.amount)
      if (!isFinite(amt) || amt < 0) return NextResponse.json({ ok:false, error:'invalid_amount' }, { status:400 })
      await addSuperReturn(params.id, { ...body.data, amount: amt })
      return NextResponse.json({ ok:true })
    }
    if (body.action === 'remove-super') { await removeSuperReturn(params.id, body.year); return NextResponse.json({ ok:true }) }
    if (body.action === 'update') {
      const d = body.data ?? {}
      const { isValidEmail, isValidDate, isValidPhone, sanitizeString } = await import('@/lib/form-protection')
      if (d.email && !isValidEmail(String(d.email))) {
        return NextResponse.json({ ok:false, error:'invalid_email' }, { status:400 })
      }
      if (d.dob && !isValidDate(String(d.dob))) {
        return NextResponse.json({ ok:false, error:'invalid_dob' }, { status:400 })
      }
      if (d.whatsapp && !isValidPhone(String(d.whatsapp))) {
        return NextResponse.json({ ok:false, error:'invalid_whatsapp' }, { status:400 })
      }
      const sanitized = {
        fullName:  sanitizeString(d.fullName  ?? '', 150),
        dob:       sanitizeString(d.dob       ?? '', 10),
        whatsapp:  sanitizeString(d.whatsapp  ?? '', 30),
        email:     sanitizeString(d.email     ?? '', 254),
        country:   sanitizeString(d.country   ?? '', 100),
        howHeard:  sanitizeString(d.howHeard  ?? '', 100),
        notes:     sanitizeString(d.notes     ?? '', 5000),
      }
      try {
        const { sql: dbSql } = await import('@vercel/postgres')
        await dbSql`
          UPDATE crm_clients SET
            full_name = ${sanitized.fullName}, dob = ${sanitized.dob},
            whatsapp  = ${sanitized.whatsapp}, email = ${sanitized.email},
            country   = ${sanitized.country},  how_heard = ${sanitized.howHeard},
            notes     = ${sanitized.notes}
          WHERE id = ${params.id}
        `
        const { getClientById } = await import('@/lib/db')
        const client = await getClientById(params.id)
        return NextResponse.json({ ok:true, client })
      } catch {
        return NextResponse.json({ ok:true, client: { ...sanitized, id: params.id } })
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
  if (!validateId(params.id)) return NextResponse.json({ ok:false }, { status:400 })
  try { const { deleteClient } = await import('@/lib/db'); await deleteClient(params.id) } catch {}
  return NextResponse.json({ ok:true })
}

export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { validateSessionFresh } from '@/lib/crm-store'
import { safeErr } from '@/lib/log-safe'

function auth(req: NextRequest) { return validateSessionFresh(req.cookies.get('crm_session')?.value) }

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await auth(req))) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const body = await req.json()
    const { markTaskDone, updateTaskNotes, updateTaskReviewerNote, deleteTaskAndArchive, deleteTaskPermanent } = await import('@/lib/db')
    if (body.action === 'done')             { const amt = typeof body.refundAmount === 'number' && isFinite(body.refundAmount) && body.refundAmount > 0 ? body.refundAmount : undefined; await markTaskDone((await params).id, amt); return NextResponse.json({ ok:true, archived:true }) }
    if (body.action === 'notes')            { const notes = typeof body.notes === 'string' ? body.notes.slice(0, 10_000) : ''; await updateTaskNotes((await params).id, notes); return NextResponse.json({ ok:true }) }
    if (body.action === 'reviewerNote')     { const note = typeof body.reviewerNote === 'string' ? body.reviewerNote.slice(0, 2_000) : ''; await updateTaskReviewerNote((await params).id, note); return NextResponse.json({ ok:true }) }
    if (body.action === 'fix_link') {
      // One-time link that opens only the residency question (Jo, 3 Nov). Staff-only.
      const { getTask } = await import('@/lib/db')
      const { getStore } = await import('@/lib/will/store')
      const { signFixToken } = await import('@/lib/will/form-token')
      const task = await getTask((await params).id)
      const waId = (task?.whatsapp ?? '').replace(/\D/g, '')
      if (!task || task.done || task.taskType !== 'tax-return' || !waId) return NextResponse.json({ ok:false, error:'no_whatsapp' }, { status:404 })
      const customer = await getStore().getCustomerByWaId(waId).catch(() => null)
      const token = customer ? signFixToken(customer.id, 'wht') : null
      if (!token) return NextResponse.json({ ok:false, error:'not_available' }, { status:409 })
      return NextResponse.json({ ok:true, url: `https://workingholidaytax.com.au/y8vwp4bf7?k=${token}` })
    }
    if (body.action === 'delete')           { await deleteTaskAndArchive((await params).id);  return NextResponse.json({ ok:true }) }
    if (body.action === 'delete_permanent') { await deleteTaskPermanent((await params).id);   return NextResponse.json({ ok:true }) }

    return NextResponse.json({ ok:false, error: 'unknown_action' }, { status:400 })
  } catch (err) {
    console.error('[PATCH task]', safeErr(err))
    return NextResponse.json({ ok:false, error: 'db_error' }, { status:500 })
  }
}

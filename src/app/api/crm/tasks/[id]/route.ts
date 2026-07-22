export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const body = await req.json()
    const { markTaskDone, updateTaskNotes, updateTaskReviewerNote, deleteTaskAndArchive, deleteTaskPermanent, getTask } = await import('@/lib/db')
    if (body.action === 'done')             { await markTaskDone(params.id); return NextResponse.json({ ok:true, archived:true }) }
    if (body.action === 'notes')            { const notes = typeof body.notes === 'string' ? body.notes.slice(0, 10_000) : ''; await updateTaskNotes(params.id, notes); return NextResponse.json({ ok:true }) }
    if (body.action === 'reviewerNote')     { const note = typeof body.reviewerNote === 'string' ? body.reviewerNote.slice(0, 2_000) : ''; await updateTaskReviewerNote(params.id, note); return NextResponse.json({ ok:true }) }
    if (body.action === 'delete')           { await deleteTaskAndArchive(params.id);  return NextResponse.json({ ok:true }) }
    if (body.action === 'delete_permanent') { await deleteTaskPermanent(params.id);   return NextResponse.json({ ok:true }) }

    // "Done" + automatic client notification: the return is ready for
    // signature. Human enters the real refund amount and invoice link
    // right here, so this sends directly (not through shadow mode) —
    // same reasoning as the CRM reply box: a human composed and confirmed
    // this specific message, it's not the bot deciding anything.
    if (body.action === 'complete_and_notify') {
      const refundAmount = typeof body.refundAmount === 'string' ? body.refundAmount.trim() : ''
      const invoiceLink   = typeof body.invoiceLink === 'string' ? body.invoiceLink.trim() : ''
      if (!refundAmount || !invoiceLink) {
        return NextResponse.json({ ok:false, error: 'Missing refundAmount or invoiceLink' }, { status: 400 })
      }

      const task = await getTask(params.id)
      if (!task) return NextResponse.json({ ok:false, error: 'Task not found' }, { status: 404 })

      await markTaskDone(params.id)

      if (task.whatsapp) {
        const { sendTextMessage } = await import('@/lib/whatsapp')
        const { getOrCreateConversation, logMessage } = await import('@/lib/wa-store')

        const message =
          'Your tax return is ready 🎉\n' +
          "I've sent it to your email for review and signature 📧\n" +
          `Estimated refund: $${refundAmount}\n` +
          "Here's your invoice:\n" +
          `${invoiceLink}\n` +
          "Once payment is complete, just send me a screenshot and I'll lodge your tax return right away 🙌🏽"

        const result = await sendTextMessage(task.whatsapp, message)
        if (result.ok) {
          // Best-effort: log into the WhatsApp conversation history too, so
          // it shows up in the "WhatsApp Leads" tab if this client has one.
          try {
            const firstName = task.clientName?.split(' ')[0] ?? ''
            const conversation = await getOrCreateConversation(task.whatsapp, firstName)
            await logMessage(conversation.id, 'outbound', message, 'ready_for_signature', result.messageId)
          } catch (err) {
            console.error('[complete_and_notify] wa log failed (non-fatal)', err)
          }
        } else {
          // Task is already marked done — don't fail the whole request,
          // but tell the caller the message didn't go out.
          return NextResponse.json({ ok:true, archived:true, notified:false, error: result.error })
        }
      }

      return NextResponse.json({ ok:true, archived:true, notified: Boolean(task.whatsapp) })
    }

    return NextResponse.json({ ok:false, error: 'unknown_action' }, { status:400 })
  } catch (err) {
    console.error('[PATCH task]', err)
    return NextResponse.json({ ok:false, error: 'db_error' }, { status:500 })
  }
}

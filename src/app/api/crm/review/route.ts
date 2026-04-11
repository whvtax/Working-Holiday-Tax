export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateReviewerSession, validateSession } from '@/lib/crm-store'
import { setReviewStatus, setReviewerNote, getTask, updateTaskNotes, ReviewStatus } from '@/lib/db'

function authReviewer(req: NextRequest) {
  return validateReviewerSession(req.cookies.get('crm_reviewer_session')?.value)
    || validateSession(req.cookies.get('crm_session')?.value) // admin can also review
}

const VALID_STATUSES = new Set<ReviewStatus>(['approved', 'rejected', 'pending'])

export async function PATCH(req: NextRequest) {
  if (!authReviewer(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { taskId, status, note } = await req.json()

    // Save note if provided — accumulate into task.notes so CRM sees it
    if (note !== undefined && taskId) {
      const cleanNote = String(note).slice(0, 1000).trim()
      // Always save to reviewer_note field (latest value)
      await setReviewerNote(taskId, cleanNote)
      // Also accumulate into task.notes so it appears in CRM notes panel
      // We store under a special prefix so we can identify reviewer entries
      const task = await getTask(taskId)
      if (task) {
        const existingNotes = task.notes || ''
        // Remove any previous reviewer note entries from notes field
        const noteParts = existingNotes.split(' | ').filter(p => !p.startsWith('[Reviewer] '))
        if (cleanNote) {
          noteParts.push(`[Reviewer] ${cleanNote}`)
        }
        await updateTaskNotes(taskId, noteParts.join(' | '))
      }
    }

    // Save status if provided
    if (status !== undefined) {
      if (!taskId || !VALID_STATUSES.has(status)) {
        return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 })
      }
      await setReviewStatus(taskId, status)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[review PATCH]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateReviewerSession, validateSession } from '@/lib/crm-store'
import { setReviewStatus, setReviewerNote, getTask, updateTaskNotes, ReviewStatus } from '@/lib/db'

function authReviewer(req: NextRequest) {
  return validateReviewerSession(req.cookies.get('crm_reviewer_session')?.value)
    || validateSession(req.cookies.get('crm_session')?.value)
}

const VALID_STATUSES = new Set<ReviewStatus>(['approved', 'rejected', 'pending'])

// Prefix used to mark reviewer notes inside task.notes — must NOT match extractUserNotes exclusion patterns
const REVIEWER_PREFIX = '📝 '

export async function PATCH(req: NextRequest) {
  if (!authReviewer(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { taskId, status, note } = await req.json()

    if (note !== undefined && taskId) {
      const cleanNote = String(note).slice(0, 1000).trim()

      // 1. Always update reviewer_note field (shown in yellow banner)
      await setReviewerNote(taskId, cleanNote)

      // 2. Sync into task.notes so it appears in Internal notes in CRM
      const task = await getTask(taskId)
      if (task) {
        const existingNotes = task.notes || ''
        // Remove any previous reviewer note entry, then add the new one
        const parts = existingNotes.split(' | ').filter(p => !p.startsWith(REVIEWER_PREFIX))
        if (cleanNote) {
          parts.push(`${REVIEWER_PREFIX}${cleanNote}`)
        }
        await updateTaskNotes(taskId, parts.join(' | '))
      }
    }

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

export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { validateReviewerSession, validateSession } from '@/lib/crm-store'
import { setReviewStatus, setReviewerNote, ReviewStatus } from '@/lib/db'

function authReviewer(req: NextRequest) {
  return validateReviewerSession(req.cookies.get('crm_reviewer_session')?.value)
    || validateSession(req.cookies.get('crm_session')?.value) // admin can also review
}

const VALID_STATUSES = new Set<ReviewStatus>(['approved', 'rejected', 'pending'])

export async function PATCH(req: NextRequest) {
  if (!authReviewer(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { taskId, status, note } = await req.json()

    // Save note if provided
    if (note !== undefined && taskId) {
      const cleanNote = String(note).slice(0, 1000)
      await setReviewerNote(taskId, cleanNote)
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

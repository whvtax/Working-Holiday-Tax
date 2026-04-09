import { NextRequest, NextResponse } from 'next/server'
import { validateSession, validateReviewerSession } from '@/lib/crm-store'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
    || validateReviewerSession(req.cookies.get('crm_reviewer_session')?.value)
}

async function getTasks() {
  try { const { getAllTasks } = await import('@/lib/db'); return await getAllTasks() }
  catch { return [] }
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  const tasks = await getTasks()
  return NextResponse.json({ ok:true, tasks })
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const body = await req.json()
    const { createTask } = await import('@/lib/db')
    const { randomUUID } = await import('crypto')
    const VALID_TASK_TYPES = new Set(['tax-return','super','tfn','abn'])
    // Validate fileUrls: only allow strings that look like https:// URLs, max 50 items
    const rawUrls: unknown[] = Array.isArray(body.fileUrls) ? body.fileUrls.slice(0, 50) : []
    const safeFileUrls = rawUrls.filter(
      (u): u is string => typeof u === 'string' && u.startsWith('https://')
    )
    const task = await createTask({
      clientId:    `CLT-${randomUUID()}`,
      clientName:  sanitiseShort(body.clientName),
      taskType:    VALID_TASK_TYPES.has(body.taskType) ? body.taskType : 'tax-return',
      whatsapp:    sanitiseShort(body.whatsapp),
      email:       sanitiseShort(body.email),
      country:     sanitiseShort(body.country),
      dob:         sanitiseShort(body.dob),
      taxYear:     sanitiseShort(body.taxYear),
      submittedAt: new Date().toISOString(),
      address:     sanitiseField(body.address),
      tfn:         sanitiseShort(body.tfn),
      bankDetails: sanitiseField(body.bankDetails),
      primaryJob:  sanitiseField(body.primaryJob),
      marital:     sanitiseShort(body.marital),
      taxStatus:   sanitiseShort(body.taxStatus) || 'Working Holiday Maker',
      howHeard:    sanitiseShort(body.howHeard),
      auPhone:     sanitiseShort(body.auPhone),
      notes:       sanitiseField(body.notes),
      fileUrls:    safeFileUrls,
    })
    return NextResponse.json({ ok:true, task })
  } catch (err) {
    console.error('[POST tasks]', err)
    return NextResponse.json({ ok:false, error:'db_error' }, { status:500 })
  }
}

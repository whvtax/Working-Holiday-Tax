export const runtime = 'nodejs'
import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const { searchParams } = new URL(req.url)
    const parseNum = (v: string | null, def: number) => {
      const n = parseInt(v ?? '', 10)
      return Number.isFinite(n) ? n : def
    }
    const limit  = Math.min(200, Math.max(1, parseNum(searchParams.get('limit'),  100)))
    const offset = Math.max(0, parseNum(searchParams.get('offset'), 0))
    const { getAllTasks, countTasks } = await import('@/lib/db')
    const [tasks, total] = await Promise.all([getAllTasks(limit, offset), countTasks()])
    return NextResponse.json({ ok:true, tasks, total, limit, offset })
  } catch (err) {
    // A database failure is NOT an empty tasks list. Answering ok:true with []
    // made the CRM say "No tasks yet." and wipe the rows it already had, on a
    // 20-second poll, with nothing on screen to say anything had gone wrong
    // (audit, 4 Sep). The client keeps what it has and shows the error.
    console.error('[crm/tasks] read failed:', err)
    return NextResponse.json({ ok:false, error:'db_error' }, { status:503 })
  }
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const body = await req.json()
    const { createTask } = await import('@/lib/db')
    const { randomUUID } = await import('crypto')
    const { isValidSupabaseStorageUrl } = await import('@/lib/supabase')
    const VALID_TASK_TYPES = new Set(['tax-return','super','tfn','abn'])
    // Validate fileUrls: only allow URLs from our Supabase Storage (prevent SSRF/tracking), max 50 items
    const rawUrls: unknown[] = Array.isArray(body.fileUrls) ? body.fileUrls.slice(0, 50) : []
    const safeFileUrls = rawUrls.filter(
      (u): u is string => typeof u === 'string' && isValidSupabaseStorageUrl(u)
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
      reviewStatus: 'pending',
      reviewerNote: '',
      reviewedAt:   '',
    })
    return NextResponse.json({ ok:true, task })
  } catch (err) {
    console.error('[POST tasks]', err)
    return NextResponse.json({ ok:false, error:'db_error' }, { status:500 })
  }
}

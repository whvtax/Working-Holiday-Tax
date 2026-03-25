import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, requireAuthAndCsrf } from '@/lib/auth'
import crypto from 'crypto'

async function getTasks() {
  try { const { getAllTasks } = await import('@/lib/db'); return await getAllTasks() }
  catch { return DEMO_TASKS }
}

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth
  const tasks = await getTasks()
  return NextResponse.json({ ok:true, tasks })
}

export async function POST(req: NextRequest) {
  const auth = await requireAuthAndCsrf(req)
  if (auth instanceof NextResponse) return auth
  const ct = req.headers.get('content-type') ?? ''
  if (!ct.includes('application/json')) {
    return NextResponse.json({ ok: false, error: 'invalid_content_type' }, { status: 400 })
  }
  try {
    const body = await req.json()
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ ok: false, error: 'invalid_body' }, { status: 400 })
    }
    const { createTask } = await import('@/lib/db')
    const s = (v: unknown, max = 500) => (typeof v === 'string' ? v.slice(0, max) : '')
    const task = await createTask({
      // SECURITY FIX: clientId ALWAYS generated server-side — never trusted from body.
      // Accepting clientId from the request body allowed an attacker to associate a
      // new task with any arbitrary existing client ID, potentially hijacking client records.
      clientId:    `CLT-${crypto.randomUUID()}`,
      clientName:  s(body.clientName, 150),
      taskType:    (['tax-return','super','tfn','abn'] as const).includes(body.taskType) ? body.taskType : 'tax-return',
      whatsapp:    s(body.whatsapp,    30),
      email:       s(body.email,      254),
      country:     s(body.country,    100),
      dob:         s(body.dob,         10),
      taxYear:     s(body.taxYear,     10),
      submittedAt: typeof body.submittedAt === 'string' ? body.submittedAt.slice(0, 30) : new Date().toISOString(),
      address:     s(body.address,     300),
      tfn:         s(body.tfn,          15),
      bankDetails: s(body.bankDetails, 200),
      primaryJob:  s(body.primaryJob,  200),
      marital:     s(body.marital,      20),
      taxStatus:   s(body.taxStatus,    50),
      howHeard:    s(body.howHeard,    100),
      auPhone:     s(body.auPhone,      30),
      notes:       s(body.notes,       500),
    })
    return NextResponse.json({ ok:true, task })
  } catch (err) {
    console.error('[POST /api/crm/tasks]', err)
    return NextResponse.json({ ok:false }, { status:500 })
  }
}

const now = Date.now()
const DEMO_TASKS = [
  { id:'TASK-DEMO-1', clientId:'CLT-DEMO-1', clientName:'Demo User 1', taskType:'tax-return',
    whatsapp:'+610000000001', email:'demo1@example.invalid', country:'France', dob:'1998-01-01',
    taxYear:'2023-24', submittedAt:new Date(now-2*86400000).toISOString(), done:false,
    address:'Demo Address, Sydney NSW', tfn:'000 000 000', bankDetails:'BSB 000-000 · ACC 00000000',
    primaryJob:'Demo Job', marital:'Single', taxStatus:'Working Holiday Maker',
    howHeard:'Demo', auPhone:'+61400000001', notes:'Demo task — not a real client.' },
  { id:'TASK-DEMO-2', clientId:'CLT-DEMO-2', clientName:'Demo User 2', taskType:'super',
    whatsapp:'+610000000002', email:'demo2@example.invalid', country:'Italy', dob:'1996-01-01',
    taxYear:'2022-23', submittedAt:new Date(now-5*86400000).toISOString(), done:false,
    address:'Demo Address, Melbourne VIC', tfn:'000 000 000', bankDetails:'BSB 000-000 · ACC 00000000',
    primaryJob:'Demo Job', marital:'Single', taxStatus:'Working Holiday Maker',
    howHeard:'Demo', auPhone:'+61400000002', notes:'' },
]

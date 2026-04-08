import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

async function getTasks() {
  try { const { getAllTasks } = await import('@/lib/db'); return await getAllTasks() }
  catch { return DEMO_TASKS }
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  const tasks = await getTasks()
  return NextResponse.json({ ok:true, tasks })
}

const now = Date.now()
const DEMO_TASKS = [
  { id:'TASK-DEMO-1', clientId:'CLT-DEMO-1', clientName:'Sophie Lambert', taskType:'tax-return',
    whatsapp:'+33612345678', email:'demo-sophie@example.com', country:'France', dob:'1998-04-12',
    taxYear:'2023-24', submittedAt:new Date(now-2*86400000).toISOString(), done:false,
    address:'42 Bondi Rd, Sydney NSW 2026', tfn:'DEMO-TFN-001', bankDetails:'DEMO-BANK-001',
    primaryJob:'Barista – The Grounds of Alexandria', marital:'Single',
    taxStatus:'Working Holiday Maker', howHeard:'Instagram', auPhone:'+61412345678',
    notes:'Has two employers — needs group certs from both.', fileUrls:[] },
  { id:'TASK-DEMO-2', clientId:'CLT-DEMO-2', clientName:'Marco Bianchi', taskType:'tax-return',
    whatsapp:'+39333987654', email:'demo-marco@example.com', country:'Italy', dob:'1996-09-22',
    taxYear:'2022-23', submittedAt:new Date(now-5*86400000).toISOString(), done:false,
    address:'7 Collins St, Melbourne VIC 3000', tfn:'DEMO-TFN-002', bankDetails:'DEMO-BANK-002',
    primaryJob:'Farm Worker – Mildura QLD', marital:'Single',
    taxStatus:'Working Holiday Maker', howHeard:'Friend referral', auPhone:'+61498765432', notes:'', fileUrls:[] },
  { id:'TASK-DEMO-3', clientId:'CLT-DEMO-3', clientName:'Lena Müller', taskType:'super',
    whatsapp:'+49160112233', email:'demo-lena@example.com', country:'Germany', dob:'2000-01-30',
    taxYear:'2024-25', submittedAt:new Date(now-86400000).toISOString(), done:false,
    address:'15 Queen St, Brisbane QLD 4000', tfn:'DEMO-TFN-003', bankDetails:'DEMO-BANK-003',
    primaryJob:'Waitress – Noosa Waterfront', marital:'Single',
    taxStatus:'Working Holiday Maker', howHeard:'TikTok', auPhone:'+61467112233',
    notes:'Urgent — leaving Australia next week.', fileUrls:[] },
  { id:'TASK-DEMO-4', clientId:'CLT-DEMO-4', clientName:'Jonas Dupont', taskType:'tax-return',
    whatsapp:'+32477123456', email:'demo-jonas@example.com', country:'Belgium', dob:'1997-06-15',
    taxYear:'2023-24', submittedAt:new Date(now-8*86400000).toISOString(), done:true,
    address:'3 George St, Sydney NSW 2000', tfn:'DEMO-TFN-004', bankDetails:'DEMO-BANK-004',
    primaryJob:'Chef – Crown Melbourne', marital:'Single',
    taxStatus:'Working Holiday Maker', howHeard:'Google', auPhone:'+61433445566',
    notes:'Submitted to ATO on 20 Mar.', fileUrls:[] },
]

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

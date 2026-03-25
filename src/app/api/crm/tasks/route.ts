import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

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

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const body = await req.json()
    const { createTask } = await import('@/lib/db')
    const task = await createTask({
      clientId:    body.clientId    ?? `CLT-${Date.now()}`,
      clientName:  body.clientName  ?? '',
      taskType:    body.taskType    ?? 'tax-return',
      whatsapp:    body.whatsapp    ?? '',
      email:       body.email       ?? '',
      country:     body.country     ?? '',
      dob:         body.dob         ?? '',
      taxYear:     body.taxYear     ?? '',
      submittedAt: body.submittedAt ?? new Date().toISOString(),
      address:     body.address     ?? '',
      tfn:         body.tfn         ?? '',
      bankDetails: body.bankDetails ?? '',
      primaryJob:  body.primaryJob  ?? '',
      marital:     body.marital     ?? '',
      taxStatus:   body.taxStatus   ?? '',
      howHeard:    body.howHeard    ?? '',
      auPhone:     body.auPhone     ?? '',
      notes:       body.notes       ?? '',
    })
    return NextResponse.json({ ok:true, task })
  } catch (err) {
    console.error('[POST /api/crm/tasks]', err)
    return NextResponse.json({ ok:false }, { status:500 })
  }
}

const now = Date.now()
const DEMO_TASKS = [
  { id:'TASK-DEMO-1', clientId:'CLT-DEMO-1', clientName:'Sophie Lambert', taskType:'tax-return',
    whatsapp:'+33612345678', email:'sophie.lambert@gmail.com', country:'France', dob:'1998-04-12',
    taxYear:'2023-24', submittedAt:new Date(now-2*86400000).toISOString(), done:false,
    address:'42 Bondi Rd, Sydney NSW 2026', tfn:'123 456 789', bankDetails:'BSB 062-000 · ACC 12345678 · CBA',
    primaryJob:'Barista – The Grounds of Alexandria', marital:'Single',
    taxStatus:'Working Holiday Maker', howHeard:'Instagram', auPhone:'+61412345678',
    notes:'Has two employers — needs group certs from both.' },
  { id:'TASK-DEMO-2', clientId:'CLT-DEMO-2', clientName:'Marco Bianchi', taskType:'tax-return',
    whatsapp:'+39333987654', email:'marco.bianchi@hotmail.com', country:'Italy', dob:'1996-09-22',
    taxYear:'2022-23', submittedAt:new Date(now-5*86400000).toISOString(), done:false,
    address:'7 Collins St, Melbourne VIC 3000', tfn:'987 654 321', bankDetails:'BSB 013-000 · ACC 87654321 · ANZ',
    primaryJob:'Farm Worker – Mildura QLD', marital:'Single',
    taxStatus:'Working Holiday Maker', howHeard:'Friend referral', auPhone:'+61498765432', notes:'' },
  { id:'TASK-DEMO-3', clientId:'CLT-DEMO-3', clientName:'Lena Müller', taskType:'super',
    whatsapp:'+49160112233', email:'lena.mueller@web.de', country:'Germany', dob:'2000-01-30',
    taxYear:'2024-25', submittedAt:new Date(now-86400000).toISOString(), done:false,
    address:'15 Queen St, Brisbane QLD 4000', tfn:'456 789 012', bankDetails:'BSB 034-000 · ACC 45678901 · Westpac',
    primaryJob:'Waitress – Noosa Waterfront', marital:'Single',
    taxStatus:'Working Holiday Maker', howHeard:'TikTok', auPhone:'+61467112233',
    notes:'Urgent — leaving Australia next week.' },
  { id:'TASK-DEMO-4', clientId:'CLT-DEMO-4', clientName:'Jonas Dupont', taskType:'tax-return',
    whatsapp:'+32477123456', email:'jonas.dupont@gmail.com', country:'Belgium', dob:'1997-06-15',
    taxYear:'2023-24', submittedAt:new Date(now-8*86400000).toISOString(), done:true,
    address:'3 George St, Sydney NSW 2000', tfn:'321 654 987', bankDetails:'BSB 055-000 · ACC 32165498 · NAB',
    primaryJob:'Chef – Crown Melbourne', marital:'Single',
    taxStatus:'Working Holiday Maker', howHeard:'Google', auPhone:'+61433445566',
    notes:'Submitted to ATO on 20 Mar.' },
]

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  try {
    const { searchParams } = new URL(req.url)
    const archived = searchParams.get('archived') === 'true'
    const { getAllActiveClients, getAllArchivedClients } = await import('@/lib/db')
    const clients = archived ? await getAllArchivedClients() : await getAllActiveClients()
    return NextResponse.json({ ok:true, clients })
  } catch {
    const { getAllClients } = await import('@/lib/db')
    try {
      const clients = await getAllClients()
      return NextResponse.json({ ok:true, clients })
    } catch {
      return NextResponse.json({ ok:true, clients: DEMO_CLIENTS })
    }
  }
}

const now = Date.now()
const DEMO_CLIENTS = [
  { id:'CLT-DEMO-5', fullName:'Jonas Dupont', dob:'1997-06-15', whatsapp:'+32477123456',
    email:'demo-jonas@example.com', country:'Belgium', howHeard:'Friend referral', notes:'',
    createdAt:new Date(now-30*86400000).toISOString(), archived:false, yearlyCheckins:{},
    taxReturns:[
      { year:'2022-23', refundAmount:3120, type:'refund', completedAt:new Date(now-200*86400000).toISOString() },
      { year:'2023-24', refundAmount:2840, type:'refund', completedAt:new Date(now-30*86400000).toISOString() },
    ],
    superReturns:[{ year:'2022-23', amount:4200, completedAt:new Date(now-30*86400000).toISOString() }],
    tfnService:{ done:true, completedAt:new Date(now-400*86400000).toISOString(), notes:'' },
    abnService:{ done:false, completedAt:'', notes:'' },
  },
]

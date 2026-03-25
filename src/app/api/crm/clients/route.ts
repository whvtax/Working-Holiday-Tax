import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) { return validateSession(req.cookies.get('crm_session')?.value) }

async function getClients() {
  try { const { getAllClients } = await import('@/lib/db'); return await getAllClients() }
  catch { return DEMO_CLIENTS }
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok:false }, { status:401 })
  const clients = await getClients()
  return NextResponse.json({ ok:true, clients })
}

const now = Date.now()
const DEMO_CLIENTS = [
  { id:'CLT-DEMO-5', fullName:'Jonas Dupont', dob:'1997-06-15', whatsapp:'+32477123456',
    email:'jonas.dupont@gmail.com', country:'Belgium', howHeard:'Friend referral', notes:'',
    createdAt:new Date(now-30*86400000).toISOString(),
    taxReturns:[
      { year:'2022-23', refundAmount:3120, type:'refund', completedAt:new Date(now-200*86400000).toISOString() },
      { year:'2023-24', refundAmount:2840, type:'refund', completedAt:new Date(now-30*86400000).toISOString() },
    ],
    superReturns:[{ year:'2022-23', amount:4200, completedAt:new Date(now-30*86400000).toISOString() }],
    tfnService:{ done:true, completedAt:new Date(now-400*86400000).toISOString(), notes:'' },
    abnService:{ done:false, completedAt:'', notes:'' },
  },
  { id:'CLT-DEMO-6', fullName:'Anna Kowalski', dob:'1999-03-08', whatsapp:'+48601234567',
    email:'anna.kowalski@wp.pl', country:'Poland', howHeard:'Google', notes:'Long-term client.',
    createdAt:new Date(now-60*86400000).toISOString(),
    taxReturns:[
      { year:'2021-22', refundAmount:1850, type:'refund', completedAt:new Date(now-400*86400000).toISOString() },
      { year:'2022-23', refundAmount:2200, type:'refund', completedAt:new Date(now-200*86400000).toISOString() },
      { year:'2023-24', refundAmount:2950, type:'refund', completedAt:new Date(now-60*86400000).toISOString() },
    ],
    superReturns:[],
    tfnService:{ done:true, completedAt:new Date(now-500*86400000).toISOString(), notes:'' },
    abnService:{ done:true, completedAt:new Date(now-300*86400000).toISOString(), notes:'' },
  },
  { id:'CLT-DEMO-7', fullName:'Emma Dubois', dob:'2001-11-22', whatsapp:'+33698765432',
    email:'emma.dubois@orange.fr', country:'France', howHeard:'Instagram', notes:'',
    createdAt:new Date(now-90*86400000).toISOString(),
    taxReturns:[{ year:'2023-24', refundAmount:1980, type:'refund', completedAt:new Date(now-90*86400000).toISOString() }],
    superReturns:[],
    tfnService:{ done:false, completedAt:'', notes:'' },
    abnService:{ done:false, completedAt:'', notes:'' },
  },
]

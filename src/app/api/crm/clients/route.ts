// SECURITY FIX: uses requireAuth (async, Redis revocation check)
import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

async function getClients() {
  try { const { getAllClients } = await import('@/lib/db'); return await getAllClients() }
  catch { return DEMO_CLIENTS }
}

export async function GET(req: NextRequest) {
  const auth = await requireAuth(req)
  if (auth instanceof NextResponse) return auth
  const clients = await getClients()
  return NextResponse.json({ ok: true, clients })
}

const now = Date.now()
const DEMO_CLIENTS = [
  { id:'CLT-DEMO-5', fullName:'Demo User 5', dob:'1997-01-01', whatsapp:'+610000000005',
    email:'demo5@example.invalid', country:'Belgium', howHeard:'Demo', notes:'',
    createdAt:new Date(now-30*86400000).toISOString(),
    taxReturns:[
      { year:'2022-23', refundAmount:3120, type:'refund', completedAt:new Date(now-200*86400000).toISOString() },
      { year:'2023-24', refundAmount:2840, type:'refund', completedAt:new Date(now-30*86400000).toISOString() },
    ],
    superReturns:[{ year:'2022-23', amount:4200, completedAt:new Date(now-30*86400000).toISOString() }],
    tfnService:{ done:true, completedAt:new Date(now-400*86400000).toISOString(), notes:'' },
    abnService:{ done:false, completedAt:'', notes:'' },
  },
  { id:'CLT-DEMO-6', fullName:'Demo User 6', dob:'1999-01-01', whatsapp:'+610000000006',
    email:'demo6@example.invalid', country:'Poland', howHeard:'Demo', notes:'Demo long-term client.',
    createdAt:new Date(now-60*86400000).toISOString(),
    taxReturns:[
      { year:'2021-22', refundAmount:1850, type:'refund', completedAt:new Date(now-400*86400000).toISOString() },
      { year:'2022-23', refundAmount:2200, type:'refund', completedAt:new Date(now-200*86400000).toISOString() },
    ],
    superReturns:[],
    tfnService:{ done:true, completedAt:new Date(now-500*86400000).toISOString(), notes:'' },
    abnService:{ done:true, completedAt:new Date(now-300*86400000).toISOString(), notes:'' },
  },
]

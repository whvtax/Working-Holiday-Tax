import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

async function getClients() {
  try {
    const { getAllClients } = await import('@/lib/db')
    return await getAllClients()
  } catch {
    return DEMO_CLIENTS
  }
}

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  const clients = await getClients()
  return NextResponse.json({ ok: true, clients })
}

const now = Date.now()
const DEMO_CLIENTS = [
  {
    id: 'CLT-DEMO-5', fullName: 'Jonas Dupont',
    dob: '1997-06-15', whatsapp: '+32477123456',
    email: 'jonas.dupont@gmail.com', country: 'Belgium',
    notes: '',
    createdAt: new Date(now - 30*86400000).toISOString(),
    taxReturns: [
      { year: '2022-23', refundAmount: 3120, completedAt: new Date(now - 200*86400000).toISOString() },
      { year: '2023-24', refundAmount: 2840, completedAt: new Date(now - 30*86400000).toISOString() },
    ],
  },
  {
    id: 'CLT-DEMO-6', fullName: 'Anna Kowalski',
    dob: '1999-03-08', whatsapp: '+48601234567',
    email: 'anna.kowalski@wp.pl', country: 'Poland',
    notes: '',
    createdAt: new Date(now - 60*86400000).toISOString(),
    taxReturns: [
      { year: '2021-22', refundAmount: 1850, completedAt: new Date(now - 400*86400000).toISOString() },
      { year: '2022-23', refundAmount: 2200, completedAt: new Date(now - 200*86400000).toISOString() },
      { year: '2023-24', refundAmount: 2950, completedAt: new Date(now - 60*86400000).toISOString() },
    ],
  },
  {
    id: 'CLT-DEMO-7', fullName: 'Emma Dubois',
    dob: '2001-11-22', whatsapp: '+33698765432',
    email: 'emma.dubois@orange.fr', country: 'France',
    notes: '',
    createdAt: new Date(now - 90*86400000).toISOString(),
    taxReturns: [
      { year: '2023-24', refundAmount: 1980, completedAt: new Date(now - 90*86400000).toISOString() },
    ],
  },
]

import { NextRequest, NextResponse } from 'next/server'
import { validateSession } from '@/lib/crm-store'

function auth(req: NextRequest) {
  return validateSession(req.cookies.get('crm_session')?.value)
}

async function getClient(id: string) {
  try {
    const { getClientById } = await import('@/lib/db')
    return await getClientById(id)
  } catch {
    // Fall back to demo data
    const now = Date.now()
    const DEMO: Record<string, any> = {
      'CLT-DEMO-5': { id:'CLT-DEMO-5', fullName:'Jonas Dupont', dob:'1997-06-15', whatsapp:'+32477123456', email:'jonas.dupont@gmail.com', country:'Belgium', createdAt: new Date(now-30*86400000).toISOString(), taxReturns:[{year:'2022-23',refundAmount:3120,completedAt:new Date(now-200*86400000).toISOString()},{year:'2023-24',refundAmount:2840,completedAt:new Date(now-30*86400000).toISOString()}] },
      'CLT-DEMO-6': { id:'CLT-DEMO-6', fullName:'Anna Kowalski', dob:'1999-03-08', whatsapp:'+48601234567', email:'anna.kowalski@wp.pl', country:'Poland', createdAt: new Date(now-60*86400000).toISOString(), taxReturns:[{year:'2021-22',refundAmount:1850,completedAt:new Date(now-400*86400000).toISOString()},{year:'2022-23',refundAmount:2200,completedAt:new Date(now-200*86400000).toISOString()},{year:'2023-24',refundAmount:2950,completedAt:new Date(now-60*86400000).toISOString()}] },
      'CLT-DEMO-7': { id:'CLT-DEMO-7', fullName:'Emma Dubois', dob:'2001-11-22', whatsapp:'+33698765432', email:'emma.dubois@orange.fr', country:'France', createdAt: new Date(now-90*86400000).toISOString(), taxReturns:[{year:'2023-24',refundAmount:1980,completedAt:new Date(now-90*86400000).toISOString()}] },
    }
    return DEMO[id] ?? null
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  const client = await getClient(params.id)
  if (!client) return NextResponse.json({ ok: false }, { status: 404 })
  return NextResponse.json({ ok: true, client })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!auth(req)) return NextResponse.json({ ok: false }, { status: 401 })
  try {
    const { deleteClient } = await import('@/lib/db')
    await deleteClient(params.id)
  } catch {}
  return NextResponse.json({ ok: true })
}

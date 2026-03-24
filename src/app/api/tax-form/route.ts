import { NextRequest, NextResponse } from 'next/server'
import { upsertClient } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const taxYear  = (formData.get('taxYear') as string) ?? '2024-25'

    const client = await upsertClient({
      id:          `CLT-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      whatsapp:    formData.get('waNumber')   as string ?? '',
      auPhone:     formData.get('auPhone')    as string ?? '',
      fullName:    formData.get('fullName')   as string ?? '',
      address:     formData.get('address')    as string ?? '',
      email:       formData.get('email')      as string ?? '',
      country:     formData.get('country')    as string ?? '',
      dob:         formData.get('dob')        as string ?? '',
      marital:     formData.get('marital')    as string ?? '',
      tfn:         formData.get('tfn')        as string ?? '',
      primaryJob:  formData.get('primaryJob') as string ?? '',
      bankDetails: formData.get('bankDetails') as string ?? '',
      taxStatus:   formData.get('taxStatus')  as string ?? '',
      howHeard:    formData.get('howHeard')   as string ?? '',
      taxYear,
      handled:     false,
      notes:       '',
      files: { bankStatement: null, selfiePassport: null, invoices: null },
    })

    console.log('New submission saved to DB:', client.id, client.fullName)
    return NextResponse.json({ ok: true, id: client.id })
  } catch (err) {
    console.error('[tax-form]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

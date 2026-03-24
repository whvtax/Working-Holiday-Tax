import { NextRequest, NextResponse } from 'next/server'
import { upsertClient } from '@/lib/crm-store'
import type { TaxYear } from '@/lib/crm-store'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const taxYear = (formData.get('taxYear') as TaxYear) ?? '2023-24'

    const client = upsertClient({
      submittedAt: new Date().toISOString(),
      whatsapp:    formData.get('waNumber') as string ?? '',
      auPhone:     formData.get('auPhone') as string ?? '',
      fullName:    formData.get('fullName') as string ?? '',
      address:     formData.get('address') as string ?? '',
      email:       formData.get('email') as string ?? '',
      country:     formData.get('country') as string ?? '',
      dob:         formData.get('dob') as string ?? '',
      marital:     formData.get('marital') as string ?? '',
      tfn:         formData.get('tfn') as string ?? '',
      primaryJob:  formData.get('primaryJob') as string ?? '',
      bankDetails: formData.get('bankDetails') as string ?? '',
      taxStatus:   formData.get('taxStatus') as string ?? '',
      howHeard:    formData.get('howHeard') as string ?? '',
      taxYear,
      files: { bankStatement: null, selfiePassport: null, invoices: null },
    })

    console.log('New CRM submission:', client.id, client.fullName)
    return NextResponse.json({ ok: true, id: client.id })
  } catch (err) {
    console.error('Form submission error:', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { createTask } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const formData  = await req.formData()
    const clientId  = `CLT-${Date.now()}`
    const fullName  = formData.get('fullName')  as string ?? ''

    await createTask({
      clientId,
      clientName:  fullName,
      taskType:    'tax-return',
      whatsapp:    formData.get('waNumber')    as string ?? '',
      auPhone:     formData.get('auPhone')     as string ?? '',
      email:       formData.get('email')       as string ?? '',
      country:     formData.get('country')     as string ?? '',
      dob:         formData.get('dob')         as string ?? '',
      taxYear:     formData.get('taxYear')     as string ?? '2024-25',
      address:     formData.get('address')     as string ?? '',
      tfn:         formData.get('tfn')         as string ?? '',
      bankDetails: formData.get('bankDetails') as string ?? '',
      primaryJob:  formData.get('primaryJob')  as string ?? '',
      marital:     formData.get('marital')     as string ?? '',
      taxStatus:   formData.get('taxStatus')   as string ?? '',
      howHeard:    formData.get('howHeard')    as string ?? '',
      submittedAt: new Date().toISOString(),
      notes: '',
    })

    console.log('New task created for:', fullName)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tax-form]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

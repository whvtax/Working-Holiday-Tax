import { NextRequest, NextResponse } from 'next/server'
import { createTask } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const firstName = formData.get('firstName') as string ?? ''
    const lastName  = formData.get('lastName')  as string ?? ''
    const fullName  = [firstName, lastName].filter(Boolean).join(' ')
    const taskType  = 'tfn' === 'super' ? 'super' : 'tfn' === 'tfn' ? 'tfn' : 'abn'

    await createTask({
      clientId:    `CLT-${Date.now()}`,
      clientName:  fullName,
      taskType:    taskType as any,
      whatsapp:    (formData.get('whatsapp') ?? formData.get('smsPhone') ?? '') as string,
      email:       formData.get('email') as string ?? '',
      country:     (formData.get('country') ?? formData.get('passportCountry') ?? '') as string,
      dob:         formData.get('dob') as string ?? '',
      taxYear:     '',
      address:     (formData.get('address') ?? formData.get('auAddress') ?? '') as string,
      tfn:         formData.get('tfn') as string ?? '',
      bankDetails: formData.get('bankDetails') as string ?? '',
      primaryJob:  formData.get('business') as string ?? '',
      marital:     formData.get('marital') as string ?? '',
      taxStatus:   'Working Holiday Maker',
      howHeard:    '',
      auPhone:     formData.get('auPhone') as string ?? '',
      submittedAt: new Date().toISOString(),
      notes:       formData.get('superFunds') as string ?? '',
    })

    console.log(`New ${taskType} form submitted: ${fullName}`)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(`[tfn-form]`, err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

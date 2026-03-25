import { NextRequest, NextResponse } from 'next/server'
import { createTask } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { uploadFiles } from '@/lib/upload'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    if (await isRateLimited(ip, 'abn-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData = await req.formData()
    const firstName = formData.get('firstName') as string ?? ''
    const lastName  = formData.get('lastName')  as string ?? ''
    const fullName  = [firstName, lastName].filter(Boolean).join(' ')

    const clientId = `CLT-${crypto.randomUUID()}`

    // Upload files to Vercel Blob
    const selfieFile = formData.get('selfiePassport') as File | null
    const fileUrls = await uploadFiles([selfieFile], `abn-form/${clientId}`)

    await createTask({
      clientId,
      clientName:  fullName,
      taskType:    'abn',
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
      fileUrls,
    })

    console.log('New abn form submitted:', fullName, '| files:', fileUrls.length)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[abn-form]', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

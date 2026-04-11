import { NextRequest, NextResponse } from 'next/server'
import { createTask } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { uploadFiles } from '@/lib/upload'
import { getClientIp } from '@/lib/get-ip'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (await isRateLimited(ip, 'tfn-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData  = await req.formData()
    const clientId  = `CLT-${crypto.randomUUID()}`
    const fullName  = [sanitiseShort(formData.get('firstName')), sanitiseShort(formData.get('lastName'))].filter(Boolean).join(' ')

    const selfieFile = formData.get('selfiePassport') as File | null
    let fileUrls: string[]
    try {
      fileUrls = await uploadFiles([selfieFile], `tfn-form/${clientId}`)
    } catch (uploadErr) {
      const msg = uploadErr instanceof Error ? uploadErr.message : 'Upload error'
      return NextResponse.json({ ok: false, error: 'invalid_file', message: msg }, { status: 400 })
    }

    await createTask({
      clientId,
      clientName:  fullName,
      taskType:    'tfn',
      whatsapp:    sanitiseShort(formData.get('whatsapp') ?? formData.get('smsPhone')),
      email:       sanitiseShort(formData.get('email')),
      country:     sanitiseShort(formData.get('country') ?? formData.get('passportCountry')),
      dob:         sanitiseShort(formData.get('dob')),
      taxYear:     '',
      address:     sanitiseField(formData.get('address') ?? formData.get('auAddress')),
      tfn:         sanitiseShort(formData.get('tfn')),
      bankDetails: sanitiseField(formData.get('bankDetails')),
      primaryJob:  sanitiseField(formData.get('business')),
      marital:     sanitiseShort(formData.get('marital')),
      taxStatus:   'Working Holiday Maker',
      howHeard:    sanitiseShort(formData.get('howHeard')),
      auPhone:     sanitiseShort(formData.get('auPhone')),
      submittedAt: new Date().toISOString(),
      notes:       [
        formData.get('passport') ? `Passport No: ${sanitiseShort(formData.get('passport'))}` : '',
        formData.get('gender') ? `Gender: ${sanitiseShort(formData.get('gender'))}` : '',
        formData.get('declared')     ? `→ ${sanitiseField(formData.get('declared'))}` : '',
        formData.get('terms')        ? `→ ${sanitiseField(formData.get('terms'))}` : '',
      ].filter(Boolean).join(' | '),
      fileUrls,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tfn-form] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

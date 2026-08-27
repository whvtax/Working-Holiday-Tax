export const runtime = 'nodejs'
// This route receives uploaded file bytes (passport, bank statements) and then
// writes them to storage. On the platform default a slow upload is cut off
// mid-request and the customer's submission is lost with no error they can act
// on. 60s matches the tick route.
export const maxDuration = 60
import { NextRequest, NextResponse } from 'next/server'
import { createTask, findExistingClient } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { uploadFiles } from '@/lib/upload'
import { getClientIp } from '@/lib/get-ip'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'
import { validateIntake } from '@/lib/intake-validate'
import crypto from 'crypto'
import { notifyFormReceived } from '@/lib/will/form-link'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (await isRateLimited(ip, 'super-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData  = await req.formData()
    const email     = sanitiseShort(formData.get('email'))
    const whatsapp  = sanitiseShort(formData.get('whatsapp') ?? formData.get('smsPhone'))
    const fullName  = [sanitiseShort(formData.get('firstName')), sanitiseShort(formData.get('lastName'))].filter(Boolean).join(' ')

    // Minimal server-side guard: a lead without a name, email or phone is
    // unactionable - reject it instead of creating an empty CRM task.
    if (!fullName || !email || !whatsapp) {
      return NextResponse.json({ ok: false, error: 'missing_required_fields' }, { status: 400 })
    }

    // Format validation, server-side (see lib/intake-validate.ts). The shared
    // validators used to be imported by client components only, so a direct
    // POST could write any string into any field.
    const issues = validateIntake({
      email,
      whatsapp,
      tfn: sanitiseShort(formData.get('tfn')),
      dob: sanitiseShort(formData.get('dob')),
      // These routes write `marital` straight to the DB, so it has to be
      // validated here too. taxStatus is server-hardcoded on this route.
      marital: sanitiseShort(formData.get('marital')),
    })
    if (issues.length) {
      return NextResponse.json({ ok: false, error: 'invalid_fields', fields: issues }, { status: 400 })
    }
    const existing  = await findExistingClient(email, whatsapp)
    const isReturning = !!existing
    const clientId  = existing?.id ?? `CLT-${crypto.randomUUID()}`

    const rawSelfie = formData.get('selfiePassport')
    const selfieFile = rawSelfie instanceof File ? rawSelfie : null
    let fileUrls: string[]
    try {
      fileUrls = await uploadFiles([selfieFile], `super-form/${clientId}`)
    } catch (uploadErr) {
      const msg = uploadErr instanceof Error ? uploadErr.message : 'Upload error'
      return NextResponse.json({ ok: false, error: 'invalid_file', message: msg }, { status: 400 })
    }

    const task = await createTask({
      clientId,
      clientName:  fullName,
      taskType:    'super',
      whatsapp,
      email,
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
        isReturning ? '🔄 Returning client' : '',
        formData.get('passport') ? `Passport No: ${sanitiseShort(formData.get('passport'))}` : '',
        formData.get('superFundName') ? `Super Fund Name: ${sanitiseShort(formData.get('superFundName'))}` : '',
        formData.get('superMemberNumber') ? `Super Member Number: ${sanitiseShort(formData.get('superMemberNumber'))}` : '',
        formData.get('superOpeningDate') ? `Super Opening Date: ${sanitiseShort(formData.get('superOpeningDate'))}` : '',
        formData.get('homeAddress') ? `Home Country Address: ${sanitiseField(formData.get('homeAddress'))}` : '',
        formData.get('declared')     ? `→ ${sanitiseField(formData.get('declared'))}` : '',
      ].filter(Boolean).join(' | '),
      fileUrls,
      reviewStatus: 'pending',
      reviewerNote: '',
      reviewedAt:   '',
    })


        // Tell Will the questionnaire arrived: this marks the form complete, STOPS
    // the form reminders (otherwise it keeps chasing someone who already filled
    // it in) and sends the confirmation in their language. Best effort by
    // design: the form submission must never fail because the CRM link did.
    await notifyFormReceived(whatsapp, email)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[super-form] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

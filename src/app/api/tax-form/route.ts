// src/app/api/tax-form/route.ts
// SECURITY FIXES:
//   - isRateLimited() is now async (Redis-backed global rate limiting)
//   - isValidPhone() called for waNumber and auPhone
//   - isValidTfn() called for TFN field
//   - clientId uses crypto.randomUUID() not Date.now()
import { NextRequest, NextResponse } from 'next/server'
import { createTask } from '@/lib/db'
import {
  isRateLimited, isHoneypotFilled, isValidEmail, isValidDate,
  isValidPhone, isValidTfn, getField, validateUploadedFile,
} from '@/lib/form-protection'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  if (await isRateLimited(req)) {
    return NextResponse.json({ ok: false, message: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const ct = req.headers.get('content-type') ?? ''
  if (!ct.includes('multipart/form-data') && !ct.includes('application/x-www-form-urlencoded')) {
    return NextResponse.json({ ok: false, message: 'Invalid request format.' }, { status: 400 })
  }

  try {
    const formData = await req.formData()

    if (isHoneypotFilled(formData)) {
      return NextResponse.json({ ok: true })
    }

    const fullName    = getField(formData, 'fullName',    150)
    const waNumber    = getField(formData, 'waNumber',     30)
    const auPhone     = getField(formData, 'auPhone',      30)
    const email       = getField(formData, 'email',       254)
    const address     = getField(formData, 'address',     300)
    const country     = getField(formData, 'country',     100)
    const dob         = getField(formData, 'dob',          10)
    const marital     = getField(formData, 'marital',      20)
    const tfn         = getField(formData, 'tfn',          15)
    const primaryJob  = getField(formData, 'primaryJob',  200)
    const bankDetails = getField(formData, 'bankDetails', 200)
    const taxStatus   = getField(formData, 'taxStatus',    50)
    const taxYear     = getField(formData, 'taxYear',      10)
    const howHeard    = getField(formData, 'howHeard',    100)

    const missing: string[] = []
    if (!fullName)    missing.push('fullName')
    if (!waNumber)    missing.push('waNumber')
    if (!email)       missing.push('email')
    if (!country)     missing.push('country')
    if (!dob)         missing.push('dob')
    if (!marital)     missing.push('marital')
    if (!tfn)         missing.push('tfn')
    if (!primaryJob)  missing.push('primaryJob')
    if (!bankDetails) missing.push('bankDetails')
    if (!taxStatus)   missing.push('taxStatus')

    if (missing.length) {
      return NextResponse.json({ ok: false, message: 'Missing required fields.', fields: missing }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, message: 'Invalid email address.' }, { status: 400 })
    }
    if (!isValidDate(dob)) {
      return NextResponse.json({ ok: false, message: 'Invalid date of birth.' }, { status: 400 })
    }
    if (!isValidPhone(waNumber)) {
      return NextResponse.json({ ok: false, message: 'Invalid WhatsApp number.' }, { status: 400 })
    }
    if (auPhone && !isValidPhone(auPhone)) {
      return NextResponse.json({ ok: false, message: 'Invalid Australian phone number.' }, { status: 400 })
    }
    if (!isValidTfn(tfn)) {
      return NextResponse.json({ ok: false, message: 'Invalid TFN format. Use NNN NNN NNN.' }, { status: 400 })
    }

    const fileFields: Array<[string, boolean]> = [
      ['bankStatement',  true],
      ['selfiePassport', true],
      ['invoices',       false],
    ]
    for (const [fieldName, required] of fileFields) {
      const file = formData.get(fieldName)
      if (file instanceof File && file.size > 0) {
        const result = await validateUploadedFile(file)
        if (!result.ok) {
          return NextResponse.json({ ok: false, message: `${fieldName}: ${result.reason}` }, { status: 400 })
        }
      } else if (required) {
        return NextResponse.json({ ok: false, message: `Missing required file: ${fieldName}` }, { status: 400 })
      }
    }

    await createTask({
      clientId:    `CLT-${crypto.randomUUID()}`,  // UUID not timestamp
      clientName:  fullName,
      taskType:    'tax-return',
      whatsapp:    waNumber,
      auPhone,
      email,
      country,
      dob,
      taxYear:     taxYear || '2024-25',
      address,
      tfn,
      bankDetails,
      primaryJob,
      marital,
      taxStatus,
      howHeard,
      submittedAt: new Date().toISOString(),
      notes: '',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tax-form]', err)
    return NextResponse.json({ ok: false, message: 'Server error.' }, { status: 500 })
  }
}

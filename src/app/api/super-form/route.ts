import { NextRequest, NextResponse } from 'next/server'
import { createTask } from '@/lib/db'
import {
  isRateLimited, isHoneypotFilled, isValidEmail, isValidDate,
  isValidPhone, isValidTfn, getField, validateUploadedFile, sanitizeString,
} from '@/lib/form-protection'
import { uploadTaskFiles } from '@/lib/blob-upload'
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
    if (isHoneypotFilled(formData)) return NextResponse.json({ ok: true })

    const firstName  = getField(formData, 'firstName',  80)
    const lastName   = getField(formData, 'lastName',   80)
    const fullName   = [firstName, lastName].filter(Boolean).join(' ')
    const whatsapp   = getField(formData, 'whatsapp',   30) || getField(formData, 'smsPhone', 30)
    const auPhone    = getField(formData, 'auPhone',     30)
    const email      = getField(formData, 'email',      254)
    const country    = getField(formData, 'country',    100) || getField(formData, 'passportCountry', 100)
    const dob        = getField(formData, 'dob',         10)
    const address    = getField(formData, 'address',    300) || getField(formData, 'auAddress', 300)
    const tfn        = getField(formData, 'tfn',         15)
    const marital    = getField(formData, 'marital',     20)
    const superFunds = sanitizeString(getField(formData, 'superFunds', 500), 500)

    const missing: string[] = []
    if (!firstName) missing.push('firstName')
    if (!lastName)  missing.push('lastName')
    if (!email)     missing.push('email')
    if (!country)   missing.push('country')
    if (!dob)       missing.push('dob')
    if (missing.length) return NextResponse.json({ ok: false, message: 'Missing required fields.', fields: missing }, { status: 400 })

    if (!isValidEmail(email))               return NextResponse.json({ ok: false, message: 'Invalid email address.' }, { status: 400 })
    if (!isValidDate(dob))                  return NextResponse.json({ ok: false, message: 'Invalid date of birth.' }, { status: 400 })
    if (whatsapp && !isValidPhone(whatsapp)) return NextResponse.json({ ok: false, message: 'Invalid phone number.' }, { status: 400 })
    if (auPhone  && !isValidPhone(auPhone))  return NextResponse.json({ ok: false, message: 'Invalid Australian phone number.' }, { status: 400 })
    if (tfn && !isValidTfn(tfn))             return NextResponse.json({ ok: false, message: 'Invalid TFN format.' }, { status: 400 })

    const selfieFile = formData.get('selfiePassport')
    if (!(selfieFile instanceof File) || selfieFile.size === 0) {
      return NextResponse.json({ ok: false, message: 'Missing required file: selfiePassport' }, { status: 400 })
    }
    const result = await validateUploadedFile(selfieFile)
    if (!result.ok) return NextResponse.json({ ok: false, message: `selfiePassport: ${result.reason}` }, { status: 400 })

    const clientId = `CLT-${crypto.randomUUID()}`
    await createTask({
      clientId, clientName: fullName, taskType: 'super',
      whatsapp, auPhone, email, country, dob,
      taxYear: '', address, tfn, bankDetails: '',
      primaryJob: '', marital, taxStatus: 'Working Holiday Maker', howHeard: '',
      submittedAt: new Date().toISOString(), notes: superFunds,
    })

    await uploadTaskFiles(clientId, [{ file: selfieFile, label: 'Passport / Selfie' }])

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[super-form]', err)
    return NextResponse.json({ ok: false, message: 'Server error.' }, { status: 500 })
  }
}

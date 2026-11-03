export const runtime = 'nodejs'
// This route receives uploaded file bytes (passport, bank statements) and then
// writes them to storage. On the platform default a slow upload is cut off
// mid-request and the customer's submission is lost with no error they can act
// on. 60s matches the tick route.
export const maxDuration = 60
import { NextRequest, NextResponse } from 'next/server'
import { createTask, findExistingClient } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { uploadFiles, UploadValidationError } from '@/lib/upload'
import { getRateLimitIp } from '@/lib/get-ip'
import { crossSiteFormReason } from '@/lib/public-form-guard'
import { sanitiseField, sanitiseShort, sanitiseNote, sanitiseNoteShort } from '@/lib/sanitise'
import { validateIntake } from '@/lib/intake-validate'
import crypto from 'crypto'
import { notifyFormReceived } from '@/lib/will/form-link'
import { safeErr } from '@/lib/log-safe'

export async function POST(req: NextRequest) {
  try {
    const ip = getRateLimitIp(req)
    // A page on another site must not be able to spend a visitor's rate-limit budget or
    // spread submissions across visitors' IPs (lib/public-form-guard.ts).
    if (crossSiteFormReason(req)) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 })
    // R2-6 (sec2-cron-abuse): was 5 per IP per 15 minutes, which a hostel or farm
    // bunkhouse behind one IP trips on its sixth applicant (the tax form hit the
    // same wall and was fixed on 5 Sep). The per-IP ceiling is raised to 30 and
    // the strict 5-per-15-minutes limit now applies per person, keyed on a hash.
    if (await isRateLimited(ip, 'tfn-form-ip', 30)) {
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
    // The key carries a hash of the person, never their phone number or email
    // (the key is stored in Redis, a third party).
    const person = crypto.createHash('sha256').update(whatsapp.replace(/\D/g, '') || email.toLowerCase()).digest('hex').slice(0, 24)
    if (await isRateLimited(`${ip}:${person}`, 'tfn-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
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
      fileUrls = await uploadFiles([selfieFile], `tfn-form/${clientId}`)
    } catch (uploadErr) {
      // Only a rejection the customer can act on (type, size, not a real image)
      // is echoed back. Storage errors and the bucket-privacy guard carry
      // internal detail (bucket state, provider messages) and stay in the log.
      if (uploadErr instanceof UploadValidationError) {
        return NextResponse.json({ ok: false, error: 'invalid_file', message: uploadErr.message }, { status: 400 })
      }
      console.error('[tfn-form] upload failed:', safeErr(uploadErr))
      return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
    }

    await createTask({
      clientId,
      clientName:  fullName,
      taskType:    'tfn',
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
        formData.get('passport') ? `Passport No: ${sanitiseNoteShort(formData.get('passport'))}` : '',
        formData.get('gender') ? `Gender: ${sanitiseNoteShort(formData.get('gender'))}` : '',
        formData.get('declared')     ? `→ ${sanitiseNote(formData.get('declared'))}` : '',
        formData.get('terms')        ? `→ ${sanitiseNote(formData.get('terms'))}` : '',
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
    await notifyFormReceived(whatsapp, email, 'tfn')

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tfn-form] FAILED:', safeErr(err))
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

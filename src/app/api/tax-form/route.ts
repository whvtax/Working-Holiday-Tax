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
    if (await isRateLimited(ip, 'tax-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData  = await req.formData()
    const clientId  = `CLT-${crypto.randomUUID()}`

    // Upload files to Vercel Blob (bank statement + selfie + invoices x10)
    const bankStatementFile  = formData.get('bankStatement')  as File | null
    const selfiePassportFile = formData.get('selfiePassport') as File | null
    const invoiceFiles: (File | null)[] = []
    for (let i = 0; i < 10; i++) {
      const f = formData.get(`invoices_${i}`) as File | null
      if (f && f.size > 0) invoiceFiles.push(f)
      else break
    }

    let fileUrls: string[]
    try {
      fileUrls = await uploadFiles(
        [bankStatementFile, selfiePassportFile, ...invoiceFiles],
        `tax-form/${clientId}`
      )
    } catch (uploadErr) {
      const msg = uploadErr instanceof Error ? uploadErr.message : 'Upload error'
      // If the error is a file content/type validation failure — reject the submission
      if (msg.includes('not allowed') || msg.includes('dangerous') || msg.includes('does not match') || msg.includes('too large')) {
        return NextResponse.json({ ok: false, error: 'invalid_file', message: msg }, { status: 400 })
      }
      // If Blob storage isn't configured (missing token, network issue) — continue without files
      // so the form submission doesn't fail entirely
      console.warn('[tax-form] File upload failed, continuing without files:', msg)
      fileUrls = []
    }

    await createTask({
      clientId,
      clientName:  sanitiseShort(formData.get('fullName')),
      taskType:    'tax-return',
      whatsapp:    sanitiseShort(formData.get('waNumber')),
      auPhone:     sanitiseShort(formData.get('auPhone')),
      email:       sanitiseShort(formData.get('email')),
      country:     sanitiseShort(formData.get('country')),
      dob:         sanitiseShort(formData.get('dob')),
      taxYear:     sanitiseShort(formData.get('taxYear')) || '2024-25',
      address:     sanitiseField(formData.get('address')),
      tfn:         sanitiseShort(formData.get('tfn')),
      bankDetails: sanitiseField(formData.get('bankDetails')),
      primaryJob:  sanitiseField(formData.get('primaryJob')),
      marital:     sanitiseShort(formData.get('marital')),
      taxStatus:   sanitiseShort(formData.get('taxStatus')),
      howHeard:    sanitiseShort(formData.get('howHeard')),
      submittedAt: new Date().toISOString(),
      notes:       [
        formData.get('taxStatusText') ? sanitiseField(formData.get('taxStatusText')) : '',
        formData.get('taxStatus')     ? `→ ${sanitiseField(formData.get('taxStatus'))}` : '',
        formData.get('declaredText')  ? sanitiseField(formData.get('declaredText')) : '',
        formData.get('declared')      ? `→ ${sanitiseField(formData.get('declared'))}` : '',
      ].filter(Boolean).join(' | '),
      fileUrls,
    })

    console.log('New tax-form task created | files:', fileUrls.length)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tax-form] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

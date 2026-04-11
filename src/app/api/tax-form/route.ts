export const maxDuration = 60
export const dynamic = 'force-dynamic'
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

    const bankStatementFile  = formData.get('bankStatement')  as File | null
    const selfiePassportFile = formData.get('selfiePassport') as File | null

    // Accept pre-uploaded invoice URLs (client-side upload) OR fallback files
    const preUploadedUrls: string[] = (() => {
      try { return JSON.parse(formData.get('invoiceUrls') as string || '[]') } catch { return [] }
    })().filter((u: unknown): u is string => typeof u === 'string' && u.startsWith('https://'))

    const fallbackInvoices: (File | null)[] = []
    if (preUploadedUrls.length === 0) {
      for (let i = 0; i < 10; i++) {
        const f = formData.get(`invoices_${i}`) as File | null
        if (f && f.size > 0) fallbackInvoices.push(f)
        else break
      }
    }

    let fileUrls: string[]
    try {
      const serverUrls = await uploadFiles(
        [bankStatementFile, selfiePassportFile, ...fallbackInvoices],
        `tax-form/${clientId}`
      )
      fileUrls = [...serverUrls, ...preUploadedUrls]
    } catch (uploadErr) {
      const msg = uploadErr instanceof Error ? uploadErr.message : 'Upload error'
      return NextResponse.json({ ok: false, error: 'invalid_file', message: msg }, { status: 400 })
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
      notes:       (() => {
        const hasAbn = sanitiseShort(formData.get('hasAbn')) || ''
        const abnNumber = sanitiseShort(formData.get('abnNumber')) || ''
        const abnIncome = sanitiseShort(formData.get('abnIncome')) || ''
        return [
          formData.get('taxStatusText') ? sanitiseField(formData.get('taxStatusText')) : '',
          formData.get('taxStatus')     ? `→ ${sanitiseField(formData.get('taxStatus'))}` : '',
          formData.get('declaredText')  ? sanitiseField(formData.get('declaredText')) : '',
          formData.get('declared')      ? `→ ${sanitiseField(formData.get('declared'))}` : '',
          formData.get('declaredIncome') ? sanitiseField(formData.get('declaredIncome')) : '',
          hasAbn ? `ABN: ${hasAbn}` : '',
          hasAbn === 'Yes' && abnNumber ? `ABN Number: ${abnNumber}` : '',
          hasAbn === 'Yes' && abnIncome ? `ABN Income: ${abnIncome}` : '',
        ].filter(Boolean).join(' | ')
      })(),
      fileUrls,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tax-form] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

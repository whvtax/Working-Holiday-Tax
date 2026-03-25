import { NextRequest, NextResponse } from 'next/server'
import { createTask } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { uploadFiles } from '@/lib/upload'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    if (await isRateLimited(ip, 'tax-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData  = await req.formData()
    const clientId  = `CLT-${crypto.randomUUID()}`
    const fullName  = formData.get('fullName')  as string ?? ''

    // Upload files to Vercel Blob (bank statement + selfie + invoices x15)
    const bankStatementFile  = formData.get('bankStatement')  as File | null
    const selfiePassportFile = formData.get('selfiePassport') as File | null
    // Collect all invoice files (invoices_0, invoices_1, ...)
    const invoiceFiles: (File | null)[] = []
    for (let i = 0; i < 15; i++) {
      const f = formData.get(`invoices_${i}`) as File | null
      if (f && f.size > 0) invoiceFiles.push(f)
      else break
    }
    const fileUrls = await uploadFiles(
      [bankStatementFile, selfiePassportFile, ...invoiceFiles],
      `tax-form/${clientId}`
    )

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
      fileUrls,
    })

    console.log('New task created for:', fullName, '| files:', fileUrls.length)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tax-form]', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

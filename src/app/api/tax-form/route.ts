export const maxDuration = 60
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createTask, findExistingClient } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'
import { isValidSupabaseStorageUrl } from '@/lib/supabase'
import crypto from 'crypto'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (await isRateLimited(ip, 'tax-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData  = await req.formData()
    const email     = sanitiseShort(formData.get('email'))
    const whatsapp  = sanitiseShort(formData.get('waNumber'))
    const existing  = await findExistingClient(email, whatsapp)
    const isReturning = !!existing
    const clientId  = existing?.id ?? `CLT-${crypto.randomUUID()}`

    // All files are pre-uploaded client-side; server receives URLs only
    // SECURITY: only accept URLs from our Supabase Storage (prevent SSRF/tracking)
    const allFileUrls: string[] = (() => {
      try { return JSON.parse(formData.get('invoiceUrls') as string || '[]') } catch { return [] }
    })().filter(isValidSupabaseStorageUrl)

    const fileUrls: string[] = allFileUrls

    await createTask({
      clientId,
      clientName:  sanitiseShort(formData.get('fullName')),
      taskType:    'tax-return',
      whatsapp,
      auPhone:     sanitiseShort(formData.get('auPhone')),
      email,
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
        isReturning ? '🔄 Returning client' : '',
        formData.get('taxStatus')     ? `→ ${sanitiseField(formData.get('taxStatus'))}` : '',
        formData.get('declared')      ? `→ ${sanitiseField(formData.get('declared'))}` : '',
        formData.get('declaredIncome') ? `→ ${sanitiseField(formData.get('declaredIncome'))}` : '',
        formData.get('hasAbn') ? `ABN: ${sanitiseShort(formData.get('hasAbn'))}` : '',
        formData.get('abnNumber') ? `ABN Number: ${sanitiseShort(formData.get('abnNumber'))}` : '',
        formData.get('abnIncome') ? `ABN Income: ${sanitiseShort(formData.get('abnIncome'))}` : '',
        formData.get('abnWork')   ? `ABN Work: ${sanitiseShort(formData.get('abnWork'))}`   : '',
        formData.get('hasExpenses') ? `Expenses: ${sanitiseShort(formData.get('hasExpenses'))}` : '',
        (()=>{
          const raw = formData.get('invoiceDetails')
          if (!raw || typeof raw !== 'string') return ''
          try {
            const arr = JSON.parse(raw) as Array<{type:string;amount:string;description:string;url?:string}>
            if (!Array.isArray(arr) || arr.length === 0) return ''
            const tfn = arr.filter(i => i.type === 'tfn')
            const abn = arr.filter(i => i.type === 'abn')
            const parts = []
            if (tfn.length > 0) {
              const total = tfn.reduce((s,i)=>s+(parseFloat(i.amount)||0),0)
              parts.push(`💼 TFN Invoices (${tfn.length}): $${total.toFixed(2)} — ${tfn.map(i=>`$${i.amount} ${sanitiseShort(i.description)}`).join('; ')}`)
            }
            if (abn.length > 0) {
              const total = abn.reduce((s,i)=>s+(parseFloat(i.amount)||0),0)
              parts.push(`🏢 ABN Invoices (${abn.length}): $${total.toFixed(2)} — ${abn.map(i=>`$${i.amount} ${sanitiseShort(i.description)}`).join('; ')}`)
            }
            return parts.join(' | ')
          } catch { return '' }
        })(),
      ].filter(Boolean).join(' | '),
      fileUrls,
      reviewStatus: 'pending',
      reviewerNote: '',
      reviewedAt:   '',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tax-form] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

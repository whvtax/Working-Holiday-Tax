export const maxDuration = 60
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createTask, findExistingClient } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'
import { uploadFiles } from '@/lib/upload'
import crypto from 'crypto'

type ExpenseMeta = { description: string; amount: string; fileCount: number; index: number }

function formatExpenses(items: ExpenseMeta[], fileUrlMap: Record<string, string[]>, prefix: string): string {
  const valid = items.filter(e => e.description?.trim() || e.amount?.trim())
  if (!valid.length) return ''
  return valid.map((e, i) => {
    const urls = fileUrlMap[e.index] || []
    return `${prefix} Item ${i+1}: ${e.description?.trim() || '—'} · $${e.amount?.trim() || '0'} AUD · ${urls.length} file(s)`
  }).join(' ;; ')
}

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
    const clientId  = existing?.id ?? `CLT-${crypto.randomUUID()}`

    // Parse expense metadata
    const abnExpenseMeta: ExpenseMeta[] = (() => { try { return JSON.parse(formData.get('abnExpenses') as string || '[]') } catch { return [] } })()
    const tfnExpenseMeta: ExpenseMeta[] = (() => { try { return JSON.parse(formData.get('tfnExpenses') as string || '[]') } catch { return [] } })()

    // Upload expense files server-side (same path as selfie in other forms)
    const uploadExpenseGroup = async (meta: ExpenseMeta[], prefix: string) => {
      const urlMap: Record<string, string[]> = {}
      await Promise.all(meta.map(async (e) => {
        const files: File[] = []
        for (let fi = 0; fi < (e.fileCount || 0); fi++) {
          const f = formData.get(`${prefix}File_${e.index}_${fi}`)
          if (f instanceof File && f.size > 0) files.push(f)
        }
        if (files.length > 0) {
          urlMap[e.index] = await uploadFiles(files, `tax-form/${clientId}/${prefix}-expenses`)
        } else {
          urlMap[e.index] = []
        }
      }))
      return urlMap
    }

    const [abnUrlMap, tfnUrlMap] = await Promise.all([
      uploadExpenseGroup(abnExpenseMeta, 'abn'),
      uploadExpenseGroup(tfnExpenseMeta, 'tfn'),
    ])

    const abnExpensesNote = formatExpenses(abnExpenseMeta, abnUrlMap, 'ABN Expense')
    const tfnExpensesNote = formatExpenses(tfnExpenseMeta, tfnUrlMap, 'TFN Expense')

    // Collect all expense file URLs
    const expenseFileUrls = [
      ...Object.values(abnUrlMap).flat(),
      ...Object.values(tfnUrlMap).flat(),
    ]

    // Core file URLs passed from client-side pre-upload
    const coreFileUrls: string[] = (() => { try { return JSON.parse(formData.get('invoiceUrls') as string || '[]') } catch { return [] } })()
    const fileUrls = [...coreFileUrls, ...expenseFileUrls]

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
        formData.get('taxStatus')      ? `→ ${sanitiseField(formData.get('taxStatus'))}` : '',
        formData.get('declared')       ? `→ ${sanitiseField(formData.get('declared'))}` : '',
        formData.get('declaredIncome') ? `→ ${sanitiseField(formData.get('declaredIncome'))}` : '',
        formData.get('hasAbn') ? `ABN: ${sanitiseShort(formData.get('hasAbn'))}` : '',
        formData.get('abnNumber')   ? `ABN Number: ${sanitiseShort(formData.get('abnNumber'))}` : '',
        formData.get('abnIncome')   ? `ABN Income: ${sanitiseShort(formData.get('abnIncome'))}` : '',
        formData.get('abnWorkType') ? `ABN Work Type: ${sanitiseShort(formData.get('abnWorkType'))}` : '',
        abnExpensesNote ? `ABN Expenses: ${abnExpensesNote}` : '',
        tfnExpensesNote ? `TFN Expenses: ${tfnExpensesNote}` : '',
      ].filter(Boolean).join(' | '),
      fileUrls,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[tax-form] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

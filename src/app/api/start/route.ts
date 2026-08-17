export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createTask, findExistingClient, getCurrentTaxYear } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import { sanitiseShort } from '@/lib/sanitise'
import { isValidSupabaseStorageUrl } from '@/lib/supabase'
import { findTaskByTfn, normaliseTfn, LEAD_TASK_TYPE } from '@/lib/intake'
import crypto from 'crypto'

/**
 * POST /api/start - form 1.
 *
 * Creates a task holding only what form 1 collects. It's marked task_type
 * 'lead' so it can't be confused with a completed return: once form 2 lands
 * (see /api/complete), the same row is promoted to 'tax-return' and looks
 * exactly like a submission from the original form.
 *
 * The tax year isn't asked for any more - it's set here from the current date,
 * so the CRM and the form download keep showing it exactly as before.
 *
 * This route is entirely separate from /api/tax-form, which is unchanged.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    // Its own bucket: a burst on /start must not lock anyone out of the
    // original /tax-form, which partners still link to.
    if (await isRateLimited(ip, 'start-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    const formData = await req.formData()
    const whatsapp = sanitiseShort(formData.get('waNumber'))
    const fullName = sanitiseShort(formData.get('fullName'))
    const tfn      = sanitiseShort(formData.get('tfn'))

    // A lead with no name, no phone and no TFN is unactionable.
    if (!fullName || !whatsapp || !tfn) {
      return NextResponse.json({ ok: false, error: 'missing_required_fields' }, { status: 400 })
    }

    // Form 1 has no email field, so the returning-client check runs on the
    // WhatsApp number alone.
    const existing = await findExistingClient('', whatsapp)
    const isReturning = !!existing
    const clientId = existing?.id ?? `CLT-${crypto.randomUUID()}`

    const fileUrls: string[] = (() => {
      const raw = formData.get('fileUrls')
      if (typeof raw !== 'string') return []
      try {
        const parsed: unknown = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed.slice(0, 10).filter((u): u is string => typeof u === 'string')
      } catch { return []; }
    })().filter(isValidSupabaseStorageUrl)

    const duplicateOf = await findTaskByTfn(tfn)

    // Reuse the CRM's own helper rather than recomputing: it works in
    // Australia/Sydney, and a UTC version would put leads created on the
    // morning of 1 July into the previous tax year.
    const now = new Date()
    const taxYear = getCurrentTaxYear()

    const lang = sanitiseShort(formData.get('lang'))

    const task = await createTask({
      clientId,
      clientName:  fullName,
      taskType:    LEAD_TASK_TYPE,
      whatsapp,
      auPhone:     '',
      email:       '',
      country:     sanitiseShort(formData.get('country')),
      dob:         sanitiseShort(formData.get('dob')),
      taxYear,
      address:     '',
      tfn,
      bankDetails: '',
      primaryJob:  '',
      marital:     '',
      taxStatus:   '',
      howHeard:    '',
      refCode:     sanitiseShort(formData.get('refCode')),
      submittedAt: now.toISOString(),
      notes: [
        isReturning ? '🔄 Returning client' : '',
        duplicateOf ? `⚠️ Possible duplicate of ${duplicateOf}` : '',
        formData.get('hasMedicare') ? `Medicare: ${sanitiseShort(formData.get('hasMedicare'))}` : '',
        formData.get('hasExpenses') ? `Expenses: ${sanitiseShort(formData.get('hasExpenses'))}` : '',
        ['en', 'de', 'ja'].includes(lang) ? `Lang: ${lang}` : '',
      ].filter(Boolean).join(' | '),
      fileUrls,
      reviewStatus: 'pending',
      reviewerNote: '',
      reviewedAt:   '',
    })

    // Written after insert: createTask() doesn't know about these columns, and
    // teaching it would mean touching a file the original form also uses.
    try {
      const { getSupabase } = await import('@/lib/supabase')
      await getSupabase()
        .from('crm_tasks')
        .update({ source: 'start', possible_duplicate_of: duplicateOf, tfn_norm: normaliseTfn(tfn) })
        .eq('id', task.id)
    } catch (metaErr) {
      // The lead is already saved; losing the source tag must not fail it.
      console.error('[start] meta update failed:', metaErr)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[start] FAILED:', err)
    return NextResponse.json({ ok: false, error: 'submission_failed' }, { status: 500 })
  }
}

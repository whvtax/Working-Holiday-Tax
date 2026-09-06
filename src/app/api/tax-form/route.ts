export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createTask, findExistingClient } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { getClientIp } from '@/lib/get-ip'
import { sanitiseField, sanitiseShort } from '@/lib/sanitise'
import { validateIntake, safeAmount } from '@/lib/intake-validate'
import { isValidSupabaseStorageUrl } from '@/lib/supabase'
import { normalisePhone } from '@/lib/leads'
import crypto from 'crypto'
import { notifyFormReceived } from '@/lib/will/form-link'

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)

    const formData  = await req.formData()
    const email     = sanitiseShort(formData.get('email'))
    const whatsapp  = sanitiseShort(formData.get('waNumber'))
    const fullName  = sanitiseShort(formData.get('fullName'))

    // Minimal server-side guard: a lead without a name, email or phone is
    // unactionable - reject it instead of creating an empty CRM task.
    if (!fullName || !email || !whatsapp) {
      return NextResponse.json({ ok: false, error: 'missing_required_fields' }, { status: 400 })
    }

    // Keyed on IP + person, not IP alone (audit, 5 Sep). A hostel or farm
    // bunkhouse shares one IP behind carrier-grade NAT, so a room full of
    // customers filling this in one after another used to trip the same
    // 5-per-15-minute limit meant for one abuser - the sixth person's
    // submit failed with "too many requests" right after their upload
    // succeeded, and the only report that reached Jo was "the form is
    // broken". The per-IP ceiling is kept, just raised in line with the
    // upload route's own limit, so a single abuser is still capped.
    const person = normalisePhone(whatsapp) || email
    if (await isRateLimited(`${ip}:${person}`, 'tax-form')) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }
    if (await isRateLimited(ip, 'tax-form-ip', 30)) {
      return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })
    }

    // Format validation, server-side. The shared validators were previously
    // imported only by client components, so a direct POST could write any
    // string into any field. Rejects clearly-wrong values, never rewrites them.
    const issues = validateIntake({
      email,
      whatsapp,
      tfn: sanitiseShort(formData.get('tfn')),
      dob: sanitiseShort(formData.get('dob')),
      taxYear: sanitiseShort(formData.get('taxYear')),
      marital: sanitiseShort(formData.get('marital')),
      taxStatus: sanitiseShort(formData.get('taxStatus')),
    })
    if (issues.length) {
      return NextResponse.json({ ok: false, error: 'invalid_fields', fields: issues }, { status: 400 })
    }

    const existing  = await findExistingClient(email, whatsapp)
    const isReturning = !!existing
    const clientId  = existing?.id ?? `CLT-${crypto.randomUUID()}`

    // All files are pre-uploaded client-side; server receives URLs only
    // SECURITY: only accept URLs from our Supabase Storage (prevent SSRF/tracking)
    // Hard cap at 50 items so a malicious client can't ship a giant JSON array.
    const fileUrls: string[] = (() => {
      const raw = formData.get('invoiceUrls')
      if (typeof raw !== 'string') return []
      try {
        const parsed: unknown = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed.slice(0, 50).filter((u): u is string => typeof u === 'string')
      } catch { return [] }
    })().filter(isValidSupabaseStorageUrl)

    await createTask({
      clientId,
      clientName:  fullName,
      taskType:    'tax-return',
      whatsapp,
      auPhone:     sanitiseShort(formData.get('auPhone')),
      email,
      country:     sanitiseShort(formData.get('country')),
      dob:         sanitiseShort(formData.get('dob')),
      taxYear:     sanitiseShort(formData.get('taxYear')),
      address:     sanitiseField(formData.get('address')),
      tfn:         sanitiseShort(formData.get('tfn')),
      bankDetails: sanitiseField(formData.get('bankDetails')),
      primaryJob:  sanitiseField(formData.get('primaryJob')),
      marital:     sanitiseShort(formData.get('marital')),
      taxStatus:   sanitiseShort(formData.get('taxStatus')),
      howHeard:    sanitiseShort(formData.get('howHeard')),
      refCode:     sanitiseShort(formData.get('refCode')),
      submittedAt: new Date().toISOString(),
      notes:       [
        isReturning ? '🔄 Returning client' : '',
        formData.get('taxStatus')     ? `→ ${sanitiseField(formData.get('taxStatus'))}` : '',
        formData.get('declared')      ? `→ ${sanitiseField(formData.get('declared'))}` : '',
        formData.get('hasMedicare') ? `Medicare: ${sanitiseShort(formData.get('hasMedicare'))}` : '',
        formData.get('hasExpenses') ? `Expenses: ${sanitiseShort(formData.get('hasExpenses'))}` : '',
        // Receipts the client chose but that did not reach storage. Named, so
        // the missing one can simply be asked for on WhatsApp instead of the
        // whole submission having been thrown away for it (Jo, 28 Aug).
        (() => {
          const raw = formData.get('invoiceFailures')
          if (typeof raw !== 'string') return ''
          try {
            const parsed: unknown = JSON.parse(raw)
            if (!Array.isArray(parsed)) return ''
            const names = parsed.slice(0, 10)
              .filter((n): n is string => typeof n === 'string')
              .map((n) => sanitiseShort(n))
              .filter(Boolean)
            if (!names.length) return ''
            return `⚠️ ${names.length} receipt${names.length === 1 ? '' : 's'} did NOT upload, ask for ${names.length === 1 ? 'it' : 'them'}: ${names.join(', ')}`
          } catch { return '' }
        })(),
        (()=>{
          const raw = formData.get('invoiceDetails')
          if (!raw || typeof raw !== 'string') return ''
          try {
            const parsed = JSON.parse(raw)
            if (!Array.isArray(parsed)) return ''
            // Hard cap: max 10 TFN + 10 ABN = 20 invoices (UI enforces this; server
            // also caps so a malicious client can't ship a giant payload).
            const arr = parsed.slice(0, 25) as Array<{type:string;amount:string;description:string;url?:string}>
            if (arr.length === 0) return ''
            const tfn = arr.filter(i => i.type === 'tfn')
            const abn = arr.filter(i => i.type === 'abn')
            const parts = []
            if (tfn.length > 0) {
              const total = tfn.reduce((s,i)=>s+Number(safeAmount(i.amount) ?? 0),0)
              parts.push(`💼 TFN Invoices (${tfn.length}): $${total.toFixed(2)} - ${tfn.map(i=>`$${safeAmount(i.amount) ?? '0.00'} ${sanitiseShort(i.description)}`).join('; ')}`)
            }
            if (abn.length > 0) {
              const total = abn.reduce((s,i)=>s+Number(safeAmount(i.amount) ?? 0),0)
              parts.push(`🏢 ABN Invoices (${abn.length}): $${total.toFixed(2)} - ${abn.map(i=>`$${safeAmount(i.amount) ?? '0.00'} ${sanitiseShort(i.description)}`).join('; ')}`)
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

        // Tell Will the questionnaire arrived: this marks the form complete, STOPS
    // the form reminders (otherwise it keeps chasing someone who already filled
    // it in) and sends the confirmation in their language.
    //
    // BEST EFFORT, AND NOW ACTUALLY BEST EFFORT. The task above is already
    // written at this point, so the submission has succeeded: anything that
    // throws from here must not turn that into a 500. It used to be able to,
    // and the cost is specific and bad — the lead is in the CRM, the customer
    // is told it failed, and they fill the whole form in again.
    try {
      // The Medicare answer travels with it: "No" (not covered) is what queues
      // the Medicare Levy Exemption message 15 minutes from now.
      await notifyFormReceived(whatsapp, email, 'tax-return', sanitiseShort(formData.get('hasMedicare')))
    } catch (err) {
      // console.error on Vercel is a log nobody reads, and the consequence here
      // is specific: the customer's form reminders keep chasing them for
      // something they have already sent. Recorded where the owner can see it.
      console.error('[tax-form] notifyFormReceived failed after the task was saved:', err)
      try {
        const { getStore } = await import('@/lib/will/store')
        await getStore().audit('system', 'form_notify_failed', {
          error: err instanceof Error ? err.message.slice(0, 200) : String(err).slice(0, 200),
        })
      } catch { /* the store is a likely thing to have just failed */ }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    // ── Make the failure findable ──────────────────────────────────────────
    //
    // Every failure in here used to reach the customer as one sentence:
    // "Something went wrong. Please try again or contact us directly." A
    // validation rejection and a database outage were indistinguishable on
    // screen AND in a screenshot, so the only report anybody could make was
    // "the form is broken", which is not something that can be fixed.
    //
    // The reference is six characters of a UUID, generated here and logged
    // beside the real error. It identifies nothing about the person; it just
    // lets a screenshot be matched to a log line. The error text itself is
    // never returned, because this endpoint is public.
    const ref = crypto.randomUUID().slice(0, 6)
    console.error(`[tax-form] FAILED ref=${ref}:`, err)
    // Also recorded where the owner can actually see it, since the server log
    // needs a Vercel login and this does not.
    try {
      const { getStore } = await import('@/lib/will/store')
      await getStore().audit('system', 'public_form_failed', {
        ref, form: 'tax-form',
        error: err instanceof Error ? err.message.slice(0, 300) : String(err).slice(0, 300),
      })
    } catch { /* the store is a likely thing to have just failed */ }
    return NextResponse.json({ ok: false, error: 'submission_failed', ref }, { status: 500 })
  }
}

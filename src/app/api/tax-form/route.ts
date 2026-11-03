export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { createTask, findExistingClient } from '@/lib/db'
import { isRateLimited } from '@/lib/rate-limit'
import { getRateLimitIp } from '@/lib/get-ip'
import { crossSiteFormReason } from '@/lib/public-form-guard'
import { sanitiseField, sanitiseShort, sanitiseNote, sanitiseNoteShort } from '@/lib/sanitise'
import { validateIntake, safeAmount } from '@/lib/intake-validate'
import { isPublicFormUploadUrl } from '@/lib/supabase'
import { normalisePhone } from '@/lib/leads'
import crypto from 'crypto'
import { notifyFormReceived, notifyFormReceivedForCustomer, recordUnverifiedFormSubmission, medicareAnswerFor } from '@/lib/will/form-link'
import { verifyFormToken, formTokenUsedKey } from '@/lib/will/form-token'
import { getStore } from '@/lib/will/store'
import { brandFromHost } from '@/lib/brand'
import { svtLineEnabled, withBrand } from '@/lib/will/brand-context'
import { safeErr } from '@/lib/log-safe'

export async function POST(req: NextRequest) {
  try {
    const ip = getRateLimitIp(req)
    // A page on another site must not be able to spend a visitor's rate-limit budget or
    // spread submissions across visitors' IPs (lib/public-form-guard.ts).
    if (crossSiteFormReason(req)) return NextResponse.json({ ok: false, error: 'forbidden' }, { status: 403 })
    // Brand from the host the request was routed by, never from the body
    // (decision 003). The SVT host can only reach this route in a build with
    // SVT_FORMS_ENABLED=true (config/brand-routing.js).
    const brand = brandFromHost(req.headers.get('host'))
    // Second lock behind the host rewrite (audit A09-1): the SVT form stays
    // closed at runtime until SVT_FORMS_ENABLED is set.
    if (brand === 'svt' && process.env.SVT_FORMS_ENABLED !== 'true') {
      return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 })
    }

    const formData  = await req.formData()
    const email     = sanitiseShort(formData.get('email'))
    let whatsapp    = sanitiseShort(formData.get('waNumber'))
    const fullName  = sanitiseShort(formData.get('fullName'))

    // The link Will sent carries a signed token (?k=) that names the chat. When it is
    // valid the number comes from the chat, never from what was typed, and the link
    // works once: it is marked used only after the submission is saved (Jo, 3 Nov).
    let tokenClaims: { customerId: string; nonce: string } | null = null
    if (brand === 'wht') {
      const tok = verifyFormToken(formData.get('k'), 'wht')
      if (tok.ok) {
        if (tok.claims.purpose !== 'form') {
          // A correction link opens the residency page only; it cannot submit the form.
          return NextResponse.json({ ok: false, error: 'link_not_for_form' }, { status: 403 })
        }
        const used = await getStore().getSetting(formTokenUsedKey(tok.claims.nonce)).catch(() => null)
        if (used) return NextResponse.json({ ok: false, error: 'link_used' }, { status: 409 })
        const chatCustomer = await getStore().getCustomerById(tok.claims.customerId).catch(() => null)
        if (chatCustomer?.waId) {
          whatsapp = `+${chatCustomer.waId.replace(/\D/g, '')}`
          tokenClaims = { customerId: tok.claims.customerId, nonce: tok.claims.nonce }
        }
      }
    }

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
    // The rate-limit key is stored in Redis (a third-party service), so it
    // carries a hash of the person, never their phone number or email.
    const person = crypto.createHash('sha256').update(normalisePhone(whatsapp) || email).digest('hex').slice(0, 24)
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

    const existing  = await findExistingClient(email, whatsapp, brand)
    const isReturning = !!existing
    const clientId  = existing?.id ?? `CLT-${crypto.randomUUID()}`

    // All files are pre-uploaded client-side; server receives URLs only
    // SECURITY: only accept URLs from our Supabase Storage (prevent SSRF/tracking),
    // and only objects the public upload endpoint creates for THIS brand, so an
    // anonymous caller cannot attach (or later cause the deletion of) another
    // customer's document that sits in the same bucket.
    // Hard cap at 50 items so a malicious client can't ship a giant JSON array.
    const fileUrls: string[] = (() => {
      const raw = formData.get('invoiceUrls')
      if (typeof raw !== 'string') return []
      try {
        const parsed: unknown = JSON.parse(raw)
        if (!Array.isArray(parsed)) return []
        return parsed.slice(0, 50).filter((u): u is string => typeof u === 'string')
      } catch { return [] }
    })().filter((u) => isPublicFormUploadUrl(u, brand))

    // "Yes" to work expenses must come with at least one receipt (Jo, 3 Nov).
    // The form already stops this in the browser, but a browser check can be
    // skipped, and the upload step tolerates one failed receipt by design, so
    // the rule is enforced here too. The two identity documents travel in the
    // same list, so they are not counted as receipts.
    if (sanitiseShort(formData.get('hasExpenses')).toLowerCase() === 'yes') {
      const identity = [formData.get('bankStatementUrl'), formData.get('selfiePassportUrl')]
        .filter((u): u is string => typeof u === 'string')
      const receipts = fileUrls.filter((u) => !identity.includes(u))
      if (receipts.length === 0) {
        return NextResponse.json({ ok: false, error: 'invoices_required' }, { status: 400 })
      }
    }

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
        formData.get('taxStatus')     ? `→ ${sanitiseNote(formData.get('taxStatus'))}` : '',
        formData.get('declared')      ? `→ ${sanitiseNote(formData.get('declared'))}` : '',
        formData.get('hasMedicare') ? `Medicare: ${sanitiseNoteShort(formData.get('hasMedicare'))}` : '',
        formData.get('hasExpenses') ? `Expenses: ${sanitiseNoteShort(formData.get('hasExpenses'))}` : '',
        // Additional income (Jo, 28 Oct). Free text is cleaned and capped; it
        // is only kept when the answer is Yes.
        (() => {
          const a = sanitiseNoteShort(formData.get('hasOtherIncome')).toLowerCase()
          if (a === 'no') return 'Other income: No'
          if (a !== 'yes') return ''
          const what = sanitiseNote(formData.get('otherIncomeText'), 300)
          return `⚠️ Other income: Yes${what ? ` - ${what}` : ' (not described, ask)'}`
        })(),
        // Optional extra lines from the SVT form (visa, course length). At most
        // 5 lines of 200 characters, tags stripped; anything malformed is
        // ignored. The WHT form never sends this field.
        (() => {
          const raw = formData.get('extraNotes')
          if (typeof raw !== 'string') return ''
          try {
            const parsed: unknown = JSON.parse(raw)
            if (!Array.isArray(parsed)) return ''
            return parsed.slice(0, 5)
              .filter((n): n is string => typeof n === 'string')
              // Labelled so staff-side code can tell a customer-typed line from a staff note.
              .map((n) => sanitiseNote(n, 200))
              .filter(Boolean)
              .map((n) => `Form note: ${n}`)
              .join(' | ')
          } catch { return '' }
        })(),
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
              .map((n) => sanitiseNoteShort(n))
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
            // Entries that are not objects (null, numbers, strings) are dropped: `[null]` used to
            // throw here and turn a well-formed request into a 500 plus an audit row (round 2).
            const arr = (parsed.slice(0, 25) as unknown[]).filter((i): i is {type:string;amount:string;description:string;url?:string} => !!i && typeof i === 'object')
            if (arr.length === 0) return ''
            const tfn = arr.filter(i => i.type === 'tfn')
            const abn = arr.filter(i => i.type === 'abn')
            const parts = []
            if (tfn.length > 0) {
              const total = tfn.reduce((s,i)=>s+Number(safeAmount(i.amount) ?? 0),0)
              parts.push(`💼 TFN Invoices (${tfn.length}): $${total.toFixed(2)} - ${tfn.map(i=>`$${safeAmount(i.amount) ?? '0.00'} ${sanitiseNoteShort(i.description)}`).join('; ')}`)
            }
            if (abn.length > 0) {
              const total = abn.reduce((s,i)=>s+Number(safeAmount(i.amount) ?? 0),0)
              parts.push(`🏢 ABN Invoices (${abn.length}): $${total.toFixed(2)} - ${abn.map(i=>`$${safeAmount(i.amount) ?? '0.00'} ${sanitiseNoteShort(i.description)}`).join('; ')}`)
            }
            return parts.join(' | ')
          } catch { return '' }
        })(),
      ].filter(Boolean).join(' | '),
      fileUrls,
      reviewStatus: 'pending',
      reviewerNote: '',
      reviewedAt:   '',
      brand,
    })

    // Student Visa Tax. Once the SVT WhatsApp line exists, the form goes
    // through the same notifyFormReceived as WHT, inside the SVT brand (final
    // review, 27 Oct): the phone lookup is brand-scoped, so it can only find
    // the SVT chat, and the confirmation goes out from the SVT number as Mia.
    // A foreign resident never gets the Medicare exemption message.
    // Before the line exists the lookup is NOT brand-scoped, so nothing is
    // sent and staff are told instead (an audit row), as before.
    if (brand === 'svt' && svtLineEnabled()) {
      try {
        const taxStatus = sanitiseShort(formData.get('taxStatus'))
        const foreign = /foreign/i.test(taxStatus)
        const hasAbnIncome = (() => {
          const raw = formData.get('invoiceDetails')
          if (!raw || typeof raw !== 'string') return false
          try { const parsed: unknown = JSON.parse(raw); return Array.isArray(parsed) && parsed.some((i) => (i as { type?: string })?.type === 'abn') } catch { return false }
        })()
        await withBrand('svt', () => notifyFormReceived(
          whatsapp, email, 'tax-return',
          foreign ? 'n/a (foreign resident)' : medicareAnswerFor(sanitiseShort(formData.get('hasMedicare')), taxStatus),
          hasAbnIncome, { country: sanitiseShort(formData.get('country')), taxStatus },
        ))
      } catch (err) {
        console.error('[tax-form] svt notify failed after the task was saved:', safeErr(err))
      }
      return NextResponse.json({ ok: true })
    }
    if (brand === 'svt') {
      try {
        await getStore().audit('system', 'svt_form_received', { clientId, taxYear: sanitiseShort(formData.get('taxYear')) })
      } catch (err) {
        console.error('[tax-form] svt audit failed after the task was saved:', safeErr(err))
      }
      return NextResponse.json({ ok: true })
    }

    // The link worked: close it. Only now, so a failed save leaves it usable for a retry.
    if (tokenClaims) {
      await getStore().setSetting(formTokenUsedKey(tokenClaims.nonce), Date.now())
        .catch((e) => console.error('[tax-form] could not mark the form link used:', safeErr(e)))
    }

    // Tell Will the questionnaire arrived: this marks the form complete, STOPS
    // the form reminders (otherwise it keeps chasing someone who already filled
    // it in) and sends the confirmation in their language.
    //
    // BEST EFFORT, AND NOW ACTUALLY BEST EFFORT. The task above is already
    // written at this point, so the submission has succeeded: anything that
    // throws from here must not turn that into a 500. It used to be able to,
    // and the cost is specific and bad - the lead is in the CRM, the customer
    // is told it failed, and they fill the whole form in again.
    try {
      // The Medicare answer travels with it: "No" (not covered) is what queues
      // the Medicare Levy Exemption message 15 minutes from now.
      const hasAbnIncome = (() => {
        const raw = formData.get('invoiceDetails')
        if (!raw || typeof raw !== 'string') return false
        try { const parsed: unknown = JSON.parse(raw); return Array.isArray(parsed) && parsed.some((i) => (i as { type?: string })?.type === 'abn') } catch { return false }
      })()
      const medicare = medicareAnswerFor(sanitiseShort(formData.get('hasMedicare')), sanitiseShort(formData.get('taxStatus')))
      const residency = { country: sanitiseShort(formData.get('country')), taxStatus: sanitiseShort(formData.get('taxStatus')) }
      // A valid completion token (from the link Will sent) names the customer. Without one the
      // old phone-number match still applies until FORM_TOKEN_ENFORCE=true, when the submission
      // is only recorded for a person to link by hand.
      if (tokenClaims) {
        await notifyFormReceivedForCustomer(tokenClaims.customerId, whatsapp, email, medicare, hasAbnIncome, residency)
      } else if (process.env.FORM_TOKEN_ENFORCE === 'true') {
        await recordUnverifiedFormSubmission(whatsapp, email, medicare)
      } else {
        await notifyFormReceived(whatsapp, email, 'tax-return', medicare, hasAbnIncome, residency)
      }
    } catch (err) {
      // console.error on Vercel is a log nobody reads, and the consequence here
      // is specific: the customer's form reminders keep chasing them for
      // something they have already sent. Recorded where the owner can see it.
      console.error('[tax-form] notifyFormReceived failed after the task was saved:', safeErr(err))
      try {
        await getStore().audit('system', 'form_notify_failed', {
          error: safeErr(err).slice(0, 200),
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
    console.error(`[tax-form] FAILED ref=${ref}:`, safeErr(err))
    // Also recorded where the owner can actually see it, since the server log
    // needs a Vercel login and this does not.
    try {
      await getStore().audit('system', 'public_form_failed', {
        ref, form: 'tax-form',
        error: safeErr(err).slice(0, 300),
      })
    } catch { /* the store is a likely thing to have just failed */ }
    return NextResponse.json({ ok: false, error: 'submission_failed', ref }, { status: 500 })
  }
}

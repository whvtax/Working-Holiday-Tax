// ============================================================
// Monthly "customer words" digest.
//
// WHAT IT IS FOR
//   Will's knowledge library is only as good as the questions it has seen. The
//   richest source of those is already in the database and nobody reads it: the
//   messages customers actually typed. Once a month this collects a month of
//   them into one document and emails it to the owner, so real wording — the
//   way a backpacker actually asks about super, or a second job, or "how long
//   does it take" — can be turned into library entries.
//
// WHAT IT DELIBERATELY DOES NOT DO
//   It never includes anything Will said. Only the customer side. An assistant
//   trained on its own previous answers learns its own mistakes.
//
// PRIVACY
//   This puts customer messages into an email inbox, which is a place data goes
//   and never leaves. Customers paste TFNs, bank accounts and passport numbers
//   into WhatsApp constantly — so every long digit run is stripped before the
//   document is built, not after. Names are reduced to a first name and the
//   number to its last three digits: enough to tell two people apart while
//   reading, not enough to be a customer list.
// ============================================================
import { getStore, MessageRow } from './store'

/** A run of 7+ digits, allowing spaces/dashes inside it. Covers TFNs (8-9),
 *  bank accounts, BSB+account pairs, passport numbers and phone numbers, while
 *  leaving ordinary numbers alone — "2024-25" is six digits and survives, as do
 *  "24 hours", "2 jobs", "$220" and "6 months". */
const LONG_DIGITS = /(?:\d[\s-]?){7,}\d?/g
const EMAILISH = /\b[^\s@]+@[^\s@]+\.[a-z]{2,}\b/gi

/** Strip anything that should not be sitting in an inbox six months from now. */
export function redactSensitive(text: string): string {
  return text
    .replace(EMAILISH, '[email removed]')
    .replace(LONG_DIGITS, (m) => {
      const digits = m.replace(/\D/g, '')
      return digits.length >= 7 ? '[number removed]' : m
    })
    .trim()
}

/** "Sarah Kowalski" + "447700900123" -> "Sarah (…123)" */
function shortLabel(name: string | null | undefined, waId: string): string {
  const first = (name ?? '').trim().split(/\s+/)[0] || 'Unknown'
  const tail = waId.replace(/\D/g, '').slice(-3) || '???'
  return `${first} (…${tail})`
}

export interface DigestInput {
  /** Inbound messages in the period, any order. */
  messages: (MessageRow & { customerName?: string | null; waId?: string })[]
  periodLabel: string
}

export interface Digest {
  periodLabel: string
  totalMessages: number
  uniqueCustomers: number
  questions: string[]
  /** Everything the customers said, grouped per person, in order. */
  byCustomer: { label: string; lines: string[] }[]
  text: string
}

export function buildDigest(input: DigestInput): Digest {
  const clean = input.messages
    .filter((m) => m.direction === 'IN')
    .map((m) => ({
      label: shortLabel(m.customerName, m.waId ?? m.customerId),
      body: redactSensitive(m.body ?? ''),
      at: m.createdAt,
    }))
    .filter((m) => m.body.length > 0)
    .sort((a, b) => (a.at < b.at ? -1 : 1))

  const groups = new Map<string, string[]>()
  for (const m of clean) {
    if (!groups.has(m.label)) groups.set(m.label, [])
    groups.get(m.label)!.push(m.body)
  }

  // Questions first: these are the entries the library is missing. Deduplicated
  // case-insensitively, because the same question arrives twenty times a month
  // and twenty copies of it is not twenty pieces of information.
  const seen = new Set<string>()
  const questions: string[] = []
  for (const m of clean) {
    if (!m.body.includes('?')) continue
    const key = m.body.toLowerCase().replace(/\s+/g, ' ').slice(0, 120)
    if (seen.has(key)) continue
    seen.add(key)
    questions.push(m.body)
  }

  const byCustomer = [...groups.entries()].map(([label, lines]) => ({ label, lines }))

  const parts: string[] = []
  parts.push(`WHAT CUSTOMERS WROTE — ${input.periodLabel}`)
  parts.push('='.repeat(60))
  parts.push('')
  parts.push(`${clean.length} messages from ${groups.size} people.`)
  parts.push('Only the customer side. TFNs, bank details, phone numbers and email')
  parts.push('addresses have been removed automatically.')
  parts.push('')
  parts.push('')
  parts.push(`QUESTIONS THEY ASKED (${questions.length}, duplicates merged)`)
  parts.push('-'.repeat(60))
  parts.push('These are the best candidates for new library entries.')
  parts.push('')
  for (const q of questions) parts.push(`  • ${q}`)
  if (!questions.length) parts.push('  (none this month)')
  parts.push('')
  parts.push('')
  parts.push('EVERYTHING THEY WROTE, BY PERSON')
  parts.push('-'.repeat(60))
  parts.push('')
  for (const g of byCustomer) {
    parts.push(`${g.label}`)
    for (const line of g.lines) parts.push(`    ${line}`)
    parts.push('')
  }
  if (!byCustomer.length) parts.push('(no customer messages in this period)')

  return {
    periodLabel: input.periodLabel,
    totalMessages: clean.length,
    uniqueCustomers: groups.size,
    questions,
    byCustomer,
    text: parts.join('\n'),
  }
}

function esc(s: string): string {
  return s.replace(/[&<>]/g, (c) => (c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;'))
}

function digestHtml(d: Digest): string {
  const top = d.questions.slice(0, 25)
  return `
  <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:0 auto;color:#1a1a1a;">
    <div style="background:#0B5240;border-radius:16px 16px 0 0;padding:26px 30px;">
      <h1 style="color:#fff;font-size:19px;margin:0;font-weight:600;">What customers wrote</h1>
      <p style="color:#b7d5cb;font-size:13px;margin:6px 0 0;">${esc(d.periodLabel)}</p>
    </div>
    <div style="background:#f9fafb;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 16px 16px;padding:26px 30px;">
      <p style="font-size:14px;margin:0 0 18px;">
        <strong>${d.totalMessages}</strong> messages from <strong>${d.uniqueCustomers}</strong> people.
        The full document is attached.
      </p>
      <p style="font-size:13px;color:#666;margin:0 0 22px;">
        Only what the customers typed — nothing Will said. TFNs, bank details, phone
        numbers and email addresses were removed automatically before this was written.
      </p>
      <h2 style="font-size:14px;margin:0 0 10px;color:#0B5240;">Questions worth adding to the library${d.questions.length > top.length ? ` (first ${top.length} of ${d.questions.length})` : ''}</h2>
      <ul style="font-size:13.5px;line-height:1.65;padding-left:18px;margin:0;">
        ${top.map((q) => `<li>${esc(q)}</li>`).join('\n        ') || '<li style="color:#999;">None this month.</li>'}
      </ul>
    </div>
  </div>`
}

/**
 * Send the digest. Returns false (without throwing) if it could not be sent —
 * this runs inside nightly maintenance and must never take that down with it.
 */
export async function sendDigestEmail(d: Digest, to: string, apiKey: string): Promise<boolean> {
  if (!apiKey || !to) return false
  try {
    const filename = `customer-words-${d.periodLabel.replace(/\s+/g, '-').toLowerCase()}.txt`
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Working Holiday Tax <noreply@workingholidaytax.com.au>',
        to: [to],
        subject: `What customers wrote — ${d.periodLabel}`,
        html: digestHtml(d),
        attachments: [{
          filename,
          content: Buffer.from(d.text, 'utf8').toString('base64'),
        }],
      }),
    })
    if (!res.ok) {
      console.error('[digest] Resend rejected the send:', res.status)
      return false
    }
    return true
  } catch (err) {
    console.error('[digest] send failed:', err)
    return false
  }
}

/** "July 2026" — the month that just ended, in the business's own timezone. */
export function monthLabel(d: Date): string {
  return d.toLocaleDateString('en-AU', { month: 'long', year: 'numeric', timeZone: 'Australia/Sydney' })
}

/** "2026-07" — the stable key used to remember which month was already sent. */
export function monthKey(d: Date): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    year: 'numeric', month: '2-digit', timeZone: 'Australia/Sydney',
  }).formatToParts(d)
  const y = parts.find((p) => p.type === 'year')?.value ?? '0000'
  const m = parts.find((p) => p.type === 'month')?.value ?? '00'
  return `${y}-${m}`
}

/**
 * Called once per nightly run. Sends at most one digest per calendar month.
 *
 * Idempotency and self-healing come from one stored key rather than from the
 * schedule: if the nightly job does not run on the 1st — a cold start, an
 * outage, a deploy — the digest still goes out on the 2nd, or the 5th. It can
 * never go out twice for the same month, because the month it covers is written
 * down only after a successful send.
 */
export async function maybeSendMonthlyDigest(nowMs: number): Promise<'sent' | 'already_sent' | 'skipped' | 'failed'> {
  const store = getStore()
  const now = new Date(nowMs)

  // The month that just ended is the one being reported.
  const firstOfThisMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
  const prevMonthEnd = firstOfThisMonth
  const prevMonthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1))
  const key = monthKey(prevMonthStart)

  const last = await store.getSetting('digest_last_month').catch(() => null)
  if (last === key) return 'already_sent'

  const to = process.env.CRM_ADMIN_EMAIL ?? ''
  const apiKey = process.env.RESEND_API_KEY ?? ''
  if (!to || !apiKey) {
    await store.audit('nightly', 'digest_skipped', { reason: 'CRM_ADMIN_EMAIL or RESEND_API_KEY not set', month: key })
    return 'skipped'
  }

  const messages = await store.listInboundBetween(prevMonthStart.toISOString(), prevMonthEnd.toISOString())
  const digest = buildDigest({ messages, periodLabel: monthLabel(prevMonthStart) })

  // An empty month still marks itself done, so a quiet month does not queue up
  // a retry every single night for the rest of the month.
  if (digest.totalMessages === 0) {
    await store.setSetting('digest_last_month', key)
    await store.audit('nightly', 'digest_empty', { month: key })
    return 'skipped'
  }

  const ok = await sendDigestEmail(digest, to, apiKey)
  if (!ok) {
    await store.audit('nightly', 'digest_failed', { month: key, messages: digest.totalMessages })
    return 'failed' // not recorded as sent, so tomorrow night tries again
  }

  await store.setSetting('digest_last_month', key)
  await store.audit('nightly', 'digest_sent', {
    month: key, messages: digest.totalMessages,
    customers: digest.uniqueCustomers, questions: digest.questions.length,
  })
  return 'sent'
}

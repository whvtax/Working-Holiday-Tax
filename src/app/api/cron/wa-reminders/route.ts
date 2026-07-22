export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabase } from '@/lib/supabase'
import { updateStage, dispatchMessage } from '@/lib/wa-store'

// ──────────────────────────────────────────────────────────────────────────
// Role doc Section 10.4 (Reminders) — run this every hour or two via
// Vercel Cron. Scans for anyone sitting too long in a stage without a
// reply, and moves them along the sequence:
//
//   pitch_sent ──(no reply after REMINDER_1_HOURS)──▶ send Reminder 1
//   reminder_1_sent ──(no reply after REMINDER_2_HOURS)──▶ send Reminder 2
//   reminder_2_sent ──(no reply after CLOSE_HOURS)──▶ tag "not_relevant"
//
// These thresholds are a starting point — tune them based on what actually
// converts, per Section 4's "every script is a first draft" principle.
// ──────────────────────────────────────────────────────────────────────────

const REMINDER_1_HOURS = 20   // sent from pitch_sent_at
const REMINDER_2_HOURS = 24   // sent from reminder_1_sent_at
const CLOSE_HOURS      = 48   // tagged not_relevant from reminder_2_sent_at

const REMINDER_1_TEXT =
  "Hey {name}! Just checking in 🙂\n" +
  "Did you get a chance to fill out the quick form? Takes about 2 minutes, no obligation:\n" +
  'https://workingholidaytax.com.au/tax-form\n' +
  "Happy to answer any questions if something's unclear!"

const REMINDER_2_TEXT =
  "Hey {name}! No worries if now isn't the right time 🙂\n" +
  "Just let us know whenever you're ready - the form will still be here:\n" +
  'https://workingholidaytax.com.au/tax-form\n' +
  "If you'd rather we close this off for now, that's totally fine too - just say the word!"

function hoursSince(iso: string | null): number | null {
  if (!iso) return null
  return (Date.now() - new Date(iso).getTime()) / 3_600_000
}

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const auth = req.headers.get('authorization')
  if (cronSecret && !timingSafeAuthMatch(auth, `Bearer ${cronSecret}`)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const sb = getSupabase()
  const results = { reminder1: 0, reminder2: 0, closed: 0, errors: 0 }

  // ── Stage 1: pitch_sent → Reminder 1 ────────────────────────────────────
  const { data: pitchSent } = await sb
    .from('wa_conversations')
    .select('id, phone, first_name, pitch_sent_at, last_inbound_at, last_outbound_at')
    .eq('stage', 'pitch_sent')
    .limit(200)

  for (const c of pitchSent ?? []) {
    // Only act if they haven't replied since we last messaged them.
    const repliedSince = c.last_inbound_at && c.last_outbound_at && c.last_inbound_at > c.last_outbound_at
    if (repliedSince) continue
    const hrs = hoursSince(c.pitch_sent_at)
    if (hrs === null || hrs < REMINDER_1_HOURS) continue

    const name = c.first_name || 'there'
    const body = REMINDER_1_TEXT.replace('{name}', name)
    const result = await dispatchMessage(c.id, c.phone, body, '10.4_reminder_1', { stage: 'reminder_1_sent' })
    if (result.ok) {
      results.reminder1++
    } else {
      results.errors++
      console.error('[wa-reminders] reminder1 send failed', c.id, result.error)
    }
  }

  // ── Stage 2: reminder_1_sent → Reminder 2 ───────────────────────────────
  const { data: reminder1Sent } = await sb
    .from('wa_conversations')
    .select('id, phone, first_name, reminder_1_sent_at, last_inbound_at, last_outbound_at')
    .eq('stage', 'reminder_1_sent')
    .limit(200)

  for (const c of reminder1Sent ?? []) {
    const repliedSince = c.last_inbound_at && c.last_outbound_at && c.last_inbound_at > c.last_outbound_at
    if (repliedSince) continue
    const hrs = hoursSince(c.reminder_1_sent_at)
    if (hrs === null || hrs < REMINDER_2_HOURS) continue

    const name = c.first_name || 'there'
    const body = REMINDER_2_TEXT.replace('{name}', name)
    const result = await dispatchMessage(c.id, c.phone, body, '10.4_reminder_2', { stage: 'reminder_2_sent' })
    if (result.ok) {
      results.reminder2++
    } else {
      results.errors++
      console.error('[wa-reminders] reminder2 send failed', c.id, result.error)
    }
  }

  // ── Stage 3: reminder_2_sent → tag "not_relevant" (no more messages) ───
  const { data: reminder2Sent } = await sb
    .from('wa_conversations')
    .select('id, reminder_2_sent_at, last_inbound_at, last_outbound_at')
    .eq('stage', 'reminder_2_sent')
    .limit(200)

  for (const c of reminder2Sent ?? []) {
    const repliedSince = c.last_inbound_at && c.last_outbound_at && c.last_inbound_at > c.last_outbound_at
    if (repliedSince) continue
    const hrs = hoursSince(c.reminder_2_sent_at)
    if (hrs === null || hrs < CLOSE_HOURS) continue

    await updateStage(c.id, 'not_relevant')
    results.closed++
  }

  await sb.from('wa_system_events').insert({
    event_type: 'reminders_run',
    severity: 'info',
    detail: `reminder1=${results.reminder1} reminder2=${results.reminder2} closed=${results.closed} errors=${results.errors}`,
  })

  return NextResponse.json({ ok: true, ...results })
}

/**
 * Constant-time comparison for the cron auth header — prevents a timing
 * attack from being able to guess CRON_SECRET one byte at a time, same
 * principle as the webhook signature check.
 */
function timingSafeAuthMatch(provided: string | null, expected: string): boolean {
  if (!provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

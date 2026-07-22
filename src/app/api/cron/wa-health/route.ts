export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabase } from '@/lib/supabase'
import { checkConnectionHealth } from '@/lib/whatsapp'

// ──────────────────────────────────────────────────────────────────────────
// Scheduled health check for the WhatsApp connection — this is the piece
// that replaces a paid BSP's monitoring dashboard.
//
// Wire this up in vercel.json as a Cron Job, e.g. every 30 minutes:
//   { "crons": [{ "path": "/api/cron/wa-health", "schedule": "*/30 * * * *" }] }
//
// Protect it with a shared secret so randoms can't trigger it / DoS it:
//   CRON_SECRET env var, checked against an Authorization header Vercel Cron
//   sends automatically when configured — see Vercel Cron docs for the
//   current header name at setup time.
//
// What it checks, each run:
//   1. Can we still call the Graph API with our token? (checkConnectionHealth)
//   2. Have we received ANY webhook in the last N hours? (silence = likely
//      Coexistence disconnected, e.g. the 14-day "open the app" rule lapsed)
//   3. Are there conversations flagged needs_human that have been sitting
//      unanswered too long? (mirrors the Section 12 escalation SLA)
// If anything looks wrong, sends one alert email (throttled — see
// last_alert_sent_at) instead of spamming on every run.
// ──────────────────────────────────────────────────────────────────────────

const WEBHOOK_SILENCE_ALERT_HOURS = 20   // less than the 24h reply window, so we catch it in time
const ALERT_COOLDOWN_MINUTES = 60        // don't re-alert on the same issue more than once/hour

export async function GET(req: NextRequest) {
  const cronSecret = process.env.CRON_SECRET
  const auth = req.headers.get('authorization')
  if (cronSecret && !timingSafeAuthMatch(auth, `Bearer ${cronSecret}`)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const sb = getSupabase()
  const problems: string[] = []

  // ── 1. Token / API reachability ─────────────────────────────────────────
  const health = await checkConnectionHealth()
  const now = new Date()

  if (!health.ok) {
    problems.push(`Graph API call failed: ${health.error}`)
  }

  // ── 2. Webhook silence check ────────────────────────────────────────────
  const { data: status } = await sb.from('wa_system_status').select('*').eq('id', 1).maybeSingle()
  const lastWebhook = status?.last_webhook_received_at ? new Date(status.last_webhook_received_at) : null
  const hoursSinceWebhook = lastWebhook ? (now.getTime() - lastWebhook.getTime()) / 3_600_000 : null

  if (hoursSinceWebhook !== null && hoursSinceWebhook > WEBHOOK_SILENCE_ALERT_HOURS) {
    problems.push(
      `No webhook received in ${hoursSinceWebhook.toFixed(1)}h — check the WhatsApp Business App was opened recently (Coexistence needs it every 14 days).`
    )
  }

  // ── 3. Stale escalations (Section 10.12 SLA) ────────────────────────────
  const { count: staleUrgent } = await sb
    .from('wa_conversations')
    .select('id', { count: 'exact', head: true })
    .eq('needs_human', true)
    .lt('updated_at', new Date(now.getTime() - 2 * 3_600_000).toISOString())  // >2h untouched

  if ((staleUrgent ?? 0) > 0) {
    problems.push(`${staleUrgent} urgent conversation(s) waiting on a human reply for over 2 hours.`)
  }

  // ── Update status row ────────────────────────────────────────────────────
  const consecutiveFailures = health.ok ? 0 : ((status?.consecutive_failures ?? 0) + 1)

  await sb.from('wa_system_status').update({
    last_heartbeat_at: now.toISOString(),
    last_heartbeat_ok: health.ok,
    consecutive_failures: consecutiveFailures,
    updated_at: now.toISOString(),
  }).eq('id', 1)

  await sb.from('wa_system_events').insert({
    event_type: health.ok ? 'heartbeat_ok' : 'heartbeat_fail',
    severity: health.ok ? 'info' : 'critical',
    detail: health.ok ? `quality_rating=${health.qualityRating ?? 'unknown'}` : (health.error ?? ''),
  })

  // ── Alerting (throttled) ─────────────────────────────────────────────────
  if (problems.length > 0) {
    const lastAlert = status?.last_alert_sent_at ? new Date(status.last_alert_sent_at) : null
    const minutesSinceLastAlert = lastAlert ? (now.getTime() - lastAlert.getTime()) / 60_000 : Infinity

    if (minutesSinceLastAlert > ALERT_COOLDOWN_MINUTES) {
      const sent = await sendHealthAlertEmail(problems)
      if (sent) {
        await sb.from('wa_system_status').update({
          last_alert_sent_at: now.toISOString(),
          last_alert_reason: problems.join(' | '),
        }).eq('id', 1)
        await sb.from('wa_system_events').insert({
          event_type: 'alert_sent', severity: 'warning', detail: problems.join(' | '),
        })
      }
    }
  }

  return NextResponse.json({ ok: health.ok, problems })
}

async function sendHealthAlertEmail(problems: string[]): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CRM_ADMIN_EMAIL
  if (!apiKey || !to) return false

  const time = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Working Holiday Tax <noreply@workingholidaytax.com.au>',
        to: [to],
        subject: '⚠️ WhatsApp connection needs attention',
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:480px;margin:0 auto;">
            <div style="background:#0B5240;border-radius:16px 16px 0 0;padding:24px 28px;">
              <h1 style="color:#fff;font-size:16px;margin:0;font-weight:600;">WhatsApp connection alert</h1>
            </div>
            <div style="background:#f9fafb;border:1px solid #e8e8e8;border-top:none;border-radius:0 0 16px 16px;padding:24px 28px;">
              <ul style="font-size:14px;color:#333;padding-left:18px;margin:0;">
                ${problems.map(p => `<li style="margin-bottom:8px;">${escapeHtml(p)}</li>`).join('')}
              </ul>
              <p style="font-size:12px;color:#999;margin:16px 0 0;">${time} (Sydney)</p>
            </div>
          </div>`,
      }),
    })
    if (!res.ok) { console.error('[wa-health alert] Resend error', res.status, await res.text()); return false }
    return true
  } catch (err) {
    console.error('[wa-health alert]', err)
    return false
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}

/**
 * Constant-time comparison for the cron auth header — prevents a timing
 * attack from being able to guess CRON_SECRET one byte at a time by
 * measuring response time differences, same principle as the webhook
 * signature check.
 */
function timingSafeAuthMatch(provided: string | null, expected: string): boolean {
  if (!provided) return false
  const a = Buffer.from(provided)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

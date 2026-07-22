// src/lib/whatsapp.ts
// ──────────────────────────────────────────────────────────────────────────
// Direct Meta WhatsApp Cloud API client — no BSP in between.
// This is the layer that replaces what 360dialog/Dualhook would provide:
// sending messages, and a lightweight health check we can call on a cron.
//
// Required env vars:
//   - WHATSAPP_ACCESS_TOKEN:   System User access token (Meta Business Suite →
//                               Users → System users → generate token, scoped
//                               to whatsapp_business_messaging +
//                               whatsapp_business_management). Use a System
//                               User token, not a personal one — it does not
//                               expire on a fixed schedule the way personal
//                               user tokens do.
//   - WHATSAPP_PHONE_NUMBER_ID: found in Meta Business Suite → WhatsApp
//                               accounts → Working Holiday Tax → Phone numbers
//   - WHATSAPP_WABA_ID:         the WhatsApp Business Account ID (same screen)
// ──────────────────────────────────────────────────────────────────────────

const GRAPH_VERSION = 'v21.0'
const GRAPH_BASE = `https://graph.facebook.com/${GRAPH_VERSION}`

function requiredEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env var: ${name}`)
  return v
}

/**
 * Sends a free-form text message. Only valid within the 24-hour customer
 * service window (i.e. the contact messaged us within the last 24h).
 * Outside that window, use sendTemplateMessage() instead — see role doc
 * Section 10.4 (reminders) for which scripts need which type.
 */
export async function sendTextMessage(toPhoneE164: string, body: string): Promise<{ ok: boolean; messageId?: string; error?: string }> {
  const token = requiredEnv('WHATSAPP_ACCESS_TOKEN')
  const phoneNumberId = requiredEnv('WHATSAPP_PHONE_NUMBER_ID')

  const res = await fetch(`${GRAPH_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: toPhoneE164.replace(/^\+/, ''),
      type: 'text',
      text: { body },
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return { ok: false, error: data?.error?.message ?? `HTTP ${res.status}` }
  }
  return { ok: true, messageId: data?.messages?.[0]?.id }
}

/**
 * Sends a pre-approved template message (required outside the 24h window,
 * e.g. Reminder 2 in most real-world timings — see role doc Section 10.4).
 * Templates must be created and approved in Meta Business Suite first.
 */
export async function sendTemplateMessage(
  toPhoneE164: string,
  templateName: string,
  languageCode: string = 'en',
  components: unknown[] = []
): Promise<{ ok: boolean; messageId?: string; error?: string }> {
  const token = requiredEnv('WHATSAPP_ACCESS_TOKEN')
  const phoneNumberId = requiredEnv('WHATSAPP_PHONE_NUMBER_ID')

  const res = await fetch(`${GRAPH_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to: toPhoneE164.replace(/^\+/, ''),
      type: 'template',
      template: { name: templateName, language: { code: languageCode }, components },
    }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    return { ok: false, error: data?.error?.message ?? `HTTP ${res.status}` }
  }
  return { ok: true, messageId: data?.messages?.[0]?.id }
}

/**
 * Downloads a media file (image/document) a client sent, given the media
 * ID from the webhook payload. Two-step process per Meta's API: first
 * resolve the ID to a temporary download URL + mime type, then fetch the
 * actual bytes from that URL (also requires the access token — the URL
 * alone isn't public).
 */
export async function downloadMedia(mediaId: string): Promise<{ buffer: Buffer; mimeType: string } | null> {
  try {
    const token = requiredEnv('WHATSAPP_ACCESS_TOKEN')

    const metaRes = await fetch(`${GRAPH_BASE}/${mediaId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    if (!metaRes.ok) return null
    const meta = await metaRes.json()
    const url: string | undefined = meta?.url
    const mimeType: string = meta?.mime_type ?? 'application/octet-stream'
    if (!url) return null

    const fileRes = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
    if (!fileRes.ok) return null
    const arrayBuffer = await fileRes.arrayBuffer()

    return { buffer: Buffer.from(arrayBuffer), mimeType }
  } catch (err) {
    console.error('[downloadMedia]', err)
    return null
  }
}

/**
 * Registers the business phone number for Cloud API messaging — the one
 * step Meta's own docs say can ONLY be done via a direct API call, never
 * through WhatsApp Manager or the App Dashboard ("you cannot register a
 * number through WhatsApp Manager (WAM) or the App Dashboard"). This is
 * exactly why the in-dashboard "Register your WhatsApp phone number"
 * wizard kept leading to the wrong (non-coexistence) flow.
 *
 * pin: a 6-digit two-step-verification PIN. If the number has never had
 * 2FA enabled, this call sets it as the new PIN. If it already has one,
 * this must match it exactly.
 */
export async function registerPhoneNumber(pin: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const token = requiredEnv('WHATSAPP_ACCESS_TOKEN')
    const phoneNumberId = requiredEnv('WHATSAPP_PHONE_NUMBER_ID')

    const res = await fetch(`${GRAPH_BASE}/${phoneNumberId}/register`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', pin }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { ok: false, error: data?.error?.message ?? `HTTP ${res.status}` }
    }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown error' }
  }
}

/**
 * Lightweight heartbeat: confirms the access token still works and the
 * phone number is still connected, without sending any message to a real
 * contact. Call this from the monitoring cron (see /api/cron/wa-health).
 */
export async function checkConnectionHealth(): Promise<{ ok: boolean; error?: string; qualityRating?: string }> {
  try {
    const token = requiredEnv('WHATSAPP_ACCESS_TOKEN')
    const phoneNumberId = requiredEnv('WHATSAPP_PHONE_NUMBER_ID')

    const res = await fetch(
      `${GRAPH_BASE}/${phoneNumberId}?fields=quality_rating,status`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      return { ok: false, error: data?.error?.message ?? `HTTP ${res.status}` }
    }
    return { ok: true, qualityRating: data?.quality_rating }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown error' }
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabase } from '@/lib/supabase'
import { getOrCreateConversation, touchInbound, logMessage, updateStage } from '@/lib/wa-store'
import { sendTextMessage } from '@/lib/whatsapp'
import { personalizeOpeningLine } from '@/lib/ai-personalize'

// ──────────────────────────────────────────────────────────────────────────
// GET: Meta's one-time webhook verification handshake.
// Set WHATSAPP_WEBHOOK_VERIFY_TOKEN yourself (any random string you choose),
// and enter that SAME string in Meta Business Suite → WhatsApp → Configuration
// → Webhook → Verify token, when you register this URL.
// ──────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode      = searchParams.get('hub.mode')
  const token     = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const expected = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
  if (mode === 'subscribe' && expected && token === expected) {
    return new NextResponse(challenge ?? '', { status: 200 })
  }
  return new NextResponse('Forbidden', { status: 403 })
}

// ──────────────────────────────────────────────────────────────────────────
// POST: inbound events from Meta (messages, delivery statuses, echoes).
// SECURITY: verifies the X-Hub-Signature-256 header against your Meta App
// Secret, so nobody can POST fake messages to this endpoint pretending to
// be Meta. Get the App Secret from: Meta App Dashboard → Settings → Basic.
// ──────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const rawBody = await req.text()

  if (!verifySignature(req, rawBody)) {
    return new NextResponse('Invalid signature', { status: 401 })
  }

  // Record that we're alive — feeds the health dashboard (Section: connection
  // monitoring). Fire-and-forget: a logging failure must never block message
  // processing.
  recordWebhookReceived().catch(() => {})

  let payload: unknown
  try {
    payload = JSON.parse(rawBody)
  } catch {
    return new NextResponse('Bad JSON', { status: 400 })
  }

  try {
    await handleWebhookPayload(payload)
  } catch (err) {
    // Log but still return 200 — if we 4xx/5xx, Meta will retry the same
    // event repeatedly, which can cause duplicate replies to the client.
    console.error('[whatsapp webhook] processing error', err)
  }

  return NextResponse.json({ ok: true })
}

function verifySignature(req: NextRequest, rawBody: string): boolean {
  const appSecret = process.env.WHATSAPP_APP_SECRET
  const signature = req.headers.get('x-hub-signature-256')
  if (!appSecret || !signature) return false

  const expected = 'sha256=' + crypto.createHmac('sha256', appSecret).update(rawBody).digest('hex')
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

async function recordWebhookReceived(): Promise<void> {
  const sb = getSupabase()
  await sb
    .from('wa_system_status')
    .update({ last_webhook_received_at: new Date().toISOString() })
    .eq('id', 1)
}

// ──────────────────────────────────────────────────────────────────────────
// Minimal shape of a WhatsApp Cloud API webhook payload. Meta sends more
// fields than this; we only type what we currently use.
// ──────────────────────────────────────────────────────────────────────────
interface WhatsAppWebhookPayload {
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{ from: string; type: string; text?: { body: string } }>
        contacts?: Array<{ profile?: { name?: string } }>
      }
    }>
  }>
}

async function handleWebhookPayload(payload: unknown): Promise<void> {
  const body = payload as WhatsAppWebhookPayload
  const change = body.entry?.[0]?.changes?.[0]?.value
  const message = change?.messages?.[0]
  if (!message || message.type !== 'text') return  // ignore statuses/echoes/media for now

  const phone = `+${message.from}`
  const firstName = change?.contacts?.[0]?.profile?.name?.split(' ')[0] ?? ''
  const text = message.text?.body ?? ''

  const conversation = await getOrCreateConversation(phone, firstName)
  await touchInbound(conversation.id)
  await logMessage(conversation.id, 'inbound', text)

  // ────────────────────────────────────────────────────────────────────
  // STATE MACHINE — currently only the very first step (Section 10.1 →
  // 10.2 of the role doc). This is the next piece we build together:
  // ABN detection, residency-check flow, reminder cancellation on reply,
  // and the "new/undefined question" fallback (Section 8).
  // ────────────────────────────────────────────────────────────────────
  if (conversation.stage === 'opening_sent' && !conversation.lastOutboundAt) {
    // Brand new conversation, we haven't said anything yet → Script 10.1
    // Line 1 (name) is fixed. Line 2 is personalised to what they actually
    // wrote, via a tightly-scoped AI call — see ai-personalize.ts for the
    // guardrails. Line 3 (the actual question) is always the fixed script.
    const greetingName = firstName || 'there'
    const ackLine = await personalizeOpeningLine(text)
    const opening = `Hey ${greetingName}! 😊\n${ackLine}\nHave you done a tax return in Australia before, or would this be your first one?`
    const result = await sendTextMessage(phone, opening)
    if (result.ok) {
      await logMessage(conversation.id, 'outbound', opening, '10.1_opening', result.messageId)
      // Stays in "opening_sent" — we've sent the opener but not the pitch yet.
    }
    return
  }

  if (conversation.stage === 'opening_sent' && conversation.lastOutboundAt) {
    // They replied to our opener (any answer) → always send Script 10.2
    const pitch =
      "Perfect, thanks!\nHere's a 2-minute form so we can check your eligibility and estimate your tax refund:\n" +
      'https://workingholidaytax.com.au/tax-form\n' +
      "Our fee is $220 and only applies if you're eligible for a tax refund.\n" +
      "We've helped 350+ backpackers from 45+ countries, so you're in good hands 🙌🏽"
    const result = await sendTextMessage(phone, pitch)
    if (result.ok) {
      await logMessage(conversation.id, 'outbound', pitch, '10.2_standard_pitch', result.messageId)
      await updateStage(conversation.id, 'pitch_sent')
    }
    return
  }

  // Anything past "pitch_sent" isn't automated yet — falls through silently
  // for now. Next increment: ABN keyword detection, residency-check
  // trigger, and the Section 8 "send to Customer Service" fallback so
  // nothing gets dropped on the floor.
}

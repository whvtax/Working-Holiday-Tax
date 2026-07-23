export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getSupabase } from '@/lib/supabase'
import { getOrCreateConversation, touchInbound, logMessage, flagForHuman, dispatchMessage, detectAndSetLanguage, tagIfCompletionMessageByPhone } from '@/lib/wa-store'
import { downloadMedia } from '@/lib/whatsapp'
import { uploadWhatsappMedia } from '@/lib/upload'
import { personalizeOpeningLine } from '@/lib/ai-personalize'
import { classifyLodgeIntent, classifyResidencyAnswer } from '@/lib/residency-classifier'
import { classifyAbnIncome } from '@/lib/abn-classifier'
import { findKnowledgeBaseAnswer } from '@/lib/knowledge-base'
import { looksJapanese, looksGerman } from '@/lib/translate'

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

  // TEMP DIAGNOSTIC — full visibility into every webhook call while we track
  // down why some real inbound messages weren't reaching wa_conversations.
  // Logs the field type + a truncated raw body, unconditionally, before any
  // processing logic runs. Safe to remove once the issue is confirmed fixed.
  logRawWebhookEvent(rawBody).catch(() => {})

  try {
    await handleWebhookPayload(payload)
  } catch (err) {
    // Log but still return 200 — if we 4xx/5xx, Meta will retry the same
    // event repeatedly, which can cause duplicate replies to the client.
    console.error('[whatsapp webhook] processing error', err)
    logProcessingError(err, rawBody).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}

async function logRawWebhookEvent(rawBody: string): Promise<void> {
  const sb = getSupabase()
  let field = 'unknown'
  try {
    const parsed = JSON.parse(rawBody)
    field = parsed?.entry?.[0]?.changes?.[0]?.field ?? 'unknown'
  } catch { /* ignore */ }
  await sb.from('wa_system_events').insert({
    event_type: 'webhook_raw',
    severity: 'info',
    detail: `field=${field} body=${rawBody.slice(0, 1500)}`,
  })
}

async function logProcessingError(err: unknown, rawBody: string): Promise<void> {
  const sb = getSupabase()
  const message = err instanceof Error ? `${err.message}\n${err.stack ?? ''}` : String(err)
  await sb.from('wa_system_events').insert({
    event_type: 'webhook_processing_error',
    severity: 'critical',
    detail: `${message}\n---body---\n${rawBody.slice(0, 1500)}`,
  })
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

async function recordAppEcho(): Promise<void> {
  const sb = getSupabase()
  await sb
    .from('wa_system_status')
    .update({ last_app_echo_at: new Date().toISOString() })
    .eq('id', 1)
}

// ──────────────────────────────────────────────────────────────────────────
// Minimal shape of a WhatsApp Cloud API webhook payload. Meta sends more
// fields than this; we only type what we currently use.
// ──────────────────────────────────────────────────────────────────────────
interface WhatsAppWebhookPayload {
  entry?: Array<{
    changes?: Array<{
      field?: string
      value?: {
        messages?: Array<{
          from: string
          type: string
          text?: { body: string }
          image?: { id: string; mime_type?: string; caption?: string }
          document?: { id: string; mime_type?: string; caption?: string; filename?: string }
        }>
        contacts?: Array<{ profile?: { name?: string } }>
        // Coexistence only: echoes of messages the tax agent sent manually
        // from the WhatsApp Business App itself (field === 'smb_message_echoes').
        message_echoes?: Array<{
          to: string
          type: string
          text?: { body: string }
        }>
      }
    }>
  }>
}

// ──────────────────────────────────────────────────────────────────────────
// Every automated reply in this file goes through dispatchMessage(), not
// sendTextMessage() directly. dispatchMessage checks shadow mode
// (wa_system_status.shadow_mode) and either queues the message for human
// approval in the CRM, or sends it immediately — see wa-store.ts. This is
// the ONE place that behaviour is decided, so nothing here needs to know
// or care which mode is currently active.
// ──────────────────────────────────────────────────────────────────────────
async function handleWebhookPayload(payload: unknown): Promise<void> {
  const body = payload as WhatsAppWebhookPayload
  const changeEntry = body.entry?.[0]?.changes?.[0]
  const change = changeEntry?.value

  // ────────────────────────────────────────────────────────────────────
  // Coexistence echo: a message the tax agent sent manually from the
  // WhatsApp Business App itself (not through our API). We don't reply to
  // these — we only watch for one specific, known completion message and
  // auto-tag the conversation "Done 2026" when it goes out, exactly like
  // the tax agent would do by hand otherwise.
  // ────────────────────────────────────────────────────────────────────
  if (changeEntry?.field === 'smb_message_echoes') {
    await recordAppEcho()
    const echo = change?.message_echoes?.[0]
    if (echo?.type === 'text' && echo.text?.body) {
      await tagIfCompletionMessageByPhone(`+${echo.to}`, echo.text.body)
    }
    return
  }

  const message = change?.messages?.[0]
  if (!message) return  // status update with no actual message — nothing to do

  const phone = `+${message.from}`
  const firstName = change?.contacts?.[0]?.profile?.name?.split(' ')[0] ?? ''

  // ────────────────────────────────────────────────────────────────────
  // Images and documents — most commonly receipts/invoices for the ABN
  // flow (Section 10.3). We can't and shouldn't try to read or judge what's
  // in them automatically; download, store against the conversation so the
  // tax agent can open it from the CRM, log it, and send a short fixed
  // acknowledgment. No branching logic runs on file contents.
  // ────────────────────────────────────────────────────────────────────
  if (message.type === 'image' || message.type === 'document') {
    const media = message.image ?? message.document
    const conversation = await getOrCreateConversation(phone, firstName)
    await touchInbound(conversation.id)

    if (!media?.id) {
      await logMessage(conversation.id, 'inbound', `[${message.type} received, but no media id]`)
      return
    }

    const downloaded = await downloadMedia(media.id)
    if (!downloaded) {
      await logMessage(conversation.id, 'inbound', `[${message.type} received, but download failed]`)
      await flagForHuman(conversation.id, `A ${message.type} came in but couldn't be downloaded automatically — check WhatsApp directly.`)
      return
    }

    const url = await uploadWhatsappMedia(downloaded.buffer, downloaded.mimeType, conversation.id)
    const label = message.type === 'image' ? '📷 Image' : '📎 Document'
    await logMessage(
      conversation.id,
      'inbound',
      url ? `[${label}] ${url}${media.caption ? ` — "${media.caption}"` : ''}` : `[${label} received, storage failed]`
    )

    const ack = "Got it, thanks! 🙌"
    await dispatchMessage(conversation.id, phone, ack, '10.14_media_ack', undefined, conversation.language)
    return
  }

  if (message.type !== 'text') return  // ignore other types (audio, location, statuses) for now

  const text = message.text?.body ?? ''

  const conversation = await getOrCreateConversation(phone, firstName)
  await touchInbound(conversation.id)
  await logMessage(conversation.id, 'inbound', text)

  // Section 4 — detect Japanese and persist it for future messages. Also
  // used for THIS message's reply below, so even a client's very first
  // message (before the flag is saved) gets a translated response instead
  // of waiting until the next round-trip.
  await detectAndSetLanguage(conversation.id, conversation.language, text)
  const language: 'en' | 'de' | 'ja' =
    conversation.language === 'ja' || looksJapanese(text) ? 'ja' :
    conversation.language === 'de' || looksGerman(text) ? 'de' :
    'en'

  // ────────────────────────────────────────────────────────────────────
  // Section 10.1+10.2 — combined into a single opening message. Testing
  // showed the two-step "ask if they've done a return before, wait, then
  // pitch" flow didn't actually improve conversion — it just added a
  // round-trip. Goes straight from hello to the form now.
  // ────────────────────────────────────────────────────────────────────
  if (conversation.stage === 'opening_sent' && !conversation.lastOutboundAt) {
    // Brand new conversation, we haven't said anything yet.
    // Line 1 (name) is fixed. Line 2 is personalised to what they actually
    // wrote, via a tightly-scoped AI call — see ai-personalize.ts for the
    // guardrails. Everything after that is always the fixed script.
    const greetingName = firstName || 'there'
    const ackLine = await personalizeOpeningLine(text)
    const opening =
      `Hey ${greetingName}! 😊\n${ackLine}\n` +
      "Here's a 2-minute form so we can check your eligibility and estimate your tax refund:\n" +
      'https://workingholidaytax.com.au/tax-form\n' +
      "Our fee is $220 and only applies if you're eligible for a tax refund.\n" +
      "We've helped 350+ backpackers from 45+ countries, so you're in good hands 🙌🏽"
    await dispatchMessage(conversation.id, phone, opening, '10.1_10.2_combined_opening', { stage: 'pitch_sent' }, language)
    return
  }

  if (conversation.stage === 'pitch_sent' || conversation.stage === 'abn_pending') {
    const lower = text.toLowerCase()

    // ────────────────────────────────────────────────────────────────────
    // Complex split-year / visa-transition residency questions (e.g.
    // "I was on a working holiday visa, got sponsored 4 months later, is
    // that first period considered resident?"). Learned from a real
    // incident: this class of question is easy to mistake for the simple
    // myGov/self-lodge flow, but it needs individual senior-agent
    // assessment every time — never a script, never a knowledge-base
    // match, no matter how similar a past question looked. Checked first,
    // before anything else in this block, and skips the knowledge base
    // entirely on purpose.
    // ────────────────────────────────────────────────────────────────────
    const COMPLEX_RESIDENCY_TRIGGER = /\b(sponsor(ed|ship)? visa|visa (changed|switched|transition|status change)|before (my|i) (got|received|had) (my )?(visa|sponsorship)|part.?year resident|split.?year|first \d+ months?.{0,20}(resident|residency)|resident for (part|the first))\b/i
    if (COMPLEX_RESIDENCY_TRIGGER.test(text)) {
      const holding = "Great question! Let me just double check that for you and I'll get right back to you 🙌"
      await dispatchMessage(conversation.id, phone, holding, '10.14_holding_message', undefined, language)
      await flagForHuman(conversation.id, `Complex visa-transition / split-year residency question — needs senior tax agent review, do not use a standard script: "${text.slice(0, 200)}"`)
      return
    }

    // ────────────────────────────────────────────────────────────────────
    // Section 10.6 — self-lodging / residency check (red flag). Checked
    // BEFORE anything else in this block, per the role doc: this trumps
    // the ABN flow because it can end the conversation entirely.
    //
    // The two classifier calls below (classifyLodgeIntent /
    // classifyResidencyAnswer) ONLY return a category label — never
    // client-facing text. Every reply the client actually sees is still
    // one of the fixed scripts below. "unclear" always falls through to a
    // human instead of guessing on something that decides eligibility.
    // ────────────────────────────────────────────────────────────────────
    if (conversation.residencyCheckResult === 'awaiting_intent') {
      const intent = await classifyLodgeIntent(text)

      if (intent === 'self_lodge') {
        const closing =
          'No worries at all! Our service is exclusive to clients who lodge with us, ' +
          'but all the info you need is publicly available on the ATO website.\n' +
          'Wishing you the best of luck! 🙌'
        await dispatchMessage(conversation.id, phone, closing, '10.6_self_lodge_close', {
          stage: 'not_relevant',
          extra: { is_self_lodger: true, residency_check_result: 'self_lodge' },
        }, language)
        return
      }

      if (intent === 'use_service') {
        const questions =
          "Okay, let's work through this together - I'll ask you a few quick questions, just answer yes or no 🙂\n" +
          'You hold a passport from one of the NDA countries: United Kingdom, Germany, Japan, Chile, Finland, Israel, Norway, Turkey.\n' +
          'Is your ordinary place of residence in Australia?\n' +
          'Do you have an intention to live in Australia?\n' +
          'Have you established ongoing ties to Australia, such as a home, ongoing employment, or personal connections?'
        await dispatchMessage(conversation.id, phone, questions, '10.6_residency_questions', {
          stage: conversation.stage,
          extra: { residency_check_result: 'awaiting_answers' },
        }, language)
        return
      }

      // Unclear — don't guess on something that decides eligibility.
      await sendHoldingMessageAndFlag(conversation.id, phone, text, language)
      return
    }

    if (conversation.residencyCheckResult === 'awaiting_answers') {
      const answer = await classifyResidencyAnswer(text)

      if (answer === 'all_yes') {
        const msg =
          'This looks like you might be a tax resident for tax purposes! Great, let\u2019s fill out the form so we can check everything properly:\n' +
          'https://workingholidaytax.com.au/tax-form'
        await dispatchMessage(conversation.id, phone, msg, '10.6_resident_result', {
          stage: conversation.stage,
          extra: { residency_check_result: 'resident' },
        }, language)
        return
      }

      if (answer === 'not_all_yes') {
        const msg = "Unfortunately, this looks like you're not a tax resident for tax purposes, so you wouldn't be eligible for a tax refund."
        await dispatchMessage(conversation.id, phone, msg, '10.6_non_resident_result', {
          stage: 'not_relevant',
          extra: { residency_check_result: 'non_resident' },
        }, language)
        return
      }

      // Unclear — same rule: fall through to a human, never guess.
      await sendHoldingMessageAndFlag(conversation.id, phone, text, language)
      return
    }

    // ────────────────────────────────────────────────────────────────────
    // myGov — deliberately simple, on purpose. This came up as too nuanced
    // to safely script or classify (real client replies didn't fit either
    // "wants full service" or "wants estimate" cleanly), so every myGov
    // mention just goes straight to a human. No scripted reply, no
    // classification — the tax agent decides case by case.
    // ────────────────────────────────────────────────────────────────────
    const MYGOV_TRIGGER = /\bmy ?gov\b/i
    if (MYGOV_TRIGGER.test(text)) {
      await sendHoldingMessageAndFlag(conversation.id, phone, text, language)
      return
    }

    // No residency flow in progress yet — check whether THIS message is a
    // new trigger for one. Keyword-based on purpose (see the ABN section
    // below): this only decides whether to open the flow, it doesn't
    // author anything the client reads.
    const RESIDENCY_TRIGGER = /\b(tax resident|lodge (it |this )?myself|lodge on my own|do my own (tax|return)|file (it )?myself)\b/i
    if (RESIDENCY_TRIGGER.test(text)) {
      const clarify = 'Just to check - are you planning to lodge this yourself, or would you like to use our service?'
      await dispatchMessage(conversation.id, phone, clarify, '10.6_clarify_intent', {
        stage: conversation.stage,
        extra: { residency_check_result: 'awaiting_intent' },
      }, language)
      return
    }

    // ────────────────────────────────────────────────────────────────────
    // ABN income follow-up — this is the client's answer to the 4 questions
    // sent when has_abn was first set. Classifies "no income yet" vs "has
    // income" (Section 10.3's Ready-tagging rule) — again, only a label,
    // never client-facing text.
    // ────────────────────────────────────────────────────────────────────
    if (conversation.stage === 'abn_pending' && conversation.hasAbn && conversation.abnIncomeConfirmed === null) {
      const incomeStatus = await classifyAbnIncome(text)

      if (incomeStatus === 'no_income_yet') {
        const msg = "Perfect, thanks for confirming! Once you complete the form, we'll take it from there 🙌"
        await dispatchMessage(conversation.id, phone, msg, '10.3_abn_no_income_ack', {
          stage: 'abn_pending',
          extra: { abn_income_confirmed: false },
        }, language)
        return
      }

      if (incomeStatus === 'has_income') {
        const msg =
          "Thanks for that! Since you've got income from the ABN, please also send through your receipts or invoices " +
          "for that income and any expenses when you get a chance - we'll need those before we can finalise things 🙌"
        await dispatchMessage(conversation.id, phone, msg, '10.3_abn_has_income_ack', {
          stage: 'abn_pending',
          extra: { abn_income_confirmed: true },
        }, language)
        return
      }

      // Unclear — same rule as everywhere else: don't guess, ask a human.
      await sendHoldingMessageAndFlag(conversation.id, phone, text, language)
      return
    }

    // ────────────────────────────────────────────────────────────────────
    // Section 10.3 — ABN detection. Deliberately keyword-based, not AI:
    // this decides which SCRIPT gets sent (a factual branch), not what to
    // SAY, so there's no risk of an AI-authored reply going out. Anything
    // ambiguous falls through to the Section 8/9 "new/undefined question"
    // handling below instead of guessing.
    // ────────────────────────────────────────────────────────────────────
    const mentionsAbn = /\babn\b/.test(lower)
    const mentionsUber = /\buber\b/.test(lower)

    if (mentionsAbn && conversation.stage === 'pitch_sent') {
      const abnQuestions =
        "Since you've got ABN as well, our fee for this return is $385 (covers both the TFN and ABN side).\n" +
        'Just a few quick questions so we can sort out your return properly:\n' +
        '- What kind of work did you do under the ABN?\n' +
        '- What was your total income from it?\n' +
        '- Do you have any invoices or records of that income?\n' +
        '- Did you have any expenses? If so, do you have receipts or invoices for them?'
      await dispatchMessage(conversation.id, phone, abnQuestions, '10.3_abn_questions', {
        stage: 'abn_pending',
        extra: { has_abn: true },
      }, language)

      if (mentionsUber) {
        const uberQuestions =
          'Since you worked with Uber, could you send us your full Uber tax reports?\n' +
          'Also, a few details about the car:\n' +
          '- Which car did you use?\n' +
          '- What type of car is it?\n' +
          "- What's the number plate?\n" +
          '- When did you buy it, and for how much?'
        await dispatchMessage(conversation.id, phone, uberQuestions, '10.3_uber_subcase', {
          stage: 'abn_pending',
          extra: { is_uber: true },
        }, language)
      }
      return
    }

    // Anything else here (an ABN follow-up reply, or an unrelated message)
    // isn't something the bot should interpret on its own — see Section 8.
    await sendHoldingMessageAndFlag(conversation.id, phone, text, language)
    return
  }

  // Anything past this isn't automated yet — falls through silently for
  // now. Next increment: creating the real crm_tasks row automatically
  // once a client reaches "ready" via chat alone (today this only happens
  // through the website form — see linkFormSubmissionToConversation).
}

/**
 * Shared fallback for Section 8/9 ("new/undefined question"): first checks
 * the knowledge base for a saved answer to something similar (Section 9's
 * "every question gets asked once" loop). Only if nothing matches does it
 * fall back to the holding message + human flag, exactly as before this
 * feature existed. Both paths still go through dispatchMessage, so shadow
 * mode is respected even here.
 */
async function sendHoldingMessageAndFlag(conversationId: string, phone: string, clientText: string, language: 'en' | 'de' | 'ja' = 'en'): Promise<void> {
  const kbMatch = await findKnowledgeBaseAnswer(clientText)
  if (kbMatch) {
    await dispatchMessage(conversationId, phone, kbMatch.answer, `kb_match_${kbMatch.id}`, undefined, language)
    return
  }

  const holding = "Great question! Let me just double check that for you and I'll get right back to you 🙌"
  await dispatchMessage(conversationId, phone, holding, '10.14_holding_message', undefined, language)
  await flagForHuman(conversationId, `Message needs manual review: "${clientText.slice(0, 200)}"`)
}

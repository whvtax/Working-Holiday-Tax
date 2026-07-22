// src/lib/wa-store.ts
// ──────────────────────────────────────────────────────────────────────────
// Data access layer for WhatsApp conversation state (wa_conversations,
// wa_messages). Mirrors the style of src/lib/db.ts, kept separate so the
// existing CRM data layer is untouched.
// ──────────────────────────────────────────────────────────────────────────

import crypto from 'crypto'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { getSupabase } from '@/lib/supabase'
import { sendTextMessage } from '@/lib/whatsapp'
import { translateToNaturalJapanese, translateToNaturalGerman, looksJapanese, looksGerman } from '@/lib/translate'

export type ConversationStage =
  | 'opening_sent'
  | 'pitch_sent'
  | 'reminder_1_sent'
  | 'reminder_2_sent'
  | 'form_completed'
  | 'abn_pending'
  | 'ready'
  | 'not_relevant'
  | 'urgent'

export interface Conversation {
  id: string
  phone: string
  firstName: string
  language: 'en' | 'de' | 'ja'
  stage: ConversationStage
  hasAbn: boolean | null
  abnIncomeConfirmed: boolean | null
  isUber: boolean | null
  residencyCheckResult: string | null
  isSelfLodger: boolean | null
  crmTaskId: string | null
  lastInboundAt: string
  lastOutboundAt: string | null
  needsHuman: boolean
  escalationReason: string | null
}

/**
 * Finds the conversation for a phone number, or creates a new one if this
 * is their first message. Always call this first when a webhook event
 * comes in — every downstream step (state machine, reminders) reads off
 * this row.
 */
export async function getOrCreateConversation(phone: string, firstName: string): Promise<Conversation> {
  const sb = getSupabase()

  const { data: existing } = await sb
    .from('wa_conversations')
    .select('*')
    .eq('phone', phone)
    .maybeSingle()

  if (existing) return mapRow(existing)

  const id = `WA-${crypto.randomUUID()}`
  const { data: created, error } = await sb
    .from('wa_conversations')
    .insert({ id, phone, first_name: firstName || '' })
    .select()
    .single()

  if (error) throw new Error(`Failed to create conversation: ${error.message}`)
  return mapRow(created)
}

export async function touchInbound(conversationId: string): Promise<void> {
  const sb = getSupabase()
  await sb
    .from('wa_conversations')
    .update({ last_inbound_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq('id', conversationId)
}

export async function updateStage(
  conversationId: string,
  stage: ConversationStage,
  extra: Record<string, unknown> = {}
): Promise<void> {
  const sb = getSupabase()
  const timestampField: Record<string, string> = {
    opening_sent:     'opening_sent_at',
    pitch_sent:        'pitch_sent_at',
    reminder_1_sent:   'reminder_1_sent_at',
    reminder_2_sent:   'reminder_2_sent_at',
  }
  const patch: Record<string, unknown> = { stage, updated_at: new Date().toISOString(), ...extra }
  const tsField = timestampField[stage]
  if (tsField) patch[tsField] = new Date().toISOString()

  const { error } = await sb.from('wa_conversations').update(patch).eq('id', conversationId)
  if (error) throw new Error(`Failed to update conversation stage: ${error.message}`)
}

export async function flagForHuman(conversationId: string, reason: string): Promise<void> {
  const sb = getSupabase()
  await sb
    .from('wa_conversations')
    .update({ needs_human: true, escalation_reason: reason, stage: 'urgent', updated_at: new Date().toISOString() })
    .eq('id', conversationId)
}

/**
 * Logs a message (either direction) to the transcript. `scriptKey` should
 * match the section numbers in the role doc (e.g. '10.2') for outbound
 * scripted messages, so the CRM can show which script was used — leave
 * null for free-text/human replies.
 */
export async function logMessage(
  conversationId: string,
  direction: 'inbound' | 'outbound',
  body: string,
  scriptKey: string | null = null,
  metaMessageId: string | null = null
): Promise<void> {
  const sb = getSupabase()
  await sb.from('wa_messages').insert({
    conversation_id: conversationId,
    direction,
    body,
    script_key: scriptKey,
    meta_message_id: metaMessageId,
  })

  if (direction === 'outbound') {
    await sb
      .from('wa_conversations')
      .update({ last_outbound_at: new Date().toISOString() })
      .eq('id', conversationId)
  }
}

export async function getConversationsByStage(stage: ConversationStage, limit = 200): Promise<Conversation[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('wa_conversations')
    .select('*')
    .eq('stage', stage)
    .order('last_inbound_at', { ascending: true })
    .limit(limit)
  if (error) throw new Error(`Failed to list conversations: ${error.message}`)
  return (data ?? []).map(mapRow)
}

function mapRow(row: Record<string, unknown>): Conversation {
  return {
    id:                     row.id as string,
    phone:                  row.phone as string,
    firstName:              row.first_name as string,
    language:               (row.language as 'en' | 'de' | 'ja') ?? 'en',
    stage:                  row.stage as ConversationStage,
    hasAbn:                 row.has_abn as boolean | null,
    abnIncomeConfirmed:      row.abn_income_confirmed as boolean | null,
    isUber:                 row.is_uber as boolean | null,
    residencyCheckResult:    row.residency_check_result as string | null,
    isSelfLodger:            row.is_self_lodger as boolean | null,
    crmTaskId:               row.crm_task_id as string | null,
    lastInboundAt:           row.last_inbound_at as string,
    lastOutboundAt:          row.last_outbound_at as string | null,
    needsHuman:              Boolean(row.needs_human),
    escalationReason:        row.escalation_reason as string | null,
  }
}

/**
 * The ONE place every automated reply goes through — this is what makes
 * shadow mode possible. Checks wa_system_status.shadow_mode:
 *   - ON  (default): queues the message in wa_pending_messages instead of
 *     sending it. Nothing reaches the client until a human approves it in
 *     the CRM. This is the safe starting point.
 *   - OFF: sends immediately and logs it, exactly as before this feature
 *     existed.
 *
 * Every automated send in the webhook should call this instead of
 * sendTextMessage() directly.
 */
export async function dispatchMessage(
  conversationId: string,
  phone: string,
  text: string,
  scriptKey: string | null = null,
  stageUpdate?: { stage: ConversationStage; extra?: Record<string, unknown> },
  language: 'en' | 'de' | 'ja' = 'en'
): Promise<{ ok: boolean; pending: boolean; error?: string }> {
  const sb = getSupabase()

  // Section 4 of the role doc: Japanese-speaking clients get a natural
  // translation of the same fixed script, never a different message. This
  // happens before shadow mode queues or sends it, so the tax agent
  // reviewing the queue sees exactly what the client will receive.
  const outboundText =
    language === 'ja' ? await translateToNaturalJapanese(text) :
    language === 'de' ? await translateToNaturalGerman(text) :
    text

  let shadowMode = true // fail-safe default: if we can't check, don't auto-send
  try {
    const { data } = await sb.from('wa_system_status').select('shadow_mode').eq('id', 1).maybeSingle()
    if (data && typeof data.shadow_mode === 'boolean') shadowMode = data.shadow_mode
  } catch (err) {
    console.error('[dispatchMessage] failed to read shadow_mode, defaulting to ON', err)
  }

  if (shadowMode) {
    const { error } = await sb.from('wa_pending_messages').insert({
      conversation_id: conversationId,
      phone,
      proposed_text: outboundText,
      script_key: scriptKey,
      next_stage_json: stageUpdate ?? null,
    })
    if (error) return { ok: false, pending: true, error: error.message }
    return { ok: true, pending: true }
  }

  const result = await sendTextMessage(phone, outboundText)
  if (result.ok) {
    await logMessage(conversationId, 'outbound', outboundText, scriptKey, result.messageId)
    if (stageUpdate) await updateStage(conversationId, stageUpdate.stage, stageUpdate.extra)
    await tagIfCompletionMessage(conversationId, outboundText)
    return { ok: true, pending: false }
  }
  return { ok: false, pending: false, error: result.error }
}

/**
 * Checks whether an inbound message looks Japanese and, if the
 * conversation hasn't already been flagged as Japanese, marks it so —
 * every reply after that point gets translated (Section 4 of the role
 * doc). Only moves en → ja, never back, so one stray message doesn't
 * flip a client's language mid-conversation.
 */
export async function detectAndSetLanguage(conversationId: string, currentLanguage: 'en' | 'de' | 'ja', inboundText: string): Promise<void> {
  if (currentLanguage === 'ja' || currentLanguage === 'de') return

  let detected: 'ja' | 'de' | null = null
  if (looksJapanese(inboundText)) detected = 'ja'
  else if (looksGerman(inboundText)) detected = 'de'
  if (!detected) return

  const sb = getSupabase()
  await sb.from('wa_conversations').update({ language: detected, updated_at: new Date().toISOString() }).eq('id', conversationId)
}

/**
 * If a sent message matches the known "return lodged" completion script —
 * whichever channel it went out through (manual app send, CRM reply box,
 * or a future automated script) — auto-tags that conversation's
 * manual_label as "Done 2026", exactly what the tax agent would otherwise
 * set by hand. Deliberately narrow match so an unrelated message
 * mentioning similar words never mis-tags a conversation. Purely
 * additive: never touches the automated `stage` pipeline, silently does
 * nothing if the conversation isn't found.
 */
const COMPLETION_MESSAGE_MARKER = /lodged successfully/i

export async function tagIfCompletionMessage(conversationId: string, text: string): Promise<void> {
  if (!COMPLETION_MESSAGE_MARKER.test(text)) return
  const sb = getSupabase()
  await sb
    .from('wa_conversations')
    .update({ manual_label: 'done_2026', updated_at: new Date().toISOString() })
    .eq('id', conversationId)
}

export async function tagIfCompletionMessageByPhone(phone: string, text: string): Promise<void> {
  if (!COMPLETION_MESSAGE_MARKER.test(text)) return
  const sb = getSupabase()
  const { data: conversation } = await sb.from('wa_conversations').select('id').eq('phone', phone).maybeSingle()
  if (!conversation) return
  await tagIfCompletionMessage(conversation.id, text)
}

/**
 * Normalises a phone number to E.164 (e.g. +61491570156) so numbers typed
 * differently on the website form vs. WhatsApp's own format (which is what
 * the webhook stores) still match up. Defaults to AU since that's the
 * expected country for most numbers entered on the site's own AU phone
 * field — but WhatsApp numbers themselves are usually already
 * international, so this mostly matters for loosely-formatted input.
 */
export function normalizePhone(raw: string, defaultCountry: 'AU' = 'AU'): string | null {
  if (!raw) return null
  const parsed = parsePhoneNumberFromString(raw, defaultCountry)
  return parsed?.isValid() ? parsed.number : null
}

/**
 * Closes the loop between the "waiting room" and the real CRM: called once
 * a crm_tasks row has been created from a form submission (Section 10 →
 * Section 2 Phase 2 handoff in the role doc). If the phone number matches
 * an open WhatsApp conversation, tags it "ready" and links the task id so
 * the CRM tab can show "View task" instead of leaving it stranded in
 * "ABN Pending" forever.
 *
 * Deliberately tolerant of failure — this is a nice-to-have link-up, not
 * something that should ever block a form submission from succeeding.
 */
export async function linkFormSubmissionToConversation(rawPhone: string, crmTaskId: string): Promise<boolean> {
  try {
    const phone = normalizePhone(rawPhone)
    if (!phone) return false

    const sb = getSupabase()
    const { data: existing } = await sb
      .from('wa_conversations')
      .select('id, stage, has_abn, abn_income_confirmed')
      .eq('phone', phone)
      .maybeSingle()

    if (!existing) return false

    // Don't downgrade someone who's already further along (e.g. already
    // "ready" from an earlier submission, or already flagged "urgent") —
    // only move forward, never backward.
    if (existing.stage === 'ready' || existing.stage === 'urgent') {
      await sb.from('wa_conversations').update({ crm_task_id: crmTaskId, updated_at: new Date().toISOString() }).eq('id', existing.id)
      return true
    }

    // Section 10.3 rule: if there's confirmed ABN income, receipts are
    // required BEFORE moving to "Ready" — the form alone isn't enough.
    // Flag for a human to verify and move it manually instead of
    // auto-progressing on an incomplete case.
    if (existing.has_abn && existing.abn_income_confirmed === true) {
      await sb.from('wa_conversations').update({
        crm_task_id: crmTaskId,
        needs_human: true,
        escalation_reason: 'Form completed with confirmed ABN income — verify receipts/invoices before marking Ready (Section 10.3).',
        updated_at: new Date().toISOString(),
      }).eq('id', existing.id)
      return true
    }

    await sb.from('wa_conversations').update({
      stage: 'ready',
      crm_task_id: crmTaskId,
      updated_at: new Date().toISOString(),
    }).eq('id', existing.id)

    return true
  } catch (err) {
    console.error('[linkFormSubmissionToConversation]', err)
    return false
  }
}

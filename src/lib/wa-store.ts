// src/lib/wa-store.ts
// ──────────────────────────────────────────────────────────────────────────
// Data access layer for WhatsApp conversation state (wa_conversations,
// wa_messages). Mirrors the style of src/lib/db.ts, kept separate so the
// existing CRM data layer is untouched.
// ──────────────────────────────────────────────────────────────────────────

import crypto from 'crypto'
import { getSupabase } from '@/lib/supabase'

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
  language: 'en' | 'ja'
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
    language:               (row.language as 'en' | 'ja') ?? 'en',
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

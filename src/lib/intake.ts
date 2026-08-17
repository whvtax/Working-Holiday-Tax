/**
 * Two-stage intake: server-side helpers.
 *
 * Form 1 (/start) creates a task carrying only what it collected. You review
 * it, then issue a completion link; form 2 (/complete/<token>) fills in the
 * rest and the task becomes a normal tax-return submission.
 *
 * Nothing here is imported by the original /tax-form route - that path is
 * untouched and keeps working exactly as it did.
 */

import crypto from 'crypto'
import { getSupabase } from '@/lib/supabase'

/** 14 days: long enough for a holiday or a lost phone, short enough that a
 *  link sitting in WhatsApp history doesn't stay live forever. */
export const TOKEN_TTL_DAYS = 14

/** A task that form 1 created and form 2 hasn't completed yet. */
export const LEAD_TASK_TYPE = 'lead'

/**
 * 24 hex chars from a CSPRNG. Not sequential and not derived from the client
 * id - a guessable token would expose one person's intake to another.
 */
export function generateCompletionToken(): string {
  return crypto.randomBytes(12).toString('hex')
}

/** Strip spaces, dashes and dots so "432 116 890" and "432-116-890" match. */
export function normaliseTfn(tfn: string | null | undefined): string {
  // Digits only - matches the SQL backfill in migration 015 exactly, so the
  // value written here and the value computed there can never disagree.
  return (tfn ?? '').replace(/\D/g, '')
}

/**
 * Looks for an existing task with the same TFN. Returns its id, or null.
 *
 * Used to flag, never to block: the common cause of a near-match is a typo,
 * and blocking would push that person into a WhatsApp conversation - the exact
 * thing this flow exists to avoid.
 */
export async function findTaskByTfn(tfn: string, excludeId?: string): Promise<string | null> {
  const norm = normaliseTfn(tfn)
  if (!norm) return null

  const sb = getSupabase()
  const { data, error } = await sb
    .from('crm_tasks')
    .select('id')
    .eq('tfn_norm', norm)
    .order('submitted_at', { ascending: false })
    .limit(5)

  if (error || !data?.length) return null
  const hit = data.find(r => r.id !== excludeId)
  return hit ? (hit.id as string) : null
}

export type CompletionTaskState =
  | { status: 'ok'; taskId: string; firstName: string; lang: string }
  | { status: 'not_found' }
  | { status: 'expired' }
  | { status: 'used' }

/**
 * Resolves a completion token to the task behind it.
 *
 * Returns the first name only. The form asks for what's missing; it must never
 * display what's already on file, or anyone holding the link would be handed
 * that person's details.
 */
export async function resolveCompletionToken(token: string): Promise<CompletionTaskState> {
  if (!token || !/^[a-f0-9]{16,64}$/.test(token)) return { status: 'not_found' }

  const sb = getSupabase()
  const { data, error } = await sb
    .from('crm_tasks')
    .select('id, client_name, token_expires_at, token_used_at, notes')
    .eq('completion_token', token)
    .maybeSingle()

  if (error || !data) return { status: 'not_found' }
  if (data.token_used_at) return { status: 'used' }
  if (data.token_expires_at && new Date(data.token_expires_at as string) < new Date()) {
    return { status: 'expired' }
  }

  const langMatch = (data.notes as string | null)?.match(/Lang: (en|de|ja)/)

  return {
    status: 'ok',
    taskId: data.id as string,
    firstName: ((data.client_name as string) ?? '').trim().split(/\s+/)[0] ?? '',
    lang: langMatch?.[1] ?? 'en',
  }
}

/** Issues a fresh token, replacing any existing one. */
export async function issueCompletionToken(taskId: string): Promise<{ token: string; expiresAt: string }> {
  const token = generateCompletionToken()
  const expiresAt = new Date(Date.now() + TOKEN_TTL_DAYS * 24 * 60 * 60 * 1000).toISOString()

  const sb = getSupabase()
  const { error } = await sb
    .from('crm_tasks')
    .update({ completion_token: token, token_expires_at: expiresAt, token_used_at: null })
    .eq('id', taskId)
  if (error) throw error

  return { token, expiresAt }
}

/** Kills a link without issuing a new one. */
export async function revokeCompletionToken(taskId: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb
    .from('crm_tasks')
    .update({ completion_token: null, token_expires_at: null })
    .eq('id', taskId)
  if (error) throw error
}

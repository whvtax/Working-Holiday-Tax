/**
 * The marketing list.
 *
 * Every submission that carries an email is recorded here. Historically that
 * meant three routes; since the two-stage intake was removed there is one:
 * the full /tax-form (plus the standalone TFN / ABN / super forms).
 *
 * Kept in its own table rather than read off crm_tasks, because tasks get
 * marked done, archived and hard-deleted, and markTaskDone strips fields on the
 * way through. Nothing that happens to a task touches this list.
 *
 * Only ever holds a name and an email. Never a TFN, never documents.
 */

import { getSupabase } from '@/lib/supabase'

/**
 * Capture happens in the database, not here: migration 016 installs a trigger
 * on crm_tasks that records every submission carrying an email. That covers the
 * original /tax-form as well as both new forms, with no route changes, and it
 * can't be forgotten by a future form.
 *
 * This module only reads the list and handles opt-outs.
 */

/**
 * Mirrors crm_norm_email() in migration 017 exactly.
 *
 * Used so that unsubscribing "John.Smith+tax@Gmail.com" finds the row stored
 * as "johnsmith@gmail.com". If this ever diverges from the SQL version, opt-outs
 * start silently missing their target - change both together.
 */
export function normaliseEmail(addr: string | null | undefined): string {
  const clean = (addr ?? '').trim().toLowerCase()
  if (!clean.includes('@')) return clean

  let [local, domain] = [clean.slice(0, clean.indexOf('@')), clean.slice(clean.indexOf('@') + 1)]
  local = local.split('+')[0]

  // Dots are ignored by Gmail only; applying it everywhere would merge
  // genuinely different people.
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.replace(/\./g, '')
    domain = 'gmail.com'
  }
  return `${local}@${domain}`
}

/**
 * Mirrors crm_norm_phone() in migration 019 exactly.
 *
 * Digits only, with the 00 international prefix treated as +. Anything shorter
 * than 7 digits is returned empty: too little to identify anyone, and matching
 * on it would merge unrelated people. Change this and the SQL together.
 */
export function normalisePhone(num: string | null | undefined): string {
  let digits = (num ?? '').replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('00')) digits = digits.slice(2)
  return digits.length < 7 ? '' : digits
}

export type LeadRow = {
  email: string
  fullName: string
  whatsapp: string
  source: string
  lang: string
  unsubscribed: boolean
  createdAt: string
}

/** Newest first. Used by the CRM's Leads tab and its CSV export. */
export async function getLeads(limit = 5000): Promise<LeadRow[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('crm_leads')
    .select('email, full_name, whatsapp, source, lang, unsubscribed, created_at')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) throw error

  return (data ?? []).map(r => ({
    email:        (r.email as string) ?? '',
    fullName:     (r.full_name as string) ?? '',
    whatsapp:     (r.whatsapp as string) ?? '',
    source:       (r.source as string) ?? '',
    lang:         (r.lang as string) ?? 'en',
    unsubscribed: (r.unsubscribed as boolean) ?? false,
    createdAt:    (r.created_at as string) ?? '',
  }))
}

/** Opt someone out. The row stays, so a later submission can't re-add them. */
export async function setLeadUnsubscribed(email: string, value: boolean): Promise<void> {
  const sb = getSupabase()
  // Matched on the normalised address, so an opt-out lands on the right row
  // regardless of how the address was typed.
  const { error } = await sb
    .from('crm_leads')
    .update({ unsubscribed: value, updated_at: new Date().toISOString() })
    .eq('email_norm', normaliseEmail(email))
  if (error) throw error
}

// src/lib/db.ts
// ──────────────────────────────────────────────────────────────────────────
// CRM data access layer - Supabase (PostgreSQL) implementation
// ──────────────────────────────────────────────────────────────────────────

import { getSupabase } from '@/lib/supabase'
import { deleteFiles } from '@/lib/upload'
import crypto from 'crypto'

// ── Types ──────────────────────────────────────────────────────────────────

export type TaxReturn     = { year: string; refundAmount: number; type: 'refund' | 'owed'; completedAt: string }
export type SuperReturn   = { year: string; amount: number; completedAt: string }
export type ServiceRecord = { done: boolean; completedAt: string; notes: string }
// 'lead' = form 1 submitted, form 2 not yet completed (see lib/intake.ts).
// It becomes 'tax-return' the moment form 2 lands, so a finished record is
// identical to one from the original /tax-form.
export type TaskType      = 'tax-return' | 'super' | 'tfn' | 'abn' | 'lead'
export type ReviewStatus  = 'pending' | 'approved' | 'rejected'

export type ClientRecord = {
  id: string; fullName: string; dob: string; whatsapp: string
  email: string; country: string; howHeard: string; notes: string; createdAt: string
  taxReturns: TaxReturn[]; superReturns: SuperReturn[]
  tfnService: ServiceRecord; abnService: ServiceRecord
  archived: boolean; yearlyCheckins: Record<string, boolean>
  referred_by?: string | null
}

export type Task = {
  id: string; clientId: string; clientName: string; taskType: TaskType
  whatsapp: string; email: string; country: string; dob: string
  taxYear: string; submittedAt: string; done: boolean
  address: string; tfn: string; bankDetails: string; primaryJob: string
  marital: string; taxStatus: string; howHeard: string; auPhone: string; notes: string
  fileUrls: string[]; reviewStatus: ReviewStatus; reviewerNote: string; reviewedAt: string
  refCode?: string
}

// ── DB init ────────────────────────────────────────────────────────────────
// With Supabase, tables are pre-created via SQL migrations.
// initDb() is a no-op kept for backwards compatibility.

export async function initDb(): Promise<void> {
  return
}

// ── Row mappers ────────────────────────────────────────────────────────────

function parse<T>(s: unknown, fallback: T): T {
  if (s === null || s === undefined) return fallback
  if (typeof s === 'object') return s as T
  try { return JSON.parse(s as string) as T } catch { return fallback }
}

function toClient(r: Record<string, unknown>): ClientRecord {
  return {
    id:             r.id as string,
    fullName:       (r.full_name as string) ?? '',
    dob:            (r.dob as string) ?? '',
    whatsapp:       (r.whatsapp as string) ?? '',
    email:          (r.email as string) ?? '',
    country:        (r.country as string) ?? '',
    howHeard:       (r.how_heard as string) ?? '',
    notes:          (r.notes as string) ?? '',
    createdAt:      (r.created_at as string) ?? '',
    taxReturns:     parse(r.tax_returns, []),
    superReturns:   parse(r.super_returns, []),
    tfnService:     parse(r.tfn_service, { done: false, completedAt: '', notes: '' }),
    abnService:     parse(r.abn_service, { done: false, completedAt: '', notes: '' }),
    archived:       (r.archived as boolean) ?? false,
    yearlyCheckins: parse(r.yearly_checkins, {}),
    referred_by:    (r.referred_by as string | null) ?? null,
  }
}

function toTask(r: Record<string, unknown>): Task {
  return {
    id:           r.id as string,
    clientId:     (r.client_id as string) ?? '',
    clientName:   (r.client_name as string) ?? '',
    taskType:     ((r.task_type as TaskType) ?? 'tax-return'),
    whatsapp:     (r.whatsapp as string) ?? '',
    email:        (r.email as string) ?? '',
    country:      (r.country as string) ?? '',
    dob:          (r.dob as string) ?? '',
    taxYear:      (r.tax_year as string) ?? '',
    submittedAt:  (r.submitted_at as string) ?? '',
    done:         (r.done as boolean) ?? false,
    address:      (r.address as string) ?? '',
    tfn:          (r.tfn as string) ?? '',
    bankDetails:  (r.bank_details as string) ?? '',
    primaryJob:   (r.primary_job as string) ?? '',
    marital:      (r.marital as string) ?? '',
    taxStatus:    (r.tax_status as string) ?? '',
    howHeard:     (r.how_heard as string) ?? '',
    auPhone:      (r.au_phone as string) ?? '',
    notes:        (r.notes as string) ?? '',
    fileUrls:     parse(r.file_urls ?? '[]', []),
    reviewStatus: ((r.review_status as string) ?? 'pending') as ReviewStatus,
    reviewerNote: (r.reviewer_note as string) ?? '',
    reviewedAt:   (r.reviewed_at as string) ?? '',
    refCode:      (r.ref_code as string) || undefined,
  }
}

// ── Audit trail ──────────────────────────────────────────────────────────
// Best-effort, fail-safe record of sensitive/destructive CRM actions. NEVER
// throws and NEVER blocks the underlying operation - if the crm_audit table
// doesn't exist yet (migration 003 not run) or the write fails, it's swallowed.
// Single-admin system, so actor defaults to 'crm-admin'.
export async function logAudit(
  action: string,
  targetId: string,
  detail = '',
  actor = 'crm-admin',
): Promise<void> {
  try {
    const sb = getSupabase()
    await sb.from('crm_audit').insert({
      actor,
      action,
      target_id: targetId ?? '',
      detail: typeof detail === 'string' ? detail.slice(0, 2000) : '',
    })
  } catch (err) {
    console.error('[audit] failed to record', action, err)
  }
}



export async function findExistingClient(email: string, whatsapp: string): Promise<{ id: string } | null> {
  const sb = getSupabase()
  const norm = (s: string) => (s ?? '').trim().toLowerCase().replace(/\s+/g, '')
  // Escape ILIKE wildcards so a value like "%@%" can't match unrelated clients.
  const escapeLike = (s: string) => s.replace(/[\\%_]/g, ch => '\\' + ch)
  const e = escapeLike(norm(email))
  const w = escapeLike(norm(whatsapp))
  if (!e && !w) return null

  // Search crm_clients - case-insensitive match via ilike on each field separately.
  // Run all queries in parallel; the first non-empty result wins. This avoids
  // PostgREST `or()` syntax issues with special characters in emails (e.g. '+'),
  // and is faster than the previous sequential await loop.
  const clientQueries: PromiseLike<{ data: { id: string }[] | null }>[] = []
  if (e) clientQueries.push(sb.from('crm_clients').select('id').ilike('email', e).limit(1))
  if (w) clientQueries.push(sb.from('crm_clients').select('id').ilike('whatsapp', w).limit(1))
  const clientResults = await Promise.all(clientQueries)
  for (const res of clientResults) {
    if (res.data && res.data.length > 0) return { id: res.data[0].id }
  }

  // Search crm_tasks (active only) - same parallel strategy
  const taskQueries: PromiseLike<{ data: { client_id: string }[] | null }>[] = []
  if (e) taskQueries.push(sb.from('crm_tasks').select('client_id').eq('done', false).ilike('email', e).limit(1))
  if (w) taskQueries.push(sb.from('crm_tasks').select('client_id').eq('done', false).ilike('whatsapp', w).limit(1))
  const taskResults = await Promise.all(taskQueries)
  for (const res of taskResults) {
    if (res.data && res.data.length > 0) return { id: res.data[0].client_id }
  }

  return null
}

// ── Tasks ──────────────────────────────────────────────────────────────────

export async function getAllTasks(limit = 100, offset = 0): Promise<Task[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('crm_tasks')
    .select('*')
    .order('submitted_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return (data ?? []).map(toTask)
}

export async function countTasks(): Promise<number> {
  const sb = getSupabase()
  const { count, error } = await sb.from('crm_tasks').select('*', { count: 'exact', head: true })
  if (error) throw error
  return count ?? 0
}

export async function getTask(id: string): Promise<Task | null> {
  const sb = getSupabase()
  const { data, error } = await sb.from('crm_tasks').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? toTask(data) : null
}

export async function createTask(data: Omit<Task, 'id' | 'done'>): Promise<Task> {
  const sb = getSupabase()
  const id = `TASK-${crypto.randomUUID()}`
  const row = {
    id,
    client_id: data.clientId,
    client_name: data.clientName,
    task_type: data.taskType ?? 'tax-return',
    whatsapp: data.whatsapp,
    email: data.email,
    country: data.country,
    dob: data.dob,
    tax_year: data.taxYear,
    submitted_at: data.submittedAt,
    done: false,
    address: data.address,
    tfn: data.tfn,
    bank_details: data.bankDetails,
    primary_job: data.primaryJob,
    marital: data.marital,
    tax_status: data.taxStatus,
    how_heard: data.howHeard,
    au_phone: data.auPhone,
    notes: data.notes,
    file_urls: JSON.stringify(data.fileUrls ?? []),
    ref_code: data.refCode ?? null,
    review_status: 'pending',
    reviewer_note: '',
    reviewed_at: '',
  }
  const { error } = await sb.from('crm_tasks').insert(row)
  if (error) throw error
  return { ...data, id, done: false }
}

export async function markTaskDone(id: string): Promise<void> {
  const sb = getSupabase()
  const task = await getTask(id)
  if (!task) return
  if (task.fileUrls?.length) await deleteFiles(task.fileUrls)

  // Strip sensitive PII from notes - keep only admin notes (📞 Called, ✉️ Emailed, etc.)
  // Remove: Passport No, Bank details, Home Country Address, Gender, ABN numbers, Expenses, Declarations, Returning client
  const cleanedNotes = (task.notes ?? '')
    .split(' | ')
    .filter(p =>
      !p.match(/^(Passport No:|Super Funds:|Super Fund Name:|Super Member Number:|Super Opening Date:|Home Country Address:|Gender:|ABN:|ABN Number:|ABN Income:|ABN Work:|Expenses:|💼 TFN Invoices|🏢 ABN Invoices|→|I confirm|I declare|I have read|Working Holiday)/i)
      && p !== '🔄 Returning client'
    )
    .filter(Boolean)
    .join(' | ')
    .trim()

  const { error } = await sb.from('crm_tasks').update({
    done: true,
    address: '', tfn: '', bank_details: '',
    primary_job: '', marital: '', au_phone: '', file_urls: '[]',
    notes: cleanedNotes,
    reviewer_note: '',
  }).eq('id', id)
  if (error) throw error
}

export async function updateTaskNotes(id: string, notes: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb.from('crm_tasks').update({ notes }).eq('id', id)
  if (error) throw error
}

// Staff-only scratch note on a lead (e.g. "waiting on a clearer passport photo").
// Deliberately separate from `notes` (which stores the client's submitted form
// data) so editing one never risks clobbering the other. It's only ever shown
// on pending leads - once a lead is marked Done the locked view doesn't
// surface it, so it's effectively gone the moment the client's work is done.
export async function updateTaskReviewerNote(id: string, reviewerNote: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb.from('crm_tasks').update({ reviewer_note: reviewerNote }).eq('id', id)
  if (error) throw error
}

export async function deleteTaskAndArchive(taskId: string): Promise<void> {
  const sb = getSupabase()
  const task = await getTask(taskId)
  if (!task) return

  const cleanedNotes = (task.notes ?? '')
    .split(' | ')
    .filter(p =>
      !p.match(/^(Passport No:|Super Funds:|Super Fund Name:|Super Member Number:|Super Opening Date:|Home Country Address:|Gender:|ABN:|ABN Number:|ABN Income:|ABN Work:|Expenses:|💼 TFN Invoices|🏢 ABN Invoices|→|I confirm|I declare|I have read|Working Holiday)/i)
      && p !== '🔄 Returning client'
      && !p.startsWith('📝 ')
    )
    .filter(Boolean)
    .join('\n')
    .trim()

  // Upsert client (merge behavior preserved from old code)
  const existing = await getClientById(task.clientId)

  // Determine which service this task represents and update history accordingly
  const today = new Date().toISOString().slice(0, 10)
  const refundMatch = (task.notes||'').match(/\$\s*([\d,]+(?:\.\d+)?)/);
  const refundAmount = refundMatch ? parseFloat(refundMatch[1].replace(/,/g,'')) : 0

  if (existing) {
    const newHowHeard = existing.howHeard === '' && task.howHeard !== '' ? task.howHeard : existing.howHeard
    const newNotes = cleanedNotes !== '' && !existing.notes.includes(cleanedNotes)
      ? `${existing.notes}\n${cleanedNotes}`.trim()
      : existing.notes

    // Build update object based on task type
    const updates: Record<string, unknown> = {
      how_heard: newHowHeard,
      notes: newNotes,
    }

    // Carry referral partner from task to client (only set if not already set)
    if (task.refCode && !existing.referred_by) {
      try {
        const { data: partner } = await sb
          .from('partners')
          .select('id')
          .eq('code', task.refCode)
          .maybeSingle()
        if (partner?.id) updates.referred_by = partner.id
      } catch { /* non-blocking */ }
    }

    // Add task to appropriate service history
    if (task.taskType === 'tfn') {
      updates.tfn_service = JSON.stringify({ done: true, completedAt: today, notes: '' })
    } else if (task.taskType === 'abn') {
      updates.abn_service = JSON.stringify({ done: true, completedAt: today, notes: '' })
    } else if (task.taskType === 'tax-return' && task.taxYear) {
      // Support multiple years (comma-separated)
      const years = task.taxYear.split(',').map(y => y.trim()).filter(Boolean)
      // Build a new list: keep existing entries whose year is NOT in the incoming set,
      // then add a fresh entry per incoming year. Fixes a bug where mutating the array
      // inside the forEach loop caused all but the last entry to be lost.
      const yearSet = new Set(years)
      const taxReturns: TaxReturn[] = (existing.taxReturns || []).filter(r => !yearSet.has(r.year))
      const checkins: Record<string, boolean> = { ...(existing.yearlyCheckins || {}) }
      for (const year of years) {
        taxReturns.push({
          year,
          type: refundAmount >= 0 ? 'refund' as const : 'owed' as const,
          refundAmount: Math.abs(refundAmount),
          completedAt: today,
        })
        checkins[year] = true
      }
      updates.tax_returns = JSON.stringify(taxReturns)
      updates.yearly_checkins = JSON.stringify(checkins)
    } else if (task.taskType === 'super') {
      const years = task.taxYear ? task.taxYear.split(',').map(y => y.trim()).filter(Boolean) : [today.slice(0,4)]
      // Same fix as above: build new list outside the loop so multiple years all persist.
      const yearSet = new Set(years)
      const superReturns: SuperReturn[] = (existing.superReturns || []).filter(x => !yearSet.has(x.year))
      for (const year of years) {
        superReturns.push({
          year,
          amount: refundAmount,
          completedAt: today,
        })
      }
      updates.super_returns = JSON.stringify(superReturns)
    }

    await sb.from('crm_clients').update(updates).eq('id', task.clientId)
  } else {
    // New client - create with this task as first service
    const initialUpdates: Record<string, unknown> = {
      id: task.clientId,
      full_name: task.clientName,
      dob: task.dob,
      whatsapp: task.whatsapp,
      email: task.email,
      country: task.country,
      how_heard: task.howHeard,
      notes: cleanedNotes,
      referred_by: null, // will be set below if refCode exists
      tax_returns: '[]',
      super_returns: '[]',
      tfn_service: '{"done":false,"completedAt":"","notes":""}',
      abn_service: '{"done":false,"completedAt":"","notes":""}',
      created_at: new Date().toISOString(),
      archived: false,
      yearly_checkins: '{}',
    }

    if (task.taskType === 'tfn') {
      initialUpdates.tfn_service = JSON.stringify({ done: true, completedAt: today, notes: '' })
    } else if (task.taskType === 'abn') {
      initialUpdates.abn_service = JSON.stringify({ done: true, completedAt: today, notes: '' })
    } else if (task.taskType === 'tax-return' && task.taxYear) {
      const years = task.taxYear.split(',').map(y => y.trim()).filter(Boolean)
      const newReturns = years.map(year => ({
        year,
        type: refundAmount >= 0 ? 'refund' as const : 'owed' as const,
        refundAmount: Math.abs(refundAmount),
        completedAt: today,
      }))
      const newCheckins: Record<string, boolean> = {}
      years.forEach(y => { newCheckins[y] = true })
      initialUpdates.tax_returns = JSON.stringify(newReturns)
      initialUpdates.yearly_checkins = JSON.stringify(newCheckins)
    } else if (task.taskType === 'super') {
      const years = task.taxYear ? task.taxYear.split(',').map(y => y.trim()).filter(Boolean) : [today.slice(0,4)]
      initialUpdates.super_returns = JSON.stringify(years.map(year => ({
        year,
        amount: refundAmount,
        completedAt: today,
      })))
    }

    // Set referred_by for new client from task refCode
    if (task.refCode) {
      try {
        const { data: partner } = await sb
          .from('partners')
          .select('id')
          .eq('code', task.refCode)
          .maybeSingle()
        if (partner?.id) initialUpdates.referred_by = partner.id
      } catch { /* non-blocking */ }
    }

    await sb.from('crm_clients').insert(initialUpdates)
  }

  const { error } = await sb.from('crm_tasks').delete().eq('id', taskId)
  if (error) throw error
}

export async function deleteTaskPermanent(taskId: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb.from('crm_tasks').delete().eq('id', taskId)
  if (error) throw error
  await logAudit('task.delete_permanent', taskId)
}

// ── Clients ────────────────────────────────────────────────────────────────

export async function getAllActiveClients(limit = 100, offset = 0): Promise<ClientRecord[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('crm_clients')
    .select('*')
    .or('archived.eq.false,archived.is.null')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return (data ?? []).map(toClient)
}

export async function countActiveClients(): Promise<number> {
  const sb = getSupabase()
  const { count, error } = await sb.from('crm_clients')
    .select('*', { count: 'exact', head: true })
    .or('archived.eq.false,archived.is.null')
  if (error) throw error
  return count ?? 0
}

export async function getAllArchivedClients(limit = 100, offset = 0): Promise<ClientRecord[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('crm_clients')
    .select('*')
    .eq('archived', true)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return (data ?? []).map(toClient)
}

export async function countArchivedClients(): Promise<number> {
  const sb = getSupabase()
  const { count, error } = await sb.from('crm_clients')
    .select('*', { count: 'exact', head: true })
    .eq('archived', true)
  if (error) throw error
  return count ?? 0
}

export async function getClientById(id: string): Promise<ClientRecord | null> {
  const sb = getSupabase()
  const { data, error } = await sb.from('crm_clients').select('*').eq('id', id).maybeSingle()
  if (error) throw error
  return data ? toClient(data) : null
}

export async function deleteClient(id: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb.from('crm_clients').delete().eq('id', id)
  if (error) throw error
  await logAudit('client.delete', id)
}

export async function updateClientNotes(id: string, notes: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb.from('crm_clients').update({ notes }).eq('id', id)
  if (error) throw error
}

// ── Tax / Super returns ────────────────────────────────────────────────────

export async function addTaxReturn(clientId: string, r: TaxReturn): Promise<void> {
  const sb = getSupabase()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = [...client.taxReturns.filter(x => x.year !== r.year), r]
  const { error } = await sb.from('crm_clients')
    .update({ tax_returns: JSON.stringify(updated) })
    .eq('id', clientId)
  if (error) throw error
}

export async function removeTaxReturn(clientId: string, year: string): Promise<void> {
  const sb = getSupabase()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = client.taxReturns.filter(x => x.year !== year)
  const { error } = await sb.from('crm_clients')
    .update({ tax_returns: JSON.stringify(updated) })
    .eq('id', clientId)
  if (error) throw error
  await logAudit('client.remove_tax_return', clientId, `year=${year}`)
}

export async function addSuperReturn(clientId: string, r: SuperReturn): Promise<void> {
  const sb = getSupabase()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = [...client.superReturns.filter(x => x.year !== r.year), r]
  const { error } = await sb.from('crm_clients')
    .update({ super_returns: JSON.stringify(updated) })
    .eq('id', clientId)
  if (error) throw error
}

export async function removeSuperReturn(clientId: string, year: string): Promise<void> {
  const sb = getSupabase()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = client.superReturns.filter(x => x.year !== year)
  const { error } = await sb.from('crm_clients')
    .update({ super_returns: JSON.stringify(updated) })
    .eq('id', clientId)
  if (error) throw error
  await logAudit('client.remove_super_return', clientId, `year=${year}`)
}

// ── TFN / ABN services ────────────────────────────────────────────────────

export async function updateService(clientId: string, service: 'tfn' | 'abn', data: ServiceRecord): Promise<void> {
  const sb = getSupabase()
  const col = service === 'tfn' ? 'tfn_service' : 'abn_service'
  const { error } = await sb.from('crm_clients')
    .update({ [col]: JSON.stringify(data) })
    .eq('id', clientId)
  if (error) throw error
}

// ── Full client update ────────────────────────────────────────────────────

export async function updateClient(id: string, data: Partial<ClientRecord> & {
  address?: string; tfn?: string; bankDetails?: string;
  primaryJob?: string; marital?: string; taxStatus?: string;
  howHeard?: string; auPhone?: string; taxYear?: string; handled?: boolean;
}): Promise<ClientRecord | null> {
  const sb = getSupabase()
  const client = await getClientById(id)
  if (!client) return null

  // Coerce to string so callers sending arrays/numbers don't corrupt rows
  const asString = (v: unknown, fallback: string): string =>
    typeof v === 'string' && v !== '' ? v : fallback

  const fullName = asString(data.fullName, client.fullName).slice(0, 100)
  const dob      = asString(data.dob,      client.dob).slice(0, 20)
  const whatsapp = asString(data.whatsapp, client.whatsapp).slice(0, 30)
  const email    = asString(data.email,    client.email).slice(0, 200)
  const country  = asString(data.country,  client.country).slice(0, 60)
  const howHeard = (typeof data.howHeard === 'string' ? data.howHeard : (client.howHeard ?? '')).slice(0, 100)
  const notes    = (typeof data.notes    === 'string' ? data.notes    : (client.notes    ?? '')).slice(0, 10_000)

  const { error } = await sb.from('crm_clients').update({
    full_name: fullName,
    dob,
    whatsapp,
    email,
    country,
    how_heard: howHeard,
    notes,
  }).eq('id', id)
  if (error) throw error

  return getClientById(id)
}

export async function clearClientSensitiveData(id: string): Promise<ClientRecord | null> {
  const sb = getSupabase()
  const client = await getClientById(id)
  if (!client) return null

  await sb.from('crm_tasks').update({
    address: '', tfn: '', bank_details: '', primary_job: '',
    marital: '', au_phone: '', file_urls: '[]',
  }).eq('client_id', id)

  const clearedNote = client.notes.includes('[PII CLEARED]')
    ? client.notes
    : `[PII CLEARED ${new Date().toISOString().slice(0, 10)}] ${client.notes}`.trim()

  await sb.from('crm_clients').update({ notes: clearedNote }).eq('id', id)
  await logAudit('client.clear_sensitive_data', id)
  return getClientById(id)
}

export async function markClientHandled(id: string): Promise<ClientRecord | null> {
  const sb = getSupabase()
  const client = await getClientById(id)
  if (!client) return null
  const note = client.notes.includes('[HANDLED]') ? client.notes : `[HANDLED] ${client.notes}`.trim()
  await sb.from('crm_clients').update({ notes: note }).eq('id', id)
  return getClientById(id)
}

// ── Archive ────────────────────────────────────────────────────────────────

export async function archiveClient(id: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb.from('crm_clients').update({ archived: true }).eq('id', id)
  if (error) throw error
  await logAudit('client.archive', id)
}

export async function unarchiveClient(id: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb.from('crm_clients').update({ archived: false }).eq('id', id)
  if (error) throw error
}

// ── Yearly checkins ────────────────────────────────────────────────────────

export async function setYearlyCheckin(clientId: string, year: string, done: boolean): Promise<void> {
  const sb = getSupabase()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = { ...client.yearlyCheckins, [year]: done }
  const { error } = await sb.from('crm_clients')
    .update({ yearly_checkins: JSON.stringify(updated) })
    .eq('id', clientId)
  if (error) throw error
}

// ── Dashboard Stats ────────────────────────────────────────────────────────
// Computes aggregate stats from DB without loading all clients into memory.
// Scales to 10k+ clients. Fetches only the JSON fields needed for aggregation.

export type DashboardStats = {
  totalActiveClients: number
  totalArchivedClients: number
  totalTasksPending: number
  totalTasksDone: number
  seasonClientsCount: number          // Clients with tax return in current FY
  lastYearClientsCount: number        // Clients with tax return in previous FY
  returnedThisYearCount: number       // Of last year's clients, who returned this year
  totalRefundsThisYear: number        // Sum of refund amounts for current FY
  eligibleSuperCount: number          // Clients with >=1 tax return
  noSuperCount: number                // Of eligible, who never had super
  followUpCount: number               // Clients needing yearly follow-up
  currentTaxYear: string              // e.g. "2024-25"
  lastTaxYear: string                 // e.g. "2023-24"
}

export function getCurrentTaxYear(): string {
  // AU tax year: 1 Jul - 30 Jun. Computed in Australia/Sydney timezone.
  const sydney = new Date(new Date().toLocaleString('en-US', { timeZone: 'Australia/Sydney' }))
  const y = sydney.getFullYear()
  return sydney.getMonth() >= 6
    ? `${y}-${String(y + 1).slice(2)}`
    : `${y - 1}-${String(y).slice(2)}`
}

function getPreviousTaxYear(currentYear: string): string {
  const start = parseInt(currentYear.split('-')[0], 10) - 1
  return `${start}-${String(start + 1).slice(2)}`
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const sb = getSupabase()
  const currentTaxYear = getCurrentTaxYear()
  const lastTaxYear = getPreviousTaxYear(currentTaxYear)

  // Try Supabase RPC function (fast, scales to 1M+ clients).
  // Falls back to in-memory aggregation if function not installed yet.
  const rpcResult = await sb.rpc('get_dashboard_stats', {
    current_year: currentTaxYear,
    last_year: lastTaxYear,
  })

  if (!rpcResult.error && rpcResult.data) {
    const d = rpcResult.data as Record<string, unknown>
    return {
      totalActiveClients:    Number(d.totalActiveClients   ?? 0),
      totalArchivedClients:  Number(d.totalArchivedClients ?? 0),
      totalTasksPending:     Number(d.totalTasksPending    ?? 0),
      totalTasksDone:        Number(d.totalTasksDone       ?? 0),
      seasonClientsCount:    Number(d.seasonClientsCount   ?? 0),
      lastYearClientsCount:  Number(d.lastYearClientsCount ?? 0),
      returnedThisYearCount: Number(d.returnedThisYearCount?? 0),
      totalRefundsThisYear:  Number(d.totalRefundsThisYear ?? 0),
      eligibleSuperCount:    Number(d.eligibleSuperCount   ?? 0),
      noSuperCount:          Number(d.noSuperCount         ?? 0),
      followUpCount:         Number(d.followUpCount        ?? 0),
      currentTaxYear,
      lastTaxYear,
    }
  }

  // Fallback: in-memory aggregation (works for small DBs without migration 002).
  // WARNING: not suitable for >5,000 active clients - run migration 002 in Supabase.
  console.warn('[getDashboardStats] RPC unavailable, falling back to in-memory. Run migration 002 in Supabase to scale.')

  const [
    activeCountRes,
    archivedCountRes,
    pendingTasksRes,
    doneTasksRes,
    aggregationRes,
  ] = await Promise.all([
    sb.from('crm_clients').select('*', { count: 'exact', head: true }).eq('archived', false),
    sb.from('crm_clients').select('*', { count: 'exact', head: true }).eq('archived', true),
    sb.from('crm_tasks').select('*', { count: 'exact', head: true }).eq('done', false),
    sb.from('crm_tasks').select('*', { count: 'exact', head: true }).eq('done', true),
    sb.from('crm_clients')
      .select('tax_returns, super_returns, yearly_checkins')
      .eq('archived', false)
      .limit(5000), // hard cap on fallback path
  ])

  const totalActiveClients = activeCountRes.count ?? 0
  const totalArchivedClients = archivedCountRes.count ?? 0
  const totalTasksPending = pendingTasksRes.count ?? 0
  const totalTasksDone = doneTasksRes.count ?? 0

  let seasonClientsCount = 0
  let lastYearClientsCount = 0
  let returnedThisYearCount = 0
  let totalRefundsThisYear = 0
  let eligibleSuperCount = 0
  let noSuperCount = 0
  let followUpCount = 0

  type Row = { tax_returns: string | null; super_returns: string | null; yearly_checkins: string | null }
  const rows: Row[] = (aggregationRes.data ?? []) as Row[]

  for (const row of rows) {
    let taxReturns: TaxReturn[] = []
    let superReturns: SuperReturn[] = []
    let checkins: Record<string, boolean> = {}
    try { taxReturns = JSON.parse(row.tax_returns ?? '[]') } catch {}
    try { superReturns = JSON.parse(row.super_returns ?? '[]') } catch {}
    try { checkins = JSON.parse(row.yearly_checkins ?? '{}') } catch {}

    const hasThisYear = taxReturns.some(r => r.year === currentTaxYear)
    const hasLastYear = taxReturns.some(r => r.year === lastTaxYear)
    if (hasThisYear) seasonClientsCount++
    if (hasLastYear) {
      lastYearClientsCount++
      if (hasThisYear) returnedThisYearCount++
    }

    for (const r of taxReturns) {
      if (r.year === currentTaxYear) {
        if (r.type === 'refund') totalRefundsThisYear += r.refundAmount
        else if (r.type === 'owed') totalRefundsThisYear -= r.refundAmount
      }
    }

    if (taxReturns.length > 0) {
      eligibleSuperCount++
      if (superReturns.length === 0) noSuperCount++
    }

    const checkinDone = checkins[currentTaxYear] === true
    if (!checkinDone && !hasThisYear && taxReturns.length > 0) followUpCount++
  }

  return {
    totalActiveClients,
    totalArchivedClients,
    totalTasksPending,
    totalTasksDone,
    seasonClientsCount,
    lastYearClientsCount,
    returnedThisYearCount,
    totalRefundsThisYear: Math.max(0, totalRefundsThisYear),
    eligibleSuperCount,
    noSuperCount,
    followUpCount,
    currentTaxYear,
    lastTaxYear,
  }
}

// ── Server-side search ─────────────────────────────────────────────────────
// Searches clients in DB by name/email/whatsapp (case-insensitive).
// Used by Dashboard global search to support 5,000+ clients without loading all.

export async function searchClients(
  query: string,
  limit = 50,
  archived = false,
): Promise<ClientRecord[]> {
  const sb = getSupabase()
  const q = query.trim()
  if (q.length < 2) return []
  // Escape % and _ to prevent ILIKE injection
  const safe = q.replace(/[\\%_]/g, ch => '\\' + ch)
  const pattern = `%${safe}%`

  // Names are stored as "First Middle... Last" (no comma). The CRM displays
  // them as "Last, First Middle..." so people naturally search that way too -
  // build a second pattern with the comma-separated parts reversed and
  // rejoined without the comma, so "Nishibuchi, Akari" also matches a stored
  // "Akari Nishibuchi".
  let namePatterns = [pattern]
  if (safe.includes(',')) {
    const [beforeComma, ...restParts] = safe.split(',')
    const rest = restParts.join(',').trim()
    const last = beforeComma.trim()
    if (rest && last) namePatterns.push(`%${rest} ${last}%`)
  }

  // Search in parallel across name, email, whatsapp - merge & dedupe
  const nameQueries = namePatterns.map(p =>
    sb.from('crm_clients').select('*').eq('archived', archived).ilike('full_name', p).limit(limit)
  )
  const otherFields: ('email' | 'whatsapp')[] = ['email', 'whatsapp']
  const otherQueries = otherFields.map(f =>
    sb.from('crm_clients').select('*').eq('archived', archived).ilike(f, pattern).limit(limit)
  )
  const results = await Promise.all([...nameQueries, ...otherQueries])

  const seen = new Set<string>()
  const merged: ClientRecord[] = []
  for (const res of results) {
    if (!res.data) continue
    for (const row of res.data) {
      const id = (row as { id: string }).id
      if (seen.has(id)) continue
      seen.add(id)
      merged.push(toClient(row))
      if (merged.length >= limit) break
    }
    if (merged.length >= limit) break
  }
  return merged
}


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
export type TaskType      = 'tax-return' | 'super' | 'tfn' | 'abn'
export type ReviewStatus  = 'pending' | 'approved' | 'rejected'

export type ClientRecord = {
  id: string; fullName: string; dob: string; whatsapp: string
  email: string; country: string; howHeard: string; notes: string; createdAt: string
  taxReturns: TaxReturn[]; superReturns: SuperReturn[]
  tfnService: ServiceRecord; abnService: ServiceRecord
  archived: boolean; yearlyCheckins: Record<string, boolean>
}

export type Task = {
  id: string; clientId: string; clientName: string; taskType: TaskType
  whatsapp: string; email: string; country: string; dob: string
  taxYear: string; submittedAt: string; done: boolean
  address: string; tfn: string; bankDetails: string; primaryJob: string
  marital: string; taxStatus: string; howHeard: string; auPhone: string; notes: string
  fileUrls: string[]; reviewStatus: ReviewStatus; reviewerNote: string; reviewedAt: string
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
  }
}

// ── Returning client lookup ────────────────────────────────────────────────

export async function findExistingClient(email: string, whatsapp: string): Promise<{ id: string } | null> {
  const sb = getSupabase()
  const norm = (s: string) => (s ?? '').trim().toLowerCase().replace(/\s+/g, '')
  const e = norm(email)
  const w = norm(whatsapp)
  if (!e && !w) return null

  // Search crm_clients (case-insensitive)
  const { data: clients } = await sb.from('crm_clients')
    .select('id, email, whatsapp, created_at')
    .order('created_at', { ascending: false })
    .limit(50)
  if (clients) {
    const match = clients.find((c: Record<string, unknown>) => {
      const ce = norm((c.email as string) ?? '')
      const cw = norm((c.whatsapp as string) ?? '')
      return (e && ce === e) || (w && cw === w)
    })
    if (match) return { id: match.id as string }
  }

  // Search crm_tasks (active only)
  const { data: tasks } = await sb.from('crm_tasks')
    .select('client_id, email, whatsapp, submitted_at')
    .eq('done', false)
    .order('submitted_at', { ascending: false })
    .limit(50)
  if (tasks) {
    const match = tasks.find((t: Record<string, unknown>) => {
      const te = norm((t.email as string) ?? '')
      const tw = norm((t.whatsapp as string) ?? '')
      return (e && te === e) || (w && tw === w)
    })
    if (match) return { id: match.client_id as string }
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
      !p.match(/^(Passport No:|Super Funds:|Home Country Address:|Gender:|ABN:|ABN Number:|ABN Income:|ABN Work:|Expenses:|💼 TFN Invoices|🏢 ABN Invoices|→|I confirm|I declare|I have read|Working Holiday)/i)
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
  }).eq('id', id)
  if (error) throw error
}

export async function updateTaskNotes(id: string, notes: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb.from('crm_tasks').update({ notes }).eq('id', id)
  if (error) throw error
}

export async function deleteTaskAndArchive(taskId: string): Promise<void> {
  const sb = getSupabase()
  const task = await getTask(taskId)
  if (!task) return

  const cleanedNotes = (task.notes ?? '')
    .split(' | ')
    .filter(p =>
      !p.match(/^(Passport No:|Super Funds:|Home Country Address:|Gender:|ABN:|ABN Number:|ABN Income:|ABN Work:|Expenses:|💼 TFN Invoices|🏢 ABN Invoices|→|I confirm|I declare|I have read|Working Holiday)/i)
      && p !== '🔄 Returning client'
      && !p.startsWith('📝 ')
    )
    .filter(Boolean)
    .join('\n')
    .trim()

  // Upsert client (merge behavior preserved from old code)
  const existing = await getClientById(task.clientId)
  if (existing) {
    const newHowHeard = existing.howHeard === '' && task.howHeard !== '' ? task.howHeard : existing.howHeard
    const newNotes = cleanedNotes !== '' && !existing.notes.includes(cleanedNotes)
      ? `${existing.notes}\n${cleanedNotes}`.trim()
      : existing.notes
    await sb.from('crm_clients').update({
      how_heard: newHowHeard,
      notes: newNotes,
    }).eq('id', task.clientId)
  } else {
    await sb.from('crm_clients').insert({
      id: task.clientId,
      full_name: task.clientName,
      dob: task.dob,
      whatsapp: task.whatsapp,
      email: task.email,
      country: task.country,
      how_heard: task.howHeard,
      notes: cleanedNotes,
      tax_returns: '[]',
      super_returns: '[]',
      tfn_service: '{"done":false,"completedAt":"","notes":""}',
      abn_service: '{"done":false,"completedAt":"","notes":""}',
      created_at: new Date().toISOString(),
      archived: false,
      yearly_checkins: '{}',
    })
  }

  const { error } = await sb.from('crm_tasks').delete().eq('id', taskId)
  if (error) throw error
}

export async function deleteTaskPermanent(taskId: string): Promise<void> {
  const sb = getSupabase()
  const { error } = await sb.from('crm_tasks').delete().eq('id', taskId)
  if (error) throw error
}

// ── Clients ────────────────────────────────────────────────────────────────

/** @deprecated Use getAllActiveClients() or getAllArchivedClients() instead. */
export async function getAllClients(): Promise<ClientRecord[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('crm_clients').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return (data ?? []).map(toClient)
}

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

  const fullName = (data.fullName  || client.fullName).slice(0, 100)
  const dob      = (data.dob       || client.dob).slice(0, 20)
  const whatsapp = (data.whatsapp  || client.whatsapp).slice(0, 30)
  const email    = (data.email     || client.email).slice(0, 200)
  const country  = (data.country   || client.country).slice(0, 60)
  const howHeard = (data.howHeard  ?? client.howHeard ?? '').slice(0, 100)
  const notes    = (data.notes     ?? client.notes    ?? '').slice(0, 10_000)

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

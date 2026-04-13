import { sql } from '@vercel/postgres'
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
// Global symbol survives Next.js hot-module replacement in dev.
// In production each Vercel instance runs initDb() once per cold start.

const INIT_KEY = Symbol.for('crm_db_initialised')
declare const globalThis: Record<symbol, boolean | undefined>

let _initPromise: Promise<void> | null = null

const DB_TIMEOUT = 8000

async function withTimeout<T>(p: Promise<T>, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`DB timeout: ${label}`)), DB_TIMEOUT)
    ),
  ])
}

export async function initDb(): Promise<void> {
  if (globalThis[INIT_KEY]) return   // fast path — already done
  if (_initPromise) return _initPromise  // in progress — wait

  _initPromise = (async () => {
    try {
      await withTimeout(sql`
        CREATE TABLE IF NOT EXISTS crm_clients (
          id              TEXT PRIMARY KEY,
          full_name       TEXT NOT NULL DEFAULT '',
          dob             TEXT NOT NULL DEFAULT '',
          whatsapp        TEXT NOT NULL DEFAULT '',
          email           TEXT NOT NULL DEFAULT '',
          country         TEXT NOT NULL DEFAULT '',
          how_heard       TEXT NOT NULL DEFAULT '',
          notes           TEXT NOT NULL DEFAULT '',
          tax_returns     TEXT NOT NULL DEFAULT '[]',
          super_returns   TEXT NOT NULL DEFAULT '[]',
          tfn_service     TEXT NOT NULL DEFAULT '{"done":false,"completedAt":"","notes":""}',
          abn_service     TEXT NOT NULL DEFAULT '{"done":false,"completedAt":"","notes":""}',
          created_at      TEXT NOT NULL DEFAULT '',
          archived        BOOLEAN NOT NULL DEFAULT FALSE,
          yearly_checkins TEXT NOT NULL DEFAULT '{}'
        )
      `, 'CREATE crm_clients')

      await withTimeout(sql`
        CREATE TABLE IF NOT EXISTS crm_tasks (
          id           TEXT PRIMARY KEY,
          client_id    TEXT NOT NULL DEFAULT '',
          client_name  TEXT NOT NULL DEFAULT '',
          task_type    TEXT NOT NULL DEFAULT 'tax-return',
          whatsapp     TEXT NOT NULL DEFAULT '',
          email        TEXT NOT NULL DEFAULT '',
          country      TEXT NOT NULL DEFAULT '',
          dob          TEXT NOT NULL DEFAULT '',
          tax_year     TEXT NOT NULL DEFAULT '',
          submitted_at TEXT NOT NULL DEFAULT '',
          done         BOOLEAN NOT NULL DEFAULT FALSE,
          address      TEXT NOT NULL DEFAULT '',
          tfn          TEXT NOT NULL DEFAULT '',
          bank_details TEXT NOT NULL DEFAULT '',
          primary_job  TEXT NOT NULL DEFAULT '',
          marital      TEXT NOT NULL DEFAULT '',
          tax_status   TEXT NOT NULL DEFAULT '',
          how_heard    TEXT NOT NULL DEFAULT '',
          au_phone     TEXT NOT NULL DEFAULT '',
          notes        TEXT NOT NULL DEFAULT '',
          file_urls    TEXT NOT NULL DEFAULT '[]'
        )
      `, 'CREATE crm_tasks')

      // Idempotent column additions (safe to run on existing DBs)
      await Promise.all([
        withTimeout(sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS file_urls TEXT NOT NULL DEFAULT '[]'`, 'ALT file_urls'),
        withTimeout(sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS au_phone TEXT NOT NULL DEFAULT ''`, 'ALT au_phone'),
        withTimeout(sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS review_status TEXT NOT NULL DEFAULT 'pending'`, 'ALT review_status'),
        withTimeout(sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS reviewer_note TEXT NOT NULL DEFAULT ''`, 'ALT reviewer_note'),
        withTimeout(sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS reviewed_at TEXT NOT NULL DEFAULT ''`, 'ALT reviewed_at'),
        withTimeout(sql`ALTER TABLE crm_clients ADD COLUMN IF NOT EXISTS archived BOOLEAN NOT NULL DEFAULT FALSE`, 'ALT archived'),
        withTimeout(sql`ALTER TABLE crm_clients ADD COLUMN IF NOT EXISTS yearly_checkins TEXT NOT NULL DEFAULT '{}'`, 'ALT yearly_checkins'),
      ])

      // Indexes
      await Promise.all([
        withTimeout(sql`CREATE INDEX IF NOT EXISTS idx_tasks_submitted ON crm_tasks(submitted_at DESC)`, 'IDX submitted'),
        withTimeout(sql`CREATE INDEX IF NOT EXISTS idx_tasks_done ON crm_tasks(done)`, 'IDX done'),
        withTimeout(sql`CREATE INDEX IF NOT EXISTS idx_clients_created ON crm_clients(created_at DESC)`, 'IDX created'),
        withTimeout(sql`CREATE INDEX IF NOT EXISTS idx_clients_archived ON crm_clients(archived)`, 'IDX archived'),
      ])

      globalThis[INIT_KEY] = true
    } finally {
      _initPromise = null  // reset so future calls use the fast path
    }
  })()

  return _initPromise
}

// ── Row mappers ────────────────────────────────────────────────────────────

function parse<T>(s: unknown, fallback: T): T {
  try { return JSON.parse(s as string) as T } catch { return fallback }
}

function toClient(r: Record<string, unknown>): ClientRecord {
  return {
    id:             r.id as string,
    fullName:       r.full_name as string,
    dob:            r.dob as string,
    whatsapp:       r.whatsapp as string,
    email:          r.email as string,
    country:        r.country as string,
    howHeard:       (r.how_heard as string) ?? '',
    notes:          (r.notes as string) ?? '',
    createdAt:      r.created_at as string,
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
    clientId:     r.client_id as string,
    clientName:   r.client_name as string,
    taskType:     (r.task_type as TaskType) ?? 'tax-return',
    whatsapp:     r.whatsapp as string,
    email:        r.email as string,
    country:      r.country as string,
    dob:          r.dob as string,
    taxYear:      r.tax_year as string,
    submittedAt:  r.submitted_at as string,
    done:         r.done as boolean,
    address:      r.address as string,
    tfn:          r.tfn as string,
    bankDetails:  r.bank_details as string,
    primaryJob:   r.primary_job as string,
    marital:      r.marital as string,
    taxStatus:    r.tax_status as string,
    howHeard:     r.how_heard as string,
    auPhone:      r.au_phone as string,
    notes:        r.notes as string,
    fileUrls:     parse(r.file_urls ?? '[]', []),
    reviewStatus: ((r.review_status as string) ?? 'pending') as ReviewStatus,
    reviewerNote: (r.reviewer_note as string) ?? '',
    reviewedAt:   (r.reviewed_at as string) ?? '',
  }
}

// ── Returning client lookup ────────────────────────────────────────────────

export async function findExistingClient(email: string, whatsapp: string): Promise<{ id: string } | null> {
  await initDb()
  const norm = (s: string) => (s ?? '').trim().toLowerCase().replace(/\s+/g, '')
  const e = norm(email)
  const w = norm(whatsapp)
  if (!e && !w) return null

  const { rows: cr } = await sql`
    SELECT id FROM crm_clients
    WHERE (${e} != '' AND LOWER(TRIM(email)) = ${e})
       OR (${w} != '' AND LOWER(TRIM(whatsapp)) = ${w})
    ORDER BY created_at DESC LIMIT 1
  `
  if (cr[0]) return { id: cr[0].id }

  const { rows: tr } = await sql`
    SELECT client_id FROM crm_tasks
    WHERE done = false AND (
      (${e} != '' AND LOWER(TRIM(email)) = ${e}) OR
      (${w} != '' AND LOWER(TRIM(whatsapp)) = ${w})
    )
    ORDER BY submitted_at DESC LIMIT 1
  `
  if (tr[0]) return { id: tr[0].client_id }
  return null
}

// ── Tasks ──────────────────────────────────────────────────────────────────

export async function getAllTasks(limit = 100, offset = 0): Promise<Task[]> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_tasks ORDER BY submitted_at DESC LIMIT ${limit} OFFSET ${offset}`
  return rows.map(toTask)
}

export async function countTasks(): Promise<number> {
  await initDb()
  const { rows } = await sql`SELECT COUNT(*)::int AS count FROM crm_tasks`
  return rows[0]?.count ?? 0
}

export async function getTask(id: string): Promise<Task | null> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_tasks WHERE id = ${id}`
  return rows[0] ? toTask(rows[0]) : null
}

export async function createTask(data: Omit<Task, 'id' | 'done'>): Promise<Task> {
  await initDb()
  const id = `TASK-${crypto.randomUUID()}`
  await withTimeout(sql`
    INSERT INTO crm_tasks
      (id,client_id,client_name,task_type,whatsapp,email,country,dob,tax_year,submitted_at,
       done,address,tfn,bank_details,primary_job,marital,tax_status,how_heard,au_phone,notes,file_urls,
       review_status,reviewer_note,reviewed_at)
    VALUES
      (${id},${data.clientId},${data.clientName},${data.taskType ?? 'tax-return'},
       ${data.whatsapp},${data.email},${data.country},${data.dob},${data.taxYear},
       ${data.submittedAt},false,${data.address},${data.tfn},${data.bankDetails},
       ${data.primaryJob},${data.marital},${data.taxStatus},${data.howHeard},${data.auPhone},
       ${data.notes},${JSON.stringify(data.fileUrls ?? [])},
       ${'pending'},${''},${''})
  `, 'INSERT crm_tasks')
  return { ...data, id, done: false }
}

export async function markTaskDone(id: string): Promise<void> {
  await initDb()
  const task = await getTask(id)
  if (!task) return
  if (task.fileUrls?.length) await deleteFiles(task.fileUrls)
  await sql`
    UPDATE crm_tasks SET
      done = TRUE, address = '', tfn = '', bank_details = '',
      primary_job = '', marital = '', au_phone = '', file_urls = '[]'
    WHERE id = ${id}
  `
}

export async function updateTaskNotes(id: string, notes: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_tasks SET notes = ${notes} WHERE id = ${id}`
}

export async function deleteTaskAndArchive(taskId: string): Promise<void> {
  await initDb()
  const task = await getTask(taskId)
  if (!task) return

  const cleanedNotes = (task.notes ?? '')
    .split(' | ')
    .filter(p =>
      !p.match(/^(Passport No:|Super Funds:|Home Country Address:|Gender:|ABN:|ABN Number:|ABN Income:|ABN Work:|Expenses:|→|I confirm|I declare|I have read|Working Holiday)/i)
      && p !== '🔄 Returning client'
    )
    .map(p => p.startsWith('📝 ') ? `Reviewer: ${p.slice(3)}` : p)
    .filter(Boolean)
    .join('\n')
    .trim()

  await sql`
    INSERT INTO crm_clients
      (id,full_name,dob,whatsapp,email,country,how_heard,notes,tax_returns,super_returns,tfn_service,abn_service,created_at)
    VALUES
      (${task.clientId},${task.clientName},${task.dob},${task.whatsapp},${task.email},
       ${task.country},${task.howHeard},${cleanedNotes},'[]','[]',
       '{"done":false,"completedAt":"","notes":""}',
       '{"done":false,"completedAt":"","notes":""}',
       ${new Date().toISOString()})
    ON CONFLICT (id) DO UPDATE SET
      how_heard = CASE WHEN crm_clients.how_heard = '' AND EXCLUDED.how_heard != '' THEN EXCLUDED.how_heard ELSE crm_clients.how_heard END,
      notes = CASE
        WHEN EXCLUDED.notes != '' AND crm_clients.notes NOT LIKE '%' || EXCLUDED.notes || '%'
        THEN TRIM(crm_clients.notes || E'\n' || EXCLUDED.notes)
        ELSE crm_clients.notes
      END
  `
  await sql`DELETE FROM crm_tasks WHERE id = ${taskId}`
}

export async function deleteTaskPermanent(taskId: string): Promise<void> {
  await initDb()
  await sql`DELETE FROM crm_tasks WHERE id = ${taskId}`
}

// ── Clients ────────────────────────────────────────────────────────────────

/** @deprecated Use getAllActiveClients() or getAllArchivedClients() instead. */
export async function getAllClients(): Promise<ClientRecord[]> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_clients ORDER BY created_at DESC`
  return rows.map(toClient)
}

export async function getAllActiveClients(limit = 100, offset = 0): Promise<ClientRecord[]> {
  await initDb()
  const { rows } = await sql`
    SELECT * FROM crm_clients WHERE (archived = FALSE OR archived IS NULL)
    ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
  `
  return rows.map(toClient)
}

export async function countActiveClients(): Promise<number> {
  await initDb()
  const { rows } = await sql`SELECT COUNT(*)::int AS count FROM crm_clients WHERE (archived = FALSE OR archived IS NULL)`
  return rows[0]?.count ?? 0
}

export async function getAllArchivedClients(limit = 100, offset = 0): Promise<ClientRecord[]> {
  await initDb()
  const { rows } = await sql`
    SELECT * FROM crm_clients WHERE archived = TRUE
    ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}
  `
  return rows.map(toClient)
}

export async function countArchivedClients(): Promise<number> {
  await initDb()
  const { rows } = await sql`SELECT COUNT(*)::int AS count FROM crm_clients WHERE archived = TRUE`
  return rows[0]?.count ?? 0
}

export async function getClientById(id: string): Promise<ClientRecord | null> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_clients WHERE id = ${id}`
  return rows[0] ? toClient(rows[0]) : null
}

export async function deleteClient(id: string): Promise<void> {
  await initDb()
  await sql`DELETE FROM crm_clients WHERE id = ${id}`
}

export async function updateClientNotes(id: string, notes: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_clients SET notes = ${notes} WHERE id = ${id}`
}

// ── Tax / Super returns ────────────────────────────────────────────────────

export async function addTaxReturn(clientId: string, r: TaxReturn): Promise<void> {
  await initDb()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = [...client.taxReturns.filter(x => x.year !== r.year), r]
  await sql`UPDATE crm_clients SET tax_returns = ${JSON.stringify(updated)} WHERE id = ${clientId}`
}

export async function removeTaxReturn(clientId: string, year: string): Promise<void> {
  await initDb()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = client.taxReturns.filter(x => x.year !== year)
  await sql`UPDATE crm_clients SET tax_returns = ${JSON.stringify(updated)} WHERE id = ${clientId}`
}

export async function addSuperReturn(clientId: string, r: SuperReturn): Promise<void> {
  await initDb()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = [...client.superReturns.filter(x => x.year !== r.year), r]
  await sql`UPDATE crm_clients SET super_returns = ${JSON.stringify(updated)} WHERE id = ${clientId}`
}

export async function removeSuperReturn(clientId: string, year: string): Promise<void> {
  await initDb()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = client.superReturns.filter(x => x.year !== year)
  await sql`UPDATE crm_clients SET super_returns = ${JSON.stringify(updated)} WHERE id = ${clientId}`
}

// ── TFN / ABN services ────────────────────────────────────────────────────

export async function updateService(clientId: string, service: 'tfn' | 'abn', data: ServiceRecord): Promise<void> {
  await initDb()
  if (service === 'tfn') {
    await sql`UPDATE crm_clients SET tfn_service = ${JSON.stringify(data)} WHERE id = ${clientId}`
  } else {
    await sql`UPDATE crm_clients SET abn_service = ${JSON.stringify(data)} WHERE id = ${clientId}`
  }
}

// ── Full client update ────────────────────────────────────────────────────

export async function updateClient(id: string, data: Partial<ClientRecord> & {
  address?: string; tfn?: string; bankDetails?: string;
  primaryJob?: string; marital?: string; taxStatus?: string;
  howHeard?: string; auPhone?: string; taxYear?: string; handled?: boolean;
}): Promise<ClientRecord | null> {
  await initDb()
  const client = await getClientById(id)
  if (!client) return null

  const fullName = (data.fullName  || client.fullName).slice(0, 100)
  const dob      = (data.dob       || client.dob).slice(0, 20)
  const whatsapp = (data.whatsapp  || client.whatsapp).slice(0, 30)
  const email    = (data.email     || client.email).slice(0, 200)
  const country  = (data.country   || client.country).slice(0, 60)
  const howHeard = (data.howHeard  ?? client.howHeard ?? '').slice(0, 100)
  const notes    = (data.notes     ?? client.notes    ?? '').slice(0, 10_000)

  await sql`
    UPDATE crm_clients SET
      full_name = ${fullName}, dob = ${dob}, whatsapp = ${whatsapp},
      email = ${email}, country = ${country}, how_heard = ${howHeard}, notes = ${notes}
    WHERE id = ${id}
  `
  return getClientById(id)
}

export async function clearClientSensitiveData(id: string): Promise<ClientRecord | null> {
  await initDb()
  const client = await getClientById(id)
  if (!client) return null
  await sql`
    UPDATE crm_tasks SET
      address = '', tfn = '', bank_details = '', primary_job = '',
      marital = '', au_phone = '', file_urls = '[]'
    WHERE client_id = ${id}
  `
  const clearedNote = client.notes.includes('[PII CLEARED]')
    ? client.notes
    : `[PII CLEARED ${new Date().toISOString().slice(0, 10)}] ${client.notes}`.trim()
  await sql`UPDATE crm_clients SET notes = ${clearedNote} WHERE id = ${id}`
  return getClientById(id)
}

export async function markClientHandled(id: string): Promise<ClientRecord | null> {
  await initDb()
  const client = await getClientById(id)
  if (!client) return null
  const note = client.notes.includes('[HANDLED]') ? client.notes : `[HANDLED] ${client.notes}`.trim()
  await sql`UPDATE crm_clients SET notes = ${note} WHERE id = ${id}`
  return getClientById(id)
}

// ── Archive ────────────────────────────────────────────────────────────────

export async function archiveClient(id: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_clients SET archived = TRUE WHERE id = ${id}`
}

export async function unarchiveClient(id: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_clients SET archived = FALSE WHERE id = ${id}`
}

// ── Yearly checkins ────────────────────────────────────────────────────────

export async function setYearlyCheckin(clientId: string, year: string, done: boolean): Promise<void> {
  await initDb()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = { ...client.yearlyCheckins, [year]: done }
  await sql`UPDATE crm_clients SET yearly_checkins = ${JSON.stringify(updated)} WHERE id = ${clientId}`
}

// ── Reviewer ──────────────────────────────────────────────────────────────

export async function setReviewerNote(taskId: string, note: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_tasks SET reviewer_note = ${note} WHERE id = ${taskId}`
}

export async function setReviewStatus(taskId: string, status: ReviewStatus): Promise<void> {
  await initDb()
  const reviewedAt = status === 'pending' ? '' : new Date().toISOString()
  await sql`UPDATE crm_tasks SET review_status = ${status}, reviewed_at = ${reviewedAt} WHERE id = ${taskId}`
}

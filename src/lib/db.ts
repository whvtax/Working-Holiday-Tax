import { sql, db } from '@vercel/postgres'
import { deleteFiles } from '@/lib/upload'
import { encryptField, decryptField } from '@/lib/encrypt'
import crypto from 'crypto'

export type TaxReturn     = { year:string; refundAmount:number; type:'refund'|'owed'; completedAt:string }
export type SuperReturn   = { year:string; amount:number; completedAt:string }
export type ServiceRecord = { done:boolean; completedAt:string; notes:string }

export type ClientRecord = {
  id:string; fullName:string; dob:string; whatsapp:string
  email:string; country:string; howHeard:string; notes:string; createdAt:string
  taxReturns:    TaxReturn[]
  superReturns:  SuperReturn[]
  tfnService:    ServiceRecord
  abnService:    ServiceRecord
  archived:      boolean
  yearlyCheckins: Record<string, boolean>
}

export type TaskType = 'tax-return' | 'super' | 'tfn' | 'abn'

export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export type Task = {
  id:string; clientId:string; clientName:string; taskType:TaskType
  whatsapp:string; email:string; country:string; dob:string
  taxYear:string; submittedAt:string; done:boolean
  address:string; tfn:string; bankDetails:string; primaryJob:string
  marital:string; taxStatus:string; howHeard:string; auPhone:string; notes:string
  fileUrls:string[]
  reviewStatus: ReviewStatus
  reviewerNote: string
  reviewedAt: string
}

// ── Init ───────────────────────────────────────────────────────────────────
let _initPromise: Promise<void> | null = null

const DB_TIMEOUT_MS = 8000 // 8 s — Vercel Postgres cold-start can be slow

async function sqlWithTimeout<T>(query: Promise<T>, label: string): Promise<T> {
  return Promise.race([
    query,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`DB timeout: ${label}`)), DB_TIMEOUT_MS)
    ),
  ])
}

async function _doInit() {
  await sqlWithTimeout(sql`
    CREATE TABLE IF NOT EXISTS crm_clients (
      id            TEXT PRIMARY KEY,
      full_name     TEXT NOT NULL DEFAULT '',
      dob           TEXT NOT NULL DEFAULT '',
      whatsapp      TEXT NOT NULL DEFAULT '',
      email         TEXT NOT NULL DEFAULT '',
      country       TEXT NOT NULL DEFAULT '',
      how_heard     TEXT NOT NULL DEFAULT '',
      notes         TEXT NOT NULL DEFAULT '',
      tax_returns   TEXT NOT NULL DEFAULT '[]',
      super_returns TEXT NOT NULL DEFAULT '[]',
      tfn_service   TEXT NOT NULL DEFAULT '{"done":false,"completedAt":"","notes":""}',
      abn_service   TEXT NOT NULL DEFAULT '{"done":false,"completedAt":"","notes":""}',
      created_at    TEXT NOT NULL DEFAULT '',
      archived      BOOLEAN NOT NULL DEFAULT FALSE,
      yearly_checkins TEXT NOT NULL DEFAULT '{}'
    )
  `, 'CREATE crm_clients')
  await sqlWithTimeout(sql`
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
  await sqlWithTimeout(
    sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS file_urls TEXT NOT NULL DEFAULT '[]'`,
    'ALTER crm_tasks file_urls'
  )
  // Run remaining column additions in parallel — safe because each is idempotent (IF NOT EXISTS)
  await Promise.all([
    sqlWithTimeout(
      sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS au_phone TEXT NOT NULL DEFAULT ''`,
      'ALTER crm_tasks au_phone'
    ),
    sqlWithTimeout(
      sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS review_status TEXT NOT NULL DEFAULT 'pending'`,
      'ALTER crm_tasks review_status'
    ),
    sqlWithTimeout(
      sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS reviewer_note TEXT NOT NULL DEFAULT ''`,
      'ALTER crm_tasks reviewer_note'
    ),
    sqlWithTimeout(
      sql`ALTER TABLE crm_tasks ADD COLUMN IF NOT EXISTS reviewed_at TEXT NOT NULL DEFAULT ''`,
      'ALTER crm_tasks reviewed_at'
    ),
    sqlWithTimeout(
      sql`ALTER TABLE crm_clients ADD COLUMN IF NOT EXISTS archived BOOLEAN NOT NULL DEFAULT FALSE`,
      'ALTER crm_clients archived'
    ),
    sqlWithTimeout(
      sql`ALTER TABLE crm_clients ADD COLUMN IF NOT EXISTS yearly_checkins TEXT NOT NULL DEFAULT '{}'`,
      'ALTER crm_clients yearly_checkins'
    ),
  ])
  await Promise.all([
    sqlWithTimeout(sql`CREATE INDEX IF NOT EXISTS idx_tasks_submitted ON crm_tasks(submitted_at DESC)`, 'IDX tasks submitted'),
    sqlWithTimeout(sql`CREATE INDEX IF NOT EXISTS idx_tasks_done ON crm_tasks(done)`, 'IDX tasks done'),
    sqlWithTimeout(sql`CREATE INDEX IF NOT EXISTS idx_clients_created ON crm_clients(created_at DESC)`, 'IDX clients created'),
    sqlWithTimeout(sql`CREATE INDEX IF NOT EXISTS idx_clients_archived ON crm_clients(archived)`, 'IDX clients archived'),
  ])
}

// Promise singleton — concurrent cold-start requests share one init, no duplicate ALTERs
export function initDb(): Promise<void> {
  return (_initPromise ??= _doInit())
}

function toClient(r: Record<string,unknown>): ClientRecord {
  const parse = (s: unknown, fallback: unknown) => { try { return JSON.parse(s as string) } catch { return fallback } }
  return {
    id:           r.id as string,
    fullName:     r.full_name as string,
    dob:          r.dob as string,
    whatsapp:     r.whatsapp as string,
    email:        r.email as string,
    country:      r.country as string,
    howHeard:     (r.how_heard as string) ?? '',
    notes:        (r.notes as string) ?? '',
    createdAt:    r.created_at as string,
    taxReturns:   parse(r.tax_returns, []),
    superReturns: parse(r.super_returns, []),
    tfnService:   parse(r.tfn_service,  { done:false, completedAt:'', notes:'' }),
    abnService:   parse(r.abn_service,  { done:false, completedAt:'', notes:'' }),
    archived:     (r.archived as boolean) ?? false,
    yearlyCheckins: parse(r.yearly_checkins, {}),
  }
}

function toTask(r: Record<string,unknown>): Task {
  return {
    id: r.id as string, clientId: r.client_id as string,
    clientName: r.client_name as string, taskType: (r.task_type as TaskType) ?? 'tax-return',
    whatsapp: r.whatsapp as string, email: r.email as string,
    country: r.country as string, dob: r.dob as string,
    taxYear: r.tax_year as string, submittedAt: r.submitted_at as string,
    done: r.done as boolean, address: r.address as string,
    tfn: decryptField(r.tfn as string),
    bankDetails: decryptField(r.bank_details as string),
    primaryJob: r.primary_job as string, marital: r.marital as string,
    taxStatus: r.tax_status as string, howHeard: r.how_heard as string,
    auPhone: r.au_phone as string, notes: r.notes as string,
    fileUrls: (() => { try { return JSON.parse(r.file_urls as string ?? '[]') } catch { return [] } })(),
    reviewStatus: ((r.review_status as string) ?? 'pending') as ReviewStatus,
    reviewerNote: (r.reviewer_note as string) ?? '',
    reviewedAt: (r.reviewed_at as string) ?? '',
  }
}

// ── Tasks ──────────────────────────────────────────────────────────────────

export async function getAllTasks(): Promise<Task[]> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_tasks ORDER BY submitted_at DESC LIMIT 500`
  return rows.map(toTask)
}

export async function getTask(id: string): Promise<Task | null> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_tasks WHERE id = ${id}`
  return rows[0] ? toTask(rows[0]) : null
}

export async function createTask(data: Omit<Task,'id'|'done'>): Promise<Task> {
  await initDb()
  const id = `TASK-${crypto.randomUUID()}`
  const encTfn  = encryptField(data.tfn ?? '')
  const encBank = encryptField(data.bankDetails ?? '')
  await sqlWithTimeout(sql`
    INSERT INTO crm_tasks
      (id,client_id,client_name,task_type,whatsapp,email,country,dob,tax_year,submitted_at,
       done,address,tfn,bank_details,primary_job,marital,tax_status,how_heard,au_phone,notes,file_urls)
    VALUES
      (${id},${data.clientId},${data.clientName},${data.taskType??'tax-return'},
       ${data.whatsapp},${data.email},${data.country},${data.dob},${data.taxYear},
       ${data.submittedAt},false,${data.address},${encTfn},${encBank},
       ${data.primaryJob},${data.marital},${data.taxStatus},${data.howHeard},${data.auPhone},${data.notes},
       ${JSON.stringify(data.fileUrls ?? [])})
  `, 'INSERT crm_tasks')
  return { ...data, id, done:false }
}

export async function markTaskDone(id: string): Promise<void> {
  await initDb()
  const task = await getTask(id)
  if (!task) return

  // Update DB first — if file deletion fails later, task is still correctly marked done
  await sql`
    UPDATE crm_tasks SET
      done         = TRUE,
      address      = '',
      tfn          = '',
      bank_details = '',
      primary_job  = '',
      marital      = '',
      au_phone     = '',
      file_urls    = '[]'
    WHERE id = ${id}
  `

  // Delete files after DB is committed — non-blocking, best-effort
  if (task.fileUrls && task.fileUrls.length > 0) {
    deleteFiles(task.fileUrls).catch(err => console.error('[markTaskDone] file cleanup failed:', err))
  }
}

export async function updateTaskNotes(id: string, notes: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_tasks SET notes = ${notes} WHERE id = ${id}`
}

export async function deleteTaskAndArchive(taskId: string): Promise<void> {
  await initDb()
  const task = await getTask(taskId)
  if (!task) return

  const taskNotes = [task.notes, task.reviewerNote]
    .map(s => (s ?? '').trim())
    .filter(Boolean)
    .join('\n')
  const client = await db.connect()
  try {
    await client.query('BEGIN')
    await client.query(
      `INSERT INTO crm_clients
        (id,full_name,dob,whatsapp,email,country,how_heard,notes,tax_returns,super_returns,tfn_service,abn_service,created_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'[]','[]',
         '{"done":false,"completedAt":"","notes":""}',
         '{"done":false,"completedAt":"","notes":""}',
         $9)
       ON CONFLICT (id) DO UPDATE SET
         how_heard = CASE
           WHEN crm_clients.how_heard = '' AND EXCLUDED.how_heard != ''
           THEN EXCLUDED.how_heard
           ELSE crm_clients.how_heard
         END,
         notes = CASE
           WHEN EXCLUDED.notes != '' AND crm_clients.notes NOT LIKE '%' || EXCLUDED.notes || '%'
           THEN TRIM(crm_clients.notes || E'\\n' || EXCLUDED.notes)
           ELSE crm_clients.notes
         END`,
      [task.clientId, task.clientName, task.dob, task.whatsapp, task.email,
       task.country, task.howHeard, taskNotes, new Date().toISOString()]
    )
    await client.query('DELETE FROM crm_tasks WHERE id = $1', [taskId])
    await client.query('COMMIT')
  } catch (err) {
    await client.query('ROLLBACK')
    throw err
  } finally {
    client.release()
  }
}

// Delete task permanently — no client card created, all data gone
// FIX: also cleans up Blob storage files (previously leaked)
export async function deleteTaskPermanent(taskId: string): Promise<void> {
  await initDb()
  const task = await getTask(taskId)
  await sql`DELETE FROM crm_tasks WHERE id = ${taskId}`
  // Non-blocking cleanup — delete files after DB row is gone
  if (task?.fileUrls && task.fileUrls.length > 0) {
    deleteFiles(task.fileUrls).catch(err =>
      console.error('[deleteTaskPermanent] file cleanup failed:', err)
    )
  }
}

// ── Clients ────────────────────────────────────────────────────────────────

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

// Tax returns
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

// Super returns
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

// TFN / ABN services
export async function updateService(clientId: string, service: 'tfn'|'abn', data: ServiceRecord): Promise<void> {
  await initDb()
  const col = service === 'tfn' ? 'tfn_service' : 'abn_service'
  if (col === 'tfn_service') {
    await sql`UPDATE crm_clients SET tfn_service = ${JSON.stringify(data)} WHERE id = ${clientId}`
  } else {
    await sql`UPDATE crm_clients SET abn_service = ${JSON.stringify(data)} WHERE id = ${clientId}`
  }
}

// ── Full client update (from client detail page) ──────────────────────────

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
      full_name  = ${fullName},
      dob        = ${dob},
      whatsapp   = ${whatsapp},
      email      = ${email},
      country    = ${country},
      how_heard  = ${howHeard},
      notes      = ${notes}
    WHERE id = ${id}
  `
  return getClientById(id)
}

export async function clearClientSensitiveData(id: string): Promise<ClientRecord | null> {
  await initDb()
  const client = await getClientById(id)
  if (!client) return null

  // Clear sensitive fields from tasks (TFN, bank, address, files)
  await sql`
    UPDATE crm_tasks SET
      address      = '',
      tfn          = '',
      bank_details = '',
      primary_job  = '',
      marital      = '',
      au_phone     = '',
      file_urls    = '[]'
    WHERE client_id = ${id}
  `

  // Clear email from client record — email is PII under Privacy Act / GDPR
  const clearedNote = client.notes.includes('[PII CLEARED]')
    ? client.notes
    : `[PII CLEARED ${new Date().toISOString().slice(0,10)}] ${client.notes}`.trim()
  await sql`UPDATE crm_clients SET email = '', notes = ${clearedNote} WHERE id = ${id}`

  return getClientById(id)
}

export async function markClientHandled(id: string): Promise<ClientRecord | null> {
  await initDb()
  const client = await getClientById(id)
  if (!client) return null
  const handledNote = client.notes.includes('[HANDLED]') ? client.notes : `[HANDLED] ${client.notes}`.trim()
  await sql`UPDATE crm_clients SET notes = ${handledNote} WHERE id = ${id}`
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

export async function getAllArchivedClients(): Promise<ClientRecord[]> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_clients WHERE archived = TRUE ORDER BY created_at DESC LIMIT 1000`
  return rows.map(toClient)
}

// Active clients only (excludes archived)
export async function getAllActiveClients(): Promise<ClientRecord[]> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_clients WHERE (archived = FALSE OR archived IS NULL) ORDER BY created_at DESC LIMIT 1000`
  return rows.map(toClient)
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

// Efficient check: does this client have any open (non-done) tasks?
// Used by DELETE /api/crm/clients/[id] to prevent orphan tasks.
export async function getOpenTaskCountByClientId(clientId: string): Promise<number> {
  await initDb()
  const { rows } = await sql`
    SELECT COUNT(*) AS cnt FROM crm_tasks
    WHERE client_id = ${clientId} AND done = FALSE
  `
  return Number(rows[0]?.cnt ?? 0)
}

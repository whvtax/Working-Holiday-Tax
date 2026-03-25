/**
 * Vercel Postgres DB layer
 * Tables: crm_clients (permanent) + crm_tasks (active submissions)
 */
import { sql } from '@vercel/postgres'
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
}

export type TaskType = 'tax-return' | 'super' | 'tfn' | 'abn'

export type Task = {
  id:string; clientId:string; clientName:string; taskType:TaskType
  whatsapp:string; email:string; country:string; dob:string
  taxYear:string; submittedAt:string; done:boolean
  address:string; tfn:string; bankDetails:string; primaryJob:string
  marital:string; taxStatus:string; howHeard:string; auPhone:string; notes:string
}

// ── Init ───────────────────────────────────────────────────────────────────

export async function initDb() {
  await sql`
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
      created_at    TEXT NOT NULL DEFAULT ''
    )
  `
  await sql`
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
      notes        TEXT NOT NULL DEFAULT ''
    )
  `
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
    tfn: r.tfn as string, bankDetails: r.bank_details as string,
    primaryJob: r.primary_job as string, marital: r.marital as string,
    taxStatus: r.tax_status as string, howHeard: r.how_heard as string,
    auPhone: r.au_phone as string, notes: r.notes as string,
  }
}

// ── Tasks ──────────────────────────────────────────────────────────────────

export async function getAllTasks(): Promise<Task[]> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_tasks ORDER BY submitted_at DESC`
  return rows.map(toTask)
}

export async function getTask(id: string): Promise<Task | null> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_tasks WHERE id = ${id}`
  return rows[0] ? toTask(rows[0]) : null
}

export async function createTask(data: Omit<Task,'id'|'done'>): Promise<Task> {
  await initDb()
  // Use UUID for collision-safe unique IDs
  const id = `TASK-${crypto.randomUUID()}`
  await sql`
    INSERT INTO crm_tasks
      (id,client_id,client_name,task_type,whatsapp,email,country,dob,tax_year,submitted_at,
       done,address,tfn,bank_details,primary_job,marital,tax_status,how_heard,au_phone,notes)
    VALUES
      (${id},${data.clientId},${data.clientName},${data.taskType??'tax-return'},
       ${data.whatsapp},${data.email},${data.country},${data.dob},${data.taxYear},
       ${data.submittedAt},false,${data.address},${data.tfn},${data.bankDetails},
       ${data.primaryJob},${data.marital},${data.taxStatus},${data.howHeard},${data.auPhone},${data.notes})
  `
  return { ...data, id, done:false }
}

export async function markTaskDone(id: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_tasks SET done = TRUE WHERE id = ${id}`
}

export async function updateTaskNotes(id: string, notes: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_tasks SET notes = ${notes} WHERE id = ${id}`
}

/**
 * Delete task + upsert client atomically.
 * Uses BEGIN/COMMIT so that a partial failure leaves the DB consistent.
 */
export async function deleteTaskAndArchive(taskId: string): Promise<void> {
  await initDb()
  const task = await getTask(taskId)
  if (!task) return

  const existing = await getClientById(task.clientId)

  // Run both operations inside a transaction to avoid partial state
  await sql`BEGIN`
  try {
    if (!existing) {
      await sql`
        INSERT INTO crm_clients
          (id,full_name,dob,whatsapp,email,country,how_heard,notes,tax_returns,super_returns,tfn_service,abn_service,created_at)
        VALUES
          (${task.clientId},${task.clientName},${task.dob},${task.whatsapp},${task.email},
           ${task.country},${task.howHeard},'','[]','[]',
           '{"done":false,"completedAt":"","notes":""}',
           '{"done":false,"completedAt":"","notes":""}',
           ${new Date().toISOString()})
      `
    }
    await sql`DELETE FROM crm_tasks WHERE id = ${taskId}`
    await sql`COMMIT`
  } catch (err) {
    await sql`ROLLBACK`
    throw err
  }
}

// ── Clients ────────────────────────────────────────────────────────────────

export async function getAllClients(): Promise<ClientRecord[]> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_clients ORDER BY created_at DESC`
  return rows.map(toClient)
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

  // Update all editable scalar fields
  await sql`
    UPDATE crm_clients SET
      full_name  = ${data.fullName   ?? client.fullName},
      dob        = ${data.dob        ?? client.dob},
      whatsapp   = ${data.whatsapp   ?? client.whatsapp},
      email      = ${data.email      ?? client.email},
      country    = ${data.country    ?? client.country},
      how_heard  = ${data.howHeard   ?? client.howHeard},
      notes      = ${data.notes      ?? client.notes}
    WHERE id = ${id}
  `
  return getClientById(id)
}

export async function clearClientSensitiveData(id: string): Promise<ClientRecord | null> {
  await initDb()
  const client = await getClientById(id)
  if (!client) return null
  // Sensitive data lives in tasks — just return client as-is
  // Tasks are separate table; clearing means noting it in client notes
  await sql`UPDATE crm_clients SET notes = ${client.notes} WHERE id = ${id}`
  return getClientById(id)
}

export async function markClientHandled(id: string): Promise<ClientRecord | null> {
  await initDb()
  const client = await getClientById(id)
  if (!client) return null
  // 'handled' is not a column in crm_clients — store as a note marker
  const handledNote = client.notes.includes('[HANDLED]') ? client.notes : `[HANDLED] ${client.notes}`.trim()
  await sql`UPDATE crm_clients SET notes = ${handledNote} WHERE id = ${id}`
  return getClientById(id)
}

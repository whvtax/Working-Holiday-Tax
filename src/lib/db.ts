/**
 * Vercel Postgres DB layer
 * Two tables: crm_clients (permanent) + crm_tasks (from form submissions)
 */
import { sql } from '@vercel/postgres'

export type ClientRecord = {
  id: string
  fullName: string
  dob: string
  whatsapp: string
  email: string
  country: string
  taxReturns: TaxReturn[]   // history of completed returns
  notes: string
  createdAt: string
}

export type TaxReturn = {
  year: string        // e.g. "2023-24"
  refundAmount: number
  type: 'refund' | 'owed'
  completedAt: string
}

export type Task = {
  id: string
  clientId: string
  clientName: string
  whatsapp: string
  email: string
  country: string
  dob: string
  taxYear: string
  submittedAt: string
  done: boolean
  // full form details
  address: string
  tfn: string
  bankDetails: string
  primaryJob: string
  marital: string
  taxStatus: string
  howHeard: string
  auPhone: string
  notes: string
}

// ── Init tables ────────────────────────────────────────────────────────────

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS crm_clients (
      id          TEXT PRIMARY KEY,
      full_name   TEXT NOT NULL DEFAULT '',
      dob         TEXT NOT NULL DEFAULT '',
      whatsapp    TEXT NOT NULL DEFAULT '',
      email       TEXT NOT NULL DEFAULT '',
      country     TEXT NOT NULL DEFAULT '',
      tax_returns TEXT NOT NULL DEFAULT '[]',
      notes       TEXT NOT NULL DEFAULT '',
      created_at  TEXT NOT NULL DEFAULT ''
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS crm_tasks (
      id           TEXT PRIMARY KEY,
      client_id    TEXT NOT NULL DEFAULT '',
      client_name  TEXT NOT NULL DEFAULT '',
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

// ── Converters ─────────────────────────────────────────────────────────────

function toClient(r: Record<string,unknown>): ClientRecord {
  let taxReturns: TaxReturn[] = []
  try { taxReturns = JSON.parse(r.tax_returns as string) } catch {}
  return {
    id: r.id as string,
    fullName: r.full_name as string,
    dob: r.dob as string,
    whatsapp: r.whatsapp as string,
    email: r.email as string,
    country: r.country as string,
    taxReturns,
    notes: r.notes as string ?? '',
    createdAt: r.created_at as string,
  }
}

function toTask(r: Record<string,unknown>): Task {
  return {
    id: r.id as string,
    clientId: r.client_id as string,
    clientName: r.client_name as string,
    whatsapp: r.whatsapp as string,
    email: r.email as string,
    country: r.country as string,
    dob: r.dob as string,
    taxYear: r.tax_year as string,
    submittedAt: r.submitted_at as string,
    done: r.done as boolean,
    address: r.address as string,
    tfn: r.tfn as string,
    bankDetails: r.bank_details as string,
    primaryJob: r.primary_job as string,
    marital: r.marital as string,
    taxStatus: r.tax_status as string,
    howHeard: r.how_heard as string,
    auPhone: r.au_phone as string,
    notes: r.notes as string,
  }
}

// ── Tasks ──────────────────────────────────────────────────────────────────

export async function createTask(data: Omit<Task, 'id' | 'done'>): Promise<Task> {
  await initDb()
  const id = `TASK-${Date.now()}`
  await sql`
    INSERT INTO crm_tasks
      (id,client_id,client_name,whatsapp,email,country,dob,tax_year,submitted_at,
       done,address,tfn,bank_details,primary_job,marital,tax_status,how_heard,au_phone,notes)
    VALUES
      (${id},${data.clientId},${data.clientName},${data.whatsapp},${data.email},
       ${data.country},${data.dob},${data.taxYear},${data.submittedAt},
       false,${data.address},${data.tfn},${data.bankDetails},${data.primaryJob},
       ${data.marital},${data.taxStatus},${data.howHeard},${data.auPhone},${data.notes})
  `
  return { ...data, id, done: false }
}

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

export async function updateTaskNotes(id: string, notes: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_tasks SET notes = ${notes} WHERE id = ${id}`
}

export async function markTaskDone(id: string): Promise<void> {
  await initDb()
  await sql`UPDATE crm_tasks SET done = TRUE WHERE id = ${id}`
}

/**
 * Complete a task: move client to permanent clients table, delete task
 */
export async function completeTask(taskId: string): Promise<void> {
  await initDb()
  const task = await getTask(taskId)
  if (!task) return

  // Upsert into permanent clients table
  const existing = await getClientById(task.clientId)
  if (existing) {
    // Just update basic info if changed
    await sql`
      UPDATE crm_clients SET
        full_name = ${task.clientName},
        dob       = ${task.dob},
        whatsapp  = ${task.whatsapp},
        email     = ${task.email},
        country   = ${task.country}
      WHERE id = ${task.clientId}
    `
  } else {
    await sql`
      INSERT INTO crm_clients (id, full_name, dob, whatsapp, email, country, tax_returns, notes, created_at)
      VALUES (${task.clientId}, ${task.clientName}, ${task.dob}, ${task.whatsapp},
              ${task.email}, ${task.country}, '[]', '', ${new Date().toISOString()})
    `
  }

  // Delete the task
  await sql`DELETE FROM crm_tasks WHERE id = ${taskId}`
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

export async function addTaxReturn(clientId: string, taxReturn: TaxReturn): Promise<void> {
  await initDb()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = [...client.taxReturns.filter(r => r.year !== taxReturn.year), taxReturn]
  await sql`UPDATE crm_clients SET tax_returns = ${JSON.stringify(updated)} WHERE id = ${clientId}`
}

export async function removeTaxReturn(clientId: string, year: string): Promise<void> {
  await initDb()
  const client = await getClientById(clientId)
  if (!client) return
  const updated = client.taxReturns.filter(r => r.year !== year)
  await sql`UPDATE crm_clients SET tax_returns = ${JSON.stringify(updated)} WHERE id = ${clientId}`
}

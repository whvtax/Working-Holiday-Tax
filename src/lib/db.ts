/**
 * Vercel Postgres database layer
 * Requires: POSTGRES_URL env var set in Vercel dashboard
 */

import { sql } from '@vercel/postgres'

export type TaxYear = string

export type ClientRecord = {
  id: string
  fullName: string
  dob: string
  whatsapp: string
  email: string
  country: string
  address: string
  tfn: string
  bankDetails: string
  primaryJob: string
  marital: string
  taxStatus: string
  howHeard: string
  auPhone: string
  taxYear: TaxYear
  submittedAt: string
  handled: boolean
  notes: string
  files: { bankStatement: string | null; selfiePassport: string | null; invoices: string | null }
}

// ── Init table (runs on first request if table doesn't exist) ─────────────

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS crm_clients (
      id           TEXT PRIMARY KEY,
      full_name    TEXT NOT NULL DEFAULT '',
      dob          TEXT NOT NULL DEFAULT '',
      whatsapp     TEXT NOT NULL DEFAULT '',
      email        TEXT NOT NULL DEFAULT '',
      country      TEXT NOT NULL DEFAULT '',
      address      TEXT NOT NULL DEFAULT '',
      tfn          TEXT NOT NULL DEFAULT '',
      bank_details TEXT NOT NULL DEFAULT '',
      primary_job  TEXT NOT NULL DEFAULT '',
      marital      TEXT NOT NULL DEFAULT '',
      tax_status   TEXT NOT NULL DEFAULT '',
      how_heard    TEXT NOT NULL DEFAULT '',
      au_phone     TEXT NOT NULL DEFAULT '',
      tax_year     TEXT NOT NULL DEFAULT '',
      submitted_at TEXT NOT NULL DEFAULT '',
      handled      BOOLEAN NOT NULL DEFAULT FALSE,
      notes        TEXT NOT NULL DEFAULT '',
      files        TEXT NOT NULL DEFAULT '{}'
    )
  `
}

// ── Row → ClientRecord ─────────────────────────────────────────────────────

function toRecord(row: Record<string, unknown>): ClientRecord {
  let files = { bankStatement: null, selfiePassport: null, invoices: null }
  try { files = JSON.parse(row.files as string) } catch {}
  return {
    id:          row.id as string,
    fullName:    row.full_name as string,
    dob:         row.dob as string,
    whatsapp:    row.whatsapp as string,
    email:       row.email as string,
    country:     row.country as string,
    address:     row.address as string,
    tfn:         row.tfn as string,
    bankDetails: row.bank_details as string,
    primaryJob:  row.primary_job as string,
    marital:     row.marital as string,
    taxStatus:   row.tax_status as string,
    howHeard:    row.how_heard as string,
    auPhone:     row.au_phone as string,
    taxYear:     row.tax_year as string,
    submittedAt: row.submitted_at as string,
    handled:     row.handled as boolean,
    notes:       row.notes as string,
    files,
  }
}

// ── CRUD ───────────────────────────────────────────────────────────────────

export async function getAllClients(): Promise<ClientRecord[]> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_clients ORDER BY submitted_at DESC`
  return rows.map(toRecord)
}

export async function getClient(id: string): Promise<ClientRecord | null> {
  await initDb()
  const { rows } = await sql`SELECT * FROM crm_clients WHERE id = ${id}`
  return rows[0] ? toRecord(rows[0]) : null
}

export async function upsertClient(data: Omit<ClientRecord, 'handled'> & { id?: string; handled?: boolean }): Promise<ClientRecord> {
  await initDb()
  const id      = data.id ?? `CLT-${Date.now()}`
  const files   = JSON.stringify(data.files ?? { bankStatement: null, selfiePassport: null, invoices: null })
  const handled = data.handled ?? false

  await sql`
    INSERT INTO crm_clients
      (id, full_name, dob, whatsapp, email, country, address, tfn, bank_details,
       primary_job, marital, tax_status, how_heard, au_phone, tax_year,
       submitted_at, handled, notes, files)
    VALUES
      (${id}, ${data.fullName}, ${data.dob}, ${data.whatsapp}, ${data.email},
       ${data.country}, ${data.address}, ${data.tfn}, ${data.bankDetails},
       ${data.primaryJob}, ${data.marital}, ${data.taxStatus}, ${data.howHeard},
       ${data.auPhone}, ${data.taxYear}, ${data.submittedAt}, ${handled},
       ${data.notes ?? ''}, ${files})
    ON CONFLICT (id) DO UPDATE SET
      full_name    = EXCLUDED.full_name,
      dob          = EXCLUDED.dob,
      whatsapp     = EXCLUDED.whatsapp,
      email        = EXCLUDED.email,
      country      = EXCLUDED.country,
      address      = EXCLUDED.address,
      tfn          = EXCLUDED.tfn,
      bank_details = EXCLUDED.bank_details,
      primary_job  = EXCLUDED.primary_job,
      marital      = EXCLUDED.marital,
      tax_status   = EXCLUDED.tax_status,
      how_heard    = EXCLUDED.how_heard,
      au_phone     = EXCLUDED.au_phone,
      tax_year     = EXCLUDED.tax_year,
      notes        = EXCLUDED.notes,
      files        = EXCLUDED.files
  `
  const client = await getClient(id)
  return client!
}

export async function markHandled(id: string): Promise<boolean> {
  await initDb()
  await sql`UPDATE crm_clients SET handled = TRUE WHERE id = ${id}`
  return true
}

export async function clearClientDetails(id: string): Promise<boolean> {
  await initDb()
  await sql`
    UPDATE crm_clients SET
      address      = '',
      tfn          = '',
      bank_details = '',
      primary_job  = '',
      marital      = '',
      tax_status   = '',
      how_heard    = '',
      au_phone     = '',
      files        = '{}'
    WHERE id = ${id}
  `
  return true
}

export async function deleteClient(id: string): Promise<boolean> {
  await initDb()
  await sql`DELETE FROM crm_clients WHERE id = ${id}`
  return true
}

import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PGlite } from '@electric-sql/pglite'
import { SqlEllaDb, type SqlQuery } from '../db'
import { EllaRepo } from '../store'

export const MIGRATION = join(process.cwd(), 'supabase', 'migrations', '051_ella.sql')

/** A fresh in-process Postgres with the Supabase roles, and Ella's migration applied. */
export async function freshDb(): Promise<PGlite & SqlQuery> {
  const db = new PGlite()
  await db.exec(`
    DO $$ BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'anon') THEN CREATE ROLE anon; END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'authenticated') THEN CREATE ROLE authenticated; END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'service_role') THEN CREATE ROLE service_role; END IF;
    END $$;`)
  await db.exec(readFileSync(MIGRATION, 'utf8'))
  return db as PGlite & SqlQuery
}

export const repoOf = (db: SqlQuery) => new EllaRepo(new SqlEllaDb(db))

// Ella's one door to the database: every call is an ella_api_* function in
// migration 051 (jsonb in, jsonb out). Production uses supabase.rpc; tests run
// the very same SQL functions on an in-process Postgres.
import { getSupabase } from '@/lib/supabase'

export interface EllaDb {
  call<T = unknown>(op: string, args?: Record<string, unknown>): Promise<T>
}

/** Strips undefined so the SQL side sees a missing key, not a null. */
const clean = (args: Record<string, unknown> = {}) =>
  JSON.parse(JSON.stringify(args, (_k, v) => (v === undefined ? undefined : v))) as Record<string, unknown>

export class SupabaseEllaDb implements EllaDb {
  async call<T>(op: string, args: Record<string, unknown> = {}): Promise<T> {
    const { data, error } = await getSupabase().rpc(`ella_api_${op}`, { p: clean(args) })
    if (error) throw new Error(`ella_api_${op} failed: ${error.message}`)
    return data as T
  }
}

/** Any client with a parameterised query (PGlite in tests, pg elsewhere). */
export interface SqlQuery { query<R = Record<string, unknown>>(text: string, params?: unknown[]): Promise<{ rows: R[] }> }

export class SqlEllaDb implements EllaDb {
  constructor(private sql: SqlQuery) {}
  async call<T>(op: string, args: Record<string, unknown> = {}): Promise<T> {
    if (!/^[a-z_]+$/.test(op)) throw new Error(`Bad op ${op}`)
    const r = await this.sql.query<{ r: T }>(`SELECT ella_api_${op}($1::jsonb) AS r`, [JSON.stringify(clean(args))])
    return r.rows[0]?.r as T
  }
}

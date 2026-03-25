/**
 * audit.ts — lightweight audit log for CRM actions
 * Writes to crm_audit_log table in Postgres.
 * Silently fails if DB is unavailable (non-blocking, fire-and-forget).
 */

export type AuditAction =
  | 'client.view' | 'client.update' | 'client.delete' | 'client.clear'
  | 'task.view' | 'task.done' | 'task.delete' | 'task.notes'
  | 'login.success' | 'login.failed' | 'login.locked' | 'logout'

export async function auditLog(action: AuditAction, resourceId: string, extra?: string): Promise<void> {
  try {
    const { sql } = await import('@vercel/postgres')
    // Create table if it doesn't exist (idempotent)
    await sql`
      CREATE TABLE IF NOT EXISTS crm_audit_log (
        id          BIGSERIAL PRIMARY KEY,
        action      TEXT NOT NULL,
        resource_id TEXT NOT NULL DEFAULT '',
        extra       TEXT NOT NULL DEFAULT '',
        ts          TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `
    await sql`
      INSERT INTO crm_audit_log (action, resource_id, extra)
      VALUES (${action}, ${resourceId}, ${extra ?? ''})
    `
  } catch {
    // Audit log failure is non-fatal — log to console only
    console.warn('[audit] Failed to write audit log:', action, resourceId)
  }
}

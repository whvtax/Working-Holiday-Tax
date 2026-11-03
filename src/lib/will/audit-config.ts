// Audit log retention and alert switches, as configuration instead of constants.
//
// DEFAULTS PRESERVE TODAY'S BEHAVIOUR: every row is kept 90 days and every alert
// is OFF. Changing retention is a privacy decision (APP 11.2: do not keep
// personal information longer than needed, but do keep enough to scope an
// incident), so it belongs to the owner and the supervising agent, not to code.
// The runbook recommends 365 days for the security classes below.
//
//   AUDIT_RETENTION_DAYS            default 90    days kept for ordinary rows (decisions, guard verdicts, noise)
//   AUDIT_SECURITY_RETENTION_DAYS   default 90    days kept for the security classes (see SECURITY_ACTORS)
//
// Both are clamped to 30..3650. Garbage falls back to the default. The security
// retention can never be SHORTER than the ordinary one, so a typo cannot make
// the evidence rows disappear before the noise does.

export const DEFAULT_RETENTION_DAYS = 90;
export const MIN_RETENTION_DAYS = 30;
export const MAX_RETENTION_DAYS = 3650;

/**
 * Rows that answer "who got in, who did what, who read what":
 *   auth     CRM login steps and new devices
 *   owner    owner actions (kill switch, deletes, replies)
 *   access   bulk reads (export, media, search, document views)
 *   channel  webhook signature rejections
 */
export const SECURITY_ACTORS = ['auth', 'owner', 'access', 'channel'] as const;

type Env = Record<string, string | undefined>;

function days(raw: string | undefined, fallback: number): number {
  if (raw === undefined || raw.trim() === '') return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n)) return fallback;
  return Math.min(MAX_RETENTION_DAYS, Math.max(MIN_RETENTION_DAYS, n));
}

export interface AuditRetention { ordinaryDays: number; securityDays: number }

export function auditRetention(env: Env = process.env): AuditRetention {
  const ordinaryDays = days(env.AUDIT_RETENTION_DAYS, DEFAULT_RETENTION_DAYS);
  const securityDays = Math.max(ordinaryDays, days(env.AUDIT_SECURITY_RETENTION_DAYS, DEFAULT_RETENTION_DAYS));
  return { ordinaryDays, securityDays };
}

const DAY_MS = 24 * 60 * 60 * 1000;

interface PurgeStore {
  purgeAudit?(olderThanMs: number, opts?: { exceptActors?: string[]; onlyActors?: string[] }): Promise<number>;
}

/**
 * The nightly purge: ordinary rows at `ordinaryDays`, security rows at `securityDays`.
 * Returns the number of rows removed. Never throws.
 */
export async function runAuditRetention(store: PurgeStore, env: Env = process.env): Promise<number> {
  if (typeof store.purgeAudit !== 'function') return 0;
  const { ordinaryDays, securityDays } = auditRetention(env);
  const sec = [...SECURITY_ACTORS];
  let n = 0;
  n += await store.purgeAudit(ordinaryDays * DAY_MS, { exceptActors: sec }).catch(() => 0);
  n += await store.purgeAudit(securityDays * DAY_MS, { onlyActors: sec }).catch(() => 0);
  return n;
}

// ---- alert switches -------------------------------------------------------

export type AlertKind = 'bulk_export' | 'kill_switch' | 'signature_burst' | 'cron_stale';

const ALERT_ENV: Record<AlertKind, string> = {
  bulk_export: 'SECURITY_ALERT_BULK_EXPORT',
  kill_switch: 'SECURITY_ALERT_KILL_SWITCH',
  signature_burst: 'SECURITY_ALERT_SIGNATURE_BURST',
  cron_stale: 'SECURITY_ALERT_CRON_STALE',
};

/** Off unless the variable is exactly "1" or "true". Unset, empty, "0", "yes", anything else: off. */
export function alertEnabled(kind: AlertKind, env: Env = process.env): boolean {
  const v = (env[ALERT_ENV[kind]] ?? '').trim().toLowerCase();
  return v === '1' || v === 'true';
}

export function alertThreshold(env: Env = process.env): number {
  const n = Number(env.SECURITY_ALERT_SIGNATURE_THRESHOLD);
  return Number.isInteger(n) && n >= 2 && n <= 1000 ? n : 5;
}

export function cronStaleMinutes(env: Env = process.env): number {
  const n = Number(env.SECURITY_ALERT_CRON_STALE_MINUTES);
  return Number.isInteger(n) && n >= 10 && n <= 1440 ? n : 20;
}

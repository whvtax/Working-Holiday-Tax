// Audit rows for bulk and document READS (round 1 F-04). Until now an export of
// every conversation, a document view or a customer search left no trace, so
// after a suspected session hijack "was anything taken?" could only be answered
// "assume everything".
//
// One row per read: actor 'access', action 'data_read'. Detail holds the route,
// a whitelist of non-identifying parameters, and who (session id, masked IP,
// device). It NEVER holds a customer name, phone number, search text, file name,
// message body or storage path: search is logged as length and kind only, ids and
// paths as a short one-way hash. Whitelisting is enforced here, so a future caller
// cannot sneak free text in.
//
// Best effort like every audit write: a logging failure never blocks the read.
import crypto from 'crypto';
import { getStore } from './store';
import { getClientIp } from '@/lib/get-ip';
import { maskIp, describeDevice } from '@/lib/security-watch';
import { sessionTag, type AuditWho } from './audit-context';
import { raiseAlert } from './security-alerts';

export type ReadRoute = 'export' | 'media' | 'search' | 'chats' | 'crm_file' | 'leads_csv' | 'clients';

/** Routes that fire many times in normal use: at most one row per session per window, with the number of calls it covers. */
const THROTTLE_MS: Partial<Record<ReadRoute, number>> = {
  search: 30_000,
  chats: 60_000,
  clients: 5 * 60_000,
};
const lastRow = new Map<string, { at: number; skipped: number }>();

export function __resetAccessLogState(): void { lastRow.clear(); }

/** Allowed detail keys per route, and the only value shapes they may carry. */
const ALLOWED: Record<ReadRoute, string[]> = {
  export: ['format', 'all', 'hours', 'conversations', 'messages'],
  media: ['idHash'],
  search: ['qLen', 'qKind', 'waiting'],
  chats: ['offset', 'limit', 'filter'],
  crm_file: ['pathHash'],
  leads_csv: ['csv'],
  clients: ['archived', 'offset', 'limit'],
};
const SAFE_STRING = /^[a-z0-9_-]{0,32}$/i;

/** Short one-way fingerprint. For identifiers that are not secrets (media ids, storage paths), not for phone numbers. */
export function shortHash(value: string): string {
  return crypto.createHash('sha256').update(value).digest('hex').slice(0, 10);
}

/** What kind of thing was typed, never the text itself. */
export function searchKind(q: string): 'digits' | 'text' | 'mixed' {
  const t = q.trim();
  if (/^[\d\s+()-]+$/.test(t)) return 'digits';
  return /\d/.test(t) ? 'mixed' : 'text';
}

function cookieValue(req: Request, name: string): string | undefined {
  const raw = req.headers.get('cookie');
  if (!raw) return undefined;
  for (const part of raw.split(';')) {
    const i = part.indexOf('=');
    if (i > 0 && part.slice(0, i).trim() === name) return part.slice(i + 1).trim();
  }
  return undefined;
}

/** Session id, masked IP and device for this request. The cookie is only decoded, authorisation was already done by the route. */
export function auditWhoFromRequest(req: Request): AuditWho {
  const h = (k: string) => req.headers.get(k);
  return {
    sid: sessionTag(cookieValue(req, 'crm_session')) ?? 'unknown',
    ip: maskIp(getClientIp(req)),
    device: describeDevice(h('user-agent')),
    country: h('x-vercel-ip-country') || null,
  };
}

function clean(route: ReadRoute, extra: Record<string, unknown>): Record<string, string | number | boolean> {
  const out: Record<string, string | number | boolean> = {};
  for (const k of ALLOWED[route]) {
    const v = extra[k];
    if (typeof v === 'boolean') out[k] = v;
    else if (typeof v === 'number' && Number.isFinite(v)) out[k] = v;
    else if (typeof v === 'string' && SAFE_STRING.test(v)) out[k] = v;
  }
  return out;
}

/**
 * Record one read. `extra` is filtered through the per-route whitelist.
 * Returns whether a row was written (false when throttled or the store failed).
 */
export async function recordDataRead(req: Request, route: ReadRoute, extra: Record<string, unknown> = {}): Promise<boolean> {
  try {
    const who = auditWhoFromRequest(req);
    const windowMs = THROTTLE_MS[route];
    let covers = 1;
    if (windowMs) {
      const key = `${who.sid}|${route}`;
      const now = Date.now();
      const prev = lastRow.get(key);
      if (prev && now - prev.at < windowMs) { prev.skipped += 1; return false; }
      covers += prev?.skipped ?? 0;
      lastRow.set(key, { at: now, skipped: 0 });
      if (lastRow.size > 500) lastRow.clear(); // bounded
    }
    await getStore().audit('access', 'data_read', { route, ...clean(route, extra), ...(covers > 1 ? { calls: covers } : {}), by: who });
    if (route === 'export') {
      await raiseAlert('bulk_export', 'Bulk export of conversations used', '<p>The CRM export of customer conversations was downloaded.</p>', { who });
    }
    return true;
  } catch {
    return false;
  }
}

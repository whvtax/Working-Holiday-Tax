// Who did it. The CRM has one shared password, so "owner" in the decision log
// cannot tell Jo from a stolen session (round 1 F-05). A real per-person
// identity needs per-person credentials, which is a product change. What IS
// possible without one: every login mints a random session id (sid), and every
// audited owner action and bulk read carries that sid, the masked IP and the
// device. A hijacked session then shows up as a sid that was never seen at
// login, or one that logged in from an unfamiliar place.
//
// No PII: sid is random, the IP is already masked, the device is "Chrome on
// macOS".
import { AsyncLocalStorage } from 'node:async_hooks';
import crypto from 'crypto';

export interface AuditWho {
  sid: string;
  ip: string;
  device: string;
  country: string | null;
}

const als = new AsyncLocalStorage<AuditWho>();

/** Run `fn` with an actor context: every store.audit('owner', ...) inside it is stamped with `by`. */
export function runWithAuditWho<T>(who: AuditWho, fn: () => Promise<T> | T): Promise<T> | T {
  return als.run(who, fn);
}

export function currentAuditWho(): AuditWho | undefined {
  return als.getStore();
}

/** Actors whose rows are stamped. System actors (scheduler, assistant...) are not people. */
const STAMPED_ACTORS = new Set(['owner', 'access']);

/**
 * Called by both store implementations inside audit(). Adds `by` to the detail of a
 * stamped actor when a context exists. Leaves everything else byte for byte unchanged,
 * and never overwrites a `by` the caller set.
 */
export function stampAuditDetail(actor: string, detail: unknown): unknown {
  if (!STAMPED_ACTORS.has(actor)) return detail;
  const who = als.getStore();
  if (!who) return detail;
  if (detail === undefined || detail === null) return { by: who };
  if (typeof detail === 'object' && !Array.isArray(detail) && !('by' in (detail as object))) {
    return { ...(detail as Record<string, unknown>), by: who };
  }
  return detail;
}

/**
 * A short one-way tag for the session behind a token, safe to store in the audit log. The raw `sid`
 * claim (see createSession in crm-store.ts) is also the handle used to revoke a session, so it is
 * never written down; the tag is the first 12 hex chars of its SHA-256. Decode only, this is NOT an
 * authorisation check (callers validate the session first). Tokens without a sid report 'legacy',
 * anything unparseable reports undefined.
 */
export function sessionTag(token: string | undefined): string | undefined {
  if (!token) return undefined;
  try {
    const dot = token.lastIndexOf('.');
    if (dot < 0) return undefined;
    const claims = JSON.parse(Buffer.from(token.slice(0, dot), 'base64url').toString());
    if (typeof claims.sid !== 'string' || claims.sid.length < 8) return 'legacy';
    return crypto.createHash('sha256').update(claims.sid).digest('hex').slice(0, 12);
  } catch { return undefined; }
}

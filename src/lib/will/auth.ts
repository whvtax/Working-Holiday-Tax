// Auth guard for Will's API routes — reuses the CRM's own session, so the
// deferred "authentication" item is now covered by the existing CRM login.
// Uses next/headers so it works for every route-handler shape (Request or none).
import { cookies, headers } from 'next/headers';
import { timingSafeEqual } from 'crypto';
import { validateSession } from '@/lib/crm-store';

/** Constant-time compare for cron secrets (APPSEC-02). */
function safeEq(a: string | undefined | null, b: string | undefined | null): boolean {
  if (!a || !b) return false;
  const ba = Buffer.from(a, 'utf8'), bb = Buffer.from(b, 'utf8');
  return ba.length === bb.length && timingSafeEqual(ba, bb);
}

/** True if the caller carries a valid CRM session cookie.
 *  Async since Next 16: cookies() returns a Promise there. */
export async function sessionValid(): Promise<boolean> {
  return validateSession((await cookies()).get('crm_session')?.value);
}

/** Tick may be called by the CRM UI (session) or a scheduled cron.
 *  Accepts Vercel's cron auth (Authorization: Bearer $CRON_SECRET), a custom
 *  x-cron-secret header, or a valid CRM session (manual/dev trigger). */
export async function cronAuthorized(): Promise<boolean> {
  const h = await headers();
  const cronSecret = process.env.CRON_SECRET;
  const bearer = h.get('authorization');
  if (cronSecret && bearer && safeEq(bearer, `Bearer ${cronSecret}`)) return true;
  const will = process.env.WILL_CRON_SECRET;
  if (will && safeEq(h.get('x-cron-secret'), will)) return true;
  return await sessionValid();
}

/** Same three checks as cronAuthorized, but says which one actually matched.
 *  (audit, 5 Sep) The tick route accepts either a real scheduler secret or the
 *  dashboard's own session, so a heartbeat written from either path looked
 *  identical to the health dot — the Scheduler dot stayed green from an open
 *  browser tab alone, even with the real Vercel cron dead. Added so the tick
 *  route can record a separate "a real cron actually hit this" timestamp. */
export async function cronAuthMethod(): Promise<'cron_secret' | 'will_cron_secret' | 'session' | null> {
  const h = await headers();
  const cronSecret = process.env.CRON_SECRET;
  const bearer = h.get('authorization');
  if (cronSecret && bearer && safeEq(bearer, `Bearer ${cronSecret}`)) return 'cron_secret';
  const will = process.env.WILL_CRON_SECRET;
  if (will && safeEq(h.get('x-cron-secret'), will)) return 'will_cron_secret';
  if (await sessionValid()) return 'session';
  return null;
}

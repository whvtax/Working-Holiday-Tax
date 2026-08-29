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

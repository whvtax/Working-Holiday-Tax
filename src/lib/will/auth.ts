// Auth guard for Will's API routes — reuses the CRM's own session, so the
// deferred "authentication" item is now covered by the existing CRM login.
// Uses next/headers so it works for every route-handler shape (Request or none).
import { cookies, headers } from 'next/headers';
import { validateSession } from '@/lib/crm-store';

/** True if the caller carries a valid CRM session cookie. */
export function sessionValid(): boolean {
  return validateSession(cookies().get('crm_session')?.value);
}

/** Tick may be called by the CRM UI (session) or a scheduled cron.
 *  Accepts Vercel's cron auth (Authorization: Bearer $CRON_SECRET), a custom
 *  x-cron-secret header, or a valid CRM session (manual/dev trigger). */
export function cronAuthorized(): boolean {
  const h = headers();
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && h.get('authorization') === `Bearer ${cronSecret}`) return true;
  const will = process.env.WILL_CRON_SECRET;
  if (will && h.get('x-cron-secret') === will) return true;
  return sessionValid();
}

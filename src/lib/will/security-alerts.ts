// Push alerts for security-relevant signals. Every one is OFF by default (see
// audit-config.ts) and uses the email helper that already exists
// (sendSecurityEmail -> Resend -> CRM_ADMIN_EMAIL). Bodies carry NO customer data:
// counts, times, masked IP, session id.
//
// Throttled in memory per kind (one email per 15 minutes per warm instance). On
// serverless that is a floor, not a guarantee; it only has to stop a burst from
// becoming a flood of emails.
import { alertEnabled, alertThreshold, cronStaleMinutes, type AlertKind } from './audit-config';
import type { AuditWho } from './audit-context';

type Sender = (subject: string, html: string) => Promise<void>;

const THROTTLE_MS = 15 * 60 * 1000;
const lastSent = new Map<AlertKind, number>();

export function __resetAlertState(): void {
  lastSent.clear();
  sigWindow.length = 0;
}

async function defaultSender(subject: string, html: string): Promise<void> {
  const { sendSecurityEmail } = await import('@/lib/security-watch');
  await sendSecurityEmail(subject, html);
}

const esc = (s: string) => s.replace(/[&<>"']/g, '');

function whoLine(who?: Partial<AuditWho>): string {
  if (!who) return '';
  return `<p>Session ${esc(String(who.sid ?? 'unknown'))}, IP ${esc(String(who.ip ?? 'unknown'))}, ${esc(String(who.device ?? 'unknown device'))}.</p>`;
}

/** Returns true if an email was handed to the sender. Never throws. */
export async function raiseAlert(
  kind: AlertKind,
  subject: string,
  bodyHtml: string,
  opts: { who?: Partial<AuditWho>; env?: Record<string, string | undefined>; send?: Sender; now?: number } = {},
): Promise<boolean> {
  try {
    if (!alertEnabled(kind, opts.env ?? process.env)) return false;
    const now = opts.now ?? Date.now();
    const prev = lastSent.get(kind) ?? 0;
    if (now - prev < THROTTLE_MS) return false;
    lastSent.set(kind, now);
    await (opts.send ?? defaultSender)(subject, `${bodyHtml}${whoLine(opts.who)}<p>Time (UTC): ${new Date(now).toISOString()}</p>`);
    return true;
  } catch {
    return false;
  }
}

// ---- signature failure bursts --------------------------------------------

const sigWindow: number[] = [];
const SIG_WINDOW_MS = 60 * 60 * 1000;

/**
 * Call on EVERY rejected webhook signature (cheap, in memory). Alerts once the count in the last hour
 * reaches the threshold (default 5). Returns the count in the window.
 */
export async function noteSignatureFailure(opts: { env?: Record<string, string | undefined>; send?: Sender; now?: number } = {}): Promise<number> {
  const now = opts.now ?? Date.now();
  sigWindow.push(now);
  while (sigWindow.length && now - sigWindow[0] > SIG_WINDOW_MS) sigWindow.shift();
  if (sigWindow.length > 5000) sigWindow.splice(0, sigWindow.length - 5000); // bounded: this endpoint is public
  const env = opts.env ?? process.env;
  if (sigWindow.length >= alertThreshold(env)) {
    await raiseAlert('signature_burst', 'Webhook signature failures', `<p>${sigWindow.length} WhatsApp webhook calls failed signature verification in the last hour. Either META_APP_SECRET no longer matches Meta, or someone is sending forged webhooks. Real customer messages are not being processed while the secret is wrong.</p>`, { env, send: opts.send, now });
  }
  return sigWindow.length;
}

// ---- cron not firing -------------------------------------------------------

/** Pure: is the last real cron tick older than `maxMinutes`? A missing timestamp counts as stale. */
export function cronIsStale(lastIso: unknown, nowMs: number, maxMinutes: number): boolean {
  if (typeof lastIso !== 'string') return true;
  const t = Date.parse(lastIso);
  if (!Number.isFinite(t)) return true;
  return nowMs - t > maxMinutes * 60 * 1000;
}

export async function checkCronStale(
  lastCronIso: unknown,
  opts: { env?: Record<string, string | undefined>; send?: Sender; now?: number } = {},
): Promise<boolean> {
  const env = opts.env ?? process.env;
  const now = opts.now ?? Date.now();
  if (!alertEnabled('cron_stale', env)) return false;
  if (!cronIsStale(lastCronIso, now, cronStaleMinutes(env))) return false;
  return raiseAlert('cron_stale', 'Will scheduler cron is not firing', `<p>The scheduled cron has not called /api/will/tick for more than ${cronStaleMinutes(env)} minutes. Check CRON_SECRET in Vercel and the Cron Jobs page. Will still runs while the dashboard is open.</p>`, { env, send: opts.send, now });
}

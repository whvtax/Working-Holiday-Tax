// ============================================================
// SECURITY WATCH (Jo, 23 Oct: "how do I know nobody broke into the site or
// the systems?").
//
// Three things, none of which touches Will:
//   1. Every CRM login step is recorded (password right / wrong / locked,
//      code right / wrong), with where it came from.
//   2. A successful login from a device the CRM has not seen before sends Jo
//      an email straight away.
//   3. Every night the bank details (the setting, and every Library message)
//      are checked against ours; anything else is an URGENT task and an email.
//
// Everything here is best-effort: a logging failure never blocks a login.
// ============================================================
import crypto from 'crypto';
import { getStore } from '@/lib/will/store';

export const OUR_BSB = '062692';
export const OUR_ACCOUNT = '81049952';
export const KNOWN_DEVICES_KEY = 'security_known_devices';

export type LoginEvent = 'password_ok' | 'password_failed' | 'locked_out' | 'otp_ok' | 'otp_failed' | 'otp_too_many';

export interface RequestInfo {
  ip: string;
  country: string | null;
  city: string | null;
  device: string;
}

/** "Chrome on macOS", "Safari on iPhone"... from the user agent. */
export function describeDevice(ua: string | null | undefined): string {
  const u = ua ?? '';
  const os = /iPhone/.test(u) ? 'iPhone' : /iPad/.test(u) ? 'iPad' : /Android/.test(u) ? 'Android'
    : /Mac OS X|Macintosh/.test(u) ? 'macOS' : /Windows/.test(u) ? 'Windows' : /Linux/.test(u) ? 'Linux' : 'unknown system';
  const browser = /Edg\//.test(u) ? 'Edge' : /OPR\/|Opera/.test(u) ? 'Opera' : /Firefox\//.test(u) ? 'Firefox'
    : /Chrome\//.test(u) ? 'Chrome' : /Safari\//.test(u) ? 'Safari' : 'unknown browser';
  return `${browser} on ${os}`;
}

/** An IP with its last part hidden: enough to tell two places apart. */
export function maskIp(ip: string): string {
  if (!ip) return 'unknown';
  if (ip.includes(':')) return ip.split(':').slice(0, 3).join(':') + ':…';
  const p = ip.split('.');
  return p.length === 4 ? `${p[0]}.${p[1]}.${p[2]}.x` : ip;
}

export function requestInfo(req: Request, ip: string): RequestInfo {
  const h = (k: string) => req.headers.get(k);
  let city = h('x-vercel-ip-city');
  try { city = city ? decodeURIComponent(city) : null; } catch { /* keep raw */ }
  return {
    ip: maskIp(ip),
    country: h('x-vercel-ip-country') || null,
    city: city || null,
    device: describeDevice(h('user-agent')),
  };
}

/** Same browser + system + country = same device, for the "new device" alert. */
export function deviceKey(info: RequestInfo): string {
  return crypto.createHash('sha256').update(`${info.device}|${info.country ?? ''}`).digest('hex').slice(0, 16);
}

export async function recordLoginEvent(event: LoginEvent, info: RequestInfo): Promise<void> {
  try {
    await getStore().audit('auth', `crm_${event}`, { ...info });
  } catch { /* never blocks a login */ }
}

interface KnownDevice { key: string; label: string; firstSeen: string; lastSeen: string }

/**
 * After a successful login: remember the device, and if it is new, tell Jo.
 * The very first login (nothing known yet) is remembered without an alert.
 * Returns whether this device was new.
 */
export async function checkNewDevice(info: RequestInfo, send: (subject: string, html: string) => Promise<void>): Promise<boolean> {
  try {
    const store = getStore();
    const raw = await store.getSetting(KNOWN_DEVICES_KEY);
    const known: KnownDevice[] = Array.isArray(raw) ? (raw as KnownDevice[]) : [];
    const key = deviceKey(info);
    const now = new Date().toISOString();
    const hit = known.find((d) => d.key === key);
    if (hit) {
      hit.lastSeen = now;
      await store.setSetting(KNOWN_DEVICES_KEY, known);
      return false;
    }
    const label = `${info.device}, ${[info.city, info.country].filter(Boolean).join(', ') || 'unknown place'}`;
    known.push({ key, label, firstSeen: now, lastSeen: now });
    await store.setSetting(KNOWN_DEVICES_KEY, known.slice(-50));
    await store.audit('auth', 'crm_new_device', { ...info, label });
    if (known.length > 1) {
      const time = new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' });
      await send('New login to your CRM', `
        <p>Someone just logged in to the Working Holiday Tax CRM from a device it has not seen before:</p>
        <p><b>${escapeHtml(label)}</b><br>IP ${escapeHtml(info.ip)}<br>${escapeHtml(time)} (Sydney)</p>
        <p>If this was you, there is nothing to do.</p>
        <p><b>If it was not you:</b> in Vercel, change <code>CRM_PASSWORD</code> and <code>JWT_SECRET</code> now and redeploy. That signs everyone out.</p>`);
    }
    return true;
  } catch {
    return false;
  }
}

/** Every BSB-like and account-like figure in a text that is not ours. */
export function foreignBankNumbers(text: string | null | undefined): string[] {
  const t = text ?? '';
  const out: string[] = [];
  for (const m of t.matchAll(/BSB\s*[:：]?\s*(\d{3})\s?-?\s?(\d{3})/gi)) {
    if (m[1] + m[2] !== OUR_BSB) out.push(`BSB ${m[1]}-${m[2]}`);
  }
  for (const m of t.matchAll(/(?:account(?:\s*(?:number|no\.?))?|konto(?:nummer)?|口座番号|口座)\s*[:：]?\s*([\d][\d\s-]{5,14}\d)/gi)) {
    const digits = m[1].replace(/\D/g, '');
    if (digits !== OUR_ACCOUNT && digits !== OUR_BSB) out.push(`account ${digits}`);
  }
  return out;
}

export interface BankCheck { ok: boolean; problems: string[] }

/** The nightly check: the bank setting, and every Library message. */
export async function checkBankDetails(): Promise<BankCheck> {
  const store = getStore();
  const problems: string[] = [];
  const s = (await store.getSetting('bank_details')) as { bsb?: string; account?: string } | undefined;
  if (s) {
    const bsb = String(s.bsb ?? '').replace(/\D/g, '');
    const acc = String(s.account ?? '').replace(/\D/g, '');
    if (bsb && bsb !== OUR_BSB) problems.push(`the saved BSB is ${s.bsb}, not 062-692`);
    if (acc && acc !== OUR_ACCOUNT) problems.push(`the saved account number is ${s.account}, not 81049952`);
  }
  const templates = await store.listTemplates();
  for (const t of templates) {
    for (const f of [...foreignBankNumbers(t.body)]) problems.push(`Library "${t.title || t.key}" contains ${f}`);
  }
  return { ok: problems.length === 0, problems };
}

export async function sendSecurityEmail(subject: string, html: string): Promise<void> {
  const to = process.env.CRM_ADMIN_EMAIL;
  const key = process.env.RESEND_API_KEY;
  if (!to || !key) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'Working Holiday Tax <noreply@workingholidaytax.com.au>', to: [to], subject: `⚠️ ${subject}`, html }),
      signal: AbortSignal.timeout(8000),
    });
  } catch { /* an alert that fails is logged by the audit line already written */ }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

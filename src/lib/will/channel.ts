// ============================================================
// Outbound WhatsApp channel — Meta Cloud API.
//
// This is the transmission layer: everything Will (or the owner) sends to a
// customer goes through deliverOut(), which transmits the text to WhatsApp and
// records the message in one place.
//
// SAFE BY DEFAULT: until WHATSAPP_TOKEN + WHATSAPP_PHONE_NUMBER_ID are set, the
// sender is a no-op ("test mode") — messages are still recorded so the whole
// system, Simulator and dashboard behave exactly as before, but nothing leaves
// the building. Adding the two env vars flips it live with no code change.
// ============================================================
import { getStore, CustomerRow } from './store';

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || 'v21.0';

/** Language code the message templates were APPROVED under in WhatsApp Manager.
 *  Meta matches on this exactly: a template approved as `en` cannot be sent as
 *  `en_US`, it fails with "template does not exist". */
const TEMPLATE_LANG = process.env.WHATSAPP_TEMPLATE_LANG || 'en';

// CONFIG-01: two env-var naming conventions existed (the code's canonical names
// and the older names in .env.example). We read BOTH so a deploy using either
// set works and nothing is silently a no-op. Canonical names win when both set.
export function waAccessToken(): string | undefined {
  return process.env.WHATSAPP_TOKEN || process.env.WHATSAPP_ACCESS_TOKEN;
}
export function waPhoneNumberId(): string | undefined {
  return process.env.WHATSAPP_PHONE_NUMBER_ID;
}
export function metaAppSecret(): string | undefined {
  return process.env.META_APP_SECRET || process.env.WHATSAPP_APP_SECRET;
}
export function metaVerifyToken(): string | undefined {
  return process.env.META_VERIFY_TOKEN || process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;
}

// ------------------------------------------------------------------
// Runtime credentials (embedded signup / manual paste) live in the DB so they
// can be updated WITHOUT a redeploy. Stored values win over env vars. This is
// what lets the "Connect WhatsApp" flow drop in a working token instantly.
// ------------------------------------------------------------------
export const WA_TOKEN_KEY = 'wa_access_token';
export const WA_PHONE_ID_KEY = 'wa_phone_number_id';
export const WA_WABA_KEY = 'wa_waba_id';

export async function resolveWaCreds(): Promise<{ token?: string; phoneId?: string; source: 'stored' | 'env' | 'none' }> {
  let storedToken: string | undefined;
  let storedPhone: string | undefined;
  try {
    const store = getStore();
    const [t, p] = await Promise.all([store.getSetting(WA_TOKEN_KEY), store.getSetting(WA_PHONE_ID_KEY)]);
    storedToken = (typeof t === 'string' && t) ? t : undefined;
    storedPhone = (typeof p === 'string' && p) ? p : undefined;
  } catch { /* store unavailable: fall back to env */ }
  const token = storedToken || waAccessToken();
  const phoneId = storedPhone || waPhoneNumberId();
  const source = (storedToken || storedPhone) ? 'stored' : (token || phoneId) ? 'env' : 'none';
  return { token, phoneId, source };
}

/** Persist connect-flow credentials so the channel goes live with no redeploy. */
export async function saveWaCreds(token: string, phoneId: string, wabaId?: string): Promise<void> {
  const store = getStore();
  await store.setSetting(WA_TOKEN_KEY, token);
  await store.setSetting(WA_PHONE_ID_KEY, phoneId);
  if (wabaId) await store.setSetting(WA_WABA_KEY, wabaId);
  _verifyCache = null; // force the health dot to re-check against the new creds
}

export interface SendResult {
  ok: boolean;
  providerId?: string;
  error?: string;
  skipped?: boolean; // channel not configured yet (test mode)
}

/** True once the WhatsApp Cloud API credentials are present. */
export function channelConfigured(): boolean {
  return !!(waAccessToken() && waPhoneNumberId());
}

// A truthful "is it REALLY connected" check: not "are the env vars set" but
// "does Meta actually accept this token + phone number right now". The status
// dot must reflect reality (an expired/invalid token shows RED, not green).
// Result is cached briefly so the heartbeat doesn't call Meta on every poll.
let _verifyCache: { at: number; live: boolean; detail: string } | null = null;
// Longer than the dashboard's 45s health poll on purpose. At 30s every poll
// missed the cache and made a live graph.facebook.com request just to keep a
// status dot green: ~80 Meta API calls an hour per open tab, 42,000 a month.
// 5 minutes is still far fresher than the failure it reports.
const VERIFY_TTL_MS = 5 * 60_000;

export async function verifyChannel(): Promise<{ configured: boolean; live: boolean; detail: string }> {
  const { token, phoneId } = await resolveWaCreds();
  if (!token || !phoneId) return { configured: false, live: false, detail: 'test mode (credentials not set)' };

  const nowMs = Date.now();
  if (_verifyCache && nowMs - _verifyCache.at < VERIFY_TTL_MS) {
    return { configured: true, live: _verifyCache.live, detail: _verifyCache.detail };
  }
  try {
    // Cheap read of the phone number itself: succeeds only if the token is valid
    // AND actually owns this phone number id.
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}?fields=display_phone_number,verified_name,code_verification_status`,
      { method: 'GET', headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' },
    );
    const data = await res.json().catch(() => ({} as Record<string, unknown>));
    if (res.ok) {
      const num = (data as { display_phone_number?: string }).display_phone_number
        || (data as { verified_name?: string }).verified_name || 'connected';
      _verifyCache = { at: nowMs, live: true, detail: `verified with Meta (${num})` };
    } else {
      const err = (data as { error?: { message?: string; code?: number } }).error;
      _verifyCache = { at: nowMs, live: false, detail: `Meta rejected the credentials: ${err?.message ?? ('HTTP ' + res.status)}` };
    }
  } catch (e) {
    _verifyCache = { at: nowMs, live: false, detail: `could not reach Meta: ${(e as Error).message}` };
  }
  return { configured: true, live: _verifyCache.live, detail: _verifyCache.detail };
}

/** POST a message payload to Meta and normalise the outcome. Shared by the
 *  text and template senders so retries, error shape and the health-cache
 *  invalidation behave identically for both. */
async function postMessage(payload: Record<string, unknown>): Promise<SendResult> {
  const { token, phoneId } = await resolveWaCreds();
  if (!token || !phoneId) return { ok: true, skipped: true }; // test mode: not connected yet

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({} as Record<string, unknown>));
    if (!res.ok) {
      // A real send just failed: drop the cached "verified" status so the health
      // dot re-checks and reflects reality on the next heartbeat, not 30s later.
      _verifyCache = null;
      const err = (data as { error?: { message?: string; code?: number } }).error;
      return { ok: false, error: `meta ${res.status}: ${err?.message ?? JSON.stringify(data).slice(0, 200)}` };
    }
    const providerId = (data as { messages?: { id?: string }[] }).messages?.[0]?.id;
    return { ok: true, providerId };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/** Transmit a plain text message to a WhatsApp number via Meta's Cloud API.
 *  Only valid INSIDE the 24h customer-service window; outside it Meta rejects
 *  free-form text and `sendWhatsAppTemplate` is the only way through. */
export async function sendWhatsAppText(toWaId: string, body: string): Promise<SendResult> {
  const to = (toWaId || '').replace(/[^\d]/g, '');
  if (!to) return { ok: false, error: 'no recipient number' };
  return postMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: { preview_url: false, body: body.slice(0, 4096) },
  });
}

/** Meta rejects template parameters containing newlines, tabs or runs of 4+
 *  spaces, and the whole send fails with a validation error rather than
 *  degrading. Names come from WhatsApp profiles, which are free text. */
/** Will detects a language as a plain code ('de', 'pt'). Meta accepts those, and
 *  also regional variants; anything unrecognisable falls back to the default so
 *  a garbled value can never make the send fail. */
export function normalizeTemplateLang(lang: string | null | undefined): string {
  const v = (lang || '').trim().toLowerCase().replace('-', '_');
  if (!v) return TEMPLATE_LANG;
  if (!/^[a-z]{2}(_[a-z]{2})?$/.test(v)) return TEMPLATE_LANG;
  return v.length === 5 ? `${v.slice(0, 3)}${v.slice(3).toUpperCase()}` : v;
}

function sanitizeTemplateParam(v: string): string {
  return (v || '').replace(/[\r\n\t]+/g, ' ').replace(/ {4,}/g, ' ').trim().slice(0, 60);
}

/**
 * Send a pre-approved message template.
 *
 * This is the ONLY way to reach a customer who has not written to us in the
 * last 24 hours, which is every scheduled follow-up worth sending. `name` must
 * match a template APPROVED in WhatsApp Manager exactly, and the body it was
 * approved with is what the customer receives: `params` only fills its
 * {{1}}, {{2}} ... placeholders, in order.
 */
export async function sendWhatsAppTemplate(
  toWaId: string,
  name: string,
  params: string[] = [],
  languageCode?: string | null,
): Promise<SendResult> {
  const to = (toWaId || '').replace(/[^\d]/g, '');
  if (!to) return { ok: false, error: 'no recipient number' };
  if (!name) return { ok: false, error: 'no template name' };

  const components = params.length
    ? [{ type: 'body', parameters: params.map((p) => ({ type: 'text', text: sanitizeTemplateParam(p) })) }]
    : [];

  const attempt = (code: string) => postMessage({
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'template',
    template: { name, language: { code }, ...(components.length ? { components } : {}) },
  });

  // Reach the customer in their own language when that translation has been
  // approved, and fall back to English when it has not.
  //
  // Meta approves a template per language, and rejects a send in a language it
  // has never seen with "template does not exist". Falling back means a new
  // language can be added in WhatsApp Manager and simply starts being used,
  // with no deploy, and a language that was never added still gets a message
  // instead of silence.
  const wanted = normalizeTemplateLang(languageCode);
  const first = await attempt(wanted);
  if (first.ok || first.skipped || wanted === TEMPLATE_LANG) return first;
  if (!/does not exist|not exist|132001|template/i.test(first.error ?? '')) return first;
  return attempt(TEMPLATE_LANG);
}

/**
 * The single outbound path: transmit to WhatsApp, then record the message with
 * the delivery result. On failure the message is stored as FAILED and a human
 * task is raised so nothing is silently lost.
 */
export async function deliverOut(
  customer: CustomerRow,
  body: string,
  author: 'AI' | 'HUMAN',
  meta?: Record<string, unknown>,
  /** Send as a pre-approved template instead of free text. Required for any
   *  message outside Meta's 24h window, which is every scheduled follow-up.
   *  `body` is still what gets logged and shown in the CRM: it must be the
   *  template's text with the parameters already filled in. */
  template?: { name: string; params: string[]; lang?: string | null },
): Promise<{ ok: boolean; error?: string }> {
  const store = getStore();
  // REL-03 outbox: record the intended message as QUEUED FIRST, so if the send
  // succeeds but a later write throws, the fact that we messaged the customer is
  // already durable (never a silent double-send on retry). Then send, then
  // reconcile the row to SENT/FAILED.
  const rec = await store.addMessage({
    customerId: customer.id, direction: 'OUT', author, status: 'QUEUED', body,
    meta: { ...(meta ?? {}) },
  });
  const res = template?.name
    ? await sendWhatsAppTemplate(customer.waId, template.name, template.params, template.lang ?? customer.lang)
    : await sendWhatsAppText(customer.waId, body);
  await store.setMessageStatus(rec.id, res.ok ? 'SENT' : 'FAILED');
  if (!res.ok) {
    await store.audit('channel', 'send_failed', { customerId: customer.id, error: res.error });
    await store.addTask({
      customerId: customer.id, customerName: customer.name ?? customer.waId,
      reason: `WhatsApp send failed: ${res.error ?? 'unknown error'}`,
      severity: 'REVIEW', context: body.slice(0, 200), suggestedReply: body,
    });
  }
  return { ok: res.ok, error: res.error };
}

/** Fetch one WhatsApp attachment from Meta.
 *
 *  Two hops, because Meta never gives out a public URL: the media id resolves to
 *  a short-lived, token-protected download URL, and only then can the bytes be
 *  read — with the access token attached to BOTH requests. Meta keeps the file
 *  for 30 days; after that this returns not-found, which is why the dashboard
 *  falls back to the placeholder line rather than an empty frame.
 *
 *  Returns the raw bytes so the caller can stream them behind the CRM session.
 *  The token never reaches the browser. */
export async function fetchWaMedia(
  mediaId: string,
): Promise<{ ok: true; body: ArrayBuffer; mime: string } | { ok: false; status: number; error: string }> {
  const { token } = await resolveWaCreds();
  if (!token) return { ok: false, status: 503, error: 'channel not configured' };
  const auth = { Authorization: `Bearer ${token}` };
  try {
    const metaRes = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${encodeURIComponent(mediaId)}`, {
      headers: auth, cache: 'no-store',
    });
    if (!metaRes.ok) {
      return { ok: false, status: metaRes.status === 404 ? 404 : 502, error: `lookup failed (${metaRes.status})` };
    }
    const info = (await metaRes.json()) as { url?: string; mime_type?: string };
    if (!info.url) return { ok: false, status: 404, error: 'media expired or unavailable' };
    // The download host also requires the bearer token, and rejects the request
    // outright without a browser-like user agent.
    const fileRes = await fetch(info.url, {
      headers: { ...auth, 'User-Agent': 'WorkingHolidayTax-CRM/1.0' }, cache: 'no-store',
    });
    if (!fileRes.ok) return { ok: false, status: 502, error: `download failed (${fileRes.status})` };
    return {
      ok: true,
      body: await fileRes.arrayBuffer(),
      mime: info.mime_type || fileRes.headers.get('content-type') || 'application/octet-stream',
    };
  } catch (e) {
    return { ok: false, status: 502, error: e instanceof Error ? e.message : 'network error' };
  }
}

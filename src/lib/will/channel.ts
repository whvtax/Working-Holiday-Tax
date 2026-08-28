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

  // Last-resort opt-out guard. Every caller is supposed to check `optedOut`
  // before getting here, and one of them (handlePaymentProofMedia) did not.
  // Checking it at the single transmission point means a future caller cannot
  // repeat that mistake. It returns rather than throws so a missed check
  // degrades to "nothing was sent", never to a crashed handler — and it audits,
  // so a caller that reaches this line is visible instead of silent.
  if (customer.optedOut) {
    await store.audit('channel', 'send_blocked_opted_out', {
      customerId: customer.id, author, preview: body.slice(0, 120),
    });
    return { ok: false, error: 'customer opted out' };
  }

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
  // Once `res.ok` the customer HAS the message. From here on, a failing write is
  // a bookkeeping problem, not a delivery problem: if it were allowed to throw,
  // the caller would report a failed send, the operator would send again, and
  // the customer would receive it twice. So the bookkeeping is wrapped, audited
  // on failure, and the delivered send is still reported as delivered.
  if (res.ok) {
    try {
      await store.setMessageStatus(rec.id, 'SENT');
      // So a reaction to this message later (which only carries Meta's id) can
      // be matched back to this exact bubble instead of showing as a floating
      // unattached line.
      if (res.providerId) await store.attachProviderId(rec.id, res.providerId);
      // WhatsApp-real behaviour: the owner personally sending something to this
      // customer IS them engaging with the conversation, exactly like replying
      // on your phone clears the unread marker on your end. Only for a HUMAN
      // send — an AI auto-reply doesn't mean the owner has actually looked at
      // the chat, so it must not silently clear the bold/badge for them.
      if (author === 'HUMAN') await store.markCustomerRead(customer.id);
      // A closed chat that has a new message in it is not a closed chat.
      //
      // Jo, 28 Aug: whoever wrote it, us or them, once there is another
      // message in the thread the customer goes back to the top of the list as
      // a Lead and the pipeline starts again from the beginning. The inbound
      // half of this already existed (a photo or a message from someone marked
      // Went Cold reactivates them); this is the other half, the one where WE
      // reach out to somebody we had written off. Without it the conversation
      // was live and the board still said Not Interested, and no follow-up
      // cadence was ever armed behind it, so the reply we invited landed
      // nowhere.
      if (['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(customer.state)) {
        await store.setState(customer.id, 'NEW_LEAD', 'HUMAN');
        await store.audit('system', 'reactivated_to_lead', {
          customerId: customer.id, from: customer.state, trigger: 'outbound_message',
        });
        const fresh = await store.getCustomerById(customer.id);
        // Re-arm the follow-up cadence from the start, which is what "the whole
        // pipeline from the beginning" means in practice.
        //
        // Imported here rather than at the top of the file on purpose: the
        // scheduler imports deliverOut from this module, so a static import
        // back would be a cycle, and a cycle between these two is how one of
        // them ends up half-initialised at runtime for reasons nobody can see.
        if (fresh) {
          const { reconcileSchedule } = await import('./scheduler');
          await reconcileSchedule(fresh);
        }
      }
    } catch (e) {
      await store.audit('channel', 'send_bookkeeping_failed', {
        customerId: customer.id, messageId: rec.id, providerId: res.providerId ?? null,
        error: e instanceof Error ? e.message : String(e),
      }).catch(() => { /* the audit write is on the same store that just failed */ });
    }
    return { ok: true };
  }

  await store.setMessageStatus(rec.id, 'FAILED');
  await store.audit('channel', 'send_failed', { customerId: customer.id, error: res.error });
  await store.addTask({
    customerId: customer.id, customerName: customer.name ?? customer.waId,
    reason: `WhatsApp send failed: ${res.error ?? 'unknown error'}`,
    severity: 'REVIEW', context: body.slice(0, 200), suggestedReply: body,
  });
  return { ok: false, error: res.error };
}

/** Timeouts and size ceiling for the inbound-attachment path. `claude.ts` puts an
 *  `AbortSignal.timeout` on every call it makes; these two were the only network
 *  calls in the customer channel without one, on a route the public can trigger. */
const MEDIA_LOOKUP_TIMEOUT_MS = 10_000;
const MEDIA_DOWNLOAD_TIMEOUT_MS = 20_000;
const MEDIA_MAX_BYTES = 8 * 1024 * 1024;

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
      headers: auth, cache: 'no-store', signal: AbortSignal.timeout(MEDIA_LOOKUP_TIMEOUT_MS),
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
      signal: AbortSignal.timeout(MEDIA_DOWNLOAD_TIMEOUT_MS),
    });
    if (!fileRes.ok) return { ok: false, status: 502, error: `download failed (${fileRes.status})` };
    // Meta accepts uploads up to 100MB. Reading one into memory on a serverless
    // function is an OOM, and an OOM on this path loses the customer's message.
    // Refuse on the declared length BEFORE touching the bytes.
    const declared = Number(fileRes.headers.get('content-length') ?? '');
    if (Number.isFinite(declared) && declared > MEDIA_MAX_BYTES) {
      return { ok: false, status: 413, error: `attachment too large (${Math.round(declared / 1024 / 1024)}MB, limit ${MEDIA_MAX_BYTES / 1024 / 1024}MB)` };
    }
    const bytes = await fileRes.arrayBuffer();
    // Belt and braces: a chunked response declares no content-length at all.
    if (bytes.byteLength > MEDIA_MAX_BYTES) {
      return { ok: false, status: 413, error: `attachment too large (${Math.round(bytes.byteLength / 1024 / 1024)}MB, limit ${MEDIA_MAX_BYTES / 1024 / 1024}MB)` };
    }
    return {
      ok: true,
      body: bytes,
      mime: info.mime_type || fileRes.headers.get('content-type') || 'application/octet-stream',
    };
  } catch (e) {
    return { ok: false, status: 502, error: e instanceof Error ? e.message : 'network error' };
  }
}

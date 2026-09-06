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
import { reopenTarget } from './state-machine';

const GRAPH_VERSION = process.env.WHATSAPP_GRAPH_VERSION || 'v21.0';
/** Meta's customer-service window: free text only reaches a customer who wrote
 *  to us within the last 24 hours. Same figure humanSend uses. */
const WINDOW_MS = 24 * 60 * 60 * 1000;

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
/**
 * How long a call to Meta may hang before we give up on it.
 *
 * WHY THIS EXISTS. postMessage had no timeout at all, and it is called for
 * every single text and template we send. doProcess() is a SERIAL loop under a
 * 45s tick budget inside a 60s function ceiling, so one stalled connection to
 * Meta did four things at once: the rest of the batch went unprocessed, the
 * claimed job was stranded, the reclaim turned it into a DUPLICATE send, and an
 * attempt was burned toward a permanent FAILED. One hang, four failures.
 *
 * 15s sits well inside the tick budget, so a hang costs one message rather than
 * the invocation. The health probe gets less: it is a status dot, not a
 * delivery, and it must never be the thing that eats the budget.
 */
export const WA_SEND_TIMEOUT_MS = 15_000;
export const WA_VERIFY_TIMEOUT_MS = 8_000;

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
  /** True when Meta throttled us (HTTP 429 or a rate-limit error code). The send
   *  did not go out but should be retried later rather than failed — the caller
   *  reschedules instead of raising a "not delivered" task. */
  retryable?: boolean;
}

/** True once the WhatsApp Cloud API credentials are present. */
export function channelConfigured(): boolean {
  return !!(waAccessToken() && waPhoneNumberId());
}

// A truthful "is it REALLY connected" check: not "are the env vars set" but
// "does Meta actually accept this token + phone number right now". The status
// dot must reflect reality (an expired/invalid token shows RED, not green).
// Result is cached briefly so the heartbeat doesn't call Meta on every poll.
let _verifyCache: { at: number; live: boolean; detail: string; ttl: number } | null = null;
// Longer than the dashboard's 45s health poll on purpose. At 30s every poll
// missed the cache and made a live graph.facebook.com request just to keep a
// status dot green: ~80 Meta API calls an hour per open tab, 42,000 a month.
// 5 minutes is still far fresher than the failure it reports.
const VERIFY_TTL_MS = 5 * 60_000;
// (audit, 5 Sep) a transient timeout/DNS blip must not paint a working
// channel as NOT WORKING for the full 5 minutes above — cache that outcome
// only briefly so the next heartbeat retries soon instead of waiting it out.
const TRANSIENT_FAIL_TTL_MS = 30_000;

export async function verifyChannel(): Promise<{ configured: boolean; live: boolean; detail: string }> {
  const { token, phoneId } = await resolveWaCreds();
  if (!token || !phoneId) return { configured: false, live: false, detail: 'test mode (credentials not set)' };

  const nowMs = Date.now();
  if (_verifyCache && nowMs - _verifyCache.at < _verifyCache.ttl) {
    return { configured: true, live: _verifyCache.live, detail: _verifyCache.detail };
  }
  try {
    // Cheap read of the phone number itself: succeeds only if the token is valid
    // AND actually owns this phone number id.
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}?fields=display_phone_number,verified_name,code_verification_status`,
      {
        method: 'GET', headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
        // A status dot must never be the thing that eats the tick budget.
        signal: AbortSignal.timeout(WA_VERIFY_TIMEOUT_MS),
      },
    );
    const data = await res.json().catch(() => ({} as Record<string, unknown>));
    if (res.ok) {
      const num = (data as { display_phone_number?: string }).display_phone_number
        || (data as { verified_name?: string }).verified_name || 'connected';
      _verifyCache = { at: nowMs, live: true, detail: `verified with Meta (${num})`, ttl: VERIFY_TTL_MS };
    } else {
      // A real rejection from Meta (bad token, wrong phone id, etc.) is a
      // genuine outage — cache it for the full TTL like a success.
      const err = (data as { error?: { message?: string; code?: number } }).error;
      _verifyCache = { at: nowMs, live: false, detail: `Meta rejected the credentials: ${err?.message ?? ('HTTP ' + res.status)}`, ttl: VERIFY_TTL_MS };
    }
  } catch (e) {
    // (audit, 5 Sep) network/timeout, not a rejection from Meta — this fires
    // on any 8s timeout or DNS blip. Sends don't consult this cache, so the
    // only effect of trusting it here would be a false "NOT WORKING, connect"
    // for 5 minutes on a channel that is fine. Keep the last known-good status
    // if we have one, and only remember the blip briefly.
    const prev = _verifyCache;
    if (prev && prev.live) {
      _verifyCache = { at: nowMs, live: true, detail: `${prev.detail} (Meta unreachable just now, rechecking shortly)`, ttl: TRANSIENT_FAIL_TTL_MS };
    } else {
      _verifyCache = { at: nowMs, live: false, detail: `could not reach Meta: ${(e as Error).message}`, ttl: TRANSIENT_FAIL_TTL_MS };
    }
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
      // An AbortError lands in the catch below and becomes { ok:false, error },
      // which every caller already handles.
      signal: AbortSignal.timeout(WA_SEND_TIMEOUT_MS),
    });
    const data = await res.json().catch(() => ({} as Record<string, unknown>));
    if (!res.ok) {
      // A real send just failed: drop the cached "verified" status so the health
      // dot re-checks and reflects reality on the next heartbeat, not 30s later.
      _verifyCache = null;
      const err = (data as { error?: { message?: string; code?: number } }).error;
      // Throttling is not a failure to surface as a task — it is "try again
      // later". HTTP 429, or Meta's rate-limit error codes (4/80007 app rate
      // limit, 131056 pair rate limit, 130429 too many messages), are marked
      // retryable so the scheduler reschedules the follow-up instead of dumping
      // dozens of "not delivered" tasks on the owner during a busy morning.
      // 131049 is the same idea with a different clock (Momo, +61 485 509 462,
      // 4 Sep): "in order to maintain a healthy ecosystem engagement, the
      // message failed to be delivered" is Meta's PER-PERSON marketing limit,
      // and it is the follow-up cadence that hits it. It is not a broken
      // template and there is nothing in the chat to fix, so it must not become
      // a "not delivered" task — it is retryable, and the scheduler re-queues it
      // for the next evening window rather than in 30 minutes, because this
      // particular limit resets on a daily cycle.
      //
      // A Graph API 5xx is the same shape again (audit, 5 Sep): Meta answered
      // "my side is broken right now", nothing reached the customer, and the
      // identical request works a minute later. It used to be permanent: the
      // row went FAILED, an URGENT "not delivered" task landed on Jo, and the
      // re-arm path that would simply have sent it a few minutes later was
      // skipped. Meta's own error codes are still authoritative for 4xx.
      const code = err?.code;
      const retryable = res.status === 429 || res.status >= 500
        || code === 4 || code === 80007 || code === 131056 || code === 130429 || code === 131049;
      return { ok: false, error: `meta ${res.status}: ${err?.message ?? JSON.stringify(data).slice(0, 200)}`, retryable };
    }
    const providerId = (data as { messages?: { id?: string }[] }).messages?.[0]?.id;
    return { ok: true, providerId };
  } catch (e) {
    // Never got a response. A DNS miss, a refused or reset connection or
    // Node's bare "fetch failed" means the request did not reach Meta, so a
    // retry cannot duplicate anything: retryable (audit, 5 Sep). A timeout
    // (AbortError / TimeoutError) is the one case where the message MAY have
    // gone out and we simply did not hear back, so it stays non-retryable
    // rather than risk the customer receiving it twice.
    return { ok: false, error: (e as Error).message, retryable: isPreResponseNetworkError(e) };
  }
}

/** True for an error thrown BEFORE Meta answered, where no message can have
 *  left; false for aborts and timeouts, where one might have. Exported for the
 *  test that pins the classification. */
export function isPreResponseNetworkError(e: unknown): boolean {
  const err = e as { name?: string; message?: string; code?: string; cause?: { code?: string; message?: string } } | null;
  if (!err) return false;
  if (err.name === 'AbortError' || err.name === 'TimeoutError') return false;
  // ETIMEDOUT is deliberately absent: the OS reports it for a stalled read as
  // well as a stalled connect, and a stalled read is the "maybe it went" case.
  const codes = ['ECONNRESET', 'ENOTFOUND', 'ECONNREFUSED', 'EAI_AGAIN', 'EPIPE', 'ENETUNREACH', 'EHOSTUNREACH', 'UND_ERR_CONNECT_TIMEOUT'];
  const code = err.cause?.code ?? err.code;
  if (code && codes.includes(code)) return true;
  const text = `${err.message ?? ''} ${err.cause?.message ?? ''}`;
  return /fetch failed|socket hang up|network error/i.test(text) || codes.some((c) => text.includes(c));
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
  // Meta has no plain 'pt': Portuguese templates exist only as pt_BR / pt_PT.
  // Brazil is where the Portuguese-speaking backpackers come from, so the
  // detector's 'pt' becomes pt_BR (audit, 3 Sep: 'pt' was either rejected
  // outright or fell straight through to the English template).
  if (v === 'pt') return 'pt_BR';
  return v.length === 5 ? `${v.slice(0, 3)}${v.slice(3).toUpperCase()}` : v;
}

/** Meta's rules for a body parameter: no newlines, tabs or runs of 4+ spaces,
 *  and at most 1024 characters. This was written for the first-name parameter
 *  and cut everything at 60, which also cut the INVOICE LINK the
 *  estimate_invoice template carries as {{2}}: a Stripe link is ~150
 *  characters, so the customer tapped a dead link (audit, 3 Sep). */
const TEMPLATE_PARAM_MAX = 1024;
function sanitizeTemplateParam(v: string): string {
  return (v || '').replace(/[\r\n\t]+/g, ' ').replace(/ {4,}/g, ' ').trim().slice(0, TEMPLATE_PARAM_MAX);
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
  template?: {
    name: string; params: string[]; lang?: string | null;
    /** The system messages that go out when a customer may or may not have
     *  written recently (questionnaire received, ABN questions, review
     *  request, holding line): try the Meta template named by the Library
     *  key first, and when Jo has not created that template, send the same
     *  text as free text, which works inside the 24h window. So a template
     *  he adds later starts working outside the window with no deploy, and
     *  one he never adds costs nothing inside it. */
    fallbackToText?: boolean;
  },
  opts?: {
    /** The task deliverOut raises on a non-retryable rejection, in the
     *  caller's words. (audit, 5 Sep) deliverOut already opened a task
     *  "WhatsApp send failed: ..." on every rejection, and the callers that
     *  knew WHY it mattered (a paid customer not told, an autopilot reply
     *  lost) then opened a second one for the same failure, or overwrote the
     *  first. Jo saw two cards per customer, both with the same reply. So the
     *  one task is written with the best wording in the first place: the
     *  caller passes it here and raises nothing of its own. */
    onFailure?: {
      /** Fixed text, or built from Meta's error (undefined when it gave none). */
      reason: string | ((error: string | undefined) => string);
      severity?: string; context?: string;
    };
  },
): Promise<{ ok: boolean; error?: string; retryable?: boolean; messageId?: string }> {
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
  let res = template?.name
    ? await sendWhatsAppTemplate(customer.waId, template.name, template.params, template.lang ?? customer.lang)
    : await sendWhatsAppText(customer.waId, body);
  if (!res.ok && template?.fallbackToText && /does not exist|not exist|132001|template/i.test(res.error ?? '')) {
    // Only fall back to free text when free text can actually arrive. (audit,
    // 5 Sep) Meta accepts a free text to a customer outside the 24h window
    // with a 200 and a wamid, and reports the 131047 rejection an hour later
    // through the status webhook. So a review request or Medicare line whose
    // template was never created "succeeded" here, was audited as sent, showed
    // two ticks in the CRM, and the caller's task naming the missing template
    // never fired; what Jo got instead was the webhook's generic card. Refusing
    // the doomed attempt up front (same formula humanSend uses) makes the
    // caller's specific task fire now, and changes nothing for the customer:
    // the text was never going to reach them. Inside the window the fallback
    // is untouched.
    const last = customer.lastCustomerMsgAt ? new Date(customer.lastCustomerMsgAt).getTime() : 0;
    const sinceMs = Date.now() - last;
    const outsideWindow = sinceMs > WINDOW_MS;
    if (outsideWindow) {
      const days = last ? Math.max(1, Math.floor(sinceMs / WINDOW_MS)) : null;
      await store.audit('channel', 'template_missing_outside_window', {
        customerId: customer.id, template: template.name, error: res.error ?? null, lastCustomerMsgAt: customer.lastCustomerMsgAt ?? null,
      }).catch(() => { /* diagnostics */ });
      res = {
        ok: false,
        error: `template "${template.name}" is not in WhatsApp Manager and the customer last wrote ${days == null ? 'more than a day ago' : `${days} day${days === 1 ? '' : 's'} ago`}, so free text cannot reach them`,
      };
    } else {
      await store.audit('channel', 'template_missing_sent_as_text', {
        customerId: customer.id, template: template.name, error: res.error ?? null,
      }).catch(() => { /* diagnostics */ });
      res = await sendWhatsAppText(customer.waId, body);
    }
  }
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
      // WhatsApp-real behaviour: sending something to this customer IS
      // engaging with the conversation, exactly like replying on your phone
      // clears the unread marker on your end. This used to be HUMAN sends only,
      // on the theory that an AI reply did not mean the owner had looked. Jo,
      // 3 Sep: in Autopilot a chat Will has already answered is a chat that has
      // been dealt with, and it must not sit in bold waiting for a look that
      // is not needed. So every successful send clears it. A chat Will could
      // NOT answer (a task) sends nothing here and stays bold, which is the
      // one case that does need his eyes.
      await store.markCustomerRead(customer.id);
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
        // Lead for a lead; a paid customer goes back to the stage they were
        // closed from (reopenTarget), never into the sales flow.
        const target = reopenTarget(customer);
        await store.setState(customer.id, target, 'HUMAN');
        await store.audit('system', 'reactivated_to_lead', {
          customerId: customer.id, from: customer.state, to: target, trigger: 'outbound_message',
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
    return { ok: true, messageId: rec.id };
  }

  await store.setMessageStatus(rec.id, 'FAILED');
  // Throttling is "try again later", not a failure the owner must act on. Audit
  // it and return retryable so the caller reschedules; do NOT raise a task, or a
  // busy morning of 429s would bury the board in dozens of identical "send
  // failed" cards for messages that will go out fine on the next attempt.
  //
  // `messageId` is returned here too (audit3 core 55, 5 Sep): "the caller
  // reschedules" was only ever true for the autopilot-reply path, which
  // regenerates its own reply from scratch on the retry. A caller with a fixed
  // body to resend (the payment confirmation) has no way to hand that body to
  // the scheduler without this id — without it, "reschedules" was nothing.
  if (res.retryable) {
    await store.audit('channel', 'send_throttled', { customerId: customer.id, error: res.error });
    return { ok: false, error: res.error, retryable: true, messageId: rec.id };
  }
  await store.audit('channel', 'send_failed', { customerId: customer.id, error: res.error });
  await store.addTask({
    customerId: customer.id, customerName: customer.name ?? customer.waId,
    reason: typeof opts?.onFailure?.reason === 'function'
      ? opts.onFailure.reason(res.error)
      : opts?.onFailure?.reason ?? `WhatsApp send failed: ${res.error ?? 'unknown error'}`,
    severity: opts?.onFailure?.severity ?? 'REVIEW',
    context: opts?.onFailure?.context ?? body.slice(0, 200),
    suggestedReply: body,
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

// ------------------------------------------------------------------
// Which Meta templates does the code actually send, and do they exist?
//
// (audit, 5 Sep) Every name below is passed to sendWhatsAppTemplate somewhere
// (the follow-up cadence, the estimate invoice, the signature and lodged
// lines, the system confirmations). Nothing ever asked Meta whether they were
// created, approved, paused or given the right number of {{n}} slots, and the
// WABA id the connect flow stores was written and never read. So the first
// sign that `fu_form_3d` was never made, or that `estimate_invoice` was
// approved with one variable instead of two, was a failed send to a real
// customer at 7pm and a raw error task. verifyTemplates() lists the gap on
// the health panel instead, before any customer meets it. Sending is
// untouched: this only reads.
// ------------------------------------------------------------------
import { FLOW_TEMPLATES } from './state-machine';
import {
  FORM_RECEIVED_MSG, formReceivedTemplateKey, reviewRequestTemplateKey,
  requestAbnTemplateKey, handoffHoldingTemplateKey, paymentReceivedTemplateKey,
} from './i18n';
import { medicareTemplateKey } from './i18n'; // medicare_<lang> (audit, 5 Sep)

export interface ExpectedMetaTemplate {
  /** Exact template name in WhatsApp Manager. */
  name: string;
  /** Number of {{n}} body parameters the send path fills. */
  params: number;
  /** True when the send path falls back to free text inside the 24h window
   *  (fallbackToText), so a missing template costs nothing there and is
   *  reported as a note, not a red dot. False means a send outside the window
   *  has no other way through: missing is red. */
  optional: boolean;
}

const EXPECTED_LANGS = Object.keys(FORM_RECEIVED_MSG);

/** Built from the same constants the send paths use, so a renamed key here
 *  and in the sender cannot drift apart (a test pins every literal). */
export const EXPECTED_META_TEMPLATES: ExpectedMetaTemplate[] = [
  // Scheduled follow-ups: {{1}} is the first name (scheduler.ts, actions send_followup).
  ...Object.values(FLOW_TEMPLATES).flat().map((name) => ({ name, params: 1, optional: false })),
  // Owner actions outside the window (actions/route.ts).
  { name: 'estimate_invoice', params: 2, optional: false },
  { name: 'signature', params: 0, optional: false },
  { name: 'lodged_confirmation', params: 0, optional: false },
  // System lines with a free-text fallback inside the window.
  { name: 'medicare', params: 0, optional: true },
  ...EXPECTED_LANGS.flatMap((lang) => [
    { name: formReceivedTemplateKey(lang), params: 0, optional: true },
    { name: reviewRequestTemplateKey(lang), params: 0, optional: true },
    { name: requestAbnTemplateKey(lang), params: 0, optional: true },
    { name: handoffHoldingTemplateKey(lang), params: 0, optional: true },
    { name: paymentReceivedTemplateKey(lang), params: 0, optional: true },
    { name: medicareTemplateKey(lang), params: 0, optional: true },
  ]),
].filter((t, i, all) => all.findIndex((o) => o.name === t.name) === i);

export interface TemplateVerification {
  /** False when there is no token or no WABA id to ask with. */
  configured: boolean;
  /** True when Meta answered and the list was compared. */
  checked: boolean;
  /** False only for a problem that WILL fail a send: a required template
   *  missing, nothing approved for it, or the wrong number of parameters. */
  ok: boolean;
  /** One line for the health panel. */
  detail: string;
  /** Required templates Meta does not have at all. */
  missing: string[];
  /** Optional (text-fallback) templates Meta does not have. */
  missingOptional: string[];
  /** Present but no approved language: "name (PAUSED)". */
  notApproved: string[];
  /** Approved but the body has a different number of {{n}} slots. */
  paramMismatch: string[];
  /** Approved language codes per template name, e.g. fu_pre_24h: [en, de]. */
  approvedLanguages: Record<string, string[]>;
}

interface MetaTemplateRow { name?: string; status?: string; language?: string; components?: { type?: string; text?: string }[] }

let _templateCache: { at: number; key: string; result: TemplateVerification } | null = null;
const TEMPLATE_VERIFY_TTL_MS = VERIFY_TTL_MS;
const TEMPLATE_VERIFY_MAX_PAGES = 5;

export function waWabaId(): string | undefined {
  return process.env.WHATSAPP_WABA_ID;
}

async function resolveWabaId(): Promise<string | undefined> {
  try {
    const v = await getStore().getSetting(WA_WABA_KEY);
    if (typeof v === 'string' && v) return v;
  } catch { /* store unavailable: fall back to env */ }
  return waWabaId();
}

function bodyParamCount(row: MetaTemplateRow): number {
  const body = (row.components ?? []).find((c) => (c.type ?? '').toUpperCase() === 'BODY');
  const seen = new Set<string>();
  for (const m of (body?.text ?? '').matchAll(/\{\{(\d+)\}\}/g)) seen.add(m[1]);
  return seen.size;
}

/** Compare Meta's template list against EXPECTED_META_TEMPLATES. Pure, so the
 *  comparison is testable without the network. */
export function compareTemplates(rows: MetaTemplateRow[], expected: ExpectedMetaTemplate[] = EXPECTED_META_TEMPLATES): Omit<TemplateVerification, 'configured' | 'checked' | 'detail'> {
  const byName = new Map<string, MetaTemplateRow[]>();
  for (const r of rows) {
    if (!r.name) continue;
    byName.set(r.name, [...(byName.get(r.name) ?? []), r]);
  }
  const missing: string[] = [];
  const missingOptional: string[] = [];
  const notApproved: string[] = [];
  const paramMismatch: string[] = [];
  const approvedLanguages: Record<string, string[]> = {};
  for (const t of expected) {
    const rowsFor = byName.get(t.name);
    if (!rowsFor) { (t.optional ? missingOptional : missing).push(t.name); continue; }
    const approved = rowsFor.filter((r) => (r.status ?? '').toUpperCase() === 'APPROVED');
    if (!approved.length) {
      const statuses = [...new Set(rowsFor.map((r) => (r.status ?? 'UNKNOWN').toUpperCase()))].join('/');
      notApproved.push(`${t.name} (${statuses})`);
      continue;
    }
    approvedLanguages[t.name] = approved.map((r) => r.language ?? '?');
    const wrong = approved.filter((r) => bodyParamCount(r) !== t.params);
    if (wrong.length) {
      paramMismatch.push(`${t.name} (expects ${t.params}, has ${[...new Set(wrong.map(bodyParamCount))].join('/')}${wrong.length < approved.length ? ` in ${wrong.map((r) => r.language).join(',')}` : ''})`);
    }
  }
  return {
    ok: !missing.length && !notApproved.length && !paramMismatch.length,
    missing, missingOptional, notApproved, paramMismatch, approvedLanguages,
  };
}

function describeTemplates(r: Omit<TemplateVerification, 'configured' | 'checked' | 'detail'>): string {
  const parts: string[] = [];
  if (r.missing.length) parts.push(`${r.missing.length} template${r.missing.length === 1 ? '' : 's'} missing in WhatsApp Manager: ${r.missing.join(', ')}`);
  if (r.notApproved.length) parts.push(`not approved: ${r.notApproved.join(', ')}`);
  if (r.paramMismatch.length) parts.push(`wrong number of variables: ${r.paramMismatch.join(', ')}`);
  if (r.missingOptional.length) parts.push(`optional, sent as text inside 24h: ${r.missingOptional.join(', ')}`);
  if (!parts.length) return `all ${Object.keys(r.approvedLanguages).length} templates approved in WhatsApp Manager`;
  return parts.join('. ');
}

/**
 * Ask Meta which of the templates the code sends actually exist and are
 * approved. Cached like verifyChannel (5 min) and keyed on the credentials,
 * so a reconnect re-checks on its own. Read only; never throws.
 */
export async function verifyTemplates(): Promise<TemplateVerification> {
  const base = { missing: [], missingOptional: [], notApproved: [], paramMismatch: [], approvedLanguages: {} };
  const { token } = await resolveWaCreds();
  if (!token) return { ...base, configured: false, checked: false, ok: true, detail: 'test mode (credentials not set)' };
  const wabaId = await resolveWabaId();
  if (!wabaId) {
    return { ...base, configured: false, checked: false, ok: true, detail: 'not checked: no WhatsApp Business Account id (set WHATSAPP_WABA_ID or reconnect WhatsApp)' };
  }
  const cacheKey = `${wabaId}:${token.slice(-8)}`;
  const nowMs = Date.now();
  if (_templateCache && _templateCache.key === cacheKey && nowMs - _templateCache.at < TEMPLATE_VERIFY_TTL_MS) return _templateCache.result;

  let result: TemplateVerification;
  try {
    const rows: MetaTemplateRow[] = [];
    let url: string | undefined = `https://graph.facebook.com/${GRAPH_VERSION}/${wabaId}/message_templates?fields=name,status,language,components&limit=200`;
    for (let page = 0; url && page < TEMPLATE_VERIFY_MAX_PAGES; page++) {
      const res: Response = await fetch(url, {
        method: 'GET', headers: { Authorization: `Bearer ${token}` }, cache: 'no-store',
        signal: AbortSignal.timeout(WA_VERIFY_TIMEOUT_MS),
      });
      const data = await res.json().catch(() => ({} as Record<string, unknown>)) as { data?: MetaTemplateRow[]; paging?: { next?: string }; error?: { message?: string } };
      if (!res.ok) {
        result = { ...base, configured: true, checked: false, ok: false, detail: `Meta would not list the templates: ${data.error?.message ?? ('HTTP ' + res.status)}` };
        _templateCache = { at: nowMs, key: cacheKey, result };
        return result;
      }
      rows.push(...(data.data ?? []));
      url = data.paging?.next;
    }
    const cmp = compareTemplates(rows);
    result = { ...cmp, configured: true, checked: true, detail: describeTemplates(cmp) };
  } catch (e) {
    result = { ...base, configured: true, checked: false, ok: false, detail: `could not reach Meta for the template list: ${(e as Error).message}` };
  }
  _templateCache = { at: nowMs, key: cacheKey, result };
  return result;
}

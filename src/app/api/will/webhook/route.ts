// ============================================================
// Meta WhatsApp Cloud API webhook.
// GET  = Meta endpoint verification handshake.
// POST = incoming messages. Signature-verified, idempotent on the Meta
//        message id (H8), returns 200 fast and processes asynchronously so
//        Meta retries never double-process. Sending back to WhatsApp is the
//        job of the outbound sender wired at channel-connect time; here we
//        run the existing engine pipeline (handleIncoming) and enqueue the
//        outbound message as an OUT record.
// ============================================================
import { createHmac, timingSafeEqual } from 'crypto';
import { handleIncoming, handleInboundNote } from '@/lib/will/service';
import { getStore } from '@/lib/will/store';
import { metaAppSecret, metaVerifyToken, resolveWaCreds } from '@/lib/will/channel';
import { isRateLimited, getRedis } from '@/lib/rate-limit';
import { resolveAiMode } from '@/lib/will/mode';

// REL-01: allow the function up to 60s so a Claude call (30s x up to 2 attempts)
// completes BEFORE the platform can kill it mid-processing — the atomic
// idempotency claim would otherwise persist and Meta's retry would be skipped.
export const maxDuration = 60;

const MAX_WEBHOOK_BYTES = 256 * 1024;
/** Throttle for the signature-rejection audit line (DIAG-02). */
let _lastSigFailLog = 0;
// COST-01: bound paid Anthropic calls + DB writes triggered by a public endpoint.
const PER_SENDER_MAX = 12;   // inbound messages per sender per rate-limit window
const GLOBAL_INBOUND_MAX = 400; // inbound messages across ALL senders per window

// REL-03: how many times Meta may redeliver one message before we stop asking.
//
// Meta redelivers any webhook it does not receive a 2xx for, so returning a
// non-2xx is the ONLY way to get a failed message back. This handler used to
// return 200 unconditionally — including from the catch — which meant a single
// transient Supabase error silently destroyed a customer enquiry, and the
// `releaseInbound` call in the catch could never do anything, because the retry
// it was releasing the claim for was never going to arrive.
//
// Left unbounded, a permanently-failing message (a column no migration will add
// back, a poisoned payload) would be redelivered for days. Three attempts
// recovers every transient fault — a connection blip, a cold database, a deploy
// mid-flight — and then hands the message to a human instead of looping.
const MAX_INBOUND_ATTEMPTS = 3;
const FAILURE_TTL_SECS = 7 * 24 * 60 * 60; // Meta's redelivery horizon

/**
 * Count failures for one Meta message id and return the attempt number.
 *
 * Deliberately NOT stored in Postgres: the reason we are in this code path is
 * that a Postgres write just failed. Redis is a separate dependency, so a
 * database outage cannot also destroy the counter that decides whether to retry.
 * When Redis is unavailable this returns 1 — "always ask Meta to try again" —
 * which is the same trade `claimInbound` already makes: a duplicate costs one
 * wasted engine call, a drop costs a customer.
 */
async function noteInboundFailure(metaId: string): Promise<number> {
  try {
    const redis = await getRedis();
    if (!redis) return 1;
    const key = `will:inbound_fail:${metaId}`;
    const n = await redis.incr(key);
    if (n === 1) await redis.expire(key, FAILURE_TTL_SECS);
    return typeof n === 'number' ? n : 1;
  } catch {
    return 1;
  }
}

/** Constant-time string compare (APPSEC-02 / AUTHZ-INFO-01): avoid leaking token
 *  length/prefix via early-exit `===` on security-sensitive comparisons. */
function safeStrEqual(a: string | undefined | null, b: string | undefined | null): boolean {
  if (!a || !b) return false;
  const ba = Buffer.from(a, 'utf8'), bb = Buffer.from(b, 'utf8');
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');
  if (mode === 'subscribe' && safeStrEqual(token, metaVerifyToken())) {
    return new Response(challenge ?? '', { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

function verifySignature(rawBody: string, header: string | null): boolean {
  const secret = metaAppSecret();
  if (!secret || !header?.startsWith('sha256=')) return false;
  const expected = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');
  const given = header.slice('sha256='.length);
  try {
    const a = Buffer.from(expected, 'hex'), c = Buffer.from(given, 'hex');
    return a.length === c.length && timingSafeEqual(a, c);
  } catch {
    return false;
  }
}

interface WaMedia { id?: string; mime_type?: string; caption?: string; filename?: string; sha256?: string }

interface WaMessage {
  id: string; from: string; type: string; timestamp?: string;
  text?: { body: string };
  // Meta sends a media `id` on every attachment. It was being dropped, so a
  // photo became the text "[Photo]" and the picture itself was unreachable.
  image?: WaMedia; video?: WaMedia;
  document?: WaMedia;
  audio?: WaMedia; voice?: WaMedia; sticker?: WaMedia;
  /** A heart or thumbs up on one of our messages. This fell through to the
   *  generic "open WhatsApp to view" placeholder, which read as unreadable. */
  reaction?: { message_id?: string; emoji?: string };
  location?: unknown; contacts?: unknown;
  // Present on type:'unsupported' — the reason Meta could not render the message.
  errors?: { code?: number; title?: string; message?: string }[];
}

/** One inbound message reduced to something we can always act on. `isText` true
 *  means run the AI engine on `body`; false means the message carried no text we
 *  can read (a photo, a voice note, or a Coexistence `unsupported` with no body),
 *  so it is stored and handed to a human instead of the model. */
interface InboundItem {
  msg: WaMessage; name?: string; body: string; isText: boolean; kind: string;
  media?: { id: string; kind: string; mime?: string; filename?: string; caption?: string };
  reaction?: { emoji: string | null; to?: string };
}

/** The attachment on a message, in the shape the dashboard needs to show it.
 *  Meta keeps media for 30 days behind an authenticated endpoint, so only the
 *  id is stored and /api/will/media/[id] streams the bytes on demand. */
function mediaOf(m: WaMessage): { id: string; kind: string; mime?: string; filename?: string; caption?: string } | undefined {
  const slot: WaMedia | undefined = m.image ?? m.video ?? m.document ?? m.audio ?? m.voice ?? m.sticker;
  if (!slot?.id) return undefined;
  return { id: slot.id, kind: m.type, mime: slot.mime_type, filename: slot.filename, caption: slot.caption };
}

/** A human-readable stand-in for a message that carries no text body, so a photo
 *  or voice note still shows in the thread instead of vanishing. */
function placeholderFor(m: WaMessage): string {
  const caption = m.image?.caption || m.video?.caption || m.document?.caption || '';
  let note: string;
  switch (m.type) {
    case 'reaction': return m.reaction?.emoji ? `${m.reaction.emoji}  reacted to your message` : 'removed their reaction';
    case 'image': note = '📷 [Photo]'; break;
    case 'video': note = '🎥 [Video]'; break;
    case 'audio': case 'voice': note = '🎤 [Voice message]'; break;
    case 'document': note = `📄 [Document${m.document?.filename ? ': ' + m.document.filename : ''}]`; break;
    case 'sticker': note = '💟 [Sticker]'; break;
    case 'location': note = '📍 [Location]'; break;
    case 'contacts': note = '👤 [Contact card]'; break;
    default: note = '📎 [Message — open WhatsApp to view]';
  }
  return caption ? `${note} ${caption}` : note;
}

/** Non-PII description of a message we could not turn into text, for the audit
 *  log. This is what tells us, on the next real message, whether Meta ever
 *  includes a body on a Coexistence `unsupported` payload (it usually does not),
 *  and which error code it attaches. The body preview is redacted to a length. */
function describeUndecoded(m: WaMessage): Record<string, unknown> {
  return {
    type: m.type,
    keys: Object.keys(m).filter((k) => k !== 'from'),
    hasTextBody: !!m.text?.body,
    textLen: m.text?.body ? m.text.body.length : 0,
    errors: (m.errors ?? []).map((e) => ({ code: e.code ?? null, title: e.title ?? null })),
  };
}

// Coexistence + fresh-start cutoff: when a number joins via coexistence, Meta
// does a ONE-TIME history sync that pushes old chats into the webhook. Set
// WILL_MIN_MESSAGE_TS (unix epoch seconds) to ignore anything older, so only
// genuinely new conversations from that moment on enter Will. Unset = accept all.
function inboundCutoffTs(): number {
  const v = Number(process.env.WILL_MIN_MESSAGE_TS || 0);
  return Number.isFinite(v) ? v : 0;
}

/** Mask a phone number for the audit log: keep enough to recognise a sender,
 *  never enough to be a leak if the log is ever exported. */
function maskWa(n: string): string {
  const d = (n || '').replace(/\D/g, '');
  return d.length <= 4 ? '***' : `${d.slice(0, 4)}***${d.slice(-3)}`;
}

/** A compact, side-effect-free description of an inbound payload, recorded
 *  before any filtering so a dropped message still leaves a trace. `wabaId` is
 *  the entry id — the single most useful field when the same business owns
 *  several WhatsApp Business Accounts and only one of them is the live one. */
// NOT exported: Next.js validates route files against a fixed set of allowed
// exports (GET/POST/dynamic/maxDuration/...) and fails the build on anything
// else. `tsc --noEmit` does not check this — only `next build` does.
function inboundSnapshot(payload: unknown): Record<string, unknown> {
  const out = {
    wabaId: null as string | null,
    phoneNumberId: null as string | null,
    displayPhoneNumber: null as string | null,
    fields: [] as string[],
    messageCount: 0,
    types: [] as string[],
    senders: [] as string[],
    timestamps: [] as number[],
    hasHistory: false,
    statusesOnly: false,
  };
  try {
    const entries = (payload as { entry?: unknown[] }).entry ?? [];
    for (const e of entries) {
      const id = (e as { id?: string }).id;
      if (id && !out.wabaId) out.wabaId = String(id);
      for (const ch of ((e as { changes?: unknown[] }).changes ?? [])) {
        const field = (ch as { field?: string }).field;
        if (field && !out.fields.includes(field)) out.fields.push(field);
        const val = (ch as {
          value?: {
            messages?: WaMessage[];
            statuses?: unknown[];
            history?: unknown;
            metadata?: { phone_number_id?: string; display_phone_number?: string };
          };
        }).value ?? {};
        if (val.metadata?.phone_number_id) out.phoneNumberId = String(val.metadata.phone_number_id);
        if (val.metadata?.display_phone_number) out.displayPhoneNumber = String(val.metadata.display_phone_number);
        if (val.history) out.hasHistory = true;
        if (!val.messages?.length && val.statuses?.length) out.statusesOnly = true;
        for (const m of val.messages ?? []) {
          out.messageCount += 1;
          if (m.type && !out.types.includes(m.type)) out.types.push(m.type);
          if (m.from) out.senders.push(maskWa(m.from));
          if (m.timestamp) out.timestamps.push(Number(m.timestamp));
        }
      }
    }
  } catch { /* malformed payload: report what we managed to read */ }
  return out;
}

/** Extract text messages + sender profile names from a Meta webhook payload.
 *  WH-01: only accept messages addressed to OUR phone number id (when we know
 *  it), so a valid-HMAC payload for a different WABA cannot inject customers.
 *
 *  CONFIG-02: `ourPhoneId` is passed IN (resolved via resolveWaCreds) rather
 *  than read from the env here. The Connect page stores the phone number id in
 *  the DB, where it OVERRIDES the env var for outbound — so reading only the
 *  env var meant that connecting through the page could switch sending to a new
 *  id while this filter kept matching the old one, silently dropping every
 *  inbound message with no error anywhere. Both directions now resolve the id
 *  the same way. */
function extract(payload: unknown, ourPhoneId?: string): InboundItem[] {
  const out: InboundItem[] = [];
  try {
    const entries = (payload as { entry?: unknown[] }).entry ?? [];
    for (const e of entries) {
      for (const ch of ((e as { changes?: unknown[] }).changes ?? [])) {
        const val = (ch as { value?: { messages?: WaMessage[]; contacts?: { profile?: { name?: string }; wa_id?: string }[]; metadata?: { phone_number_id?: string } } }).value ?? {};
        // Drop deliveries for a different phone number id (only when ours is set).
        if (ourPhoneId && val.metadata?.phone_number_id && val.metadata.phone_number_id !== ourPhoneId) continue;
        // Skip coexistence history-sync payloads entirely (they carry old chats).
        if ((val as { history?: unknown }).history) continue;
        const nameByWa = new Map((val.contacts ?? []).map((c) => [c.wa_id, c.profile?.name]));
        const cutoff = inboundCutoffTs();
        for (const m of val.messages ?? []) {
          // Drop messages older than the fresh-start cutoff (history sync / backfill).
          if (cutoff && m.timestamp && Number(m.timestamp) < cutoff) continue;
          const name = nameByWa.get(m.from);
          // THE FIX: recover the text whenever a body is present, WHATEVER the
          // declared type. In WhatsApp Coexistence a plain text message can arrive
          // tagged `unsupported` while still carrying its `text.body`; the old
          // strict `type === 'text'` check dropped it silently, losing the lead.
          if (m.text?.body) {
            out.push({ msg: m, name, body: m.text.body, isText: true, kind: 'text' });
            continue;
          }
          // No readable text: keep the customer visible with a placeholder and a
          // human task rather than dropping them. Media and bodiless `unsupported`
          // both land here.
          out.push({
            msg: m, name, body: placeholderFor(m), isText: false, kind: m.type || 'unknown',
            // Carry the attachment id and the reaction through, so the chat can
            // show the picture and the heart rather than a placeholder line.
            media: mediaOf(m),
            reaction: m.type === 'reaction'
              ? { emoji: m.reaction?.emoji ?? null, to: m.reaction?.message_id }
              : undefined,
          });
        }
      }
    }
  } catch { /* malformed payload: ignore, we already 200 */ }
  return out;
}

/**
 * Coexistence sync: messages the staff member sends (or deletes) from the
 * WhatsApp Business APP on the shared number arrive in a SEPARATE webhook field,
 * `smb_message_echoes`, not `messages`. Meta delivers:
 *   - text echoes  { from: <business>, to: <customer>, id, timestamp, text.body }
 *   - revokes      { type:'revoke', revoke:{ original_message_id } }
 * so that an API/CRM sharing the number stays in sync with what was typed on the
 * phone. Requires the app to be subscribed to the `smb_message_echoes` webhook
 * field in Meta. Extracted here and handled in POST.
 */
function extractEchoes(payload: unknown): {
  echoes: { to: string; id: string; body: string }[];
  revokes: string[];
} {
  const echoes: { to: string; id: string; body: string }[] = [];
  const revokes: string[] = [];
  try {
    for (const e of ((payload as { entry?: unknown[] }).entry ?? [])) {
      for (const ch of ((e as { changes?: unknown[] }).changes ?? [])) {
        if ((ch as { field?: string }).field !== 'smb_message_echoes') continue;
        const val = (ch as { value?: { message_echoes?: unknown[] } }).value ?? {};
        for (const raw of (val.message_echoes ?? [])) {
          const m = raw as {
            type?: string; to?: string; id?: string; text?: { body?: string };
            revoke?: { original_message_id?: string };
          };
          if (m.type === 'revoke' && m.revoke?.original_message_id) {
            revokes.push(m.revoke.original_message_id);
          } else if (m.type === 'text' && m.text?.body && m.to && m.id) {
            echoes.push({ to: m.to, id: m.id, body: m.text.body });
          }
        }
      }
    }
  } catch { /* malformed: return what we have */ }
  return { echoes, revokes };
}

export async function POST(req: Request) {
  // DOS-01: reject oversized bodies as early as possible (Content-Length precheck
  // before buffering), then measure real BYTES (not UTF-16 code units), then
  // verify the HMAC before any parsing/allocation-heavy work.
  const declared = Number(req.headers.get('content-length') || 0);
  if (declared && declared > MAX_WEBHOOK_BYTES) return new Response('Too large', { status: 413 });
  const raw = await req.text();
  if (Buffer.byteLength(raw, 'utf8') > MAX_WEBHOOK_BYTES) return new Response('Too large', { status: 413 });
  if (!verifySignature(raw, req.headers.get('x-hub-signature-256'))) {
    // DIAG-02: a wrong META_APP_SECRET rejects every real message here and used
    // to leave NO trace at all — inbound simply went quiet. Record it, but at
    // most once a minute: this is a public endpoint and an unthrottled write
    // would be an amplification vector.
    const nowMs = Date.now();
    if (nowMs - _lastSigFailLog > 60_000) {
      _lastSigFailLog = nowMs;
      try {
        await getStore().audit('channel', 'inbound_signature_rejected', {
          hasSecret: !!metaAppSecret(),
          headerPresent: !!req.headers.get('x-hub-signature-256'),
          hint: 'META_APP_SECRET does not match the Meta app that sent this webhook',
        });
      } catch { /* diagnostics only */ }
    }
    return new Response('Invalid signature', { status: 401 });
  }

  let payload: unknown;
  try { payload = JSON.parse(raw); } catch { return new Response('OK', { status: 200 }); }

  const store = getStore();
  const { phoneId: ourPhoneId } = await resolveWaCreds();

  // DIAG-01: record what actually arrived BEFORE any filter runs. Inbound
  // failures used to be invisible — a message could be dropped by the phone-id
  // filter, the timestamp cutoff or the returning-contact list and leave no
  // trace anywhere, which made "nothing reached Will" impossible to diagnose
  // without guessing. This one line is the difference between an answer and an
  // afternoon of speculation. Never throws: diagnostics must not break inbound.
  try {
    const snap = inboundSnapshot(payload);
    // Meta sends a webhook for every delivery and read receipt too, which is
    // three or four per outbound message and says nothing about why a message
    // did or did not arrive. Logging those would make this table dwarf the
    // conversations themselves within a year, so only real traffic is recorded.
    if (!snap.statusesOnly) {
      await store.audit('channel', 'inbound_received', {
        ...snap, ourPhoneId: ourPhoneId ?? null, cutoff: inboundCutoffTs() || null,
        phoneIdMatches: !snap.phoneNumberId || !ourPhoneId || snap.phoneNumberId === ourPhoneId,
      });
    }
  } catch { /* diagnostics only */ }

  const items = extract(payload, ourPhoneId);
  // Text messages run the AI engine; anything with no readable body (a photo, a
  // voice note, a bodiless `unsupported`) is handled separately below so it is
  // never silently dropped.
  const textItems = items.filter((it) => it.isText);
  const noteItems = items.filter((it) => !it.isText);

  // REL-01: process BEFORE acking (Meta allows ~10s and our work is a few
  // seconds), so a serverless freeze after the response can never drop a
  // message.
  // REL-03: if ANY message in this delivery failed and is still within its retry
  // budget, we answer non-2xx so Meta redelivers the whole payload. Messages that
  // already succeeded keep their idempotency claim and are skipped as duplicates
  // on the redelivery, so a retry re-runs only what actually failed.
  // COST-01: throttle per-sender and globally before invoking the paid engine.
  let askMetaToRetry = false;
  for (const { msg, name, body } of textItems) {
    // Atomic idempotency claim (RACE-01/REL-02): the first delivery of a given
    // Meta id wins; concurrent duplicates get false and are skipped.
    let claimed = false;
    try {
      claimed = await store.claimInbound(msg.id);
      if (!claimed) continue; // already processed / in-flight

      // Fresh-start filter (Jo's rule): only 100% new customers enter Will. A
      // pre-existing / returning contact is dropped even if they message again.
      if (await store.isBlockedContact(msg.from)) {
        // Masked: this log is readable in the CRM and the snapshot above already
          // masks senders. Writing the raw number here undid that.
          await store.audit('policy_guard', 'returning_contact_skipped', { from: maskWa(msg.from) });
        continue; // claim stands, so it is never reconsidered
      }

      // Flood control on a public endpoint. When exceeded we KEEP the claim
      // (drop the message) and skip the engine so an abuser cannot amplify paid
      // Anthropic calls or DB writes by re-sending.
      const [perSender, global] = await Promise.all([
        isRateLimited(msg.from, 'will_inbound', PER_SENDER_MAX),
        isRateLimited('all', 'will_inbound_global', GLOBAL_INBOUND_MAX),
      ]);
      if (perSender || global) {
        await store.audit('policy_guard', 'inbound_rate_limited', { from: maskWa(msg.from), scope: perSender ? 'sender' : 'global' });
        continue;
      }

      // `??` only caught null/undefined, so any other stored value passed through
      // to an engine that treated "not SUPERVISED" as permission to send.
      // resolveAiMode recognises exactly one value as autopilot.
      const mode = resolveAiMode(await store.getSetting('ai_mode'));
      await handleIncoming(msg.from, body, mode, { name });
      // success: the claim stands, so a Meta retry of the same id is a no-op.
    } catch (e) {
      const error = (e as Error).message?.slice(0, 200) ?? 'unknown';
      const attempt = await noteInboundFailure(msg.id);

      if (attempt < MAX_INBOUND_ATTEMPTS) {
        // Release the claim AND ask Meta to redeliver. Both halves are required:
        // releasing alone did nothing, because a 200 meant no retry ever came.
        if (claimed) { try { await store.releaseInbound(msg.id); } catch { /* */ } }
        askMetaToRetry = true;
        try {
          await store.audit('channel', 'inbound_error', {
            id: msg.id, error, attempt, willRetry: true,
          });
        } catch { /* */ }
      } else {
        // Out of retries. KEEP the claim so Meta stops redelivering, and make the
        // failure loud instead of leaving it as one audit line nobody reads. This
        // is the same pattern the outbound path already uses when a Meta send
        // fails: the message text is preserved on a task so the customer can
        // still be answered by hand.
        try {
          await store.audit('channel', 'inbound_dead_letter', {
            id: msg.id, error, attempt, from: maskWa(msg.from),
          });
        } catch { /* */ }
        try {
          const customer = await store.getCustomerByWaId(msg.from);
          await store.addTask({
            customerId: customer?.id ?? null,
            customerName: customer?.name ?? name ?? maskWa(msg.from),
            reason: `A WhatsApp message could not be processed after ${MAX_INBOUND_ATTEMPTS} attempts and needs a manual reply. Error: ${error}`,
            severity: 'URGENT',
            context: body,
            suggestedReply: null,
          });
        } catch { /* the store is the thing that is broken; the audit line stands */ }
      }
    }
  }

  // Messages with no readable text (a photo, a voice note, or a Coexistence
  // `unsupported` that carried no body). Will cannot read these, so it does NOT
  // reply — but the customer must never disappear. Store the placeholder in the
  // thread and raise ONE task so a human opens WhatsApp and answers. Best-effort:
  // never blocks the ack, never asks Meta to retry (there is nothing to re-run).
  for (const { msg, name, body, kind, media, reaction } of noteItems) {
    try {
      if (!(await store.claimInbound(msg.id))) continue; // dedupe on the Meta id
      // For a bodiless `unsupported`, record exactly what Meta sent (no PII), so
      // we can confirm whether the text was ever recoverable and which error code
      // Coexistence attached. This is the line that turns "why is it unsupported"
      // into a definite answer on the next message.
      if (kind === 'unsupported' || kind === 'unknown') {
        try { await store.audit('channel', 'inbound_unsupported', { id: msg.id, from: maskWa(msg.from), ...describeUndecoded(msg) }); } catch { /* */ }
      }
      await handleInboundNote(msg.from, body, { name, media, reaction });
      await store.audit('channel', 'inbound_note_stored', { id: msg.id, kind, hasMedia: !!media, from: maskWa(msg.from) });
    } catch { /* best effort: the placeholder is a courtesy, not the lead itself */ }
  }

  // Coexistence sync: mirror what the staff member did in the WhatsApp Business
  // app. Messages typed on the phone are recorded as outgoing HUMAN messages in
  // the same thread (so Will shows the full conversation), and messages deleted
  // on the phone are hidden here too. Best-effort: never blocks the ack.
  const { echoes, revokes } = extractEchoes(payload);
  for (const echo of echoes) {
    try {
      // Dedupe on the Meta id, reusing the processed-messages table.
      if (!(await store.claimInbound(echo.id))) continue;
      // from = the business, to = the customer — so the customer is `to`.
      const customer = await store.getCustomerByWaId(echo.to);
      // Only mirror into a conversation Will already knows, so messaging a
      // brand-new number from the phone does not silently create CRM contacts.
      if (!customer) continue;
      await store.addMessage({
        customerId: customer.id, direction: 'OUT', author: 'HUMAN', status: 'SENT',
        body: echo.body, meta: { providerId: echo.id, channel: 'app' },
      });
      await store.audit('channel', 'app_echo_synced', { id: echo.id, from: maskWa(echo.to) });
    } catch { /* best effort */ }
  }
  for (const rid of revokes) {
    try {
      const hit = await store.discardByProviderId(rid);
      await store.audit('channel', 'app_message_revoked', { id: rid, found: hit });
    } catch { /* best effort */ }
  }

  // REL-03: a non-2xx is what makes Meta redeliver. 200 here was the bug.
  if (askMetaToRetry) return new Response('Retry', { status: 500 });
  return new Response('OK', { status: 200 });
}

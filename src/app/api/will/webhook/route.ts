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
import { handleIncoming } from '@/lib/will/service';
import { getStore } from '@/lib/will/store';
import { metaAppSecret, metaVerifyToken, waPhoneNumberId } from '@/lib/will/channel';
import { isRateLimited } from '@/lib/rate-limit';

// REL-01: allow the function up to 60s so a Claude call (30s x up to 2 attempts)
// completes BEFORE the platform can kill it mid-processing — the atomic
// idempotency claim would otherwise persist and Meta's retry would be skipped.
export const maxDuration = 60;

const MAX_WEBHOOK_BYTES = 256 * 1024;
// COST-01: bound paid Anthropic calls + DB writes triggered by a public endpoint.
const PER_SENDER_MAX = 12;   // inbound messages per sender per rate-limit window
const GLOBAL_INBOUND_MAX = 400; // inbound messages across ALL senders per window

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

interface WaMessage { id: string; from: string; text?: { body: string }; type: string; }

/** Extract text messages + sender profile names from a Meta webhook payload.
 *  WH-01: only accept messages addressed to OUR phone number id (when we know
 *  it), so a valid-HMAC payload for a different WABA cannot inject customers. */
function extract(payload: unknown): { msg: WaMessage; name?: string }[] {
  const out: { msg: WaMessage; name?: string }[] = [];
  const ourPhoneId = waPhoneNumberId();
  try {
    const entries = (payload as { entry?: unknown[] }).entry ?? [];
    for (const e of entries) {
      for (const ch of ((e as { changes?: unknown[] }).changes ?? [])) {
        const val = (ch as { value?: { messages?: WaMessage[]; contacts?: { profile?: { name?: string }; wa_id?: string }[]; metadata?: { phone_number_id?: string } } }).value ?? {};
        // Drop deliveries for a different phone number id (only when ours is set).
        if (ourPhoneId && val.metadata?.phone_number_id && val.metadata.phone_number_id !== ourPhoneId) continue;
        const nameByWa = new Map((val.contacts ?? []).map((c) => [c.wa_id, c.profile?.name]));
        for (const m of val.messages ?? []) {
          if (m.type === 'text' && m.text?.body) out.push({ msg: m, name: nameByWa.get(m.from) });
        }
      }
    }
  } catch { /* malformed payload: ignore, we already 200 */ }
  return out;
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
    return new Response('Invalid signature', { status: 401 });
  }

  let payload: unknown;
  try { payload = JSON.parse(raw); } catch { return new Response('OK', { status: 200 }); }

  const store = getStore();
  const items = extract(payload);

  // REL-01: process BEFORE acking (Meta allows ~10s and our work is a few
  // seconds), so a serverless freeze after the response can never drop a
  // message. The seen-flag is written only AFTER handleIncoming succeeds, so a
  // failed/never-run message stays un-seen and Meta's retry reprocesses it.
  // COST-01: throttle per-sender and globally before invoking the paid engine.
  for (const { msg, name } of items) {
    // Atomic idempotency claim (RACE-01/REL-02): the first delivery of a given
    // Meta id wins; concurrent duplicates get false and are skipped.
    let claimed = false;
    try {
      claimed = await store.claimInbound(msg.id);
      if (!claimed) continue; // already processed / in-flight

      // Flood control on a public endpoint. When exceeded we KEEP the claim
      // (drop the message) and skip the engine so an abuser cannot amplify paid
      // Anthropic calls or DB writes by re-sending.
      const [perSender, global] = await Promise.all([
        isRateLimited(msg.from, 'will_inbound', PER_SENDER_MAX),
        isRateLimited('all', 'will_inbound_global', GLOBAL_INBOUND_MAX),
      ]);
      if (perSender || global) {
        await store.audit('policy_guard', 'inbound_rate_limited', { from: msg.from, scope: perSender ? 'sender' : 'global' });
        continue;
      }

      const mode = ((await store.getSetting('ai_mode')) as 'SUPERVISED' | 'FULL_AUTO') ?? 'SUPERVISED';
      await handleIncoming(msg.from, msg.text!.body, mode, { name });
      // success: the claim stands, so a Meta retry of the same id is a no-op.
    } catch (e) {
      // Release the claim so Meta's retry reprocesses this message.
      if (claimed) { try { await store.releaseInbound(msg.id); } catch { /* */ } }
      try { await store.audit('channel', 'inbound_error', { id: msg.id, error: (e as Error).message?.slice(0, 200) }); } catch { /* */ }
    }
  }

  return new Response('OK', { status: 200 });
}

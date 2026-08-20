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

const MAX_WEBHOOK_BYTES = 256 * 1024;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get('hub.mode');
  const token = url.searchParams.get('hub.verify_token');
  const challenge = url.searchParams.get('hub.challenge');
  if (mode === 'subscribe' && token && process.env.META_VERIFY_TOKEN && token === process.env.META_VERIFY_TOKEN) {
    return new Response(challenge ?? '', { status: 200 });
  }
  return new Response('Forbidden', { status: 403 });
}

function verifySignature(rawBody: string, header: string | null): boolean {
  const secret = process.env.META_APP_SECRET;
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

/** Extract text messages + sender profile names from a Meta webhook payload. */
function extract(payload: unknown): { msg: WaMessage; name?: string }[] {
  const out: { msg: WaMessage; name?: string }[] = [];
  try {
    const entries = (payload as { entry?: unknown[] }).entry ?? [];
    for (const e of entries) {
      for (const ch of ((e as { changes?: unknown[] }).changes ?? [])) {
        const val = (ch as { value?: { messages?: WaMessage[]; contacts?: { profile?: { name?: string }; wa_id?: string }[] } }).value ?? {};
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
  const raw = await req.text();
  if (raw.length > MAX_WEBHOOK_BYTES) return new Response('Too large', { status: 413 });
  if (!verifySignature(raw, req.headers.get('x-hub-signature-256'))) {
    return new Response('Invalid signature', { status: 401 });
  }

  let payload: unknown;
  try { payload = JSON.parse(raw); } catch { return new Response('OK', { status: 200 }); }

  const store = getStore();
  const items = extract(payload);

  // Process asynchronously with per-message idempotency; ack immediately so a
  // Meta retry storm cannot pile up or double-process.
  (async () => {
    for (const { msg, name } of items) {
      try {
        const seen = (await store.getSetting('wa_msg:' + msg.id)) === true;
        if (seen) continue; // duplicate delivery / retry
        await store.setSetting('wa_msg:' + msg.id, true);
        const mode = ((await store.getSetting('ai_mode')) as 'SUPERVISED' | 'FULL_AUTO') ?? 'SUPERVISED';
        await handleIncoming(msg.from, msg.text!.body, mode, { name });
      } catch { /* one bad message must not stop the rest */ }
    }
  })();

  return new Response('OK', { status: 200 });
}

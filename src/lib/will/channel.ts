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

/** Transmit a plain text message to a WhatsApp number via Meta's Cloud API. */
export async function sendWhatsAppText(toWaId: string, body: string): Promise<SendResult> {
  const token = waAccessToken();
  const phoneId = waPhoneNumberId();
  if (!token || !phoneId) return { ok: true, skipped: true }; // test mode: not connected yet

  const to = (toWaId || '').replace(/[^\d]/g, '');
  if (!to) return { ok: false, error: 'no recipient number' };

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneId}/messages`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { preview_url: false, body: body.slice(0, 4096) },
      }),
    });
    const data = await res.json().catch(() => ({} as Record<string, unknown>));
    if (!res.ok) {
      const err = (data as { error?: { message?: string; code?: number } }).error;
      return { ok: false, error: `meta ${res.status}: ${err?.message ?? JSON.stringify(data).slice(0, 200)}` };
    }
    const providerId = (data as { messages?: { id?: string }[] }).messages?.[0]?.id;
    return { ok: true, providerId };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
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
  const res = await sendWhatsAppText(customer.waId, body);
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

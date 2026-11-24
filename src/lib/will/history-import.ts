/**
 * WhatsApp Coexistence HISTORY import (25 Nov 2026, Jo).
 *
 * When a WhatsApp Business app number is (re)connected to Cloud API with
 * Coexistence, Meta can send the last 180 days of chats ONCE, as `history`
 * webhooks, after the system calls POST /{phone_number_id}/smb_app_data with
 * sync_type "history" (within 24 hours of onboarding; it can be done only once).
 * Docs: developers.facebook.com/documentation/business-messaging/whatsapp/
 *       embedded-signup/onboarding-business-app-users  and
 *       .../webhooks/reference/history/
 *
 * Will already holds the earlier months. Only the days the system was
 * disconnected are missing. So this module:
 *   - imports ONLY messages inside an explicit window
 *     [WILL_HISTORY_IMPORT_FROM_TS, WILL_HISTORY_IMPORT_TO_TS or now];
 *     with no window set it imports nothing and only counts (safe default);
 *   - never creates, updates or deletes a customer, a task, a tag, a stage or
 *     any existing message. It inserts new message rows only, with the original
 *     WhatsApp timestamp as created_at, so the thread stays in time order;
 *   - never runs the engine, the follow-up scheduler, payment detection or any
 *     reply: history rows are SENT records with channel 'history';
 *   - skips a message ONLY when its WhatsApp message id is already known
 *     (meta.providerId on a stored row, or the processed-messages table). A
 *     message with a DIFFERENT id is never skipped for having the same text: it
 *     is imported and flagged meta.possibleDuplicate when the same text in the
 *     same direction exists within 5 minutes, and counted for review (Jo, 25 Nov);
 *   - claims every imported id in the processed-messages table, so a later live
 *     delivery of the same id is a duplicate and is skipped;
 *   - only imports into conversations Will already has. In-window messages
 *     from numbers with no customer are stored in full (content, direction,
 *     time, raw message) in will_history_unmatched, so they can be imported
 *     later with importUnmatchedPending() once the contact exists. Nothing is
 *     created for them automatically.
 *   - is OFF unless WILL_HISTORY_IMPORT_ENABLED=true. Off means: no backup, no
 *     import, no Meta sync calls. The live paths are not affected either way.
 */
import type { MessageRow, Store } from './store';
import { brandForPhoneNumberId, withBrand } from './brand-context';

export const HISTORY_CHANNEL = 'history';
/** Same text, same direction, within this many seconds = flagged as a possible duplicate (still imported). */
const FINGERPRINT_SECONDS = 300;

/** Master switch (Jo, 25 Nov). Anything but the exact string "true" is off. */
export function historyImportEnabled(): boolean {
  return (process.env.WILL_HISTORY_IMPORT_ENABLED ?? '').trim().toLowerCase() === 'true';
}

/** One in-window message from a number with no Will customer, kept in full for a later import. */
export interface UnmatchedHistoryMessage {
  messageId: string;
  waId: string;
  phoneNumberId: string | null;
  direction: 'IN' | 'OUT';
  ts: number;
  body: string | null;
  type: string;
  raw: unknown;
}

export interface HistoryCounts {
  /** Message objects found in history threads. */
  received: number;
  inWindow: number;
  outsideWindow: number;
  added: number;
  alreadyExisting: number;
  /** In window, but the contact is not a Will customer: not imported, stored in full for later. */
  noCustomer: number;
  /** Of noCustomer: rows written to will_history_unmatched (new ones; repeats are ignored there). */
  savedForLater: number;
  /** Imported, but the same text in the same direction already exists within 5 minutes (different id). */
  possibleDuplicate: number;
  /** Reactions, system events and empty bodies: nothing to show in a chat. */
  skippedType: number;
  failed: number;
  /** Separate history webhooks that carry media details for placeholders (counted, not applied). */
  mediaDetails: number;
  /** Contact sync (smb_app_state_sync) entries: counted only, never applied to customers. */
  contactSync: number;
  /** In window but not processed because the time budget ran out; finished by replay. */
  deferred: number;
}

export interface HistoryChunkMeta { phase: number | null; chunkOrder: number | null; progress: number | null }

export interface HistoryResult {
  counts: HistoryCounts;
  chunks: HistoryChunkMeta[];
  /** Meta's "history sharing is turned off" error (2593109) and any other history error. */
  errors: { code: number | null; title: string | null }[];
  /** Full numbers of in-window threads with no Will customer (admin follow-up list). */
  missingContacts: string[];
  windowSet: boolean;
  window: { fromTs: number | null; toTs: number | null };
  failures: { id: string; error: string }[];
  /** True when the time budget ran out: the backup row stays unprocessed for replay. */
  partial: boolean;
}

export function emptyCounts(): HistoryCounts {
  return { received: 0, inWindow: 0, outsideWindow: 0, added: 0, alreadyExisting: 0, noCustomer: 0, skippedType: 0, failed: 0, mediaDetails: 0, contactSync: 0, deferred: 0, savedForLater: 0, possibleDuplicate: 0 };
}

export function mergeResults(a: HistoryResult, b: HistoryResult): HistoryResult {
  const counts = emptyCounts();
  for (const k of Object.keys(counts) as (keyof HistoryCounts)[]) counts[k] = a.counts[k] + b.counts[k];
  return {
    counts,
    chunks: [...a.chunks, ...b.chunks],
    errors: [...a.errors, ...b.errors],
    missingContacts: [...new Set([...a.missingContacts, ...b.missingContacts])],
    windowSet: a.windowSet && b.windowSet,
    window: b.window,
    failures: [...a.failures, ...b.failures].slice(0, 50),
    partial: a.partial || b.partial,
  };
}

/** The import window from env. Seconds since epoch. */
export function historyWindow(nowSec = Math.floor(Date.now() / 1000)): { fromTs: number | null; toTs: number } {
  const from = Number(process.env.WILL_HISTORY_IMPORT_FROM_TS || 0);
  const to = Number(process.env.WILL_HISTORY_IMPORT_TO_TS || 0);
  return {
    fromTs: Number.isFinite(from) && from > 0 ? from : null,
    toTs: Number.isFinite(to) && to > 0 ? to : nowSec,
  };
}

interface Change { field?: string; value?: Record<string, unknown> }

function changesOf(payload: unknown): Change[] {
  const out: Change[] = [];
  try {
    for (const e of ((payload as { entry?: unknown[] }).entry ?? [])) {
      for (const ch of ((e as { changes?: unknown[] }).changes ?? [])) out.push(ch as Change);
    }
  } catch { /* malformed */ }
  return out;
}

/** True when the payload carries any Coexistence sync field (history or contacts). */
export function hasHistoryFields(payload: unknown): boolean {
  return changesOf(payload).some((c) => c.field === 'history' || c.field === 'smb_app_state_sync');
}

/** First chunk meta of a payload, for the backup row. */
export function firstChunkMeta(payload: unknown): HistoryChunkMeta {
  for (const c of changesOf(payload)) {
    if (c.field !== 'history') continue;
    const h = (c.value?.history as { metadata?: { phase?: number; chunk_order?: number; progress?: number } }[] | undefined)?.[0];
    if (h?.metadata) return { phase: h.metadata.phase ?? null, chunkOrder: h.metadata.chunk_order ?? null, progress: h.metadata.progress ?? null };
  }
  return { phase: null, chunkOrder: null, progress: null };
}

type HistMsg = {
  from?: string; to?: string; id?: string; timestamp?: string | number; type?: string;
  text?: { body?: string };
  history_context?: { status?: string };
  [k: string]: unknown;
};

const CAPTIONED = ['image', 'video', 'document', 'audio', 'sticker'];

/** The text a history message shows in the chat, or null when there is nothing to show. */
export function historyBody(m: HistMsg): string | null {
  const t = m.type ?? '';
  if (t === 'text') { const b = (m.text?.body ?? '').trim(); return b || null; }
  if (t === 'reaction' || t === 'system' || t === 'revoke' || t === 'edit') return null;
  if (t === 'media_placeholder') return '📎 [Media from WhatsApp history]';
  if (CAPTIONED.includes(t)) {
    const part = m[t] as { caption?: string; filename?: string } | undefined;
    const label = t === 'document' ? '📄 [Document]' : t === 'audio' ? '🎤 [Voice note]' : t === 'sticker' ? '[Sticker]' : t === 'video' ? '🎬 [Video]' : '🖼️ [Photo]';
    const extra = (part?.caption || part?.filename || '').trim();
    return extra ? `${label} ${extra}` : label;
  }
  if (t === 'location') return '📍 [Location]';
  if (t === 'contacts') return '👤 [Contact card]';
  return t ? `[${t}]` : null;
}

const digits = (s: string | undefined) => (s ?? '').replace(/\D/g, '');

/**
 * Import the history in one webhook payload. Pure with respect to everything
 * but the store calls listed in the module comment. Never throws.
 */
export async function importHistoryPayload(
  payload: unknown,
  opts: { store: Store; ourPhoneId?: string; nowSec?: number; deadlineMs?: number },
): Promise<HistoryResult> {
  const { store } = opts;
  const win = historyWindow(opts.nowSec);
  const res: HistoryResult = {
    counts: emptyCounts(), chunks: [], errors: [], missingContacts: [],
    windowSet: win.fromTs !== null, window: { fromTs: win.fromTs, toTs: win.toTs }, failures: [], partial: false,
  };

  const unmatched: UnmatchedHistoryMessage[] = [];
  for (const ch of changesOf(payload)) {
    if (ch.field === 'smb_app_state_sync') {
      const list = (ch.value?.state_sync as unknown[] | undefined) ?? [];
      res.counts.contactSync += Array.isArray(list) ? list.length : 1;
      continue;
    }
    if (ch.field !== 'history') continue;
    const value = ch.value ?? {};
    const meta = value.metadata as { phone_number_id?: string; display_phone_number?: string } | undefined;
    const brand = brandForPhoneNumberId(meta?.phone_number_id, opts.ourPhoneId);
    if (brand === null) continue; // not one of our numbers
    const business = digits(meta?.display_phone_number);

    // Media details for earlier placeholders: counted only (the raw payload is in the backup).
    if (Array.isArray(value.messages)) { res.counts.mediaDetails += (value.messages as unknown[]).length; }

    for (const h of ((value.history as unknown[] | undefined) ?? [])) {
      const hist = h as { metadata?: { phase?: number; chunk_order?: number; progress?: number }; threads?: unknown[]; errors?: { code?: number; title?: string }[] };
      if (hist.metadata) res.chunks.push({ phase: hist.metadata.phase ?? null, chunkOrder: hist.metadata.chunk_order ?? null, progress: hist.metadata.progress ?? null });
      for (const err of hist.errors ?? []) res.errors.push({ code: err.code ?? null, title: err.title ?? null });

      for (const t of hist.threads ?? []) {
        const thread = t as { id?: string; messages?: HistMsg[] };
        const contact = digits(thread.id);
        const msgs = [...(thread.messages ?? [])].sort((a, b) => Number(a.timestamp ?? 0) - Number(b.timestamp ?? 0));
        let customer: Awaited<ReturnType<Store['getCustomerByWaId']>> | undefined;
        let existing: MessageRow[] | null = null;

        for (const m of msgs) {
          res.counts.received++;
          const ts = Number(m.timestamp ?? 0);
          if (!win.fromTs || !ts || ts < win.fromTs || ts > win.toTs) { res.counts.outsideWindow++; continue; }
          res.counts.inWindow++;
          if (opts.deadlineMs && Date.now() > opts.deadlineMs) { res.counts.deferred++; res.partial = true; continue; }
          const id = String(m.id ?? '');
          try {
            const body = historyBody(m);
            if (!id || !body) { res.counts.skippedType++; continue; }

            // Who sent it. The thread id is the customer; the business number is ours.
            const fromDigits = digits(m.from);
            const direction: 'IN' | 'OUT' = fromDigits && fromDigits === contact ? 'IN'
              : (business && fromDigits === business) ? 'OUT'
              : (fromDigits && fromDigits !== contact ? 'OUT' : 'IN');

            if (customer === undefined) {
              // Exact WhatsApp id first (what live messages store), then the
              // store's own phone-format matcher (+61 / spaces / leading 0).
              customer = await withBrand(brand, async () => (await store.getCustomerByWaId(contact))
                ?? (store.findCustomerByPhone ? await store.findCustomerByPhone(contact) : null)).catch(() => null);
            }
            if (!customer) {
              res.counts.noCustomer++;
              if (contact && !res.missingContacts.includes(contact)) res.missingContacts.push(contact);
              unmatched.push({ messageId: id, waId: contact, phoneNumberId: meta?.phone_number_id ?? null, direction, ts, body, type: m.type ?? '', raw: m });
              continue;
            }
            if (existing === null) existing = await store.listMessages(customer.id).catch(() => []);
            const outcome = await insertHistoryMessage(store, customer.id, { messageId: id, direction, ts, body, status: m.history_context?.status ?? null }, existing);
            if (outcome === 'existing') res.counts.alreadyExisting++;
            else { res.counts.added++; if (outcome === 'added_flagged') res.counts.possibleDuplicate++; }
          } catch (e) {
            res.counts.failed++;
            if (res.failures.length < 50) res.failures.push({ id, error: (e instanceof Error ? e.message : String(e)).slice(0, 200) });
          }
        }
      }
    }
  }
  if (unmatched.length) {
    try {
      if (!store.saveHistoryUnmatched) throw new Error('store cannot keep unmatched history');
      res.counts.savedForLater += await store.saveHistoryUnmatched(unmatched);
    } catch (e) {
      res.counts.failed += unmatched.length;
      res.failures.push({ id: 'unmatched', error: (e instanceof Error ? e.message : String(e)).slice(0, 200) });
    }
  }
  return res;
}

/**
 * Insert one history message into an existing conversation.
 * 'existing'      = its WhatsApp id is already known (stored or processed live): nothing written.
 * 'added'         = written.
 * 'added_flagged' = written, and flagged: same text and direction within 5 minutes under another id.
 */
export async function insertHistoryMessage(
  store: Store,
  customerId: string,
  item: { messageId: string; direction: 'IN' | 'OUT'; ts: number; body: string; status?: string | null },
  existing: MessageRow[],
): Promise<'existing' | 'added' | 'added_flagged'> {
  const byId = store.findMessageByProviderId ? await store.findMessageByProviderId(item.messageId) : null;
  const seenLive = store.isProcessedInbound ? await store.isProcessedInbound(item.messageId) : false;
  if (byId || seenLive) return 'existing';
  const tsMs = item.ts * 1000;
  const twin = existing.some((r) => r.direction === item.direction
    && r.body.trim() === item.body.trim()
    && r.meta?.providerId !== item.messageId
    && Math.abs(new Date(r.createdAt).getTime() - tsMs) <= FINGERPRINT_SECONDS * 1000);
  if (!store.insertHistoricMessage) throw new Error('store cannot insert historic messages');
  const row = await store.insertHistoricMessage({
    customerId,
    direction: item.direction,
    author: item.direction === 'IN' ? 'CUSTOMER' : 'HUMAN',
    status: 'SENT',
    body: item.body,
    meta: { providerId: item.messageId, channel: HISTORY_CHANNEL, historyStatus: item.status ?? null, importedAt: new Date().toISOString(), ...(twin ? { possibleDuplicate: true } : {}) } as MessageRow['meta'],
  }, new Date(tsMs).toISOString());
  existing.push(row);
  // Any later live delivery of the same id is now a duplicate.
  await store.claimInbound(item.messageId).catch(() => true);
  return twin ? 'added_flagged' : 'added';
}

/**
 * Import stored messages from numbers that had no Will customer, for contacts
 * that now exist (Jo added them, or they wrote again). Same rules: id-only
 * de-duplication, original times, no automation, no customer changes. Rows for
 * contacts that still do not exist stay pending. Time-bounded.
 */
export async function importUnmatchedPending(
  store: Store,
  opts: { ourPhoneId?: string; deadlineMs?: number } = {},
): Promise<{ pending: number; imported: number; alreadyExisting: number; possibleDuplicate: number; stillNoCustomer: number; failed: number; partial: boolean }> {
  const out = { pending: 0, imported: 0, alreadyExisting: 0, possibleDuplicate: 0, stillNoCustomer: 0, failed: 0, partial: false };
  if (!store.listHistoryUnmatched || !store.markHistoryUnmatchedImported) return out;
  const rows = await store.listHistoryUnmatched({ pendingOnly: true });
  out.pending = rows.length;
  const byContact = new Map<string, typeof rows>();
  for (const r of rows) byContact.set(r.waId, [...(byContact.get(r.waId) ?? []), r]);
  for (const [waId, list] of byContact) {
    if (opts.deadlineMs && Date.now() > opts.deadlineMs) { out.partial = true; break; }
    const brand = brandForPhoneNumberId(list[0].phoneNumberId ?? undefined, opts.ourPhoneId) ?? 'wht';
    const customer = await withBrand(brand, async () => (await store.getCustomerByWaId(waId))
      ?? (store.findCustomerByPhone ? await store.findCustomerByPhone(waId) : null)).catch(() => null);
    if (!customer) { out.stillNoCustomer += list.length; continue; }
    const existing = await store.listMessages(customer.id).catch(() => [] as MessageRow[]);
    const done: string[] = [];
    for (const r of [...list].sort((a, b) => a.ts - b.ts)) {
      try {
        if (!r.body) { done.push(r.messageId); continue; }
        const outcome = await insertHistoryMessage(store, customer.id, { messageId: r.messageId, direction: r.direction, ts: r.ts, body: r.body }, existing);
        if (outcome === 'existing') out.alreadyExisting++;
        else { out.imported++; if (outcome === 'added_flagged') out.possibleDuplicate++; }
        done.push(r.messageId);
      } catch { out.failed++; }
    }
    if (done.length) await store.markHistoryUnmatchedImported(done);
  }
  return out;
}

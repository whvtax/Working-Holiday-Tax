// WhatsApp Coexistence history: admin controls (25 Nov 2026).
//
// GET  -> report: backup rows, counts per chunk and totals, history errors
//         (e.g. 2593109 "history sharing turned off"), in-window contacts that
//         are not Will customers, the configured window and the connection ids.
// POST { action }
//   'sync_contacts' -> POST /{phone_number_id}/smb_app_data  sync_type=smb_app_state_sync
//   'sync_history'  -> POST /{phone_number_id}/smb_app_data  sync_type=history
//        Meta: each can be done ONCE per onboarding, within 24 hours of it.
//        Nothing here runs by itself: only an admin click calls Meta.
//   'replay'        -> re-run the import from the raw backup rows that are not
//        marked processed (e.g. the window was not set yet, or a chunk ran out
//        of time). Safe to repeat: every message is de-duplicated by its id.
//   'import_unmatched' -> import stored messages from numbers that had no Will
//        customer, for those that exist now. Others stay stored.
// GET ?export=unmatched -> every stored message from such numbers, in full.
// All POST actions refuse while WILL_HISTORY_IMPORT_ENABLED is not "true".
// Admin session only. No token or secret is ever returned.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { resolveWaCreds } from '@/lib/will/channel';
import { getStore } from '@/lib/will/store';
import { importHistoryPayload, historyWindow, emptyCounts, mergeResults, historyImportEnabled, importUnmatchedPending, type HistoryResult } from '@/lib/will/history-import';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const GRAPH = process.env.WHATSAPP_GRAPH_VERSION || 'v23.0';
const SYNC_KEY = (t: string) => `wa_history_sync_requested_${t}`;

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  if (new URL(req.url).searchParams.get('export') === 'unmatched') {
    const rows = store.listHistoryUnmatched ? await store.listHistoryUnmatched() : [];
    return NextResponse.json({ ok: true, count: rows.length, messages: rows });
  }
  const { phoneId, source } = await resolveWaCreds();
  const win = historyWindow();
  let rows: Awaited<ReturnType<NonNullable<typeof store.listHistoryInbox>>> = [];
  let inboxError: string | null = null;
  try { rows = store.listHistoryInbox ? await store.listHistoryInbox() : []; }
  catch (e) { inboxError = (e instanceof Error ? e.message : String(e)).slice(0, 200); }

  const totals = emptyCounts();
  const missing = new Set<string>();
  const errors: unknown[] = [];
  for (const r of rows) {
    const res = r.result as Partial<HistoryResult> | null;
    if (!res?.counts) continue;
    for (const k of Object.keys(totals) as (keyof typeof totals)[]) totals[k] += Number(res.counts[k] ?? 0);
    for (const c of res.missingContacts ?? []) missing.add(c);
    for (const e of res.errors ?? []) errors.push(e);
  }
  let unmatched: { total: number; pending: number; contacts: { waId: string; messages: number; pending: number; first: number; last: number; preview: string | null }[] } | null = null;
  try {
    const all = store.listHistoryUnmatched ? await store.listHistoryUnmatched() : [];
    const by = new Map<string, typeof all>();
    for (const r of all) by.set(r.waId, [...(by.get(r.waId) ?? []), r]);
    unmatched = {
      total: all.length, pending: all.filter((r) => !r.importedAt).length,
      contacts: [...by.entries()].map(([waId, list]) => ({
        waId, messages: list.length, pending: list.filter((r) => !r.importedAt).length,
        first: Math.min(...list.map((r) => r.ts)), last: Math.max(...list.map((r) => r.ts)),
        preview: list.find((r) => r.direction === 'IN' && r.body)?.body?.slice(0, 80) ?? null,
      })),
    };
  } catch { /* table not migrated yet: shown as null */ }
  const requested = {
    contacts: await store.getSetting(SYNC_KEY('smb_app_state_sync')).catch(() => null),
    history: await store.getSetting(SYNC_KEY('history')).catch(() => null),
  };
  return NextResponse.json({
    ok: true,
    enabled: historyImportEnabled(),
    unmatched,
    connection: { phoneNumberId: phoneId ?? null, credsSource: source },
    window: { fromTs: win.fromTs, toTs: win.toTs, fromIso: win.fromTs ? new Date(win.fromTs * 1000).toISOString() : null, set: win.fromTs !== null },
    syncRequested: requested,
    inbox: {
      error: inboxError,
      rows: rows.length,
      unprocessed: rows.filter((r) => !r.processedAt).length,
      lastProgress: rows.length ? rows[rows.length - 1].progress : null,
      chunks: rows.map((r) => ({ id: r.id, receivedAt: r.receivedAt, field: r.field, phase: r.phase, chunkOrder: r.chunkOrder, progress: r.progress, processedAt: r.processedAt })),
    },
    totals,
    historyErrors: errors,
    missingContacts: [...missing],
  });
}

export async function POST(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  let body: { action?: string; force?: boolean };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 }); }
  const store = getStore();
  if (!historyImportEnabled()) {
    return NextResponse.json({ ok: false, error: 'History import is switched off. Set WILL_HISTORY_IMPORT_ENABLED=true in Vercel and redeploy.' }, { status: 409 });
  }

  if (body.action === 'import_unmatched') {
    const { phoneId } = await resolveWaCreds();
    const r = await importUnmatchedPending(store, { ourPhoneId: phoneId, deadlineMs: Date.now() + 45_000 });
    await store.audit('channel', 'history_unmatched_import', r).catch(() => {});
    return NextResponse.json({ ok: true, ...r, note: r.partial ? 'Time budget reached: run it again to continue.' : 'Done. Contacts that still have no Will customer stay stored.' });
  }

  if (body.action === 'sync_contacts' || body.action === 'sync_history') {
    const syncType = body.action === 'sync_history' ? 'history' : 'smb_app_state_sync';
    const { token, phoneId } = await resolveWaCreds();
    if (!token || !phoneId) return NextResponse.json({ ok: false, error: 'No access token or phone number id is configured yet. Connect the number first.' }, { status: 400 });
    if (!/^\d{5,25}$/.test(phoneId)) return NextResponse.json({ ok: false, error: 'phone number id must be digits only' }, { status: 400 });
    const already = await store.getSetting(SYNC_KEY(syncType)).catch(() => null);
    if (already && !body.force) {
      return NextResponse.json({ ok: false, error: `Already requested at ${String((already as { at?: string }).at ?? already)}. Meta allows this once per onboarding; send force:true only if you are sure.` }, { status: 409 });
    }
    if (syncType === 'history') {
      // Not a blocker (the backup keeps everything for replay), but say it.
      if (!historyWindow().fromTs) await store.audit('channel', 'history_sync_without_window', {}).catch(() => {});
    }
    const res = await fetch(`https://graph.facebook.com/${GRAPH}/${phoneId}/smb_app_data`, {
      method: 'POST', cache: 'no-store',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', sync_type: syncType }),
    });
    const data = await res.json().catch(() => ({} as Record<string, unknown>));
    const metaError = (data as { error?: { message?: string; code?: number } }).error;
    await store.audit('channel', 'history_sync_requested', { syncType, ok: res.ok, status: res.status, metaError: metaError ? { code: metaError.code ?? null, message: (metaError.message ?? '').slice(0, 200) } : null }).catch(() => {});
    if (!res.ok) return NextResponse.json({ ok: false, error: `Meta rejected the ${syncType} request: ${metaError?.message ?? res.status}` }, { status: 400 });
    await store.setSetting(SYNC_KEY(syncType), { at: new Date().toISOString(), requestId: (data as { request_id?: string }).request_id ?? null }).catch(() => {});
    return NextResponse.json({ ok: true, syncType, requestId: (data as { request_id?: string }).request_id ?? null,
      note: 'Meta accepted the request. This does not confirm the business shared its history; watch the report for chunks and progress 100.' });
  }

  if (body.action === 'replay') {
    if (!store.listHistoryInbox || !store.markHistoryInbox) return NextResponse.json({ ok: false, error: 'history backup is not available in this store' }, { status: 400 });
    if (!historyWindow().fromTs) return NextResponse.json({ ok: false, error: 'Set WILL_HISTORY_IMPORT_FROM_TS (the disconnection time) in Vercel first.' }, { status: 400 });
    const { phoneId } = await resolveWaCreds();
    const rows = await store.listHistoryInbox({ unprocessedOnly: true, withPayload: true });
    const deadline = Date.now() + 45_000;
    let total: HistoryResult | null = null;
    let processed = 0;
    for (const r of rows) {
      if (Date.now() > deadline) break;
      const result = await importHistoryPayload(r.payload, { store, ourPhoneId: phoneId, deadlineMs: deadline });
      total = total ? mergeResults(total, result) : result;
      if (!result.partial) { await store.markHistoryInbox(r.id, result); processed++; }
    }
    const remaining = rows.length - processed;
    await store.audit('channel', 'history_replay', { rows: rows.length, processed, remaining, counts: total?.counts ?? null }).catch(() => {});
    return NextResponse.json({ ok: true, rows: rows.length, processed, remaining, counts: total?.counts ?? emptyCounts(),
      missingContacts: total?.missingContacts ?? [], note: remaining ? 'Time budget reached: run replay again to continue.' : 'All backup rows processed.' });
  }

  return NextResponse.json({ ok: false, error: 'unknown action' }, { status: 400 });
}

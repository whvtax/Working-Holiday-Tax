'use client';
// WhatsApp Coexistence history import controls (25 Nov 2026). Nothing here runs
// by itself: Meta is only called when the owner clicks, and each sync can be
// requested once per onboarding, within 24 hours of it (Meta docs).
import { useCallback, useEffect, useState } from 'react';

type Report = {
  ok: boolean; error?: string; enabled?: boolean;
  unmatched?: { total: number; pending: number; contacts: { waId: string; messages: number; pending: number; preview: string | null }[] } | null;
  connection?: { phoneNumberId: string | null; credsSource: string };
  window?: { fromIso: string | null; set: boolean };
  syncRequested?: { contacts: unknown; history: unknown };
  inbox?: { error: string | null; rows: number; unprocessed: number; lastProgress: number | null };
  totals?: Record<string, number>;
  historyErrors?: { code: number | null; title: string | null }[];
  missingContacts?: string[];
};

export default function HistoryPanel() {
  const [report, setReport] = useState<Report | null>(null);
  const [msg, setMsg] = useState<string>('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    try { const r = await fetch('/api/will/whatsapp/history', { cache: 'no-store' }); setReport(await r.json()); }
    catch (e) { setMsg((e as Error).message); }
  }, []);
  useEffect(() => { const t = setTimeout(load, 0); return () => clearTimeout(t); }, [load]);

  const act = useCallback(async (action: string, confirmText?: string) => {
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(true); setMsg('');
    try {
      const r = await fetch('/api/will/whatsapp/history', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action }) });
      const d = await r.json();
      setMsg(d.ok ? `Done: ${d.note ?? action}` : `Not done: ${d.error ?? r.status}`);
    } catch (e) { setMsg((e as Error).message); }
    setBusy(false); load();
  }, [load]);

  const t = report?.totals ?? {};
  const btn = { background: '#0E5C42', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 14px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', marginRight: 8, marginBottom: 8 } as const;

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, marginTop: 16 }}>
      <h2 style={{ fontSize: 16, margin: '0 0 8px' }}>Chat history import (after connecting)</h2>
      <p style={{ color: '#5c6572', fontSize: 13, marginTop: 0 }}>
        Imports only messages inside the window (from {report?.window?.fromIso ?? 'NOT SET: set WILL_HISTORY_IMPORT_FROM_TS in Vercel'}) into existing chats.
        No replies, tasks, reminders or stage changes. Meta allows each request once, within 24 hours of connecting.
      </p>
      <button style={btn} disabled={busy} onClick={() => act('sync_contacts', 'Request the contact sync from Meta now? This can be done once.')}>1. Sync contacts</button>
      <button style={btn} disabled={busy} onClick={() => act('sync_history', 'Request the chat history from Meta now? This can be done ONCE per connection.')}>2. Request chat history</button>
      <button style={{ ...btn, background: '#1f2328' }} disabled={busy} onClick={() => act('replay')}>Re-run import from backup</button>
      <button style={{ ...btn, background: '#1f2328' }} disabled={busy} onClick={() => act('import_unmatched')}>Import stored messages for contacts that now exist</button>
      <a href="/api/will/whatsapp/history?export=unmatched" target="_blank" rel="noreferrer" style={{ fontSize: 13, marginLeft: 4 }}>Download stored messages (JSON)</a>
      <button style={{ ...btn, background: '#fff', color: '#1f2328', border: '1px solid #d1d5db' }} disabled={busy} onClick={load}>Refresh report</button>
      {msg && <p style={{ fontSize: 13, color: msg.startsWith('Done') ? '#0a7d3c' : '#c0202a' }}>{msg}</p>}
      {report && (
        <div style={{ fontSize: 13, color: '#1f2328', lineHeight: 1.6 }}>
          <div style={{ fontWeight: 700, color: report.enabled ? '#0a7d3c' : '#c0202a' }}>History import is {report.enabled ? 'ON' : 'OFF'} (WILL_HISTORY_IMPORT_ENABLED)</div>
          <div>Connected phone number id: {report.connection?.phoneNumberId ?? 'none'} ({report.connection?.credsSource})</div>
          <div>Backup chunks received: {report.inbox?.rows ?? 0} (waiting to process: {report.inbox?.unprocessed ?? 0}, last progress: {report.inbox?.lastProgress ?? '-'}%){report.inbox?.error ? ` · backup table error: ${report.inbox.error}` : ''}</div>
          <div>Messages received: {t.received ?? 0} · in window: {t.inWindow ?? 0} · added: {t.added ?? 0} (flagged same text: {t.possibleDuplicate ?? 0}) · already existed: {t.alreadyExisting ?? 0} · failed: {t.failed ?? 0} · not a Will contact: {t.noCustomer ?? 0} (stored: {t.savedForLater ?? 0}) · deferred: {t.deferred ?? 0}</div>
          {!!report.historyErrors?.length && <div style={{ color: '#c0202a' }}>Meta history errors: {report.historyErrors.map((e) => `${e.code ?? ''} ${e.title ?? ''}`).join('; ')}</div>}
          {report.unmatched === null && <div style={{ color: '#c0202a' }}>Stored-messages table not reachable (run migration 058).</div>}
          {!!report.unmatched?.contacts.length && <div>Messages from numbers with no Will contact, stored in full ({report.unmatched.pending} not imported yet):
            <ul style={{ margin: '4px 0 0 18px' }}>{report.unmatched.contacts.map((c) => <li key={c.waId}>{c.waId}: {c.messages} messages ({c.pending} pending){c.preview ? `, “${c.preview}”` : ''}</li>)}</ul></div>}
        </div>
      )}
    </div>
  );
}

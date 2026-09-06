'use client';
// "Link to chat" on an unmatched-questionnaire task (audit, 5 Sep).
//
// The task used to tell the owner to "find the customer in the CRM and mark
// their form complete by hand", and the CRM had no control that did that:
// moving the stage badge only moved the badge (form_complete stayed false, the
// reminders kept going, no confirmation went out). This card is that control.
// It searches every customer (the same /api/will/search the chat list uses),
// prefilled with the number the form carried, and on pick calls
// mark_form_received, which runs the exact path an automatic phone match runs.
// Nothing new is said to the customer.
import { useEffect, useState } from 'react';
import type { CustomerRow, TaskRow } from '@/lib/will/store';
import { STATE_LABELS } from '@/lib/will/state-machine';
import { parseUnmatchedFormTask } from '@/lib/will/form-link-task';

interface Props {
  task: TaskRow;
  /** Formats a WhatsApp id the way the rest of the dashboard does. */
  phoneOf: (waId: string) => string;
  act: (body: Record<string, unknown>) => Promise<{ ok?: boolean; error?: string; outcome?: string }>;
  say: (msg: string) => void;
  refresh: () => void;
}

/** What the owner sees after linking, per outcome of applyFormReceived. */
export function linkOutcomeToast(outcome: string | undefined, name: string): string {
  if (outcome === 'queued') return `Linked to ${name}. Form marked complete, reminders stopped, confirmation on its way ✓`;
  if (outcome === 'remembered') return `Linked to ${name}. Form remembered; the confirmation goes when they pay ✓`;
  if (outcome === 'ignored') return `Linked to ${name}. They are already past the questionnaire stage, so nothing else changed`;
  return `Linked to ${name} ✓`;
}

export default function LinkFormTask({ task, phoneOf, act, say, refresh }: Props) {
  const submitted = parseUnmatchedFormTask(task.context);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(submitted?.waNumber ?? '');
  const [results, setResults] = useState<CustomerRow[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [linking, setLinking] = useState(false);

  useEffect(() => {
    if (!open) return;
    const query = q.trim();
    if (query.length < 2) { setResults(null); return; }
    let cancelled = false;
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const res = await fetch('/api/will/search?q=' + encodeURIComponent(query));
        const d = await res.json();
        if (!cancelled) setResults(Array.isArray(d.customers) ? d.customers : []);
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setBusy(false);
      }
    }, 250);
    return () => { cancelled = true; clearTimeout(t); };
  }, [open, q]);

  if (!submitted) return null;

  const pick = async (c: CustomerRow) => {
    if (linking) return;
    setLinking(true);
    const name = c.name ?? phoneOf(c.waId);
    const r = await act({ action: 'mark_form_received', customerId: c.id, taskId: task.id });
    setLinking(false);
    say(r?.ok ? linkOutcomeToast(r.outcome, name) : `❌ Not linked: ${r?.error ?? 'something went wrong'}`);
    refresh();
  };

  if (!open) {
    return <button className="btn take" onClick={() => setOpen(true)}>Link to chat</button>;
  }
  return (
    <div style={{ width: '100%', marginTop: 8 }}>
      <div className="mlabel" style={{ margin: '0 0 5px' }}>Pick the chat this questionnaire belongs to</div>
      <input className="edit" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Number or name" autoFocus
        style={{ width: '100%', boxSizing: 'border-box' }} />
      <div style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {busy && <span style={{ fontSize: 12, opacity: 0.7 }}>Searching…</span>}
        {!busy && results && results.length === 0 && <span style={{ fontSize: 12, opacity: 0.7 }}>No chat matches that. Try the last few digits, or their name.</span>}
        {results?.slice(0, 8).map((c) => (
          <button key={c.id} className="btn ghost" disabled={linking} onClick={() => pick(c)}
            style={{ justifyContent: 'space-between', display: 'flex', width: '100%' }}>
            <span>{c.name ? `${c.name} · ` : ''}{phoneOf(c.waId)}</span>
            <span style={{ fontSize: 11, opacity: 0.7 }}>{STATE_LABELS[c.state] ?? c.state}</span>
          </button>
        ))}
      </div>
      <button className="btn quiet sm" style={{ marginTop: 6 }} onClick={() => setOpen(false)}>Cancel</button>
    </div>
  );
}

// "What Will did not handle by itself" report (Jo, 3 Nov).
//
// The full export lists every conversation. This one lists only the moments
// that need a look: a customer message nobody answered, a draft that was
// blocked / discarded / never sent / failed, and every handoff to the team,
// each with the customer's words, what Will proposed and why it was held.
// The route remembers when it was last downloaded, so each report starts
// where the previous one ended.
import { STATE_LABELS } from './state-machine';
import { redactSensitive } from './digest';

export interface AttMessage {
  customerId: string; createdAt: string; direction: string; author?: string; status: string; body?: string | null;
  meta?: { review?: string; system?: boolean; waTemplate?: { name?: string } } | null;
}
export interface AttCustomer { id: string; name?: string | null; waId?: string | null; state: string; paid?: boolean; lang?: string | null; income?: string | null; missingDocs?: string[] | null }
export interface AttTask { customerId?: string | null; createdAt: string; severity?: string; status?: string; reason?: string; context?: string | null; suggestedReply?: string | null }
export interface AttAudit { at: string; action: string; detail: unknown }

const HELD: Record<string, string> = {
  BLOCKED: 'blocked by the safety check',
  DISCARDED: 'discarded, never sent',
  FAILED: 'send failed',
  PENDING_APPROVAL: 'draft, never sent',
};
const LABELS = STATE_LABELS as Record<string, string>;
const stamp = (iso: string) => new Date(iso).toISOString().replace('T', ' ').slice(0, 16);
const indent = (s: string, n: number) => String(s ?? '').split('\n').map((l) => ' '.repeat(n) + l).join('\n');

export type AttCategory = 'UNANSWERED' | 'BLOCKED' | 'DISCARDED' | 'FAILED' | 'HANDOFF' | 'HELD_FOR_TEAM';
const CATEGORY_OF: Record<string, AttCategory> = { BLOCKED: 'BLOCKED', DISCARDED: 'DISCARDED', FAILED: 'FAILED', PENDING_APPROVAL: 'HELD_FOR_TEAM' };
const noDash = (s: string) => s.replace(/[\u2014\u2013\u2015]+/g, '-');
/** A reason with no names or numbers: cut at the first colon, digits and quotes removed, short. */
export function reasonKey(r: string | null | undefined): string {
  const base = String(r ?? '').split(/:| - /)[0].replace(/"[^"]*"/g, '').replace(/\d+/g, '#').replace(/\s+/g, ' ').trim().slice(0, 70);
  return noDash(redactSensitive(base)) || 'none';
}
interface AuditNote { at: number; kind: 'decision' | 'second_check'; violations: string[]; verdict?: string; note?: string; library: { intent: string; score: number | null }[]; action?: string }
const tally = (m: Map<string, number>, k: string) => m.set(k, (m.get(k) ?? 0) + 1);
const top = (m: Map<string, number>, n = 8) => [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n).map(([k, v]) => `${k}=${v}`).join(', ') || 'none';

export function buildAttentionReport(args: {
  customers: AttCustomer[]; messages: AttMessage[]; tasks: AttTask[]; audit: AttAudit[]; since: number; now?: number;
}): { text: string; items: number; customers: number } {
  const { customers, messages, tasks, audit, since } = args;
  const now = args.now ?? Date.now();
  const byCust = new Map<string, AttMessage[]>();
  for (const m of messages) { const a = byCust.get(m.customerId); if (a) a.push(m); else byCust.set(m.customerId, [m]); }
  const taskBy = new Map<string, AttTask[]>();
  for (const t of tasks) { if (!t.customerId || new Date(t.createdAt).getTime() < since) continue; const a = taskBy.get(t.customerId) ?? []; a.push(t); taskBy.set(t.customerId, a); }
  const guardBy = new Map<string, { at: string; text: string }[]>();
  for (const a of audit) {
    if (new Date(a.at).getTime() < since) continue;
    const d = (a.detail ?? {}) as Record<string, unknown>;
    const cid = typeof d.customerId === 'string' ? d.customerId : '';
    if (!cid) continue;
    const g = d.guard as { blocked?: boolean; violations?: string[] } | undefined;
    const reason = typeof d.reason === 'string' ? d.reason : '';
    if (!(g?.blocked) && !/defer|held|blocked|silent|not_sent|skipped/i.test(a.action) && !reason) continue;
    const bits = [a.action];
    if (g?.blocked) bits.push(`guard: ${(g.violations ?? []).join(', ')}`);
    if (reason) bits.push(`reason: ${reason.slice(0, 200)}`);
    const arr = guardBy.get(cid) ?? []; arr.push({ at: a.at, text: bits.join(' · ') }); guardBy.set(cid, arr);
  }

  // Machine-readable audit facts per customer: the guard codes, the second check verdict and the
  // Library entries retrieved (with scores when the decision log recorded them).
  const noteBy = new Map<string, AuditNote[]>();
  for (const a of audit) {
    const d = (a.detail ?? {}) as Record<string, unknown>;
    const cid = typeof d.customerId === 'string' ? d.customerId : '';
    if (!cid || (a.action !== 'decision' && a.action !== 'second_check')) continue;
    const g = d.guard as { violations?: string[] } | undefined;
    const used = Array.isArray(d.knowledgeUsed) ? (d.knowledgeUsed as unknown[]).map(String) : [];
    const sc = (d.knowledgeScores ?? {}) as Record<string, number>;
    const n: AuditNote = {
      at: new Date(a.at).getTime(), kind: a.action as AuditNote['kind'], violations: g?.violations ?? [],
      verdict: typeof d.verdict === 'string' ? d.verdict : undefined, note: typeof d.note === 'string' ? noDash(redactSensitive(d.note)).slice(0, 200) : undefined,
      library: used.map((intent) => ({ intent, score: typeof sc[intent] === 'number' ? Math.round(sc[intent] * 100) / 100 : null })),
      action: typeof d.action === 'string' ? d.action : undefined,
    };
    const arr = noteBy.get(cid) ?? []; arr.push(n); noteBy.set(cid, arr);
  }
  const notesNear = (cid: string, at: number) => {
    const arr = (noteBy.get(cid) ?? []).filter((n) => n.at <= at + 120000 && n.at >= at - 6 * 3600000);
    const dec = arr.filter((n) => n.kind === 'decision').sort((a, b) => b.at - a.at)[0];
    const sec = arr.filter((n) => n.kind === 'second_check').sort((a, b) => b.at - a.at)[0];
    return { dec, sec };
  };

  const out: string[] = [];
  const byCat = new Map<string, number>(); const reasons = new Map<string, number>(); const guards = new Map<string, number>();
  const secondChecks = new Map<string, number>(); const langs = new Map<string, number>(); const stages = new Map<string, number>();
  const libHits = new Map<string, number>(); const waits: number[] = []; let paperworkOpen = 0; let paperworkDone = 0; let noLibrary = 0;
  let items = 0; let custCount = 0; let custIdx = 0;
  for (const c of customers) {
    const msgs = (byCust.get(c.id) ?? []).slice().sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
    const block: string[] = [];
    custIdx++;
    const ref = `c${custIdx}`;
    const docsOpen = c.missingDocs ? c.missingDocs.length : null;
    const lastSentAfter = (afterIso: string) => msgs.find((x) => x.direction !== 'IN' && x.status === 'SENT' && String(x.createdAt) > afterIso);
    const waitMin = (fromIso: string) => {
      const end = lastSentAfter(fromIso);
      return Math.max(0, Math.round(((end ? new Date(end.createdAt).getTime() : now) - new Date(fromIso).getTime()) / 60000));
    };
    const emit = (category: AttCategory, at: string, extra: { reason?: string | null; waitFrom?: string | null; heldStatus?: string }) => {
      const near = notesNear(c.id, new Date(at).getTime());
      const guard = near.dec?.violations ?? [];
      const wait = extra.waitFrom ? waitMin(extra.waitFrom) : null;
      const rk = reasonKey(extra.reason);
      const rec = {
        n: items + 1, category, customer: ref, at: new Date(at).toISOString().slice(0, 16) + 'Z', stage: c.state, paid: !!c.paid,
        income: c.income ?? null, lang: c.lang ?? null, wait_minutes: wait, paperwork_complete: docsOpen === null ? null : docsOpen === 0,
        missing_docs: docsOpen, guard_codes: guard, second_check: near.sec?.verdict ?? null, second_check_note: near.sec?.note ?? null,
        decision: near.dec?.action ?? null, library_retrieved: near.dec?.library ?? [], reason_key: rk,
      };
      block.push('  ITEM ' + noDash(JSON.stringify(rec)));
      tally(byCat, category); if (rk !== 'none') tally(reasons, `${category}: ${rk}`);
      for (const g of guard) tally(guards, g);
      tally(secondChecks, rec.second_check ?? 'none');
      tally(langs, c.lang ?? 'unknown'); tally(stages, LABELS[c.state] ?? c.state);
      if (wait !== null) waits.push(wait);
      if (docsOpen !== null) { if (docsOpen === 0) paperworkDone++; else paperworkOpen++; }
      if (near.dec) { if (near.dec.library.length) for (const l of near.dec.library) tally(libHits, l.intent); else noLibrary++; }
    };
    // 1. Customer messages that got no reply that was actually sent.
    let lastSentOut = -1;
    msgs.forEach((m, i) => { if (m.direction !== 'IN' && m.status === 'SENT') lastSentOut = i; });
    const isReactionOnly = (b: unknown) => /reacted to your message|removed their reaction/i.test(String(b ?? ''));
    const unanswered = msgs.filter((m, i) => m.direction === 'IN' && i > lastSentOut && new Date(m.createdAt).getTime() >= since && !isReactionOnly(m.body));
    if (unanswered.length) {
      emit('UNANSWERED', unanswered[0].createdAt, { reason: 'no reply sent', waitFrom: unanswered[0].createdAt });
      block.push('  UNANSWERED customer messages (nothing was sent back):');
      for (const m of unanswered.slice(-5)) block.push(`    [${stamp(m.createdAt)}] ${String(m.body ?? '[attachment]').slice(0, 400).replace(/\n/g, ' ')}`);
      items++;
    }
    // 2. Will's lines that never reached the customer, with the customer's message before them.
    msgs.forEach((m, i) => {
      if (m.direction === 'IN' || !HELD[m.status] || new Date(m.createdAt).getTime() < since) return;
      const prev = [...msgs.slice(0, i)].reverse().find((x) => x.direction === 'IN');
      emit(CATEGORY_OF[m.status] ?? 'HELD_FOR_TEAM', m.createdAt, { reason: m.meta?.review ?? HELD[m.status], waitFrom: prev?.createdAt ?? null });
      block.push(`  WILL ${HELD[m.status].toUpperCase()} [${stamp(m.createdAt)}]`);
      if (prev) block.push(`    Customer had written: ${String(prev.body ?? '[attachment]').slice(0, 400).replace(/\n/g, ' ')}`);
      block.push('    Will proposed:'); block.push(indent(String(m.body ?? '').slice(0, 1200), 6));
      if (m.meta?.review) block.push(`    Why: ${m.meta.review}`);
      if (m.meta?.waTemplate?.name) block.push(`    Template: ${m.meta.waTemplate.name}`);
      items++;
    });
    // 3. Handoffs to the team.
    for (const t of taskBy.get(c.id) ?? []) {
      const lastIn = [...msgs].reverse().find((x) => x.direction === 'IN' && String(x.createdAt) <= t.createdAt);
      emit('HANDOFF', t.createdAt, { reason: t.reason, waitFrom: lastIn?.createdAt ?? null });
      block.push(`  HANDED TO TEAM [${stamp(t.createdAt)}] ${t.severity ?? ''} ${t.status ?? ''}: ${t.reason ?? ''}`.replace(/ +/g, ' '));
      if (t.context) block.push(indent(String(t.context).slice(0, 1500), 6));
      if (t.suggestedReply) { block.push('    Draft Will wanted to send:'); block.push(indent(String(t.suggestedReply).slice(0, 1200), 6)); }
      items++;
    }
    // 4. Guard / hold reasons recorded in the decision log.
    for (const g of (guardBy.get(c.id) ?? []).slice(0, 8)) block.push(`  DECISION LOG [${stamp(g.at)}] ${g.text}`);
    if (!block.length) continue;
    custCount++;
    out.push('='.repeat(70));
    out.push([[c.name, c.waId].filter(Boolean).join(' · '), `stage: ${LABELS[c.state] ?? c.state}`, c.paid ? 'paid' : 'not paid', c.lang ? `lang: ${c.lang}` : ''].filter(Boolean).join('  ·  '));
    out.push(...block); out.push('');
  }
  const sorted = waits.slice().sort((a, b) => a - b);
  const med = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
  const summary = noDash([
    'SUMMARY (counts only, no names or numbers)',
    `items: ${items}  customers: ${custCount}`,
    `by_category: ${top(byCat, 10)}`,
    `top_reasons: ${top(reasons, 10)}`,
    `top_guard_codes: ${top(guards, 8)}`,
    `second_check: ${top(secondChecks, 6)}`,
    `library_entries_retrieved: ${top(libHits, 8)}  items_with_no_library_match: ${noLibrary}`,
    `customer_wait_minutes: median=${med} max=${sorted.length ? sorted[sorted.length - 1] : 0} over_60_min=${sorted.filter((w) => w > 60).length} of ${sorted.length}`,
    `languages: ${top(langs, 6)}`,
    `stages: ${top(stages, 8)}`,
    `paperwork: complete=${paperworkDone} incomplete=${paperworkOpen}`,
    'Each ITEM line below is JSON: category, customer ref, stage, paid, income, lang, wait_minutes, paperwork_complete, guard_codes, second_check, library_retrieved [{intent, score}], reason_key.',
    '',
  ].join('\n'));
  const head = [
    `Will attention report, ${new Date(now).toISOString().slice(0, 16).replace('T', ' ')} UTC`,
    `Covers ${stamp(new Date(since).toISOString())} UTC to now. Only what Will did not handle by itself.`,
    `${custCount} customers, ${items} items. The next report starts where this one ends.`,
    '',
    summary,
  ];
  return { text: head.concat(out).join('\n'), items, customers: custCount };
}

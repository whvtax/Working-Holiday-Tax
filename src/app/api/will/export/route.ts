// Export every conversation Will has had, as one readable transcript.
//
// Built so the file can be read by a person and fed straight back into the
// Learning tab: it is the raw material for spotting the questions customers
// actually ask and the answers worth adding to the library.
//
// Behind the CRM session, like every other Will route.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { STATE_LABELS } from '@/lib/will/state-machine';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

/** Messages that never reached the customer are marked rather than dropped: a
 *  draft that was blocked or discarded is often the most interesting line in
 *  the conversation. */
const LABELS = STATE_LABELS as Record<string, string>;
const STATUS_NOTE: Record<string, string> = {
  PENDING_APPROVAL: '  [draft, never sent]',
  BLOCKED: '  [blocked, never sent]',
  DISCARDED: '  [discarded, never sent]',
  FAILED: '  [send failed]',
};

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  const url = new URL(req.url);
  const format = url.searchParams.get('format') === 'json' ? 'json' : 'txt';
  // Jo, 1 Oct: "the last 72 hours, everything, so we can analyse Will in
  // depth". ?hours=72 keeps only conversations with a message inside the
  // window (the WHOLE conversation of each, for context) and adds what a
  // transcript alone does not show: every message's guard verdict, reviewer
  // note and template, every handoff with its "Why Will handed this over"
  // block, and Will's decision log entries for those customers.
  const hours = Math.max(0, Math.min(24 * 90, Number(url.searchParams.get('hours') ?? 0) || 0));
  const since = hours > 0 ? Date.now() - hours * 3600 * 1000 : 0;
  const store = getStore();

  // SCALE: two paged reads and an in-memory group-by, instead of listCustomers()
  // (truncated at 1,000 rows) plus one listMessages() per customer fired in
  // parallel (N concurrent queries that overrun the pool at 5,000 customers).
  // allCustomers/allMessages page through in bounded batches; grouping is O(n).
  const customers = await store.allCustomers();
  const allMessages = await store.allMessages();
  const byCustomer = new Map<string, typeof allMessages>();
  for (const m of allMessages) {
    const arr = byCustomer.get(m.customerId);
    if (arr) arr.push(m); else byCustomer.set(m.customerId, [m]);
  }
  // Keep each conversation in chronological order (the paged read is by id).
  for (const arr of byCustomer.values()) {
    arr.sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
  }
  let withMessages = customers.map((c) => ({ customer: c, messages: byCustomer.get(c.id) ?? [] }));
  if (since > 0) {
    withMessages = withMessages.filter(({ messages }) => messages.some((m) => new Date(m.createdAt).getTime() >= since));
    // Most recent activity first inside a window.
    withMessages.sort((a, b) => String(b.messages[b.messages.length - 1]?.createdAt ?? '').localeCompare(String(a.messages[a.messages.length - 1]?.createdAt ?? '')));
  } else {
    // Busiest conversations first: those are the ones worth reading.
    withMessages.sort((a, b) => b.messages.length - a.messages.length);
  }
  const ids = new Set(withMessages.map((w) => w.customer.id));
  // Handoffs and the decision log, only inside a window (a full export stays
  // the plain transcript it always was).
  const tasksById = new Map<string, Awaited<ReturnType<typeof store.listTasks>>>();
  const auditById = new Map<string, { at: string; actor: string; action: string; detail: unknown }[]>();
  if (since > 0) {
    try {
      for (const t of await store.listTasks()) {
        if (!t.customerId || !ids.has(t.customerId) || new Date(t.createdAt).getTime() < since) continue;
        const arr = tasksById.get(t.customerId) ?? []; arr.push(t); tasksById.set(t.customerId, arr);
      }
    } catch { /* tasks are optional in the export */ }
    try {
      for (const a of await store.listAudit(5000)) {
        if (new Date(a.at).getTime() < since) continue;
        const d = (a.detail ?? {}) as { customerId?: string };
        if (!d.customerId || !ids.has(d.customerId)) continue;
        if (!['decision', 'reply_blocked', 'auto_reply_already_answered', 'auto_reply_stale_discarded', 'payment_received_queued', 'income_set_from_receipt', 'income_set_from_form', 'form_received_confirmed'].includes(a.action)) continue;
        const arr = auditById.get(d.customerId) ?? []; arr.push({ at: a.at, actor: a.actor, action: a.action, detail: a.detail }); auditById.set(d.customerId, arr);
      }
    } catch { /* the decision log is optional in the export */ }
  }

  const stamp = new Date().toISOString().slice(0, 10) + (hours > 0 ? `-last-${hours}h` : '');

  if (format === 'json') {
    const conversations = withMessages.map((w) => ({ ...w, tasks: tasksById.get(w.customer.id) ?? [], decisions: auditById.get(w.customer.id) ?? [] }));
    return new NextResponse(JSON.stringify({ exportedAt: new Date().toISOString(), hours: hours || null, conversations }, null, 2), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'content-disposition': `attachment; filename="will-conversations-${stamp}.json"`,
      },
    });
  }

  const totalMessages = withMessages.reduce((n, w) => n + w.messages.length, 0);
  const lines: string[] = [
    `Will conversations, exported ${new Date().toISOString()}${hours > 0 ? ` (conversations active in the last ${hours} hours, shown in full)` : ''}`,
    `${withMessages.length} conversations, ${totalMessages} messages`,
    '',
  ];

  for (const { customer: c, messages } of withMessages) {
    lines.push('='.repeat(70));
    const who = [c.name, c.waId].filter(Boolean).join(' · ');
    lines.push(who);
    lines.push(
      [
        `stage: ${STATE_LABELS[c.state] ?? c.state}`,
        `income: ${c.income}`,
        c.paid ? 'paid' : 'not paid',
        c.lang ? `lang: ${c.lang}` : null,
        `${messages.length} messages`,
      ].filter(Boolean).join('  ·  '),
    );
    lines.push('');
    if (messages.length === 0) lines.push('  (no messages stored)');
    for (const m of messages) {
      const at = m.createdAt ? new Date(m.createdAt).toISOString().replace('T', ' ').slice(0, 16) : '';
      const from = m.direction === 'IN' ? 'CUSTOMER' : m.author === 'HUMAN' ? 'TEAM' : 'WILL';
      lines.push(`[${at}] ${from}${STATUS_NOTE[m.status] ?? ''}`);
      // Indent the body so a multi-line message stays visually one message.
      lines.push(...String(m.body ?? '').split('\n').map((l) => '    ' + l));
      // Note attachments so a transcript read months later still shows that a
      // document or a screenshot was part of the conversation.
      if (m.meta?.media) {
        lines.push(`    [attachment: ${m.meta.media.kind}${m.meta.media.filename ? ' — ' + m.meta.media.filename : ''}]`);
      }
      if (since > 0) {
        // The machinery behind each of Will's lines, for the deep read.
        const notes: string[] = [];
        if (m.meta?.waTemplate?.name) notes.push(`template: ${m.meta.waTemplate.name}`);
        if (m.meta?.system) notes.push('system message');
        if (m.meta?.proposedState) notes.push(`moves to: ${STATE_LABELS[m.meta.proposedState] ?? m.meta.proposedState}`);
        if (m.meta?.review) notes.push(`note: ${m.meta.review}`);
        if (m.meta?.paymentConfirmation) notes.push(`payment confirmation (${m.meta.trustedBecause ?? 'trusted'})`);
        if (notes.length) lines.push(`    {${notes.join(' · ')}}`);
      }
      lines.push('');
    }
    if (since > 0) {
      const tasks = tasksById.get(c.id) ?? [];
      if (tasks.length) {
        lines.push('  --- HANDOFFS (tasks) ---');
        for (const t of tasks) {
          const at = new Date(t.createdAt).toISOString().replace('T', ' ').slice(0, 16);
          lines.push(`  [${at}] ${t.severity} ${t.status}: ${t.reason}`);
          if (t.context) lines.push(...String(t.context).split('\n').map((l) => '      ' + l));
          if (t.suggestedReply) { lines.push('      Draft Will wanted to send:'); lines.push(...String(t.suggestedReply).split('\n').map((l) => '        ' + l)); }
          lines.push('');
        }
      }
      const decisions = auditById.get(c.id) ?? [];
      if (decisions.length) {
        lines.push('  --- DECISION LOG ---');
        for (const d of decisions.sort((a, b) => a.at.localeCompare(b.at))) {
          const at = new Date(d.at).toISOString().replace('T', ' ').slice(0, 16);
          const det = d.detail as Record<string, unknown>;
          const bits: string[] = [];
          if (det.action) bits.push(String(det.action));
          if (det.fromState) bits.push(`${LABELS[String(det.fromState)] ?? det.fromState} -> ${det.newState ? (LABELS[String(det.newState)] ?? det.newState) : 'same'}`);
          const g = det.guard as { blocked?: boolean; violations?: string[] } | undefined;
          if (g?.blocked) bits.push(`GUARD: ${(g.violations ?? []).join(', ')}`);
          const k = det.knowledgeUsed as string[] | undefined;
          if (k?.length) bits.push(`library: ${k.join(' | ')}`);
          lines.push(`  [${at}] ${d.action}${bits.length ? ': ' + bits.join('  ·  ') : ''}`);
        }
        lines.push('');
      }
    }
  }

  return new NextResponse(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'content-disposition': `attachment; filename="will-conversations-${stamp}.txt"`,
    },
  });
}

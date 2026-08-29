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
const STATUS_NOTE: Record<string, string> = {
  PENDING_APPROVAL: '  [draft, never sent]',
  BLOCKED: '  [blocked, never sent]',
  DISCARDED: '  [discarded, never sent]',
  FAILED: '  [send failed]',
};

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });

  const format = new URL(req.url).searchParams.get('format') === 'json' ? 'json' : 'txt';
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
  const withMessages = customers.map((c) => ({ customer: c, messages: byCustomer.get(c.id) ?? [] }));
  // Busiest conversations first: those are the ones worth reading.
  withMessages.sort((a, b) => b.messages.length - a.messages.length);

  const stamp = new Date().toISOString().slice(0, 10);

  if (format === 'json') {
    return new NextResponse(JSON.stringify({ exportedAt: new Date().toISOString(), conversations: withMessages }, null, 2), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'content-disposition': `attachment; filename="will-conversations-${stamp}.json"`,
      },
    });
  }

  const totalMessages = withMessages.reduce((n, w) => n + w.messages.length, 0);
  const lines: string[] = [
    `Will conversations, exported ${new Date().toISOString()}`,
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
      lines.push('');
    }
  }

  return new NextResponse(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'content-disposition': `attachment; filename="will-conversations-${stamp}.txt"`,
    },
  });
}

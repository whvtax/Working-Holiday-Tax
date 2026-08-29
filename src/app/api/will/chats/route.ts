// One page of the chat list, newest conversation first.
//
// The dashboard's /state bootstrap carries only a bounded window; this endpoint
// pages through EVERY conversation so the chat list scrolls forever, exactly
// like WhatsApp — a returning customer from two years ago is just further down,
// never gone. `filter` is one of: 'all', 'unread', or a pipeline stage-group id
// (mapped to that group's states here, so the store stays unaware of the UI's
// grouping). Behind the same CRM session as the rest of Will.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { STAGE_GROUPS, CustomerState } from '@/lib/will/state-machine';

export const dynamic = 'force-dynamic';

const PAGE_MAX = 100;

export async function GET(req: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const url = new URL(req.url);
  const offset = Math.max(0, parseInt(url.searchParams.get('offset') ?? '0', 10) || 0);
  const limit = Math.min(PAGE_MAX, Math.max(1, parseInt(url.searchParams.get('limit') ?? '100', 10) || 100));
  const filter = url.searchParams.get('filter') ?? 'all';

  let opts: { states?: CustomerState[]; unreadOnly?: boolean } = {};
  if (filter === 'unread') opts = { unreadOnly: true };
  else if (filter !== 'all') {
    const group = STAGE_GROUPS.find((g) => g.id === filter);
    if (group) opts = { states: [...group.states] };
  }

  try {
    const customers = await getStore().listChatPage(offset, limit, opts);
    return NextResponse.json({ ok: true, customers, hasMore: customers.length === limit });
  } catch (e) {
    return NextResponse.json({ ok: false, error: (e as Error).message?.slice(0, 200) ?? 'chats failed' }, { status: 500 });
  }
}

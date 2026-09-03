// Bootstrap endpoint: everything the dashboard needs in one call.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { STAGE_GROUPS } from '@/lib/will/state-machine';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  const store = getStore();
  const [customers, tasks, templates, pending, followupIds, autoReplyIds, total, groupCountArr] = await Promise.all([
    store.listCustomers(),
    store.listTasks(),
    store.listTemplates(),
    store.pendingApprovals(),
    store.customerIdsWithScheduledFollowup(),
    // Chats whose Autopilot two-minute timer is armed: Will is about to
    // answer them, and the list says so instead of showing a silent chat.
    store.customerIdsWithPendingAutoReply().catch(() => [] as string[]),
    // True totals, straight from COUNT(*), so the pipeline numbers show 5,000
    // and not the 1,000 the window happened to load. Each is a cheap head-only
    // count; the group ones run in parallel.
    store.countCustomers().catch(() => 0),
    Promise.all(STAGE_GROUPS.map((g) => store.countInStates([...g.states]).catch(() => 0))),
  ]);
  // stageCounts keyed by pipeline-group id, e.g. { sales: 1234, onb: 88, ... }.
  const stageCounts: Record<string, number> = {};
  STAGE_GROUPS.forEach((g, i) => { stageCounts[g.id] = groupCountArr[i]; });

  // Jo's rule, everywhere in this dashboard: the WhatsApp number is the
  // identity and the profile name is only a hint beside it.
  //
  // The Tasks screen was breaking that rule and showing "holly brazier" as the
  // heading of a card. Not a display bug — a data one. Both the task row and
  // the pending draft carry a `customerName` and no number, so when the UI
  // could not find the customer in the list it had loaded, its only fallback
  // WAS the name. A profile name is whatever the person typed into WhatsApp:
  // it is not unique, it is not searchable, and two "Ami"s are indistinguishable.
  //
  // So the number is attached here, once, from the customers already fetched
  // above — no extra query, no migration, and the UI never has to fall back to
  // a name again.
  const waById = new Map(customers.map((c) => [c.id, c.waId]));
  const withWaId = <T extends { customerId: string | null }>(row: T) => ({
    ...row,
    waId: row.customerId ? waById.get(row.customerId) ?? null : null,
  });

  return NextResponse.json({
    customers,
    tasks: tasks.map(withWaId),
    templates,
    pending: pending.map(withWaId),
    // customerIds that already have a scheduled follow-up, so the board can show
    // a small "already being chased" tick without a per-card query.
    followupIds,
    autoReplyIds,
    // True totals from COUNT(*), so the KPI numbers are the real 5,000 and not
    // the size of the loaded window. `total` = all customers; `stageCounts` =
    // per pipeline-group id.
    total,
    stageCounts,
  });
}

// Bootstrap endpoint: everything the dashboard needs in one call.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { STAGE_GROUPS } from '@/lib/will/state-machine';

export const dynamic = 'force-dynamic';

/** How many conversations the `customers` array carries, newest first.
 *
 *  This route is re-fetched by every open tab on every change tick (about
 *  every 15 s during the day), on every tab switch and after every action.
 *  Since 4 Sep `listCustomers()` pages the WHOLE table (5+ sequential 1,000-row
 *  reads at 5,000 customers, 2-3 MB of JSON) because the reports need every
 *  row; the dashboard never did. It only uses this array for id lookups, the
 *  default chat selection and a fallback count, and the chat list is already
 *  paged through /api/will/chats. So this is one indexed range query for the
 *  newest conversations, the same rows and order the chat list shows, plus the
 *  handful of customers an open task or draft points at (audit, 5 Sep).
 *
 *  1,000 is the window the dashboard was designed around (the PostgREST cap the
 *  old ordered select had). It can drop to a few hundred once the client's
 *  selected-chat lookup (Dashboard chatSel/drawer) also looks in its own
 *  loaded chat pages, which it does not yet. */
const CUSTOMER_WINDOW = 1000;

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  const store = getStore();
  const [recent, tasks, templates, pending, followupIds, autoReplyIds, total, groupCountArr] = await Promise.all([
    store.listChatPage(0, CUSTOMER_WINDOW),
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
  // So the number is attached here, once, from the customers fetched above.
  // A task or draft can point at a customer older than the window (an old
  // handoff, a paid customer who went quiet): those rows are fetched by id in
  // one targeted lookup and added to `customers`, so no card ever loses its
  // number and the Tasks screen, drawer and chat header keep resolving them
  // exactly as when the whole table was sent (audit, 5 Sep).
  const have = new Set(recent.map((c) => c.id));
  const referenced = [...new Set(
    [...tasks, ...pending]
      .map((r) => r.customerId)
      .filter((id): id is string => !!id && !have.has(id)),
  )];
  const extra = referenced.length ? await store.listCustomersByIds(referenced).catch(() => []) : [];
  const customers = [...recent, ...extra];
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

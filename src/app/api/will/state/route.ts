// Bootstrap endpoint: everything the dashboard needs in one call.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  const store = getStore();
  const [customers, tasks, templates, pending, followupIds] = await Promise.all([
    store.listCustomers(),
    store.listTasks(),
    store.listTemplates(),
    store.pendingApprovals(),
    store.customerIdsWithScheduledFollowup(),
  ]);

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
  });
}

// Mia pipeline: SVT customers (will_customers, brand 'svt') grouped by Will's stage groups.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { STAGE_GROUPS } from '@/lib/will/state-machine';
import { listMiaCustomers, MIA_PAGE_MAX } from '@/lib/mia/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  try {
    const rows = await listMiaCustomers({ order: 'created', limit: MIA_PAGE_MAX, offset: 0 });
    const groups = STAGE_GROUPS.map((g) => ({
      id: g.id,
      label: g.label,
      customers: rows.filter((r) => (g.states as readonly string[]).includes(r.state)),
    }));
    return NextResponse.json({ ok: true, groups, total: rows.length, truncated: rows.length === MIA_PAGE_MAX });
  } catch {
    return NextResponse.json({ ok: false, error: 'db_error' }, { status: 503 });
  }
}

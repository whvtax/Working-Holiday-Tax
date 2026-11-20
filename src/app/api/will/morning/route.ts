// The morning report for the Overview (Jo, 22 Oct). Read-only.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { brandParam, rowBrand } from '@/lib/will/brand-param';
import { buildMorningReport } from '@/lib/will/morning-report';

export const dynamic = 'force-dynamic';

export async function GET(req?: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  const now = Date.now();
  const startIso = new Date(now - 24 * 60 * 60 * 1000).toISOString();
  const [customers, tasks, history, messages, auth] = await Promise.all([
    store.listCustomers(), store.listTasks(), store.allHistory(),
    store.listMessagesBetween(startIso, new Date(now).toISOString(), 5000),
    typeof store.listAuditByActor === 'function' ? store.listAuditByActor('auth', startIso) : Promise.resolve([]),
  ]);
  // Jo, 20 Nov: Control shows the report per brand (Will / Mia) or both.
  const brand = brandParam(req);
  if (brand) {
    const mine = customers.filter((c) => rowBrand(c) === brand);
    const ids = new Set(mine.map((c) => c.id));
    const inBrand = (id: string | null | undefined) => (id ? ids.has(id) : brand === 'wht');
    return NextResponse.json({ ok: true, brand, report: buildMorningReport({
      customers: mine,
      tasks: tasks.filter((t) => inBrand(t.customerId)),
      messages: messages.filter((m) => inBrand(m.customerId)),
      history: history.filter((h) => inBrand(h.customerId)),
      auth, now,
    }) });
  }
  return NextResponse.json({ ok: true, report: buildMorningReport({ customers, tasks, messages, history, auth, now}) });
}

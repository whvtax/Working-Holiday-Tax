// GET /api/will/followup-stats: how many leads paid after each pre-payment
// follow-up (Jo, 18 Nov). Owner session only, read-only.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { brandParam, rowBrand } from '@/lib/will/brand-param';
import { getStore } from '@/lib/will/store';
import { followUpStats, FOLLOWUP_STATS_DAYS } from '@/lib/will/followup-stats';

export const dynamic = 'force-dynamic';

export async function GET(req?: Request) {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  const since = new Date(Date.now() - FOLLOWUP_STATS_DAYS * 86400000).toISOString();
  const [audit, history] = await Promise.all([
    typeof store.listAuditByActions === 'function' ? store.listAuditByActions(['follow_up_sent'], since) : store.listAudit(5000),
    store.allHistory(),
  ]);
  // Jo, 20 Nov: Control shows the follow-up results per brand.
  const brand = brandParam(req);
  if (brand) {
    const ids = new Set((await store.listCustomers().catch(() => [])).filter((c) => rowBrand(c) === brand).map((c) => c.id));
    const mine = (id: unknown) => typeof id === 'string' && ids.has(id);
    const a = audit.filter((r) => mine((r.detail as { customerId?: unknown } | null)?.customerId));
    const h = history.filter((r) => mine(r.customerId));
    return NextResponse.json({ ok: true, brand, days: FOLLOWUP_STATS_DAYS, steps: followUpStats(a, h) });
  }
  return NextResponse.json({ ok: true, days: FOLLOWUP_STATS_DAYS, steps: followUpStats(audit, history) });
}

// GET /api/will/followup-stats: how many leads paid after each pre-payment
// follow-up (Jo, 18 Nov). Owner session only, read-only.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { followUpStats, FOLLOWUP_STATS_DAYS } from '@/lib/will/followup-stats';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();
  const since = new Date(Date.now() - FOLLOWUP_STATS_DAYS * 86400000).toISOString();
  const [audit, history] = await Promise.all([
    typeof store.listAuditByActions === 'function' ? store.listAuditByActions(['follow_up_sent'], since) : store.listAudit(5000),
    store.allHistory(),
  ]);
  return NextResponse.json({ ok: true, days: FOLLOWUP_STATS_DAYS, steps: followUpStats(audit, history) });
}

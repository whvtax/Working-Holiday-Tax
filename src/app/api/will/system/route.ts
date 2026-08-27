// What Claude has cost so far, and what is actually broken — the two things the
// "System & Costs" card needs that nothing else already served.
//
// Read-only, owner-gated with the same CRM session guard as every neighbouring
// Will route (src/lib/will/auth.ts).
//
// Deliberately NOT built on `lastPersistError`: that is a module-level variable
// inside one serverless instance, so it reports whatever that instance happened
// to see and says nothing about the others. Failures are read from will_audit,
// which every instance writes to.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { aiCallsKeyFor, aiCallsKeyPrefix, resolveAiDailyBudget } from '@/lib/will/service';
import { summariseAiUsage, faultsFromAudit } from '@/lib/will/system-report';

export const dynamic = 'force-dynamic';

/** How far back the fault counts reach. The card says so out loud rather than
 *  implying the counts are all-time — will_audit is purged by nightly
 *  maintenance anyway, so "all time" would be a lie in both directions. */
const AUDIT_WINDOW = 500;

export async function GET() {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();

  const [budgetRaw, counters, audit] = await Promise.all([
    store.getSetting('ai_daily_budget').catch(() => null),
    typeof store.listCounters === 'function'
      ? store.listCounters(aiCallsKeyPrefix).catch(() => [])
      : Promise.resolve([]),
    store.listAudit(AUDIT_WINDOW).catch(() => []),
  ]);

  const usage = summariseAiUsage(counters, {
    todayKey: aiCallsKeyFor().slice(aiCallsKeyPrefix.length),
    budgetToday: resolveAiDailyBudget(budgetRaw),
    // No key means no paid call was ever made: the mock brain answers instead.
    usingMock: !process.env.ANTHROPIC_API_KEY,
  });

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    usage,
    faults: faultsFromAudit(audit),
    faultWindow: AUDIT_WINDOW,
    auditRowsRead: audit.length,
  });
}

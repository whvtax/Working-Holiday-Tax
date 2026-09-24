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
import { summariseUsage } from '@/lib/will/ai-usage';
import { fetchCostReport } from '@/lib/will/cost-report';
import { readReviewAsks, REVIEWS_RECEIVED_SETTING } from '@/lib/will/review-asks';
import { STAGE_GROUPS } from '@/lib/will/state-machine';
import { summariseAiUsage, faultsFromAudit, applyFaultDismissals, faultDismissedKey } from '@/lib/will/system-report';

export const dynamic = 'force-dynamic';

/** How many raw rows to pull from will_audit before filtering to the real
 *  fault window below. Generous on purpose: at volume (inbound_received,
 *  two decision rows, follow_up_sent, per-tick scheduler rows, ...) a single
 *  day can run past 500, so a plain "last 500 rows" window used to be a few
 *  hours, not a day, and an overnight fault had scrolled off the card by the
 *  time Jo opened it in the morning. Also used to tell whether the fetch
 *  itself got truncated before reaching the day cutoff. */
const AUDIT_FETCH_LIMIT = 5000;

/** The real fault window: a stable number of DAYS rather than an unpredictable
 *  row count, so the card means the same thing every morning (audit3 sched 61, 5 Sep). */
const AUDIT_WINDOW_DAYS = 7;

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();

  const [budgetRaw, counters, auditFetched] = await Promise.all([
    store.getSetting('ai_daily_budget').catch(() => null),
    typeof store.listCounters === 'function'
      ? store.listCounters(aiCallsKeyPrefix).catch(() => [])
      : Promise.resolve([]),
    store.listAudit(AUDIT_FETCH_LIMIT).catch(() => []),
  ]);

  // Filter to a fixed day window rather than trusting the row count itself to
  // mean "recent": at high volume 500 (or even AUDIT_FETCH_LIMIT) rows can be
  // just a few hours, so a plain top-N read silently drops overnight faults
  // (audit3 sched 61, 5 Sep).
  const auditCutoff = Date.now() - AUDIT_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  const audit = auditFetched.filter((r) => new Date(r.at).getTime() >= auditCutoff);

  const usage = summariseAiUsage(counters, {
    todayKey: aiCallsKeyFor().slice(aiCallsKeyPrefix.length),
    budgetToday: resolveAiDailyBudget(budgetRaw),
    // No key means no paid call was ever made: the mock brain answers instead.
    usingMock: !process.env.ANTHROPIC_API_KEY,
  });

  // EXACT COST (Jo, 24 Sep). Two sources, both returned:
  //   ledger: every paid call with Anthropic's own token counts, priced at the
  //           published list (last 92 days, enough for a three-month chart);
  //   bill:   the organisation cost report from the Admin API, when the key is
  //           set. That is the invoice number; it covers the whole account.
  const since = new Date(Date.now() - 92 * 24 * 60 * 60 * 1000);
  const [ledgerRows, bill] = await Promise.all([
    typeof store.listAiUsage === 'function' ? store.listAiUsage(since.toISOString()).catch(() => []) : Promise.resolve([]),
    fetchCostReport(new Date(Date.UTC(since.getUTCFullYear(), since.getUTCMonth(), 1)).toISOString()).catch((e: Error) => ({ available: false, days: [], totalUsd: 0, fetchedAt: new Date().toISOString(), error: e.message })),
  ]);
  const ledger = summariseUsage(ledgerRows);

  // GOOGLE REVIEWS (Jo, 24 Sep): asked / skipped / referral, and the count
  // the owner ticks by hand when a review actually shows up on Google.
  const [asks, receivedRaw, customersAll] = await Promise.all([
    readReviewAsks(store),
    store.getSetting(REVIEWS_RECEIVED_SETTING).catch(() => 0),
    typeof store.listCustomers === 'function' ? store.listCustomers().catch(() => []) : Promise.resolve([]),
  ]);
  const askRows = Object.values(asks);
  const reviews = {
    asked: askRows.filter((a) => a.askedAt).length,
    askedOnRefund: askRows.filter((a) => a.askedAt && a.trigger === 'refund_received').length,
    skipped: askRows.filter((a) => a.skippedAt && !a.askedAt).length,
    skipReasons: askRows.filter((a) => a.skippedAt && !a.askedAt && a.skipReason).map((a) => a.skipReason as string).slice(-5),
    referrals: askRows.filter((a) => a.referralAt).length,
    received: Number(receivedRaw) || 0,
  };

  // AUTOPILOT COVERAGE BY HOUR (Jo, 24 Sep): of every decision Will made in
  // the audit window, how many were answered by Will alone vs handed to a
  // person, by Melbourne hour. The hours with the most hand-offs are where
  // the owner is the bottleneck.
  const hourFmt = new Intl.DateTimeFormat('en-AU', { hour: 'numeric', hour12: false, timeZone: 'Australia/Melbourne' });
  const coverage = Array.from({ length: 24 }, (_, h) => ({ hour: h, auto: 0, human: 0 }));
  for (const r of audit) {
    if (r.action !== 'decision') continue;
    const d = r.detail as { action?: string } | null;
    const kind = d?.action;
    if (!kind) continue;
    const h = Number(hourFmt.format(new Date(r.at))) % 24;
    if (kind === 'queued') coverage[h].auto++;
    else if (kind === 'human_task' || kind === 'pending_approval') coverage[h].human++;
  }

  // STUCK IN REVIEW (Jo, 24 Sep): paid customers sitting in the Review group
  // longer than a week, oldest first. These are the ones waiting on us.
  const reviewStates = new Set<string>(STAGE_GROUPS.find((g) => g.id === 'rev')?.states ?? []);
  const stuck = customersAll
    .filter((c) => reviewStates.has(c.state) && c.stateChangedAt)
    .map((c) => ({ customerId: c.id, waId: c.waId, name: c.name, flag: c.flag, state: c.state, days: Math.floor((Date.now() - new Date(c.stateChangedAt as string).getTime()) / 86400000) }))
    .filter((c) => c.days >= 7)
    .sort((a, b) => b.days - a.days);

  // Every fault above is read FROM will_audit. If that table itself cannot be
  // written, the card would say "nothing is failing" precisely when everything
  // is invisible. So probe the log once and report it as a fault of its own
  // rather than mistaking an empty log for a quiet system (audit, 5 Sep).
  const auditLog = typeof store.checkAuditLog === 'function'
    ? await store.checkAuditLog().catch((e: Error) => ({ ok: false as const, error: e.message }))
    : { ok: true as const };
  const faults = faultsFromAudit(audit);
  if (!auditLog.ok) {
    faults.unshift({
      key: 'audit_log_not_written',
      component: 'Decision log (will_audit)',
      error: auditLog.error.slice(0, 300),
      lastAt: new Date().toISOString(),
      count: 1,
      meaning: 'The decision log is not being written, so every other count on this card is blind. Nothing below can be trusted until this is fixed. Customers are not affected: replies and sends do not depend on the log.',
      action: 'Open the will_audit table in Supabase and read the error above. A missing column means a migration was not run (see the Database check in the header); a permission error means a policy on the table changed.',
      severity: 'critical',
    });
  }

  // Dismissed faults (Jo, 6 Sep): "I've dealt with this" clears the card until
  // it happens again — a fresh occurrence (a newer lastAt than the dismissal)
  // reappears on its own, so nothing dismissed can hide a genuinely new
  // failure. One settings read per fault key actually present; small and
  // best-effort, never worth failing the whole card over.
  const dismissedAt: Record<string, string | null | undefined> = {};
  await Promise.all(faults.map(async (f) => {
    dismissedAt[f.key] = (await store.getSetting(faultDismissedKey(f.key)).catch(() => null)) as string | null;
  }));
  const visibleFaults = applyFaultDismissals(faults, dismissedAt);

  return NextResponse.json({
    ok: true,
    ledger, bill, reviews, coverage, stuck,
    generatedAt: new Date().toISOString(),
    usage,
    faults: visibleFaults,
    faultWindow: AUDIT_FETCH_LIMIT,
    faultWindowDays: AUDIT_WINDOW_DAYS,
    auditRowsRead: audit.length,
    auditLog,
  });
}

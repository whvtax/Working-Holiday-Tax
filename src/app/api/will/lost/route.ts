// The Lost Leads report: every stored post-mortem for a lead that never paid,
// plus the aggregate that makes them worth reading — categories ranked by
// frequency, because "eleven leads went quiet right after the price" is a
// finding, and eleven separate anecdotes are not.
//
// READ-ONLY, and owner-gated with the same CRM session guard as every
// neighbouring Will route (src/lib/will/auth.ts). It writes nothing: the rows
// are produced once a night by the LOST_ANALYSIS job (lib/will/lost-analysis.ts)
// so that opening this tab is instant and free, and so the same finding is still
// there tomorrow instead of being re-generated differently on every load.
//
// Nothing this returns is ever sent to a customer. There is deliberately no
// POST here, no draft, no "message them" action — it is a report.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { STATE_LABELS } from '@/lib/will/state-machine';
import {
  selectLostLeads, aggregateCategories, SILENCE_DAYS_UNTIL_LOST,
  CATEGORY_LABELS, TRIGGER_LABELS, LostCategory, LostTrigger,
} from '@/lib/will/lost-leads';
import { LOST_RUN_SETTING, LostRunSummary } from '@/lib/will/lost-analysis';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!sessionValid()) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();

  const [customers, analyses, lastRun] = await Promise.all([
    store.listCustomers(),
    store.listLostAnalyses().catch(() => []),
    store.getSetting(LOST_RUN_SETTING).catch(() => null),
  ]);

  // Who is lost is recomputed live from the customer rows, never read from the
  // stored analysis: a lead who came back to life must drop off this report the
  // moment they do, not wait for the next nightly run.
  const lost = selectLostLeads(customers, new Date());
  const byId = new Map(analyses.map((a) => [a.customerId, a]));

  const rows = lost.map(({ customer, verdict }) => {
    const a = byId.get(customer.id);
    return {
      customerId: customer.id,
      waId: customer.waId,
      name: customer.name,
      flag: customer.flag,
      state: customer.state,
      stateLabel: STATE_LABELS[customer.state] ?? customer.state,
      lang: customer.lang,
      trigger: verdict.trigger,
      triggerLabel: verdict.trigger ? TRIGGER_LABELS[verdict.trigger as LostTrigger] : null,
      quietDays: verdict.quietDays,
      lostBecause: verdict.why,
      // null = the nightly job has not reached this lead yet.
      analysis: a && a.status === 'OK' ? {
        reason: a.reason,
        category: a.category,
        categoryLabel: CATEGORY_LABELS[a.category as LostCategory] ?? a.category,
        shouldHaveDone: a.shouldHaveDone,
        fault: a.fault,
        recoverable: a.recoverable,
        recoveryAction: a.recoveryAction,
        evidenceQuote: a.evidenceQuote,
        confidence: a.confidence,
        hoursPriceToSilence: a.hoursPriceToSilence,
        analysedAt: a.analysedAt,
      } : null,
      // Shown plainly rather than hidden: "3 could not be analysed" is honest,
      // an analysis that silently never appears is not.
      failure: a && a.status === 'ERROR' ? { error: a.error, attempts: a.attempts } : null,
    };
  })
    // Longest-lost last: the newest losses are the ones still worth acting on.
    .sort((x, y) => x.quietDays - y.quietDays);

  // The aggregate counts only leads that are lost RIGHT NOW and have a usable
  // analysis — a post-mortem for someone who has since come back would inflate
  // a category with a lead that was not, in the end, lost at all.
  const counted = rows.map((r) => r.analysis).filter((a): a is NonNullable<typeof a> => a != null);
  const categories = aggregateCategories(counted.map((a) => ({
    category: a.category as LostCategory,
    recoverable: a.recoverable as 'YES' | 'MAYBE' | 'NO',
    fault: a.fault as 'OURS' | 'PARTLY_OURS' | 'NOT_OURS',
  })));

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    /** The definition, sent to the UI so the screen and the code can never
     *  disagree about what "lost" means. */
    definition: {
      silenceDays: SILENCE_DAYS_UNTIL_LOST,
      text: `Never paid, and either they said no, asked us to stop, were closed as cold after the full follow-up cadence, or have been silent for ${SILENCE_DAYS_UNTIL_LOST}+ days while still sitting in a sales stage. Wrong numbers and pre-existing contacts are excluded.`,
    },
    counts: {
      lost: rows.length,
      analysed: counted.length,
      pending: rows.filter((r) => !r.analysis && !r.failure).length,
      failed: rows.filter((r) => r.failure).length,
      recoverable: counted.filter((a) => a.recoverable === 'YES' || a.recoverable === 'MAYBE').length,
      ourFault: counted.filter((a) => a.fault === 'OURS' || a.fault === 'PARTLY_OURS').length,
    },
    categories,
    rows,
    lastRun: (lastRun ?? null) as LostRunSummary | null,
  });
}

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
  CATEGORY_LABELS, TRIGGER_LABELS, LostCategory, LostTrigger, priorityScore, PREVENTION_HINTS,
} from '@/lib/will/lost-leads';
import { LOST_RUN_SETTING, LostRunSummary } from '@/lib/will/lost-analysis';
import { readWinbacks, winbackStatus, WINBACK_GIVE_UP_DAYS } from '@/lib/will/winbacks';

export const dynamic = 'force-dynamic';

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  const store = getStore();

  const [customers, analyses, lastRun, winbacks] = await Promise.all([
    store.listCustomers(),
    store.listLostAnalyses().catch(() => []),
    store.getSetting(LOST_RUN_SETTING).catch(() => null),
    readWinbacks(store),
  ]);
  const now = new Date();

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
      // Jo, 24 Sep: what happened after the win-back button, if it was pressed.
      winback: winbackStatus(winbacks[customer.id], customer.lastCustomerMsgAt, now),
      priority: priorityScore({
        state: customer.state, quietDays: verdict.quietDays, lang: customer.lang,
        trigger: verdict.trigger as LostTrigger | null,
        recoverable: a && a.status === 'OK' ? (a.recoverable as 'YES' | 'MAYBE' | 'NO') : null,
      }),
      // null = the nightly job has not reached this lead yet.
      analysis: a && a.status === 'OK' ? {
        reason: a.reason,
        category: a.category,
        categoryLabel: CATEGORY_LABELS[a.category as LostCategory] ?? a.category,
        shouldHaveDone: a.shouldHaveDone,
        fault: a.fault,
        recoverable: a.recoverable,
        recoveryAction: a.recoveryAction,
        recoveryMessage: a.recoveryMessage,
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
    // Best bet first (Jo, 24 Sep): priority score, then the most recent loss.
    .sort((x, y) => (y.priority - x.priority) || (x.quietDays - y.quietDays));

  // The work queue: the ten best bets that have not had a win-back yet.
  const untouched = rows.filter((r) => r.priority > 0 && r.winback.kind === 'none');
  const top = untouched.slice(0, 10).map((r) => r.customerId);
  // Deadline campaign: everyone winnable who went quiet since the tax year
  // began (1 July). "Right service, wrong moment" is exactly who a deadline
  // brings back.
  const fyStart = new Date(Date.UTC(now.getUTCMonth() >= 6 ? now.getUTCFullYear() : now.getUTCFullYear() - 1, 6, 1));
  const daysSinceFy = Math.floor((now.getTime() - fyStart.getTime()) / 86400000);
  const campaign = untouched.filter((r) => r.quietDays <= daysSinceFy).map((r) => r.customerId);

  // The aggregate counts only leads that are lost RIGHT NOW and have a usable
  // analysis — a post-mortem for someone who has since come back would inflate
  // a category with a lead that was not, in the end, lost at all.
  const counted = rows.map((r) => r.analysis).filter((a): a is NonNullable<typeof a> => a != null);
  const categories = aggregateCategories(counted.map((a) => ({
    category: a.category as LostCategory,
    recoverable: a.recoverable as 'YES' | 'MAYBE' | 'NO',
    fault: a.fault as 'OURS' | 'PARTLY_OURS' | 'NOT_OURS',
  })));

  // Won back: a win-back went out and the person wrote again. They are no
  // longer lost (the live definition drops them), so they are listed here,
  // on their own, as the one number that says whether this tab earns money.
  const lostIds = new Set(rows.map((r) => r.customerId));
  const wonBack = customers
    .filter((c) => !lostIds.has(c.id) && winbacks[c.id]?.sentAt)
    .map((c) => ({ c, st: winbackStatus(winbacks[c.id], c.lastCustomerMsgAt, now) }))
    .filter((x) => x.st.kind === 'won_back')
    .map(({ c, st }) => ({
      customerId: c.id, waId: c.waId, name: c.name, flag: c.flag, state: c.state,
      stateLabel: STATE_LABELS[c.state] ?? c.state, paid: c.paid,
      sentAt: (st as { sentAt: string }).sentAt, repliedAt: (st as { repliedAt: string }).repliedAt,
    }))
    .sort((a, b) => (a.repliedAt < b.repliedAt ? 1 : -1));
  const sentTotal = Object.values(winbacks).filter((w) => w.sentAt).length;

  // Prevention: the categories that are on us, most frequent first, each with
  // the lever to pull in Will.
  const prevention = categories
    .filter((c) => c.ourFault > 0)
    .sort((a, b) => b.ourFault - a.ourFault)
    .slice(0, 3)
    .map((c) => ({ category: c.category, label: c.label, ourFault: c.ourFault, fix: PREVENTION_HINTS[c.category as LostCategory] ?? '' }));

  return NextResponse.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    top,
    campaign: { customerIds: campaign, since: fyStart.toISOString().slice(0, 10) },
    prevention,
    winbacks: {
      giveUpDays: WINBACK_GIVE_UP_DAYS,
      sent: sentTotal,
      waiting: rows.filter((r) => r.winback.kind === 'waiting').length,
      gaveUp: rows.filter((r) => r.winback.kind === 'gave_up').length,
      wonBack,
    },
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

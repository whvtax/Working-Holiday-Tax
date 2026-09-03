// Deep report: multi-angle analysis of all customer communication.
// Quantitative sections are computed live from the store. The
// qualitative section (phrasing, tone, abandon-point analysis) runs
// through Claude when a key is configured; without one it explains
// what it will analyze.
import { NextResponse } from 'next/server';
import { sessionValid } from '@/lib/will/auth';
import { getStore } from '@/lib/will/store';
import { STAGE_GROUPS, STATE_LABELS, CustomerState } from '@/lib/will/state-machine';

export const dynamic = 'force-dynamic';

interface Insight { problem: string; evidence: string; solution: string }

export async function GET() {
  if (!(await sessionValid())) return NextResponse.json({ ok:false, error:'unauthorized' }, { status:401 });
  const store = getStore();
  const customers = await store.listCustomers();
  // PERF-03: one aggregate history query instead of one per customer.
  const [tasks, history] = await Promise.all([
    store.listTasks(),
    store.allHistory(),
  ]);

  // ---- funnel ----
  // PERF-02: precompute reached (customerId|state) once, O(history), instead of
  // scanning the whole history for every customer/state combination.
  const reachedSet = new Set<string>();
  for (const h of history) reachedSet.add(h.customerId + '|' + h.to);
  const reached = (s: CustomerState) =>
    customers.filter((c) => c.state === s || reachedSet.has(c.id + '|' + s)).length;
  const funnel = [
    { label: 'New leads', n: customers.length },
    { label: 'Price sent', n: reached('PRICE_SENT') },
    { label: 'Paid', n: customers.filter((c) => c.paid).length },
    { label: 'Form complete', n: customers.filter((c) => c.formComplete).length },
    { label: 'Lodged', n: reached('LODGED') + reached('COMPLETED') },
  ];

  // ---- stuck & drop analysis ----
  const now = Date.now();
  const stuck = customers.filter((c) =>
    now - new Date(c.stateChangedAt).getTime() > 24 * 3600e3 &&
    !['COMPLETED', 'NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(c.state));
  const closed = customers.filter((c) => ['NOT_INTERESTED', 'WENT_COLD', 'NOT_RELEVANT'].includes(c.state));
  const coldAfterPrice = closed.filter((c) => c.previousState === 'PRICE_SENT' || c.previousState === 'PAYMENT_PENDING').length;

  // ---- task patterns ----
  const openTasks = tasks.filter((t) => t.status === 'OPEN');
  const reasonCounts = new Map<string, number>();
  for (const t of tasks) {
    const key = t.reason.replace(/:.*$/, '').slice(0, 60);
    reasonCounts.set(key, (reasonCounts.get(key) ?? 0) + 1);
  }
  const topReasons = [...reasonCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);

  // ---- insights with solutions (Jo's rule: every problem ships with a fix) ----
  const insights: Insight[] = [];
  if (coldAfterPrice > 0 || closed.length > 0) {
    insights.push({
      problem: `${closed.length} customers closed; ${coldAfterPrice} went cold right after seeing the price`,
      evidence: 'Tracked from state history (previous stage before closing)',
      solution: 'A/B test the day-3 follow-up wording in the Library, and consider a softer price framing that leads with the guarantee before the number.',
    });
  }
  if (stuck.length > 0) {
    insights.push({
      problem: `${stuck.length} customers are stuck in a stage for over 24h`,
      evidence: stuck.slice(0, 3).map((c) => `${c.name ?? c.waId} (${STATE_LABELS[c.state]})`).join(', '),
      solution: 'Open each from the Pipeline and use the quick-reply to unblock; recurring stuck-points deserve a new template in the Library.',
    });
  }
  for (const [reason, n] of topReasons) {
    if (n >= 2) {
      insights.push({
        problem: `"${reason}" escalated ${n} times`,
        evidence: 'Human task log',
        solution: 'Add an approved answer for this to the Library / FAQ so the assistant resolves it alone next time.',
      });
    }
  }
  if (insights.length === 0) {
    insights.push({
      problem: 'No recurring problems detected yet',
      evidence: 'Not enough conversation volume',
      solution: 'More conversations are needed before patterns show up; this fills in as real traffic arrives.',
    });
  }

  // ---- qualitative analysis (Claude, when configured) ----
  const hasKey = !!process.env.ANTHROPIC_API_KEY;
  const qualitative = hasKey
    ? null // Phase: wired on demand to avoid surprise API cost; UI triggers explicitly
    : {
      note: 'Connect an Anthropic API key and this section will read every conversation and report: phrasing that converts vs. phrasing that loses customers, tone analysis per language, the exact message where each abandoned customer dropped, objection-handling win rates, and suggested new templates based on what customers actually ask.',
    };

  // Conversion rate + best-version goal
  const paidCount = customers.filter((c) => c.paid).length;
  const leadToPaid = customers.length ? Math.round((paidCount / customers.length) * 100) : 0;
  const goal = (await store.getSetting('conversion_goal')) as number | undefined ?? null;

  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    leadToPaid, goal, paidCount,
    funnel,
    stageGroups: STAGE_GROUPS.map((g) => ({ label: g.label, color: g.color, n: customers.filter((c) => (g.states as readonly CustomerState[]).includes(c.state)).length })),
    closed: { total: closed.length, coldAfterPrice },
    stuck: stuck.map((c) => ({ name: c.name ?? c.waId, state: STATE_LABELS[c.state], flag: c.flag })),
    tasks: { open: openTasks.length, topReasons },
    insights,
    qualitative,
  });
}

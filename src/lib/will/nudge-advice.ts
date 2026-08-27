// ============================================================
// "What should the next nudge to THIS person be?"
//
// The cadence is positional: prePayment #1, then #2, then #3, to everyone, in
// that order. It cannot be anything else — a fixed sequence has no way to know
// that one person is waiting on a number nobody gave them and the next simply
// said "next week" and meant it. This module reads the actual conversation and
// answers three things before the nudge goes out:
//
//   1. why this person is really quiet          -> advice.read
//   2. which approved message fits THEM best    -> advice.recommendedKey
//   3. if none of them do, what to write instead -> advice.draft
//
// ── The one hard limit, stated plainly ──────────────────────────────────────
// (2) is the only part that can ever be sent automatically. Every scheduled
// follow-up lands OUTSIDE Meta's 24-hour customer-service window by definition:
// we are messaging someone precisely because they went quiet. Outside that
// window WhatsApp rejects free-form text and only a pre-approved template goes
// through (channel.ts, scheduler.ts). So a sentence composed here is not a
// message and this module never treats it as one — (3) is written for Jo, to
// send himself from his own phone, or to turn into a new approved template if
// he finds he keeps needing it.
//
// ── What cannot happen ──────────────────────────────────────────────────────
// * A recommended key that is not a real, current Library entry belonging to
//   this customer's own flow is DISCARDED (`resolveRecommendation` below).
//   The model is handed a candidate list and cannot escape it; even so the
//   answer is re-checked here against the store, because "the model was told
//   not to" is not a security control.
// * A recommendation is never written to the job, the customer, or a message
//   row by this module. It is advice returned to a screen. Applying it is a
//   separate, deliberate action (POST /api/will/followups/apply) that swaps one
//   approved template key for another approved template key — nothing else.
// * The draft has no outbound path at all. Nothing imports it into a send.
// ============================================================
import { getStore, CustomerRow, TemplateRow, JobRow } from './store';
import { STATE_LABELS, FLOW_TEMPLATES, flowForState, Flow, CustomerState } from './state-machine';
import { adviseNextNudge, NudgeAdvice, NudgeCandidate } from './claude';
import { redactSensitive, shortLabel } from './digest';
import { greetingName } from './scheduler';

/** Enough of the conversation to understand it, bounded so one very chatty
 *  customer cannot turn a single advice call into a huge one. */
const MAX_TRANSCRIPT_MESSAGES = 60;

const AUTHOR_LABEL: Record<string, string> = { AI: 'Will', HUMAN: 'Jo', SYSTEM: 'System' };

export interface NudgeAdviceResult {
  jobId: string;
  /** The advice, or null when it could not be produced. */
  advice: (NudgeAdvice & {
    /** The recommended template resolved to a real Library entry, with {{1}}
     *  already substituted — i.e. exactly what would be sent if applied. */
    recommendedTitle: string | null;
    recommendedBody: string | null;
    /** True when the recommendation differs from what is currently queued AND
     *  is confident enough to act on. The UI only offers to swap when this is
     *  true, so a low-confidence "I suppose #2 is fine" never becomes a button
     *  that changes what a real person receives. */
    changesQueued: boolean;
  }) | null;
  /** Present instead of `advice` when it could not be produced. Always a
   *  sentence a person can act on, never a stack trace. */
  error?: string;
}

/** Below this the cadence's own choice stands, whatever the model preferred.
 *  A follow-up to a real person is not the place to act on a hunch. */
export const MIN_CONFIDENCE_TO_SWAP = 0.6;

function quietSummary(c: CustomerRow, now: Date): string {
  const last = c.lastCustomerMsgAt ? new Date(c.lastCustomerMsgAt) : null;
  if (!last || Number.isNaN(last.getTime())) return 'they have never sent a message';
  const days = Math.floor((now.getTime() - last.getTime()) / 86_400_000);
  if (days < 1) {
    const hours = Math.max(1, Math.floor((now.getTime() - last.getTime()) / 3_600_000));
    return `${hours} hour${hours === 1 ? '' : 's'} since they last wrote`;
  }
  return `${days} day${days === 1 ? '' : 's'} since they last wrote`;
}

/**
 * The messages the customer actually experienced, oldest first.
 *
 * Only SENT rows. A draft that was never approved, a reply the guard blocked,
 * and a send WhatsApp rejected were all invisible to the customer — feeding
 * them in would have the model reason about a conversation that did not happen
 * and explain someone's silence by a message they never got. This is the same
 * rule lost-analysis.ts uses, and the same rule that fixed the chat-list
 * previews (migration 030).
 */
export function buildTranscript(messages: Array<{ status: string; direction: string; author: string; body: string | null; createdAt: string; meta?: { media?: { kind?: string } } | null }>): string {
  return messages
    .filter((m) => m.status === 'SENT')
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
    .slice(-MAX_TRANSCRIPT_MESSAGES)
    .map((m) => {
      const who = AUTHOR_LABEL[m.author] ?? (m.direction === 'IN' ? 'Customer' : 'Us');
      const media = m.meta?.media?.kind ? ` [sent a ${m.meta.media.kind}]` : '';
      return `${who}: ${redactSensitive(m.body ?? '')}${media}`;
    })
    .join('\n');
}

/**
 * The approved messages this person may be sent, and nothing else.
 *
 * Scoped to their OWN flow. Widening it to every follow-up in the Library
 * would let a "just sign the form and you're done" nudge go to somebody who
 * has not paid yet — a message that is approved, well written, and completely
 * wrong for them. The flow is the guarantee that whatever comes back is at
 * least about the right thing.
 */
export function candidatesFor(flow: Flow, templates: TemplateRow[]): NudgeCandidate[] {
  const byKey = new Map(templates.map((t) => [t.key, t]));
  return FLOW_TEMPLATES[flow]
    .map((k) => byKey.get(k))
    .filter((t): t is TemplateRow => Boolean(t && t.body.trim()))
    .map((t) => ({ key: t.key, title: t.title, body: t.body }));
}

/**
 * Decide what the recommendation actually means, after the model has spoken.
 *
 * Deliberately paranoid and deliberately boring: an unknown key, a key outside
 * this flow, or a confidence below the floor all collapse to the same safe
 * outcome — keep what the cadence queued. The failure mode of this function is
 * "nothing changes", which is exactly the behaviour that existed before any of
 * this was written.
 */
export function resolveRecommendation(
  advice: NudgeAdvice,
  queuedKey: string,
  candidates: NudgeCandidate[],
): { key: string; candidate: NudgeCandidate | null; changesQueued: boolean } {
  const match = advice.recommendedKey
    ? candidates.find((c) => c.key === advice.recommendedKey) ?? null
    : null;
  if (!match) return { key: queuedKey, candidate: null, changesQueued: false };
  const changesQueued = match.key !== queuedKey && advice.confidence >= MIN_CONFIDENCE_TO_SWAP;
  return { key: changesQueued ? match.key : queuedKey, candidate: match, changesQueued };
}

/** Read one queued follow-up's conversation and recommend the next nudge.
 *  Never throws: every failure comes back as `{ advice: null, error }`. */
export async function adviseForJob(job: JobRow, now = new Date()): Promise<NudgeAdviceResult> {
  const out = (error: string): NudgeAdviceResult => ({ jobId: job.id, advice: null, error });
  if (job.kind !== 'FOLLOW_UP' || job.status !== 'SCHEDULED' || !job.customerId) {
    return out('This job is not a scheduled follow-up.');
  }
  const store = getStore();

  const customer = await store.getCustomerById(job.customerId).catch(() => null);
  if (!customer) return out('That customer no longer exists.');

  const flow = (job.payload.flow as Flow | undefined) ?? flowForState(customer.state);
  if (!flow) return out('This customer is not in a stage that has a follow-up cadence.');

  const [messages, templates] = await Promise.all([
    store.listMessages(customer.id).catch(() => []),
    store.listTemplates().catch(() => [] as TemplateRow[]),
  ]);

  const queuedKey = job.payload.templateKey ?? '';
  const queued = templates.find((t) => t.key === queuedKey) ?? null;
  if (!queued) return out('The queued message is no longer in the Library, so there is nothing to compare against.');

  const candidates = candidatesFor(flow, templates);
  if (candidates.length === 0) return out('This flow has no approved messages in the Library right now.');

  const advice = await adviseNextNudge({
    label: shortLabel(customer.name, customer.waId),
    stateLabel: STATE_LABELS[customer.state as CustomerState] ?? customer.state,
    lang: customer.lang,
    quietSummary: quietSummary(customer, now),
    queuedKey,
    queuedTitle: queued.title,
    queuedBody: queued.body,
    candidates,
    transcript: buildTranscript(messages),
  });
  if ('error' in advice) return out(advice.error);

  const resolved = resolveRecommendation(advice, queuedKey, candidates);
  const name = greetingName(customer);

  await store.audit('nudge_advice', 'advised', {
    customerId: customer.id,
    jobId: job.id,
    queuedKey,
    recommendedKey: advice.recommendedKey,
    changesQueued: resolved.changesQueued,
    confidence: advice.confidence,
    hasDraft: Boolean(advice.draft),
  }).catch(() => { /* advice is still valid if the audit write fails */ });

  return {
    jobId: job.id,
    advice: {
      ...advice,
      recommendedTitle: resolved.candidate?.title ?? null,
      // Substituted the same way the scheduler substitutes, so the preview of
      // the alternative is directly comparable to the preview of the queued
      // one on the row above it.
      recommendedBody: resolved.candidate ? resolved.candidate.body.replace(/\{\{1\}\}/g, name) : null,
      changesQueued: resolved.changesQueued,
    },
  };
}

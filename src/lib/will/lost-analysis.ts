// ============================================================
// The evidence Will reads about a closed lead (Jo, 25 Oct).
//
// The nightly Lost Leads post-mortem lived here until 25 Oct; the report and
// its tab were retired and the automatic win-back (winback-auto.ts) took its
// place. What remains is the part it needs: the whole conversation, redacted,
// with the state history and the timing written out in words.
// ============================================================
import { getStore, CustomerRow } from './store';
import { STATE_LABELS } from './state-machine';
import type { LostLeadEvidence } from './claude';
import { leadTiming, lostVerdict, TRIGGER_LABELS, LeadTiming } from './lost-leads';
import { redactSensitive, shortLabel } from './digest';

/** Messages of the conversation handed to the model. Enough for the whole of a
 *  normal lead conversation; a pathological thread is trimmed from the start,
 *  keeping the end, because the end is where they left. */
const MAX_TRANSCRIPT_MESSAGES = 60;

const AUTHOR_LABEL: Record<string, string> = {
  CUSTOMER: 'Customer', AI: 'Will', HUMAN: 'Team', SYSTEM: 'System',
};

/** The timing paragraph the model reads. Written out in words because the
 *  gap between the price and the silence is usually the entire story, and a
 *  raw number in a JSON blob does not read as one. */
export function timingSummary(t: LeadTiming): string {
  const lines: string[] = [];
  if (!t.priceSentAt) {
    lines.push('No price was ever sent to this lead.');
  } else if (t.repliesAfterPrice === 0) {
    lines.push(`The price was sent on ${t.priceSentAt}. The customer never sent another message after it.`);
  } else {
    const hrs = t.hoursPriceToSilence;
    const gap = hrs == null ? 'an unknown time'
      : hrs < 1 ? 'under an hour'
      : hrs < 48 ? `about ${Math.round(hrs)} hours`
      : `about ${Math.round(hrs / 24)} days`;
    lines.push(`The price was sent on ${t.priceSentAt}. The customer replied ${t.repliesAfterPrice} time(s) after it, and their last message came ${gap} after the price.`);
  }
  lines.push(`Their last message was ${t.lastCustomerMsgAt ?? 'never — they never sent one'}, which is ${t.quietDays} day(s) of silence.`);
  lines.push(`We sent ${t.ourMessagesAfterTheirLastWord} message(s) after their last word.`);
  return lines.join('\n');
}

/** Everything the model is allowed to see about one lost lead. The conversation
 *  is redacted first: this text is stored in the report for months, and there
 *  is no reason a post-mortem needs a TFN or a bank account in it. */
export async function buildEvidence(c: CustomerRow, now: Date): Promise<{ evidence: LostLeadEvidence; timing: LeadTiming }> {
  const store = getStore();
  const [messages, history] = await Promise.all([
    store.listMessages(c.id).catch(() => []),
    store.history(c.id).catch(() => []),
  ]);

  const timing = leadTiming(c, messages, history, now);

  // Only what the customer actually experienced. A discarded draft, a
  // guard-blocked reply or a failed send was never part of the conversation
  // and would make the post-mortem describe messages nobody received.
  const real = messages
    .filter((m) => m.status === 'SENT')
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
    .slice(-MAX_TRANSCRIPT_MESSAGES);

  const transcript = real.map((m) => {
    const who = AUTHOR_LABEL[m.author] ?? (m.direction === 'IN' ? 'Customer' : 'Us');
    const media = m.meta?.media ? ` [sent a ${m.meta.media.kind}]` : '';
    return `[${m.createdAt}] ${who}: ${redactSensitive(m.body ?? '')}${media}`;
  }).join('\n');

  const stateHistory = [...history]
    .sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1))
    .map((h) => `[${h.createdAt}] ${h.from ?? 'start'} -> ${h.to} (by ${h.causedBy})`)
    .join('\n');

  const verdict = lostVerdict(c, now);

  return {
    timing,
    evidence: {
      label: shortLabel(c.name, c.waId),
      stateLabel: STATE_LABELS[c.state] ?? c.state,
      lostBecause: `${verdict.trigger ? TRIGGER_LABELS[verdict.trigger] : 'unknown'} — ${verdict.why}`,
      income: c.income,
      lang: c.lang,
      timingSummary: timingSummary(timing),
      transcript,
      stateHistory,
    },
  };
}

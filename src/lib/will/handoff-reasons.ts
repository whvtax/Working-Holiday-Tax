// ============================================================
// What a handoff reason actually MEANS, and what would stop it happening again.
//
// THE TWO SENTENCES (Jo, 27 Aug)
//   The Decision Log answers one question: why could Will not deal with this
//   himself? He asked for exactly two lines per handoff and nothing else:
//
//     The customer wrote "…" and because <because>, Will passed it to you.
//     To stop this happening again: <prevent>
//
//   So every reason here carries two short strings written to drop straight
//   into those sentences:
//
//     `because` — a clause, lower case, no full stop, that completes
//                 "…and because ___, Will passed it to you."
//     `prevent` — one imperative sentence. Concrete: add the answer to the
//                 Library, raise the budget, check WhatsApp Manager. When the
//                 honest answer is "nothing, and it should not change", it says
//                 that instead of inventing a chore.
//
//   `label` survives as the short name of the kind of handoff. `meaning` and
//   `remedy` — the long-form pair written for the Insights card — went with
//   that card on 27 Aug; nothing rendered them any more.
//
// The strings matched here are the reason text written where the task is
// raised (service.ts, engine.ts, scheduler.ts, actions/route.ts). Matching is
// on a PREFIX, which is what survives the report route's truncation of the
// reason to 60 characters.
// ============================================================

export type HandoffKind =
  | 'guard'        // Will wrote something, a policy rule refused it
  | 'unreadable'   // WhatsApp delivered something Will cannot read
  | 'policy'       // a deliberate rule that hands the chat to a person
  | 'delivery'     // WhatsApp/Meta refused the send
  | 'capacity'     // a budget or limit stopped Will
  | 'system'       // housekeeping, no customer waiting
  | 'other';

export interface HandoffExplanation {
  kind: HandoffKind;
  /** Short name for this kind of handoff. */
  label: string;
  /** A clause completing "…and because ___, Will passed it to you."
   *  Lower case, no trailing full stop. */
  because: string;
  /** One imperative sentence: what would stop it happening again. Says
   *  "nothing to change" outright when that is the truthful answer. */
  prevent: string;
}

interface Rule { match: RegExp; kind: HandoffKind; label: string; because: string; prevent: string }

const RULES: Rule[] = [
  {
    match: /^Policy Guard blocked reply|^Autopilot reply blocked before sending|^Follow-up blocked by Policy Guard|^Draft became invalid before approval/i,
    kind: 'guard',
    label: 'A rule refused Will’s message',
    because: 'Will had an answer ready and one of the hard rules refused to let it go out',
    prevent: 'Open the Rules tab and find the rule named in the task. If it stopped something genuinely unsafe, this is the guard working and there is nothing to change. If it stopped a perfectly safe message, the rule is too broad and needs narrowing.',
  },
  {
    match: /^Customer sent an attachment Will cannot read/i,
    kind: 'unreadable',
    label: 'A file Will cannot read',
    because: 'they sent a photo or a document, and Will only reads text',
    prevent: 'Nothing to add to the Library — there is no question to answer until a person opens the file. Asking for documents through the form instead of WhatsApp is what actually reduces this.',
  },
  {
    match: /^Customer sent a message Will cannot read/i,
    kind: 'unreadable',
    label: 'A voice note or sticker',
    because: 'they sent a voice note or another message with no text in it',
    prevent: 'Nothing to add to the Library — a template cannot answer a voice note. This is the cost of customers who would rather talk than type.',
  },
  {
    match: /^Customer asked whether they are talking to a bot/i,
    kind: 'policy',
    label: '“Am I talking to a bot?”',
    because: 'they asked whether they are talking to a bot, and Will is never allowed to answer that',
    prevent: 'Nothing to change — this one is a rule doing its job. It only matters if it happens to a large share of your leads, which would say something about how Will’s replies read.',
  },
  {
    match: /^Customer sent \d+ messages before paying|messages before paying/i,
    kind: 'policy',
    label: 'Several messages before paying',
    because: 'they wrote several times before paying, which is the point where the rules ask for a person',
    prevent: 'Nothing to add to the Library — they already got answers. If this is high, the earlier replies are not landing, and the conversations themselves are where to look.',
  },
  {
    match: /^An existing chat sent a message|^A previous customer messaged again/i,
    kind: 'policy',
    label: 'A returning customer',
    because: 'they are an existing or previously closed chat, and Will only handles brand-new leads',
    prevent: 'Nothing to change while Will is set to new leads only. Moving this number means changing that policy — a decision, not a template.',
  },
  {
    match: /^WhatsApp send failed/i,
    kind: 'delivery',
    label: 'WhatsApp refused the send',
    because: 'WhatsApp itself refused to deliver the message, so they received nothing at all',
    prevent: 'Check the WhatsApp connection in the header and the template’s approval in WhatsApp Manager. This is the most urgent kind on this list — a customer was left with no reply.',
  },
  {
    match: /^Daily AI limit reached/i,
    kind: 'capacity',
    label: 'Daily AI limit reached',
    because: 'the day’s AI budget was already spent, so Will stopped deciding',
    prevent: 'Raise the daily AI budget if this is real traffic. If it runs out on a quiet day, something is calling the model far more often than the conversations justify.',
  },
  {
    match: /^Draft is stale/i,
    kind: 'guard',
    label: 'The draft went stale',
    because: 'the draft assumed a stage they had already moved past by the time it was approved',
    prevent: 'Approve drafts sooner, or switch the stages you trust to Autopilot. Holding it was correct — nobody was told something untrue.',
  },
  {
    match: /^Customer sent proof of payment/i,
    kind: 'system',
    label: 'Payment proof arrived',
    because: 'they sent a payment screenshot, and money always gets a person’s eyes on it',
    prevent: 'Nothing to change — this is Will doing exactly what it should.',
  },
  {
    match: /^Nightly consistency check/i,
    kind: 'system',
    label: 'Nightly check found something',
    because: 'the nightly check found a customer whose paid flag and pipeline stage disagree',
    prevent: 'Open the customers it named and correct the stage. If it keeps happening, a stage is being set somewhere without the matching paid flag.',
  },
  {
    match: /^Model proposed invalid transition/i,
    kind: 'guard',
    label: 'An impossible stage move',
    because: 'Will wanted to move them to a stage they cannot reach from where they are',
    prevent: 'Check whether the customer really is where the pipeline says. If the move was reasonable, the allowed stage transitions are too strict for how the conversation actually goes.',
  },
];

const FALLBACK: HandoffExplanation = {
  kind: 'other',
  label: 'A question Will had no answer for',
  because: 'Will had no approved answer for what they asked',
  prevent: 'Open the chat and read what they asked. If the same question keeps coming back, add it — with the answer you would give — to the Library, and Will will handle it himself next time.',
};

/** Classify one grouped reason string from the report. Never throws. */
export function explainHandoffReason(reason: string): HandoffExplanation {
  const r = (reason ?? '').trim();
  for (const rule of RULES) {
    if (rule.match.test(r)) {
      return { kind: rule.kind, label: rule.label, because: rule.because, prevent: rule.prevent };
    }
  }
  return FALLBACK;
}

/** True when adding an answer to the Library is genuinely the right fix.
 *  Exactly one bucket qualifies: an unclassified handoff, which is almost
 *  always a customer question nobody has written an answer for yet. Everything
 *  else on this list is a file, a rule, an outage or a budget — none of which a
 *  template can touch. */
export function isTemplateShaped(reason: string): boolean {
  return explainHandoffReason(reason).kind === 'other';
}

// ============================================================
// What a handoff reason actually MEANS, and what would actually change it.
//
// The Insights card that lists these used to be headed "recurring reasons, each
// one is a template you could add". That framing was wrong, and wrong in a way
// that wastes the owner's time: a template does not fix "the customer sent a
// voice note", and it does not fix "the policy guard refused Will's wording".
// Only one of these reasons — a recurring question Will had no approved answer
// for — is a template-shaped problem.
//
// The counts themselves are worth keeping. "The guard blocked Will 85 times"
// means the assistant is being muzzled 85 times, which is a real finding about
// the system, not noise. So the card stays and the promise changes: each reason
// says what it means and what would move the number.
//
// The strings matched here are the reason text written where the task is
// raised (service.ts, engine.ts, scheduler.ts, actions/route.ts). The report
// route groups by `reason.replace(/:.*$/, '').slice(0, 60)`, so matching on a
// prefix is what survives that truncation.
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
  /** Plain-language label for the reason itself. */
  label: string;
  /** What this count is actually telling you. */
  meaning: string;
  /** What would actually reduce it. Honest: sometimes the answer is "nothing,
   *  and it should not be reduced". */
  remedy: string;
}

interface Rule { match: RegExp; kind: HandoffKind; label: string; meaning: string; remedy: string }

const RULES: Rule[] = [
  {
    match: /^Policy Guard blocked reply|^Autopilot reply blocked before sending|^Follow-up blocked by Policy Guard|^Draft became invalid before approval/i,
    kind: 'guard',
    label: 'The policy guard refused Will’s message',
    meaning: 'Will had an answer ready and a hard rule stopped it going out — a price it was not allowed to state, a refund figure, a myGov instruction, a message outside the 24h window. The customer was answered by a person instead.',
    remedy: 'Read the Decision Log entries marked "guard blocked" to see WHICH rule fired. A rule firing on genuinely unsafe text is the guard working. The same rule firing on a safe message means the guard is too broad and belongs in a code change, not a new template.',
  },
  {
    match: /^Customer sent an attachment Will cannot read/i,
    kind: 'unreadable',
    label: 'Customer sent a file Will cannot read',
    meaning: 'A photo, PDF or document arrived. Will reads text; it only interprets an image when it is a payment screenshot on an unpaid customer. Everything else waits for a person to open it.',
    remedy: 'No template fixes this — there is no question to answer until someone looks at the file. It shrinks only by teaching Will to read more attachment types, or by asking for documents in a form rather than over WhatsApp.',
  },
  {
    match: /^Customer sent a message Will cannot read/i,
    kind: 'unreadable',
    label: 'Voice note or unsupported message type',
    meaning: 'A voice note, a sticker, a location, or a message type with no text body. There is nothing for Will to reason about, so the chat goes to a person immediately.',
    remedy: 'A template cannot answer a voice note. Transcription would be the actual fix; until then this number is the cost of customers who prefer talking to typing.',
  },
  {
    match: /^Customer asked whether they are talking to a bot/i,
    kind: 'policy',
    label: '"Am I talking to a bot?"',
    meaning: 'A deliberate rule, not a failure: Will never answers this, in any mode, and never even drafts an answer. The chat is handed over and Will steps out of it.',
    remedy: 'Nothing to fix. This number going up is the rule working. It only matters if it is a large share of your leads, which would be a signal about how Will’s replies read.',
  },
  {
    match: /^Customer sent \d+ messages before paying|messages before paying/i,
    kind: 'policy',
    label: 'More than 3 messages before paying',
    meaning: 'A deliberate rule: by the fourth message before any money has changed hands, the conversation itself is the signal that this lead wants a person.',
    remedy: 'Not a template problem — these leads already got answers. If it is high, the earlier messages are not landing; the Deep Analysis card and the actual transcripts are where to look, not the Library.',
  },
  {
    match: /^An existing chat sent a message|^A previous customer messaged again/i,
    kind: 'policy',
    label: 'A returning or pre-existing chat wrote in',
    meaning: 'Another deliberate rule: Will only handles brand-new leads. Anyone imported, or previously closed, is routed straight to a person and Will is paused for that chat.',
    remedy: 'Nothing to fix while the new-chats-only policy stands. Changing this number means changing that policy, which is a decision, not a template.',
  },
  {
    match: /^WhatsApp send failed/i,
    kind: 'delivery',
    label: 'WhatsApp refused the send',
    meaning: 'The message existed and Meta rejected it — an expired token, a number outside the 24h window, a template not approved in WhatsApp Manager. The customer received nothing.',
    remedy: 'This is infrastructure, and the most urgent kind on this list: a customer was left unanswered. Check the WhatsApp connection status in the header and the failing template’s approval in WhatsApp Manager.',
  },
  {
    match: /^Daily AI limit reached/i,
    kind: 'capacity',
    label: 'Daily AI limit reached',
    meaning: 'The daily cap on paid model calls was spent, so Will stopped deciding and handed the rest of the day’s conversations to a person.',
    remedy: 'Raise the ai_daily_budget setting if this is real traffic. If it is hit on a quiet day, something is calling the model far more than the conversations justify.',
  },
  {
    match: /^Draft is stale/i,
    kind: 'guard',
    label: 'Draft went stale before approval',
    meaning: 'A draft assumed a stage the customer had already moved past by the time it was approved. It was held rather than sent, so nobody was told something untrue.',
    remedy: 'Mostly a symptom of drafts waiting a long time for approval. Approving sooner, or Autopilot for the stages you trust, is what shrinks this.',
  },
  {
    match: /^Customer sent proof of payment/i,
    kind: 'system',
    label: 'Payment proof arrived',
    meaning: 'Not a problem: a payment screenshot was recognised. In Approval mode a "payment received" reply is drafted and waiting; in Autopilot the stage already moved and this is a heads-up.',
    remedy: 'Nothing to fix. This is Will doing exactly what it should.',
  },
  {
    match: /^Nightly consistency check/i,
    kind: 'system',
    label: 'Nightly consistency check found something',
    meaning: 'Housekeeping found a customer whose paid flag and pipeline stage disagree. No customer is waiting on it.',
    remedy: 'Open the named customers and correct the stage. Recurring hits mean a stage is being set somewhere without the matching flag.',
  },
  {
    match: /^Model proposed invalid transition/i,
    kind: 'guard',
    label: 'Will proposed an impossible stage move',
    meaning: 'Will wanted to move the customer somewhere the state machine does not allow from where they are, so the reply that assumed it was held back.',
    remedy: 'Not a template. Either the customer really is somewhere unexpected, or the allowed transitions are too strict for how the conversation actually goes.',
  },
];

const FALLBACK: HandoffExplanation = {
  kind: 'other',
  label: 'Other handoff',
  meaning: 'Will stepped out of the conversation and asked for a person.',
  remedy: 'Open one of these tasks to see the conversation behind it — if the same customer QUESTION keeps appearing, that one genuinely is worth an approved answer in the Library.',
};

/** Classify one grouped reason string from the report. Never throws. */
export function explainHandoffReason(reason: string): HandoffExplanation {
  const r = (reason ?? '').trim();
  for (const rule of RULES) {
    if (rule.match.test(r)) {
      return { kind: rule.kind, label: rule.label, meaning: rule.meaning, remedy: rule.remedy };
    }
  }
  return FALLBACK;
}

/** True when a template in the Library is genuinely the right remedy. Exactly
 *  one bucket qualifies — which is the whole point of the re-framing. */
export function isTemplateShaped(reason: string): boolean {
  return explainHandoffReason(reason).kind === 'other';
}

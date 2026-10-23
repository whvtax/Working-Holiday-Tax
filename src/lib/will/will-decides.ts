// ============================================================
// WILL DECIDES (Jo, 22 Oct).
//
// Until now about ten places in the code answered a message by its WORDS,
// before Will read the conversation: the thank-you line, the instant price,
// "I'll do it later", "when is there no refund", the account name, the start
// of the residency questions. Each was built to fix a real problem (speed,
// exact wording, cost) and each misfired on a phrasing nobody had seen:
// Nicole's first message got "You're very welcome", Sydney's freelance UGC got
// the TFN price, Eimi's goodbye got a thank-you line.
//
// In 'will' mode every message reaches Will. Will reads the whole chat and
// decides; when one of the approved messages below is the right answer he
// names it (approved_key) and the CODE sends Jo's exact wording, in the
// customer's language. The hard rules (Policy Guard, myGov, prices, the
// guarantee, payment wording, "are you a bot") stay in the code exactly as
// before. 'will' is the default (Jo, 22 Oct: "there is a switch, so no
// risk"); 'legacy' is the old behaviour, untouched, one click away (Rules).
// ============================================================
import type { CustomerState } from './state-machine';
import { thanksReply } from './text-normalize';
import { laterPlanReply } from './later-plan';
import { noRefundCasesMessage, referralMessage, documentsReceivedMessage } from './i18n';
import { refundNotYetMessage, reviewLinkFor } from './review-asks';
import { accountNameMessage, isAccountNameQuestion } from './account-name';
import { detectChoice, priceMessageFor, firstContactPriceMessage, priceMessageIn, hasPriceIn } from './instant-choice';
import { quizIntro, quizLang } from './residency-quiz';

export type DecisionMode = 'legacy' | 'will';
export const DECISION_MODE_KEY = 'decision_mode';
export function resolveDecisionMode(v: unknown): DecisionMode {
  return v === 'legacy' ? 'legacy' : 'will';
}

export const APPROVED_KEYS = [
  'thanks', 'later_plan', 'no_refund_cases', 'account_name',
  'price_tfn', 'price_tfn_abn', 'residency_quiz_start',
  'refund_not_yet', 'referral', 'documents_received', 'review_link',
] as const;
export type ApprovedKey = typeof APPROVED_KEYS[number];
export function isApprovedKey(v: unknown): v is ApprovedKey {
  return typeof v === 'string' && (APPROVED_KEYS as readonly string[]).includes(v);
}

/** What Will is told about the keys (only in 'will' mode). */
export const WILL_DECIDES_PROMPT = `# YOU DECIDE, THE SYSTEM SENDS THE EXACT WORDING (Jo, 22 Oct)
Every message reaches you; nothing has been answered for you. Read the WHOLE conversation first: who this is, what we last said, what they are doing now (thanking, asking, choosing, declining, reporting, doubting). Then decide within the rules above.
When one of these approved messages is exactly the right reply, set approved_key and the system sends Jo's exact wording in the customer's language (still write your reply_text too; it is the fallback):
- thanks: the message is ONLY a thank-you for something we did. Never for a first message, a request, a goodbye that says they are going elsewhere, or a thank-you with anything else in it.
- later_plan: they say they will do the form or the payment later ("after work", "tonight"), with nothing else to answer.
- no_refund_cases: they ask in what cases there is no refund / what "no refund" means.
- account_name: they ask what name to put on the bank transfer.
- price_tfn: they clearly chose the TFN option (wages only) and nothing in the chat mentions other income (freelance, UGC, side work, cash, ABN). Set new_state PRICE_SENT.
- price_tfn_abn: they have ABN income (Uber, delivery, contracting, any ABN). Set new_state PRICE_SENT.
- residency_quiz_start: our last message was the residency double-check and they ask or are unsure about it. Not when they confirm it is correct.
- refund_not_yet: after lodgement, we asked whether the refund has arrived and they say not yet. (The system re-checks with them a few days later.)
- referral: after lodgement, they answered our Google review request positively ("done", "sure", 👍). Once only.
- review_link: they ask for the link to leave us a review (or say they want to leave one). The system sends a thank-you with our Google review link.
- documents_received: a paid customer sent files (shown as [Photo] / [Document] lines) and there is nothing else to answer. Never twice for the same batch.
CLOSING A LEAD YOURSELF: when a lead clearly says they are not interested, are going with someone else, already did it themselves, or tells us not to write: answer per the rules (one friendly line, no persuasion unless the comparing-providers rule applies) and set new_state NOT_INTERESTED; nothing will chase them after that. Someone pitching US a service (an agency, a collaboration, sponsorship): action wait and new_state NOT_RELEVANT, no reply.
Anything else: write the reply yourself from the rules and the Library, wait, or hand it to the team. A message the system already answered (our automatic confirmation right above it covers everything they said) is a wait.`;

export interface RenderCtx {
  state: CustomerState;
  lang: string | null | undefined;
  firstName: string | null | undefined;
  firstContact: boolean;
  lastWillText: string;
  foreign: boolean;
}

/** Jo's exact wording for the key, or null when there is no exact version for
 *  this customer (then Will's own reply_text goes, through the guard as usual). */
export function renderApproved(key: ApprovedKey, c: RenderCtx): string | null {
  const lang = (c.lang ?? 'en').toLowerCase().slice(0, 2);
  switch (key) {
    case 'thanks': return thanksReply(c.lastWillText, lang);
    case 'later_plan': return laterPlanReply(c.state, lang);
    case 'no_refund_cases': return noRefundCasesMessage(lang);
    case 'account_name': return accountNameMessage(lang);
    case 'price_tfn':
    case 'price_tfn_abn': {
      const track = key === 'price_tfn' ? 'TFN' : 'TFN_ABN';
      if (hasPriceIn(lang)) return c.foreign ? null : priceMessageIn(lang, track, c.firstContact, c.firstName);
      if (lang !== 'en') return null;
      return c.firstContact ? firstContactPriceMessage(track, c.firstName, c.foreign) : priceMessageFor(track, c.foreign);
    }
    case 'residency_quiz_start': return quizIntro(quizLang(lang));
    case 'refund_not_yet': return refundNotYetMessage(lang);
    case 'referral': return referralMessage(lang);
    case 'documents_received': return documentsReceivedMessage(lang);
    case 'review_link': return reviewLinkMessage(lang, reviewLinkFor(process.env.GOOGLE_PLACE_ID));
    default: return null;
  }
}

/** Jo, 23 Oct (+44 7472): "Is there a link I can leave you a review?" went
 *  to a person. The answer is fixed: thanks, and the link. */
export function reviewLinkMessage(lang: string, link: string): string {
  if (lang === 'de') return `Vielen Dank, das bedeutet uns wirklich viel! 😊 Hier ist der Link: ${link}`;
  if (lang === 'ja') return `ありがとうございます、とても嬉しいです！😊 こちらからお願いします：${link}`;
  return `Thank you so much, that means a lot to us! 😊 Here's the link: ${link}`;
}

/** Messages that must not wait for the 1-5 minute timer: they are standing at
 *  the bank, or they just chose. The words only decide WHEN Will is asked;
 *  what is said is still Will's decision. */
export function isFastLane(text: string, lastWillText: string | null | undefined): boolean {
  return isAccountNameQuestion(text) || detectChoice(text, lastWillText) !== null;
}


// ============================================================
// THE LANGUAGE THE CUSTOMER ACTUALLY WRITES IN (Jo, 30 Oct).
//
// 410 real chats: about 50 follow-ups, confirmations and winbacks went out in
// English to Japanese, German, French and Italian customers. Two causes:
//
//   1. customer.lang stayed 'en' (or null). The website form opens WhatsApp
//      with the English text "Hi! I've just sent through my form", and
//      detectLanguage read that as a confident English message that
//      "reclaims" the chat, so a German customer was flipped back to English
//      by the form itself.
//   2. A system message with no template in the customer's language fell back
//      to the ENGLISH template (outside the 24h window) or to an English body
//      sent as free text (inside it).
//
// This module fixes the first cause (pure functions, plus one store helper)
// and gives channel.ts the checks it needs for the second. It imports only
// i18n.ts and types, so anything may use it without an import cycle.
// ============================================================
import { detectLanguage, unsupportedScript, followUpMessage, LANGS, type Lang } from './i18n';
import type { MessageRow, Store } from './store';

/** The WhatsApp text the website form pre-fills (FormClient.tsx), in the
 *  shapes people leave it in. It is OUR English text, typed by a button, not
 *  the customer's language, so it never counts as a language signal. */
const FORM_AUTO_TEXT = /^\s*(?:hi!?\s*)?i['’]?ve just (?:sent|submitted) (?:through )?(?:my|the|our) (?:tax )?(?:form|questionnaire)(?:[\s!.]|\p{Extended_Pictographic}|\uFE0F)*$/iu;
export function isFormAutoText(text: string | null | undefined): boolean {
  const t = (text ?? '').trim();
  return t.length > 0 && t.length <= 80 && FORM_AUTO_TEXT.test(t);
}

/** How many of the customer's latest own messages are read. */
export const LANG_WINDOW = 4;

/** Languages that have a Meta template variant (or a Library variant) for
 *  the system messages: the same set metaTemplateLang() maps to. */
export const TEMPLATE_VARIANT_LANGS: readonly string[] = ['en', 'de', 'ja'];

type MsgLike = Pick<MessageRow, 'direction' | 'author' | 'body'> & { meta?: MessageRow['meta'] };

export interface ResolvedLanguage {
  /** A supported language, or null when the messages say nothing clear. */
  lang: Lang | null;
  /** Chinese / Vietnamese in the latest messages: no fixed wording exists. */
  unsupported: 'zh' | 'vi' | null;
}

function customerWords(messages: readonly MsgLike[]): string[] {
  return messages
    .filter((m) => m.direction === 'IN' && (m.author === 'CUSTOMER' || m.author == null) && !m.meta?.media && !m.meta?.reaction)
    .map((m) => (m.body ?? '').trim())
    .filter((b) => b.length > 0 && !isFormAutoText(b));
}

/**
 * Pure. The language the customer writes in, read from their last few own
 * messages (messages in chronological order). Each message votes when its read
 * is clear (Japanese script, two distinctive hits, or one distinctive hit for
 * a non English language with nothing competing); the language with most votes
 * wins and a tie goes to the most recent. No clear vote leaves `current`.
 */
export function resolveLanguage(messages: readonly MsgLike[], current?: string | null): ResolvedLanguage {
  const words = customerWords(messages).slice(-LANG_WINDOW);
  const unsupported = words.length ? unsupportedScript(words[words.length - 1]) ?? null : null;
  const votes = new Map<Lang, { n: number; last: number }>();
  words.forEach((w, i) => {
    const d = detectLanguage(w);
    if (!d.lang) return;
    // Same rule as the live path (service.ts): SETTING a language takes one
    // clear foreign signal, SWITCHING one takes a confident read, so a lone
    // "Danke!" in an English chat moves nothing.
    const hasCurrent = !!current && (LANGS as readonly string[]).includes(current);
    const clear = d.confident || (!hasCurrent && d.lang !== 'en' && d.enoughToSet === true);
    if (!clear) return;
    const v = votes.get(d.lang) ?? { n: 0, last: -1 };
    votes.set(d.lang, { n: v.n + 1, last: i });
  });
  let best: Lang | null = null;
  for (const [lang, v] of votes) {
    const b = best ? votes.get(best)! : null;
    if (!b || v.n > b.n || (v.n === b.n && (lang === current || (best !== current && v.last > b.last)))) best = lang;
  }
  if (best) return { lang: best, unsupported };
  const cur = current && (LANGS as readonly string[]).includes(current) ? (current as Lang) : null;
  return { lang: cur, unsupported };
}

/** Languages recognised by SCRIPT alone, for which no fixed wording exists. */
export type OtherLang = 'ko' | 'th' | 'ar' | 'ru' | 'hi' | 'he';
const OTHER_SCRIPTS: ReadonlyArray<readonly [OtherLang, RegExp]> = [
  ['ko', /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/],
  ['th', /[\u0e00-\u0e7f]/],
  ['ar', /[\u0600-\u06ff\u0750-\u077f]/],
  ['ru', /[\u0400-\u04ff]/],
  ['hi', /[\u0900-\u097f]/],
  ['he', /[\u0590-\u05ff]/],
];
/** Pure. The script-only language of one text (Hangul = Korean ...), or null.
 *  Kana means Japanese and wins, so a Japanese message is never read as this. */
export function otherScript(text: string | null | undefined): OtherLang | null {
  const t = text ?? '';
  if (/[\u3040-\u30ff]/.test(t)) return null;
  for (const [lang, re] of OTHER_SCRIPTS) if (re.test(t)) return lang;
  return null;
}
/** Pure. The script language of the customer's LATEST own message, or null. */
export function resolveOtherScript(messages: readonly MsgLike[]): OtherLang | null {
  const words = customerWords(messages);
  return words.length ? otherScript(words[words.length - 1]) : null;
}

/**
 * Read the chat, and when the customer's real language differs from the stored
 * one, persist it. Returns the language to use for everything sent from now on
 * (the stored one when the chat says nothing clear). Never throws.
 */
export async function refreshCustomerLang(
  store: Pick<Store, 'listMessages' | 'updateCustomer' | 'audit'>,
  customer: { id: string; lang: string | null },
): Promise<{ lang: string | null; unsupported: 'zh' | 'vi' | null; changed: boolean }> {
  try {
    const msgs = await store.listMessages(customer.id);
    // 3 Nov: a Korean (or Thai, Arabic, Russian ...) customer was left at 'en',
    // so every system text went out in English. Their script is stored as the
    // language; nothing is written in it (hasTemplateVariant is false for it),
    // so the existing guards refuse English and the send becomes a task.
    const other = resolveOtherScript(msgs);
    if (other && other !== customer.lang) {
      await store.updateCustomer(customer.id, { lang: other });
      await store.audit('system', 'language_set', { customerId: customer.id, from: customer.lang, to: other, source: 'script' }).catch(() => undefined);
      return { lang: other, unsupported: null, changed: true };
    }
    const r = resolveLanguage(msgs, customer.lang);
    if (r.lang && r.lang !== customer.lang) {
      await store.updateCustomer(customer.id, { lang: r.lang });
      await store.audit('system', 'language_set', { customerId: customer.id, from: customer.lang, to: r.lang, source: 'last_customer_messages' }).catch(() => undefined);
      return { lang: r.lang, unsupported: r.unsupported, changed: true };
    }
    return { lang: customer.lang, unsupported: r.unsupported, changed: false };
  } catch {
    return { lang: customer.lang, unsupported: null, changed: false };
  }
}

/** True when `lang` has its own template / Library wording for system messages
 *  (English, German, Japanese). For everything else the only Meta template
 *  that exists is English, which must not be sent to them. */
export function hasTemplateVariant(lang: string | null | undefined): boolean {
  return !lang || TEMPLATE_VARIANT_LANGS.includes(lang);
}

/** True for a body that is plainly English (two distinctive English words and
 *  a lead over every other language). Used only to stop an English body being
 *  sent as free text to someone who writes in another language. */
export function bodyLooksEnglish(body: string | null | undefined): boolean {
  const d = detectLanguage(body ?? '');
  return d.lang === 'en' && d.confident;
}

/** Why a system send must not go to this customer in this body, or null.
 *  `lang` is the customer's language; `unsupported` Chinese / Vietnamese. */
export function englishToForeignReason(
  lang: string | null | undefined,
  unsupported: 'zh' | 'vi' | null,
  body: string | null | undefined,
): string | null {
  if (unsupported) return `the customer writes in ${unsupported === 'zh' ? 'Chinese' : 'Vietnamese'} and no fixed wording exists in that language`;
  if (lang && lang !== 'en' && bodyLooksEnglish(body)) return `the customer writes in ${lang} and this text is English`;
  return null;
}

// ============================================================
// SCHEDULED FOLLOW-UPS: WHICH TEXT, WHICH CHANNEL, OR NOTHING (3 Nov)
//
// English follow-up templates (fu_price_sent, fu_form_6h, fu_pre_3d, fu_sig_*)
// reached German, Japanese, French and Korean customers. Two holes remained
// after 30 Oct: a failed approval LOOKUP (null) counted as "approved" for
// German and Japanese (hasTemplateVariant is true for them), so the send went
// out under whatever Meta resolved; and a language without a template simply
// had no path other than skipping silently. planFollowUp is the single
// decision, pure, used by the scheduler before it sends anything.
// ============================================================

/** Free text reaches a customer only while Meta's 24h service window is open. */
export const SERVICE_WINDOW_MS = 24 * 60 * 60 * 1000;
export function insideServiceWindow(lastCustomerMsgAt: string | Date | null | undefined, now: number = Date.now()): boolean {
  if (!lastCustomerMsgAt) return false;
  const t = new Date(lastCustomerMsgAt).getTime();
  return Number.isFinite(t) && now - t < SERVICE_WINDOW_MS;
}

/** How many times an unknown approval lookup is retried (2 hours apart) before the step is given up. */
export const LOOKUP_DEFER_LIMIT = 3;

export type FollowUpPlan =
  /** Send the Meta template `name` in the customer's language. `body` is the text for the CRM record. */
  | { action: 'template'; name: string; body: string }
  /** Send `body` (already in the customer's language) as free text, no template. Window is open. */
  | { action: 'text'; body: string }
  /** Meta's answer is unknown: run the step again in two hours. */
  | { action: 'defer'; reason: string }
  /** Send nothing. `task` true: a paid customer is waiting, open ONE task for the team. */
  | { action: 'skip'; reason: string; task: boolean };

export interface FollowUpPlanInput {
  /** Library key of the step, e.g. fu_form_6h (never the _de / _ja name). */
  templateKey: string;
  /** The Meta template name that would be sent (fu_price_sent_de for that nudge). */
  sendName: string;
  lang: string | null | undefined;
  unsupported?: 'zh' | 'vi' | null;
  /** templateApprovedFor(sendName, lang): true, false, or null when unknown. */
  approved: boolean | null;
  insideWindow: boolean;
  /** form and signature flows: the customer has paid and is waiting on us. */
  paidFlow: boolean;
  /** Body of the Library template (English). Only used for the CRM record of an approved template. */
  libraryBody: string;
  /** How many times this step was already deferred for an unknown lookup. */
  lookupDefers?: number;
}

export function planFollowUp(i: FollowUpPlanInput): FollowUpPlan {
  const lang = i.lang || 'en';
  const skip = (reason: string): FollowUpPlan => ({ action: 'skip', reason, task: i.paidFlow });
  if (i.unsupported) return skip(`the customer writes in ${i.unsupported === 'zh' ? 'Chinese' : 'Vietnamese'} and no fixed wording exists`);
  const local = followUpMessage(i.templateKey, lang);
  if (lang === 'en') {
    // English customers: unchanged. An English template Meta says is missing is not sent.
    if (i.approved === false) return skip(`template ${i.sendName} is not approved in English`);
    return { action: 'template', name: i.sendName, body: i.libraryBody };
  }
  if (i.approved === true) return { action: 'template', name: i.sendName, body: local ?? i.libraryBody };
  // Not approved, or UNKNOWN. Unknown is never approved (the 30 Oct hole).
  if (local && i.insideWindow) return { action: 'text', body: local };
  if (i.approved === null && local && (i.lookupDefers ?? 0) < LOOKUP_DEFER_LIMIT) {
    return { action: 'defer', reason: `could not confirm ${i.sendName} in ${lang} with Meta` };
  }
  return skip(local
    ? `no approved ${lang} template for ${i.sendName} and the 24h window is closed`
    : `no ${lang} wording exists for ${i.templateKey} and no approved ${lang} template`);
}

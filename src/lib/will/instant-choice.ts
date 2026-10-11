// ============================================================
// THE CHOICE IS THE "YES": the price message goes out at once (11 Oct).
//
// Full audit, decision 3: Rochi wrote "TFN" and waited 2.5 hours; Jack wrote
// "Sounds great" and waited two hours. Both were lost in the gap. When the
// customer's message is a clear, short answer to the opening question (or a
// plain yes to the price), nothing needs the model: the approved price
// message for that track is the reply, sent from the code without the
// Autopilot pause. Anything with a question in it, anything long, anything
// about a return already lodged, goes through Will as before.
// ============================================================
import { APPROVED } from './approved-messages';

export type Track = 'TFN' | 'TFN_ABN';

const ABN_RE = /\babn\b|\buber\b|deliver(?:y|oo)|door\s?dash|menulog|contract(?:or|ing)?\b|sole\s?trader|self[- ]?employed|freelanc|invoic|\bboth\b|option\s?2\b|\b2nd\b|second/i;
const NO_ABN_RE = /\b(?:no|not|don'?t have|without|never had|didn'?t have)\s+(?:an?\s+)?abn\b|only\s+(?:worked\s+)?(?:on\s+)?(?:a\s+)?tfn|just\s+(?:a\s+)?tfn|tfn\s+only|option\s?1\b|\b1st\b|\bfirst\b|employers?\s+only|only\s+employers?/i;
const TFN_RE = /\btfn\b|employers?\b|employee|payslips?|cafe|hospitality|farm|casual/i;
const ALREADY_LODGED_RE = /already\s+(?:lodged|filed|submitted|done)|lodged\s+it|filed\s+it|review\b|check\s+my\s+return/i;
const YES_RE = /^(?:(?:yes|yep|yeah|yup|sure|ok(?:ay)?|perfect|great|deal)(?:,?\s*(?:please|thanks|thank you|sure|let'?s do it|go ahead))?|sounds? (?:good|great)|let'?s (?:do it|go)|go ahead|please|i'?m in|i'?d like to (?:go ahead|proceed)|ja|ja gerne|sí|si|oui|sì|sim|はい|お願いします|よろしくお願いします)[\s!.😊👍]*$/i;
/** A TFN number, an ABN number or a phone number in the message: they are
 *  giving us data, not choosing a track (Elsa posted her TFN and got an
 *  invoice sixty seconds later). */
const CARRIES_A_NUMBER_RE = /\b(?:tfn|abn)\s*(?:number|no\.?|#|is|:)|\d{3}\s?\d{3}\s?\d{3}/i;

/** The track this short message picks, or null when it is not a clear
 *  choice. `lastWillLine` is what Will said last, so a bare "yes" counts only
 *  when he just quoted a single price (then it means that one). */
export function detectChoice(text: string, lastWillLine: string | null | undefined): Track | null {
  const t = (text ?? '').trim();
  if (!t || t.length > 90) return null;
  if (/[?？]/.test(t)) return null;
  if (ALREADY_LODGED_RE.test(t)) return null;
  if (CARRIES_A_NUMBER_RE.test(t)) return null;
  if (YES_RE.test(t)) {
    const w = lastWillLine ?? '';
    const abn = /\$\s?385\b/.test(w), tfn = /\$\s?220\b/.test(w);
    if (abn && !tfn) return 'TFN_ABN';
    if (tfn && !abn) return 'TFN';
    return null;
  }
  if (NO_ABN_RE.test(t)) return 'TFN';
  if (ABN_RE.test(t)) return 'TFN_ABN';
  if (TFN_RE.test(t)) return 'TFN';
  return null;
}

/** A direct question about the price: the two prices are the right answer. */
export const PRICE_ASK_RE = /how much|what(?:'s| is| does it) (?:the )?(?:cost|price|fee)|\bcost\b|\bprice\b|\bfees?\b|\bcharge\b|how (?:do|can) i pay|payment details|bank details|wie viel|was kostet|kosten|preis|cu[áa]nto|precio|combien|prix|quanto|prezzo|いくら|料金|費用/i;

export function priceMessageFor(track: Track): string {
  return track === 'TFN_ABN' ? APPROVED.price_tfn_abn : APPROVED.price_tfn;
}

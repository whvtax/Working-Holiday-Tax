// ============================================================
// STAGE SYNC: what the team and the customer say moves the board (11 Oct).
//
// Full audit, decision 8. The stage drove everything (which templates fire,
// whether Will sells, whether "stuck" tasks open), and it drifted whenever a
// person typed the outcome instead of pressing the button: Alex got 45
// "stuck before paying" tasks after the team wrote "payment received" by
// hand; Naatt paid on 21 Sep and was "not paid" on 10 Oct; Johanna, em,
// Pippa and Kana got signature reminders after the team told them it was
// lodged; Abbas got a sales nudge after "Don't write me"; a vendor got four
// sales templates. These helpers read those sentences, deterministically,
// with negation guards, and are pure so they can be tested.
// ============================================================

/** The team told the customer the payment arrived (any wording). */
const TEAM_PAYMENT_RECEIVED = /\b(?:payment|transfer|money|funds|deposit|the \$?\d+)\b[^.!?\n]{0,30}\b(?:received|arrived|came through|has come through|is in|landed|confirmed|went through|gone through)\b|\b(?:received|got|have got|we(?:'ve| have) got|thanks? for)\b[^.!?\n]{0,20}\b(?:your |the )?(?:payment|transfer|money|deposit)\b|zahlung (?:ist )?(?:erhalten|eingegangen|angekommen|da)|お支払い(?:を)?(?:確認|受け取り)|入金(?:を)?確認|pago recibido|hemos recibido (?:tu|el) pago|paiement (?:bien )?reçu|pagamento ricevuto|pagamento recebido/i;
const PAYMENT_NOT_YET = /\b(?:not|n't|no|never|once|when|after|as soon as|until|before|if|haven'?t|hasn'?t|didn'?t|still|yet|waiting|pending|will be|should be|once we|when we)\b[^.!?\n]{0,25}\b(?:received|receive|arrives?|comes? through|payment|transfer)\b|noch nicht|sobald|まだ|届いていま|aún no|todavía no|pas encore|non ancora|ainda não/i;
export function teamConfirmsPayment(text: string): boolean {
  const t = (text || '').trim();
  if (!t || !TEAM_PAYMENT_RECEIVED.test(t)) return false;
  // Judge the sentence that carries the confirmation, not the whole message.
  const sentences = t.split(/(?<=[.!?])\s+|(?<=[。！？])|\n+/);
  return sentences.some((s) => TEAM_PAYMENT_RECEIVED.test(s) && !PAYMENT_NOT_YET.test(s));
}

/** The team told the customer the return has been lodged. */
const TEAM_LODGED = /\b(?:has been|have been|is now|was|been|just|now|successfully|already)\s+(?:lodged|submitted|filed)\b|\b(?:lodged|submitted|filed)\s+(?:your|the|it)\b[^.!?\n]{0,30}|\breturn (?:is|was|has been) (?:lodged|in|submitted|filed)\b|\b(?:lodgement|lodgment) (?:is )?(?:done|complete|confirmed)\b|wurde eingereicht|ist eingereicht|eingereicht\b|提出(?:しました|いたしました|完了)|申告(?:が)?完了|(?:ya )?(?:ha sido |está )?presentad[ao]|a été déposée?|è stata presentata|foi entregue|foi submetid[ao]/i;
const LODGE_NOT_YET = /\b(?:not|n't|no|never|once|when|after|before|until|will be|should be|going to|about to|ready to|can be|cannot|can'?t|haven'?t|hasn'?t|yet|soon|tomorrow|next|if)\b[^.!?\n]{0,25}\b(?:lodged|lodge|submitted|submit|filed|file)\b|noch nicht|sobald|bevor|まだ|これから|aún no|todavía no|pas encore|non ancora|ainda não/i;
export function teamSaysLodged(text: string): boolean {
  const t = (text || '').trim();
  if (!t || !TEAM_LODGED.test(t)) return false;
  const sentences = t.split(/(?<=[.!?])\s+|(?<=[。！？])|\n+/);
  return sentences.some((s) => TEAM_LODGED.test(s) && !LODGE_NOT_YET.test(s));
}

/** The customer closed the door, short of opting out: no templates, no
 *  selling, stage Not Interested. A message with a question, a choice or
 *  more than ~15 words is not this. */
const NOT_INTERESTED = /^(?:no(?:,)? thanks?(?: you)?|no thank you|not interested(?:,? thanks?(?: you)?)?|no longer interested|i'?m (?:good|fine|ok|okay|all set|sorted)|i'?ll pass|we'?re good|all good(?:,)? thanks|leave me alone|stop (?:messaging|texting|writing)(?: me)?|please stop|don'?t (?:write|message|text|contact) me(?: again)?|unsubscribe)[\s!.😊🙏]*$|\b(?:found|went with|going with|gone with|chose|chosen|using|used)\b[^.!?\n]{0,20}\b(?:someone|somebody|something|another|a different|an? (?:cheaper|other)|my (?:friend|accountant|own))\b|(?:already )?(?:lodged|filed|did|done|submitted|sorted) (?:it|them|mine|everything) (?:myself|on my own|already|through myGov|with (?:someone|an accountant))|changed my mind|no longer need|don'?t need (?:it|this|your (?:help|service)) (?:anymore|any more)|\b(?:this|you|it)(?:'s| is| are| seems| looks)? (?:like )?a scam\b|nicht (?:mehr )?interessiert|kein interesse|habe es selbst gemacht|no me interesa|ya no (?:lo )?necesito|lo hice yo|pas intéressé|je l'ai fait moi-même|non (?:mi )?interessa|l'ho fatto da sol[oa]|não (?:estou |tenho )?interess|já fiz sozinh[oa]|興味(?:が)?ありません|もう(?:大丈夫|結構)です|自分で(?:やりました|提出しました)/i;
export function customerNotInterested(text: string): boolean {
  const t = (text || '').replace(/\s+/g, ' ').trim();
  if (!t || t.length > 160) return false;
  if (/[?？]/.test(t)) return false;
  if (/\b(?:tfn|abn|option|yes please|how (?:do|can) i pay|pay now|ready to pay)\b/i.test(t)) return false;
  return NOT_INTERESTED.test(t);
}

/** A first message from a business selling us something, not a customer. */
const VENDOR = /\b(?:we (?:offer|provide|specialise|specialize|are an? (?:agency|company|studio))|our (?:agency|company|team offers|services include)|collaboration|collab\b|sponsorship|partnership opportunit|influencer|brand ambassador|promote your (?:business|brand|services)|advertis(?:e|ing) (?:your|with)|\bSEO\b|lead generation|web(?:site)? (?:design|development)|app development|social media (?:management|marketing)|marketing (?:agency|services)|increase your (?:sales|leads|followers)|free (?:audit|consultation) for your business|virtual assistant services|outsourc)\b/i;
const CUSTOMER_INTENT = /\b(?:tax return|tax refund|my tax|refund|tfn|abn|superannuation|super\b|dasp|working holiday|backpacker|lodge|lodging|ato|medicare|payslip|how much|price|cost)\b|確定申告|還付|税金|steuer|impuesto|impôt|tasse|imposto/i;
export function looksLikeVendor(text: string): boolean {
  const t = (text || '').trim();
  if (!t) return false;
  return VENDOR.test(t) && !CUSTOMER_INTENT.test(t);
}

export const salesPromisedKey = (customerId: string) => `sales_promised_until:${customerId}`;

// ── FEE REFUNDS, READ FROM THE TEAM'S OWN WORDS (11 Oct, decision 13) ────────
//
// Jo: "automatic, according to what I write in the chat". When the team
// promises a fee refund ("we'll refund the $220", "the refund of the difference
// will go out this week", "Rückerstattung") the promise is recorded with the
// amount; when they write that it went ("refund sent", "transferred the $176
// today") it is closed. In between: no review ask, no nudges, and a reminder
// to the team after three business days. Pure, so it is testable.

const AMOUNT = /\$\s?(\d{1,4}(?:\.\d{1,2})?)/;
const REFUND_WORD = /\brefund(?:ed|ing)?\b|\bmoney back\b|\brefund of the difference\b|r[üu]ckerstatt|erstatten|返金|reembols|rembours|rimbors/i;
const SENT = /\b(?:sent|transferred|paid|processed|made|went out|gone out|is on its way|on its way|has been (?:sent|transferred|processed|made)|have (?:sent|transferred|processed)|just (?:sent|transferred|processed)|done)\b|[üu]berwiesen|ist raus|wurde (?:[üu]berwiesen|erstattet)|送金しました|返金しました|振り込みました|enviad[oa]|transferid[oa]|envoyé|effectué|inviato|effettuato/i;
const PROMISE = /\b(?:will|we'?ll|i'?ll|going to|gonna|can|happy to|arrange|organise|organize|process|sort(?: out)?|issue|put through|get .{0,20} back to you|you'?ll (?:get|receive)|will be (?:refunded|returned|sent|transferred|processed))\b|werden .{0,30}(?:erstatten|zur[üu]ck[üu]berweisen)|erstatten wir|bekommst .{0,20}zur[üu]ck|返金(?:いたします|します|させていただきます)|te (?:devolvemos|reembolsamos)|on te rembourse|ti rimborsiamo/i;
const NOT_A_PROMISE = /\b(?:no refund|not refund|non[- ]?refundable|won'?t (?:be )?refund|cannot refund|can'?t refund|unable to refund|refund (?:is|would be) not possible|if your (?:tax )?refund|your refund (?:from|should|will|is expected|arrives|lands)|the ato (?:refund|will refund)|tax refund|ato refund)\b|keine r[üu]ckerstattung|nicht erstatt|還付/i;

/** The team promised a fee refund: the amount in cents when stated. */
export function teamPromisesRefund(text: string): { promised: boolean; amountCents: number | null } {
  const t = (text || '').trim();
  if (!t || !REFUND_WORD.test(t)) return { promised: false, amountCents: null };
  const sentences = t.split(/(?<=[.!?])\s+|(?<=[。！？])|\n+/);
  for (const s of sentences) {
    if (!REFUND_WORD.test(s) || NOT_A_PROMISE.test(s)) continue;
    if (SENT.test(s) && !PROMISE.test(s)) continue; // that is "sent", below
    if (PROMISE.test(s) || AMOUNT.test(s)) {
      const m = s.match(AMOUNT);
      const cents = m ? Math.round(parseFloat(m[1]) * 100) : null;
      return { promised: true, amountCents: cents && cents > 0 ? cents : null };
    }
  }
  return { promised: false, amountCents: null };
}

/** The team says the fee refund has gone out. */
export function teamSentRefund(text: string): boolean {
  const t = (text || '').trim();
  if (!t || !REFUND_WORD.test(t)) return false;
  const sentences = t.split(/(?<=[.!?])\s+|(?<=[。！？])|\n+/);
  return sentences.some((s) => REFUND_WORD.test(s) && SENT.test(s) && !NOT_A_PROMISE.test(s)
    && !/\b(?:will be|going to be|once|when|after|as soon as|soon|tomorrow|next week|this week|by)\b/i.test(s));
}

/** Three business days (Mon to Fri) from now, Melbourne is close enough to UTC for this. */
export function businessDaysFromNow(days: number, from: Date = new Date()): Date {
  const d = new Date(from);
  let left = days;
  while (left > 0) {
    d.setUTCDate(d.getUTCDate() + 1);
    const dow = d.getUTCDay();
    if (dow !== 0 && dow !== 6) left--;
  }
  return d;
}


/**
 * 16 Oct (Jo): the team wrote the estimate by hand ("Estimated tax payable:
 * $1,803.81") instead of through Send Estimate with the "Tax payable" toggle,
 * so nothing knew this customer OWES, and Will told them to "call the ATO and
 * request a payment plan". The team's own words now set the outcome, from
 * the CRM and from the phone alike. Needs a dollar figure in the same message,
 * so a general remark ("if you owe tax...") never flips it.
 */
const PAYABLE_WORDS = /\b(?:tax\s+payable|amount\s+payable|payable\s+to\s+the\s+ato|you(?:'ll|\s+will)?\s+(?:owe|need\s+to\s+pay)|owe\s+the\s+ato|tax\s+debt|tax\s+bill)\b/i;
const REFUND_WORDS = /\b(?:estimated\s+(?:tax\s+)?refund|your\s+refund\s+(?:is|of|will\s+be)|tax\s+refund\s+of|refund\s+of)\b/i;
export function teamOutcomeFromWords(text: string): 'PAYABLE' | 'REFUND' | null {
  const t = text ?? '';
  if (!/\$\s?\d/.test(t)) return null;
  const payable = PAYABLE_WORDS.test(t);
  const refund = REFUND_WORDS.test(t);
  if (payable && !refund) return 'PAYABLE';
  if (refund && !payable) return 'REFUND';
  return null; // both (two years, one each) or neither: leave it to the toggle
}

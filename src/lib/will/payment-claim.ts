// ============================================================
// "I paid."
//
// Jo's rule, stated again 27 Aug: at the payment step we TRUST THE CUSTOMER.
// There are two independent ways to be trusted, and either one on its own is
// enough to move on:
//
//   1. they say they paid  — this file
//   2. they send a screenshot the vision check confirms — claude.ts
//
// Most people do both at once: a screenshot with "paid" typed under it. Before
// this existed, that case was decided ONLY by the picture — so a real payment
// with a blurry screenshot, a partial crop, a bank app in Japanese, or a photo
// Meta would not hand us, fell through to a manual task while the words "just
// paid it!" sat there being ignored.
//
// WHY THIS IS THE RIGHT TRADE HERE, STATED PLAINLY. Nothing in this system is
// connected to a bank account, so there is no way to verify a payment for real.
// The choice is between trusting the customer and having a person check every
// single one by hand. Jo trusts the customer. The exposure is one unpaid tax
// return's worth of work, discovered when the money does not arrive, against a
// pipeline that keeps moving on its own — and he has weighed that.
//
// So this errs toward believing people. It is still not a keyword grab: it has
// to look like someone reporting a payment, not mentioning one.
// ============================================================

/** Phrases that are unambiguous payment reports, whatever else is in the
 *  message. Deliberately specific — "payment" alone is a question as often as
 *  it is a confirmation ("how do I make the payment?"). */
const EXPLICIT = new RegExp([
  // English
  'transferred', 'bank transfer', 'payment (?:sent|done|made|complete[d]?|received)',
  'sent (?:the )?(?:money|payment|funds)', 'just paid', 'already paid', 'paid the fee',
  'paid you', 'paid it', 'paid now', 'paid today', 'paid \\$', 'have paid', "i've paid",
  'made the payment', 'money sent', 'sent it through', 'sent you the money',
  // Spanish / Portuguese — a large share of working-holiday traffic
  'ya pagu[eé]', 'pagado', 'transferencia (?:hecha|realizada|enviada)', 'ya lo pagu[eé]',
  'j[aá] paguei', 'pagamento (?:feito|enviado|realizado)', 'transfer[eê]ncia (?:feita|enviada)',
  // German — one of the three site languages
  'bezahlt', '[uü]berwiesen', 'zahlung (?:erfolgt|gesendet|get[aä]tigt)',
  // Italian / French
  'ho pagato', 'pagato', 'bonifico (?:fatto|inviato|effettuato)',
  "j'ai pay[eé]", 'pay[eé]', 'virement (?:fait|envoy[eé]|effectu[eé])',
  // Japanese — the third site language
  '支払いました', '支払い(?:完了|済み)', '振込みました', '振り込みました', '送金しました', '払いました',
].join('|'), 'i');

/** Short confirmations that only count when the message is short. "done" in a
 *  four-word message is a confirmation; "done" inside a paragraph is a word. */
const SHORT_CONFIRM = /\b(paid|done|sent it|sent|transferred|listo|hecho|fertig|fatto|完了|送りました)\b/i;

/** A payment word inside a report of TROUBLE is not a confirmation.
 *
 *  Jo, 29 Aug: read the caption first and take the customer at their word,
 *  UNLESS the caption says something went wrong. "I transferred but it got
 *  declined" contains "transferred" and would otherwise sail straight through
 *  EXPLICIT to Paid, sending "payment received" to someone whose money never
 *  left. That is the one shape of trust this file must not extend, because the
 *  customer has already told us not to.
 *
 *  Nothing is lost by not deciding it here: the message falls through to a
 *  task and a person reads it. */
const TROUBLE = new RegExp([
  // English
  // "went through" on its own is a SUCCESS report, so only the negated forms
  // are listed. Getting that backwards would reject real confirmations.
  'declined', 'rejected', 'failed', 'failing', "did ?n[o']?t work", 'not work',
  "did ?n[o']?t go through", "has ?n[o']?t gone through", 'not gone through',
  'error', 'problem', 'issue', 'blocked', 'cancell?ed', 'reversed', 'bounced',
  'stuck', 'on hold', 'try again', 'trouble',
  'wrong (?:amount|account|number|details|bsb)',
  // Spanish / Portuguese
  'rechazad[oa]', 'fall[oó]', 'no funcion', 'no pas[oó]', 'problema',
  'recusad[oa]', 'falhou', 'n[aã]o (?:funcionou|passou|foi)',
  // German
  'abgelehnt', 'fehlgeschlagen', 'funktioniert nicht', 'fehler',
  'ging nicht', 'storniert', 'klappt nicht',
  // Italian / French
  'rifiutat[oa]', 'non ha funzionato', 'errore',
  'refus[eé]', "n'a pas (?:march[eé]|fonctionn[eé])", 'erreur', 'probl[eè]me',
  // Japanese
  '失敗', 'エラー', '問題', 'できません', 'できなかった', '拒否', '止ま',
].join('|'), 'i');

/** Words that turn an apparent confirmation into something else entirely.
 *  "I paid attention", "when do I pay?", "how do I pay?", "I will pay tomorrow". */
const NOT_A_CLAIM = /\b(attention|visit|mind|off|how (?:do|can|should) i|when (?:do|should) i|where (?:do|can) i|can i pay|will pay|going to pay|about to pay|need to pay|have to pay|haven'?t paid|not paid|before i pay|once i pay|after i pay|if i pay)\b/i;

/**
 * Does this message report that a payment has been made?
 *
 * Returns false on anything that is asking ABOUT paying rather than reporting
 * it — that distinction is the whole job, because a customer asking "how do I
 * pay?" must not be moved to Paid and sent the form.
 */
export function claimsPayment(text: string | null | undefined): boolean {
  const t = (text ?? '').toLowerCase().trim();
  if (!t) return false;

  // A payment that went wrong is never a claim, however clearly the customer
  // says they tried. Checked first, ahead of everything, because the whole
  // point is that it overrides an otherwise-explicit confirmation.
  if (TROUBLE.test(t)) return false;

  // A question about paying is never a claim, however many payment words it
  // contains. Checked first so it can override both patterns below.
  if (NOT_A_CLAIM.test(t)) return false;
  if (t.endsWith('?')) return false;

  if (EXPLICIT.test(t)) return true;

  // Otherwise it has to be short enough that the confirming word IS the
  // message. CJK has no spaces, so it is measured by characters there.
  const hasSpaces = /\s/.test(t);
  const size = hasSpaces ? t.split(/\s+/).filter(Boolean).length : t.length;
  const limit = hasSpaces ? 5 : 12;
  return size <= limit && SHORT_CONFIRM.test(t);
}

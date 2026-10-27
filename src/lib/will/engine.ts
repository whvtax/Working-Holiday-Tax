// ============================================================
// The engine: incoming customer message -> model decision ->
// state-machine validation -> Policy Guard -> outcome.
// Two modes only:
//   SUPERVISED  = the assistant drafts, the owner approves every send
//   FULL_AUTO   = the assistant sends; anything unclear goes to a human
// ============================================================
import { FORM_LINK_ANY_BRAND, VOICES } from './brand-voice';
import { decide, Decision, Turn } from './claude';
import { CustomerContext } from './playbook';
import { policyGuard, GuardContext } from './policy-guard';
import { claimsPayment } from './payment-claim';
import { professionalQuestionMessage, NO_REFUND_CASES_Q, noRefundCasesMessage, PRE_PAYMENT_CHECK_MSG } from './i18n';
import { accountNameMessage, isAccountNameQuestion } from './account-name';
import { PAYMENT_RECEIVED_MSG, BANK_DOC_DENIED_RE, bankDocumentMessage, REFUND_CHANCE_RE, refundChanceMessage, quotesOtherPrice, notOurPriceMessage } from './i18n';

/** The first words of the approved confirmation in every language. */
const PAYMENT_RECEIVED_PREFIX = new RegExp('^\\s*(?:' + Object.values(PAYMENT_RECEIVED_MSG).map((t) => t.split('\n')[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')', 'im');
const FORM_LINK_IN_TEXT = FORM_LINK_ANY_BRAND; // decision 004: either brand's form link
import { APPROVED } from './approved-messages';
import { canTransition, CustomerState } from './state-machine';
import { detectChoice, PRICE_ASK_RE, firstContactPriceMessage, priceTail } from './instant-choice';
import { resolveAiMode, type AiMode } from './mode';
import { hasForeignIncome } from './foreign-income';
import { hasAbnIncome, ABN_PRICE_RE } from './abn-income';
import { detectLanguage, unsupportedScript } from './i18n';
import { currentBrand } from './brand-context';
import { SVT_FIXED_TEXTS } from './svt-fixed-texts';
import { isLaterPlan, laterPlanReply } from './later-plan';
import { renderApproved, type DecisionMode } from './will-decides';
import { looksLikePaymentConfirmation } from './payment-confirmation';
import { paragraphise } from './layout';
import { OTHER_INCOME_RE, CLEAR_ABN_RE, abnStance } from './instant-choice';
import { alreadyCheckedReason, applyCheckedClause, CHECKED_CLAUSE, alreadyLodged } from './already-checked';
import { normaliseWillText, firstNameOf, cleanFirstName, isCourtesyLine, containsThanks, firstSentenceOnly, isClosingOnly, thanksReply } from './text-normalize';

// One definition, in ./mode, used by everything that decides whether a message
// may leave without the owner. Re-exported so existing importers are unaffected.
export type { AiMode };

export interface EngineInput {
  ctx: CustomerContext;
  guard: Omit<GuardContext, 'state' | 'paid' | 'estimateFromTeam' | 'isApprovedTemplate'>;
  history: Turn[];
  mode: AiMode;
  bank: { bsb: string; account: string };
  /** Jo, 22 Oct: 'will' = Will decides everything (will-decides.ts). */
  decisionMode?: DecisionMode;
  /** The second check held Will's first reply: why, and that reply, so he
   *  writes it again (service.ts, secondCheck). */
  reviewHint?: string;
}

export interface EngineOutcome {
  /** 'queued' is Autopilot: the reply is final, but it waits
   *  AUTOPILOT_REPLY_DELAY_SECONDS before it is transmitted. 'sent' is kept for
   *  paths that must go out immediately. 'deferred' is never produced by the
   *  engine: the service returns it on Autopilot when NO reply was written yet,
   *  because the two-minute timer was armed instead (Jo, 3 Sep: wait first,
   *  then read everything the customer wrote, then answer once). */
  kind: 'sent' | 'queued' | 'pending_approval' | 'human_task' | 'silent' | 'deferred';
  replyText?: string;
  newState?: CustomerState;
  stateChanged?: boolean;
  invalidTransition?: boolean;
  task?: { reason: string; severity: string; suggestedReply?: string };
  guardViolations?: string[];
  /** Set by the reviewer pass in service.ts (second set of eyes): a short note
   *  on what it saw or changed. Stored on the message/task so the owner sees it. */
  reviewNote?: string;
  decision: Decision;
}

export function fillPlaceholders(
  text: string,
  bank: { bsb: string; account: string },
  extra?: { amount?: string; reviewLink?: string; document?: string },
): string {
  let out = text
    .replaceAll('{{BSB}}', bank.bsb)
    .replaceAll('{{ACCOUNT}}', bank.account);
  if (extra?.amount) out = out.replaceAll('{{AMOUNT}}', extra.amount);
  if (extra?.reviewLink) out = out.replaceAll('{{REVIEW_LINK}}', extra.reviewLink);
  if (extra?.document) out = out.replaceAll('{{DOCUMENT}}', extra.document);
  return out;
}

// ============================================================
// Owner rule: never repeat the payment request + bank details. Once Will has sent
// them, it does not send them again unless the customer explicitly asks for them.
// The customer already has them in the thread; repeating reads as pushy and robotic.
// ============================================================
// "THE BANK DETAILS ARE ACTUALLY HERE" — the numbers, nothing else.
//
// Audit, 4 Sep, and it was the worst bug in the file: this used to match the
// PHRASE "payment details" too, so an ordinary sentence promising them
// ("once you pick an option I'll send you the payment details") counted as the
// details having been sent. The very next message, the real price message with
// the BSB and the account number, was then treated as a REPEAT and stripped —
// so the customer was asked to pay and given no account to pay into.
//
// The account number and the BSB are language-independent and unambiguous, and
// they are the only thing that means the customer actually has what they need.
const BANK_DETAILS_RE = /\b0?62\s?692\b|\b81049952\b/;
// A single line that is part of the bank block, to be removed on a repeat.
// Every language Will speaks, because a German or Spanish repeat used to lose
// only the numbers and keep the sentence introducing them, leaving "Here are
// the payment details:" with nothing under it (audit, 4 Sep).
const BANK_LINE_RE = new RegExp([
  '\\b0?62\\s?692\\b', '\\b81049952\\b',
  // the labels, in every language
  'payment details', 'bank details', 'account name\\s*:', '^\\s*bsb\\b',
  // 11 Oct: the price message opens with the track and the amount; a repeat
  // of the block takes that line with it too.
  "^got it, so that'?s the tfn", '^\\s*account\\s*:', '^\\s*amount\\s*:\\s*\\$?\\d',
  'zahlungsdetails', 'bankverbindung', 'kontoinhaber', 'kontonummer', '^\\s*blz\\b',
  'datos de pago', 'datos bancarios', 'titular de la cuenta', 'n[úu]mero de cuenta',
  'coordonn[ée]es bancaires', 'd[ée]tails de paiement', 'titulaire du compte', 'num[ée]ro de compte',
  'dati (?:di|per il) pagamento', 'dati bancari', 'intestatario', 'numero di conto',
  'dados (?:de|para o) pagamento', 'dados banc[áa]rios', 'titular da conta', 'n[úu]mero da conta',
  '振込先', '口座名義', '口座番号', '支店番号',
  // the closing line that belongs to the same block
  'quick screenshot', 'send us a screenshot', 'once paid', "once you['’]?ve made the payment",
  'sobald du bezahlt hast', 'schick(?:e)? uns (?:einfach )?(?:einen )?screenshot',
  'una vez (?:que )?(?:hayas )?pagado', 'env[íi]anos (?:una )?captura',
  'une fois (?:que tu as |le )?pay[ée]', 'envoie[- ]nous (?:une )?capture',
  'una volta (?:che hai )?pagato', 'mandaci (?:uno )?screenshot',
  'assim que (?:tiveres )?pago', 'envia[- ]nos (?:uma )?captura',
  'お支払い(?:が)?完了(?:し)?たら', 'スクリーンショット(?:を)?(?:送|お送り)',
  // The fee line belongs to the price message and goes with it. Left behind,
  // the "repeat" became a message consisting of nothing but that line, tacked
  // onto a conversation that was about something else, which is precisely
  // what Jo banned on 3 Sep (audit, 4 Sep). The old guarantee phrasings stay
  // in the list so a Library copy that was not synced yet is still caught.
  "the fee covers our team's full review", 'the fee covers the full review', 'not dependent on the outcome', 'decided by the ato',
  'if your (?:tax )?refund is less than', 'refund the difference', 'if you owe money to the ato', "if there'?s no refund", 'our full fee applies',
  'wenn deine r[üu]ckerstattung', 'differenz', 'falls du dem ato',
  'si tu reembolso es (?:menor|inferior)', 'la diferencia', 'si le debes',
  'si ton remboursement est', 'la diff[ée]rence', 'si tu dois de l',
  'se il tuo rimborso [èe]', 'la differenza', 'se devi (?:dei soldi|pagare)',
  'se o teu reembolso for', 'a diferen[çc]a', 'se dever(?:es)? dinheiro',
  '還付(?:金|額)が.*少ない', '差額', 'ATOに.*支払う',
].join('|'), 'i');
// The customer explicitly asking for payment / bank details (then repeating is
// fine). English was covered; es/fr/it/pt/ja were not, so "Podes reenviar os
// dados bancários?" was read as NOT asking and the answer arrived with the
// numbers stripped out of it (audit, 4 Sep).
const CUSTOMER_ASKED_PAYMENT_RE = new RegExp([
  '\\b(?:bank|bsb|account|pay|payment|transfer|deposit|screenshot|remind|again|details)\\b',
  'where.*(?:send|pay)', 'how.*(?:pay|transfer)',
  'bezahl', '[üu]berweis', 'kontonummer', 'kontodaten', 'bankverbindung', 'wohin.*(?:geld|zahlen|überweisen)', 'zahlungsdetails',
  'pagar', 'pago', 'transferencia', 'cuenta', 'datos bancarios', 'datos de pago', 'ad[óo]nde.*(?:pago|enviar)', 'd[óo]nde.*pag',
  'payer', 'paiement', 'virement', 'compte', 'coordonn[ée]es bancaires', 'o[ùu].*(?:payer|envoyer)',
  'pagare', 'pagamento', 'bonifico', 'conto', 'dati bancari', 'dove.*(?:pago|pagare|inviare)',
  'pagar', 'pagamento', 'transfer[êe]ncia', 'conta', 'dados banc[áa]rios', 'onde.*(?:pago|pagar|enviar)',
  '振込', '支払', '口座', '送金', 'どこ(?:に|へ).*(?:払|振込|送金)',
].join('|'), 'i');

/** Remove only the bank-detail lines from a message, leaving any surrounding text
 *  (a greeting, an answer) intact. Used when the details were already sent and the
 *  customer did not ask for them again. */
/** The guarantee, as sent (English and Will's translations). */
const GUARANTEE_RE = /refund the difference|refund you the difference|die differenz|la diferencia|la diff[ée]rence|la differenza|a diferen[çc]a|差額/i;
/** Remove the guarantee sentences (both of them) from a reply, tidying the
 *  blank lines they leave behind. Exported for the tests. */
/** Drop a cheer-word opener ("Perfect!", "Great!", "No worries at all!",
 *  "Happy to help!", "Absolutely!", "Of course!") from the start of a reply,
 *  in the languages Will speaks, and re-capitalise what follows. Exported for
 *  the tests. */
const CHEER_OPENER = /^(?:(?:perfect|great|awesome|amazing|wonderful|brilliant|fantastic|absolutely|of course|no worries(?: at all)?|no problem(?: at all)?|happy to help|sure(?: thing)?|got it|perfekt|super|klar|gerne|kein problem|alles klar|perfecto|genial|claro|sin problema|parfait|super|bien sûr|pas de souci|perfetto|certo|nessun problema|ótimo|perfeito|claro|sem problema|かしこまりました|もちろん|了解です|承知しました)[!.,、。]?\s*)+/i;
/** Replace whatever the model wrote from the first bank line onwards with the
 *  approved price message for the amount it named, keeping at most one line
 *  of the model's own before it. Returns the input unchanged when no fixed
 *  amount can be read, or when the draft is already the approved text. */
export function enforcePriceMessage(text: string, foreign = false, reviewOfLodged = false): string {
  const abn = /\$\s?385\b/.test(text);
  const tfn = /\$\s?220\b/.test(text);
  const abnF = /\$\s?495\b/.test(text);
  const tfnF = /\$\s?330\b/.test(text);
  if ([abn, tfn, abnF, tfnF].filter(Boolean).length !== 1) return text; // ambiguous, leave it
  // A customer who mentioned foreign income always gets the foreign price,
  // even when the model wrote $220 / $385 (Jo, 12 Oct).
  // 16 Oct (Siti): a return they already lodged is a REVIEW: its own price
  // message, no guarantee.
  if (reviewOfLodged) {
    const review = (abn || abnF) ? APPROVED.price_tfn_abn_review : APPROVED.price_tfn_review;
    if (text.includes(review)) return text;
    const lines0 = text.split('\n');
    const firstBank0 = lines0.findIndex((l) => /\bBSB\b|062692|81049952|payment details/i.test(l));
    const lead0 = (firstBank0 > 0 ? lines0.slice(0, firstBank0) : []).map((l) => l.trim()).filter(Boolean)
      .find((l) => !/refund|fee|guarantee|option|\$\s?\d/i.test(l) && l.length <= 80);
    return lead0 ? `${lead0}\n\n${review}` : review;
  }
  const approved = (abn || abnF) && (foreign || abnF) ? APPROVED.price_tfn_abn_foreign
    : (tfn || tfnF) && (foreign || tfnF) ? APPROVED.price_tfn_foreign
    : abn ? APPROVED.price_tfn_abn : APPROVED.price_tfn;
  if (text.includes(approved)) return text;
  const lines = text.split('\n');
  const firstBank = lines.findIndex((l) => /\bBSB\b|062692|81049952|payment details/i.test(l));
  const before = (firstBank > 0 ? lines.slice(0, firstBank) : []).map((l) => l.trim()).filter(Boolean);
  // One line of the model's own, and only if it is not itself a stale price
  // or guarantee sentence.
  const lead = before.find((l) => !/refund|fee|guarantee|\$\s?\d/i.test(l) && l.length <= 160);
  return lead ? `${lead}\n\n${approved}` : approved;
}

/** $495 -> $385 and $330 -> $220, in the ways Will writes an amount in his
 *  languages ("$495", "A$495", "AUD 495", "495ドル", "495 Dollar"). */
export function fixForeignPrice(text: string): string {
  const swap = (n: string) => (n === '495' ? '385' : '220');
  return text
    .replace(/((?:A|AU)?\$\s?|AUD\s?)(495|330)\b/g, (_m, pre: string, n: string) => `${pre}${swap(n)}`)
    .replace(/\b(495|330)(\s?(?:ドル|豪ドル|AUD|dollars?|Dollar|dólares|dollari|dólares australianos|euros?))/gi, (_m, n: string, post: string) => `${swap(n)}${post}`);
}

export function stripCheerOpener(text: string, firstName?: string | null): string {
  let stripped = text.replace(CHEER_OPENER, '');
  if (!stripped.trim() || stripped === text) return text;
  // 13 Oct (Corey, +61 461): "No worries, Corey! Just send it through..."
  // became "Corey. Just send it through...". The name that belonged to the
  // stripped opener goes with it (and any "Hi"/"Hey" in front of it).
  const name = (firstName ?? '').trim();
  if (name) {
    const esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const rest = stripped.replace(new RegExp(`^(?:,\\s*)?${esc}\\s*[!.]+\\s*`, "i"), "");
    if (rest !== stripped && rest.trim()) stripped = rest;
  }
  // Never start with a bare comma or full stop left behind.
  stripped = stripped.replace(/^[\s,.!]+/, '');
  if (!stripped.trim()) return text;
  // "Perfect! here are..." -> "Here are..."
  return stripped.charAt(0).toUpperCase() + stripped.slice(1);
}

/** The guarantee's second sentence ("If there's no refund, our full fee
 *  applies") as Will writes it in his languages. It used to be matched in
 *  English, German and Japanese only, so a French reply kept "S'il n'y a pas
 *  de remboursement, nos frais complets s'appliquent" after the first
 *  sentence was removed (Jo, 21 Oct). */
const GUARANTEE_SECOND_RE = new RegExp([
  "(?:no refund|keine r[üu]ckerstattung|pas de remboursement|aucun remboursement|no hay (?:ning[úu]n )?reembolso|sin reembolso|nessun rimborso|non c'[èe] (?:alcun |nessun )?rimborso|n[ãa]o (?:houver|h[áa]) reembolso|sem reembolso|還付(?:金)?が(?:ない|なければ|出ない))[^.。]{0,60}(?:fee|geb[üu]hr|frais|tarifa|honorarios|tariffa|compenso|taxa|honor[áa]rios|全額|料金)",
].join('|'), 'i');

/** The stock line opens with "Yes," (Ja, はい, Sí, Oui, Sì, Sim), which only
 *  fits a yes/no question. To a what / which / when / how / why question the
 *  "Yes," goes (Jo, 22 Oct: "In what cases would there be no refund?" got
 *  "Yes, that's definitely..."). Applies wherever the line appears. */
const WH_QUESTION = /(?:^|[.!?\n]\s*)(?:in )?(?:what|which|when|how|why|where|who)\b|\b(?:was|welche[rsn]?|wann|wie|warum|wo)\b[^?]*\?|(?:qu[ée]|cu[áa]ndo|c[óo]mo|por qu[ée]|quoi|quand|comment|pourquoi|cosa|quando|come|perch[ée]|o que|como)\b[^?]*\?|(?:何|なぜ|どう|どんな|いつ|どこ)/i;
const STOCK_YES = /^(?:Yes|Ja|はい|Sí|Oui|Sì|Sim)[,、]\s*/;
export function fitStockLine(text: string, customerBurst: string): string {
  if (!WH_QUESTION.test(customerBurst ?? '')) return text;
  const stock = Object.values(PRE_PAYMENT_CHECK_MSG).map((m) => m.replace(STOCK_YES, ''));
  return text.split('\n').map((line) => {
    const rest = line.replace(STOCK_YES, '');
    if (rest === line || !stock.some((m) => rest.startsWith(m.slice(0, 20)))) return line;
    return rest.charAt(0).toUpperCase() + rest.slice(1);
  }).join('\n');
}

export function stripGuarantee(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((para) => para
      .split(/(?<=[.!?。])\s+/)
      .filter((sent) => !GUARANTEE_RE.test(sent) && !GUARANTEE_SECOND_RE.test(sent) && !/^(?:if there'?s no refund|our full fee applies)/i.test(sent))
      .join(' '))
    .filter((para) => para.trim().length > 0)
    .join('\n\n')
    .trim();
}

export function stripBankBlock(text: string): string {
  return text
    .split('\n')
    .filter((line) => !BANK_LINE_RE.test(line.trim()))
    .join('\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** 11 Oct (full audit, decision 2): did the customer actually ask something?
 *  A question mark, a long message (over 25 words) or a numbered list of
 *  points. Exported for the tests. */
export function customerAskedSomething(burst: string): boolean {
  const t = (burst ?? '').trim();
  if (!t) return false;
  if (/[?？]/.test(t)) return true;
  if (t.split(/\s+/).filter(Boolean).length > 25) return true;
  const numbered = (t.match(/^\s*(?:\d+[.)]|[-•])\s+\S/gm) ?? []).length;
  return numbered >= 2;
}

/** The question IS about the price, or the message already picks a track:
 *  then the price message is the right answer, question mark or not. */
const CHOICE_OR_PRICE_RE = new RegExp([
  '\\b(?:tfn|abn|option|price|prices|cost|costs|fee|fees|how much|charge|pay|payment|bank|bsb)\\b',
  '\\$\\s?(?:220|385|330|495)\\b', '\\b(?:220|385|330|495)\\b',
  '^(?:yes|yep|yeah|sure|ok|okay|ja|sí|si|oui|sì|sim|はい|お願いします|よろしくお願いします)\\b',
  'いくら', '料金', '費用', '値段', 'preis', 'kosten', 'kostet', 'precio', 'cu[áa]nto', 'prix', 'combien', 'prezzo', 'quanto', 'preço',
].join('|'), 'im');
/** "How do I pay?", "haven't seen a transfer request", "what's the IBAN?":
 *  the bank details ARE the answer (Jo, 25 Oct, Michael +31 6: the reply with
 *  the payment step was refused as "prices instead of an answer"). */
export const HOW_TO_PAY_RE = /\b(?:transfer|payment|pay)\s+(?:request|link|details|info)|\bwhich\s+transfer\b|how\s+(?:do|can|should|would)\s+i\s+(?:pay|transfer|send (?:the )?(?:money|payment))|where\s+(?:do|should|can)\s+i\s+(?:pay|send|transfer)|\b(?:iban|swift|bic)\b|bank\s*(?:details|account)|wie\s+(?:kann|soll)\s+ich\s+(?:bezahlen|zahlen|überweisen)|kontodaten|振込先|支払い方法|どうやって(?:支払|振り込)/i;

export function isChoiceOrPriceAsk(burst: string): boolean {
  const t = (burst ?? '').trim();
  return CHOICE_OR_PRICE_RE.test(t) || HOW_TO_PAY_RE.test(t);
}

/** 11 Oct (decision 12): a message that reads as upset, worried or about a
 *  refund. Multilingual, deliberately broad: the cost of a false positive is
 *  one extra draft on a task. */
export const UPSET_OR_REFUND = /\b(?:refund(?: me| my money| the fee)?|money back|chargeback|dispute|scam|fraud|unprofessional|ridiculous|unacceptable|disappointed|frustrat|angry|upset|furious|complain|review(?:s)? (?:online|on google)|lawyer|ombudsman|fair work|waste of|rip[- ]?off|ignored|no (?:one|body) (?:replies|answers|responds)|still waiting)\b|hello\?{2,}|\?{3,}|erstatt|geld zur[üu]ck|betrug|unversch[äa]mt|entt[äa]uscht|返金|詐欺|不満|がっかり|reembolso|estafa|decepcion|rembourse|arnaque|déçu|rimborso|truffa|delus|devolução|golpe/i;

/** Both prices in one text = the menu (the opening or a re-pitch). */
const MENU_RE = /\$\s?(?:220|330)\b[\s\S]*\$\s?(?:385|495)\b|\$\s?(?:385|495)\b[\s\S]*\$\s?(?:220|330)\b/;
const BANK_RE = /\bBSB\b|062692|81049952/;

/** Decision 2: a message that asks something (and is not itself about the
 *  price or a choice) must be answered, not pitched. True when the draft is
 *  the menu or the price block in reply to such a message. */
export function menuAsAnswer(burst: string, draft: string, paid: boolean): boolean {
  if (paid) return false;
  if (!customerAskedSomething(burst) || isChoiceOrPriceAsk(burst)) return false;
  return MENU_RE.test(draft) || BANK_RE.test(draft);
}

/** Drop the price lines and the bank block from a draft, keeping what answers. */
export function stripMenuAndBank(text: string): string {
  return text
    .split('\n')
    .filter((l) => !BANK_LINE_RE.test(l.trim()) && !/\$\s?(?:220|385|330|495)\b/.test(l) && !/which option/i.test(l))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** 11 Oct (full audit, decision 16): in Approval mode a draft that is, word
 *  for word, one of the fixed messages Jo approved (the opening question, the
 *  two prices, a price message) has nothing to review: fifteen openings sat
 *  in the approval queue in August and nobody approved them (Lou and Aaron
 *  waited nine days). Those go out on the normal Autopilot timer. */
export function isApprovedVerbatim(text: string, firstName?: string | null): boolean {
  const norm = (t: string) => t.replace(/\s+/g, ' ').trim();
  const t = norm(text);
  const name = (firstName ?? '').trim();
  const fixed = [APPROVED.opening, APPROVED.prices, APPROVED.price_tfn, APPROVED.price_tfn_abn,
    APPROVED.prices_foreign, APPROVED.price_tfn_foreign, APPROVED.price_tfn_abn_foreign,
    firstContactPriceMessage('TFN', name), firstContactPriceMessage('TFN_ABN', name),
    firstContactPriceMessage('TFN', name, true), firstContactPriceMessage('TFN_ABN', name, true)];
  for (const f of fixed) {
    if (t === norm(f)) return true;
    if (name && t === norm(f.replace(/^Hey!/, `Hey ${name}!`))) return true;
  }
  return false;
}

/** A held draft must not confirm a payment, or send the form link, to someone
 *  who has not been marked Paid. Only the verified payment step does that. Real
 *  case (19 Oct, Paige, +44 7903): a lead who had not paid was offered "Since
 *  you've paid, please fill out this quick form" as a draft. Those lines are
 *  dropped; the team writes the rest. */
export function scrubUnpaidDraft(text: string, paid: boolean): string {
  if (paid) return text;
  const PAID_LINE = /tax-form|fill out (this|the|our) (quick )?form|once you'?ve submitted|since you'?ve paid|you'?ve already paid|payment received|received your payment|thanks? for (your|the) payment/i;
  return text.split('\n').filter((line) => !PAID_LINE.test(line)).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

/** Fixed texts that only make sense for working holiday makers. */
// review_link is allowed since 27 Oct: the student brand has its own Google
// profile and rebrandText swaps the link on the way out.
const SVT_BLOCKED_KEYS = new Set<string>(['residency_quiz_start', 'residency_resident', 'residency_whm', 'referral']);

export async function runEngine(input: EngineInput): Promise<EngineOutcome> {
  const flags: { fixedText?: string } = {};
  const out = await runEngineInner(input, flags);
  // The guard has no Chinese or Vietnamese phrase rules yet, so on the student
  // line a reply in (or to) those languages waits for a person instead of
  // going out on Autopilot (final review, 27 Oct).
  if (currentBrand() === 'svt' && out.kind === 'queued') {
    const lastCustomer = [...input.history].reverse().find((t) => t.role === 'customer')?.text ?? '';
    // A fixed message in Chinese or Vietnamese is Jo's own wording, so it goes
    // out like the English one does; only free text waits for a person.
    const fixed = !!flags.fixedText && (out.replyText ?? '').trim() === flags.fixedText.trim();
    if (!fixed && (unsupportedScript(lastCustomer) || unsupportedScript(out.replyText ?? ''))) {
      return { ...out, kind: 'pending_approval', reviewNote: [out.reviewNote, 'Chinese/Vietnamese: held for approval until the guard covers it.'].filter(Boolean).join(' ') };
    }
  }
  return out;
}

async function runEngineInner(input: EngineInput, flags: { fixedText?: string } = {}): Promise<EngineOutcome> {
  const { ctx, history, mode, bank } = input;
  const willMode = input.decisionMode === 'will';

  // Owner emoji + name rules: at most one emoji and the customer's first name,
  // BOTH only in the opening message. This is the opening message when Will has
  // not sent anything in this conversation yet.
  const firstMessage = !history.some((t) => t.role === 'assistant');
  const custFirstName = firstNameOf(ctx.name);

  // Bank-repeat suppression: if the bank details were already sent earlier AND the
  // customer is not asking for them right now, strip them from any repeat.
  const bankAlreadySent = history.some((t) => t.role === 'assistant' && BANK_DETAILS_RE.test(t.text));
  // Everything the customer has written since WE last said anything, not only
  // their last line. On Autopilot a burst is answered as one message, so "hey,
  // one more thing / can you resend the bank details? / thanks!" hid the ask
  // behind the "thanks!" and the numbers were stripped out (audit, 4 Sep).
  let lastAssistantIdx = -1;
  for (let i = history.length - 1; i >= 0; i--) if (history[i].role === 'assistant') { lastAssistantIdx = i; break; }
  const burstSinceOurs = history.slice(lastAssistantIdx + 1).filter((t) => t.role === 'customer').map((t) => t.text);
  const customerBurst = burstSinceOurs.length
    ? burstSinceOurs.join('\n')
    : ([...history].reverse().find((t) => t.role === 'customer')?.text ?? '');
  const suppressBankRepeat = bankAlreadySent && !CUSTOMER_ASKED_PAYMENT_RE.test(customerBurst);
  // 29 Sep (+46 70): the guarantee went out with the price message, then
  // again, word for word, in the next reply. The guarantee belongs to the
  // price message: once it has been sent, a repeat of it in a reply that is
  // NOT a price message is dropped in code, whatever the model wrote.
  const guaranteeAlreadySent = history.some((t) => t.role === 'assistant' && GUARANTEE_RE.test(t.text));
  // Jo, 12 Oct: foreign income means no guarantee, whatever the model wrote.
  const foreignCustomer = hasForeignIncome(history.filter((t) => t.role === 'customer').map((t) => t.text));
  // Jo, 21 Oct (Norina, +33 7 62): ABN income means no guarantee either. Known
  // from the profile, from anything the customer wrote, or from the reply
  // itself quoting an ABN price ($385 / $495). See abn-income.ts.
  const abnCustomer = ctx.income === 'TFN_ABN'
    || hasAbnIncome(history.filter((t) => t.role === 'customer').map((t) => t.text));
  const applyBankRule = (t: string): string => {
    let out = suppressBankRepeat && BANK_DETAILS_RE.test(t) ? stripBankBlock(t) : t;
    if (guaranteeAlreadySent && !BANK_DETAILS_RE.test(out) && GUARANTEE_RE.test(out)) out = stripGuarantee(out);
    if (foreignCustomer && GUARANTEE_RE.test(out)) out = stripGuarantee(out);
    if ((abnCustomer || ABN_PRICE_RE.test(out)) && GUARANTEE_RE.test(out)) out = stripGuarantee(out);
    return out;
  };

  // ── A THANK-YOU GETS "You're very welcome! 😊" (Jo, 13 Oct) ──────────────
  //
  // "When someone writes thanks after a refund, a service, a question, the
  // answer a human gives is You're very welcome! 😊, and that is how Will has
  // to behave." So it is not the model's choice: a message that is only a
  // thank-you (any wording) gets that line, before the model is asked
  // anything. Never the same line twice in a row ("Anytime! 😊" then). It
  // still passes the guard, so a paused, opted-out or legacy chat and the
  // kill switch stay silent.
  // Jo, 21 Oct: the thank-you line in THEIR language. The chat's language,
  // or, when that is not known yet, the language of what they just wrote.
  const thanksLang = ctx.lang ?? detectLanguage(customerBurst).lang ?? 'en';
  // Only once we have said something: a "thank you" in someone's FIRST
  // message is politeness, not thanks for anything (Jo, 22 Oct, Nicole).
  if (!willMode && lastAssistantIdx >= 0 && burstSinceOurs.length > 0 && isClosingOnly(customerBurst) && containsThanks(customerBurst)) {
    const line = thanksReply(lastAssistantIdx >= 0 ? history[lastAssistantIdx].text : '', thanksLang);
    const thanksDecision: Decision = { action: 'reply', reply_text: line, confidence: 1 };
    const v = policyGuard(line, {
      ...input.guard, state: ctx.state, paid: ctx.paid, estimateFromTeam: ctx.estimatedRefundCents,
      isApprovedTemplate: true, customerTextChars: customerBurst.length, customerText: customerBurst,
    });
    if (!v.allowed) return { kind: 'silent', decision: { ...thanksDecision, action: 'wait', reply_text: undefined }, guardViolations: v.violations };
    return {
      kind: resolveAiMode(mode) === 'FULL_AUTO' ? 'queued' : 'pending_approval',
      replyText: line, decision: thanksDecision,
      reviewNote: "thank-you: You're very welcome! 😊 (Jo's rule, no model call)",
      newState: undefined, stateChanged: false,
    };
  }

  // ── "THANKS, I'LL DO IT AFTER WORK" GETS ONE LINE (Jo, 21 Oct) ───────────
  // A plan to do the form or the payment later, with nothing else in it, is
  // answered like a person would, in their language, by stage (later-plan.ts).
  // It used to reach the model, which read it as a polite closing and waited.
  if (!willMode && burstSinceOurs.length > 0 && isLaterPlan(customerBurst)) {
    const line = laterPlanReply(ctx.state, thanksLang);
    const lastOurs = lastAssistantIdx >= 0 ? history[lastAssistantIdx].text.trim() : '';
    if (lastOurs !== line) {
      const planDecision: Decision = { action: 'reply', reply_text: line, confidence: 1 };
      const v = policyGuard(line, {
        ...input.guard, state: ctx.state, paid: ctx.paid, estimateFromTeam: ctx.estimatedRefundCents,
        isApprovedTemplate: true, customerTextChars: customerBurst.length, customerText: customerBurst,
      });
      if (v.allowed) {
        return {
          kind: resolveAiMode(mode) === 'FULL_AUTO' ? 'queued' : 'pending_approval',
          replyText: line, decision: planDecision,
          reviewNote: "later plan: one line by stage (Jo's rule, no model call)",
          newState: undefined, stateChanged: false,
        };
      }
    }
  }

  // ── "IN WHAT CASES WOULD THERE BE NO REFUND?" (Jo, 22 Oct, +44 7809) ──────
  // A question about our guarantee's wording, not their tax. It used to get
  // the stock "Yes, that's definitely one of the many things we check" line.
  if (!willMode && burstSinceOurs.length > 0 && NO_REFUND_CASES_Q.test(customerBurst)) {
    const line = noRefundCasesMessage(thanksLang);
    if (line) {
      const v = policyGuard(line, {
        ...input.guard, state: ctx.state, paid: ctx.paid, estimateFromTeam: ctx.estimatedRefundCents,
        isApprovedTemplate: true, customerTextChars: customerBurst.length, customerText: customerBurst,
      });
      if (v.allowed) {
        return {
          kind: resolveAiMode(mode) === 'FULL_AUTO' ? 'queued' : 'pending_approval',
          replyText: line, decision: { action: 'reply', reply_text: line, confidence: 1 },
          reviewNote: 'when is there no refund: [o15_when_no_refund] (no model call)',
          newState: undefined, stateChanged: false,
        };
      }
    }
  }

  const decision = await decide(ctx, history, input.reviewHint ? { rewriteHint: input.reviewHint } : undefined);
  // THE ACCOUNT NAME IS NEVER A HANDOVER (Jo, 25 Oct, Sawada +61 468: "is the
  // account name Working Holiday Tax?" went to the team for two hours while
  // he stood ready to pay). A short account-name question that Will would
  // hand over or leave gets the fixed answer: The Accounting Academy.
  // Same for "how likely is it that I get something back?" (Jo, 25 Oct,
  // +49 1516): it depends on many factors, an estimate only after the review.
  if (willMode && !ctx.paid && decision.action !== 'reply' && customerBurst.length <= 220 && REFUND_CHANCE_RE.test(customerBurst)) {
    const msg = refundChanceMessage(ctx.lang);
    if (msg) {
      decision.action = 'reply';
      decision.approved_key = 'refund_chance';
      decision.confidence = 1;
      decision.reply_text = msg;
    }
  }
  // "I was told your service costs $100" (Jo, 25 Oct, Katie): not our price,
  // and not a reason to hand over.
  if (willMode && !ctx.paid && decision.action !== 'reply' && customerBurst.length <= 400 && quotesOtherPrice(customerBurst)) {
    const msg = notOurPriceMessage(ctx.lang);
    if (msg) {
      decision.action = 'reply';
      decision.approved_key = 'not_our_price';
      decision.confidence = 1;
      decision.reply_text = msg;
    }
  }
  if (willMode && !ctx.paid && isAccountNameQuestion(customerBurst) && decision.action !== 'reply') {
    decision.action = 'reply';
    decision.approved_key = 'account_name';
    decision.confidence = 1;
    decision.reply_text = accountNameMessage(ctx.lang);
  }

  // ── WILL DECIDES (Jo, 22 Oct): his chosen approved message, Jo's wording ──
  // In 'will' mode Will names the approved message (approved_key) and the
  // exact text is filled in here, in the customer's language. With no exact
  // version for this customer, Will's own reply_text stands.
  let approvedRendered = false;
  if (willMode && decision.action === 'reply' && decision.approved_key) {
    // Two of Jo's rules are checked in code, whatever Will chose:
    //  - any ABN income means the TFN + ABN price, never the TFN one;
    //  - other income that is not clearly ABN (freelance, UGC, side work) is
    //    never priced as TFN: it goes to the team (Jo, 22 Oct, Sydney);
    //  - a first message is never answered with the thank-you line.
    //  - Jo, 24 Oct (+353 85): the word "ABN" alone is not ABN income. "not
    //    sure if that's an ABN?" is a question, "I never worked under an ABN"
    //    rules it out, and the newest thing they said wins (abnStance).
    const rawTexts = history.filter((t) => t.role === 'customer').map((t) => t.text);
    const stance = abnStance(rawTexts);
    // With the ABN ruled out or only asked about, the bare word is not "other
    // income"; Uber, delivery, freelance and the rest still are.
    const customerTexts = rawTexts.map((t) => (stance === 'abn' ? t : t.replace(/\babn\b/gi, ' ')));
    const abnSignal = customerTexts.some((t) => CLEAR_ABN_RE.test(t));
    if (decision.approved_key === 'price_tfn' && (stance === 'abn' || (stance === null && abnSignal))) decision.approved_key = 'price_tfn_abn';
    else if (decision.approved_key === 'price_tfn_abn' && (stance === 'no_abn' || stance === 'unsure') && !abnSignal
      && !customerTexts.some((t) => OTHER_INCOME_RE.test(t))) decision.approved_key = 'price_tfn';
    else if (decision.approved_key === 'price_tfn' && customerTexts.some((t) => OTHER_INCOME_RE.test(t))) {
      return {
        kind: 'human_task', decision: { ...decision, action: 'human_task' },
        task: {
          reason: 'Mentioned income other than wages (freelance, UGC, side work); Will chose the TFN price. Check how they were paid before pricing.',
          severity: 'REVIEW', suggestedReply: undefined,
        },
      };
    }
    if (decision.approved_key === 'price_tfn_review' && (stance === 'abn' || (stance === null && abnSignal))) decision.approved_key = 'price_tfn_abn_review';
    else if (decision.approved_key === 'price_tfn_abn_review' && stance !== 'abn' && !abnSignal) decision.approved_key = 'price_tfn_review';
    if (decision.approved_key === 'thanks' && lastAssistantIdx < 0) decision.approved_key = undefined;
  }
  // STUDENT LINE (final review, 27 Oct). The fixed texts below were written
  // for backpackers. On SVT: super (DASP) is something the site says we help
  // with, so it goes to the team; the working holiday residency quiz and the
  // "anyone else on a working holiday" referral never go out; and a chat in
  // Chinese or Vietnamese keeps Mia's own words rather than an English text.
  if (currentBrand() === 'svt' && decision.approved_key) {
    if (decision.approved_key === 'no_dasp') {
      return {
        kind: 'human_task', decision: { ...decision, action: 'human_task' },
        task: { reason: 'Asking about super (DASP). The student site says we can help: the team answers.', severity: 'REVIEW', suggestedReply: undefined },
      };
    }
    const script = unsupportedScript(customerBurst);
    if (SVT_BLOCKED_KEYS.has(decision.approved_key)) decision.approved_key = undefined;
    else if (script && willMode && decision.action === 'reply') {
      // The same fixed message, in Chinese or Vietnamese (Jo, 27 Oct).
      const key = decision.approved_key;
      // The Chinese and Vietnamese price texts carry the standard fee and the
      // guarantee, neither of which applies to a return with foreign income
      // ($330/$495, no guarantee). Those chats go to the team (devil's
      // advocate review, 27 Oct).
      if ((key === 'price_tfn' || key === 'price_tfn_abn' || key === 'not_our_price')
        && hasForeignIncome(history.filter((t) => t.role === 'customer').map((t) => t.text))) {
        return {
          kind: 'human_task', decision: { ...decision, action: 'human_task' },
          task: { reason: `Foreign income in a ${script === 'zh' ? 'Chinese' : 'Vietnamese'} chat: the price is $330 / $495 with no guarantee. The team answers.`, severity: 'REVIEW', suggestedReply: undefined },
        };
      }
      const first = lastAssistantIdx < 0;
      // "I'll do it later" depends on the stage, as in English (later-plan.ts).
      const stage = key === 'later_plan'
        ? (ctx.state === 'PAID' || ctx.state === 'FORM_PENDING' ? 'later_plan@form'
          : ctx.state === 'PRICE_SENT' || ctx.state === 'PAYMENT_PENDING' ? 'later_plan@pay' : undefined)
        : undefined;
      const raw = (stage ? SVT_FIXED_TEXTS[script][stage] : undefined)
        ?? (first ? SVT_FIXED_TEXTS[script][`${key}@first`] : undefined) ?? SVT_FIXED_TEXTS[script][key];
      if (raw) {
        const name = custFirstName ? cleanFirstName(custFirstName) : '';
        const withName = name ? raw.replace(/\{\{name\}\}/g, name) : raw.replace(/ ?\{\{name\}\} ?/g, '');
        decision.reply_text = withName
          .replace(/\{\{form\}\}/g, `${VOICES.svt.siteUrl}/${script}/tax-form`)
          .replace(/\s+([!！,，])/g, '$1')
          .trimStart();
        flags.fixedText = decision.reply_text;
        approvedRendered = true;
        if ((key === 'price_tfn' || key === 'price_tfn_abn') && !decision.new_state && canTransition(ctx.state, 'PRICE_SENT')) decision.new_state = 'PRICE_SENT';
      }
      decision.approved_key = undefined;
    } else if (script) decision.approved_key = undefined;
  }
  if (willMode && decision.action === 'reply' && decision.approved_key) {
    const rendered = renderApproved(decision.approved_key, {
      state: ctx.state, lang: ctx.lang ?? thanksLang, firstName: custFirstName ? cleanFirstName(custFirstName) : null,
      firstContact: lastAssistantIdx < 0,
      lastWillText: lastAssistantIdx >= 0 ? history[lastAssistantIdx].text : '',
      foreign: hasForeignIncome(history.filter((t) => t.role === 'customer').map((t) => t.text)),
    });
    if (rendered) {
      decision.reply_text = rendered;
      approvedRendered = true;
      if ((decision.approved_key === 'price_tfn' || decision.approved_key === 'price_tfn_abn') && !decision.new_state && canTransition(ctx.state, 'PRICE_SENT')) {
        decision.new_state = 'PRICE_SENT';
      }
    }
  }

  // 13 Oct: the model handed a plain thank-you to the team ("Helllo, perfect
  // thank you" got "I've passed this to the team"). A closing has nothing for
  // a person to do: a thank-you gets one short line, anything else silence.
  if (!willMode && decision.action === 'human_task' && burstSinceOurs.length > 0 && isClosingOnly(customerBurst)) {
    if (!containsThanks(customerBurst)) return { kind: 'silent', decision: { ...decision, action: 'wait' }, reviewNote: 'closing only: nothing to hand over' };
    const line = thanksReply(lastAssistantIdx >= 0 ? history[lastAssistantIdx].text : '', thanksLang);
    const v = policyGuard(line, {
      ...input.guard, state: ctx.state, paid: ctx.paid, estimateFromTeam: ctx.estimatedRefundCents,
      isApprovedTemplate: true, customerTextChars: customerBurst.length, customerText: customerBurst,
    });
    if (!v.allowed) return { kind: 'silent', decision: { ...decision, action: 'wait' }, guardViolations: v.violations };
    return {
      kind: resolveAiMode(mode) === 'FULL_AUTO' ? 'queued' : 'pending_approval',
      replyText: line, decision: { ...decision, action: 'reply', reply_text: line },
      reviewNote: 'thank-you only: Will wanted to hand it over; a short reply went instead',
      newState: undefined, stateChanged: false,
    };
  }

  if (decision.action === 'human_task') {
    // TYPE 2 (Jo, 31 Aug): a human_task is a PROBLEM that needs a person — a
    // handoff, low confidence, a refund/cancellation, something not in the
    // library. It is ALWAYS a manual task, in BOTH modes (Approval and
    // Autopilot). It is NEVER auto-sent and NEVER shown as a green "just
    // approve" reply, because that green lane is only for a confident normal
    // reply (type 1). Will still attaches its best draft to the task, so the
    // owner has one-click "Send Reply" to work from — but it stays a task.
    //
    // The attached draft is the cleaned, guard-passed version when it clears the
    // Policy Guard; if the draft breaks a hard rule it is left as the raw draft
    // for the owner to fix by hand.
    let suggestedReply: string | undefined = decision.suggested_reply;
    let draft = (decision.suggested_reply ?? '').trim();
    // 11 Oct (full audit, decision 12): an angry, worried or refund-asking
    // customer ALWAYS gets a warm draft on the task. In every case the audit
    // checked (Niamh, Fatima, Victoria, Masa, Tomeka) Will's draft was better
    // than what was typed by hand; the team edits it, never starts blank.
    if (!draft && UPSET_OR_REFUND.test(customerBurst)) {
      try {
        const again = await decide(ctx, history, {
          rewriteHint: 'You chose human_task without a draft. This customer is upset, worried or asking about a refund, and the team will reply by editing YOUR draft, never from a blank box. Write suggested_reply now: calm, warm, never defensive or accusatory, one or two short sentences that acknowledge what they said and what happens next (a person is looking at it). No promises of money, no amounts, no apology for the company beyond "sorry for the wait". Keep action human_task.',
          timeoutMs: 12_000,
        });
        if (again.suggested_reply?.trim()) draft = again.suggested_reply.trim();
        else if (again.action === 'reply' && again.reply_text?.trim()) draft = again.reply_text.trim();
      } catch { /* the task is raised either way */ }
    }
    if (draft) {
      // Owner rules: no dashes ever, and at most one emoji (opening only). Applied
      // to the model's prose BEFORE placeholders are filled, so a URL/bank value
      // inserted afterwards keeps any hyphen it legitimately needs. Then strip a
      // repeated bank block if the details were already sent.
      const text = applyBankRule(
        fillPlaceholders(normaliseWillText(draft, { firstMessage, firstName: custFirstName }), bank),
      );
      // The CLEANED text either way. It used to fall back to the model's raw
      // prose when the guard refused it, so the draft in the task box could
      // carry three emojis, "Hi Daniel," on a non-opening turn and an unfilled
      // {{PLACEHOLDER}}, one click from being sent (audit, 4 Sep). The task
      // still says why the reply was held; what the owner sends is normalised.
      if (text.trim()) suggestedReply = text;
    }
    return {
      kind: 'human_task',
      decision,
      task: {
        reason: decision.task_reason ?? 'Assistant requested handoff',
        severity: decision.task_severity ?? 'REVIEW',
        suggestedReply,
      },
    };
  }
  if (decision.action === 'wait' || !decision.reply_text) {
    return { kind: 'silent', decision };
  }

  // --- state transition validation (server-side; the model only proposes) ---
  let newState: CustomerState | undefined;
  let invalidTransition = false;
  if (decision.new_state && decision.new_state !== ctx.state) {
    if (canTransition(ctx.state, decision.new_state)) {
      newState = decision.new_state;
    } else {
      invalidTransition = true;
    }
  }

  // A rejected state jump is not, by itself, a reason to hand a good reply to a
  // human (Jo, 31 Aug: "the answer is excellent, why did it become a task?").
  // The common case is a customer who runs ahead of the pipeline: at PRICE_SENT
  // they message "I've sent my form", and the model over-shoots to FORM_COMPLETE.
  // The state machine only walks one step at a time, so the jump is invalid, but
  // the warm holding reply ("got it, the team will get back to you") is perfectly
  // safe to send. So: DROP the invalid state change, keep the current valid
  // state, and let the reply go out normally through the guard below.
  //
  // The exception is a jump INTO a state that CONFIRMS something only we can
  // verify: money received (PAID), a signed return (SIGNED), a lodgement
  // (LODGED/COMPLETED). We must never let the customer's word alone flip those,
  // because the reply then falsely confirms payment or lodgement. Those stay a
  // human CONFLICT task exactly as before.
  const UNVERIFIABLE_CONFIRM_STATES: CustomerState[] = ['PAID', 'SIGNED', 'LODGED', 'COMPLETED'];
  // 1 Oct (72-hour audit, Simon +61 425): he HAD paid and was at Form Pending;
  // the model proposed PAID again, which is an invalid step, and the reply to
  // "Done! / Helloo? / Hey?" was held as a CONFLICT four times over 23 hours.
  // A proposed PAID for somebody already past payment confirms nothing new:
  // the jump is dropped and the reply goes out like any other.
  const alreadyConfirmed = decision.new_state === 'PAID' && ctx.paid;
  if (invalidTransition && decision.new_state && UNVERIFIABLE_CONFIRM_STATES.includes(decision.new_state) && !alreadyConfirmed) {
    return {
      kind: 'human_task',
      decision,
      invalidTransition: true,
      task: {
        reason: `Model proposed invalid transition ${ctx.state} -> ${decision.new_state}; reply held for review`,
        severity: 'CONFLICT',
        // Normalised, not raw: this is a one-click "Send Reply" (audit, 4 Sep).
        suggestedReply: applyBankRule(fillPlaceholders(normaliseWillText(scrubUnpaidDraft(decision.reply_text, ctx.paid), { firstMessage, firstName: custFirstName }), bank)) || undefined,
      },
    };
  }
  // Any other invalid jump is neutralised: the reply proceeds, the state does not
  // advance (newState stays undefined). invalidTransition is recorded on the
  // outcome for the audit trail but no longer forces a task.

  // A VALID jump into PAID is still the model's word, and the model's word is
  // not money. Jo's rule is "trust the CUSTOMER": the deterministic payment
  // claim (payment-claim.ts, every language) or a verified screenshot is what
  // moves someone to Paid, never a reply that happens to carry new_state PAID.
  // Audit, 3 Sep: a customer at PRICE_SENT asking "can I pay by card?" could be
  // answered "Perfect, thanks! Please fill out the form" with new_state PAID
  // and, on Autopilot, be moved to Paid, sent the form link and handed to the
  // team with no money received. So a proposed PAID with no payment report in
  // anything the customer wrote since our last message is held as a CONFLICT
  // task with the draft attached, exactly like an invalid jump into PAID.
  if (newState === 'PAID' && !ctx.paid) {
    let lastAssistant = -1;
    for (let i = history.length - 1; i >= 0; i--) if (history[i].role === 'assistant') { lastAssistant = i; break; }
    const sinceOurs = history.slice(lastAssistant + 1).filter((t) => t.role === 'customer');
    const burst = sinceOurs.length ? sinceOurs : history.filter((t) => t.role === 'customer').slice(-1);
    if (!burst.some((t) => claimsPayment(t.text))) {
      return {
        kind: 'human_task',
        decision,
        invalidTransition: true,
        task: {
          reason: `Model proposed ${ctx.state} -> PAID but the customer did not report a payment; reply held for review`,
          severity: 'CONFLICT',
          suggestedReply: applyBankRule(fillPlaceholders(normaliseWillText(scrubUnpaidDraft(decision.reply_text, ctx.paid), { firstMessage, firstName: custFirstName }), bank)) || undefined,
        },
      };
    }
  }

  // --- fill system-owned placeholders, then guard the final text ---
  // Owner rules (no dashes ever; at most one emoji, opening only) applied to the
  // model's prose before filling, so links and bank details are never mangled.
  // Then strip a repeated bank block if the details were already sent.
  // If the whole reply was just a repeat of the bank details, there is nothing
  // left worth sending — stay silent rather than send an empty message.
  if (!applyBankRule(
    fillPlaceholders(normaliseWillText(decision.reply_text, { firstMessage, firstName: custFirstName }), bank),
  ).trim()) return { kind: 'silent', decision };
  const guardCtx: GuardContext = {
    ...input.guard,
    state: ctx.state,
    paid: ctx.paid,
    estimateFromTeam: ctx.estimatedRefundCents,
    isApprovedTemplate: approvedRendered,
    customerTextChars: customerBurst.length,
    customerText: customerBurst,
  };
  // The payment-confirmation turn may mention onboarding although paid flips now;
  // only relax when the customer was NOT already paid (audit finding).
  if (newState === 'PAID' && !ctx.paid) guardCtx.paid = false;

  let text = fitStockLine(applyBankRule(
    // Jo's exact wording (approvedRendered) is not reshaped by the rules for
    // Will's own prose (emoji position, openers); it is already approved.
    fillPlaceholders(approvedRendered ? decision.reply_text : normaliseWillText(decision.reply_text, { firstMessage, firstName: custFirstName }), bank),
  ), customerBurst);
  let rewriteNote: string | undefined;
  // 1 Oct (72-hour audit): "Perfect" opened 63 of Will's messages in three
  // days, "Happy to help" 22, "No worries" 21. The prompt already says once
  // per conversation; the code now enforces it. From Will's third message on,
  // a cheer-word opener is dropped and the message starts with its content.
  // The approved price message ("Great! Here are the payment details:") is
  // left alone: its opener is Jo's, and it is the one place the word belongs.
  const willTurns = history.filter((t) => t.role === 'assistant').length;
  if (!approvedRendered && willTurns >= 2 && !/\bBSB\b|062692|81049952/.test(text)) {
    text = stripCheerOpener(text, custFirstName);
  }
  // 1 Oct (72-hour audit): twenty price messages in three days came in four
  // guarantee wordings and four account-name variants, because the model
  // reproduces the price message from memory. For an English chat the price
  // message is now pasted from the code, verbatim: the draft may keep ONE
  // line of its own before it, nothing after. Other languages keep the
  // model's translation (there is no approved text to paste).
  // 16 Oct (Megan): a price the TEAM quoted in this chat stands; the standard
  // TFN / TFN + ABN message must not overwrite it with the wrong label.
  const teamQuoted = history.some((t) => t.role === 'assistant' && t.author === 'HUMAN' && /\$\s?\d/.test(t.text));
  // THE FOREIGN-INCOME PRICE ONLY WITH FOREIGN INCOME (Jo, 23 Oct, Taiki):
  // "I'm back in Japan, TFN and ABN income" was quoted $495 in Japanese.
  // Living overseas now is not foreign income. In every language, $495 / $330
  // become $385 / $220 unless the customer actually reported foreign income.
  // THE BANK DOCUMENT IS NEVER "NOT NEEDED" (Jo, 25 Oct, +49 160): a reply
  // telling the customer they need no bank statement is replaced by Jo's
  // wording in their language; with no wording in that language, the team.
  if (BANK_DOC_DENIED_RE.test(text)) {
    const msg = bankDocumentMessage(ctx.lang);
    if (!msg) {
      return {
        kind: 'human_task', decision, guardViolations: ['BANK_DOCUMENT_DENIED'],
        task: { reason: 'Will was about to say the bank document is not needed. It is required: an official document with their full name, BSB and account number.', severity: 'REVIEW', suggestedReply: undefined },
        newState: undefined, stateChanged: false,
      };
    }
    text = msg;
    rewriteNote = 'The draft said the bank document is not needed; Jo\'s wording went instead (it is an ATO requirement).';
  }
  if (!foreignCustomer && !teamQuoted && !ctx.paid) {
    const fixed = fixForeignPrice(text);
    if (fixed !== text) { text = fixed; rewriteNote = 'The draft quoted the foreign-income price to a customer with no foreign income; the standard price went instead.'; }
  }
  // A PRICE WITH NOTHING TO PAY WITH (Jo, 23 Oct, Taiki): the customer gave
  // their track and asked the total; the reply quoted the fee and asked "any
  // questions?". When the fee is in the reply, the track is clear, they asked
  // the price, and the bank details have never gone out, the end of the
  // approved price message is added, in their language.
  if (!ctx.paid && !teamQuoted && !bankAlreadySent && !/\bBSB\b|062692|81049952/.test(text)
      && /\$\s?(?:220|385|330|495)\b|(?:220|385|330|495)\s?(?:ドル|AUD)/.test(text) && PRICE_ASK_RE.test(customerBurst)) {
    const said = history.filter((t) => t.role === 'customer').map((t) => t.text);
    const track = /\$\s?(?:385|495)\b|(?:385|495)\s?(?:ドル|AUD)/.test(text) ? 'TFN_ABN' : 'TFN';
    const tail = priceTail(ctx.lang, track, foreignCustomer);
    if (tail && (track === 'TFN_ABN' ? abnStance(said) === 'abn' || (abnStance(said) === null && said.some((t) => CLEAR_ABN_RE.test(t))) : true)) {
      // "Any questions?" at the end gives way to the payment step.
      const trimmed = text.replace(/\n*[^\n]*(?:any questions|questions\?|ご質問はありますか|noch fragen|fragen\?)[^\n]*$/i, '').trim();
      text = `${trimmed}\n\n${tail}`;
      if (!newState && canTransition(ctx.state, 'PRICE_SENT')) newState = 'PRICE_SENT';
    }
  }
  // A Chinese or Vietnamese fixed price message is already Jo's wording.
  if ((ctx.lang ?? 'en') === 'en' && !flags.fixedText && !ctx.paid && !teamQuoted && /\bBSB\b|062692|81049952/.test(text)) {
    const enforced = enforcePriceMessage(text, foreignCustomer, alreadyLodged(history.filter((t) => t.role === 'customer').map((t) => t.text)));
    if (enforced !== text) text = enforced;
  }
  // 16 Oct (Jo): they already checked their result: the guarantee in the
  // price message becomes "our fee is non-refundable and covers our time and
  // review", with the reason. Whatever the model wrote, in code.
  if (!ctx.paid && /\bBSB\b|062692|81049952/.test(text)) {
    const checked = alreadyCheckedReason(history.filter((t) => t.role === 'customer').map((t) => t.text));
    // A review of a return already lodged already says the fee is the same
    // whatever the result; nothing to add there.
    if (checked && !/for the review itself/i.test(text)) {
      if (GUARANTEE_RE.test(text)) text = stripGuarantee(text);
      text = applyCheckedClause(text, checked);
      if (!text.includes(CHECKED_CLAUSE[checked])) text = `${text.trim()}\n\n${CHECKED_CLAUSE[checked]}`;
    }
  }

  // ── NO BANK DETAILS BEFORE AN EXCHANGE (11 Oct, full audit, decision 3) ──
  //
  // Zero of the 101 customers who paid did so off a bank block sent before
  // they had chosen anything; Elsa gave her TFN and got an invoice sixty
  // seconds later, and every "is this a scam?" started that way. Will's
  // very first message is the opening question, unless the customer's own
  // first message already picks a track or asks the price. The price message
  // (with the bank details) follows their answer, immediately.
  // Not for a return they already lodged (Jo, 24 Oct, Chinami): the review
  // has one price, there is no option to ask about.
  if (!ctx.paid && willTurns === 0 && BANK_RE.test(text) && !detectChoice(customerBurst, null) && !PRICE_ASK_RE.test(customerBurst)
      && !alreadyLodged(history.filter((t) => t.role === 'customer').map((t) => t.text))) {
    const name = custFirstName ? cleanFirstName(custFirstName) : '';
    // A Chinese or Vietnamese chat on the student line gets the same opening
    // question in its own language, sent like the English one.
    const ownScript = flags.fixedText && currentBrand() === 'svt' ? unsupportedScript(customerBurst) : null;
    const ownOpening = ownScript ? SVT_FIXED_TEXTS[ownScript].opening : undefined;
    if (ownOpening) {
      text = (name ? ownOpening.replace(/\{\{name\}\}/g, name) : ownOpening.replace(/ ?\{\{name\}\}/g, '')).trimStart();
      flags.fixedText = text;
    } else {
      text = name ? APPROVED.opening.replace(/^Hey!/, `Hey ${name}!`) : APPROVED.opening;
    }
    rewriteNote = 'The first draft sent the bank details before any exchange; the opening question went instead.';
    newState = canTransition(ctx.state, 'QUALIFIED') ? 'QUALIFIED' : undefined;
  }

  // ── "PAYMENT RECEIVED" IS NEVER THE MODEL'S OWN WORDS (11 Oct, decision 8) ──
  //
  // Luke was moved to Paid and filled the form without ever paying, because
  // Will glued "Payment received!" onto an empathy reply; Federica got "You're
  // very welcome! Payment received" after saying she would pay next week.
  // The confirmation and the form link belong to the code (the screenshot
  // path, the typed "I paid" rule, the team's button). When the customer has
  // not reported a payment, any confirmation or form link in the draft is
  // removed and the proposed move to Paid is dropped.
  // One payment, one confirmation (Jo, 23 Oct): already paid and already
  // told, so a "payment received" paragraph in Will's draft is dropped.
  if (ctx.paid && PAYMENT_RECEIVED_PREFIX.test(text)
      && history.some((t) => t.role === 'assistant' && looksLikePaymentConfirmation(t.text))) {
    // The confirmation runs from its first line to the end (title, the form
    // request, the link), so everything from that paragraph on goes.
    const paras = text.split(/\n{2,}/);
    const at = paras.findIndex((para) => PAYMENT_RECEIVED_PREFIX.test(para));
    const kept = paras.slice(0, at < 0 ? paras.length : at).join('\n\n').trim();
    if (!kept) return { kind: 'silent', decision: { ...decision, action: 'wait' }, reviewNote: 'payment already confirmed: no second confirmation' };
    text = kept;
  }
  if (!ctx.paid && (PAYMENT_RECEIVED_PREFIX.test(text) || FORM_LINK_IN_TEXT.test(text)) && !claimsPayment(customerBurst)) {
    const cleaned = text
      .split(/\n{2,}/)
      .filter((para) => !PAYMENT_RECEIVED_PREFIX.test(para) && !FORM_LINK_IN_TEXT.test(para) && !/fill (?:out|in) (?:this|the) (?:quick )?form|questionnaire/i.test(para))
      .join('\n\n')
      .trim();
    rewriteNote = 'The draft confirmed a payment the customer never reported; the confirmation was removed and the stage stays.';
    if (newState === 'PAID') newState = undefined;
    if (cleaned.length >= 20) {
      text = cleaned;
    } else {
      return {
        kind: 'human_task', decision, guardViolations: ['PAYMENT_CONFIRMED_WITHOUT_CLAIM'],
        task: { reason: 'Will wanted to confirm a payment the customer never reported. Check the bank, then reply.', severity: 'REVIEW', suggestedReply: text },
        newState: undefined, stateChanged: false,
      };
    }
  }

  // ── ANSWER FIRST, PITCH LATER (11 Oct, full audit, decision 2) ──────────
  //
  // Stephanie asked five questions and got "Great! Here are the payment
  // details". Ten October leads opened with a real question and got the two
  // prices; nine of them never wrote again. A message that asks something
  // (a "?", more than 25 words, a numbered list) and is not itself about the
  // price or a choice is answered in one to three lines plus one qualifying
  // question. The prices or the bank block are never that answer; they come
  // in the next message. "How much?", "TFN?", "220?" are about the price and
  // get it.
  // Not for the review of a return they already lodged (Jo, 24 Oct, Chinami:
  // "can it be lodged again?" got a task and a holding line). "Yes, happy to
  // help, it is a review, $220 whatever the result" IS the answer.
  const isReviewOfLodged = /for the review itself|確認作業に対して|für die Prüfung selbst/i.test(text)
    && alreadyLodged(history.filter((t) => t.role === 'customer').map((t) => t.text));
  // Nor for "what is the account name?" (Jo, 25 Oct, Sawada): the account
  // name and the bank details ARE the answer.
  if (!isReviewOfLodged && !isAccountNameQuestion(customerBurst) && menuAsAnswer(customerBurst, text, ctx.paid)) {
    const retry = await decide(ctx, history, {
      rewriteHint: 'Your previous reply was refused: the customer ASKED something and you answered with the prices or the bank details. Rewrite: answer what they asked FIRST, in one to three short lines (an operational question gets a real answer; a tax-outcome question gets the one line "that\'s one of the many things we check before we lodge, so leave that with us"), then ONE short qualifying question (TFN only, or also ABN income? still in Australia?). Do NOT include $220, $385, the BSB or the account number in this message. Same language, same action.\n\nPrevious reply, for reference only:\n"""\n' + decision.reply_text.slice(0, 1500) + '\n"""',
      timeoutMs: 12_000,
    });
    const rewritten = retry.action === 'reply' && retry.reply_text
      ? applyBankRule(fillPlaceholders(normaliseWillText(retry.reply_text, { firstMessage, firstName: custFirstName }), bank))
      : '';
    if (rewritten.trim() && !MENU_RE.test(rewritten) && !BANK_RE.test(rewritten)) {
      rewriteNote = 'The first draft answered a question with the prices; Will rewrote it to answer first.';
      text = rewritten;
    } else {
      const stripped = stripMenuAndBank(text);
      if (stripped.length >= 40) {
        rewriteNote = 'The first draft answered a question with the prices; the price lines were removed and the answer went.';
        text = stripped;
      } else {
        return {
          kind: 'human_task', decision, guardViolations: ['MENU_AS_ANSWER'],
          task: { reason: 'Customer asked a question and Will only had the price list for it. Answer the question, then the price.', severity: 'URGENT', suggestedReply: text },
          newState: undefined, stateChanged: false,
        };
      }
    }
    // A reply that no longer carries the prices cannot move them to Price Sent.
    if (newState === 'PRICE_SENT') newState = undefined;
  }

  // ── "okay thank you" GETS ONE LINE BACK (Jo, 4 Sep) ───────────────────────
  //
  // Millie (+61 424 909 473) closed a long ATO-review explanation with "okay
  // thank you". Will answered with three warm sentences: "No worries at all,
  // Millie! I know the wait can be frustrating, but you're in good hands. Just
  // sit tight and we'll keep an eye on it for you." Jo deleted it from the
  // phone and sent "No worries at all!" himself. At the end of a conversation
  // three sentences of reassurance is not warmth, it is padding, and padding is
  // one of the clearest tells that nobody is typing.
  //
  // WHEN IT APPLIES, narrowly — "yes" is also a courtesy line, and "yes" to
  // "shall we get started?" must still get the whole payment message:
  //   - everything they wrote since our last message is pure courtesy, AND
  //   - the reply carries nothing structural: no digits (a price, an amount, a
  //     BSB, an account, a year), no link, and no question of our own, AND
  //   (1 Oct: the "over 120 characters" condition is gone; a short "You're
  //   very welcome!" is exactly the bubble the audit counted twenty of.)
  // Anything with substance in it is left exactly as the model wrote it.
  const courtesyClose = isCourtesyLine(customerBurst)
    && customerBurst.trim().length > 0
    && !/\d/.test(text)
    && !/https?:\/\//i.test(text)
    && !text.includes('?')
    && !text.includes('？');
  // Jo, 12 Oct: "Will must think, not follow a closed template." A thank-you
  // in any wording ("100% thank you", "thanks guys", "legends") is answered
  // by Will in his own words, kept to one short line. Only a bare "ok" / 👍
  // with no thanks in it stays silent.
  const replyIsPlain = !/\d/.test(text) && !/https?:\/\//i.test(text) && !/[?？]/.test(text);
  const thanksClose = containsThanks(customerBurst) && !customerAskedSomething(customerBurst) && customerBurst.trim().length <= 120;
  if (willMode) {
    // Will read the whole chat and chose to reply; the keyword trims below
    // second-guessed that from one message. His choice stands.
  } else if (thanksClose && replyIsPlain) {
    text = firstSentenceOnly(text);
  } else if (courtesyClose && !containsThanks(customerBurst)) {
    // 1 Oct (72-hour audit): twenty "You're very welcome!" messages in three
    // days, each a bubble the customer did not need, pushing the real content
    // up the screen. A bare thank-you, "ok" or 👍 that our reply would answer
    // with nothing structural now gets no reply at all. Jo, 4 Sep, wanted one
    // line; the audit showed even one line reads as a machine filling space.
    return { kind: 'silent', decision: { ...decision, action: 'wait', reply_text: undefined }, reviewNote: 'courtesy close: nothing to add, so nothing sent' };
  }

  let verdict = policyGuard(text, guardCtx);

  // ── TOO LONG IS NOT A REASON TO STOP (Jo, 4 Sep) ─────────────────────
  //
  // Helena (+44 7984, 4 Sep): a correct answer to "can your agent assess my
  // residency and the Addy case before lodging?" was refused for REPLY_TOO_LONG
  // and became a task. The answer itself was fine; it was an essay. Jo's rule:
  // before payment every such question gets the same short shape, three or
  // four lines that acknowledge what they wrote, say it is exactly what the
  // review covers, and end with the next step. So when length is the ONLY
  // fault, Will is asked once to rewrite the same answer short, and that
  // rewrite goes through the same guard. Only if that still fails does the
  // approved "we check that as part of the review" line (pre-payment) or a
  // task (post-payment) follow.
  const LENGTH_ONLY = new Set(['REPLY_TOO_LONG', 'AI_PAUSED_FOR_CUSTOMER', 'CUSTOMER_OPTED_OUT', 'LEGACY_CHAT_AI_DISABLED', 'KILL_SWITCH_ACTIVE']);
  if (!verdict.allowed && verdict.violations.includes('REPLY_TOO_LONG') && verdict.violations.every((v) => LENGTH_ONLY.has(v))) {
    const aroundPrice = /\bBSB\b|062692|81049952/.test(decision.reply_text);
    const retry = await decide(ctx, history, {
      rewriteHint: aroundPrice
        ? `Your previous reply was refused because it was TOO LONG around the price message. Send the approved price message for their chosen option EXACTLY as approved, with at most ONE short line before it that answers what they asked. Nothing else: no explanation, no second paragraph. Keep the same language, action and new_state.\n\nPrevious reply, for reference only:\n"""\n${decision.reply_text.slice(0, 1500)}\n"""`
        : `Your previous reply was refused because it was TOO LONG. Send the SAME answer again, shorter. Rule: every OPERATIONAL question they asked (our process, documents, the fee, the bank account, myGov access, who signs, timing, registration, what we need from them) gets its own answer in ONE short line each, in the order they asked (numbered, if the customer numbered their questions). Every TAX-OUTCOME question (residency result, refund amount, deductions, Medicare outcome) is covered by ONE line in total: "that's one of the many things we check before we lodge, so leave that with us". Then the next step for their stage. No greeting line, no "great question", no explanations of how tax works. Keep the same language, action and new_state.\n\nPrevious reply, for reference only:\n"""\n${decision.reply_text.slice(0, 1500)}\n"""`,
      timeoutMs: 12_000,
    });
    if (retry.action === 'reply' && retry.reply_text) {
      const shorter = applyBankRule(
        fillPlaceholders(normaliseWillText(retry.reply_text, { firstMessage, firstName: custFirstName }), bank),
      );
      const shorterVerdict = policyGuard(shorter, guardCtx);
      if (shorter.trim() && shorterVerdict.allowed) {
        rewriteNote = `Will's first draft was held (${verdict.violations.join(', ')}); he rewrote it short and that version went.`;
        text = shorter;
        verdict = shorterVerdict;
      } else if (shorter.trim() && shorter.length < text.length
          && shorterVerdict.violations.every((v) => LENGTH_ONLY.has(v))) {
        // 1 Oct (72-hour audit): a rewrite that is shorter and clean apart
        // from length goes out. The alternative, swapping in the stock "one
        // of the many things we check" line, answered rick's six questions,
        // Simon's "which is the account number" and Laura's TPB question with
        // a sentence about tax. Long and right beats short and wrong.
        rewriteNote = `Will's first draft was held (${verdict.violations.join(', ')}); the shorter rewrite still ran long but was otherwise clean, so it went.`;
        text = shorter;
        verdict = { ...shorterVerdict, allowed: true, violations: [] };
      }
    }
  }

  if (!verdict.allowed) {
    // ── DELIBERATE SILENCE IS NOT A FAULT ────────────────────────────────
    //
    // Four of the guard's rules do not mean "Will wrote something unsafe".
    // They mean "Will is not the one talking here, on purpose":
    //
    //   AI_PAUSED_FOR_CUSTOMER   you replied yourself, so you have the wheel
    //   CUSTOMER_OPTED_OUT       they asked to be left alone
    //   LEGACY_CHAT_AI_DISABLED  an imported chat, yours by policy
    //   KILL_SWITCH_ACTIVE       you switched everything off
    //
    // Raising a task for these was noise, and it grew with the thing Jo does
    // most: the moment he answers a chat himself, every "thanks!", "perfect"
    // and 👍 that follows opened an item for him to close. Found 27 Aug on
    // Chloe (+1 657 258 1938) — he replied at 14:45, she wrote "Perfect,
    // thanks again!" at 14:49, and that courtesy line became a task.
    //
    // There is nothing to hand over: the conversation is already his, and the
    // message is already in the chat where he is reading it. So Will simply
    // stays quiet, which is what these rules were asking for in the first
    // place. Anything else in the verdict — a price, a determination, a myGov
    // walkthrough — still raises the task exactly as before, including when it
    // appears ALONGSIDE one of these four.
    const NOT_A_FAULT = new Set([
      'AI_PAUSED_FOR_CUSTOMER', 'CUSTOMER_OPTED_OUT',
      'LEGACY_CHAT_AI_DISABLED', 'KILL_SWITCH_ACTIVE',
    ]);
    if (verdict.violations.every((v) => NOT_A_FAULT.has(v))) {
      return { kind: 'silent', decision };
    }

    // ── THE ACCOUNT NAME HAS ONE ANSWER (11 Oct, full audit, decision 4) ──
    // A draft that names the account wrongly (or vaguely) is replaced by the
    // fixed account-name answer in the customer's language, never a task:
    // the customer is at the bank right now.
    if (verdict.violations.includes('ACCOUNT_NAME_WRONG')
        && verdict.violations.every((v) => v === 'ACCOUNT_NAME_WRONG' || v === 'REPLY_TOO_LONG' || NOT_A_FAULT.has(v))) {
      const safe = accountNameMessage(ctx.lang);
      return {
        kind: resolveAiMode(mode) === 'FULL_AUTO' ? 'queued' : 'pending_approval',
        replyText: safe,
        decision: { ...decision, reply_text: safe, new_state: undefined },
        guardViolations: verdict.violations,
        reviewNote: `Will named the account wrongly (${verdict.violations.join(', ')}); the fixed account-name answer went instead.`,
        newState: undefined, stateChanged: false,
      };
    }

    // ── THE SAFE ANSWER INSTEAD OF A TASK (Jo, 3 Sep) ────────────────────
    //
    // Before payment, a customer asks the question every customer asks:
    // "so do you think I'll get money back?", "am I a resident?", "do I pay
    // Medicare?". The model sometimes answers it ("you can apply for a
    // Medicare Levy Exemption, which would save you around 2%"), the guard
    // stops it as a TAX_DETERMINATION, and Jo gets an URGENT task whose
    // right answer he already approved months ago: objection #7, "that is
    // exactly what we check as part of the review". So when the ONLY thing
    // wrong with a pre-payment reply is that it determined something (or was
    // long while doing so), Will sends #7 in the customer's language and the
    // chat keeps moving. Every other violation (an invented price, a refund
    // promise, a myGov walkthrough, a placeholder) is still a task: those
    // have no approved stand-in.
    // 4 Sep: the same stand-in also covers a pre-payment reply that is STILL
    // too long after the rewrite above. Jo: before payment the answer to any
    // detailed tax story is the same, "that is exactly what our review
    // covers", so a long draft is not worth a task either.
    // 1 Oct: REPLY_TOO_LONG is no longer in this set. A long draft is trimmed
    // above, never replaced by the stock line (72-hour audit: rick, Simon,
    // Laura, Laurine all got a sentence about tax instead of their answer).
    const DETERMINATION_ONLY = new Set(['TAX_DETERMINATION', 'PRE_PAYMENT_MEDICARE_SCRIPT', 'PRE_PAYMENT_HEDGE']);
    const isDetermination = verdict.violations.includes('TAX_DETERMINATION') || verdict.violations.includes('PRE_PAYMENT_MEDICARE_SCRIPT') || verdict.violations.includes('PRE_PAYMENT_HEDGE');
    // A held PRICE message (bank details, not yet sent) still gets the approved
    // price message as its stand-in whatever held it, length included: the
    // customer has just chosen (28 Sep, Maria). Everything else that is only
    // too long is a task now, never the stock line.
    const heldPrice = !bankAlreadySent && /\bBSB\b|062692|81049952/.test(decision.reply_text ?? '')
      && !(customerAskedSomething(customerBurst) && !isChoiceOrPriceAsk(customerBurst))
      && verdict.violations.every((v) => v === 'REPLY_TOO_LONG' || DETERMINATION_ONLY.has(v) || NOT_A_FAULT.has(v));
    if (!ctx.paid
        && (isDetermination || heldPrice)
        && verdict.violations.every((v) => DETERMINATION_ONLY.has(v) || NOT_A_FAULT.has(v) || (heldPrice && v === 'REPLY_TOO_LONG'))) {
      // 28 Sep (Maria, +49 176 41747743): she wrote "Die zweite, TFN und ABN"
      // and got the "one of the many things we check" line, because Will's
      // German price message was held for length and this stand-in went out.
      // A draft that carries the bank details IS the price message: if it is
      // held, the stand-in is the approved price message for the amount the
      // draft named, never the one-line answer. The customer just chose.
      // 28 Sep, 19:25 (+33 7 81): the customer had the bank details already
      // and asked us to confirm them; Will's confirmation was held and this
      // stand-in re-sent the whole price message. The price message is the
      // stand-in ONLY while the bank details have never gone out, i.e. the
      // customer is choosing now. Once they have them, a held draft is a task.
      const draftMentionsBank = /\bBSB\b|062692|81049952/.test(decision.reply_text ?? '');
      const draftHasBank = !bankAlreadySent && draftMentionsBank;
      const priceStandIn = draftHasBank
        ? (/\$\s?495\b/.test(decision.reply_text ?? '') ? APPROVED.price_tfn_abn_foreign : /\$\s?330\b/.test(decision.reply_text ?? '') ? APPROVED.price_tfn_foreign : /\$\s?385\b/.test(decision.reply_text ?? '') ? APPROVED.price_tfn_abn : /\$\s?220\b/.test(decision.reply_text ?? '') ? APPROVED.price_tfn : null)
        : null;
      const safe = priceStandIn ?? fitStockLine(professionalQuestionMessage(ctx.lang), customerBurst);
      // A held draft about the bank details, for a customer who already has
      // them, is a question about the ACCOUNT (is it official, which name, is
      // the amount right). Neither stand-in answers that; a person does.
      const safeVerdict = bankAlreadySent && draftMentionsBank ? { allowed: false } : policyGuard(safe, guardCtx);
      if (safeVerdict.allowed) {
        const priceState: CustomerState | undefined = priceStandIn
          ? (decision.new_state === 'PRICE_SENT' || canTransition(ctx.state, 'PRICE_SENT') ? 'PRICE_SENT' : undefined)
          : undefined;
        return {
          kind: resolveAiMode(mode) === 'FULL_AUTO' || isApprovedVerbatim(safe, custFirstName) ? 'queued' : 'pending_approval',
          replyText: safe,
          decision: { ...decision, reply_text: safe, new_state: priceState },
          guardViolations: verdict.violations,
          reviewNote: priceStandIn
            ? `Will's own price message was held (${verdict.violations.join(', ')}); the approved price message went instead.`
            : `Will's own draft was held (${verdict.violations.join(', ')}); the approved "we check that as part of the review" answer went instead.`,
          newState: priceState,
          stateChanged: priceState != null && priceState !== ctx.state,
        };
      }
    }

    return {
      kind: 'human_task',
      decision,
      guardViolations: verdict.violations,
      task: {
        reason: `Policy Guard blocked reply: ${verdict.violations.join(', ')}`,
        severity: 'URGENT',
        suggestedReply: text,
      },
      newState,
      stateChanged: false,
    };
  }

  // LANGUAGE NO LONGER HOLDS A GREEN REPLY (Jo, 1 Sep). A reply that passed the
  // guard is a "green" reply and, on Autopilot, sends on its own whatever the
  // language: English, German, Japanese, French, it makes no difference. This
  // used to hold every non-English reply for approval, because the guard's
  // lexical rules were English-only, so a clean foreign reply could not be
  // verified. The guard's MONEY rules (a refund figure, a non-fixed price, a
  // foreign-currency amount) are number/symbol based and already fire in every
  // language, and the phrase rules (refund-the-fee / out-of-pocket promise,
  // discounts) have been extended to the languages Will speaks, so a foreign
  // reply is now genuinely checked rather than merely held. `unguardedLanguage`
  // is still returned for the audit trail; it no longer gates the send.

  // SHORT PARAGRAPHS (Jo, 23 Oct: "how it looks matters even more than what it
  // says"). After the guard has passed it, a long block of Will's own prose is
  // split into short paragraphs; not one word changes. Jo's exact wording is
  // already laid out and is left as it is.
  if (!approvedRendered) text = paragraphise(text);

  // FAIL SAFE: only the exact string 'FULL_AUTO' transmits. This used to read
  // `mode === 'SUPERVISED' ? 'pending_approval' : 'sent'`, which sent on every
  // value that was not exactly 'SUPERVISED' — one wrong string in the settings
  // row would have put live replies on autopilot silently, while the follow-up
  // queue kept looking gated. See lib/will/mode.ts.
  return {
    // Autopilot no longer answers instantly: 'queued' parks the finished reply
    // and the scheduler sends it a few minutes later (Jo, 25 Aug).
    // 11 Oct (decision 16): a verbatim approved message needs no approval.
    kind: resolveAiMode(mode) === 'FULL_AUTO' || isApprovedVerbatim(text, custFirstName) ? 'queued' : 'pending_approval',
    replyText: text,
    newState,
    stateChanged: !!newState,
    invalidTransition,
    decision: rewriteNote ? { ...decision, reply_text: text } : decision,
    reviewNote: rewriteNote,
  };
}

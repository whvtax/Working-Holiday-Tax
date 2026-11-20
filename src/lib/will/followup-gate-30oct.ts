// ============================================================
// WHO MAY RECEIVE WHICH AUTOMATIC MESSAGE (Jo, 30 Oct).
//
// Findings from 410 real chats, all the same shape: a template written for one
// situation reached someone in another.
//   - pre sale nudges ("have you given up on your refund?") to PAID customers
//   - "your refund should arrive within 14 business days" to customers who OWE
//   - the refund check-in to someone who owes, or who said the refund arrived
//   - "we just need your signature" after they signed
//   - the form reminder after the form was submitted
//   - the review ask twice
//   - sales messages and winbacks AFTER the customer said no
//
// Everything here is pure: it reads the customer row and the chat, and says
// why a message must NOT go. The scheduler, the winback pass and the Mark
// Lodged button call it; nothing in this file sends or writes.
// ============================================================
import { FORM_RECEIVED_MSG, PAYMENT_RECEIVED_MSG, REVIEW_REQUEST_MSG, SIGNATURE_MSG, LODGED_CONFIRMATION_MSG, LODGED_PAYABLE_MSG, ESTIMATE_INVOICE_MSG, ESTIMATE_PAYABLE_MSG } from './i18n';
import { LEAVING_RE, isCourtesyLine, isClosingOnly } from './text-normalize';
import { REVIEW_LINK_RE, saysRefundLanded } from './review-asks';
import { isFormAutoText } from './language-30oct';
import type { CustomerRow, MessageRow } from './store';

type Msg = Pick<MessageRow, 'direction' | 'author' | 'status' | 'body' | 'createdAt'> & { meta?: MessageRow['meta'] };
type Cust = Pick<CustomerRow, 'paid' | 'state' | 'outcome' | 'estimatedRefundCents'>;

const norm = (s: string | null | undefined) => (s ?? '').toLowerCase().replace(/\s+/g, ' ').trim();
const sentOut = (m: Msg) => m.direction === 'OUT' && (m.status ?? 'SENT') === 'SENT';
const customerIn = (m: Msg) => m.direction === 'IN' && (m.author === 'CUSTOMER' || m.author == null) && !m.meta?.media;

// ── NOTHING AFTER A NO ───────────────────────────────────────────────────────

/** Words that mean the opposite of leaving: a buying signal that happens to
 *  contain a LEAVING_RE fragment ("I decided to go with the TFN option"). */
const BUYING_SIGNAL = /\b(?:tfn|abn|option|yes please|how (?:do|can) i pay|pay now|ready to pay|go(?:ing)? with (?:you|your|the|it|that)|with you(?:rs)?|bei euch|zu euch)\b|お願い(?:します|いたします)/i;

/** The customer telling us they are leaving: not interested, going elsewhere,
 *  "I'll pass", doing it themselves, not this time (LEAVING_RE, text-normalize).
 *  A question is never a goodbye, and a buying signal in the same message wins. */
export function saysLeaving(text: string | null | undefined): boolean {
  const t = (text ?? '').replace(/\s+/g, ' ').trim();
  if (!t || t.length > 300) return false;
  if (isFormAutoText(t)) return false;
  if (/[?？]/.test(t)) return false;
  if (BUYING_SIGNAL.test(t)) return false;
  return LEAVING_RE.test(t);
}

/** The customer's latest word on the matter is no. A "no" followed by a real
 *  message from them (a question, "actually, how do I pay?") means they came
 *  back and the lead is open again; a thank-you or goodbye after it does not.
 *  Returns the evidence, or null. */
export function declinedInChat(messages: readonly Msg[]): { at: string; text: string } | null {
  let found: { at: string; text: string } | null = null;
  for (const m of messages) {
    if (!customerIn(m)) continue;
    if (saysLeaving(m.body)) { found = { at: m.createdAt, text: (m.body ?? '').slice(0, 120) }; continue; }
    if (found && (m.body ?? '').trim() && !isFormAutoText(m.body) && !isCourtesyLine(m.body ?? '') && !isClosingOnly(m.body)) found = null;
  }
  return found;
}

// ── FACTS ABOUT THE CUSTOMER'S STAGE ─────────────────────────────────────────

// 18 Nov: the English wording changed in the template review. Chats already in progress hold
// the earlier wording, so it is still recognised here.
const LEGACY_PAYMENT_RECEIVED_EN = 'Payment received.\n\nPlease fill out this quick form so we can start reviewing your situation.';
const LEGACY_FORM_RECEIVED_EN = "Great, we've received your questionnaire! ✅\nWe'll now go through everything and get back to you soon.";
// 18 Nov (decision 018): the other languages' earlier wording, for chats already in progress.
const LEGACY_PAYMENT_RECEIVED_OTHER: readonly string[] = ["Zahlung erhalten.\n\nBitte füll dieses kurze Formular aus, damit wir mit der Prüfung deiner Situation starten können.\n\nSobald du es abgeschickt hast, geht unser Team alles durch und meldet sich hier bei dir.\n\nhttps://workingholidaytax.com.au/start", "お支払いを確認しました。\n\nご状況の確認を始められるよう、こちらの簡単なフォームにご記入ください。\n\nご送信いただいたら、担当チームがすべて確認のうえ、こちらでご連絡します。\n\nhttps://workingholidaytax.com.au/start", "Pago recibido.\n\nRellena este formulario rápido para que podamos empezar a revisar tu situación.\n\nEn cuanto lo envíes, nuestro equipo lo revisa todo y te escribe por aquí.\n\nhttps://workingholidaytax.com.au/start", "Paiement bien reçu.\n\nRemplis ce court formulaire pour que nous puissions commencer à examiner ta situation.\n\nDès que tu l'as envoyé, notre équipe passe tout en revue et te répond ici.\n\nhttps://workingholidaytax.com.au/start", "Pagamento ricevuto.\n\nCompila questo breve modulo così possiamo iniziare a esaminare la tua situazione.\n\nUna volta inviato, il nostro team controlla tutto e ti scrive qui.\n\nhttps://workingholidaytax.com.au/start", "Pagamento recebido.\n\nPreencha este formulário rápido para podermos começar a analisar a sua situação.\n\nAssim que você enviar, a nossa equipe vê tudo e responde aqui.\n\nhttps://workingholidaytax.com.au/start"];
const LEGACY_FORM_RECEIVED_OTHER: readonly string[] = ["Super, wir haben deinen Fragebogen erhalten! ✅\nWir gehen jetzt alles durch und melden uns bald bei dir.", "ありがとうございます、アンケートを受け取りました！✅\nこれから内容をすべて確認し、近日中にご連絡します。", "¡Genial, hemos recibido tu cuestionario! ✅\nAhora revisaremos todo y te responderemos pronto.", "Super, nous avons bien reçu ton questionnaire ! ✅\nNous allons tout examiner et revenir vers toi bientôt.", "Ottimo, abbiamo ricevuto il tuo modulo! ✅\nOra controlleremo tutto e ti risponderemo a breve.", "Ótimo, recebemos o seu formulário! ✅\nVamos analisar tudo e responder em breve.", "Nous avons bien re\u00e7u ton questionnaire, merci\u00a0!\n\nNotre \u00e9quipe va tout examiner et revenir vers toi."];
const PAID_PREFIXES = new Set([...Object.values(PAYMENT_RECEIVED_MSG), LEGACY_PAYMENT_RECEIVED_EN, ...LEGACY_PAYMENT_RECEIVED_OTHER].map((x) => norm(x).slice(0, 40)));
/** The chat proves payment was confirmed to the customer. */
export function paymentConfirmedInChat(messages: readonly Msg[]): boolean {
  return messages.some((m) => sentOut(m)
    && (m.meta?.paymentConfirmation === true
      || (m.meta?.waTemplate?.name ?? '').startsWith('payment_received')
      || PAID_PREFIXES.has(norm(m.body).slice(0, 40))));
}

/** The chat proves the questionnaire has been submitted. */
const FORM_RECEIVED_PREFIXES = new Set([...Object.values(FORM_RECEIVED_MSG), LEGACY_FORM_RECEIVED_EN, ...LEGACY_FORM_RECEIVED_OTHER].map((x) => norm(x).slice(0, 35)));
export function formSubmittedInChat(messages: readonly Msg[]): boolean {
  return messages.some((m) =>
    (sentOut(m) && ((m.meta?.waTemplate?.name ?? '').startsWith('form_received') || FORM_RECEIVED_PREFIXES.has(norm(m.body).slice(0, 35))))
    || (customerIn(m) && isFormAutoText(m.body)));
}

/** "I signed", "habe unterschrieben", "署名しました", not "how do I sign" and
 *  not "I haven't signed yet". Customer messages only. */
const SIGNED = /\b(?:i(?:'ve| have)?|just|have|already|all)\s+(?:just\s+|now\s+|already\s+)?signed\b|\bsigned (?:it|and|now|just)\b|\bdone(?:,)? (?:signed|signing)\b|\bit(?:'s| is) signed\b|unterschrieben|unterzeichnet|signiert|署名(?:しました|済み|完了)|サイン(?:しました|済み|完了)|firmado|signé|firmato|assinei|assinado/i;
/** 3 Nov: after the signature notice, a bare "Done!" / "Signed" / "just done it"
 *  is the signature (Vivian, Steph: the "did the email reach you?" nudge went
 *  out after they had signed). Whole-message match only, so "done, but where
 *  do I sign?" is not one. */
const SIGNED_SHORT = /^\s*(?:all\s+)?(?:done|signed|sorted|completed?|erledigt|fertig|unterschrieben|済み|完了|署名しました)\s*[!.。！👍🙏😊\s]*$|\b(?:literally\s+|just\s+)+done\s+it\b/i;
const NOT_SIGNED = /\b(?:not|n't|never|haven'?t|didn'?t|cannot|can'?t|how (?:do|can|to)|where (?:do|can)|noch nicht|nicht unterschrieben|まだ)\b[^.!?\n]{0,25}\b(?:sign\w*|unterschreib\w*|署名|サイン)/i;
// 18 Nov (decision 018): plus the signature notice as translated (firma, signes, assinar, 签名, ký).
const SIGNATURE_NOTICE = /signature|sign (?:it|the return)|Unterschrift|unterschreib|署名|サイン|para que la revises y la firmes|la relises et la signes|da controllare e firmare|revisar e assinar|查看并签名|xem lại và ký/i;
export function saidSigned(messages: readonly Msg[]): boolean {
  // Only what they said after the signature notice counts ("I signed the
  // client agreement" last week is not the return).
  let from = 0;
  messages.forEach((m, i) => {
    if (sentOut(m) && ((m.meta?.waTemplate?.name ?? '').startsWith('signature') || SIGNATURE_NOTICE.test(m.body ?? ''))) from = i + 1;
  });
  return messages.slice(from).some((m) => customerIn(m) && (SIGNED.test(m.body ?? '') || SIGNED_SHORT.test(m.body ?? '')) && !NOT_SIGNED.test(m.body ?? '') && !/[?？]\s*$/.test((m.body ?? '').trim()));
}

/** The customer owes the ATO, from any of the four places that can say so:
 *  the outcome flag, a negative estimate, the payable estimate or payable
 *  lodged text that went out, or the team telling them the amount is payable. */
// 18 Nov (decision 018): plus the payable estimate and payable lodged wording in every language.
const PAYABLE_TEXT = /amount payable|payable to the ATO|owe (?:the )?(?:ATO|tax)|tax (?:bill|debt)|walk you through how to pay|payment request and how to pay|Zahlungsaufforderung|お支払いの請求|how to pay the ATO|zu zahlende|Nachzahlung|payment request from the ATO|ATO (?:will|to) (?:send|issue) you (?:a |the )?(?:payment|invoice)|ATO will email you a payment request|amount (?:owing|you owe)|ATOへの(?:推定)?納付|納付額|納付見込み額|お支払い方法をご案内|an das ATO zahlen musst|cantidad estimada a pagar|solicitud de pago|montant estimé à payer|demande de paiement|importo stimato da pagare|richiesta di pagamento|valor estimado a pagar|pedido de pagamento|向 ATO 缴纳|付款通知|phải đóng cho ATO|email yêu cầu thanh toán/i;
export function customerOwesTax(c: Pick<Cust, 'outcome' | 'estimatedRefundCents'>, messages: readonly Msg[]): boolean {
  if (c.outcome === 'PAYABLE') return true;
  if (c.outcome === 'REFUND') return false;
  if (c.estimatedRefundCents != null && c.estimatedRefundCents < 0) return true;
  return messages.some((m) => sentOut(m)
    && ((m.meta?.waTemplate?.name ?? '').startsWith('estimate_payable') || (m.meta?.waTemplate?.name ?? '').startsWith('lodged_payable') || PAYABLE_TEXT.test(m.body ?? '')));
}

/** 18 Nov (VERIFY-18nov item 2): a message that tells the customer a refund is coming, by its
 *  Library key (lodged_confirmation, estimate_invoice, refund_checkin, review_ask, the retired
 *  `lodged`, any language) or by its words (the refund line of the lodged confirmation or the
 *  refund estimate in any of the nine languages). The team's send paths refuse it for a customer
 *  who owes tax, so the refund wording can never be picked by hand for them. */
const REFUND_KEY_RE = /^(?:lodged|(?:lodged_confirmation|estimate_invoice|refund_checkin)(?:_[a-z]{2})?|review_ask\w*|review_request\w*)$/;
const REFUND_LINES: readonly string[] = [
  ...Object.values(LODGED_CONFIRMATION_MSG).map((t) => (t ?? '').split('\n').slice(1).join(' ')),
  ...Object.values(ESTIMATE_INVOICE_MSG).map((t) => (t ?? '').split('{{AMOUNT}}')[0]),
  'Your refund should arrive in your bank account',
].map((x) => norm(x)).filter((x) => x.length >= 6);
export function refundWordingMessage(key: string | null | undefined, body: string | null | undefined): boolean {
  if (key && REFUND_KEY_RE.test(key)) return true;
  const b = norm(body ?? '');
  return !!b && REFUND_LINES.some((line) => b.includes(line));
}

/** The review ask (or its Meta template) has already gone to this customer,
 *  by any path, including a human pasting the link. */
const REVIEW_ASK_PREFIXES = new Set(Object.values(REVIEW_REQUEST_MSG).map((x) => norm(x).slice(0, 30)));
export function reviewAskAlreadySent(messages: readonly Msg[]): boolean {
  return messages.some((m) => sentOut(m)
    && ((m.meta?.waTemplate?.name ?? '').startsWith('review_ask') || (m.meta?.waTemplate?.name ?? '').startsWith('review_request')
      || REVIEW_LINK_RE.test(m.body ?? '') || REVIEW_ASK_PREFIXES.has(norm(m.body).slice(0, 30))));
}

// ── THE GATES ────────────────────────────────────────────────────────────────

export type FollowUpFlow = 'prePayment' | 'form' | 'signature';

export interface GateResult { block: string; closeLead?: boolean }

/**
 * May this scheduled follow-up go? Returns null when it may, or why not.
 * `closeLead` means the customer said no: the caller closes the lead and
 * cancels everything else queued for them.
 */
/** Rule M1 (Nov 2026, Meta quality). At most this many of our messages in a row
 *  with no reply from the customer. In the export, 205 conversations got three or
 *  more unanswered Will messages, and Meta held the template sends that followed. */
export const UNANSWERED_CAP = 3;

/** How many of our messages were sent since the customer last wrote. */
export function unansweredRun(messages: readonly Msg[]): number {
  let run = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.direction === 'IN') break;
    if (m.direction === 'OUT' && (m.status ?? 'SENT') === 'SENT') run++;
  }
  return run;
}

/** 15 Nov: the customer's latest message is a question and nobody has
 *  answered it since (no sent reply from the team or Will after it). The read
 *  of 410 chats found automatic follow-ups ("are you still there?", "any
 *  questions?") going out over an open question. Returns the question, or null.
 *  A question inside a form auto text or a media message does not count. */
const QUESTION_RE = /[?？]|\b(?:how (?:much|do|can|long|many)|what|when|where|why|do i|can i|is it|does it|will i|should i)\b/i;
export function openCustomerQuestion(messages: readonly Msg[]): string | null {
  let lastIn: { i: number; body: string } | null = null;
  messages.forEach((m, i) => {
    if (customerIn(m) && (m.body ?? '').trim() && !isFormAutoText(m.body)) lastIn = { i, body: m.body ?? '' };
  });
  if (!lastIn) return null;
  const q = lastIn as { i: number; body: string };
  if (!QUESTION_RE.test(q.body)) return null;
  // Answered means a person, or Will's own reply (not an automatic nudge or a
  // holding line), went out after the question.
  const isNudge = (m: Msg) => /^(fu_|handoff_|review_remind)/.test(m.meta?.waTemplate?.name ?? '');
  const answered = messages.slice(q.i + 1).some((m) => sentOut(m)
    && (m.author === 'HUMAN' || (m.author === 'AI' && !isNudge(m)))
    && (m.body ?? '').trim().length > 0);
  return answered ? null : q.body.slice(0, 120);
}

export function followUpBlock(c: Cust, flow: FollowUpFlow, messages: readonly Msg[]): GateResult | null {
  // Rule M1: after three unanswered messages nothing automatic goes out.
  const run = unansweredRun(messages);
  if (run >= UNANSWERED_CAP) return { block: `${run} messages in a row with no reply from the customer` };
  // 3 Nov: the team told them their details are gone ("We've deleted your
  // details and removed you from our client portal"), or the customer is
  // finished with us: nothing automatic goes to a removed client.
  const removed = removedFromPortal(messages);
  if (removed) return { block: `the customer was removed from the portal (${removed})` };
  // 15 Nov: a question nobody has answered comes before any automatic nudge.
  const open = openCustomerQuestion(messages);
  if (open) return { block: `the customer asked a question nobody has answered yet (${open})` };
  if (flow === 'signature') {
    // Cormac: "I got someone else to do it for me", "No it's okay, I got
    // sorted", and then the 3 day and 7 day signature nudges arrived anyway.
    const no = declinedInChat(messages);
    if (no) return { block: `the customer said they are not going ahead (${no.text})` };
    // Vivian, Yuta: the return was lodged (the team's message is in the chat)
    // and the signature nudge still went out afterwards.
    if (lodgedAfterSignatureNotice(messages)) return { block: 'the return was already lodged' };
  }
  if (flow === 'prePayment') {
    if (c.paid || paymentConfirmedInChat(messages)) return { block: 'paid customer: pre sale nudges never go to someone who has paid' };
    const no = declinedInChat(messages);
    if (no) return { block: `the customer said no (${no.text})`, closeLead: true };
  }
  if (flow === 'form' && formSubmittedInChat(messages)) return { block: 'the questionnaire was already submitted' };
  if (flow === 'signature' && saidSigned(messages)) return { block: 'the customer said they signed' };
  return null;
}

/** The team's own words that the file is closed. A customer who writes after
 *  that has come back, so the removal only counts while they have not. */
const REMOVED_RE = /removed (?:you|your details)[^.\n]{0,40}(?:client portal|our system|our records)|deleted your details|(?:haben|have) (?:deine|your) (?:daten|details) (?:gelöscht|deleted)/i;
export function removedFromPortal(messages: readonly Msg[]): string | null {
  let at = -1;
  messages.forEach((m, i) => { if (m.direction === 'OUT' && (m.status ?? 'SENT') === 'SENT' && m.author === 'HUMAN' && REMOVED_RE.test(m.body ?? '')) at = i; });
  if (at < 0) return null;
  const back = messages.slice(at + 1).some((m) => customerIn(m) && (m.body ?? '').trim() && !isFormAutoText(m.body) && !isCourtesyLine(m.body ?? '') && !isClosingOnly(m.body));
  return back ? null : (messages[at].body ?? '').replace(/\s+/g, ' ').slice(0, 60);
}

/** The team's "has been lodged" message came after the latest signature
 *  notice. Used for the signature nudges only. */
// 18 Nov (decision 018): plus "has been lodged" as translated.
const LODGED_RE = /lodged successfully|(?:has been|was|is now|have been) lodged|erfolgreich eingereicht|Steuererklärung wurde eingereicht|申告(?:が)?完了|提出が完了しました|ya está presentada|a été déposée|è stata presentata|declaração de imposto foi enviada|报税已经提交|đã được nộp/i;
const SIGNATURE_READY_RE = /your tax return is ready|Steuererklärung ist fertig|準備ができました|declaración de impuestos está lista|déclaration d'impôts est prête|dichiarazione dei redditi è pronta|declaração de imposto está pronta|报税已经准备好了|hồ sơ thuế của bạn đã sẵn sàng/i;
export function lodgedAfterSignatureNotice(messages: readonly Msg[]): boolean {
  let from = 0;
  messages.forEach((m, i) => {
    if (sentOut(m) && ((m.meta?.waTemplate?.name ?? '').startsWith('signature') || SIGNATURE_READY_RE.test(m.body ?? ''))) from = i + 1;
  });
  return messages.slice(from).some((m) => sentOut(m)
    && ((m.meta?.waTemplate?.name ?? '').startsWith('lodged') || LODGED_RE.test(m.body ?? '')));
}

/** May the "has your refund landed?" check-in go? null = yes. */
export function refundCheckinBlock(c: Cust, messages: readonly Msg[]): string | null {
  if (customerOwesTax(c, messages)) return 'the customer owes tax: there is no refund to ask about';
  const arrived = messages.some((m) => customerIn(m) && saysRefundLanded(m.body ?? ''));
  if (arrived) return 'the customer already said the refund arrived';
  // Jo, 3 Nov: never ask "has your refund landed?" unless we KNOW they are
  // owed one (Jun got it with nothing on record saying so). Positive evidence:
  // the outcome flag, a positive estimate, or an estimate message we sent.
  const knownRefund = c.outcome === 'REFUND' || (c.estimatedRefundCents != null && c.estimatedRefundCents > 0)
    || messages.some((m) => sentOut(m) && /estimated (?:tax )?refund|refund should arrive|geschätzte steuerrückerstattung|推定還付|還付金の見込み額|devolución de impuestos estimada|remboursement d'impôts estimé|rimborso stimato|restituição estimada|预估退税|hoàn thuế ước tính|lodged_refund/i.test(`${m.body ?? ''} ${m.meta?.waTemplate?.name ?? ''}`));
  if (!knownRefund) return 'nothing on record says they are owed a refund';
  return null;
}

/** Which lodged confirmation: the refund wording must never reach someone who
 *  owes. Used by the Mark Lodged button. */
export function lodgedVariant(c: Cust, messages: readonly Msg[]): 'refund' | 'payable' | 'neutral' {
  if (customerOwesTax(c, messages)) return 'payable';
  // 4 Nov (audit): no outcome set and no (or a nil) estimate: nobody knows there is a refund, so none is promised.
  if (c.outcome == null && (c.estimatedRefundCents == null || c.estimatedRefundCents === 0)) return 'neutral';
  return 'refund';
}

/** The chat, or an empty list when it cannot be read (a gate must never be
 *  the reason a send crashes; unreadable means "no evidence"). */
export async function messagesOf(store: { listMessages: (id: string) => Promise<MessageRow[]> }, customerId: string): Promise<MessageRow[]> {
  try { return (await store.listMessages(customerId)) ?? []; } catch { return []; }
}

// ── RESIDENCY DOUBLE-CHECK (3 Nov) ───────────────────────────────────────────

/** The customer has already talked about their residency or time in Australia
 *  in their own words (Fua, Alexandra, GC, Luca: they had asked Will or the team
 *  to look at it, or had answered, before the double-check template arrived). */
const RESIDENCY_TALK = new RegExp([
  '\\b(?:tax[- ])?resident\\b', '\\bresidency\\b', 'working holiday maker', '\\bWHM\\b', '\\b183\\b',
  '\\b(?:five|5) (?:points|criteria|things)\\b', '\\b\\d (?:of|out of|/) ?(?:the )?(?:5|five)\\b',
  '(?:lived|living|stayed|been|was|worked) (?:in )?(?:australia|aus|oz)\\b[^.!?\\n]{0,40}\\b(?:months?|years?|weeks?)\\b',
  '\\b\\d+ (?:months?|years?)\\b[^.!?\\n]{0,20}\\b(?:in )?(?:australia|aus)\\b',
  'steuerlich\\w* ans[äa]ssig', 'ans[äa]ssig', 'steuerresident', 'steuerlich',
  '\\b\\d+ von (?:5|f[üu]nf)\\b', '居住者', 'ワーキングホリデーメーカー', '税務上',
].join('|'), 'i');

/** Why the "double-check your residency answer" message must not go, or null.
 *  Once is enough: when the customer has already spoken about it (asked us to
 *  assess it, or answered it) the template reads as not listening. */
export function residencyCheckBlock(messages: readonly Msg[]): string | null {
  const spoke = messages.find((m) => customerIn(m) && (m.body ?? '').trim() && !isFormAutoText(m.body) && RESIDENCY_TALK.test(m.body ?? ''));
  if (spoke) return 'the customer already wrote about their residency or time in Australia';
  const teamAsked = messages.some((m) => m.direction === 'OUT' && m.author === 'HUMAN' && (m.status ?? 'SENT') === 'SENT'
    && /five criteria|all five|residency (?:question|page)|tax residen/i.test(m.body ?? ''));
  if (teamAsked) return 'the team is already handling the residency question';
  return null;
}

/** 3 Nov: which of OUR OWN automatic messages prove the customer is past the
 *  sales stage. Not every `meta.system` message does: the holding line, a
 *  thank-you, the price and bank details, a document acknowledgement are all
 *  `system` and all belong to a lead who has not paid (Mia, Johanna, Melissa,
 *  Julie: the 24h and 3d nudges were cancelled by the price reply). */
const PAST_LEAD_TEMPLATES = /^(?:payment_received|form_received|signature|estimate_|lodged_|refund_checkin|review_|medicare|req_abn|residency_check)/;
const POST_PAYMENT_TEXT = /payment received|zahlung erhalten|お支払いを確認|received your questionnaire|got your form|we've received your|your (?:tax )?return is ready|lodged successfully|estimated (?:tax )?refund|refund should arrive|amount payable|in\.xero\.com/i;
/** 18 Nov (decision 018): the same post-payment messages as translated, by their opening words. */
const POST_PAYMENT_PREFIXES: readonly string[] = [
  PAYMENT_RECEIVED_MSG, FORM_RECEIVED_MSG, SIGNATURE_MSG, LODGED_CONFIRMATION_MSG, LODGED_PAYABLE_MSG, ESTIMATE_INVOICE_MSG, ESTIMATE_PAYABLE_MSG,
].flatMap((t) => Object.values(t)).map((x) => norm(x.split('{{')[0]).slice(0, 20)).filter((x) => x.length >= 6);
export function systemMessageProvesPastLeadStage(m: Msg): boolean {
  if (m.direction !== 'OUT') return false;
  if (m.meta?.paymentConfirmation === true) return true;
  const name = m.meta?.waTemplate?.name ?? '';
  if (name) return PAST_LEAD_TEMPLATES.test(name);
  // No template recorded: the canned texts we know are post-payment. The
  // price reply says "prepare and lodge your tax return", so a bare "lodg"
  // proves nothing here.
  const b = norm(m.body).slice(0, 40);
  return PAID_PREFIXES.has(b) || FORM_RECEIVED_PREFIXES.has(norm(m.body).slice(0, 35)) || POST_PAYMENT_TEXT.test(m.body ?? '')
    || POST_PAYMENT_PREFIXES.some((p) => norm(m.body).startsWith(p));
}

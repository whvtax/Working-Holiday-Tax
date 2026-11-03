/**
 * What a payment screenshot has to show before it is VERIFIED, as opposed to
 * merely "looks like a payment".
 *
 * Jo, 3 Sep: a German customer sent a Wise confirmation (220 AUD to Simple Tax
 * Services, reference, transaction number) and Will read every word of it,
 * moved him to Paid, sent the confirmation, and then opened a task asking Jo
 * to glance at the picture "to confirm it looks right". Jo's point: the model
 * that read the picture can see whether it is right. So the vision check now
 * extracts the amount, the recipient and the status, and this module decides
 * whether those add up to OUR fee reaching OUR account. When they do, the
 * payment is confirmed with no task at all. When something is not visible
 * (a screenshot of the transfer being sent rather than received, a foreign
 * currency amount with no AUD figure, a cropped recipient), the stage still
 * moves (we trust the customer) but the heads-up task says exactly what could
 * not be checked, so the glance is a short one.
 *
 * Pure functions, no I/O, so every branch is unit-tested.
 */

/** Our two fees, in AUD. A phone consultation ($110) is not a fee for the
 *  return and never confirms a payment screenshot. */
export const FEES_AUD = [220, 385, 330, 495, 440] as const; // 330 / 440: review of an already-lodged return, TFN / ABN (Jo, 30 Oct; 330 is also foreign income TFN)
// // 330/495: with foreign income (Jo, 12 Oct)

/** How far the amount that lands may sit from the fee and still count. A
 *  transfer from overseas can lose a few dollars to an intermediary, and a
 *  customer sometimes rounds up. Anything further off is not "the fee". */
export const AMOUNT_TOLERANCE_AUD = 15;

export type RecipientMatch = 'yes' | 'no' | 'unknown';
export type ProofStatus = 'completed' | 'pending' | 'failed' | 'unknown';

/** What the vision check could read off the attachment. Every field may be
 *  unknown: the model is told to say so rather than guess. */
export interface ProofDetails {
  /** AUD reaching the recipient if shown, else the AUD amount sent; null when
   *  no AUD figure is visible (foreign currency only, or cropped). */
  amountAud: number | null;
  /** Recipient exactly as displayed, for the audit trail and the task text. */
  recipient: string | null;
  /** Whether the recipient is us (The Accounting Academy / Simple Tax Services / BSB 062692 / account
   *  81049952). 'no' means a DIFFERENT recipient is clearly shown. */
  recipientIsUs: RecipientMatch;
  status: ProofStatus;
  /** 3 Nov: set when the picture shows money in a currency other than AUD and
   *  no AUD figure (Wise, a home bank app). Never converted. Optional so older
   *  callers and stored audit rows still type-check. */
  foreignCurrency?: string | null;
  foreignAmount?: number | null;
}

export interface ProofVerification {
  /** Our fee, to our account, completed: nothing for a person to check. */
  verified: boolean;
  /** What stopped full verification, in the order a person would check it.
   *  Empty when verified. Written to be dropped straight into a task reason. */
  unverified: string[];
}

/** 28 Sep (+33 7 81, Laurine): she paid $385, the payment proof was read
 *  and accepted, and when her form arrived she got the plain acknowledgement
 *  instead of the ABN questions, because her income type was still unknown:
 *  it is only ever inferred from a price message Will himself sent, and she
 *  had the bank details from elsewhere. The receipt is the strongest evidence
 *  there is of which service was bought: $385 means TFN + ABN, $220 means TFN. */
export function incomeFromAmount(amount: number | null): 'TFN' | 'TFN_ABN' | null {
  if (amount == null || !Number.isFinite(amount)) return null;
  if (Math.abs(amount - 385) <= AMOUNT_TOLERANCE_AUD || Math.abs(amount - 495) <= AMOUNT_TOLERANCE_AUD) return 'TFN_ABN';
  if (Math.abs(amount - 330) <= AMOUNT_TOLERANCE_AUD) return 'TFN';
  if (Math.abs(amount - 440) <= AMOUNT_TOLERANCE_AUD) return 'TFN_ABN';
  if (Math.abs(amount - 220) <= AMOUNT_TOLERANCE_AUD) return 'TFN';
  return null;
}

export function amountMatchesFee(amount: number | null): boolean {
  if (amount == null || !Number.isFinite(amount)) return false;
  return FEES_AUD.some((fee) => Math.abs(amount - fee) <= AMOUNT_TOLERANCE_AUD);
}

/** The screenshot shows a payment, but demonstrably NOT one to us: a different
 *  recipient, or a transfer that failed. These must never confirm a payment on
 *  the strength of the picture alone. (A customer who also SAYS they paid is
 *  still trusted; the task then carries this verdict so the mismatch is seen.) */
export function isNotOurPayment(d: ProofDetails): boolean {
  return d.recipientIsUs === 'no' || d.status === 'failed';
}

export function verifyProofDetails(d: ProofDetails): ProofVerification {
  const unverified: string[] = [];
  if (d.recipientIsUs === 'no') unverified.push(`the recipient shown is ${d.recipient ?? 'someone else'}, not us`);
  else if (d.recipientIsUs !== 'yes') unverified.push('the recipient is not visible');
  if (d.amountAud == null) unverified.push('no AUD amount is visible');
  else if (!amountMatchesFee(d.amountAud)) unverified.push(`the amount is ${formatAud(d.amountAud)}, not $220, $330, $385, $440 or $495`);
  if (d.status === 'failed') unverified.push('the transfer shows as failed');
  else if (d.status === 'pending') unverified.push('the transfer shows as pending, not completed');
  // 12 Oct (+44 7854, Wise "Sent 220 AUD, Working Holiday Tax, We paid out
  // your AUD"): no word "completed" on the screen is not a reason to doubt a
  // receipt that shows our fee to us. Only pending or failed count.
  return { verified: unverified.length === 0, unverified };
}

/** 12 Oct: when may the PICTURE alone confirm a payment? When it shows our fee
 *  ($220 / $385) and nothing on it contradicts that it is ours (a different
 *  recipient, a failed transfer). A missing recipient or status moves the
 *  stage on trust with a heads-up task; it no longer leaves a paying customer
 *  with "I've passed this to the team". */
export function pictureConfirmsPayment(d: ProofDetails): boolean {
  return amountMatchesFee(d.amountAud) && !isNotOurPayment(d);
}

/** One line for the audit trail and the task: what the picture showed. */
export function describeProof(d: ProofDetails): string {
  const parts: string[] = [];
  parts.push(d.amountAud != null ? formatAud(d.amountAud) : 'an amount not shown in AUD');
  if (d.recipientIsUs === 'yes') parts.push('to our account');
  else if (d.recipient) parts.push(`to ${d.recipient}`);
  if (d.status === 'completed') parts.push('completed');
  else if (d.status !== 'unknown') parts.push(d.status);
  return parts.join(', ');
}

function formatAud(n: number): string {
  const whole = Number.isInteger(n) ? String(n) : n.toFixed(2);
  return `$${whole}`;
}

/** Coerce whatever the model returned into ProofDetails, never throwing: a
 *  field the model got wrong reads as unknown, which only ever means "a person
 *  glances", never "confirmed by mistake". */
export function coerceProofDetails(raw: unknown): ProofDetails {
  const r = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const amount = typeof r.amount_aud === 'number' && Number.isFinite(r.amount_aud) && r.amount_aud >= 0
    ? r.amount_aud
    : typeof r.amount_aud === 'string' && /^\s*\$?\s*\d[\d,]*(\.\d+)?\s*$/.test(r.amount_aud)
      ? Number(r.amount_aud.replace(/[^\d.]/g, ''))
      : null;
  const recipient = typeof r.recipient === 'string' && r.recipient.trim() ? r.recipient.trim().slice(0, 120) : null;
  const recipientIsUs: RecipientMatch = r.recipient_is_us === 'yes' || r.recipient_is_us === 'no' ? r.recipient_is_us : 'unknown';
  const status: ProofStatus = r.status === 'completed' || r.status === 'pending' || r.status === 'failed' ? r.status : 'unknown';
  const cur = typeof r.currency === 'string' && /^[A-Za-z]{3}$/.test(r.currency.trim()) && r.currency.trim().toUpperCase() !== 'AUD'
    ? r.currency.trim().toUpperCase() : null;
  const fAmt = typeof r.amount_original === 'number' && Number.isFinite(r.amount_original) && r.amount_original >= 0 ? r.amount_original : null;
  const base: ProofDetails = { amountAud: amount, recipient, recipientIsUs, status };
  return cur ? { ...base, foreignCurrency: cur, foreignAmount: fAmt } : base;
}

// ── A PROOF WE COULD NOT READ IS NOT A PROOF WE MAY DROP (30 Oct) ────────────
//
// Niamh, Dewi, Megan and Luca sent their bank receipt as a PDF or another
// document and nothing came back: the check ran only on pictures, or failed,
// and the attachment fell through to a "cannot read this" task while the
// customer was left without the form link (Luca was even told he was done).
// A customer who has been given the bank details and then sends a DOCUMENT is
// sending the receipt. When the check could not decide (the file type is not
// readable, the model was unreachable, the daily budget is spent, the download
// failed), the payment is taken on trust exactly as a typed "paid" is, the form
// link goes out, and Jo gets a task to verify. A check that DID read the file
// and said it is not a payment (a payslip, a statement) is respected.

/** The check could not reach a verdict (as opposed to reading the file and
 *  saying "this is not a payment"). Reasons are written by claude.ts and the
 *  service; they are matched at the start so a free-text model reason that
 *  happens to contain these words is not mistaken for a failure. */
export function checkWasUndecided(reason: string | null | undefined): boolean {
  const r = (reason ?? '').trim().toLowerCase();
  if (!r) return false;
  return /^(?:no api key|unsupported file type|vision check failed|vision check unreachable|model returned no assessment|daily ai budget|could not download|download failed|lookup failed|media expired|channel not configured|attachment too large|the operation was aborted|fetch failed|network|timeout|aborted)/.test(r);
}

/** Is this attachment the kind of thing a customer sends as a receipt when it
 *  is not a photo: a PDF or any document, or a file whose type we cannot see. */
export function isDocumentLikeProof(media: { kind?: string; mime?: string; filename?: string }): boolean {
  const kind = (media.kind ?? '').toLowerCase();
  const mime = (media.mime ?? '').toLowerCase();
  if (kind === 'document') return true;
  if (mime === 'application/pdf') return true;
  if (mime && !mime.startsWith('image/') && !mime.startsWith('audio/') && !mime.startsWith('video/')) return true;
  return /\.(pdf|docx?|xlsx?|html?|txt|rtf|odt|pages)$/i.test(media.filename ?? '');
}


// ── THE AMOUNT HAS TO MATCH WHAT THIS CUSTOMER WAS QUOTED (3 Nov) ────────────
//
// amountMatchesFee above asks "is this ANY of our fees?". Evidence from the 72h
// export: $400 against a two-year fee of $440 was confirmed ("Payment
// received"); $250 against $220 was accepted; $180 and $40 were paid as two
// pasted receipts and the customer never moved to Paid. The picture and the
// words are trusted, but the NUMBER is compared with what this customer owes:
//
//   short payment -> no confirmation, ask once for the rest (nothing is lost:
//                    the part payment is remembered and added up)
//   overpayment   -> confirm as normal and flag the team (a refund of the
//                    difference is a person's job, never Will's)
//   unknown       -> behave exactly as before (trust, heads-up task)

export type IncomeType = 'TFN' | 'TFN_ABN';

/** The fee quoted to a customer, in AUD, for their income type. 330 / 495 when
 *  they have foreign income. Multiplied by the number of tax years bought.
 *  Null when the income type is not known: the caller must not guess. */
export function expectedFeeAud(opts: {
  income?: IncomeType | null; foreignIncome?: boolean; years?: number | null;
}): number | null {
  if (opts.income !== 'TFN' && opts.income !== 'TFN_ABN') return null;
  const per = opts.income === 'TFN_ABN' ? (opts.foreignIncome ? 495 : 385) : (opts.foreignIncome ? 330 : 220);
  const years = typeof opts.years === 'number' && Number.isFinite(opts.years) ? Math.min(Math.max(Math.floor(opts.years), 1), 6) : 1;
  return per * years;
}

export type AmountVerdictKind = 'match' | 'short' | 'over' | 'unknown';

export interface AmountVerdict {
  kind: AmountVerdictKind;
  paid: number | null;
  /** The fee this customer owes. For an unknown income type with an amount
   *  below the cheapest fee, the cheapest fee ($220) as a floor. */
  expected: number | null;
  /** Still to pay, when short. */
  shortBy: number;
  /** Paid above the fee, when over. */
  overBy: number;
}

const round2 = (n: number) => Math.round(n * 100) / 100;
const LOWEST_FEE = 220;

/** Compare what was paid (the total over all part payments) with what is owed.
 *  Within AMOUNT_TOLERANCE_AUD either way counts as a match (an intermediary
 *  fee, a customer rounding up). */
export function compareAmountToFee(paid: number | null | undefined, expected: number | null | undefined): AmountVerdict {
  const p = typeof paid === 'number' && Number.isFinite(paid) && paid > 0 ? paid : null;
  const e = typeof expected === 'number' && Number.isFinite(expected) && expected > 0 ? expected : null;
  if (p == null) return { kind: 'unknown', paid: null, expected: e, shortBy: 0, overBy: 0 };
  if (e == null) {
    // No quote on file. Only a payment below the cheapest fee can be judged.
    if (p < LOWEST_FEE - AMOUNT_TOLERANCE_AUD) return { kind: 'short', paid: p, expected: LOWEST_FEE, shortBy: round2(LOWEST_FEE - p), overBy: 0 };
    return { kind: 'unknown', paid: p, expected: null, shortBy: 0, overBy: 0 };
  }
  if (e - p > AMOUNT_TOLERANCE_AUD) return { kind: 'short', paid: p, expected: e, shortBy: round2(e - p), overBy: 0 };
  if (p - e > AMOUNT_TOLERANCE_AUD) return { kind: 'over', paid: p, expected: e, shortBy: 0, overBy: round2(p - e) };
  return { kind: 'match', paid: p, expected: e, shortBy: 0, overBy: 0 };
}

/** Sum part payments (180 + 40) into one total. Non-finite and negative
 *  values are ignored. */
export function totalPaid(parts: Array<number | null | undefined>): number {
  return round2(parts.reduce<number>((a, b) => a + (typeof b === 'number' && Number.isFinite(b) && b > 0 ? b : 0), 0));
}

/** May the payment be CONFIRMED (stage Paid, form link sent) on this verdict?
 *  Short is the only "no". Over is a yes with a flag, unknown is the old trust. */
export function amountAllowsConfirmation(v: AmountVerdict): boolean {
  return v.kind !== 'short';
}

/** One line for the team task. */
export function describeAmountVerdict(v: AmountVerdict): string {
  if (v.kind === 'short') return `paid ${formatAud(v.paid ?? 0)} of ${formatAud(v.expected ?? 0)} (${formatAud(v.shortBy)} still to come)`;
  if (v.kind === 'over') return `paid ${formatAud(v.paid ?? 0)} against a fee of ${formatAud(v.expected ?? 0)} (${formatAud(v.overBy)} extra, the difference needs a decision by the team)`;
  if (v.kind === 'match') return `paid ${formatAud(v.paid ?? 0)}, the fee`;
  return 'amount could not be compared with the fee';
}

/** The customer's one-line ask when they have paid part of the fee. Written in
 *  each language Will speaks, no dashes, no promise, no mention of anything but
 *  the money. `paid` is the total so far, `fee` the full amount. */
export function shortPaymentMessage(lang: string | null | undefined, v: Pick<AmountVerdict, 'paid' | 'expected' | 'shortBy'>): string {
  const paid = formatAud(v.paid ?? 0);
  const fee = v.expected != null ? formatAud(v.expected) : null;
  const left = formatAud(v.shortBy);
  const l = (lang ?? 'en').toLowerCase().slice(0, 2);
  switch (l) {
    case 'de': return fee
      ? `Danke, ich sehe eine Zahlung über ${paid}. Die Gebühr beträgt ${fee}, es fehlen also noch ${left}. Sobald der Rest überwiesen ist, schick mir einfach einen Screenshot, dann geht es direkt los.`
      : `Danke, ich sehe eine Zahlung über ${paid}. Die Gebühr ist höher, es fehlt also noch ein Rest. Sag mir kurz Bescheid, dann nenne ich dir den genauen Betrag.`;
    case 'ja': return fee
      ? `ありがとうございます。${paid}のお支払いを確認しました。料金は${fee}ですので、あと${left}となります。残りのお振込みが済みましたら、スクリーンショットをお送りください。すぐに始めます。`
      : `ありがとうございます。${paid}のお支払いを確認しました。料金はそれより高いため、残りがあります。正確な金額をお伝えしますので、お知らせください。`;
    case 'es': return fee
      ? `Gracias, veo un pago de ${paid}. La tarifa es ${fee}, así que faltan ${left}. Cuando envíes el resto, mándame una captura y empezamos enseguida.`
      : `Gracias, veo un pago de ${paid}. La tarifa es mayor, así que falta un resto. Dime y te indico el importe exacto.`;
    case 'pt': return fee
      ? `Obrigado, vejo um pagamento de ${paid}. A taxa é ${fee}, por isso faltam ${left}. Quando enviares o resto, manda-me um print e começamos logo.`
      : `Obrigado, vejo um pagamento de ${paid}. A taxa é maior, por isso falta um resto. Diz-me e indico-te o valor exato.`;
    case 'fr': return fee
      ? `Merci, je vois un paiement de ${paid}. Les frais sont de ${fee}, il reste donc ${left}. Dès que le reste est envoyé, envoie-moi une capture d'écran et nous commençons tout de suite.`
      : `Merci, je vois un paiement de ${paid}. Les frais sont plus élevés, il reste donc un solde. Dis-moi et je t'indique le montant exact.`;
    case 'it': return fee
      ? `Grazie, vedo un pagamento di ${paid}. La tariffa è ${fee}, quindi mancano ${left}. Appena invii il resto, mandami uno screenshot e partiamo subito.`
      : `Grazie, vedo un pagamento di ${paid}. La tariffa è più alta, quindi manca un saldo. Dimmelo e ti indico l'importo esatto.`;
    default: return fee
      ? `Thanks, I can see a payment of ${paid}. Our fee is ${fee}, so there is ${left} still to go. Once the rest is sent, just share a screenshot and we start straight away.`
      : `Thanks, I can see a payment of ${paid}. Our fee is higher than that, so there is a balance still to go. Let me know and I will give you the exact amount.`;
  }
}

// ── A SCREENSHOT THAT IS NOT A PAYMENT (3 Nov) ───────────────────────────────

/** The vision check's own sentence about a picture (its `reason`). Does it
 *  describe an ERROR, a failure or a "could not complete" screen? A 2 Nov
 *  customer sent a Services Australia IHI registration error and was told
 *  "Perfect, got it all, thank you": the check had said isConfirmation=false
 *  and the reply ignored it. */
export function reasonDescribesError(reason: string | null | undefined): boolean {
  const r = (reason ?? '').toLowerCase();
  if (!r) return false;
  return /\b(?:error|failed|failure|unsuccessful|not successful|could not|couldn'?t|unable|technical difficult\w*|try again|something went wrong|rejected|declined|denied|not available|invalid|timed out|session expired)\b/.test(r);
}

/** Should this attachment be refused as a PAYMENT? Yes when the check read it
 *  and found no proof, or found a proof of something else, or it reads as an
 *  error page; never on an undecided check (see checkWasUndecided). */
export function isNonPaymentScreenshot(check: { isProof: boolean; reason?: string | null; details?: ProofDetails | null }): boolean {
  if (check.isProof) return false;
  if (checkWasUndecided(check.reason)) return false;
  return true;
}

/** True when a screenshot the customer sent (a government or app page) shows an
 *  error, so the reply must NOT say "got it all". The caller asks the customer
 *  for the next step instead. */
export function screenshotShowsError(check: { isConfirmation?: boolean; reason?: string | null }): boolean {
  return check.isConfirmation !== true && reasonDescribesError(check.reason);
}

/** Wise, a foreign-currency transfer, or a pending one: the money is on its way
 *  but may not have landed (it can take days). The customer is thanked and the
 *  form link goes out so they can fill it in while waiting; Will never claims
 *  to SEE the transfer. */
export function isTransferInFlight(d: Pick<ProofDetails, 'status' | 'amountAud' | 'foreignCurrency'>): boolean {
  return d.status === 'pending' || (d.amountAud == null && !!d.foreignCurrency);
}

export function transferInFlightMessage(lang: string | null | undefined): string {
  const l = (lang ?? 'en').toLowerCase().slice(0, 2);
  switch (l) {
    case 'de': return 'Danke dir. Eine Überweisung aus dem Ausland kann ein paar Tage dauern. Ich bestätige dir die Zahlung, sobald sie bei uns angekommen ist. Das Formular kannst du schon jetzt ausfüllen.';
    case 'ja': return 'ありがとうございます。海外からの送金は数日かかることがあります。着金を確認でき次第お知らせします。フォームは今のうちにご記入いただけます。';
    case 'es': return 'Gracias. Una transferencia internacional puede tardar unos días. Te confirmo el pago en cuanto llegue a nuestra cuenta. Mientras tanto puedes ir rellenando el formulario.';
    case 'pt': return 'Obrigado. Uma transferência internacional pode demorar alguns dias. Confirmo o pagamento assim que chegar à nossa conta. Entretanto podes ir preenchendo o formulário.';
    case 'fr': return 'Merci. Un virement international peut prendre quelques jours. Je te confirme le paiement dès qu\'il arrive sur notre compte. Tu peux déjà remplir le formulaire en attendant.';
    case 'it': return 'Grazie. Un bonifico dall\'estero può richiedere qualche giorno. Ti confermo il pagamento appena arriva sul nostro conto. Intanto puoi già compilare il modulo.';
    default: return 'Thanks. An international transfer can take a few days. I will confirm the payment as soon as it reaches our account. You can fill in the form while you wait.';
  }
}

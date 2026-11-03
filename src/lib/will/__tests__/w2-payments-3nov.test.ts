import { claimsPayment, parsePastedPayment, looksLikePastedReceipt, collectPastedPayments } from '../payment-claim';
import {
  expectedFeeAud, compareAmountToFee, totalPaid, amountAllowsConfirmation, describeAmountVerdict, shortPaymentMessage,
  reasonDescribesError, isNonPaymentScreenshot, screenshotShowsError, isTransferInFlight, transferInFlightMessage, coerceProofDetails,
} from '../payment-proof';
import {
  hasWorkingFormLink, ensureFormLink, fallbackConfirmationText, defaultFormLink, confirmationRescue,
  confirmationWithLinkAlreadyOut, looksLikePaymentConfirmation,
} from '../payment-confirmation';

const DASHES = /[—–―⸺⸻]/;

describe('expected fee and amount comparison', () => {
  it('quotes the fee per income type, foreign income and years', () => {
    expect(expectedFeeAud({ income: 'TFN' })).toBe(220);
    expect(expectedFeeAud({ income: 'TFN_ABN' })).toBe(385);
    expect(expectedFeeAud({ income: 'TFN', foreignIncome: true })).toBe(330);
    expect(expectedFeeAud({ income: 'TFN_ABN', foreignIncome: true })).toBe(495);
    expect(expectedFeeAud({ income: 'TFN', years: 2 })).toBe(440);
    expect(expectedFeeAud({ income: null })).toBeNull();
  });

  it('refuses a short payment: 400 against a 440 two-year fee', () => {
    const v = compareAmountToFee(400, expectedFeeAud({ income: 'TFN', years: 2 }));
    expect(v).toMatchObject({ kind: 'short', shortBy: 40, expected: 440 });
    expect(amountAllowsConfirmation(v)).toBe(false);
    expect(describeAmountVerdict(v)).toContain('$40 still to come');
  });

  it('refuses 180 against 220 and adds up 180 plus 40', () => {
    expect(compareAmountToFee(180, 220).kind).toBe('short');
    expect(compareAmountToFee(totalPaid([180, 40]), 220).kind).toBe('match');
  });

  it('judges a payment below the cheapest fee even with no quote on file', () => {
    expect(compareAmountToFee(180, null)).toMatchObject({ kind: 'short', expected: 220, shortBy: 40 });
    expect(compareAmountToFee(385, null).kind).toBe('unknown');
  });

  it('confirms an overpayment and flags the difference: 250 against 220', () => {
    const v = compareAmountToFee(250, 220);
    expect(v).toMatchObject({ kind: 'over', overBy: 30 });
    expect(amountAllowsConfirmation(v)).toBe(true);
    expect(describeAmountVerdict(v)).toContain('$30 extra');
  });

  it('keeps the small tolerance for an intermediary fee or rounding up', () => {
    expect(compareAmountToFee(210, 220).kind).toBe('match');
    expect(compareAmountToFee(230, 220).kind).toBe('match');
    expect(compareAmountToFee(null, 220).kind).toBe('unknown');
  });

  it('asks for the rest in every language without dashes', () => {
    for (const lang of ['en', 'de', 'ja', 'es', 'pt', 'fr', 'it']) {
      const m = shortPaymentMessage(lang, { paid: 180, expected: 220, shortBy: 40 });
      expect(m).toContain('$180');
      expect(m).toContain('$40');
      expect(DASHES.test(m)).toBe(false);
      expect(/\bAI\b|\bbot\b/i.test(m)).toBe(false);
    }
  });
});

describe('pasted bank receipts as text', () => {
  const r180 = 'Payment made\n\nAmount: $180.00\nReceipt#: N000000000001\nTo: The Accounting Academy (062-692 XXXX 9952)\nDescription: Tax\n\nDate: 25 Oct 2026 08:22 PM';
  const r40 = 'Payment made\n\nAmount: $40.00\nReceipt#: N000000000002\nTo: The Accounting Academy (062-692 XXXX 9952)\n\nDate: 27 Oct 2026';

  it('reads amount, receipt number and recipient', () => {
    expect(parsePastedPayment(r180)).toMatchObject({ amountAud: 180, receiptNo: 'N000000000001', toUs: true });
  });
  it('is a payment claim', () => {
    expect(looksLikePastedReceipt(r180)).toBe(true);
    expect(claimsPayment(r180)).toBe(true);
  });
  it('recognises a receipt that has no payment keyword at all', () => {
    const t = 'Transfer\nAmount: $220.00\nReceipt number: 998877665\nTo: The Accounting Academy';
    expect(claimsPayment(t)).toBe(true);
  });
  it('adds the two part payments and counts a repeated receipt once', () => {
    const c = collectPastedPayments([r180, 'ok', r40, r180]);
    expect(c.parts).toEqual([180, 40]);
    expect(c.totalAud).toBe(220);
    expect(compareAmountToFee(c.totalAud, 220).kind).toBe('match');
  });
  it('does not count a receipt to someone else', () => {
    const other = 'Payment made\nAmount: $100.00\nReceipt#: N5555555\nTo: Some Landlord Pty Ltd';
    expect(collectPastedPayments([other])).toMatchObject({ totalAud: 0, toOther: true });
  });
  it('reads Wise and foreign currency without converting', () => {
    expect(parsePastedPayment('You sent 200 EUR\nRecipient gets 330.50 AUD\nTransfer 123456789').amountAud).toBe(330.5);
    const f = parsePastedPayment('You sent 200 EUR\nTransfer 123456789\nTo: The Accounting Academy');
    expect(f.amountAud).toBeNull();
    expect(f.foreign).toEqual({ amount: 200, currency: 'EUR' });
  });
  it('is not fooled by sentences about paying', () => {
    expect(looksLikePastedReceipt('the fee is $220, how do I pay?')).toBe(false);
    expect(claimsPayment('Is the fee $180 now?')).toBe(false);
  });
});

describe('non-payment screenshots', () => {
  it('a caption about Medicare / IHI errors with an attachment is not a payment', () => {
    expect(claimsPayment('here is the screenshot, it says registration failed due to technical difficulties', { hasAttachment: true })).toBe(false);
    expect(claimsPayment('this is the screenshot of my Medicare page', { hasAttachment: true })).toBe(false);
    expect(claimsPayment('screenshot of the IHI page', { hasAttachment: true })).toBe(false);
  });
  it('a real receipt caption still counts', () => {
    expect(claimsPayment('here you go', { hasAttachment: true })).toBe(true);
    expect(claimsPayment('paid, receipt attached', { hasAttachment: true })).toBe(true);
  });
  it('recognises an error page from the vision reason', () => {
    const reason = 'This shows an error message stating the Individual Healthcare Identifiers (IHI) service registration failed due to technical difficulties';
    expect(reasonDescribesError(reason)).toBe(true);
    expect(screenshotShowsError({ isConfirmation: false, reason })).toBe(true);
    expect(screenshotShowsError({ isConfirmation: true, reason })).toBe(false);
    expect(reasonDescribesError('A Medicare card, valid')).toBe(false);
  });
  it('a read screenshot that is no proof is refused; an undecided check is not', () => {
    expect(isNonPaymentScreenshot({ isProof: false, reason: 'a payslip' })).toBe(true);
    expect(isNonPaymentScreenshot({ isProof: false, reason: 'vision check failed' })).toBe(false);
    expect(isNonPaymentScreenshot({ isProof: true })).toBe(false);
  });
});

describe('foreign currency and in-flight transfers', () => {
  it('keeps the currency off the model output without converting', () => {
    const d = coerceProofDetails({ amount_aud: null, currency: 'eur', amount_original: 200, recipient_is_us: 'yes', status: 'pending' });
    expect(d.foreignCurrency).toBe('EUR');
    expect(isTransferInFlight(d)).toBe(true);
    expect(coerceProofDetails({ amount_aud: 220, currency: "AUD" }).foreignCurrency ?? null).toBeNull();
  });
  it('the in-flight message never claims to see the transfer and has no dash', () => {
    for (const lang of ['en', 'de', 'ja', 'es', 'pt', 'fr', 'it']) {
      const m = transferInFlightMessage(lang);
      expect(DASHES.test(m)).toBe(false);
      expect(/I can see|ich sehe|vedo|veo|vejo|je vois|確認しました/i.test(m)).toBe(false);
    }
  });
});

describe('the form link is always delivered', () => {
  const t0 = Date.parse('2026-11-02T10:00:00Z');
  const row = (o: Record<string, unknown>) => ({
    id: String(o.id ?? Math.random()), direction: 'OUT' as const, status: 'SENT' as const, body: '', meta: undefined,
    createdAt: new Date(t0).toISOString(), ...o,
  }) as never;
  const link = defaultFormLink('en');

  it('the canonical fallback text carries the working link in every language', () => {
    expect(link).toMatch(/^https:\/\//);
    for (const lang of ['en', 'de', 'ja', 'es', 'pt', 'fr', 'it']) {
      const t = fallbackConfirmationText(lang);
      expect(hasWorkingFormLink(t)).toBe(true);
      expect(DASHES.test(t)).toBe(false);
    }
  });
  it('appends the link to a linkless confirmation and replaces a retired slug', () => {
    expect(hasWorkingFormLink(ensureFormLink('Payment received.', link))).toBe(true);
    const retired = 'Payment received.\n\nhttps://workingholidaytax.com.au/tax-form';
    expect(hasWorkingFormLink(retired)).toBe(false);
    const fixed = ensureFormLink(retired, link);
    expect(hasWorkingFormLink(fixed)).toBe(true);
    expect(fixed).not.toContain('/tax-form');
    expect(ensureFormLink(fixed, link)).toBe(fixed);
  });

  it('rescues a FAILED confirmation nobody else followed up', () => {
    const r = confirmationRescue([row({ id: 'a', status: 'FAILED', body: 'Payment received.', meta: { paymentConfirmation: true } })], { now: t0 + 60 * 60 * 1000 });
    expect(r.action).toBe('resend');
  });
  it('rescues a DISCARDED confirmation, and a stuck QUEUED one', () => {
    expect(confirmationRescue([row({ status: 'DISCARDED', body: 'Payment received.', meta: { paymentConfirmation: true } })], { now: t0 + 3600_000 }).action).toBe('resend');
    expect(confirmationRescue([row({ status: 'QUEUED', body: 'Payment received.', meta: { paymentConfirmation: true } })], { now: t0 + 3600_000 }).action).toBe('resend');
    expect(confirmationRescue([row({ status: 'QUEUED', body: 'Payment received.', meta: { paymentConfirmation: true } })], { now: t0 + 60_000 }).action).toBe('none');
  });
  it('does nothing once any sent message carries the link, even from the team', () => {
    const failed = row({ id: 'a', status: 'FAILED', body: 'Payment received.', meta: { paymentConfirmation: true } });
    const team = row({ id: 'b', status: 'SENT', author: 'HUMAN', body: `Here you go ${link}`, createdAt: new Date(t0 + 5 * 60_000).toISOString() });
    expect(confirmationRescue([failed, team], { now: t0 + 3600_000 }).action).toBe('none');
  });
  it('a retired-slug copy does not count as delivered', () => {
    const failed = row({ id: 'a', status: 'DISCARDED', body: 'Payment received.', meta: { paymentConfirmation: true } });
    const bad = row({ id: 'b', status: 'SENT', body: 'Payment received.\n\nhttps://workingholidaytax.com.au/tax-form', meta: { paymentConfirmation: true }, createdAt: new Date(t0 + 60_000).toISOString() });
    expect(confirmationRescue([failed, bad], { now: t0 + 3600_000 }).action).toBe('send_link');
    expect(confirmationWithLinkAlreadyOut([failed, bad], { now: t0 + 3600_000 })).toBe(false);
  });
  it('a sent confirmation template counts: its button carries the link', () => {
    const tpl = row({ status: 'SENT', body: 'Payment received.', meta: { paymentConfirmation: true, waTemplate: { name: 'payment_received', params: [], lang: 'en' } } });
    expect(confirmationRescue([tpl], { now: t0 + 3600_000 }).action).toBe('none');
  });
  it('escalates after repeated failures, and waits for an approval', () => {
    const f = (i: number) => row({ id: `f${i}`, status: 'FAILED', body: 'Payment received.', meta: { paymentConfirmation: true }, createdAt: new Date(t0 + i * 1000).toISOString() });
    expect(confirmationRescue([f(1), f(2), f(3), f(4)], { now: t0 + 3600_000 }).action).toBe('escalate');
    expect(confirmationRescue([row({ status: 'PENDING_APPROVAL', body: 'Payment received.', meta: { proposedState: 'PAID' } })], { now: t0 + 3600_000 }).action).toBe('none');
  });
  it('no confirmation ever drafted is not this sweep\'s business', () => {
    expect(confirmationRescue([row({ body: 'Hi there' })], { now: t0 }).action).toBe('none');
    expect(looksLikePaymentConfirmation('Payment received.')).toBe(true);
  });
});

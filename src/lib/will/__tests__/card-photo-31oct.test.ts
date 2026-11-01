/** 31 Oct (Jo): Will never asks for or agrees to a photo or details of a payment card. */
import { policyGuard } from '@/lib/will/policy-guard';

const ctx = { paid: false } as Parameters<typeof policyGuard>[1];
const bad = (t: string) => policyGuard(t, ctx).violations.includes('CARD_DETAILS_INVITED');

describe('card details are never invited', () => {
  it.each([
    'Sure, you can send me a photo of your credit card.',
    'Please share your card details here and we will charge it.',
    'Send a screenshot of your debit card and the CVV.',
    'Bitte schick mir ein Foto deiner Kreditkarte.',
    'クレジットカードの写真を送ってください。',
  ])('blocks: %s', (t) => expect(bad(t)).toBe(true));

  it.each([
    "Please don't send any card details or photos of your card here, for your security. You can pay by bank transfer, or I can send you the secure payment link.",
    'Bitte schicke keine Kreditkartendaten oder Fotos deiner Karte. Du kannst per Überweisung zahlen.',
    'クレジットカードの写真は送らないでください。銀行振込でお支払いいただけます。',
    'Thanks, I got your Wise transfer screenshot!',
    'You can pay by card with the secure payment link.',
  ])('allows: %s', (t) => expect(bad(t)).toBe(false));
});

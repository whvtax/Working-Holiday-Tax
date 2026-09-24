/**
 * Jo, 24 Sep: 100 drafts in the Learning tab, most of them the same question
 * in different words, mined from "Option 1" + the price message, or from a
 * payment screenshot + the payment-received message. Three filters now sit
 * before the model, and the model is handed the Library so it does not
 * re-propose what is already there.
 */
import { isTrivialCustomerText, isApprovedScriptReply } from '@/lib/will/daily-digest';
import { APPROVED } from '@/lib/will/approved-messages';
import { PAYMENT_RECEIVED_MSG, FORM_RECEIVED_MSG } from '@/lib/will/i18n';

describe('a customer message with no question in it is not mined', () => {
  it('media placeholders, reactions, one-word acknowledgements', () => {
    for (const t of ['📷 [Photo]', '📎 [Message - open WhatsApp to view]', '👍 reacted to your message',
      'Option 1', 'option 2 please', 'Yes please :)', 'ok', 'Thanks!', 'Done', 'paid', 'TFN', 'Alles erledigt'.slice(0, 3), 'はい']) {
      expect([t, isTrivialCustomerText(t)]).toEqual([t, true]);
    }
  });
  it('a real question is', () => {
    for (const t of ['Is this receipt good for fuel deductions?', 'wie kann ich den antrag einreichen', 'My employer won\'t pay me my wages',
      'Are work-from-home expenses included?']) {
      expect([t, isTrivialCustomerText(t)]).toEqual([t, false]);
    }
  });
});

describe('a reply that is an approved script is not mined', () => {
  it('the price messages, with a name in the greeting', () => {
    expect(isApprovedScriptReply(APPROVED.price_tfn)).toBe(true);
    expect(isApprovedScriptReply(APPROVED.price_tfn_abn)).toBe(true);
    expect(isApprovedScriptReply(APPROVED.opening.replace('Hey!', 'Hey Sarah!'))).toBe(true);
  });
  it('the payment-received and form-received messages in every language', () => {
    for (const m of Object.values(PAYMENT_RECEIVED_MSG)) expect(isApprovedScriptReply(m)).toBe(true);
    for (const m of Object.values(FORM_RECEIVED_MSG)) expect(isApprovedScriptReply(m)).toBe(true);
  });
  it('an old Library copy of the payment-received message (form link + thank you)', () => {
    expect(isApprovedScriptReply('Thank you for your payment! Please fill out our quick form so we can start reviewing your situation: https://workingholidaytax.com.au/tax-form\n\nOnce you\'ve submitted it, we\'ll review everything and get back to you within 24 hours.')).toBe(true);
  });
  it('a real answer is not', () => {
    expect(isApprovedScriptReply("I'm sorry to hear you're dealing with unpaid wages. Call TIS National on 131 450 and ask to be connected to the Fair Work Ombudsman.")).toBe(false);
  });
});

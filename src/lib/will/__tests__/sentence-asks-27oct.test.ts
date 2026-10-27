/** 27 Oct (Luca): four requests in plain sentences were refused as REPLY_TOO_LONG. */
import { SENTENCE_ASK } from '@/lib/will/policy-guard';
it('counts requests written as sentences', () => {
  const luca = "Hi, thanks for getting back to me so quickly! I'd like to go ahead with the TFN option ($220).\n\nBefore I pay, could you please send me an invoice with your business name, ABN and TPB registration number and confirm the name on the bank account.\nAlso, can you confirm that I will be added to the client list before the deadline of the 31st?";
  expect((luca.match(SENTENCE_ASK) ?? []).length).toBeGreaterThanOrEqual(3);
  expect(('Thanks, all good!'.match(SENTENCE_ASK) ?? []).length).toBe(0);
});

import { policyGuard } from '@/lib/will/policy-guard';
it("Luca's four-part answer is no longer refused as too long", () => {
  const luca = "Hi, thanks for getting back to me so quickly! I'd like to go ahead with the TFN option ($220).\n\nBefore I pay, could you please send me an invoice with your business name, ABN and TPB registration number and confirm the name on the bank account.\nAlso, can you confirm that I will be added to the client list before the deadline of the 31st?";
  const reply = "Of course, it's smart to check.\n\nWe'll send you a tax invoice once your payment comes through.\n\nYou can find our registered tax agent's name, TPB number and all our business details here: https://workingholidaytax.com.au/client-agreement\n\nThe account name is The Accounting Academy, BSB 062692, account 81049952.";
  const ctx = { state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, customerText: luca, customerTextChars: luca.length };
  expect(policyGuard(reply, ctx).violations).not.toContain('REPLY_TOO_LONG');
});

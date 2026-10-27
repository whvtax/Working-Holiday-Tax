/** Jo, 12 Oct: foreign income adds $110 (TFN $330, TFN + ABN $495), only when
 *  the customer raises it before paying; Will never asks about it. */
import { mentionsForeignIncome, hasForeignIncome } from '@/lib/will/foreign-income';
import { priceMessageFor, firstContactPriceMessage } from '@/lib/will/instant-choice';
import { APPROVED } from '@/lib/will/approved-messages';
import { enforcePriceMessage, isApprovedVerbatim } from '@/lib/will/engine';
import { amountMatchesFee, incomeFromAmount } from '@/lib/will/payment-proof';
import { policyGuard } from '@/lib/will/policy-guard';
import { readFileSync } from 'fs';
import { join } from 'path';

const ALICE = 'I worked in Australia on a Working Holiday visa until February 2026, and I also need to report foreign income.';

describe('detecting it', () => {
  it.each([ALICE, 'I had overseas income too', 'I also have income from Germany', '海外の収入もあります', 'Ich habe auch ausländisches Einkommen'])('%s', (t) => {
    expect(mentionsForeignIncome(t)).toBe(true);
  });
  it.each(["I'm overseas now", 'I have no foreign income', 'I worked on a TFN only', 'I left Australia in March'])('%s is not foreign income', (t) => {
    expect(mentionsForeignIncome(t)).toBe(false);
  });
  it('anywhere in the conversation', () => {
    expect(hasForeignIncome(['hi', ALICE, 'TFN'])).toBe(true);
  });
});

describe('the price', () => {
  it('$330 / $495, same shape, and NO guarantee (Jo, 12 Oct)', () => {
    expect(priceMessageFor('TFN', true)).toBe(APPROVED.price_tfn_foreign);
    expect(priceMessageFor('TFN_ABN', true)).toBe(APPROVED.price_tfn_abn_foreign);
    expect(APPROVED.price_tfn_foreign).toContain('$330');
    expect(APPROVED.price_tfn_abn_foreign).toContain('$495');
    for (const m of [APPROVED.price_tfn_foreign, APPROVED.price_tfn_abn_foreign]) {
      expect(m).not.toMatch(/refund the difference|no refund|full fee applies/);
      expect(m).toContain('BSB: 062692');
      expect(m).not.toMatch(/\$220|\$385|[—–]/);
    }
    expect(firstContactPriceMessage('TFN', 'Alice', true)).toMatch(/^Hey Alice! 😊 Happy to help\.\n\nLooks like the TFN option with foreign income is the right fit for you: \$330\./);
  });
  it('without foreign income nothing changes', () => {
    expect(priceMessageFor('TFN')).toBe(APPROVED.price_tfn);
  });
  it('the model draft naming $330 is replaced by the approved text', () => {
    expect(enforcePriceMessage('Sure!\n\nThat is $330.\nBSB: 062692\nAccount: 81049952')).toContain(APPROVED.price_tfn_foreign);
    expect(isApprovedVerbatim(APPROVED.price_tfn_abn_foreign)).toBe(true);
    expect(enforcePriceMessage('That is $220.\nBSB: 062692', true)).toBe(APPROVED.price_tfn_foreign);
    expect(enforcePriceMessage('That is $220.\nBSB: 062692')).toBe(APPROVED.price_tfn);
  });
  it('the guard lets the new prices out', () => {
    const ctx = { state: 'QUALIFIED' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };
    expect(policyGuard(APPROVED.price_tfn_foreign, ctx).allowed).toBe(true);
    expect(policyGuard(APPROVED.prices_foreign, ctx).allowed).toBe(true);
  });
  it('a $330 / $495 receipt is our fee', () => {
    expect(amountMatchesFee(330)).toBe(true);
    expect(incomeFromAmount(495)).toBe('TFN_ABN');
    expect(incomeFromAmount(330)).toBe('TFN');
  });
});

describe('never asked, only before payment', () => {
  const playbook = readFileSync(join(__dirname, '..', 'playbook.ts'), 'utf8');
  it('the playbook says so', () => {
    expect(playbook).toMatch(/NEVER ask about foreign income/);
    expect(playbook).toMatch(/THE GUARANTEE DOES NOT APPLY to a customer with foreign income/);
    expect(playbook).toMatch(/ONLY when the customer raises it themselves BEFORE paying/);
    expect(APPROVED.opening).not.toMatch(/foreign|overseas/i);
  });
});

describe('Chinese and Vietnamese foreign income (27 Oct)', () => {
  it.each([
    '我在国内还有收入', '我有海外收入要报吗', '去年在中国上班', 'Mình có thu nhập ở Việt Nam', 'em có lương từ VN',
  ])('%s counts', (t) => expect(mentionsForeignIncome(t)).toBe(true))
  it.each([
    '我没有海外收入', '我在澳洲打工', 'Mình không có thu nhập nước ngoài', 'em làm phục vụ ở Melbourne',
  ])('%s does not', (t) => expect(mentionsForeignIncome(t)).toBe(false))
})

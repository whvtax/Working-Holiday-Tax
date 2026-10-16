/** 16 Oct (Jo): a customer who already checked their result gets "our fee is
 *  non-refundable and covers our time and review" instead of the guarantee. */
import { alreadyCheckedReason, applyCheckedClause, CHECKED_CLAUSE } from '@/lib/will/already-checked';
import { APPROVED } from '@/lib/will/approved-messages';
import { policyGuard } from '@/lib/will/policy-guard';

describe('spotting it', () => {
  it.each([
    ['My accountant already checked it and said I get about $900', 'elsewhere'],
    ['H&R Block quoted me a refund', 'elsewhere'],
    ['I already had my return checked', 'elsewhere'],
    ['I checked myGov and it says I owe $300', 'result'],
    ['myGov shows my income already', 'result'],
    ['The online calculator says I get $1,200 back', 'result'],
    ['I should get $800 back', 'result'],
    ['I already looked into it', 'general'],
  ])('%s → %s', (t, r) => { expect(alreadyCheckedReason([t])).toBe(r); });
  it.each(['I have myGov, do I need it?', 'Do I need myGov?', 'How much is it?', 'I worked on a TFN only'])('%s → nothing', (t) => {
    expect(alreadyCheckedReason([t])).toBeNull();
  });
});

describe('the price message', () => {
  it('the guarantee is replaced, everything else stays', () => {
    const m = applyCheckedClause(APPROVED.price_tfn, 'result');
    expect(m).not.toMatch(/refund the difference/);
    expect(m).toContain(CHECKED_CLAUSE.result);
    expect(m).toContain('BSB: 062692');
    expect(m).toContain('$220');
    expect(m).toMatch(/Just send a screenshot once paid/);
  });
  it('foreign income (no guarantee): the clause is added before the screenshot line', () => {
    const m = applyCheckedClause(APPROVED.price_tfn_foreign, 'elsewhere');
    expect(m.indexOf(CHECKED_CLAUSE.elsewhere)).toBeLessThan(m.indexOf('Just send a screenshot'));
  });
  it('no hint → untouched', () => {
    expect(applyCheckedClause(APPROVED.price_tfn, null)).toBe(APPROVED.price_tfn);
  });
  it('the guard lets exactly these sentences through before payment, and nothing else', () => {
    const ctx = { state: 'QUALIFIED' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };
    for (const c of Object.values(CHECKED_CLAUSE)) expect(policyGuard(c, ctx).violations).not.toContain('NON_REFUNDABLE_WORDING');
    expect(policyGuard('Our fee is non-refundable.', ctx).violations).toContain('NON_REFUNDABLE_WORDING');
  });
});

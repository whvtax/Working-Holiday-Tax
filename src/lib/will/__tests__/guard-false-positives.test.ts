/**
 * Full audit, 11 Oct 2026, decision 6: six guard false positives that turned
 * short correct answers into handoffs (Kanna's $385 went to a competitor),
 * plus two new guards (internal notes, typed links).
 */
import { policyGuard, stripNonMoneyFigures, hasForeignUrl } from '@/lib/will/policy-guard';
import { APPROVED } from '@/lib/will/approved-messages';

const pre = (over: Partial<Parameters<typeof policyGuard>[1]> = {}) => ({ state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, ...over });
const post = (over: Partial<Parameters<typeof policyGuard>[1]> = {}) => pre({ state: 'FORM_COMPLETE', paid: true, ...over });
const amounts = (v: string[]) => v.filter((x) => x.startsWith('FORBIDDEN_AMOUNT'));

describe('1. a figure the customer quoted may be echoed back', () => {
  it('James, Megan, ひめか', () => {
    expect(amounts(policyGuard('The $1100 you mentioned is withheld tax, and that is exactly what the review looks at.', pre({ customerText: 'they took $1100 from me, do I get it back?' })).violations)).toEqual([]);
    expect(amounts(policyGuard('8,000ドルの収入でしたら、TFN + ABNのオプションになります。', post({ customerText: '収入は8,000ドルくらいでした' })).violations)).toEqual([]);
  });
  it('a figure the customer did not write is still refused', () => {
    expect(amounts(policyGuard('You should get around $1100 back.', pre({ customerText: 'how much will I get?' })).violations)).toEqual(['FORBIDDEN_AMOUNT:1100.00']);
  });
});

describe('2. whole multiples of the fixed prices, for several years or people', () => {
  it('Anika, Remi, Lisa', () => {
    expect(amounts(policyGuard('For the two years it would be $440 in total.', pre()).violations)).toEqual([]);
    expect(amounts(policyGuard('Three returns with ABN income come to $1,155.', pre()).violations)).toEqual([]);
  });
  it('a multiple with no such context is still refused', () => {
    expect(amounts(policyGuard('The fee for you is $440.', pre()).violations)).toEqual(['FORBIDDEN_AMOUNT:440.00']);
  });
});

describe('3. BSB, account numbers, markdown and plain counts are not money', () => {
  it('Kanna: **BSB: 062692** was read as $62,692', () => {
    const t = '料金は$385です。\n\n**BSB: 062692**\n**Account: 81049952**\n\nスクリーンショットを送ってください。';
    expect(amounts(policyGuard(t, pre()).violations)).toEqual([]);
  });
  it('"24 hours", "2つのプラン"', () => {
    expect(amounts(policyGuard('The team will get back to you within 24 hours.', pre()).violations)).toEqual([]);
    expect(amounts(policyGuard('料金は2つのプランがあります。', pre()).violations)).toEqual([]);
  });
  it('stripNonMoneyFigures keeps everything else', () => {
    expect(stripNonMoneyFigures('**BSB: 062692** and $220')).toMatch(/\$220/);
    expect(stripNonMoneyFigures('**BSB: 062692** and $220')).not.toMatch(/062692/);
  });
  it('a foreign BSB is still WRONG_BANK_DETAILS (the raw text is checked)', () => {
    expect(policyGuard('Please pay to BSB 123456, account 99887766.', pre()).violations).toContain('WRONG_BANK_DETAILS');
  });
});

describe('4. $220.00 and $385.00', () => {
  it('are the fixed prices', () => {
    expect(amounts(policyGuard('The amount is $220.00.', pre()).violations)).toEqual([]);
    expect(amounts(policyGuard('Amount: $385.00', pre()).violations)).toEqual([]);
  });
});

describe('5. after payment, the fee already paid and refund logistics are not sales', () => {
  it('Laurine, Denise, なる', () => {
    expect(policyGuard('The $385 you paid us is our fee, and the $414 is what you owe the ATO, two different things.', post({ customerText: 'so I paid 385 and now I owe 414?' })).violations).not.toContain('SALES_CONTENT_AFTER_PAYMENT');
    expect(policyGuard('Your refund goes to the Wise account you gave us, no fee is taken from it.', post()).violations).not.toContain('SALES_CONTENT_AFTER_PAYMENT');
    expect(policyGuard('Yes, we can help with your superannuation (DASP) as well, the team will send the next step.', post()).violations).not.toContain('SALES_CONTENT_AFTER_PAYMENT');
  });
  it('a real re-pitch after payment is still refused', () => {
    expect(policyGuard('Our fee is just $220 and comes with a guarantee!', post()).violations).toContain('SALES_CONTENT_AFTER_PAYMENT');
  });
});

describe('6. a negated password, a tax-agent reassurance', () => {
  it('Nathan, Thomas', () => {
    expect(policyGuard("You won't share any passwords with us, we never need them.", pre()).violations).not.toContain('SENSITIVE_CONTENT');
    expect(policyGuard('We work under a registered tax agent with the ATO, so you never give us your myGov login data.', pre()).violations).not.toContain('MYGOV_TROUBLESHOOTING');
  });
  it('a real leak is still refused', () => {
    expect(policyGuard('Your password is hunter2.', pre()).violations).toContain('SENSITIVE_CONTENT');
    expect(policyGuard('Go to my.gov.au, click Sign in and enter your password.', pre()).violations).toContain('MYGOV_TROUBLESHOOTING');
  });
});

describe('new: internal notes and typed links', () => {
  it('Hiro: an internal note in the reply', () => {
    expect(policyGuard('料金総額は [TEAM: 正確な料金を確認してください] です。', pre()).violations).toContain('INTERNAL_NOTE_LEFT_IN');
    expect(policyGuard('The fee is [INSERT PRICE].', pre()).violations).toContain('INTERNAL_NOTE_LEFT_IN');
  });
  it('a link that is not ours', () => {
    expect(hasForeignUrl('Fill in the form at workingholidaytax.com/start')).toBe(true);
    expect(hasForeignUrl('https://workingholidaytax.com.au/start')).toBe(false);
    expect(hasForeignUrl('see my.gov.au and ato.gov.au')).toBe(false);
    expect(policyGuard('Here is the form: https://workingholidaytax.com/start', pre()).violations).toContain('TYPED_URL');
    expect(policyGuard(APPROVED.price_tfn, pre()).violations).not.toContain('TYPED_URL');
  });
});

describe('asking whether they lodged is not DIY instructions (12 Oct)', () => {
  it('the question passes, the instruction is still caught', () => {
    const { policyGuard: pg } = jest.requireActual('@/lib/will/policy-guard') as typeof import('@/lib/will/policy-guard');
    const ctx = { state: 'NEW_LEAD' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };
    const q = "Sorry to hear you're having trouble with that. Just to clarify: did you already lodge your tax return yourself (through myGov or with someone else), or are you still waiting to lodge it?";
    expect(pg(q, ctx).violations).not.toContain('DIY_INSTRUCTIONS');
    expect(pg('You can lodge your return yourself in myGov.', ctx).violations).toContain('DIY_INSTRUCTIONS');
  });
});

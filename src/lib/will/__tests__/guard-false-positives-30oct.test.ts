/**
 * 30 Oct 2026, from 410 real chats: Policy Guard false positives that blocked
 * correct replies (a human then retyped them). Each block below is tested on
 * BOTH sides: the correct wording now passes, the genuine violation still blocks.
 * No production data: every sentence is written for the test.
 */
import { policyGuard, hasForeignUrl, allowedPriceSums } from '@/lib/will/policy-guard';

const pre = (over: Partial<Parameters<typeof policyGuard>[1]> = {}) => ({ state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, ...over });
const post = (over: Partial<Parameters<typeof policyGuard>[1]> = {}) => pre({ state: 'FORM_COMPLETE', paid: true, ...over });
const v = (t: string, c = pre()) => policyGuard(t, c).violations;
const amounts = (list: string[]) => list.filter((x) => x.startsWith('FORBIDDEN_AMOUNT'));

describe('FORBIDDEN_AMOUNT: bank details are not money', () => {
  it.each([
    'Transfer to BSB 062692 and account number 81049952, then send me a screenshot.',
    'BSB 062 692, account 8104 9952. Send me the receipt when it is done.',
    'BSB: 062-692\nAccount Number: 81049952',
    'Once you transfer to BSB 062692 you get the form straight away.',
  ])('passes: %s', (t) => {
    expect(amounts(v(t))).toEqual([]);
    expect(v(t)).not.toContain('TAX_DETERMINATION');
  });
  it('a different BSB is still WRONG_BANK_DETAILS', () => {
    expect(v('Transfer to BSB 123456 and account 11112222.')).toContain('WRONG_BANK_DETAILS');
  });
});

describe('FORBIDDEN_AMOUNT: sums of approved fixed prices', () => {
  it.each([
    'Three years at $385 each is $1,155 in total.',
    'Two years at $220 is $440 in total.',
    '$330 + $110 = $440',
    '$220 + $385 = $605',
    'That is 3 x $385 = $1,155.',
    'Two returns at $385 come to $770.',
  ])('passes: %s', (t) => {
    expect(amounts(v(t))).toEqual([]);
  });
  it('an invented total or a figure that is not a sum of approved prices still blocks', () => {
    expect(amounts(v('Three years at $385 each is $1,200 in total.')).length).toBeGreaterThan(0);
    expect(amounts(v('I can do it for $199 today.')).length).toBeGreaterThan(0);
    expect(amounts(v('The fee for you is $440.')).length).toBeGreaterThan(0); // no arithmetic, no years: unchanged
  });
  it('allowedPriceSums needs a shown fixed price and arithmetic', () => {
    expect(allowedPriceSums('nothing here')).toEqual([]);
    expect(allowedPriceSums('$385')).toEqual([]);
    expect(allowedPriceSums('$385 for each of 3 years')).toContain(115500);
  });
});

describe('FORBIDDEN_AMOUNT: the customer\'s own number', () => {
  it('echoes a number the customer wrote, with or without a currency sign', () => {
    expect(amounts(v('Thanks, the $8,000 you mentioned is exactly what we look at.', pre({ customerText: 'I earned 8000 in total' })))).toEqual([]);
    expect(amounts(v('So the invoice for $1,155 is for the three years.', pre({ customerText: 'the invoice says 1155' })))).toEqual([]);
  });
  it('a figure the customer did not write still blocks', () => {
    expect(amounts(v('You should get around $1,100 back.', pre({ customerText: 'how much will I get?' })))).not.toEqual([]);
  });
});

describe('FORBIDDEN_AMOUNT and SALES_CONTENT_AFTER_PAYMENT: a direct fee question from a paid customer', () => {
  it('$220 in the answer to a fee question passes', () => {
    const t = 'Yes, the fee you paid was $220 for the TFN return, and it is per person.';
    expect(v(t, post({ customerText: 'Is the fee $220 per person? Can my husband pay too?' }))).toEqual([]);
    expect(v('The fee is $220 for a TFN return.', post({ customerText: 'so do I owe anything, no need to pay the invoice?' }))).toEqual([]);
  });
  it('a price with no fee question, after payment, still blocks', () => {
    expect(v('Our fee is $220, so book another one.', post({ customerText: 'Thanks, got it' }))).toEqual(expect.arrayContaining(['FORBIDDEN_AMOUNT:220.00']));
  });
  it('a discount is still refused even after a fee question', () => {
    expect(v('I can give you a discount, $100 for the second one.', post({ customerText: 'what is the fee for my friend?' }))).toContain('PRICE_NEGOTIATION');
  });
});

describe('REFUND_OR_CANCEL_PROMISE: the approved guarantee sentence', () => {
  const g = "If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.";
  it('passes verbatim, with curly apostrophes, with an opening, and in Japanese', () => {
    expect(v(g)).toEqual([]);
    expect(v(g.replace(/'/g, '’'))).toEqual([]);
    expect(v('Good question, Takeyama! ' + g)).toEqual([]);
    expect(v('料金より還付金が少ない場合は、その差額を返金します。')).not.toContain('REFUND_OR_CANCEL_PROMISE');
  });
  it('passes for a paid customer who asks about the fee', () => {
    expect(v(g, post({ customerText: 'what if my refund is less than the fee?' }))).toEqual([]);
  });
  it('is blocked for a customer the guarantee does not cover (ABN, foreign income, already lodged)', () => {
    expect(v(g, pre({ guaranteeBarred: true }))).toContain('GUARANTEE_NOT_ALLOWED');
    expect(v(g, pre({ guaranteeBarred: false }))).not.toContain('GUARANTEE_NOT_ALLOWED');
  });
  it('real refund promises still block', () => {
    expect(v("We'll refund your fee if you are not happy.")).toContain('REFUND_OR_CANCEL_PROMISE');
    expect(v("I'll refund you $220 straight away.")).toContain('REFUND_OR_CANCEL_PROMISE');
    expect(v('You get your money back, no questions asked.')).toContain('REFUND_OR_CANCEL_PROMISE');
    expect(v('全額返金します。')).toContain('REFUND_OR_CANCEL_PROMISE');
    expect(v("We'll cancel it and you won't pay.")).toContain('REFUND_OR_CANCEL_PROMISE');
  });
});

describe('DIY_INSTRUCTIONS: a plain question is not an instruction', () => {
  it.each([
    'Did you already lodge it yourself?',
    'Have you lodged it yourself already, or are you still waiting to lodge it?',
    'Are you planning to lodge it yourself?',
  ])('passes: %s', (t) => {
    expect(v(t)).not.toContain('DIY_INSTRUCTIONS');
  });
  it('instructions still block', () => {
    expect(v('You can lodge it yourself on myGov, step by step.')).toContain('DIY_INSTRUCTIONS');
    expect(v('Just do it yourself, it is easy.')).toContain('DIY_INSTRUCTIONS');
    expect(v('Would you like me to explain step by step how to lodge it yourself?')).toContain('DIY_INSTRUCTIONS');
  });
});

describe('MYGOV_TROUBLESHOOTING: reassurance is not troubleshooting', () => {
  it.each([
    "You don't need myGov, we handle everything with the ATO directly.",
    'No need to log in to myGov, we deal with the ATO for you.',
    'Sobald du bei uns Kunde bist, kümmern wir uns direkt mit dem ATO um alles. Du musst dich nirgendwo einloggen oder irgendetwas mit myGov machen.',
    'myGovにログインする必要はありません。ATOとのやり取りはこちらで対応します。',
  ])('passes: %s', (t) => {
    expect(v(t)).not.toContain('MYGOV_TROUBLESHOOTING');
  });
  it('a real walkthrough still blocks', () => {
    expect(v('Go to my.gov.au, click Link a service and select the Australian Taxation Office.')).toContain('MYGOV_TROUBLESHOOTING');
    expect(v('Log in to myGov and reset your password, then try again.')).toContain('MYGOV_TROUBLESHOOTING');
    expect(v('Melde dich bei myGov an und klicke auf Dienst verknüpfen.')).toContain('MYGOV_TROUBLESHOOTING');
  });
});

describe('REPLY_TOO_LONG scales with the number of questions', () => {
  const answer = (n: number) => Array.from({ length: n }, (_, i) => `Answer ${i + 1}: yes, that is something we take care of for you from start to finish, so you do not need to do anything else about it.`).join('\n');
  it('a four question message gets room for four answers', () => {
    const q = 'Do you need my passport? Can my husband pay? Is the fee per person? When will it be done?';
    expect(v(answer(4), pre({ customerText: q }))).not.toContain('REPLY_TOO_LONG');
  });
  it('the same long text for a one line message is still too long', () => {
    expect(v(answer(8), pre({ customerText: 'ok' }))).toContain('REPLY_TOO_LONG');
  });
});

describe('DEADLINE_CLAIM: the approved conditional wording passes, the promise does not', () => {
  it('passes', () => {
    expect(v("Yes, you have time. As long as you're with us before 31 October, the due date is usually 15 May 2027.")).not.toContain('DEADLINE_CLAIM');
    expect(v("There's no rush as long as you're with us before 31 October, then it is usually 15 May 2027.")).not.toContain('DEADLINE_CLAIM');
  });
  it('blocks', () => {
    expect(v("There's no lodgment deadline you need to worry about.")).toContain('DEADLINE_CLAIM');
    expect(v('You can lodge anytime, there is no deadline that affects your refund.')).toContain('DEADLINE_CLAIM');
  });
});

describe('SALES_CONTENT_AFTER_PAYMENT: an expense answer to a paid customer', () => {
  it('passes', () => {
    expect(v('For your phone, send the bill and tell me the percentage you use it for work. The cost of the plan is on the bill.', post({ customerText: 'my phone bill came to $312' }))).not.toContain('SALES_CONTENT_AFTER_PAYMENT');
    expect(v('Union fees and course fees can be listed too, a bank statement with them highlighted is enough.', post({ customerText: 'can I add my union fee?' }))).not.toContain('SALES_CONTENT_AFTER_PAYMENT');
  });
  it('selling to a paid customer still blocks', () => {
    expect(v('Our price is great value, tell your friends about us.', post({ customerText: 'thanks!' }))).toContain('SALES_CONTENT_AFTER_PAYMENT');
    expect(v('There is a guarantee on our fee too.', post({ customerText: 'send the phone bill' }))).toContain('SALES_CONTENT_AFTER_PAYMENT');
  });
});

describe('the $300 list rule after payment', () => {
  it('states the Library line', () => {
    expect(amounts(v('Without receipts you can list the items you bought, up to $300 in total.', post()))).toEqual([]);
    expect(amounts(v('Your refund is safe with us. Without receipts you can list up to $300 of work expenses.', post()))).toEqual([]);
  });
  it('a $300 refund or estimate still blocks', () => {
    expect(amounts(v('You will get $300 back for your expenses.', post())).length).toBeGreaterThan(0);
    expect(amounts(v('Your refund is about $300.', post())).length).toBeGreaterThan(0);
  });
});

describe('TYPED_URL and the broken brand link', () => {
  it.each([
    'Details are on https://workingholidaytax.com.au/faq',
    'Email us at info@workingholidaytax.com.au',
    'See www.workingholidaytax.com.au.',
    'You can check it on my.gov.au or on www.ato.gov.au/individuals.',
    'More at https://www.tpb.gov.au/public-register.',
  ])('own and government links pass: %s', (t) => {
    expect(hasForeignUrl(t)).toBe(false);
    expect(v(t)).not.toContain('TYPED_URL');
  });
  it('another site is still TYPED_URL', () => {
    expect(v('Use https://example-tax-help.com/start for that.')).toContain('TYPED_URL');
  });
  it('our domain without .au or a retired slug is blocked as a broken link', () => {
    expect(v('Please fill https://workingholidaytax.com/start')).toContain('BRAND_URL_BROKEN');
    expect(v('Please fill https://workingholidaytax.com.au/tax-form')).toContain('BRAND_URL_BROKEN');
    expect(v('Please fill https://workingholidaytax.com.au/start', post())).not.toContain('BRAND_URL_BROKEN');
  });
});

describe('real protections still hold', () => {
  it('dashes, AI wording, invented amounts', () => {
    expect(v('Sure — we can help.')).toContain('EM_DASH_FORBIDDEN');
    expect(v('I am an AI assistant.')).toContain('AI_IDENTITY_ANSWER');
    expect(amounts(v('Your fee is only $97 today.')).length).toBeGreaterThan(0);
  });
  it('only the Xero temporary password is allowed, any other is blocked', () => {
    expect(v('It looks like a Xero account. If it asks for a password, try 123456789.')).not.toContain('SENSITIVE_CONTENT');
    expect(v('It looks like a Xero account. If it asks for a password, try 987654321.')).toContain('SENSITIVE_CONTENT');
    expect(v('Open your Xero link. If it asks for a password, select "Forgot password" and reset it.')).not.toContain('SENSITIVE_CONTENT');
  });
});

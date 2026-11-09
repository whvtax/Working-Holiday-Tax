/** Jo, 9 Nov: a customer asked for three years of returns; Will sent the
 *  one-year price message ($220) and the second check held it twice. The
 *  price message now says the fee per year and the total. */
jest.mock('@/lib/will/claude', () => ({ ...jest.requireActual('@/lib/will/claude'), decide: jest.fn() }));
import fs from 'fs';
import path from 'path';
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput, yearsAsked, withYearsTotal } from '@/lib/will/engine';
import { policyGuard } from '@/lib/will/policy-guard';
import { APPROVED as APPROVED_MESSAGES } from '@/lib/will/approved-messages';

it('counts years only when the customer plainly asks for several returns', () => {
  expect(yearsAsked(['I need three years of returns done'])).toBe(3);
  expect(yearsAsked(['Can you do 2 tax returns?'])).toBe(2);
  expect(yearsAsked(['I need both years please'])).toBe(2);
  expect(yearsAsked(['for the last three years'])).toBe(3);
  expect(yearsAsked(['2022-23, 2023-24 and 2024-25 please'])).toBe(3);
  expect(yearsAsked(['I was in Australia for 2 years'])).toBeNull();
  expect(yearsAsked(['TFN only please'])).toBeNull();
  expect(yearsAsked(['I worked 3 jobs'])).toBeNull();
});

it('the price line says per year and the total; nothing else changes', () => {
  const tfn = APPROVED_MESSAGES.price_tfn;
  const out = withYearsTotal(tfn, 3);
  expect(out).toContain("Got it, so that's the TFN option, $220 per year, so $660 for the 3 years. Each year is its own return.");
  expect(out).toContain('BSB: 062692');
  expect(out.split('\n').slice(1)).toEqual(tfn.split('\n').slice(1));
  expect(withYearsTotal(APPROVED_MESSAGES.price_tfn_abn, 2)).toContain('$385 per year, so $770 for the 2 years');
  expect(withYearsTotal(tfn, null)).toBe(tfn);
  expect(out).not.toMatch(/[–—―]/);
});

it('the guard lets the total through', () => {
  const v = policyGuard(withYearsTotal(APPROVED_MESSAGES.price_tfn, 3), {
    aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
    state: 'NEW_LEAD', paid: false, isApprovedTemplate: true, customerText: 'TFN only, three years of returns', customerTextChars: 33,
  } as Parameters<typeof policyGuard>[1]);
  expect(v.violations).toEqual([]);
});

it('end to end: three years, TFN, Will picks price_tfn, the customer sees $660', async () => {
  (decide as jest.Mock).mockResolvedValue({ action: 'reply', approved_key: 'price_tfn', confidence: 0.95, reply_text: 'x', new_state: 'PRICE_SENT' });
  const out = await runEngine({
    ctx: { name: 'Sam', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [], decisionMode: 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [
      { role: 'customer', text: 'Hi, I need three years of returns done' },
      { role: 'assistant', text: 'Which option works best for you?' },
      { role: 'customer', text: 'TFN only' },
    ],
    mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: 'will',
  } as EngineInput);
  expect(out.replyText).toContain('$220 per year, so $660 for the 3 years');
});

it('the second check is told this is a pass', () => {
  const r = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/reviewer.ts'), 'utf8');
  expect(r).toContain('SEVERAL YEARS, PRICE MESSAGE (Jo, 9 Nov)');
});

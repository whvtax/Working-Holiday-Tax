/**
 * Full audit, 11 Oct 2026, decision 2: answer first, pitch later.
 * Stephanie asked five questions and got "Great! Here are the payment
 * details". A message that asks something is never answered with the menu
 * or the bank block; the question about the price itself still is.
 */
import { runEngine, EngineInput, customerAskedSomething, isChoiceOrPriceAsk, menuAsAnswer, stripMenuAndBank } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';
import { buildSystemPrompt } from '@/lib/will/playbook';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const base = (over: Partial<EngineInput> = {}): EngineInput => ({
  ctx: { name: 'Stephanie', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history: [{ role: 'customer', text: 'Hi! Do I need to be in Australia to lodge? And is the deadline 31 October? I left in August.' }],
  mode: 'FULL_AUTO',
  bank: { bsb: '062692', account: '81049952' },
  ...over,
});
beforeEach(() => decideMock.mockReset());

describe('what counts as a question', () => {
  it('a question mark, a long message, a numbered list', () => {
    expect(customerAskedSomething('Am I a resident?')).toBe(true);
    expect(customerAskedSomething('日本に帰国済みですが申告できますか？')).toBe(true);
    expect(customerAskedSomething('1. who signs the return\n2. do you have insurance')).toBe(true);
    expect(customerAskedSomething('I worked in Sydney for 5 months then Melbourne for 4 months on a WHV, then switched to a student visa in May and have been on an ABN since, mostly Uber, plus a cafe job on a TFN.')).toBe(true);
    expect(customerAskedSomething('Hi, I would like to ask about my Australian tax return')).toBe(false);
    expect(customerAskedSomething('TFN')).toBe(false);
  });
  it('a price question or a choice is not a question to answer first', () => {
    expect(isChoiceOrPriceAsk('How much does it cost?')).toBe(true);
    expect(isChoiceOrPriceAsk('TFN?')).toBe(true);
    expect(isChoiceOrPriceAsk('so is it 220 total?')).toBe(true);
    expect(isChoiceOrPriceAsk('Was kostet das?')).toBe(true);
    expect(isChoiceOrPriceAsk('料金はいくらですか？')).toBe(true);
    expect(isChoiceOrPriceAsk('Yes please')).toBe(true);
    expect(isChoiceOrPriceAsk('Am I a resident for tax purposes?')).toBe(false);
    expect(isChoiceOrPriceAsk('Do I need to be in Australia to lodge?')).toBe(false);
  });
  it('the menu or the bank block as the reply to a question is the fault', () => {
    expect(menuAsAnswer('Am I a resident?', 'Hey Stephanie! ' + APPROVED.prices, false)).toBe(true);
    expect(menuAsAnswer('Am I a resident?', APPROVED.price_tfn, false)).toBe(true);
    expect(menuAsAnswer('How much?', APPROVED.prices, false)).toBe(false);
    expect(menuAsAnswer('Am I a resident?', "That's one of the many things we check before we lodge, so leave that with us. Did you work on a TFN only, or also on an ABN?", false)).toBe(false);
    expect(menuAsAnswer('Am I a resident?', APPROVED.price_tfn, true)).toBe(false);
  });
  it('stripMenuAndBank keeps the answer and drops the prices', () => {
    const t = "No, you don't need to be in Australia, we lodge for you from anywhere.\n\nTFN: $220\nTFN + ABN: $385\n\nWhich option works best for you?";
    expect(stripMenuAndBank(t)).toBe("No, you don't need to be in Australia, we lodge for you from anywhere.");
  });
});

describe('runEngine', () => {
  it('rewrites a menu reply to answer the question first, without prices', async () => {
    decideMock
      .mockResolvedValueOnce({ action: 'reply', reply_text: 'Hey Stephanie! ' + APPROVED.prices, new_state: 'PRICE_SENT', confidence: 0.9 })
      .mockResolvedValueOnce({ action: 'reply', reply_text: "Hey Stephanie! No, you don't need to be in Australia, we lodge for you from anywhere, and the deadline is later through a tax agent. Did you work on a TFN only, or also on an ABN?", confidence: 0.9 });
    const out = await runEngine(base());
    expect(out.kind).toBe('queued');
    expect(out.replyText).not.toMatch(/\$\s?220|\$\s?385|BSB/);
    expect(out.replyText).toMatch(/don't need to be in Australia/);
    expect(out.newState).toBeUndefined();
    expect(decideMock).toHaveBeenCalledTimes(2);
    expect(String(decideMock.mock.calls[1][2]?.rewriteHint)).toMatch(/answer what they asked FIRST/);
  });

  it('when the rewrite still carries the prices, the price lines are removed and the answer goes', async () => {
    const draft = "Hey Stephanie! No, you don't need to be in Australia, we lodge for you from anywhere, and the deadline is later through a tax agent.\n\nTFN: $220\nTFN + ABN: $385\n\nWhich option works best for you?";
    decideMock
      .mockResolvedValueOnce({ action: 'reply', reply_text: draft, confidence: 0.9 })
      .mockResolvedValueOnce({ action: 'reply', reply_text: draft, confidence: 0.9 });
    const out = await runEngine(base());
    expect(out.kind).toBe('queued');
    expect(out.replyText).not.toMatch(/\$\s?220|\$\s?385/);
    expect(out.replyText).toMatch(/don't need to be in Australia/);
  });

  it('when nothing but the price list exists, it becomes a task, never the bank block', async () => {
    decideMock
      .mockResolvedValueOnce({ action: 'reply', reply_text: 'Of course! ' + APPROVED.price_tfn, confidence: 0.9 })
      .mockResolvedValueOnce({ action: 'reply', reply_text: APPROVED.price_tfn, confidence: 0.9 });
    const out = await runEngine(base({ history: [{ role: 'assistant', text: APPROVED.opening }, { role: 'customer', text: 'Before I decide: who actually signs the return, and are you insured? And do you handle residency checks?' }] }));
    expect(out.kind).toBe('human_task');
    expect(out.guardViolations).toContain('MENU_AS_ANSWER');
  });

  it('"how much?" still gets the menu, and "TFN please" still gets the bank block', async () => {
    decideMock.mockResolvedValueOnce({ action: 'reply', reply_text: 'Hey Stephanie! ' + APPROVED.prices, new_state: 'PRICE_SENT', confidence: 0.9 });
    const a = await runEngine(base({ history: [{ role: 'customer', text: 'Hi, how much does it cost?' }] }));
    expect(a.kind).toBe('queued');
    expect(a.replyText).toMatch(/\$220/);
    expect(decideMock).toHaveBeenCalledTimes(1);

    decideMock.mockReset();
    decideMock.mockResolvedValueOnce({ action: 'reply', reply_text: APPROVED.price_tfn, new_state: 'PRICE_SENT', confidence: 0.9 });
    const b = await runEngine(base({ ctx: { ...base().ctx, state: 'QUALIFIED' }, history: [{ role: 'assistant', text: APPROVED.opening }, { role: 'customer', text: 'TFN please. Is it safe to pay?' }] }));
    expect(b.kind).toBe('queued');
    expect(b.replyText).toMatch(/062692/);
  });

  it('the playbook says it too', () => {
    const { stable } = buildSystemPrompt({ name: 'X', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en' });
    expect(stable).toMatch(/ANSWER FIRST, PITCH LATER/);
  });
});

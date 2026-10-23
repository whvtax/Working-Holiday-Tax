/**
 * Jo, 22 Oct: in 'will' mode every message reaches Will, he decides, and an
 * approved message he names goes out in Jo's exact wording. 'legacy' is the
 * old behaviour. Built from the real cases of 21-22 Oct.
 */
jest.mock('@/lib/will/claude', () => {
  const actual = jest.requireActual('@/lib/will/claude');
  return { ...actual, decide: jest.fn() };
});
import { decide, DECIDE_TOOL } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { buildSystemPrompt } from '@/lib/will/playbook';
import { APPROVED } from '@/lib/will/approved-messages';
import { RESIDENCY_CHECK_MSG } from '@/lib/will/i18n';
import type { CustomerState } from '@/lib/will/state-machine';
const decideMock = decide as jest.MockedFunction<typeof decide>;

function input(history: EngineInput['history'], over: { state?: CustomerState; lang?: string | null; paid?: boolean; mode?: 'will' | 'legacy' } = {}): EngineInput {
  return {
    ctx: { name: 'Sam', state: over.state ?? 'PRICE_SENT', income: 'UNKNOWN', paid: over.paid ?? false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: over.lang === undefined ? 'en' : over.lang, knowledge: [], decisionMode: over.mode ?? 'will' },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history, mode: 'FULL_AUTO', bank: { bsb: '062692', account: '81049952' }, decisionMode: over.mode ?? 'will',
  };
}
const reply = (reply_text: string, extra: Record<string, unknown> = {}) => decideMock.mockResolvedValue({ action: 'reply', confidence: 1, reply_text, ...extra } as never);
beforeEach(() => decideMock.mockReset());

describe('every message reaches Will', () => {
  it('a plain thank-you is NOT answered by the code: Will is asked', async () => {
    reply("You're very welcome! 😊", { approved_key: 'thanks' });
    const out = await runEngine(input([{ role: 'assistant', text: 'Here is the link.' }, { role: 'customer', text: 'Thank you!' }]));
    expect(decideMock).toHaveBeenCalled();
    expect(out.replyText).toBe("You're very welcome! 😊");
  });
  it('Eimi: a goodbye with a thank-you is Will\'s to answer', async () => {
    reply('承知しました、ご連絡ありがとうございます。うまくいきますように😊', { new_state: 'NOT_INTERESTED' });
    const out = await runEngine(input([{ role: 'assistant', text: 'お振込みは完了しましたか？' }, { role: 'customer', text: '他ですることにしたので大丈夫ですありがとうございました。' }], { lang: 'ja' }));
    expect(decideMock).toHaveBeenCalled();
    expect(out.replyText).not.toMatch(/どういたしまして|welcome/);
  });
  it('"I\'ll do it after work" and "when is there no refund" are Will\'s too', async () => {
    reply('x', { approved_key: 'later_plan' });
    await runEngine(input([{ role: 'assistant', text: 'Payment received.' }, { role: 'customer', text: 'Okay thank you! Will complete this after work' }], { state: 'FORM_PENDING', paid: true }));
    reply('x', { approved_key: 'no_refund_cases' });
    await runEngine(input([{ role: 'assistant', text: APPROVED.price_tfn }, { role: 'customer', text: 'In what cases would there be no refund?' }]));
    expect(decideMock).toHaveBeenCalledTimes(2);
  });
});

describe('the key he names goes out in Jo\'s exact wording', () => {
  it('thanks, in Japanese', async () => {
    reply('Thanks!', { approved_key: 'thanks' });
    const out = await runEngine(input([{ role: 'assistant', text: 'x' }, { role: 'customer', text: 'ありがとうございました！' }], { lang: 'ja' }));
    expect(out.replyText).toBe('どういたしまして！😊');
  });
  it('later_plan keeps "No worries" and the link, even late in the chat', async () => {
    reply('sure', { approved_key: 'later_plan' });
    const out = await runEngine(input([
      { role: 'assistant', text: 'a' }, { role: 'customer', text: 'b' }, { role: 'assistant', text: 'c' },
      { role: 'assistant', text: 'Payment received.' }, { role: 'customer', text: 'Will complete this after work' },
    ], { state: 'FORM_PENDING', paid: true }));
    expect(out.replyText).toBe("No worries 😊 Here's the link whenever you're ready: https://workingholidaytax.com.au/tax-form");
  });
  it('no_refund_cases', async () => {
    reply('Yes, that is one of the many things we check', { approved_key: 'no_refund_cases' });
    const out = await runEngine(input([{ role: 'assistant', text: APPROVED.price_tfn }, { role: 'customer', text: 'In what cases would there be no refund?' }]));
    expect(out.replyText).toMatch(/^Usually when the tax taken from your pay/);
  });
  it('price_tfn_abn in Japanese: Jo\'s price message, no guarantee, stage moves to Price Sent', async () => {
    reply('ABN option', { approved_key: 'price_tfn_abn' });
    const out = await runEngine(input([{ role: 'assistant', text: 'TFNのみですか、ABNもありますか？' }, { role: 'customer', text: 'Uber Eatsで働いていました' }], { state: 'QUALIFIED', lang: 'ja' }));
    expect(out.replyText).toContain('$385');
    expect(out.replyText).toContain('062692');
    expect(out.replyText).not.toContain('差額');
    expect(out.newState).toBe('PRICE_SENT');
  });
  it('residency_quiz_start sends the intro with question 1', async () => {
    reply('x', { approved_key: 'residency_quiz_start' });
    const out = await runEngine(input([{ role: 'assistant', text: RESIDENCY_CHECK_MSG.en.replace('{{1}}', 'Alexandra') }, { role: 'customer', text: 'would that count as 6 months?' }], { state: 'FORM_COMPLETE', paid: true }));
    expect(out.replyText).toContain('1/5: During that tax year');
  });
  it('a key with no exact version in their language leaves Will\'s own words', async () => {
    reply('Merci beaucoup, avec plaisir !', { approved_key: 'later_plan' });
    const out = await runEngine(input([{ role: 'assistant', text: 'x' }, { role: 'customer', text: 'je le fais ce soir' }], { state: 'FORM_PENDING', paid: true, lang: 'fr' }));
    expect(out.replyText).toContain('workingholidaytax.com.au/tax-form'); // fr has a later_plan line
  });
});

describe('the hard rules still apply to what Will writes', () => {
  it('a refund figure from Will is still blocked', async () => {
    reply('Your refund will be about $1,800!');
    const out = await runEngine(input([{ role: 'assistant', text: 'x' }, { role: 'customer', text: 'how much will I get back' }]));
    expect(out.replyText ?? '').not.toContain('1,800');
  });
});

describe('legacy mode is untouched', () => {
  it('a plain thank-you is still answered by the code, no model call', async () => {
    const out = await runEngine(input([{ role: 'assistant', text: 'x' }, { role: 'customer', text: 'Thank you!' }], { mode: 'legacy' }));
    expect(decideMock).not.toHaveBeenCalled();
    expect(out.replyText).toBe("You're very welcome! 😊");
  });
  it('an approved_key is ignored in legacy mode', async () => {
    reply('Happy to help, the team is on it.', { approved_key: 'later_plan' });
    const out = await runEngine(input([{ role: 'assistant', text: 'x' }, { role: 'customer', text: 'Can you check my super too' }], { state: 'FORM_PENDING', paid: true, mode: 'legacy' }));
    expect(out.replyText).not.toContain('tax-form');
  });
});

describe('what Will is told', () => {
  it('the decide tool offers approved_key', () => {
    const props = (DECIDE_TOOL.input_schema as unknown as { properties: Record<string, { enum?: readonly string[] }> }).properties;
    expect(props.approved_key.enum).toEqual(expect.arrayContaining(['thanks', 'price_tfn', 'residency_quiz_start']));
  });
  it('the instructions appear only in will mode', () => {
    const base = { name: null, state: 'QUALIFIED' as const, income: 'UNKNOWN' as const, paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null };
    const w = buildSystemPrompt({ ...base, decisionMode: 'will' });
    const l = buildSystemPrompt({ ...base, decisionMode: 'legacy' });
    expect(w.dynamic).toContain('YOU DECIDE, THE SYSTEM SENDS THE EXACT WORDING');
    expect(l.dynamic).not.toContain('YOU DECIDE, THE SYSTEM SENDS THE EXACT WORDING');
  });
});

describe('Jo\'s pricing rules hold whatever Will picks', () => {
  it('TFN price chosen for someone with ABN income becomes the TFN + ABN price', async () => {
    reply('x', { approved_key: 'price_tfn' });
    const out = await runEngine(input([{ role: 'assistant', text: 'TFN only, or ABN too?' }, { role: 'customer', text: 'TFN, and I also drove for Uber' }], { state: 'QUALIFIED' }));
    expect(out.replyText).toContain('$385');
  });
  it('TFN price chosen for Sydney (UGC) goes to the team instead', async () => {
    reply('x', { approved_key: 'price_tfn' });
    const out = await runEngine(input([{ role: 'assistant', text: 'TFN only, or ABN too?' }, { role: 'customer', text: 'Only on TFN however I did do some freelance UGC work on the side as well' }], { state: 'QUALIFIED' }));
    expect(out.kind).toBe('human_task');
    expect(out.replyText).toBeUndefined();
  });
  it('"Only TFN, no ABN" still gets the TFN price', async () => {
    reply('x', { approved_key: 'price_tfn' });
    const out = await runEngine(input([{ role: 'assistant', text: 'TFN only, or ABN too?' }, { role: 'customer', text: 'Only TFN, no ABN' }], { state: 'QUALIFIED' }));
    expect(out.replyText).toContain('$220');
  });
  it('the thank-you line is never the answer to a first message', async () => {
    reply('Hey Nicole! Happy to help.', { approved_key: 'thanks' });
    const out = await runEngine(input([{ role: 'customer', text: 'Hi I was looking to complete a free eligibility check for my tax return. Thank you' }], { state: 'NEW_LEAD' }));
    expect(out.replyText ?? '').not.toMatch(/very welcome/i);
  });
});

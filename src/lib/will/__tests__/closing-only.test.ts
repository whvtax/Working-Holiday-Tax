/**
 * 13 Oct, Jo: "again it went to the team, do a proper job on this."
 * Every real message that got "I've passed this to the team" in the last
 * three days, and the real ones that DO need an answer. One rule, checked by
 * every path that can send the holding line.
 */
import { isClosingOnly } from '@/lib/will/text-normalize';
import { paidNeverSilent } from '@/lib/will/service';
import { readFileSync } from 'fs';
import { join } from 'path';

const REAL_CLOSINGS = [
  'Thankyou! X', 'Amazing thankyou !', 'Thank you 😁', 'Thank you!!', 'Perfect thanks', 'Thank u',
  'Perfect thank you guys so much! :)', '100% thank you', 'Helllo, perfect thank you', 'Sounds good thank you',
  'Amazing thankyou !', 'ok', '👍', 'Perfect',
];
const REAL_QUESTIONS = [
  "Sure, I'll wait. That's where I'll get the details on everything that's going to be uploaded, right?",
  'I found my TFN and I already complete the link you send me!!',
  "Thanks but I still haven't received my refund",
  'Im locked out of myGOV account with my email that I received the form on, is there anyway of using another email?',
  'Thanks! When will the refund land?',
];

describe('closing only: never a holding line', () => {
  it.each(REAL_CLOSINGS)('%s', (t) => expect(isClosingOnly(t)).toBe(true));
});
describe('a real message still gets an answer', () => {
  it.each(REAL_QUESTIONS)('%s', (t) => expect(isClosingOnly(t)).toBe(false));
});

describe('every holding-line path checks it (source-pinned)', () => {
  const service = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
  const scheduler = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
  const engine = readFileSync(join(__dirname, '..', 'engine.ts'), 'utf8');
  it('the engine turns a handoff of a thank-you into a short reply', () => {
    expect(engine).toMatch(/decision\.action === 'human_task' && burstSinceOurs\.length > 0 && isClosingOnly\(customerBurst\)/);
  });
  it('the service never schedules the holding line for it', () => {
    expect(service).toMatch(/outcome\.kind === 'human_task' && mode === 'FULL_AUTO' && !isClosingOnly\(text\)/);
  });
  it('the scheduler refuses it at send time', () => {
    expect(scheduler).toMatch(/isClosingOnly\(burstNow\)/);
  });
  it('a paid customer\'s thank-you is not turned into a task', () => {
    const base = { mode: 'FULL_AUTO' as const, paid: true, state: 'LODGED' as const, optedOut: false, isLegacy: false, aiPaused: false, alreadyStored: false, outcomeKind: 'silent' as const };
    for (const t of REAL_CLOSINGS) expect(paidNeverSilent({ ...base, text: t })).toBe(false);
  });
});

import { stripCheerOpener } from '@/lib/will/engine';
describe('the stripped opener takes the name with it (Corey, 13 Oct)', () => {
  it('"No worries, Corey! Just send it..." becomes "Just send it..."', () => {
    expect(stripCheerOpener("No worries, Corey! Just send it through whenever you've got your passport handy.", 'Corey'))
      .toBe("Just send it through whenever you've got your passport handy.");
    expect(stripCheerOpener('No worries Corey. Just send it through.', 'Corey')).toBe('Just send it through.');
  });
  it('a name further in is left alone', () => {
    expect(stripCheerOpener('Perfect! Corey, the form link is above.', 'Corey')).toBe('Corey, the form link is above.');
  });
});

import { judgeHoldingLine } from '@/lib/will/claude';
describe('Will reads the chat before "passed to the team" (Jo, 13 Oct)', () => {
  const realFetch = global.fetch;
  const realKey = process.env.ANTHROPIC_API_KEY;
  afterEach(() => { global.fetch = realFetch; process.env.ANTHROPIC_API_KEY = realKey; });
  const answer = (input: Record<string, unknown>) => {
    process.env.ANTHROPIC_API_KEY = 'test';
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ content: [{ type: 'tool_use', name: 'holding_check', input }] }) }) as unknown as typeof fetch;
  };
  it('a thank-you gets a short reply instead', async () => {
    answer({ verdict: 'REPLY', reply: "You're very welcome! 😊", reason: 'closing thanks' });
    expect(await judgeHoldingLine({ transcript: 'Customer: No worrries thanks', lang: 'en' })).toMatchObject({ verdict: 'REPLY', reply: "You're very welcome! 😊" });
  });
  it('a reply with numbers, links or a question is not trusted: hold', async () => {
    answer({ verdict: 'REPLY', reply: 'Your refund of $500 is coming?', reason: 'x' });
    expect((await judgeHoldingLine({ transcript: 'x', lang: 'en' })).verdict).toBe('HOLD');
  });
  it('no key or a failure keeps the old behaviour (hold)', async () => {
    delete process.env.ANTHROPIC_API_KEY;
    expect((await judgeHoldingLine({ transcript: 'x', lang: 'en' })).verdict).toBe('HOLD');
  });
  it('the scheduler asks before every holding line (source-pinned)', () => {
    const scheduler = readFileSync(join(__dirname, '..', 'scheduler.ts'), 'utf8');
    const judge = scheduler.indexOf('await judgeHoldingLine(');
    const send = scheduler.indexOf('const { body } = await ackBody(c.lang, tickTemplates);');
    expect(judge).toBeGreaterThan(0);
    expect(judge).toBeLessThan(send);
  });
});

describe('"Amazing thank you" after the estimate gets the line even if the model would wait (13 Oct)', () => {
  it('source: the fixed line comes before the model call', () => {
    const engine = readFileSync(join(__dirname, '..', 'engine.ts'), 'utf8');
    expect(isClosingOnly('Amazing thank you')).toBe(true);
    expect(engine.indexOf("thank-you: You're very welcome! 😊")).toBeLessThan(engine.indexOf('const decision = await decide(ctx, history);'));
  });
});

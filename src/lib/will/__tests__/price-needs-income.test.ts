/**
 * A price is never quoted on an assumption (Jo, 1 Sep).
 *
 * FOUND IN PRODUCTION: a German customer (Elsa) wrote a long first message —
 * where she is from, that she worked only in July, that she OWED tax the year
 * before. She never said whether it was TFN only or ABN too. Will assumed TFN
 * and quoted $220 straight away. The income type was a guess, so the price was a
 * guess. Jo: "how did he conclude TFN?"
 *
 * THE RULE NOW. $220 (TFN) / $385 (TFN+ABN): which one is right depends entirely
 * on the income type, so a price may only leave once the CUSTOMER has actually
 * named it ("only TFN", "I had an ABN"). If the income type is still unknown and
 * the customer never said TFN or ABN, a quoted price does not auto-send: it
 * becomes a task carrying the draft, so a person confirms first. A customer who
 * DID say their type is unaffected and the price sends normally. Country, visa
 * and how long they worked are NOT an income type.
 */
import { runEngine, EngineInput } from '@/lib/will/engine';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const ELSA =
  "I am from Germany and spent a year in Australia on a 417 visa two years ago. " +
  "I only worked in July. I owed tax last year and hope to maybe get something back. " +
  "Do you handle cases like this? How much would it cost?";

function input(over: Partial<EngineInput> = {}): EngineInput {
  return {
    ctx: {
      name: null, state: 'NEW_LEAD', income: 'UNKNOWN', paid: false,
      formComplete: false, missingDocs: [], estimatedRefundCents: null,
      lang: 'en', knowledge: [], dropOwingCaveat: true,
    },
    guard: {
      aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
      lastCustomerMsgAt: new Date(),
    },
    history: [{ role: 'customer', text: ELSA }],
    mode: 'FULL_AUTO',
    bank: { bsb: '062692', account: '81049952' },
    ...over,
  };
}

beforeEach(() => decideMock.mockReset());

describe('a price quoted without a stated income type is held, not sent', () => {
  it('holds a $220 quote when the customer never said TFN or ABN', async () => {
    decideMock.mockResolvedValue({
      action: 'reply',
      reply_text:
        'Hi! Yes, we can handle this for you.\n\nThe total fee is $220. Once paid, send us a screenshot and we will get started.',
      new_state: 'PRICE_SENT',
      confidence: 1,
    });
    const out = await runEngine(input());
    expect(out.kind).toBe('human_task');                 // not 'queued'
    expect(out.task?.reason).toMatch(/income/i);
    expect(out.task?.suggestedReply).toContain('$220');  // draft kept for one-click send
  });

  it('holds even when the price is carried only by the proposed PRICE_SENT state', async () => {
    decideMock.mockResolvedValue({
      action: 'reply',
      reply_text: 'Happy to help with this. Let me sort the details for you.',
      new_state: 'PRICE_SENT',
      confidence: 1,
    });
    expect((await runEngine(input())).kind).toBe('human_task');
  });
});

describe('a price is sent normally once the income type is actually known', () => {
  it('sends $220 when the customer said they only worked on a TFN', async () => {
    decideMock.mockResolvedValue({
      action: 'reply',
      reply_text: 'Perfect! The total fee is $220. Once paid, send a screenshot and we will start.',
      new_state: 'PRICE_SENT',
      confidence: 1,
    });
    const out = await runEngine(input({
      history: [{ role: 'customer', text: 'Hi, I only worked on a TFN last year. How much?' }],
    }));
    expect(out.kind).toBe('queued');
    expect(out.replyText).toContain('$220');
  });

  it('sends $385 when the customer mentioned ABN income', async () => {
    decideMock.mockResolvedValue({
      action: 'reply',
      reply_text: 'Great! The total fee is $385. Once paid, send a screenshot and we will start.',
      new_state: 'PRICE_SENT',
      confidence: 1,
    });
    const out = await runEngine(input({
      history: [{ role: 'customer', text: 'I worked a normal job and also did some ABN work. Price?' }],
    }));
    expect(out.kind).toBe('queued');
    expect(out.replyText).toContain('$385');
  });

  it('does not hold once income is already locked on the profile', async () => {
    decideMock.mockResolvedValue({
      action: 'reply',
      reply_text: 'The total fee is $220. Once paid, send a screenshot.',
      new_state: 'PRICE_SENT',
      confidence: 1,
    });
    const out = await runEngine(input({ ctx: { ...input().ctx, income: 'TFN' } }));
    expect(out.kind).toBe('queued');
  });
});

describe('the backstop does not touch non-price replies', () => {
  it('a plain answer with no price sends even when income is unknown', async () => {
    decideMock.mockResolvedValue({
      action: 'reply',
      reply_text: 'Yes, we handle exactly these cases. Did you work only on a TFN, or was there ABN income too?',
      confidence: 1,
    });
    const out = await runEngine(input());
    expect(out.kind).toBe('queued');
    expect(out.replyText).toMatch(/ABN/);
  });
});

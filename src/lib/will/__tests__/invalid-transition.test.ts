/**
 * A rejected state jump must not, by itself, bury a good reply in a task.
 *
 * FOUND IN PRODUCTION, 31 Aug (+61 472 724 880): the customer was at PRICE_SENT
 * and wrote "I've just sent through my form". The model over-shot the pipeline
 * and proposed PRICE_SENT -> FORM_COMPLETE. The state machine only walks one
 * step at a time, so the jump was invalid, and the engine turned the whole thing
 * into a CONFLICT task — even though the reply ("Perfect, got it, the team will
 * get back to you") was completely safe to send. Jo: "the answer is excellent,
 * why did it become a task?"
 *
 * THE RULE NOW. An invalid jump is neutralised: the reply goes out through the
 * guard and the state simply does not advance. The one exception is a jump INTO
 * a state that confirms something only WE can verify — money received (PAID), a
 * signed return (SIGNED), a lodgement (LODGED/COMPLETED) — because the reply
 * would then falsely confirm it on the customer's word alone. Those stay a
 * human CONFLICT task.
 */
import { runEngine, EngineInput } from '@/lib/will/engine';
import type { CustomerState } from '@/lib/will/state-machine';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;

function input(over: Partial<EngineInput> = {}): EngineInput {
  return {
    ctx: {
      name: null, state: 'PRICE_SENT', income: 'TFN', paid: false,
      formComplete: false, missingDocs: [], estimatedRefundCents: null,
      lang: 'en', knowledge: [],
    },
    guard: {
      aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
      lastCustomerMsgAt: new Date(),
    },
    history: [
      { role: 'assistant', text: 'Perfect! The total fee is $220.' },
      { role: 'customer', text: "Hi! I've just sent through my form 😊" },
    ],
    mode: 'SUPERVISED',
    bank: { bsb: '062692', account: '81049952' },
    ...over,
  };
}

beforeEach(() => decideMock.mockReset());

it('sends a safe reply when the model over-shoots to FORM_COMPLETE, without advancing state', async () => {
  decideMock.mockResolvedValue({
    action: 'reply',
    reply_text: 'Perfect, got it! Our team will review everything and get back to you within 24 hours.',
    new_state: 'FORM_COMPLETE',
    confidence: 1,
  });

  const out = await runEngine(input());

  expect(out.kind).toBe('pending_approval'); // SUPERVISED: drafted, not a task
  expect(out.task).toBeUndefined();
  expect(out.replyText).toContain('get back to you');
  // The invalid jump is recorded but neutralised: state does not move.
  expect(out.invalidTransition).toBe(true);
  expect(out.newState).toBeUndefined();
  expect(out.stateChanged).toBe(false);
});

it('in Autopilot the same safe reply is queued, not turned into a task', async () => {
  decideMock.mockResolvedValue({
    action: 'reply',
    reply_text: 'Perfect, got it! The team will go through everything and come back to you soon.',
    new_state: 'FORM_COMPLETE',
    confidence: 1,
  });

  const out = await runEngine(input({ mode: 'FULL_AUTO' }));
  expect(out.kind).toBe('queued');
  expect(out.task).toBeUndefined();
});

// SIGNED / LODGED / COMPLETED are all invalid jumps out of PRICE_SENT, and each
// confirms something we alone can verify, so each stays a CONFLICT task.
it.each<CustomerState>(['SIGNED', 'LODGED', 'COMPLETED'])(
  'still holds a CONFLICT task when the model jumps straight to %s (unverifiable confirmation)',
  async (target) => {
    decideMock.mockResolvedValue({
      action: 'reply',
      reply_text: 'All done, your return is lodged!',
      new_state: target,
      confidence: 1,
    });

    const out = await runEngine(input());
    expect(out.kind).toBe('human_task');
    expect(out.invalidTransition).toBe(true);
    expect(out.task?.severity).toBe('CONFLICT');
    expect(out.task?.reason).toContain(`PRICE_SENT -> ${target}`);
  },
);

it('holds a CONFLICT task when the model jumps a fresh lead straight to PAID on their word alone', async () => {
  // NEW_LEAD -> PAID is invalid (payment is never confirmed from a chat line),
  // and PAID is a money-confirmation state, so it must not ride out as a reply.
  decideMock.mockResolvedValue({
    action: 'reply',
    reply_text: 'Payment received, thank you!',
    new_state: 'PAID',
    confidence: 1,
  });

  const out = await runEngine(input({ ctx: { ...input().ctx, state: 'NEW_LEAD' } }));
  expect(out.kind).toBe('human_task');
  expect(out.task?.severity).toBe('CONFLICT');
  expect(out.task?.reason).toContain('NEW_LEAD -> PAID');
});

it('a valid one-step jump still advances the state normally', async () => {
  decideMock.mockResolvedValue({
    action: 'reply',
    reply_text: 'No problem at all, whenever you are ready 😊',
    new_state: 'PAYMENT_PENDING',
    confidence: 1,
  });

  const out = await runEngine(input());
  expect(out.kind).toBe('pending_approval');
  expect(out.newState).toBe('PAYMENT_PENDING');
  expect(out.stateChanged).toBe(true);
  expect(out.invalidTransition).toBe(false);
});

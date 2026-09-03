/**
 * Every rule applies in every language, and a green reply auto-sends whatever
 * the language (Jo, 1 Sep).
 *
 * Two halves:
 *  1. The Policy Guard's money and over-promise rules fire in the languages Will
 *     speaks, not only English. The amount rules were already number/symbol based
 *     (so a refund figure is caught in any language); the refund-the-fee /
 *     out-of-pocket promise and discount rules are now multilingual too.
 *  2. The engine no longer holds a guard-passing reply just because it is not
 *     English. On Autopilot a clean foreign reply is queued and sends on its own.
 */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput } from '@/lib/will/engine';
const decideMock = decide as jest.MockedFunction<typeof decide>;

function gctx(over: Partial<GuardContext> = {}): GuardContext {
  return {
    state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false,
    optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(),
    isApprovedTemplate: false, estimateFromTeam: null, ...over,
  };
}

describe('the money red line is caught in every language', () => {
  it('flags a refund figure whatever the surrounding language', () => {
    expect(policyGuard('Deine Rückerstattung beträgt $1,800', gctx()).violations)
      .toEqual(expect.arrayContaining(['FORBIDDEN_AMOUNT:1800.00']));
    expect(policyGuard('Tu reembolso será de 1800 dólares', gctx()).violations.join(','))
      .toContain('FORBIDDEN_AMOUNT');
  });

  it('still allows the two fixed prices in a foreign sentence', () => {
    expect(policyGuard('Die Gebühr beträgt $220.', gctx()).violations).toEqual([]);
  });
});

describe('the over-promise rules are caught in every language', () => {
  it.each([
    'Keine Sorge, du bist nie aus eigener Tasche dran',   // German: out of pocket
    'No te preocupes, nunca pagas de tu bolsillo',        // Spanish: out of pocket
    'Wir geben dir das Geld zurück, volle Erstattung',    // German: full refund / money back
    'Te devolvemos el dinero, reembolso completo',        // Spanish: full refund
    'On te fait un remboursement complet',                // French: full refund
  ])('flags a money-back / out-of-pocket promise: %s', (sentence) => {
    expect(policyGuard(sentence, gctx()).violations).toContain('REFUND_OR_CANCEL_PROMISE');
  });

  it.each([
    'Ich gebe dir 10% Rabatt',      // German: discount
    'Te hago un descuento especial', // Spanish: discount
    'Je te fais une remise',         // French: discount
  ])('flags a discount / negotiation: %s', (sentence) => {
    expect(policyGuard(sentence, gctx()).violations).toContain('PRICE_NEGOTIATION');
  });

  it('does not flag a benign foreign reply', () => {
    const r = policyGuard('Kein Problem, unser Team kümmert sich um alles für dich.', gctx());
    expect(r.violations).toEqual([]);
  });
});

describe('a clean foreign reply auto-sends on Autopilot', () => {
  function input(over: Partial<EngineInput> = {}): EngineInput {
    return {
      ctx: {
        name: null, state: 'PRICE_SENT', income: 'TFN', paid: false,
        formComplete: false, missingDocs: [], estimatedRefundCents: null,
        lang: 'de', knowledge: [],
      },
      guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
      history: [
        { role: 'assistant', text: 'Perfekt!' },
        { role: 'customer', text: 'Danke, wann bekomme ich eine Antwort?' },
      ],
      mode: 'FULL_AUTO',
      bank: { bsb: '062692', account: '81049952' },
      ...over,
    };
  }

  beforeEach(() => decideMock.mockReset());

  it('queues a guard-passing German reply instead of holding it for approval', async () => {
    decideMock.mockResolvedValue({
      action: 'reply',
      reply_text: 'Kein Problem, unser Team meldet sich innerhalb von 24 Stunden bei dir.',
      confidence: 1,
    });
    const out = await runEngine(input());
    expect(out.kind).toBe('queued');           // was 'pending_approval' before the fix
    expect(out.replyText).toContain('24 Stunden');
  });

  it('a German reply that breaks a rule is still blocked, not sent', async () => {
    decideMock.mockResolvedValue({
      action: 'reply',
      reply_text: 'Kein Problem, wir geben dir das Geld zurück, volle Erstattung.',
      confidence: 1,
    });
    const out = await runEngine(input());
    expect(out.kind).toBe('human_task');
    expect(out.guardViolations).toContain('REFUND_OR_CANCEL_PROMISE');
  });
});

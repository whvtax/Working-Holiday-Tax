/**
 * Full audit, 11 Oct 2026, decision 3: the question comes before the price,
 * the bank details come right after the choice.
 */
import { detectChoice, priceMessageFor } from '@/lib/will/instant-choice';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';
import { policyGuard } from '@/lib/will/policy-guard';
import { readFileSync } from 'fs';
import { join } from 'path';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;
beforeEach(() => decideMock.mockReset());

describe('detectChoice: a short clear answer to the opening question', () => {
  it('TFN only', () => {
    expect(detectChoice('TFN', null)).toBe('TFN');
    expect(detectChoice('Only TFN, no ABN', null)).toBe('TFN');
    expect(detectChoice('just employers, payslips', null)).toBe('TFN');
    expect(detectChoice('option 1 please', null)).toBe('TFN');
  });
  it('also ABN', () => {
    expect(detectChoice('TFN and ABN', null)).toBe('TFN_ABN');
    expect(detectChoice('I also drove for Uber', null)).toBe('TFN_ABN');
    expect(detectChoice('both', null)).toBe('TFN_ABN');
    expect(detectChoice('ABN', null)).toBe('TFN_ABN');
  });
  it('a bare yes means the single price Will just quoted', () => {
    expect(detectChoice('Yes please!', APPROVED.price_tfn)).toBe('TFN');
    expect(detectChoice('ok', 'That would be the TFN + ABN option, $385.')).toBe('TFN_ABN');
    expect(detectChoice('yes', APPROVED.prices)).toBeNull();
    expect(detectChoice('yes', APPROVED.opening)).toBeNull();
  });
  it('a question, a long message or an already-lodged return is not a choice', () => {
    expect(detectChoice('TFN, but is it safe to pay you?', null)).toBeNull();
    expect(detectChoice('I already lodged it myself, can you review it', null)).toBeNull();
    expect(detectChoice('I worked on a TFN at a cafe in Sydney for five months and then moved to Melbourne where I did some farm work and a bit of hospitality on the side', null)).toBeNull();
    expect(detectChoice('Hi, I would like to ask about my tax return', null)).toBeNull();
  });
  it('maps to the approved price messages, which carry the bank details and the guarantee', () => {
    for (const t of ['TFN', 'TFN_ABN'] as const) {
      const m = priceMessageFor(t);
      expect(m).toMatch(/062692/);
      // Jo, 21 Oct: the guarantee is TFN-only.
      if (t === 'TFN') expect(m).toMatch(/refund the difference/); else expect(m).not.toMatch(/refund the difference/);
      expect(m).not.toMatch(/^Great!/);
      expect(policyGuard(m, { state: 'QUALIFIED', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null }).allowed).toBe(true);
    }
    expect(priceMessageFor('TFN')).toMatch(/\$220/);
    expect(priceMessageFor('TFN')).not.toMatch(/Amount:/);
    expect(priceMessageFor('TFN_ABN')).toMatch(/\$385/);
  });
});

describe('runEngine: no bank details before an exchange', () => {
  const base = (customerText: string): EngineInput => ({
    ctx: { name: 'Elsa', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'customer', text: customerText }],
    mode: 'FULL_AUTO',
    bank: { bsb: '062692', account: '81049952' },
  });
  it('a first draft with the bank block for a lead who said nothing about a track becomes the opening question', async () => {
    decideMock.mockResolvedValueOnce({ action: 'reply', reply_text: APPROVED.price_tfn, new_state: 'PRICE_SENT', confidence: 0.9 });
    const out = await runEngine(base('Hi, here is my TFN number 123 456 789, I would like to do my tax return'));
    expect(out.kind).toBe('queued');
    expect(out.replyText).not.toMatch(/062692|\$\s?220/);
    expect(out.replyText).toMatch(/^Hey Elsa! 😊/);
    expect(out.newState).toBe('QUALIFIED');
  });
  it('a first message that already picks a track gets the price message', async () => {
    decideMock.mockResolvedValueOnce({ action: 'reply', reply_text: APPROVED.price_tfn, new_state: 'PRICE_SENT', confidence: 0.9 });
    const out = await runEngine(base('Hi! I only worked on a TFN, no ABN. Can I pay now'));
    expect(out.kind).toBe('queued');
    expect(out.replyText).toMatch(/062692/);
  });
});

describe('the instant path in the service (source-pinned)', () => {
  const src = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
  it('sends the approved price message from the code on a clear choice, before the Autopilot timer is armed', () => {
    const instant = src.indexOf("detectChoice(text, lastWill)");
    const arm = src.indexOf('const armed = await armAutoReply(store, customer);');
    expect(instant).toBeGreaterThan(0);
    expect(instant).toBeLessThan(arm);
    expect(src).toMatch(/instant_price_sent/);
    expect(src).toMatch(/const track = bankSent \? null : detectChoice/);
  });
});

describe('first contact that already names the track (Jo, 11 Oct)', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { firstContactPriceMessage } = require('@/lib/will/instant-choice') as typeof import('@/lib/will/instant-choice');
  it('TFN: greeting, "right fit", then the rest of the price message', () => {
    const m = firstContactPriceMessage('TFN', 'Alex');
    expect(m).toMatch(/^Hey Alex! 😊 Happy to help\.\n\nLooks like the TFN option is the right fit for you: \$220\. We review your tax residency/);
    expect(m).toContain('BSB: 062692');
    expect(m).toContain("we'll refund the difference");
    expect(m).not.toMatch(/Got it, so that's/);
    expect(policyGuard(m, { state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null }).allowed).toBe(true);
  });
  it('ABN: the same shape with the TFN + ABN option', () => {
    const m = firstContactPriceMessage('TFN_ABN', null);
    expect(m).toMatch(/^Hey! 😊 Happy to help\.\n\nLooks like the TFN \+ ABN option is the right fit for you: \$385\./);
    expect(m).toContain('business schedule');
  });
  it('the service uses it only when nothing has been sent yet', () => {
    const src = readFileSync(join(__dirname, '..', 'service.ts'), 'utf8');
    expect(src).toMatch(/const firstContact = !prior\.some\(\(m\) => m\.direction === 'OUT' && m\.status === 'SENT'\)/);
    expect(src).toMatch(/firstContact \? firstContactPriceMessage\(track/);
  });
});

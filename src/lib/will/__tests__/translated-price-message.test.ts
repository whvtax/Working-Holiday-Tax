/**
 * 28 Sep, Maria (+49 176 41747743): "Die zweite, TFN und ABN" got "Ja, das ist
 * auf jeden Fall eines der vielen Dinge, die wir prüfen..." instead of the
 * bank details. Cause: the 25 Sep "one line around the price" ceiling was
 * applied to a GERMAN price message, which is all "own prose" to the corpus
 * check, so it was REPLY_TOO_LONG, the rewrite was too, and the one-line
 * stand-in went out. Two fixes: a translated price message gets the
 * translated-script allowance, and a held draft that carries the bank
 * details falls back to the approved price message, never to the one line.
 */
import { policyGuard } from '@/lib/will/policy-guard';
import { runEngine, EngineInput } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const DE_PRICE = `Super! Hier sind die Zahlungsdetails:

BSB: 062692
Konto: 81049952
Betrag: $385

Wenn deine Steuerrückerstattung geringer als unsere Gebühr ist, erstatten wir dir die Differenz. Gibt es keine Rückerstattung, gilt unsere volle Gebühr.

Schick uns einfach einen Screenshot, sobald du bezahlt hast, und wir legen los!`;

const ctx = { state: 'QUALIFIED' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null };

function input(over: Partial<EngineInput> = {}): EngineInput {
  return {
    ctx: { name: 'Maria', state: 'QUALIFIED', income: 'TFN_ABN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'de', knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [
      { role: 'assistant', text: APPROVED.opening },
      { role: 'customer', text: 'Die zweite, TFN und ABN' },
    ],
    mode: 'FULL_AUTO',
    bank: { bsb: '062692', account: '81049952' },
    ...over,
  };
}

beforeEach(() => decideMock.mockReset());

it('the German price message passes the guard', () => {
  expect(policyGuard(DE_PRICE, ctx).allowed).toBe(true);
});

it('English prose glued around the price is still too long', () => {
  const glued = "That's definitely something we can check for you, and there are many other deductions and factors the team looks at as part of the service, so we go through every one with you before anything is lodged.\n\n" + APPROVED.price_tfn_abn;
  expect(policyGuard(glued, ctx).violations).toContain('REPLY_TOO_LONG');
});

it('Maria gets the German price message and moves to Price Sent', async () => {
  decideMock.mockResolvedValue({ action: 'reply', reply_text: DE_PRICE, new_state: 'PRICE_SENT', confidence: 0.95 });
  const out = await runEngine(input());
  expect(out.kind).toBe('queued');
  expect(out.replyText).toContain('BSB: 062692');
  expect(out.replyText).not.toMatch(/eines der vielen Dinge/);
  expect(out.newState).toBe('PRICE_SENT');
});

it('a held price message falls back to the approved price message, never to the one line', async () => {
  const glued = "That's definitely something we can check for you, and there are many other deductions and factors the team looks at as part of the service, so we go through every one with you before anything is lodged.\n\n" + APPROVED.price_tfn_abn;
  decideMock.mockResolvedValue({ action: 'reply', reply_text: glued, new_state: 'PRICE_SENT', confidence: 0.9 });
  const out = await runEngine(input({ ctx: { ...input().ctx, lang: 'en' } }));
  expect(out.kind).toBe('queued');
  expect(out.replyText).toBe(APPROVED.price_tfn_abn);
  expect(out.newState).toBe('PRICE_SENT');
  expect(out.reviewNote).toMatch(/approved price message went instead/);
});

describe('28 Sep, 19:25 (+33 7 81): "please confirm these are your official bank details"', () => {
  const ASK = "Before I make the bank transfer, could you please confirm that the account details below are the official business account of The Accounting Academy and that the payment of AUD 385 is for my TFN + ABN tax return for the 2025-2026 financial year?\n\nAccount name: The Accounting Academy\nBSB: 062692\nAccount: 81049952\nAmount: AUD 385\n\nCould you also please confirm that this is the same account used by Working Holiday Tax for client payments?";
  const CONFIRM = "Yes, confirmed. BSB 062692, account 81049952 is our business account, held under The Accounting Academy, our registered business name, and it's the account every Working Holiday Tax client pays into. The $385 covers your full TFN + ABN return for the 2025-26 year. Once it's through, just send a screenshot and we'll get started. 😊";

  it('a confirmation that mentions the BSB is not measured with the price-message ceiling', () => {
    expect(policyGuard(CONFIRM, { ...ctx, state: 'PRICE_SENT' }).allowed).toBe(true);
  });

  it('the price message is never re-sent as a stand-in once the bank details have gone out', async () => {
    const glued = "That's definitely something we can check for you, and there are many other deductions and factors the team looks at as part of the service, so we go through every one with you before anything is lodged.\n\n" + APPROVED.price_tfn_abn;
    decideMock.mockResolvedValue({ action: 'reply', reply_text: glued, confidence: 0.9 });
    const out = await runEngine(input({
      ctx: { ...input().ctx, lang: 'en', state: 'PRICE_SENT' },
      history: [
        { role: 'assistant', text: APPROVED.opening },
        { role: 'customer', text: 'TFN + ABN please' },
        { role: 'assistant', text: APPROVED.price_tfn_abn },
        { role: 'customer', text: ASK },
      ],
    }));
    expect(out.replyText ?? '').not.toContain('Great! Here are the payment details');
    expect(out.kind).toBe('human_task');
  });
});

/**
 * Jo, 21 Oct (Norina, +33 7 62): "when the customer says from the start that
 * they have ABN income, drop the guarantee sentence". TFN-only keeps it.
 */
jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
import { runEngine, EngineInput, stripGuarantee } from '@/lib/will/engine';
import { hasAbnIncome } from '@/lib/will/abn-income';
import { APPROVED } from '@/lib/will/approved-messages';
import { priceMessageIn, firstContactPriceMessage } from '@/lib/will/instant-choice';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const NORINA = "Hello,\n\nI am French and I worked in Australia as a self-employed Uber Eats delivery driver (with an ABN) for less than 2 months in early 2026.\n\nI am now back in France and I cannot access my ATO account to lodge my 2025–2026 tax return.\n\nCan you help me complete my tax return remotely from France, using my French passport, TFN and ABN, without access to myGov?\n\nCould you also tell me your fees?\n\nThank you for your help!";
const G = "If your tax refund is less than our fee, we'll refund the difference. If there's no refund, our full fee applies.";

function input(customer: string, lang = 'en', income: 'UNKNOWN' | 'TFN' | 'TFN_ABN' = 'UNKNOWN'): EngineInput {
  return {
    ctx: { name: 'Norina', state: 'NEW_LEAD', income, paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang, knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [{ role: 'customer', text: customer }],
    mode: 'FULL_AUTO',
    bank: { bsb: '062692', account: '81049952' },
  };
}

beforeEach(() => decideMock.mockReset());

describe('hasAbnIncome', () => {
  it('reads Norina as ABN income', () => expect(hasAbnIncome([NORINA])).toBe(true));
  it.each(['I drove for Uber Eats', 'I was a sole trader', 'Ich war selbstständig', 'ABNで働いていました'])('"%s" is ABN income', (t) => expect(hasAbnIncome([t])).toBe(true));
  it.each(['Do I need an ABN?', 'I only worked on a TFN, no ABN', "I don't have an ABN", 'TFN only please'])('"%s" is not', (t) => expect(hasAbnIncome([t])).toBe(false));
});

describe('the price message', () => {
  it('TFN + ABN carries no guarantee; TFN still does', () => {
    expect(APPROVED.price_tfn_abn).not.toMatch(/refund the difference|no refund/i);
    expect(APPROVED.price_tfn).toContain(G);
    expect(firstContactPriceMessage('TFN_ABN', 'Norina')).not.toMatch(/refund the difference/);
    expect(priceMessageIn('ja', 'TFN_ABN', false)).not.toContain('差額');
    expect(priceMessageIn('ja', 'TFN', false)).toContain('差額');
  });
});

describe('whatever the model writes', () => {
  it('Norina: the $385 reply goes out without the guarantee', async () => {
    decideMock.mockResolvedValue({ action: 'reply', confidence: 1, new_state: 'PRICE_SENT',
      reply_text: `Hey Norina! 😊 Happy to help.\n\nGot it, so that's the TFN + ABN option, $385. We review everything.\n\nBSB: 062692\nAccount: 81049952\n\n${G}\n\nJust send a screenshot once paid and we'll get started!` });
    const out = await runEngine(input(NORINA));
    expect(out.replyText ?? '').toContain('$385');
    expect(out.replyText ?? '').not.toMatch(/refund the difference|no refund|full fee applies/i);
  });

  it('a French reply to an ABN customer loses both guarantee sentences', async () => {
    decideMock.mockResolvedValue({ action: 'reply', confidence: 1,
      reply_text: "Parfait, c'est l'option TFN + ABN, 385 $.\n\nSi ton remboursement est inférieur à nos frais, nous te remboursons la différence. S'il n'y a pas de remboursement, nos frais complets s'appliquent.\n\nEnvoie-nous une capture une fois payé !" });
    const out = await runEngine(input(NORINA, 'fr', 'TFN_ABN'));
    expect(out.replyText ?? '').not.toMatch(/différence|pas de remboursement/i);
  });

  it('a TFN-only customer keeps the guarantee', async () => {
    decideMock.mockResolvedValue({ action: 'reply', confidence: 1, new_state: 'PRICE_SENT',
      reply_text: `Hey! 😊 Happy to help.\n\n${APPROVED.price_tfn}` });
    const out = await runEngine(input('I only worked for employers on a TFN, no ABN. How much is it'));
    expect(out.replyText ?? '').toContain(G);
  });
});

it('stripGuarantee removes the second sentence in French, Spanish and Italian too', () => {
  expect(stripGuarantee("A.\n\nS'il n'y a pas de remboursement, nos frais complets s'appliquent.")).toBe('A.');
  expect(stripGuarantee('A.\n\nSi no hay reembolso, se aplica nuestra tarifa completa.')).toBe('A.');
  expect(stripGuarantee("A.\n\nSe non c'è nessun rimborso, si applica la nostra tariffa completa.")).toBe('A.');
});

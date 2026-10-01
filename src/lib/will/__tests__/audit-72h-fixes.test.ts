/**
 * 1 Oct: the fixes from the 72-hour audit (82 conversations, 3 parallel
 * readers). Each block names the customer whose chat showed the problem.
 */
import { policyGuard } from '@/lib/will/policy-guard';
import { runEngine, EngineInput, stripCheerOpener, enforcePriceMessage } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';
import { KNOWLEDGE_SEED } from '@/lib/will/knowledge-seed';
import { buildSystemPrompt } from '@/lib/will/playbook';
import { HANDOFF_HOLDING_MSG } from '@/lib/will/i18n';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const base = (over: Partial<EngineInput> = {}): EngineInput => ({
  ctx: { name: 'Rick', state: 'QUALIFIED', income: 'TFN_ABN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
  guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
  history: [{ role: 'assistant', text: APPROVED.opening }, { role: 'customer', text: 'TFN + ABN please' }],
  mode: 'FULL_AUTO',
  bank: { bsb: '062692', account: '81049952' },
  ...over,
});
const guardCtx = (over: Partial<Parameters<typeof policyGuard>[1]> = {}) => ({ state: 'PRICE_SENT' as const, paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, ...over });

beforeEach(() => decideMock.mockReset());

describe('a long question earns a longer answer (rick, +81 90)', () => {
  const SIX = 'Hi, 1. Will you individually assess whether I may qualify as an Australian resident? 2. Does the Australia Japan tax treaty apply to me? 3. Will you assess my Medicare levy exemption eligibility and assist with the MES if required? 4. Will you review my ABN Uber Eats activity for all legitimate deductions? 5. Can you give a rough indication of my expected refund? 6. What would your total fee be for my case? Also, is it okay that I currently cannot access myGov? My priority is not the lowest fee but a careful review. I worked in Sydney and Melbourne over the year and have all payslips and invoices ready. '.repeat(1);
  const ANSWER = "Thanks Rick, that's all clear. Your residency, the treaty, Medicare and your deductions are exactly the things our team works through in the review, so leave those with us. Yes, the Medicare Entitlement Statement is included, we guide you through it after the form. No myGov access is fine, we work through our tax agent portal. With Uber income it's the TFN + ABN option, $385, and the fee is the same whatever the result. If that works for you, here are the payment details:\n\n" + APPROVED.price_tfn_abn;

  it('the ceiling scales with the customer text', () => {
    const flat = policyGuard(ANSWER, guardCtx());
    const scaled = policyGuard(ANSWER, guardCtx({ customerTextChars: SIX.length }));
    expect(flat.violations).toContain('REPLY_TOO_LONG');
    expect(scaled.violations).not.toContain('REPLY_TOO_LONG');
  });

  it('a rewrite that is still long but clean goes out; the stock line never replaces it', async () => {
    const essay = ANSWER + ' ' + 'We also look at every receipt you send and compare it against the ATO rules so nothing is missed. '.repeat(6);
    decideMock
      .mockResolvedValueOnce({ action: 'reply', reply_text: essay, confidence: 0.9 })
      .mockResolvedValueOnce({ action: 'reply', reply_text: ANSWER + ' We also check every receipt.', confidence: 0.9 });
    const out = await runEngine(base({ history: [{ role: 'assistant', text: APPROVED.opening }, { role: 'customer', text: SIX.slice(0, 400) }] }));
    expect(out.kind).toBe('queued');
    expect(out.replyText).not.toMatch(/one of the many things we check before we lodge your tax return, so leave that with us\. 😊$/);
    expect(out.replyText).toContain('BSB: 062692');
  });
});

describe('courtesy gets silence (Laura, Pancho, Kana, Holly, Pippa)', () => {
  it('"Thanks" with a reply that carries nothing is not sent', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: "You're very welcome! Let us know if anything comes up.", confidence: 0.9 });
    const out = await runEngine(base({ ctx: { ...base().ctx, state: 'FORM_PENDING', paid: true }, history: [{ role: 'assistant', text: 'Payment received. Please fill out the form.' }, { role: 'customer', text: 'Thanks!' }] }));
    expect(out.kind).toBe('silent');
  });
  it('"yes" to "which option?" still gets the price', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: 'Great! ' + APPROVED.price_tfn, new_state: 'PRICE_SENT', confidence: 0.9 });
    const out = await runEngine(base({ history: [{ role: 'assistant', text: 'Shall I send the TFN payment details?' }, { role: 'customer', text: 'yes' }] }));
    expect(out.kind).toBe('queued');
    expect(out.replyText).toContain('BSB');
  });
});

describe('cheer-word openers are dropped from the third message on', () => {
  it('stripCheerOpener', () => {
    expect(stripCheerOpener('Perfect! The team will review that.')).toBe('The team will review that.');
    expect(stripCheerOpener('No worries at all! Wednesday works.')).toBe('Wednesday works.');
    expect(stripCheerOpener('Perfekt, das klappt.')).toBe('Das klappt.');
    expect(stripCheerOpener('Here are the details.')).toBe('Here are the details.');
  });
  it('applied by the engine after two Will turns', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: 'Perfect! The form is the next step, it takes two minutes.', confidence: 0.9 });
    const out = await runEngine(base({ ctx: { ...base().ctx, state: 'FORM_PENDING', paid: true }, history: [
      { role: 'assistant', text: 'a' }, { role: 'customer', text: 'b' }, { role: 'assistant', text: 'c' }, { role: 'customer', text: 'where is the form?' },
    ] }));
    expect(out.replyText).toMatch(/^The form is the next step/);
  });
});

describe('the price message is pasted verbatim for English chats (four wordings in the audit)', () => {
  it('enforcePriceMessage keeps one lead line and replaces the rest', () => {
    const drafted = "So that's the TFN option.\n\nHere are the payment details for the $220:\nAccount Name: Simple Tax Services\nBSB: 062692\nAccount Number: 81049952\n\nIf you get a refund and it comes to less than $220, we top up the difference, so our fee never costs you more than the refund you get back.\n\nOnce paid, send a screenshot!";
    expect(enforcePriceMessage(drafted)).toBe("So that's the TFN option.\n\n" + APPROVED.price_tfn);
    expect(enforcePriceMessage(APPROVED.price_tfn_abn)).toBe(APPROVED.price_tfn_abn);
  });
  it('the engine applies it', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: "Great, TFN it is.\n\nAccount Name: The Accounting Academy\nBSB: 062692\nAccount Number: 81049952\nAmount: $220\n\nThe fee covers our team's full review, preparation and lodgment of your tax return.\n\nJust send a screenshot once paid!", new_state: 'PRICE_SENT', confidence: 0.9 });
    const out = await runEngine(base({ history: [{ role: 'assistant', text: APPROVED.opening }, { role: 'customer', text: 'TFN' }] }));
    expect(out.replyText).toContain(APPROVED.price_tfn);
    expect(out.replyText).not.toMatch(/Account Name/);
  });
});

describe('a paid customer re-proposed as PAID is not a conflict (Simon, +61 425)', () => {
  it('the reply goes out, the stage stays', async () => {
    decideMock.mockResolvedValue({ action: 'reply', reply_text: 'All good, the form is the next step: https://workingholidaytax.com.au/tax-form', new_state: 'PAID', confidence: 0.9 });
    const out = await runEngine(base({ ctx: { ...base().ctx, state: 'FORM_PENDING', paid: true }, history: [{ role: 'assistant', text: 'Payment received.' }, { role: 'customer', text: 'Done! Helloo?' }] }));
    expect(out.kind).toBe('queued');
    expect(out.newState).toBeUndefined();
  });
});

describe('the bridge line and the playbook', () => {
  it('the holding line says a person has it, in every language', () => {
    for (const v of Object.values(HANDOFF_HOLDING_MSG)) expect(v).not.toMatch(/^Thanks for that/);
    expect(HANDOFF_HOLDING_MSG.en).toMatch(/passed this on to the team/);
  });
  it('the playbook carries the audit rules', () => {
    const { stable } = buildSystemPrompt({ name: 'X', state: 'NEW_LEAD', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en' });
    expect(stable).toMatch(/OPERATIONAL QUESTIONS ARE ANSWERED\. TAX QUESTIONS GET THE ONE LINE\./);
    expect(stable).toMatch(/"THANKS" GETS NOTHING BACK/);
    expect(stable).toMatch(/NEVER PROMISE WHAT YOU DO NOT CONTROL/);
    expect(stable).toMatch(/THE FIRST MESSAGE CAN ALREADY BE THE CHOICE/);
    expect(stable).toMatch(/NEVER write "Want me to send you the payment details\?"/);
  });
  it('the 12 new Library answers pass the guard at their stage', () => {
    const pre = ['what information do you need from me before paying', 'can I review the return before it is lodged and where does the refund go', 'who prepares and signs the return, professional insurance', 'is GST included in the fee', 'waiting for money before paying', 'tiny ABN income still means TFN + ABN'];
    const post = ['ATO payment plan for tax owed', 'cancel after the estimate shows no refund and get the fee back', 'when the ATO notice of assessment or email arrives after lodging', 'customer sent TFN or passport number in the chat', 'copy of the signed or lodged return', 'refund has not arrived yet after lodgment'];
    for (const i of pre) {
      const k = KNOWLEDGE_SEED.find((x) => x.intent === i)!; expect(k).toBeDefined();
      expect([i, policyGuard(k.answer, guardCtx()).violations]).toEqual([i, []]);
    }
    for (const i of post) {
      const k = KNOWLEDGE_SEED.find((x) => x.intent === i)!; expect(k).toBeDefined();
      const v = policyGuard(k.answer, guardCtx({ state: 'FORM_COMPLETE', paid: true })).violations.filter((x) => x !== 'SALES_CONTENT_AFTER_PAYMENT');
      expect([i, v]).toEqual([i, []]);
    }
  });
});

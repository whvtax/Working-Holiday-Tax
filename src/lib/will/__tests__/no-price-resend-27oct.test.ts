/**
 * Jo, 27 Oct (a customer): the price message had gone out, she asked for
 * a card payment link, gave her legal name, then asked four questions (myGov,
 * documents, total fee, deadline). Will answered with the whole price message
 * and the bank details again. Once the price message has gone out and the
 * customer is not asking for the bank details, it is never re-sent.
 */
import { runEngine, EngineInput } from '@/lib/will/engine';
import { APPROVED } from '@/lib/will/approved-messages';

jest.mock('@/lib/will/claude', () => ({ decide: jest.fn() }));
import { decide } from '@/lib/will/claude';
const decideMock = decide as jest.MockedFunction<typeof decide>;

const QUESTIONS = 'Could you please confirm:\n\n- Can you lodge my tax return without me logging into myGov?\n- What documents do you need from me?\n- What is the total fee, including any additional charges?\n- Can you confirm whether you can lodge my return and whether an extended deadline applies if I engage you now?\n\nThank you.';

function input(): EngineInput {
  return {
    ctx: { name: 'Sojin', state: 'PRICE_SENT', income: 'TFN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null, lang: 'en', knowledge: [] },
    guard: { aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() },
    history: [
      { role: 'assistant', text: APPROVED.opening },
      { role: 'customer', text: 'TFN only' },
      { role: 'assistant', text: APPROVED.price_tfn },
      { role: 'customer', text: 'Sorry I have no money in my australian account as I have moved overseas. Is there any way you can take it out from my tax return?' },
      { role: 'assistant', text: 'No problem! Would you prefer to pay by card through a payment link? It works from any country.' },
      { role: 'customer', text: 'Yes please. Sojin Park' },
      { role: 'assistant', text: "Thanks! We'll send you the payment link here shortly 😊" },
      { role: 'customer', text: QUESTIONS },
    ],
    mode: 'FULL_AUTO',
    decisionMode: 'will',
    bank: { bsb: '062692', account: '81049952' },
  };
}

beforeEach(() => decideMock.mockReset());

it('the approved price message is not sent again to a customer who already has it and asked other things', async () => {
  decideMock.mockResolvedValue({ action: 'reply', approved_key: 'price_tfn', reply_text: 'Of course', confidence: 0.9 });
  const out = await runEngine(input());
  expect(out.replyText ?? '').not.toContain('062692');
  expect(out.replyText ?? '').not.toContain('Just send a screenshot once paid');
});

it("Will's own reply that copies the price message is not sent with the bank details again", async () => {
  decideMock.mockResolvedValue({ action: 'reply', reply_text: 'Of course\n\n' + APPROVED.price_tfn, confidence: 0.9 });
  const out = await runEngine(input());
  expect(out.replyText ?? '').not.toContain('062692');
  expect(out.replyText ?? '').not.toContain('Just send a screenshot once paid');
});

it('a held answer to the four questions never falls back to the price message', async () => {
  const held = "Of course!\n\nYes, we lodge directly with the ATO, no myGov login needed.\n\nThe questionnaire asks for everything we need.\n\nThe fee is $220 in total.\n\nAnd there's no deadline to worry about once you're with us.";
  decideMock.mockResolvedValue({ action: 'reply', reply_text: held, confidence: 0.9 });
  const out = await runEngine(input());
  expect(out.replyText ?? '').not.toContain('062692');
});

import fs from 'fs';
import path from 'path';
it('the playbook forbids re-sending the price message after the payment link', () => {
  const p = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/playbook.ts'), 'utf8');
  expect(p).toContain('QUESTIONS AFTER THE PRICE MESSAGE OR THE PAYMENT LINK');
  expect(p).toContain('never to one who chose the card payment link');
});

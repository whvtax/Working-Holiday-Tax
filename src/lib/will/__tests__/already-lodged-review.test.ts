/** 16 Oct (Jo, Siti +61 479): a customer who already lodged gets the REVIEW
 *  price message (no guarantee), never the normal TFN one. */
import { alreadyLodged } from '@/lib/will/already-checked';
import { enforcePriceMessage } from '@/lib/will/engine';
import { detectChoice } from '@/lib/will/instant-choice';
import { APPROVED } from '@/lib/will/approved-messages';

const SITI = ['Hi, I would like to ask about my Australian tax return.', 'how much is the charge', 'i did my tax return but i get the notice of debt 😅', 'i need help to amend'];

describe('spotting a return already lodged', () => {
  it('Siti', () => { expect(alreadyLodged(SITI)).toBe(true); });
  it.each(['I already lodged it myself', 'the ATO says I owe money', 'Ich habe die Steuererklärung schon eingereicht', 'もう申告しました', 'can you review my return'])('%s', (t) => {
    expect(alreadyLodged([t])).toBe(true);
  });
  it.each(['I worked on a TFN only', 'how much is it?', 'I want to lodge my tax return'])('%s is a fresh return', (t) => {
    expect(alreadyLodged([t])).toBe(false);
  });
  it('"amend" is never an instant TFN choice', () => {
    expect(detectChoice('i need help to amend, TFN only', null)).toBeNull();
  });
});

describe('the price message', () => {
  it('Will\'s TFN draft becomes the review message, keeping his greeting', () => {
    const draft = "Hey Siti! 😊\n\nGot it, so that's the TFN option, $220.\n\nBSB: 062692\nAccount: 81049952";
    const out = enforcePriceMessage(draft, false, true);
    expect(out).toBe(`Hey Siti! 😊\n\n${APPROVED.price_tfn_review}`);
    expect(out).not.toMatch(/refund the difference/);
    expect(out).toContain('for the review itself');
  });
  it('without a lodged return nothing changes', () => {
    expect(enforcePriceMessage("That's $220.\nBSB: 062692")).toBe(APPROVED.price_tfn);
  });
});

/**
 * Which messages are big enough that silence reads as neglect.
 *
 * THE CASE THIS COMES FROM. Hannah, 28 Aug 17:41: eight paragraphs about an
 * overdue 2019-20 return, two employers she could not identify, what the ATO
 * told her in 2020, and one direct question about the fee. Will handed it to a
 * person, correctly, because only Jo can price that job. Then she sat looking
 * at a silent screen.
 *
 * WHAT MATTERS MOST HERE IS THE NO. A false yes sends a customer a holding line
 * they did not need, every time it fires, and a chat sprinkled with unnecessary
 * "let me look into that" is how an assistant starts to feel automated. So the
 * short and the ordinary must be rejected, and the borderline with them.
 */
import { isLongComplicatedMessage } from '@/lib/will/long-message';

const HANNAH = `Hi, I'm looking for help with an overdue 2019-2020 Australian tax return and wanted to explain my situation before booking.

I'm Canadian and was in Australia on a Working Holiday visa in 2020. This was my first year in Australia and I did various farm jobs in both Mildura and Shepparton.

The issue is that I don't clearly remember Ultimate Produce or GI Agriculture Services, and I believe one of them may relate to a very short farm job where I was paid cash.

I contacted the ATO about this in 2020 and explained that I was unsure what to do because the reported income didn't seem correct. I was told at the time not to worry about lodging it and that it would essentially go away.

Could you please let me know if this is something you can assist with, and what your fee would be for reviewing and resolving the old return? I'd prefer to know the approximate cost before proceeding.

Thank you!`;

describe('the messages that get a holding line', () => {
  it('recognises the one this was built for', () => {
    expect(isLongComplicatedMessage(HANNAH)).toBe(true);
  });

  it('recognises a shorter message that asks several things at once', () => {
    // Not eight paragraphs, but somebody laying out a real situation with more
    // than one thing they need answered. The character floor is what keeps a
    // two-line "how much? and how long?" out of this.
    const msg = 'Hi there, I worked in Queensland last year on a 417 visa and then did three months '
      + 'of farm work up near Bundaberg, and I am honestly not sure where I stand with any of it. '
      + 'Do you handle the super side as well as the tax return? And how long does the whole thing '
      + 'usually take once I have paid you? I am leaving the country in about three weeks.';
    expect(msg.length).toBeGreaterThanOrEqual(250);
    expect(isLongComplicatedMessage(msg)).toBe(true);
  });

  it('still says no to two quick questions in one line', () => {
    // The reason the character floor exists at all.
    expect(isLongComplicatedMessage('How much is it? And how long does it take?')).toBe(false);
  });
});

describe('the messages that must NOT get one', () => {
  it('leaves an ordinary question alone', () => {
    // The overwhelming majority of what arrives. A holding line here would be
    // noise on top of a reply that is coming anyway.
    for (const short of [
      'Hi, can you help me with my tax return?',
      'How much does it cost?',
      'I paid, here is the receipt',
      'yes',
      'ok thanks!',
      "What's the difference between super and the tax return?",
    ]) {
      expect(isLongComplicatedMessage(short)).toBe(false);
    }
  });

  it('leaves an attachment alone however long the caption', () => {
    // Twelve photos must never look like a carefully worded question.
    expect(isLongComplicatedMessage('📷 [Photo]')).toBe(false);
    expect(isLongComplicatedMessage('📄 [Document: OptusInvoice.pdf]')).toBe(false);
    expect(isLongComplicatedMessage('📎 [Message - open WhatsApp to view]')).toBe(false);
    expect(isLongComplicatedMessage(`📷 [Photo] ${'x'.repeat(900)}`)).toBe(false);
  });

  it('leaves one long unbroken sentence alone', () => {
    // Length by itself is not complication: somebody who typed one run-on line
    // is still asking one thing.
    expect(isLongComplicatedMessage('so basically ' + 'a'.repeat(800))).toBe(false);
  });

  it('leaves a long message with only two paragraphs alone', () => {
    const two = `${'a'.repeat(300)}\n\n${'b'.repeat(300)}`;
    expect(isLongComplicatedMessage(two)).toBe(false);
  });

  it('leaves three short paragraphs alone', () => {
    expect(isLongComplicatedMessage('Hi\n\nI worked in Cairns\n\nThanks')).toBe(false);
  });

  it('never throws on nothing', () => {
    for (const v of ['', '   ', '\n\n', null, undefined]) {
      expect(isLongComplicatedMessage(v as string)).toBe(false);
    }
  });
});

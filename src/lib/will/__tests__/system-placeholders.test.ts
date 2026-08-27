/**
 * Stand-ins the webhook writes into a chat, versus what a customer actually
 * typed.
 *
 * WHY THIS MATTERS. When WhatsApp delivers a message with no text — a photo, a
 * voice note, a Coexistence `unsupported` payload — the webhook stores a
 * stand-in so the thread does not have a hole in it. That stand-in becomes the
 * handoff task's context, and the Decision Log was printing it as
 *
 *     The customer wrote "📎 [Message — open WhatsApp to view]"
 *
 * which is our own text quoted back as theirs, on the one kind of handoff that
 * means "there is nothing to read".
 *
 * THE DRIFT THIS GUARDS. The strings live in two places by necessity:
 * placeholderFor() in api/will/webhook/route.ts writes them, and
 * describeSystemPlaceholder() in handoff-reasons.ts recognises them. A new
 * message type added to the writer and not the reader does not throw — it
 * silently goes back to being quoted as if a person had typed it. So the list
 * below is copied from the writer verbatim, and every entry must be recognised.
 */
import { describeSystemPlaceholder, captionAfterPlaceholder } from '@/lib/will/handoff-reasons';

// Verbatim from placeholderFor(), one per branch of its switch.
const EVERY_PLACEHOLDER: [string, string][] = [
  ['image', '📷 [Photo]'],
  ['video', '🎥 [Video]'],
  ['audio / voice', '🎤 [Voice message]'],
  ['document, no filename', '📄 [Document]'],
  ['document, with filename', '📄 [Document: payslip-june.pdf]'],
  ['sticker', '💟 [Sticker]'],
  ['location', '📍 [Location]'],
  ['contacts', '👤 [Contact card]'],
  ['unsupported / default', '📎 [Message — open WhatsApp to view]'],
];

describe('describeSystemPlaceholder', () => {
  it.each(EVERY_PLACEHOLDER)('recognises the stand-in for %s', (_kind, text) => {
    const described = describeSystemPlaceholder(text);
    expect(described).not.toBeNull();
    expect(described!.length).toBeGreaterThan(0);
    // It is a description of an event, so it must not arrive pre-quoted — the
    // card adds no quotation marks around it and neither should this.
    expect(described).not.toContain('"');
    expect(described).not.toContain('“');
  });

  it('names the document when WhatsApp gave us a filename', () => {
    expect(describeSystemPlaceholder('📄 [Document: payslip-june.pdf]')).toContain('payslip-june.pdf');
  });

  it('leaves real customer text alone', () => {
    // The default path, and by far the common one. Anything here that came back
    // non-null would be a customer's own words rendered as a system event.
    for (const real of [
      'Hi, I was on a WHM visa from July 2025 — can I still claim?',
      'I paid, here is the receipt',
      '[not a placeholder]',
      '📷 my photo of the beach', // an emoji, but not the stand-in format
      '',
      '   ',
    ]) {
      expect(describeSystemPlaceholder(real)).toBeNull();
    }
  });

  it('never throws on odd input', () => {
    for (const odd of ['', ' ', '📎', '📄 [Document', '\n\n']) {
      expect(() => describeSystemPlaceholder(odd)).not.toThrow();
    }
  });
});

describe('captionAfterPlaceholder', () => {
  it('recovers a caption, which IS the customer’s own words', () => {
    // placeholderFor() appends the caption after the stand-in. The stand-in is
    // ours and must not be quoted; the caption is theirs and must be.
    expect(captionAfterPlaceholder('📷 [Photo] here is my payment')).toBe('here is my payment');
    expect(captionAfterPlaceholder('📄 [Document: june.pdf] my payslip')).toBe('my payslip');
  });

  it('returns null when there is no caption', () => {
    for (const [, text] of EVERY_PLACEHOLDER) {
      expect(captionAfterPlaceholder(text)).toBeNull();
    }
  });

  it('returns null for text that is not a stand-in at all', () => {
    expect(captionAfterPlaceholder('Hi, can you help?')).toBeNull();
  });
});

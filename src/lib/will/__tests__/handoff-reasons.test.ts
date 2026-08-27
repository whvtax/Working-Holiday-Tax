/**
 * Every handoff reason the codebase raises must produce the two sentences the
 * Decision Log is built from (Jo, 27 Aug):
 *
 *   The customer wrote "…" and because <because>, Will passed it to you.
 *   To stop this happening again: <prevent>
 *
 * What these pin:
 *   - every real reason string is recognised (an unrecognised one silently
 *     falls back to "Will had no approved answer", which would be a lie about
 *     a failed send or an unreadable file),
 *   - `because` is grammatical in that sentence: lower case, no full stop,
 *   - nothing is told to go and write a template when a template cannot fix it,
 *   - a genuinely unclassified question still points at the Library.
 *
 * The strings below are the reason text as the report groups it —
 * `reason.replace(/:.*$/, '').slice(0, 60)` — which is why they are truncated.
 */
import { explainHandoffReason, isTemplateShaped } from '@/lib/will/handoff-reasons';

// Every reason the codebase raises, as it reaches the card.
const REAL_REASONS: [string, string][] = [
  ['engine.ts', 'Policy Guard blocked reply'],
  ['scheduler.ts (autopilot)', 'Autopilot reply blocked before sending'],
  ['scheduler.ts (follow-up)', 'Follow-up blocked by Policy Guard'],
  ['actions (approval)', 'Draft became invalid before approval'],
  ['actions (stale)', 'Draft is stale'],
  ['service.ts (media)', 'Customer sent an attachment Will cannot read. Open the chat t'],
  ['service.ts (voice)', 'Customer sent a message Will cannot read (voice note or unsupp'],
  ['service.ts (identity)', 'Customer asked whether they are talking to a bot, needs a huma'],
  ['service.ts (chatty)', 'Customer sent 5 messages before paying — needs a person, not m'],
  ['service.ts (existing)', 'An existing chat sent a message, needs a human'],
  ['service.ts (returning)', 'A previous customer messaged again, needs a human'],
  ['scheduler.ts (send)', 'WhatsApp send failed'],
  ['service.ts (budget)', 'Daily AI limit reached, please reply to this customer manually'],
  ['engine.ts (transition)', 'Model proposed invalid transition PRICE_SENT -> LODGED; reply '],
  ['service.ts (payment)', 'Customer sent proof of payment (bank transfer receipt)'],
  ['scheduler.ts (nightly)', 'Nightly consistency check found 2 issue(s)'],
];

describe('explainHandoffReason', () => {
  it.each(REAL_REASONS)('recognises the reason raised in %s', (_where, reason) => {
    const e = explainHandoffReason(reason);
    expect(e.kind).not.toBe('other');
    expect(e.label.length).toBeGreaterThan(0);
    expect(e.because.length).toBeGreaterThan(0);
    expect(e.prevent.length).toBeGreaterThan(0);
  });

  // The clause is dropped into the middle of a sentence, so a stray capital or
  // a trailing full stop shows up on screen as broken English. A proper noun is
  // the one legitimate capital — "WhatsApp itself refused…" is correct.
  const PROPER_NOUNS = /^(Will|WhatsApp|Meta|Autopilot)\b/;
  it.each(REAL_REASONS)('gives a because-clause that reads mid-sentence for %s', (_where, reason) => {
    const { because } = explainHandoffReason(reason);
    if (!PROPER_NOUNS.test(because)) {
      expect(because[0]).toBe(because[0].toLowerCase());
    }
    expect(because.endsWith('.')).toBe(false);
  });

  it('does not tell you to write a template for something a template cannot fix', () => {
    const notTemplateShaped = [
      'Customer sent an attachment Will cannot read. Open the chat t',
      'Customer sent a message Will cannot read (voice note or unsupp',
      'Policy Guard blocked reply',
      'WhatsApp send failed',
      'Customer asked whether they are talking to a bot, needs a huma',
    ];
    for (const r of notTemplateShaped) {
      expect(isTemplateShaped(r)).toBe(false);
      expect(explainHandoffReason(r).prevent.toLowerCase()).not.toMatch(/add (an? )?(approved )?(answer|template) to the library/);
    }
  });

  it('still points an unrecognised, recurring question at the Library', () => {
    const e = explainHandoffReason('Customer asked something nobody has classified yet');
    expect(e.kind).toBe('other');
    expect(e.prevent.toLowerCase()).toContain('library');
  });

  it('never throws on empty or odd input', () => {
    expect(() => explainHandoffReason('')).not.toThrow();
    expect(explainHandoffReason('').label.length).toBeGreaterThan(0);
  });
});

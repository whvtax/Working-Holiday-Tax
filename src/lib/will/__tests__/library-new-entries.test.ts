// Guards the Library entries added on 15 Nov 2026 against the rulebook:
// no em or en dashes, no tax verdicts, no refund promises, no "maximise".
import { KNOWLEDGE_SEED } from '../knowledge-seed';

const NEW_INTENTS = [
  'more than one tax year in one request',
  'missed an earlier tax year',
  'records needed for ABN income',
  'work expense records',
  'what to send from a gig app like Uber Eats',
  'registered for an ABN but earned nothing under it',
  'residency for a student or graduate visa',
  'residency on a working holiday visa',
];

describe('Library entries added 15 Nov 2026', () => {
  const entries = KNOWLEDGE_SEED.filter((e) => NEW_INTENTS.includes(e.intent));

  it('has all eight new entries', () => {
    expect(entries.map((e) => e.intent).sort()).toEqual([...NEW_INTENTS].sort());
  });

  it.each(NEW_INTENTS)('"%s" has no dashes, verdicts or refund promises', (intent) => {
    const e = entries.find((x) => x.intent === intent);
    expect(e).toBeDefined();
    const text = `${e!.answer}`;
    expect(text).not.toMatch(/[–—]/);
    expect(text).not.toMatch(/\bmaximi[sz]e\b/i);
    expect(text).not.toMatch(/guarantee|you will get a refund|your refund will be/i);
  });
});

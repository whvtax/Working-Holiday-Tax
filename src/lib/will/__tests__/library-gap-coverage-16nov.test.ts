import { KNOWLEDGE_SEED } from '../knowledge-seed';

// The gaps seen in the 679-conversation read (15 Nov) must each have a Library
// entry, so a direct question is answered from the Library and not a template.
const GAPS: Array<{ name: string; intent: RegExp }> = [
  { name: 'DASP / super withdrawal', intent: /dasp|super/i },
  { name: 'registered agent / TPB register', intent: /agent|tpb/i },
  { name: 'video call', intent: /video call/i },
  { name: '482 switch / residency', intent: /residency/i },
  { name: 'cash income', intent: /cash/i },
  { name: 'overseas lodgement / ATO login', intent: /overseas/i },
];

describe('Library covers the gaps from the 15 Nov read', () => {
  it.each(GAPS)('has an entry for $name', ({ intent }) => {
    const hit = KNOWLEDGE_SEED.find((e) => intent.test(e.intent));
    expect(hit).toBeDefined();
  });

  it('the video call answer says no video calls and points to WhatsApp', () => {
    const e = KNOWLEDGE_SEED.find((x) => /video call/i.test(x.intent));
    expect(e?.answer).toMatch(/don't offer video calls/i);
    expect(e?.answer).toMatch(/WhatsApp/);
  });
});

describe('pre-payment next step', () => {
  it('a ready-to-start customer gets a clear next step with no tax advice', () => {
    const e = KNOWLEDGE_SEED.find((x) => /get started before paying/i.test(x.intent));
    expect(e).toBeDefined();
    expect(e?.answer).toMatch(/visa type/i);
    expect(e?.answer).toMatch(/only pay once/i);
    expect(e?.answer).not.toMatch(/resident|you (?:should|must) lodge|you are not/i);
    expect(e?.answer).not.toMatch(/[-‐-―−]/);
  });
});

describe('employer withholding entry (ATO checked 17 Nov)', () => {
  it('states the 15% rule as the ATO does, with no amount and no refund promise', () => {
    const e = KNOWLEDGE_SEED.find((x) => /took out as a working holiday maker/i.test(x.intent));
    expect(e).toBeDefined();
    expect(e?.answer).toMatch(/15%/);
    expect(e?.answer).not.toMatch(/refund (is|will be)|you will get|guarantee/i);
    expect(e?.tags).toContain('post-payment');
    expect(e?.answer).not.toMatch(/[-‐-―−]/);
  });
});

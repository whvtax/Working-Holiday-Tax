/**
 * Jo, 22 Oct (Sydney, +1 608): "Only on TFN however I did do some freelance
 * UGC work on the side as well" got the TFN price message from the code.
 */
import { detectChoice } from '@/lib/will/instant-choice';
import { buildSystemPrompt } from '@/lib/will/playbook';

describe('mixed income is not a clear choice', () => {
  it.each([
    'Only on TFN however I did do some freelance UGC work on the side as well',
    'Just TFN but I also did some UGC content',
    'Mostly employers, plus some freelance work',
    'TFN, and a side gig doing cash work',
    'only TFN, no ABN, but I did some influencer brand deals',
  ])('"%s" goes to Will', (t) => expect(detectChoice(t, null)).toBeNull());

  it.each([
    ['TFN', 'TFN'], ['Only TFN, no ABN', 'TFN'], ['just employers, payslips', 'TFN'],
    ['I also did Uber', 'TFN_ABN'], ['TFN and ABN', 'TFN_ABN'], ['I worked mostly on TFN but also did some ABN work', 'TFN_ABN'],
    ['I drove for Uber Eats', 'TFN_ABN'],
  ])('"%s" is still %s straight away', (t, track) => expect(detectChoice(t, null)).toBe(track));
});

it('the playbook tells Will to ask how the other income was paid', () => {
  const p = buildSystemPrompt({ name: null, state: 'QUALIFIED', income: 'UNKNOWN', paid: false, formComplete: false, missingDocs: [], estimatedRefundCents: null });
  expect(p.stable + p.dynamic).toMatch(/OTHER INCOME NEXT TO WAGES/);
});

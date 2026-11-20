import { UPSET_STRICT } from '../engine';

// 17 Nov (Jo): a long message that mentions a refund is answered in parts. Only
// an upset customer or a demand for money back goes whole to the team.
describe('partial answers: what counts as upset', () => {
  it('a long question list that mentions the refund is not upset', () => {
    expect(UPSET_STRICT.test('Can I claim my phone and also my laundry? When do I get my refund? Do I need a TFN?')).toBe(false);
    expect(UPSET_STRICT.test('Where is my refund?')).toBe(false);
  });
  it('a demand for money back is upset', () => {
    expect(UPSET_STRICT.test('I want my money back now')).toBe(true);
    expect(UPSET_STRICT.test('please refund me')).toBe(true);
  });
  it('complaints are upset', () => {
    expect(UPSET_STRICT.test('You ignored me, I am very upset')).toBe(true);
    expect(UPSET_STRICT.test('this is a scam')).toBe(true);
  });
});

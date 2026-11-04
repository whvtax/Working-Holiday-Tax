import { ruleCheckExpenses, expenseRuleHint } from '@/lib/will/expense-rules';

describe('ATO expense rules as code (Jo, 3 Nov)', () => {
  it('home to work travel and lunch are not claimable', () => {
    const r = ruleCheckExpenses('I spent a lot on Ubers and trains to work and lunch every day');
    expect(r.find((x) => x.item === 'travel between home and work')?.verdict).toBe('not_claimable');
    expect(r.find((x) => x.item === 'meals and lunch')?.verdict).toBe('not_claimable');
  });
  it('everyday clothes need one question, protective clothing is claimable', () => {
    const a = ruleCheckExpenses('I bought jeans and sneakers for work');
    expect(a[0].verdict).toBe('needs_detail');
    expect(a[0].ask).toMatch(/protective|uniform/i);
    const b = ruleCheckExpenses('I bought high-vis and steel cap boots');
    expect(b.some((x) => x.verdict === 'claimable')).toBe(true);
    expect(b.some((x) => x.item === 'everyday clothing')).toBe(false);
  });
  it('phone, wfh and tools ask for the deciding detail', () => {
    for (const t of ['my phone bill', 'I worked from home', 'I bought tools']) {
      expect(ruleCheckExpenses(t)[0].verdict).toBe('needs_detail');
    }
  });
  it('nothing for a message without an expense item', () => {
    expect(ruleCheckExpenses('Thanks, when is my return ready?')).toEqual([]);
    expect(expenseRuleHint('Thanks!')).toBe('');
  });
  it('the hint carries the $300 record rule and no dashes', () => {
    const h = expenseRuleHint('lunch and uber to work');
    expect(h).toMatch(/\$300/);
    expect(h).not.toMatch(/[–—―]/);
  });
});

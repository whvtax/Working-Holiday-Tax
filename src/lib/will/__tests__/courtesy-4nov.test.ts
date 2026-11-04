import { isClosingOnly } from '@/lib/will/text-normalize';

describe('replies to our goodbye are closers (4 Nov)', () => {
  it.each(['For you too!', 'You too', 'Same to you', 'Likewise', 'All the best'])('%s', (t) => {
    expect(isClosingOnly(t)).toBe(true);
  });
  it('a real question is not a closer', () => {
    expect(isClosingOnly('Is it too late for you to lodge?')).toBe(false);
  });
});

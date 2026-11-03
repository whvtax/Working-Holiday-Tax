import { wasAlreadySentVerbatim } from '../channel';

const store = (createdAt: string) => ({
  listMessages: async () => [{ direction: 'OUT', status: 'SENT', body: "I've passed this to the team.", createdAt }],
}) as never;

describe('verbatim duplicate guard window (Jo, 3 Nov)', () => {
  it('blocks the same words sent moments ago', async () => {
    expect(await wasAlreadySentVerbatim(store(new Date().toISOString()), 'c', "I've passed this to the team.")).toBe(true);
  });
  it('lets the same words through a day later', async () => {
    expect(await wasAlreadySentVerbatim(store(new Date(Date.now() - 24 * 3600 * 1000).toISOString()), 'c', "I've passed this to the team.")).toBe(false);
  });
});

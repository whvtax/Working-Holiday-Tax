import { atlasData, askAtlas, ATLAS_SYSTEM } from '../ask';
import type { MorningReport } from '@/lib/will/morning-report';

const report: MorningReport = {
  generatedAt: '2026-11-15T00:00:00.000Z', windowHours: 24, newLeads: 3, paid: 2, lodged: 1,
  handledByWill: 10, handledByTeam: 4, tasksOpened: 2, openTasks: 5, topReasons: [], blocked: 0,
  waitingOnUs: [{ id: 'c1', name: 'Ana', waId: '61400000000', hours: 3, preview: 'hello', stage: 'x' }],
  stuckAfterPayment: [],
  security: { logins: 0, failed: 0, lockouts: 0, newDevices: [], recent: [] },
  winback: { sent: 0, replied: 0, toFinal: 0, waitingReply: 0, queued: 0, wonBackPaid: 0 },
};

describe('Ask Atlas data', () => {
  it('sends counts and waiting customers, and no contact or security fields', () => {
    const json = JSON.stringify(atlasData(report));
    expect(json).toContain('Ana');
    expect(json).not.toContain('61400000000'); // waId, the phone number, never leaves
    expect(json).not.toContain('security');
    expect(json).not.toContain('winback');
  });

  it('system prompt bans dashes and outside knowledge', () => {
    expect(ATLAS_SYSTEM).toMatch(/Never use em dashes or en dashes/);
    expect(ATLAS_SYSTEM).toMatch(/Do not use outside knowledge/);
  });

  it('says not_configured when no API key is set', async () => {
    const old = process.env.ANTHROPIC_API_KEY;
    delete process.env.ANTHROPIC_API_KEY;
    const r = await askAtlas('how many waiting?', report);
    expect(r).toEqual({ ok: false, error: 'not_configured' });
    if (old !== undefined) process.env.ANTHROPIC_API_KEY = old;
  });
});

import { atlasView } from '../atlas-view';
import type { MorningReport } from '@/lib/will/morning-report';

function report(over: Partial<MorningReport> = {}): MorningReport {
  return {
    generatedAt: '2026-11-15T00:00:00.000Z',
    windowHours: 24,
    newLeads: 3,
    paid: 2,
    lodged: 1,
    handledByWill: 10,
    handledByTeam: 4,
    tasksOpened: 2,
    openTasks: 5,
    topReasons: [],
    blocked: 0,
    waitingOnUs: [],
    stuckAfterPayment: [],
    security: { logins: 0, failed: 0, lockouts: 0, newDevices: [], recent: [] },
    winback: { sent: 0, replied: 0, toFinal: 0, waitingReply: 0, queued: 0, wonBackPaid: 0 },
    ...over,
  };
}

describe('atlasView', () => {
  it('shows real counts and no reasons when nothing needs review', () => {
    const v = atlasView(report());
    expect(v.reasons).toEqual([]);
    expect(v.tiles.find((t) => t.key === 'paid')?.value).toBe(2);
    expect(v.tiles.find((t) => t.key === 'handled')?.value).toBe(10);
    expect(v.tiles.find((t) => t.key === 'needs-you')?.attention).toBe(false);
  });

  it('never fills unsourced figures with numbers', () => {
    const v = atlasView(report());
    expect(v.tiles.find((t) => t.key === 'bank')?.value).toBeNull();
    expect(v.tiles.find((t) => t.key === 'ato')?.value).toBeNull();
    const accounts = v.modules.find((m) => m.key === 'accounts');
    expect(accounts?.connected).toBe(false);
    expect(accounts?.attention).toBe(false);
  });

  it('turns the dot to attention with a reason when a customer waits', () => {
    const person = { id: 'c1', name: 'A', waId: '1', hours: 3, preview: null, stage: 'x' };
    const v = atlasView(report({ waitingOnUs: [person] }));
    expect(v.reasons).toEqual(['1 customer is waiting over an hour']);
    expect(v.tiles.find((t) => t.key === 'needs-you')?.value).toBe(1);
    expect(v.modules.find((m) => m.key === 'crm')?.attention).toBe(true);
  });

  it('lists stuck-after-payment and blocked tasks as reasons', () => {
    const person = { id: 'c2', name: 'B', waId: '2', hours: 50, preview: null, stage: 'paid' };
    const v = atlasView(report({ stuckAfterPayment: [person, person], blocked: 1 }));
    expect(v.reasons).toEqual([
      '2 paid customers are stuck after payment',
      '1 task is blocked',
    ]);
  });

  it('uses no em or en dashes in interface text', () => {
    const person = { id: 'c3', name: 'C', waId: '3', hours: 2, preview: null, stage: 'x' };
    const v = atlasView(report({ waitingOnUs: [person], blocked: 2 }));
    const text = JSON.stringify(v);
    expect(text).not.toMatch(/[–—]/);
  });
});

describe('atlasView links', () => {
  it('links every module: CRM and Will to their screens, the rest to a placeholder', () => {
    const v = atlasView(report());
    expect(v.modules.find((m) => m.key === 'crm')?.href).toBe('/crm/dashboard');
    expect(v.modules.find((m) => m.key === 'will')?.href).toBe('/crm/whatsapp');
    for (const key of ['accounts', 'mia', 'instagram', 'tiktok']) {
      expect(v.modules.find((m) => m.key === key)?.href).toBe(`/atlas/${key}`);
    }
  });
});

describe('atlasView panels', () => {
  it('lists waiting and stuck customers for CRM, with no phone number', () => {
    const waiting = { id: 'c1', name: 'Ana', waId: '61400000000', hours: 3, preview: 'hi', stage: 'x' };
    const stuck = { id: 'c2', name: 'Ben', waId: '61400000001', hours: 50, preview: null, stage: 'paid' };
    const v = atlasView(report({ waitingOnUs: [waiting], stuckAfterPayment: [stuck] }));
    expect(v.panels.crm.map((i) => i.title)).toEqual([
      'Ana is waiting for a reply',
      'Ben is stuck after payment',
    ]);
    expect(JSON.stringify(v.panels)).not.toContain('61400000000');
  });

  it('lists open tasks for Will, and says nothing when there are none', () => {
    const empty = atlasView(report());
    expect(empty.panels.will).toEqual([]);
    const v = atlasView(report(), [
      { id: 't1', customerName: 'Cara', reason: 'refund question', severity: 'HIGH', createdAt: '2026-11-15T00:00:00.000Z' },
    ]);
    expect(v.panels.will).toEqual([{ id: 'task-t1', title: 'Cara', detail: 'refund question · high' }]);
  });
});

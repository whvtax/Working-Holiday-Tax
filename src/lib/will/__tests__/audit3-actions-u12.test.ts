/**
 * audit3 / actions / unverified[12]: deleting a follow-up template from the
 * Library no longer burns cadence steps in silence.
 *
 * Deletion stays possible and the scheduler's skip-and-continue (H6) is
 * untouched. What changes is visibility: the delete action records WHICH key
 * went, writes a `follow_up_template_deleted` row for a cadence key, and the
 * System card turns that row (and a scheduler `follow_up_template_missing`
 * row, if one is ever written) into a warning that says how to restore it.
 * A plain custom template deletes exactly as before, with no warning.
 */
const templates = [
  { id: 't-fu', key: 'fu_pre_24h', category: 'Follow-ups', title: 'Pre-payment nudge 24h', body: 'Hi {{name}}', requiresMeta: true, versions: 1, updatedAt: '' },
  { id: 't-custom', key: 'custom_ab12', category: 'Custom', title: 'My note', body: 'Hello', requiresMeta: false, versions: 1, updatedAt: '' },
];
const store = {
  listTemplates: jest.fn().mockImplementation(async () => templates),
  deleteTemplate: jest.fn().mockResolvedValue(undefined),
  audit: jest.fn().mockResolvedValue(undefined),
  getSetting: jest.fn().mockResolvedValue(undefined),
};
jest.mock('@/lib/will/store', () => ({ getStore: () => store }));
jest.mock('@/lib/will/auth', () => ({ sessionValid: jest.fn().mockResolvedValue(true) }));
jest.mock('@/lib/will/channel', () => ({
  sendWhatsAppText: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppTemplate: jest.fn().mockResolvedValue({ ok: true }),
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
}));

import { POST } from '@/app/api/will/actions/route';
import { faultsFromAudit } from '@/lib/will/system-report';
import type { AuditRow } from '@/lib/will/store';

const del = (id: string) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'delete_template', id }),
}));

beforeEach(() => { for (const fn of Object.values(store)) (fn as jest.Mock).mockClear(); });

describe('delete_template', () => {
  it('still deletes a follow-up step, but names it and writes the warning row', async () => {
    const j = await (await del('t-fu')).json();
    expect(j).toEqual({ ok: true, key: 'fu_pre_24h', followUpStep: true });
    expect(store.deleteTemplate).toHaveBeenCalledWith('t-fu');
    expect(store.audit).toHaveBeenCalledWith('owner', 'template_deleted', expect.objectContaining({ id: 't-fu', key: 'fu_pre_24h', followUpStep: true }));
    const warn = store.audit.mock.calls.find((c) => c[1] === 'follow_up_template_deleted');
    expect(warn).toBeDefined();
    expect(warn![0]).toBe('owner');
    expect(warn![2]).toMatchObject({ key: 'fu_pre_24h' });
    expect(String(warn![2].note)).toContain('fu_pre_24h');
    expect(String(warn![2].note)).toContain('Sync library from file');
  });

  it('deletes a custom template exactly as before, no warning row', async () => {
    const j = await (await del('t-custom')).json();
    expect(j).toEqual({ ok: true, key: 'custom_ab12', followUpStep: false });
    expect(store.deleteTemplate).toHaveBeenCalledWith('t-custom');
    expect(store.audit).toHaveBeenCalledTimes(1);
    expect(store.audit).toHaveBeenCalledWith('owner', 'template_deleted', expect.objectContaining({ id: 't-custom', followUpStep: false }));
  });

  it('an id that is not in the Library still deletes (idempotent) and audits without a key', async () => {
    const j = await (await del('nope')).json();
    expect(j).toEqual({ ok: true, key: null, followUpStep: false });
    expect(store.deleteTemplate).toHaveBeenCalledWith('nope');
    expect(store.audit).toHaveBeenCalledTimes(1);
  });
});

describe('System card', () => {
  const row = (actor: string, action: string, detail: unknown, at: string): AuditRow =>
    ({ id: `${actor}-${action}-${at}`, actor, action, detail, at });

  it('turns the deleted follow-up row into a warning that says how to restore it', () => {
    const faults = faultsFromAudit([
      row('owner', 'follow_up_template_deleted', { key: 'fu_pre_24h', note: 'Follow-up step "fu_pre_24h" was deleted' }, '2026-09-05T10:00:00Z'),
      row('scheduler', 'follow_up_template_missing', { customerId: 'c1', templateKey: 'fu_pre_24h', note: 'no template fu_pre_24h' }, '2026-09-05T11:00:00Z'),
    ]);
    expect(faults).toHaveLength(1);
    const f = faults[0];
    expect(f.severity).toBe('warning');
    expect(f.count).toBe(2);
    expect(f.action).toContain('Sync library from file');
    expect(f.action).toContain('Learning tab');
    expect(f.error).toContain('fu_pre_24h');
  });

  it('an ordinary template_deleted row is not a fault', () => {
    expect(faultsFromAudit([row('owner', 'template_deleted', { id: 'x', key: 'custom_1' }, '2026-09-05T10:00:00Z')])).toHaveLength(0);
  });
});

/**
 * audit3 / actions / unverified[13]: a template edit can be undone.
 *
 * The store still overwrites `body` in place and bumps `versions`; nothing
 * about storage, sends or rules changes. What changes is that the
 * `template_updated` audit row now carries the wording being replaced
 * (`before`), the new wording (`after`), the key and the resulting version,
 * so the Library can offer "restore" by calling update_template again with
 * the old text, through the same save-time guard.
 */
const templates = [
  { id: 't-fu', key: 'fu_pre_24h', category: 'Follow-ups', title: 'Pre-payment nudge 24h', body: 'Hi {{name}}, old wording', requiresMeta: true, versions: 3, updatedAt: '' },
];
const store = {
  listTemplates: jest.fn().mockImplementation(async () => templates),
  updateTemplate: jest.fn().mockResolvedValue(undefined),
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

const upd = (id: string, body: string) => POST(new Request('http://x/api/will/actions', {
  method: 'POST', headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ action: 'update_template', id, body }),
}));

beforeEach(() => { for (const fn of Object.values(store)) (fn as jest.Mock).mockClear(); });

describe('update_template', () => {
  it('stores the previous wording in the audit row so an edit can be restored', async () => {
    const j = await (await upd('t-fu', 'Hi {{name}}, new wording')).json();
    expect(j).toEqual({ ok: true, key: 'fu_pre_24h', version: 4 });
    expect(store.updateTemplate).toHaveBeenCalledWith('t-fu', 'Hi {{name}}, new wording');
    expect(store.audit).toHaveBeenCalledTimes(1);
    expect(store.audit).toHaveBeenCalledWith('owner', 'template_updated', {
      id: 't-fu', key: 'fu_pre_24h', title: 'Pre-payment nudge 24h',
      before: 'Hi {{name}}, old wording', after: 'Hi {{name}}, new wording', version: 4,
    });
  });

  it('restoring is just another update_template with the old text, through the same guard', async () => {
    const first = store.audit.mock.calls.length;
    await upd('t-fu', 'Hi {{name}}, mistaken edit');
    const before = (store.audit.mock.calls[first][2] as { before: string }).before;
    const j = await (await upd('t-fu', before)).json();
    expect(j.ok).toBe(true);
    expect(store.updateTemplate).toHaveBeenLastCalledWith('t-fu', 'Hi {{name}}, old wording');
  });

  it('the save-time guard still runs before anything is written or audited', async () => {
    const r = await upd('t-fu', 'Guaranteed refund of $5000, no risk at all!');
    expect(r.status).toBe(422);
    expect(store.updateTemplate).not.toHaveBeenCalled();
    expect(store.audit).not.toHaveBeenCalled();
  });

  it('an id that is not in the Library still updates as before and audits without a before', async () => {
    const j = await (await upd('nope', 'text')).json();
    expect(j).toEqual({ ok: true, key: null, version: null });
    expect(store.updateTemplate).toHaveBeenCalledWith('nope', 'text');
    expect(store.audit).toHaveBeenCalledWith('owner', 'template_updated', expect.objectContaining({ id: 'nope', before: null, after: 'text' }));
  });
});

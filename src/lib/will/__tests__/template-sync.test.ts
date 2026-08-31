/**
 * The message templates follow the deployed code.
 *
 * WHAT WAS WRONG (Jo, 31 Aug). The opening/price/objection wording lives in
 * will_templates, seeded once from approved-messages.ts. A deploy changes the
 * code but not the DB, and the plain seed path only adds MISSING keys, so an
 * edited opening that already existed in the DB never reached Will: a lead got
 * the old, longer opening (which then tripped the pre-payment guard) even after
 * the shorter one shipped. syncTemplatesFromCode() is the fix, wired into the
 * one "Sync library from file" click next to the knowledge sync.
 */
import { syncTemplatesFromCode, seedTemplates } from '@/lib/will/seed';
import { APPROVED } from '@/lib/will/approved-messages';
import type { Store, TemplateRow } from '@/lib/will/store';

function fakeStore(seed: TemplateRow[]) {
  const rows = seed.map((t) => ({ ...t }));
  const listTemplates = jest.fn().mockImplementation(() => Promise.resolve(rows));
  const updateTemplate = jest.fn().mockImplementation((id: string, body: string) => {
    const r = rows.find((x) => x.id === id); if (r) r.body = body; return Promise.resolve();
  });
  const addTemplate = jest.fn().mockImplementation((t: { key?: string; category: string; title: string; body: string }) => {
    const row = { id: `new-${t.key}`, key: t.key ?? '', category: t.category, title: t.title, body: t.body, requiresMeta: false, versions: 1, updatedAt: '' } as TemplateRow;
    rows.push(row); return Promise.resolve(row);
  });
  return { store: { listTemplates, updateTemplate, addTemplate } as unknown as Store, rows, updateTemplate, addTemplate };
}

describe('syncTemplatesFromCode', () => {
  it('updates a stale opening in the DB to match the code', async () => {
    const seeded = seedTemplates();
    const f = fakeStore(seeded);
    // Simulate the DB holding the OLD, longer opening.
    const opening = f.rows.find((t) => t.key === 'opening')!;
    opening.body = 'We help hundreds of backpackers every year get their tax sorted properly. We will check your tax residency, what you can claim, Medicare, and make sure you are not missing anything you are entitled to.';

    const res = await syncTemplatesFromCode(f.store);

    expect(f.rows.find((t) => t.key === 'opening')!.body).toBe(APPROVED.opening);
    expect(res.keys).toContain('opening');
    expect(res.updated).toBeGreaterThanOrEqual(1);
  });

  it('is a no-op when every template already matches the code', async () => {
    const f = fakeStore(seedTemplates());
    const res = await syncTemplatesFromCode(f.store);
    expect(res.updated).toBe(0);
    expect(res.added).toBe(0);
    expect(f.updateTemplate).not.toHaveBeenCalled();
  });

  it('adds a seeded key missing from the DB, and never touches a hand-added custom template', async () => {
    const seeded = seedTemplates();
    // DB is missing the opening but has an owner's custom template.
    const withoutOpening = seeded.filter((t) => t.key !== 'opening');
    const custom = { id: 'c1', key: 'my_custom', category: 'Custom', title: 'Mine', body: 'hand written', requiresMeta: false, versions: 1, updatedAt: '' } as TemplateRow;
    const f = fakeStore([...withoutOpening, custom]);

    const res = await syncTemplatesFromCode(f.store);

    expect(res.keys).toContain('opening');
    expect(f.rows.find((t) => t.key === 'opening')!.body).toBe(APPROVED.opening);
    // The custom one is untouched.
    expect(f.rows.find((t) => t.key === 'my_custom')!.body).toBe('hand written');
  });
});

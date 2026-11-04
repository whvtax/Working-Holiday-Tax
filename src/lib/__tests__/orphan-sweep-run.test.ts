/** Orphan sweep runner (Jo, 3 Nov: 72 hours). Synthetic data only. */
const removed: string[][] = [];
let listing: Record<string, Array<{ name: string; id: string | null; created_at?: string }>>;
let tasks: Array<{ file_urls: string }>;
jest.mock('@/lib/supabase', () => ({
  STORAGE_BUCKETS: { uploads: 'uploads' },
  getSupabase: () => ({
    storage: { from: () => ({
      list: async (dir: string, o: { offset: number }) => ({ data: o.offset ? [] : (listing[dir] ?? []), error: null }),
      remove: async (paths: string[]) => { removed.push(paths); return { data: paths.map((name) => ({ name })), error: null }; },
    }) },
    from: () => ({ select: () => {
      let after: string | null = null;
      const q = {
        order: () => q, limit: () => q,
        gt: (_c: string, v: string) => { after = v; return q; },
        then: (res: (v: unknown) => unknown) => res({ data: after ? [] : tasks.map((t, i) => ({ id: String(i + 1), ...t })), error: null }),
      };
      return q;
    } }),
  }),
}));
import { runOrphanSweep } from '@/lib/orphan-sweep-run';

const now = new Date('2026-11-10T00:00:00Z');
const old = '2026-11-01T00:00:00Z', young = '2026-11-09T00:00:00Z';
const url = (p: string) => `https://x.supabase.co/storage/v1/object/public/uploads/${p}`;
beforeEach(() => {
  removed.length = 0;
  listing = {
    'tax-form': [{ name: 'selfie', id: null }],
    'tax-form/selfie': [
      { name: 'old-orphan.jpg', id: 'a', created_at: old },
      { name: 'old-kept.jpg', id: 'b', created_at: old },
      { name: 'young.jpg', id: 'c', created_at: young },
    ],
    'svt/tax-form': [],
  };
  tasks = [{ file_urls: JSON.stringify([url('tax-form/selfie/old-kept.jpg')]) }];
});

it('reports but deletes nothing by default', async () => {
  const r = await runOrphanSweep(now, {});
  expect(r).toMatchObject({ dryRun: true, orphans: 1, deleted: 0 });
  expect(removed).toHaveLength(0);
});
it('deletes only old, unreferenced files when switched on', async () => {
  const r = await runOrphanSweep(now, { ORPHAN_UPLOAD_DELETE: 'true' });
  expect(r).toMatchObject({ dryRun: false, orphans: 1, deleted: 1 });
  expect(removed).toEqual([['tax-form/selfie/old-orphan.jpg']]);
});

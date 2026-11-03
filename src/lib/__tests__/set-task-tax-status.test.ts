/** Jo, 3 Nov: the correction link REPLACES the status line, so the PDF shows the new status. Synthetic data. */
const updates: Array<Record<string, unknown>> = [];
let row: Record<string, unknown>;
jest.mock('@/lib/supabase', () => ({
  getSupabase: () => ({
    from: () => ({
      select: () => ({ eq: () => ({ maybeSingle: () => Promise.resolve({ data: row, error: null }) }) }),
      update: (u: Record<string, unknown>) => { updates.push(u); return { eq: () => Promise.resolve({ error: null }) }; },
    }),
  }),
}));
import { setTaskTaxStatus } from '@/lib/db';

beforeEach(() => {
  updates.length = 0;
  row = { id: 'T1', client_id: 'C1', client_name: 'Test Person', task_type: 'tax-return', done: false, notes: 'Medicare: No | → Working holiday maker | Expenses: No | 📞 Called', tax_status: 'whm' };
});

it('replaces the existing status line (one only) and the column', async () => {
  expect(await setTaskTaxStatus('T1', 'resident')).toBe(true);
  const u = updates[0];
  const notes = String(u.notes);
  expect(u.tax_status).toBe('Australian resident for tax purposes');
  expect(notes.match(/→/g)).toHaveLength(1);
  expect(notes).toContain('→ Australian resident for tax purposes');
  expect(notes).not.toMatch(/Working holiday maker/);
  expect(notes).toContain('Called');
});
it('adds the line when there was none', async () => {
  row.notes = 'Medicare: No';
  await setTaskTaxStatus('T1', 'whm');
  expect(String(updates[0].notes)).toContain('→ whm');
});
it('does not touch a finished task', async () => {
  row.done = true;
  expect(await setTaskTaxStatus('T1', 'whm')).toBe(false);
  expect(updates).toHaveLength(0);
});

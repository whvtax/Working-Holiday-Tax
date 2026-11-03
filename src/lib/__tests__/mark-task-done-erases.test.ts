/**
 * Jo, 3 Nov: pressing "Mark as done" must erase the customer's personal details
 * and documents from the server. Synthetic data only.
 */
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
const deleteFiles = jest.fn();
jest.mock('@/lib/upload', () => ({ deleteFiles: (...a: unknown[]) => deleteFiles(...a) }));

import { markTaskDone } from '@/lib/db';

beforeEach(() => {
  updates.length = 0;
  deleteFiles.mockReset();
  row = {
    id: 'TASK-1', client_id: 'CLT-1', client_name: 'Test Person', task_type: 'tax-return', done: false,
    address: '1 Test St', tfn: '123456782', bank_details: 'BSB 000000 ACC 12345678', primary_job: 'Barista',
    marital: 'Single', au_phone: '0400000000',
    file_urls: JSON.stringify(['https://abc.supabase.co/storage/v1/object/public/uploads/tax-form/selfie/s.jpg']),
    notes: 'Medicare: No | Passport No: X1234567 | Expenses: Yes | 📞 Called',
    reviewer_note: 'private note',
  };
});

it('deletes the stored files, blanks TFN, bank, address and the passport line, and drops the file links', async () => {
  deleteFiles.mockResolvedValue({ ok: true, deleted: ['tax-form/selfie/s.jpg'] });
  await markTaskDone('TASK-1');
  expect(deleteFiles).toHaveBeenCalledTimes(1);
  const u = updates[0];
  expect(u).toMatchObject({ done: true, address: '', tfn: '', bank_details: '', primary_job: '', marital: '', au_phone: '', file_urls: '[]', reviewer_note: '' });
  expect(String(u.notes)).not.toMatch(/Passport No|Expenses/);
  expect(String(u.notes)).toContain('Called');
});

it('if the files cannot be deleted, the links are kept and the card says so', async () => {
  deleteFiles.mockResolvedValue({ ok: false, deleted: [], error: 'boom' });
  await markTaskDone('TASK-1');
  const u = updates[0];
  expect('file_urls' in u).toBe(false);
  expect(String(u.notes)).toContain('Attached files could NOT be deleted');
  expect(u.tfn).toBe('');
});

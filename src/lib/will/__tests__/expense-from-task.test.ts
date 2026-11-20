import { buildYearPdfs, CATEGORY_FOR_KIND } from '../expense-from-task';
import { PDFDocument } from 'pdf-lib';

const bytes = (n: number) => new Uint8Array([n]).buffer;
const item = (date: string, kind: 'expense' | 'income_abn', amount = 10) =>
  ({ date, supplier: 'Shop', amount, summary: 'x', kind }) as const;

describe('buildYearPdfs', () => {
  it('makes one PDF per tax year and kind, and lists unreadable files', async () => {
    const uploads: string[] = [];
    const upload = async (p: string) => { uploads.push(p); };
    // Each file has its own byte value, so the extractor can tell them apart.
    const replies = [item('2025-08-01', 'expense'), item('2025-09-01', 'expense'), item('2025-10-01', 'income_abn'), item('2026-08-01', 'expense'), null];
    const names = ['a', 'b', 'c', 'd', 'e'];
    const files = names.map((name, i) => ({ name, bytes: bytes(i + 1), mime: 'image/png' }));
    const extract = async (b: ArrayBuffer) => replies[new Uint8Array(b)[0] - 1] ?? null;
    const res = await buildYearPdfs({ customerId: 'task-1', files, extract, upload });
    expect(res.unread).toEqual(['e']);
    expect(res.built.map((b) => [b.taxYear, b.category, b.count]).sort()).toEqual([
      ['2025-26', CATEGORY_FOR_KIND.expense, 2],
      ['2025-26', CATEGORY_FOR_KIND.income_abn, 1],
      ['2026-27', CATEGORY_FOR_KIND.expense, 1],
    ].sort());
    expect(uploads.every((p) => p.startsWith('will-internal/task-1/'))).toBe(true);
  });

  it('writes valid PDFs that include the receipts', async () => {
    let saved: Uint8Array | null = null;
    await buildYearPdfs({
      customerId: 'task-2',
      files: [{ name: 'r.png', bytes: bytes(2), mime: 'image/png' }],
      extract: async () => item('2025-08-01', 'expense'),
      upload: async (_p, b) => { saved = b; },
    });
    expect(saved).not.toBeNull();
    const doc = await PDFDocument.load(saved as unknown as Uint8Array);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
  });
});

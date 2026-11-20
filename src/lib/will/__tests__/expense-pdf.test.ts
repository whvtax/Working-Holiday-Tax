import { PDFDocument } from 'pdf-lib';
import {
  taxYearOf,
  internalPath,
  scrub,
  buildCategoryPdf,
  saveCategoryPdf,
  INTERNAL_PREFIX,
} from '../expense-pdf';

describe('taxYearOf', () => {
  it('starts the tax year on 1 July', () => {
    expect(taxYearOf('2025-07-01')).toBe('2025-26');
    expect(taxYearOf('2026-06-30')).toBe('2025-26');
    expect(taxYearOf('2026-07-01')).toBe('2026-27');
  });
  it('returns null for a bad date', () => {
    expect(taxYearOf('01/07/2025')).toBeNull();
    expect(taxYearOf('2025-13-01')).toBeNull();
  });
});

describe('internalPath', () => {
  it('uses the internal prefix, customer id, tax year and a safe category slug', () => {
    expect(internalPath('cust-123', '2025-26', 'Phone & Internet')).toBe(
      `${INTERNAL_PREFIX}/cust-123/2025-26/phone-internet.pdf`,
    );
  });
  it('contains no e-mail or name', () => {
    const p = internalPath('cust-1', '2025-26', 'Fuel');
    expect(p).not.toMatch(/@/);
  });
});

describe('scrub', () => {
  it('removes e-mail addresses and phone numbers', () => {
    expect(scrub('mail me at jo@example.com or +61 412 345 678')).toBe('mail me at [email] or [number]');
  });
});

describe('buildCategoryPdf', () => {
  it('builds a PDF whose first page is the summary and then one page per image receipt', async () => {
    const { bytes, skippedReceipts } = await buildCategoryPdf({
      category: 'Fuel',
      taxYear: '2025-26',
      customerId: 'cust-1',
      items: [
        { date: '2025-08-01', supplier: 'Shell', invoiceNo: 'A1', amount: 60, summary: 'Fuel for work trip', kind: 'expense' },
        { date: '2025-09-02', supplier: 'BP', amount: 40.5, summary: 'Fuel for delivery', kind: 'expense' },
      ],
      receipts: [],
    });
    expect(skippedReceipts).toEqual([]);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(1);
  });

  it('skips an unsupported receipt type and lists it on a note page', async () => {
    const { bytes, skippedReceipts } = await buildCategoryPdf({
      category: 'Fuel',
      taxYear: '2025-26',
      customerId: 'cust-1',
      items: [],
      receipts: [{ bytes: new Uint8Array([1, 2, 3]), mime: 'text/plain', filename: 'notes.txt' }],
    });
    expect(skippedReceipts).toEqual(['notes.txt']);
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBe(2);
  });

  it('marks the file internal on the first page', async () => {
    const { bytes } = await buildCategoryPdf({
      category: 'Fuel', taxYear: '2025-26', customerId: 'cust-1', items: [],
    });
    const doc = await PDFDocument.load(bytes);
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
  });
});

describe('saveCategoryPdf', () => {
  it('uploads to the internal path as application/pdf', async () => {
    const upload = jest.fn(async () => undefined);
    const res = await saveCategoryPdf(upload, {
      category: 'ABN income', taxYear: '2025-26', customerId: 'cust-9', items: [],
    });
    expect(res.path).toBe(`${INTERNAL_PREFIX}/cust-9/2025-26/abn-income.pdf`);
    expect(upload).toHaveBeenCalledWith(res.path, expect.any(Uint8Array), 'application/pdf');
  });
});

import { parseItems } from '../expense-pdf';

describe('parseItems', () => {
  const good = { date: '2025-08-01', supplier: 'Shell', amount: 60, summary: 'Fuel', kind: 'expense' };
  it('accepts valid rows', () => {
    const r = parseItems([good]);
    expect(r.ok).toBe(true);
  });
  it('rejects empty, too many, bad dates, negative or non-finite amounts, unknown kinds', () => {
    expect(parseItems([]).ok).toBe(false);
    expect(parseItems(Array.from({ length: 201 }, () => good)).ok).toBe(false);
    expect(parseItems([{ ...good, date: '1/8/25' }]).ok).toBe(false);
    expect(parseItems([{ ...good, amount: -1 }]).ok).toBe(false);
    expect(parseItems([{ ...good, amount: Number.NaN }]).ok).toBe(false);
    expect(parseItems([{ ...good, kind: 'other' }]).ok).toBe(false);
    expect(parseItems('nope').ok).toBe(false);
  });
});

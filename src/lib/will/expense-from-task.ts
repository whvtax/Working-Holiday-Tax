// Turns a customer's invoice files into internal PDFs, one per tax year and kind.
// Each file is read by the model (extract). A file that cannot be read is listed
// in `unread` and left out. It never goes into a PDF with a guessed value.
import { taxYearOf, saveCategoryPdf, type ExpenseItem, type Uploader } from './expense-pdf';

export interface SourceFile { name: string; bytes: ArrayBuffer; mime: string }
export type Extractor = (bytes: ArrayBuffer, mime: string) => Promise<ExpenseItem | null>;

export const CATEGORY_FOR_KIND = { expense: 'Expenses', income_abn: 'ABN income' } as const;

export async function buildYearPdfs(args: {
  customerId: string;
  files: SourceFile[];
  extract: Extractor;
  upload: Uploader;
}): Promise<{ built: { path: string; taxYear: string; category: string; count: number }[]; unread: string[] }> {
  const groups = new Map<string, { taxYear: string; kind: ExpenseItem['kind']; items: ExpenseItem[]; files: SourceFile[] }>();
  const unread: string[] = [];

  for (const f of args.files) {
    const item = await args.extract(f.bytes, f.mime);
    const taxYear = item ? taxYearOf(item.date) : null;
    if (!item || !taxYear) { unread.push(f.name); continue; }
    const key = `${taxYear}|${item.kind}`;
    let g = groups.get(key);
    if (!g) { g = { taxYear, kind: item.kind, items: [], files: [] }; groups.set(key, g); }
    g.items.push(item);
    g.files.push(f);
  }

  const built: { path: string; taxYear: string; category: string; count: number }[] = [];
  for (const g of groups.values()) {
    const category = CATEGORY_FOR_KIND[g.kind];
    const { path } = await saveCategoryPdf(args.upload, {
      category,
      taxYear: g.taxYear,
      customerId: args.customerId,
      items: g.items,
      receipts: g.files.map((f) => ({ bytes: new Uint8Array(f.bytes), mime: f.mime, filename: f.name })),
    });
    built.push({ path, taxYear: g.taxYear, category, count: g.items.length });
  }
  return { built, unread };
}

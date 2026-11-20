// ============================================================
// Internal expense and ABN income PDFs (Jo, 15 Nov 2026).
//
// One PDF per customer, per tax year (1 July to 30 June), per category.
// The first page is an internal summary: date, supplier, invoice number,
// amount, a 2 to 3 line summary, and the total. The receipts follow.
//
// These files are INTERNAL. They are saved next to the customer's uploaded
// documents in the private uploads bucket, under will-internal/, and are never
// shown in the customer's tab or sent to the customer. Jo enters the Xero
// entries and the payment proof by hand.
//
// No names, phone numbers or e-mail addresses go into the file name or path.
// The customer is identified by their id.
// ============================================================
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from 'pdf-lib';

export const INTERNAL_PREFIX = 'will-internal';

export type ExpenseKind = 'expense' | 'income_abn';

export interface ExpenseItem {
  /** YYYY-MM-DD, the receipt or invoice date. */
  date: string;
  supplier: string;
  invoiceNo?: string;
  /** Amount in AUD dollars. */
  amount: number;
  /** 2 to 3 short lines, written by Will. */
  summary: string;
  kind: ExpenseKind;
}

export interface Receipt {
  bytes: Uint8Array;
  /** application/pdf, image/png or image/jpeg. Anything else is skipped and noted. */
  mime: string;
  filename?: string;
}

/** Tax year label for a date: 1 July 2025 to 30 June 2026 is "2025-26". */
export function taxYearOf(isoDate: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!m) return null;
  const y = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const startYear = month >= 7 ? y : y - 1;
  return `${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`;
}

/** File-name safe slug for a category name. */
export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'other';
}

/** Storage path for one category PDF. No personal data, only ids and labels. */
export function internalPath(customerId: string, taxYear: string, category: string): string {
  return `${INTERNAL_PREFIX}/${customerId}/${taxYear}/${categorySlug(category)}.pdf`;
}

/** Remove e-mail addresses and phone-like numbers from text that goes into a file. */
export function scrub(text: string): string {
  return (text || '')
    .replace(/[\w.+-]+@[\w-]+\.[\w.-]+/g, '[email]')
    .replace(/\+?\d[\d ()-]{6,}\d/g, '[number]')
    .replace(/\s+/g, ' ')
    .trim();
}

const A4: [number, number] = [595.28, 841.89];
const MARGIN = 40;

function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (font.widthOfTextAtSize(next, size) <= maxWidth) line = next;
    else { if (line) lines.push(line); line = w; }
  }
  if (line) lines.push(line);
  return lines;
}

/** Build one category PDF: an internal summary page, then the receipts. */
export async function buildCategoryPdf(args: {
  category: string;
  taxYear: string;
  customerId: string;
  items: ExpenseItem[];
  receipts?: Receipt[];
}): Promise<{ bytes: Uint8Array; skippedReceipts: string[] }> {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const ink = rgb(0.07, 0.09, 0.12);
  const muted = rgb(0.4, 0.42, 0.46);

  const summary = pdf.addPage(A4);
  let y = A4[1] - MARGIN;
  const line = (text: string, opts: { size?: number; font?: PDFFont; color?: ReturnType<typeof rgb>; x?: number } = {}) => {
    summary.drawText(text, { x: opts.x ?? MARGIN, y, size: opts.size ?? 10, font: opts.font ?? font, color: opts.color ?? ink });
    y -= (opts.size ?? 10) + 6;
  };

  line('INTERNAL. NOT SENT TO THE CUSTOMER.', { size: 9, font: bold, color: muted });
  y -= 6;
  line(`${args.category}  ·  tax year ${args.taxYear}`, { size: 16, font: bold });
  line(`Customer ref: ${args.customerId}`, { size: 10, color: muted });
  y -= 10;

  // Table header
  const cols = { date: MARGIN, supplier: MARGIN + 80, inv: MARGIN + 250, amount: A4[0] - MARGIN - 70 };
  summary.drawText('Date', { x: cols.date, y, size: 9, font: bold, color: muted });
  summary.drawText('Supplier', { x: cols.supplier, y, size: 9, font: bold, color: muted });
  summary.drawText('Invoice', { x: cols.inv, y, size: 9, font: bold, color: muted });
  summary.drawText('Amount', { x: cols.amount, y, size: 9, font: bold, color: muted });
  y -= 16;

  let total = 0;
  for (const it of args.items) {
    total += it.amount;
    summary.drawText(it.date, { x: cols.date, y, size: 9, font, color: ink });
    summary.drawText(scrub(it.supplier).slice(0, 34), { x: cols.supplier, y, size: 9, font, color: ink });
    summary.drawText(scrub(it.invoiceNo ?? '-').slice(0, 22), { x: cols.inv, y, size: 9, font, color: ink });
    summary.drawText(money(it.amount), { x: cols.amount, y, size: 9, font, color: ink });
    y -= 13;
    for (const l of wrap(scrub(it.summary), font, 8.5, A4[0] - 2 * MARGIN - 20).slice(0, 3)) {
      summary.drawText(l, { x: cols.supplier, y, size: 8.5, font, color: muted });
      y -= 11;
    }
    y -= 6;
    if (y < MARGIN + 80) break; // a long list continues in the receipts, noted below
  }
  y -= 4;
  summary.drawLine({ start: { x: MARGIN, y }, end: { x: A4[0] - MARGIN, y }, thickness: 0.6, color: muted });
  y -= 16;
  summary.drawText('Total', { x: cols.supplier, y, size: 11, font: bold, color: ink });
  summary.drawText(money(total), { x: cols.amount, y, size: 11, font: bold, color: ink });
  y -= 22;
  if (args.items.length > 0 && y < MARGIN + 40) line(`${args.items.length} items. See the receipts that follow.`, { size: 8.5, color: muted });

  // Receipts, after the summary page
  const skippedReceipts: string[] = [];
  for (const r of args.receipts ?? []) {
    const label = r.filename ?? 'receipt';
    try {
      if (r.mime === 'application/pdf') {
        const src = await PDFDocument.load(r.bytes, { ignoreEncryption: true });
        const pages = await pdf.copyPages(src, src.getPageIndices());
        for (const p of pages) pdf.addPage(p);
      } else if (r.mime === 'image/png' || r.mime === 'image/jpeg') {
        const img = r.mime === 'image/png' ? await pdf.embedPng(r.bytes) : await pdf.embedJpg(r.bytes);
        const page: PDFPage = pdf.addPage(A4);
        const maxW = A4[0] - 2 * MARGIN;
        const maxH = A4[1] - 2 * MARGIN;
        const scale = Math.min(maxW / img.width, maxH / img.height, 1);
        const w = img.width * scale;
        const h = img.height * scale;
        page.drawImage(img, { x: (A4[0] - w) / 2, y: (A4[1] - h) / 2, width: w, height: h });
      } else {
        skippedReceipts.push(label);
      }
    } catch {
      skippedReceipts.push(label);
    }
  }
  if (skippedReceipts.length) {
    const note = pdf.addPage(A4);
    note.drawText('Some files could not be included in this PDF:', { x: MARGIN, y: A4[1] - MARGIN, size: 10, font: bold, color: ink });
    skippedReceipts.forEach((f, i) => note.drawText(scrub(f).slice(0, 100), { x: MARGIN, y: A4[1] - MARGIN - 18 - i * 14, size: 9, font, color: muted }));
  }

  return { bytes: await pdf.save(), skippedReceipts };
}

export type Uploader = (path: string, bytes: Uint8Array, contentType: string) => Promise<void>;

/** Build and save one category PDF to the internal path. Returns the path. */
export async function saveCategoryPdf(
  upload: Uploader,
  args: Parameters<typeof buildCategoryPdf>[0],
): Promise<{ path: string; skippedReceipts: string[] }> {
  const path = internalPath(args.customerId, args.taxYear, args.category);
  const { bytes, skippedReceipts } = await buildCategoryPdf(args);
  await upload(path, bytes, 'application/pdf');
  return { path, skippedReceipts };
}

const MAX_ITEMS = 200
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

export type ParseResult = { ok: true; items: ExpenseItem[] } | { ok: false; error: string }

export function parseItems(raw: unknown): ParseResult {
  if (!Array.isArray(raw) || raw.length === 0) return { ok: false, error: 'items required' }
  if (raw.length > MAX_ITEMS) return { ok: false, error: 'too many items' }
  const items: ExpenseItem[] = []
  for (const r of raw) {
    if (!r || typeof r !== 'object') return { ok: false, error: 'bad item' }
    const o = r as Record<string, unknown>
    const date = typeof o.date === 'string' && DATE_RE.test(o.date) ? o.date : null
    const supplier = typeof o.supplier === 'string' ? o.supplier.slice(0, 120) : ''
    const amount = typeof o.amount === 'number' && Number.isFinite(o.amount) && o.amount >= 0 ? o.amount : null
    const summary = typeof o.summary === 'string' ? o.summary.slice(0, 400) : ''
    const kind = o.kind === 'income_abn' ? 'income_abn' : o.kind === 'expense' ? 'expense' : null
    if (!date || amount === null || !kind || !supplier) return { ok: false, error: 'bad item fields' }
    items.push({
      date,
      supplier,
      invoiceNo: typeof o.invoiceNo === 'string' ? o.invoiceNo.slice(0, 40) : undefined,
      amount,
      summary,
      kind,
    })
  }
  return { ok: true, items }
}


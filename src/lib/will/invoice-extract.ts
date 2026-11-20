// Automatic reading of a customer's invoice or receipt (Jo, 15 Nov 2026: "nothing
// manual"). The model returns structured fields through a forced tool call, the
// same way describeAttachment does. Output is validated here before it is used:
// anything missing or malformed returns null, so a bad read never reaches a PDF.
import { anthropicMessages } from './llm-transport';
import { recordAiUsage } from './ai-usage';
import type { ExpenseItem, ExpenseKind } from './expense-pdf';

export type ExtractCaller = (body: string) => Promise<unknown>;

const EXTRACT_TOOL = {
  name: 'record_invoice',
  description: 'Record the fields printed on one invoice or receipt. Use null for anything you cannot read clearly.',
  input_schema: {
    type: 'object',
    properties: {
      date: { type: ['string', 'null'], description: 'Invoice date as YYYY-MM-DD' },
      supplier: { type: ['string', 'null'], description: 'Business name that issued the invoice' },
      invoiceNo: { type: ['string', 'null'] },
      amount: { type: ['number', 'null'], description: 'Total paid in AUD, including GST, as a plain number' },
      summary: { type: ['string', 'null'], description: 'Two or three short words about what was bought' },
      kind: {
        type: ['string', 'null'],
        enum: ['expense', 'income_abn', null],
        description: 'income_abn if this is money the customer earned under their ABN (they issued it); expense if they paid it',
      },
    },
    required: ['date', 'supplier', 'invoiceNo', 'amount', 'summary', 'kind'],
  },
} as const;

const SYSTEM =
  'You read one invoice or receipt for an Australian tax return. Copy the printed values. Do not guess. ' +
  'Leave a field null if it is not clearly printed. Never add personal details such as addresses or account numbers.';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Validate what the model returned. Returns null unless every needed field is usable. */
export function validateExtract(raw: unknown): {
  date: string; supplier: string; invoiceNo?: string; amount: number; summary: string; kind: ExpenseKind;
} | null {
  if (!raw || typeof raw !== 'object') return null;
  const o = raw as Record<string, unknown>;
  const date = typeof o.date === 'string' && DATE_RE.test(o.date) ? o.date : null;
  const supplier = typeof o.supplier === 'string' ? o.supplier.trim().slice(0, 120) : '';
  const amount = typeof o.amount === 'number' && Number.isFinite(o.amount) && o.amount >= 0 ? o.amount : null;
  if (!date || !supplier || amount === null) return null;
  const invoiceNo = typeof o.invoiceNo === 'string' && o.invoiceNo.trim() ? o.invoiceNo.trim().slice(0, 40) : undefined;
  const summary = typeof o.summary === 'string' ? o.summary.trim().slice(0, 200) : '';
  const kind = o.kind === 'income_abn' ? 'income_abn' : o.kind === 'expense' ? 'expense' : null;
  if (!kind) return null;
  return { date, supplier, invoiceNo, amount, summary, kind };
}

/** Build the request body. Pure, so the tests can check it without a network call. */
export function buildExtractBody(bytes: ArrayBuffer, mime: string, model: string): string | null {
  const normalized = (mime || '').split(';')[0].trim().toLowerCase();
  const base64 = Buffer.from(bytes).toString('base64');
  let content: unknown[];
  if (normalized === 'application/pdf') {
    content = [{ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: base64 } }];
  } else if (normalized === 'image/png' || normalized === 'image/jpeg' || normalized === 'image/webp' || normalized === 'image/gif') {
    content = [{ type: 'image', source: { type: 'base64', media_type: normalized, data: base64 } }];
  } else {
    return null;
  }
  return JSON.stringify({
    model,
    max_tokens: 400,
    system: SYSTEM,
    tools: [EXTRACT_TOOL],
    tool_choice: { type: 'tool', name: 'record_invoice' },
    messages: [{ role: 'user', content: [...content, { type: 'text', text: 'Record the fields on this invoice.' }] }],
  });
}

/** Read one invoice. Returns an expense row, or null if the file or the read is not usable. */
export async function extractInvoice(
  bytes: ArrayBuffer,
  mime: string,
  call?: ExtractCaller,
): Promise<ExpenseItem | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key && !call) return null;
  const model = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-5';
  const body = buildExtractBody(bytes, mime, model);
  if (!body) return null;

  let data: unknown;
  try {
    if (call) {
      data = await call(body);
    } else {
      const res = await anthropicMessages({
        method: 'POST',
        signal: AbortSignal.timeout(30_000),
        headers: { 'x-api-key': key as string, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body,
      });
      if (!res.ok) return null;
      data = await res.json();
      recordAiUsage('vision', model, data as Parameters<typeof recordAiUsage>[2]);
    }
  } catch {
    return null;
  }

  const blocks = (data as { content?: Array<{ type: string; name?: string; input?: unknown }> } | null)?.content ?? [];
  const tool = blocks.find((b) => b.type === 'tool_use' && b.name === 'record_invoice');
  const fields = validateExtract(tool?.input);
  if (!fields) return null;
  return {
    date: fields.date,
    supplier: fields.supplier,
    invoiceNo: fields.invoiceNo,
    amount: fields.amount,
    summary: fields.summary,
    kind: fields.kind,
  };
}

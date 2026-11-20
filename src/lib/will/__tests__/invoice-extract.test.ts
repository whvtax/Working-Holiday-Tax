import { validateExtract, buildExtractBody, extractInvoice } from '../invoice-extract';

const bytes = new Uint8Array([137, 80, 78, 71]).buffer;
const toolReply = (input: unknown) => ({ content: [{ type: 'tool_use', name: 'record_invoice', input }] });

describe('validateExtract', () => {
  it('accepts a complete, plausible read', () => {
    expect(validateExtract({ date: '2025-08-01', supplier: 'Shell', invoiceNo: 'A1', amount: 60, summary: 'Fuel', kind: 'expense' })).toEqual({
      date: '2025-08-01', supplier: 'Shell', invoiceNo: 'A1', amount: 60, summary: 'Fuel', kind: 'expense',
    });
  });
  it('rejects a missing date, supplier or amount', () => {
    expect(validateExtract({ date: null, supplier: 'Shell', amount: 60 })).toBeNull();
    expect(validateExtract({ date: '2025-08-01', supplier: '', amount: 60 })).toBeNull();
    expect(validateExtract({ date: '2025-08-01', supplier: 'Shell', amount: null })).toBeNull();
  });
  it('rejects a negative, non-finite or string amount', () => {
    expect(validateExtract({ date: '2025-08-01', supplier: 'Shell', amount: -5 })).toBeNull();
    expect(validateExtract({ date: '2025-08-01', supplier: 'Shell', amount: Number.NaN })).toBeNull();
    expect(validateExtract({ date: '2025-08-01', supplier: 'Shell', amount: '60' })).toBeNull();
  });
  it('rejects a read with no kind', () => {
    expect(validateExtract({ date: '2025-08-01', supplier: 'Shell', amount: 60, kind: null })).toBeNull();
  });
  it('rejects a date in the wrong format', () => {
    expect(validateExtract({ date: '01/08/2025', supplier: 'Shell', amount: 60 })).toBeNull();
  });
});

describe('buildExtractBody', () => {
  it('forces the record_invoice tool and sends an image as an image block', () => {
    const body = JSON.parse(buildExtractBody(bytes, 'image/png', 'm') as string);
    expect(body.tool_choice).toEqual({ type: 'tool', name: 'record_invoice' });
    expect(body.messages[0].content[0].type).toBe('image');
  });
  it('sends a PDF as a document block', () => {
    const body = JSON.parse(buildExtractBody(bytes, 'application/pdf', 'm') as string);
    expect(body.messages[0].content[0].type).toBe('document');
  });
  it('returns null for an unsupported type', () => {
    expect(buildExtractBody(bytes, 'text/plain', 'm')).toBeNull();
  });
});

describe('extractInvoice', () => {
  it('returns an expense row from a valid tool reply', async () => {
    const call = jest.fn(async () => toolReply({ date: '2025-08-01', supplier: 'Shell', invoiceNo: null, amount: 60, summary: 'Fuel', kind: 'expense' }));
    const row = await extractInvoice(bytes, 'image/png', call);
    expect(row).toEqual({ date: '2025-08-01', supplier: 'Shell', invoiceNo: undefined, amount: 60, summary: 'Fuel', kind: 'expense' });
  });
  it('returns null when the model reply is not usable', async () => {
    const call = async () => toolReply({ date: null, supplier: 'Shell', amount: 60, kind: 'expense' });
    expect(await extractInvoice(bytes, 'image/png', call)).toBeNull();
  });
  it('returns null when the call throws', async () => {
    const call = async () => { throw new Error('network'); };
    expect(await extractInvoice(bytes, 'image/png', call)).toBeNull();
  });
  it('returns null for an unsupported file without calling the model', async () => {
    const call = jest.fn(async () => toolReply({}));
    expect(await extractInvoice(bytes, 'text/plain', call)).toBeNull();
    expect(call).not.toHaveBeenCalled();
  });
});

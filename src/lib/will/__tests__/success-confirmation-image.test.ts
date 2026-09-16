/**
 * assessSuccessConfirmationImage: does an attachment show that something the
 * customer applied for/submitted went through successfully? (Jo, 15 Sep —
 * real case: a Medicare Entitlement Statement "Success" screenshot opened a
 * generic "paid customer sent a file" task that needed no human review at
 * all.) Pure function, tested directly against a mocked fetch, mirroring how
 * its sibling assessPaymentProofImage is shaped.
 */
const realFetch = global.fetch;

function mockAssessResponse(input: Record<string, unknown>) {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ content: [{ type: 'tool_use', name: 'assess', input }] }),
  }) as unknown as typeof fetch;
}

beforeEach(() => {
  process.env.ANTHROPIC_API_KEY = 'test-key';
});

afterEach(() => {
  global.fetch = realFetch;
  jest.resetModules();
});

describe('assessSuccessConfirmationImage', () => {
  it('is true for a clear submission-success screenshot', async () => {
    mockAssessResponse({ is_confirmation: true, reason: 'Shows "Success" with an MES application ID.' });
    const { assessSuccessConfirmationImage } = await import('@/lib/will/claude');
    const r = await assessSuccessConfirmationImage(new ArrayBuffer(8), 'image/jpeg');
    expect(r.isConfirmation).toBe(true);
    expect(r.reason).toMatch(/Success/);
  });

  it('is false for an error/failure screenshot', async () => {
    mockAssessResponse({ is_confirmation: false, reason: 'Shows an error message, not a success.' });
    const { assessSuccessConfirmationImage } = await import('@/lib/will/claude');
    const r = await assessSuccessConfirmationImage(new ArrayBuffer(8), 'image/jpeg');
    expect(r.isConfirmation).toBe(false);
  });

  it('is false for an unrelated document (never guesses yes)', async () => {
    mockAssessResponse({ is_confirmation: false, reason: 'This is an invoice, not a confirmation.' });
    const { assessSuccessConfirmationImage } = await import('@/lib/will/claude');
    const r = await assessSuccessConfirmationImage(new ArrayBuffer(8), 'image/jpeg');
    expect(r.isConfirmation).toBe(false);
  });

  it('is false, never throws, with no API key configured', async () => {
    delete process.env.ANTHROPIC_API_KEY;
    const { assessSuccessConfirmationImage } = await import('@/lib/will/claude');
    const r = await assessSuccessConfirmationImage(new ArrayBuffer(8), 'image/jpeg');
    expect(r.isConfirmation).toBe(false);
    expect(r.reason).toMatch(/no API key/i);
  });

  it('is false, never throws, on an unsupported file type', async () => {
    const { assessSuccessConfirmationImage } = await import('@/lib/will/claude');
    const r = await assessSuccessConfirmationImage(new ArrayBuffer(8), 'audio/ogg');
    expect(r.isConfirmation).toBe(false);
    expect(r.reason).toMatch(/unsupported file type/i);
  });

  it('is false, never throws, when the API call itself fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 }) as unknown as typeof fetch;
    const { assessSuccessConfirmationImage } = await import('@/lib/will/claude');
    const r = await assessSuccessConfirmationImage(new ArrayBuffer(8), 'image/jpeg');
    expect(r.isConfirmation).toBe(false);
    expect(r.reason).toMatch(/vision check failed/i);
  });

  it('is false, never throws, on a network error', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('network down')) as unknown as typeof fetch;
    const { assessSuccessConfirmationImage } = await import('@/lib/will/claude');
    const r = await assessSuccessConfirmationImage(new ArrayBuffer(8), 'image/jpeg');
    expect(r.isConfirmation).toBe(false);
    expect(r.reason).toMatch(/network down/);
  });

  it('is false when the model returns no usable assessment', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ content: [] }) }) as unknown as typeof fetch;
    const { assessSuccessConfirmationImage } = await import('@/lib/will/claude');
    const r = await assessSuccessConfirmationImage(new ArrayBuffer(8), 'image/jpeg');
    expect(r.isConfirmation).toBe(false);
    expect(r.reason).toMatch(/no assessment/i);
  });

  it('also accepts a PDF attachment', async () => {
    mockAssessResponse({ is_confirmation: true, reason: 'A PDF confirmation letter.' });
    const { assessSuccessConfirmationImage } = await import('@/lib/will/claude');
    const r = await assessSuccessConfirmationImage(new ArrayBuffer(8), 'application/pdf');
    expect(r.isConfirmation).toBe(true);
  });
});

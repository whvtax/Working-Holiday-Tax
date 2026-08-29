/**
 * Uploading the expense receipts from inside the form.
 *
 * WHY THIS FILE EXISTS. This feature was built once before and taken out again,
 * and the code still carries the scars: a file-name collision fix whose comment
 * reads "the tax form may upload 20+ files in parallel with retries", and an
 * upload rate limit whose comment said 100 while the code passed 40. Twelve
 * files with three retries each is 36 requests, so a normal submission with a
 * couple of dropped connections went over the ceiling, every further upload
 * came back 429, and the whole form failed. It failed WORST for the customers
 * with the most receipts.
 *
 * So the three things pinned here are the three things that went wrong:
 *   1. receipts upload ONE AT A TIME, never in parallel,
 *   2. a receipt that fails NEVER fails the submission,
 *   3. the ones that failed are named, so they can be asked for.
 */
const fetchMock = jest.fn();
global.fetch = fetchMock as unknown as typeof fetch;

jest.mock('@/lib/compress-image', () => ({
  compressImage: (f: File) => Promise.resolve(f),
  MAX_UPLOAD_BYTES: 10 * 1024 * 1024,
}));

import { submitTaxForm, MAX_INVOICES, TaxFormPayload } from '@/lib/submit-tax-form';

const file = (name: string) => new File(['x'], name, { type: 'image/jpeg' });

const payload = (invoices: File[]): TaxFormPayload => ({
  waNumber: '+61 412 345 678', auPhone: '0412 345 678',
  fullName: 'Test', lastName: 'Person', address: '12 Smith St', email: 't@example.com',
  country: 'United Kingdom', dob: '1998-05-20', marital: 'Single', hasMedicare: 'no',
  tfn: '123456782', primaryJob: 'Barista', hasExpenses: 'yes',
  taxYears: ['2025-26'], howHeard: 'Instagram', refCode: '', declared: 'yes',
  bankStatement: file('bank.pdf'), selfiePassport: file('selfie.jpg'),
  invoices,
});

/** Every upload succeeds; the final POST succeeds. */
function happyPath() {
  fetchMock.mockImplementation((url: string) => {
    if (String(url).includes('/api/tax-form/upload')) {
      const kind = String(url).match(/kind=(\w+)/)?.[1] ?? '?';
      const nameParam = decodeURIComponent(String(url).match(/filename=([^&]*)/)?.[1] ?? '');
      // Mirrors the folder mapping in api/tax-form/upload/route.ts, so this
      // test would notice if the two ever stopped agreeing.
      const folder = kind === 'bank' ? 'bank' : kind === 'selfie' ? 'selfie' : 'invoices';
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ok: true, url: `https://s.supabase.co/storage/v1/object/public/uploads/tax-form/${folder}/${nameParam}` }),
      });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) });
  });
}

/** The FormData that reached /api/tax-form. */
const submittedBody = (): FormData =>
  fetchMock.mock.calls.find((c) => String(c[0]) === '/api/tax-form')![1].body as FormData;

beforeEach(() => { fetchMock.mockReset(); });

describe('the receipts reach the CRM', () => {
  it('uploads each one and sends every URL', async () => {
    happyPath();
    const r = await submitTaxForm(payload([file('coles.jpg'), file('fuel.jpg')]), 'whm', 'en');
    expect(r.ok).toBe(true);
    const urls = JSON.parse(submittedBody().get('invoiceUrls') as string);
    // Two identity documents, then the two receipts, in that order.
    expect(urls).toHaveLength(4);
    expect(urls[0]).toContain('/tax-form/bank/');
    expect(urls[1]).toContain('/tax-form/selfie/');
    expect(urls[2]).toContain('/tax-form/invoices/');
    expect(urls[3]).toContain('/tax-form/invoices/');
  });

  it('labels each upload so the CRM can tell them apart', async () => {
    // The kind is what the CRM reads to print "Bank statement:" instead of a
    // flat list of filenames.
    happyPath();
    await submitTaxForm(payload([file('coles.jpg')]), 'whm', 'en');
    const kinds = fetchMock.mock.calls
      .map((c) => String(c[0]))
      .filter((u) => u.includes('/upload'))
      .map((u) => u.match(/kind=(\w+)/)?.[1]);
    expect(kinds).toEqual(['bank', 'selfie', 'invoice']);
  });

  it('never uploads two at once', async () => {
    // THE bug from last time. Each request must have resolved before the next
    // one is issued, or the rate limit and the storage keys collide again.
    let inFlight = 0;
    let maxInFlight = 0;
    fetchMock.mockImplementation((url: string) => {
      if (!String(url).includes('/upload')) return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) });
      inFlight++; maxInFlight = Math.max(maxInFlight, inFlight);
      return new Promise((resolve) => setTimeout(() => {
        inFlight--;
        resolve({ ok: true, json: () => Promise.resolve({ ok: true, url: 'https://s.supabase.co/storage/v1/object/public/uploads/tax-form/invoices/x.jpg' }) });
      }, 5));
    });
    await submitTaxForm(payload([file('a.jpg'), file('b.jpg'), file('c.jpg')]), 'whm', 'en');
    expect(maxInFlight).toBe(1);
  });

  it('caps at ten however many were somehow supplied', async () => {
    happyPath();
    const many = Array.from({ length: 25 }, (_, i) => file(`r${i}.jpg`));
    await submitTaxForm(payload(many), 'whm', 'en');
    const uploads = fetchMock.mock.calls.filter((c) => String(c[0]).includes('kind=invoice'));
    expect(uploads).toHaveLength(MAX_INVOICES);
  });
});

describe('a receipt that fails must not cost the whole submission', () => {
  it('submits anyway and names what did not upload', async () => {
    // The heart of it. Losing a form that already carries a TFN, an address and
    // two identity documents, because one blurry petrol receipt timed out on
    // hostel wifi, is a lead thrown away over a few dollars of deduction.
    fetchMock.mockImplementation((url: string) => {
      const u = String(url);
      if (u.includes('filename=fuel.jpg')) return Promise.resolve({ ok: false, json: () => Promise.resolve({ error: 'Upload failed' }) });
      if (u.includes('/upload')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true, url: 'https://s.supabase.co/storage/v1/object/public/uploads/tax-form/invoices/x.jpg' }) });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) });
    });

    const r = await submitTaxForm(payload([file('coles.jpg'), file('fuel.jpg')]), 'whm', 'en');
    expect(r.ok).toBe(true);
    const body = submittedBody();
    expect(JSON.parse(body.get('invoiceFailures') as string)).toEqual(['fuel.jpg']);
    // The one that worked is still there.
    expect(JSON.parse(body.get('invoiceUrls') as string).length).toBe(3);
  });

  it('sends nothing about failures when there are none', async () => {
    happyPath();
    await submitTaxForm(payload([file('coles.jpg')]), 'whm', 'en');
    expect(submittedBody().get('invoiceFailures')).toBeNull();
  });

  it('still aborts when an IDENTITY document fails', async () => {
    // The opposite rule, and it must not have been loosened by any of the
    // above: without the bank statement there is no job to do.
    fetchMock.mockImplementation((url: string) => {
      const u = String(url);
      if (u.includes('kind=bank')) return Promise.resolve({ ok: false, json: () => Promise.resolve({ error: 'Upload failed' }) });
      if (u.includes('/upload')) return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true, url: 'https://s/x.jpg' }) });
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ ok: true }) });
    });
    const r = await submitTaxForm(payload([file('coles.jpg')]), 'whm', 'en');
    expect(r.ok).toBe(false);
    // And nothing was posted to the form endpoint at all.
    expect(fetchMock.mock.calls.some((c) => String(c[0]) === '/api/tax-form')).toBe(false);
  });
});

describe('no receipts at all', () => {
  it('is the normal case and changes nothing', async () => {
    happyPath();
    const r = await submitTaxForm(payload([]), 'whm', 'en');
    expect(r.ok).toBe(true);
    expect(JSON.parse(submittedBody().get('invoiceUrls') as string)).toHaveLength(2);
    expect(submittedBody().get('invoiceFailures')).toBeNull();
  });
});

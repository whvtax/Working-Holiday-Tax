/**
 * 30 Oct 2026 (2): a PDF or other document sent as the receipt must lead to the
 * form link even when the check cannot read it; and a voice note or sticker gets
 * "Could you send that as a text message?" instead of a handoff.
 * No production data.
 */
const customer: Record<string, unknown> = { id: 'c1', waId: '61400000001', name: 'Alex', paid: false, state: 'PRICE_SENT', optedOut: false, aiPaused: false, isLegacy: false, lang: 'en' };
const addMessage = jest.fn().mockResolvedValue({ id: 'msg1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const setState = jest.fn().mockImplementation((_id: string, to: string) => { customer.state = to; if (to === 'PAID') customer.paid = true; return Promise.resolve(true); });
const settings: Record<string, unknown> = {};
const getSetting = jest.fn().mockImplementation((k: string) => Promise.resolve(settings[k]));
const setSetting = jest.fn().mockImplementation((k: string, v: unknown) => { settings[k] = v; return Promise.resolve(); });
const audit = jest.fn().mockResolvedValue(undefined);
const addJob = jest.fn().mockResolvedValue({ id: 'j1' });
const bumpCounter = jest.fn().mockResolvedValue(false);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(() => Promise.resolve(customer)),
    getCustomerById: jest.fn().mockImplementation(() => Promise.resolve(customer)),
    addMessage, addTask, setState, getSetting, setSetting, audit,
    addJob: (...a: unknown[]) => addJob(...a),
    bumpCounter: (...a: unknown[]) => bumpCounter(...a),
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    listTemplates: jest.fn().mockResolvedValue([]),
    listMessages: jest.fn().mockResolvedValue([]),
    findOpenTaskForCustomer: jest.fn().mockResolvedValue(null),
    cancelJobsFor: jest.fn().mockResolvedValue(undefined),
    listJobsForCustomer: jest.fn().mockResolvedValue([]),
  }),
}));

const fetchWaMedia = jest.fn();
const deliverOut = jest.fn().mockResolvedValue({ ok: true });
jest.mock('@/lib/will/channel', () => ({
  fetchWaMedia: (...a: unknown[]) => fetchWaMedia(...a),
  deliverOut: (...a: unknown[]) => deliverOut(...a),
}));
const assessPaymentProofImage = jest.fn();
jest.mock('@/lib/will/claude', () => ({ assessPaymentProofImage: (...a: unknown[]) => assessPaymentProofImage(...a) }));
const reconcileSchedule = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: (...a: unknown[]) => reconcileSchedule(...a) }));

import { handlePaymentProofMedia, handleInboundNote } from '@/lib/will/service';
import { checkWasUndecided, isDocumentLikeProof } from '@/lib/will/payment-proof';

const pdf = { id: 'm1', kind: 'document', mime: 'application/pdf', filename: 'receipt.pdf' };
const queued = () => addMessage.mock.calls.filter((c) => c[0].status === 'QUEUED' && c[0].meta?.paymentConfirmation === true).map((c) => c[0]);

beforeEach(() => {
  for (const f of [addMessage, addTask, setState, audit, addJob, deliverOut, fetchWaMedia, assessPaymentProofImage]) f.mockClear();
  for (const k of Object.keys(settings)) delete settings[k];
  settings.ai_mode = 'FULL_AUTO';
  Object.assign(customer, { state: 'PRICE_SENT', paid: false, optedOut: false, aiPaused: false, isLegacy: false, lang: 'en' });
  fetchWaMedia.mockResolvedValue({ ok: true, body: new ArrayBuffer(4), mime: 'application/pdf' });
  assessPaymentProofImage.mockResolvedValue({ isProof: true, reason: 'bank transfer', details: { amountAud: 220, recipient: 'The Accounting Academy', recipientIsUs: 'yes', status: 'completed' } });
  bumpCounter.mockResolvedValue(false);
});

describe('a PDF receipt goes through the same check', () => {
  it('verified: Paid, the confirmation with the form link is queued, no verify task', async () => {
    await handlePaymentProofMedia('61400000001', '📄 [Document: receipt.pdf]', { media: pdf });
    expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(queued()).toHaveLength(1);
    expect(queued()[0].body).toMatch(/^Payment received/);
    expect(queued()[0].body).toContain('workingholidaytax.com.au/');
    expect(assessPaymentProofImage).toHaveBeenCalledWith(expect.anything(), 'application/pdf');
    expect(addTask).not.toHaveBeenCalled();
  });

  it.each([
    ['the check could not decide', { isProof: false, reason: 'vision check failed (529)' }],
    ['an unreadable file type', { isProof: false, reason: 'unsupported file type for verification (application/vnd.openxmlformats-officedocument.wordprocessingml.document)' }],
    ['the model was unreachable', { isProof: false, reason: 'vision check unreachable' }],
  ])('%s: the form link is sent anyway and Jo is asked to verify', async (_n, verdict) => {
    assessPaymentProofImage.mockResolvedValue(verdict);
    await handlePaymentProofMedia('61400000001', '📄 [Document: receipt.pdf]', { media: pdf });
    expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(queued()).toHaveLength(1);
    expect(queued()[0].body).toContain('workingholidaytax.com.au/');
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(addTask.mock.calls[0][0].reason).toMatch(/could not be read/);
    expect(addTask.mock.calls[0][0].reason).toMatch(/check the amount/);
  });

  it('the file cannot be downloaded: still the form link, still a task', async () => {
    fetchWaMedia.mockResolvedValue({ ok: false, status: 502, error: 'download failed (500)' });
    await handlePaymentProofMedia('61400000001', '📄 [Document]', { media: pdf });
    expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(queued()).toHaveLength(1);
    expect(addTask).toHaveBeenCalledTimes(1);
  });

  it('the daily budget is spent: a document is still not dropped', async () => {
    bumpCounter.mockResolvedValue(true);
    await handlePaymentProofMedia('61400000001', '📄 [Document]', { media: pdf });
    expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
    expect(queued()).toHaveLength(1);
  });

  it('a document the check READ and said is not a payment (a payslip) is not treated as one', async () => {
    assessPaymentProofImage.mockResolvedValue({ isProof: false, reason: 'This is a payslip showing wages received.' });
    const r = await handlePaymentProofMedia('61400000001', '📄 [Document: payslip.pdf]', { media: pdf });
    expect(r).toBeNull();
    expect(setState).not.toHaveBeenCalled();
    expect(queued()).toHaveLength(0);
  });

  it('a PHOTO the check could not decide is still not trusted (documents only)', async () => {
    assessPaymentProofImage.mockResolvedValue({ isProof: false, reason: 'vision check failed (529)' });
    const r = await handlePaymentProofMedia('61400000001', '📷 [Photo]', { media: { id: 'm2', kind: 'image', mime: 'image/jpeg' } });
    expect(r).toBeNull();
    expect(setState).not.toHaveBeenCalled();
  });

  it('only while a price is outstanding: a lead with no price yet is not moved on an unreadable document', async () => {
    customer.state = 'NEW_LEAD';
    assessPaymentProofImage.mockResolvedValue({ isProof: false, reason: 'vision check failed (529)' });
    const r = await handlePaymentProofMedia('61400000001', '📄 [Document]', { media: pdf });
    expect(r).toBeNull();
    expect(setState).not.toHaveBeenCalled();
  });

  it('3. a VERIFIED proof from NEW_LEAD or QUALIFIED reaches Paid', async () => {
    for (const state of ['NEW_LEAD', 'QUALIFIED']) {
      setState.mockClear(); addMessage.mockClear();
      Object.assign(customer, { state, paid: false });
      await handlePaymentProofMedia('61400000001', '📄 [Document]', { media: pdf });
      expect(setState).toHaveBeenCalledWith('c1', 'PAID', 'SYSTEM');
      expect(queued()).toHaveLength(1);
    }
  });

  it('the confirmation always carries the form link (a Library row without it is not used)', async () => {
    const { paymentReceivedBody } = await import('@/lib/will/service');
    const store = { listTemplates: jest.fn().mockResolvedValue([{ key: 'payment_received', body: 'Payment received. The team will message you.' }]) };
    const body = await paymentReceivedBody(store as never, 'en');
    expect(body).toContain('workingholidaytax.com.au/');
    const withBrokenLink = { listTemplates: jest.fn().mockResolvedValue([{ key: 'payment_received', body: 'Payment received.\n\nhttps://workingholidaytax.com/tax-form' }]) };
    expect(await paymentReceivedBody(withBrokenLink as never, 'en')).toContain('https://workingholidaytax.com.au/start');
  });
});

describe('helpers', () => {
  it('checkWasUndecided matches failures, not model verdicts', () => {
    expect(checkWasUndecided('vision check failed (500)')).toBe(true);
    expect(checkWasUndecided('no API key configured')).toBe(true);
    expect(checkWasUndecided('This is a payslip, vision check says no')).toBe(false);
    expect(checkWasUndecided(undefined)).toBe(false);
  });
  it('isDocumentLikeProof', () => {
    expect(isDocumentLikeProof({ kind: 'document' })).toBe(true);
    expect(isDocumentLikeProof({ kind: 'image', mime: 'application/pdf' })).toBe(true);
    expect(isDocumentLikeProof({ kind: 'image', mime: 'image/jpeg' })).toBe(false);
    expect(isDocumentLikeProof({ kind: 'image', mime: 'image/png', filename: 'x.png' })).toBe(false);
  });
});

describe('2. voice notes, stickers and 131051: one line, no handoff', () => {
  const voice = { id: 'v1', kind: 'audio', mime: 'audio/ogg' };
  it('Autopilot: Will asks for text in the customer\'s language, no task', async () => {
    customer.lang = 'de';
    await handleInboundNote('61400000001', '🎤 [Voice message]', { media: voice });
    expect(deliverOut).toHaveBeenCalledTimes(1);
    expect(deliverOut.mock.calls[0][1]).toBe('Könntest du das bitte als Textnachricht schicken?');
    expect(addTask).not.toHaveBeenCalled();
  });
  it('a sticker and a bodiless 131051 event are treated the same', async () => {
    await handleInboundNote('61400000001', '💟 [Sticker]', { media: { id: 's1', kind: 'sticker' } });
    expect(deliverOut.mock.calls[0][1]).toBe('Could you send that as a text message?');
    for (const k of Object.keys(settings)) if (k.startsWith('text_only')) delete settings[k];
    deliverOut.mockClear();
    await handleInboundNote('61400000001', '📎 [Message - open WhatsApp to view]', { undecoded: { type: 'unsupported', errorCode: 131051, errorTitle: 'Message type unknown' } });
    expect(deliverOut.mock.calls[0][1]).toBe('Could you send that as a text message?');
    expect(addTask).not.toHaveBeenCalled();
  });
  it('asks once in two hours; a second voice note becomes the ordinary task', async () => {
    await handleInboundNote('61400000001', '🎤 [Voice message]', { media: voice });
    await handleInboundNote('61400000001', '🎤 [Voice message]', { media: voice });
    expect(deliverOut).toHaveBeenCalledTimes(1);
  });
  it('Approval mode: nothing is sent, the task carries the same line as its draft (never "send it again as text")', async () => {
    settings.ai_mode = 'SUPERVISED';
    await handleInboundNote('61400000001', '🎤 [Voice message]', { media: voice });
    expect(deliverOut).not.toHaveBeenCalled();
    const drafted = [...addTask.mock.calls.map((c) => c[0].suggestedReply)];
    expect(JSON.stringify(drafted)).toContain('Could you send that as a text message?');
    expect(JSON.stringify(drafted)).not.toMatch(/again as text/);
  });
  it('a paused chat or an opted-out customer is not messaged', async () => {
    customer.aiPaused = true;
    await handleInboundNote('61400000001', '🎤 [Voice message]', { media: voice });
    expect(deliverOut).not.toHaveBeenCalled();
  });
  it('a paid customer\'s voice note is not acknowledged as documents "got it all"', async () => {
    Object.assign(customer, { state: 'FORM_PENDING', paid: true, aiPaused: true });
    await handleInboundNote('61400000001', '🎤 [Voice message]', { media: voice });
    expect(deliverOut).not.toHaveBeenCalled();
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(addTask.mock.calls[0][0])).toContain('Could you send that as a text message?');
  });
});

/**
 * The same document drop, on the two sides of payment.
 *
 * WHY BOTH DIRECTIONS ARE PINNED HERE. Folding a burst into a count is only
 * safe once the money has landed. Before payment the same photo may BE the
 * payment proof, and it has to keep going down the path that opens it and reads
 * it. So this file asserts the new behaviour AND that it did not leak backwards
 * into the sales states, which is the way this change could quietly cost money.
 *
 * Jo, 28 Aug: "where they send photos after payment only, do not open a huge
 * task with all the photos, but one small task."
 */
const addMessage = jest.fn().mockResolvedValue({ id: 'm1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const findOpenTaskForCustomer = jest.fn().mockResolvedValue(null);
const updateTask = jest.fn().mockResolvedValue(undefined);
const customer: Record<string, unknown> = { id: 'c1', waId: '61400000001', name: 'Gerard', state: 'PAID' };

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockResolvedValue(customer),
    createCustomer: jest.fn().mockResolvedValue(customer),
    addMessage, addTask, findOpenTaskForCustomer, updateTask,
    setState: jest.fn().mockResolvedValue(true),
    audit: jest.fn().mockResolvedValue(undefined),
    listTemplates: jest.fn().mockResolvedValue([]),
  }),
}));

import { handleInboundNote } from '@/lib/will/service';
import { APPROVED } from '@/lib/will/approved-messages';

const pdf = (n: string) => ({ media: { id: n, kind: 'document', mime: 'application/pdf', filename: 'OptusInvoice.pdf' } });

beforeEach(() => {
  addMessage.mockClear(); addTask.mockClear(); updateTask.mockClear();
  findOpenTaskForCustomer.mockClear().mockResolvedValue(null);
  customer.state = 'PAID';
});

describe('a paid customer sending their paperwork', () => {
  it('opens ONE small task whose context is a count, not a list', async () => {
    await handleInboundNote('61400000001', '📄 [Document: OptusInvoice.pdf]', pdf('1'));
    expect(addTask).toHaveBeenCalledTimes(1);
    const task = addTask.mock.calls[0][0];
    expect(task.context).toBe('1 file received after payment.');
    expect(task.reason).toBe('Paid customer sent a file. Nothing to answer, just collect it.');
  });

  it('Gerard: twelve invoices stay one line and one task', async () => {
    let context: string | null = null;
    for (let i = 0; i < 12; i++) {
      // After the first, the task is open, so every later file updates it.
      findOpenTaskForCustomer.mockResolvedValue(context === null ? null : { id: 't1', context, suggestedReply: null });
      await handleInboundNote('61400000001', '📄 [Document: OptusInvoice.pdf]', pdf(String(i)));
      context = context === null
        ? addTask.mock.calls[0][0].context
        : updateTask.mock.calls[updateTask.mock.calls.length - 1][1].context;
    }
    expect(addTask).toHaveBeenCalledTimes(1);
    expect(context).toBe('12 files received after payment.');
    // The line that used to be twelve copies of the filename.
    expect(context).not.toContain('OptusInvoice');
    const last = updateTask.mock.calls[updateTask.mock.calls.length - 1][1];
    expect(last.reason).toBe('Paid customer sent 12 files. Nothing to answer, just collect them.');
  });

  it('proposes the short acknowledgement Jo asked for', async () => {
    await handleInboundNote('61400000001', '📷 [Photo]', { media: { id: '9', kind: 'image' } });
    expect(addTask.mock.calls[0][0].suggestedReply).toBe(APPROVED.handoff.documents_after_payment);
  });

  it('still stores every file in the thread', async () => {
    // Folding is about the TASK. Nothing is dropped from the conversation, and
    // the owner still opens the chat and sees all twelve.
    await handleInboundNote('61400000001', '📷 [Photo]', { media: { id: '1', kind: 'image' } });
    await handleInboundNote('61400000001', '📷 [Photo]', { media: { id: '2', kind: 'image' } });
    expect(addMessage).toHaveBeenCalledTimes(2);
  });

  it('applies from PAID all the way through to LODGED', async () => {
    for (const state of ['FORM_PENDING', 'UNDER_REVIEW', 'SIGNATURE_PENDING', 'LODGED']) {
      customer.state = state;
      addTask.mockClear();
      await handleInboundNote('61400000001', '📷 [Photo]', { media: { id: '1', kind: 'image' } });
      expect(addTask.mock.calls[0][0].context).toBe('1 file received after payment.');
    }
  });
});

describe('the same files BEFORE payment are untouched', () => {
  it('keeps the old task for a customer who has not paid', async () => {
    for (const state of ['NEW_LEAD', 'QUALIFIED', 'PRICE_SENT', 'PAYMENT_PENDING']) {
      customer.state = state;
      addTask.mockClear();
      await handleInboundNote('61400000001', '📷 [Photo]', { media: { id: '1', kind: 'image' } });
      const task = addTask.mock.calls[0][0];
      // A photo here might be the receipt. It stays quoted, and the reason
      // still tells a person to go and look at it.
      expect(task.context).toBe('📷 [Photo]');
      expect(task.reason).toMatch(/Open the chat/);
    }
  });

  it('a voice note is not a document drop, even after payment', async () => {
    // No media descriptor, so there is nothing to collect: somebody has to
    // listen to it.
    customer.state = 'PAID';
    await handleInboundNote('61400000001', '🎤 [Voice message]', {});
    expect(addTask.mock.calls[0][0].reason).toMatch(/voice note/i);
  });
});

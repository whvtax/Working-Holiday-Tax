/**
 * A customer editing a message they already sent.
 *
 * WHAT WAS HAPPENING. When someone corrects a typo, Meta delivers a webhook
 * with `type: 'edit'` and nothing else in it: no text, no media. It fell all
 * the way through to the generic stand-in, so ONE corrected word produced a
 * "📎 [Message - open WhatsApp to view]" bubble in the middle of the thread AND
 * a task for a person to go and look at.
 *
 * Seen twice before it was understood — リョウタ correcting "I work" to
 * "I worked", and Jp correcting "Xeros" to "Xero" — and confirmed when the type
 * itself reached a Decision Log card on 27 Aug. Typo corrections are common,
 * and most of these customers are writing in a second language, so this was a
 * steady drip of phantom bubbles and invented work.
 *
 * WHAT IS PINNED HERE. An edit updates the message it edits and creates nothing
 * — no bubble, no task, no reply. And the honest half: Meta does NOT hand over
 * the new wording, so the stored text must be left exactly as the customer
 * first typed it and merely marked as edited. Replacing it with a guess would
 * corrupt the one record that is supposed to be what they actually said.
 */
const applyEditByProviderId = jest.fn().mockResolvedValue(true);
const addMessage = jest.fn().mockResolvedValue({ id: 'm1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const audit = jest.fn().mockResolvedValue(undefined);

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    applyEditByProviderId, addMessage, addTask, audit,
    getCustomerByWaId: jest.fn().mockResolvedValue({ id: 'c1', waId: '61400000001', state: 'PRICE_SENT' }),
    getSetting: jest.fn().mockResolvedValue(undefined),
    setSetting: jest.fn().mockResolvedValue(undefined),
    isBlockedContact: jest.fn().mockResolvedValue(false),
    claimInboundMessage: jest.fn().mockResolvedValue({ claimed: true, attempt: 1 }),
    releaseInboundClaim: jest.fn().mockResolvedValue(undefined),
  }),
}));

import { isEditMessage, editFrom, applyInboundEdits } from '@/lib/will/inbound-edit';

describe('an edit updates, it does not create', () => {
  const editPayload = (over: Record<string, unknown> = {}) => ({
    id: 'wamid.EDIT', from: '61400000001', type: 'edit',
    context: { id: 'wamid.ORIGINAL' }, ...over,
  });

  beforeEach(() => {
    applyEditByProviderId.mockClear().mockResolvedValue(true);
    addMessage.mockClear(); addTask.mockClear(); audit.mockClear();
  });

  it('is classified as an edit, not as an unreadable message', () => {
    const m = editPayload();
    expect(isEditMessage(m)).toBe(true);
    const e = editFrom(m);
    expect(e.targetProviderId).toBe('wamid.ORIGINAL');
    // Meta sends no wording. Null, never an invented string.
    expect(e.newText).toBeNull();
  });

  it('marks the original as edited WITHOUT replacing its text', async () => {
    await applyInboundEdits([{ messageId: 'wamid.EDIT', from: '61400000001', edit: editFrom(editPayload()) }]);
    expect(applyEditByProviderId).toHaveBeenCalledWith('wamid.ORIGINAL', null);
    // The two things that used to happen and must not.
    expect(addMessage).not.toHaveBeenCalled();
    expect(addTask).not.toHaveBeenCalled();
  });

  it('uses the new wording IF Meta ever starts sending it', async () => {
    // Not today's behaviour. Pinned so that the day it changes, the text lands
    // in the chat instead of being silently discarded.
    const e = editFrom(editPayload({ text: { body: 'uploading to Xero correct?' } }));
    expect(e.newText).toBe('uploading to Xero correct?');
    await applyInboundEdits([{ edit: e }]);
    expect(applyEditByProviderId).toHaveBeenCalledWith('wamid.ORIGINAL', 'uploading to Xero correct?');
  });

  it('does nothing at all when there is no message to attach it to', async () => {
    // Guessing a target would rewrite the wrong message in someone's history.
    const e = editFrom(editPayload({ context: undefined }));
    expect(e.targetProviderId).toBeNull();
    await applyInboundEdits([{ edit: e }]);
    expect(applyEditByProviderId).not.toHaveBeenCalled();
    expect(addMessage).not.toHaveBeenCalled();
    expect(addTask).not.toHaveBeenCalled();
  });

  it('never fails the delivery when the store throws', async () => {
    applyEditByProviderId.mockRejectedValue(new Error('db down'));
    await expect(applyInboundEdits([{ edit: editFrom(editPayload()) }])).resolves.toBeUndefined();
  });

  it('leaves ordinary messages alone', () => {
    // A REPLY also carries `context`, so context alone must never be read as an
    // edit — only the type may decide that.
    expect(isEditMessage({
      id: 'wamid.REPLY', from: '61400000001', type: 'text',
      context: { id: 'wamid.ORIGINAL' }, text: { body: 'yes that one' },
    })).toBe(false);
  });
});

/**
 * Audit 3, lane core, finding 74 (5 Sep): the CRM Done card's "Send for
 * Signature" vs "Mark Lodged" choice used to come from scanning every OUT
 * message for /tax return is ready/i. A PENDING_APPROVAL or DISCARDED draft
 * containing those words flipped the card early, and editing the Library
 * `signature` wording flipped it back (a second press re-sends the notice
 * and resets the cadence). /api/will/link now reads the same
 * `signature_notice_sent:${id}` setting the follow-up cadence already keys
 * off (scheduler.ts), via signatureNoticeStands, instead of scanning
 * messages.
 */
import { NextRequest } from 'next/server';

const sessionValid = jest.fn().mockResolvedValue(true);
jest.mock('@/lib/will/auth', () => ({ sessionValid: (...a: unknown[]) => sessionValid(...a) }));

const customer = {
  id: 'c1', waId: '61400000001', name: 'Alex', state: 'SIGNATURE_PENDING',
  paid: false, estimatedRefundCents: 123400, lang: null,
};
const findCustomerByPhone = jest.fn().mockResolvedValue(customer);
const listTemplates = jest.fn().mockResolvedValue([]);
const listMessages = jest.fn().mockResolvedValue([
  // A discarded/pending draft containing the phrase: the old regex scan
  // would have flipped the card on this alone.
  { id: 'm1', direction: 'OUT', status: 'DISCARDED', body: 'Hi Alex, your tax return is ready for signature!' },
]);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({ findCustomerByPhone: (...a: unknown[]) => findCustomerByPhone(...a), listTemplates: (...a: unknown[]) => listTemplates(...a), listMessages: (...a: unknown[]) => listMessages(...a) }),
}));

const signatureNoticeStands = jest.fn();
jest.mock('@/lib/will/scheduler', () => ({
  signatureNoticeStands: (...a: unknown[]) => signatureNoticeStands(...a),
}));

const { GET } = require('@/app/api/will/link/route');

const makeReq = (phone: string) => new NextRequest(`http://localhost/api/will/link?phone=${encodeURIComponent(phone)}`);

beforeEach(() => {
  sessionValid.mockClear();
  findCustomerByPhone.mockClear();
  signatureNoticeStands.mockReset();
  listMessages.mockClear();
});

describe('/api/will/link signatureReadySent', () => {
  it('does not scan messages at all: a discarded draft containing the phrase does not flip the card', async () => {
    signatureNoticeStands.mockResolvedValue(false);
    const res = await GET(makeReq('61400000001'));
    const json = await res.json();
    expect(json.customer.signatureReadySent).toBe(false);
    expect(listMessages).not.toHaveBeenCalled();
  });

  it('reflects the shared signature_notice_sent marker when it stands', async () => {
    signatureNoticeStands.mockResolvedValue(true);
    const res = await GET(makeReq('61400000001'));
    const json = await res.json();
    expect(json.customer.signatureReadySent).toBe(true);
    expect(signatureNoticeStands).toHaveBeenCalledWith('c1');
  });

  it('a lookup failure still degrades to not-sent (worst case is a re-send, not a stuck card)', async () => {
    signatureNoticeStands.mockRejectedValue(new Error('down'));
    const res = await GET(makeReq('61400000001'));
    const json = await res.json();
    expect(json.ok).toBe(true);
    expect(json.customer.signatureReadySent).toBe(false);
  });
});

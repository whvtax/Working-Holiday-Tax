/**
 * 28 Sep, Laurine (+33 7 81 62 51 43): paid $385, the receipt was read and
 * accepted, and when her questionnaire arrived she got the plain "the team
 * will review everything" acknowledgement instead of the ABN questions. Her
 * income type was still UNKNOWN: it is only inferred from a price message
 * Will himself sent, and she had the bank details from elsewhere. The
 * receipt is the strongest evidence of which service was bought, so the
 * amount read off it sets the income type before the stage moves. ABN
 * invoices on the questionnaire do the same.
 */
const customer = { id: 'c1', waId: '33781625143', name: 'Laurine', paid: false, state: 'PRICE_SENT', optedOut: false, income: 'UNKNOWN', lang: 'en' };
const addMessage = jest.fn().mockResolvedValue({ id: 'msg1' });
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const setState = jest.fn().mockResolvedValue(true);
const getSetting = jest.fn().mockResolvedValue('SUPERVISED');
const audit = jest.fn().mockResolvedValue(undefined);
const updateCustomer = jest.fn().mockResolvedValue(undefined);
jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockResolvedValue(customer),
    getCustomerById: jest.fn().mockResolvedValue(customer),
    addMessage, addTask, setState, getSetting, audit, updateCustomer,
    addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
    setSetting: jest.fn().mockResolvedValue(undefined),
    bumpCounter: jest.fn().mockResolvedValue(false),
  }),
}));
const fetchWaMedia = jest.fn().mockResolvedValue({ ok: true, body: new ArrayBuffer(4), mime: 'image/jpeg' });
jest.mock('@/lib/will/channel', () => ({
  fetchWaMedia: (...a: unknown[]) => fetchWaMedia(...a),
  deliverOut: jest.fn().mockResolvedValue({ ok: true }),
  sendWhatsAppText: jest.fn(), sendWhatsAppTemplate: jest.fn(),
}));
const assessPaymentProofImage = jest.fn();
jest.mock('@/lib/will/claude', () => ({
  assessPaymentProofImage: (...a: unknown[]) => assessPaymentProofImage(...a),
  assessSuccessConfirmationImage: jest.fn(), describeAttachment: jest.fn(), decide: jest.fn(),
}));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));

import { handlePaymentProofMedia } from '@/lib/will/service';
import { incomeFromAmount } from '@/lib/will/payment-proof';

const media = { id: 'm1', kind: 'image', mime: 'image/jpeg' };
const proof = (amountAud: number) => ({
  isProof: true, reason: 'bank transfer confirmation',
  details: { amountAud, recipient: 'The Accounting Academy', recipientIsUs: 'yes', status: 'completed' },
});

beforeEach(() => { jest.clearAllMocks(); customer.income = 'UNKNOWN'; });

it('$385 on the receipt means TFN + ABN', () => {
  expect(incomeFromAmount(385)).toBe('TFN_ABN');
  expect(incomeFromAmount(220)).toBe('TFN');
  expect(incomeFromAmount(150)).toBeNull();
  expect(incomeFromAmount(null)).toBeNull();
});

it('a $385 receipt sets the income type to TFN + ABN before anything moves', async () => {
  assessPaymentProofImage.mockResolvedValue(proof(385));
  await handlePaymentProofMedia('33781625143', '📷 [Photo]', { media });
  expect(updateCustomer).toHaveBeenCalledWith('c1', { income: 'TFN_ABN' });
  expect(audit).toHaveBeenCalledWith('system', 'income_set_from_receipt', expect.objectContaining({ income: 'TFN_ABN', amountAud: 385 }));
});

it('a $220 receipt sets TFN', async () => {
  assessPaymentProofImage.mockResolvedValue(proof(220));
  await handlePaymentProofMedia('33781625143', '📷 [Photo]', { media });
  expect(updateCustomer).toHaveBeenCalledWith('c1', { income: 'TFN' });
});

it('a receipt that could not be read leaves the income type alone', async () => {
  assessPaymentProofImage.mockResolvedValue({ isProof: true, reason: 'bank transfer confirmation' });
  await handlePaymentProofMedia('33781625143', '📷 [Photo]', { media });
  expect(updateCustomer).not.toHaveBeenCalledWith('c1', expect.objectContaining({ income: expect.anything() }));
});

/**
 * Jo, 5 to 6 Nov 2026: Student Visa Tax shares the WhatsApp number Will answers
 * until it has its own. Every SVT site link prefills a message naming "Student
 * Visa Tax". Will must hand those chats to a person (no draft, no auto-reply,
 * no follow-ups), because it only answers as Working Holiday Tax.
 */
const findOpenTaskForCustomer = jest.fn().mockResolvedValue(null);
const addTask = jest.fn().mockResolvedValue({ id: 't1' });
const updateTask = jest.fn().mockResolvedValue(undefined);
const cancelJobsFor = jest.fn().mockResolvedValue(0);
const audit = jest.fn().mockResolvedValue(undefined);
let customer: Record<string, unknown> = {};

jest.mock('@/lib/will/store', () => ({
  getStore: () => ({
    getCustomerByWaId: jest.fn().mockImplementation(async () => ({ ...customer })),
    getCustomerById: jest.fn().mockImplementation(async () => ({ ...customer })),
    createCustomer: jest.fn(),
    addMessage: jest.fn().mockResolvedValue({ id: 'm1' }),
    updateCustomer: jest.fn().mockResolvedValue(undefined),
    findOpenTaskForCustomer, addTask, updateTask, cancelJobsFor, audit,
    getSetting: jest.fn().mockResolvedValue(undefined),
    setSetting: jest.fn().mockResolvedValue(undefined),
    addJob: jest.fn().mockResolvedValue({ id: 'j1' }),
    listMessages: jest.fn().mockResolvedValue([]),
  }),
}));
jest.mock('@/lib/will/knowledge', () => ({ retrieveKnowledge: jest.fn().mockResolvedValue([]) }));
jest.mock('@/lib/will/scheduler', () => ({ reconcileSchedule: jest.fn().mockResolvedValue(undefined) }));
const runEngine = jest.fn();
jest.mock('@/lib/will/engine', () => ({ runEngine: (...a: unknown[]) => runEngine(...a) }));

import { handleIncoming } from '@/lib/will/service';
import { isSvtEnquiry, conversationIsSvt, SVT_ENQUIRY_REASON } from '@/lib/will/svt-enquiry';
import { explainHandoffReason } from '@/lib/will/handoff-reasons';
import { svtWhatsappUrl } from '@/lib/svt/brand-public';
import { UI } from '@/lib/svt/i18n';

beforeEach(() => {
  customer = { id: 'c1', waId: '61400000001', name: 'Lan', paid: false, state: 'LEAD', aiPaused: false, lang: null, botOwned: true, brand: 'wht' };
  findOpenTaskForCustomer.mockClear(); addTask.mockClear(); updateTask.mockClear();
  cancelJobsFor.mockClear(); audit.mockClear(); runEngine.mockClear();
});

describe('recognising an SVT enquiry', () => {
  it('every prefilled SVT site message names Student Visa Tax, in every language', () => {
    for (const loc of ['en', 'zh', 'vi'] as const) {
      expect(isSvtEnquiry(UI[loc].whatsappHello)).toBe(true);
      expect(isSvtEnquiry(UI[loc].whatsappAbout)).toBe(true);
    }
    // Even a message written without the name gets it through the link builder.
    const url = svtWhatsappUrl('Hi, quick question')
    expect(isSvtEnquiry(decodeURIComponent(url.split('text=')[1]))).toBe(true)
    expect(isSvtEnquiry(decodeURIComponent(svtWhatsappUrl().split('text=')[1]))).toBe(true)
  });

  it('ordinary working holiday messages are not caught', () => {
    for (const t of ['Hi, I want to do my tax return', 'working holiday visa 417, can you help?', 'student loan question', 'Hallo, Steuererklärung bitte']) {
      expect(isSvtEnquiry(t)).toBe(false);
    }
  });

  it('a chat stays SVT once the customer has named it', () => {
    expect(conversationIsSvt([{ direction: 'IN', body: 'Hi Student Visa Tax, help please' }, { direction: 'IN', body: 'ok thanks' }])).toBe(true);
    expect(conversationIsSvt([{ direction: 'OUT', body: 'Student Visa Tax' }, { direction: 'IN', body: 'hello' }])).toBe(false);
  });

  it('the handoff card explains it', () => {
    expect(explainHandoffReason(SVT_ENQUIRY_REASON).label).toBe('A Student Visa Tax enquiry');
  });
});

describe('Will hands the chat to a person', () => {
  it('raises a task with no draft and cancels every automated job', async () => {
    const r = await handleIncoming('61400000001', 'Hi Student Visa Tax, I would like help with my tax return.', 'FULL_AUTO');
    expect(addTask).toHaveBeenCalledTimes(1);
    const task = addTask.mock.calls[0][0];
    expect(task.reason).toBe(SVT_ENQUIRY_REASON);
    expect(task.suggestedReply ?? null).toBeNull();
    expect(cancelJobsFor).toHaveBeenCalledWith('c1', expect.arrayContaining(['AUTO_REPLY', 'FOLLOW_UP', 'WINBACK']));
    expect(runEngine).not.toHaveBeenCalled();
    expect(JSON.stringify(r)).toContain('human_task');
  });

  it('does nothing special for a customer already on the SVT number', async () => {
    customer = { ...customer, brand: 'svt' };
    runEngine.mockResolvedValue({ kind: 'human_task', decision: { action: 'human_task', confidence: 1 }, task: { reason: 'x', severity: 'REVIEW' } });
    await handleIncoming('61400000001', 'Hi Student Visa Tax, help', 'SUPERVISED');
    expect(audit).not.toHaveBeenCalledWith('policy_guard', 'svt_enquiry_handoff', expect.anything());
  });
});

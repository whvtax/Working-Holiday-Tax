/**
 * 20 Oct: the 24-hour review. Each case is a real chat from the screenshots.
 *  - a caption that asks a question is not "nothing to answer" (Hannah)
 *  - the billing hold (131042) is retryable, so no URGENT task per customer
 *  - the $300 record-keeping sentence is allowed when the reply already says "records"
 *  - the task view keeps the whole team message, not the first 200 characters
 */
import { hasQuestionOrRequest, isClosingOnly } from '@/lib/will/text-normalize';
import { documentDropReason, foldDocumentDrop } from '@/lib/will/document-drop';
import { policyGuard, GuardContext } from '@/lib/will/policy-guard';
import * as fs from 'fs';
import * as path from 'path';

const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'FORM_COMPLETE', paid: true, aiPaused: false, killSwitch: false, optedOut: false,
  isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, ...over,
});

describe('a file with a question is not paperwork alone', () => {
  it('a question in a caption is detected', () => {
    expect(hasQuestionOrRequest('Kann man das bei der Steuerabrechnung angeben?')).toBe(true);
    expect(hasQuestionOrRequest('Here are my payslips')).toBe(false);
  });
  it('the reason never says "nothing to answer" once a question came with the files', () => {
    const ctxText = foldDocumentDrop('', 'Kann man das bei der Steuerabrechnung angeben?');
    expect(documentDropReason(1, ctxText)).toMatch(/asked something/);
    expect(documentDropReason(1, ctxText)).not.toMatch(/Nothing to answer/);
  });
  it('plain files still get the short collect reason', () => {
    expect(documentDropReason(3, 'They wrote: "here you go"\n3 files received after payment.')).toMatch(/Nothing to answer/);
  });
});

describe('thank-you still counts as closing after a topic word', () => {
  it('"Super danke" is closing only', () => {
    expect(isClosingOnly('Super danke')).toBe(true);
  });
});

describe('the $300 record-keeping sentence passes when the reply says "records"', () => {
  it('Lars: records mentioned in the reply, $300 threshold stated', () => {
    const reply = 'Got the income records, thanks!\n\nAnd for the tools and clothes you mentioned (under $300 total): can you send me the bank statement showing those purchases?';
    const v = policyGuard(reply, ctx({ customerText: 'I worked for ABN', customerTextChars: 80 })).violations;
    expect(v.some((x) => x.startsWith('FORBIDDEN_AMOUNT:300'))).toBe(false);
  });
  it('a $300 figure with no record-keeping context still fails', () => {
    const v = policyGuard('Your refund will be $300 for the year.', ctx()).violations;
    expect(v.some((x) => x.startsWith('FORBIDDEN_AMOUNT:300'))).toBe(true);
  });
});

describe('the webhook keeps the whole team message in the task', () => {
  it('no 200-character cut in the delivery and task paths', () => {
    const src = fs.readFileSync(path.join(__dirname, '../../../app/api/will/webhook/route.ts'), 'utf8');
    expect(src).not.toMatch(/msg\.body\.slice\(0, 200\)/);
  });
  it('error 131042 is retryable at the sender', () => {
    const src = fs.readFileSync(path.join(__dirname, '../channel.ts'), 'utf8');
    expect(src).toMatch(/code === 131042/);
  });
});

describe('the billing fault is explained on the System card', () => {
  it('131042 has a hint and a Do-this sentence', () => {
    const hook = fs.readFileSync(path.join(__dirname, '../../../app/api/will/webhook/route.ts'), 'utf8');
    const card = fs.readFileSync(path.join(__dirname, '../system-report.ts'), 'utf8');
    expect(hook).toMatch(/131042: 'the WhatsApp Business account has unsettled payments/);
    expect(card).toMatch(/Code 131042 means the WhatsApp Business account has unsettled payments/);
  });
});

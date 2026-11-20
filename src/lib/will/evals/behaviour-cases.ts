// Will behaviour evaluation set (Jo, 15 Nov 2026).
// 100 anonymised cases. Each one is a short, paraphrased pattern from the
// 3-month review. No customer names, numbers, e-mails or messages are stored.
// The runner (__tests__/behaviour-evals.test.ts) checks the deterministic
// guards that sit after the model: they must give the same answer every time.
// It does not call the model, so it runs offline.

export const PITCH = 'With our service you only pay for the lodgement, and the fee is $220. Want to start today?';

export type LeavingCase = { id: string; area: 'leaving'; customer: string; reply: string; lang?: string; expectFix: boolean; knownGap?: string };
export type ThanksCase = { id: string; area: 'thanks'; customer: string; expectPure: boolean };
export type ReviewCase = { id: string; area: 'review'; customer: string; refundLanded: boolean; expect: 'leaving' | 'thanks_without_refund' | null };
export type SignatureCase = { id: string; area: 'signature'; violations: string[]; lang: string; expectFix: boolean };
export type DupCase = { id: string; area: 'duplicate'; reply: string; sent: string; expectNear: boolean };
export type EvalCase = LeavingCase | ThanksCase | ReviewCase | SignatureCase | DupCase;

const L = (id: string, customer: string, expectFix: boolean, lang?: string): LeavingCase =>
  ({ id, area: 'leaving', customer, reply: PITCH, lang, expectFix });

export const CASES: EvalCase[] = [
  // Leaving lead, sales reply must be replaced (rule L1): 25 cases
  L('L01', 'thanks but I found someone else', true),
  L('L02', 'went with another agency, thanks', true),
  L('L03', 'I will do it myself this year', true),
  L('L04', 'not interested anymore, cheers', true),
  L('L05', 'decided to lodge it myself', true),
  L('L06', 'no longer need this, thanks', true),
  L('L07', 'my uni already did it for me, thanks', true),
  L('L08', 'we are going another way, sorry', true),
  L('L09', 'I found a cheaper option, bye', true),
  L('L10', 'changed my mind, not going ahead', true),
  L('L11', 'not for me, thanks anyway', true),
  L('L12', 'someone else is helping me, thanks', true),
  L('L13', 'I am leaving the country, no need now', true),
  L('L14', 'I got it sorted already, thank you', true),
  L('L15', 'found another service, thanks for the reply', true),
  L('L16', 'I will handle it on my own', true),
  L('L17', 'do not need it anymore, cheers mate', true),
  L('L18', 'going with a different provider', true),
  L('L19', 'I have decided not to lodge this year', true),
  L('L20', 'no thanks, I am sorted', true),
  L('L21', 'the other firm was cheaper, thanks', true),
  L('L22', 'I will lodge myself using the ATO website', true),
  L('L23', 'thanks, I think I will pass for now', true),
  { ...L('L24', 'ok I am out, thanks for everything', true), knownGap: 'generic "I am out" not matched on purpose; see text-normalize LEAVING_RE' },
  L('L25', 'not going to use a service, thank you', true),
  // Leaving lead, a live customer must not be treated as leaving: 10 cases
  L('L26', 'how much for a TFN only return?', false),
  L('L27', 'what documents do I need to send?', false),
  L('L28', 'I want to lodge for 2024 and 2025', false),
  L('L29', 'is my scholarship taxable?', false),
  L('L30', 'when will I get my refund?', false),
  L('L31', 'can I send my payslips by photo?', false),
  L('L32', 'do I need a TFN to lodge?', false),
  L('L33', 'I am ready to start, what next?', false),
  L('L34', 'please send me the price for ABN income', false),
  L('L35', 'I would like to go ahead today', false),

  // Thank-you only messages (rule R1): 15 cases
  { id: 'T01', area: 'thanks', customer: 'thanks so much!', expectPure: true },
  { id: 'T02', area: 'thanks', customer: 'thank you, that helps a lot', expectPure: true },
  { id: 'T03', area: 'thanks', customer: 'cheers mate', expectPure: true },
  { id: 'T04', area: 'thanks', customer: 'appreciate it', expectPure: true },
  { id: 'T05', area: 'thanks', customer: 'thanks a lot 😊', expectPure: true },
  { id: 'T06', area: 'thanks', customer: 'great, thanks', expectPure: true },
  { id: 'T07', area: 'thanks', customer: 'thank you for your help', expectPure: true },
  { id: 'T08', area: 'thanks', customer: 'thanks, can I also claim my phone?', expectPure: false },
  { id: 'T09', area: 'thanks', customer: 'thanks but I am leaving the country', expectPure: false },
  { id: 'T10', area: 'thanks', customer: 'thanks, when is the due date?', expectPure: false },
  { id: 'T11', area: 'thanks', customer: 'thank you, how long does it take?', expectPure: false },
  { id: 'T12', area: 'thanks', customer: 'ok', expectPure: false },
  { id: 'T13', area: 'thanks', customer: '', expectPure: false },
  { id: 'T14', area: 'thanks', customer: 'my refund arrived, thanks', expectPure: true },
  { id: 'T15', area: 'thanks', customer: 'what is the fee?', expectPure: false },

  // Review ask gate (rule R1): 15 cases
  { id: 'R01', area: 'review', customer: 'thanks!', refundLanded: false, expect: 'thanks_without_refund' },
  { id: 'R02', area: 'review', customer: 'thank you so much', refundLanded: false, expect: 'thanks_without_refund' },
  { id: 'R03', area: 'review', customer: 'thanks, refund arrived', refundLanded: true, expect: null },
  { id: 'R04', area: 'review', customer: 'thanks, got my refund yesterday', refundLanded: true, expect: null },
  { id: 'R05', area: 'review', customer: 'the refund came through, cheers', refundLanded: true, expect: null },
  { id: 'R06', area: 'review', customer: 'thank you, not yet', refundLanded: false, expect: 'thanks_without_refund' },
  { id: 'R07', area: 'review', customer: 'found someone else, thanks', refundLanded: false, expect: 'leaving' },
  { id: 'R08', area: 'review', customer: 'thanks but I am leaving the country', refundLanded: false, expect: 'thanks_without_refund' }, // leaving the country is relocating, not leaving the service (post 15 case)
  { id: 'R09', area: 'review', customer: 'cheers', refundLanded: false, expect: 'thanks_without_refund' },
  { id: 'R10', area: 'review', customer: 'how do I leave a review?', refundLanded: true, expect: null },
  { id: 'R11', area: 'review', customer: 'great service, thanks', refundLanded: true, expect: null },
  { id: 'R12', area: 'review', customer: 'when will the refund land?', refundLanded: false, expect: null },
  { id: 'R13', area: 'review', customer: 'I am done, thank you', refundLanded: false, expect: 'thanks_without_refund' },
  { id: 'R14', area: 'review', customer: 'thanks, I already left a review', refundLanded: true, expect: null },
  { id: 'R15', area: 'review', customer: 'appreciate it', refundLanded: false, expect: 'thanks_without_refund' },

  // Signature-first wording (rule S1 / signature-first): 15 cases
  { id: 'S01', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE'], lang: 'en', expectFix: true },
  { id: 'S02', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE'], lang: 'de', expectFix: true },
  { id: 'S03', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE'], lang: 'ja', expectFix: true },
  { id: 'S04', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE'], lang: 'fr', expectFix: false },
  { id: 'S05', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE', 'FORBIDDEN_AMOUNT'], lang: 'en', expectFix: false },
  { id: 'S06', area: 'signature', violations: ['FORBIDDEN_AMOUNT'], lang: 'en', expectFix: false },
  { id: 'S07', area: 'signature', violations: ['REPLY_TOO_LONG'], lang: 'en', expectFix: false },
  { id: 'S08', area: 'signature', violations: [], lang: 'en', expectFix: false },
  { id: 'S09', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE'], lang: 'en', expectFix: true },
  { id: 'S10', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE'], lang: 'de', expectFix: true },
  { id: 'S11', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE', 'REPLY_TOO_LONG'], lang: 'en', expectFix: false },
  { id: 'S12', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE'], lang: 'ja', expectFix: true },
  { id: 'S13', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE'], lang: 'es', expectFix: false },
  { id: 'S14', area: 'signature', violations: ['LODGEMENT_BEFORE_SIGNATURE'], lang: 'zh', expectFix: false },
  { id: 'S15', area: 'signature', violations: ['FORBIDDEN_AMOUNT', 'REPLY_TOO_LONG'], lang: 'en', expectFix: false },

  // Near-duplicate replies (rule D1, threshold 0.9): 20 cases
  { id: 'D01', area: 'duplicate', reply: 'Happy to help. Send your visa type and we will check.', sent: 'Happy to help. Send your visa type and we will check.', expectNear: true },
  { id: 'D02', area: 'duplicate', reply: 'Thanks! Send your visa type and we will check.', sent: 'Thanks. Send your visa type and we will check!', expectNear: true },
  { id: 'D03', area: 'duplicate', reply: 'Please send your payslips when you can.', sent: 'Please send your payslips when you can.', expectNear: true },
  { id: 'D04', area: 'duplicate', reply: 'Please send your payslips when you can.', sent: 'Your lodgement is booked for next week.', expectNear: false },
  { id: 'D05', area: 'duplicate', reply: 'Your refund depends on your income and tax paid.', sent: 'Your refund depends on your income and tax paid.', expectNear: true },
  { id: 'D06', area: 'duplicate', reply: 'Got it, I will pass this to the team today.', sent: 'Got it, I will pass this to the team today.', expectNear: true },
  { id: 'D07', area: 'duplicate', reply: 'Got it, I will pass this to the team today.', sent: 'Which visa do you hold right now?', expectNear: false },
  { id: 'D08', area: 'duplicate', reply: 'Here is the link to upload your documents.', sent: 'Here is the link to upload your documents.', expectNear: true },
  { id: 'D09', area: 'duplicate', reply: 'Here is the link to upload your documents.', sent: 'Here is the link to book a call.', expectNear: false },
  { id: 'D10', area: 'duplicate', reply: 'No problem at all.', sent: 'No problem at all.', expectNear: true },
  { id: 'D11', area: 'duplicate', reply: 'No problem at all, glad it helped.', sent: 'Glad to hear it, thanks for letting us know.', expectNear: false },
  { id: 'D12', area: 'duplicate', reply: 'Your TFN is needed before we can lodge.', sent: 'Your TFN is needed before we can lodge.', expectNear: true },
  { id: 'D13', area: 'duplicate', reply: 'Your TFN is needed before we can lodge.', sent: 'Your bank statement is needed before we can lodge.', expectNear: false },
  { id: 'D14', area: 'duplicate', reply: 'Sure, I can help with that.', sent: 'Sure, I can help with that!', expectNear: true },
  { id: 'D15', area: 'duplicate', reply: 'Could you tell me your arrival date in Australia?', sent: 'Could you tell me your arrival date?', expectNear: false }, // word overlap 0.78, below the 0.9 threshold by design
  { id: 'D16', area: 'duplicate', reply: 'Could you tell me your arrival date in Australia?', sent: 'What is your ABN income for the year?', expectNear: false },
  { id: 'D17', area: 'duplicate', reply: 'We have received your payment, thank you.', sent: 'We have received your payment, thank you.', expectNear: true },
  { id: 'D18', area: 'duplicate', reply: 'We have received your payment, thank you.', sent: 'Your payment link is below.', expectNear: false },
  { id: 'D19', area: 'duplicate', reply: 'Let me check that for you.', sent: 'Let me check that for you.', expectNear: true },
  { id: 'D20', area: 'duplicate', reply: 'Let me check that for you.', sent: 'Hi there, welcome to the team.', expectNear: false },
];

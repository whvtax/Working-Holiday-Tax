/** Jo, 18 Nov: every bypass the guard review found is now blocked. */
import { policyGuard } from '@/lib/will/policy-guard';

const g = { state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false, lastCustomerMsgAt: new Date() } as unknown as Parameters<typeof policyGuard>[1];
const blocked = (t: string) => expect(policyGuard(t, g).allowed).toBe(false);

describe('bypasses found in review are blocked', () => {
  it.each([
    'Your refund is $385.',
    'Your refund is 1 385 dollars.',
    'Die Gebühr wird zurückerstattet.',
    'Te devolvemos tu dinero.',
    '我们会为您全额退款。',
    'Chúng tôi sẽ hoàn tiền cho bạn.',
    "We'll send the full amount back to you.",
    '你的退税大约是1800。',
    'Phí của bạn là 500.',
    'Hoàn thuế của bạn khoảng 1.800.000đ.',
    'You can file your return yourself through myGov.',
    'You can submit it by yourself.',
    "I'm a computer program.",
    'Runs on GPT-4.',
    'Ich bin ein Computerprogramm.',
    "I'm your registered tax agent.",
    'Our 税务师 will check it.',
    'Notre experte-comptable vérifie votre dossier.',
    'Send a photo of your credit card.',
    'Send your Visa details.',
  ])('blocks: %s', (t) => blocked(t));

  it('a refusal in the same sentence still allows a plain sentence', () => {
    expect(policyGuard('Please do not send your card details by message.', g).allowed).toBe(true);
    expect(policyGuard('Our fee is $220, paid upfront.', g).allowed).toBe(true);
  });
});

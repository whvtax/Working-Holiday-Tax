// Reproduces a false block seen in the export (15 Nov): a paid customer asks whether
// they still owe anything, and Will restates the fee that was paid. The price is not
// new information, so it must not be refused as FORBIDDEN_AMOUNT.
import { policyGuard, type GuardContext } from '../policy-guard';

const base: GuardContext = {
  state: 'SIGNATURE_PENDING' as GuardContext['state'],
  paid: true,
  aiPaused: false,
  killSwitch: false,
  optedOut: false,
  isLegacy: false,
  lastCustomerMsgAt: new Date(),
  isApprovedTemplate: false,
  estimateFromTeam: null,
  customerText: 'So I dont owe anything, no need to pay the invoice? As I have paid it?',
};

describe('paid customer asks whether they still owe money', () => {
  it('does not refuse a restated fee that was already paid', () => {
    const reply = 'You do not owe anything more. The fee you paid was $220, and there is nothing else to pay from us. We will message you once it is lodged.';
    const v = policyGuard(reply, base).violations;
    expect(v.filter((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([]);
  });
});

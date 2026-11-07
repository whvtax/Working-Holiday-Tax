import { policyGuard, GuardContext } from '@/lib/will/policy-guard'
const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'SIGNATURE_PENDING', paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
  lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, ...over,
})
const code = 'LODGEMENT_BEFORE_SIGNATURE'
const v = (text: string, customerText: string) => policyGuard(text, ctx({ customerText })).violations
describe('5 Nov: a customer who says they signed, or asks if it is submitted', () => {
  it('Siiri: "Thank you, all signed."', () => {
    expect(v('Thanks, we have seen it. Our team now does a final check and lodges your return with the ATO. We will message you here as soon as it is lodged.', 'Thank you, all signed.')).not.toContain(code)
  })
  it('Abbie: "I\'ve signed everything, thank you so much! What can I expect now?"', () => {
    expect(v('Thanks, we have seen it. Our team now does a final check and lodges your return with the ATO. We will message you here as soon as it is lodged.', "I've signed everything, thank you so much! What can I expect now?")).not.toContain(code)
  })
  it('GC: "Is it submitted now?" before signing', () => {
    expect(v("Your return has been reviewed and we've sent it to you for signature. Check your email (and spam folder) for the document to sign. Once you've signed it, we'll lodge it straight away.", 'Perfect thankyou\nIs it submitted now?')).not.toContain(code)
  })
  it('still blocks a real claim that it is lodged', () => {
    expect(v('Your return has been lodged.', 'Is it submitted now?')).toContain(code)
  })
})

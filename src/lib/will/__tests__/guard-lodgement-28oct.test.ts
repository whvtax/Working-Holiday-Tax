/** 28 Oct (Jo): "The team will lodge it now and message you here once it's
 *  lodged" went to a customer before the signature message. Lodgement is
 *  announced only once the customer has signed. */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard'
import { APPROVED } from '@/lib/will/approved-messages'

const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'FINAL_REVIEW', paid: true, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
  lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, ...over,
})
const code = 'LODGEMENT_BEFORE_SIGNATURE'
const blocked = (t: string, over: Partial<GuardContext> = {}) => policyGuard(t, ctx(over)).violations.includes(code)

const CLAIMS = [
  "The team will lodge it now and message you here once it's lodged",
  'We will lodge your tax return today.',
  "We've lodged your return.",
  'Your return has been lodged.',
  "I'll submit it to the ATO now.",
  'The team is lodging it now.',
]

describe('no lodgement announcement before the customer has signed', () => {
  it.each(['PAID', 'FORM_COMPLETE', 'UNDER_REVIEW', 'ESTIMATE_READY', 'FINAL_REVIEW', 'SIGNATURE_PENDING'] as const)('blocked in %s', (state) => {
    for (const c of CLAIMS) expect([state, c, blocked(c, { state })]).toEqual([state, c, true])
  })
  it.each(['SIGNED', 'LODGED', 'COMPLETED'] as const)('allowed in %s', (state) => {
    for (const c of CLAIMS) expect(blocked(c, { state })).toBe(false)
  })
  it('ordinary sentences are not caught', () => {
    for (const t of ['Thanks, we got your form.', 'The team is reviewing your details.', 'Once you sign, the team takes it from there.', "After you've signed, we'll lodge your return with the ATO.", "You see and sign it yourself before it's lodged.", 'Once your return is lodged, any refund is usually paid within 14 business days.', "If it's already been lodged, we review it."])
      expect(blocked(t)).toBe(false)
  })
  it('approved templates are unaffected', () => {
    for (const t of [APPROVED.signature_ready, APPROVED.medicare_exemption])
      expect(policyGuard(t, ctx({ isApprovedTemplate: true })).violations).not.toContain(code)
  })
})

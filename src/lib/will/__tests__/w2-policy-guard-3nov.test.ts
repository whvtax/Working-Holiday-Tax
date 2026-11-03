/** 3 Nov wave 2: policy-guard false positives and gaps from the 72h export (synthetic data). */
import { policyGuard, GuardContext } from '@/lib/will/policy-guard'

const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'PRICE_SENT', paid: false, aiPaused: false, killSwitch: false, optedOut: false, isLegacy: false,
  lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, ...over,
})
const v = (t: string, over: Partial<GuardContext> = {}) => policyGuard(t, ctx(over)).violations

describe('LODGEMENT_BEFORE_SIGNATURE when the customer says they signed', () => {
  const sp = { state: 'SIGNATURE_PENDING' as const, paid: true }
  it.each(['I signed it', "I've already signed that now. Thank you.", 'Done, signed'])('future wording passes after "%s"', (c) => {
    expect(v('Thanks, our team does a final check and lodges it.', { ...sp, customerText: c })).not.toContain('LODGEMENT_BEFORE_SIGNATURE')
    expect(v('Thank you! The team will lodge it now and message you here once it is lodged.', { ...sp, customerText: c })).not.toContain('LODGEMENT_BEFORE_SIGNATURE')
  })
  it('"we have lodged it" still blocks before the signature is recorded', () => {
    expect(v("We've lodged your return.", { ...sp, customerText: 'I signed it' })).toContain('LODGEMENT_BEFORE_SIGNATURE')
    expect(v('Your return has been lodged.', { ...sp, customerText: 'I signed it' })).toContain('LODGEMENT_BEFORE_SIGNATURE')
    expect(v('The team is lodging it now.', { ...sp, customerText: 'I signed it' })).toContain('LODGEMENT_BEFORE_SIGNATURE')
  })
  it('without a signed claim the future wording still blocks', () => {
    expect(v('The team will lodge it now.', { ...sp, customerText: 'ok thanks' })).toContain('LODGEMENT_BEFORE_SIGNATURE')
  })
})

describe('dates and small numbers are not money', () => {
  it('"1 July" next to the fee', () => {
    const t = 'The fee for having your return prepared can be claimed, but if you pay the fee before 1 July 2026 it goes in this return.'
    expect(v(t, { paid: true, state: 'PAID' }).filter((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([])
    expect(v('Our fee by July 1 covers it.').filter((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([])
    expect(v('The fee is due on 15 March, fine.').filter((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toEqual([])
  })
  it('a bare price is still caught', () => {
    expect(v('Our fee is only 50 for you.')).toContain('FORBIDDEN_AMOUNT:50.00')
    expect(v('The price is 50 may apply.').some((x) => x.startsWith('FORBIDDEN_AMOUNT'))).toBe(true)
    expect(v('The fee is $50.')).toContain('FORBIDDEN_AMOUNT:50.00')
  })
})

describe('DIY_INSTRUCTIONS negation', () => {
  it("\"you don't need myGov access or to lodge it yourself\" passes", () => {
    expect(v("You don't need myGov access or to lodge it yourself. Once you're a client, we deal with the ATO directly.")).not.toContain('DIY_INSTRUCTIONS')
    expect(v('There is no need to lodge it yourself.')).not.toContain('DIY_INSTRUCTIONS')
  })
  it('real instructions still block', () => {
    expect(v('You can lodge it yourself through myGov.')).toContain('DIY_INSTRUCTIONS')
    expect(v("You don't have to pay now, but you can lodge it yourself.")).toContain('DIY_INSTRUCTIONS')
    expect(v('Do it yourself, step by step.')).toContain('DIY_INSTRUCTIONS')
  })
})

describe('new blocks', () => {
  it('"Yes, absolutely" to the registered tax agent question', () => {
    const c = 'Cheers. Are you guys registered tax agents ?'
    expect(v('Yes, absolutely! We operate under the supervision of a registered tax agent.', { customerText: c })).toContain('AGENT_CLAIM')
    expect(v('We operate under the supervision of a registered tax agent.', { customerText: c })).not.toContain('AGENT_CLAIM')
    expect(v('Yes, absolutely! We will go through all of that.', { customerText: 'Can you check my residency?' })).not.toContain('AGENT_CLAIM')
  })
  it('Medicare levy will apply is a determination, conditional wording is not', () => {
    expect(v('The Medicare levy will apply to you as a working holiday maker.')).toContain('TAX_DETERMINATION')
    expect(v("You'll pay the Medicare levy on your income.")).toContain('TAX_DETERMINATION')
    expect(v('If the application is not approved, the Medicare levy will then be included in your return.')).not.toContain('TAX_DETERMINATION')
  })
  it('retired $110 assessment price', () => {
    expect(v('That is exactly what the $110 assessment goes through with you.')).toContain('RETIRED_PRICE_110_ASSESSMENT')
    expect(v('The $110 assessment fee covers the review.')).toContain('RETIRED_PRICE_110_ASSESSMENT')
    expect(v('A phone consultation is $110.')).not.toContain('RETIRED_PRICE_110_ASSESSMENT')
  })
  it('residency conclusions', () => {
    for (const t of ["Great, you're a Working Holiday Maker for tax, so your answer stays as it is.", 'It looks like you count as a Working Holiday Maker for tax.', 'Your answer stays as it is.'])
      expect(v(t, { state: 'FORM_COMPLETE', paid: true })).toContain('TAX_DETERMINATION')
    expect(v('We check whether you are a Working Holiday Maker for tax as part of the review.')).not.toContain('TAX_DETERMINATION')
  })
})

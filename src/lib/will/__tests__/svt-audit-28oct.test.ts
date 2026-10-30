/** Audit 28 Oct (A01-2, A01-3): approved WHT wording must not describe the
 *  audience as backpackers to students, nor promise to lodge on a screenshot. */
import { rebrandText } from '@/lib/will/brand-voice'
import { APPROVED } from '@/lib/will/approved-messages'

describe('SVT customer text from approved WHT wording', () => {
  it('o10a names students, not working holiday makers or backpackers', () => {
    const out = rebrandText(APPROVED.objections.o10a_why_not_accountant, 'svt')
    expect(out).not.toMatch(/working holiday maker|backpacker/i)
    expect(out).toMatch(/international students/)
  })
  it('the Medicare exemption waits for the statement', () => {
    const out = rebrandText(APPROVED.medicare_exemption, 'svt')
    expect(out).not.toMatch(/screenshot/i)
    expect(out).toMatch(/statement/)
  })
  it('WHT text is untouched', () => {
    expect(rebrandText(APPROVED.objections.o10a_why_not_accountant, 'wht')).toBe(APPROVED.objections.o10a_why_not_accountant)
    expect(rebrandText(APPROVED.medicare_exemption, 'wht')).toBe(APPROVED.medicare_exemption)
  })
})

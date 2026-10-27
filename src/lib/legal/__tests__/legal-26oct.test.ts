/** Jo, 26 Oct: the Client Agreement and the Privacy Policy are the same on
 *  every brand; only the name, domain and contact details change. */
import { clientAgreementSections, privacySections, clientAgreementIntro, agentDisclosure } from '@/lib/legal/legal-text'
import { WHT_LEGAL, SVT_LEGAL } from '@/lib/legal/brands'

const swap = (s: string) => s
  .split(WHT_LEGAL.name).join(SVT_LEGAL.name)
  .split(WHT_LEGAL.domain).join(SVT_LEGAL.domain)
  .split(WHT_LEGAL.email).join(SVT_LEGAL.email)
  .split(WHT_LEGAL.phone).join(SVT_LEGAL.phone)

describe('one legal text for every brand', () => {
  it('Student Visa Tax gets the Working Holiday Tax text with only the name changed', () => {
    expect(JSON.stringify(clientAgreementSections(SVT_LEGAL))).toBe(swap(JSON.stringify(clientAgreementSections(WHT_LEGAL))))
    expect(JSON.stringify(privacySections(SVT_LEGAL))).toBe(swap(JSON.stringify(privacySections(WHT_LEGAL))))
    expect(clientAgreementIntro(SVT_LEGAL)).toBe(swap(clientAgreementIntro(WHT_LEGAL)))
    expect(agentDisclosure(SVT_LEGAL)).toEqual({ lead: swap(agentDisclosure(WHT_LEGAL).lead), agent: agentDisclosure(WHT_LEGAL).agent })
  })
  it('no brand name is left hard-coded in the shared text', () => {
    const all = JSON.stringify([clientAgreementSections(SVT_LEGAL), privacySections(SVT_LEGAL), clientAgreementIntro(SVT_LEGAL)])
    expect(all).not.toMatch(/Working Holiday|workingholidaytax/i)
    expect(all).not.toContain(WHT_LEGAL.phone)
    expect(all).toContain('Student Visa Tax')
    expect(all).toContain('studentvisatax.com.au')
  })
  it('keeps all 26 clauses and all 11 privacy sections', () => {
    expect(clientAgreementSections(WHT_LEGAL)).toHaveLength(26)
    expect(privacySections(WHT_LEGAL)).toHaveLength(11)
  })
})

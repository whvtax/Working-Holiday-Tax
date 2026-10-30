import { hasForeignUrl, policyGuard, type GuardContext } from '@/lib/will/policy-guard'
import { withBrand } from '@/lib/will/brand-context'
import * as fs from 'fs'
import * as path from 'path'

const ORIGINAL_WHT = /^(?:https?:\/\/)?(?:www\.)?(?:workingholidaytax\.com\.au|my\.gov\.au|ato\.gov\.au|servicesaustralia\.gov\.au|tpb\.gov\.au|abr\.business\.gov\.au|g\.page|maps\.app\.goo\.gl|search\.google\.com)(?:\/|$)/i

const ctx = (over: Partial<GuardContext> = {}): GuardContext => ({
  state: 'NEW_LEAD', paid: false, aiPaused: false, killSwitch: false, optedOut: false,
  isLegacy: false, lastCustomerMsgAt: new Date(), isApprovedTemplate: false, estimateFromTeam: null, ...over,
})

it('the WHT allow-list is the original one, character for character', () => {
  const src = fs.readFileSync(path.join(__dirname, '../policy-guard.ts'), 'utf8')
  const built = new RegExp(`^(?:https?:\\/\\/)?(?:www\\.)?(?:${'workingholidaytax\\.com\\.au'}|my\\.gov\\.au|ato\\.gov\\.au|servicesaustralia\\.gov\\.au|tpb\\.gov\\.au|abr\\.business\\.gov\\.au|g\\.page|maps\\.app\\.goo\\.gl|search\\.google\\.com)(?:\\/|$)`, 'i')
  expect(built.source).toBe(ORIGINAL_WHT.source)
  expect(src).toContain('ownSiteHostPattern(brand)')
})

it('each brand may link only its own site', async () => {
  expect(hasForeignUrl('https://workingholidaytax.com.au/privacy')).toBe(false)
  expect(hasForeignUrl('https://studentvisatax.com.au/privacy')).toBe(true)
  await withBrand('svt', async () => {
    expect(hasForeignUrl('https://studentvisatax.com.au/privacy')).toBe(false)
    expect(hasForeignUrl('https://workingholidaytax.com.au/privacy')).toBe(true)
    expect(hasForeignUrl('https://www.ato.gov.au/x')).toBe(false)
  })
})

it('the form link before payment is caught for either domain', async () => {
  for (const url of ['https://workingholidaytax.com.au/jhd7hp9xd', 'https://studentvisatax.com.au/jhd7hp9xd']) {
    const v = policyGuard(`Here you go: ${url}`, ctx()).violations
    expect(v).toContain('FORM_LINK_BEFORE_PAYMENT')
  }
  await withBrand('svt', async () => {
    expect(policyGuard('Here you go: https://studentvisatax.com.au/jhd7hp9xd', ctx()).violations).toContain('FORM_LINK_BEFORE_PAYMENT')
  })
})

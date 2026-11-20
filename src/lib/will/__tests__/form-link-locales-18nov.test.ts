/**
 * The personal form link (?k=) on every locale path (decision 017, 18 Nov 2026).
 * Portuguese was missing from the form-link pattern, and the "does this message
 * carry a working form link" check knew only /de /ja /zh /vi.
 */
import { signFormToken, verifyFormToken, addTokenToFormLinks, withFormCompletionToken } from '../form-token'
import { FORM_LINK_ANY_BRAND } from '../brand-voice'
import { CURRENT_FORM_LINK, hasWorkingFormLink, ensureFormLink } from '../payment-confirmation'
import { splitFormLinkForButton } from '../channel'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const formPaths = require('../../../../config/form-paths')

const SECRET = 'synthetic-test-secret-0123456789abcdef-xyz'
const LOCALES = ['', 'de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi'] as const
const WHT = formPaths.WHT['tax-form'] as string
const SVT = formPaths.SVT.form as string

const url = (host: string, locale: string, slug: string) => `https://${host}/${locale ? `${locale}/` : ''}${slug}`
const cases = LOCALES.flatMap((l) => [
  ['wht', l || 'en', url('workingholidaytax.com.au', l, WHT)],
  ['svt', l || 'en', url('studentvisatax.com.au', l, SVT)],
] as Array<[string, string, string]>)

describe('the form link pattern accepts every locale path of both brands', () => {
  it.each(cases)('%s %s: %s is a form link and a working one', (_brand, _l, link) => {
    expect(FORM_LINK_ANY_BRAND.test(link)).toBe(true)
    expect(CURRENT_FORM_LINK.test(link)).toBe(true)
    expect(hasWorkingFormLink(`Payment received, thank you!\n\n${link}`)).toBe(true)
  })

  it.each(cases)('%s %s: the token is added once, to the end of the link', (_brand, _l, link) => {
    const text = `Please fill out this short form:\n${link}\n\nThanks`
    const out = addTokenToFormLinks(text, 'TOK', FORM_LINK_ANY_BRAND)
    expect(out).toContain(`${link}?k=TOK\n`)
    expect(out.match(/\?k=TOK/g)).toHaveLength(1)
    expect(addTokenToFormLinks(out, 'TOK', FORM_LINK_ANY_BRAND)).toBe(out)
  })

  it.each(cases)('%s %s: a real signed token rides on the link and verifies for that brand only', (brand, _l, link) => {
    const prev = process.env.FORM_TOKEN_SECRET
    process.env.FORM_TOKEN_SECRET = SECRET
    try {
      const b = brand as 'wht' | 'svt'
      const out = withFormCompletionToken(`Here you go: ${link}`, 'cust-1', b, FORM_LINK_ANY_BRAND)
      const k = new URL(out.slice(out.indexOf('https://'))).searchParams.get('k')!
      expect(k).toBeTruthy()
      expect(verifyFormToken(k, b, { secret: SECRET })).toMatchObject({ ok: true, claims: { customerId: 'cust-1', brand: b, purpose: 'form' } })
      expect(verifyFormToken(k, b === 'wht' ? 'svt' : 'wht', { secret: SECRET })).toMatchObject({ ok: false, reason: 'wrong_brand' })
      // The path is unchanged: the token is a query parameter, so the locale page still opens.
      expect(new URL(out.slice(out.indexOf('https://'))).pathname).toBe(new URL(link).pathname)
    } finally {
      if (prev === undefined) delete process.env.FORM_TOKEN_SECRET
      else process.env.FORM_TOKEN_SECRET = prev
    }
  })

  it.each(cases)('%s %s: the link can ride on the WhatsApp button', (_brand, _l, link) => {
    expect(splitFormLinkForButton(`Please fill out this short form:\n${link}`)).toEqual({ text: 'Please fill out this short form.', url: link })
  })

  it('a working locale link is left alone, not replaced by the English one', () => {
    for (const [, , link] of cases) {
      const body = `Pago recibido.\n\n${link}`
      expect(ensureFormLink(body, url('workingholidaytax.com.au', '', WHT))).toBe(body)
    }
  })

  it('a token signed with no secret configured changes nothing', () => {
    const prev = process.env.FORM_TOKEN_SECRET
    delete process.env.FORM_TOKEN_SECRET
    try {
      const body = `Form: ${url('workingholidaytax.com.au', 'pt', WHT)}`
      expect(withFormCompletionToken(body, 'c', 'wht', FORM_LINK_ANY_BRAND)).toBe(body)
      expect(signFormToken({ customerId: 'c', brand: 'wht' })).toBeNull()
    } finally {
      if (prev !== undefined) process.env.FORM_TOKEN_SECRET = prev
    }
  })

  it('does not match a locale that has no form page, another page, or a look-alike host', () => {
    const no = [
      `https://workingholidaytax.com.au/nl/${WHT}`,
      `https://workingholidaytax.com.au/pt/${WHT}-guide`,
      `https://workingholidaytax.com.au/pt/tax-return`,
      `https://workingholidaytax.com.au/pt/blog/${WHT}`,
      `https://example.com/pt/${WHT}`,
      `https://studentvisatax.com.au/pt/${SVT}x`,
    ]
    for (const link of no) expect(`${link} ${FORM_LINK_ANY_BRAND.test(link)}`).toBe(`${link} false`)
  })

  it('the form reads the token the same way on every path', () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('node:fs'), path = require('node:path')
    const form = fs.readFileSync(path.join(__dirname, '../../../app/(site)/start/FormClient.tsx'), 'utf8')
    expect(form).toContain("const completionToken = (searchParams.get('k') ?? '').slice(0, 512)")
    expect(form).toContain('refCode, completionToken, declared,')
  })
})

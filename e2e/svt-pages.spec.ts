import { test, expect } from '@playwright/test'

/** Every public SVT page loads on the SVT host, carries no WHT mention, has
 *  one h1, and every internal link on it resolves. */
const PORT = Number(process.env.E2E_PORT ?? 3100)
const SVT = `http://svt.localhost:${PORT}`
const WHT_MARKS = /working\s*holiday\s*tax|workingholidaytax|0424\s?513\s?998/i

const TRANSLATED = ['/', '/pricing', '/how-it-works', '/tax-residency', '/medicare', '/abn-delivery', '/do-i-need-to-lodge',
  '/past-years', '/leaving-australia', '/superannuation', '/about', '/questions',
  '/blog', '/blog/tfn-declaration-two-jobs', '/blog/apply-for-tfn-student-visa', '/blog/how-long-does-a-tax-refund-take',
  '/blog/low-income-tax-offset-students', '/blog/income-statement-tax-ready',
  '/blog/what-is-an-abn-students', '/blog/employee-or-contractor', '/blog/work-deductions-students',
  '/blog/cancel-abn-before-leaving', '/blog/lodge-from-overseas',
  '/blog/how-much-super-employer-pays', '/blog/find-and-check-your-super', '/blog/employer-not-paying-super',
  '/blog/dasp-documents-and-timing', '/blog/payslip-what-to-check', '/blog/unpaid-trial-shifts',
  '/blog/underpaid-student-visa', '/blog/cash-in-hand-and-tips', '/blog/amend-tax-return', '/blog/late-lodgment',
  '/blog/tax-payment-plan', '/blog/minimum-wage-students']
const LANG: Record<string, string> = { '': 'en-AU', '/zh': 'zh-CN', '/vi': 'vi' }
const PAGES = [
  ...TRANSLATED, '/client-agreement', '/privacy',
  ...['/zh', '/vi'].flatMap(pre => TRANSLATED.map(p => (p === '/' ? pre : `${pre}${p}`))),
]

test.describe('SVT pages', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 390, 'runs once, at phone width')

  for (const path of PAGES) {
    test(`${path} loads cleanly`, async ({ page }) => {
      const errors: string[] = []
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
      page.on('pageerror', e => errors.push(String(e)))
      // GA4 is stubbed: the test machine has no internet, and the tag is checked in brand-isolation.
      await page.route(/googletagmanager\.com|google-analytics\.com/, r => r.fulfill({ status: 200, contentType: 'application/javascript', body: '' }))
      const res = await page.goto(`${SVT}${path}`)
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
      const pre = path.match(/^\/(zh|vi)(?=\/|$)/)?.[0] ?? ''
      await expect(page.locator('html')).toHaveAttribute('lang', LANG[pre])
      // Its own share image, in its own language (never the other brand's).
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', new RegExp(`/svt-assets/og/og-${pre ? pre.slice(1) : 'en'}\\.png$`))
      // Every translated page names its language versions for search engines.
      if (TRANSLATED.includes(path.replace(/^\/(zh|vi)(?=\/|$)/, '') || '/')) {
        expect(await page.locator('link[rel="alternate"][hreflang]').count()).toBe(4)
      }
      expect(await page.content()).not.toMatch(WHT_MARKS)
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(overflow).toBeLessThanOrEqual(0)
      expect(errors).toEqual([])
    })
  }

  test('a guide that does not exist is a 404', async ({ page }) => {
    const res = await page.goto(`${SVT}/no-such-guide`)
    expect(res?.status()).toBe(404)
  })

  test('every internal link on every page resolves', async ({ page, request }) => {
    const seen = new Set<string>()
    for (const path of PAGES) {
      await page.goto(`${SVT}${path}`)
      const hrefs = await page.$$eval('a[href^="/"]', as => as.map(a => (a as HTMLAnchorElement).getAttribute('href')!))
      for (const h of hrefs) seen.add(h.split('#')[0] || '/')
    }
    for (const h of seen) {
      const res = await request.get(`http://localhost:${PORT}${h}`, { headers: { host: `svt.localhost:${PORT}` }, maxRedirects: 0 })
      expect(res.status(), h).toBe(200)
    }
    expect(seen.size).toBeGreaterThan(10)
  })
})

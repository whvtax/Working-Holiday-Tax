import { test, expect } from '@playwright/test'
import path from 'path'

/**
 * SVT tax form: the same form and residency step as Working Holiday Tax (Jo,
 * 27 Oct), in SVT colours and words. Only meaningful in a build with
 * SVT_FORMS_ENABLED=true; skipped otherwise. The API calls are intercepted in
 * the browser: no database, no storage, no real data. What is checked is what
 * the form SENDS, where it sends it, and that no WHT mark appears.
 */
const PORT = Number(process.env.E2E_PORT ?? 3100)
const SVT = `http://svt.localhost:${PORT}`
const enabled = process.env.SVT_FORMS_ENABLED === 'true'

test.describe('SVT tax form', () => {
  test.skip(!enabled, 'needs a build with SVT_FORMS_ENABLED=true')
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 390, 'runs once, at phone width')

  test('the shared form, in English, ends with a foreign-resident submission from the SVT host', async ({ page }) => {
    const uploads: string[] = []
    let submitted: Record<string, string> | null = null
    await page.route('**/api/tax-form/upload**', async route => {
      uploads.push(new URL(route.request().url()).host)
      await route.fulfill({ json: { ok: true, url: 'https://example.supabase.co/storage/v1/object/public/uploads/svt/tax-form/x.pdf' } })
    })
    await page.route('**/api/tax-form', async route => {
      const body = route.request().postDataBuffer()?.toString('latin1') ?? ''
      const fields: Record<string, string> = {}
      for (const m of body.matchAll(/name="([^"]+)"\r\n\r\n([\s\S]*?)\r\n--/g)) fields[m[1]] = m[2]
      submitted = fields
      await route.fulfill({ json: { ok: true } })
    })

    await page.goto(`${SVT}/jhd7hp9xd`)
    await expect(page.locator('[data-sticky-wa]')).toBeHidden()
    const html = await page.content()
    expect(html).not.toMatch(/workingholidaytax|Working Holiday Tax|0424\s?513\s?998|61424513998/i)

    await page.getByLabel('The WhatsApp number you messaged us from').fill('+61 400 000 000')
    await page.getByLabel('Australian phone number').fill('0400 000 000')
    await page.getByLabel(/Given name/).fill('Test')
    await page.getByLabel('Last name').fill('Person')
    await page.getByLabel('Date of birth').fill('2001-02-03')
    await page.getByLabel('Tax File Number (TFN)').fill('123456782')
    await page.getByLabel('Email address').fill('test@example.invalid')
    await page.getByLabel('Australian address').fill('1 Test Street, Sydney NSW 2000')
    await page.getByLabel('Main job in the past year').fill('Barista')
    await page.getByRole('button', { name: /Continue/ }).click()

    await page.locator('label.radio-card', { hasText: 'No' }).first().click()
    await page.locator('label.radio-card', { hasText: 'Single' }).click()
    await page.locator('input[name="hasExpenses"][value="no"]').locator('..').click()
    await page.locator('input[name="hasOtherIncome"][value="no"]').locator('..').click()
    await page.getByLabel('Home country').fill('Vietnam')
    await page.getByLabel('How did you hear about us?').fill('Friend')
    await page.locator('#bankStatement').setInputFiles(path.join(__dirname, 'fixtures/test.pdf'))
    await page.locator('#selfiePassport').setInputFiles(path.join(__dirname, 'fixtures/test.png'))
    await page.locator('.decl-row').click()
    await page.getByRole('button', { name: /Continue to tax residency/ }).click()

    await expect(page).toHaveURL(/\/jhd7hp9xd\/w3rp42fav$/)
    await page.getByRole('radio', { name: 'Foreign resident for tax' }).click()
    await page.getByRole('button', { name: /Submit Tax Return/ }).click()
    await page.getByRole('button', { name: 'Yes, this is correct' }).click()

    await expect(page.getByRole('heading', { name: /Thank you/ })).toBeVisible()
    expect(uploads.every(h => h === `svt.localhost:${PORT}`)).toBe(true)
    expect(uploads.length).toBeGreaterThanOrEqual(2)
    expect(submitted).not.toBeNull()
    const s = submitted!
    expect(s.taxStatus).toBe('Foreign resident for tax purposes')
    expect('brand' in s).toBe(false)
  })

  test('the same form in Chinese and Vietnamese', async ({ page }) => {
    await page.goto(`${SVT}/zh/jhd7hp9xd`)
    await expect(page.getByRole('button', { name: /继续/ })).toBeVisible()
    await page.goto(`${SVT}/vi/jhd7hp9xd`)
    await expect(page.getByRole('button', { name: /Tiếp tục/ })).toBeVisible()
  })
})

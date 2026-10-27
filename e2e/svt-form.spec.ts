import { test, expect } from '@playwright/test'
import path from 'path'

/**
 * SVT tax form (decision 003). Only meaningful in a build with
 * SVT_FORMS_ENABLED=true; skipped otherwise. The two API calls are
 * intercepted in the browser: no database, no storage, no real data. What is
 * checked is what the form SENDS and where it sends it.
 */
const PORT = Number(process.env.E2E_PORT ?? 3100)
const SVT = `http://svt.localhost:${PORT}`
const enabled = process.env.SVT_FORMS_ENABLED === 'true'

test.describe('SVT tax form', () => {
  test.skip(!enabled, 'needs a build with SVT_FORMS_ENABLED=true')
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 390, 'runs once, at phone width')

  test('empty submit shows errors and focuses the first field', async ({ page }) => {
    await page.goto(`${SVT}/tax-form`)
    await page.getByRole('button', { name: 'Send my form' }).click()
    await expect(page.getByLabel('First name')).toBeFocused()
    await expect(page.getByLabel('First name')).toHaveAttribute('aria-invalid', 'true')
    expect(await page.locator('text=Please fill this in.').count()).toBeGreaterThan(3)
  })

  test('a complete form uploads to the SVT host and sends the right fields', async ({ page }) => {
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

    await page.goto(`${SVT}/tax-form`)
    await expect(page.locator('[data-sticky-wa]')).toBeHidden()
    await page.getByLabel('First name').fill('Test')
    await page.getByLabel('Last name').fill('Person')
    await page.getByLabel('Email').fill('test@example.invalid')
    await page.getByLabel('WhatsApp number').fill('+61 400 000 000')
    await page.getByLabel('Date of birth').fill('2001-02-03')
    await page.getByLabel('Passport country').fill('Vietnam')
    await page.getByLabel('Your address in Australia').fill('1 Test Street, Sydney NSW 2000')
    await page.getByRole('group', { name: 'Your visa' }).getByRole('radio', { name: 'Student 500' }).check()
    await expect(page.getByText('If you are studying in Australia on a course that lasts 6 months or more')).toBeVisible()
    await page.getByRole('group', { name: 'For tax, I am' }).getByRole('radio', { name: 'Foreign resident for tax' }).check()
    await page.getByLabel('Tax file number (TFN)').fill('123456782')
    await page.getByLabel('Your main job this year').fill('Café')
    await page.getByRole('group', { name: /ABN work/ }).getByRole('radio', { name: 'No' }).check()
    await page.getByRole('group', { name: /Medicare/ }).getByRole('radio', { name: 'No' }).check()
    await page.getByRole('group', { name: 'Relationship status' }).getByRole('radio', { name: 'Single' }).check()
    await page.getByRole('group', { name: /work costs/ }).getByRole('radio', { name: 'No' }).check()
    await page.getByLabel('Bank statement (PDF)').setInputFiles(path.join(__dirname, 'fixtures/test.pdf'))
    await page.getByLabel('Photo of you holding your passport').setInputFiles(path.join(__dirname, 'fixtures/test.png'))
    await page.getByLabel(/I have read and agree/).check()
    await page.getByRole('button', { name: 'Send my form' }).click()

    await expect(page.getByRole('heading', { name: 'Thank you, we have your form' })).toBeVisible()
    // The sticky WhatsApp bar is hidden while the form is on the page.
    expect(await page.locator('[data-sticky-wa]').isVisible()).toBe(true) // back after the form is gone
    expect(uploads).toEqual([`svt.localhost:${PORT}`, `svt.localhost:${PORT}`])
    expect(submitted).not.toBeNull()
    const s = submitted!
    expect(s.fullName).toBe('Test Person')
    expect(s.taxStatus).toBe('Foreign resident for tax purposes')
    expect(JSON.parse(s.extraNotes)).toEqual(['Visa: Student 500', 'Residency chosen by the customer: Foreign resident for tax (reviewer to confirm)', 'ABN work: No'])
    expect(s.taxYear).toMatch(/^20\d{2}-\d{2}$/)
    expect('brand' in s).toBe(false)
  })
})

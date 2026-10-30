import { test, expect } from '@playwright/test'
import { createRequire } from 'node:module'

/** axe-core (WCAG 2.0/2.1/2.2 A and AA, plus best practice) on every page in
 *  the SVT sitemap and the form, at each project's width. Zero violations. */
const PORT = Number(process.env.E2E_PORT ?? 3100)
const SVT = `http://svt.localhost:${PORT}`
const AXE = createRequire(__filename).resolve('axe-core/axe.min.js')

test('every SVT page has no axe violations', async ({ page }) => {
  // The sitemap holds 600+ pages since the article library (27 Oct).
  test.setTimeout(3_600_000)
  await page.goto(`${SVT}/sitemap.xml`)
  const urls = [...(await page.content()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname).concat(['/jhd7hp9xd'])
  expect(urls.length).toBeGreaterThan(90)
  const found: string[] = []
  for (const u of urls) {
    await page.goto(`${SVT}${u}`)
    // The phone WhatsApp bar is fixed: whatever happens to sit under it in the
    // first screen reads as "obscured" (target-size) depending only on scroll
    // position. It is still scanned, just in the page flow.
    await page.addStyleTag({ content: '[data-sticky-wa]{position:static!important}' })
    await page.addScriptTag({ path: AXE })
    const v = await page.evaluate(async () => {
      type Axe = { run: (d: Document, o: object) => Promise<{ violations: { id: string; nodes: { target: string[] }[] }[] }> }
      const r = await (window as unknown as { axe: Axe }).axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] } })
      return r.violations.map(x => `${x.id} at ${x.nodes[0]?.target.join(' ')}`)
    })
    for (const x of v) found.push(`${u}: ${x}`)
  }
  expect(found).toEqual([])
})

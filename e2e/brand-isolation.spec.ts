import { test, expect, type APIRequestContext } from '@playwright/test'

/**
 * Host isolation between Working Holiday Tax and Student Visa Tax, against a
 * real production build. The unit-level rules are in
 * src/lib/__tests__/brand-routing-26oct.test.ts.
 */
const PORT = Number(process.env.E2E_PORT ?? 3100)
const WHT = `http://localhost:${PORT}`
const SVT = `http://svt.localhost:${PORT}`

const WHT_MARKS = /working\s*holiday\s*tax|workingholidaytax|0424\s?513\s?998/i
const SVT_MARKS = /student\s*visa\s*tax|studentvisatax/i

/** Node's resolver does not map *.localhost to the loopback address (Chromium
 *  does), so HTTP checks go to localhost with the SVT Host header instead. */
function target(url: string): { url: string; headers: Record<string, string> } {
  const u = new URL(url)
  if (u.hostname === 'svt.localhost') {
    return { url: `${WHT}${u.pathname}${u.search}`, headers: { host: u.host } }
  }
  return { url, headers: {} }
}

async function get(request: APIRequestContext, url: string) {
  const t = target(url)
  const res = await request.get(t.url, { headers: t.headers, maxRedirects: 0 })
  return { status: res.status(), body: await res.text(), headers: res.headers() }
}

// Routing does not depend on viewport; run the HTTP checks once.
test.describe('host isolation (HTTP)', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 1440, 'viewport-independent: runs once, on desktop')

  test('SVT home renders SVT and nothing of WHT', async ({ request }) => {
    const r = await get(request, `${SVT}/`)
    expect(r.status).toBe(200)
    expect(r.body).toMatch(SVT_MARKS)
    expect(r.body).not.toMatch(WHT_MARKS)
    expect(r.headers['content-security-policy']).not.toMatch(/workingholidaytax/)
  })

  for (const path of ['/tfn', '/expenses', '/de', '/ja', '/crm', '/tax-return', '/favicon.svg', '/og-image.png']) {
    test(`WHT ${path} is a 404 on the SVT host`, async ({ request }) => {
      const r = await get(request, `${SVT}${path}`)
      expect(r.status).toBe(404)
      expect(r.body).not.toMatch(WHT_MARKS)
    })
  }

  // With SVT_FORMS_ENABLED=true the two form routes are open on purpose
  // (decision 003); everything else stays closed in every build.
  const formsOn = process.env.SVT_FORMS_ENABLED === 'true'
  for (const path of [...(formsOn ? [] : ['/api/tax-form']), '/api/crm/login', '/api/will/webhook', '/api/will/tick', '/api/abn-form', '/api/crm/file']) {
    test(`API ${path} is closed on the SVT host`, async ({ request }) => {
      const t = target(`${SVT}${path}`)
      const r = await request.post(t.url, { headers: t.headers, data: {}, maxRedirects: 0 })
      expect(r.status()).toBe(404)
    })
  }

  test('WHT redirects do not fire on the SVT host', async ({ request }) => {
    expect((await get(request, `${SVT}/start`)).status).toBe(404)
    expect((await get(request, `${SVT}/guides`)).status).toBe(404)
    expect((await get(request, `${WHT}/start`)).status).toBe(307)
  })

  test('SVT llms.txt is its own', async ({ request }) => {
    const r = await get(request, `${SVT}/llms.txt`)
    expect(r.status).toBe(200)
    expect(r.body).toMatch(SVT_MARKS)
    expect(r.body).not.toMatch(WHT_MARKS)
    const w = await get(request, `${WHT}/llms.txt`)
    expect(w.body).not.toMatch(SVT_MARKS)
  })

  test('SVT robots and sitemap are its own', async ({ request }) => {
    const robots = await get(request, `${SVT}/robots.txt`)
    expect(robots.status).toBe(200)
    expect(robots.body).toContain('Sitemap: https://studentvisatax.com.au/sitemap.xml')
    expect(robots.body).not.toMatch(WHT_MARKS)
    const sitemap = await get(request, `${SVT}/sitemap.xml`)
    expect(sitemap.status).toBe(200)
    expect(sitemap.body).toContain('<urlset')
    expect(sitemap.body).not.toMatch(WHT_MARKS)
  })

  test('the SVT tree does not exist on the WHT host', async ({ request }) => {
    for (const path of ['/svt-site', '/svt-site/robots.txt', '/svt-site/sitemap.xml', '/svt-assets/x.svg']) {
      const r = await get(request, `${WHT}${path}`)
      expect(r.status, path).toBe(404)
      expect(r.body, path).not.toMatch(SVT_MARKS)
    }
  })

  test('WHT is unchanged: home, robots and sitemap', async ({ request }) => {
    const home = await get(request, `${WHT}/`)
    expect(home.status).toBe(200)
    expect(home.body).toMatch(/Working Holiday Tax/)
    expect(home.body).not.toMatch(SVT_MARKS)
    expect(home.headers['content-security-policy']).toContain('workingholidaytax.com.au')
    const robots = await get(request, `${WHT}/robots.txt`)
    expect(robots.body).toContain('https://workingholidaytax.com.au/sitemap.xml')
    expect(robots.body).not.toMatch(SVT_MARKS)
    const sitemap = await get(request, `${WHT}/sitemap.xml`)
    expect(sitemap.body).not.toMatch(SVT_MARKS)
  })
})

// In a real browser at every viewport: the SVT page loads cleanly under its CSP.
test('SVT home loads in the browser with no console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
  page.on('pageerror', e => errors.push(String(e)))
  await page.goto(`${SVT}/`)
  await expect(page.locator('h1')).toHaveText('Tax returns for student visas')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en-AU')
  expect(await page.content()).not.toMatch(WHT_MARKS)
  expect(errors).toEqual([])
})

test.describe('more isolation (HTTP)', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 1440, 'viewport-independent: runs once, on desktop')

  test('SVT legal pages are the shared text with SVT details only', async ({ request }) => {
    for (const path of ['/client-agreement', '/privacy']) {
      const r = await get(request, `${SVT}${path}`)
      expect(r.status, path).toBe(200)
      expect(r.body, path).toContain('Student Visa Tax')
      expect(r.body, path).toContain('info@studentvisatax.com.au')
      expect(r.body, path).not.toMatch(WHT_MARKS)
    }
  })

  test('SVT /tax-form is its own page: noindex, no WHT mention', async ({ request }) => {
    const r = await get(request, `${SVT}/tax-form`)
    expect(r.status).toBe(200)
    expect(r.body).toContain('noindex')
    expect(r.body).not.toMatch(WHT_MARKS)
  })

  test('the internal SVT segment is a 404 on the SVT host too', async ({ request }) => {
    for (const path of ['/svt-site', '/svt-site/robots.txt']) {
      expect((await get(request, `${SVT}${path}`)).status, path).toBe(404)
    }
  })

  test('the production SVT host name routes to SVT', async ({ request }) => {
    for (const host of ['studentvisatax.com.au', 'www.studentvisatax.com.au']) {
      const res = await request.get(`${WHT}/`, { headers: { host } })
      expect(res.status()).toBe(200)
      const body = await res.text()
      expect(body).toMatch(SVT_MARKS)
      expect(body).not.toMatch(WHT_MARKS)
      expect((await request.get(`${WHT}/tfn`, { headers: { host } })).status()).toBe(404)
    }
  })
})

// WHT behaviour unchanged, in a real browser. Requests to outside origins
// (analytics, fonts) fail in the sandbox; those are not app errors.
for (const path of ['/', '/tax-form', '/crm']) {
  test(`WHT ${path} still loads with no app errors`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', m => { if (m.type() === 'error' && !/ERR_TUNNEL|ERR_NAME_NOT_RESOLVED|ERR_CONNECTION/.test(m.text())) errors.push(m.text()) })
    page.on('pageerror', e => errors.push(String(e)))
    const res = await page.goto(`${WHT}${path}`)
    expect(res?.status()).toBe(200)
    expect(await page.content()).not.toMatch(SVT_MARKS)
    expect(errors.filter(e => !/permissions policy/i.test(e))).toEqual([])
  })
}

// The JavaScript each brand's pages actually load must not name the other
// brand: one build serves both, so this is where a shared module that pulled
// in the other brand's details would show up.
test.describe('scripts loaded by each brand', () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) !== 1440, 'viewport-independent: runs once, on desktop')

  async function scriptsOf(request: APIRequestContext, url: string): Promise<string[]> {
    const html = (await get(request, url)).body
    return [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m => m[1]).filter(src => src.startsWith('/_next/'))
  }

  test('WHT pages load no script that names SVT', async ({ request }) => {
    for (const page of ['/', '/tax-form', '/crm', '/privacy']) {
      for (const src of await scriptsOf(request, `${WHT}${page}`)) {
        const js = (await get(request, `${WHT}${src}`)).body
        expect(js, `${page} ${src}`).not.toMatch(SVT_MARKS)
      }
    }
  })

  test('SVT pages load no script that names WHT', async ({ request }) => {
    for (const page of ['/', '/pricing', '/tax-form', '/privacy']) {
      for (const src of await scriptsOf(request, `${SVT}${page}`)) {
        const js = (await get(request, `${SVT}${src}`)).body
        expect(js, `${page} ${src}`).not.toMatch(WHT_MARKS)
      }
    }
  })
})

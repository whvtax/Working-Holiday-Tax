/**
 * Host isolation between the two brands, evaluated with Next's OWN matchers
 * (path-to-regexp via getPathMatch, and matchHas for host conditions), the way
 * the router applies beforeFiles rewrites: first matching rule wins, and a
 * path that matches no rule falls through to the filesystem.
 *
 * The end-to-end proof against a real build is e2e/brand-isolation.spec.ts.
 */
import { getPathMatch } from 'next/dist/shared/lib/router/utils/path-match'
import { matchHas } from 'next/dist/shared/lib/router/utils/prepare-destination'
import { modifyRouteRegex } from 'next/dist/lib/redirect-status'
import routing from '../../../config/brand-routing'
import { brandFromHost, BRANDS, SVT_HOSTS } from '@/lib/brand'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextConfig = require('../../../next.config.js')

const { brandRewrites, NOT_FOUND_PATH, SVT_SEGMENT } = routing

type Rule = ReturnType<typeof brandRewrites>[number]

/** Where a request ends up after the beforeFiles rewrites. Like Next's
 *  resolve-routes: rules run in order, each sees the path as rewritten by
 *  the rules before it, and a path no rule matches is left as it is. */
function route(host: string, pathname: string, allowlist?: string[]): string {
  const req = { headers: { host } } as unknown as Parameters<typeof matchHas>[0]
  let current = pathname
  for (const rule of brandRewrites(allowlist) as Rule[]) {
    const params = getPathMatch(rule.source, { strict: true, removeUnnamedParams: true, regexModifier: r => modifyRouteRegex(r) })(current) // exactly as next/dist/server/lib/router-utils/filesystem.js builds it
    if (!params) continue
    if (!matchHas(req, {}, rule.has ?? [], rule.missing ?? [])) continue
    current = rule.destination.replace(/:(\w+)/g, (_, k) => String((params as Record<string, string>)[k] ?? ''))
  }
  return current
}

/** A blocked path ends on the not-found path, possibly inside the SVT tree
 *  (where it is equally a 404). */
const isBlocked = (dest: string) => dest === NOT_FOUND_PATH || dest === `/${SVT_SEGMENT}${NOT_FOUND_PATH}`

const SVT = 'studentvisatax.com.au'
const WHT = 'workingholidaytax.com.au'

describe('SVT host serves only the SVT tree', () => {
  it.each([
    ['/', `/${SVT_SEGMENT}`],
    ['/robots.txt', `/${SVT_SEGMENT}/robots.txt`],
    ['/sitemap.xml', `/${SVT_SEGMENT}/sitemap.xml`],
    ['/zh', `/${SVT_SEGMENT}/zh`],
    ['/vi/tax-return', `/${SVT_SEGMENT}/vi/tax-return`],
    // WHT pages and files land inside the SVT tree, where they do not exist.
    ['/jhd7hp9xd', `/${SVT_SEGMENT}/jhd7hp9xd`],
    ['/crm', `/${SVT_SEGMENT}/crm`],
    ['/crm/dashboard', `/${SVT_SEGMENT}/crm/dashboard`],
    ['/de', `/${SVT_SEGMENT}/de`],
    ['/ja/blog', `/${SVT_SEGMENT}/ja/blog`],
    ['/llms.txt', `/${SVT_SEGMENT}/llms.txt`],
    ['/favicon.svg', `/${SVT_SEGMENT}/favicon.svg`],
    ['/og-image.png', `/${SVT_SEGMENT}/og-image.png`],
  ])('%s → %s', (path, dest) => {
    expect(route(SVT, path)).toBe(dest)
    expect(route(`www.${SVT}`, path)).toBe(dest)
    expect(route(`${SVT}:443`, path)).toBe(dest)
    expect(route('SVT.localhost:3100', path)).toBe(dest)
  })

  it('the form flag opens exactly the tax form and its upload, nothing else', () => {
    expect(routing.svtApiAllowlist({})).toEqual([])
    expect(routing.svtApiAllowlist({ SVT_FORMS_ENABLED: 'yes' })).toEqual([])
    const on = routing.svtApiAllowlist({ SVT_FORMS_ENABLED: 'true' })
    expect(on).toEqual(['/api/tax-form', '/api/tax-form/upload'])
    expect(route(SVT, '/api/tax-form', on)).toBe('/api/tax-form')
    expect(route(SVT, '/api/tax-form/upload', on)).toBe('/api/tax-form/upload')
    for (const p of ['/api', '/api/tax-form/other', '/api/tax-formx', '/api/abn-form', '/api/crm/login', '/api/crm/file', '/api/will/webhook', '/api/will/tick']) {
      expect(isBlocked(route(SVT, p, on))).toBe(true)
    }
  })

  it('every API route is closed on the SVT host without the form flag', () => {
    expect(routing.SVT_API_ALLOWLIST).toEqual([])
    for (const p of ['/api', '/api/tax-form', '/api/tax-form/upload', '/api/crm/login', '/api/crm/file', '/api/will/webhook', '/api/will/tick']) {
      expect(isBlocked(route(SVT, p))).toBe(true)
    }
  })

  it('the internal SVT segment cannot be requested directly on the SVT host', () => {
    for (const p of [`/${SVT_SEGMENT}`, `/${SVT_SEGMENT}/`, `/${SVT_SEGMENT}/robots.txt`, `/${SVT_SEGMENT}/zh`]) {
      expect(isBlocked(route(SVT, p))).toBe(true)
    }
  })

  it('leaves Next assets and SVT public files alone', () => {
    expect(route(SVT, '/_next/static/chunks/main.js')).toBe('/_next/static/chunks/main.js')
    expect(route(SVT, '/svt-assets/logo.svg')).toBe('/svt-assets/logo.svg')
  })
})

describe('every other host never reaches SVT', () => {
  it.each([WHT, `www.${WHT}`, 'localhost:3000', 'whvtax.vercel.app', 'evil.example'])('%s', (host) => {
    expect(route(host, `/${SVT_SEGMENT}`)).toBe(NOT_FOUND_PATH)
    expect(route(host, `/${SVT_SEGMENT}/robots.txt`)).toBe(NOT_FOUND_PATH)
    expect(route(host, `/${SVT_SEGMENT}/zh/anything`)).toBe(NOT_FOUND_PATH)
    expect(route(host, '/svt-assets/logo.svg')).toBe(NOT_FOUND_PATH)
    // WHT itself is untouched.
    for (const p of ['/', '/start', '/crm', '/api/tax-form', '/de/tfn', '/robots.txt']) {
      expect(route(host, p)).toBe(p)
    }
  })

  it('a host that only CONTAINS an SVT host name is not SVT (anchored match)', () => {
    for (const host of [`evil-${SVT}`, `${SVT}.evil.example`, 'svt.localhost.evil.example', `x${SVT}`]) {
      expect(route(host, '/')).toBe('/')
      expect(route(host, `/${SVT_SEGMENT}`)).toBe(NOT_FOUND_PATH)
      expect(brandFromHost(host)).toBe('wht')
    }
  })
})

describe('brandFromHost', () => {
  it('maps hosts the same way the router does', () => {
    expect(brandFromHost(SVT)).toBe('svt')
    expect(brandFromHost(`WWW.${SVT.toUpperCase()}:443`)).toBe('svt')
    expect(brandFromHost('svt.localhost:3100')).toBe('svt')
    expect(brandFromHost(WHT)).toBe('wht')
    expect(brandFromHost('')).toBe('wht')
    expect(brandFromHost(null)).toBe('wht')
    expect(brandFromHost(undefined)).toBe('wht')
  })
  it('uses the one host list next.config.js uses', () => {
    expect(SVT_HOSTS).toBe(routing.SVT_HOSTS)
    expect(SVT_HOSTS).toContain(BRANDS.svt.domain)
  })
})

describe('next.config.js wiring', () => {
  const svtCond = routing.svtHost()
  it('uses the brand rewrites before the filesystem', async () => {
    const r = await nextConfig.rewrites()
    expect(r.beforeFiles).toEqual(brandRewrites())
  })
  it('no WHT redirect can fire on an SVT host', async () => {
    const redirects: Array<{ missing?: unknown[] }> = await nextConfig.redirects()
    expect(redirects.length).toBeGreaterThan(30)
    // Every redirect is either WHT only (missing the SVT host) or SVT only (has it).
    for (const r of redirects as Array<{ missing?: unknown[]; has?: unknown[] }>) {
      expect(Boolean(r.missing?.some(c => JSON.stringify(c) === JSON.stringify(svtCond))) !== Boolean(r.has?.some(c => JSON.stringify(c) === JSON.stringify(svtCond)))).toBe(true)
    }
  })
  it('SVT responses get their own CSP, which never names the WHT domain', async () => {
    const headers: Array<{ source: string; has?: unknown[]; headers: Array<{ key: string; value: string }> }> = await nextConfig.headers()
    const svt = headers.filter(h => h.has?.some(c => JSON.stringify(c) === JSON.stringify(svtCond)))
    expect(svt).toHaveLength(1)
    // Last rule wins per key in Next, so the SVT rule must come after the public one.
    expect(headers.indexOf(svt[0])).toBeGreaterThan(headers.findIndex(h => h.source === '/((?!crm).*)'))
    const csp = svt[0].headers.find(h => h.key === 'Content-Security-Policy')!.value
    expect(csp).not.toMatch(/workingholidaytax|facebook|youtube|fonts\.g/)
    // GA4 only: its own property loads, nothing else from Google or Meta.
    expect(csp).toContain('https://www.googletagmanager.com')
    expect(csp).toContain('https://*.google-analytics.com')
    expect(csp).toContain("frame-ancestors 'none'")
    expect(csp).toContain("object-src 'none'")
    for (const key of ['Strict-Transport-Security', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']) {
      expect(svt[0].headers.map(h => h.key)).toContain(key)
    }
  })
})

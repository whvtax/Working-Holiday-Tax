/**
 * Round 2 brand isolation (sec2-api-svt). Evaluated with Next's OWN matchers,
 * the way the router applies beforeFiles rewrites (see brand-routing-26oct.test.ts).
 *
 * What this adds over the 26 Oct tests:
 *  - EVERY page and route handler in src/app is enumerated from the file system.
 *    A new WHT page, /crm screen, Will route or cron route cannot become
 *    reachable on an SVT host without this test failing, whatever its name.
 *  - Host spellings the router once treated as WHT: trailing dot (live bug
 *    found in round 2: it served /crm, /api/will/tick and every WHT page on the
 *    SVT domain), any subdomain of the SVT domain, mixed case, with a port.
 *  - Path spellings: encoded characters, different case, dot segments.
 *  - The image optimizer endpoint, which served WHT photographs on the SVT host.
 *  - Host lookalikes must stay WHT (the match is anchored).
 *
 * Live probes behind these assertions were made against `next dev` with
 * curl --path-as-is and a forged Host header (round2/sec2-api-svt.md).
 */
import fs from 'fs'
import path from 'path'
import { getPathMatch } from 'next/dist/shared/lib/router/utils/path-match'
import { matchHas } from 'next/dist/shared/lib/router/utils/prepare-destination'
import { modifyRouteRegex } from 'next/dist/lib/redirect-status'
import routing from '../../../config/brand-routing'
import { brandFromHost } from '@/lib/brand'

const { brandRewrites, NOT_FOUND_PATH, SVT_SEGMENT, SVT_ASSETS } = routing

type Rule = ReturnType<typeof brandRewrites>[number]

function route(host: string, pathname: string, allowlist?: string[]): string {
  const req = { headers: { host } } as unknown as Parameters<typeof matchHas>[0]
  let current = pathname
  for (const rule of brandRewrites(allowlist) as Rule[]) {
    const params = getPathMatch(rule.source, { strict: true, removeUnnamedParams: true, regexModifier: (r) => modifyRouteRegex(r) })(current)
    if (!params) continue
    if (!matchHas(req, {}, rule.has ?? [], rule.missing ?? [])) continue
    current = rule.destination.replace(/:(\w+)/g, (_, k) => String((params as Record<string, string>)[k] ?? ''))
  }
  return current
}

const SVT = 'studentvisatax.com.au'
const WHT = 'workingholidaytax.com.au'

const isBlocked = (dest: string) => dest === NOT_FOUND_PATH || dest === `/${SVT_SEGMENT}${NOT_FOUND_PATH}`

/** Where a request for `p` on an SVT host may legitimately end up. */
function staysInsideSvt(dest: string): boolean {
  return (
    dest === NOT_FOUND_PATH ||
    dest === `/${SVT_SEGMENT}` ||
    dest.startsWith(`/${SVT_SEGMENT}/`) ||
    dest.startsWith(`/${SVT_ASSETS}/`) ||
    dest.startsWith('/_next/static/')
  )
}

// ---------------------------------------------------------------------------
// Route inventory from the file system
// ---------------------------------------------------------------------------
const APP = path.join(process.cwd(), 'src/app')

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

/** URL path of a page.tsx / route.ts(x) / robots.ts / sitemap.ts. */
function urlFor(file: string): string | null {
  const rel = path.relative(APP, file).split(path.sep)
  const leaf = rel.pop() as string
  const segs = rel
    .filter((s) => !/^\(.*\)$/.test(s)) // route groups
    .map((s) => {
      if (/^\[\[\.\.\..+\]\]$/.test(s)) return null // optional catch-all: adds nothing
      if (/^\[\.\.\..+\]$/.test(s)) return 'a/b'
      if (/^\[.+\]$/.test(s)) return 'x1'
      return s
    })
    .filter((s): s is string => s !== null)
  if (/^page\.tsx?$/.test(leaf)) return '/' + segs.join('/')
  if (/^route\.tsx?$/.test(leaf)) return '/' + segs.join('/')
  if (leaf === 'robots.ts') return '/' + [...segs, 'robots.txt'].join('/')
  if (leaf === 'sitemap.ts') return '/' + [...segs, 'sitemap.xml'].join('/')
  return null
}

const ALL = walk(APP)
  .map((f) => urlFor(f))
  .filter((u): u is string => !!u)
  .map((u) => (u.length > 1 && u.endsWith('/') ? u.slice(0, -1) : u))
const SVT_TREE = ALL.filter((u) => u === `/${SVT_SEGMENT}` || u.startsWith(`/${SVT_SEGMENT}/`))
const OTHER = ALL.filter((u) => !SVT_TREE.includes(u))

describe('route inventory sanity', () => {
  it('finds the SVT tree, WHT pages, /crm and the API', () => {
    expect(SVT_TREE.length).toBeGreaterThan(8)
    expect(OTHER.length).toBeGreaterThan(100)
    expect(OTHER).toEqual(expect.arrayContaining(['/crm', '/crm/dashboard', '/api/will/tick', '/api/will/webhook', '/api/crm/file', '/robots.txt']))
  })
})

describe('SVT host reaches no WHT page, /crm, Will, cron or other API route', () => {
  const HOSTS = [SVT, `www.${SVT}`, `${SVT}.`, `${SVT}:443`, `${SVT.toUpperCase()}`, `www.${SVT}.:8443`, 'svt.localhost:3100', `app.${SVT}`, `crm.${SVT}`]

  it.each(HOSTS)('every WHT route is closed or inside the SVT tree on host %s (forms off)', (host) => {
    for (const u of OTHER) {
      const dest = route(host, u)
      // robots.txt and sitemap.xml are served, but from the SVT tree.
      expect({ host, url: u, ok: staysInsideSvt(dest) }).toEqual({ host, url: u, ok: true })
    }
  })

  it('with SVT_FORMS_ENABLED only the tax form and its upload reach an API handler', () => {
    const on = routing.svtApiAllowlist({ SVT_FORMS_ENABLED: 'true' })
    for (const host of HOSTS) {
      for (const u of OTHER) {
        const dest = route(host, u, on)
        if (u === '/api/tax-form' || u === '/api/tax-form/upload') {
          expect(dest).toBe(u)
        } else {
          expect({ host, url: u, ok: staysInsideSvt(dest) }).toEqual({ host, url: u, ok: true })
        }
      }
    }
  })

  it('the internal segment cannot be requested directly (no page with two URLs)', () => {
    for (const u of SVT_TREE) {
      expect(isBlocked(route(SVT, u))).toBe(true)
    }
  })

  it('path spellings do not reach a WHT route: encoding, case, double slash, dot segments', () => {
    const spellings = [
      '/%61pi/will/tick', '/api%2Fwill%2Ftick', '/API/will/tick', '/Api/Crm/Login', '/CRM', '/Crm/dashboard',
      '/crm%2Fdashboard', '/%63rm', '/api/will/tick/', '/api/will/tick%00', '/api;x=1/will/tick',
      '/de', '/DE/tfn', '/ja', '/favicon.svg', '/llms-full.txt', '/manifest.json', '/wht-assets/img/x.jpg',
      '/assets/x.js', '/843b75167189fadc1e22ed25b84c7134.txt',
    ]
    for (const host of HOSTS) {
      for (const p of spellings) {
        expect({ host, p, ok: staysInsideSvt(route(host, p)) }).toEqual({ host, p, ok: true })
      }
    }
  })

  it('the image optimizer is closed on SVT hosts (it served /wht-assets files)', () => {
    for (const host of HOSTS) expect(isBlocked(route(host, '/_next/image'))).toBe(true)
    // ... and still open on WHT, which nothing uses but which is not ours to change here.
    expect(route(WHT, '/_next/image')).toBe('/_next/image')
  })

  it('Next static chunks stay reachable on SVT (the SVT pages need them)', () => {
    expect(route(SVT, '/_next/static/chunks/main.js')).toBe('/_next/static/chunks/main.js')
    expect(route(SVT, `/${SVT_ASSETS}/logo.svg`)).toBe(`/${SVT_ASSETS}/logo.svg`)
  })
})

describe('every non-SVT host never reaches the SVT tree or SVT files', () => {
  const HOSTS = [WHT, `www.${WHT}`, 'localhost:3000', 'whvtax.vercel.app', 'evil.example', '', 'x', `evil-${SVT}`, `${SVT}.evil.example`, `x${SVT}`, `svt.localhost.evil.example`]

  it.each(HOSTS)('host %j', (host) => {
    for (const u of SVT_TREE) expect({ host, u, dest: route(host, u) }).toEqual({ host, u, dest: NOT_FOUND_PATH })
    for (const p of [
      `/${SVT_SEGMENT}`, `/${SVT_SEGMENT}/zh`, `/${SVT_SEGMENT}/anything/at/all`,
      `/${SVT_SEGMENT.toUpperCase()}`, `/Svt-Site/zh`, `/${SVT_ASSETS}/logo.svg`, `/${SVT_ASSETS.toUpperCase()}/logo.svg`,
      `/${SVT_ASSETS}/fonts/x.woff2`, `/${SVT_ASSETS}/img/x.jpg`,
    ]) {
      expect({ host, p, dest: route(host, p) }).toEqual({ host, p, dest: NOT_FOUND_PATH })
    }
  })
})

describe('host classification', () => {
  const svt = [SVT, `www.${SVT}`, `${SVT}.`, `WWW.${SVT.toUpperCase()}.`, `${SVT}:443`, `${SVT}.:443`, 'svt.localhost', 'svt.localhost:3100', `app.${SVT}`, `a.b.${SVT}`, `crm.${SVT}:8080`]
  const wht = [WHT, `www.${WHT}`, 'localhost:3000', '', 'evil.example', `evil-${SVT}`, `${SVT}.evil.example`, `x${SVT}`, `${SVT}evil.example`, `svt.localhost.evil.example`, `${WHT}:${SVT}`, `${SVT}, ${WHT}`, `${SVT}@${WHT}`, `${SVT}/`, `${SVT}%2f`, `.${SVT}.evil`]

  it.each(svt)('SVT: %s (router and brandFromHost agree)', (host) => {
    expect(brandFromHost(host)).toBe('svt')
    expect(route(host, '/crm')).not.toBe('/crm')
  })
  it.each(wht)('WHT: %j (router and brandFromHost agree)', (host) => {
    expect(brandFromHost(host)).toBe('wht')
    expect(route(host, '/crm')).toBe('/crm')
  })
  it('null and undefined are WHT', () => {
    expect(brandFromHost(null)).toBe('wht')
    expect(brandFromHost(undefined)).toBe('wht')
  })
})

describe('headers that must not influence the brand', () => {
  it('server code reads only the Host header, never a forwarded or custom one', () => {
    // x-forwarded-host and friends are client-supplied unless the ingress strips them.
    // Verified live against `next dev`: X-Forwarded-Host, X-Host, X-Original-Host and
    // Forwarded: host= did not change routing in either direction. This keeps it so.
    const offenders: string[] = []
    for (const f of walk(path.join(process.cwd(), 'src')).filter((p) => /\.(ts|tsx)$/.test(p) && !p.includes('__tests__'))) {
      const s = fs.readFileSync(f, 'utf8')
      if (/x-forwarded-host|x-original-host|x-host['"]|forwarded['"]\)/i.test(s)) offenders.push(path.relative(process.cwd(), f))
    }
    expect(offenders).toEqual([])
  })

  it('every brandFromHost caller passes the Host header', () => {
    const bad: string[] = []
    for (const f of walk(path.join(process.cwd(), 'src')).filter((p) => /\.(ts|tsx)$/.test(p) && !p.includes('__tests__'))) {
      const s = fs.readFileSync(f, 'utf8')
      if (/function brandFromHost/.test(s)) continue
      for (const m of s.matchAll(/brandFromHost\(([^\n]*)/g)) {
        if (/^(req|request)\.headers\.get\(['"]host['"]\)/.test(m[1].trim())) continue
        bad.push(`${path.relative(process.cwd(), f)}: ${m[0]}`)
      }
    }
    expect(bad).toEqual([])
  })
})

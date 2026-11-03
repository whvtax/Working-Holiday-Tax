/**
 * Route auth inventory. Every handler under src/app/api must either appear in
 * PUBLIC (with the protection that stands in for a session) or reference a
 * server-side auth check. A new route that does neither fails this test.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.join(process.cwd(), 'src/app/api')

// route -> how it is protected instead of a CRM session
const PUBLIC: Record<string, string> = {
  'abn-form': 'public form, IP rate limit, server validation',
  'super-form': 'public form, IP rate limit, server validation',
  'tfn-form': 'public form, IP rate limit, server validation',
  'tax-form': 'public form, IP rate limit, brand from host',
  'tax-form/fix': 'public, signed one-time token, IP rate limit, brand from host',
  'tax-form/link': 'public, signed token only, IP rate limit, brand from host',
  'tax-form/upload': 'public upload, IP rate limit + byte budget, magic bytes, private bucket',
  'analytics/funnel': 'public, IP rate limit, allow-listed events',
  'google-reviews': 'public read-only cached proxy',
  'crm/login': 'password step, per-IP lockout',
  'crm/verify-otp': 'OTP bound to pre-auth cookie, attempt cap',
  'crm/logout': 'clears cookie; revokes only with valid session',
  'will/webhook': 'Meta HMAC signature / verify token',
  'will/orphan-sweep': 'cron secret or session',
  'will/tick': 'cron secret or session',
}
const AUTH_MARKERS = /validateSession|sessionValid\(|cronAuthorized\(/

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (e.name === 'route.ts') out.push(p)
  }
  return out
}

describe('API route auth inventory', () => {
  const routes = walk(ROOT).map((f) => ({
    id: path.relative(ROOT, path.dirname(f)).split(path.sep).join('/'),
    src: fs.readFileSync(f, 'utf8'),
  }))

  it('finds the routes', () => expect(routes.length).toBeGreaterThan(40))

  it.each(routes.map((r) => [r.id, r.src] as const))('%s is gated or explicitly public', (id, src) => {
    if (id in PUBLIC) return
    expect(src).toMatch(AUTH_MARKERS)
  })

  it('PUBLIC list has no stale entries', () => {
    const ids = new Set(routes.map((r) => r.id))
    for (const k of Object.keys(PUBLIC)) expect(ids.has(k)).toBe(true)
  })
})

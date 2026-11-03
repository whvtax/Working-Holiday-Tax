/**
 * Round 2 re-inventory of every route handler (sec2-api-svt).
 *
 * The round 1 test (api-route-auth-inventory.test.ts) passes a route if an
 * auth marker appears ANYWHERE in the file, so a route whose GET is gated but
 * whose newly added DELETE is not would pass. This test works per exported
 * handler:
 *
 *  1. The set of HTTP methods each route exports is pinned. Adding a method
 *     (or a route) fails until the inventory below is updated on purpose.
 *  2. Every non-public handler checks the session (or cron secret) BEFORE it
 *     reads the body, the route params or touches the database or store.
 *  3. Public handlers are listed with their stand-in control.
 *  4. No route sets CORS headers, exports OPTIONS or HEAD, or returns a stack
 *     trace or the environment.
 *
 * Auth classes: session = CRM cookie, cron = cron secret or session,
 * public = anonymous by design, webhook = Meta HMAC / verify token,
 * session+dev = session and a development-only switch.
 */
import fs from 'fs'
import path from 'path'

const ROOT = path.join(process.cwd(), 'src/app/api')

type Cls = 'session' | 'cron' | 'public' | 'webhook'
const INVENTORY: Record<string, { methods: string[]; cls: Cls }> = {
  'abn-form': { methods: ['POST'], cls: 'public' },
  'analytics/funnel': { methods: ['POST'], cls: 'public' },
  'crm/clients/[id]/notes': { methods: ['PATCH'], cls: 'session' },
  'crm/clients/[id]/referral-payment': { methods: ['PATCH'], cls: 'session' },
  'crm/clients/[id]/referral': { methods: ['PATCH'], cls: 'session' },
  'crm/clients/[id]': { methods: ['GET', 'PATCH', 'DELETE'], cls: 'session' },
  'crm/clients/[id]/tax-returns': { methods: ['POST', 'DELETE'], cls: 'session' },
  'crm/clients': { methods: ['GET'], cls: 'session' },
  'crm/clients/search': { methods: ['GET'], cls: 'session' },
  'crm/file': { methods: ['GET'], cls: 'session' },
  'crm/leads': { methods: ['GET', 'POST'], cls: 'session' },
  'crm/login': { methods: ['POST'], cls: 'public' }, // password step, lockout
  'crm/logout': { methods: ['POST'], cls: 'public' }, // revokes only with a valid session (own test)
  'crm/partners/[id]': { methods: ['GET', 'DELETE'], cls: 'session' },
  'crm/partners': { methods: ['GET', 'POST'], cls: 'session' },
  'crm/seed': { methods: ['POST'], cls: 'session' },
  'crm/stats': { methods: ['GET'], cls: 'session' },
  'crm/tasks/[id]': { methods: ['PATCH'], cls: 'session' },
  'crm/tasks': { methods: ['GET', 'POST'], cls: 'session' },
  'crm/verify-otp': { methods: ['POST'], cls: 'public' }, // OTP bound to pre-auth cookie
  'crm/version': { methods: ['GET'], cls: 'session' },
  'google-reviews': { methods: ['GET'], cls: 'public' },
  'super-form': { methods: ['POST'], cls: 'public' },
  'tax-form': { methods: ['POST'], cls: 'public' },
  'tax-form/fix': { methods: ['POST'], cls: 'public' }, // one-time signed link, single use
  'tax-form/link': { methods: ['GET'], cls: 'public' }, // reports link state for a signed token only
  'tax-form/upload': { methods: ['POST'], cls: 'public' },
  'tfn-form': { methods: ['POST'], cls: 'public' },
  'will/actions': { methods: ['POST'], cls: 'session' },
  'will/audit': { methods: ['GET'], cls: 'session' },
  'will/chats': { methods: ['GET'], cls: 'session' },
  'will/export': { methods: ['GET'], cls: 'session' },
  'will/followups': { methods: ['GET'], cls: 'session' },
  'will/health': { methods: ['GET'], cls: 'session' },
  'will/insights/monthly': { methods: ['GET'], cls: 'session' },
  'will/knowledge': { methods: ['GET', 'POST'], cls: 'session' },
  'will/link': { methods: ['GET'], cls: 'session' },
  'will/media/[id]': { methods: ['GET'], cls: 'session' },
  'will/messages': { methods: ['GET'], cls: 'session' },
  'will/mine': { methods: ['POST'], cls: 'session' },
  'will/morning': { methods: ['GET'], cls: 'session' },
  'will/report': { methods: ['GET'], cls: 'session' },
  'will/search': { methods: ['GET'], cls: 'session' },
  'will/seed': { methods: ['POST'], cls: 'session' },
  'will/state': { methods: ['GET'], cls: 'session' },
  'will/system': { methods: ['GET'], cls: 'session' },
  'will/orphan-sweep': { methods: ['GET'], cls: 'cron' },
  'will/tick': { methods: ['GET'], cls: 'cron' },
  'will/version': { methods: ['GET'], cls: 'session' },
  'will/webhook': { methods: ['GET', 'POST'], cls: 'webhook' },
  'will/whatsapp/connect': { methods: ['POST'], cls: 'session' },
  'will/whatsapp/inbound-check': { methods: ['GET'], cls: 'session' },
}

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (/^route\.tsx?$/.test(e.name)) out.push(p)
  }
  return out
}

const routes = walk(ROOT).map((f) => ({
  id: path.relative(ROOT, path.dirname(f)).split(path.sep).join('/'),
  file: f,
  src: fs.readFileSync(f, 'utf8'),
}))

const METHOD_RE = /^export (?:async )?function (GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\b|^export const (GET|POST|PUT|PATCH|DELETE|OPTIONS|HEAD)\b/gm

function handlers(src: string): Array<{ method: string; body: string }> {
  const marks = [...src.matchAll(METHOD_RE)].map((m) => ({ method: (m[1] || m[2]) as string, at: m.index as number }))
  return marks.map((m, i) => {
    const rest = src.slice(m.at + 1)
    const next = rest.search(/\n(?:export |\/\/ =====)/)
    const body = next === -1 ? src.slice(m.at) : src.slice(m.at, m.at + 1 + next)
    return { method: m.method, body: i >= 0 ? body : body }
  })
}

const AUTH = /\b(?:validateSession|validateSessionFresh)\(|\bsessionValid\(|\bcronAuthorized\(|\bauth\(req\)|\bauthed\(/
// Anything that reads the caller's data or touches storage must come AFTER auth.
const WORK = /await (?:req|request)\.(?:json|formData|text|arrayBuffer)\(|\breadJson\(|\bgetStore\(|\bgetSupabase\(|await import\('@\/lib\/db'\)|await params\b|\brecordDataRead\(/

describe('route inventory is pinned', () => {
  it('finds every route and nothing unlisted', () => {
    expect(routes.map((r) => r.id).sort()).toEqual(Object.keys(INVENTORY).sort())
  })

  it.each(routes.map((r) => [r.id, r] as const))('%s exports exactly the pinned methods', (id, r) => {
    const methods = handlers(r.src).map((h) => h.method).sort()
    expect(methods).toEqual([...INVENTORY[id].methods].sort())
  })

  it('no route exports OPTIONS or HEAD (Next answers those itself, with no CORS headers)', () => {
    for (const r of routes) {
      expect(handlers(r.src).map((h) => h.method)).not.toContain('OPTIONS')
      expect(handlers(r.src).map((h) => h.method)).not.toContain('HEAD')
    }
  })
})

describe('every gated handler authenticates before doing anything', () => {
  const gated = routes.filter((r) => INVENTORY[r.id]?.cls === 'session' || INVENTORY[r.id]?.cls === 'cron')

  it('there are gated routes', () => expect(gated.length).toBeGreaterThan(35))

  for (const r of gated) {
    for (const h of handlers(r.src)) {
      it(`${r.id} ${h.method}`, () => {
        // will/actions: POST is a try/catch wrapper that delegates to handlePost,
        // which checks the session on its first line. Analyse the delegate.
        const body = r.id === 'will/actions' ? r.src.slice(r.src.indexOf('async function handlePost')) : h.body
        const auth = body.search(AUTH)
        expect(auth).toBeGreaterThanOrEqual(0)
        const work = body.search(WORK)
        // crm/seed: development switch first (returns 404 before anything), then auth.
        if (work !== -1) expect(auth).toBeLessThan(work)
        // The unauthorised answer must be a 401, not a redirect or a 200.
        expect(body).toMatch(/401/)
      })
    }
  }
})

describe('public handlers are exactly the intended ones', () => {
  const pub = routes.filter((r) => INVENTORY[r.id]?.cls === 'public').map((r) => r.id).sort()
  it('list', () => {
    expect(pub).toEqual(
      ['abn-form', 'analytics/funnel', 'crm/login', 'crm/logout', 'crm/verify-otp', 'google-reviews', 'super-form', 'tax-form', 'tax-form/fix', 'tax-form/link', 'tax-form/upload', 'tfn-form'].sort(),
    )
  })

  it('public write endpoints call a rate limiter or lockout', () => {
    for (const id of ['abn-form', 'analytics/funnel', 'super-form', 'tax-form', 'tax-form/upload', 'tfn-form']) {
      expect(routes.find((r) => r.id === id)!.src).toMatch(/isRateLimited\(/)
    }
    expect(routes.find((r) => r.id === 'crm/login')!.src).toMatch(/lockout|Lockout|isLocked|recordFailure|attempts/i)
  })

  it('public routes never read a brand from the request body or query', () => {
    for (const r of routes.filter((x) => INVENTORY[x.id].cls === 'public')) {
      expect(r.src).not.toMatch(/formData\.get\(['"]brand['"]\)|body\.brand|searchParams\.get\(['"]brand['"]\)/)
    }
  })
})

describe('webhook and cron', () => {
  const wh = routes.find((r) => r.id === 'will/webhook')!.src
  it('the POST verifies the HMAC before parsing the payload', () => {
    const post = handlers(wh).find((h) => h.method === 'POST')!.body
    const verify = post.indexOf('verifySignature(')
    const parse = post.indexOf('JSON.parse')
    expect(verify).toBeGreaterThan(0)
    expect(parse).toBeGreaterThan(verify)
  })
  it('the GET handshake compares the verify token in constant time', () => {
    const get = handlers(wh).find((h) => h.method === 'GET')!.body
    expect(get).toMatch(/safeStrEqual\(/)
  })
  it('cron accepts a secret only through constant-time comparison', () => {
    const auth = fs.readFileSync(path.join(process.cwd(), 'src/lib/will/auth.ts'), 'utf8')
    expect(auth).toMatch(/timingSafeEqual/)
    expect(auth).not.toMatch(/searchParams|req\.url/) // never a secret in a URL
  })
})

describe('no CORS, no stack traces, no environment in responses', () => {
  it('no route sets Access-Control-* headers', () => {
    for (const r of routes) expect(r.src).not.toMatch(/access-control-/i)
  })
  it('next.config.js and vercel.json set no Access-Control-* headers', () => {
    expect(fs.readFileSync(path.join(process.cwd(), 'next.config.js'), 'utf8')).not.toMatch(/access-control-/i)
    expect(fs.readFileSync(path.join(process.cwd(), 'vercel.json'), 'utf8')).not.toMatch(/access-control-/i)
  })
  it('no route returns a stack or the environment', () => {
    for (const r of routes) {
      expect(r.src).not.toMatch(/\.stack\b/)
      expect(r.src).not.toMatch(/json\([^)]*process\.env(?!\.\w)/)
      expect(r.src).not.toMatch(/JSON\.stringify\(process\.env/)
    }
  })
  it('public routes never echo a caught error message to the caller', () => {
    // A thrown Error from storage or the database must not reach an anonymous caller.
    // UploadValidationError (customer-actionable text) is the one allowed exception.
    for (const id of ['abn-form', 'super-form', 'tax-form', 'tax-form/upload', 'tfn-form', 'analytics/funnel']) {
      const src = routes.find((r) => r.id === id)!.src
      for (const m of src.matchAll(/NextResponse\.json\(\s*\{[^}]*\b(?:message|detail|error)\s*:\s*([^,}]+)/g)) {
        const v = m[1].trim()
        const ok = /^'[^']*'$/.test(v) || /^uploadErr\.message$/.test(v) || /^(?:err|e|error)\b.*instanceof UploadValidationError/.test(v)
        expect({ id, v, ok }).toEqual({ id, v, ok: true })
      }
    }
  })
})

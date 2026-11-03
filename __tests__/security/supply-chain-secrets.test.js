/**
 * Local, offline supply-chain and secrets guardrails (security audit, sec-supply-secrets).
 * No network, no git needed. Fails loudly if:
 *  - .gitignore stops covering env file variants
 *  - package-lock.json gains a non-registry / unverified-integrity package
 *  - a new package with an install script appears (review it first)
 *  - a new production dependency is added without updating the reviewed list
 *  - something that looks like a live credential is committed in the project tree
 * Matches are reported as file:line and type only. Values are never printed.
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..', '..')
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8')

describe('gitignore', () => {
  const lines = read('.gitignore').split(/\r?\n/).map((l) => l.trim())
  test.each(['.env', '.env.local', '.env.*', '!.env.example', '.data/', '*.pem', '*.key', '.vercel/'])(
    'contains %s',
    (entry) => expect(lines).toContain(entry),
  )
  test('the env template is ignored-exempt and the example file holds no real values', () => {
    const ex = read('.env.example').split(/\r?\n/).filter((l) => /^[A-Z0-9_]+=/.test(l))
    for (const l of ex) {
      const val = l.slice(l.indexOf('=') + 1).trim()
      // empty, or an obvious placeholder
      expect(val === '' || /^(re_x+|your@email\.com|https:\/\/workingholidaytax\.com\.au|false)$/.test(val)).toBe(true)
    }
  })
})

describe('package-lock.json integrity', () => {
  const lock = JSON.parse(read('package-lock.json'))
  const pkgs = Object.entries(lock.packages).filter(([k]) => k !== '')

  test('lockfile v3 and every package resolves from the npm registry with a sha512 integrity hash', () => {
    expect(lock.lockfileVersion).toBe(3)
    const bad = pkgs.filter(([, v]) => !v.link && (!/^https:\/\/registry\.npmjs\.org\//.test(v.resolved || '') || !/^sha512-/.test(v.integrity || '')))
    expect(bad.map(([k]) => k)).toEqual([])
  })

  test('no git, file, http or tarball-url dependencies in package.json', () => {
    const pj = JSON.parse(read('package.json'))
    const all = { ...pj.dependencies, ...pj.devDependencies }
    const bad = Object.entries(all).filter(([, v]) => /^(git|github:|file:|http|link:|\.\.?\/)/.test(v) || /\.tgz$/.test(v))
    expect(bad).toEqual([])
  })

  test('only reviewed packages have install scripts (reviewed 2 Nov 2026: all dev/optional)', () => {
    const withScripts = pkgs.filter(([, v]) => v.hasInstallScript).map(([k]) => k.replace(/^.*node_modules\//, ''))
    const allowed = new Set(['fsevents', 'unrs-resolver'])
    expect(withScripts.filter((n) => !allowed.has(n))).toEqual([])
  })

  test('production dependency list matches the reviewed list (run the supply-chain review before changing it)', () => {
    const pj = JSON.parse(read('package.json'))
    expect(Object.keys(pj.dependencies).sort()).toEqual(
      ['@supabase/supabase-js', 'heic-convert', 'libphonenumber-js', 'next', 'react', 'react-dom', 'redis'],
    )
  })
})

describe('no committed secrets in the project tree', () => {
  const SKIP_DIRS = new Set(['node_modules', '.next', '.git', '.data', '.claude', '.audit-state', 'test-results', 'playwright-report', 'security-assessment', 'audit-output', 'coverage', 'output'])
  const SKIP_EXT = /\.(png|jpe?g|gif|webp|avif|ico|pdf|woff2?|ttf|otf|mp4|mov|zip|lock|tsbuildinfo)$/i
  const SKIP_FILES = new Set(['package-lock.json'])
  const RULES = [
    ['stripe-secret-key', /\b(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{10,}/],
    ['stripe-webhook-secret', /\bwhsec_[A-Za-z0-9]{10,}/],
    ['aws-access-key', /\bAKIA[0-9A-Z]{16}\b/],
    ['google-api-key', /\bAIza[0-9A-Za-z_-]{30,}/],
    ['github-token', /\b(?:ghp|gho|ghs|ghu)_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{20,}/],
    ['slack-token', /\bxox[baprs]-[A-Za-z0-9-]{10,}/],
    ['resend-api-key', /\bre_(?!x+\b)[A-Za-z0-9]{20,}/],
    ['anthropic-api-key', /\bsk-ant-[A-Za-z0-9_-]{20,}/],
    ['openai-style-key', /\bsk-[A-Za-z0-9]{32,}/],
    ['meta-whatsapp-token', /\bEAA[A-Za-z0-9]{30,}/],
    ['private-key-block', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
    ['jwt', /\beyJ[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{15,}\.[A-Za-z0-9_-]{5,}/],
    ['credentialed-url', /\b(?:rediss?|postgres(?:ql)?|mongodb(?:\+srv)?|mysql):\/\/[^\s'"@/:]+:[^\s'"@/]+@/],
  ]

  function* walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (!SKIP_DIRS.has(e.name)) yield* walk(path.join(dir, e.name))
      } else if (e.isFile() && !SKIP_EXT.test(e.name) && !SKIP_FILES.has(e.name)) {
        yield path.join(dir, e.name)
      }
    }
  }

  test('no credential-shaped strings (reports file:line and type only)', () => {
    const hits = []
    for (const f of walk(ROOT)) {
      if (fs.statSync(f).size > 2_000_000) continue
      const rel = path.relative(ROOT, f)
      const lines = fs.readFileSync(f, 'utf8').split(/\r?\n/)
      lines.forEach((line, i) => {
        if (line.length > 5000) return
        for (const [type, re] of RULES) if (re.test(line)) hits.push(`${rel}:${i + 1} ${type}`)
      })
    }
    expect(hits).toEqual([])
  })
})

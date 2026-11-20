/**
 * Jo, 20 Nov: the admin screens have one address each, with no aliases and no
 * redirects from the old ones: /crm (CRM), /will (Will), /mia (Mia), /atlas.
 */
import fs from 'fs'
import path from 'path'

const APP = path.join(process.cwd(), 'src/app/(site)')

describe('admin addresses', () => {
  it('each screen is a real route under the (admin) group', () => {
    for (const p of ['(admin)/crm/page.tsx', '(admin)/will/page.tsx', '(admin)/mia/page.tsx', '(admin)/atlas/page.tsx', '(admin)/control/page.tsx', '(admin)/layout.tsx']) {
      expect(fs.existsSync(path.join(APP, p))).toBe(true)
    }
  })
  it('the old addresses are gone', () => {
    for (const p of ['crm', 'crm/dashboard', 'crm/whatsapp', 'crm/mia', 'crm/atlas']) {
      expect(fs.existsSync(path.join(APP, p))).toBe(false)
    }
  })
  it('no rewrite or redirect points at an admin screen', async () => {
    const cfg = require('../../../next.config.js')
    const rw = await cfg.rewrites()
    const all = [...(rw.beforeFiles ?? []), ...(rw.afterFiles ?? []), ...(rw.fallback ?? []), ...(await cfg.redirects())]
    const admin = /^\/(?:crm|will|mia|atlas|control)(?:\/|$)/
    expect(all.filter((r: { source: string; destination: string }) => admin.test(r.source) || admin.test(r.destination))).toEqual([])
  })
  it('no source file still links to an old address', () => {
    const hits: string[] = []
    const walk = (d: string) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name)
        if (e.isDirectory()) { if (e.name !== '__tests__' && e.name !== 'node_modules') walk(p); continue }
        if (!/\.(tsx?|js|css)$/.test(e.name)) continue
        const s = fs.readFileSync(p, 'utf8')
        if (/(?<!api)\/crm\/(?:dashboard|whatsapp|mia|atlas)\b/.test(s)) hits.push(p)
      }
    }
    walk(path.join(process.cwd(), 'src'))
    expect(hits).toEqual([])
  })
})

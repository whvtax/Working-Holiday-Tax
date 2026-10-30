/**
 * 30 Oct 2026: a legacy redirect "/start -> /tax-form" was rewritten by the
 * slug reset into "/start -> /start", which sent every visitor in a loop.
 * No redirect may point at its own source, and the live form slugs may not
 * be a redirect source at all.
 */
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextConfig = require('../../../next.config.js') as { redirects: () => Promise<{ source: string; destination: string }[]> }
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { WHT, SVT } = require('../../../config/form-paths.js') as { WHT: Record<string, string>; SVT: Record<string, string> }

describe('redirects', () => {
  it('none points at its own source', async () => {
    const rules = await nextConfig.redirects()
    const loops = rules.filter((r) => r.source === r.destination)
    expect(loops).toEqual([])
  })
  it('the live form pages are never a redirect source', async () => {
    const rules = await nextConfig.redirects()
    const live = [...Object.values(WHT), ...Object.values(SVT)].flatMap((s) => [`/${s}`, `/de/${s}`, `/ja/${s}`, `/zh/${s}`, `/vi/${s}`])
    expect(rules.filter((r) => live.includes(r.source))).toEqual([])
  })
})

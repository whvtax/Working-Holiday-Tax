/**
 * Round 2: the absolute form of the SVT host ("studentvisatax.com.au.", with the
 * final dot) matched no rewrite and was served as WHT: WHT pages, /crm and every
 * /api route on the SVT domain. Both the router rule and the runtime brand lookup
 * must treat it as SVT, and the standalone WHT forms must stay closed on SVT hosts.
 */
import { getPathMatch } from 'next/dist/shared/lib/router/utils/path-match'
import { matchHas } from 'next/dist/shared/lib/router/utils/prepare-destination'
import { modifyRouteRegex } from 'next/dist/lib/redirect-status'
import routing from '../../../config/brand-routing'
import { brandFromHost } from '@/lib/brand'

const { brandRewrites, NOT_FOUND_PATH, SVT_SEGMENT } = routing

function route(host: string, pathname: string, allowlist?: string[]): string {
  const req = { headers: { host } } as unknown as Parameters<typeof matchHas>[0]
  let current = pathname
  for (const rule of brandRewrites(allowlist) as { source: string; has?: never[]; missing?: never[]; destination: string }[]) {
    const params = getPathMatch(rule.source, { strict: true, removeUnnamedParams: true, regexModifier: (r: string) => modifyRouteRegex(r) })(current)
    if (!params) continue
    if (!matchHas(req, {}, rule.has ?? [], rule.missing ?? [])) continue
    current = rule.destination.replace(/:(\w+)/g, (_, k) => String((params as Record<string, string>)[k] ?? ''))
  }
  return current
}
const blocked = (d: string) => d === NOT_FOUND_PATH || d === `/${SVT_SEGMENT}${NOT_FOUND_PATH}`

describe.each(['studentvisatax.com.au.', 'www.studentvisatax.com.au.', 'STUDENTVISATAX.COM.AU.', 'svt.localhost.:3100'])('SVT host spelled %s', (host) => {
  it('is SVT at runtime', () => expect(brandFromHost(host)).toBe('svt'))
  it('never reaches WHT pages, /crm or WHT API routes', () => {
    expect(route(host, '/')).toBe(`/${SVT_SEGMENT}`)
    expect(route(host, '/crm')).toBe(`/${SVT_SEGMENT}/crm`)
    for (const p of ['/api/crm/login', '/api/tfn-form', '/api/abn-form', '/api/super-form', '/api/will/webhook', '/api/google-reviews']) {
      expect(blocked(route(host, p))).toBe(true)
    }
  })
  it('with the form flag on, only the SVT tax form and its upload are open', () => {
    const allow = routing.svtApiAllowlist({ SVT_FORMS_ENABLED: 'true' })
    expect(route(host, '/api/tax-form', allow)).toBe('/api/tax-form')
    expect(route(host, '/api/tax-form/upload', allow)).toBe('/api/tax-form/upload')
    for (const p of ['/api/tfn-form', '/api/abn-form', '/api/super-form', '/api/crm/file']) expect(blocked(route(host, p, allow))).toBe(true)
  })
})

it('a look-alike or WHT host is still WHT and never SVT', () => {
  for (const h of ['workingholidaytax.com.au.', 'evil-studentvisatax.com.au.', 'studentvisatax.com.au.evil.example', 'studentvisatax.com.au..']) {
    expect(brandFromHost(h)).toBe('wht')
    expect(blocked(route(h, `/${SVT_SEGMENT}`))).toBe(true)
  }
})

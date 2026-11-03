/**
 * Security round 2 (sec2-cron-abuse): cron authorisation must FAIL CLOSED.
 * Synthetic secrets only.
 */
jest.mock('next/headers', () => ({ headers: jest.fn(), cookies: jest.fn() }))
jest.mock('@/lib/crm-store', () => ({ validateSession: jest.fn(), ensureRevocationFresh: jest.fn().mockResolvedValue(undefined) }))

import { headers, cookies } from 'next/headers'
import { validateSession } from '@/lib/crm-store'
import { cronAuthorized, cronAuthMethod } from '@/lib/will/auth'

const mockHeaders = headers as unknown as jest.Mock
const mockCookies = cookies as unknown as jest.Mock
const mockValidate = validateSession as unknown as jest.Mock

const h = (m: Record<string, string>) => mockHeaders.mockResolvedValue({ get: (k: string) => m[k.toLowerCase()] ?? null })
const noSession = () => { mockCookies.mockResolvedValue({ get: () => undefined }); mockValidate.mockReturnValue(false) }

const saved = { c: process.env.CRON_SECRET, w: process.env.WILL_CRON_SECRET }
beforeEach(() => { jest.clearAllMocks(); noSession() })
afterAll(() => {
  if (saved.c === undefined) delete process.env.CRON_SECRET; else process.env.CRON_SECRET = saved.c
  if (saved.w === undefined) delete process.env.WILL_CRON_SECRET; else process.env.WILL_CRON_SECRET = saved.w
})

describe('a missing or empty CRON_SECRET never authorises anything', () => {
  it.each([
    ['both unset, no header', undefined, undefined, {}],
    ['CRON_SECRET unset, attacker sends "Bearer undefined"', undefined, undefined, { authorization: 'Bearer undefined' }],
    ['CRON_SECRET unset, attacker sends "Bearer "', undefined, undefined, { authorization: 'Bearer ' }],
    ['CRON_SECRET empty string, attacker sends "Bearer "', '', undefined, { authorization: 'Bearer ' }],
    ['CRON_SECRET empty string, attacker sends "Bearer"', '', undefined, { authorization: 'Bearer' }],
    ['WILL_CRON_SECRET empty, attacker sends empty x-cron-secret', undefined, '', { 'x-cron-secret': '' }],
    ['WILL_CRON_SECRET unset, attacker sends "undefined"', undefined, undefined, { 'x-cron-secret': 'undefined' }],
    ['WILL_CRON_SECRET unset, attacker sends "null"', undefined, undefined, { 'x-cron-secret': 'null' }],
  ])('%s', async (_n, cron, will, hdrs) => {
    if (cron === undefined) delete process.env.CRON_SECRET; else process.env.CRON_SECRET = cron
    if (will === undefined) delete process.env.WILL_CRON_SECRET; else process.env.WILL_CRON_SECRET = will
    h(hdrs as Record<string, string>)
    expect(await cronAuthorized()).toBe(false)
    expect(await cronAuthMethod()).toBeNull()
  })
})

describe('with secrets configured, near misses are refused', () => {
  beforeEach(() => { process.env.CRON_SECRET = 'synthetic-cron-secret-0123456789'; process.env.WILL_CRON_SECRET = 'synthetic-will-secret-0123456789' })
  it.each([
    ['wrong scheme', { authorization: 'Basic synthetic-cron-secret-0123456789' }],
    ['lowercase scheme', { authorization: 'bearer synthetic-cron-secret-0123456789' }],
    ['no scheme', { authorization: 'synthetic-cron-secret-0123456789' }],
    ['trailing space', { authorization: 'Bearer synthetic-cron-secret-0123456789 ' }],
    ['prefix only', { authorization: 'Bearer synthetic-cron-secret-012345678' }],
    ['one char off, same length', { authorization: 'Bearer synthetic-cron-secret-0123456780' }],
    ['longer', { authorization: 'Bearer synthetic-cron-secret-0123456789x' }],
    ['cron secret in the wrong header', { 'x-cron-secret': 'synthetic-cron-secret-0123456789' }],
    ['will secret as bearer', { authorization: 'Bearer synthetic-will-secret-0123456789' }],
    ['query-style value', { 'x-cron-secret': 'synthetic-will-secret-0123456789&x=1' }],
  ])('%s', async (_n, hdrs) => {
    h(hdrs)
    expect(await cronAuthorized()).toBe(false)
  })
  it('the right values are accepted (the real cron still works)', async () => {
    h({ authorization: 'Bearer synthetic-cron-secret-0123456789' })
    expect(await cronAuthMethod()).toBe('cron_secret')
    h({ 'x-cron-secret': 'synthetic-will-secret-0123456789' })
    expect(await cronAuthMethod()).toBe('will_cron_secret')
  })
  it('a forged crm_session cookie does not authorise (validateSession decides)', async () => {
    mockCookies.mockResolvedValue({ get: () => ({ value: 'forged' }) })
    mockValidate.mockReturnValue(false)
    h({})
    expect(await cronAuthorized()).toBe(false)
  })
})

describe('the schedule in vercel.json exposes exactly the tick route', () => {
  it('has two crons and both target guarded routes', () => {
    const cfg = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', '..', '..', '..', 'vercel.json'), 'utf8'))
    expect(cfg.crons.map((c: { path: string }) => c.path)).toEqual(['/api/will/tick', '/api/will/orphan-sweep'])
    const route = require('fs').readFileSync(require('path').join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'tick', 'route.ts'), 'utf8')
    expect(route.indexOf('cronAuthorized()')).toBeGreaterThan(-1)
    expect(route.indexOf('cronAuthorized()')).toBeLessThan(route.indexOf('processDueJobs()'))
    const sweep = require('fs').readFileSync(require('path').join(__dirname, '..', '..', '..', 'app', 'api', 'will', 'orphan-sweep', 'route.ts'), 'utf8')
    expect(sweep.indexOf('cronAuthorized()')).toBeGreaterThan(-1)
    expect(sweep.indexOf('cronAuthorized()')).toBeLessThan(sweep.indexOf('runOrphanSweep()'))
  })
})

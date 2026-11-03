/** Security round 2 (R2-5): forged pre-auth ids must not create Redis state; the 5-guess limit is intact. Synthetic data only. */
import crypto from 'crypto'
import { NextRequest } from 'next/server'

const store = new Map<string, string>()
const writes: string[] = []
const redis = {
  get: async (k: string) => store.get(k) ?? null,
  incr: async (k: string) => { writes.push(`incr ${k}`); const n = Number(store.get(k) ?? 0) + 1; store.set(k, String(n)); return n },
  expire: async (k: string) => { writes.push(`expire ${k}`); return 1 },
  del: async (k: string | string[]) => { for (const x of ([] as string[]).concat(k)) store.delete(x); return 1 },
}
jest.mock('@/lib/rate-limit', () => ({ getRedis: async () => redis }))
jest.mock('@/lib/crm-store', () => ({ createSession: () => 'synthetic-session-token' }))
jest.mock('@/lib/security-watch', () => ({
  recordLoginEvent: jest.fn(), requestInfo: () => ({}), checkNewDevice: jest.fn(), sendSecurityEmail: jest.fn(),
}))

import { POST } from '../route'

const ID = 'a'.repeat(48)
const sha = (s: string) => crypto.createHash('sha256').update(s).digest('hex')
const post = (code: string, id: string | null = ID) => POST(new NextRequest('http://x.test/api/crm/verify-otp', {
  method: 'POST', body: JSON.stringify({ code }),
  headers: { 'content-type': 'application/json', ...(id ? { cookie: `crm_preauth=${id}` } : {}) },
}))

beforeEach(() => { store.clear(); writes.length = 0; jest.spyOn(console, 'error').mockImplementation(() => {}) })
afterEach(() => jest.restoreAllMocks())

it('a forged pre-auth id (never issued) is refused and writes nothing to Redis', async () => {
  for (let i = 0; i < 20; i++) {
    const res = await post('12345678', crypto.randomBytes(24).toString('hex'))
    expect(res.status).toBe(401)
  }
  expect(writes).toEqual([])
  expect(store.size).toBe(0)
})

it('the correct code logs in and sets the session cookie', async () => {
  store.set(`crm_otp:${ID}`, sha('87654321'))
  const res = await post('87654321')
  expect(res.status).toBe(200)
  expect(res.headers.get('set-cookie')).toContain('crm_session=synthetic-session-token')
  expect(store.has(`crm_otp:${ID}`)).toBe(false)
})

it('five wrong guesses are allowed, the sixth is blocked and burns the code, even the right code afterwards fails', async () => {
  store.set(`crm_otp:${ID}`, sha('87654321'))
  const statuses: number[] = []
  for (let i = 0; i < 6; i++) statuses.push((await post(`0000000${i}`)).status)
  expect(statuses).toEqual([401, 401, 401, 401, 401, 429])
  expect((await post('87654321')).status).toBe(401)
})

it('missing or malformed cookie is refused before Redis is touched', async () => {
  expect((await post('12345678', null)).status).toBe(401)
  expect((await post('12345678', 'not-hex')).status).toBe(401)
  expect(writes).toEqual([])
})

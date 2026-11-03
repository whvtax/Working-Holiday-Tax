import { NextRequest } from 'next/server'
import { crossSiteMutationReason } from '@/lib/request-guard'
import { proxy, config } from '@/proxy'

const mk = (method: string, headers: Record<string, string> = {}, path = '/api/crm/clients/x') =>
  new NextRequest(`https://crm.example.test${path}`, { method, headers })

describe('crossSiteMutationReason', () => {
  it('allows safe methods regardless of headers', () => {
    expect(crossSiteMutationReason(mk('GET', { origin: 'https://evil.test' }))).toBeNull()
  })
  it('allows non-browser callers (no Origin, no Sec-Fetch-Site)', () => {
    expect(crossSiteMutationReason(mk('POST'))).toBeNull()
  })
  it('allows same origin', () => {
    expect(crossSiteMutationReason(mk('POST', { origin: 'https://crm.example.test' }))).toBeNull()
    expect(crossSiteMutationReason(mk('POST', { 'sec-fetch-site': 'same-origin' }))).toBeNull()
  })
  it('refuses another origin, a sibling subdomain, and Origin: null (previously failed open)', () => {
    expect(crossSiteMutationReason(mk('POST', { origin: 'https://evil.test' }))).toBeTruthy()
    expect(crossSiteMutationReason(mk('DELETE', { origin: 'https://blog.example.test' }))).toBeTruthy()
    expect(crossSiteMutationReason(mk('POST', { origin: 'null' }))).toBeTruthy()
    expect(crossSiteMutationReason(mk('POST', { origin: 'not a url' }))).toBeTruthy()
  })
  it('refuses same-site and cross-site Fetch Metadata', () => {
    expect(crossSiteMutationReason(mk('PATCH', { 'sec-fetch-site': 'same-site' }))).toBeTruthy()
    expect(crossSiteMutationReason(mk('PATCH', { 'sec-fetch-site': 'cross-site' }))).toBeTruthy()
  })
})

describe('proxy coverage', () => {
  it('matcher covers crm pages and both guarded API trees', () => {
    expect(config.matcher).toEqual(expect.arrayContaining(['/crm', '/api/crm/:path*', '/api/will/:path*']))
  })
  it.each(['/api/crm/login', '/api/crm/verify-otp', '/api/crm/clients/abc', '/api/will/actions', '/api/will/knowledge', '/api/will/whatsapp/connect'])(
    '%s: cross-site POST gets 403, same-origin passes',
    (path) => {
      expect(proxy(mk('POST', { origin: 'null' }, path)).status).toBe(403)
      expect(proxy(mk('POST', { origin: 'https://evil.test' }, path)).status).toBe(403)
      expect(proxy(mk('POST', { origin: 'https://crm.example.test' }, path)).status).toBe(200)
    },
  )
  it('Meta webhook style POST (no browser headers) is not blocked', () => {
    expect(proxy(mk('POST', {}, '/api/will/webhook')).status).toBe(200)
  })
})

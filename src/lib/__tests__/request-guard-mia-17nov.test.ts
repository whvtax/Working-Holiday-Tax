import { isGuardedApiPath } from '@/lib/request-guard'

describe('cross-site guard covers Mia routes (17 Nov audit WMA-01)', () => {
  it.each(['/api/mia/move', '/api/mia/send', '/api/mia/status', '/api/mia/form-link'])('guards %s', (p) => {
    expect(isGuardedApiPath(p)).toBe(true)
  })
  it('still does not guard public customer forms', () => {
    expect(isGuardedApiPath('/api/tax-form/upload')).toBe(false)
  })
})

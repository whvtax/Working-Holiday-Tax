import { lockoutScope } from '@/lib/crm-store'

describe('lockoutScope', () => {
  it('leaves IPv4 untouched', () => {
    expect(lockoutScope('203.0.113.7')).toBe('203.0.113.7')
  })
  it('collapses addresses in one IPv6 /64 to the same bucket', () => {
    const a = lockoutScope('2001:db8:1:2:aaaa:bbbb:cccc:dddd')
    const b = lockoutScope('2001:0db8:0001:0002::1')
    expect(a).toBe(b)
    expect(a).toBe('2001:db8:1:2::/64')
  })
  it('separates different /64s', () => {
    expect(lockoutScope('2001:db8:1:3::1')).not.toBe(lockoutScope('2001:db8:1:2::1'))
  })
  it('leaves IPv4-mapped, unknown and junk values alone', () => {
    expect(lockoutScope('::ffff:1.2.3.4')).toBe('::ffff:1.2.3.4')
    expect(lockoutScope('unknown')).toBe('unknown')
    expect(lockoutScope('zz::1')).toBe('zz::1')
  })
})

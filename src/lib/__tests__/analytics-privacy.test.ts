import { sanitizeProps } from '@/app/(site)/blog/analytics'
import fs from 'fs'
import path from 'path'

describe('analytics privacy guard', () => {
  it('redacts email addresses and long digit runs in string props', () => {
    const out = sanitizeProps({ query: 'jo@example.com', q2: 'my tfn 123 456 782', q3: 'abc-1234567890', n: 5, ok: true })!
    expect(out.query).toBe('[redacted]')
    expect(String(out.q2)).not.toMatch(/\d{3}/)
    expect(String(out.q3)).not.toMatch(/\d{6}/)
    expect(out.n).toBe(5)
    expect(out.ok).toBe(true)
  })

  it('keeps ordinary short text and caps length', () => {
    expect(sanitizeProps({ category: 'tax-return', y: '2024' })).toEqual({ category: 'tax-return', y: '2024' })
    expect(String(sanitizeProps({ t: 'x'.repeat(300) })!.t)).toHaveLength(100)
  })

  it('event helpers in src/lib/analytics.ts never take form-field style parameters', () => {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/lib/analytics.ts'), 'utf8')
    expect(src).not.toMatch(/\b(tfn|passport|bank|email|phone|mobile|bsb|account)\b\s*[:?]/i)
  })
})

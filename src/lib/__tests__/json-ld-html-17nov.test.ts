import { jsonLdHtml } from '@/lib/json-ld-html'

describe('jsonLdHtml (17 Nov audit WMA-10)', () => {
  it('escapes a closing script tag inside a value', () => {
    const out = jsonLdHtml({ name: 'x</script><script>alert(1)</script>' })
    expect(out).not.toContain('</script>')
    expect(out).not.toContain('<')
    expect(JSON.parse(out).name).toBe('x</script><script>alert(1)</script>')
  })
  it('gives the same JSON as JSON.stringify for normal schema values', () => {
    const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', name: 'Tax & refunds' }
    expect(JSON.parse(jsonLdHtml(schema))).toEqual(schema)
  })
})

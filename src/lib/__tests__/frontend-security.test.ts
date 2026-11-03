/**
 * Frontend security regression tests (security audit, sec-frontend).
 */
import { renderInlineMarkdown } from '@/lib/render-inline'
import { isFacebookOrigin } from '@/lib/fb-origin'
import { guides } from '@/app/(site)/blog/data'

// The implementation GuideArticle used before the audit, verbatim.
const legacyRenderInline = (raw: string) =>
  raw
    .replace(/\*\*([^*]+)\*\*/g, '<strong style="font-weight:600;color:#0B5240;">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_: string, text: string, href: string) =>
      `<a href="${href}" style="color:#0B5240;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px;font-weight:600;padding:2px 0;">${text}</a>`
    )

describe('guide inline markdown renderer', () => {
  it('produces identical HTML to the previous renderer for every line of every guide', () => {
    let lines = 0
    for (const g of guides) {
      for (const line of g.body.split('\n')) {
        lines++
        expect(renderInlineMarkdown(line)).toBe(legacyRenderInline(line))
      }
    }
    expect(lines).toBeGreaterThan(1000)
  })

  it('keeps legitimate links, including internal paths with anchors and https', () => {
    expect(renderInlineMarkdown('[tax](/tax-return#fees)')).toContain('<a href="/tax-return#fees"')
    expect(renderInlineMarkdown('[ATO](https://www.ato.gov.au/x?a=1&b=2)')).toContain('href="https://www.ato.gov.au/x?a=1&b=2"')
    expect(renderInlineMarkdown('**bold**')).toBe('<strong style="font-weight:600;color:#0B5240;">bold</strong>')
  })

  it('cannot write a tag into a body', () => {
    const out = renderInlineMarkdown('hi <img src=x onerror=alert(1)> and **<script>alert(1)</script>**')
    expect(out).not.toMatch(/<img|<script/i)
    expect(out).toContain('&lt;img')
  })

  it.each([
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,<b>x</b>',
    'vbscript:x',
    '//evil.example/x',
    'http://insecure.example/x',
    '/ok" onmouseover="alert(1)',
    "/ok' onmouseover='x",
    ' javascript:alert(1)',
  ])('does not render %p as a link', (href) => {
    const out = renderInlineMarkdown(`[click](${href})`)
    expect(out).not.toContain('<a ')
    expect(out).not.toContain('href=')
  })
})

describe('Facebook postMessage origin check', () => {
  it.each(['https://www.facebook.com', 'https://web.facebook.com', 'https://staticxx.facebook.com', 'https://facebook.com', 'https://business.facebook.com'])(
    'accepts %s', (o) => expect(isFacebookOrigin(o)).toBe(true))

  it.each([
    'https://evilfacebook.com', 'https://facebook.com.evil.example', 'https://notfacebook.com',
    'http://www.facebook.com', 'null', '', 'https://evil.example/facebook.com', 'https://facebook.com@evil.example',
  ])('rejects %p without throwing', (o) => expect(isFacebookOrigin(o)).toBe(false))
})

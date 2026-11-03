/**
 * Legal pages in de/ja must declare their own Open Graph URL, not inherit the
 * language home from the layout (og:url must match the canonical path).
 */
import fs from 'node:fs'
import path from 'node:path'

const pages = [
  ['(de)/de/privacy', '/de/privacy'],
  ['(de)/de/client-agreement', '/de/client-agreement'],
  ['(ja)/ja/privacy', '/ja/privacy'],
  ['(ja)/ja/client-agreement', '/ja/client-agreement'],
]

describe.each(pages)('%s metadata', (dir, route) => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/app', dir, 'page.tsx'), 'utf8')
  it('has canonical and og:url for its own route', () => {
    expect(src).toContain(`canonical: '${route}'`)
    expect(src).toContain(`url: \`\${SITE_URL}${route}\``)
    expect(src).toMatch(/twitter: \{/)
  })
})

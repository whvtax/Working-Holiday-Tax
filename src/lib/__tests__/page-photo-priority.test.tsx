/**
 * PagePhoto lazy-loads by default (inner page photos are below the fold) but a
 * photo in the first screen is the LCP element and must not be lazy. The
 * calculator pages put it directly under the hero, so they pass `priority`.
 */
import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync } from 'fs'
import { join } from 'path'
jest.mock('../../components/wht/PagePhoto.module.css', () => ({ photo: 'photo' }))
import { PagePhoto } from '@/components/wht/PagePhoto'

describe('PagePhoto loading attributes', () => {
  it('is lazy with auto fetch priority by default', () => {
    const html = renderToStaticMarkup(<PagePhoto page="calculator" locale="en" />)
    expect(html).toContain('loading="lazy"')
    expect(html).toContain('width="')
    expect(html).toContain('height="')
  })

  it('is eager with high fetch priority when priority is set', () => {
    const html = renderToStaticMarkup(<PagePhoto page="calculator" locale="en" priority />)
    expect(html).toContain('loading="eager"')
    expect(html).toContain('fetchPriority="high"')
    expect(html).not.toContain('loading="lazy"')
  })

  it('every language calculator page passes priority', () => {
    const dirs = ['(site)/calculator', '(de)/de/calculator', '(ja)/ja/calculator', '(fr)/fr/calculator', '(it)/it/calculator', '(es)/es/calculator']
    for (const d of dirs) {
      const src = readFileSync(join(process.cwd(), 'src/app', d, 'page.tsx'), 'utf8')
      expect(src).toMatch(/<PagePhoto page="calculator" locale="\w+" priority \/>/)
    }
  })
})

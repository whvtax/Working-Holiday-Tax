import { mkdtempSync, mkdirSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { SVT_IMAGES } from '@/lib/svt/images'
import { readyImage } from '@/lib/svt/images-server'
import { homeEn } from '@/lib/svt/content/home-en'
import { homeZh } from '@/lib/svt/content/home-zh'
import { homeVi } from '@/lib/svt/content/home-vi'

describe('image slots', () => {
  it('every slot used on the home page has a spec and an alt text in every language', () => {
    for (const h of [homeEn, homeZh, homeVi]) {
      for (const img of Object.values(h.images)) {
        expect(SVT_IMAGES[img.id]).toBeDefined()
        expect(img.alt.length).toBeGreaterThan(10)
      }
    }
  })
  it('a slot is ready only when every file it needs is on disk', () => {
    const root = mkdtempSync(path.join(tmpdir(), 'svt-img-'))
    const dir = path.join(root, 'public', 'svt-assets', 'img')
    mkdirSync(dir, { recursive: true })
    expect(readyImage('IMG-01', root)).toBeNull()
    writeFileSync(path.join(dir, 'IMG-01-mobile.webp'), 'x')
    expect(readyImage('IMG-01', root)).toBeNull() // desktop crop still missing
    writeFileSync(path.join(dir, 'IMG-01-desktop.webp'), 'x')
    expect(readyImage('IMG-01', root)?.id).toBe('IMG-01')
    expect(readyImage('IMG-99', root)).toBeNull()
  })
})

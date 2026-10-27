// Student Visa Tax: social share images (Open Graph, 1200x630), one per
// language, drawn from the home page's own words so they never drift.
//
//   node --experimental-strip-types --no-warnings scripts/svt-og-images.mjs
//
// Writes public/svt-assets/og/og-{en,zh,vi}.png. Uses the self-hosted brand
// fonts and the locked logo; no network, no generated imagery.
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
// Inlined: a page made with setContent cannot load file:// fonts.
const font = f => `url(data:font/woff2;base64,${readFileSync(path.join(root, 'public/svt-assets/fonts/5.3.0', f)).toString('base64')}) format('woff2')`
const logo = readFileSync(path.join(root, 'public/svt-assets/favicon.svg'), 'utf8')

const { homeEn } = await import(path.join(root, 'src/lib/svt/content/home-en.ts'))
const { homeZh } = await import(path.join(root, 'src/lib/svt/content/home-zh.ts'))
const { homeVi } = await import(path.join(root, 'src/lib/svt/content/home-vi.ts'))
const copy = { en: homeEn, zh: homeZh, vi: homeVi }
const lang = { en: 'en-AU', zh: 'zh-Hans', vi: 'vi' }
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')

for (const [l, c] of Object.entries(copy)) {
  const h = c.hero
  const cjk = l === 'zh'
  // As on the site: the mono face is for numbers; words next to a price in
  // Chinese and Vietnamese are set in the text face.
  const words = l === 'en' ? 'Mono' : cjk ? "'Noto Sans CJK SC'" : 'BVP'
  const html = `<!doctype html><html lang="${lang[l]}"><head><meta charset="utf-8"><style>
    @font-face { font-family: BVP; font-weight: 700; src: ${font('be-vietnam-pro-latin-700-normal.woff2')}; }
    @font-face { font-family: BVP; font-weight: 700; src: ${font('be-vietnam-pro-vietnamese-700-normal.woff2')}; unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB; }
    @font-face { font-family: BVP; font-weight: 500; src: ${font('be-vietnam-pro-latin-500-normal.woff2')}; }
    @font-face { font-family: BVP; font-weight: 500; src: ${font('be-vietnam-pro-vietnamese-500-normal.woff2')}; unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB; }
    @font-face { font-family: Mono; font-weight: 500; src: ${font('ibm-plex-mono-latin-500-normal.woff2')}; }
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; background: #fff; color: #12161F; font-family: BVP, 'Noto Sans CJK SC', sans-serif; padding: 64px 72px; display: flex; flex-direction: column; justify-content: space-between; }
    .brand { display: flex; align-items: center; gap: 16px; font-weight: 700; font-size: 30px; }
    .brand svg { width: 56px; height: 56px; }
    h1 { font-size: ${cjk ? 84 : 80}px; line-height: ${cjk ? 1.25 : 1.04}; letter-spacing: ${cjk ? 0 : '-0.03em'}; font-weight: 700; max-width: 1000px; }
    .mark { background: linear-gradient(transparent 58%, #D6FF3D 58%, #D6FF3D 94%, transparent 94%); padding: 0 4px; white-space: nowrap; }
    .row { display: flex; align-items: baseline; gap: 18px; border-top: 2px solid #12161F; padding-top: 22px; }
    .amt { font-family: Mono; font-weight: 500; font-size: 52px; background: #D6FF3D; padding: 0 10px; }
    .unit { font-family: ${words}; font-size: 26px; font-weight: 500; }
    .sub { margin-left: auto; font-family: ${words}; font-size: 22px; font-weight: 500; color: #3c4350; }
  </style></head><body>
    <div class="brand">${logo}<span>Student Visa Tax</span></div>
    <h1>${esc(h.titleBefore)}<span class="mark">${esc(h.titleMark)}</span>${esc(h.titleAfter ?? '')}</h1>
    <div class="row"><span class="amt">${esc(h.price.amount)}</span><span class="unit">${esc(h.price.unit)}</span><span class="sub">${esc(h.price.sub)}</span></div>
  </body></html>`
  const b = await chromium.launch()
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
  await p.setContent(html, { waitUntil: 'load' })
  await p.evaluate(() => document.fonts.ready)
  await p.screenshot({ path: path.join(root, `public/svt-assets/og/og-${l}.png`) })
  await b.close()
  console.log(`og-${l}.png`)
}

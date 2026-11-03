import fs from 'fs'
import path from 'path'

const src = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/Analytics.tsx'), 'utf8')

describe('GA4 consent banner (Jo, 3 Nov)', () => {
  it('loads the Google scripts only when consent was granted', () => {
    const afterGate = src.split("consent === 'granted'")[1] ?? ''
    expect(afterGate).toMatch(/googletagmanager\.com\/gtag\/js/)
    expect(src.indexOf('googletagmanager.com/gtag/js')).toBeGreaterThan(src.indexOf("consent === 'granted'"))
  })
  it('has the banner in every site language and no dash characters', () => {
    for (const l of ['en', 'de', 'ja', 'fr', 'it', 'es', 'zh', 'vi']) expect(src).toMatch(new RegExp(`\\n  ${l}: \\{ text:`))
    expect(/[—–―]/.test(src)).toBe(false)
  })
})

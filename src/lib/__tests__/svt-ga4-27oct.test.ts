import { readFileSync } from 'fs'
import { join } from 'path'
import { SVT_PUBLIC } from '@/lib/svt/brand-public'
import { GA_MEASUREMENT_ID } from '@/lib/constants'

const src = (p: string) => readFileSync(join(process.cwd(), p), 'utf8')

describe('GA4 per brand (Jo, 27 Oct)', () => {
  it('the student brand has its own GA4 property', () => {
    expect(SVT_PUBLIC.gaMeasurementId).toMatch(/^G-[A-Z0-9]{6,}$/)
    expect(SVT_PUBLIC.gaMeasurementId).not.toBe(GA_MEASUREMENT_ID)
  })
  it('the shared Analytics component names no property itself', () => {
    const a = src('src/components/layout/Analytics.tsx')
    expect(a).not.toMatch(/G-[A-Z0-9]{6,}|@\/lib\/constants/)
  })
  it('each root passes its own ID', () => {
    expect(src('src/components/svt/SvtDocument.tsx')).toContain('measurementId={SVT_PUBLIC.gaMeasurementId}')
    // 18 Nov (decision 017): the form lives under eight locale prefixes now, so the
    // list moved to lib/form-page-paths and is checked by value instead of by source text.
    expect(src('src/components/svt/SvtDocument.tsx')).toMatch(/FORM_PATHS = SVT_FORM_PAGE_PATHS/)
    expect(src('src/components/svt/SvtDocument.tsx')).toContain('untagged={FORM_PATHS}')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { SVT_FORM_PAGE_PATHS } = require('@/lib/form-page-paths')
    expect(SVT_FORM_PAGE_PATHS).toEqual(expect.arrayContaining(['/jhd7hp9xd', '/zh/jhd7hp9xd', '/vi/jhd7hp9xd']))
    expect(src('src/components/layout/RootDocument.tsx')).toContain('measurementId={GA_MEASUREMENT_ID}')
  })
})

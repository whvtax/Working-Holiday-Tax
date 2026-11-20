/**
 * The starting language of the tax form and the locale pages (decision 017).
 *
 * Order: (a) the locale in the URL path, (b) a valid ?lang=, (c) the browser
 * language when it is one of the nine, (d) English.
 */
import fs from 'node:fs'
import path from 'node:path'
import { resolveStartLang, formLangFromTag, pathLocale, FORM_LANG_NAMES, FORM_LANG_HTML, setPickedFormLang, getPickedFormLang, clearPickedFormLang } from '@/lib/form-lang'
import { FORM_LANGS, isFormLang } from '@/lib/formStrings'
import { WHT_TOKEN_FORM_PATHS, SVT_FORM_PAGE_PATHS, WHT_FORM_LOCALES, SVT_FORM_LOCALES } from '@/lib/form-page-paths'
import { WHT_FORM_BRAND } from '@/components/ui/form-brand-wht'
import { SVT_FORM_BRAND } from '@/components/svt/form-brand-svt'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const formPaths = require('../../../config/form-paths')

const ROOT = path.join(__dirname, '..', '..', '..')
const SRC = path.join(ROOT, 'src')
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), 'utf8')

describe('the starting-language order', () => {
  it('(a) the path locale wins over the query and the browser', () => {
    for (const l of FORM_LANGS) {
      expect(resolveStartLang({ pathLang: l, queryLang: 'ja', browserLang: 'fr-FR' })).toBe(l)
    }
  })

  it('(b) with no path locale, a valid ?lang= wins over the browser', () => {
    for (const l of FORM_LANGS) expect(resolveStartLang({ pathLang: null, queryLang: l, browserLang: 'de-DE' })).toBe(l)
    expect(resolveStartLang({ queryLang: ' PT ', browserLang: 'de' })).toBe('pt')
  })

  it('(b) an invalid ?lang= is skipped, not guessed', () => {
    for (const bad of ['xx', 'nl', 'english', 'de-DE', '', '<script>', '../de', 'zh-Hant-TW-x']) {
      expect(resolveStartLang({ queryLang: bad, browserLang: 'it-IT' })).toBe('it')
      expect(resolveStartLang({ queryLang: bad, browserLang: null })).toBe('en')
    }
  })

  it('(c) the browser language is used when it is one of the nine', () => {
    const cases: Array<[string, string]> = [
      ['de-AT', 'de'], ['ja-JP', 'ja'], ['es-AR', 'es'], ['es-419', 'es'], ['fr-CA', 'fr'], ['it', 'it'],
      ['pt-BR', 'pt'], ['pt-PT', 'pt'], ['zh-CN', 'zh'], ['zh-Hans', 'zh'], ['vi-VN', 'vi'], ['en-GB', 'en'], ['EN_au', 'en'],
    ]
    for (const [tag, want] of cases) expect(`${tag}:${resolveStartLang({ browserLang: tag })}`).toBe(`${tag}:${want}`)
  })

  it('(d) anything else is English', () => {
    for (const tag of ['nl-NL', 'ko', 'sv-SE', '', null, undefined, 'x']) expect(resolveStartLang({ browserLang: tag })).toBe('en')
    expect(resolveStartLang({})).toBe('en')
    expect(resolveStartLang({ pathLang: 'nl', queryLang: 'ko', browserLang: 'sv' })).toBe('en')
  })

  it('helpers: tags, path locale, validity', () => {
    expect(formLangFromTag('pt_BR')).toBe('pt')
    expect(formLangFromTag('ko-KR')).toBeNull()
    expect(pathLocale('/de/start')).toBe('de')
    expect(pathLocale('/vi/jhd7hp9xd/w3rp42fav')).toBe('vi')
    expect(pathLocale('/start')).toBeNull()
    expect(pathLocale('/en/start')).toBeNull()
    expect(pathLocale('')).toBeNull()
    expect(isFormLang('pt')).toBe(true)
    expect(isFormLang('PT')).toBe(false)
    expect(isFormLang(null)).toBe(false)
  })

  it('a language picked by hand is remembered for the next step', () => {
    clearPickedFormLang()
    expect(getPickedFormLang()).toBeNull()
    setPickedFormLang('vi')
    expect(getPickedFormLang()).toBe('vi')
    clearPickedFormLang()
  })

  it('the form resolves its language through resolveStartLang, after a hand-picked one', () => {
    const form = read('src/app/(site)/start/FormClient.tsx')
    expect(form).toMatch(/const start = chosen \?\? resolveStartLang\(\{\s*pathLang: routeLang === 'en' \? null : routeLang,\s*queryLang,\s*browserLang: typeof navigator !== 'undefined' \? navigator\.language : null,/)
    expect(form).toContain("searchParams.get('lang')")
    // Storage is only ever touched inside try/catch.
    const langStorage = [...form.matchAll(/^.*sessionStorage\.(?:get|set)Item\(LANG_KEY.*$/gm)].map((m) => m[0])
    expect(langStorage).toHaveLength(2)
    for (const line of langStorage) expect(line).toMatch(/try \{.*\} catch \{\}/)
    const step = read('src/components/ui/useShownFormLang.ts')
    expect(step).toMatch(/getTaxFormHandoff\(\)\?\.lang\s*\?\? getPickedFormLang\(\)\s*\?\? resolveStartLang\(/)
  })

  it('both steps stay under the path the page lives on (no full page load between root layouts)', () => {
    const form = read('src/app/(site)/start/FormClient.tsx')
    expect(form).toContain("const residencyUrl = brand.url(routeLang, 'tax-residency')")
    expect(form).toContain("const formUrl      = brand.url(routeLang, 'tax-form')")
  })
})

describe('the nine language names, each in its own language', () => {
  it('are exactly these, with no flags', () => {
    expect(FORM_LANGS.map((l) => FORM_LANG_NAMES[l])).toEqual(['English', 'Deutsch', '日本語', 'Español', 'Français', 'Italiano', 'Português', '中文', 'Tiếng Việt'])
    for (const l of FORM_LANGS) expect(FORM_LANG_HTML[l]).toMatch(/^[a-z]{2}(-[A-Za-z]{2,4})?$/)
    const picker = read('src/components/ui/FormLanguageToggle.tsx')
    expect(picker + JSON.stringify(FORM_LANG_NAMES)).not.toMatch(/[\u{1F1E6}-\u{1F1FF}]|\u{1F3F3}|\u{1F3F4}/u)
  })
})

describe('locale form pages', () => {
  const whtForm = formPaths.WHT['tax-form'] as string
  const whtRes = formPaths.WHT['tax-residency'] as string
  const svtForm = formPaths.SVT.form as string
  const svtRes = formPaths.SVT.residency as string

  const whtDir = (l: string) => path.join(SRC, 'app', l === 'en' ? '(site)' : `(${l})/${l}`)
  const svtDir = (l: string) => path.join(SRC, 'app', l === 'en' ? '(svt)/svt-site' : l === 'zh' || l === 'vi' ? `(svt-${l})/svt-site/${l}` : `(svt)/svt-site/${l}`)

  it.each([...FORM_LANGS])('WHT %s: the form and the residency step exist, are noindex, and open in that language', (l) => {
    const formPage = path.join(whtDir(l), whtForm, 'page.tsx')
    const resPage = path.join(whtDir(l), whtRes, 'page.tsx')
    expect(fs.existsSync(formPage)).toBe(true)
    expect(fs.existsSync(resPage)).toBe(true)
    const form = fs.readFileSync(formPage, 'utf8')
    const layout = fs.readFileSync(path.join(whtDir(l), whtForm, 'layout.tsx'), 'utf8')
    const res = fs.readFileSync(resPage, 'utf8')
    for (const s of [form, layout, res]) expect(s).toMatch(/index:\s*false/)
    expect(form).toContain('WhtFormProvider')
    if (l === 'en') expect(form).toContain('<FormClient />')
    else expect(form).toContain(`<FormClient defaultLang="${l}" />`)
    expect(res).toContain(`<ResidencyStep lang="${l}" />`)
    expect(res).toContain(`<ResidencyFixPanel lang="${l}" />`)
    // No page of the other brand's words or links.
    expect(form + res).not.toMatch(/svt|Student Visa/i)
  })

  it('the six new WHT pages add no hreflang and are not in the sitemap', () => {
    for (const l of ['es', 'fr', 'it', 'pt', 'zh', 'vi']) {
      const form = fs.readFileSync(path.join(whtDir(l), whtForm, 'page.tsx'), 'utf8')
      expect(form).not.toMatch(/languages:/)
    }
    const sitemap = read('src/app/sitemap.ts')
    expect(sitemap).not.toMatch(new RegExp(`/(?:es|fr|it|pt|zh|vi)/${whtForm}\\b`))
  })

  it('pt, zh and vi have their own root layout with the right <html lang>', () => {
    for (const [l, html] of [['pt', 'pt-BR'], ['zh', 'zh-Hans'], ['vi', 'vi']]) {
      const layout = read(`src/app/(${l})/layout.tsx`)
      expect(layout).toContain(`<RootDocument lang="${html}">`)
    }
  })

  it.each([...FORM_LANGS])('SVT %s: the form and its residency step exist, are noindex, closed until enabled', (l) => {
    const formPage = path.join(svtDir(l), svtForm, 'page.tsx')
    const resPage = path.join(svtDir(l), svtForm, svtRes, 'page.tsx')
    expect(fs.existsSync(formPage)).toBe(true)
    expect(fs.existsSync(resPage)).toBe(true)
    const form = fs.readFileSync(formPage, 'utf8')
    const res = fs.readFileSync(resPage, 'utf8')
    for (const s of [form, res]) {
      expect(s).toMatch(/index:\s*false/)
      expect(s).toContain("process.env.SVT_FORMS_ENABLED === 'true'")
      expect(s).toContain('SvtFormProvider')
      expect(s).not.toMatch(/WhtFormProvider|Working Holiday/)
    }
    expect(form).toContain(`defaultLang={'${l}'}`)
    expect(res).toContain(`<ResidencyStep lang={'${l}'} />`)
  })

  it('the brand URL helpers point at pages that exist', () => {
    for (const l of FORM_LANGS) {
      const wf = WHT_FORM_BRAND.url(l, 'tax-form')
      const wr = WHT_FORM_BRAND.url(l, 'tax-residency')
      expect(wf).toBe(l === 'en' ? `/${whtForm}` : `/${l}/${whtForm}`)
      expect(wr).toBe(l === 'en' ? `/${whtRes}` : `/${l}/${whtRes}`)
      const sf = SVT_FORM_BRAND.url(l, 'tax-form')
      const sr = SVT_FORM_BRAND.url(l, 'tax-residency')
      expect(sf).toBe(l === 'en' ? `/${svtForm}` : `/${l}/${svtForm}`)
      expect(sr).toBe(l === 'en' ? `/${svtForm}/${svtRes}` : `/${l}/${svtForm}/${svtRes}`)
      // Legal pages: German and Japanese on WHT, English everywhere else.
      expect(WHT_FORM_BRAND.url(l, 'client-agreement')).toBe(l === 'de' || l === 'ja' ? `/${l}/client-agreement` : '/client-agreement')
      expect(SVT_FORM_BRAND.url(l, 'privacy')).toBe('/privacy')
      // The expenses guide only where that page exists.
      const exp = WHT_FORM_BRAND.url(l, 'expenses')
      const dir = l === 'en' || exp === '/expenses' ? path.join(SRC, 'app/(site)/expenses') : path.join(whtDir(l), 'expenses')
      expect(fs.existsSync(dir)).toBe(true)
    }
  })

  it('every locale form path is on the "never sent to Google Analytics" list of its brand', () => {
    expect([...WHT_FORM_LOCALES].sort()).toEqual(FORM_LANGS.filter((l) => l !== 'en').sort())
    expect([...SVT_FORM_LOCALES].sort()).toEqual(FORM_LANGS.filter((l) => l !== 'en').sort())
    for (const l of FORM_LANGS) {
      expect(WHT_TOKEN_FORM_PATHS).toContain(WHT_FORM_BRAND.url(l, 'tax-form'))
      expect(WHT_TOKEN_FORM_PATHS).toContain(WHT_FORM_BRAND.url(l, 'tax-residency'))
      expect(SVT_FORM_PAGE_PATHS).toContain(SVT_FORM_BRAND.url(l, 'tax-form'))
      // Analytics matches by prefix, so the residency step under the form is covered.
      const sr = SVT_FORM_BRAND.url(l, 'tax-residency')
      expect(SVT_FORM_PAGE_PATHS.some((p) => sr.startsWith(`${p}/`))).toBe(true)
    }
    expect(read('src/components/layout/RootDocument.tsx')).toContain('untagged={TOKEN_FORM_PATHS}')
    expect(read('src/components/layout/RootDocument.tsx')).toContain('const TOKEN_FORM_PATHS = WHT_TOKEN_FORM_PATHS')
  })

  it('the WHT shell hides the nav and footer on every locale form page, and robots keeps crawlers off the residency step', () => {
    const shell = read('src/components/layout/PublicShellClient.tsx')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const robots = require('@/app/robots').default()
    for (const l of FORM_LANGS) {
      expect(shell).toContain(`'${WHT_FORM_BRAND.url(l, 'tax-form')}'`)
      expect(shell).toContain(`'${WHT_FORM_BRAND.url(l, 'tax-residency')}'`)
      for (const r of robots.rules) expect(r.disallow).toContain(WHT_FORM_BRAND.url(l, 'tax-residency'))
    }
  })

  it('the link reset script renames the new locale folders too', () => {
    const script = read('scripts/reset-form-links.mjs')
    expect(script).toContain("['de', 'ja', 'es', 'fr', 'it', 'pt', 'zh', 'vi'].map((l) => `src/app/(${l})/${l}`)")
    expect(script).toContain("['de', 'ja', 'es', 'fr', 'it', 'pt'].map((l) => `src/app/(svt)/svt-site/${l}`)")
  })
})

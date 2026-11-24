/**
 * whatsapp_click on both brands (23 Nov). GA4 recorded almost no WhatsApp taps
 * while the chats kept coming: most WhatsApp links are plain links with no
 * handler, so only a few client components ever sent the event, and the send
 * was not a beacon, so a tap that left the page could lose it.
 */
import fs from 'fs'
import path from 'path'
import { isWhatsAppHref, trackWhatsApp, trackWhatsAppLink, _resetWhatsAppDedupe } from '@/lib/analytics'
import { guideWaTopic, guideWaProblem, guideWaUrl, GUIDE_WA_PROBLEM, PROBLEM_PHRASES } from '@/components/ui/guide-wa-topic'
import { waUrl } from '@/lib/wa'
import { MYGOV_TROUBLE_RE } from '@/lib/will/instant-choice'

type Call = [string, string, Record<string, unknown>]

function fakeLink(attrs: Record<string, string>, inside: string[] = []) {
  return {
    getAttribute: (k: string) => attrs[k] ?? null,
    closest: (sel: string) => (sel.split(',').some((s) => inside.includes(s.trim())) ? {} : null),
  } as unknown as Element
}

describe('whatsapp_click', () => {
  let calls: Call[]
  const g = global as unknown as { window: unknown }
  beforeEach(() => {
    calls = []
    _resetWhatsAppDedupe()
    const store: Record<string, string> = { wht_ai_source: '' }
    g.window = {
      location: { pathname: '/ja/blog/how-to-get-a-tfn', search: '' },
      sessionStorage: { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v } },
      gtag: (...a: unknown[]) => { calls.push(a as Call) },
    }
  })
  afterAll(() => { delete (global as { window?: unknown }).window })

  it('recognises every WhatsApp link form and nothing else', () => {
    expect(isWhatsAppHref('https://wa.me/61424513998?text=Hi')).toBe(true)
    expect(isWhatsAppHref('https://api.whatsapp.com/send?phone=61431667124')).toBe(true)
    expect(isWhatsAppHref('https://www.whatsapp.com/send?phone=1')).toBe(true)
    expect(isWhatsAppHref('whatsapp://send?phone=1')).toBe(true)
    expect(isWhatsAppHref('/contact')).toBe(false)
    expect(isWhatsAppHref('https://wa.me.example.com/x')).toBe(false)
    expect(isWhatsAppHref(null)).toBe(false)
  })

  it('does not count "Share on WhatsApp" links (no phone number)', () => {
    expect(isWhatsAppHref('https://wa.me/?text=Tax%20Back%20in%20Australia')).toBe(false)
    expect(isWhatsAppHref('https://wa.me/')).toBe(false)
    expect(isWhatsAppHref('https://api.whatsapp.com/send?text=Hi')).toBe(false)
    expect(isWhatsAppHref('whatsapp://send?text=Hi')).toBe(false)
  })

  it('sends the event as a beacon, with placement and language only', () => {
    expect(trackWhatsAppLink(fakeLink({ href: 'https://wa.me/1?text=Hello%20my%20name' }, ['.mobile-cta-bar']))).toBe(true)
    expect(calls).toHaveLength(1)
    const [cmd, name, params] = calls[0]
    expect([cmd, name]).toEqual(['event', 'whatsapp_click'])
    expect(params.transport_type).toBe('beacon')
    expect(params.cta_position).toBe('sticky')
    expect(params.language).toBe('ja')
    // The prefilled message is never sent.
    expect(JSON.stringify(params)).not.toMatch(/Hello|text=/)
  })

  it('uses data-wa-pos when the link carries it (the student brand)', () => {
    trackWhatsAppLink(fakeLink({ href: 'https://wa.me/1', 'data-wa-pos': 'guide-end' }))
    expect(calls[0][2].cta_position).toBe('guide-end')
  })

  it('does not count a tap twice when a component already sent it', () => {
    trackWhatsApp({ position: 'guide-end', topic: 'super', lang: 'ja' })
    expect(trackWhatsAppLink(fakeLink({ href: 'https://wa.me/1' }))).toBe(false)
    expect(calls).toHaveLength(1)
    expect(calls[0][2].transport_type).toBe('beacon')
    // A later, separate tap is counted.
    expect(trackWhatsAppLink(fakeLink({ href: 'https://wa.me/1' }), Date.now() + 5000)).toBe(true)
  })

  it('never throws when gtag is not loaded (no consent)', () => {
    delete (g.window as { gtag?: unknown }).gtag
    expect(() => trackWhatsAppLink(fakeLink({ href: 'https://wa.me/1' }))).not.toThrow()
  })
})

describe('Analytics listener and consent', () => {
  const src = fs.readFileSync(path.join(process.cwd(), 'src/components/layout/Analytics.tsx'), 'utf8')
  it('listens for every WhatsApp link on both brands, not only data-wa-pos', () => {
    expect(src).toMatch(/waClicks = true/)
    expect(src).toMatch(/isWhatsAppHref\(a\.getAttribute\('href'\)\)/)
    expect(src).toMatch(/window\.addEventListener\('click', onClick\)/)
  })
  it('still loads nothing from Google before Accept, and denies ads signals after', () => {
    const before = src.split("consent === 'granted' && (")[0]
    expect(before).not.toMatch(/googletagmanager\.com\/gtag\/js/)
    expect(src).toMatch(/ad_storage: 'denied'/)
    expect(src).toMatch(/ad_user_data: 'denied'/)
    expect(src).toMatch(/ad_personalization: 'denied'/)
    expect(src).toMatch(/allow_google_signals: false/)
  })
  it('keeps the banner clear of the mobile sticky WhatsApp bar', () => {
    expect(src).toMatch(/@media \(max-width:899px\)\{\.ga-consent\{bottom:calc\(88px/)
  })
})

describe('CSP allows the GA endpoints on both brands', () => {
  const cfg = fs.readFileSync(path.join(process.cwd(), 'next.config.js'), 'utf8')
  it('script, connect and img sources', () => {
    const lines = cfg.split('\n')
    const scripts = lines.filter((l) => l.includes('script-src'))
    const connects = lines.filter((l) => l.includes('connect-src'))
    const imgs = lines.filter((l) => l.includes('img-src'))
    expect(scripts.length).toBeGreaterThanOrEqual(2)
    for (const l of scripts.filter((x) => !x.trim().startsWith('//'))) expect(l).toContain('https://www.googletagmanager.com')
    for (const l of connects.filter((x) => !x.trim().startsWith('//'))) {
      expect(l).toContain('https://*.google-analytics.com') // region1.google-analytics.com
      expect(l).toContain('https://www.googletagmanager.com')
    }
    for (const l of imgs.filter((x) => !x.trim().startsWith('//'))) expect(l).toContain('https://*.google-analytics.com')
  })
})

describe('guide sticky bar prefill (T7)', () => {
  it('maps guide categories like the closing CTA', () => {
    expect(guideWaTopic('Super')).toBe('super')
    expect(guideWaTopic('TFN')).toBe('tax-return')
    expect(guideWaTopic('Medicare & Other')).toBe('medicare')
    expect(guideWaTopic('Something else')).toBe('guide')
  })
  it('EN and locale guide pages pass the topic and title to the sticky bar', () => {
    for (const f of ['src/app/(site)/blog/[slug]/page.tsx', 'src/components/blog/LocaleGuidePage.tsx']) {
      const s = fs.readFileSync(path.join(process.cwd(), f), 'utf8')
      // Plan 3 (r19 P1-A): either today's call, or guideWaUrl, which keeps the
      // same message for unmapped guides and names the problem for mapped ones.
      expect(s).toMatch(/<MobileCta href=\{(?:waUrl\(\{ topic: guideWaTopic\(guide\.category\), lang: [^,]+, detail: guide\.title \}\)|guideWaUrl\(\{ category: guide\.category, slug: guide\.slug, lang: [^,]+, title: guide\.title \}\))\}[^>]*topic=\{guideWaTopic\(guide\.category\)\}/)
      // One Article only: JSON-LD, no microdata copy.
      expect(s).not.toMatch(/itemType="https:\/\/schema\.org\/Article"/)
    }
  })
  it('problem guides open on the problem, in every language; GA4 topic is unchanged (plan 3)', () => {
    const langs = ['en', 'de', 'ja', 'fr', 'it', 'es'] as const
    for (const l of langs) {
      for (const p of Object.values(GUIDE_WA_PROBLEM)) {
        const t = PROBLEM_PHRASES[l][p]
        expect(t).toBeTruthy()
        expect(t).not.toMatch(/[\u2013\u2014\u2015]/)
        if (p === 'mygov' || p === 'mygov-super') expect(t).toMatch(MYGOV_TROUBLE_RE)
      }
    }
    expect(guideWaProblem('mygov-sms-code-not-received-overseas')).toBe('mygov')
    expect(guideWaProblem('claim-super-without-mygov')).toBe('mygov-super')
    expect(guideWaProblem('what-is-a-tfn')).toBeUndefined()
    const mapped = guideWaUrl({ category: 'Super', slug: 'claim-super-without-mygov', lang: 'de', title: 'X' })
    expect(decodeURIComponent(mapped.split('text=')[1])).toBe(PROBLEM_PHRASES.de['mygov-super'])
    // Unmapped guides keep exactly today's message, and the topic table is untouched.
    expect(guideWaUrl({ category: 'TFN', slug: 'what-is-a-tfn', lang: 'ja', title: 'T' }))
      .toBe(waUrl({ topic: guideWaTopic('TFN'), lang: 'ja', detail: 'T' }))
    expect(guideWaTopic('Tax Return')).toBe('tax-return')
  })
  it('the student brand sticky bar takes the guide message, which names Student Visa Tax', () => {
    const s = fs.readFileSync(path.join(process.cwd(), 'src/components/svt/StickyReveal.tsx'), 'utf8')
    expect(s).toMatch(/a\[data-wa-pos="guide-end"\]/)
  })
})

describe('GSC 404 redirects (T4)', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const cfg = require(path.join(process.cwd(), 'next.config.js'))
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { getPathMatch } = require('next/dist/shared/lib/router/utils/path-match')
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { prepareDestination } = require('next/dist/shared/lib/router/utils/prepare-destination')
  const cases: Array<[string, string]> = [
    ['/Home', '/'],
    ['/ja/Index', '/ja'],
    ['/de/Index', '/de'],
    ['/ja/blog/category/medicare-other', '/ja/blog/category/medicare'],
    ['/ja/blog/category/medicare-and-other', '/ja/blog/category/medicare'],
    ['/de/blog/category/medicare-and-other', '/de/blog/category/medicare'],
    ['/blog/category//ja/blog/category/tfn', '/ja/blog/category/tfn'],
    ['/blog/category//blog/category/tfn', '/blog/category/tfn'],
  ]
  it.each(cases)('%s -> %s (301, WHT host only)', async (from, to) => {
    const rules: Array<{ source: string; destination: string; permanent: boolean; missing?: unknown[] }> = await cfg.redirects()
    const rule = rules.find((r) => getPathMatch(r.source, { strict: true, removeUnnamedParams: true })(from))
    expect(rule).toBeDefined()
    const params = getPathMatch(rule!.source, { strict: true, removeUnnamedParams: true })(from)
    expect(prepareDestination({ appendParamsToQuery: false, destination: rule!.destination, params, query: {} }).newUrl).toBe(to)
    expect(rule!.permanent).toBe(true)
    expect(rule!.missing?.length).toBeGreaterThan(0)
  })
  it('live category pages do not redirect', async () => {
    const rules: Array<{ source: string }> = await cfg.redirects()
    for (const p of ['/blog/category/tfn', '/ja/blog/category/medicare', '/de/blog/category/medicare', '/blog/category/medicare-and-other']) {
      expect(rules.find((r) => getPathMatch(r.source, { strict: true, removeUnnamedParams: true })(p))).toBeUndefined()
    }
  })
})

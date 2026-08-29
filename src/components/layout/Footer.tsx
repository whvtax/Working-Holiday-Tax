'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoogleReviewsBadge } from '@/components/ui/GoogleReviewsBadge'
import { EMAIL, AGENT_TPB } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { trackWhatsApp } from '@/lib/analytics'

export function Footer() {
  const pathname = usePathname() || '/'
  const isGerman   = pathname === '/de' || pathname.startsWith('/de/')
  const isJapanese = pathname === '/ja' || pathname.startsWith('/ja/')
  const locale: 'en' | 'de' | 'ja' = isJapanese ? 'ja' : isGerman ? 'de' : 'en'
  const waHref = waUrl({ topic: 'general', lang: locale })
  // /about is the one page that must not mention the supervising agent at all.
  // The sticky bar already switches to its neutral variant there, and the footer
  // has to agree with it or the exclusion is pointless.
  const isAbout = /^\/(de\/|ja\/)?about\/?$/.test(pathname)

  // Localized strings + paths
  const t =
    locale === 'de'
    ? {
        tagline: 'Australische Steuer, erledigt.',
        intro: 'Wir kümmern uns um TFN, Steuererklärung, Super-Auszahlung und ABN für Working Holiday Maker in Australien.',
        askUs: 'Frag uns alles',
        services: 'Leistungen',
        serviceLinks: [
          { label: 'Steuernummer (TFN)',     href: '/de/tfn' },
          { label: 'ABN-Registrierung',      href: '/de/abn' },
          { label: 'Steuererklärung',        href: '/de/tax-return' },
          { label: 'Super-Auszahlung (DASP)', href: '/de/superannuation' },
          { label: 'Medicare',               href: '/de/medicare' },
        ],
        learn: 'Lernen',
        // Ausgaben und Rechner standen in keiner Fußzeile, obwohl beides
        // eigene Seiten mit Suchwert sind. Jetzt sind sie von jeder Seite
        // aus verlinkt.
        learnLinks: [
          { label: 'Blog',                       href: '/de/blog' },
          { label: 'Absetzbare Ausgaben',        href: '/de/expenses' },
          { label: 'Rückerstattung schätzen',    href: '/de/calculator' },
          { label: 'TFN-Artikel',                href: '/de/blog/category/tfn' },
          { label: 'Steuererklärungs-Artikel',    href: '/de/blog/category/tax-return' },
        ],
        connect: 'Kontakt',
        connectLinks: [
          { label: 'Facebook',   href: 'https://www.facebook.com/workingholidaytax', external: true },
          { label: 'E-Mail',     href: `mailto:${EMAIL}`, external: false },
          { label: 'WhatsApp',   href: waUrl({ topic: 'general', lang: locale }), external: true },
          { label: 'TikTok',     href: 'https://www.tiktok.com/@workingholidaytax', external: true },
          { label: 'Instagram',  href: 'https://instagram.com/workingholidaytax', external: true },
        ],
        copyright: 'Working Holiday Tax. Alle Rechte vorbehalten.',
        about: 'Über uns',
        clientAgreement: 'Mandantenvereinbarung',
        privacyPolicy: 'Datenschutzerklärung',
      }
    : locale === 'ja'
    ? {
        tagline: 'オーストラリアの税金、まるごと対応。',
        intro: 'オーストラリアでワーキングホリデーをする方のTFN申請、タックスリターン、スーパー受取、ABN登録をすべて代行します。',
        askUs: 'お気軽にご相談ください',
        services: 'サービス',
        serviceLinks: [
          { label: 'TFN申請',           href: '/ja/tfn' },
          { label: 'ABN登録',           href: '/ja/abn' },
          { label: 'タックスリターン',   href: '/ja/tax-return' },
          { label: 'スーパー受取（DASP）', href: '/ja/superannuation' },
          { label: 'メディケア税免除',   href: '/ja/medicare' },
        ],
        learn: '記事・ガイド',
        learnLinks: [
          { label: 'ブログ',                   href: '/ja/blog' },
          { label: '経費・控除',               href: '/ja/expenses' },
          { label: '還付額の目安',             href: '/ja/calculator' },
          { label: 'TFNの記事',                href: '/ja/blog/category/tfn' },
          { label: 'タックスリターンの記事',   href: '/ja/blog/category/tax-return' },
        ],
        connect: 'お問い合わせ',
        connectLinks: [
          { label: 'Facebook',   href: 'https://www.facebook.com/workingholidaytax', external: true },
          { label: 'メール',     href: `mailto:${EMAIL}`, external: false },
          { label: 'WhatsApp',   href: waUrl({ topic: 'general', lang: locale }), external: true },
          { label: 'TikTok',     href: 'https://www.tiktok.com/@workingholidaytax', external: true },
          { label: 'Instagram',  href: 'https://instagram.com/workingholidaytax', external: true },
        ],
        copyright: 'Working Holiday Tax. All rights reserved.',
        copyrightJa: '無断複写・転載を禁じます。',
        about: '当社について',
        clientAgreement: 'クライアント規約',
        privacyPolicy: 'プライバシーポリシー',
      }
    : {
        tagline: 'Australian tax, sorted.',
        intro: 'We handle TFN, tax returns, super withdrawal and ABN for working holiday makers in Australia.',
        askUs: 'Ask us anything',
        services: 'Services',
        serviceLinks: [
          { label: 'TFN Application',  href: '/tfn' },
          { label: 'ABN Registration', href: '/abn' },
          { label: 'Tax Return',       href: '/tax-return' },
          { label: 'Super Withdrawal', href: '/superannuation' },
          { label: 'Medicare',         href: '/medicare' },
        ],
        learn: 'Learn',
        // Trimmed from seven to five at the owner's request. The two that went
        // are Super and Work Rights — chosen because the four "…Articles" rows
        // were all category hubs, and since the blog hub's category chips became
        // real <Link>s, every hub already has a crawlable path from navigation.
        // Dropping two of them therefore costs no discoverability. The three
        // that had to stay are the ones nothing else links to from every page:
        // the blog itself, the expenses guides, and the calculator — the last
        // being the closest thing here to an intent-to-buy click.
        learnLinks: [
          { label: 'Blog',                       href: '/blog' },
          { label: 'Deductions by job',          href: '/expenses' },
          { label: 'Refund calculator',          href: '/calculator' },
          { label: 'TFN Articles',               href: '/blog/category/tfn' },
          { label: 'Tax Return Articles',        href: '/blog/category/tax-return' },
        ],
        connect: 'Connect',
        connectLinks: [
          { label: 'Facebook',   href: 'https://www.facebook.com/workingholidaytax', external: true },
          { label: 'Email',      href: `mailto:${EMAIL}`, external: false },
          { label: 'WhatsApp',   href: waUrl({ topic: 'general', lang: locale }), external: true },
          { label: 'TikTok',     href: 'https://www.tiktok.com/@workingholidaytax', external: true },
          { label: 'Instagram',  href: 'https://instagram.com/workingholidaytax', external: true },
        ],
        copyright: 'Working Holiday Tax. All rights reserved.',
        about: 'About Us',
        clientAgreement: 'Client Agreement',
        privacyPolicy: 'Privacy Policy',
      }

  return (
    <footer role="contentinfo" style={{ background: '#0B5240' }}>

      {/* ─── Main footer section ─ light grey background ──────────────────── */}
      <div style={{ background: '#F5F9F7', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1080px] mx-auto px-5 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-10 sm:pb-12">

          {/* Main grid - 4 columns */}
          {/* The three link columns hug their content and the brand column absorbs
              the slack, so the last column finishes at the container edge and the
              footer reads as centered on wide screens instead of left weighted. */}
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-6 md:gap-10 mb-10">

            {/* Brand column */}
            <div className="footer-brand-col col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <svg width="26" height="26" viewBox="0 0 30 30" fill="none" aria-hidden="true">
                  <rect x="2" y="2" width="16" height="16" rx="4" stroke="#0B5240" strokeWidth="1.4"/>
                  <rect x="12" y="12" width="16" height="16" rx="4" fill="#0B5240"/>
                  <line x1="2" y1="2" x2="12" y2="12" stroke="#E9A020" strokeWidth="1.0" strokeLinecap="round" opacity="0.7"/>
                  <circle cx="2" cy="2" r="1.4" fill="#E9A020" opacity="0.7"/>
                  <path d="M20 14.5 L24 16 L24 19.5 Q24 23 20 24.5 Q16 23 16 19.5 L16 16 Z" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1.0" strokeLinejoin="round"/>
                  <polyline points="18,19.5 19.8,21.5 22.5,18" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-serif font-bold text-ink" style={{ fontSize: '15px' }}>Working Holiday Tax</span>
              </div>

              <p className="font-serif" style={{ fontSize: '17px', color: '#0B5240', fontWeight: 700, lineHeight: 1.3, marginBottom: '8px', letterSpacing: '-0.02em' }}>
                {t.tagline}
              </p>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.7, marginBottom: '18px', maxWidth: '300px' }}>
                {t.intro}
              </p>

              <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp({ position: 'footer', lang: locale })}
                className="font-medium"
                style={{ fontSize: '13px', color: '#0B5240', fontWeight: 600, marginBottom: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                {t.askUs}
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>

              {/* Jo, 29 Aug: exactly the form's trust row, scaled down a
                  touch — the Google Reviews mark and the TPB seal side by
                  side. The "Reviewed and signed off" pill and the review-count
                  pill are gone at his request; the seal asset itself carries
                  the agent number, so the credential is still on the page. */}
              {!isAbout ? (
                <div className="mt-6 flex flex-row flex-wrap items-center gap-x-4 gap-y-2"
                  style={{ transform: 'scale(0.92)', transformOrigin: 'left center' }}>
                  <GoogleReviewsBadge lang={locale === 'de' ? 'de' : locale === 'ja' ? 'ja' : 'en'} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/tpb-registered.png"
                    alt={`${locale === 'de' ? 'Registrierter Steueragent' : locale === 'ja' ? '登録税理士' : 'Registered Tax Agent'} ${AGENT_TPB}`}
                    width={509}
                    height={319}
                    loading="lazy"
                    decoding="async"
                    style={{ display: 'block', width: '104px', height: 'auto' }}
                  />
                </div>
              ) : (
                /* Jo's rule: the about page carries no tax agent mention at
                   all, which covers the seal as well as the sentence. */
                <div className="mt-6">
                  <GoogleReviewsBadge lang={locale === 'de' ? 'de' : locale === 'ja' ? 'ja' : 'en'} />
                </div>
              )}
            </div>

            {/* Services column */}
            <nav aria-label={t.services}>
              <p className="font-semibold uppercase mb-3.5" style={{ fontSize: '10.5px', color: '#0B5240', letterSpacing: '0.14em' }}>{t.services}</p>
              {t.serviceLinks.map(l => (
                <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
              ))}
            </nav>

            {/* Learn column */}
            <nav aria-label={t.learn}>
              <p className="font-semibold uppercase mb-3.5" style={{ fontSize: '10.5px', color: '#0B5240', letterSpacing: '0.14em' }}>{t.learn}</p>
              {t.learnLinks.map(l => (
                <Link key={l.href} href={l.href} className="footer-link">{l.label}</Link>
              ))}
            </nav>

            {/* Connect column */}
            <nav aria-label={t.connect}>
              <p className="font-semibold uppercase mb-3.5" style={{ fontSize: '10.5px', color: '#0B5240', letterSpacing: '0.14em' }}>{t.connect}</p>
              {t.connectLinks.map(l => (
                l.external
                  ? <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="footer-link">{l.label}</a>
                  : <a key={l.href} href={l.href} className="footer-link">{l.label}</a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* ─── Bottom bar - DARK GREEN brand layer ──────────────────────────── */}
      <div style={{ background: '#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-5">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center md:text-left">

            <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)' }} suppressHydrationWarning>
              {locale === 'ja' ? (
                <span>© {new Date().getFullYear()} Working Holiday Tax. 無断複写・転載を禁じます。</span>
              ) : (
                <span>© {new Date().getFullYear()} {t.copyright}</span>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-end gap-4 md:gap-5 flex-wrap" style={{ fontSize: '11.5px' }}>
              <Link
                href={locale === 'de' ? '/de/about' : locale === 'ja' ? '/ja/about' : '/about'}
                className="footer-link-dark"
              >
                {t.about}
              </Link>
              <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
              <Link
                href={locale === 'de' ? '/de/client-agreement' : locale === 'ja' ? '/ja/client-agreement' : '/client-agreement'}
                className="footer-link-dark"
              >
                {t.clientAgreement}
              </Link>
              <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.3)' }}>·</span>
              <Link
                href={locale === 'de' ? '/de/privacy' : locale === 'ja' ? '/ja/privacy' : '/privacy'}
                className="footer-link-dark"
              >
                {t.privacyPolicy}
              </Link>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

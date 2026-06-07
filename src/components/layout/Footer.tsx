'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WA_URL, EMAIL } from '@/lib/constants'

export function Footer() {
  const pathname = usePathname() || '/'
  const isGerman   = pathname === '/de' || pathname.startsWith('/de/')
  const isJapanese = pathname === '/ja' || pathname.startsWith('/ja/')
  const locale: 'en' | 'de' | 'ja' = isJapanese ? 'ja' : isGerman ? 'de' : 'en'

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
        learnLinks: [
          { label: 'Blog',                       href: '/de/blog' },
          { label: 'TFN-Artikel',                href: '/de/blog/category/tfn' },
          { label: 'Steuererklärungs-Artikel',    href: '/de/blog/category/tax-return' },
          { label: 'Super-Artikel',              href: '/de/blog/category/super' },
          { label: 'Arbeitsrechte',              href: '/de/blog/category/work-rights' },
        ],
        connect: 'Kontakt',
        connectLinks: [
          { label: 'Facebook',   href: 'https://www.facebook.com/workingholidaytax', external: true },
          { label: 'E-Mail',     href: `mailto:${EMAIL}`, external: false },
          { label: 'WhatsApp',   href: WA_URL, external: true },
          { label: 'TikTok',     href: 'https://www.tiktok.com/@workingholidaytax', external: true },
          { label: 'Instagram',  href: 'https://instagram.com/workingholidaytax', external: true },
        ],
        copyright: 'Working Holiday Tax. Alle Rechte vorbehalten.',
        clientAgreement: 'Mandantenvereinbarung',
        privacyPolicy: 'Datenschutzerklärung',
        secure: 'Sicher & verschlüsselt',
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
          { label: 'TFNの記事',                href: '/ja/blog/category/tfn' },
          { label: 'タックスリターンの記事',   href: '/ja/blog/category/tax-return' },
          { label: 'スーパー受取の記事',       href: '/ja/blog/category/super' },
          { label: '労働者の権利',             href: '/ja/blog/category/work-rights' },
        ],
        connect: 'お問い合わせ',
        connectLinks: [
          { label: 'Facebook',   href: 'https://www.facebook.com/workingholidaytax', external: true },
          { label: 'メール',     href: `mailto:${EMAIL}`, external: false },
          { label: 'WhatsApp',   href: WA_URL, external: true },
          { label: 'TikTok',     href: 'https://www.tiktok.com/@workingholidaytax', external: true },
          { label: 'Instagram',  href: 'https://instagram.com/workingholidaytax', external: true },
        ],
        copyright: 'Working Holiday Tax. All rights reserved.',
        copyrightJa: '無断複写・転載を禁じます。',
        clientAgreement: 'クライアント規約',
        privacyPolicy: 'プライバシーポリシー',
        secure: '安全・暗号化通信',
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
        learnLinks: [
          { label: 'Blog',                       href: '/blog' },
          { label: 'TFN Articles',               href: '/blog/category/tfn' },
          { label: 'Tax Return Articles',        href: '/blog/category/tax-return' },
          { label: 'Super Articles',             href: '/blog/category/super' },
          { label: 'Work Rights',                href: '/blog/category/work-rights' },
        ],
        connect: 'Connect',
        connectLinks: [
          { label: 'Facebook',   href: 'https://www.facebook.com/workingholidaytax', external: true },
          { label: 'Email',      href: `mailto:${EMAIL}`, external: false },
          { label: 'WhatsApp',   href: WA_URL, external: true },
          { label: 'TikTok',     href: 'https://www.tiktok.com/@workingholidaytax', external: true },
          { label: 'Instagram',  href: 'https://instagram.com/workingholidaytax', external: true },
        ],
        copyright: 'Working Holiday Tax. All rights reserved.',
        clientAgreement: 'Client Agreement',
        privacyPolicy: 'Privacy Policy',
        secure: 'Secure & encrypted',
      }

  return (
    <footer role="contentinfo" style={{ background: '#0B5240' }}>

      {/* ─── Main footer section ─ light grey background ──────────────────── */}
      <div style={{ background: '#F5F9F7', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-12 sm:pt-16 pb-10 sm:pb-12">

          {/* Main grid - 4 columns */}
          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-6 md:gap-10 mb-10">

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

              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="font-medium"
                style={{ fontSize: '13px', color: '#0B5240', fontWeight: 600, marginBottom: 0, display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}>
                {t.askUs}
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>

              <div className="flex items-center gap-2.5 mt-6">
                <a href="https://www.xero.com" target="_blank" rel="noopener noreferrer"
                  aria-label="Xero partner"
                  className="footer-social-icon flex items-center justify-center rounded-full"
                  style={{ width: '38px', height: '38px', border: '1.5px solid #C8EAE0', background: '#fff' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm5 12.5l-2.9-2.5 2.9-2.5a.5.5 0 10-.65-.76L13.5 11.2l-2.85-2.46a.5.5 0 10-.65.76L12.9 12l-2.9 2.5a.5.5 0 10.65.76L13.5 12.8l2.85 2.46a.5.5 0 10.65-.76z" fill="#13B5EA"/>
                  </svg>
                </a>
                <div className="flex items-center justify-center rounded-full"
                  style={{ width: '38px', height: '38px', border: '1.5px solid #C8EAE0', background: '#fff' }}
                  title={t.secure}>
                  <svg width="17" height="19" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M8 1L2 3.5V8c0 3.5 2.5 6.7 6 7.5 3.5-.8 6-4 6-7.5V3.5L8 1z" fill="#EAF6F1" stroke="#0B5240" strokeWidth="1.2" strokeLinejoin="round"/>
                    <path d="M5.5 8.5l2 2 3-3" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <a href="https://www.tpb.gov.au" target="_blank" rel="noopener noreferrer"
                  aria-label="Registered Tax Practitioners Board"
                  className="footer-social-icon flex items-center justify-center rounded-full overflow-hidden"
                  style={{ width: '38px', height: '38px', border: '1.5px solid #C8EAE0', background: '#fff' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/tpb-logo.svg" alt="Tax Practitioners Board" width={23} height={23} style={{ objectFit: 'contain' }} />
                </a>
              </div>
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

      {/* ─── Bottom bar — DARK GREEN brand layer ──────────────────────────── */}
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

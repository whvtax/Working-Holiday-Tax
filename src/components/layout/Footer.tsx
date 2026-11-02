'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GoogleReviewsBadge } from '@/components/ui/GoogleReviewsBadge'
import { EMAIL, AGENT_TPB } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { trackWhatsApp } from '@/lib/analytics'
import { LogoMark } from '@/components/wht/LogoMark'
import styles from './Footer.module.css'

export function Footer() {
  const pathname = usePathname() || '/'
  const isGerman   = pathname === '/de' || pathname.startsWith('/de/')
  const isJapanese = pathname === '/ja' || pathname.startsWith('/ja/')
  const isFrench   = pathname === '/fr' || pathname.startsWith('/fr/')
  const isItalian  = pathname === '/it' || pathname.startsWith('/it/')
  const isSpanish  = pathname === '/es' || pathname.startsWith('/es/')
  const locale: 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es' = isSpanish ? 'es' : isItalian ? 'it' : isFrench ? 'fr' : isJapanese ? 'ja' : isGerman ? 'de' : 'en'
  const waHref = waUrl({ topic: 'general', lang: locale })
  // /about is the one page that must not mention the supervising agent at all.
  // The sticky bar already switches to its neutral variant there, and the footer
  // has to agree with it or the exclusion is pointless.
  const isAbout = /^\/(de\/|ja\/|fr\/|it\/|es\/)?about\/?$/.test(pathname)

  // Localized strings + paths
  const t =
    locale === 'es'
    ? {
        tagline: 'Tus impuestos en Australia, resueltos.',
        intro: 'Nos encargamos del TFN, la declaración de impuestos, el retiro de la super y el ABN si estás en Australia con una visa working holiday.',
        askUs: 'Pregúntanos lo que quieras',
        services: 'Servicios',
        serviceLinks: [
          { label: 'Número TFN',               href: '/es/tfn' },
          { label: 'Registro de ABN',          href: '/es/abn' },
          { label: 'Declaración de impuestos', href: '/es/tax-return' },
          { label: 'Retiro de la super',       href: '/es/superannuation' },
          { label: 'Medicare',                 href: '/es/medicare' },
        ],
        learn: 'Guías',
        learnLinks: [
          { label: 'Blog',                              href: '/es/blog' },
          { label: 'Gastos deducibles por oficio',      href: '/es/expenses' },
          { label: 'Calcula tu devolución',             href: '/es/calculator' },
          { label: 'Artículos sobre el TFN',            href: '/es/blog/category/tfn' },
          { label: 'Artículos sobre la declaración',    href: '/es/blog/category/tax-return' },
        ],
        connect: 'Contacto',
        connectLinks: [
          { label: 'Facebook',   href: 'https://www.facebook.com/workingholidaytax', external: true },
          { label: 'Correo',     href: `mailto:${EMAIL}`, external: false },
          { label: 'WhatsApp',   href: waUrl({ topic: 'general', lang: locale }), external: true },
          { label: 'TikTok',     href: 'https://www.tiktok.com/@workingholidaytax', external: true },
          { label: 'Instagram',  href: 'https://instagram.com/workingholidaytax', external: true },
        ],
        copyright: 'Working Holiday Tax. Todos los derechos reservados.',
        about: 'Quiénes somos',
        // The legal texts are not translated in phase 1 (ADR 013): the links go
        // to the English pages and the label says so.
        clientAgreement: 'Acuerdo con el cliente (en inglés)',
        privacyPolicy: 'Política de privacidad (en inglés)',
      }
    :     locale === 'it'
    ? {
        tagline: 'Le tue tasse australiane, sistemate.',
        intro: 'Ci occupiamo di TFN, dichiarazione dei redditi, rimborso della super e ABN per chi è in Australia con un visto working holiday.',
        askUs: 'Chiedici quello che vuoi',
        services: 'Servizi',
        serviceLinks: [
          { label: 'Richiesta del TFN',          href: '/it/tfn' },
          { label: 'Registrazione ABN',         href: '/it/abn' },
          { label: 'Dichiarazione dei redditi', href: '/it/tax-return' },
          { label: 'Rimborso della super',      href: '/it/superannuation' },
          { label: 'Medicare',                  href: '/it/medicare' },
        ],
        learn: 'Guide',
        learnLinks: [
          { label: 'Blog',                              href: '/it/blog' },
          { label: 'Spese deducibili per lavoro',       href: '/it/expenses' },
          { label: 'Stima il tuo rimborso',             href: '/it/calculator' },
          { label: 'Articoli sul TFN',                  href: '/it/blog/category/tfn' },
          { label: 'Articoli sulla tax return',      href: '/it/blog/category/tax-return' },
        ],
        connect: 'Contatti',
        connectLinks: [
          { label: 'Facebook',   href: 'https://www.facebook.com/workingholidaytax', external: true },
          { label: 'E-mail',     href: `mailto:${EMAIL}`, external: false },
          { label: 'WhatsApp',   href: waUrl({ topic: 'general', lang: locale }), external: true },
          { label: 'TikTok',     href: 'https://www.tiktok.com/@workingholidaytax', external: true },
          { label: 'Instagram',  href: 'https://instagram.com/workingholidaytax', external: true },
        ],
        copyright: 'Working Holiday Tax. Tutti i diritti riservati.',
        about: 'Chi siamo',
        // The legal texts are not translated in phase 1 (ADR 013): the links go
        // to the English pages and the label says so.
        clientAgreement: 'Contratto con il cliente (in inglese)',
        privacyPolicy: 'Informativa sulla privacy (in inglese)',
      }
    : locale === 'fr'
    ? {
        tagline: 'Vos impôts australiens, réglés.',
        intro: 'Nous nous occupons de votre TFN, de votre déclaration d’impôts, du retrait de votre super et de votre ABN si vous êtes en visa vacances-travail en Australie.',
        askUs: 'Posez-nous vos questions',
        services: 'Services',
        serviceLinks: [
          { label: 'Demande de TFN',        href: '/fr/tfn' },
          { label: 'Inscription à l’ABN',   href: '/fr/abn' },
          { label: 'Tax return',            href: '/fr/tax-return' },
          { label: 'Récupérer sa super',    href: '/fr/superannuation' },
          { label: 'Medicare',              href: '/fr/medicare' },
        ],
        learn: 'Guides',
        learnLinks: [
          { label: 'Blog',                          href: '/fr/blog' },
          { label: 'Frais déductibles par métier',  href: '/fr/expenses' },
          { label: 'Estimer un remboursement',     href: '/fr/calculator' },
          { label: 'Articles sur le TFN',           href: '/fr/blog/category/tfn' },
          { label: 'Articles sur la tax return',   href: '/fr/blog/category/tax-return' },
        ],
        connect: 'Nous contacter',
        connectLinks: [
          { label: 'Facebook',   href: 'https://www.facebook.com/workingholidaytax', external: true },
          { label: 'E-mail',     href: `mailto:${EMAIL}`, external: false },
          { label: 'WhatsApp',   href: waUrl({ topic: 'general', lang: locale }), external: true },
          { label: 'TikTok',     href: 'https://www.tiktok.com/@workingholidaytax', external: true },
          { label: 'Instagram',  href: 'https://instagram.com/workingholidaytax', external: true },
        ],
        copyright: 'Working Holiday Tax. Tous droits réservés.',
        about: 'À propos',
        // The legal texts are not translated in phase 1 (ADR 013): the links go
        // to the English pages and the label says so.
        clientAgreement: 'Contrat client (en anglais)',
        privacyPolicy: 'Politique de confidentialité (en anglais)',
      }
    : locale === 'de'
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
        learn: 'Ratgeber',
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

  const base = locale === 'de' ? '/de' : locale === 'ja' ? '/ja' : locale === 'fr' ? '/fr' : locale === 'it' ? '/it' : locale === 'es' ? '/es' : ''
  // French, Italian and Spanish legal pages do not exist yet: link the English ones (labels say "en anglais", "in inglese", "en inglés").
  const legalBase = locale === 'fr' || locale === 'it' || locale === 'es' ? '' : base
  const sealAlt = `${locale === 'es' ? 'Bajo la supervisión de un agente fiscal registrado, n.º' : locale === 'it' ? 'Sotto la supervisione di un agente fiscale registrato, n.' : locale === 'fr' ? 'Sous la supervision d’un agent fiscal enregistré, n°' : locale === 'de' ? 'Unter der Aufsicht eines registrierten Tax Agent, Nr.' : locale === 'ja' ? '監督するタックスエージェントの登録番号' : 'Supervising registered tax agent no.'} ${AGENT_TPB}`

  return (
    <footer role="contentinfo">
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.grid}>

            <div className={styles.brandCol}>
              <div className={styles.brand}>
                <LogoMark size={30} />
                <span>Working Holiday Tax</span>
              </div>
              <p className={styles.tagline}>{t.tagline}</p>
              <p className={styles.intro}>{t.intro}</p>
              <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp({ position: 'footer', lang: locale })} className={styles.ask}>
                {t.askUs}
                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              {/* The Google Reviews mark and the TPB seal side by side. The
                  seal carries the agent number. /about carries no tax agent
                  mention at all (Jo's rule), seal included. */}
              <div className={styles.trust}>
                <GoogleReviewsBadge lang={locale} />
                {!isAbout && (
                  <img src="/assets/tpb-registered.png" alt={sealAlt} width={509} height={319} loading="lazy" decoding="async" />
                )}
              </div>
            </div>

            <nav aria-label={t.services}>
              <p className={styles.head}>{t.services}</p>
              <div className={styles.col}>
                {t.serviceLinks.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              </div>
            </nav>

            <nav aria-label={t.learn}>
              <p className={styles.head}>{t.learn}</p>
              <div className={styles.col}>
                {t.learnLinks.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}
              </div>
            </nav>

            <nav aria-label={t.connect}>
              <p className={styles.head}>{t.connect}</p>
              <div className={styles.col}>
                {t.connectLinks.map(l => (
                  l.external
                    ? <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                    : <a key={l.href} href={l.href}>{l.label}</a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bar}>
          <div suppressHydrationWarning>
            {locale === 'ja' ? (
              <span>© {new Date().getFullYear()} Working Holiday Tax. 無断複写・転載を禁じます。</span>
            ) : (
              <span>© {new Date().getFullYear()} {t.copyright}</span>
            )}
          </div>
          <ul className={styles.links}>
            <li><Link href={`${base}/about`}>{t.about}</Link></li>
            <li><Link href={`${legalBase}/client-agreement`}>{t.clientAgreement}</Link></li>
            <li><Link href={`${legalBase}/privacy`}>{t.privacyPolicy}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

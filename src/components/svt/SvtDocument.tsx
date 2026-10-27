import { LOCALE_META, UI, type SvtLocale } from '@/lib/svt/i18n'
import { Header } from './Header'
import { Footer } from './Footer'
import { StickyWhatsApp } from './StickyWhatsApp'

/** The <html> of every SVT root layout, one per language, so <html lang> is
 *  right in the static HTML. */
export function SvtDocument({ locale, children }: { locale: SvtLocale; children: React.ReactNode }) {
  return (
    <html lang={LOCALE_META[locale].htmlLang}>
      <head>
        <link rel="preload" href="/svt-assets/fonts/5.3.0/be-vietnam-pro-latin-700-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/svt-assets/fonts/5.3.0/be-vietnam-pro-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        {locale === 'vi' ? <link rel="preload" href="/svt-assets/fonts/5.3.0/be-vietnam-pro-vietnamese-700-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> : null}
      </head>
      <body>
        <a className="svt-skip" href="#main">{UI[locale].skip}</a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <StickyWhatsApp locale={locale} />
        <Footer locale={locale} />
      </body>
    </html>
  )
}

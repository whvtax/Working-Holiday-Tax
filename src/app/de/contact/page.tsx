import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import Link from 'next/link'
import { WA_URL, EMAIL, SITE_URL, AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Kontakt - Steueragent für Backpacker | Working Holiday Tax',
  description: 'Kontaktiere unser Team, das unter Aufsicht eines registrierten Steueragenten arbeitet. WhatsApp, E-Mail, Instagram oder TikTok. Wir antworten innerhalb einer Stunde während der Geschäftszeiten.',
  keywords: [
    'Kontakt Working Holiday Tax',
    'Steueragent Australien Kontakt',
    'Steueragent Australien Deutsch Kontakt',
    'Backpacker Steuer Hilfe',
    'Working Holiday Steuer Hilfe Deutsch',
    'Working Holiday Visum Hilfe',
    'TFN Hilfe Deutsch',
    'Steuerrückerstattung Australien Hilfe',
    'Steuererklärung Australien Hilfe Deutsch',
    'WhatsApp Steueragent Australien',
    'kostenlose Beratung Working Holiday Steuer',
    'Steueragent Backpacker Deutsch',
    'Working Holiday Maker Hilfe Deutschland',
  ],
  alternates: { canonical: `${SITE_URL}/de/contact`, languages: { 'en-AU': `${SITE_URL}/contact`, 'de': `${SITE_URL}/de/contact`, 'ja': `${SITE_URL}/ja/contact`, 'x-default': `${SITE_URL}/contact` } },
  openGraph: {
    title: 'Kontakt - Steueragent für Backpacker | Working Holiday Tax',
    description: 'Kontaktiere unser Team, das unter Aufsicht eines registrierten Steueragenten arbeitet. Schnelle Antworten von echten Beratern.',
    url: `${SITE_URL}/de/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt - Steueragent für Backpacker | Working Holiday Tax',
    description: 'Kontaktiere unser Team, das unter Aufsicht eines registrierten Steueragenten arbeitet.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}

const FAQS = [
  {
    question: 'Wie schnell antwortet ihr?',
    answer: 'Während der Geschäftszeiten (Mo-Fr, 9-18 Uhr AEST) antworten wir meistens innerhalb einer Stunde. Außerhalb der Geschäftszeiten melden wir uns gleich am nächsten Morgen.',
  },
  {
    question: 'Kostet es etwas, eine Frage zu stellen?',
    answer: 'Nein. Erste Fragen und Beratungen sind kostenlos. Wir berechnen erst dann etwas, wenn du dich für einen Service entscheidest - z.B. Steuererklärung, TFN-Antrag oder Superauszahlung.',
  },
  {
    question: 'Welche Sprachen sprecht ihr?',
    answer: 'Unser Team bearbeitet Anfragen auf Englisch und auf Deutsch. Wir arbeiten jedes Jahr mit Working Holiday Makern aus über 45 Ländern - egal woher du kommst, wir machen es dir einfach.',
  },
  {
    question: 'Muss ich sofort Unterlagen schicken?',
    answer: 'Nein. Schick uns einfach erst mal deine Frage. Falls wir Unterlagen brauchen, sagen wir dir genau, was du schicken sollst und wie du es sicher schickst.',
  },
  {
    question: 'Könnt ihr mir helfen, wenn ich Australien schon verlassen habe?',
    answer: 'Ja. Wir arbeiten mit Working Holiday Makern, die noch in Australien sind, vor Kurzem abgereist sind oder schon vor Jahren zurückgekehrt sind. Alles geht aus der Ferne - Steuererklärungen, Superauszahlungen (DASP) und ABN-Angelegenheiten.',
  },
  {
    question: 'Könnt ihr mir aus Deutschland, Österreich oder der Schweiz helfen?',
    answer: 'Ja. Wir helfen Working Holiday Makern aus Deutschland, Österreich, der Schweiz und vielen anderen Ländern dabei, ihre australische Steuerrückerstattung und Super (DASP) zu beantragen und alle offenen Steuerangelegenheiten von zu Hause aus zu regeln. Der gesamte Prozess läuft online ab - keine Rückreise nach Australien nötig.',
  },
  {
    question: 'Welche Informationen brauche ich beim ersten Kontakt?',
    answer: 'Nur ein paar Basics zum Anfang: deine Visumsklasse (417 oder 462), ungefähr wann du in Australien gearbeitet hast, womit wir dir helfen sollen (Steuererklärung, Super, TFN, ABN) und wo du dich gerade aufhältst. Falls wir Unterlagen brauchen, sagen wir dir das danach genau.',
  },
]

export default function GermanContactPage() {

  // ContactPage schema with ContactPoint
  const contactPageLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/de/contact`,
    url: `${SITE_URL}/de/contact`,
    name: 'Kontakt - Working Holiday Tax',
    description: 'Kontaktiere unser Team, das unter Aufsicht eines registrierten Steueragenten arbeitet, für Hilfe mit TFN, Steuererklärung, Super und ABN.',
    inLanguage: 'de',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#business`,
    },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      legalName: AGENT_NAME,
      url: SITE_URL,
      email: EMAIL,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: EMAIL,
          areaServed: 'AU',
          availableLanguage: ['German', 'English'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
            validFrom: '2020-01-01',
          },
        },
        {
          '@type': 'ContactPoint',
          contactType: 'WhatsApp',
          telephone: `+${'61424513998'}`,
          areaServed: 'AU',
          availableLanguage: ['German', 'English'],
        },
      ],
      identifier: [
        { '@type': 'PropertyValue', name: 'ABN', value: AGENT_ABN },
        { '@type': 'PropertyValue', name: 'Tax Agent Number', value: AGENT_TPB },
      ],
    },
  }

  // Breadcrumb schema
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
      { '@type': 'ListItem', position: 2, name: 'Kontakt', item: `${SITE_URL}/de/contact` },
    ],
  }

  // FAQ schema
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'de',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO + BREADCRUMBS ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-5 pb-7 lg:pt-12 lg:pb-12">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-5 lg:mb-6">
            <ol className="flex items-center gap-2" style={{ fontSize: '13px', color: '#587066' }}>
              <li>
                <Link href="/de" className="contact-breadcrumb-link">Startseite</Link>
              </li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Kontakt</li>
            </ol>
          </nav>

          <div className="max-w-[640px] mx-auto text-center">

            <div className="inline-flex items-center gap-2 mb-3 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                Kontakt
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize: 'clamp(24px,5vw,46px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
              }}>
              Hast du Steuerfragen?<br />Wir haben die Antworten.
            </h1>

            <p className="font-light mx-auto"
              style={{
                fontSize: 'clamp(15px,1.3vw,16px)',
                lineHeight: 1.6,
                color: 'rgba(10,15,13,0.7)',
                maxWidth: '46ch',
              }}>
              Echte Menschen, schnelle Antworten. Wir melden uns innerhalb einer Stunde während der Geschäftszeiten.
            </p>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS STRIP ─────────────────────────────────────────── */}
      <section className="bg-white" style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-5 lg:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { stat: '1.200+', label: 'Backpacker' },
              { stat: <GoogleRating variant="number" lang="de" />, label: 'Bewertung' },
              { stat: '45+',    label: 'Länder' },
              { stat: '~1 Std',  label: 'Antwortzeit' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: '#0B5240', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '4px' }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: '11px', color: '#587066', letterSpacing: '0.02em' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT OPTIONS ─────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }}>
        <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="text-center mb-6 lg:mb-8">
            <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              Erreich uns
            </p>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '6px' }}>
              Such dir was aus
            </h2>
            <p className="font-light" style={{ fontSize: '14.5px', color: '#587066', lineHeight: 1.65 }}>
              Echte Berater, keine Bots.
            </p>
          </div>

          <address style={{ fontStyle: 'normal' }}>

            {/* WhatsApp - primary */}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="contact-option-card contact-option-primary">
              <div className="contact-option-icon" style={{ background: '#22C55E' }}>
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="0.5"/>
                  <path d="M13.1 12.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3.12.3.42 1.26.46 1.35.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z" fill="white"/>
                </svg>
              </div>
              <div className="flex-1" style={{ minWidth: 0 }}>
                <p className="contact-option-label">WhatsApp</p>
                <p className="contact-option-detail">Meistens Antwort in unter 1 Stunde</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="contact-option-arrow">
                <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Email - Gmail icon */}
            <a href={`mailto:${EMAIL}?subject=Steuerfrage%20von%20Website`}
              className="contact-option-card">
              <div className="contact-option-icon" style={{ background: '#fff', border: '1px solid #E2EFE9' }}>
                {/* Gmail logo */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M22 6l-10 7L2 6" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke="#4285F4" strokeWidth="1.8"/>
                  <path d="M2 5l10 8 10-8" stroke="#34A853" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
                  <path d="M22 5L12 13" stroke="#FBBC04" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="flex-1" style={{ minWidth: 0 }}>
                <p className="contact-option-label">E-Mail</p>
                <p className="contact-option-detail" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{EMAIL}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="contact-option-arrow">
                <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* Social row - Instagram with gradient + TikTok with colors */}
            <div className="grid grid-cols-2 gap-3" style={{ marginTop: '12px' }}>
              <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer"
                className="contact-option-card-small">
                <div className="contact-option-icon-small" style={{ background: 'linear-gradient(45deg, #F58529 0 %, #DD2A7B 50 %, #8134AF 100 %)', border: 'none' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <span className="contact-option-label-small">Instagram</span>
              </a>
              <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer"
                className="contact-option-card-small">
                <div className="contact-option-icon-small" style={{ background: '#010101', border: 'none', position: 'relative' }}>
                  {/* TikTok logo with cyan + magenta layers */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    {/* Cyan layer (offset) */}
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z"
                      fill="#25F4EE" transform="translate(-1.2, 0.4)" opacity="0.85"/>
                    {/* Magenta layer (offset) */}
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z"
                      fill="#FE2C55" transform="translate(1.2, -0.4)" opacity="0.85"/>
                    {/* White main */}
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z"
                      fill="white"/>
                  </svg>
                </div>
                <span className="contact-option-label-small">TikTok</span>
              </a>
            </div>
          </address>

          {/* Operating hours */}
          <div className="contact-hours-block">
            <p className="contact-hours-title">
              <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5" style={{ background: '#2FA880' }} aria-hidden="true" />
              Geschäftszeiten
            </p>
            <p className="contact-hours-detail">
              Montag bis Freitag, 9-18 Uhr AEST<br />
              <span style={{ color: '#8AADA3' }}>Antwort innerhalb einer Stunde während der Geschäftszeiten</span>
            </p>
          </div>

        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '50px', paddingBottom: '50px' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="text-center mb-8">
            <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              Häufige Fragen
            </p>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
              Bevor du uns schreibst
            </h2>
          </div>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="contact-faq" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '50px', paddingBottom: '60px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[520px] mx-auto text-center">
            <p className="font-semibold uppercase mb-3" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              Bereit, wenn du es bist
            </p>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px' }}>
              Starte heute deine Steuererklärung
            </h2>
            <p className="font-light mx-auto" style={{ fontSize: '15px', color: '#587066', lineHeight: 1.7, marginBottom: '24px', maxWidth: '420px' }}>
              Kein Papierkram, keine ATO-Portale. Wir machen alles online - meistens innerhalb von 24 Stunden.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 36px', fontSize: '15px', minWidth: '260px' }}>
              Steuererklärung starten →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

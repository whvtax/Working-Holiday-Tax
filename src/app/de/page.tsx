import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL, AGENT_NAME } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { getGoogleRating } from '@/lib/googleData'

// ─── METADATA - rich SEO + AI optimized for German market ─────────────────
export const metadata: Metadata = {
  title: 'Steuerrückerstattung Australien Working Holiday | WHV Steuererklärung',
  description:
    'Steuerrückerstattung Australien für Working Holiday Maker auf 417/462 Visum. Unter Aufsicht eines registrierten Steueragenten erledigen wir deine Steuererklärung, TFN, Super-Rückzahlung (DASP) und ABN - komplett online, auch nach deiner Rückkehr aus Australien.',
  keywords: [
    // Primary refund-focused terms (core service)
    'Steuerrückerstattung Australien',
    'Steuerrückerstattung Australien Working Holiday',
    'Steuerrückerstattung Backpacker Australien',
    'Working Holiday Steuerrückerstattung',
    'WHV Steuerrückerstattung',
    'Steuer zurückholen Australien Backpacker',
    'Steuer zurück Australien',
    'Steuer zurück Australien Backpacker',
    'Steuern zurück Australien',
    'Backpacker Steuer zurück Australien',
    'Steuerrückerstattung 417 Visum',
    'Steuerrückerstattung 462 Visum',
    'wie bekomme ich Steuern zurück Australien',
    'wie viel Steuern zurück Australien',
    'Steuererklärung Working Holiday Rückerstattung',
    'Working Holiday Maker Rückerstattung',
    'Work and Travel Steuerrückerstattung',
    'Work and Travel Steuer zurück',
    'Steuerrückerstattung Rechner Australien',
    'Steuererklärung nach Rückkehr Australien',
    'Steuererklärung Australien nach Heimkehr',
    // Adjacent services
    'Working Holiday Steuer Australien',
    'Backpacker Steuer Australien',
    'Steuererklärung Working Holiday',
    'Steuererklärung Australien Backpacker',
    'TFN beantragen Australien',
    'Super auszahlen Australien',
    'DASP Auszahlung',
    'DASP Rückerstattung',
    'Super zurück Australien Backpacker',
    '417 Visum Steuer',
    '462 Visum Steuer',
    'Work and Travel Steuer Australien',
    'Steuerberater Australien Deutsch',
    'Steueragent Australien Deutsch',
    'Working Holiday Maker Steuersatz',
    'Medicare Levy Befreiung Backpacker',
    'registrierter Steueragent Australien',
    // Treaty-aware long-tail
    'Doppelbesteuerungsabkommen Australien Deutschland Working Holiday',
    'Notice of Assessment Australien Deutsch',
    'PAYG Summary Working Holiday Deutsch',
  ],
  alternates: {
    canonical: `${SITE_URL}/de`,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de`,
    siteName: 'Working Holiday Tax',
    title: 'Steuerrückerstattung Australien Working Holiday | WHV Steuererklärung',
    description: 'Steuerrückerstattung Australien für Working Holiday Maker (417/462). Unter Aufsicht eines registrierten Steueragenten erledigen wir deine Steuererklärung, TFN, Super (DASP) und ABN – komplett online.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Steuerrückerstattung Australien Working Holiday Maker - Backpacker Steuer 417 462 Visum' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steuerrückerstattung Australien | Working Holiday WHV',
    description: 'Steuerrückerstattung in Australien als Working Holiday Maker. Alles online, auch nach deiner Rückkehr.',
    images: [`${SITE_URL}/og-image.png`],
  },
}

// ─── ICONS ───────────────────────────────────────────────────────────────
const IconTFN     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconABN     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 8l7-5 7 5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7.5 17v-6h5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconReturn  = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16v1a1 1 0 001 1h12a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconSuper   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconMedicare = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 17.5s-6-3.5-6-8.5a3 3 0 016-2 3 3 0 016 2c0 5-6 8.5-6 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="10" y1="7" x2="10" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="7.5" y1="9.5" x2="12.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const CheckIcon   = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M3.5 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

// ─── TESTIMONIALS - real backpacker reviews ─────────────────────────────

const STEPS = [
  { n: '1', title: 'Erzähl uns deine Situation',     body: 'TFN, ABN, Working Holiday Steuererklärung oder Super - wir helfen dir von Anfang an weiter.' },
  { n: '2', title: 'Schick uns deine Daten',         body: 'Kurze Checkliste, keine komplizierten Formulare oder Papierkram.' },
  { n: '3', title: 'Wir kümmern uns um alles',       body: 'Wir bereiten alles vor und reichen es unter Aufsicht eines registrierten Steueragenten beim ATO ein.' },
  { n: '4', title: 'Dein Bescheid kommt',            body: 'Sobald das ATO deine Steuererklärung bearbeitet hat, wird eine eventuelle Rückerstattung direkt auf dein australisches Bankkonto überwiesen.' },
]

const SERVICES = [
  { n: '01', href: '/de/tfn',            icon: <IconTFN />,      title: 'TFN beantragen',       desc: 'Vom ersten Arbeitstag an mit dem richtigen Working Holiday Steuersatz arbeiten.' },
  { n: '02', href: '/de/abn',            icon: <IconABN />,      title: 'ABN-Registrierung',    desc: 'Als Selbstständiger arbeiten und Rechnungen korrekt ausstellen.' },
  { n: '03', href: '/de/tax-return',     icon: <IconReturn />,   title: 'Steuererklärung',      desc: 'Working Holiday Steuererklärung einreichen und jede dir zustehende Rückerstattung beantragen.' },
  { n: '04', href: '/de/superannuation', icon: <IconSuper />,    title: 'Superauszahlung',     desc: 'Hol dir dein Superguthaben per DASP zurück, wenn du Australien verlässt.' },
  { n: '05', href: '/de/medicare',       icon: <IconMedicare />, title: 'Medicare Levy',        desc: 'Befreiung von der Medicare Levy beantragen, wenn du nicht versichert bist.' },
]

const FAQS = [
  {
    question: 'Wie funktioniert eine Steuerrückerstattung aus Australien für Working Holiday Maker?',
    answer: 'Wenn du in Australien mit einem 417 oder 462 Visum gearbeitet hast, hat dein Arbeitgeber während des Jahres Steuern von deinem Lohn einbehalten. Nach dem 30. Juni reichst du eine Steuererklärung beim ATO (australisches Finanzamt) ein, und die zu viel gezahlten Steuern bekommst du als Rückerstattung zurück. Die genaue Höhe hängt von deinem Einkommen, deinem steuerlichen Wohnsitzstatus, den Abzügen, die du geltend machen kannst, und davon ab, ob dein Arbeitgeber als Working Holiday Maker Arbeitgeber registriert war. Unter Aufsicht eines registrierten Steueragenten prüfen wir deine Situation und sorgen dafür, dass deine Erklärung korrekt eingereicht wird.',
  },
  {
    question: 'Was kosten eure Leistungen?',
    answer: 'Die erste Anfrage und unser Kostenvoranschlag sind kostenlos. Unsere Gebühren sind pauschal und hängen vom Service ab. Bei Steuererklärungen können die Gebühren direkt von der Rückzahlung abgezogen werden - du musst also nichts im Voraus bezahlen. Wir bestätigen den Preis immer, bevor wir loslegen.',
  },
  {
    question: 'Wie schnell antwortet ihr?',
    answer: 'Während der Geschäftszeiten (Mo-Fr, 9-18 Uhr AEST/AEDT) antworten wir meistens innerhalb einer Stunde. Außerhalb der Geschäftszeiten melden wir uns gleich am nächsten Morgen bei dir.',
  },
  {
    question: 'Könnt ihr mir auch helfen, wenn ich Australien schon verlassen habe?',
    answer: 'Ja. Wir helfen Working Holiday Makern aus Deutschland, Österreich, der Schweiz und weltweit dabei, ihre Steuererklärung einzureichen und ihre Super (DASP) zu beantragen - alles komplett online, auch Jahre nach der Rückkehr. Wir wickeln alles aus der Ferne ab. Deine Steuerrückerstattung wird auf dein australisches Bankkonto überwiesen (ATO-Vorschrift), die Super-Rückerstattung (DASP) kann aber auf dein deutsches Konto gehen.',
  },
  {
    question: 'Welchen Steuersatz zahlen Working Holiday Maker in Australien?',
    answer: 'Working Holiday Maker zahlen einen pauschalen Steuersatz von 15 % auf die ersten 45.000 AUD, dann 30 % bis 135.000 AUD, 37 % bis 190.000 AUD und 45 % darüber. Es gibt keinen steuerfreien Grundbetrag für WHV-Inhaber. Wenn du deinem Arbeitgeber keine TFN gibst, muss er sogar 45 % einbehalten - einer der häufigsten Gründe, warum Backpacker am Ende eine Steuerrückerstattung bekommen.',
  },
  {
    question: 'Wie viel Steuerrückerstattung bekomme ich aus Australien?',
    answer: 'Das hängt von deiner persönlichen Situation ab: wie viel du verdient hast, wie viel Steuer einbehalten wurde, dein steuerlicher Wohnsitzstatus, deine Visumsklasse und die abziehbaren Kosten. Wir können keinen bestimmten Betrag versprechen - was wir machen, ist deine Erklärung korrekt einzureichen und jeden Abzug, der dir zusteht, geltend zu machen.',
  },
  {
    question: 'Macht ihr nur Steuererklärungen?',
    answer: 'Nein. Wir helfen bei TFN-Anträgen, ABN-Registrierungen, Working Holiday Steuererklärungen, Superauszahlungen (DASP) und Medicare-Levy-Befreiungen - also bei allem, was du als Working Holiday Maker auf einem 417 oder 462 Visum brauchst.',
  },
]

export default async function GermanHomePage() {
  const gRating = await getGoogleRating()

  // ─── Schema.org for German page ───
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/#webpage`,
    url: `${SITE_URL}/de`,
    name: 'Steuerrückerstattung Australien Working Holiday | WHV Steuererklärung',
    description: 'Steuerrückerstattung Australien unter Aufsicht eines registrierten Steueragenten – Working Holiday Maker auf 417/462 Visum. TFN, Steuererklärung, Super (DASP) und ABN – alles online erledigt.',
    inLanguage: 'de',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    description: 'Steuerrückerstattung und Steuererklärung für Working Holiday Visuminhaber (417/462) in Australien.',
    url: SITE_URL,
    inLanguage: 'de',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: gRating.rating.toFixed(1),
      reviewCount: gRating.count,
      bestRating: '5',
      worstRating: '1',
    },
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'de',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  // Organization schema with full service catalog - critical for AI search
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'AccountingService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Working Holiday Tax',
    legalName: AGENT_NAME,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description: 'Service unter Aufsicht eines registrierten australischen Steueragenten, spezialisiert auf Working Holiday Maker (Visumklassen 417 und 462). Beratung in Deutsch, Englisch und Japanisch.',
    foundingDate: '2020',
    knowsLanguage: ['en', 'de', 'ja'],
    areaServed: {
      '@type': 'Country',
      name: 'Australia',
    },
    audience: {
      '@type': 'Audience',
      name: 'Working Holiday Visuminhaber in Australien (Subclass 417 und 462)',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Steuer- und Buchhaltungsdienstleistungen für Working Holiday Maker',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'TFN-Antrag (Tax File Number)',
            description: 'Beantragung der Tax File Number für Working Holiday Maker.',
            url: `${SITE_URL}/de/tfn`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ABN-Registrierung',
            description: 'Registrierung der Australian Business Number für Selbstständige.',
            url: `${SITE_URL}/de/abn`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Australische Steuererklärung',
            description: 'Vorbereitung und Einreichung der jährlichen Steuererklärung beim ATO.',
            url: `${SITE_URL}/de/tax-return`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'DASP Superannuation-Auszahlung',
            description: 'Beantragung der Departing Australia Superannuation Payment nach der Abreise.',
            url: `${SITE_URL}/de/superannuation`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Medicare Levy Exemption',
            description: 'Beantragung der Medicare Levy Befreiung für Working Holiday Maker.',
            url: `${SITE_URL}/de/medicare`,
          },
        },
      ],
    },
    sameAs: [
      'https://www.tpb.gov.au/public-register',
    ],
    knowsAbout: [
      'Australisches Steuerrecht',
      'Working Holiday Visum Subclass 417',
      'Working Holiday Visum Subclass 462',
      'Tax File Number (TFN)',
      'Australian Business Number (ABN)',
      'Superannuation und DASP',
      'Medicare Levy Exemption',
      'Fair Work Australia',
      'PAYG Steuerabzug',
      'Backpacker Steuersatz',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 pt-12 pb-10 lg:pt-14 lg:pb-12 text-center">

          <div className="inline-flex items-center gap-2 mb-4 lg:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(11,82,64,0.65)' }}>Steuererklärungs-Spezialisten</span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(22px, 5vw, 42px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px' }}>
            {/* Desktop */}
            <span className="hidden lg:block">
              <span style={{ display: 'block' }}>Steuererklärung Australien?</span>
              <span style={{ display: 'block', color: '#0B5240' }}>Wir kümmern uns drum.</span>
            </span>
            {/* Mobile */}
            <span className="lg:hidden">
              <span style={{ display: 'block' }}>Steuererklärung für</span>
              <span style={{ display: 'block', color: '#0B5240' }}>Working Holiday Maker</span>
            </span>
          </h1>

          <p className="font-light mx-auto"
            style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.55)', maxWidth: '54ch', marginBottom: '10px' }}>
            <span className="hidden lg:inline">Steuerexperten für Working Holiday Maker auf <span style={{ whiteSpace: 'nowrap' }}>417 &amp; 462 Visum</span>.<br />TFN, ABN, Steuererklärung &amp; Super</span>
            <span className="lg:hidden">TFN, ABN, Steuererklärung &amp; Super</span>
          </p>

          <div style={{ marginTop: '24px', marginBottom: '16px' }} className="lg:mt-8 lg:mb-4">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '320px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              Steuererklärung starten →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 mx-auto">
            {['1.200+ Backpacker geholfen', <GoogleRating key="rating" variant="pill" lang="de" />, '45+ Länder', 'Antwort in unter 1 Stunde'].map((label, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                style={{ fontSize: '12px', color: 'rgba(10,15,13,0.5)' }}>
                <CheckIcon />{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 text-center">

          <span className="section-label center">Warum wir?</span>

          <h2 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.12, letterSpacing: '-0.025em', maxWidth: '28ch', marginTop: '10px', marginBottom: '10px' }}>
            Gemacht für Backpacker mit Working Holiday Visum in Australien.
          </h2>

          <p className="font-light text-muted mx-auto"
            style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.7, maxWidth: '42ch', marginBottom: '32px', textAlign: 'center' }}>
            Ein Fokus: Working Holiday Steuern.<br />Jede Steuerrückerstattung, die dir zusteht - korrekt beantragt.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10" style={{ marginBottom: '36px' }}>
            {[
              { title: 'Backpackersteuer-Experten.',       body: 'Wir arbeiten ausschließlich mit Working Holiday Makern. Die Regeln für 417 und 462 Visa kennen wir in- und auswendig.' },
              { title: 'ATO-konform.',                     body: 'Eingereicht über einen registrierten Steueragenten und voll konform mit den aktuellen ATO-Regeln für Working Holiday Maker.' },
              { title: 'Klare, einfache Hilfe.',           body: 'Keine komplizierten Begriffe. Wir führen dich Schritt für Schritt durch deine Steuererklärung - in einfacher Sprache.' },
              { title: 'Wir kümmern uns um alles.',        body: 'Kein Papierkram, kein Stress. Von der TFN bis zur Steuerrückerstattung - wir erledigen alles, in Australien oder nach deiner Rückkehr.' },
            ].map((item, i) => (
              <div key={i} className="pt-4 lg:pt-6 text-center" style={{ borderTop: '1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: 'clamp(13px, 1.2vw, 13.5px)', marginBottom: '6px', lineHeight: 1.35 }}>{item.title}</h3>
                <p className="font-light text-muted leading-[1.7]" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '8px' }} className="lg:mt-4">
            <Link href="#how-it-works" className="btn-ghost-dark inline-flex" style={{ height: '44px', padding: '0 24px', fontSize: '13.5px' }}>
              Steuererklärung starten →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">Erfolge unserer Kunden</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', maxWidth: '30ch' }}>
              Das sagen Backpacker über die Zusammenarbeit mit uns.
            </h2>
          </div>

          <GoogleReviews lang="de" />

          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #E2EFE9' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8">
              {[
                { n: <GoogleRating variant="number" lang="de" />, l: <GoogleRating variant="count" lang="de" /> },
                { n: '1.200+',  l: 'Backpacker geholfen' },
                { n: '< 1 Std', l: 'Antwortzeit' },
                { n: '100 %',   l: 'Komplett online, ohne Papierkram' },
              ].map((s, i) => (
                <div key={i} className="text-center py-2 lg:py-3">
                  <p className="font-serif font-black text-forest-500"
                    style={{ fontSize: 'clamp(18px, 2.8vw, 28px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                  <p className="text-subtle"
                    style={{ fontSize: 'clamp(11px, 1.1vw, 12.5px)', marginTop: '5px', lineHeight: 1.4 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">So funktioniert&apos;s</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '28ch' }}>
              In 4 einfachen Schritten zur Steuerrückerstattung
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.7, maxWidth: '40ch', marginBottom: '4px' }}>
              <em className="not-italic text-forest-400">Einfacher Ablauf. Deine Working Holiday Steuerrückerstattung - korrekt beantragt.</em>
            </p>
          </div>

          {/* Desktop 4-step horizontal */}
          <div className="hidden lg:block" style={{ marginBottom: '56px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 25%, #0B5240 75%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-4" style={{ zIndex: 1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width: '40px', height: '40px', background: '#0B5240', fontSize: '15px', marginBottom: '20px', boxShadow: '0 0 0 5px #fff, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize: '14px', marginBottom: '8px', lineHeight: 1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize: '12.5px', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '24px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width: '30px', height: '30px', background: '#0B5240', fontSize: '13px', flexShrink: 0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 w-px mt-2"
                      style={{ minHeight: '22px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '8px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '320px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              Steuererklärung starten →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#2FA880' }}>
              Kostenloser Start&nbsp;&bull;&nbsp;Keine Vorabzahlung&nbsp;&bull;&nbsp;Persönliche Betreuung
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">Womit wir dir helfen</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '28ch' }}>
              Komplette Steuerbetreuung für Working Holiday Maker<br />
              <em className="not-italic font-normal text-forest-400">in Australien.</em>
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', textAlign: 'center', lineHeight: 1.7, maxWidth: '44ch' }}>
              Vom ersten Job in Australien bis zur Steuerrückerstattung.<br />Wir kümmern uns drum.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <span className="font-medium uppercase text-subtle" style={{ fontSize: '10px', letterSpacing: '0.1em', marginBottom: '10px' }}>{s.n}</span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0"
                  style={{ marginBottom: '10px' }}>{s.icon}</span>
                <h3 className="font-semibold text-ink service-card-title" style={{ fontSize: '13.5px', marginBottom: '5px' }}>{s.title}</h3>
                <p className="font-light text-muted leading-[1.65] flex-1" style={{ fontSize: '12px', marginBottom: '12px' }}>{s.desc}</p>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3" style={{ fontSize: '12px' }}>
                  Mehr erfahren →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-8">
            <span className="section-label center">Häufige Fragen</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Schnelle Antworten
            </h2>
          </div>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="de-home-faq" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>

          <p className="text-center" style={{ marginTop: '28px', fontSize: '14px', color: '#587066' }}>
            Noch Fragen? <Link href="/de/contact" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>Schreib uns</Link>
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Jetzt starten"
        heading="Deine Steuer geregelt"
        headingEm="in Australien oder im Ausland."
        sub={<>Wir kümmern uns um deine TFN, Steuererklärung, Super und ABN<span className="hidden sm:inline">,</span><br className="sm:hidden" /> alles aus einer Hand.</>}
        primaryLabel="Steuererklärung starten"
        trustLine=""
        clipTop
      />
    </>
  )
}

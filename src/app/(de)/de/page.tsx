import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { getGoogleRating } from '@/lib/googleData'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'

// ─── METADATA ───────────────────────────────────────────────────────────
// Head terms stay, the description follows the new positioning. No price
// anywhere, and no keyword that asserts we are a Steuerberater ourselves.
export const metadata: Metadata = {
  title: 'Steuerrückerstattung Australien: WHV',
  description:
    'Steuererklärung für Working Holiday Maker auf 417 und 462. Wohnsitz, Medicare-Befreiung und Abzüge, geklärt vor dem Einreichen.',
  keywords: [
    'Steuerrückerstattung Australien',
    'Steuerrückerstattung Australien Working Holiday',
    'Steuerrückerstattung Backpacker Australien',
    'Working Holiday Steuerrückerstattung',
    'WHV Steuerrückerstattung',
    'Steuer zurückholen Australien Backpacker',
    'Steuer zurück Australien',
    'Steuern zurück Australien',
    'Steuerrückerstattung 417 Visum',
    'Steuerrückerstattung 462 Visum',
    'wie bekomme ich Steuern zurück Australien',
    'Steuererklärung Working Holiday Rückerstattung',
    'Work and Travel Steuerrückerstattung',
    'Work and Travel Steuer zurück',
    'Steuererklärung nach Rückkehr Australien',
    'Working Holiday Steuer Australien',
    'Backpacker Steuer Australien',
    'Steuererklärung Working Holiday',
    'steuerlicher Wohnsitz Working Holiday Australien',
    'TFN beantragen Australien',
    'Super auszahlen Australien',
    'DASP-Auszahlung',
    '417 Visum Steuer',
    '462 Visum Steuer',
    'Working Holiday Maker Steuersatz',
    'Medicare Levy Befreiung Backpacker',
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
    description:
      'Absenden kann jeder. Die Arbeit passiert davor: steuerlicher Wohnsitz, jeder Arbeitgeber, die Medicare-Befreiung und die Abzüge, die zu deiner Arbeit gehören.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Steuerrückerstattung Australien Working Holiday Maker, Backpacker Steuer 417 462 Visum' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steuerrückerstattung Australien | Working Holiday WHV',
    description: 'Steuererklärung in Australien als Working Holiday Maker. Wohnsitz, Medicare, Abzüge und jeder Arbeitgeber, geprüft bevor eingereicht wird.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconTFN      = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconABN      = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 8l7-5 7 5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7.5 17v-6h5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconReturn   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16v1a1 1 0 001 1h12a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconSuper    = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconMedicare = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 17.5s-6-3.5-6-8.5a3 3 0 016-2 3 3 0 016 2c0 5-6 8.5-6 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="10" y1="7" x2="10" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="7.5" y1="9.5" x2="12.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconWhatsApp = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" /></svg>)

// ─── COPY ───────────────────────────────────────────────────────────────

/** Freigegeben 22. Aug. Nicht umschreiben. */
const FIGURES = [
  {
    figure: '45 %',
    body: 'Zum Höchstsatz einbehalten, bevor deine TFN beim Arbeitgeber war. Das kommt nur zurück, wenn es jemand geltend macht.',
  },
  {
    figure: '18.200 $',
    body: 'Dein steuerlicher Wohnsitz. Giltst du als steuerlich ansässig, gehört der volle Freibetrag dir.',
  },
  {
    figure: '2 %',
    body: 'Eine Medicare Levy, die du nie geschuldet hast. Mit einer Bescheinigung abziehbar, die fast niemand beantragt.',
  },
]

const ANALYSIS = [
  {
    n: '01',
    title: 'Dein steuerlicher Wohnsitz',
    body: 'Die meisten setzen hier ein Häkchen und denken nie wieder daran. Der Wohnsitz ist eine Beurteilung, über die sogar der High Court im Fall Addy entschieden hat, und die größte Zahl auf dieser Seite.',
  },
  {
    n: '02',
    title: 'Jeder Arbeitgeber, jede Woche',
    body: 'Ein Working-Holiday-Jahr ist unordentlich: mehrere Arbeitgeber, späte Zahlungen, vergessene Jobs. Wir rechnen es gegen deinen ATO-Datensatz ab, nicht gegen dein Gedächtnis.',
  },
  {
    n: '03',
    title: 'Medicare, falls es dich betrifft',
    body: 'Zwei Prozent gehen standardmäßig ab, ob du sie geschuldet hast oder nicht. Zu erkennen, wann sie nie deine war, und sie entfernen zu lassen, ist unser Job.',
  },
  {
    n: '04',
    title: 'Abzüge für die Arbeit, die du wirklich gemacht hast',
    body: 'Ein Fruit Picker, ein Barista und ein Fahrer setzen nicht dasselbe ab. Wir fragen, woraus deine Arbeit bestand, und machen geltend, was dazugehört.',
  },
  {
    n: '05',
    title: 'Dann wird eingereicht',
    body: 'Geprüft und freigegeben von einem registrierten Steueragenten, bevor sie zum ATO geht. Die vier Schritte davor entscheiden die Zahl.',
  },
]

const COMPARISON = [
  { mygov: '15 % Steuer ab dem ersten Dollar',                us: 'Wir finden heraus, was für dich tatsächlich stimmt' },
  { mygov: 'Von der Medicare-Befreiung steht dort nichts',      us: 'Wir helfen beim Antrag, wenn du die Bedingungen erfüllst' },
  { mygov: 'Abzüge sind ein leeres Feld',                       us: 'Wir wissen, was deine Art von Arbeit absetzen kann' },
  { mygov: 'Du brauchst ein Konto und eine aktive Handynummer', us: 'Du brauchst nichts. Wir regeln das mit dem ATO' },
]

const SERVICES = [
  { n: '01', href: '/de/tfn',            icon: <IconTFN />,      title: 'TFN beantragen',    desc: 'Vor dem ersten Payslip, ohne Wochen zum Höchstsatz.' },
  { n: '02', href: '/de/abn',            icon: <IconABN />,      title: 'ABN-Registrierung', desc: 'Rechnungen stellen, Steuerliches vorher erklärt.' },
  { n: '03', href: '/de/tax-return',     icon: <IconReturn />,   title: 'Steuererklärung',   desc: 'Die Analyse oben, dann die Einreichung beim ATO.' },
  { n: '04', href: '/de/superannuation', icon: <IconSuper />,    title: 'Superauszahlung',   desc: 'Alle Fonds gefunden, ein DASP-Antrag zur Abreise.' },
  { n: '05', href: '/de/medicare',       icon: <IconMedicare />, title: 'Medicare Levy',     desc: 'Die Befreiung, wenn dein Jahr die Bedingungen erfüllt.' },
]

const GUIDES = [
  { href: '/de/blog/diy-tax-return-vs-tax-agent-working-holiday', title: 'Selbst machen oder Steuerberater',        desc: 'Was dich beides wirklich kostet.' },
  { href: '/de/blog/tax-residency-working-holiday-makers',        title: 'Bist du steuerlich ansässig',         desc: 'Die Frage, die auf einer Backpacker-Erklärung das meiste Geld bewegt.' },
  { href: '/de/blog/medicare-levy-working-holiday-makers',        title: 'Die Medicare-Levy-Befreiung',         desc: 'Wer die zwei Prozent schuldet, wer nicht, und wie sie wegfallen.' },
  { href: '/de/blog/tax-deductions-working-holiday-makers',       title: 'Was du absetzen kannst',              desc: 'Abzüge nach Art der Arbeit, statt einer allgemeinen Liste.' },
]

const FAQS = [
  {
    question: 'Wovon hängt ab, wie viel Steuern ich aus Australien zurückbekomme?',
    answer: 'Vier Dinge: dein steuerlicher Wohnsitz für das Jahr, ob ein Teil deines Lohns mit 45 % einbehalten wurde, bevor deine TFN beim Arbeitgeber ankam, ob die 2 % Medicare Levy abgezogen wurden, obwohl du keinen Anspruch auf Medicare hattest, und die Abzüge, die zu deiner Arbeit gehören.\n\nZwei Leute mit demselben Einkommen können deshalb sehr unterschiedliche Rückerstattungen bekommen.',
  },
  {
    question: 'Kann ich meine Steuererklärung einfach selbst über myGov einreichen?',
    answer: 'Kannst du. Das Einreichen ist der einfache Teil. Was dir der Bildschirm nicht sagt: dein steuerlicher Wohnsitz für das Jahr, ob ein Arbeitgeber zum falschen Satz einbehalten hat, ob die Medicare Levy überhaupt hätte abgehen dürfen, und was deine Art von Arbeit absetzen darf. Diese vier Beurteilungen entscheiden den Betrag.',
  },
  {
    question: 'Was kosten eure Leistungen?',
    answer: 'Unsere Gebühren sind pauschal und niemals ein Prozentsatz deiner Rückerstattung.\n\nWir bestätigen die Gebühr per WhatsApp, bevor irgendetwas beginnt, und sie wird im Voraus bezahlt. Danach schicken wir dir den vollständigen Fragebogen und starten die Arbeit. Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also für unseren Service nie drauf.',
  },
  {
    question: 'Welchen Steuersatz zahlen Working Holiday Maker in Australien?',
    answer: 'Working Holiday Maker zahlen pauschal 15 % auf die ersten 45.000 $, dann 30 % bis 135.000 $, 37 % bis 190.000 $ und 45 % darüber.\n\nWenn du deinem Arbeitgeber keine TFN gegeben hast, muss er stattdessen zum Höchstsatz einbehalten, einer der häufigsten Gründe, warum Backpacker am Ende Geld zurückbekommen.',
  },
  {
    question: 'Könnt ihr mir auch helfen, wenn ich Australien schon verlassen habe?',
    answer: 'Ja. Leute aus Deutschland, Österreich, der Schweiz und vielen anderen Ländern reichen ihre australische Steuererklärung ein und beantragen ihre Super (DASP), oft Jahre nach dem Rückflug, alles online.\n\nEine Regel vorweg: Das ATO kann eine Steuerrückerstattung nur auf ein australisches Bankkonto auszahlen, die Super-Rückerstattung (DASP) dagegen auch ins Ausland. Ist dein australisches Konto schon geschlossen, sag uns früh Bescheid, weil sich dadurch die Reihenfolge ändert.',
  },
  {
    question: 'Wie schnell antwortet ihr?',
    answer: 'Montag bis Freitag von 9 bis 18 Uhr AEST oder AEDT antworten wir meistens innerhalb einer Stunde. Außerhalb dieser Zeiten am nächsten Morgen. Du kannst erst einmal nur eine Frage stellen, ohne dich zu verpflichten, und wir antworten in deiner eigenen Sprache.',
  },
  {
    question: 'Macht ihr nur Steuererklärungen?',
    answer: 'Nein. Wir übernehmen auch TFN-Anträge, ABN-Registrierungen, die Superauszahlung (DASP) und Medicare-Levy-Befreiungen, also das, was man mit einem 417 oder 462 Visum normalerweise braucht.',
  },
]

const WA_TAX_RETURN = waUrl({ topic: 'tax-return', lang: 'de' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties   = { fontSize: '15px', lineHeight: 1.58 }
const LEDE: CSSProperties   = { fontSize: '16.5px', lineHeight: 1.62 }

export default async function GermanHomePage() {
  const gRating = await getGoogleRating()

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/#webpage`,
    url: `${SITE_URL}/de`,
    name: 'Steuerrückerstattung Australien Working Holiday | WHV Steuererklärung',
    description: 'Steuererklärung Australien für Working Holiday Maker auf 417/462 Visum. Wohnsitz, jeder Arbeitgeber, Medicare-Befreiung und Abzüge, geprüft bevor eingereicht wird.',
    inLanguage: 'de',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  // Only built when gRating.live - see googleData.ts. Never emit a fabricated
  // rating to Google as structured data.
  const serviceLd = gRating.live ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    description: 'Steuererklärungen für Working Holiday Visuminhaber (417/462) in Australien.',
    url: SITE_URL,
    inLanguage: 'de',
      // aggregateRating was removed here (28 Aug). Google has not shown review
      // rich results for self-serving LocalBusiness/Organization ratings since
      // 2019, and this was republishing Google's own aggregate back to Google.
      // The visible GoogleRating pill and GoogleReviews components are
      // untouched: the rating still shows to people, it just stops claiming a
      // rich result that is never granted.
  } : null

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

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    inLanguage: 'de',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${SITE_URL}/de` },
    ],
  }

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService', 'AccountingService'],
    '@id': `${SITE_URL}/#organization`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    telephone: '+61424513998',
    image: `${SITE_URL}/og-image.png`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    description: 'Working-Holiday-Steuer ist das Einzige, was wir machen. Steuererklärungen, TFN, ABN, Super (DASP) und Medicare-Befreiungen für Visumklassen 417 und 462. Wir antworten in deiner eigenen Sprache.',
    foundingDate: '2020',
    knowsLanguage: ['en', 'de', 'ja'],
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: {
      '@type': 'Audience',
      name: 'Working Holiday Visuminhaber in Australien (Subclass 417 und 462)',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Steuerleistungen für Working Holiday Maker',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'TFN-Antrag (Tax File Number)', description: 'Beantragung der Tax File Number für Working Holiday Maker.', url: `${SITE_URL}/de/tfn` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ABN-Registrierung', description: 'Registrierung der Australian Business Number für Selbstständige.', url: `${SITE_URL}/de/abn` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Australische Steuererklärung', description: 'Prüfung von Wohnsitz, Arbeitgebern, Medicare und Abzügen, dann Einreichung beim ATO.', url: `${SITE_URL}/de/tax-return` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'DASP Superannuation-Auszahlung', description: 'Beantragung der Departing Australia Superannuation Payment nach der Abreise.', url: `${SITE_URL}/de/superannuation` } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medicare Levy Exemption', description: 'Beantragung der Medicare-Levy-Befreiung für Working Holiday Maker.', url: `${SITE_URL}/de/medicare` } },
      ],
    },
    knowsAbout: [
      'Australisches Steuerrecht',
      'Steuerlicher Wohnsitz von Working Holiday Makern',
      'Nichtdiskriminierungsartikel in australischen Doppelbesteuerungsabkommen',
      'Working Holiday Visum Subclass 417',
      'Working Holiday Visum Subclass 462',
      'Tax File Number (TFN)',
      'Australian Business Number (ABN)',
      'Superannuation und DASP',
      'Medicare Levy Exemption',
      'PAYG Steuerabzug',
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      {serviceLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 pt-11 pb-11 lg:pt-14 lg:pb-14 text-center">

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '16px' }}>
            Working Holiday Visum 417 &amp; 462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(30px, 5.2vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>Absenden kann jeder.{' '}</span>
            <span style={{ display: 'block', color: '#0B5240' }}>Die Arbeit passiert davor.{' '}</span>
          </h1>

          {/* Hier stand "Fünf Dinge entscheiden über deine Rückerstattung", was
              dem Abschnitt zwei Bildschirme weiter unten widersprach: Der fragt,
              wovon die Höhe der Rückerstattung abhängt, und antwortet "drei
              Dinge". Die Zahl ist nicht der Punkt, und die drei Zahlen sind
              freigegebene Copy, also fällt die Zahl hier weg. */}
          <p className="mx-auto hero-animate-delay"
            style={{ ...LEDE, color: '#4C6459', maxWidth: '72ch', marginBottom: '26px' }}>
            Deine Rückerstattung entscheidet sich, bevor irgendetwas eingereicht wird, und nichts davon passiert automatisch.
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TAX_RETURN} position="hero" topic="tax-return" lang="de"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '340px', width: '100%' }}>
              <IconWhatsApp />
              Schreib uns auf WhatsApp
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              Antwort in etwa einer Stunde.
            </p>
          </div>

          <div className="flex justify-center" style={{ marginTop: '20px' }}>
            <GoogleRating variant="pill" lang="de" />
          </div>
        </div>
      </section>

      {/* ── 2. DER MYGOV-VERGLEICH ───────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Die Frage, die alle stellen</p>

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.7vw, 31px)', lineHeight: 1.2, letterSpacing: '-0.025em', maxWidth: '26ch', marginBottom: '14px' }}>
            {/* Ein Satz, der von selbst umbricht. Die beiden Hälften auf feste
                Zeilen zu zwingen ergab bei 390px vier ausgefranste Zeilen. */}
            <span style={{ color: '#2A3C34', fontWeight: 400 }}>Eine falsche Erklärung geht bei myGov </span>
            <span>genauso durch wie eine richtige.</span>
          </h2>

          <p style={{ ...LEDE, color: '#4C6459', maxWidth: '54ch', marginBottom: '26px' }}>
            Nichts auf dem Bildschirm prüft deinen Wohnsitz, die Levy oder das, was deine Arbeit absetzen darf.
          </p>

          {/* Die beiden Beschriftungen standen auf allen acht Zellen, auf dem
              Handy also achtmal dieselben zwei Wörter untereinander. Das war der
              größte Einzelgrund für das gedrängte Gefühl. Sie stehen jetzt nur
              noch in der ersten Zeile: auf dem Desktop als Spaltenüberschrift,
              auf dem Handy als Legende. Den Rest tragen der Wechsel im
              Hintergrund und das schwerere Gewicht auf der "Mit uns"-Seite.
              Die Copy selbst ist unverändert. */}
          <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
            {COMPARISON.map((row, i) => (
              <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                <div style={{ padding: '13px 16px', background: '#FFFFFF' }}>
                  {i === 0 && <p style={{ ...KICKER, color: '#4C6459', marginBottom: '5px' }}>Auf myGov</p>}
                  <p style={{ ...BODY, color: '#2A3C34' }}>{row.mygov}</p>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                  style={{ padding: '13px 16px', background: '#F2FAF7' }}>
                  {i === 0 && <p style={{ ...KICKER, color: '#0B5240', marginBottom: '5px' }}>Mit uns</p>}
                  <p style={{ ...BODY, color: '#080F0D', fontWeight: 500 }}>{row.us}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-serif" style={{ fontSize: '18.5px', lineHeight: 1.45, color: '#0B5240', marginTop: '26px', maxWidth: '48ch', fontWeight: 700 }}>
            Du wirst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden müssen, welches
            Formular welches ist. Wir regeln das direkt mit dem ATO.
          </p>

          <div style={{ marginTop: '22px' }}>
            <WaLink href={WA_TAX_RETURN} position="section" topic="tax-return" lang="de"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '52px', padding: '0 28px', fontSize: '15px', borderRadius: '100px' }}>
              <IconWhatsApp />
              Schreib uns auf WhatsApp
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '10px' }}>
              Antwort in etwa einer Stunde.
            </p>
          </div>
        </div>
      </section>
      {/* ── 3. DIE DREI ZAHLEN ───────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '22ch', marginBottom: '12px' }}>
            Wovon hängt die Höhe deiner Steuerrückerstattung ab?
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '30px' }}>
            Meistens von drei Dingen.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {FIGURES.map((f) => (
              <div key={f.figure} style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
                <p className="font-serif font-black text-forest-500"
                  style={{ fontSize: '31px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>
                  {f.figure}
                </p>
                <p style={{ ...BODY, color: '#2A3C34' }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. DIE GARANTIE ──────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <p style={{ ...KICKER, color: '#F9D88A', marginBottom: '14px' }}>Unsere Garantie</p>
          <p className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.26, letterSpacing: '-0.02em', maxWidth: '24ch' }}>
            Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also für unseren Service nie drauf.
          </p>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '52ch', marginTop: '16px' }}>
            Das Honorar ist pauschal und niemals ein Prozentsatz von dem, was zurückkommt.
          </p>
        </div>
      </section>

      {/* ── 5. WAS WIR BEI JEDER ERKLÄRUNG DURCHGEHEN ────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-16 bg-white">
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Die Arbeit</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Was wir bei jeder Steuererklärung durchgehen
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '30px' }}>
            Vier der fünf passieren, bevor überhaupt etwas in deine Steuererklärung eingetragen wird.
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {ANALYSIS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-serif font-black flex-shrink-0"
                  style={{ fontSize: '15px', color: '#16775C', width: '28px', paddingTop: '2px' }}
                  aria-hidden="true">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.35, marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ ...BODY, color: '#2A3C34' }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* ── 6. TFN ODER TFN UND ABN ──────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Welches der beiden war dein Jahr?
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '26px' }}>
            Beides landet in derselben Erklärung, aber nicht auf denselben Zeilen. Wähl das, was passt.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white rounded-[14px] flex flex-col"
              style={{ padding: '22px 20px', border: '1px solid #E2EFE9', boxShadow: '0 1px 2px rgba(7,58,45,.06)' }}>
              <h3 className="font-semibold text-ink" style={{ fontSize: '16px', marginBottom: '8px' }}>Nur TFN</h3>
              <p style={{ ...BODY, color: '#2A3C34', marginBottom: '18px', flex: 1 }}>
                Jeder Job lief über eine Lohnabrechnung, und bei jedem Payslip wurde Steuer einbehalten.
              </p>
              <WaLink href={waUrl({ topic: 'tax-return', lang: 'de', tier: 'tfn' })} position="inline" topic="tax-return" lang="de" tier="tfn"
                className="btn-primary inline-flex items-center justify-center gap-2"
                style={{ height: '48px', fontSize: '15px', borderRadius: '100px', width: '100%' }}>
                <IconWhatsApp />
                Das war ich
              </WaLink>
            </div>

            <div className="bg-white rounded-[14px] flex flex-col"
              style={{ padding: '22px 20px', border: '1px solid #E2EFE9', boxShadow: '0 1px 2px rgba(7,58,45,.06)' }}>
              <h3 className="font-semibold text-ink" style={{ fontSize: '16px', marginBottom: '8px' }}>TFN und ABN</h3>
              <p style={{ ...BODY, color: '#2A3C34', marginBottom: '18px', flex: 1 }}>
                Ein Teil deines Einkommens lief über eine ABN, und davon wurde nichts einbehalten.
              </p>
              <WaLink href={waUrl({ topic: 'abn', lang: 'de', tier: 'tfn-abn' })} position="inline" topic="abn" lang="de" tier="tfn-abn"
                className="btn-primary inline-flex items-center justify-center gap-2"
                style={{ height: '48px', fontSize: '15px', borderRadius: '100px', width: '100%' }}>
                <IconWhatsApp />
                Das war ich
              </WaLink>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: '#4C6459', marginTop: '18px' }}>
            Nicht sicher, was auf dich zutrifft?{' '}
            <WaLink href={waUrl({ topic: 'general', lang: 'de', tier: 'unsure' })} position="inline" topic="general" lang="de" tier="unsure"
              className="inline-flex items-center"
              style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline', minHeight: '44px' }}>
              Erzähl uns, wie die Arbeit aussah
            </WaLink>
          </p>
        </div>
      </section>

      {/* ── 7. WOMIT WIR DIR HELFEN ──────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Womit wir dir helfen</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '26px' }}>
            Von der ersten Abrechnung bis zu dem Geld, das dir nach Hause folgt
          </h2>

          {/* Zwei Spalten auf dem Handy. Einspaltig waren das fünf fast gleiche
              Blöcke, gestapelt auf rund tausend Pixel, also fast ein ganzer
              Handybildschirm derselben Sache. Nebeneinander liest sich das wie
              ein Menü zum Überfliegen statt wie eine Liste zum Scrollen. */}
          <div className="services-grid grid grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
            {SERVICES.map((s, i) => (
              <Link key={s.href} href={s.href}
                className={`group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg${
                  i === SERVICES.length - 1 ? ' col-span-2 lg:col-span-1' : ''}`}
                style={{ padding: '15px 14px', minHeight: '44px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <span className="text-muted" style={{ ...KICKER, marginBottom: '10px' }}>{s.n}</span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0"
                  style={{ marginBottom: '10px' }}>{s.icon}</span>
                <h3 className="font-semibold text-ink service-card-title" style={{ fontSize: '15px', marginBottom: '5px' }}>{s.title}</h3>
                <p className="flex-1" style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459', marginBottom: '12px' }}>{s.desc}</p>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3" style={{ fontSize: '13px' }}>
                  Mehr erfahren →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. VERTRAUEN ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink text-center"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Working-Holiday-Steuer ist das Einzige, was wir machen.
          </h2>
          <p className="text-center mx-auto" style={{ ...BODY, color: '#2A3C34', maxWidth: '58ch', marginBottom: '28px' }}>
            Jede Erklärung, die wir vorbereiten, ist für jemanden mit 417- oder 462-Visum und wird von einem registrierten
            Steueragenten geprüft und freigegeben, bevor sie beim ATO eingereicht wird.
          </p>

          <GoogleReviews lang="de" />

          <div className="rounded-[12px] flex gap-3 mx-auto"
            style={{ marginTop: '28px', padding: '16px 18px', background: '#FDF0D5', border: '1px solid #F9D88A', width: 'fit-content', maxWidth: '100%' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
              <path d="M12 2L2 22h20L12 2z" stroke="#B8770C" strokeWidth="1.8" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="15" stroke="#B8770C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="#B8770C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ ...BODY, color: '#2A3C34' }}>
              <strong style={{ color: '#080F0D' }}>Ein registrierter Steuerberater fragt niemals nach deinen myGov-Logindaten.</strong>{' '}
              Wer dich danach fragt, sind nicht wir.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Fragen, die vor der ersten Nachricht kommen
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="de-home-faq" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                {/* An einer Leerzeile getrennt, damit eine lange Antwort als
                    zwei kurze Absätze ankommt statt als ein Block. faqLd oben
                    nutzt weiter den Rohtext, die strukturierten Daten ändern
                    sich also nicht. */}
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} className="contact-faq-answer">{para}</p>
                ))}
              </details>
            ))}
          </div>

          <p style={{ fontSize: '14px', color: '#4C6459', marginTop: '24px' }}>
            Steht deine Frage nicht dabei?{' '}
            <Link href="/de/contact" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>Schreib uns</Link>
          </p>
        </div>
      </section>

      {/* ── 10. RATGEBER ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Ratgeber</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Lieber erst die ganze Antwort lesen?
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '24px' }}>
            Nichts davon wird zurückgehalten, damit du dich melden musst.
          </p>

          <div className="grid gap-3 grid-cols-2">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-[12px] transition-all hover:shadow-lg"
                style={{ padding: '16px 18px', border: '1px solid #E2EFE9', display: 'block' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px' }}>{g.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459' }}>{g.desc}</p>
              </Link>
            ))}
          </div>

          <p style={{ marginTop: '18px' }}>
            <Link href="/de/blog" className="inline-flex items-center"
              style={{ color: '#0B5240', fontWeight: 600, fontSize: '15px', textDecoration: 'underline', minHeight: '44px' }}>
              Alle Ratgeber →
            </Link>
          </p>
        </div>
      </section>

      {/* ── ABSCHLUSS-CTA ────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-12" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <h2 className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.26, letterSpacing: '-0.02em', maxWidth: '22ch', marginBottom: '14px' }}>
            Erzähl uns von deinem Jahr
          </h2>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '50ch', marginBottom: '24px' }}>
            Wo du gearbeitet hast, ungefähr wann, und ob du jemals über eine ABN abgerechnet hast. Das reicht uns, um
            dir zu sagen, wo du stehst.
          </p>
          <WaLink href={WA_TAX_RETURN} position="footer" topic="tax-return" lang="de"
            className="btn-primary inline-flex items-center justify-center gap-2"
            style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '340px', width: '100%' }}>
            <IconWhatsApp />
            Schreib uns auf WhatsApp
          </WaLink>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', marginTop: '12px' }}>
            Antwort in etwa einer Stunde.
          </p>
        </div>
      </section>

      <MobileCta href={WA_TAX_RETURN} lang="de" topic="tax-return" />
    </>
  )
}

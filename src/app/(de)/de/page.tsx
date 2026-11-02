import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { ImageSlot } from '@/components/wht/ImageSlot'
import { Compare, Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'

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
      ...newLocaleLanguages('/'),
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
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax: Steuererklärung in Australien für Working Holiday Maker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steuerrückerstattung Australien | Working Holiday WHV',
    description: 'Steuererklärung in Australien als Working Holiday Maker. Wohnsitz, Medicare, Abzüge und jeder Arbeitgeber, geprüft, bevor eingereicht wird.',
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

// ─── COPY ───────────────────────────────────────────────────────────────

/** Freigegeben 22. Aug. Nicht umschreiben. */
const FIGURES = [
  {
    figure: '45 %',
    body: 'Zum Höchstsatz einbehalten, bevor deine TFN beim Arbeitgeber ankam. Das kommt nur zurück, wenn es jemand geltend macht.',
  },
  {
    figure: '18.200 $',
    body: 'Dein steuerlicher Wohnsitz. Wie dieser Betrag bei dir zählt, hängt von deinem Jahr ab und wird im Einzelfall geprüft.',
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
    body: 'Ein Working-Holiday-Jahr ist chaotisch: mehrere Arbeitgeber, späte Zahlungen, vergessene Jobs. Wir gleichen es mit deinen ATO-Daten ab, nicht mit deinem Gedächtnis.',
  },
  {
    n: '03',
    title: 'Medicare, falls es dich betrifft',
    body: 'Zwei Prozent gehen standardmäßig ab, ob du sie geschuldet hast oder nicht. Zu erkennen, wann sie dir nie zustand, und sie streichen zu lassen, ist unser Job.',
  },
  {
    n: '04',
    title: 'Abzüge für die Arbeit, die du wirklich gemacht hast',
    body: 'Ein Fruit Picker, ein Barista und ein Fahrer setzen nicht dasselbe ab. Wir fragen, woraus deine Arbeit bestand, und machen geltend, was dazugehört.',
  },
  {
    n: '05',
    title: 'Dann wird eingereicht',
    body: 'Von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird. Die vier Schritte davor entscheiden den Betrag.',
  },
]

const COMPARISON = [
  { mygov: 'Welcher Satz für dich gilt, steht dort nicht',     us: 'Wir finden heraus, was für dich tatsächlich stimmt' },
  { mygov: 'Von der Medicare-Befreiung steht dort nichts',      us: 'Wir helfen beim Antrag, wenn du die Bedingungen erfüllst' },
  { mygov: 'Abzüge sind ein leeres Feld',                       us: 'Wir wissen, was deine Art von Arbeit absetzen kann' },
  { mygov: 'Du brauchst ein Konto und eine aktive Handynummer', us: 'Du brauchst kein Konto. Wir regeln das mit dem ATO.' },
]

const SERVICES = [
  { n: '01', href: '/de/tfn',            title: 'TFN beantragen',    desc: 'Vor dem ersten Payslip, ohne Wochen zum Höchstsatz.' },
  { n: '02', href: '/de/abn',            title: 'ABN-Registrierung', desc: 'Rechnungen stellen, steuerliche Folgen vorher geklärt.' },
  { n: '03', href: '/de/tax-return',     title: 'Steuererklärung',   desc: 'Die Analyse oben, dann die Einreichung beim ATO.' },
  { n: '04', href: '/de/superannuation', title: 'Superauszahlung',   desc: 'Alle Fonds gefunden, ein DASP-Antrag zur Abreise.' },
  { n: '05', href: '/de/medicare',       title: 'Medicare Levy',     desc: 'Die Befreiung, wenn dein Jahr die Bedingungen erfüllt.' },
]

const GUIDES = [
  { href: '/de/blog/diy-tax-return-vs-tax-agent-working-holiday', title: 'Selbst machen oder Tax Agent',       desc: 'Was dich beides wirklich kostet.' },
  { href: '/de/blog/tax-residency-working-holiday-makers',        title: 'Bist du steuerlich ansässig?',         desc: 'Die Frage, die auf einer Backpacker-Erklärung das meiste Geld bewegt.' },
  { href: '/de/blog/medicare-levy-working-holiday-makers',        title: 'Die Medicare-Levy-Befreiung',         desc: 'Wer die zwei Prozent schuldet, wer nicht, und wie sie wegfallen.' },
  { href: '/de/blog/tax-deductions-working-holiday-makers',       title: 'Was du absetzen kannst',              desc: 'Abzüge nach Art der Arbeit, statt einer allgemeinen Liste.' },
]

const FAQS = [
  {
    question: 'Wovon hängt ab, wie viel Steuern ich aus Australien zurückbekomme?',
    answer: 'Vier Dinge: dein steuerlicher Wohnsitz für das Jahr, ob ein Teil deines Lohns mit 45 % einbehalten wurde, bevor deine TFN beim Arbeitgeber ankam, ob die 2 % Medicare Levy abgezogen wurden, obwohl du keinen Anspruch auf Medicare hattest, und die Abzüge, die zu deiner Arbeit gehören.\n\nZwei Personen mit demselben Einkommen können deshalb sehr unterschiedliche Rückerstattungen erhalten.',
  },
  {
    question: 'Kann ich meine Steuererklärung einfach selbst über myGov einreichen?',
    answer: 'Kannst du. Das Einreichen ist der einfache Teil. Was dir der Bildschirm nicht sagt: dein steuerlicher Wohnsitz für das Jahr, ob ein Arbeitgeber zum falschen Satz einbehalten hat, ob die Medicare Levy überhaupt hätte abgehen dürfen, und was deine Art von Arbeit absetzen darf. Diese vier Beurteilungen entscheiden den Betrag.',
  },
  {
    question: 'Was kosten eure Leistungen?',
    answer: 'Unsere Gebühren sind pauschal und niemals ein Prozentsatz deiner Rückerstattung.\n\nWir bestätigen die Gebühr per WhatsApp, bevor irgendetwas beginnt, und sie wird im Voraus bezahlt. Danach schicken wir dir den vollständigen Fragebogen und starten die Arbeit. Unsere Garantie: Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr.',
  },
  {
    question: 'Welchen Steuersatz zahlen Working Holiday Maker in Australien?',
    answer: 'Welcher Steuersatz für dich gilt, hängt von den Umständen deines Jahres ab. Das wird im Einzelfall geprüft, und am Ende entscheidet das ATO.\n\nWenn du deinem Arbeitgeber keine TFN gegeben hast, muss er stattdessen zum Höchstsatz einbehalten. Das ist einer der häufigsten Gründe, warum Backpacker am Ende Geld zurückbekommen.',
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
    answer: 'Nein. Wir übernehmen auch TFN-Anträge, ABN-Registrierungen, die Superauszahlung (DASP) und Medicare-Levy-Befreiungen, also das, was man mit einem 417- oder 462-Visum normalerweise braucht.',
  },
]

const WA_TAX_RETURN = waUrl({ topic: 'tax-return', lang: 'de' })

export default async function GermanHomePage() {

  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/#webpage`,
    url: `${SITE_URL}/de`,
    name: 'Steuerrückerstattung Australien Working Holiday | WHV Steuererklärung',
    description: 'Steuererklärung Australien für Working Holiday Maker auf 417/462 Visum. Wohnsitz, jeder Arbeitgeber, Medicare-Befreiung und Abzüge, geprüft, bevor eingereicht wird.',
    inLanguage: 'de',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  // The business is one Organization (@id /#business), declared in the root
  // layout's graph. This block re-declared the same @id as a LocalBusiness,
  // which handed search engines two different types for one entity. It held
  // no data the graph lacks (its rating was removed on 28 Aug), so it is gone.
  const serviceLd = null as Record<string, unknown> | null

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
    '@id': `${SITE_URL}/#business`,
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

      <div className={blocks.underHeader}>
      <Hero
        title={
          <>
            <span className={blocks.kicker}>Steuererklärung Australien&nbsp;&middot; Working Holiday 417 &amp; 462</span>
            Absenden kann jeder. Die Arbeit passiert <Mark>davor.</Mark>
          </>
        }
        media={<ImageSlot id="IMG-W01" className={heroStyles.media} subject="Backpacker on a working holiday in Australia, at work on a farm or in a cafe" alt="Ein Backpacker bei der Arbeit in Australien" tone="a" priority />}
      >
        <Lead>Deine Rückerstattung entscheidet sich, bevor irgendetwas eingereicht wird, und nichts davon passiert automatisch.</Lead>
        <WaButton href={WA_TAX_RETURN} position="hero" topic="tax-return" lang="de">Schreib uns auf WhatsApp</WaButton>
        <p className={heroStyles.note}>Antwort in etwa einer Stunde.</p>
        <GoogleRating variant="pill" lang="de" />
      </Hero>
      </div>

      <Section eyebrow="Die Frage, die alle stellen" title="Eine falsche Erklärung geht bei myGov genauso durch wie eine richtige." titleId="mygov-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Nichts auf dem Bildschirm prüft deinen Wohnsitz, die Levy oder das, was deine Arbeit absetzen darf.
        </p>
        <Compare rows={COMPARISON.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="Auf myGov" rightLabel="Mit uns" />
        <p className={blocks.statement}>
          Du musst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden, welches Formular welches ist. Wir regeln das direkt mit dem ATO.
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA_TAX_RETURN} position="section" topic="tax-return" lang="de" size="md">Schreib uns auf WhatsApp</WaButton>
          <p className={blocks.small}>Antwort in etwa einer Stunde.</p>
        </div>
      </Section>

      <Section tone="pale" width="wide" title="Wovon hängt die Höhe deiner Steuerrückerstattung ab?" titleId="figures-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Meistens von drei Dingen.</p>
        <Figures items={FIGURES} />
      </Section>

      <Section tone="amber" title="Unsere Garantie" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr.
        </p>
        <p className={blocks.text}>Das Honorar ist pauschal und niemals ein Prozentsatz von dem, was zurückkommt.</p>
      </Section>

      <Section id="how-it-works" eyebrow="Die Arbeit" title="Was wir bei jeder Steuererklärung durchgehen" titleId="analysis-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Vier der fünf passieren, bevor überhaupt etwas in deine Steuererklärung eingetragen wird.</p>
        <Steps items={ANALYSIS} />
      </Section>

      <Section tone="pale" title="Welches der beiden war dein Jahr?" titleId="year-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Beides landet in derselben Erklärung, aber nicht auf denselben Zeilen. Wähle aus, was passt.</p>
        <div className={blocks.cards}>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>Nur TFN</h3>
            <p className={blocks.text}>Jeder Job lief über eine Lohnabrechnung, und bei jedem Payslip wurde Steuer einbehalten.</p>
            <WaButton href={waUrl({ topic: 'tax-return', lang: 'de', tier: 'tfn' })} position="inline" topic="tax-return" lang="de" tier="tfn" size="md" fill>Das war ich</WaButton>
          </div>
          <div className={blocks.card}>
            <h3 className={blocks.cardTitle}>TFN und ABN</h3>
            <p className={blocks.text}>Ein Teil deines Einkommens lief über eine ABN, und davon wurde nichts einbehalten.</p>
            <WaButton href={waUrl({ topic: 'abn', lang: 'de', tier: 'tfn-abn' })} position="inline" topic="abn" lang="de" tier="tfn-abn" size="md" fill>Das war ich</WaButton>
          </div>
        </div>
        <p className={blocks.small}>
          Nicht sicher, was auf dich zutrifft?{' '}
          <WaLink href={waUrl({ topic: 'general', lang: 'de', tier: 'unsure' })} position="inline" topic="general" lang="de" tier="unsure" className={blocks.textLink}>
            Erzähl uns, wie die Arbeit aussah
          </WaLink>
        </p>
      </Section>

      <Section eyebrow="Womit wir dir helfen" title="Von der ersten Abrechnung bis zur Auszahlung deiner Super" titleId="services-title">
        <LinkRows items={SERVICES.map(s => ({ href: s.href, eyebrow: s.n, title: s.title, desc: s.desc, cta: 'Mehr erfahren →' }))} />
      </Section>

      <ImageSlot id="IMG-W02" subject="Backpackers on a working holiday, a wide Australian scene (farm, beach town or city street)" alt="Backpacker auf Working Holiday in Australien" tone="b" className={blocks.band} />

      <Section tone="pale" title="Working-Holiday-Steuer ist das Einzige, was wir machen." titleId="trust-title">
        <p className={blocks.text}>
          Jede Erklärung, die wir vorbereiten, ist für jemanden mit 417- oder 462-Visum und wird von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.
        </p>
        <GoogleReviewsServer lang="de" />
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Ein registrierter Tax Agent fragt niemals nach deinen myGov-Logindaten.</strong>{' '}
          Wer dich danach fragt, gehört nicht zu uns.
        </p>
      </Section>

      <Section title="Fragen, die vor der ersten Nachricht kommen" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
        <p className={blocks.small}>
          Steht deine Frage nicht dabei?{' '}
          <Link href="/de/contact" className={blocks.textLink}>Schreib uns</Link>
        </p>
      </Section>

      <Section tone="pale" eyebrow="Ratgeber" title="Lieber erst die ganze Antwort lesen?" titleId="guides-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Nichts davon wird zurückgehalten, damit du dich melden musst.</p>
        <LinkRows items={GUIDES} />
        <p>
          <Link href="/de/blog" className={blocks.textLink}>Alle Ratgeber →</Link>
        </p>
      </Section>

      <Section tone="forest" title="Erzähl uns von deinem Jahr" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Wo du gearbeitet hast, ungefähr wann, und ob du jemals über eine ABN abgerechnet hast. Das reicht uns, um dir zu sagen, wo du stehst.
        </p>
        <WaButton href={WA_TAX_RETURN} position="footer" topic="tax-return" lang="de" tone="light">Schreib uns auf WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Antwort in etwa einer Stunde.</p>
      </Section>

      <MobileCta href={WA_TAX_RETURN} lang="de" topic="tax-return" />
    </>
  )
}

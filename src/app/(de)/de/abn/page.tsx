import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviewsServer } from '@/components/ui/GoogleReviewsServer'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { WaButton } from '@/components/wht/WaButton'
import { LinkButton } from '@/components/wht/Button'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { Compare, Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'

// ─── METADATA ───────────────────────────────────────────────────────────
// Der frühere Titelzusatz behauptete, das Unternehmen sei selbst ein
// registrierter Steuerberater. Das ist entfernt. Kein Preis, und keine
// Formulierung, die die Registrierung für uns beansprucht.
export const metadata: Metadata = {
  // Das Root-Layout hängt " | Working Holiday Tax" an, deshalb ist der Titel
  // hier kurz genug, dass das Ganze in ein mobiles Suchergebnis passt.
  title: 'ABN beantragen: kostenlos, oft sofort',
  description:
    'Mit 417 oder 462 beantragst du die ABN kostenlos beim Australian Business Register, oft sofort. Wann du eine brauchst und was sie an deiner Steuer ändert.',
  keywords: [
    'ABN Registrierung Australien',
    'ABN Working Holiday',
    'ABN beantragen Australien',
    'Australian Business Number Backpacker',
    'Selbstständig Australien Working Holiday',
    'ABN für Freelancer',
    'ABN 417 Visum',
    'ABN 462 Visum',
    'ABN für Steuererklärung Australien',
    'ABN vs TFN Working Holiday',
    'brauche ich eine ABN Working Holiday',
    'Angestellter oder Selbstständiger Australien',
    'ABN Betriebsausgaben Working Holiday',
    'GST Grenze 75000 ABN',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/abn`,
    languages: {
      'en-AU': `${SITE_URL}/abn`,
      de: `${SITE_URL}/de/abn`,
      ja: `${SITE_URL}/ja/abn`,
      ...newLocaleLanguages('/abn'),
      'x-default': `${SITE_URL}/abn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-abn.png`, width: 1200, height: 630, alt: 'ABN für Working Holiday Maker in Australien' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN beantragen bei Work and Travel: was sich ändert',
    description:
      'Eine ABN ändert nicht deinen Job. Sie ändert deine Steuererklärung. Rechnungen ohne Abzug, Betriebsausgaben, GST und die Frage der Selbstständigkeit.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-abn.png`],
    card: 'summary_large_image',
    title: 'ABN beantragen bei Work and Travel: was sich ändert',
    description: 'Eine ABN ändert nicht deinen Job. Sie ändert deine Steuererklärung.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

const THE_SPLIT = [
  {
    n: '01',
    title: 'Es wurde nichts einbehalten, die Steuer bleibt trotzdem offen',
    body: 'Lohn kommt bei dir an, nachdem die Steuer schon abgezogen wurde. Rechnungen nicht, und die Steuer darauf wird einmal am Jahresende fällig. In einem gemischten Jahr kann die Lohnhälfte nach Erstattung aussehen, die Rechnungshälfte nicht.',
  },
  {
    n: '02',
    title: 'Aus Abzügen werden Betriebsausgaben, mit anderen Regeln',
    body: 'Als Angestellter setzt du beruflich veranlasste Kosten ab. Als Selbstständiger ziehst du die Kosten des Betriebs ab, eine breitere Kategorie mit strengeren Nachweisen.',
  },
  {
    n: '03',
    title: 'GST ist eine Entscheidung, keine Formalie',
    body: 'Die meisten Working Holiday Maker erreichen die 75.000-$-Umsatzgrenze nie, also sollten die meisten nicht registriert sein. Rideshare ist die Ausnahme. Eine falsche Position bedeutet BAS-Pflichten, die du nicht gebraucht hättest, oder welche, die fehlen.',
  },
  {
    n: '04',
    title: 'Ob du überhaupt selbstständig warst',
    body: 'Diese Frage entscheidet über die anderen drei. Ob du wirklich selbstständig warst, hängt an der Kontrolle, nicht am Papier. Eine ABN über Arbeit, die immer Anstellung war, ist ein häufiger Grund, warum eine Backpacker-Erklärung neu gemacht werden muss.',
  },
]

const APPLY_STEPS = [
  {
    n: '01',
    title: 'Prüfen, ob es wirklich Selbstständigkeit ist',
    body: 'Bestimmt jemand anderes deinen Dienstplan, wie du arbeitest und stellt das Werkzeug, bist du Angestellter, auch mit ABN. Dann brauchst du keine, sondern nur deine Steuernummer.',
  },
  {
    n: '02',
    title: 'Zuerst die TFN',
    body: 'Der ABN-Antrag wird mit deiner Steuernummer abgeglichen. Hast du noch keine, kommt die TFN zuerst.',
  },
  {
    n: '03',
    title: 'Online beim Australian Business Register beantragen',
    body: 'Du gibst deine Identität, die Rechtsform (als Einzelperson: Sole Trader) und eine Beschreibung deiner Tätigkeit an. Die Registrierung kostet nichts. Meist kommt die ABN sofort, bei einer manuellen Prüfung bis zu 28 Tage später.',
  },
  {
    n: '04',
    title: 'Die ABN auf jede Rechnung schreiben',
    body: 'Fehlt sie bei einer Zahlung über 75 $ ohne GST, muss dein Auftraggeber 47 % einbehalten. Ab der ersten Rechnung gilt außerdem: Steuer wird nicht abgezogen, du legst selbst zurück.',
  },
]

/** Stand November 2026. Quellen: Australian Business Register, business.gov.au, ATO. */
const ABN_FIGURES = [
  { figure: '0 $', body: 'Die ABN-Registrierung beim Australian Business Register ist kostenlos. Quelle: Australian Business Register, business.gov.au.' },
  { figure: 'bis 28 Tage', body: 'Meist kommt die ABN sofort nach dem Online-Antrag. Wird er manuell geprüft, kann es bis zu 28 Tage dauern. Quelle: Australian Business Register.' },
  { figure: '47 %', body: 'So viel muss ein Auftraggeber einbehalten, wenn du bei einer Zahlung über 75 $ ohne GST keine ABN angibst. Quelle: ATO.' },
  { figure: '75.000 $', body: 'Ab diesem Jahresumsatz musst du dich für GST registrieren. Für Rideshare gilt die Pflicht ab der ersten Fahrt. Quelle: ATO.' },
]

/** TFN und ABN nebeneinander. Compare hat keine Zeilenbeschriftung, deshalb steht sie vor jedem Wert. */
const TFN_ABN = [
  { left: 'Wofür: deine Steuernummer als Person, für Lohn aus jeder Anstellung.', right: 'Wofür: die Nummer deines Gewerbes, für Arbeit auf Rechnung.' },
  { left: 'Wer sie braucht: jeder, der in Australien arbeitet.', right: 'Wer sie braucht: nur wer wirklich selbstständig ist.' },
  { left: 'Steuer: Dein Arbeitgeber behält sie vom Lohn ein.', right: 'Steuer: Nichts wird einbehalten, du legst selbst zurück.' },
  { left: 'Ohne Nummer: 45 % Einbehalt vom Lohn.', right: 'Ohne Nummer: 47 % Einbehalt bei Zahlungen über 75 $.' },
]

const WHAT_WE_DO = [
  {
    title: 'Wir prüfen vorher, ob du überhaupt eine brauchst',
    body: 'Viele registrieren eine ABN für einen Job, der immer ein Angestelltenverhältnis war. Das ist ein Gespräch, kein Formular.',
  },
  {
    title: 'Wir bereiten den Antrag passend zu deiner Tätigkeit vor',
    body: 'Die angegebene Tätigkeit begleitet dich durch GST, Abzüge und die Erklärung.',
  },
  {
    title: 'Wir sagen dir, was du zurücklegen solltest',
    body: 'Ungefähr, was dich das Rechnungseinkommen zur Steuerzeit kostet, damit die Rechnung im Oktober keine Überraschung ist.',
  },
  {
    title: 'Wir sagen dir, was du aufheben musst',
    body: 'Welche Nachweise für deine Art von Arbeit einen Abzug tragen, und welche Belege du nicht mehr sammeln musst.',
  },
  {
    title: 'Wir treffen die GST-Entscheidung bewusst',
    body: 'Registriert, weil die Regeln es verlangen, oder nicht registriert, weil sie es nicht tun. Nie aus Versehen.',
  },
  {
    title: 'Wir bringen beide Hälften in eine Erklärung',
    body: 'Lohneinkommen und Rechnungseinkommen gehören in eine Erklärung für dasselbe Jahr.',
  },
]

// Antworten über etwa 55 Wörtern tragen eine Leerzeile, und die FAQ unten
// rendert einen <p> pro Absatz. faqLd nutzt weiter den Rohtext, das Schema
// bleibt also unverändert.
const FAQS = [
  {
    question: 'Kann ich mit dem Working Holiday Visum eine ABN beantragen?',
    answer:
      'Ja. Mit einem 417- oder 462-Visum kannst du eine ABN beim Australian Business Register beantragen, wenn du wirklich selbstständig arbeitest, also auf Rechnung, mit eigenem Werkzeug und eigener Einteilung. Du brauchst zuerst eine TFN. Für einen normalen Schichtjob als Angestellter brauchst du keine ABN.',
  },
  {
    question: 'Was kostet eine ABN und wie lange dauert der Antrag?',
    answer:
      'Nichts. Die Registrierung beim Australian Business Register ist kostenlos. Wenn alle Angaben passen, bekommst du die ABN meist sofort nach dem Online-Antrag. Muss der Antrag manuell geprüft werden, etwa weil Angaben fehlen oder nicht abgeglichen werden können, dauert es bis zu 28 Tage.',
  },
  {
    question: 'Mein Arbeitgeber verlangt eine ABN für einen normalen Schichtjob. Ist das korrekt?',
    answer:
      'Meistens nicht, und es lohnt sich, das vor der Registrierung anzusprechen. Wenn er deinen Dienstplan macht, dir sagt, wie die Arbeit abläuft, das Werkzeug stellt und dich früher nach Hause schicken kann, wirst du wie ein Angestellter behandelt, egal was auf dem Papier steht.\n\nEine ABN verschiebt die Kosten auf dich: kein Steuerabzug, keine Superannuation, kein Unfallversicherungsschutz, kein Mindestlohn und keine Zuschläge. Schick uns die Jobdetails, bevor du etwas zusagst.',
  },
  {
    question: 'Kann ich sowohl eine TFN als auch eine ABN haben?',
    answer:
      'Ja, und die meisten Working Holiday Maker, die selbstständig arbeiten, haben am Ende beides. Die Steuernummer deckt dich als Angestellten ab, die ABN als Selbstständigen.\n\nEs sind aber nicht zwei Erklärungen: Eine Erklärung deckt das Steuerjahr ab und meldet beides. Die Steuernummer brauchst du zuerst, weil der ABN-Antrag damit abgeglichen wird.',
  },
  {
    question: 'Was passiert, wenn ich auf meiner Rechnung keine ABN angebe?',
    answer:
      'Dann muss dein Auftraggeber bei Zahlungen über 75 $ ohne GST 47 % einbehalten und ans ATO abführen. Eine ABN auf jeder Rechnung verhindert das.',
  },
  {
    question: 'Muss ich mich mit einem Working-Holiday-Visum für GST registrieren?',
    answer:
      'Nur wenn dein Umsatz 75.000 $ im Jahr erreicht, was die meisten Working Holiday Maker nicht annähernd tun, oder wenn du Rideshare fährst. Wer Taxi- oder Fahrdienstleistungen anbietet, Uber eingeschlossen, muss sich ab der ersten Fahrt für GST registrieren, egal wie wenig dabei verdient wird.\n\nFür Essenslieferungen und Kurierfahrten gilt diese Regel nicht, dort greift die Grenze von 75.000 $. Mit der Registrierung kommen vierteljährliche Business Activity Statements.',
  },
  {
    question: 'Wie verändert eine ABN meine Steuererklärung?',
    answer:
      'Lohn erreicht dich mit bereits einbehaltener Steuer und einem Income Statement, das dein Arbeitgeber ans ATO meldet, deshalb gleicht sich diese Hälfte weitgehend von selbst ab.\n\nEinkommen, das du über eine ABN in Rechnung stellst, kommt unversteuert an, wird als Betriebseinnahme erklärt und nur um Kosten gemindert, die du belegen kannst. Dazu kommen die GST-Frage und die Frage, ob das wirklich Selbstständigkeit war. Beide Hälften landen in einer Erklärung.',
  },
  {
    question: 'Was kann ich mit einer ABN als Betriebsausgabe absetzen?',
    answer:
      'Die Kosten der Einkommenserzielung, ehrlich aufgeteilt, wenn etwas auch privat genutzt wird.\n\nBei einem Lieferfahrer sind das meist ordentlich erfasste Kilometer, die laufenden Kosten für Rad oder Auto, Handy und Daten, Versicherung, Ausrüstung und die Provision, die eine Plattform einbehalten hat. Bei einem Subunternehmer auf dem Bau sind es Werkzeug, Schutzausrüstung und Fahrten zwischen Einsatzorten.\n\nNie dazu gehören der Flug nach Australien, der normale Weg von zu Hause zu einem Arbeitsort und alles, wofür du keinen Nachweis hast.',
  },
  {
    question: 'Kann ich das einfach selbst machen?',
    answer:
      'Kannst du, und wenn dein ganzes Jahr über die Lohnabrechnung lief, ist es unkompliziert.\n\nGenau das ändert eine ABN: wo die Grenze zwischen Lohn und Rechnungseinkommen verläuft, ob du überhaupt selbstständig warst, welche Kosten vom Rechnungseinkommen abgehen, und ob du dich für GST registrieren musstest. Das sind Beurteilungen zu deinem Jahr, keine Felder zum Ausfüllen.',
  },
  {
    question: 'Was passiert mit meiner ABN, wenn ich Australien verlasse?',
    answer:
      'Du kündigst sie, wenn du nicht mehr tätig bist, denn eine aktive ABN sagt dem ATO, dass du weiter ein Gewerbe betreibst. Kündige aber erst, wenn alles erledigt ist: offene Activity Statements eingereicht und Steuerschulden bezahlt. Das geht online beim Australian Business Register.\n\nDie Abmeldung ändert nichts an der Erklärung für das Jahr, in dem du gearbeitet hast, die trotzdem eingereicht werden muss, und nichts an deinem Anspruch auf Superannuation aus Anstellungen im selben Zeitraum. Steht dein Abflug bald an, sag früh Bescheid, denn die Reihenfolge aus Abmelden, Einreichen und Super beantragen ist wichtig.',
  },
]

const GUIDES = [
  {
    href: '/de/blog/employee-vs-contractor-australia',
    title: 'Angestellter oder Selbstständiger',
    desc: 'Der Test, den das ATO wirklich anlegt, und was die falsche Seite kostet.',
  },
  {
    href: '/de/blog/how-to-register-for-an-abn',
    title: 'ABN registrieren, und wann besser nicht',
    desc: 'Wer eine ABN bekommt, warum Sham Contracting das Risiko ist, und die 47-%-Regel.',
  },
  {
    href: '/de/blog/what-is-a-tax-invoice',
    title: 'Tax Invoice mit ABN',
    desc: 'Was auf jeder Rechnung stehen muss, damit nichts einbehalten wird.',
  },
  {
    href: '/de/blog/abn-deductions-business-expenses',
    title: 'Betriebsausgaben mit ABN',
    desc: 'Was ein Selbstständiger absetzen kann, nach Art der Arbeit, samt Nachweisen.',
  },
  {
    href: '/de/blog/gst-and-abn-for-working-holiday-makers',
    title: 'GST und deine ABN',
    desc: 'Die 75.000-$-Grenze, die Rideshare-Ausnahme und was die Registrierung bedeutet.',
  },
  {
    href: '/de/blog/how-to-cancel-your-abn',
    title: 'ABN kündigen vor dem Rückflug',
    desc: 'Wann du kündigst, was vorher erledigt sein muss und was trotzdem fällig bleibt.',
  },
]

// Die myGov-Vergleichstabelle, die hier stand, ist entfernt: Ihre vier Zeilen
// waren noch einmal die vier Punkte von THE_SPLIT und von WHAT_WE_DO, und die
// Zeile zur Selbstständigkeit hat einen eigenen Abschnitt. Das "Du wirst dich
// nie bei myGov einloggen"-Versprechen ist ans Ende von WHAT_WE_DO gerückt.

const WA_ABN = waUrl({ topic: 'abn', lang: 'de' })

export default function ABNPageDE() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/abn#webpage`,
    url: `${SITE_URL}/de/abn`,
    name: 'ABN beantragen mit Working Holiday Visum',
    description:
      'Wie Working Holiday Maker mit 417- oder 462-Visum eine ABN beantragen, was sie kostet, wie lange es dauert und was sie an der australischen Steuererklärung ändert: unversteuertes Rechnungseinkommen, Betriebsausgaben, GST und Angestellter oder Selbstständiger.',
    dateModified: '2026-11-05',
    inLanguage: 'de',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede', '.what-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/de/abn#service`,
    name: 'ABN-Registrierung für Working Holiday Maker',
    serviceType: 'Australian Business Number Registrierung',
    description:
      'ABN-Registrierung für Inhaber von 417- und 462-Visa mit echter selbstständiger Tätigkeit, inklusive GST-Entscheidung, Nachweisen und steuerlichen Folgen vor der Registrierung.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australien' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 und 462) als Selbstständige' },
    availableLanguage: ['de', 'en', 'ja', 'fr', 'it', 'es'],
    inLanguage: 'de',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'de',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
      { '@type': 'ListItem', position: 2, name: 'ABN', item: `${SITE_URL}/de/abn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      {/* SEO (Oct 2026): the kicker sits inside the H1 so the heading carries the query words people type. */}
      <div className={blocks.underHeader}>
        <Crumbs homeHref="/de" home="Startseite" current="ABN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>ABN beantragen mit Working Holiday Visum&nbsp;&middot; 417 &amp; 462</span>
            Eine ABN ändert nicht deinen Job.<br />
            Sie ändert <Mark>deine Steuererklärung.</Mark>
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Ja, mit einem 417- oder 462-Visum kannst du eine ABN beantragen, kostenlos beim Australian Business Register,
            wenn du wirklich selbstständig arbeitest und nicht als Angestellter. Meist bekommst du die Nummer sofort, muss der
            Antrag geprüft werden, dauert es bis zu 28 Tage. Was sie ändert: unversteuertes Einkommen, Betriebsausgaben, eine
            GST-Entscheidung, und darunter die Frage, ob du überhaupt selbstständig warst.
            </Lead>
          </div>
          <WaButton href={WA_ABN} position="hero" topic="abn" lang="de">Schreib uns auf WhatsApp</WaButton>
          <p className={heroStyles.note}>Antwort in etwa einer Stunde.</p>
          <GoogleRating variant="pill" lang="de" />
        </Hero>
        <PhotoBand page="abn" locale="de" />
      </div>

      <Section eyebrow="Der Antrag" title="ABN beantragen mit Working Holiday Visum: so läuft es ab" titleId="apply-title">
        <p className={`${blocks.text} what-lede`}>
          Der Antrag selbst ist kostenlos und online in wenigen Minuten erledigt. Entscheidend ist, was davor geklärt sein
            muss und was danach auf jeder Rechnung steht.
        </p>
        <Steps items={APPLY_STEPS} />
        <p className={blocks.text}>
          Noch keine Steuernummer? <Link href="/de/tfn" className={tb.inlineLink}>So beantragst du die TFN</Link>.
            Unsicher bei Schritt 1? Lies{' '}
            <Link href="/de/blog/employee-vs-contractor-australia" className={tb.inlineLink}>Angestellter oder Selbstständiger</Link>{' '}
            oder schick uns den Job, wir sagen dir vorher, ob eine ABN passt. Den Antrag bereiten wir auf Wunsch mit dir vor.
        </p>
        <WaButton href={WA_ABN} position="section" topic="abn" lang="de">Job auf WhatsApp prüfen lassen</WaButton>
      </Section>

      <Section tone="pale" eyebrow="Die Zahlen" title="ABN in Zahlen, Stand November 2026" titleId="figures-title">
        <Figures items={ABN_FIGURES} />
      </Section>

      <Section eyebrow="Die Aufteilung" title="Was ändert sich mit einer ABN an deiner Erklärung?" titleId="split-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Vier Dinge, und sie verstärken sich gegenseitig.
        </p>
        <Steps items={THE_SPLIT} />
      </Section>

      <Section tone="pale" title="Solltest du eine ABN anmelden, weil ein Arbeitgeber danach fragt?" titleId="warn-title">
        <p className={blocks.text}>
          
            Nicht, bevor jemand den Job angesehen hat. Eine ABN über Arbeit, die in Wahrheit Anstellung ist, kostet
            dich Superannuation und Steuerabzug, streicht den Unfallversicherungsschutz und schließt dich von
            Mindestlohn und Zuschlägen aus. All das geht auf deine Kosten. Das kommt häufig in der Farmarbeit, der
            Gastronomie, der Reinigung und auf dem Bau vor.
          
        </p>
        <p className={blocks.text}>
          
            Entscheidend ist die Kontrolle, nicht das Papier. Wer bestimmt, wann du arbeitest, wer sagt, wie es gemacht
            wird, wer die Ausrüstung stellt, und wer das Risiko trägt, wenn es schiefgeht. Zeigen die Antworten auf den Arbeitgeber,
            ist eine ABN das falsche Mittel.
          
        </p>
        <p className={`${blocks.text} ${blocks.notice}`}>
          <strong>Schick uns den Job, bevor du dich registrierst.</strong>{' '}
          Was die Arbeit umfasst, wer was stellt, und wie du bezahlt werden sollst. Wir sagen dir, ob es Anstellung oder Selbstständigkeit ist.
        </p>
      </Section>

      <Section eyebrow="Der Unterschied" title="TFN oder ABN: was ist der Unterschied?" titleId="compare-title">
        <p className={blocks.text}>
          Die TFN ist deine persönliche Steuernummer und brauchst du für jeden Job. Die ABN ist die Nummer deines Gewerbes und
            brauchst du nur, wenn du auf Rechnung arbeitest. Die meisten Working Holiday Maker brauchen nur die TFN.
        </p>
        <Compare rows={TFN_ABN} leftLabel="TFN" rightLabel="ABN" />
        <p className={blocks.text}>
          Hast du beides, meldest du Lohn und Rechnungen in einer Erklärung für das Jahr. Mehr dazu in{' '}
            <Link href="/de/blog/tfn-vs-abn-difference" className={tb.inlineLink}>TFN oder ABN: welche brauchst du?</Link> und, falls du
            beides hast,{' '}
            <Link href="/de/blog/can-you-have-tfn-and-abn" className={tb.inlineLink}>TFN und ABN gleichzeitig</Link>. Was mit deiner
            Super passiert, wenn du ausreist, steht auf{' '}
            <Link href="/de/superannuation" className={tb.inlineLink}>Super zurückholen</Link>.
        </p>
      </Section>

      <Section eyebrow="Die Arbeit" title="Was wir dabei machen" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Die Registrierung selbst ist kostenlos und dauert Minuten. Alles, was darüber entscheidet, was sie dich
            kostet, passiert davor und danach.
        </p>
        <div className={tb.pairs}>
          {WHAT_WE_DO.map(c => (
            <div key={c.title} className={blocks.palePanel}>
              <h3 className={blocks.cardTitle}>{c.title}</h3>
              <p className={blocks.text}>{c.body}</p>
            </div>
          ))}
        </div>
        <p className={blocks.statement}>
          Du musst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden, welches
            Formular welches ist. Wir regeln das direkt mit dem ATO. Deine Steuererklärung wird von einem registrierten
            australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.
        </p>
        <p className={blocks.text}>
          Noch keine ABN und auch keine Steuernummer? Die{' '}
            <Link href="/de/tfn" className={tb.inlineLink}>TFN kommt zuerst</Link>, weil der
            ABN-Antrag damit abgeglichen wird.
        </p>
      </Section>

      {/* The one amber band: the guarantee. */}
      <Section tone="amber" title="Unsere Gebühr" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Die Gebühr für eine Steuererklärung mit ABN-Einkommen beträgt pauschal 385 $, inklusive GST. Unsere Rückerstattungsgarantie gilt nur für Steuererklärungen mit TFN-Einkommen.
        </p>
        <p className={blocks.text}>Das Honorar ist pauschal und niemals ein Prozentsatz von dem, was zurückkommt.</p>
      </Section>

      <Section tone="pale" title="Working-Holiday-Steuer ist das Einzige, was wir machen." titleId="trust-title">
        <p className={blocks.text}>
          Deshalb sehen wir dieselben ABN-Konstruktionen immer wieder: der Farmvertrag, die Lieferplattform, die
            Baustelle, die alle als Subunternehmer bezahlt.
        </p>
        <GoogleReviewsServer lang="de" />
      </Section>

      <Section title="Fragen zur ABN, bevor du schreibst" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
        <p className={blocks.text}>Deine Frage ist nicht dabei? Schick uns kurz, was du machst und wer dich bezahlt, wir antworten auf Deutsch.</p>
        <WaButton href={WA_ABN} position="section" topic="abn" lang="de">Frage auf WhatsApp stellen</WaButton>
      </Section>

      <Section tone="pale" eyebrow="Ratgeber" title="Mehr zur ABN: Antrag, Rechnungen, Abzüge und Abmeldung" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      <Section eyebrow="Was kommt als Nächstes" title="Beide Hälften landen in einer Erklärung" titleId="next-title">
        <p className={blocks.text}>Lohneinkommen und Rechnungseinkommen gehören in dieselbe Steuererklärung für dasselbe Jahr.</p>
        <p className={blocks.text}>
          Noch keine Steuernummer?{' '}
            <Link href="/de/tfn" className={tb.inlineLink}>Den TFN-Antrag bereiten wir zuerst mit dir vor</Link>. Reist du bald aus, hol
            dir deine <Link href="/de/superannuation" className={tb.inlineLink}>Superannuation aus Anstellungen</Link> zurück, die
            ABN-Rechnungen ändern daran nichts.
        </p>
        <div className={blocks.stack}>
          <LinkButton href="/de/tax-return" size="md">Wie die Erklärung läuft →</LinkButton>
        </div>
      </Section>

      {/* Closing CTA, forest band. */}
      <Section tone="forest" title="Beschreib uns die Arbeit" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Wem du Rechnungen schreiben würdest, was du dabei machst, und wer die Ausrüstung stellt. Das reicht uns für
            eine erste Einschätzung, ob eine ABN hier überhaupt sinnvoll ist.
        </p>
        <WaButton href={waUrl({ topic: 'abn', lang: 'de', tier: 'tfn-abn' })} position="section" topic="abn" lang="de" tier="tfn-abn" tone="light">Schreib uns auf WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Antwort in etwa einer Stunde.</p>
      </Section>

      <MobileCta href={WA_ABN} lang="de" topic="abn" />
    </>
  )
}

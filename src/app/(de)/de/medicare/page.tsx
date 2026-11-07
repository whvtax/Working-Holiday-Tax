import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaButton } from '@/components/wht/WaButton'
import { Section } from '@/components/wht/Section'
import { Hero, heroStyles } from '@/components/wht/Hero'
import { Lead, Mark } from '@/components/wht/Type'
import { LinkButton } from '@/components/wht/Button'
import { Compare, blocks } from '@/components/wht/Blocks'
import { Crumb, PhotoFrame, TitleLinks, coreBlocks } from '@/components/wht/CoreBlocks'

/*
 * German mirror of the tightened Medicare page. What it owns is the exemption
 * certificate: the levy comes off by default, an agreement country removes the
 * entitlement to claim it back, and the exemption needs a statement almost
 * nobody applies for. Germany has no agreement, which is the whole point here.
 */

const WA = waUrl({ topic: 'medicare', lang: 'de' })

export const metadata: Metadata = {
  title: 'Medicare-Levy-Befreiung: 417 und 462',
  description:
    'Die 2 % Medicare Levy wird standardmäßig angesetzt, ist aber nicht immer geschuldet. Ob eine Befreiung bei dir infrage kommt, prüfen wir im Einzelfall.',
  keywords: [
    'Medicare Levy Befreiung',
    'Medicare Levy Befreiung Working Holiday',
    'Medicare Levy Befreiung Backpacker',
    'Medicare Levy Befreiung Deutschland',
    'Medicare Levy Befreiungszertifikat',
    'Medicare Entitlement Statement Deutsch',
    'muss ich Medicare Levy zahlen Working Holiday',
    'Medicare 417 Visum',
    'Medicare 462 Visum',
    'Gesundheitsabkommen Deutschland Australien Medicare',
    'RHCA Australien Deutsch',
    'Medicare Levy zurückbekommen',
  ],
  alternates: { canonical: '/de/medicare', languages: { 'en': '/medicare', 'en-AU': '/medicare', 'de': '/de/medicare', 'ja': '/ja/medicare', ...newLocaleLanguages('/medicare'), 'x-default': '/medicare' } },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-medicare.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'Medicare-Levy-Befreiung für 417- und 462-Visum',
    description: 'Die 2 % werden standardmäßig angesetzt. Ob eine Befreiung für dich infrage kommt, wird im Einzelfall geprüft.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-medicare.png`],
    card: 'summary_large_image',
    title: 'Medicare-Levy-Befreiung für Working Holiday Maker',
    description: 'Die 2 % werden standardmäßig angesetzt. Ob eine Befreiung für dich infrage kommt, wird im Einzelfall geprüft.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

/**
 * Der Einwand, mit dem jeder Lead ankommt, hier konkret zur Levy.
 *
 * Keine Kopie der Startseiten Tabelle. Jede Zeile handelt von diesen 2 %: Sie
 * werden automatisch angesetzt, entschieden wird das über den Pass und nicht
 * über das Visum, und weg geht sie nur mit einer Bescheinigung, die woanders
 * beantragt wird. Keine Zeile kritisiert myGov. Das Einreichen ist nicht das
 * Problem.
 */
const MYGOV = [
  {
    mygov: 'Die Levy kommt bei der Veranlagung dazu, das erste Anzeichen ist also eine Rückerstattung, die kleiner ausfällt.',
    us: 'Wir klären das, bevor die Erklärung rausgeht, und nicht erst, wenn der Notice of Assessment da ist.',
  },
  {
    mygov: 'Nirgends steht, dass diese Frage am Einzelfall hängt und nicht allein am Visum.',
    us: 'Ob und für welche Tage du Anspruch auf Medicare hattest, prüfen wir im Einzelfall, und das ist die erste Frage, die wir stellen.',
  },
  {
    mygov: 'Weg geht die Levy nur mit dem passenden Nachweis, und der kommt nicht aus der Erklärung selbst.',
    us: 'Wir kümmern uns um den Nachweis, warten ihn ab und sorgen dafür, dass die Befreiung im richtigen Jahr ankommt.',
  },
  {
    mygov: 'Das Feld für die Befreiung ist da, ob du die Bescheinigung hast oder nicht.',
    us: 'Wir beantragen sie nur mit dem Nachweis dahinter, denn darauf stützt sich die Angabe, wenn jemand nachfragt.',
  },
]

const faqs = [
  {
    question: 'Wie viel ist die Medicare-Levy-Befreiung wert?',
    answer:
      'Die Levy beträgt 2 % des zu versteuernden Einkommens, also rund 800 $ bei 40.000 $ Verdienst und rund 1.000 $ bei 50.000 $. Abgerechnet wird sie bei der Veranlagung deiner Erklärung und nicht Woche für Woche vom Lohn abgezogen. Die Befreiung gehört deshalb in die Erklärung.',
  },
  {
    question: 'Bekommt jeder mit einem 417- oder 462-Visum die Befreiung?',
    answer:
      'Nicht automatisch. Es hängt vom Einzelfall ab, nicht allein vom Visum. Ein Anspruch auf Medicare, etwa über ein Gesundheitsabkommen, kann die Befreiung ausschließen. Ob das bei dir eine Rolle spielt, prüfen wir als Teil deiner Erklärung, und am Ende entscheidet das ATO.',
  },
  {
    question: 'Was ist ein Medicare Entitlement Statement, und brauche ich eines?',
    answer:
      'Das Medicare Entitlement Statement ist ein Dokument von Services Australia, das bestätigt, dass du für einen bestimmten Zeitraum keinen Anspruch auf Medicare hattest. Es ist der Nachweis hinter der Befreiung, und das ATO kann es sehen wollen, deshalb erledigen wir es als Teil deiner Erklärung.',
  },
  {
    question: 'Wie beantragt man das Medicare Entitlement Statement?',
    answer:
      'Bei Services Australia, online oder mit dem Formular Application for a Medicare Entitlement Statement (MS015). Du brauchst eine Kopie der Passseite mit Name und Foto, manchmal auch dein Visum oder einen Nachweis deiner Krankenversicherung. Beantragen kannst du es ab dem 1. Juli, jeweils für das abgelaufene Steuerjahr.\n\nDie Bearbeitung braucht Zeit, deshalb gehört das Statement bei uns an den Anfang, damit die Erklärung nicht darauf warten muss.',
  },
  {
    question: 'Kann die Befreiung auch nur für einen Teil des Jahres gelten?',
    answer:
      'Ja, und für viele Working Holiday Maker ist genau das die richtige Antwort. Gerechnet wird in Tagen. Bist du also im November angekommen, sind nur die Tage befreit, an denen du keinen Anspruch auf Medicare hattest.\n\nEin volles Jahr zu beantragen, wenn nur ein Teil zutrifft, ist der Fehler, der später zu einer Korrektur der Erklärung führt.',
  },
  {
    question: 'Ändern Reiseversicherung oder private Krankenversicherung etwas daran?',
    answer:
      'Nein. Bei der Levy geht es um den Anspruch auf das öffentliche System, nicht darum, ob du versichert bist, deshalb haben Reiseversicherung und private Krankenversicherung darauf keinen Einfluss.\n\nPrivate Krankenhausversicherung zählt nur für eine andere Abgabe, den Medicare Levy Surcharge, der erst bei hohen Einkommen greift und auf einem Working Holiday selten relevant ist.',
  },
  {
    question: 'Was ist, wenn die Levy im Laufe des Jahres schon abgezogen wurde?',
    answer:
      'Die Levy wird bei der Veranlagung berechnet, nicht bei der Lohnzahlung. Was während des Jahres abgezogen wurde, war also allgemein einbehaltene Steuer und nicht die Levy. Eine berechtigte Befreiung nimmt sie aus der Veranlagung heraus.\n\nWurde ein früheres Jahr ohne Befreiung eingereicht, obwohl sie dir zustand, lässt sich diese Erklärung meist korrigieren.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Medicare', item: `${SITE_URL}/de/medicare` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/de/medicare#service`,
  name: 'Medicare-Levy-Befreiung für Working Holiday Maker',
  serviceType: 'Medicare Levy Exemption',
  description:
    'Die Medicare-Levy-Befreiung als Teil der australischen Steuererklärung, inklusive Medicare Entitlement Statement, für Inhaber von 417- und 462-Visa ohne Anspruch auf Medicare.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 / 462) ohne Anspruch auf Medicare' },
  inLanguage: 'de',
  url: `${SITE_URL}/de/medicare`,
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/medicare#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/medicare`,
}

const GUIDES = [
  { href: '/de/blog/medicare-levy-working-holiday-makers', label: 'Die Medicare-Levy-Befreiung für Working Holiday Maker' },
  { href: '/de/blog/countries-with-medicare-agreement-australia', label: 'Welche Länder ein Abkommen mit Australien haben' },
  { href: '/de/blog/what-is-medicare-working-holiday-makers', label: 'Was Medicare ist und wer wirklich abgedeckt ist' },
  { href: '/de/blog/private-health-insurance-working-holiday-australia', label: 'Ändert eine private Krankenversicherung die Levy?' },
  { href: '/de/blog/emergency-medical-care-working-holiday-no-medicare', label: 'Notfallbehandlung in Australien ohne Medicare' },
  { href: '/de/blog/uk-medicare-reciprocal-agreement-australia', label: 'Das britische Abkommen und was es für deine Erklärung heißt' },
]

export default function GermanMedicarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <div className={blocks.underHeader}>
        <Crumb home="Startseite" current="Medicare" label="Brotkrümelnavigation" />
        <Hero
          eyebrow="Medicare Levy"
          title={<>Eine Abgabe von 2 %, die vielleicht <Mark>nie deine</Mark> war</>}
        >
          <div className="hero-sub">
            <Lead>
              Ob sie bei dir anfällt, hängt vom Einzelfall ab. Wegfallen kann sie mit einer Bescheinigung,
              die kaum jemand beantragt.
            </Lead>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="medicare" lang="de">Lass deinen Fall prüfen</WaButton>
            <a href="#who-is-exempt" className={coreBlocks.hint}>Wer befreit ist</a>
          </div>
          <p className={heroStyles.note}>Antwort in etwa einer Stunde.</p>
        </Hero>
      </div>

      <PhotoFrame page="medicare" locale="de" />

      {/* ── DER EINWAND, KONKRET ZUR LEVY ──────────────────────────────────── */}
      <Section
        eyebrow="Selbst machen"
        title={<>Ob die Levy je deine war, fragt niemand. myGov zieht sie ab und <Mark>ist fertig.</Mark></>}
        titleId="objection-title"
      >
        <p className={`${blocks.text} ${blocks.muted}`}>
          Sie beträgt 2 % des zu versteuernden Einkommens, rund 800 $ bei 40.000 $ im Jahr. Auf keinem
          Payslip taucht sie auf.
        </p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="Auf myGov" rightLabel="Mit uns" />
        <p className={blocks.statement}>
          Du musst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden, welches
          Formular welches ist. Wir regeln das direkt mit dem ATO.
        </p>
      </Section>

      {/* ── WAS ALLEIN SCHIEFGEHT ──────────────────────────────────────────── */}
      <Section tone="pale" title="Warum steht die Levy überhaupt auf deiner Veranlagung?" titleId="why-title">
        <p className={blocks.text}>
          Weil sie der Standard ist. Sie bleibt drin, solange keine Befreiung beantragt wird, und
          nichts fragt, ob du Anspruch auf Medicare hattest. Je nach Fall können das 2 % eines
          Jahreseinkommens sein, gezahlt für ein System, auf das du vielleicht keinen Anspruch hattest.
        </p>
        <p className={blocks.text}>
          Der leisere Fehler ist der umgekehrte: die Befreiung angekreuzt, ohne den Nachweis dahinter.
          Dieser Nachweis ist ein Medicare Entitlement Statement von Services Australia, einer anderen
          Behörde als dem ATO, und eine Angabe ohne ihn lässt sich nicht belegen, wenn jemand nachfragt.
        </p>
      </Section>

      {/* ── DER ENTSCHEIDENDE PUNKT ────────────────────────────────────────── */}
      <Section id="who-is-exempt" title="Wer ist von der Medicare Levy befreit?" titleId="exempt-title">
        <p className={blocks.text}>
          Entscheidend ist, ob du Anspruch auf Medicare hattest, und das hängt von deinen
          individuellen Umständen ab. Es wird Tag für Tag betrachtet und nicht als ein einziges Ja
          oder Nein für das Jahr.
        </p>
        <p className={blocks.text}>
          Ein Gesundheitsabkommen (Reciprocal Health Care Agreement) hat Australien unter anderem mit
          Großbritannien, Irland, Italien, den Niederlanden, Belgien, Finnland, Norwegen, Schweden, Malta,
          Slowenien und Neuseeland, bei Italien und Malta mit eingeschränkter Deckung. Wer aus diesen
          Ländern kommt, hat in der Regel Zugang zu Medicare und deshalb in der Regel keine Befreiung.
          Deutschland, Österreich und die Schweiz stehen nicht auf dieser Liste.
        </p>
        <p className={blocks.text}>
          Ob und für welche Tage eine Befreiung für dich infrage kommt, ist nichts, was du einfach
          annehmen oder selbst ausrechnen solltest. Wir prüfen es im Einzelfall, und am Ende
          entscheidet das ATO.
        </p>
      </Section>

      {/* ── WAS WIR TUN (the one key promise, amber band) ──────────────────── */}
      <Section tone="amber" title="Was machen wir damit?" titleId="do-title">
        <p className={blocks.text}>Wir klären, ob und für welchen Teil des Jahres du Anspruch auf Medicare hattest.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Unsere Garantie: Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr. Die Garantie gilt nur für Steuererklärungen mit TFN-Einkommen.
        </p>
        <p className={blocks.text}>Deine Erklärung wird von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.</p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="medicare" lang="de" size="md">Schreib uns auf WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Antwort in etwa einer Stunde.</p>
        </div>
      </Section>

      {/* ── VIDEO ──────────────────────────────────────────────────────────── */}
      <Section tone="pale" title="Die Befreiung in zwei Minuten" titleId="video-title">
        <div className={coreBlocks.video}>
          <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
            <iframe loading="lazy"
              src="https://www.youtube-nocookie.com/embed/oj7ZSOHAxJk"
              title="Medicare Levy Befreiung erklärt"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
          <div className="hidden sm:block" style={{ aspectRatio: '16/9', maxWidth: '720px', margin: '0 auto' }}>
            <iframe loading="lazy"
              src="https://www.youtube-nocookie.com/embed/oj7ZSOHAxJk"
              title="Medicare Levy Befreiung erklärt"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
            />
          </div>
        </div>
      </Section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <Section title="Häufige Fragen zur Levy und zur Befreiung" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqSchema above uses the raw string. */}
        <Accordion items={faqs} />
      </Section>

      {/* ── RATGEBER ───────────────────────────────────────────────────────── */}
      <Section tone="pale" title="Mehr zu Medicare und Krankenversicherung" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="Was kommt als Nächstes" title="Die Befreiung ist eine Zeile der Erklärung, nicht die ganze" titleId="next-title">
        <p className={blocks.text}>Dein steuerlicher Wohnsitz und deine absetzbaren Kosten spielen dabei oft die größere Rolle. Wir arbeiten alle drei zusammen aus.</p>
        <LinkButton href="/de/tax-return">So bereiten wir die Erklärung vor</LinkButton>
      </Section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <Section tone="forest" title="Lass deinen Fall prüfen" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Wir klären im Einzelfall, ob die Levy bei dir überhaupt anfällt.</p>
        <WaButton href={WA} position="footer" topic="medicare" lang="de" tone="light">Schreib uns auf WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Antwort in etwa einer Stunde.</p>
      </Section>

      <MobileCta href={WA} lang="de" topic="medicare" />
    </>
  )
}

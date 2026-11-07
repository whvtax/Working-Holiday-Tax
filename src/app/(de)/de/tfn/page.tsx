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
import { Figures, LinkRows, Steps, blocks } from '@/components/wht/Blocks'
import { PlainRows } from '@/components/wht/CoreBlocks'
import { Crumbs, PhotoBand, tb } from '@/components/wht/TfnAbnBlocks'

// ─── METADATA ───────────────────────────────────────────────────────────
// Diese Seite gehört den Wochen zwischen Arbeitsbeginn und dem Moment, in dem
// die TFN beim Arbeitgeber ankommt. Kein Preis, keine Behauptung, selbst ein
// registrierter Steuerberater zu sein.
export const metadata: Metadata = {
  // Das Root-Layout hängt " | Working Holiday Tax" an, deshalb ist der Titel
  // hier kurz genug, dass das Ganze in ein mobiles Suchergebnis passt.
  title: 'TFN beantragen: kostenlos beim ATO',
  description:
    'Die TFN beantragst du kostenlos online beim ATO, sobald du in Australien bist. Sie kommt binnen 28 Tagen per Post. Was du bis dahin dem Arbeitgeber sagst.',
  keywords: [
    'TFN beantragen Australien',
    'TFN beantragen Working Holiday',
    'Steuernummer Australien beantragen',
    'Working Holiday TFN',
    'TFN 417 Visum',
    'TFN 462 Visum',
    'TFN Backpacker beantragen',
    'Tax File Number Deutsch',
    'ohne TFN 45 Prozent Steuer',
    'TFN 28 Tage Regel',
    'TFN Australien Bearbeitungszeit',
    'TFN für Steuerrückerstattung',
    'TFN Antrag abgelehnt',
    'Steuernummer Work and Travel Australien',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/tfn`,
    languages: {
      'en-AU': `${SITE_URL}/tfn`,
      de: `${SITE_URL}/de/tfn`,
      ja: `${SITE_URL}/ja/tfn`,
      ...newLocaleLanguages('/tfn'),
      'x-default': `${SITE_URL}/tfn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-tfn.png`, width: 1200, height: 630, alt: 'TFN beantragen für Working Holiday Maker in Australien' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN beantragen für Work and Travel: die Wochen mit 45 % vermeiden',
    description:
      'Die Nummer ist kostenlos. Die Wochen ohne sie sind es nicht. Wir bereiten deinen TFN-Antrag mit dir vor und prüfen jede Angabe, für 417- und 462-Visum.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-tfn.png`],
    card: 'summary_large_image',
    title: 'TFN beantragen für Work and Travel: die Wochen mit 45 % vermeiden',
    description: 'Die Nummer ist kostenlos. Die Wochen ohne sie sind es nicht.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── COPY ───────────────────────────────────────────────────────────────

/** Die Antwort auf "TFN beantragen" in Stichpunkten. Nur ATO-Fakten, Stand November 2026. */
const TFN_FACTS = [
  { label: 'Kosten', body: 'Der Antrag beim ATO ist kostenlos.' },
  { label: 'Wo', body: 'Nur in Australien, mit gültigem Visum mit Arbeitserlaubnis, also auch mit 417 oder 462.' },
  { label: 'Unterlagen', body: 'Keine. Das ATO gleicht deine Passdaten elektronisch ab.' },
  { label: 'Zustellung', body: 'Per Post an deine australische Adresse, innerhalb von 28 Tagen nach Eingang des Antrags.' },
  { label: 'Bei deinem Arbeitgeber', body: 'Mit laufendem Antrag 28 Tage normaler Satz, danach, wenn die Nummer noch fehlt, oder ganz ohne Antrag 45 %.' },
  { label: 'Mit TFN', body: '15 % auf die ersten 45.000 $ für Working Holiday Maker, gültig ab 1. Juli 2026, unverändert zu 2025/26. Einen Steuerfreibetrag gibt es für Working Holiday Maker nicht.' },
  { label: 'Gültigkeit', body: 'Einmal vergeben, ein Leben lang, auch für das zweite und dritte Visum.' },
]

const APPLY_STEPS = [
  {
    n: '01',
    title: 'Ankommen, Visum aktiv',
    body: 'Der Online-Antrag geht erst, wenn du in Australien bist und dein 417- oder 462-Visum gilt. Von Deutschland, Österreich oder der Schweiz aus nimmt das ATO ihn nicht an, auch nicht über einen Dienstleister.',
  },
  {
    n: '02',
    title: 'Passdaten exakt übernehmen',
    body: 'Alle Vornamen in der richtigen Reihenfolge, Geburtsdatum und Passnummer genau wie im Pass. Das ATO gleicht sie mit deinen Visumsdaten ab, Dokumente lädst du keine hoch.',
  },
  {
    n: '03',
    title: 'Eine Adresse wählen, die in vier Wochen noch Post annimmt',
    body: 'Die TFN kommt als Brief an eine australische Postadresse. Wer im Hostel, auf der Farm oder im Van lebt, muss das vorher klären.',
  },
  {
    n: '04',
    title: 'Den Arbeitgeber informieren',
    body: 'Auf der Tax File Number Declaration gibst du an, dass dein Antrag läuft. Dann behält dein Arbeitgeber 28 Tage lang den normalen Satz ein.',
  },
  {
    n: '05',
    title: 'Die Nummer weitergeben, sobald der Brief da ist',
    body: 'An deinen Arbeitgeber und deinen Superfonds. Stell in den 28 Tagen keinen zweiten Antrag, das verzögert nur.',
  },
]

const FAILURE_POINTS = [
  {
    n: '01',
    title: 'Der Name im Antrag passt nicht zu den Einreisedaten',
    body: 'Das ATO gleicht deinen Antrag mit deinem Visumsdatensatz ab. Ein fehlender zweiter Vorname, ein neuer Pass oder eine andere Namensreihenfolge schickt ihn zurück.',
  },
  {
    n: '02',
    title: 'Die Adresse nimmt in vier Wochen keine Post mehr an',
    body: 'Deine TFN kommt als Brief an eine australische Adresse, und die Ausstellung kann bis zu 28 Tage dauern. Bist du bis dahin weitergezogen, leitet ihn niemand nach.',
  },
  {
    n: '03',
    title: 'Der Antrag lief, bevor das Visum aktiv war',
    body: 'Beantragt wird in Australien mit aktiviertem Visum, nicht vor dem Abflug. Zu frühe Anträge versanden, und du merkst es erst Wochen später, bei 45 %.',
  },
]

const WHAT_WE_DO = [
  {
    title: 'Wir prüfen zuerst, ob dein Visum aktiv ist',
    body: 'Eine Frage von einer Minute, die den häufigsten verlorenen Monat verhindert.',
  },
  {
    title: 'Wir gleichen deine Daten mit deinem Einreisedatensatz ab',
    body: 'Pass, Namensreihenfolge, Geburtsdatum und Visumserteilung, gegeneinander geprüft, bevor der Antrag rausgeht.',
  },
  {
    title: 'Wir lösen die Adressfrage mit dir',
    body: 'Wo du in vier Wochen bist, und was gilt, wenn die Antwort eine Farm oder ein Van ist.',
  },
  {
    title: 'Wir haken nach, wenn es hängt',
    body: 'Das ATO hat 28 Tage. Danach muss jemand dort anrufen, und das musst nicht du sein.',
  },
  {
    title: 'Wir sagen deinem Arbeitgeber, was in der Zwischenzeit gilt',
    body: 'Die Referenznummer des Antrags, korrekt angegeben, hält die ersten Abrechnungen vom Höchstsatz fern.',
  },
  {
    title: 'Wir kümmern uns am Jahresende um die Lücke',
    body: 'Was schon mit 45 % einbehalten wurde, lässt sich nur über eine Steuererklärung klären, und nur, wenn die Erklärung diese Wochen auch enthält.',
  },
]

// Antworten über etwa 55 Wörtern tragen eine Leerzeile, und die FAQ unten
// rendert einen <p> pro Absatz. faqLd nutzt weiter den Rohtext, das Schema
// bleibt also unverändert.
const FAQS = [
  {
    question: 'Wie beantrage ich die TFN mit Work-and-Travel-Visum?',
    answer:
      'Online beim ATO, sobald du mit gültigem 417- oder 462-Visum in Australien bist. Du gibst deine Passdaten genau wie im Pass an, dazu eine australische Postadresse und eine E-Mail-Adresse. Dokumente lädst du keine hoch. Der Antrag ist kostenlos, und die Nummer kommt innerhalb von 28 Tagen per Post.',
  },
  {
    question: 'Kann ich die TFN schon von Deutschland aus beantragen?',
    answer:
      'Nein. Das ATO nimmt den Online-Antrag nur an, wenn du in Australien bist und ein gültiges Visum mit Arbeitserlaubnis hast, etwa ein 417- oder 462-Visum. Das gilt auch, wenn ein Dienstleister den Antrag für dich vorbereitet. Vorbereiten kannst du trotzdem alles, damit der Antrag am ersten Tag steht.\n\nFür den Brief brauchst du außerdem eine australische Postadresse.',
  },
  {
    question: 'Kann ich die TFN einfach selbst beantragen?',
    answer:
      'Kannst du. Der Antrag ist ein kurzes und kostenloses Formular.\n\nBezahlt wird die Arbeit drumherum: deine Daten an den Einreisedatensatz anpassen, eine Adresse wählen, die in vier Wochen noch Post annimmt, und deinem Arbeitgeber die Referenznummer geben, damit die ersten Abrechnungen nicht mit 45 % laufen.',
  },
  {
    question: 'Der TFN-Antrag ist beim ATO kostenlos. Wofür zahle ich dann?',
    answer:
      'Die Nummer selbst ist kostenlos. Geld kostet die Lücke: Jede Abrechnung, bevor dein Arbeitgeber die Nummer hat, wird mit 45 % statt mit 15 % einbehalten. Bezahlt wird die Arbeit, die diese Lücke schließt, und die Erklärung, über die zu viel einbehaltene Steuer zurückkommen kann.',
  },
  {
    question: 'Was passiert, wenn ich ohne TFN anfange zu arbeiten?',
    answer:
      'Dein Arbeitgeber muss 45 % einbehalten statt des regulären Satzes, solange du ihm keine TFN mitgeteilt hast. Hast du die TFN schon beantragt und das auf der Tax File Number Declaration angegeben, hat dein Arbeitgeber 28 Tage, in denen er normal einbehält. Ohne Antrag gelten die 45 % ab der ersten Abrechnung. Der Unterschied geht ans ATO statt an dich.\n\nDas Geld ist nicht einfach weg. Es lässt sich aber nur über eine Steuererklärung klären, die nach dem 30. Juni korrekt eingereicht wird. Was zurückkommt, hängt von deinem Jahr ab, und das ATO entscheidet.',
  },
  {
    question: 'Ich arbeite schon seit Wochen ohne TFN. Ist es zu spät?',
    answer:
      'Nein. Beantrage die Nummer jetzt, damit der Höchstsatz für die nächsten Abrechnungen wegfällt. Der zu viel einbehaltene Teil kann mit der Steuererklärung für dieses Steuerjahr zurückkommen.\n\nMeistens können wir den Antrag am selben Tag fertig machen. Sag uns, wie viele Wochen schon mit 45 % abgerechnet wurden, denn das ändert, was deine Erklärung sagen muss.',
  },
  {
    question: 'Wie lange dauert es, bis die TFN ankommt?',
    answer:
      'Das ATO gibt an, TFN-Anträge innerhalb von 28 Tagen zu bearbeiten, und die meisten Working Holiday Maker haben ihre Nummer nach zwei bis vier Wochen. Sie kommt als Brief an die australische Adresse aus dem Antrag. Solange du wartest, braucht dein Arbeitgeber die Referenznummer.',
  },
  {
    question: 'Meine TFN ist nach 28 Tagen nicht da. Was jetzt?',
    answer:
      'Ruf das ATO unter 13 28 61 an, aus dem Ausland unter +61 2 6216 1111, und halte die Referenznummer aus deiner Bestätigung und deinen Pass bereit. Nach der Identitätsprüfung erfährst du den Stand, und eine alte Adresse lässt sich gleich ändern. Stell vorher keinen zweiten Antrag.\n\nSag auch deinem Arbeitgeber Bescheid: Ein laufender Antrag hält ihn nur 28 Tage beim normalen Satz, danach muss er 45 % einbehalten.',
  },
  {
    question: 'Brauche ich eine TFN oder eine ABN?',
    answer:
      'Für einen Job als Angestellter, etwa im Café, auf der Farm oder über eine Agentur, brauchst du die TFN. Eine ABN kommt nur dazu, wenn du auf eigene Rechnung arbeitest, zum Beispiel als Lieferfahrer oder Subunternehmer. Die TFN brauchst du auch dann, denn ohne sie gibt es keine Steuererklärung.',
  },
  {
    question: 'Brauche ich für das zweite Working-Holiday-Visum eine neue TFN?',
    answer:
      'Nein. Eine Steuernummer wird dir einmal zugeteilt und bleibt dein Leben lang gültig, auch über ein zweites oder drittes Working-Holiday-Visum, einen Visumswechsel und eine Zeit außerhalb Australiens hinweg.\n\nWenn du die Nummer nur verloren hast, ist das ein anderes und schnelleres Problem, sag uns also, welcher Fall es ist.',
  },
]

const GUIDES = [
  {
    href: '/de/blog/how-long-does-it-take-to-get-a-tfn',
    title: 'Wie lange die TFN dauert',
    desc: 'Was das ATO zusagt, was üblich ist, und ab wann du nachhaken solltest.',
  },
  {
    href: '/de/blog/tfn-application-delayed',
    title: 'TFN nach 28 Tagen nicht da',
    desc: 'Die drei Schritte, die fast jede Verzögerung lösen.',
  },
  {
    href: '/de/blog/apply-for-tfn-before-arriving',
    title: 'TFN vor der Ankunft beantragen?',
    desc: 'Was vor dem Abflug geht und was erst in Australien.',
  },
  {
    href: '/de/blog/what-happens-without-your-tfn',
    title: 'Arbeiten ohne TFN',
    desc: 'Die 45 %, das 28-Tage-Fenster und wie das Geld zurückkommt.',
  },
]

// Die myGov-Vergleichstabelle, die hier stand, ist entfernt: Jede ihrer Zeilen
// stand schon in den WHAT_WE_DO-Karten weiter unten. Der eine Satz, der es wert
// war zu bleiben, das "Du wirst dich nie bei myGov einloggen"-Versprechen, ist
// an das Ende dieses Abschnitts gerückt.

const WA_TFN = waUrl({ topic: 'tfn', lang: 'de' })

export default function TFNPageDE() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/tfn#webpage`,
    url: `${SITE_URL}/de/tfn`,
    name: 'TFN beantragen für Work and Travel in Australien',
    description:
      'Wie du die TFN als Working Holiday Maker beantragst, wie lange sie dauert, was ohne sie einbehalten wird und woran Anträge scheitern.',
    dateModified: '2026-11-05',
    inLanguage: 'de',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.what-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/de/tfn#service`,
    name: 'TFN-Antrag für Working Holiday Maker',
    serviceType: 'Tax File Number Antrag',
    description:
      'TFN-Anträge für Inhaber von 417- und 462-Visa, mit dir vorbereitet und geprüft, inklusive Hinweisen für den Arbeitgeber und Nachfassen beim ATO.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australien' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 und 462)' },
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
      { '@type': 'ListItem', position: 2, name: 'TFN', item: `${SITE_URL}/de/tfn` },
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
        <Crumbs homeHref="/de" home="Startseite" current="TFN" />
        <Hero
          title={
            <>
              <span className={blocks.kicker}>TFN beantragen für Work and Travel&nbsp;&middot; Visum 417 &amp; 462</span>
            Die Nummer ist kostenlos.<br />
            Die Wochen <Mark>ohne sie</Mark> nicht.
            </>
          }
        >
          <div className="hero-lede">
            <Lead>
              Ohne TFN und ohne laufenden Antrag behält dein Arbeitgeber 45 % deines Lohns ein statt 15 %.
            </Lead>
          </div>
          <WaButton href={WA_TFN} position="hero" topic="tfn" lang="de">Schreib uns auf WhatsApp</WaButton>
          <p className={heroStyles.note}>Antwort in etwa einer Stunde.</p>
          <GoogleRating variant="pill" lang="de" />
        </Hero>
        <PhotoBand page="tfn" locale="de" />
      </div>

      <Section width="wide" title="Was ist die TFN und wie beantragst du sie?" titleId="what-title">
        <p className={`${blocks.text} what-lede`}>
          Die TFN (Tax File Number) ist deine australische Steuernummer. Du beantragst sie kostenlos online beim ATO, sobald du mit gültigem 417- oder 462-Visum in Australien bist. Dokumente lädst du keine hoch. Die Nummer kommt innerhalb von 28 Tagen per Post an deine australische Adresse. Bis dahin gibst du auf der Tax File Number Declaration an, dass dein Antrag läuft.
        </p>
        <p className={blocks.text}>
          Wie lange die TFN im Einzelfall dauert und was du tust, wenn sie ausbleibt:{' '}
          <Link href="/de/blog/how-long-does-it-take-to-get-a-tfn" className={tb.inlineLink}>Wie lange dauert die TFN?</Link>
        </p>
        <h3 className={blocks.cardTitle}>Die TFN auf einen Blick</h3>
        <PlainRows items={TFN_FACTS} />
        <p className={blocks.small}>Stand: November 2026. Quelle: Australian Taxation Office (ATO), ato.gov.au.</p>
      </Section>

      <Section tone="pale" eyebrow="Der Antrag" title="So läuft der TFN-Antrag in Australien" titleId="steps-title">
        <Steps items={APPLY_STEPS} />
        <p className={blocks.text}>
          Mehr dazu:{' '}
          <Link href="/de/blog/tfn-australian-address-no-fixed-address" className={tb.inlineLink}>TFN ohne feste Adresse</Link> und{' '}
          <Link href="/de/blog/tax-file-number-declaration-form" className={tb.inlineLink}>die Tax File Number Declaration ausfüllen</Link>.
        </p>
        <p className={blocks.text}>
          Lieber mit jemandem, der die Angaben vorher prüft? Schreib uns auf WhatsApp, ob du schon in Australien bist und ab wann du arbeitest.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="de">Schreib uns auf WhatsApp</WaButton>
      </Section>

      <Section width="wide" title="Was kostet es, ohne TFN anzufangen?" titleId="gap-title">
        <p className={blocks.text}>
          Ohne TFN muss dein Arbeitgeber 45 % einbehalten statt des regulären Satzes. Hast du die TFN
            schon beantragt und das auf der Tax File Number Declaration angegeben, behält er 28 Tage lang
            normal ein, danach greifen die 45 %, wenn die Nummer noch fehlt. Ohne Antrag gelten sie ab der
            ersten Abrechnung. Ob und wie viel davon zurückkommt, hängt von deinem Jahr ab. Das klärt die
            Steuererklärung nach dem 30. Juni, und am Ende entscheidet das ATO.
        </p>
        <Figures
          items={[
            { figure: '45 %', body: 'Werden von jedem Dollar einbehalten, solange keine TFN vorliegt, statt 15 %.' },
            { figure: '28 Tage', body: 'Zeit, die TFN nachzureichen, wenn dein Antrag schon läuft, und für das ATO, sie auszustellen.' },
            { figure: '1 Erklärung', body: 'Der einzige Weg zurück für alles, was schon zum falschen Satz einbehalten wurde.' },
          ]}
        />
      </Section>

      <Section tone="pale" eyebrow="Selbst machen" title="Warum scheitern TFN-Anträge von Backpackern?" titleId="fail-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Das Formular ist kurz. Jeder der drei Punkte, an denen es schiefgeht, kann einen weiteren Monat mit 45 %
            bedeuten.
        </p>
        <Steps items={FAILURE_POINTS} />
      </Section>

      <Section eyebrow="Die Arbeit" title="Was wir dagegen tun" titleId="work-title">
        <p className={`${blocks.text} ${blocks.muted}`}>
          Du schickst uns deine Daten auf WhatsApp. Alles Weitere übernehmen wir.
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
            Formular welches ist. Wir regeln das direkt mit dem ATO.
        </p>
        <p className={blocks.text}>
          Du hast die Nummer schon und willst die Wochen mit 45 % klären?{' '}
            <Link href="/de/tax-return" className={tb.inlineLink}>Das ist die Steuererklärung</Link>.
        </p>
        <p className={blocks.text}>
          Arbeitest du zusätzlich auf eigene Rechnung, brauchst du daneben eine{' '}
            <Link href="/de/abn" className={tb.inlineLink}>ABN</Link>. Und wenn du Australien verlässt, kannst du deine{' '}
            <Link href="/de/superannuation" className={tb.inlineLink}>Superannuation zurückholen</Link>.
        </p>
      </Section>

      <Section tone="pale" title="Working-Holiday-Steuer ist das Einzige, was wir machen." titleId="trust-title">
        <p className={blocks.text}>
          Jeder TFN-Antrag, den wir vorbereiten, gehört jemandem mit 417- oder 462-Visum. Steuererklärungen werden von einem
            registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht werden.
        </p>
        <GoogleReviewsServer lang="de" />
      </Section>

      <Section title="Fragen zur TFN, bevor du schreibst" titleId="faq-title">
        {/* Accordion splits answers on a blank line; faqLd above uses the raw string. */}
        <Accordion items={FAQS} />
      </Section>

      <Section tone="pale" eyebrow="Ratgeber" title="Mehr zur TFN und den Wochen mit 45 %" titleId="guides-title">
        <LinkRows items={GUIDES} />
      </Section>

      {/* The one amber band: the guarantee. */}
      <Section tone="amber" title="Unsere Garantie" titleId="guarantee-title">
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr. Die Garantie gilt nur für Steuererklärungen mit TFN-Einkommen.
        </p>
        <p className={blocks.text}>Das Honorar ist pauschal und niemals ein Prozentsatz von dem, was zurückkommt.</p>
      </Section>

      <Section eyebrow="Was kommt als Nächstes" title="Die Wochen mit 45 % lassen sich über die Erklärung klären" titleId="next-title">
        <p className={blocks.text}>Sobald die Nummer hinterlegt ist, kann die Steuererklärung den zu viel einbehaltenen Teil zurückholen.</p>
        <div className={blocks.stack}>
          <LinkButton href="/de/tax-return" size="md">Wie die Erklärung läuft →</LinkButton>
        </div>
      </Section>

      {/* Closing CTA, forest band. */}
      <Section tone="forest" title="Sag uns, wo du gerade stehst" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>
          Schreib uns drei Dinge: ob du schon in Australien bist, ob dein Job schon begonnen hat, und ob schon eine
            Abrechnung mit 45 % kam. Mehr brauchen wir für den Anfang nicht, den Rest fragen wir gezielt.
        </p>
        <WaButton href={WA_TFN} position="section" topic="tfn" lang="de" tone="light">Schreib uns auf WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Antwort in etwa einer Stunde.</p>
      </Section>

      <MobileCta href={WA_TFN} lang="de" topic="tfn" />
    </>
  )
}

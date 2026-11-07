import { newLocaleLanguages } from '@/lib/locale-pages'
import type { Metadata } from 'next'
import Link from 'next/link'
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
 * German mirror of the rebuilt superannuation answer hub. Same structure as
 * /superannuation: every H2 is a question, answered immediately in a complete
 * paragraph, sales layer underneath the answer rather than instead of it.
 */

const WA = waUrl({ topic: 'super', lang: 'de' })

export const metadata: Metadata = {
  // Absolut, damit "Superannuation aus Australien zurückholen" nicht vom Markennamen abgeschnitten wird.
  title: { absolute: 'Superannuation aus Australien zurückholen (DASP)' },
  description:
    'Deine Superannuation holst du nach der Ausreise per DASP-Antrag zurück, mit 65 % Steuer, meist binnen 28 Tagen. Anspruch, Unterlagen und mehrere Fonds.',
  keywords: [
    'Super zurückholen Australien',
    'Superannuation zurückholen',
    'Super auszahlen Australien',
    'Super auszahlen Working Holiday Maker',
    'DASP beantragen',
    'DASP-Auszahlung Working Holiday',
    'Superannuation Working Holiday Visum',
    'Super Rückerstattung 417 Visum',
    'Super Rückerstattung 462 Visum',
    'Departing Australia Superannuation Payment Deutsch',
    'Super beantragen nach Rückkehr Deutschland',
    'Backpacker Super zurückholen',
    'wie bekomme ich meine Super zurück Australien',
    'verlorene Super Australien finden',
    'Rentenversicherung Australien zurück',
    'Rente aus Australien zurückholen',
  ],
  alternates: {
    canonical: '/de/superannuation',
    languages: { 'en': '/superannuation', 'en-AU': '/superannuation', 'de': '/de/superannuation', 'ja': '/ja/superannuation', ...newLocaleLanguages('/superannuation'), 'x-default': '/superannuation' },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'DASP: Super aus Australien zurückholen (2026)',
    description: 'Wer Anspruch hat, wie viel nach Abzug der Steuer von 65 % übrig bleibt, welche Unterlagen du brauchst und wie lange es dauert.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'DASP: Super aus Australien zurückholen',
    description: 'Anspruch, 65 % Steuer, Unterlagen, Dauer und mehrere Fonds, beantwortet.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}


/**
 * Der Einwand, mit dem jeder Lead ankommt, hier konkret zur Super.
 *
 * Das ist jetzt die einzige Fassung dieses Arguments auf der Seite: Die
 * zweispaltige Liste im letzten Abschnitt, die es wiederholt hat, ist entfernt,
 * und die FAQ erzählt es auch nicht noch einmal nach. Jede Zeile handelt von
 * DASP: Der Antrag nimmt einen Fonds nach dem anderen, und nur die, die du
 * benennen kannst. Keine Zeile behauptet, das ATO Portal sei schlecht.
 */
const MYGOV = [
  {
    mygov: 'Der Online-Antrag kann über deine TFN suchen, aber jedes gefundene Konto wird ein eigener Antrag, mit eigener Identitätsprüfung.',
    us: 'Wir suchen jedes Konto, das mit deiner TFN verknüpft ist, auch solche, die ein Arbeitgeber ungefragt für dich eröffnet hat.',
  },
  {
    mygov: 'Nach dem Absenden zeigt das System den Antrag als verschickt, nicht ob der Fonds ihn schon bearbeitet hat. Dafür fragst du bei jedem Fonds selbst nach.',
    us: 'Ist deine Ausreise ein halbes Jahr her und dein Visum erloschen, landet nicht beantragte Super beim ATO, deshalb suchen wir auch dort und fassen bei jedem Fonds nach, bis er zahlt.',
  },
  {
    mygov: 'Der Antrag wird gegen deinen Visumstatus geprüft, und ein Visum, das noch läuft, stoppt ihn sofort.',
    us: 'Wir prüfen alle drei Voraussetzungen vorher, damit du keine zwei Wochen in einen Antrag steckst, der noch gar nicht auszahlen kann.',
  },
  {
    mygov: 'Super ist ein Antrag, deine Steuererklärung ein zweiter. Beide werden nicht automatisch verknüpft.',
    us: 'Beide Anträge laufen getrennt, deshalb behalten wir beide im Blick.',
  },
]

const faqs = [
  {
    question: 'Ist Super die australische Rentenversicherung? Kann ich sie zurückholen?',
    answer:
      'Ungefähr: Superannuation ist die australische Altersvorsorge, die dein Arbeitgeber zusätzlich zum Lohn in einen Superfonds auf deinen Namen einzahlt, keine staatliche Rente. Als Working Holiday Maker holst du sie nach der Ausreise mit einem DASP-Antrag zurück, abzüglich 65 % Steuer auf den steuerpflichtigen Anteil.',
  },
  {
    question: 'Kann ich mit einem 417- oder 462-Visum meine Super beantragen?',
    answer:
      'Ja, sobald du Australien verlassen hast und dein Working-Holiday-Visum erloschen ist. Solange du mit diesem Visum noch hier bist, geht es nicht. Der Antrag heißt Departing Australia Superannuation Payment (DASP), und 65 % des steuerpflichtigen Anteils werden einbehalten. Liegt das Guthaben noch beim Fonds, kann es auf ein Konto im Ausland überwiesen werden.',
  },
  {
    question: 'Wie bekomme ich meine Super aus Australien zurück?',
    answer:
      'Mit einem DASP-Antrag nach der Ausreise. Prüfe zuerst, dass dein Visum abgelaufen oder annulliert ist und du Australien verlassen hast. Finde dann jedes Konto über deine TFN, stelle den Antrag kostenlos online beim ATO oder per Formular beim Fonds und reiche bei Bedarf beglaubigte Kopien ein. 65 % des steuerpflichtigen Anteils werden einbehalten, und laut ATO wird in der Regel binnen 28 Tagen nach vollständigem Antrag gezahlt.',
  },
  {
    question: 'Kann ich meine Super einfach selbst beantragen?',
    answer:
      'Kannst du, es kostet nichts, und bei einem einzigen Fonds mit sauberen Unterlagen sagen wir dir das auch. Schwieriger wird es bei Super auf mehreren Fonds, bei einem Fonds, der beglaubigte Kopien aus dem Ausland verlangt, oder bei einem Visum, das noch läuft.',
  },
  {
    question: 'Bekomme ich Superannuation, wenn ich unter einer ABN gearbeitet habe?',
    answer:
      'In der Regel nicht. Super ist eine Arbeitgeberpflicht bei PAYG-Anstellung. Arbeit auf Rechnung über eine ABN erzeugt meist keine. Ausnahme: Du warst auf dem Papier Auftragnehmer, hast aber faktisch wie angestellt gearbeitet.',
  },
  {
    question: 'Ist eine DASP-Auszahlung dasselbe wie eine Steuerrückerstattung?',
    answer:
      'Nein, zwei verschiedene Zahlungen. Die Steuerrückerstattung ist zu viel gezahlte Lohnsteuer und kommt vom ATO nach der Steuererklärung. Die DASP ist die Super, die dein Arbeitgeber extra eingezahlt hat, und kommt vom Fonds. Beides beantragst du getrennt.',
  },
  {
    question: 'Brauche ich meine TFN, um meine Super zu beantragen?',
    answer:
      'Ein Fonds erkennt dich meist auch über Namen, Geburtsdatum und Pass, eine verlorene TFN stoppt den Antrag also nicht. Aber nur über die TFN findet das ATO jedes deiner Superkonten. Sie wiederherzustellen geht schneller, als Fonds für Fonds zu suchen.',
  },
  {
    question: 'Warum sind es 65 % für Working Holiday Maker und 35 % für andere?',
    answer:
      'Die 65 % gelten per Gesetz für alle, die je ein 417- oder 462-Visum hatten, andere temporäre Aufenthalter zahlen 35 %. Der Satz folgt deiner Visumhistorie, nicht deinem letzten Visum, und gilt auch nach einem Wechsel.',
  },
  {
    question: 'Was, wenn ein Arbeitgeber überhaupt keine Super gezahlt hat?',
    answer:
      'Beantragen kannst du nur, was wirklich in einen Fonds eingezahlt wurde. Hat ein Arbeitgeber nicht gezahlt, kann das ATO das prüfen und für dich eintreiben. Das dauert deutlich länger und gehört vor den DASP-Antrag, sonst machst du alles doppelt.',
  },
  {
    question: 'Kann ich nach der Super-Auszahlung wieder nach Australien, und muss sie in die Steuererklärung?',
    answer:
      'In die Steuererklärung gehört sie nicht: Die einbehaltene Steuer ist endgültig, und weder die DASP noch die einbehaltene Steuer werden dort angegeben. Eine Wiedereinreise mit einem neuen Visum ist eine Frage des Visumsrechts, nicht der Super. Praktische Folge der Auszahlung: Die ausgezahlten Superkonten werden geschlossen.',
  },
  {
    question: 'Kann ich den DASP-Antrag schon vor dem Abflug vorbereiten?',
    answer:
      'Ja. Im Online-System des ATO legst du den Antrag noch in Australien an und speicherst ihn. Absenden kannst du ihn erst, wenn du ausgereist bist und kein gültiges Visum mehr hast. Beglaubigte Kopien lässt du am besten vor dem Abflug machen.',
  },
  {
    question: 'Kann die DASP auf ein deutsches Konto überwiesen werden?',
    answer:
      'Bei Guthaben, das noch beim Fonds liegt, ja, per Auslandsüberweisung. Liegt das Guthaben schon beim ATO, zahlt das ATO nur auf ein australisches Konto oder per Scheck in australischen Dollar. Schließ dein australisches Konto deshalb erst, wenn du weißt, wo dein Geld liegt.',
  },
  {
    question: 'Kostet der DASP-Antrag etwas?',
    answer:
      'Das Online-System des ATO ist kostenlos, Papieranträge an das ATO auch. Ein Fonds kann für einen Papierantrag je nach Guthaben eine Gebühr verlangen, und die Certification of Immigration Status (Formular 1194) des Department of Home Affairs ist gebührenpflichtig.',
  },
  {
    question: 'Gibt es eine Frist für den DASP-Antrag?',
    answer:
      'Das ATO nennt keine. Ist deine Ausreise sechs Monate oder länger her und dein Visum erloschen, überträgt der Fonds das Guthaben an das ATO. Beantragen kannst du es dann dort, mit denselben 65 %.',
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
    { '@type': 'ListItem', position: 2, name: 'Super auszahlen', item: `${SITE_URL}/de/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/de/superannuation#service`,
  name: 'DASP-Superannuation-Auszahlung für Working Holiday Maker',
  serviceType: 'Departing Australia Superannuation Payment (DASP) Antrag',
  description:
    'DASP-Anträge für Inhaber von 417- und 462-Visa: von der Suche nach jedem mit der TFN verknüpften Fonds bis zur Auszahlung, beim Fonds auch auf ein Konto im Ausland.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 / 462) nach der Abreise aus Australien' },
  inLanguage: 'de',
  url: `${SITE_URL}/de/superannuation`,
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/de/superannuation#webpage`,
  url: `${SITE_URL}/de/superannuation`,
  name: 'DASP: Super aus Australien zurückholen',
  inLanguage: 'de',
  dateModified: '2026-11-05',
  about: { '@id': `${SITE_URL}/de/superannuation#service` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  citation: ['https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp'],
}

/*
 * Beschreibt, woraus ein DASP-Antrag besteht und in welcher Reihenfolge das
 * abläuft, damit die Seite als Quelle und nicht als Landingpage gelesen wird.
 * Bewusst keine Handlungsanweisung: eine frühere Fassung listete "Unterlagen
 * sammeln" und "Bei jedem Fonds beantragen", also eine Anleitung für genau den
 * Vorgang, mit dem wir beauftragt werden. Suchmaschinen zeigen solche Daten als
 * Schritt-für-Schritt-Anleitung an.
 */
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  inLanguage: 'de',
  name: 'Wie ein DASP-Antrag auf Auszahlung der Superannuation abläuft',
  description:
    'Woraus ein DASP-Antrag für Working Holiday Maker mit einem Visum der Klasse 417 oder 462 besteht, vom Anspruch bis zur Auszahlung.',
  step: [
    { name: 'Der Anspruch wird geprüft', text: 'Dein Visum muss abgelaufen oder annulliert sein, du musst Australien verlassen haben und darfst kein anderes gültiges australisches Visum mehr haben. Alles muss gleichzeitig zutreffen, und ein Antrag davor ist der häufigste vergebliche Antrag überhaupt.' },
    { name: 'Jeder Fonds wird ermittelt', text: 'Ein Working-Holiday-Jahr mit mehreren Arbeitgebern bedeutet meist mehrere Fonds, einschließlich Guthaben, die ein Fonds bereits als nicht abgeholte Super an das ATO übertragen hat. Ein Antrag erreicht nur das Geld, auf das er zeigt.' },
    { name: 'Jeder Antrag wird vorbereitet und belegt', text: 'Jeder Fonds mit Guthaben wird einzeln beantragt, nach seinem eigenen Identitäts- und Beglaubigungsstandard. Was ein Fonds akzeptiert, akzeptiert der nächste nicht zwangsläufig.' },
    { name: 'Die Quellensteuer wird einbehalten', text: 'Auf den steuerpflichtigen Anteil einer DASP für Working Holiday Maker fallen 65 % an. Der Fonds behält sie ein und führt sie an das ATO ab, unabhängig davon, wer den Antrag stellt.' },
    { name: 'Das Guthaben wird ausgezahlt', text: 'Das verbleibende Guthaben wird ausgezahlt. Bei Guthaben, das noch beim Fonds liegt, ist eine Überweisung ins Ausland möglich, Guthaben beim ATO geht auf ein australisches Konto oder per Scheck in australischen Dollar.' },
  ].map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
}

/* ── Section shell: every answer on the page is one Section ──────────────── */
function Answer({
  id, heading, children, tone = 'white',
}: { id: string; heading: string; children: React.ReactNode; tone?: 'white' | 'pale' | 'amber' }) {
  return (
    <Section id={id} tone={tone} title={heading} titleId={`${id}-title`}>
      {children}
    </Section>
  )
}

const GUIDES = [
  { href: '/de/blog/how-to-find-lost-superannuation', label: 'Verlorene Super über deine TFN finden' },
  { href: '/de/blog/what-happens-to-unclaimed-super', label: 'Super nie beantragt: wo das Geld landet' },
  { href: '/de/blog/how-long-does-dasp-take', label: 'Wie lange ein DASP-Antrag dauert, Schritt für Schritt' },
  { href: '/de/blog/dasp-documents-required', label: 'Welche Unterlagen ein DASP-Antrag braucht' },
  { href: '/de/blog/dasp-tax-rate-65-percent-explained', label: 'Warum DASP mit 65 % besteuert wird und was bleibt' },
  { href: '/de/blog/dasp-rejected-what-to-do', label: 'Was tun, wenn dein DASP-Antrag abgelehnt wird' },
  { href: '/de/blog/super-multiple-funds-consolidation', label: 'Beantragen, wenn deine Super auf mehreren Fonds liegt' },
  { href: '/de/blog/dasp-vs-leaving-super-in-australia-pros-cons', label: 'Jetzt holen oder liegen lassen: der Vergleich' },
]

export default function GermanSuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className={blocks.underHeader}>
        <Crumb home="Startseite" current="Super auszahlen" label="Brotkrümelnavigation" href="/de" />
        <Hero
          eyebrow={<>Superannuation &middot; DASP</>}
          title={<>Wie du deine Super nach der Abreise aus Australien <Mark>zurückholst</Mark></>}
        >
          <div className="hero-sub">
            <Lead>Dein Arbeitgeber hat sie zusätzlich zum Lohn eingezahlt, nie davon abgezogen. Sie liegt noch in Australien.</Lead>
            <p className={blocks.text}>Deine Superannuation bekommst du nach der Abreise mit einem DASP-Antrag zurück, online im kostenlosen System des ATO oder per Formular beim Fonds. Voraussetzung: Dein 417- oder 462-Visum ist abgelaufen oder annulliert und du hast Australien verlassen. Einbehalten werden 65 % auf den steuerpflichtigen Anteil, bearbeitet wird in der Regel binnen 28 Tagen nach vollständigem Antrag.</p>
          </div>
          <div className={coreBlocks.actions}>
            <WaButton href={WA} position="hero" topic="super" lang="de">Frag uns zu deiner Super</WaButton>
            <a href="#who-can-claim" className={coreBlocks.hint}>Mit dem Anspruch anfangen</a>
          </div>
          <p className={heroStyles.note}>Antwort in etwa einer Stunde.</p>
        </Hero>
      </div>

      <PhotoFrame page="superannuation" locale="de" />

      <Section eyebrow="Selbst machen" title={<>Ein DASP-Antrag geht an genau einen Fonds. <Mark>Nach vier Casual Jobs sind es oft vier.</Mark></>} titleId="objection-title">
        <p className={`${blocks.text} ${blocks.muted}`}>Zwei davon wurden für dich eröffnet, ohne dass du etwas ausgesucht hast.</p>
        <Compare rows={MYGOV.map(r => ({ left: r.mygov, right: r.us }))} leftLabel="Im ATO-Portal" rightLabel="Mit uns" />
        <p className={blocks.statement}>Du musst dich nie bei myGov einloggen und keinen Ausweis verknüpfen. Wir regeln das direkt mit dem ATO.</p>
      </Section>

      <Answer id="who-can-claim" heading="Wer kann eine DASP-Auszahlung beantragen?" tone="pale">
        <p className={blocks.text}>
          Du kannst eine Departing Australia Superannuation Payment beantragen, wenn du mit einem
          temporären Visum gearbeitet hast, das Visum abgelaufen oder annulliert ist, du Australien
          verlassen hast und kein anderes australisches Visum mehr gilt. Alles muss gleichzeitig zutreffen. Australische und
          neuseeländische Staatsbürger und Permanent Residents können nicht beantragen.
        </p>
        <p className={blocks.text}>
          Dein Visumstatus wird beim Antrag direkt mit dem Department of Home Affairs abgeglichen, du
          musst nichts extra nachweisen. Ein Bridging Visum oder ein noch gültiges Visum, mit dem du im
          Land bist, blockiert den Antrag.
        </p>
        <p className={blocks.text}>
          Super entsteht nur aus einer Anstellung. Hast du auf Rechnung über eine ABN gearbeitet, liegt dafür in der Regel
          nichts im Fonds:{' '}
          <Link href="/de/abn" className={blocks.textLink}>Was eine ABN für Steuer und Super bedeutet</Link>. Fehlt Super von
          einem Arbeitgeber, kläre das vor dem Antrag:{' '}
          <Link href="/de/blog/super-employer-not-paying-what-to-do" className={blocks.textLink}>Arbeitgeber zahlt keine Super, was tun</Link>.
        </p>
      </Answer>

      <Answer id="rente" heading="Ist Super so etwas wie die Rentenversicherung in Australien?" tone="white">
        <p className={blocks.text}>
          Ja, im Groben. Superannuation ist das australische System für die Altersvorsorge: Dein Arbeitgeber zahlt 12 % zusätzlich
          zum Lohn in einen Superfonds, und das Guthaben gehört dir. Anders als bei einer staatlichen Rentenversicherung liegt das
          Geld auf einem eigenen Konto bei einem Fonds, und genau deshalb kannst du es als Working Holiday Maker nach der Abreise
          mit einem DASP-Antrag zurückholen.
        </p>
        <p className={blocks.text}>
          Wer also nach der &bdquo;Rente aus Australien&ldquo; oder der &bdquo;australischen Rentenversicherung&ldquo; sucht, meint fast immer die Super.
          Wie der Antrag läuft, steht weiter unten:{' '}
          <a href="#how-to-apply" className={blocks.textLink}>Wo du den DASP-Antrag stellst</a>.
        </p>
      </Answer>

      <Answer id="key-figures" heading="Die wichtigsten DASP-Zahlen auf einen Blick" tone="pale">
        <ul className={blocks.rows}>
          <li className={blocks.row}><span className={blocks.num}>1</span><div><p className={blocks.rowTitle}>65 % Steuer für Working Holiday Maker</p><p className={blocks.rowBody}>Auf den gesamten steuerpflichtigen Anteil, also auf das taxed und das untaxed element. Der steuerfreie Anteil bleibt steuerfrei. Andere temporäre Visa: 35 % beziehungsweise 45 %. Quelle: ATO, gilt seit 1. Juli 2017.</p></div></li>
          <li className={blocks.row}><span className={blocks.num}>2</span><div><p className={blocks.rowTitle}>28 Tage Bearbeitung</p><p className={blocks.rowBody}>Servicestandard ab Eingang des vollständigen Antrags. Fehlt ein Dokument, beginnt die Frist erst, wenn es nachgereicht ist. Quelle: ATO.</p></div></li>
          <li className={blocks.row}><span className={blocks.num}>3</span><div><p className={blocks.rowTitle}>Ab 5.000 $ pro Fonds strengere Nachweise</p><p className={blocks.rowBody}>Der Fonds kann beglaubigte Kopien deiner Ausweisdokumente verlangen, bei Papieranträgen zusätzlich die gebührenpflichtige Certification of Immigration Status (Formular 1194). Quelle: ATO, Department of Home Affairs.</p></div></li>
          <li className={blocks.row}><span className={blocks.num}>4</span><div><p className={blocks.rowTitle}>6 Monate bis zur Übertragung ans ATO</p><p className={blocks.rowBody}>Ist deine Ausreise sechs Monate oder länger her und dein Visum erloschen, überträgt der Fonds nicht beantragte Super an das ATO. Beantragen kannst du sie dort weiterhin. Quelle: ATO.</p></div></li>
          <li className={blocks.row}><span className={blocks.num}>5</span><div><p className={blocks.rowTitle}>12 % Super Guarantee</p><p className={blocks.rowBody}>So viel zahlt dein Arbeitgeber seit 1. Juli 2025 zusätzlich zum regulären Lohn ein. Seit 1. Juli 2026 gilt Payday Super: Die meisten Arbeitgeber zahlen wenige Tage nach jedem Zahltag statt einmal im Quartal. Quelle: ATO.</p></div></li>
        </ul>
        <p className={blocks.small}>Stand: November 2026. Grundlage ist die DASP-Seite des ATO, zuletzt aktualisiert am 24. August 2026.</p>
      </Answer>
      <Answer id="how-much" heading="Wie viel Super bekommst du wirklich zurück?" tone="white">
        <p className={blocks.text}>Bei Working Holiday Makern werden 65 % Quellensteuer auf den steuerpflichtigen Anteil der DASP einbehalten, bei dir kommen also rund 35 Cent pro Dollar an. Der Satz steht im Gesetz, gilt für jeden, der irgendwann ein 417- oder 462-Visum hatte, und lässt sich weder durch Berater noch durch Warten senken.</p>
        <div className={coreBlocks.threeUp}>
          {[
            { bal: '3.000 $', net: '1.050 $', note: 'ein paar Monate Casual-Arbeit' },
            { bal: '6.000 $', net: '2.100 $', note: 'etwa sechs Monate Vollzeit' },
            { bal: '10.000 $', net: '3.500 $', note: 'ein ganzes Working-Holiday-Jahr' },
          ].map((r, i) => (
            <div key={i} className={coreBlocks.stat}>
              <p className={coreBlocks.statLabel}>Super-Guthaben</p>
              <p className={blocks.cardTitle}>{r.bal}</p>
              <p className={coreBlocks.statNet}>{r.net}</p>
              <p className={blocks.small}>ausgezahlt &middot; {r.note}</p>
            </div>
          ))}
        </div>
        <p className={blocks.small}>Beträge nach Abzug der DASP-Quellensteuer des ATO von 65 %, bei rein versteuerten Beiträgen. Bei Working Holiday Makern gelten die 65 % für den gesamten steuerpflichtigen Anteil, auch für einen unversteuerten Teil, den manche Fonds führen. Sieh die Zahlen als Beispiel, nicht als Angebot.</p>
        <p className={blocks.text}>Warum es 65 % sind und was von echten Guthaben bleibt:{' '}<Link href="/de/blog/dasp-tax-rate-65-percent-explained" className={blocks.textLink}>Die DASP-Steuer von 65 % erklärt</Link>. Was nach der Auszahlung noch kommt, etwa die Frage nach deinem Heimatland:{' '}<Link href="/de/blog/tax-on-super-withdrawal-backpacker" className={blocks.textLink}>Super-Steuer nach der Ausreise</Link>.</p>
      </Answer>
      <Answer id="documents" heading="Welche Unterlagen brauchst du für den DASP-Antrag?" tone="pale">
        <p className={blocks.text}>
          Du brauchst Reisepass, australische TFN, Visumsdaten, den Namen jedes Superfonds
          und die Bankverbindung, australisch oder im Ausland. Eine fehlende
          Mitgliedsnummer ist selten ein Problem, ein Fonds ordnet dich meist über TFN und Geburtsdatum
          zu. Hast du deine TFN nicht mehr, hilft dir das hier weiter:{' '}
          <Link href="/de/tfn" className={blocks.textLink}>TFN beantragen oder wiederfinden</Link>.
        </p>
        <p className={blocks.text}>
          Woran Anträge hängen bleiben, ist die Beglaubigung. Liegen bei einem Fonds 5.000 $ oder mehr,
          kann er beglaubigte Kopien deiner Ausweisdokumente verlangen, und das aus Deutschland zu
          organisieren dauert länger, als die meisten denken.
        </p>
      </Answer>
      <Answer id="how-to-apply" heading="Wo stellst du den DASP-Antrag: online oder auf Papier?" tone="white">
        <p className={blocks.text}>Der übliche Weg ist das kostenlose DASP-Online-System des ATO. Es deckt Super ab, die noch beim Fonds liegt, und Super, die der Fonds schon an das ATO übertragen hat, und es prüft deinen Visumstatus direkt beim Department of Home Affairs. Anlegen und speichern kannst du den Antrag schon in Australien, absenden erst nach der Ausreise.</p>
        <p className={blocks.text}>Auf Papier gibt es zwei Formulare: NAT 7204 schickst du an jeden Fonds einzeln, NAT 74880 an das ATO für Guthaben, die dort liegen. Papieranträge an das ATO kosten nichts, ein Fonds kann für Papieranträge je nach Guthaben eine Gebühr verlangen. Ab 5.000 $ kommt bei Papier oft die Certification of Immigration Status (Formular 1194) dazu, die Home Affairs nur gegen Gebühr ausstellt.</p>
        <p className={blocks.small}>Quelle: <a href="https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp" className={blocks.textLink} rel="noopener">ATO, Departing Australia superannuation payment</a></p>
      </Answer>
      <Answer id="how-long" heading="Wie lange dauert eine DASP-Auszahlung?" tone="pale">
        <p className={blocks.text}>
          Das ATO nennt 28 Tage als Servicestandard, gerechnet ab dem Tag, an dem dein Antrag vollständig
          beim Fonds oder beim ATO liegt. Fehlt etwas, etwa ein beglaubigtes Dokument, läuft die Frist erst,
          wenn es nachgereicht ist, und der Antrag liegt vorher oft wochenlang.
        </p>
        <p className={blocks.text}>
          Verteilt sich dein Geld auf mehrere Fonds, ist der Antrag so schnell wie der langsamste
          davon. Guthaben, die schon beim ATO liegen, werden dort beantragt,
          im selben Zeitrahmen.
        </p>
      </Answer>
      <Answer id="find-your-fund" heading="Was ist, wenn du deinen Superfonds nicht kennst?" tone="white">
        <p className={blocks.text}>
          Das ist der Normalfall. Jeder Fonds, in den ein Arbeitgeber eingezahlt hat,
          ist mit deiner TFN verknüpft und lässt sich darüber finden, ohne Fondsnamen
          oder Mitgliedsnummer. Auch ans ATO abgegebene Guthaben tauchen in der Suche auf.
        </p>
        <p className={blocks.text}>
          Der Antrag selbst läuft nicht automatisch: Ein Konto zu finden, beantragt noch nichts, jeder Fonds
          braucht seinen eigenen Antrag. Übersehen wird fast immer der erste Job.
        </p>
        <p className={blocks.text}>
          Wie die Suche über die TFN genau läuft:{' '}
          <Link href="/de/blog/how-to-find-lost-superannuation" className={blocks.textLink}>Verlorene Super finden</Link>.
        </p>
        <div className={blocks.stack}>
          <WaButton href={WA} position="section" topic="super" lang="de" size="md">Schick uns deine Arbeitgeber, wir suchen mit</WaButton>
          <p className={blocks.small}>Antwort in etwa einer Stunde.</p>
        </div>
      </Answer>
      <Answer id="from-overseas" heading="Kannst du deine Super aus Deutschland, Österreich oder der Schweiz beantragen?" tone="pale">
        <p className={blocks.text}>
          Ja, und anders geht es gar nicht. Eine DASP ist erst nach deiner Ausreise möglich, jeder
          Antrag kommt also aus dem Ausland. Dein Wohnort ändert am Anspruch nichts.
        </p>
        <p className={blocks.text}>
          Eines klärst du, bevor du dein australisches Konto schließt: Liegt dein Guthaben noch beim Fonds,
          kann es ins Ausland überwiesen werden. Liegt es schon beim ATO, zahlt das ATO nur auf ein
          australisches Konto oder per Scheck in australischen Dollar, und so ein Scheck ist im Ausland
          mühsam einzulösen. Ob dein Heimatland die Zahlung besteuert, ist eine Frage für einen Berater bei
          dir vor Ort.
        </p>
      </Answer>
      <Answer id="dasp-vs-leaving" heading="Super zurückholen oder in Australien liegen lassen?" tone="white">
        <p className={blocks.text}>
          Für fast jeden Working Holiday Maker ist Zurückholen die bessere Wahl. Ein liegen
          gelassenes Guthaben bekommt keine Beiträge mehr, zahlt aber weiter Gebühren und oft
          Versicherungsprämien, die dir nichts nützen.
        </p>
        <p className={blocks.text}>
          Das Gegenargument trägt nur, wenn du dauerhaft zum Leben und Arbeiten zurückkehren willst.
          Warten senkt die 65 % nicht.{' '}
          <Link href="/de/blog/dasp-vs-leaving-super-in-australia-pros-cons" className={blocks.textLink}>
            Der ausführliche Vergleich steht hier
          </Link>.
        </p>
      </Answer>
      <Answer id="while-in-australia" heading="Kannst du deine Super beantragen, solange du noch in Australien bist?" tone="pale">
        <p className={blocks.text}>
          Nein. Super ist gesperrt, solange du ein gültiges Visum hast und im Land bist. Mit einem Working-Holiday-Visum
          gibt es keine vorzeitige Auszahlung, auch nicht bei Geldnot.
        </p>
        <p className={blocks.text}>
          Fliegst du deutlich vor Ablauf deines Visums heim, kann das Department of Home Affairs das
          Visum nach deiner Ausreise annullieren, und das zieht den Antrag in der Regel vor.
        </p>
        <p className={blocks.text}>
          Vorbereiten kannst du aber schon jetzt: Im Online-System des ATO legst du den Antrag noch in
          Australien an und speicherst ihn, abgeschickt wird er nach der Ausreise. Beglaubigte Kopien lässt
          du am besten auch vor dem Abflug machen, vor Ort ist das deutlich einfacher.
        </p>
      </Answer>
      <Answer id="never-claimed" heading="Was passiert mit deiner Super, wenn du sie nie beantragst?" tone="white">
        <p className={blocks.text}>
          Sie ist nicht weg, und das ATO nennt keine Frist für den Antrag. Ist deine Ausreise sechs Monate
          oder länger her und dein Visum erloschen, überträgt der Fonds nicht beanspruchtes Guthaben an das
          ATO. Dort liegt es auf deinen Namen, außer Reichweite von Fondsgebühren und Versicherungsprämien,
          und bleibt beantragbar, zu denselben 65 %.
        </p>
        <p className={blocks.text}>
          Verloren ist nur, was Gebühren und Prämien in den Monaten vor der Übertragung genommen
          haben. Bei kleinen Beträgen ist das spürbar.
        </p>
      </Answer>
            <Answer id="with-us" heading="Selbst beantragen oder uns machen lassen" tone="amber">
        <p className={blocks.text}>Du kannst das selbst machen. Dann liegt bei dir: die Suche nach jedem Konto, das mit deiner TFN verknüpft ist, ATO-Guthaben eingeschlossen, die beglaubigten Kopien aus dem Ausland, einen eigenen Antrag pro Fonds, und das Nachfassen, wenn ein Fonds nicht mehr antwortet.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Unsere Garantie: Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr. Die Garantie gilt nur für Steuererklärungen mit TFN-Einkommen.
        </p>
        <p className={blocks.text}>
          Die Garantie gehört zur Steuererklärung. Wer Australien verlassen hat, hat meist noch eine Erklärung für das letzte Jahr offen, und die Super-Frage klären wir im selben Gespräch:{' '}
          <Link href="/de/tax-return" className={blocks.textLink}>So läuft die Steuererklärung</Link>.
        </p>
        <p className={blocks.text}>Jede Steuererklärung wird von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.</p>
        <div className={blocks.stack}>
          <p className={blocks.text}>Für die erste Nachricht reicht: bei welchen Arbeitgebern du gearbeitet hast, wann du ausgereist bist und bis wann dein Visum lief. Den Rest klären wir im Chat.</p>
          <WaButton href={WA} position="section" topic="super" lang="de" size="md">Schreib uns auf WhatsApp</WaButton>
          <p className={blocks.small} style={{ color: 'var(--wht-ink)' }}>Antwort in etwa einer Stunde.</p>
        </div>
      </Answer>

      <Section title="Weitere Fragen zur DASP-Auszahlung" titleId="faq-title">
        <Accordion items={faqs} />
      </Section>

      <Section tone="pale" title="Ein Teil des Antrags im Detail" titleId="guides-title">
        <TitleLinks items={GUIDES} />
      </Section>

      <Section eyebrow="Was kommt als Nächstes" title="Deine Steuererklärung ist ein eigener Antrag" titleId="next-title">
        <p className={blocks.text}>
          Die Super kommt vom Fonds, eine Steuerrückerstattung vom ATO, und für das letzte Jahr in Australien ist die
          Erklärung meist noch offen. Dazu gehört oft die 2 % Medicare Levy, die je nach deinem Anspruch mit einer
          Bescheinigung wegfallen kann:{' '}
          <Link href="/de/medicare" className={blocks.textLink}>Zur Medicare-Befreiung</Link>.
        </p>
        <LinkButton href="/de/tax-return">So läuft die Steuererklärung</LinkButton>
      </Section>

      <Section tone="forest" title="Frag uns zu deiner Super" titleId="cta-title">
        <p className={`${blocks.text} ${blocks.onForest}`}>Dein Arbeitgeber hat sie zusätzlich zum Lohn eingezahlt, nie davon abgezogen. Sie liegt noch in Australien.</p>
        <WaButton href={WA} position="footer" topic="super" lang="de" tone="light">Schreib uns auf WhatsApp</WaButton>
        <p className={`${blocks.small} ${blocks.onForest}`}>Antwort in etwa einer Stunde.</p>
      </Section>

      <MobileCta href={WA} lang="de" topic="super" />
    </>
  )
}

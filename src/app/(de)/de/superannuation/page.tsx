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
  title: 'DASP: Super aus Australien zurückholen',
  description:
    'Zurück aus Australien mit 417- oder 462-Visum? Deine Super holst du per DASP zurück: Anspruch, die DASP-Steuer von 65 %, Unterlagen und Dauer.',
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
    mygov: 'Du stellst einen Antrag pro Fonds, und nur für Fonds, von denen du schon weißt.',
    us: 'Wir suchen jedes Konto, das mit deiner TFN verknüpft ist, auch solche, die ein Arbeitgeber ungefragt für dich eröffnet hat.',
  },
  {
    mygov: 'Nichts sagt dir, dass ein Guthaben den Fonds längst verlassen hat und als nicht abgeholte Super beim ATO liegt.',
    us: 'Etwa ein halbes Jahr nach Ablauf deines Visums landet es dort, deshalb suchen wir auch dort.',
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
    question: 'Kann ich mit einem 417- oder 462-Visum meine Super beantragen?',
    answer:
      'Ja, sobald du Australien verlassen hast und dein Working-Holiday-Visum erloschen ist. Solange du mit diesem Visum noch hier bist, geht es nicht. Der Antrag heißt Departing Australia Superannuation Payment (DASP), 65 % des steuerpflichtigen Anteils werden einbehalten, und anders als eine Steuererstattung kann sie auf ein Konto im Ausland gezahlt werden.',
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
    question: 'Wirkt sich die Auszahlung auf meine Steuererklärung oder ein späteres Visum aus?',
    answer:
      'Auf beides nicht. Die einbehaltene Steuer ist endgültig, die DASP gehört also nicht in deine australische Steuererklärung, und ein späterer Visumsantrag hängt in der Regel nicht daran. Einzige praktische Folge: deine Superkonten werden geschlossen.',
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
    'DASP-Anträge für Inhaber von 417- und 462-Visa: von der Suche nach jedem mit der TFN verknüpften Fonds bis zur Auszahlung auf ein australisches oder deutsches Konto.',
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
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/de/superannuation`,
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
    { name: 'Der Anspruch wird geprüft', text: 'Dein Visum muss abgelaufen oder annulliert sein und du musst Australien verlassen haben. Beides muss gleichzeitig zutreffen, und ein Antrag davor ist der häufigste vergebliche Antrag überhaupt.' },
    { name: 'Jeder Fonds wird ermittelt', text: 'Ein Working-Holiday-Jahr mit mehreren Arbeitgebern bedeutet meist mehrere Fonds, einschließlich Guthaben, die ein Fonds bereits als nicht abgeholte Super an das ATO übertragen hat. Ein Antrag erreicht nur das Geld, auf das er zeigt.' },
    { name: 'Jeder Antrag wird vorbereitet und belegt', text: 'Jeder Fonds mit Guthaben wird einzeln beantragt, nach seinem eigenen Identitäts- und Beglaubigungsstandard. Was ein Fonds akzeptiert, akzeptiert der nächste nicht zwangsläufig.' },
    { name: 'Die Quellensteuer wird einbehalten', text: 'Auf den steuerpflichtigen Anteil einer DASP für Working Holiday Maker fallen 65 % an. Der Fonds behält sie ein und führt sie an das ATO ab, unabhängig davon, wer den Antrag stellt.' },
    { name: 'Das Guthaben wird ausgezahlt', text: 'Das verbleibende Guthaben wird ausgezahlt, und anders als eine Steuererstattung kann es auf ein ausländisches Konto gehen.' },
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
          temporären Visum gearbeitet hast, das Visum abgelaufen oder annulliert ist und du das Land
          endgültig verlassen hast. Alle drei müssen gleichzeitig zutreffen. Australische und
          neuseeländische Staatsbürger und Permanent Residents können nicht beantragen.
        </p>
        <p className={blocks.text}>
          Dein Visumstatus wird beim Antrag direkt mit dem Department of Home Affairs abgeglichen, du
          musst nichts extra nachweisen. Ein Bridging Visum oder ein noch gültiges Visum, mit dem du im
          Land bist, blockiert den Antrag.
        </p>
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
        <p className={blocks.small}>Beträge nach Abzug der DASP-Quellensteuer des ATO von 65 %, bei rein versteuerten Beiträgen. Auf einen unversteuerten Anteil, den manche Fonds führen, gilt ein höherer Satz. Sieh die Zahlen als Beispiel, nicht als Angebot.</p>
      </Answer>
      <Answer id="documents" heading="Welche Unterlagen brauchst du für den DASP-Antrag?" tone="pale">
        <p className={blocks.text}>
          Du brauchst Reisepass, australische TFN, Visumsdaten, den Namen jedes Superfonds
          und die Bankverbindung, australisch oder im Ausland. Eine fehlende
          Mitgliedsnummer ist selten ein Problem, ein Fonds ordnet dich meist über TFN und Geburtsdatum
          zu.
        </p>
        <p className={blocks.text}>
          Woran Anträge hängen bleiben, ist die Beglaubigung. Liegen bei einem Fonds ab 5.000 $,
          verlangt er in der Regel beglaubigte Kopien von Reisepass und Visum, und das aus Deutschland zu
          organisieren dauert länger, als die meisten denken.
        </p>
      </Answer>
      <Answer id="how-long" heading="Wie lange dauert eine DASP-Auszahlung?" tone="white">
        <p className={blocks.text}>
          Die Auszahlung kommt meist innerhalb von 28 Tagen nach Genehmigung. Die Frist startet
          erst, wenn der Fonds oder das ATO alles hat. Ein Antrag ohne beglaubigtes Dokument liegt
          vorher wochenlang.
        </p>
        <p className={blocks.text}>
          Verteilt sich dein Geld auf mehrere Fonds, ist der Antrag so schnell wie der langsamste
          davon. Guthaben, die schon beim ATO liegen, werden dort beantragt,
          im selben Zeitrahmen.
        </p>
      </Answer>
      <Answer id="find-your-fund" heading="Was ist, wenn du deinen Superfonds nicht kennst?" tone="pale">
        <p className={blocks.text}>
          Das ist der Normalfall. Jeder Fonds, in den ein Arbeitgeber eingezahlt hat,
          ist mit deiner TFN verknüpft und lässt sich darüber finden, ohne Fondsnamen
          oder Mitgliedsnummer. Auch ans ATO abgegebene Guthaben tauchen in der Suche auf.
        </p>
        <p className={blocks.text}>
          Der Antrag selbst läuft nicht automatisch: Ein Konto zu finden, beantragt noch nichts, jeder Fonds
          braucht seinen eigenen Antrag. Übersehen wird fast immer der erste Job.
        </p>
      </Answer>
      <Answer id="from-overseas" heading="Kannst du deine Super aus Deutschland beantragen?" tone="white">
        <p className={blocks.text}>
          Ja, und anders geht es gar nicht. Eine DASP ist erst nach deiner Ausreise möglich, jeder
          Antrag kommt also aus dem Ausland. Dein Wohnort ändert am Anspruch nichts.
        </p>
        <p className={blocks.text}>
          Eines klärst du besser, bevor du dein australisches Konto schließt: Nicht jeder Fonds
          überweist elektronisch ins Ausland, manche schicken einen Scheck, der langsam einzulösen ist.
          Ob Deutschland die Zahlung besteuert, ist eine Frage für einen Berater bei dir vor Ort.
        </p>
      </Answer>
      <Answer id="dasp-vs-leaving" heading="Super zurückholen oder in Australien liegen lassen?" tone="pale">
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
      <Answer id="while-in-australia" heading="Kannst du deine Super beantragen, solange du noch in Australien bist?" tone="white">
        <p className={blocks.text}>
          Nein. Super ist gesperrt, solange du ein gültiges Visum hast und im Land bist. Mit einem Working-Holiday-Visum
          gibt es keine vorzeitige Auszahlung, auch nicht bei Geldnot.
        </p>
        <p className={blocks.text}>
          Fliegst du deutlich vor Ablauf deines Visums heim, kann das Department of Home Affairs das
          Visum nach deiner Ausreise annullieren, und das zieht den Antrag in der Regel vor.
        </p>
      </Answer>
      <Answer id="never-claimed" heading="Was passiert mit deiner Super, wenn du sie nie beantragst?" tone="pale">
        <p className={blocks.text}>
          Sie ist nicht weg, es gibt keine Frist. Etwa sechs Monate nach Visumsablauf und Ausreise
          muss ein Fonds unbeanspruchtes Guthaben ans ATO übertragen. Dort liegt es
          gebührenfrei auf deinen Namen, beantragbar noch Jahre später, zu denselben 65 %.
        </p>
        <p className={blocks.text}>
          Verloren ist nur, was Gebühren und Prämien in den Monaten vor der Übertragung genommen
          haben. Bei kleinen Beträgen ist das spürbar.
        </p>
      </Answer>
            <Answer id="with-us" heading="Selbst beantragen oder uns machen lassen" tone="amber">
        <p className={blocks.text}>Du kannst das selbst machen. Dann liegt bei dir: die Suche nach jedem Konto, das mit deiner TFN verknüpft ist, ATO-Guthaben eingeschlossen, die beglaubigten Kopien aus dem Ausland, einen eigenen Antrag pro Fonds, und das Nachfassen, wenn ein Fonds nicht mehr antwortet.</p>
        <p className={blocks.statement} style={{ color: 'var(--wht-ink)' }}>
          Unsere Garantie: Ist deine Steuerrückerstattung geringer als unsere Gebühr, erstatten wir dir nach dem Notice of Assessment die Differenz. Gibt es keine Rückerstattung oder schuldest du dem ATO stattdessen Geld, gilt die volle Gebühr.
        </p>
        <p className={blocks.text}>Jede Steuererklärung wird von einem registrierten australischen Tax Agent geprüft und freigegeben, bevor sie beim ATO eingereicht wird.</p>
        <div className={blocks.stack}>
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

      <Section eyebrow="Was kommt als Nächstes" title="Die 2 % Medicare Levy holt sich auch fast niemand zurück" titleId="next-title">
        <p className={blocks.text}>Ob sie bei dir überhaupt anfällt, hängt vom Einzelfall ab. Wegfallen kann sie mit einer Bescheinigung, die kaum jemand beantragt.</p>
        <LinkButton href="/de/medicare">Zur Medicare-Befreiung</LinkButton>
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

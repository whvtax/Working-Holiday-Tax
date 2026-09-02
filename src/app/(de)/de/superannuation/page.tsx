import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

/*
 * German mirror of the rebuilt superannuation answer hub. Same structure as
 * /superannuation: every H2 is a question, answered immediately in a complete
 * paragraph, sales layer underneath the answer rather than instead of it.
 */

const WA = waUrl({ topic: 'super', lang: 'de' })

export const metadata: Metadata = {
  title: 'DASP: Super aus Australien zurückholen',
  description:
    'Zurück aus Australien mit 417 oder 462 Visum? Deine Super holst du per DASP zurück: Anspruch, die 65 % Steuer, Unterlagen und Dauer.',
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
    languages: { 'en': '/superannuation', 'en-AU': '/superannuation', 'de': '/de/superannuation', 'ja': '/ja/superannuation', 'x-default': '/superannuation' },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'DASP: Super aus Australien zurückholen (2026)',
    description: 'Wer Anspruch hat, wie viel nach der 65 % Steuer übrig bleibt, welche Unterlagen du brauchst und wie lange es dauert.',
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
    mygov: 'Der Antrag nimmt einen Fonds nach dem anderen, und nur die, von denen du schon weißt.',
    us: 'Wir suchen jedes Konto, das mit deiner Steuernummer verknüpft ist, auch die, die ein Arbeitgeber ungefragt für dich eröffnet hat.',
  },
  {
    mygov: 'Nichts sagt dir, dass ein Guthaben den Fonds längst verlassen hat und als nicht abgeholte Super beim ATO liegt.',
    us: 'Etwa ein halbes Jahr nach Ablauf deines Visums landet es dort, deshalb sehen wir dort nach.',
  },
  {
    mygov: 'Der Antrag wird gegen deinen Visastatus geprüft, und ein Visum, das noch läuft, stoppt ihn sofort.',
    us: 'Wir prüfen alle drei Voraussetzungen vorher, damit du keine zwei Wochen in einen Antrag steckst, der noch gar nicht auszahlen kann.',
  },
  {
    mygov: 'Super ist ein Antrag, deine Steuererklärung ein zweiter. Verbunden wird das für dich nicht.',
    us: 'Auf der Steuerseite liegt meist der größere Teil des Geldes, deshalb machen wir beides.',
  },
]

const faqs = [
  {
    question: 'Kann ich meine Super einfach selbst beantragen?',
    answer:
      'Kannst du, es kostet nichts, und bei einem einzigen Fonds mit sauberen Unterlagen sagen wir dir das auch. Schwieriger wird es bei Super auf mehreren Fonds, bei einem Fonds, der beglaubigte Kopien aus dem Ausland verlangt, oder bei einem Visum, das noch läuft.',
  },
  {
    question: 'Bekommst du Superannuation, wenn du unter einer ABN gearbeitet hast?',
    answer:
      'In der Regel nicht. Super ist eine Arbeitgeberpflicht bei PAYG Anstellung, Arbeit auf Rechnung über eine ABN erzeugt meist keine. Ausnahme: du warst auf dem Papier Auftragnehmer, hast aber faktisch wie angestellt gearbeitet.',
  },
  {
    question: 'Ist eine DASP-Auszahlung dasselbe wie eine Steuerrückerstattung?',
    answer:
      'Nein, zwei verschiedene Zahlungen. Die Steuerrückerstattung ist zu viel gezahlte Lohnsteuer und kommt vom ATO nach der Steuererklärung. Die DASP ist die Super, die dein Arbeitgeber extra eingezahlt hat, und kommt vom Fonds. Meist steht dir beides zu.',
  },
  {
    question: 'Brauchst du deine TFN, um deine Super zu beantragen?',
    answer:
      'Ein Fonds erkennt dich meist auch über Namen, Geburtsdatum und Pass, eine verlorene TFN stoppt den Antrag also nicht. Aber nur über die TFN findet das ATO jedes deiner Superkonten. Sie wiederherzustellen geht schneller, als Fonds für Fonds zu suchen.',
  },
  {
    question: 'Warum sind es 65 % für Working Holiday Maker und 35 % für andere?',
    answer:
      'Die 65 % gelten per Gesetz für alle, die je ein 417 oder 462 Visum hatten, andere temporäre Aufenthalter zahlen 35 %. Der Satz folgt deiner Visumshistorie, nicht deinem letzten Visum, und gilt auch nach einem Wechsel.',
  },
  {
    question: 'Was, wenn ein Arbeitgeber überhaupt keine Super gezahlt hat?',
    answer:
      'Beantragen kannst du nur, was wirklich in einen Fonds eingezahlt wurde. Hat ein Arbeitgeber nicht gezahlt, kann das ATO das prüfen und für dich eintreiben. Das dauert deutlich länger und gehört vor den DASP-Antrag, sonst machst du alles doppelt.',
  },
  {
    question: 'Wirkt sich die Auszahlung auf deine Steuererklärung oder ein späteres Visum aus?',
    answer:
      'Auf beides nicht. Die einbehaltene Steuer ist endgültig, die DASP gehört also nicht in deine australische Steuererklärung, und ein späterer Visumantrag hängt in der Regel nicht daran. Einzige praktische Folge: deine Superkonten werden geschlossen.',
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
  name: 'DASP Superannuation Auszahlung für Working Holiday Maker',
  serviceType: 'Departing Australia Superannuation Payment (DASP) Antrag',
  description:
    'DASP-Anträge für Inhaber von 417 und 462 Visa: von der Suche nach jedem mit der TFN verknüpften Fonds bis zur Auszahlung auf ein australisches oder deutsches Konto.',
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
    { name: 'Jeder Fonds wird ermittelt', text: 'Ein Working-Holiday-Jahr mit mehreren Arbeitgebern bedeutet meist mehrere Fonds, einschließlich Guthaben, die ein Fonds bereits als unclaimed super an das ATO übertragen hat. Ein Antrag erreicht nur das Geld, auf das er zeigt.' },
    { name: 'Jeder Antrag wird vorbereitet und belegt', text: 'Jeder Fonds mit Guthaben wird einzeln beantragt, nach seinem eigenen Identitäts- und Beglaubigungsstandard. Was ein Fonds akzeptiert, akzeptiert der nächste nicht zwangsläufig.' },
    { name: 'Die Quellensteuer wird einbehalten', text: 'Auf den steuerpflichtigen Anteil einer DASP für Working Holiday Maker fallen 65 % an. Der Fonds behält sie ein und führt sie an das ATO ab, unabhängig davon, wer den Antrag stellt.' },
    { name: 'Das Guthaben wird ausgezahlt', text: 'Das verbleibende Guthaben wird ausgezahlt, und anders als eine Steuererstattung kann es auf ein ausländisches Konto gehen.' },
  ].map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
}

const H2: React.CSSProperties = {
  fontSize: 'clamp(21px,2.6vw,30px)',
  lineHeight: 1.16,
  letterSpacing: '-0.025em',
  // 12px unter einer Serif-Überschrift von 21 bis 30px ist eng. Jede H2 der
  // Seite läuft durch dieses Objekt, die Luft kommt also einmal rein.
  marginBottom: '16px',
  scrollMarginTop: '84px',
}
const BODY: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.7,
  color: '#2A3C34',
  marginBottom: '14px',
}

function Answer({
  id, heading, children, tint = false,
}: { id: string; heading: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className="py-8 lg:py-11" style={{ background: tint ? '#F5F9F7' : '#fff' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-serif font-black text-ink" style={H2}>{heading}</h2>
          {children}
        </div>
      </div>
    </section>
  )
}

export default function GermanSuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Brotkrümelnavigation" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/de" className="transition-colors hover:text-forest-500">Startseite</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Super auszahlen</span>
          </nav>

          <div className="max-w-[680px] mx-auto">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                Superannuation &middot; DASP
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(28px,3.4vw,44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Wie du deine Super nach der Abreise aus Australien zurückholst
            </h1>

            <p className="hero-sub font-semibold text-ink"
              style={{ fontSize: 'clamp(16px,1.6vw,18px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
              Dein Arbeitgeber hat sie zusätzlich zum Lohn eingezahlt, nie davon abgezogen. Sie liegt noch
              in Australien.
            </p>

            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '22px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="super" lang="de"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                Frag uns zu deiner Super
              </WaLink>
              <a href="#who-can-claim"
                className="inline-flex btn-ghost-dark justify-center items-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                Mit dem Anspruch anfangen
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#4C6459' }}>
              Antwort in etwa einer Stunde.
            </p>
          </div>
        </div>
      </section>

      {/* ── DER EINWAND, KONKRET ZUR SUPER ─────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              Selbst machen
            </p>

            <h2 className="font-serif font-black text-ink" style={H2}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>Ein DASP-Antrag geht an genau einen Fonds.{' '}</span>
              <span style={{ display: 'block' }}>Nach vier Casual Jobs sind es oft vier.{' '}</span>
            </h2>

            <p style={{ ...BODY, color: '#4C6459', maxWidth: '56ch', marginBottom: '20px' }}>
              Zwei davon wurden für dich eröffnet, ohne dass du etwas ausgesucht hast.
            </p>

            {/* Die beiden Beschriftungen standen auf allen acht Zellen, auf dem
                Handy also achtmal dieselben Wörter untereinander. Sie stehen
                jetzt nur noch in der ersten Zeile: auf dem Desktop als
                Spaltenüberschrift, auf dem Handy als Legende. Den Rest tragen
                der Wechsel im Hintergrund und das schwerere Gewicht. Copy
                unverändert. */}
            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '13px 16px', background: '#FFFFFF' }}>
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                        Im ATO Portal
                      </p>
                    )}
                    <p style={{ ...BODY, marginBottom: 0, overflowWrap: 'break-word', hyphens: 'auto' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '13px 16px', background: '#F2FAF7' }}>
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                        Mit uns
                      </p>
                    )}
                    <p style={{ ...BODY, color: '#080F0D', fontWeight: 500, marginBottom: 0, overflowWrap: 'break-word', hyphens: 'auto' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '48ch', fontWeight: 700 }}>
              Du wirst dich nie bei myGov einloggen und keinen Ausweis verknüpfen müssen. Wir regeln das direkt mit dem ATO.
            </p>
          </div>
        </div>
      </section>

      <Answer id="who-can-claim" heading="Wer kann eine DASP-Auszahlung beantragen?">
        <p style={BODY}>
          Du kannst eine Departing Australia Superannuation Payment beantragen, wenn du mit einem
          temporären Visum gearbeitet hast, das Visum abgelaufen oder annulliert ist und du das Land
          endgültig verlassen hast. Alle drei müssen gleichzeitig zutreffen. Australische und
          neuseeländische Staatsbürger und Permanent Residents können nicht beantragen.
        </p>
        <p style={BODY}>
          Dein Visastatus wird beim Antrag direkt mit dem Department of Home Affairs abgeglichen, du
          musst nichts extra nachweisen. Ein Bridging Visum oder ein noch gültiges Visum, mit dem du im
          Land bist, blockiert den Antrag.
        </p>
      </Answer>

      <Answer id="how-much" heading="Wie viel Super bekommst du wirklich zurück?" tint>
        <p style={BODY}>
          Bei Working Holiday Makern werden 65 % Quellensteuer auf den steuerpflichtigen Anteil der DASP
          einbehalten, bei dir kommen also rund 35 Cent pro Dollar an. Der Satz steht im Gesetz, gilt für
          jeden, der irgendwann ein 417 oder 462 Visum hatte, und lässt sich weder durch Berater noch
          durch Warten senken.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ margin: '20px 0 14px' }}>
          {[
            { bal: '3.000 $', net: '1.050 $', note: 'ein paar Monate Casual-Arbeit' },
            { bal: '6.000 $', net: '2.100 $', note: 'etwa sechs Monate Vollzeit' },
            { bal: '10.000 $', net: '3.500 $', note: 'ein ganzes Working-Holiday-Jahr' },
          ].map((r, i) => (
            <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #E2EFE9', textAlign: 'center' }}>
              <p className="font-medium" style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4C6459', marginBottom: '6px' }}>
                Super-Guthaben
              </p>
              <p className="font-semibold text-ink" style={{ fontSize: '17px', marginBottom: '10px' }}>{r.bal}</p>
              <p className="font-serif font-black" style={{ fontSize: 'clamp(26px,3vw,33px)', color: '#0B5240', lineHeight: 1, marginBottom: '8px' }}>
                {r.net}
              </p>
              <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.55 }}>
                ausgezahlt &middot; {r.note}
              </p>
            </div>
          ))}
        </div>

        <p style={{ ...BODY, fontSize: '13px', color: '#4C6459' }}>
          Beträge nach der 65 % DASP Quellensteuer des ATO, bei rein versteuerten Beiträgen. Auf einen
          unversteuerten Anteil, den manche Fonds führen, gilt ein höherer Satz. Sieh die Zahlen als
          Beispiel, nicht als Angebot.
        </p>
      </Answer>

      <Answer id="documents" heading="Welche Unterlagen brauchst du für den DASP-Antrag?">
        <p style={BODY}>
          Du brauchst Reisepass, australische TFN, Visumsdaten, den Namen jedes Superfonds
          und die Bankverbindung, australisch oder deutsch. Eine fehlende
          Mitgliedsnummer ist selten ein Problem, ein Fonds ordnet dich meist über TFN und Geburtsdatum
          zu.
        </p>
        <p style={BODY}>
          Woran Anträge hängen bleiben, ist die Beglaubigung. Ab 5.000 $ bei einem Fonds
          verlangt er in der Regel beglaubigte Kopien von Reisepass und Visum, und das aus Deutschland zu
          organisieren dauert länger, als die meisten denken.
        </p>
      </Answer>

      <Answer id="how-long" heading="Wie lange dauert eine DASP-Auszahlung?" tint>
        <p style={BODY}>
          Die Auszahlung kommt meist innerhalb von 28 Tagen nach Genehmigung. Die Frist startet
          erst, wenn der Fonds oder das ATO alles hat. Ein Antrag ohne beglaubigtes Dokument liegt
          vorher wochenlang.
        </p>
        <p style={BODY}>
          Verteilt sich dein Geld auf mehrere Fonds, ist der Antrag so schnell wie der langsamste
          davon. Guthaben, die schon beim ATO liegen, beantragst du dort,
          im selben Zeitrahmen.
        </p>
      </Answer>

      <Answer id="find-your-fund" heading="Was ist, wenn du deinen Superfonds nicht kennst?">
        <p style={BODY}>
          Das ist der Normalfall. Jeder Fonds, in den ein Arbeitgeber eingezahlt hat,
          ist mit deiner TFN verknüpft und lässt sich darüber finden, ohne Fondsnamen
          oder Mitgliedsnummer. Auch ans ATO abgegebene Guthaben tauchen in der Suche auf.
        </p>
        <p style={BODY}>
          Nicht automatisch ist der Antrag selbst: Ein Konto zu finden beantragt gar nichts, jeder Fonds
          braucht seinen eigenen Antrag. Übersehen wird fast immer der erste Job.
        </p>
      </Answer>

      <Answer id="from-overseas" heading="Kannst du deine Super aus Deutschland beantragen?" tint>
        <p style={BODY}>
          Ja, und anders geht es gar nicht. Eine DASP ist erst nach deiner Ausreise möglich, jeder
          Antrag kommt also aus dem Ausland. Dein Wohnort ändert am Anspruch nichts.
        </p>
        <p style={BODY}>
          Eines klärst du besser, bevor du dein australisches Konto schließt: Nicht jeder Fonds
          überweist elektronisch ins Ausland, manche schicken einen Scheck, der langsam einzulösen ist.
          Ob Deutschland die Zahlung besteuert, ist eine Frage für einen Berater bei dir vor Ort.
        </p>
      </Answer>

      <Answer id="dasp-vs-leaving" heading="Super zurückholen oder in Australien liegen lassen?">
        <p style={BODY}>
          Für fast jeden Working Holiday Maker ist Zurückholen die bessere Wahl. Ein liegen
          gelassenes Guthaben bekommt keine Beiträge mehr, zahlt aber weiter Gebühren und oft
          Versicherungsprämien, die dir nichts nützen.
        </p>
        <p style={BODY}>
          Das Gegenargument trägt nur, wenn du dauerhaft zum Leben und Arbeiten zurückkehren willst.
          Warten senkt die 65 % nicht.{' '}
          <Link href="/de/blog/dasp-vs-leaving-super-in-australia-pros-cons" className="font-semibold"
            style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            Der ausführliche Vergleich steht hier
          </Link>.
        </p>
      </Answer>

      <Answer id="while-in-australia" heading="Kannst du deine Super beantragen, solange du noch in Australien bist?" tint>
        <p style={BODY}>
          Nein. Super ist gesperrt, solange du ein gültiges Visum hast und im Land bist. Auf einem Working
          Holiday Visum gibt es keine vorzeitige Auszahlung, auch nicht bei Geldnot.
        </p>
        <p style={BODY}>
          Fliegst du deutlich vor Ablauf deines Visums heim, kann das Department of Home Affairs das
          Visum nach deiner Ausreise annullieren, und das zieht den Antrag in der Regel vor.
        </p>
      </Answer>

      <Answer id="never-claimed" heading="Was passiert mit deiner Super, wenn du sie nie beantragst?">
        <p style={BODY}>
          Sie ist nicht weg, es gibt keine Frist. Etwa sechs Monate nach Visumsablauf und Ausreise
          muss ein Fonds unbeanspruchtes Guthaben ans ATO übertragen. Dort liegt es
          gebührenfrei auf deinen Namen, beantragbar noch Jahre später, zu denselben 65 %.
        </p>
        <p style={BODY}>
          Verloren ist nur, was Gebühren und Prämien in den Monaten vor der Übertragung genommen
          haben. Bei kleinen Beträgen ist das spürbar.
        </p>
      </Answer>

      <Answer id="with-us" heading="Selbst beantragen oder uns machen lassen" tint>
        <p style={BODY}>
          Du kannst das selbst machen. Abgeben würdest du die Suche nach jedem Konto, das mit deiner
          Steuernummer verknüpft ist, ATO-Guthaben eingeschlossen, die beglaubigten Kopien aus dem
          Ausland, einen eigenen Antrag pro Fonds, und das Nachfassen, wenn ein Fonds nicht mehr
          antwortet.
        </p>

        <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #C8EAE0', margin: '22px 0 20px' }}>
          <p className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.5, marginBottom: '8px' }}>
            Wir beginnen mit einem Tax Assessment, das deine gesamte Situation prüft und dir dein voraussichtliches Steuerergebnis zeigt, damit du genau weißt, wo du stehst, bevor du entscheidest, ob du abgeben möchtest.
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#4C6459' }}>
            Von einem registrierten Steueragenten geprüft und freigegeben,
            bevor es beim ATO eingereicht wird.
          </p>
        </div>

        <WaLink href={WA} position="section" topic="super" lang="de"
          className="btn-primary flex justify-center"
          style={{ minHeight: '54px', width: '100%', maxWidth: '360px', fontSize: '15px', borderRadius: '100px' }}>
          Schreib uns auf WhatsApp
        </WaLink>
        <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '10px' }}>
          Antwort in etwa einer Stunde.
        </p>
      </Answer>

      <section className="py-10 lg:py-14" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '18px' }}>
              Weitere Fragen zur DASP-Auszahlung
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '16px' }}>
            Ein Teil des Antrags im Detail
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/de/blog/how-long-does-dasp-take', label: 'Wie lange ein DASP-Antrag dauert, Schritt für Schritt' },
              { href: '/de/blog/dasp-documents-required', label: 'Welche Unterlagen ein DASP-Antrag braucht' },
              { href: '/de/blog/dasp-tax-rate-65-percent-explained', label: 'Warum DASP mit 65 % besteuert wird und was bleibt' },
              { href: '/de/blog/dasp-rejected-what-to-do', label: 'Was tun, wenn dein DASP-Antrag abgelehnt wird' },
              { href: '/de/blog/super-multiple-funds-consolidation', label: 'Beantragen, wenn deine Super auf mehreren Fonds liegt' },
              { href: '/de/blog/dasp-vs-leaving-super-in-australia-pros-cons', label: 'Jetzt holen oder liegen lassen: der Vergleich' },
            ].map(g => (
              <Link key={g.href} href={g.href}
                className="block rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '16px', fontSize: '14px', lineHeight: 1.5, color: '#080F0D', minHeight: '44px' }}>
                {g.label}
              </Link>
            ))}
          </div>
        </div>
        </div>
      </section>

      <NextStep
        eyebrow="Was kommt als Nächstes"
        heading="Die 2 % Medicare Levy holt sich auch fast niemand zurück"
        body="Die meisten mit 417 oder 462 Visum schulden sie gar nicht. Sie fällt mit einer Bescheinigung weg, die kaum jemand beantragt."
        cta="Zur Medicare-Befreiung"
        href="/de/medicare"
      />

      <MobileCta href={WA} lang="de" topic="super" />
    </>
  )
}

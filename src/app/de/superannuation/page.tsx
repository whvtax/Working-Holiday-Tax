import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '../../HomeWa'
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
    languages: { 'en-AU': '/superannuation', 'de': '/de/superannuation', 'ja': '/ja/superannuation', 'x-default': '/superannuation' },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'DASP: Super aus Australien zurückholen (2026)',
    description: 'Wer Anspruch hat, wie viel nach der 65 % Steuer übrig bleibt, welche Unterlagen du brauchst und wie lange es dauert.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'DASP: Super aus Australien zurückholen',
    description: 'Anspruch, 65 % Steuer, Unterlagen, Dauer und mehrere Fonds, beantwortet.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const JUMP = [
  { id: 'who-can-claim',      label: 'Anspruch' },
  { id: 'how-much',           label: 'Wie viel' },
  { id: 'documents',          label: 'Unterlagen' },
  { id: 'how-long',           label: 'Dauer' },
  { id: 'find-your-fund',     label: 'Fonds finden' },
  { id: 'from-overseas',      label: 'Aus Deutschland' },
  { id: 'dasp-vs-leaving',    label: 'Holen oder lassen' },
  { id: 'while-in-australia', label: 'Noch in Australien' },
  { id: 'never-claimed',      label: 'Nie beantragt' },
  { id: 'with-us',            label: 'Selbst oder wir' },
]

/**
 * Der Einwand, mit dem jeder Lead ankommt, hier konkret zur Super.
 *
 * Der letzte Abschnitt der Seite führt ihn aus. Das hier ist die kompakte
 * Fassung, weit oben, weil der Leser genau damit ankommt. Jede Zeile handelt von
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
    us: 'Etwa ein halbes Jahr nach Ablauf deines Visums landet es genau dort, deshalb sehen wir auch dort nach.',
  },
  {
    mygov: 'Der Antrag wird gegen deinen Visastatus geprüft, und ein Visum, das noch läuft, stoppt ihn sofort.',
    us: 'Wir prüfen alle drei Voraussetzungen vorher, damit du keine zwei Wochen in einen Antrag steckst, der noch gar nicht auszahlen kann.',
  },
  {
    mygov: 'Super ist ein Antrag, deine Steuererklärung ein zweiter. Verbunden wird das für dich nicht.',
    us: 'Auf der Steuerseite liegt meist der größere Teil des Geldes, deshalb machen wir beides und nichts bleibt liegen.',
  },
]

const faqs = [
  {
    question: 'Kann ich meine Super nicht einfach selbst über myGov beantragen?',
    answer:
      'Kannst du, und wenn du einen einzigen Fonds hattest, deine Unterlagen sauber sind und nichts nachgefragt wird, ist genau das sinnvoll, und wir sagen dir das auch. Der Grund, warum es meistens nicht so einfach ist: Gelegenheits- und Saisonarbeit verteilt Super auf Konten, an deren Eröffnung sich niemand erinnert, und der Antrag nimmt einen Fonds nach dem anderen, und nur die, die du benennen kannst. Er sagt dir nicht, dass ein Guthaben bereits als nicht abgeholte Super beim ATO liegt, wo es etwa ein halbes Jahr nach Ablauf deines Visums landet. Er sagt dir nicht, dass Beglaubigungen aus dem Ausland, eine alte Passnummer oder eine Adresse, an der du seit zwei Jahren nicht mehr wohnst, Anträge zurück auf Anfang schicken. Und er verbindet den Antrag nicht mit deiner Steuererklärung, auf der meist der größere Teil des Geldes liegt. Einreichen ist der einfache Teil. Du wirst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden müssen, welches Formular welches ist. Wir regeln das direkt mit dem ATO.',
  },
  {
    question: 'Bekommst du Superannuation, wenn du unter einer ABN gearbeitet hast?',
    answer:
      'In der Regel nicht. Superannuation ist eine Arbeitgeberpflicht, die an eine PAYG Anstellung gebunden ist, deshalb erzeugt Gig, Rideshare oder Freelance Arbeit auf Rechnung über eine ABN normalerweise keine Super. Die Ausnahme: du warst formal Auftragnehmer, hast aber faktisch wie ein Angestellter gearbeitet, mit festen Zeiten, gestelltem Werkzeug und ohne die Möglichkeit, jemand anderen zu schicken. Dann kann trotzdem ein Anspruch bestehen, und das lohnt sich zu prüfen statt anzunehmen.',
  },
  {
    question: 'Ist eine DASP-Auszahlung dasselbe wie eine Steuerrückerstattung?',
    answer:
      'Nein, das sind zwei verschiedene Zahlungen aus zwei verschiedenen Töpfen. Die Steuerrückerstattung ist die Differenz zwischen der Steuer, die dir vom Lohn abgezogen wurde, und der Steuer, die du tatsächlich geschuldet hast. Sie kommt vom ATO, nachdem eine Steuererklärung eingereicht wurde. Die Departing Australia Superannuation Payment ist die Auszahlung der Altersvorsorge, die dein Arbeitgeber zusätzlich zum Lohn eingezahlt hat, und sie kommt von deinem Superfonds. Den meisten Working Holiday Makern steht beides zu.',
  },
  {
    question: 'Brauchst du deine TFN, um deine Super zu beantragen?',
    answer:
      'Ein Fonds kann dich meistens auch ohne sie identifizieren, über Namen, Geburtsdatum und Passdaten. Eine verlorene TFN stoppt den Antrag also nicht. Praktisch ist sie trotzdem entscheidend, denn über die TFN verknüpft das ATO jedes Superkonto mit dir, und das ist der einzige verlässliche Weg, vergessene Fonds zu finden. Eine verlorene TFN lässt sich wiederherstellen, und das zuerst zu tun ist normalerweise schneller, als Fonds für Fonds zu suchen.',
  },
  {
    question: 'Warum sind es 65 % für Working Holiday Maker und 35 % für andere?',
    answer:
      'Der Satz von 65 % ist gesetzlich genau für alle festgelegt, die jemals ein Visum der Klasse 417 oder 462 hatten. Andere temporäre Aufenthalter, etwa Studierende oder viele gesponserte Arbeitskräfte, zahlen stattdessen 35 % auf den versteuerten Anteil. Ein Working Holiday Visum zu irgendeinem Zeitpunkt deines Aufenthalts bringt die gesamte Auszahlung auf den höheren Satz, auch wenn du danach auf ein anderes Visum gewechselt bist. Der Satz folgt deiner Visumshistorie, nicht deinem letzten Visum, und kein Berater kann ihn senken.',
  },
  {
    question: 'Was, wenn ein Arbeitgeber überhaupt keine Super gezahlt hat?',
    answer:
      'Beantragen kannst du nur, was tatsächlich in einen Fonds eingezahlt wurde. Wenn ein Arbeitgeber hätte einzahlen müssen und es nicht getan hat, ist das ein Fall von nicht gezahlter Superannuation Guarantee. Das ATO kann das prüfen und das Geld für dich eintreiben. Das ist ein eigenes Verfahren, es dauert deutlich länger, und es lohnt sich, das vor dem DASP-Antrag anzusprechen: Beiträge, die erst nach Schließung deiner Konten eingehen, bedeuten den ganzen Antrag ein zweites Mal.',
  },
  {
    question: 'Wirkt sich die Auszahlung auf deine Steuererklärung oder ein späteres Visum aus?',
    answer:
      'Auf beides nicht. Eine DASP-Auszahlung gehört nicht in deine australische Steuererklärung, weil die vor der Auszahlung einbehaltene Steuer eine endgültige Steuer ist und die Zahlung in Australien kein steuerpflichtiges Einkommen darstellt. Auf spätere Visumanträge hat sie ebenfalls keinen Einfluss. Die einzige praktische Folge ist, dass deine Superkonten geschlossen werden. Kommst du zum Arbeiten nach Australien zurück, fängst du mit einem neuen Fonds neu an.',
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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  inLanguage: 'de',
  name: 'So holst du deine Superannuation nach der Abreise aus Australien zurück (DASP)',
  description:
    'Das DASP Verfahren für Working Holiday Maker mit einem Visum der Klasse 417 oder 462, vom Anspruch bis zur Auszahlung.',
  totalTime: 'P28D',
  step: [
    { name: 'Anspruch prüfen', text: 'Dein Visum muss abgelaufen oder annulliert sein und du musst Australien dauerhaft verlassen haben. Beides muss gleichzeitig zutreffen.' },
    { name: 'Unterlagen sammeln', text: 'Reisepass, australische TFN, Visumsdaten, Name und Mitgliedsnummer jedes Superfonds sowie das Konto für die Auszahlung.' },
    { name: 'Jeden Fonds finden', text: 'Alle mit deiner TFN verknüpften Superkonten suchen, einschließlich Guthaben, die ein Fonds bereits an das ATO übertragen hat.' },
    { name: 'Bei jedem Fonds beantragen', text: 'Pro Fonds mit Guthaben geht ein eigener DASP-Antrag raus, oder an das ATO, wenn das Guthaben dort bereits liegt.' },
    { name: 'Quellensteuer wird einbehalten', text: 'Working Holiday Maker zahlen 65 % auf den steuerpflichtigen Anteil. Der Fonds behält sie ein und führt sie an das ATO ab.' },
    { name: 'Auszahlung erhalten', text: 'Die Zahlung kommt in der Regel innerhalb von 28 Tagen nach Genehmigung, auf ein australisches oder ein ausländisches Konto.' },
  ].map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
}

const H2: React.CSSProperties = {
  fontSize: 'clamp(21px,2.6vw,30px)',
  lineHeight: 1.16,
  letterSpacing: '-0.025em',
  marginBottom: '12px',
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
        <div className="max-w-[680px]">
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

          <div className="max-w-[680px]">

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

      {/* ── JUMP NAV ───────────────────────────────────────────────────────── */}
      <nav aria-label="Auf dieser Seite"
        style={{ background: '#0B5240', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="max-w-[1280px] mx-auto">
          <ul style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '12px 20px', margin: 0, listStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            {JUMP.map(j => (
              <li key={j.id} style={{ flex: '0 0 auto' }}>
                <a href={`#${j.id}`} className="inline-flex items-center"
                  style={{ minHeight: '44px', padding: '0 16px', borderRadius: '999px', fontSize: '13.5px', whiteSpace: 'nowrap', color: '#EAF6F1', border: '1px solid rgba(200,234,224,0.35)' }}>
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── DER EINWAND, KONKRET ZUR SUPER ─────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px]">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              Selbst machen
            </p>

            <h2 className="font-serif font-black text-ink" style={H2}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>Ein DASP-Antrag geht an genau einen Fonds.{' '}</span>
              <span style={{ display: 'block' }}>Nach vier Casual Jobs sind es oft vier.{' '}</span>
            </h2>

            <p style={{ ...BODY, color: '#4C6459', maxWidth: '56ch', marginBottom: '20px' }}>
              Zwei davon wurden für dich eröffnet, ohne dass du etwas ausgesucht hast, und im Portal steht davon
              nichts.
            </p>

            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                      Im ATO Portal
                    </p>
                    <p style={{ ...BODY, marginBottom: 0, overflowWrap: 'break-word', hyphens: 'auto' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                      Mit uns
                    </p>
                    <p style={{ ...BODY, color: '#080F0D', fontWeight: 500, marginBottom: 0, overflowWrap: 'break-word', hyphens: 'auto' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '48ch', fontWeight: 700 }}>
              Du wirst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden müssen, welches
              Formular welches ist. Wir regeln das direkt mit dem ATO.
            </p>
          </div>
        </div>
      </section>

      <Answer id="who-can-claim" heading="Wer kann eine DASP-Auszahlung beantragen?">
        <p style={BODY}>
          Du kannst eine Departing Australia Superannuation Payment beantragen, wenn du in Australien mit
          einem temporären Visum gearbeitet hast, dieses Visum abgelaufen oder annulliert ist und du das
          Land dauerhaft verlassen hast. Alle drei Punkte müssen gleichzeitig zutreffen. Working Holiday
          Maker mit einem 417 oder 462 Visum haben Anspruch, ebenso die meisten anderen temporären
          Visuminhaber, etwa Studierende und gesponserte Arbeitskräfte. Australische und neuseeländische
          Staatsbürger und Personen mit permanentem Aufenthalt können nicht beantragen, weil ihre Super bis
          zur Rente gesperrt bleibt.
        </p>
        <p style={BODY}>
          Dein Visastatus wird beim Antrag direkt mit den Daten des Department of Home Affairs
          abgeglichen, du musst also nichts gesondert nachweisen. Ein Bridging Visum oder ein weiterhin
          gültiges Visum, mit dem du im Land bist, blockiert den Antrag, bis sich das ändert.
        </p>
      </Answer>

      <Answer id="how-much" heading="Wie viel Super bekommst du wirklich zurück?" tint>
        <p style={BODY}>
          Bei Working Holiday Makern werden 65 % Quellensteuer auf den steuerpflichtigen Anteil der DASP
          einbehalten, es kommen also rund 35 Cent pro Dollar bei dir an. Aus einem Guthaben von 10.000 $
          werden etwa 3.500 $. Der Satz steht im Gesetz, gilt für jeden, der irgendwann ein 417 oder 462
          Visum hatte, und lässt sich weder durch einen Berater noch durch Warten senken. Was deinen Betrag
          verändert: die vergessenen Konten zu finden und zu beantragen, bevor Gebühren und
          Versicherungsprämien das Guthaben aufzehren.
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
          Beträge nach der 65 % DASP Quellensteuer des ATO, bei einem Guthaben aus rein versteuerten
          Beiträgen. Auf einen unversteuerten Anteil, den manche Fonds führen, wird ein höherer Satz
          angewendet. Sieh die Zahlen also als Beispiel, nicht als Angebot.
        </p>
      </Answer>

      <Answer id="documents" heading="Welche Unterlagen brauchst du für den DASP-Antrag?">
        <p style={BODY}>
          Du brauchst deinen Reisepass, deine australische Tax File Number, deine Visumsdaten, den Namen
          jedes Superfonds und, falls du sie noch hast, die jeweilige Mitgliedsnummer. Dazu die
          Bankverbindung für die Auszahlung, australisch oder deutsch. Eine fehlende Mitgliedsnummer ist
          selten ein echtes Problem, weil ein Fonds dich normalerweise über TFN und Geburtsdatum zuordnen
          kann.
        </p>
        <p style={BODY}>
          Woran Anträge hängen bleiben, ist die Beglaubigung. Liegt bei einem einzelnen Fonds ein Guthaben
          von 5.000 $ oder mehr, verlangt er in der Regel beglaubigte Kopien von Reisepass und Visum statt
          eines Fotos, und das aus Deutschland zu organisieren dauert länger, als die meisten denken. Das
          vorher zu klären statt nach der ersten Ablehnung ist der Unterschied zwischen einem Antrag, der
          einen Monat läuft, und einem, der sechs braucht.
        </p>
      </Answer>

      <Answer id="how-long" heading="Wie lange dauert eine DASP-Auszahlung?" tint>
        <p style={BODY}>
          Die Auszahlung kommt in der Regel innerhalb von 28 Tagen nach Genehmigung des Antrags. Die Frist
          startet nicht, wenn du absendest, sondern wenn der Fonds oder das ATO alles hat, was gebraucht
          wird. Ein Antrag ohne beglaubigtes Dokument oder mit
          einer Adresse, die nicht zu den Daten des Fonds passt, kann wochenlang liegen, bevor die 28 Tage
          anfangen.
        </p>
        <p style={BODY}>
          Verteilt sich dein Geld auf mehrere Fonds, ist der Antrag nur so schnell wie der langsamste
          davon, denn jeder Fonds prüft und zahlt für sich. Guthaben, die schon an das ATO übertragen
          wurden, beantragst du stattdessen dort, mit demselben Zeitrahmen.
        </p>
      </Answer>

      <Answer id="find-your-fund" heading="Was ist, wenn du deinen Superfonds nicht kennst?">
        <p style={BODY}>
          Das ist der Normalfall, kein Sonderfall. Jeder Fonds, in den ein Arbeitgeber eingezahlt hat, ist
          mit deiner Tax File Number verknüpft, die Konten lassen sich also über die TFN finden, ohne dass
          du dich an einen Arbeitgeber, einen Fondsnamen oder eine Mitgliedsnummer erinnerst. Guthaben, die
          ein Fonds bereits an das ATO abgegeben hat, tauchen in derselben Suche auf.
        </p>
        <p style={BODY}>
          Nicht automatisch ist der Antrag selbst. Ein Konto zu finden beantragt gar nichts, und jeder
          Fonds braucht weiterhin seinen eigenen Antrag mit eigenen Unterlagen. Übersehen wird fast immer
          der erste Job, angenommen bevor man wusste, was Super überhaupt ist.
        </p>
      </Answer>

      <Answer id="from-overseas" heading="Kannst du deine Super aus Deutschland beantragen?" tint>
        <p style={BODY}>
          Ja, und anders geht es gar nicht. Eine DASP ist erst möglich, nachdem du Australien verlassen
          hast, jeder Antrag kommt also aus dem Ausland, und wo du jetzt wohnst, ändert an deinem Anspruch
          nichts. Das ganze Verfahren läuft über Unterlagen und lässt sich von zu Hause aus erledigen.
        </p>
        <p style={BODY}>
          Zwei Dinge klärst du besser, bevor du dein australisches Konto schließt. Nicht jeder Fonds
          überweist elektronisch auf ein ausländisches Konto, manche schicken stattdessen einen Scheck, was
          langsam und umständlich einzulösen ist. Und ob Deutschland die Zahlung besteuert, richtet sich
          nach deutschem Recht, nicht nach australischem. Das ist eine Frage für einen Berater bei dir vor
          Ort.
        </p>
      </Answer>

      <Answer id="dasp-vs-leaving" heading="Super zurückholen oder in Australien liegen lassen?">
        <p style={BODY}>
          Für fast jeden Working Holiday Maker ist Zurückholen die bessere Entscheidung. Ein liegen
          gelassenes Guthaben bekommt keine Beiträge mehr, zahlt aber weiter Verwaltungsgebühren und in
          vielen Fonds Versicherungsprämien, die dir aus dem Ausland nichts nützen. Ein kleines Guthaben
          schrumpft dadurch Monat für Monat, während du nichts davon hast.
        </p>
        <p style={BODY}>
          Das Gegenargument ist schmal. Es trägt nur, wenn du vorhast, dauerhaft zum Leben und Arbeiten
          nach Australien zurückzukehren, weil das Konto dann wieder Beiträge bekäme. Warten senkt die 65 %
          nicht und lässt das Guthaben auch nicht wachsen.{' '}
          <Link href="/de/blog/dasp-vs-leaving-super-in-australia-pros-cons" className="font-semibold"
            style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            Der ausführliche Vergleich steht hier
          </Link>.
        </p>
      </Answer>

      <Answer id="while-in-australia" heading="Kannst du deine Super beantragen, solange du noch in Australien bist?" tint>
        <p style={BODY}>
          Nein. Super ist gesperrt, solange du ein gültiges Visum hast und im Land bist, und auf einem
          Working Holiday Visum gibt es keine vorzeitige Auszahlung, weder wegen eines gekündigten Jobs
          noch wegen des Rückflugs oder einer finanziellen Notlage. Beide Bedingungen müssen zusammen
          erfüllt sein: du musst ausgereist sein, und das Visum, mit dem du gearbeitet hast, muss
          abgelaufen oder annulliert sein.
        </p>
        <p style={BODY}>
          Wenn du deutlich vor Ablauf deines Visums heimfliegst, musst du die Restlaufzeit nicht abwarten.
          Nach deiner Ausreise kannst du das Department of Home Affairs bitten, das verbleibende Visum zu
          annullieren. Damit bist du sofort antragsberechtigt statt erst Monate später.
        </p>
      </Answer>

      <Answer id="never-claimed" heading="Was passiert mit deiner Super, wenn du sie nie beantragst?">
        <p style={BODY}>
          Sie ist nicht weg, und es gibt keine Frist. Etwa sechs Monate nachdem dein Visum abgelaufen ist
          und du das Land verlassen hast, muss ein Fonds ein unbeanspruchtes Guthaben an das ATO
          übertragen. Dort liegt es auf deinen Namen, gebührenfrei, und bleibt beantragbar. Leute stellen
          ihren DASP-Antrag Jahre nach der Rückkehr und bekommen ausgezahlt, zum selben Satz von 65 % wie
          alle anderen.
        </p>
        <p style={BODY}>
          Verloren ist nur, was diese Gebühren und Prämien in den Monaten
          vor der Übertragung aus dem Guthaben genommen haben. Bei einem kleinen Guthaben ist das ein
          spürbarer Anteil, und zurückholen kann das niemand. Das ist das einzige echte Argument, früher
          statt später zu beantragen, und es reicht.
        </p>
      </Answer>

      <Answer id="with-us" heading="Selbst beantragen oder uns machen lassen" tint>
        <p style={BODY}>
          Du kannst den DASP-Antrag selbst über das Online-System des ATO stellen, und das kostet nichts.
          Wenn du einen Fonds hattest, deine Unterlagen vollständig sind und nichts nachgefragt wird, ist
          genau das der vernünftige Weg, und wir sagen dir das auch so. Nichts auf dieser Seite steht
          hinter einer Wand.
        </p>
        <p style={BODY}>
          Wir übernehmen den anderen Teil. Jedes mit deiner TFN verknüpfte Konto finden, auch Guthaben, die
          schon beim ATO liegen. Beglaubigungen aus dem Ausland organisieren. Hinter Fonds her sein, die
          nicht mehr antworten. Dafür sorgen, dass eine alte Passnummer oder eine Adresse, in der du seit
          2023 nicht mehr wohnst, den Antrag nicht wieder auf null setzt. Working-Holiday-Steuer ist das
          Einzige, was wir machen, uns ist davon nichts fremd.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ margin: '22px 0' }}>
          <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
            <p className="font-semibold" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4C6459', marginBottom: '14px' }}>
              Allein
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Fonds aus vier oder fünf Casual Jobs aufspüren',
                'Beglaubigte Kopien aus dem Ausland organisieren',
                'Ein eigener Antrag pro Fonds',
                'Niemand, der einem stummen Fonds hinterherläuft',
              ].map((t, i) => (
                <li key={i} style={{ fontSize: '14px', lineHeight: 1.6, color: '#2A3C34' }}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl" style={{ padding: '20px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
            <p className="font-semibold" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#0B5240', marginBottom: '14px' }}>
              Mit uns
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Jeder mit deiner TFN verknüpfte Fonds durchsucht, ATO-Guthaben eingeschlossen',
                'Unterlagen geprüft, bevor irgendetwas eingereicht wird',
                'Ein Ansprechpartner für alle Fonds',
                'Begleitet, bis das Geld auf deinem Konto ist',
              ].map((t, i) => (
                <li key={i} className="font-semibold" style={{ fontSize: '14px', lineHeight: 1.6, color: '#080F0D' }}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #C8EAE0', marginBottom: '20px' }}>
          <p className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.5, marginBottom: '8px' }}>
            Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf.
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#4C6459' }}>
            Von unserem Team vorbereitet, von einem registrierten Steuerberater geprüft und freigegeben,
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
          <div className="max-w-[760px]">
            <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '18px' }}>
              Weitere Fragen zur DASP-Auszahlung
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '16px' }}>
            Ein Teil des Antrags im Detail
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px]">
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

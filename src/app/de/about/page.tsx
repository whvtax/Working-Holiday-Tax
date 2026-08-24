import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { ReviewsGate } from '@/components/ui/ReviewsGate'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Über uns: 417 und 462, sonst nichts',
  description: 'Working-Holiday-Steuer ist das Einzige, was wir machen. Jeder Kunde ist auf einem 417 oder 462. Vom ersten Payslip bis zum Rückflug, immer dasselbe Jahr.',
  keywords: [
    'Working Holiday Tax Spezialisten',
    'Backpacker Steuerhilfe Australien',
    'wer ist Working Holiday Tax',
    'ist Working Holiday Tax seriös',
    'Working Holiday Tax Bewertungen',
    '417 462 Steuer Spezialisten',
    'Working Holiday Visum Steuerhilfe',
    'Steuerhilfe für Backpacker Australien',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'ja': `${SITE_URL}/ja/about`,
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Über Working Holiday Tax',
    description: 'Nur eine Art von Kunden: Working Holiday Maker mit 417 oder 462. Das Jahr, das wir sehen, vom ersten Payslip bis zum Rückflug.',
    url: `${SITE_URL}/de/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'de_DE',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Über Working Holiday Tax',
    description: 'Working-Holiday-Steuer ist das Einzige, was wir machen. Jeder Kunde ist auf einem 417 oder 462.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'general', lang: 'de' })

/**
 * Wie in der englischen Fassung: die Geschichte ist das Jahr der Leserin oder
 * des Lesers, keine erfundene Firmengeschichte. Jeder Satz muss wörtlich wahr
 * sein. Wo ein echtes Detail stärker wäre als die Erzählung, steht ein
 * JO-Marker statt einer Vermutung.
 */
const chapters = [
  {
    stage: 'Die erste Woche',
    title: 'Du bist mit einem Plan angekommen, der ungefähr zwei Wochen weit reichte',
    body: 'Hostel, SIM-Karte, Bankkonto und so schnell wie möglich ein Job. Die Tax File Number stand irgendwo auf der Liste, du hast sie beantragt und dich dann um den Rest gekümmert. Das australische Steuerjahr hat dir niemand erklärt, und es gab auch keinen Grund dafür.',
  },
  {
    stage: 'Die ersten Payslips',
    title: 'Der erste Job fing an, bevor die Nummer da war',
    body: 'Ohne hinterlegte Tax File Number muss ein Arbeitgeber den höchsten Satz einbehalten statt der fünfzehn Prozent, die ein Working Holiday Maker normalerweise zahlt. In den ersten Wochen fehlt deshalb fast die Hälfte. Erklärt hat es dir dort niemand, weil das nicht die Aufgabe deines Arbeitgebers war. Dieses Geld kommt nicht von allein zurück. Jemand muss es zurückholen.',
  },
  {
    stage: 'Bis Weihnachten',
    title: 'Vier Arbeitgeber, die Hälfte davon casual, keiner davon erklärt dir etwas',
    body: 'Ein Job im Hostel, ein Café, drei Wochen Lager, und einer, den du ohne letzten Payslip verlassen hast. Dass das australische Steuerjahr im Juni endet und nicht im Dezember, hat auch keiner erwähnt. Die verlorenen Payslips sind kein Problem: Was deine Arbeitgeber gemeldet haben, sehen wir über das ATO, wir starten also bei diesen Daten und nicht bei deinem Postfach.',
  },
  {
    stage: 'Die 88 Tage',
    title: 'Wenn du sie gemacht hast, bist du weit dafür gefahren',
    body: 'Irgendwohin nach Westen, nach Norden, drei Stunden hinter einen Ort, von dem du nie gehört hattest. Die Unterkunft wurde direkt vom Lohn abgezogen, bevor du ihn überhaupt gesehen hast, die Payslips sahen anders aus als die aus der Stadt, und bei diesem Abschnitt sind sich die meisten am unsichersten. Genau dieser Teil braucht meistens einen richtigen Blick statt eines gesetzten Häkchens.',
  },
  {
    stage: 'Der Rückflug',
    title: 'Du bist geflogen, das Geld ist geblieben',
    body: 'Superannuation kannst du erst zurückholen, wenn du Australien verlassen hast und das Visum abgelaufen ist. Deine liegt also noch bei einem Fonds, den du dir vermutlich nicht bewusst ausgesucht hast. Die zu viel einbehaltene Steuer aus den ersten Wochen liegt weiter beim ATO. Beides erwähnt am Flughafen niemand, und keiner deiner Arbeitgeber tut es auch.',
  },
]

const faqs = [
  {
    question: 'Mit wem arbeitet ihr?',
    answer: 'Mit Working Holiday Makern, und mit sonst niemandem. Jeder unserer Kunden ist mit einem 417- oder 462-Visum in Australien oder war es und ist inzwischen wieder zu Hause. Wir nehmen keine australischen Steuerresidenten, keine Studierenden, keine gesponserten Arbeitskräfte und keine Unternehmen an. Das Working-Holiday-Jahr ist für uns also kein Fall, den wir gelegentlich sehen. Es ist der einzige Fall, den wir sehen.',
  },
  {
    question: 'Könnt ihr mir helfen, wenn ich Australien schon verlassen habe?',
    answer: 'Ja, und ein großer Teil unserer Arbeit ist genau das. Superannuation kannst du überhaupt erst beantragen, nachdem du ausgereist bist und dein Visum abgelaufen ist, und eine Steuererklärung für ein bereits abgeschlossenes Jahr lässt sich von überall einreichen, alles läuft also aus der Ferne.',
  },
  {
    question: 'Brauche ich meine Payslips?',
    answer: 'Nein. Was deine Arbeitgeber einbehalten und gemeldet haben, sehen wir über das ATO. Wir arbeiten also mit diesen Daten, statt dich Papiere aus einem Job suchen zu lassen, den du vor acht Monaten verlassen hast. Wenn etwas, das du uns erzählst, nicht zu dem passt, was ein Arbeitgeber gemeldet hat, kümmern wir uns um die Differenz.',
  },
  {
    question: 'Was ist, wenn am Ende keine Rückerstattung herauskommt?',
    answer: 'Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf. Nicht jedes Working-Holiday-Jahr führt zu einer Rückerstattung, und wir sagen dir das lieber vorher, als den Auftrag anzunehmen und zu hoffen.',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/de/about#webpage`,
  url: `${SITE_URL}/de/about`,
  name: 'Über Working Holiday Tax',
  description: 'Working-Holiday-Steuer ist das Einzige, was wir machen. Jeder Kunde ist auf einem 417- oder 462-Visum.',
  inLanguage: 'de-DE',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
}

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
    { '@type': 'ListItem', position: 2, name: 'Über uns', item: `${SITE_URL}/de/about` },
  ],
}

const bodyStyle = { fontSize: 'clamp(15px,1.2vw,16px)', lineHeight: 1.7, color: '#2A3C34', fontWeight: 300 } as const

export default function GermanAboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-9 lg:pt-14 lg:pb-14">

          <nav aria-label="Brotkrümelnavigation" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/de" className="transition-colors hover:text-forest-500" style={{ padding: '4px 0' }}>Startseite</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page" style={{ color: '#0B5240' }}>Über uns</span>
          </nav>

          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                Über uns
              </span>
            </div>

            {/* JO: diese Seite ist bewusst als das Jahr der Leserin oder des Lesers
                geschrieben, weil das die einzige Geschichte ist, die in jedem Satz
                wahr ist. Wenn hier stattdessen eine echte Entstehungsgeschichte
                stehen soll, schick mir zwei bis drei Sätze dazu, wie das Geschäft
                wirklich angefangen hat. */}
            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(26px,3.4vw,42px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px' }}>
              Du kamst mit einem Plan an.<br />Von Steuern hat keiner geredet.
            </h1>

            <p className="about-lead text-ink"
              style={{ fontSize: 'clamp(16.5px,1.5vw,18px)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
              Working-Holiday-Steuer ist das Einzige, was wir machen. Kommt dir das Jahr hier unten bekannt vor,
              liegt in Australien wahrscheinlich noch Geld mit deinem Namen darauf.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row" style={{ marginTop: '26px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="general" lang="de"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 30px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                Frag uns alles →
              </WaLink>
              <Link href="/de/contact" className="inline-flex btn-ghost-dark justify-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                Andere Wege zu uns →
              </Link>
            </div>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              Es antwortet ein echter Mensch, während der Geschäftszeiten meist in etwa einer Stunde.
            </p>
          </div>
        </div>
      </section>

      {/* ── DAS JAHR ──────────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-16" style={{ background: '#F5F9F7', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">

            <span className="section-label">Das Jahr</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 16px' }}>
              Wie sieht ein Working-Holiday-Jahr für uns aus?
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '30px' }}>
              So, nur mit anderen Namen und anderen Orten. Fünf Dinge passieren fast jedem auf einem 417 oder 462, ungefähr in dieser Reihenfolge, und vier davon kosten Geld, das sich hinterher meistens zurückholen lässt.
            </p>

            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {chapters.map((c, i) => (
                <li key={i} style={{
                  position: 'relative',
                  paddingLeft: '20px',
                  paddingBottom: i === chapters.length - 1 ? 0 : '28px',
                  borderLeft: i === chapters.length - 1 ? 'none' : '1.5px solid #CDE3DB',
                  marginLeft: '4px',
                }}>
                  <span aria-hidden="true" style={{
                    position: 'absolute', left: '-6px', top: '5px', width: '10px', height: '10px',
                    borderRadius: '999px', background: '#16775C', border: '2px solid #F5F9F7',
                  }} />
                  <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.14em', color: '#16775C', marginBottom: '6px' }}>
                    {c.stage}
                  </p>
                  <h3 className="font-serif font-bold text-ink" style={{ fontSize: 'clamp(17px,1.7vw,20px)', lineHeight: 1.3, letterSpacing: '-0.015em', marginBottom: '8px' }}>
                    {c.title}
                  </h3>
                  <p style={bodyStyle}>{c.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── WARUM ES UNS GIBT ─────────────────────────────────────────────── */}
      <section className="py-11 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <span className="section-label">Warum es uns gibt</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 16px' }}>
              Warum arbeiten wir nur mit Working Holiday Makern?
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>
              Weil es das einzige Jahr ist, an dem wir arbeiten. Jeder unserer Kunden ist auf einem 417 oder 462, also sind die Dinge, die über deine Rückerstattung entscheiden, für uns keine Sonderfälle zum Nachschlagen. Sie sind unser Tagesgeschäft.
            </p>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>
              Ein allgemeiner Steuerberater sieht ein paar Mal im Jahr einen Backpacker, im Juli, zwischen zweihundert normalen Erklärungen. Der 417/462-Steuersatz, die Frage nach dem steuerlichen Wohnsitz, die ordentlich geprüft und nicht angenommen werden muss, die Medicare-Befreiung, die davon abhängt, welchen Pass du hast, ein Superannuation-Antrag aus einem Zimmer in Hamburg oder München, elf Monate nach der Ausreise: für uns ist das ein ganz normaler Dienstag.
            </p>
            <p style={bodyStyle}>
              Auf Absenden drücken kann jeder. Die Arbeit passiert davor: dein Jahr durchgehen, herausfinden, was daran stimmt, statt anzukreuzen, was am schnellsten geht, und dann einreichen.
            </p>

            {/* JO: die ehrliche Antwort auf "warum nur Backpacker" ist das Einzige auf
                dieser Seite, das ich nicht für dich schreiben kann. Zwei bis drei Sätze
                in deinen eigenen Worten würden genau hierhin gehören. */}

            {/* JO: die alte Fassung dieser Seite trug ein "2020, aktiv seit" und ein
                Stockfoto, das als unser Team gelesen wurde. Beides habe ich entfernt,
                statt etwas zu behaupten, das ich nicht prüfen kann. Bestätige das
                Gründungsjahr und schick ein echtes Foto, dann kommen beide zurück. */}

            <div className="rounded-2xl" style={{ marginTop: '28px', padding: '20px', background: '#F2FAF7', border: '1.5px solid #C8EAE0' }}>
              <p className="font-serif font-bold text-ink" style={{ fontSize: '17px', lineHeight: 1.35, marginBottom: '8px' }}>
                Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf.
              </p>
              <p style={{ ...bodyStyle, fontSize: '15px' }}>
                Nicht jedes Working-Holiday-Jahr führt zu einer Rückerstattung, und wenn deines vermutlich keine bringt, sagen wir dir das. Frag vorher. Fragen kosten nichts, und es antwortet ein echter Mensch.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WIE DU UNS ERREICHST ──────────────────────────────────────────── */}
      <section className="py-11 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <span className="section-label">Kontakt</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px,2.6vw,32px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 16px' }}>
              Wie erreichst du uns?
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>
              Über WhatsApp. Kein Bot, keine Ticketnummer, kein Formular, das dir fünf bis sieben Werktage verspricht. Du kannst eine einzige Frage stellen und es dabei belassen. Uns zu schreiben verpflichtet dich zu nichts.
            </p>
            <p style={{ ...bodyStyle, marginBottom: '22px' }}>
              Für den Anfang brauchst du kein myGov-Konto, keinen australischen Ausweis und keine Payslips, und es macht keinen Unterschied, ob du noch in Australien bist oder seit zwei Jahren wieder zu Hause. Die{' '}
              <Link href="/de/contact" style={{ color: '#0B5240', textDecoration: 'underline' }}>Kontaktseite</Link>{' '}
              erklärt, in welcher Sprache die Antwort zurückkommt und wie es danach weitergeht.
            </p>

            <WaLink href={WA} position="section" topic="general" lang="de"
              className="btn-primary inline-flex justify-center w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', minWidth: '260px' }}>
              Schreib uns auf WhatsApp →
            </WaLink>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      {/* Hidden entirely when the reviews feed is empty, so the heading
          never stands alone over blank space. */}
      <ReviewsGate>
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="max-w-xl mx-auto text-center mb-8">
              <span className="section-label center">In ihren eigenen Worten</span>
              <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(20px,2.04vw,26px)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
                Was Working Holiday Maker sagen
              </h2>
            </div>
            <GoogleReviews lang="de" />
          </div>
        </section>
      </ReviewsGate>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-start">
            <div>
              <span className="section-label">FAQ</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(20px,2.04vw,26px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px' }}>
                Fragen, die vor der ersten Nachricht kommen
              </h2>
              <p style={{ ...bodyStyle, marginBottom: '22px' }}>
                Noch etwas offen? Frag es auf WhatsApp, das geht schneller als lesen.
              </p>
            </div>
            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── ABSCHLUSS-CTA ────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240', paddingTop: '48px', paddingBottom: '56px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[540px] mx-auto text-center">
            <p className="font-medium uppercase" style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', marginBottom: '12px' }}>
              Wann immer du so weit bist
            </p>
            <h2 className="font-serif font-black text-white" style={{ fontSize: 'clamp(21px,2.8vw,32px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '12px' }}>
              Erzähl uns von deinem Jahr
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '24px', fontWeight: 300 }}>
              Wo du gearbeitet hast, ungefähr wann, und ob du schon ausgereist bist. Das reicht uns, um dir zu sagen, was sich zu verfolgen lohnt.
            </p>
            <WaLink href={WA} position="footer" topic="general" lang="de"
              className="btn-primary w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', minWidth: '260px' }}>
              Schreib uns auf WhatsApp →
            </WaLink>
          </div>
        </div>
      </section>

      <MobileCta href={WA} lang="de" topic="general" variant="neutral" />
    </>
  )
}

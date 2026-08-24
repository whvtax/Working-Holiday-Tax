import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/HomeWa'

// ─── METADATA ───────────────────────────────────────────────────────────
// Diese Seite gehört den Wochen zwischen Arbeitsbeginn und dem Moment, in dem
// die TFN beim Arbeitgeber ankommt. Kein Preis, keine Behauptung, selbst ein
// registrierter Steuerberater zu sein.
export const metadata: Metadata = {
  // Das Root-Layout hängt " | Working Holiday Tax" an, deshalb ist der Titel
  // hier kurz genug, dass das Ganze in ein mobiles Suchergebnis passt.
  title: 'TFN beantragen: 45 % Steuer vermeiden',
  description:
    'Die Nummer selbst ist kostenlos. Teuer sind die Wochen davor: ohne TFN behält dein Arbeitgeber 45 % statt 15 % ein.',
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
      'x-default': `${SITE_URL}/tfn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'TFN beantragen für Working Holiday Maker in Australien' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN beantragen: die Wochen mit 45 % vermeiden',
    description:
      'Die Nummer ist kostenlos. Die Wochen ohne sie sind es nicht. Wir bereiten den TFN-Antrag vor und reichen ihn ein, für 417- und 462-Visum.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'TFN beantragen: die Wochen mit 45 % vermeiden',
    description: 'Die Nummer ist kostenlos. Die Wochen ohne sie sind es nicht.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
  </svg>
)

// ─── COPY ───────────────────────────────────────────────────────────────

const FAILURE_POINTS = [
  {
    n: '01',
    title: 'Der Name im Antrag passt nicht zu den Einreisedaten',
    body: 'Das ATO gleicht deinen Antrag mit deinem Visumsdatensatz ab. Ein fehlender zweiter Vorname, ein neuer Pass oder eine andere Namensreihenfolge schickt ihn in die manuelle Prüfung oder direkt zurück.',
  },
  {
    n: '02',
    title: 'Die Adresse nimmt in vier Wochen keine Post mehr an',
    body: 'Deine TFN kommt als Brief an eine australische Adresse, und die Ausstellung kann bis zu 28 Tage dauern. Bist du bis dahin weitergezogen, bleibt der Brief liegen und niemand leitet ihn nach.',
  },
  {
    n: '03',
    title: 'Der Antrag lief, bevor das Visum aktiv war',
    body: 'Beantragt wird in Australien mit aktiviertem Visum, nicht vor dem Abflug. Zu frühe Anträge versanden leise, und du merkst es erst Wochen später, bei 45 %.',
  },
]

const WHAT_WE_DO = [
  {
    title: 'Wir prüfen zuerst, ob dein Visum aktiv ist',
    body: 'Eine Frage von einer Minute, die den häufigsten verlorenen Monat verhindert.',
  },
  {
    title: 'Wir gleichen deine Daten mit deinem Einreisedatensatz ab',
    body: 'Pass, Namensreihenfolge, Geburtsdatum und Visumserteilung, alles gegeneinander geprüft, bevor etwas eingereicht wird.',
  },
  {
    title: 'Wir lösen die Adressfrage mit dir',
    body: 'Wo du in vier Wochen tatsächlich bist, und was gilt, wenn die Antwort eine Farm oder ein Van ist.',
  },
  {
    title: 'Wir haken nach, wenn es hängt',
    body: 'Das ATO hat 28 Tage. Danach muss jemand dort anrufen, und das wirst nicht du aus einem Hostel in Cairns sein.',
  },
  {
    title: 'Wir sagen deinem Arbeitgeber, was in der Zwischenzeit gilt',
    body: 'Die Referenznummer des Antrags, korrekt angegeben, hält die ersten Abrechnungen vom Höchstsatz fern, während du wartest.',
  },
  {
    title: 'Wir holen die Lücke am Jahresende zurück',
    body: 'Was schon mit 45 % einbehalten wurde, kommt nur über eine Steuererklärung zurück, und nur wenn sie das auch sagt.',
  },
]

const FAQS = [
  {
    question: 'Kann ich das nicht einfach selbst über myGov machen?',
    answer:
      'Kannst du, und der TFN-Antrag ist ein kurzes Formular. Was das Formular nicht macht, ist dir irgendetwas über das Geld drumherum zu sagen. Es erwähnt nicht, dass du ab Jobbeginn 28 Tage hast, um deinem Arbeitgeber die Nummer zu geben. Es erwähnt nicht, dass jede Abrechnung davor mit 45 % statt mit dem Working-Holiday-Satz von 15 % einbehalten wird. Und es erwähnt nicht, dass der Überschuss nur über eine Steuererklärung zurückkommt, die eingereicht und gegen jeden einzelnen Arbeitgeber abgeglichen wurde. Es prüft auch nicht, ob dein Name und deine Postadresse zum Einreisedatensatz passen, und genau das schickt Anträge in die manuelle Prüfung oder direkt zurück. Das ist die Arbeit, und das Einreichen ist der einfache Teil davon. Du wirst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden müssen, welches Formular welches ist. Wir regeln das direkt mit dem ATO.',
  },
  {
    question: 'Der TFN-Antrag ist beim ATO kostenlos. Wofür zahle ich dann?',
    answer:
      'Die Nummer selbst ist kostenlos, und das sagen wir immer offen. Bezahlt wird, dass der Antrag beim ersten Mal durchgeht, und dass sich jemand kümmert, wenn er es nicht tut. Dazu gehört, deine Pass- und Namensdaten exakt an den Einreisedatensatz anzupassen, eine Adresse zu wählen, die in vier Wochen noch Post annimmt, deinem Arbeitgeber die Referenznummer zu geben, damit die ersten Abrechnungen nicht zum Höchstsatz laufen, und beim ATO nachzufassen, wenn nach 28 Tagen nichts angekommen ist. Wenn du das alles lieber selbst machst, steht es vollständig in unseren Ratgebern.',
  },
  {
    question: 'Was passiert, wenn ich ohne TFN anfange zu arbeiten?',
    answer:
      'Dein Arbeitgeber muss zum Höchstsatz von 45 % einbehalten statt zu den 15 %, die für Working Holiday Maker auf die ersten 45.000 $ gelten, solange du ihm keine Steuernummer gegeben hast. Dafür hast du ab Arbeitsbeginn 28 Tage Zeit. Bei einem Job mit 25 $ pro Stunde sind das rund 7,50 $ pro Stunde, die ans ATO gehen statt an dich, für jede Stunde in diesem Zeitfenster. Das Geld ist nicht weg, kommt aber auch nicht von selbst zurück: Es kommt nur über eine Steuererklärung zurück, die nach dem 30. Juni eingereicht und korrekt aufgestellt wird.',
  },
  {
    question: 'Ich arbeite schon seit Wochen ohne TFN. Ist es zu spät?',
    answer:
      'Nein. Hier läuft keine Frist gegen dich. Beantrage die Nummer jetzt, damit der Höchstsatz für die nächsten Abrechnungen wegfällt, und der zu viel einbehaltene Teil kommt mit der Steuererklärung für dieses Steuerjahr zurück. Meistens können wir den Antrag noch am selben Tag fertig machen, an dem du schreibst. Wenn du schon mehrere Wochen mit 45 % gearbeitet hast, sag uns das dazu, denn das ändert, was deine Erklärung später sagen muss.',
  },
  {
    question: 'Wie lange dauert es, bis die TFN ankommt?',
    answer:
      'Das ATO gibt an, TFN-Anträge innerhalb von 28 Tagen zu bearbeiten, in der Praxis haben die meisten Working Holiday Maker ihre Nummer nach zwei bis vier Wochen. Sie kommt als Brief an die australische Adresse aus dem Antrag, weshalb diese Adresse wichtiger ist, als die meisten denken. Während der Wartezeit kannst du weiterarbeiten, wenn du deinem Arbeitgeber die Referenznummer des Antrags gibst. Genau das verhindert, dass die 28 Tage gegen dich ablaufen.',
  },
  {
    question: 'Kann ich die TFN schon vor der Ankunft in Australien beantragen?',
    answer:
      'Mit einem Working Holiday Visum nicht. Du beantragst sie, sobald du mit aktiviertem 417- oder 462-Visum in Australien bist, weil der Antrag mit deinen Einreise- und Visumsdaten abgeglichen wird. Außerdem brauchst du eine australische Postadresse für den Brief, und dieses Problem löst man besser vor der Landung als danach. Vor der Ankunft eingereichte Anträge sind die, die am häufigsten verschwinden, ohne dass jemand erklärt, warum.',
  },
  {
    question: 'Brauche ich für das zweite Working-Holiday-Visum eine neue TFN?',
    answer:
      'Nein. Eine Steuernummer wird dir einmal zugeteilt und bleibt dein Leben lang gültig, auch über ein zweites oder drittes Working-Holiday-Visum hinweg, über einen Visumswechsel und über eine Zeit, in der du Australien komplett verlassen hast. Wenn du die Nummer nur verloren hast und nicht neu brauchst, ist das ein anderes und deutlich schnelleres Problem. Sag uns also, welcher der beiden Fälle es ist.',
  },
]

const GUIDES = [
  {
    href: '/de/blog/what-happens-without-your-tfn',
    title: 'Arbeiten ohne TFN',
    desc: 'Die 45 %, das 28-Tage-Fenster und wie das Geld zurückkommt.',
  },
  {
    href: '/de/blog/tfn-reference-number-before-tfn-arrives',
    title: 'Die Referenznummer des Antrags',
    desc: 'Was du dem Arbeitgeber gibst, solange der Brief noch unterwegs ist.',
  },
  {
    href: '/de/blog/how-long-does-it-take-to-get-a-tfn',
    title: 'Wie lange die TFN dauert',
    desc: 'Was das ATO zusagt, was üblich ist, und ab wann man nachhaken sollte.',
  },
]

/**
 * Der Einwand, mit dem jeder Lead ankommt: "Das mache ich doch selbst."
 *
 * Auf der Startseite wird er allgemein beantwortet. Hier muss er konkret um die
 * TFN gehen, sonst liest es sich wie Füllmaterial und dupliziert die Startseite.
 * Keine Zeile behauptet, myGov sei schlecht. Es macht eine andere Arbeit.
 */
const MYGOV = [
  {
    mygov: 'Das Formular nimmt den Namen und die Postadresse, die du einträgst.',
    us: 'Wir prüfen beides vorher: den Namen gegen den Einreisedatensatz, die Adresse gegen den Ort, an dem du in vier Wochen wirklich Post bekommst.',
  },
  {
    mygov: 'Nichts auf dem Bildschirm erwähnt die 28 Tage, die du ab Jobbeginn hast, um deinem Arbeitgeber die Nummer zu geben.',
    us: 'Wir geben dir die Referenznummer des Antrags weiter, und genau die hält die ersten Abrechnungen vom Höchstsatz fern.',
  },
  {
    mygov: 'Nichts sagt dir, dass die Wochen davor mit 45 % statt 15 % einbehalten wurden.',
    us: 'Wir rechnen aus, was diese Lücke wert ist, und holen sie über die Steuererklärung zurück. Von allein kommt sie nicht.',
  },
  {
    mygov: 'Wenn der Antrag hängen bleibt, sagt dir kein Bildschirm Bescheid.',
    us: 'Nach 28 Tagen muss jemand beim ATO anrufen, und das wirst nicht du aus einem Hostel in Cairns sein.',
  },
]

const WA_TFN = waUrl({ topic: 'tfn', lang: 'de' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.58 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.62 }

export default function TFNPageDE() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/de/tfn#webpage`,
    url: `${SITE_URL}/de/tfn`,
    name: 'TFN beantragen für Working Holiday Maker',
    description:
      'Was es kostet, ohne TFN zu arbeiten, warum TFN-Anträge von Working Holiday Makern scheitern, und wie der zu viel einbehaltene Teil zurückkommt.',
    inLanguage: 'de',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/de/tfn#service`,
    name: 'TFN-Antrag für Working Holiday Maker',
    serviceType: 'Tax File Number Antrag',
    description:
      'TFN-Anträge für Inhaber von 417- und 462-Visa, vorbereitet und eingereicht, inklusive Referenznummer für den Arbeitgeber und Nachfassen beim ATO.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australien' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 und 462)' },
    availableLanguage: ['de', 'en', 'ja'],
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
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 pt-8 pb-11 lg:pt-12 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459', marginBottom: '10px' }}>
            <Link href="/de" className="inline-flex items-center transition-colors hover:text-forest-500" style={{ minHeight: '44px' }}>Startseite</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page">TFN</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            Working Holiday Visum 417 &amp; 462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(28px, 4.8vw, 42px)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>Die Nummer ist kostenlos.{' '}</span>
            <span style={{ display: 'block', color: '#0B5240' }}>Die Wochen ohne sie nicht.{' '}</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '50ch', marginBottom: '26px' }}>
            Solange dein Arbeitgeber die Nummer nicht hat, werden 45 % deines Lohns einbehalten statt 15 %.
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TFN} position="hero" topic="tfn" lang="de"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '340px', width: '100%' }}>
              <IconWhatsApp />
              Schreib uns auf WhatsApp
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              Antwort in etwa einer Stunde.
            </p>
          </div>

          <div className="flex" style={{ marginTop: '20px' }}>
            <GoogleRating variant="pill" lang="de" />
          </div>
        </div>
      </section>

      {/* ── 1b. MYGOV, KONKRET ZUR TFN ───────────────────────────────────── */}
      <section className="py-11 lg:py-14 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Der einfache Teil</p>

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '20ch', marginBottom: '14px' }}>
            <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>Im Antrag steht kein Wort{' '}</span>
            <span style={{ display: 'block' }}>darüber, was das Warten kostet.{' '}</span>
          </h2>

          <p style={{ ...BODY, color: '#4C6459', maxWidth: '56ch', marginBottom: '22px' }}>
            Das Formular ist kurz, und myGov nimmt es an. Was darin fehlt, ist das Geld, in allen vier Punkten hier
            drunter.
          </p>

          <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
            {MYGOV.map((row, i) => (
              <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                  <p style={{ ...KICKER, color: '#4C6459', marginBottom: '5px' }}>Auf myGov</p>
                  <p style={{ ...BODY, color: '#2A3C34', overflowWrap: 'break-word', hyphens: 'auto' }}>{row.mygov}</p>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                  style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                  <p style={{ ...KICKER, color: '#0B5240', marginBottom: '5px' }}>Mit uns</p>
                  <p style={{ ...BODY, color: '#080F0D', fontWeight: 500, overflowWrap: 'break-word', hyphens: 'auto' }}>{row.us}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '48ch', fontWeight: 700 }}>
            Du wirst dich nie bei myGov einloggen, keinen Ausweis verknüpfen und nicht herausfinden müssen, welches
            Formular welches ist. Wir regeln das direkt mit dem ATO.
          </p>
        </div>
      </section>

      {/* ── 2. WAS DIE LÜCKE KOSTET ──────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '24ch', marginBottom: '14px' }}>
            Was kostet es, ohne TFN anzufangen?
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '28px' }}>
            Hat dein Arbeitgeber deine TFN nicht innerhalb von 28 Tagen, muss er 45 % einbehalten statt der 15 % für
            Working Holiday Maker. Die zu viel gezahlte Steuer ist nicht verloren und kann mit der Steuererklärung nach
            dem 30. Juni zurückkommen.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '31px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>45 %</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>Werden von jedem Dollar einbehalten, solange keine TFN vorliegt, statt fünfzehn.</p>
            </div>
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '31px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>28 Tage</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>Um deinem Arbeitgeber die TFN zu geben, und für das ATO, sie auszustellen.</p>
            </div>
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '31px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>1 Erklärung</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>Der einzige Weg zurück für alles, was schon zum falschen Satz einbehalten wurde.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WO ES SCHIEFGEHT ──────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Selbst machen</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Warum scheitern TFN-Anträge von Backpackern?
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '30px' }}>
            Das Formular ist kurz und meist unkompliziert. Wenn etwas schiefgeht, liegt es fast immer an einem von drei
            Punkten, und jeder kann einen weiteren Monat mit 45 % bedeuten, während du auf einen Brief wartest, der nie kommt.
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {FAILURE_POINTS.map((s) => (
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

      {/* ── 4. WAS WIR MACHEN ────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Die Arbeit</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Was wir dagegen tun
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '26px' }}>
            Du schickst uns deine Daten auf WhatsApp. Alles Weitere passiert auf unserer Seite.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {WHAT_WE_DO.map((c) => (
              <div key={c.title} className="rounded-[12px]" style={{ padding: '16px 18px', background: '#F5F9F7', border: '1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.35, marginBottom: '6px' }}>{c.title}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{c.body}</p>
              </div>
            ))}
          </div>

          <p style={{ ...BODY, color: '#4C6459', marginTop: '22px', maxWidth: '60ch' }}>
            Du hast die Nummer schon und willst die Wochen mit 45 % zurück?{' '}
            <Link href="/de/tax-return" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>Das ist die Steuererklärung</Link>.
          </p>
        </div>
      </section>

      {/* ── 5. GARANTIE ──────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <p style={{ ...KICKER, color: '#F9D88A', marginBottom: '14px' }}>Unsere Garantie</p>
          <p className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.26, letterSpacing: '-0.02em', maxWidth: '24ch' }}>
            Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf.
          </p>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '52ch', marginTop: '16px' }}>
            Das Honorar ist pauschal und niemals ein Prozentsatz von dem, was zurückkommt.
          </p>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '22ch', marginBottom: '14px' }}>
            Sag uns, wo du gerade stehst
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '56ch', marginBottom: '24px' }}>
            Ob du schon gelandet bist, ob du schon einen Job angefangen hast, und ob schon etwas mit 45 % ausgezahlt
            wurde. Drei Antworten reichen, damit wir dir sagen können, was als Nächstes kommt.
          </p>
          <WaLink href={WA_TFN} position="section" topic="tfn" lang="de"
            className="btn-primary inline-flex items-center justify-center gap-2"
            style={{ height: '54px', padding: '0 30px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '340px', width: '100%' }}>
            <IconWhatsApp />
            Schreib uns auf WhatsApp
          </WaLink>
          <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
            Antwort in etwa einer Stunde.
          </p>
        </div>
      </section>

      {/* ── 7. VERTRAUEN ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink text-center"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Working-Holiday-Steuer ist das Einzige, was wir machen.
          </h2>
          <p className="text-center mx-auto" style={{ ...BODY, color: '#2A3C34', maxWidth: '58ch', marginBottom: '28px' }}>
            Jeder TFN-Antrag, den wir einreichen, gehört jemandem mit 417- oder 462-Visum. Deshalb gehen bei allen
            dieselben drei Dinge schief. Steuererklärungen werden von einem
            registrierten Steuerberater geprüft und freigegeben, bevor sie beim ATO eingereicht werden.
          </p>
          <GoogleReviews lang="de" />
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Fragen zur TFN, bevor du schreibst
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="tfn-faq-de" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer" style={{ fontSize: '15px' }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. RATGEBER ──────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Ratgeber</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(22px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Lies erst die ganze Antwort, wenn dir das lieber ist
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '24px' }}>
            Wir halten nichts zurück, damit du dich melden musst. Wenn der Ratgeber es beantwortet, ist das gut so.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-[12px] transition-all hover:shadow-lg"
                style={{ padding: '16px 18px', border: '1px solid #E2EFE9', display: 'block' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px' }}>{g.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459' }}>{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStep
        eyebrow="Was kommt als Nächstes"
        heading="Die Wochen mit 45 % kommen über die Erklärung zurück"
        body="Sobald die Nummer hinterlegt ist, holt die Steuererklärung den zu viel einbehaltenen Teil zurück."
        cta="Wie die Erklärung läuft →"
        href="/de/tax-return"
      />

      <MobileCta href={WA_TFN} lang="de" topic="tfn" />
    </>
  )
}

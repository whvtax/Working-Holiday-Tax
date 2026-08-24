import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '../../HomeWa'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

/*
 * German mirror of the tightened Medicare page. What it owns is the exemption
 * certificate: the levy comes off by default, an agreement country removes the
 * entitlement to claim it back, and the exemption needs a statement almost
 * nobody applies for. Germany has no agreement, which is the whole point here.
 */

const WA = waUrl({ topic: 'medicare', lang: 'de' })

export const metadata: Metadata = {
  title: 'Medicare Levy Befreiung: 417 und 462',
  description:
    'Die 2 % Medicare Levy wird standardmäßig abgezogen, obwohl die meisten Working Holiday Maker sie nie schulden. Wer befreit ist.',
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
    'Sozialversicherungsabkommen Deutschland Australien',
    'RHCA Australien Deutsch',
    'Medicare Levy zurückbekommen',
  ],
  alternates: { canonical: '/de/medicare', languages: { 'en-AU': '/medicare', 'de': '/de/medicare', 'ja': '/ja/medicare', 'x-default': '/medicare' } },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'Medicare Levy Befreiung für 417 und 462 Visum',
    description: 'Die 2 % werden standardmäßig abgezogen. Wer befreit ist und welche Bescheinigung die Befreiung braucht.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Medicare Levy Befreiung für Working Holiday Maker',
    description: 'Die 2 % werden standardmäßig abgezogen. Wer befreit ist und was die Befreiung braucht.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const RHCA = [
  'Großbritannien', 'Irland', 'Neuseeland', 'Italien',
  'Schweden', 'Niederlande', 'Belgien', 'Finnland',
  'Norwegen', 'Malta', 'Slowenien',
]

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
    us: 'Wir klären das, bevor die Erklärung rausgeht, und nicht erst wenn der Bescheid da ist.',
  },
  {
    mygov: 'Nirgends steht, dass dein Pass darüber entscheidet und nicht dein Visum.',
    us: 'Ob dein Land ein Sozialversicherungsabkommen mit Australien hat, ist die ganze Frage. Für Deutschland ist die Antwort nein, und das ist gut für dich.',
  },
  {
    mygov: 'Weg geht die Levy nur mit einem Medicare Entitlement Statement, und das beantragst du woanders, nicht über die Erklärung.',
    us: 'Wir helfen dir beim Antrag auf die Bescheinigung, warten sie ab und sorgen dafür, dass die Befreiung im richtigen Jahr ankommt.',
  },
  {
    mygov: 'Das Feld für die Befreiung ist da, ob du die Bescheinigung hast oder nicht.',
    us: 'Wir beantragen sie nur mit dem Nachweis dahinter, denn darauf muss die Angabe sich stützen, wenn später jemand nachfragt.',
  },
]

const faqs = [
  {
    question: 'Wie viel ist die Medicare Levy Befreiung wert?',
    answer:
      'Die Levy beträgt 2 % des zu versteuernden Einkommens, also rund 500 $ bei 25.000 $ Verdienst und rund 1.000 $ bei 50.000 $. Abgerechnet wird sie bei der Veranlagung deiner Erklärung und nicht Woche für Woche vom Lohn, dort die Befreiung zu beantragen holt das Geld also zurück.',
  },
  {
    question: 'Bekommt jeder mit 417 oder 462 Visum die Befreiung?',
    answer:
      'Die meisten ja, aber nicht alle. Entscheidend ist dein Pass, nicht dein Visum: Kommt deine Staatsangehörigkeit aus einem der elf Länder mit Sozialversicherungsabkommen, bist du in Australien in der Regel anspruchsberechtigt, und der Anspruch ist es, der die Befreiung wegnimmt. Deutschland, Österreich und die Schweiz gehören nicht dazu.',
  },
  {
    question: 'Was ist ein Medicare Entitlement Statement und brauchst du eines?',
    answer:
      'Das Medicare Entitlement Statement ist ein Dokument von Services Australia, das bestätigt, dass du für einen bestimmten Zeitraum keinen Anspruch auf Medicare hattest. Es ist der Nachweis hinter der Befreiung, und das ATO kann es sehen wollen, deshalb erledigen wir es als Teil deiner Erklärung, statt die Befreiung blank zu beantragen.',
  },
  {
    question: 'Kann die Befreiung auch nur für einen Teil des Jahres gelten?',
    answer:
      'Ja, und für viele Working Holiday Maker ist genau das die richtige Antwort statt einer Befreiung fürs ganze Jahr. Gerechnet wird in Tagen, wenn du also im November angekommen bist, sind nur die Tage befreit, an denen du keinen Anspruch auf Medicare hattest. Ein volles Jahr zu beantragen, wenn nur ein Teil zutrifft, ist genau der Fehler, der später zu einer Korrektur der Erklärung führt.',
  },
  {
    question: 'Ändern Reiseversicherung oder private Krankenversicherung etwas daran?',
    answer:
      'Nein. Bei der Levy geht es steuerlich um den Anspruch auf das öffentliche System und nicht darum, ob du versichert bist, deshalb haben Reiseversicherung und private Krankenversicherung darauf keinen Einfluss. Private Krankenhausversicherung spielt nur für eine andere Abgabe eine Rolle, den Medicare Levy Surcharge, der erst bei hohen Einkommen greift und auf einem Working Holiday selten relevant ist.',
  },
  {
    question: 'Was ist, wenn die Levy im Laufe des Jahres schon abgezogen wurde?',
    answer:
      'Nichts geht verloren. Die Levy wird bei der Veranlagung deiner Erklärung berechnet, nicht bei der Lohnzahlung, was während des Jahres abgezogen wurde, war also allgemein einbehaltene Steuer und nicht speziell die Levy. Eine berechtigte Befreiung nimmt sie aus der Veranlagung heraus. Wurde ein früheres Jahr ohne Befreiung eingereicht, obwohl sie dir zustand, lässt sich diese Erklärung meist korrigieren.',
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
  name: 'Medicare Levy Befreiung für Working Holiday Maker',
  serviceType: 'Medicare Levy Exemption',
  description:
    'Die Medicare Levy Befreiung als Teil der australischen Steuererklärung, inklusive Medicare Entitlement Statement, für Inhaber von 417 und 462 Visa ohne Medicare Anspruch.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 / 462) ohne Medicare Anspruch' },
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

export default function GermanMedicarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Brotkrümelnavigation" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/de" className="transition-colors hover:text-forest-500">Startseite</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Medicare</span>
          </nav>

          <div className="max-w-[680px] mx-auto">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                Medicare Levy
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(28px,3.4vw,44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Eine Abgabe von 2 %, die du nie geschuldet hast
            </h1>

            <p className="hero-sub font-semibold text-ink"
              style={{ fontSize: 'clamp(16px,1.6vw,18px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
              Dein Pass entscheidet das, nicht dein Visum. Weg ist sie mit einer Bescheinigung, die kaum
              jemand beantragt.
            </p>

            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '22px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="medicare" lang="de"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                Lass deinen Fall prüfen
              </WaLink>
              <a href="#who-is-exempt"
                className="inline-flex btn-ghost-dark justify-center items-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                Wer befreit ist
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#4C6459' }}>
              Antwort in etwa einer Stunde.
            </p>
          </div>
        </div>
      </section>

      {/* ── DER EINWAND, KONKRET ZUR LEVY ──────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              Selbst machen
            </p>

            <h2 className="font-serif font-black text-ink" style={H2}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>Ob die Levy je deine war, fragt niemand.{' '}</span>
              <span style={{ display: 'block' }}>myGov zieht sie ab und ist fertig.{' '}</span>
            </h2>

            <p style={{ ...BODY, color: '#4C6459', maxWidth: '56ch', marginBottom: '20px' }}>
              Sie beträgt 2 % des zu versteuernden Einkommens, rund 500 $ bei 25.000 $ im Jahr. Auf keinem
              Payslip taucht sie auf, deshalb merkt fast niemand, dass er sie zahlt.
            </p>

            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                    <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                      Auf myGov
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

      {/* ── WAS ALLEIN SCHIEFGEHT ──────────────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={H2}>
              Warum steht die Levy überhaupt auf deiner Veranlagung?
            </h2>
            <p style={BODY}>
              Weil sie der Standard ist. Die Levy wird auf dein zu versteuerndes Einkommen angesetzt, wenn
              das ATO deine Erklärung veranlagt, und sie bleibt drin, solange keine Befreiung beantragt
              wird. Nichts im Ablauf fragt, ob du überhaupt Anspruch auf Medicare hattest, das häufigste
              Ergebnis sind also 2 % eines Jahreseinkommens, gezahlt in ein System, das du nie nutzen
              konntest.
            </p>
            <p style={BODY}>
              Der stillere Fehler ist der umgekehrte: die Befreiung angekreuzt, ohne den Nachweis dahinter.
              Dieser Nachweis ist ein Medicare Entitlement Statement von Services Australia, einer anderen
              Behörde als dem ATO, und eine Angabe ohne ihn ist eine, die du nicht belegen kannst, wenn ein
              Jahr später jemand nachfragt und du längst nicht mehr im Land bist.
            </p>
          </div>
        </div>
      </section>

      {/* ── DER ENTSCHEIDENDE PUNKT ────────────────────────────────────────── */}
      <section id="who-is-exempt" className="py-8 lg:py-11" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={H2}>
              Wer ist von der Medicare Levy befreit?
            </h2>
            <p style={BODY}>
              Befreit ist in der Regel, wer keinen Anspruch auf Medicare hatte, und auf einem Working
              Holiday Visum hängt das an deinem Pass. Australien hat mit elf Ländern ein
              Sozialversicherungsabkommen. Wer die Staatsangehörigkeit eines dieser Länder hat, ist hier in
              der Regel anspruchsberechtigt, und das schließt die Befreiung aus, selbst wenn du dich nie
              angemeldet und nie etwas genutzt hast: Maßgeblich ist der Anspruch, nicht die Nutzung. Alle
              anderen, Deutschland eingeschlossen, haben normalerweise keinen Anspruch und können die
              Befreiung für die entsprechenden Tage beantragen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[880px] mx-auto" style={{ marginTop: '20px' }}>
            <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '8px' }}>
                Aus einem Abkommensland
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#2A3C34', marginBottom: '12px' }}>
                In der Regel anspruchsberechtigt, also in der Regel nicht befreit. Wir sorgen dafür, dass
                die Levy korrekt und nicht doppelt angesetzt wird, und prüfen, ob ein Teil des Jahres
                anders lag.
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#4C6459' }}>
                {RHCA.join(' · ')}
              </p>
            </div>
            <div className="rounded-2xl" style={{ padding: '20px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '8px' }}>
                Aus allen anderen Ländern
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#2A3C34', marginBottom: '12px' }}>
                Normalerweise kein Anspruch, also normalerweise befreit. Deutschland, Österreich und die
                Schweiz gehören alle in diese Gruppe.
              </p>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#4C6459' }}>
                Die Befreiung wird in Tagen gerechnet, nicht als ein einziges Ja oder Nein für das Jahr.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WAS WIR TUN ────────────────────────────────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={H2}>
              Was machen wir damit?
            </h2>
            <p style={BODY}>
              Wir klären, ob und für welchen Teil des Jahres du Anspruch auf Medicare hattest. Das ist eine
              Frage nach Staatsangehörigkeit, Visum und Daten, kein Kästchen zum Anklicken.
            </p>

            <div className="rounded-2xl" style={{ padding: '20px', background: '#F5F9F7', border: '1.5px solid #C8EAE0', margin: '20px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.5, marginBottom: '8px' }}>
                Wenn deine Rückerstattung niedriger ist als unser Honorar, erstatten wir dir die Differenz, du zahlst also nie drauf.
              </p>
              <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#4C6459' }}>
                Von einem registrierten Steuerberater geprüft und freigegeben,
                bevor es beim ATO eingereicht wird.
              </p>
            </div>

            <WaLink href={WA} position="section" topic="medicare" lang="de"
              className="btn-primary flex justify-center"
              style={{ minHeight: '54px', width: '100%', maxWidth: '360px', fontSize: '15px', borderRadius: '100px' }}>
              Schreib uns auf WhatsApp
            </WaLink>
            <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '10px' }}>
              Antwort in etwa einer Stunde.
            </p>
          </div>
        </div>
      </section>

      {/* ── VIDEO ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ ...H2, maxWidth: '24ch' }}>
              Die Befreiung in zwei Minuten
            </h2>
            <div className="rounded-2xl overflow-hidden mx-auto w-full" style={{ marginTop: '18px' }}>
              <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="Medicare Levy Befreiung erklärt"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
              <div className="hidden sm:block" style={{ aspectRatio: '16/9', maxWidth: '720px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="Medicare Levy Befreiung erklärt"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '18px' }}>
              Häufige Fragen zur Levy und zur Befreiung
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── RATGEBER ───────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '16px' }}>
            Mehr zu Medicare und Krankenversicherung
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/de/blog/medicare-levy-working-holiday-makers', label: 'Die Medicare Levy Befreiung für Working Holiday Maker' },
              { href: '/de/blog/countries-with-medicare-agreement-australia', label: 'Welche Länder ein Abkommen mit Australien haben' },
              { href: '/de/blog/what-is-medicare-working-holiday-makers', label: 'Was Medicare ist und wer wirklich abgedeckt ist' },
              { href: '/de/blog/private-health-insurance-working-holiday-australia', label: 'Ändert eine private Krankenversicherung die Levy?' },
              { href: '/de/blog/emergency-medical-care-working-holiday-no-medicare', label: 'Notfallbehandlung in Australien ohne Medicare' },
              { href: '/de/blog/uk-medicare-reciprocal-agreement-australia', label: 'Das britische Abkommen und was es für deine Erklärung heißt' },
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
        heading="Die Befreiung ist eine Zeile der Erklärung, nicht die ganze"
        body="Dein Residentenstatus und deine absetzbaren Kosten sind mehr wert. Wir arbeiten alle drei zusammen aus."
        cta="So bereiten wir die Erklärung vor"
        href="/de/tax-return"
      />

      <MobileCta href={WA} lang="de" topic="medicare" />
    </>
  )
}

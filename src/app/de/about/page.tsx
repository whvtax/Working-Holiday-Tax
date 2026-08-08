import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { WA_URL, SITE_URL, AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Über uns - Wer wir sind | Working Holiday Tax',
  description: `Working Holiday Tax ist ein Service von ${AGENT_NAME} (ABN ${AGENT_ABN}). Alle Arbeiten rund um TFN, Steuererklärung, Superannuation (DASP) und ABN für Inhaber eines 417/462 Working-Holiday-Visums erfolgen unter Aufsicht eines registrierten Steueragenten (TAN ${AGENT_TPB}). Wer wir sind und wie wir arbeiten.`,
  keywords: [
    'Working Holiday Tax Steueragent',
    'registrierter Steueragent Australien Backpacker',
    'wer ist Working Holiday Tax',
    'The Accounting Academy Pty Ltd',
    'ist Working Holiday Tax seriös',
    'Working Holiday Tax Bewertungen',
    'Steueragent Working Holiday Visum Australien',
    'TPB registrierter Agent Backpacker Steuer',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Über Working Holiday Tax - Wer wir sind',
    description: `Ein Service von ${AGENT_NAME}. Die Arbeit erfolgt unter Aufsicht eines registrierten australischen Steueragenten (TAN ${AGENT_TPB}), spezialisiert auf Steuerfragen rund um das Working-Holiday-Visum.`,
    url: `${SITE_URL}/de/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'de_DE',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Über Working Holiday Tax - Wer wir sind',
    description: `Ein Service von ${AGENT_NAME}. Die Arbeit erfolgt unter Aufsicht eines registrierten australischen Steueragenten, spezialisiert auf Steuerfragen rund um das Working-Holiday-Visum.`,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Wer steckt hinter Working Holiday Tax?',
    answer: `Working Holiday Tax ist ein Service von ${AGENT_NAME} (ABN ${AGENT_ABN}). Jede Einreichung einer Steuererklärung, jeder Ratschlag und jeder DASP-Superantrag über diese Seite wird unter Aufsicht eines registrierten Steueragenten (Tax Agent Number ${AGENT_TPB}) vorbereitet und eingereicht - eine Registrierung, die du im öffentlichen Register des TPB unter tpb.gov.au nachschlagen kannst.`,
  },
  {
    question: 'Beaufsichtigt ein registrierter Steueragent meine Steuererklärung?',
    answer: `Ja. Alles, was über Working Holiday Tax eingereicht wird, wird unter Aufsicht der Registrierung von ${AGENT_NAME} beim Tax Practitioners Board (TAN ${AGENT_TPB}) vorbereitet und eingereicht. Registrierte Agenten sind an den Tax Agent Services Act 2009 und den Code of Professional Conduct des TPB gebunden und verfügen über eine Berufshaftpflichtversicherung - anders als nicht registrierte "Rückerstattungsrechner"-Seiten.`,
  },
  {
    question: 'Warum spezialisiert ihr euch auf Working Holiday Maker statt auf allgemeine Steuerfragen?',
    answer: 'Die Steuersituation mit einem Working-Holiday-Visum unterscheidet sich wirklich von einer normalen australischen Steuererklärung: der 417/462-Steuersatz, der DASP-Prozess zur Superannuation-Auszahlung nach der Abreise, Medicare-Levy-Befreiungen, die von deiner Staatsangehörigkeit und von Sozialversicherungsabkommen abhängen, sowie Casual- und Saisoneinkommen, das sich über mehrere Arbeitgeber und Bundesstaaten verteilt. Wir haben den Service rund um genau diese eine Visumkategorie und ihre Probleme aufgebaut, statt sie wie eine kleinere Version einer Standarderklärung zu behandeln.',
  },
  {
    question: 'Arbeitet ihr nur mit Menschen, die noch in Australien sind?',
    answer: 'Nein. Ein großer Teil unserer Arbeit - vor allem Superannuation-Anträge (DASP) und Steuererklärungen für Vorjahre - findet statt, nachdem jemand Australien bereits verlassen hat und wieder zu Hause ist. Alles läuft aus der Ferne: Dokumente per Upload, Identität und Unterschriften elektronisch, und Rückerstattungen werden auf ein australisches oder ausländisches Bankkonto ausgezahlt.',
  },
  {
    question: 'In welchen Sprachen arbeitet ihr?',
    answer: 'Englisch, Deutsch und Japanisch (日本語) - auf der gesamten Seite und im direkten Support, nicht nur auf maschinell übersetzten Seiten. Ist deine Muttersprache eine andere, arbeiten wir trotzdem auf Englisch mit dir und sind es gewohnt, Menschen australische Steuerkonzepte zu erklären, die zum ersten Mal damit zu tun haben.',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/de/about#webpage`,
  url: `${SITE_URL}/de/about`,
  name: 'Über Working Holiday Tax',
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

export default function GermanAboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Brotkrümelnavigation" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/de" className="transition-colors hover:text-forest-500">Startseite</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Über uns</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 lg:items-center">
            <div className="max-w-[560px] lg:max-w-[700px]">
              <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
                <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                  Über uns
                </span>
              </div>

              <h1 className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '10px' }}>
                Rund um ein Visum aufgebaut, unter Aufsicht eines registrierten Steueragenten.
              </h1>

              <p className="about-lead font-semibold text-ink"
                style={{ fontSize: 'clamp(14px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.4 }}>
                Working Holiday Tax ist ein Service von {AGENT_NAME} (ABN {AGENT_ABN}). Jede Steuererklärung, jeder Antrag und jeder Ratschlag wird unter Aufsicht eines registrierten Steueragenten (Tax Agent Number {AGENT_TPB}) erstellt.
              </p>

              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.58)', maxWidth: '46ch' }}>
                Wir kümmern uns nur um eines: Steuer-, TFN-, ABN-, Super- und Medicare-Fragen für Menschen mit einem Working-Holiday-Visum der Subclass 417 oder 462 - in Australien oder nachdem sie es bereits verlassen haben.
              </p>

              <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4" style={{ marginTop: '24px', marginBottom: '20px', maxWidth: '480px' }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex justify-center"
                  style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                  Frag uns alles →
                </a>
                <Link href="/de/contact" className="inline-flex btn-ghost-dark justify-center"
                  style={{ height: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                  Kontakt aufnehmen →
                </Link>
              </div>
            </div>

            <div className="max-w-[280px] mx-auto w-full lg:max-w-none">
              <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '532/745', border: '1.5px solid #E2EFE9', boxShadow: '0 20px 40px -20px rgba(11,82,64,0.25)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/about/team-office.jpg" alt="Junge Berufstätige arbeiten zusammen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS STRIP (all independently verifiable, no invented stats) ── */}
      <section className="bg-white" style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-5 lg:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { stat: <GoogleRating variant="number" lang="de" />, label: 'Google-Bewertung' },
              { stat: <GoogleRating variant="count" lang="de" />, label: ' ' },
              { stat: '2020', label: 'Aktiv seit' },
              { stat: '3', label: 'Sprachen - EN / DE / JA' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-serif" style={{ fontSize: 'clamp(20px, 3.4vw, 26px)', fontWeight: 800, color: '#0B5240', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '4px' }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: '11px', color: '#587066', letterSpacing: '0.02em' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center" style={{ fontSize: '11.5px', color: 'rgba(10,15,13,0.4)', marginTop: '14px' }}>
            Die Arbeit erfolgt unter Aufsicht eines registrierten Steueragenten - die Registrierung ist im öffentlichen Register des Tax Practitioners Board unter{' '}
            <a href="https://www.tpb.gov.au/public-register" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>tpb.gov.au</a> einsehbar.
          </p>
        </div>
      </section>

      {/* ── WHAT "REGISTERED TAX AGENT" ACTUALLY MEANS ─────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[720px] mx-auto">
            <span className="section-label">Warum das wichtig ist</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,32px)', lineHeight: 1.12, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              Was „registrierter Steueragent" wirklich bedeutet
            </h2>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              In Australien darf nur ein beim Tax Practitioners Board (TPB) registrierter Steueragent gegen Bezahlung die Steuererklärung einer anderen Person vorbereiten oder einreichen. Die Registrierung setzt einschlägige Qualifikationen und Erfahrung voraus, eine laufende Prüfung der persönlichen Eignung („fit and proper person"), eine Berufshaftpflichtversicherung sowie die Einhaltung des Code of Professional Conduct des TPB unter dem Tax Agent Services Act 2009 - und die Registrierung kann bei Verstößen ausgesetzt oder entzogen werden.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Viele auf Backpacker ausgerichtete „Sofort-Rückerstattungsrechner"-Seiten sind gar keine registrierten Agenten - es handelt sich um Formulare zur Lead-Generierung, die deine Daten an jemand anderen weiterleiten, oder um nicht registrierte Anbieter, die außerhalb der Aufsicht des TPB arbeiten. Working Holiday Tax arbeitet unter der TPB-Registrierung von {AGENT_NAME} (TAN {AGENT_TPB}); jede Steuererklärung, jeder DASP-Antrag und jeder Ratschlag über diese Seite wird unter dieser Registrierung vorbereitet und eingereicht, nicht blind ausgelagert.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              Das heißt nicht, dass wir dir eine größere Rückerstattung verschaffen als jeder andere - das kann kein seriöser Agent versprechen, und wir tun es auch nicht. Es bedeutet, dass die Erklärung korrekt vorbereitet wird, die Beratung einer echten Aufsichtsbehörde gegenüber rechenschaftspflichtig ist, und dass es eine Anlaufstelle gibt, falls etwas schiefgeht.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY ONE VISA CATEGORY ────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Unser Fokus</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Warum wir nur mit Working Holiday Makern arbeiten
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-5xl mx-auto">
            {[
              { t: 'Ein eigener Steuersatz', d: 'Der 417/462-Steuersatz für Working Holiday Maker (15 % ab dem ersten Dollar bis zu 45.000 $) ist nicht derselbe wie der Steuersatz für Steuerresidenten, von dem die meisten allgemeinen Steuerprogramme ausgehen.' },
              { t: 'DASP nach der Abreise', d: 'Superannuation wird über ein eigenes Verfahren (DASP) zurückgeholt, das erst verfügbar ist, sobald du Australien verlassen hast und dein Visum abgelaufen ist - die meisten allgemeinen Steuerberater haben damit kaum Erfahrung.' },
              { t: 'Medicare abhängig von der Staatsangehörigkeit', d: 'Ob die Medicare-Levy-Befreiung gilt, hängt von deinem Pass und Australiens Sozialversicherungsabkommen (RHCA) ab - ein Detail, das man mit einer allgemeinen Checkliste leicht falsch macht.' },
              { t: 'Saisonarbeit, mehrere Arbeitgeber', d: 'Einkommen aus Farmarbeit, Gastronomie und Lieferdiensten, verteilt über mehrere Bundesstaaten und Arbeitgeber innerhalb eines Jahres, braucht eine Steuererklärung, die alles korrekt zusammenführt.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FBF9', border: '1.5px solid #E2EFE9' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px' }}>{c.t}</p>
                <p className="font-light" style={{ fontSize: '12.5px', color: 'rgba(10,15,13,0.6)', lineHeight: 1.7 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">In ihren eigenen Worten</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Was Working Holiday Maker sagen
            </h2>
          </div>
          <GoogleReviews lang="de" />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
            <div className="text-center">
              <span className="section-label center">FAQ</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                Fragen zu uns
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                Noch eine Frage? Schreib uns direkt.
              </p>
            </div>
            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="Bereit, wenn du es bist"
        heading="Finde heraus, was dir zusteht"
        body="Nutze den kostenlosen Rechner, oder schreib uns direkt - wir sagen dir, was für deine Situation gilt."
        cta="Rechner ausprobieren →"
        href="/de/calculator"
      />

      <MobileCta href={WA_URL} lang="de" />
    </>
  )
}

import type { Metadata } from 'next'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { GoogleRating } from '@/components/ui/GoogleRating'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: "ABN in Australien anmelden lassen - 417 & 462 | Tax Agents",
  description: "ABN für Lieferdienste, Rideshare oder Farmarbeit? Wir melden sie korrekt für deine tatsächliche Tätigkeit an, erklären dir deine Steuerpflichten klar und halten dich aus den Fallen heraus, die Backpacker Super und Mindestlohn kosten.",
  keywords: [
    'ABN Registrierung Australien',
    'ABN Working Holiday',
    'ABN beantragen Australien',
    'ABN beantragen Working Holiday',
    'Australian Business Number Backpacker',
    'Australian Business Number Working Holiday',
    'Selbstständig Australien WHV',
    'Selbstständig Australien Working Holiday',
    'ABN für Freelancer',
    'ABN 417 Visum',
    'ABN 462 Visum',
    'ABN online registrieren',
    'ABN für Steuererklärung Australien',
    'ABN vs TFN Working Holiday',
    'brauche ich eine ABN Working Holiday',
    'ABN Backpacker Selbstständig',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/abn`,
    languages: {
      'en-AU': `${SITE_URL}/abn`,
      'de': `${SITE_URL}/de/abn`,
      'ja': `${SITE_URL}/ja/abn`,
      'x-default': `${SITE_URL}/abn`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN-Registrierung für Working Holiday Visainhaber',
    description: 'Registriere deine ABN korrekt als selbstständiger Working Holiday Maker in Australien.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'ABN-Registrierung für Working Holiday Visainhaber',
    description: 'Registriere deine ABN korrekt als selbstständiger Working Holiday Maker in Australien.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Die ABN-Registrierung ist kostenlos. Wofür zahle ich?',
    answer: 'Die Registrierung ist kostenlos, das behaupten wir nicht anders. Bezahlt wird, dass sie zu deiner tatsächlichen Tätigkeit passt, dass du weißt, was zur Steuerzeit auf dich zukommt, und dass wir dich warnen, wenn ein Arbeitgeber dich in eine ABN drängt, um Super und Mindestlohn zu sparen.',
  },
  {
    question: 'Mein Arbeitgeber verlangt eine ABN für einen normalen Schichtjob. Ist das korrekt?',
    answer: 'Meistens nicht. Wenn er deine Zeiten festlegt, dich anleitet und das Werkzeug stellt, ist das ein Angestelltenverhältnis - mit ABN gibt es keinen Steuerabzug, keine Super und keine Unfallversicherung. Schick uns die Jobdetails, bevor du dich registrierst, und wir sagen dir ehrlich, was es ist.',
  },
  { question: 'Kann ich sowohl eine TFN als auch eine ABN haben?', answer: 'Ja. Du kannst beide haben - die TFN für Anstellungen und die ABN für selbstständige Tätigkeiten.' },
  { question: 'Bekomme ich eine ABN ohne TFN?', answer: 'Nein. Du brauchst zuerst eine TFN, bevor du eine ABN beantragen kannst.' },
  { question: 'Muss ich mich für GST registrieren?', answer: 'Eine GST-Registrierung ist nur erforderlich, wenn dein Jahresumsatz über 75.000 AUD liegt. Die meisten Working Holiday Visainhaber müssen sich nicht für GST registrieren.' },
  { question: 'Was passiert mit meiner ABN, wenn ich Australien verlasse?', answer: 'Du kannst deine ABN online stornieren, sobald du aufhörst, in Australien zu arbeiten.' },
  { question: 'Brauche ich als Working Holiday Maker eine ABN?', answer: 'Du brauchst eine ABN nur, wenn du als Selbstständiger oder Freelancer arbeitest - zum Beispiel Rideshare, Lieferdienste, freie Aufträge oder direkte Bezahlung durch Kunden statt PAYG-Anstellung. Als regulärer Angestellter brauchst du nur eine TFN.' },
  { question: 'Wie beeinflussen ABN-Einkünfte meine Working Holiday Steuererklärung?', answer: 'ABN-Einkünfte werden anders behandelt als PAYG-Lohn. Es wird keine Steuer vorab einbehalten, du musst also selbst Geld für die Steuer zurücklegen. Bei deiner Steuererklärung werden ABN-Einkünfte separat angegeben, und du kannst entsprechende Geschäftsausgaben als Werbungskosten geltend machen.' }
]

const STEPS = [
  { n: '1', title: 'Erzähl uns von deiner Arbeit',         body: 'Teil uns deine Arbeits- und Visumdetails mit, damit wir dich richtig beraten.' },
  { n: '2', title: 'Schick uns deine Daten',               body: 'TFN und Reisepassinfos - schnell und einfach.' },
  { n: '3', title: 'Wir kümmern uns um die Registrierung', body: 'Wir bereiten alles vor und reichen deinen Antrag korrekt ein.' },
  { n: '4', title: 'Du erhältst deine ABN und legst los',  body: 'Deine ABN wird meist innerhalb einer Stunde ausgestellt. Du kannst sofort Rechnungen schreiben und arbeiten.' },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'de',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'ABN-Registrierung', item: `${SITE_URL}/de/abn` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/de/abn#service`,
  name: 'ABN-Registrierung für Working Holiday Maker',
  description: 'ABN-Registrierung für Working Holiday Maker, die als Sole Trader (Selbstständige) arbeiten - Uber, Lieferdienste, freiberufliche Tätigkeiten.',
  serviceType: 'ABN Registration',
  category: 'Business Registration Service',
  url: `${SITE_URL}/de/abn`,
  inLanguage: 'de',
  areaServed: {
    '@type': 'Country',
    name: 'Australia',
  },
  audience: {
    '@type': 'Audience',
    name: 'Working Holiday Visuminhaber in Australien (Subclass 417 und 462)',
  },
  provider: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Working Holiday Tax',
    url: `${SITE_URL}`,
    description: 'Service unter Aufsicht eines registrierten australischen Steueragenten, spezialisiert auf Working Holiday Maker.',
    knowsLanguage: ['de', 'en', 'ja'],
  },
}



export default function ABNPageDE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Brotkrümelnavigation" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/de" className="transition-colors hover:text-forest-500">Startseite</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN-Registrierung</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                ABN-Registrierung
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '10px' }}>
              <span className="hidden lg:block">
                <span style={{ display: 'block' }}>Brauchst du eine ABN für deinen Job?</span>
                <span style={{ display: 'block', color: '#0B5240' }}>Wir melden sie korrekt an.</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display: 'block', fontSize: '22px' }}>Brauchst du eine ABN für deinen Job?</span>
                <span style={{ display: 'block', color: '#0B5240', fontSize: '22px' }}>Wir melden sie korrekt an.</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize: 'clamp(14px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.4 }}>
              <span className="hidden lg:inline">Wir richten deine ABN von Anfang an korrekt ein.</span>
              <span className="lg:hidden" style={{ fontSize: '13px' }}>Wir richten deine ABN von Anfang an korrekt ein.</span>
            </p>

            <p className="font-light"
              style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.58)', maxWidth: '48ch', marginBottom: '0' }}>
              Wir sorgen dafür, dass deine ABN ab Tag 1 richtig aufgesetzt ist.
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '20px', maxWidth: '480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                ABN registrieren →
              </a>
              <a href="#how-to-register"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                So funktioniert&apos;s →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['350+ Backpacker geholfen', <GoogleRating key="rating" variant="pill" lang="de" />, '45+ Länder', 'Antwort in unter 1 Std'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize: '12px', color: 'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN ABN? ──────────────────────────────────────────────── */}
      <section className="abn-intro-section">
        <div className="abn-intro-container reveal">
          <div className="abn-intro-grid">

            <div className="abn-intro-content">
              <p className="abn-intro-eyebrow">Für Selbstständige &amp; Freelancer</p>
              <h2 className="abn-intro-heading">
                Was ist eine ABN?
              </h2>
              <p className="abn-intro-body">
                Eine <strong>Australian Business Number (ABN)</strong> ist eine 11-stellige Identifikationsnummer, die vom Australian Business Register ausgestellt wird. Du brauchst sie, wenn du auf eigene Rechnung arbeitest statt als regulärer Angestellter mit Gehaltsabrechnung.
              </p>
              <p className="abn-intro-body">
                Mit einer ABN kannst du <strong>direkt Rechnungen an Kunden stellen</strong>, als Selbstständiger oder Freelancer arbeiten und legal als &bdquo;sole trader&ldquo; auftreten. Typische ABN-Jobs für Backpacker: Farmarbeit auf Vertragsbasis, Content Creation, Uber/Rideshare, Lieferdienste und Handwerk.
              </p>
              <p className="abn-intro-body">
                Eine ABN ersetzt keine TFN, die beiden haben unterschiedliche Aufgaben. Viele Working Holiday Maker haben beide: eine TFN für Anstellungen und eine ABN für selbstständige Arbeit.
              </p>
            </div>

            <div className="abn-intro-visual">
              <div className="abn-compare-grid">

                <div className="abn-compare-card abn-compare-employee">
                  <div className="abn-compare-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="7" r="4" stroke="#587066" strokeWidth="1.6"/>
                      <path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1" stroke="#587066" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="abn-compare-title">Angestellter</p>
                  <p className="abn-compare-subtitle">Braucht TFN</p>
                  <ul className="abn-compare-list">
                    <li>Gehaltsabrechnung vom Arbeitgeber</li>
                    <li>Steuer automatisch einbehalten</li>
                    <li>Bekommt Superbeiträge</li>
                  </ul>
                </div>

                <div className="abn-compare-card abn-compare-contractor">
                  <div className="abn-compare-badge">Du</div>
                  <div className="abn-compare-icon abn-compare-icon-active">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="#0B5240" strokeWidth="1.6" strokeLinejoin="round"/>
                      <path d="M9 21V12h6v9" stroke="#0B5240" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="abn-compare-title">Selbstständig</p>
                  <p className="abn-compare-subtitle">Braucht ABN</p>
                  <ul className="abn-compare-list">
                    <li>Stellt direkt Rechnungen aus</li>
                    <li>Steuern selbst verwalten</li>
                    <li>Kein Super vom Auftraggeber</li>
                  </ul>
                </div>

              </div>
            </div>

          </div>

          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">Wir registrieren deine ABN korrekt für dich</h3>
              <p className="service-cta-sub">Prüfe jetzt deine Berechtigung - schreib uns auf WhatsApp. Wir registrieren deine ABN mit dem richtigen Setup für deine Tätigkeit - und erklären dir deine Steuerpflichten klar und verständlich.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Meine ABN registrieren →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP ──────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">Warum unser Service</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '26ch', marginTop: '8px', marginBottom: '8px' }}>
              Wir richten deine ABN von Anfang an korrekt ein
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize: '13.5px', lineHeight: 1.7, maxWidth: '34ch', margin: '0 auto', color: 'rgba(10,15,13,0.5)' }}>
              Von der Prüfung, ob du eine brauchst, bis zur fertigen Rechnungsstellung.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'Wir prüfen, ob du eine ABN wirklich brauchst', body:'Viele Backpacker registrieren eine ABN, die sie gar nicht brauchen. Wir prüfen zuerst deine Tätigkeit und geben dir eine klare Antwort.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Passend zu deiner Arbeit registriert', body:'Rideshare, Lieferdienst, Freelance oder Vertrag - wir richten deine ABN korrekt für deine tatsächliche Tätigkeit ein.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'GST nur, wenn es dich betrifft', body:'Wir sagen dir, ob die 75.000 $ GST-Grenze für dich gilt - damit du dich nie für Steuern registrierst, die du nicht schuldest.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'Ab Tag 1 rechnungsbereit', body:'Deine ABN ist aktiv und konform mit dem Australian Business Register - du kannst sofort loslegen.' },
            ].map((item,i) => (
              <div key={i} className="bg-white rounded-2xl flex gap-4"
                style={{ padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)' }}>
                <div className="flex items-center justify-center flex-shrink-0 text-forest-500"
                  style={{ width:'36px', height:'36px', minWidth:'36px', background:'#EAF6F1', borderRadius:'8px' }}>
                  {item.icon}
                </div>
                <div style={{ paddingTop:'2px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize:'clamp(13px, 1.2vw, 14px)', letterSpacing:'-0.01em', marginBottom:'6px', lineHeight:1.35 }}>{item.title}</p>
                  <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 lg:mt-8">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '320px', width: '100%' }}>
              ABN registrieren →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: 'rgba(10,15,13,0.4)' }}>
              Konform mit dem Australian Business Register
            </p>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-7 lg:mb-10">
            <span className="section-label center">Was Reisende sagen</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.15, letterSpacing:'-0.025em', marginTop:'10px', maxWidth:'34ch' }}>
              So haben Backpacker ihre ABN richtig registriert
            </h2>
          </div>
          <GoogleReviews lang="de" />
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-10 lg:py-16" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">Der einfache Weg</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              Es gibt einen einfacheren Weg, deine ABN zu registrieren
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Die ABN selbst zu registrieren kann teure Fehler verursachen
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Eine ABN registrieren, obwohl du Angestellter bist','Die falsche Geschäftstätigkeit wählen','Kein System, um Einnahmen zu erfassen oder Steuer zurückzulegen','Vergessen, ABN-Einnahmen bei der Steuer anzugeben'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Nutze unseren geführten ABN-Service
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['Wir prüfen, ob eine ABN wirklich zu dir passt','Mit der korrekten Geschäftstätigkeit registriert','Klare Hinweise zu Aufzeichnungen und Steuerrücklagen','Unterstützung bis hin zu deiner Steuererklärung'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                ABN registrieren →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO REGISTER ──────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">Schritt für Schritt</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '26ch', marginTop: '8px', marginBottom: '8px' }}>
              In 4 einfachen Schritten zur ABN
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize: '13.5px', lineHeight: 1.7 }}>
              Einfacher, begleiteter Prozess von Anfang bis Ende
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom: '48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 20%, #0B5240 80%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex: 1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width: '40px', height: '40px', background: '#0B5240', fontSize: '15px', marginBottom: '18px', boxShadow: '0 0 0 5px #F5F9F7, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize: '14px', marginBottom: '7px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize: '12.5px', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '28px', gap: '0' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-3.5" style={{ paddingBottom: i < STEPS.length - 1 ? '18px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width: '28px', height: '28px', background: '#0B5240', fontSize: '12px', flexShrink: 0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 mt-1.5"
                      style={{ width: '1px', minHeight: '18px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '3px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO HAVE READY ── */}

      {/* ── RELATED GUIDES (internal links to supporting blog content) ─────── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-6">
            <span className="section-label center">Mehr erfahren</span>
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              Ratgeber zur ABN für Working Holiday Maker
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/de/blog/what-is-an-abn', label: 'Was ist eine ABN und brauchst du eine mit Working Holiday Visum?' },
              { href: '/de/blog/how-to-register-for-an-abn', label: 'Wie du als Backpacker eine ABN in Australien registrierst' },
              { href: '/de/blog/employee-vs-contractor-australia', label: 'Angestellter oder Contractor: was Working Holiday Maker wissen müssen' },
              { href: '/de/blog/gst-and-abn-for-working-holiday-makers', label: 'GST und ABN: müssen sich Working Holiday Maker registrieren?' },
              { href: '/de/blog/sole-trader-vs-company-australia-working-holiday', label: 'Sole Trader vs. Company: was ist die richtige Struktur für deine ABN?' },
              { href: '/de/blog/uber-doordash-rideshare-abn-working-holiday', label: 'Uber, DoorDash oder Rideshare: ABN- und Steuerregeln' },
            ].map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500"
              >
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">

            <div className="text-center">
              <span className="section-label center">FAQ</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                ABN-Fragen beantwortet
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
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
        eyebrow="Was kommt als Nächstes?"
        heading="Nächster Schritt: deine Steuererklärung"
        body="Am Ende des Finanzjahres musst du deine Steuererklärung einreichen und deine ABN-Einnahmen deklarieren."
        cta="Steuererklärung starten →"
        href="/de/tax-return"
      />
      <MobileCta href={WA_URL} lang="de" />
    </>
  )
}

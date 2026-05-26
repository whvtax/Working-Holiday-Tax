import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Super auszahlen (DASP) für Working Holiday Visuminhaber',
  description: 'Hol dir deine australische Superannuation nach Verlassen Australiens zurück. 12 % deines Lohns wurden eingezahlt - wir helfen dir per DASP zur Auszahlung.',
  keywords: [
    'DASP Super auszahlen',
    'Departing Australia Superannuation Payment Deutsch',
    'Super Rückzahlung Working Holiday',
    'Super beantragen nach Verlassen Australien',
    'Super auszahlen 417 Visum',
    'Super auszahlen 462 Visum',
    'Backpacker Super Rückzahlung',
    'WHM Superannuation Antrag',
  ],
  alternates: { canonical: '/de/superannuation', languages: { 'en-AU': '/superannuation', 'de': '/de/superannuation', 'x-default': '/superannuation' } },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://workingholidaytax.com.au/de/superannuation',
    siteName: 'Working Holiday Tax',
    title: 'Super auszahlen (DASP) für Working Holiday Visuminhaber',
    description: 'Hol dir deine australische Super über den DASP-Prozess zurück.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super auszahlen (DASP) für Working Holiday Visuminhaber',
    description: 'Hol dir deine australische Super zurück, wenn du abreist.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Ich habe Australien vor Jahren verlassen. Kann ich meine Super noch beantragen?',
    answer: 'Ja. Es gibt keine Frist für die Beantragung deiner Super. Auch wenn dein Guthaben schon ans ATO überwiesen wurde, kannst du es noch zurückholen.',
  },
  {
    question: 'Ich hatte mehrere Arbeitgeber - habe ich mehrere Superkonten?',
    answer: 'Du hast vielleicht mehrere Superkonten von verschiedenen Arbeitgebern. Wir helfen dir, alles zu finden und zu bündeln, bevor wir deinen Antrag stellen.',
  },
  {
    question: 'Wie lange dauert es, bis ich meine Super bekomme?',
    answer: 'Superauszahlungen (DASP) werden meistens innerhalb von 2-4 Wochen nach Genehmigung des Antrags ausgezahlt. Das Geld geht direkt auf dein Bankkonto.',
  },
  {
    question: 'Wohin wird meine Super gezahlt - australisches oder ausländisches Konto?',
    answer: 'Deine Super wird direkt auf dein Bankkonto überwiesen. Wir können die Auszahlung auf ein australisches oder ein ausländisches Konto arrangieren, je nachdem, was dir lieber ist.',
  },
  {
    question: 'Bekomme ich Super, wenn ich unter einer ABN gearbeitet habe?',
    answer: 'Normalerweise nicht. Für ABN-Arbeit (also als Contractor/Selbstständiger) wird in der Regel keine Super gezahlt. Super gibt es meistens nur, wenn du als Angestellter eingestuft bist. Als Contractor mit ABN bist du selbst dafür verantwortlich, eine Supereinzahlung zu organisieren, falls du das möchtest.',
  },
]

const STEPS = [
  { n: '1', title: 'Erzähl uns deine Situation', body: 'Schick uns deine Visa- und Arbeitsdaten, damit wir dich richtig beraten können.' },
  { n: '2', title: 'Schick uns deine Unterlagen',  body: 'Reisepass, TFN und Superfondsinfos - schnell und einfach.' },
  { n: '3', title: 'Wir kümmern uns um alles',  body: 'Wir bereiten alles vor und reichen deinen Antrag korrekt ein.' },
  { n: '4', title: 'Deine Superauszahlung kommt',    body: 'Dein Geld kommt direkt auf dein australisches Bankkonto.' },
]

const TESTIMONIALS = [
  {
    name: "Liam O'Connor",
    from: 'Irland · WHV 417',
    quote: 'Ich hatte mehrere Arbeitgeber und wusste nicht, wie ich meine Super zurückbekomme. Working Holiday Tax hat sich um alles gekümmert und mir geholfen, sie zurückzuholen.',
    amount: '3.200 $',
    initials: 'L',
    bgColor: '#EAF6F1',
    textColor: '#0B5240',
  },
  {
    name: 'Jonas Müller',
    from: 'Deutschland · WHV 417',
    quote: 'Mega einfacher Prozess. Sie haben mir alles klar erklärt und dafür gesorgt, dass ich meine komplette Super zurückbekomme. Klare Empfehlung.',
    amount: '4.100 $',
    initials: 'J',
    bgColor: '#EAF6F1',
    textColor: '#0B5240',
  },
]

const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
  </svg>
)

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
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: 'https://workingholidaytax.com.au/de' },
    { '@type': 'ListItem', position: 2, name: 'Super auszahlen', item: 'https://workingholidaytax.com.au/de/superannuation' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://workingholidaytax.com.au/de/superannuation#service',
  name: 'DASP Superannuation Auszahlung',
  description: 'Wir holen deine in Australien angesparte Superannuation zurück (DASP) nach deiner Abreise - auf dein Konto weltweit.',
  serviceType: 'DASP Application',
  category: 'Superannuation Withdrawal Service',
  url: 'https://workingholidaytax.com.au/de/superannuation',
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
    '@id': 'https://workingholidaytax.com.au/#organization',
    name: 'Working Holiday Tax',
    url: 'https://workingholidaytax.com.au',
    description: 'Registrierte australische Steueragentur, spezialisiert auf Working Holiday Maker.',
    knowsLanguage: ['de', 'en', 'ja'],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '300',
    bestRating: '5',
    worstRating: '1',
  },
}


export default function GermanSuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/de" className="transition-colors hover:text-forest-500">Startseite</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Super auszahlen</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Super auszahlen
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize:'clamp(24px,3.2vw,44px)',
                lineHeight:1.06,
                letterSpacing:'-0.03em',
                marginBottom:'10px',
              }}>
              {/* Desktop: locked 2 lines - nowrap per line */}
              <span className="hidden lg:block">
                <span style={{ display:'block' }}>Hol dir deine Super zurück</span>
                <span style={{ display:'block', color:'#0B5240' }}>wenn du Australien verlässt</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Hol dir deine Super zurück</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>wenn du Australien verlässt</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              Wir wickeln den kompletten DASP-Prozess für dich ab.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              
              Die meisten Zahlungen kommen innerhalb von 28 Tagen an.
            
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Super beantragen →
              </a>
              <a href="#how-it-works"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1', width:'100%' }}>
                So funktioniert es →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['1.200+ Backpackern geholfen','4,9★ aus 300+ Bewertungen','45+ Länder unterstützt','~1 Std. Antwortzeit'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS SUPER? - Unique design: "Don't leave it behind" ───── */}
      <section className="super-intro-section">
        <div className="super-intro-container">
          <div className="super-intro-grid">

            {/* Left: Explainer */}
            <div className="super-intro-content">
              <p className="super-intro-eyebrow">Verstecktes Geld auf deinen Namen</p>
              <h2 className="super-intro-heading">
                Was ist Superannuation?
              </h2>
              <p className="super-intro-body">
                <strong>Superannuation</strong> (kurz &quot;Super&quot;) ist das australische Rentensystem. Per Gesetz zahlt dein Arbeitgeber <strong>12 % deines Lohns</strong> zusätzlich zu deinem Gehalt in einen Superfonds ein - du hast also mehr verdient, als du denkst.
              </p>
              <p className="super-intro-body">
                Als Working Holiday Maker kannst du dieses Geld zurückbekommen, wenn du Australien verlässt. Das läuft über den sogenannten <strong>DASP - Departing Australia Superannuation Payment</strong>.
              </p>
              <p className="super-intro-body">
                Die Auszahlung wird mit 65 % besteuert, aber die restlichen 35 % sind echtes Geld in deiner Tasche. Für die meisten Backpacker sind das zwischen <strong>2.000 und 5.000 AUD</strong>, von denen sie gar nichts wussten.
              </p>
            </div>

            {/* Right: Visual - "Don't leave it behind" boarding pass */}
            <div className="super-intro-visual">
              <div className="super-boarding-card">
                <div className="super-boarding-header">
                  <span className="super-boarding-from">AUS</span>
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" aria-hidden="true">
                    <path d="M2 10h28M22 4l8 6-8 6" stroke="#0B5240" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="super-boarding-to">HOME</span>
                </div>
                <div className="super-boarding-divider"></div>
                <div className="super-boarding-meta">
                  <div>
                    <p className="super-boarding-meta-label">Passagier</p>
                    <p className="super-boarding-meta-value">Du</p>
                  </div>
                  <div>
                    <p className="super-boarding-meta-label">Status</p>
                    <p className="super-boarding-meta-value super-boarding-status-warn">
                      Super zurücklassen
                    </p>
                  </div>
                </div>
                <div className="super-boarding-amount-block">
                  <p className="super-boarding-amount-label">Nicht beantragte Super</p>
                  <p className="super-boarding-amount">2.000 - 5.000 $</p>
                </div>
              </div>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">Wir holen deine Super für dich zurück</h3>
              <p className="service-cta-sub">Kostenlose Erstberatung. Vom Finden deiner Superfonds bis zur DASP-Beantragung - wir wickeln den ganzen Prozess ab, damit dein Geld nicht in Australien zurückbleibt.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Meine Super beantragen →
            </a>
          </div>
        </div>
      </section>

      {/* ── CLARITY - THIS IS YOUR MONEY ──────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Das ist dein Geld</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              Deine Super gehört dir. Du musst sie nur beantragen.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4"/><path d="M11 7v4.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'Arbeitgeber zahlen sie für dich ein',
                body: 'Per australischem Gesetz zahlt dein Arbeitgeber die Super zusätzlich zu deinem Lohn ein.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="3" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 6V5a4 4 0 018 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M9 12l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: 'Das ist dein Geld',
                body: 'Deine Super wächst, während du in Australien arbeitest, und du kannst sie beantragen, wenn du das Land verlässt.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 3v18M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'Wir holen sie für dich zurück',
                body: 'Wir finden deine Super, bereiten den Antrag vor und reichen ihn ein. Sobald er bearbeitet ist, bekommst du dein Geld.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-forest-500" style={{ background: '#EAF6F1', marginBottom: '12px' }}>
                  {item.icon}
                </div>
                <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '26ch' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center reveal delay-3" style={{ marginTop: '28px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
              style={{ fontSize: '13.5px', color: '#0B5240' }}>
              Superberechtigung prüfen →
            </a>
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">Echte Ergebnisse</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              So haben Reisende wie du ihre Super zurückbekommen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto reveal delay-1">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 flex flex-col" style={{ boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.07)', border: '1px solid #E2EFE9' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="text-[13px] font-light text-body leading-[1.75] flex-1" style={{ marginBottom: '14px' }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0" style={{ background: t.bgColor, color: t.textColor }}>{t.initials}</div>
                    <div>
                      <p className="text-[12.5px] font-semibold text-ink">{t.name}</p>
                      <p className="text-[11.5px] text-subtle mt-0.5">{t.from}</p>
                    </div>
                  </div>
                  <span className="font-serif font-black text-forest-500" style={{ fontSize: '17px', letterSpacing: '-0.03em' }}>{t.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">So funktioniert es</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              In 4 einfachen Schritten
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13.5px' }}>
              Einfach, geführt, von Anfang bis Ende
            </p>
          </div>

          <div className="reveal delay-1">
            <div className="hidden lg:block">
              <div className="relative flex items-start">
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-[2px]" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>
                      {s.n}
                    </div>
                    <p className="text-[14px] font-semibold text-ink mb-2 text-center" style={{ letterSpacing: '-0.01em' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.7] text-center">{s.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:hidden flex flex-col">
              {STEPS.map((s, i) => (
                <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div style={{ paddingTop: '3px' }}>
                    <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.65]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 28px', fontSize: '14.5px', maxWidth: '300px', width: '100%' }}>
              Super beantragen →
            </a>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY + WHAT YOU NEED ───────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="reveal">
              <span className="section-label center lg:text-left">Wer kann beantragen?</span>
              <h2 className="font-serif font-black text-ink mx-auto lg:mx-0 text-center lg:text-left" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '20px', textWrap: 'balance' }}>
                Du kannst deine Super beantragen,<br />
                <em className="not-italic font-normal text-forest-400">wenn du Australien verlässt</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Dein Visum ist abgelaufen oder gekündigt', body: 'Du kannst beantragen, sobald du Australien verlassen hast - keine Wartezeit.' },
                  { label: 'Du hast kein australisches Visum mehr',   body: 'Du darfst kein anderes aktives Visum in Australien haben.' },
                  { label: 'Du hast Supereinzahlungen',           body: 'Stell sicher, dass dein Arbeitgeber wirklich Super eingezahlt hat.' },
                ].map((item, i) => (
                  <div key={i} style={{ paddingTop: '14px', paddingBottom: '14px', borderTop: '1px solid #EDF4F0' }}>
                    <div className="flex items-start gap-2 mb-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                        <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                        <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    </div>
                    <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ paddingLeft: '22px' }}>{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            <div className="reveal delay-1 text-center lg:text-left">
              <span className="section-label center lg:text-left">Was du brauchst</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '18px', textWrap: 'balance' }}>
                Was du brauchst, um deine Super zu beantragen
              </h2>
              <div className="space-y-3.5 mb-5">
                {[
                  'Deine Reisepassdaten',
                  'Deine Tax File Number (TFN)',
                  'Name und Mitgliedsnummer deines Superfonds',
                  'Das Eröffnungsdatum deines Superfonds',
                  'Deine Bankverbindung für die Auszahlung',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[13.5px] font-light text-body leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center">
              <span className="section-label center">FAQ</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                Häufige Fragen zu Super.
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13.5px', lineHeight:1.7, marginBottom:'24px' }}>
                Noch eine Frage? Schreib uns direkt.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 28px', fontSize:'14px', width:'100%', maxWidth:'220px' }}>
                Jetzt Hilfe holen →
              </a>
            </div>

            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>


      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="Was kommt als nächstes?"
        heading="Bist du Medicare-berechtigt?"
        body="Je nach Herkunftsland hast du eventuell Anspruch auf Medicare oder bist von der Medicare Levy befreit."
        cta="Medicareberechtigung prüfen →"
        href="/de/medicare"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}

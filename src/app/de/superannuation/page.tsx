import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Super-Rückerstattung (DASP) für Working Holiday Maker — Australien',
  description: 'Hol dir deine Super-Rückerstattung in Australien nach deiner Abreise als Working Holiday Maker (417/462). 12 % deines Lohns wurden in Super eingezahlt — per DASP-Antrag bekommst du es zurück.',
  keywords: [
    'Super-Rückerstattung Australien',
    'Super zurück Australien',
    'DASP Rückerstattung',
    'DASP Auszahlung Working Holiday',
    'DASP beantragen',
    'Super zurückholen Australien Backpacker',
    'Super auszahlen Working Holiday Maker',
    'Super auszahlen Australien',
    'Departing Australia Superannuation Payment Deutsch',
    'Super-Rückerstattung 417 Visum',
    'Super-Rückerstattung 462 Visum',
    'Backpacker Super zurückholen',
    'Super beantragen nach Verlassen Australien',
    'Super beantragen nach Rückkehr Deutschland',
    'Super auszahlen 417 Visum',
    'Super auszahlen 462 Visum',
    'WHM Superannuation Antrag',
    'wie bekomme ich meine Super zurück Australien',
    'wie viel Super zurück Australien',
    'Super-Rückerstattung Working Holiday Maker',
    'Pensionskasse Australien zurück',
    'Rente Australien zurück Backpacker',
  ],
  alternates: { canonical: '/de/superannuation', languages: { 'en-AU': '/superannuation', 'de': '/de/superannuation', 'ja': '/ja/superannuation', 'x-default': '/superannuation' } },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'Super-Rückerstattung (DASP) für Working Holiday Maker — Australien',
    description: 'Hol dir deine Super-Rückerstattung in Australien nach deiner Abreise. 12 % deines Lohns wurden eingezahlt — per DASP zurück.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super-Rückerstattung (DASP) für Working Holiday Maker',
    description: 'Hol dir deine Super-Rückerstattung in Australien nach deiner Abreise zurück.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Ich habe Australien vor Jahren verlassen. Kann ich meine Super noch beantragen?',
    answer: 'Ja. Es gibt keine Frist für die Beantragung deiner Super. Auch wenn dein Guthaben schon ans ATO überwiesen wurde, kannst du es noch zurückholen.',
  },
  {
    question: 'Ich hatte mehrere Arbeitgeber — habe ich mehrere Superkonten?',
    answer: 'Du hast vielleicht mehrere Superkonten von verschiedenen Arbeitgebern. Wir helfen dir, alles zu finden und zu bündeln, bevor wir deinen Antrag stellen.',
  },
  {
    question: 'Wie lange dauert es, bis ich meine Super bekomme?',
    answer: 'Superauszahlungen (DASP) werden meistens innerhalb von 2-4 Wochen nach Genehmigung des Antrags ausgezahlt. Das Geld geht direkt auf dein Bankkonto.',
  },
  {
    question: 'Wohin wird meine Super gezahlt — australisches oder ausländisches Konto?',
    answer: 'Deine Super wird direkt auf dein Bankkonto überwiesen. Wir können die Auszahlung auf ein australisches oder ein ausländisches Konto arrangieren, je nachdem, was dir lieber ist.',
  },
  {
    question: 'Kann ich meine DASP Super-Rückerstattung aus Deutschland beantragen?',
    answer: 'Ja. Wir helfen Working Holiday Makern aus Deutschland, Österreich, der Schweiz und weltweit, ihre DASP-Rückerstattung komplett online zu beantragen, nachdem sie nach Hause zurückgekehrt sind. Deine Super-Rückerstattung kann direkt auf dein deutsches Bankkonto überwiesen werden.',
  },
  {
    question: 'Wie wird meine DASP Super-Rückerstattung besteuert?',
    answer: 'DASP-Auszahlungen werden zu einem festen Steuersatz besteuert, der vom ATO festgelegt ist und vor der Auszahlung einbehalten wird. Was du bekommst, ist der Nettobetrag nach Steuern. Der genaue Satz hängt von deiner Visumsklasse und der Art der ausgezahlten Super ab.',
  }
]

const STEPS = [
  { n: '1', title: 'Erzähl uns deine Situation', body: 'Schick uns deine Visa- und Arbeitsdaten, damit wir dich richtig beraten können.' },
  { n: '2', title: 'Schick uns deine Unterlagen',  body: 'Reisepass, TFN und Superfondsinfos — schnell und einfach.' },
  { n: '3', title: 'Wir kümmern uns um alles',  body: 'Wir bereiten alles vor und reichen deinen Antrag korrekt ein.' },
  { n: '4', title: 'Deine Superauszahlung kommt',    body: 'Dein Geld kommt direkt auf dein australisches Bankkonto.' },
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
    { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${SITE_URL}/de` },
    { '@type': 'ListItem', position: 2, name: 'Super auszahlen', item: `${SITE_URL}/de/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/de/superannuation#service`,
  name: 'DASP Superannuation Auszahlung',
  description: 'Wir holen deine in Australien angesparte Superannuation zurück (DASP) nach deiner Abreise — auf dein Konto weltweit.',
  serviceType: 'DASP Application',
  category: 'Superannuation Withdrawal Service',
  url: `${SITE_URL}/de/superannuation`,
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

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'So beantragst du deine DASP-Superauszahlung nach der Ausreise aus Australien',
  description: 'Schritt-für-Schritt-Anleitung für Working Holiday Maker, wie du deine Superauszahlung über das Departing Australia Superannuation Payment (DASP) beantragst.',
  totalTime: 'P28D',
  inLanguage: 'de',
  step: STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}


export default function GermanSuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Brotkrümelnavigation" className="flex items-center gap-2 mb-4 lg:mb-6"
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
              {/* Desktop: locked 2 lines — nowrap per line */}
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
              {['350+ Backpackern geholfen',<GoogleRating key="rating" variant="pill" lang="de" />,'45+ Länder unterstützt','~1 Std. Antwortzeit'].map((t,i) => (
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
                <strong>Superannuation</strong> (kurz &quot;Super&quot;) ist das australische Rentensystem. Per Gesetz zahlt dein Arbeitgeber <strong>12 % deines Lohns</strong> zusätzlich zu deinem Gehalt in einen Superfonds ein — du hast also mehr verdient, als du denkst.
              </p>
              <p className="super-intro-body">
                Als Working Holiday Maker kannst du dieses Geld zurückbekommen, wenn du Australien verlässt. Das läuft über den sogenannten <strong>DASP — Departing Australia Superannuation Payment</strong>.
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
              <p className="service-cta-sub">Kostenlose Erstberatung. Vom Finden deiner Superfonds bis zur DASP-Beantragung — wir wickeln den ganzen Prozess ab, damit dein Geld nicht in Australien zurückbleibt.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Meine Super beantragen →
            </a>
          </div>
        </div>
      </section>

      {/* ── CLARITY — THIS IS YOUR MONEY ──────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Warum unser Service</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              Wir helfen dir, die dir zustehende Super zurückzuholen
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'Wir finden jedes Superkonto', body:'Mehrere Jobs bedeuten oft mehrere Fonds. Wir finden sie alle, damit nichts von deiner Super verloren geht.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Auch nach der Abreise beantragen', body:'Wir reichen deinen DASP komplett online ein und zahlen ihn auf dein Konto im Ausland — auch Jahre nach deiner Rückkehr.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Es ist dein Geld, nicht das des ATO', body:'Nicht beantragte Super geht irgendwann an das ATO. Wir sorgen dafür, dass sie stattdessen zu dir zurückkommt.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'DASP eingereicht, Steuer geregelt', body:'Wir bereiten deine Departing Australia Superannuation Payment vor und kümmern uns korrekt um die Quellensteuer.' },
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
            <span className="section-label center">Was Reisende sagen</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              So haben Reisende wie du ihre Super zurückbekommen
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
              Es gibt einen einfacheren Weg, deine Super zu beantragen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Die Super (DASP) selbst zu beantragen kann langsam und verwirrend sein
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Verlorene oder mehrere Superfonds aufspüren','Komplexe DASP-Formulare und ATO-Anforderungen','Die Quellensteuer falsch berechnen','Keine Hilfe, wenn dein Antrag sich verzögert'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Nutze unseren geführten DASP-Service
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['Wir finden jeden Superfonds für dich','Wir bereiten deinen DASP vor und reichen ihn korrekt ein','Quellensteuer richtig behandelt','Unterstützung, bis das Geld auf deinem Konto ist'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                Super beantragen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">Schritt für Schritt</span>
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
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 4px #F5F9F7, 0 0 0 5px #C8EAE0' }}>
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

          <div className="text-center mt-8 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 28px', fontSize: '14.5px', maxWidth: '300px', width: '100%' }}>
              Super beantragen →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT TO HAVE READY ── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6 lg:mb-8">
              <span className="section-label center">Was du brauchst</span>
              <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.15, letterSpacing:'-0.025em' }}>
                Was du zum Start brauchst
              </h2>
            </div>
            <div className="space-y-0">
              {[{ n:'01', label:'Reisepass', hint:'Zur Identitätsprüfung' }, { n:'02', label:'Tax File Number (TFN)', hint:'Deine Steuer-ID' }, { n:'03', label:'Superfonds-Daten', hint:'Oder wir finden sie für dich' }, { n:'04', label:'Bankkonto', hint:'Wohin deine Auszahlung geht' }].map((item, i) => (
                <div key={i} className="flex items-center gap-3" style={{ paddingTop:'14px', paddingBottom:'14px', borderTop:'1px solid #EDF4F0' }}>
                  <div className="flex items-center justify-center font-serif font-black flex-shrink-0" style={{ width:'32px', height:'32px', borderRadius:'50%', background:'#EAF6F1', color:'#0B5240', fontSize:'13px', letterSpacing:'-0.02em' }}>
                    {item.n}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing:'-0.005em', lineHeight:1.35 }}>{item.label}</p>
                    <p className="text-[12px] font-light text-muted" style={{ lineHeight:1.4, marginTop:'1px' }}>{item.hint}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop:'1px solid #E2EFE9' }} />
            </div>
            <div className="text-center mt-8">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex" style={{ height:'52px', padding:'0 36px', fontSize:'15px', maxWidth:'320px', width:'100%', justifyContent:'center' }}>
                Super beantragen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">

            <div className="text-center">
              <span className="section-label center">FAQ</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                Häufige Fragen zu Super
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13.5px', lineHeight:1.7, marginBottom:'24px' }}>
                Noch eine Frage? Schreib uns direkt.
              </p>
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

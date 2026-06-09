import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Medicare in Australien für Working Holiday Visuminhaber',
  description: 'Verstehe, ob du als Working Holiday Visuminhaber Anspruch auf Medicare hast und wie die Medicare Levy funktioniert. Wir holen für dich das Befreiungszertifikat.',
  keywords: [
    'Medicare Working Holiday Australien',
    'Medicare Levy Befreiung',
    'Medicare Levy Befreiung Backpacker',
    'Medicare Levy Befreiung Working Holiday',
    'Medicare Levy Befreiung Deutschland',
    'Medicare 417 Visum',
    'Medicare 462 Visum',
    'RHCA Australien Deutsch',
    'Sozialversicherungsabkommen Australien',
    'Sozialversicherungsabkommen Deutschland Australien',
    'Medicare Levy Befreiungszertifikat',
    'Medicare Levy 2 Prozent',
    'Medicare Befreiung Steuererklärung',
    'Medicare Befreiung Backpacker Deutschland',
    'Medicare Levy zurückbekommen',
    'muss ich Medicare Levy zahlen Working Holiday',
  ],
  alternates: { canonical: '/de/medicare', languages: { 'en-AU': '/medicare', 'de': '/de/medicare', 'ja': '/ja/medicare', 'x-default': '/medicare' } },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/medicare`,
    siteName: 'Working Holiday Tax',
    title: 'Medicare in Australien für Working Holiday Visuminhaber',
    description: 'Verstehe Medicare und die Medicare Levy als Working Holiday Visuminhaber.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Medicare in Australien für Working Holiday Visuminhaber',
    description: 'Verstehe Medicare und die Medicare Levy in Australien.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const rhca = [
  'Großbritannien', 'Neuseeland', 'Irland', 'Schweden',
  'Niederlande', 'Finnland', 'Belgien', 'Italien',
  'Malta', 'Norwegen', 'Slowenien',
]

const faqs = [
  {
    question: 'Was ist die Medicare-Levy-Befreiung?',
    answer: 'Wenn du nicht für Medicare berechtigt bist - was auf die meisten Working Holiday Visuminhaber zutrifft - kannst du dich bei deiner Steuererklärung von der Medicare Levy befreien lassen. Wir kümmern uns darum als Teil unserer Steuererklärungsleistung.',
  },
  {
    question: 'Ich komme aus Deutschland. Bin ich für Medicare berechtigt?',
    answer: 'Deutschland hat KEIN Sozialversicherungsabkommen (RHCA) mit Australien. Das heißt: Als deutscher Working Holiday Maker bist du in der Regel NICHT für Medicare berechtigt. Stattdessen solltest du eine Medicare-Levy-Befreiung bei deiner Steuererklärung beantragen - das machen wir für dich.',
  },
  {
    question: 'Wenn ich nicht für Medicare berechtigt bin, muss ich trotzdem die Levy zahlen?',
    answer: 'Nicht, wenn du eine Befreiung beantragst. Wenn du nicht für Medicare berechtigt bist, solltest du in deiner Steuererklärung eine Medicare-Levy-Befreiung beantragen - dann wird sie dir nicht abgezogen.',
  },
  {
    question: 'Hat mein Working Holiday Visum Einfluss auf meine Medicareberechtigung?',
    answer: 'Ja. Die meisten Working Holiday Visuminhaber sind nicht für Medicare berechtigt, außer sie kommen aus einem Land mit Sozialversicherungsabkommen. Wenn du nicht berechtigt bist, beantragen wir die Medicare-Levy-Befreiung als Teil deiner Steuererklärung.',
  },
  {
    question: 'Wie wirkt sich die Medicare-Levy-Befreiung auf meine Steuerrückerstattung aus?',
    answer: 'Die Medicare Levy beträgt 2 % deines zu versteuernden Einkommens. Wenn du nicht für Medicare berechtigt bist und die Levy während des Jahres trotzdem abgezogen wurde, kann die Befreiung sie aus deiner Steuererklärung herausnehmen - was zu einer höheren Rückerstattung führen kann. Wir prüfen deine Berechtigung und beantragen die Befreiung im Rahmen deiner Steuererklärung.',
  },
  {
    question: 'Aus welchen Ländern besteht ein Medicare-Abkommen mit Australien?',
    answer: 'Australien hat Sozialversicherungsabkommen (RHCA) mit 11 Ländern, darunter Großbritannien, Irland, Italien, Schweden, die Niederlande, Belgien, Finnland, Norwegen, Malta, Slowenien und Neuseeland. Working Holiday Maker aus Deutschland und Österreich sind nicht abgedeckt und sollten eine Medicare-Levy-Befreiung in ihrer Steuererklärung beantragen.',
  }
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
  name: 'Medicare Levy Exemption Certificate',
  description: 'Beantragung des Medicare Levy Exemption Certificate - für Working Holiday Maker aus Ländern ohne RHCA wie Deutschland.',
  serviceType: 'Medicare Levy Exemption',
  category: 'Tax Exemption Service',
  url: `${SITE_URL}/de/medicare`,
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


export default function GermanMedicarePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Brotkrümelnavigation" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/de" className="transition-colors hover:text-forest-500">Startseite</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Medicare</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Medicare
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
                <span style={{ display:'block' }}>Verstehe deinen Medicarestatus</span>
                <span style={{ display:'block', color:'#0B5240' }}>vor deiner Steuererklärung</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Verstehe deinen Medicarestatus</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>vor deiner Steuererklärung</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              Wir prüfen deine Berechtigung und sorgen dafür, dass alles richtig in deiner Steuererklärung läuft.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              
              Wir finden raus, was für dich gilt.
            
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Berechtigung prüfen →
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


      {/* ── WHAT IS MEDICARE? - Unique design: 2% Levy / Exemption motif ─ */}
      <section className="medicare-intro-section">
        <div className="medicare-intro-container">
          <div className="medicare-intro-grid">

            {/* Left: Explainer */}
            <div className="medicare-intro-content">
              <p className="medicare-intro-eyebrow">Gesundheitssystem &amp; die 2 %-Levy</p>
              <h2 className="medicare-intro-heading">
                Was ist Medicare?
              </h2>
              <p className="medicare-intro-body">
                <strong>Medicare</strong> ist das öffentliche Gesundheitssystem in Australien. Es bietet Zugang zu vergünstigten medizinischen Leistungen und wird teilweise durch die <strong>2 %-Medicare Levy</strong> finanziert, die automatisch von deinem zu versteuernden Einkommen abgezogen wird.
              </p>
              <p className="medicare-intro-body">
                Die meisten Working Holiday Visuminhaber haben <strong>keinen Anspruch</strong> auf Medicareleistungen. Wenn du keinen Anspruch hast, solltest du die Levy auch nicht zahlen - und kannst sie zurückholen.
              </p>
              <p className="medicare-intro-body">
                Du wirst die Levy mit einem <strong>Medicare-Levy-Befreiungszertifikat</strong> los. Das wird bei deiner Steuererklärung angewendet und kann dir Hunderte bis Tausende Dollar sparen.
              </p>
            </div>

            {/* Right: Visual - Eligibility check card */}
            <div className="medicare-intro-visual">
              <div className="medicare-check-card">
                <div className="medicare-check-header">
                  <p className="medicare-check-title">Zahlst du die 2 %-Levy?</p>
                  <p className="medicare-check-subtitle">Die meisten Working Holiday Maker sollten das nicht</p>
                </div>

                <div className="medicare-check-items">
                  <div className="medicare-check-item">
                    <div className="medicare-check-icon medicare-check-x">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="medicare-check-label">Kein Anspruch auf Medicare</p>
                      <p className="medicare-check-desc">Die meisten 417 / 462 Visuminhaber</p>
                    </div>
                  </div>

                  <div className="medicare-check-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12l7 7 7-7" stroke="#2FA880" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>

                  <div className="medicare-check-item medicare-check-result">
                    <div className="medicare-check-icon medicare-check-v">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 7l3 3 5-6" stroke="#0B5240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="medicare-check-label">Befreiung beantragen</p>
                      <p className="medicare-check-desc">Die 2 %, die du das Jahr über gezahlt hast, zurückholen</p>
                    </div>
                  </div>
                </div>

                <div className="medicare-check-savings">
                  <p className="medicare-check-savings-label">Mögliche Rückzahlung</p>
                  <p className="medicare-check-savings-amount">500 - 2.000+ $</p>
                  <p className="medicare-check-savings-detail">je nach deinem Einkommen</p>
                </div>
              </div>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">Wir holen für dich die Medicare-Levy-Befreiung</h3>
              <p className="service-cta-sub">Kostenlose Erstberatung. Wir prüfen deine Berechtigung, bereiten dein Befreiungszertifikat vor und reichen es korrekt mit deiner Steuererklärung ein - damit du zurückbekommst, was du gar nicht zahlen musstest.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Meine Befreiung prüfen →
            </a>
          </div>
        </div>
      </section>

      {/* ── SIMPLE DECISION ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Deine zwei Optionen</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px' }}>
              Je nach Herkunftsland bist du möglicherweise von der Medicare Levy befreit.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-8 lg:mb-10 reveal delay-1">
            <div className="bg-white rounded-2xl flex flex-col" style={{ padding: '18px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ marginBottom: '10px', background: '#EAF6F1' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/>
                  <path d="M7 10l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-semibold text-ink" style={{ marginBottom: '6px' }}>Aus einem RHCA-Land (Sozialversicherungsabkommen)</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ marginBottom: '10px' }}>
                Wenn du für Medicare berechtigt bist, sorgen wir dafür, dass das korrekt in deiner Steuererklärung läuft, damit du nur zahlst, was du wirklich musst.
              </p>
            </div>

            <div className="bg-white rounded-2xl flex flex-col" style={{ padding: '18px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ marginBottom: '10px', background: '#FFFCF5' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#C47E10" strokeWidth="1.4"/>
                  <path d="M10 6v5M10 13.5v.5" stroke="#C47E10" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-semibold text-ink" style={{ marginBottom: '6px' }}>Aus einem Nicht-RHCA-Land (z.B. Deutschland)</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ marginBottom: '10px' }}>
                Wenn du keinen Anspruch auf Medicare hast, sorgen wir dafür, dass deine Medicare-Levy-Befreiung korrekt angewendet wird, damit du nicht zu viel Steuern zahlst.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── NOT SURE? - MAIN ENTRY POINT ──────────────────────────────────── */}
      <section className="py-8 lg:py-12" style={{ background: '#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[560px] mx-auto text-center">
            <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '10px' }}>
              Nicht sicher, ob du für Medicare berechtigt bist?
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              Wir prüfen deine Berechtigung und kümmern uns um die korrekte Anwendung.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold"
              style={{ height: '46px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px' }}>
              Berechtigung prüfen →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────────────── */}
      <section className="py-9 lg:py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Was wir für dich machen</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              Wir kümmern uns drum als Teil deiner Steuererklärung
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 reveal delay-1">
            {[
              {
                title: 'Wir prüfen deine Berechtigung',
                body: 'Wir prüfen dein Visum und Herkunftsland, um deine Medicareberechtigung festzustellen.',
              },
              {
                title: 'Wir wenden die richtige Lösung an',
                body: 'Wir sorgen dafür, dass die Medicare Levy oder die Befreiung korrekt in deiner Steuererklärung angewendet wird.',
              },
              {
                title: 'Wir verhindern, dass du unnötig Steuern zahlst',
                body: "Wir sorgen dafür, dass dir die Medicare Levy nicht abgezogen wird, wenn du sie gar nicht zahlen musst.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F5F9F7', border: '1px solid #C8EAE0' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '6px' }}>
                  <span className="flex-shrink-0 flex items-center justify-center" style={{ width:'18px', height:'18px', borderRadius:'50%', background:'#C8EAE0', border:'1px solid #A8D5C5' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5 3.5-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <p className="font-semibold text-ink" style={{ fontSize: 'clamp(13px, 1.2vw, 14px)', letterSpacing: '-0.01em' }}>{item.title}</p>
                </div>
                <p className="font-light text-muted leading-[1.65]" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', maxWidth: '26ch', paddingLeft:'26px' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDICARE LEVY EXEMPTION + VIDEO ───────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center reveal">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Medicare-Levy-Befreiung
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '40ch', marginBottom: '28px' }}>
              Wenn du keinen Anspruch auf Medicare hast, brauchst du eventuell eine Medicare-Levy-Befreiung vor deiner Steuererklärung.
            </p>
            {/* Mobile: portrait 9/16, Desktop: landscape 16/9 */}
            <div className="reveal delay-1 rounded-2xl overflow-hidden mx-auto w-full">
              {/* Mobile only (portrait) */}
              <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="Medicare-Levy-Befreiung erklärt"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                />
              </div>
              {/* Desktop (landscape) */}
              <div className="hidden sm:block" style={{ aspectRatio: '16/9', maxWidth: '720px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="Medicare-Levy-Befreiung erklärt"
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

      {/* ── COMMON CONFUSION ─────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '28px' }}>
            <span className="section-label center">FAQ</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '24ch', marginTop: '8px', textWrap: 'balance' }}>
              Häufige Fragen zu Medicare
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-1">
            {[
              { q: 'Muss ich mich für Medicare anmelden?', a: 'Nur, wenn du aus einem berechtigten RHCA-Land kommst. Sonst beantragen wir die Befreiung in deiner Steuererklärung.' },
              { q: 'Warum erscheint die Medicare Levy auf meiner Steuerrechnung?', a: 'Wenn dein Medicarestatus nicht korrekt eingetragen wurde, kann die Levy auftauchen. Wir beheben das, wenn wir deine Steuererklärung machen.' },
              { q: 'Ich nutze Medicare nicht - warum wird mir die Levy abgezogen?', a: 'Wenn keine Befreiung beantragt wurde, zieht das ATO die Levy automatisch ab. Wir beantragen die richtige Befreiung, damit du nicht zu viel zahlst.' },
              { q: 'Ersetzt eine Reiseversicherung Medicare?', a: 'Nein. Reiseversicherung und Medicare sind zwei verschiedene Systeme. Wenn du keinen Anspruch auf Medicare hast, solltest du dich auf deine Reiseversicherung für medizinische Kosten verlassen.' },
              { q: 'Beeinflusst mein Working Holiday Visum Medicare?', a: 'Ja. Die meisten Working Holiday Visuminhaber sind nicht für Medicare berechtigt, außer sie kommen aus einem RHCA-Land. Wir sorgen dafür, dass dein Medicarestatus korrekt in deiner Steuererklärung angewendet wird.' },
              { q: 'Kann ich mit einem Working Holiday Visum eine Medicarekarte bekommen?', a: 'Nur, wenn du aus einem berechtigten RHCA-Land kommst. Sonst beantragen wir stattdessen eine Medicare-Levy-Befreiung.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding: '16px', border: '1px solid #C8EAE0', boxShadow: '0 1px 2px rgba(0,0,0,.02)' }}>
                <p className="text-[13px] font-semibold text-ink" style={{ marginBottom: '6px' }}>{item.q}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="Was kommt als nächstes?"
        heading="Du bist bereit für deine Steuererklärung"
        body="Wir sorgen dafür, dass dein Medicarestatus korrekt angewendet wird, damit du nicht zu viel Steuern zahlst."
        cta="Steuererklärung starten →"
        href="/de/tax-return"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'TFN beantragen für Working Holiday Visa-Inhaber in Australien',
  description: 'Hol dir deine Steuernummer (TFN) schnell und korrekt. Schritt-für-Schritt-Begleitung von einem registrierten Steueragenten in Australien.',
  keywords: [
    'TFN beantragen Australien',
    'Steuernummer Australien',
    'Working Holiday TFN',
    'TFN 417 Visum',
    'TFN 462 Visum',
    'TFN Backpacker beantragen',
    'TFN für Working Holiday Maker',
    'Tax File Number Deutsch',
    'Steuernummer Australien beantragen',
  ],
  alternates: {
    canonical: `${SITE_URL}/de/tfn`,
    languages: {
      'en-AU': `${SITE_URL}/tfn`,
      'de': `${SITE_URL}/de/tfn`,
      'x-default': `${SITE_URL}/tfn`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN beantragen für Working Holiday Visa-Inhaber',
    description: 'Hol dir deine Steuernummer (TFN) schnell und korrekt - mit einem registrierten Steueragenten in Australien.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  { question: 'Kann ich schon arbeiten, bevor ich meine TFN erhalten habe?', answer: 'Ja. Du kannst sofort anfangen zu arbeiten, musst deinem Arbeitgeber deine TFN aber innerhalb von 28 Tagen geben. Bis dahin behält dein Arbeitgeber Steuern zum Höchstsatz ein.' },
  { question: 'Wohin wird meine TFN geschickt?', answer: 'Deine TFN wird vom ATO per Post an deine australische Adresse geschickt. Stell sicher, dass du eine Adresse angibst, an der du zuverlässig Post empfangen kannst.' },
  { question: 'Kann ich mit einem Touristenvisum eine TFN bekommen?', answer: 'Nein. Du brauchst ein gültiges Arbeitsvisum, zum Beispiel ein Working Holiday Visum (Subclass 417 oder 462), um eine TFN beantragen zu können.' },
  { question: 'Was passiert, wenn ich meine TFN vergesse?', answer: 'Du kannst deine TFN herausfinden, indem du den ATO direkt kontaktierst, in alten Steuerdokumenten nachschaust oder deinen Steueragenten fragst.' },
  { question: 'Was ist ein TFN Declaration Form?', answer: 'Ein Formular, das du ausfüllst, wenn du einen neuen Job anfängst. Es teilt deinem Arbeitgeber mit, wie viel Steuer er von deinem Gehalt einbehalten muss.' },
]

const STEPS = [
  { n: '1', title: 'Erzähl uns deine Situation',           body: 'Teil uns deine Visum-Details mit, damit wir dich richtig beraten können.' },
  { n: '2', title: 'Schick uns deine Unterlagen',          body: 'Nur dein Reisepass und ein paar persönliche Daten - schnell und einfach.' },
  { n: '3', title: 'Wir bearbeiten deinen Antrag',         body: 'Wir bereiten alles vor und reichen es korrekt für dich ein.' },
  { n: '4', title: 'Du erhältst deine TFN',                body: 'Deine TFN wird vom ATO ausgestellt und innerhalb von 28 Tagen an deine australische Adresse geschickt.' },
]

const TESTIMONIALS = [
  { name: 'Olivia Rossi',  from: 'Italien · WHV 417',     quote: 'Ich hatte mehrere Arbeitgeber und keine Ahnung, was zu tun ist. Sie haben mich durch alles begleitet und es einfach gemacht.', amount: '', initials: 'O', bgColor: '#EAF6F1', textColor: '#0B5240' },
  { name: 'Sophie Durant', from: 'Frankreich · WHV 417',  quote: 'Meine TFN war in nur zwei Tagen geregelt und alles wurde klar und transparent gemacht. Kein Stress, einfach reibungslos.', amount: '', initials: 'S', bgColor: '#FDF0D5', textColor: '#7A4A00' },
]

const IconStar = () => (<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)

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
    { '@type': 'ListItem', position: 2, name: 'TFN beantragen', item: `${SITE_URL}/de/tfn` },
  ],
}

export default function TFNPageDE() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/de" className="transition-colors hover:text-forest-500">Startseite</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN beantragen</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                TFN-Antrag
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '10px' }}>
              <span className="hidden lg:block">
                <span style={{ display: 'block' }}>Beantrage deine TFN und arbeite</span>
                <span style={{ display: 'block', color: '#0B5240' }}>legal in Australien.</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display: 'block', fontSize: '22px' }}>Beantrage deine TFN und arbeite</span>
                <span style={{ display: 'block', color: '#0B5240', fontSize: '22px' }}>legal in Australien.</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize: 'clamp(13px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.4 }}>
              Wir sorgen dafür, dass deine TFN beim ersten Mal richtig beantragt wird.
            </p>

            <p className="font-light"
              style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.58)', maxWidth: '48ch', marginBottom: '0' }}>
              <span className="lg:hidden">Ohne TFN werden WHV-Inhaber mit 45 % besteuert.</span>
              <span className="hidden lg:inline">Ohne TFN werden Working Holiday Visa-Inhaber mit 45 % besteuert.</span>
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '20px', maxWidth: '480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                TFN beantragen →
              </a>
              <a href="#how-to-apply"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                So funktioniert&apos;s →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['1.200+ Backpacker geholfen', '4,9★ von 300+ Bewertungen', '45+ Länder', 'Antwort in unter 1 Std'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize: '12px', color: 'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS A TFN? ───────────────────────────────────────────────── */}
      <section className="tfn-intro-section">
        <div className="tfn-intro-container">
          <div className="tfn-intro-grid">

            <div className="tfn-intro-content">
              <h2 className="tfn-intro-heading">
                Was ist eine TFN?
              </h2>
              <p className="tfn-intro-body">
                Eine <strong>Tax File Number (TFN)</strong> ist eine persönliche Steuernummer, die vom australischen Finanzamt (ATO) ausgegeben wird. Sie ist das Erste, was du brauchst, bevor du in Australien arbeiten kannst.
              </p>
              <p className="tfn-intro-body">
                Ohne TFN muss dein Arbeitgeber per Gesetz den höchsten Steuersatz von <strong>45 %</strong> von jedem Gehalt einbehalten - egal wie viel du verdienst.
              </p>
              <p className="tfn-intro-body">
                Mit TFN zahlst du den normalen Working Holiday Steuersatz von <strong>15 %</strong> auf Einkommen bis 45.000 AUD. Das ist ein riesiger Unterschied - manchmal mehrere Hundert Dollar pro Woche.
              </p>
              <div className="tfn-intro-note">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <circle cx="12" cy="12" r="9" stroke="#0B5240" strokeWidth="1.6"/>
                  <path d="M12 8v5M12 16h.01" stroke="#0B5240" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <p style={{ margin: 0, fontSize: '13.5px', color: '#2A3C34', lineHeight: 1.6 }}>
                  Deine TFN ist ein Leben lang gültig - du musst sie nur einmal beantragen, auch wenn du Australien verlässt und später zurückkommst.
                </p>
              </div>
            </div>

            <div className="tfn-intro-visual">
              <div className="tfn-comparison-card tfn-comparison-bad">
                <p className="tfn-comparison-label">Ohne TFN</p>
                <p className="tfn-comparison-rate">45 %</p>
                <p className="tfn-comparison-detail">Von jedem Gehalt einbehalten</p>
              </div>
              <div className="tfn-comparison-divider">
                <div className="tfn-comparison-arrow">↓</div>
                <p className="tfn-comparison-savings">Bis zu 30 % sparen</p>
              </div>
              <div className="tfn-comparison-card tfn-comparison-good">
                <p className="tfn-comparison-label">Mit TFN</p>
                <p className="tfn-comparison-rate">15 %</p>
                <p className="tfn-comparison-detail">Standard WHM-Steuersatz</p>
              </div>
            </div>

          </div>

          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">Wir kümmern uns um deinen gesamten TFN-Antrag</h3>
              <p className="service-cta-sub">Kostenlose Erstberatung auf WhatsApp. Wir reichen deinen Antrag beim ersten Mal korrekt ein - meistens innerhalb einer Stunde.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Meine TFN beantragen →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl lg:max-w-2xl mx-auto text-center mb-8 lg:mb-14">
            <span className="section-label center">Warum unser Service</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px' }}>
              Wir wickeln deinen TFN-Antrag komplett ab - präzise und ohne Verzögerungen.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom: '28px', alignItems: 'stretch' }}>
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title: 'Beim ersten Mal korrekt eingereicht.',          body: 'Jeder Antrag wird vor dem Einreichen geprüft, um Fehler oder Verzögerungen zu vermeiden.' },
              { icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Mit dem richtigen Steuersatz starten.',           body: 'Beantrage früh genug, damit du als Working Holiday-Inhaber nicht zum Höchstsatz besteuert wirst.' },
              { icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title: 'Keine komplizierten ATO-Formulare.', body: 'Du musst dich nicht mit Behörden-Portalen oder Papierkram herumschlagen. Wir machen das für dich.' },
              { icon: <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title: 'Schnell, einfach und komplett online.',         body: 'Schick uns deine Daten - wir kümmern uns um den gesamten TFN-Antrag.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex gap-4"
                style={{ padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)' }}>
                <div className="flex items-center justify-center flex-shrink-0 text-forest-500"
                  style={{ width: '36px', height: '36px', minWidth: '36px', background: '#EAF6F1', borderRadius: '8px' }}>
                  {item.icon}
                </div>
                <div style={{ paddingTop: '2px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: 'clamp(13px, 1.2vw, 14px)', letterSpacing: '-0.01em', marginBottom: '6px', lineHeight: 1.35 }}>{item.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 lg:mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '320px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              TFN beantragen →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-18 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-7 lg:mb-10">
            <span className="section-label center">Was Reisende sagen</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', maxWidth: '34ch' }}>
              So haben Backpacker wie du ihre TFN schnell geregelt
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems: 'stretch' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.07)', border: '1px solid #E2EFE9' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1"
                  style={{ fontSize: 'clamp(12.5px, 1.2vw, 14px)', lineHeight: 1.78, marginBottom: '16px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between" style={{ paddingTop: '14px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                      style={{ width: '34px', height: '34px', fontSize: '11px', background: t.bgColor, color: t.textColor }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-ink" style={{ fontSize: '12px', lineHeight: 1.2 }}>{t.name}</p>
                      <p className="text-subtle" style={{ fontSize: '11px', marginTop: '2px' }}>{t.from}</p>
                    </div>
                  </div>
                  <span className="font-serif font-black text-forest-500 flex-shrink-0"
                    style={{ fontSize: 'clamp(18px, 2vw, 22px)', letterSpacing: '-0.03em' }}>
                    {t.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-20" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-12">
            <span className="section-label center">DER TFN-ANTRAGSPROZESS</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Es gibt einen einfacheren Weg, deine TFN zu bekommen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems: 'stretch' }}>
            <div className="rounded-2xl" style={{ padding: '22px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>
                Selbst beim ATO zu beantragen scheint einfach - führt aber oft zu Verwirrung und Verzögerungen.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Komplizierte Behördenformulare und unklare Schritte', 'Kleine Fehler verzögern deine TFN-Genehmigung', 'Keine Unterstützung, wenn etwas schiefgeht', 'Du musst alles allein herausfinden'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', lineHeight: 1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding: '22px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>
                Mit unserem TFN-Service
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', flex: '1' }}>
                {['Einfacher, begleiteter Prozess von Anfang bis Ende', 'Wir prüfen alles vor dem Einreichen', 'Beim ersten Mal richtig gemacht', 'Support immer verfügbar, wenn du Hilfe brauchst'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', lineHeight: 1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height: '50px', padding: '0 24px', fontSize: '14px', width: '100%', justifyContent: 'center' }}>
                TFN beantragen →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-to-apply" className="py-12 lg:py-20" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-10 lg:mb-16">
            <span className="section-label center">So beantragst du</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px' }}>
              In 4 einfachen Schritten zur TFN
            </h2>
            <p className="font-light text-muted" style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', lineHeight: 1.7 }}>
              Einfacher, begleiteter Prozess von Anfang bis Ende.
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom: '56px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 20%, #0B5240 80%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex: 1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width: '40px', height: '40px', background: '#0B5240', fontSize: '15px', marginBottom: '18px', boxShadow: '0 0 0 5px #EEF7F2, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize: '14px', marginBottom: '7px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize: '12.5px', lineHeight: 1.7 }}>{s.body}</p>
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
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '3px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary"
              style={{ height: '52px', padding: '0 40px', fontSize: '15px', maxWidth: '320px', width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              TFN beantragen →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center">
              <span className="section-label center">FAQ</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                TFN-Fragen beantwortet
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                Noch eine Frage? Schreib uns direkt.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height: '48px', padding: '0 28px', fontSize: '14px', width: '100%', maxWidth: '240px' }}>
                Jetzt Hilfe bekommen →
              </a>
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
        heading="Hast du schon deine TFN?"
        body="Wenn du als Selbstständiger oder Freelancer arbeitest, brauchst du eventuell auch eine ABN, um korrekt Rechnungen ausstellen zu können."
        cta="ABN-Berechtigung prüfen →"
        href="/de/abn"
      />
    </>
  )
}

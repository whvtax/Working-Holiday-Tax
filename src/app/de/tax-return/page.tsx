import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: "Du hast wahrscheinlich zu viel Steuer gezahlt. machen lassen - registrierte Tax Agents",
  description: "Steuern zurück aus Australien, ohne myGov und ohne Formulare. Von registrierten Steueragenten eingereicht - deine 417/462-Steuererklärung wird bearbeitet, die Medicare-Levy-Befreiung geholt und jeden Abzug, der dir zusteht - auch nach deiner Rückkehr nach Deutschland.",
  keywords: [
    'Steuerrückerstattung Australien',
    'Steuerrückerstattung Australien Working Holiday',
    'Working Holiday Steuerrückerstattung',
    'WHV Steuerrückerstattung',
    'Steuerrückerstattung 417 Visum',
    'Steuerrückerstattung 462 Visum',
    'Backpacker Steuerrückerstattung Australien',
    'Working Holiday Maker Steuerrückerstattung',
    'Steuer zurückholen Australien Backpacker',
    'Steuer zurück Australien',
    'Steuer zurück Australien Working Holiday',
    'Steuer zurück Australien Backpacker',
    'Steuern zurück aus Australien',
    'Du hast wahrscheinlich zu viel Steuer gezahlt. Working Holiday',
    'Du hast wahrscheinlich zu viel Steuer gezahlt. Backpacker',
    'WHV Steuererklärung',
    '417 Visum Steuererklärung',
    '462 Visum Steuererklärung',
    'Steuererklärung einreichen Australien',
    'Du hast wahrscheinlich zu viel Steuer gezahlt. nach Rückkehr',
    'Du hast wahrscheinlich zu viel Steuer gezahlt. nach Heimkehr',
    'Du hast wahrscheinlich zu viel Steuer gezahlt. aus Deutschland',
    'Steuerrückerstattung nach Australien Aufenthalt',
    'Steuerrückerstattung Backpacker Rechner',
    'wie viel Steuern zurück Australien',
    'wie bekomme ich Steuern zurück Australien',
    'Steuererklärung Backpacker Deutsch',
    'Work and Travel Steuerrückerstattung',
    'Work and Travel Steuer zurück',
    'registrierter Steueragent Australien Deutsch',
    'Notice of Assessment Australien Deutsch',
    'PAYG Summary verstehen',
  ],
  alternates: { canonical: '/de/tax-return', languages: { 'en-AU': '/tax-return', 'de': '/de/tax-return', 'ja': '/ja/tax-return', 'x-default': '/tax-return' } },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'de_DE',
    url: `${SITE_URL}/de/tax-return`,
    siteName: 'Working Holiday Tax',
    title: "Du hast wahrscheinlich zu viel Steuer gezahlt. machen lassen - registrierte Tax Agents",
    description: 'Steuerrückerstattung Australien für Working Holiday Maker (417/462). Unter Aufsicht eines registrierten Steueragenten - alles online, auch aus Deutschland.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Steuerrückerstattung Australien | WHV Steuererklärung',
    description: 'Steuerrückerstattung als Working Holiday Maker (417/462) - alles online erledigt.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Was ist das Addy-Urteil und betrifft es mich?',
    answer: 'Der australische High Court hat im November 2021 entschieden, dass die Backpacker-Steuer gegen den Gleichbehandlungsartikel im Doppelbesteuerungsabkommen verstößt. Die ATO wendet das Urteil auf Working Holiday Maker an, die steuerlich in Australien ansässig waren und die Staatsangehörigkeit von Großbritannien, Chile, Finnland, Deutschland, Japan, Norwegen oder der Türkei haben. Deutschland ist dabei, Österreich und die Schweiz nicht. Entscheidend ist die steuerliche Ansässigkeit, die die wenigsten erfüllen, aber wer länger an einem Ort geblieben ist, kommt durchaus in Frage. Wir prüfen das im Einzelfall.',
  },
  {
    question: 'Was kostet das, und was ist, wenn mir doch nichts zusteht?',
    answer: 'Die Gebühr ist ein fester Betrag, den wir dir vor jeder kostenpflichtigen Arbeit nennen - nie ein Prozentsatz deiner Erstattung. Ergibt die Prüfung, dass dir keine Erstattung zusteht, entfällt die Gebühr vollständig.',
  },
  {
    question: 'Ich bin schon zurück in Deutschland. Ist es zu spät?',
    answer: 'Nein. Wir reichen routinemäßig aus dem Ausland ein, auch für zurückliegende Jahre. Deine Income Statements holen wir direkt bei der ATO - verlorene Payslips sind kein Hindernis.',
  },
  {
    question: 'Kann ich das nicht selbst über myTax machen?',
    answer: 'Kannst du, und bei einem einfachen Jahr ist das eine legitime Wahl. Geld kostet es bei den Residency-Fragen, beim Medicare-Entitlement-Statement, das Wochen vorher bestellt werden muss, und beim Abgleich mehrerer Arbeitgeber - genau das übernehmen wir.',
  },
  {
    question: 'Was ist eine Working Holiday Steuerrückerstattung und bekomme ich eine?',
    answer: 'Eine Working Holiday Steuerrückerstattung ist das Geld, das dir das ATO (australisches Finanzamt) zurückzahlt, wenn während des Jahres mehr Steuern von deinem Lohn einbehalten wurden, als du tatsächlich schuldest. Wenn du in Australien mit einem 417 oder 462 Visum gearbeitet hast, hast du oft Anspruch - zum Beispiel wenn dein Arbeitgeber den falschen Steuersatz angewendet hat, du absetzbare Werbungskosten hast, oder du nur einen Teil des Steuerjahres gearbeitet hast. Der einzige Weg, das herauszufinden, ist eine Steuererklärung einzureichen.',
  },
  {
    question: 'Muss ich eine Steuererklärung machen, wenn ich nur kurz gearbeitet habe?',
    answer: 'Ja. Wenn du in Australien Einkommen hattest, musst du eventuell trotzdem eine Steuererklärung einreichen, auch wenn du nur kurz gearbeitet hast. Bei kurzen Aufenthalten wird oft zu viel Steuer einbehalten - die Steuererklärung ist meistens der einzige Weg, die Differenz zurückzuholen.',
  },
  {
    question: 'Kann ich meine Steuerrückerstattung aus Australien beantragen, wenn ich schon zurück in Deutschland bin?',
    answer: 'Ja. Du kannst deine australische Steuererklärung aus dem Ausland einreichen - egal ob du nach Deutschland, Österreich, in die Schweiz oder sonst wohin zurückgekehrt bist. Wir erledigen den gesamten Prozess online. Deine Steuerrückerstattung muss auf ein australisches Bankkonto überwiesen werden.',
  },
  {
    question: 'Woher weiß ich, ob ich eine Steuerrückerstattung bekomme?',
    answer: 'Du bekommst eine Steuerrückerstattung, wenn du im Laufe des Jahres mehr Steuern gezahlt hast als nötig. Das passiert bei Working Holiday Makern oft, wenn der falsche Steuersatz angewendet wurde, deine TFN zu spät hinterlegt war, oder du absetzbare Kosten hast. Unter Aufsicht eines registrierten Steueragenten prüfen wir deine Situation und sorgen dafür, dass deine Erklärung korrekt eingereicht wird und du nichts verpasst, was dir zusteht.',
  },
  {
    question: 'Wie viel Steuerrückerstattung aus Australien bekomme ich?',
    answer: 'Der Betrag hängt von deiner individuellen Situation ab: dein Einkommen, der einbehaltene Steuerbetrag, dein steuerlicher Wohnsitzstatus, deine Visumsklasse und deine absetzbaren Kosten. Wir können dir keine bestimmte Summe versprechen - was wir machen, ist deine Steuererklärung korrekt einzureichen und jeden Abzug zu beantragen, der dir zusteht.',
  },
  {
    question: 'Wie lange dauert die Steuerrückerstattung?',
    answer: 'Nach Einreichung bearbeitet das ATO die meisten Steuererklärungen innerhalb von 7 bis 14 Werktagen. In stark frequentierten Zeiten kann es länger dauern. Die Rückerstattung wird dann direkt auf dein angegebenes Konto überwiesen.',
  }
  ]


const STEPS = [
  { n: '1', title: 'Erzähl uns deine Situation', body: 'Schick uns deine Einkommens- und Arbeitsdaten, damit wir deine Working Holiday Steuererklärung korrekt vorbereiten können.' },
  { n: '2', title: 'Schick uns deine Unterlagen',  body: 'Gehaltsabrechnungen und Basisinfos, schnell und einfach, auch aus dem Ausland.' },
  { n: '3', title: 'Wir kümmern uns um alles',  body: 'Wir reichen deine Steuererklärung direkt beim ATO ein.' },
  { n: '4', title: 'Dein Bescheid kommt',           body: 'Sobald das ATO deine Steuererklärung bearbeitet hat, wird eine eventuelle Rückerstattung innerhalb von 7-14 Tagen auf dein australisches Bankkonto überwiesen.' },
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
    { '@type': 'ListItem', position: 2, name: 'Steuererklärung', item: `${SITE_URL}/de/tax-return` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/de/tax-return#service`,
  name: 'Australische Steuererklärung für Working Holiday Maker',
  description: 'Komplette Bearbeitung deiner australischen Steuererklärung - Vorbereitung, Optimierung und Einreichung beim ATO unter Aufsicht eines registrierten Steueragenten.',
  serviceType: 'Tax Return Preparation',
  category: 'Tax Preparation Service',
  url: `${SITE_URL}/de/tax-return`,
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



export default function GermanTaxReturnPage() {
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
            <span aria-current="page">Steuererklärung</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Steuererklärung
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
                <span style={{ display:'block' }}>Du hast wahrscheinlich zu viel Steuer gezahlt.</span>
                <span style={{ display:'block', color:'#0B5240' }}>Wir holen sie für dich zurück.</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Du hast wahrscheinlich zu viel Steuer gezahlt.</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>Wir holen sie für dich zurück.</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              Den meisten Working Holiday Makern steht Geld zu, und sie holen es nie ab.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'48ch',
                marginBottom:'0',
              }}>
              <span>Für 417 und 462 Visuminhaber. Die meisten Steuererklärungen reichen wir innerhalb von 24 Stunden ein - auch nach deiner Rückkehr aus Australien.</span>
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Steuererklärung starten →
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

      {/* ── WHAT IS A TAX RETURN? - Unique design: refund/money motif ─── */}
      <section className="taxret-intro-section">
        <div className="taxret-intro-container">
          <div className="taxret-intro-grid">

            {/* Left: Visual - money refund */}
            <div className="taxret-intro-visual">
              <div className="taxret-refund-card">
                <p className="taxret-refund-label">Durchschnittliche Rückzahlung</p>
                <p className="taxret-refund-amount">2.800 $</p>
                <p className="taxret-refund-detail">an Working Holiday Maker ausgezahlt</p>
                <div className="taxret-refund-stars">
                  {Array.from({length:5}).map((_,i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 12 12" aria-hidden="true">
                      <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
                    </svg>
                  ))}
                </div>
              </div>
              <div className="taxret-arrows">
                <div className="taxret-arrow-item">
                  <span>Du</span>
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                    <path d="M1 7h18M14 2l5 5-5 5" stroke="#2FA880" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>ATO</span>
                </div>
                <div className="taxret-arrow-item taxret-arrow-back">
                  <span>Du</span>
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                    <path d="M19 7H1M6 2L1 7l5 5" stroke="#0B5240" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>ATO</span>
                </div>
              </div>
            </div>

            {/* Right: Explainer */}
            <div className="taxret-intro-content">
              <p className="taxret-intro-eyebrow">Den meisten WHM-Inhabern steht Geld zu</p>
              <h2 className="taxret-intro-heading">
                Was ist eine Working Holiday Steuererklärung?
              </h2>
              <p className="taxret-intro-body">
                Eine <strong>Steuererklärung</strong> ist die jährliche Abrechnung zwischen dir und dem ATO (australisches Finanzamt). Du gibst an, wie viel du verdient hast, machst absetzbare Kosten geltend und gleichst das mit den Steuern ab, die schon von deinem Lohn einbehalten wurden.
              </p>
              <p className="taxret-intro-body">
                Viele Working Holiday Maker auf 417 und 462 Visa <strong>zahlen im Laufe des Jahres zu viel Steuern</strong>. In dem Fall zahlt dir das ATO die Differenz zurück, deine Working Holiday Steuerrückerstattung.
              </p>
              <p className="taxret-intro-body">
                Du kannst deine Steuererklärung von überall auf der Welt machen, auch nachdem du Australien verlassen hast und nach Deutschland oder in ein anderes Land zurückgekehrt bist. Deine Steuerrückerstattung wird auf dein australisches Bankkonto überwiesen.
              </p>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">Wir bereiten deine Working Holiday Steuererklärung vor und reichen sie für dich ein</h3>
              <p className="service-cta-sub">Prüfe jetzt deine Berechtigung. Keine Formulare, keine ATO-Portale, kein Stress. Wir beantragen jeden Abzug, der dir zusteht, und erledigen alles online - auch wenn du Australien schon verlassen hast.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Steuererklärung starten →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Warum unser Service</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '28ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Wir machen deine Working Holiday Steuererklärung von A bis Z
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '38ch' }}>
              Kein Stress, keine Verwirrung - eine korrekt eingereichte Steuererklärung und jede Rückerstattung, die dir zusteht.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'Wir prüfen deine komplette Steuersituation', body:'Wir prüfen dein Einkommen, absetzbare Kosten und deinen Steuerstatus, damit alles korrekt erfasst wird.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Wir reichen deine Steuererklärung korrekt ein', body:'Wir bereiten alles vor und reichen deine Working Holiday Steuererklärung direkt beim ATO für dich ein.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Wir beantragen jeden Abzug, der dir zusteht', body:'Wir identifizieren alle absetzbaren Werbungskosten, damit nichts übersehen wird.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'Kein Stress, keine Verwirrung', body:'Schick uns einfach deine Daten - wir machen den Rest. Keine ATO-Portale, kein Papierkram nötig.' },
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

          <div className="text-center reveal delay-2" style={{ marginTop: '32px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 28px', fontSize: '14.5px', maxWidth: '300px', width: '100%' }}>
              Steuererklärung starten →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>Dauert 2 Minuten&nbsp;&bull;&nbsp;Keine Vorabkosten</p>
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">Was Reisende sagen</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Das sagen Working Holiday Maker über uns
            </h2>
          </div>
          <p className="text-center font-medium text-muted" style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(10,15,13,0.4)' }}>Backpacker aus Deutschland, UK, Japan und mehr</p>
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
              Es gibt einen einfacheren Weg, deine Steuererklärung einzureichen
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Die Steuererklärung selbst einzureichen kann schiefgehen
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Verwirrende ATO-Formulare und Systeme','Leicht, dir zustehende Abzüge zu übersehen','Kostet Zeit und Mühe, es richtig zu machen','Keine Unterstützung, wenn etwas schiefgeht'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Nutze unseren geführten Service
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['Von Anfang an korrekt gemacht','Alle möglichen Abzüge identifiziert','Kein Stress, keine Verwirrung','Echte Unterstützung bei jedem Schritt'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                Steuererklärung starten →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-12 bg-white">
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
                <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex: 0 }} aria-hidden="true" />
                {STEPS.map((s, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white mb-5 flex-shrink-0" style={{ background: '#0B5240', boxShadow: '0 0 0 4px #ffffff, 0 0 0 5px #C8EAE0' }}>
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
                <div key={i} className="flex gap-4" style={{ paddingBottom: '20px' }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold text-white" style={{ background: '#0B5240' }}>{s.n}</div>
                    {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2 min-h-[20px]" style={{ background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div className="pt-1">
                    <p className="text-[14px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.title}</p>
                    <p className="text-[12.5px] font-light text-muted leading-[1.65]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
              Steuererklärung starten →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>Dauert 2 Minuten&nbsp;&bull;&nbsp;Keine Vorabkosten</p>
          </div>
        </div>
      </section>

      {/* ── WHAT TO HAVE READY ── */}

      {/* ── ADDY-URTEIL ───────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[760px] mx-auto reveal">
            <span className="section-label">Addy v Commissioner of Taxation</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '14px' }}>
              Deutschland steht auf der Liste: das Urteil zur Backpacker-Steuer
            </h2>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              Im November 2021 entschied der australische High Court, dass die Backpacker-Steuer gegen den Gleichbehandlungsartikel im Doppelbesteuerungsabkommen verstößt. Wer dieselbe Arbeit am selben Ort macht, darf nicht höher besteuert werden als ein Australier.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              Die ATO wendet die Entscheidung auf Working Holiday Maker an, die steuerlich in Australien ansässig waren und die Staatsangehörigkeit eines dieser Laender haben: Großbritannien, Chile, Finnland, Deutschland, Japan, Norwegen oder die Türkei. <strong>Deutschland ist dabei, Österreich und die Schweiz nicht.</strong>
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              Entscheidend ist die steuerliche Ansässigkeit, und die erfüllen die wenigsten. Wer aber länger an einem Ort geblieben ist, dort gemietet und gearbeitet hat, kommt durchaus in Frage. Dann gilt der Grundfreibetrag und die niedrigeren Resident-Saetze, was den Unterschied deutlich macht.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]">
              Früher eingereichte Steuererklärungen lassen sich innerhalb der ueblichen Änderungsfrist noch korrigieren. Wenn du länger als ein Jahr am selben Ort warst, lohnt sich eine Prüfung, statt einfach anzunehmen, dass es dich nicht betrifft. Mehr zur Ansaessigkeit auf unserer <Link href="/de/tax-residency" className="underline hover:text-forest-500">Seite zur Steuerresidenz</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES (internal links to supporting blog content) ─────── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-6">
            <span className="section-label center">Mehr erfahren</span>
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              Ratgeber zu deiner Steuererklärung
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/de/blog/how-to-lodge-tax-return-working-holiday', label: 'Working Holiday Steuererklärung einreichen: Schritt-für-Schritt' },
              { href: '/de/blog/backpacker-tax-rate-australia', label: 'Backpacker-Steuersatz Australien: Erklärung für 417 & 462 Visum' },
              { href: '/de/blog/tax-deductions-working-holiday-makers', label: 'Werbungskosten für Working Holiday Maker: vollständige Anleitung' },
              { href: '/de/blog/how-long-does-tax-refund-take-australia', label: 'Wie lange dauert eine Steuerrückerstattung in Australien?' },
              { href: '/de/blog/tax-residency-working-holiday-makers', label: 'Sind Working Holiday Maker Steuerresidenten Australiens?' },
              { href: '/de/blog/what-is-a-tax-refund-australia', label: 'Was ist eine Steuerrückerstattung und steht dir eine zu?' },
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

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">

            <div className="text-center">
              <span className="section-label center">FAQ</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                Fragen zur Working Holiday Steuerrückerstattung
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
        heading="Lass deine Super nicht zurück"
        body="Dein Arbeitgeber hat während deiner Arbeit in Australien zusätzlich zum Lohn in deine Super eingezahlt. Wenn du Australien verlässt, kannst du dir das auszahlen lassen."
        cta="Superberechtigung prüfen →"
        trustLine="In wenigen Minuten geprüft"
        href="/de/superannuation"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
      <MobileCta href={WA_URL} lang="de" />
    </>
  )
}

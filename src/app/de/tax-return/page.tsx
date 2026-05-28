import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Steuerrückerstattung Australien Working Holiday | WHV Steuererklärung',
  description: 'Steuerrückerstattung Australien für Working Holiday Maker auf 417/462 Visum. Registrierter Steueragent reicht deine Steuererklärung online beim ATO ein — auch nach deiner Rückkehr nach Deutschland.',
  keywords: [
    'Steuerrückerstattung Australien',
    'Steuerrückerstattung Australien Working Holiday',
    'Working Holiday Steuerrückerstattung',
    'WHV Steuerrückerstattung',
    'Steuerrückzahlung 417 Visum',
    'Steuerrückzahlung 462 Visum',
    'Backpacker Steuerrückerstattung Australien',
    'Working Holiday Maker Steuerrückerstattung',
    'Steuer zurückholen Australien Backpacker',
    'Steuer zurück Australien',
    'Steuer zurück Australien Working Holiday',
    'Steuer zurück Australien Backpacker',
    'Steuern zurück aus Australien',
    'Steuererklärung Australien Working Holiday',
    'Steuererklärung Australien Backpacker',
    'WHV Steuererklärung',
    '417 Visum Steuererklärung',
    '462 Visum Steuererklärung',
    'Steuererklärung einreichen Australien',
    'Steuererklärung Australien nach Rückkehr',
    'Steuererklärung Australien nach Heimkehr',
    'Steuererklärung Australien aus Deutschland',
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
    type: 'website',
    locale: 'de_DE',
    url: 'https://workingholidaytax.com.au/de/tax-return',
    siteName: 'Working Holiday Tax',
    title: 'Steuerrückerstattung Australien Working Holiday | WHV Steuererklärung',
    description: 'Steuerrückerstattung Australien für Working Holiday Maker (417/462). Registrierter Steueragent — alles online, auch aus Deutschland.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Steuerrückerstattung Australien | WHV Steuererklärung',
    description: 'Steuerrückerstattung als Working Holiday Maker (417/462) — alles online erledigt.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Was ist eine Working Holiday Steuerrückerstattung und bekomme ich eine?',
    answer: 'Eine Working Holiday Steuerrückerstattung ist das Geld, das dir das ATO (australisches Finanzamt) zurückzahlt, wenn während des Jahres mehr Steuern von deinem Lohn einbehalten wurden, als du tatsächlich schuldest. Wenn du in Australien mit einem 417 oder 462 Visum gearbeitet hast, hast du oft Anspruch — zum Beispiel wenn dein Arbeitgeber den falschen Steuersatz angewendet hat, du absetzbare Werbungskosten hast, oder du nur einen Teil des Steuerjahres gearbeitet hast. Der einzige Weg, das herauszufinden, ist eine Steuererklärung einzureichen.',
  },
  {
    question: 'Muss ich eine Steuererklärung machen, wenn ich nur kurz gearbeitet habe?',
    answer: 'Ja. Wenn du in Australien Einkommen hattest, musst du eventuell trotzdem eine Steuererklärung einreichen, auch wenn du nur kurz gearbeitet hast. Bei kurzen Aufenthalten wird oft zu viel Steuer einbehalten — die Steuererklärung ist meistens der einzige Weg, die Differenz zurückzuholen.',
  },
  {
    question: 'Was passiert, wenn ich meine Steuererklärung nicht einreiche?',
    answer: 'Wenn du eine Steuererklärung machen musst und es nicht tust, kann das ATO Strafen verhängen oder weitere Schritte einleiten. Außerdem verlierst du den Anspruch auf eine mögliche Steuerrückerstattung, die dir zusteht.',
  },
  {
    question: 'Kann ich meine Steuerrückerstattung aus Australien beantragen, wenn ich schon zurück in Deutschland bin?',
    answer: 'Ja. Du kannst deine australische Steuererklärung aus dem Ausland einreichen — egal ob du nach Deutschland, Österreich, in die Schweiz oder sonst wohin zurückgekehrt bist. Wir erledigen den gesamten Prozess online, und deine Rückerstattung kann auf ein australisches oder deutsches Konto überwiesen werden.',
  },
  {
    question: 'Woher weiß ich, ob ich eine Steuerrückzahlung bekomme?',
    answer: 'Du bekommst eine Steuerrückzahlung, wenn du im Laufe des Jahres mehr Steuern gezahlt hast als nötig. Das passiert bei Working Holiday Makern oft, wenn der falsche Steuersatz angewendet wurde, deine TFN zu spät hinterlegt war, oder du absetzbare Kosten hast. Ein registrierter Steueragent prüft deine Situation und sorgt dafür, dass deine Erklärung korrekt eingereicht wird und du nichts verpasst, was dir zusteht.',
  },
  {
    question: 'Wie viel Steuerrückerstattung aus Australien bekomme ich?',
    answer: 'Der Betrag hängt von deiner individuellen Situation ab: dein Einkommen, der einbehaltene Steuerbetrag, dein steuerlicher Wohnsitzstatus, deine Visumsklasse und deine absetzbaren Kosten. Wir können dir keine bestimmte Summe versprechen — was wir machen, ist deine Steuererklärung korrekt einzureichen und jeden Abzug zu beantragen, der dir zusteht.',
  },
  {
    question: 'Wie lange dauert die Steuerrückerstattung?',
    answer: 'Nach Einreichung bearbeitet das ATO die meisten Steuererklärungen innerhalb von 7 bis 14 Werktagen. In stark frequentierten Zeiten kann es länger dauern. Die Rückerstattung wird dann direkt auf dein angegebenes Konto überwiesen.',
  },
  {
    question: 'Woher weiß ich, dass meine Steuererklärung fertig ist?',
    answer: 'Sobald deine Steuererklärung bearbeitet ist, sendet dir das ATO eine Notice of Assessment — das ist die offizielle Bestätigung mit dem Endergebnis. Wir leiten sie sofort an dich weiter.',
  },
]

const DEDUCTIONS = [
  { title: 'Arbeitskleidung und Uniformen',   body: 'Schutzkleidung oder vorgeschriebene Kleidung wie Stiefel, Warnwesten oder Uniformen.' },
  { title: 'Werkzeuge und Ausrüstung',          body: 'Arbeitsbezogene Werkzeuge oder Ausrüstung, die du gekauft und benutzt hast.' },
  { title: 'Lizenzen und Zertifikate',  body: 'Arbeitslizenzen wie RSA, White Card oder Ähnliches.' },
  { title: 'Wäsche und Reinigung',         body: 'Reinigung und Pflege deiner Arbeitskleidung.' },
  { title: 'Arbeitsbedingte Fahrten',          body: 'Fahrten zwischen Arbeitsorten (nicht der tägliche Arbeitsweg).' },
  { title: 'Spenden',         body: 'Spenden an registrierte australische Wohltätigkeitsorganisationen.' },
]

const STEPS = [
  { n: '1', title: 'Erzähl uns deine Situation', body: 'Schick uns deine Einkommens- und Arbeitsdaten, damit wir deine Working Holiday Steuererklärung korrekt vorbereiten können.' },
  { n: '2', title: 'Schick uns deine Unterlagen',  body: 'Gehaltsabrechnungen und Basisinfos — schnell und einfach, auch aus dem Ausland.' },
  { n: '3', title: 'Wir kümmern uns um alles',  body: 'Ein registrierter Steueragent reicht deine Steuererklärung direkt beim ATO ein.' },
  { n: '4', title: 'Deine Rückzahlung kommt',           body: 'Deine Steuerrückerstattung wird innerhalb von 7-14 Tagen auf dein australisches oder deutsches Konto überwiesen.' },
]

const TESTIMONIALS = [
  {
    name: 'Anna Larsen',
    from: 'Norwegen · WHV 417',
    quote: 'Sie haben meine Steuererklärung von A bis Z für mich gemacht. Ich hatte keine Ahnung, was ich absetzen kann, und bekam am Ende viel mehr zurück als erwartet.',
    amount: '2.450 $',
    initials: 'A',
    bgColor: '#FDF0D5',
    textColor: '#7A4A00',
  },
  {
    name: 'Tobias Bauer',
    from: 'Deutschland · WHV 417',
    quote: 'Mega easy. Sie haben mir alles klar erklärt und dafür gesorgt, dass ich die maximale Rückzahlung bekomme. Klare Empfehlung.',
    amount: '4.100 $',
    initials: 'T',
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
    { '@type': 'ListItem', position: 2, name: 'Steuererklärung', item: 'https://workingholidaytax.com.au/de/tax-return' },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://workingholidaytax.com.au/de/tax-return#service',
  name: 'Australische Steuererklärung für Working Holiday Maker',
  description: 'Komplette Bearbeitung deiner australischen Steuererklärung - Vorbereitung, Optimierung und Einreichung beim ATO durch registrierte Steueragenten.',
  serviceType: 'Tax Return Preparation',
  category: 'Tax Preparation Service',
  url: 'https://workingholidaytax.com.au/de/tax-return',
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


export default function GermanTaxReturnPage() {
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
                <span style={{ display:'block' }}>Steuererklärung Australien</span>
                <span style={{ display:'block', color:'#0B5240' }}>schnell &amp; stressfrei.</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Steuererklärung Australien</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>schnell &amp; stressfrei.</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              Registrierte Steueragenten erledigen deine WHV Steuererklärung mit dem ATO.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'48ch',
                marginBottom:'0',
              }}>
              <span className="hidden lg:inline">Für 417 und 462 Visuminhaber. Die meisten Steuererklärungen reichen wir innerhalb von 24 Stunden ein — auch nach deiner Rückkehr aus Australien.</span>
              <span className="lg:hidden" style={{ fontSize:'12.5px' }}>Für 417 &amp; 462 Visa. Die meisten Erklärungen innerhalb von 24h eingereicht — auch nach deiner Rückkehr.</span>
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
                Viele Working Holiday Maker auf 417 und 462 Visa <strong>zahlen im Laufe des Jahres zu viel Steuern</strong>. In dem Fall zahlt dir das ATO die Differenz zurück — deine Working Holiday Steuerrückerstattung.
              </p>
              <p className="taxret-intro-body">
                Du kannst deine Steuererklärung von überall auf der Welt machen, auch nachdem du Australien verlassen hast und nach Deutschland oder in ein anderes Land zurückgekehrt bist. Deine Rückerstattung kann auf ein australisches oder ausländisches Konto überwiesen werden.
              </p>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">Wir bereiten deine Working Holiday Steuererklärung vor und reichen sie für dich ein</h3>
              <p className="service-cta-sub">Kostenlose Erstberatung. Keine Formulare, keine ATO-Portale, kein Stress. Wir beantragen jeden Abzug, der dir zusteht, und erledigen alles online — auch wenn du Australien schon verlassen hast.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Steuererklärung starten →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Unser Service</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '28ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Wir machen deine Working Holiday Steuererklärung von A bis Z
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '38ch' }}>
              Kein Stress, keine Verwirrung — eine korrekt eingereichte Steuererklärung und jede Rückerstattung, die dir zusteht.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10l4.5 4.5 7.5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'Wir prüfen deine komplette Steuersituation',
                body: 'Wir prüfen dein Einkommen, absetzbare Kosten und deinen Steuerstatus, damit alles korrekt erfasst wird.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="11.5" x2="11" y2="11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
                title: 'Wir reichen deine Steuererklärung korrekt ein',
                body: 'Wir bereiten alles vor und reichen deine Working Holiday Steuererklärung direkt beim ATO für dich ein.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'Wir beantragen jeden Abzug, der dir zusteht',
                body: <>  <span className="hidden lg:inline">Wir identifizieren alle absetzbaren Werbungskosten, damit nichts unbeansprucht bleibt, was dir zusteht.</span><span className="lg:hidden">Wir identifizieren alle absetzbaren Werbungskosten, damit nichts unbeansprucht bleibt.</span></>,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'Kein Stress, keine Verwirrung',
                body: 'Schick uns einfach deine Daten - wir machen den Rest. Keine ATO-Portale, kein Papierkram nötig.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex gap-3" style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-forest-500" style={{ background: '#EAF6F1' }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</p>
                  <p className="text-[13px] font-light text-muted leading-[1.7]">{item.body}</p>
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
            <span className="section-label center">Echte Ergebnisse</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Das sagen Working Holiday Maker über uns
            </h2>
          </div>
          <p className="text-center font-medium text-muted" style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(10,15,13,0.4)' }}>Backpacker aus Deutschland, UK, Japan und mehr</p>
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

      {/* ── COMPARISON ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-10 reveal">
            <span className="section-label center">Warum wir?</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Deine Working Holiday Steuererklärung richtig erledigt
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto reveal delay-1">
            <div className="rounded-2xl" style={{ padding: '18px 20px', background: '#fff', border: '1px solid #E2EFE9' }}>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-muted mb-4">Selbst beim ATO einreichen</p>
              <div className="space-y-3">
                {[
                  'Verwirrende ATO-Formulare und Systeme',
                  'Absetzbare Kosten werden leicht übersehen',
                  'Kostet Zeit und Nerven, alles richtig zu machen',
                  'Keine Unterstützung, wenn etwas schiefgeht',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/>
                      <path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    <p className="text-[13px] font-light text-muted leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl" style={{ padding: '18px 20px', background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-forest-500 mb-4">Unser Service</p>
              <div className="space-y-3">
                {[
                  'Von Anfang an korrekt erledigt',
                  'Alle absetzbaren Kosten werden gefunden',
                  'Kein Stress, keine Verwirrung',
                  'Echte Hilfe bei jedem Schritt',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-[13px] font-semibold text-ink leading-[1.65]">{item}</p>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '20px' }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                  style={{ height: '46px', padding: '0 20px', fontSize: '13.5px', maxWidth: '240px', width: '100%' }}>
              Steuererklärung starten →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ── TAX RATES ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Steuersätze</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Working Holiday Maker Steuersätze in Australien
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '42ch' }}>
              <span className="hidden lg:inline">Steuersätze für 417 und 462 Visa unterscheiden sich von denen australischer Steuerresidenten.</span>
              <span className="lg:hidden">Steuersätze für 417 &amp; 462 Visa unterscheiden sich<br />von denen australischer Steuerresidenten.</span>
            </p>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 items-stretch">
              {[
                {
                  label: 'Working Holiday Visuminhaber',
                  rows: [
                    ['0 $ - 45.000 $', '15 %'],
                    ['45.001 $ - 135.000 $', '6.750 $ + 30 %'],
                    ['135.001 $ - 190.000 $', '33.750 $ + 37 %'],
                    ['190.001 $+', '54.100 $ + 45 %'],
                  ],
                },
                {
                  label: 'Australische Steuerresidenten',
                  rows: [
                    ['0 $ - 18.200 $', '0 %'],
                    ['18.201 $ - 45.000 $', '16 %'],
                    ['45.001 $ - 135.000 $', '4.288 $ + 30 %'],
                    ['135.001 $ - 190.000 $', '31.288 $ + 37 %'],
                    ['190.001 $+', '51.638 $ + 45 %'],
                  ],
                },
              ].map((table, ti) => (
                <div key={ti} className="min-w-0 flex flex-col">
                  <h3 className="font-semibold text-ink mb-3 text-center" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>{table.label}</h3>
                  <div className="rounded-xl overflow-hidden flex-1" style={{ border: '1px solid #C8EAE0' }}>
                    <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <thead>
                        <tr style={{ background: '#EAF6F1' }}>
                          <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '55%' }}>Zu versteuerndes Einkommen</th>
                          <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '45%' }}>Steuersatz</th>
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map(([income, rate], i) => (
                          <tr key={i} style={{ borderTop: '1px solid #E2EFE9', background: i % 2 === 0 ? '#ffffff' : '#F5F9F7' }}>
                            <td className="font-light text-body" style={{ fontSize: '11.5px', padding: '8px 12px' }}>{income}</td>
                            <td className="font-medium text-ink" style={{ fontSize: '11.5px', padding: '8px 12px' }}>{rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl px-5 py-3 mx-auto" style={{ background: '#FFFCF5', border: '1.5px solid #E9A020', borderRadius: '12px', maxWidth: 'fit-content' }}>
              <p className="font-light text-body" style={{ fontSize: '12.5px', lineHeight: 1.5, textAlign: 'center' }}>
                Wenn dein Arbeitgeber nicht als Working Holiday Arbeitgeber registriert ist, kannst du mit 30 % statt 15 % besteuert werden.
              </p>
            </div>
            <div className="text-center mt-8">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-medium transition-all"
                style={{ fontSize: '14px', color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                <span className="hidden lg:inline">Nicht sicher, ob du zu viel Steuern gezahlt hast? Finde heraus, ob dir eine Rückerstattung zusteht →</span><span className="lg:hidden">Nicht sicher, ob du zu viel Steuern gezahlt hast?<br />Anspruch auf Rückerstattung prüfen →</span>
              </a>
            </div>
        </div>
      </section>

      {/* ── DEDUCTIONS ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Absetzbare Kosten</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '28ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Werbungskosten für Working Holiday Maker
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '38ch' }}>
              Du kannst oft mehr absetzen, als du denkst. Wir sorgen dafür, dass nichts Abzugsfähiges vergessen wird.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 reveal delay-1">
            {DEDUCTIONS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding: '16px 18px', border: '1px solid #E2EFE9', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '5px' }}>
                  <span className="flex-shrink-0 flex items-center justify-center" style={{ width:'18px', height:'18px', borderRadius:'50%', background:'#EAF6F1', border:'1px solid #C8EAE0' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5 3.5-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <p className="text-[13px] font-semibold text-ink">{d.title}</p>
                </div>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '28ch', paddingLeft:'26px' }}>{d.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 max-w-xl reveal delay-2">
            <div className="info-block">
              <p><span className="hidden lg:inline">Private Kosten, Strafen und der tägliche Arbeitsweg sind nicht absetzbar.</span><span className="lg:hidden">Private Kosten, Strafen und der tägliche<br />Arbeitsweg sind nicht absetzbar.</span></p>
            </div>
          </div>

          <div className="text-center mt-8 reveal delay-3">
            <p className="font-light text-muted mx-auto" style={{ fontSize: '14px', lineHeight: 1.65, maxWidth: '44ch', marginBottom: '16px' }}>
              Nicht sicher, was du in deiner Working Holiday Steuererklärung absetzen kannst? Wir prüfen alles für dich und beantragen jeden Abzug, der dir zusteht.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '48px', padding: '0 28px', fontSize: '14px', maxWidth: '280px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              Steuererklärung starten →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">So funktioniert es</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              In 4 einfachen Schritten
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '14px' }}>
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
                    <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.title}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.65]">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-10 reveal delay-2">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '52px', padding: '0 32px', fontSize: '15px' }}>
              Steuererklärung starten →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>Dauert 2 Minuten&nbsp;&bull;&nbsp;Keine Vorabkosten</p>
          </div>
        </div>
      </section>

      {/* ── TIMING + DOCUMENTS ───────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div className="reveal text-center lg:text-left">
              <span className="section-label center lg:text-left">Zeitplan</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Wann du deine Rückzahlung bekommst
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Unsere Vorbereitung',  body: <><span className="hidden lg:inline">Wir bereiten deine Steuererklärung innerhalb von 24 Stunden vor.</span><span className="lg:hidden">Wir bereiten deine Steuererklärung<br />innerhalb von 24 Stunden vor.</span></> },
                  { label: 'ATO-Bearbeitung',   body: 'The ATO usually processes returns within 7-14 business days. This can be longer during busy periods.' },
                  { label: 'Endergebnis',    body: <><span className="hidden lg:inline">Sobald deine Erklärung bearbeitet ist, kommt die Rückzahlung direkt auf dein australisches Bankkonto.</span><span className="lg:hidden">Sobald deine Erklärung bearbeitet ist, kommt die Rückzahlung direkt<br />auf dein australisches Bankkonto.</span></> },
                ].map((item, i) => (
                  <div key={i} style={{ paddingTop: '14px', paddingBottom: '14px', borderTop: '1px solid #EDF4F0' }}>
                    <p className="text-[13px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            <div className="reveal delay-1 text-center lg:text-left">
              <span className="section-label center lg:text-left">Was du brauchst</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Was du brauchst, um zu starten
              </h2>
              <div className="space-y-0">
                {[
                  { n: '01', label: 'Tax File Number (TFN)',     hint: 'Deine persönliche Steuernummer' },
                  { n: '02', label: 'Persönliche Daten',           hint: 'Adresse & Handynummer' },
                  { n: '03', label: 'Australisches Bankkonto',    hint: 'Wohin die Rückzahlung kommt' },
                  { n: '04', label: 'Belege für Arbeitskosten',      hint: 'Für absetzbare Kosten' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3" style={{ paddingTop: '14px', paddingBottom: '14px', borderTop: '1px solid #EDF4F0' }}>
                    <div className="flex items-center justify-center font-serif font-black flex-shrink-0" style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#EAF6F1', color: '#0B5240', fontSize: '13px', letterSpacing: '-0.02em' }}>
                      {item.n}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.005em', lineHeight: 1.35 }}>{item.label}</p>
                      <p className="text-[12px] font-light text-muted" style={{ lineHeight: 1.4, marginTop: '1px' }}>{item.hint}</p>
                    </div>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

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
        heading="Lass deine Super nicht zurück"
        body="Dein Arbeitgeber hat während deiner Arbeit in Australien zusätzlich zum Lohn in deine Super eingezahlt. Wenn du Australien verlässt, kannst du dir das auszahlen lassen."
        cta="Superberechtigung prüfen →"
        trustLine="In wenigen Minuten geprüft"
        href="/de/superannuation"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}

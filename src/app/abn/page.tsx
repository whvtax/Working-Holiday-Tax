import type { Metadata } from 'next'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { GoogleRating } from '@/components/ui/GoogleRating'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'ABN Registration for Working Holiday Visa Holders | 417 & 462',
  description: 'Set up your ABN correctly as a Working Holiday contractor on a 417 or 462 visa. Registered tax agent handles your ABN registration and tax return — simple, fast, online.',
  keywords: [
    'ABN registration Australia',
    'ABN registration working holiday',
    'ABN application Australia',
    'ABN working holiday',
    'Australian Business Number backpacker',
    'Australian Business Number working holiday',
    'sole trader ABN 417',
    'sole trader ABN 462',
    'sole trader ABN working holiday',
    'ABN for contractors WHV',
    'ABN backpacker contractor',
    'register ABN online',
    'register ABN backpacker',
    'ABN for working holiday tax return',
    'ABN tax obligations backpacker',
    'do I need an ABN working holiday',
    'ABN vs TFN working holiday',
  ],
  alternates: {
    canonical: '/abn',
    languages: {
      'en-AU': '/abn',
      'de': '/de/abn',
      'ja': '/ja/abn',
      'x-default': '/abn',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/abn`,
    siteName: 'Working Holiday Tax',
    title: 'ABN Registration for Working Holiday Visa Holders | 417 & 462',
    description: 'Set up your ABN correctly as a Working Holiday contractor on a 417 or 462 visa. Registered tax agent handles your ABN registration.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ABN Registration for Working Holiday Visa Holders',
    description: 'Set up your ABN correctly as a Working Holiday contractor.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  { question: 'Can I have both a TFN and an ABN?', answer: 'Yes. You can have both, one for employment and one for contract work.' },
  { question: 'Can I get an ABN without a TFN?', answer: 'No. You must have a TFN before applying for an ABN.' },
  { question: 'Do I need to register for GST?', answer: 'GST registration is only required if your annual turnover is over $75,000. Most Working Holiday visa holders do not need to register for GST.' },
  { question: 'What happens to my ABN when I leave Australia?', answer: 'You can cancel your ABN when you stop working in Australia. This can be done online.' },
  { question: 'Do I need an ABN as a working holiday maker?', answer: 'You only need an ABN if you are working as a contractor or sole trader — for example, doing rideshare, food delivery, freelance work, or being paid directly by clients rather than through PAYG employment. If you are a regular employee, you only need a TFN.' },
  { question: 'How does ABN income affect my working holiday tax return?', answer: 'ABN income is treated differently from PAYG wages. No tax is withheld upfront, so you are responsible for setting aside money for tax. When you lodge your working holiday tax return, ABN income is declared separately and you can claim related business expenses as deductions.' }
]

const STEPS = [
  { n: '1', title: 'Tell us about your work',       body: 'Share your work and visa details so we can guide you correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'TFN and passport info — quick and simple.' },
  { n: '3', title: 'We take care of your ABN setup',  body: 'We prepare and lodge your application accurately on your behalf.' },
  { n: '4', title: 'Get your ABN and start working', body: 'Your ABN is issued within an hour so you can start invoicing and working straight away.' },
]

const CheckSVG = () => (
  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
    <path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}` },
    { '@type': 'ListItem', position: 2, name: 'ABN Registration', item: `${SITE_URL}/abn` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/abn#service`,
  name: 'ABN Registration Service for Working Holiday Makers',
  serviceType: 'Australian Business Number registration',
  description: 'ABN registration service for 417 and 462 working holiday visa holders working as contractors or sole traders, prepared and submitted under the supervision of a registered tax agent.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462) - Contractors and sole traders' },
  inLanguage: 'en-AU',
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to register for an ABN as a working holiday maker',
  description: 'Step-by-step process to register an Australian Business Number for contractor or sole-trader work on a working holiday visa.',
  totalTime: 'PT15M',
  inLanguage: 'en-AU',
  step: STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/abn#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/abn`,
}

export default function ABNPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN Registration</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                ABN Registration
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
                <span style={{ display:'block' }}>Set up your ABN and</span>
                <span style={{ display:'block', color:'#0B5240' }}>start working as a contractor</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Set up your ABN and</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>start working as a contractor</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              <span className="hidden lg:inline">We set up your ABN correctly from the start.</span>
              <span className="lg:hidden" style={{ fontSize:'13px' }}>We set up your ABN correctly from the start.</span>
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              
              We make sure your ABN is set up correctly from day one.
            
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Register your ABN →
              </a>
              <a href="#how-to-register"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1', width:'100%' }}>
                See how it works →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['350+ backpackers helped',<GoogleRating key="rating" variant="pill" lang="en" />,'45+ countries served','~1 hour response time'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN ABN? - Unique design: Employee vs Contractor ──── */}
      <section className="abn-intro-section">
        <div className="abn-intro-container reveal">
          <div className="abn-intro-grid">

            {/* Left: Explainer */}
            <div className="abn-intro-content">
              <p className="abn-intro-eyebrow">For contractors &amp; sole traders</p>
              <h2 className="abn-intro-heading">
                What is an ABN?
              </h2>
              <p className="abn-intro-body">
                An <strong>Australian Business Number (ABN)</strong> is an 11-digit identifier issued by the Australian Business Register. You need one when you work for yourself rather than as a regular employee on a payslip.
              </p>
              <p className="abn-intro-body">
                With an ABN you can <strong>invoice clients directly</strong>, work as a contractor or freelancer, and operate legally as a sole trader. Common ABN jobs for backpackers: farm contracting, content creation, ride-share driving, delivery, and trades.
              </p>
              <p className="abn-intro-body">
                An ABN is not a replacement for a TFN — they serve different purposes. Many working holiday makers have both: a TFN for employment income, an ABN for contract work.
              </p>
            </div>

            {/* Right: Visual — Employee vs Contractor comparison */}
            <div className="abn-intro-visual">
              <div className="abn-compare-grid">

                {/* Employee card */}
                <div className="abn-compare-card abn-compare-employee">
                  <div className="abn-compare-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="7" r="4" stroke="#587066" strokeWidth="1.6"/>
                      <path d="M4 21v-1a6 6 0 016-6h4a6 6 0 016 6v1" stroke="#587066" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="abn-compare-title">Employee</p>
                  <p className="abn-compare-subtitle">Needs TFN</p>
                  <ul className="abn-compare-list">
                    <li>Payslip from employer</li>
                    <li>Tax withheld automatically</li>
                    <li>Receives super contributions</li>
                  </ul>
                </div>

                {/* Contractor card — highlighted */}
                <div className="abn-compare-card abn-compare-contractor">
                  <div className="abn-compare-badge">You</div>
                  <div className="abn-compare-icon abn-compare-icon-active">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="#0B5240" strokeWidth="1.6" strokeLinejoin="round"/>
                      <path d="M9 21V12h6v9" stroke="#0B5240" strokeWidth="1.6" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="abn-compare-title">Contractor</p>
                  <p className="abn-compare-subtitle">Needs ABN</p>
                  <ul className="abn-compare-list">
                    <li>Invoices clients directly</li>
                    <li>Manages own tax</li>
                    <li>No super from clients</li>
                  </ul>
                </div>

              </div>

            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">We register your ABN correctly for you</h3>
              <p className="service-cta-sub">Free initial consultation on WhatsApp. We register your ABN with the correct setup for your work type — and explain your tax obligations clearly.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Register my ABN →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP ───────────────────────────────────────────────────── */}
      {/* Mobile: py-10 · Desktop: py-16 */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">Why choose our service</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', maxWidth:'22ch', marginTop:'8px', marginBottom:'8px', textWrap:'balance' }}>
              We set up your ABN properly from the start
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize:'clamp(12.5px,1.1vw,13.5px)', lineHeight:1.7, maxWidth:'30ch', margin:'0 auto', color:'rgba(10,15,13,0.5)' }}>
              From checking whether you need one to getting you invoice-ready.
            </p>
          </div>

          {/* Cards — equal height via items-stretch; mobile gap-4, desktop gap-6 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'We confirm you actually need an ABN', body:'Many backpackers register one they do not need. We check your work type first and give you a straight answer.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Registered to match your work', body:'Rideshare, delivery, freelance or contracting — we set your ABN up correctly for how you actually earn.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'GST handled only if it applies', body:'We tell you whether the $75,000 GST threshold affects you, so you never register for tax you do not owe.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'Ready to invoice from day one', body:'Your ABN is active and Australian Business Register compliant, so you can start contracting right away.' },
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
              style={{ height:'52px', padding:'0 36px', fontSize:'15px', maxWidth:'320px', width:'100%' }}>
              Register your ABN →
            </a>
            <p style={{ marginTop:'10px', fontSize:'12px', color:'rgba(10,15,13,0.4)' }}>
              Australian Business Register compliant
            </p>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-7 lg:mb-10">
            <span className="section-label center">What travellers say</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.15, letterSpacing:'-0.025em', marginTop:'10px', maxWidth:'34ch' }}>
              See how backpackers got their ABN sorted the right way
            </h2>
          </div>
          <GoogleReviews lang="en" />
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-10 lg:py-16" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">The easy way</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              There is a simpler way to register your ABN
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Registering an ABN yourself can lead to costly mistakes
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Registering an ABN when you should be an employee','Choosing the wrong business activity','No system to track income or set aside tax','Forgetting to declare ABN income at tax time'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Use our guided ABN service
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['We confirm an ABN is actually right for you','Registered with the correct business activity','Clear guidance on records and tax to set aside','Support all the way through to your tax return'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                Register your ABN →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO REGISTER ───────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-10 lg:py-14" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', maxWidth:'22ch', marginTop:'8px', marginBottom:'8px', textWrap:'balance' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize:'clamp(13px,1.2vw,14.5px)', lineHeight:1.7 }}>
              Simple, guided process from start to finish
            </p>
          </div>

          {/* Desktop — full-width spread, thicker line, bigger circles */}
          <div className="hidden lg:block" style={{ marginBottom:'48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background:'linear-gradient(90deg, #C8EAE0 0%, #0B5240 20%, #0B5240 80%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s,i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex:1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width:'40px', height:'40px', background:'#0B5240', fontSize:'15px', marginBottom:'18px', boxShadow:'0 0 0 5px #F5F9F7, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize:'14px', marginBottom:'7px', letterSpacing:'-0.01em', lineHeight:1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize:'12.5px', lineHeight:1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile — compact vertical, subtle line */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom:'28px', gap:'0' }}>
            {STEPS.map((s,i) => (
              <div key={i} className="flex gap-3.5" style={{ paddingBottom: i < STEPS.length-1 ? '18px':'0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width:'28px', height:'28px', background:'#0B5240', fontSize:'12px', flexShrink:0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length-1 && (
                    <div className="flex-1 mt-1.5"
                      style={{ width:'1px', minHeight:'18px', background:'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop:'3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize:'13.5px', marginBottom:'3px', letterSpacing:'-0.01em', lineHeight:1.3 }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize:'12.5px', lineHeight:1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT TO HAVE READY ── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-6 lg:mb-8">
              <span className="section-label center">What to have ready</span>
              <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.15, letterSpacing:'-0.025em' }}>
                What you need to get started
              </h2>
            </div>
            <div className="space-y-0">
              {[{ n:'01', label:'Passport', hint:'For identity verification' }, { n:'02', label:'Tax File Number (TFN)', hint:'Required before an ABN' }, { n:'03', label:'Personal details', hint:'Address & contact number' }, { n:'04', label:'Work details', hint:'How you plan to work' }].map((item, i) => (
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
                Register your ABN →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 items-start">

            <div className="text-center">
              <span className="section-label center">FAQs</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                ABN questions answered
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13.5px', lineHeight:1.7, marginBottom:'24px' }}>
                Have a question? Message us directly.
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
        eyebrow="What is next?"
        heading="Next step: your tax return"
        body="When the financial year ends, you will need to lodge your tax return and declare your ABN income."
        cta="Start your tax return →"
        href="/tax-return"
      />
    </>
  )
}

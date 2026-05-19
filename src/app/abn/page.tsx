import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'ABN Registration for Working Holiday Visa Holders',
  description: 'Set up your ABN correctly as a Working Holiday contractor. We handle registration and tax obligations - simple, fast, online.',
  keywords: [
    'ABN registration Australia',
    'ABN working holiday',
    'Australian Business Number backpacker',
    'sole trader ABN 417',
    'sole trader ABN 462',
    'ABN for contractors WHV',
    'register ABN online',
  ],
  alternates: { canonical: '/abn' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://workingholidaytax.com.au/abn',
    siteName: 'Working Holiday Tax',
    title: 'ABN Registration for Working Holiday Visa Holders',
    description: 'Set up your ABN correctly as a Working Holiday contractor.',
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
  { question: 'Can my ABN be rejected?', answer: 'Yes. If your details do not accurately reflect your work situation, your ABN application may be delayed or rejected. That is why we recommend using a tax agent to avoid mistakes and ensure everything is set up correctly from the start.' },
]

const MISTAKES = [
  { title: 'Working as an employee with an ABN', body: 'If your employer directs how, when, and where you work, an ABN may not be the correct setup for you.' },
  { title: 'Incorrect business activity selection', body: 'Your ABN details must accurately reflect the type of work you perform.' },
  { title: 'Not keeping track of your income',   body: 'You should record your earnings and set aside money for tax to avoid issues later.' },
  { title: 'Not lodging your tax return',         body: 'Your ABN income must be declared to the ATO.' },
]

const STEPS = [
  { n: '1', title: 'Tell us about your work',       body: 'Share your work and visa details so we can guide you correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'TFN and passport info - quick and simple.' },
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://workingholidaytax.com.au' },
    { '@type': 'ListItem', position: 2, name: 'ABN Registration', item: 'https://workingholidaytax.com.au/abn' },
  ],
}

export default function ABNPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

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
              {/* Desktop: locked 2 lines - nowrap per line */}
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
              {['1,200+ backpackers helped','4.9★ from 300+ reviews','45+ countries served','~1 hour response time'].map((t,i) => (
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
        <div className="abn-intro-container">
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
                An ABN is not a replacement for a TFN - they serve different purposes. Many working holiday makers have both: a TFN for employment income, an ABN for contract work.
              </p>
            </div>

            {/* Right: Visual - Employee vs Contractor comparison */}
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

                {/* Contractor card - highlighted */}
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
              <p className="service-cta-sub">Free initial consultation on WhatsApp. We register your ABN with the correct setup for your work type - and explain your tax obligations clearly.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Register my ABN →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP ───────────────────────────────────────────────────── */}
      {/* Mobile: py-10 · Desktop: py-16 */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-12">
            <span className="section-label center">How we help</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', maxWidth:'22ch', marginTop:'8px', marginBottom:'8px', textWrap:'balance' }}>
              Simple, clear, and done properly from the start.
            </h2>
            <p className="font-semibold mx-auto"
              style={{ fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.4, color:'#0B5240', maxWidth:'28ch', margin:'6px auto 10px', letterSpacing:'-0.01em' }}>
            </p>
            <p className="font-light text-muted"
              style={{ fontSize:'clamp(12.5px,1.1vw,13.5px)', lineHeight:1.7, maxWidth:'30ch', margin:'0 auto', color:'rgba(10,15,13,0.5)' }}>
              Simple, clear, and done properly from the start.
            </p>
          </div>

          {/* Cards - equal height via items-stretch; mobile gap-4, desktop gap-6 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { n:'01', title:'We help you choose the right setup', body:'Not sure if you need an ABN? We check your situation and give you a clear answer.' },
              { n:'02', title:'We set up your ABN correctly', body:'We manage the registration to ensure your ABN is aligned with your work, avoiding delays or issues.' },
              { n:'03', title:'Set up correctly from day one', body:'Everything is done properly so you can start working without issues.' },
            ].map((item,i) => (
              <div key={i} className="rounded-2xl flex flex-col"
                style={{ padding:'18px', background:'#F5F9F7', border:'1px solid #C8EAE0' }}
                /* Desktop: larger padding */>
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-subtle block"
                  style={{ marginBottom:'10px' }}>{item.n}</span>
                <h3 className="font-semibold text-ink"
                  style={{ fontSize:'clamp(13px,1.2vw,14px)', letterSpacing:'-0.01em', marginBottom:'6px', lineHeight:1.35 }}>
                  {item.title}
                </h3>
                <p className="font-light text-muted leading-[1.7] flex-1"
                  style={{ fontSize:'clamp(12px,1.1vw,13px)' }}>{item.body}</p>
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

      {/* ── COMMON MISTAKES ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-7 lg:mb-10">
            <span className="section-label center">Common mistakes</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', maxWidth:'22ch', marginTop:'8px', marginBottom:'8px', textWrap:'balance' }}>
              Setting up your ABN incorrectly<br /><em className="not-italic font-normal text-forest-400">can cause issues later</em>
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize:'clamp(12.5px,1.1vw,13.5px)', lineHeight:1.7, maxWidth:'32ch' }}>
              These are common mistakes that can delay your application or lead to complications later.
            </p>
          </div>

          {/* Mobile: gap-3; desktop: gap-5, equal height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5" style={{ alignItems:'stretch' }}>
            {MISTAKES.map((m,i) => (
              <div key={i} className="rounded-xl flex flex-col"
                style={{ padding:'16px', background:'#FFFCF5', border:'1.5px solid #F0D99A', boxShadow:'0 1px 4px rgba(0,0,0,.03)' }}>
                <div className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ width:'28px', height:'28px', background:'#FDF0D5', border:'1px solid #F0D99A', marginBottom:'10px' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#C47E10" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-ink" style={{ fontSize:'13px', marginBottom:'5px', lineHeight:1.35 }}>{m.title}</p>
                <p className="font-light text-muted leading-[1.65] flex-1" style={{ fontSize:'12px' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO REGISTER ───────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-10 lg:py-16" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-14">
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

          {/* Desktop - full-width spread, thicker line, bigger circles */}
          <div className="hidden lg:block" style={{ marginBottom:'48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background:'linear-gradient(90deg, #C8EAE0 0%, #0B5240 20%, #0B5240 80%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s,i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex:1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width:'40px', height:'40px', background:'#0B5240', fontSize:'15px', marginBottom:'18px', boxShadow:'0 0 0 5px #EEF7F2, 0 0 0 6px #C8EAE0' }}>
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

          {/* Mobile - compact vertical, subtle line */}
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

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center">
              <span className="section-label center">FAQs</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                ABN questions answered.
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13.5px', lineHeight:1.7, marginBottom:'24px' }}>
                Have a question? Message us directly.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 28px', fontSize:'14px', width:'100%', maxWidth:'220px' }}>
                Get help now →
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
        eyebrow="What is next?"
        heading="Next step: your tax return"
        body="When the financial year ends, you will need to lodge your tax return and declare your ABN income."
        cta="Start your tax return →"
        href="/tax-return"
      />
    </>
  )
}

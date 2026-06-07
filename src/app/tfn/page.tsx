import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'TFN Application for Working Holiday Visa Holders - Tax Refund Ready',
  description: 'Get your Tax File Number sorted fast - the first step to claiming your Australian tax refund as a Working Holiday Maker. Apply correctly under the supervision of a registered tax agent.',
  keywords: [
    'TFN application Australia',
    'TFN application working holiday',
    'working holiday TFN',
    'Tax File Number Australia working holiday',
    'Tax File Number 417 visa',
    'Tax File Number 462 visa',
    'apply for TFN backpacker',
    'apply for TFN working holiday',
    'get TFN Australia',
    'how to apply for TFN Australia',
    'TFN for WHV',
    'TFN for working holiday tax refund',
    'TFN application working holiday maker',
    'how to apply for TFN backpacker',
    'TFN Australia online application WHV',
    'TFN application before arriving Australia',
    'TFN Australia processing time',
    'TFN for working holiday tax return',
    'register for TFN Australia backpacker',
  ],
  alternates: {
    canonical: '/tfn',
    languages: {
      'en-AU': '/tfn',
      'de': '/de/tfn',
      'ja': '/ja/tfn',
      'x-default': '/tfn',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN Application for Working Holiday Visa Holders - Tax Refund Ready',
    description: 'Get your Tax File Number sorted fast - the first step to claiming your Australian tax refund. Apply correctly under the supervision of a registered tax agent.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TFN Application for Working Holiday Visa Holders',
    description: 'Get your Tax File Number sorted fast - the first step to your Australian tax refund.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  { question:'Can I start work before I receive my TFN?', answer:'Yes. You can start working, but you must provide your TFN within 28 days. Until then, your employer may withhold tax at a higher rate.' },
  { question:'Can I get a TFN on a tourist visa?', answer:'No. You must hold a valid work visa, such as a Working Holiday visa (Subclass 417 or 462), to apply for a TFN.' },
  { question:'What if I forget my TFN?', answer:'You can find your TFN by contacting the ATO directly, by checking previous tax documents, or by asking your tax agent.' },
  { question:'What is a TFN Declaration Form?', answer:'A form you complete when starting a job. It tells your employer how much tax to withhold from your pay.' },
  { question:'Can I apply for a TFN before arriving in Australia?', answer:'You can only apply once you arrive in Australia and your working holiday visa is activated. If you apply before arrival, the ATO will need an Australian postal address to send your TFN to.' },
  { question:'How does my TFN connect to my working holiday tax refund?', answer:'Your TFN links you to every tax record in Australia. Without it, your employer must withhold tax at the top marginal rate instead of the 15% working holiday rate - which usually means a larger refund when you lodge your tax return.' }
]

const STEPS = [
  { n:'1', title:'Tell us about your situation', body:'Share your visa details so we can guide you correctly.' },
  { n:'2', title:'Submit your documents in minutes',  body:'Just your passport and a few personal details, quick and simple.' },
  { n:'3', title:'We process your TFN application',  body:'We prepare and submit everything accurately on your behalf.' },
  { n:'4', title:'Receive your TFN',             body:'Your TFN is issued by the ATO and sent to your Australian address within 28 days.' },
]


const IconStar  = () => (<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const CheckIcon = () => (<svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

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
    { '@type': 'ListItem', position: 2, name: 'TFN Application', item: `${SITE_URL}/tfn` },
  ],
}

// Service schema - signals what we offer
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/tfn#service`,
  name: 'TFN Application Service for Working Holiday Makers',
  serviceType: 'Tax File Number application',
  description: 'TFN application service for 417 and 462 working holiday visa holders, prepared and submitted under the supervision of a registered tax agent.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462)' },
  inLanguage: 'en-AU',
}

// HowTo schema - rich step-by-step result in Google
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to apply for a TFN as a working holiday maker',
  description: 'Step-by-step process to apply for a Tax File Number in Australia as a working holiday visa holder.',
  totalTime: 'P28D',
  inLanguage: 'en-AU',
  step: STEPS.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
}

// Speakable - cues Google Assistant for voice answers
const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/tfn#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/tfn`,
}

export default function TFNPage() {
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
            <span aria-current="page">TFN Application</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                TFN Application
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(24px,3.2vw,44px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'10px' }}>
              {/* Desktop: 2 lines - line 1 black, line 2 green */}
              <span className="hidden lg:block">
                <span style={{ display:'block' }}>Apply for your TFN to start working</span>
                <span style={{ display:'block', color:'#0B5240' }}>legally in Australia.</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Apply for your TFN to start working</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>legally in Australia.</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(13px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              We make sure your TFN is done correctly the first time.
            </p>

            <p className="font-light"
              style={{ fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.65, color:'rgba(10,15,13,0.58)', maxWidth:'44ch', marginBottom:'0' }}>
              <span>Without a TFN, Working Holiday visa holders are taxed at 45%.</span>
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Apply for a TFN →
              </a>
              <a href="#how-to-apply"
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

      {/* ── WHAT IS A TFN? - Unique design: "Step 1 of your Australia journey" ─ */}
      <section className="tfn-intro-section">
        <div className="tfn-intro-container reveal">
          <div className="tfn-intro-grid">

            {/* Left: Explainer */}
            <div className="tfn-intro-content">
              <h2 className="tfn-intro-heading">
                What is a TFN?
              </h2>
              <p className="tfn-intro-body">
                A <strong>Tax File Number (TFN)</strong> is a personal ID issued by the Australian Taxation Office (ATO). It is the first thing you need before starting work in Australia.
              </p>
              <p className="tfn-intro-body">
                Without a TFN, your employer is required by law to withhold the maximum tax rate of <strong>45%</strong> from every pay, regardless of how much you earn.
              </p>
              <p className="tfn-intro-body">
                With a TFN, you are taxed at the standard working holiday rate of <strong>15%</strong> on income up to $45,000. That is a huge difference - sometimes hundreds of dollars per week.
              </p>
            </div>

            {/* Right: Visual - tax savings comparison */}
            <div className="tfn-intro-visual">
              <div className="tfn-comparison-card tfn-comparison-bad">
                <p className="tfn-comparison-label">Without TFN</p>
                <p className="tfn-comparison-rate">45%</p>
                <p className="tfn-comparison-detail">Withheld from every pay</p>
              </div>
              <div className="tfn-comparison-divider">
                <div className="tfn-comparison-arrow">↓</div>
                <p className="tfn-comparison-savings">Save up to 30%</p>
              </div>
              <div className="tfn-comparison-card tfn-comparison-good">
                <p className="tfn-comparison-label">With TFN</p>
                <p className="tfn-comparison-rate">15%</p>
                <p className="tfn-comparison-detail">Standard WHM rate</p>
              </div>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">We handle the entire TFN application for you</h3>
              <p className="service-cta-sub">Free initial consultation on WhatsApp. We submit your application correctly the first time - usually within an hour.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Apply for my TFN →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl lg:max-w-2xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">Why choose our service</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'10px' }}>
              We manage your entire TFN application for you
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'Submitted correctly the first time.', body:'Every application is checked before submission to prevent errors or processing delays.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Start working at the correct tax rate.', body:'Apply early to avoid being taxed at the highest rate as a Working Holiday visa holder.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Avoid ATO systems and confusing forms.', body:'No need to deal with government portals or paperwork. We handle it for you.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'Fast, simple, and fully online.', body:'Provide your details and we take care of the entire TFN application process.' },
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

          <div className="text-center mt-6 lg:mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
              style={{ height:'52px', padding:'0 36px', fontSize:'15px', maxWidth:'320px', width:'100%', marginLeft:'auto', marginRight:'auto' }}>
              Apply for a TFN →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="text-center mb-7 lg:mb-10">
            <span className="section-label center">What travellers say</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', maxWidth:'30ch' }}>
              See how backpackers like you got their TFN sorted quickly
            </h2>
          </div>
          <GoogleReviews lang="en" />
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">The easy way</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              There is a simpler way to get your TFN sorted
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Applying through the ATO can seem simple, but it often leads to confusion and delays.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Complex government forms and unclear steps','Small errors can slow down your TFN approval','No support if anything goes wrong','You are left to figure it out alone'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Use our guided TFN service
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['Simple, guided process from start to finish','We check everything before submission','Done correctly the first time','Support available whenever you need help'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                Apply for a TFN →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-to-apply" className="py-12 lg:py-16" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'10px' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted" style={{ fontSize:'clamp(13px, 1.3vw, 15px)', lineHeight:1.7 }}>
              Simple, guided process from start to finish.
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom:'56px' }}>
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
                  <p className="font-semibold text-ink text-center" style={{ fontSize:'14px', marginBottom:'7px', letterSpacing:'-0.01em', lineHeight:1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize:'12.5px', lineHeight:1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
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

          <div className="text-center mt-8 lg:mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary"
              style={{ height:'52px', padding:'0 40px', fontSize:'15px', maxWidth:'320px', width:'100%', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
              Apply for a TFN →
            </a>
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
              {[{ n:'01', label:'Passport', hint:'Your photo ID and visa' }, { n:'02', label:'Personal details', hint:'Name and date of birth' }, { n:'03', label:'Australian address', hint:'Where the ATO sends your TFN' }, { n:'04', label:'Contact details', hint:'Email and phone for updates' }].map((item, i) => (
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
                Apply for a TFN →
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
                TFN questions answered
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
        heading="Already have your TFN?"
        body="If you are working as a contractor or freelancer, you may also need an ABN to invoice correctly."
        cta="Check your ABN eligibility →"
        href="/abn"
      />
    </>
  )
}

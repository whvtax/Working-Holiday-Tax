import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Super Refund DASP for Working Holiday Visa Holders - Claim Your Super Back',
  description: 'Claim your Australian superannuation refund (DASP) after leaving as a Working Holiday Maker (417/462). Your employer paid 12% of wages into super - get it refunded to you.',
  keywords: [
    'DASP super refund',
    'DASP super refund Australia',
    'super refund Australia working holiday',
    'super refund Australia backpacker',
    'Departing Australia Superannuation Payment',
    'Departing Australia Superannuation Payment 417',
    'super refund working holiday',
    'claim super after leaving Australia',
    'claim super back Australia working holiday',
    'super withdrawal 417 visa',
    'super withdrawal 462 visa',
    'backpacker super refund',
    'WHM superannuation claim',
    'super refund working holiday maker',
    'DASP refund 417',
    'DASP refund 462',
    'how to claim super refund Australia backpacker',
    'super refund after leaving Australia',
    'get my super back Australia working holiday',
    'lost super Australia working holiday',
    'find my super Australia backpacker',
    'super refund UK backpacker Australia',
    'super refund German backpacker Australia',
    'super refund Japanese working holiday',
  ],
  alternates: {
    canonical: '/superannuation',
    languages: {
      'en-AU': '/superannuation',
      'de': '/de/superannuation',
      'ja': '/ja/superannuation',
      'x-default': '/superannuation',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'Super Refund DASP for Working Holiday Visa Holders',
    description: 'Claim your Australian superannuation refund (DASP) after leaving. Your employer paid 12% of wages into super - get it back.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super Refund DASP for Working Holiday Visa Holders',
    description: 'Claim your Australian superannuation refund after leaving.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'I left Australia years ago, can I still claim my super?',
    answer: 'Yes. There is no time limit to claim your superannuation. Even if your balance has been transferred to the ATO, you can still make a claim.',
  },
  {
    question: 'I worked for multiple employers - do I have multiple super accounts?',
    answer: 'You may have multiple super accounts from different employers. We help you find and combine everything before submitting your claim.',
  },
  {
    question: 'How long does it take to receive my super?',
    answer: 'Super withdrawals (DASP) are usually paid within 2-4 weeks after the application is approved. The payment goes directly to your bank account.',
  },
  {
    question: 'Where is my super paid - Australian or overseas bank account?',
    answer: 'Your super is paid directly to your bank account. We can arrange payment to either an Australian or overseas account based on your preference.',
  },
  {
    question: 'Can I claim my DASP super refund from the UK, Germany, or Japan?',
    answer: 'Yes. We help working holiday makers from the UK, Germany, Japan and many other countries claim their DASP super refund entirely online after they have returned home. Your super refund can be paid directly to your overseas bank account.',
  },
  {
    question: 'How is my DASP super refund taxed?',
    answer: 'DASP payments are taxed at a fixed rate set by the ATO, which is deducted before the payment is sent to you. The amount you receive is the net figure after this tax has been applied. The exact rate depends on your visa subclass and the type of super being paid out.',
  }
]

const STEPS = [
  { n: '1', title: 'Tell us about your situation', body: 'Share your visa and work details so we can guide you correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'Passport, TFN and super fund info - quick and simple.' },
  { n: '3', title: 'We handle everything for you',  body: 'We prepare and submit your claim correctly.' },
  { n: '4', title: 'Receive your super payment',    body: 'Your money is paid directly to your Australian bank account.' },
]


const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
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
    { '@type': 'ListItem', position: 2, name: 'Super Withdrawal', item: `${SITE_URL}/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/superannuation#service`,
  name: 'DASP Super Refund Service for Working Holiday Makers',
  serviceType: 'Departing Australia Superannuation Payment (DASP) claim',
  description: 'DASP super refund claim service for 417 and 462 working holiday visa holders, prepared and submitted under the supervision of a registered tax agent. Claim your super back after leaving Australia.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462) leaving Australia' },
  inLanguage: 'en-AU',
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to claim your DASP super refund after leaving Australia',
  description: 'Step-by-step process for working holiday makers to claim their super refund through the Departing Australia Superannuation Payment scheme.',
  totalTime: 'P28D',
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
  '@id': `${SITE_URL}/superannuation#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/superannuation`,
}

export default function SuperannuationPage() {
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
            <span aria-current="page">Superannuation</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Super Withdrawal
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
                <span style={{ display:'block' }}>Claim your super back</span>
                <span style={{ display:'block', color:'#0B5240' }}>when you leave Australia</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Claim your super back</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>when you leave Australia</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              We manage the full DASP process on your behalf.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              
              Most payments are received within 28 days.
            
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Claim your super →
              </a>
              <a href="#how-it-works"
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

      {/* ── WHAT IS SUPER? - Unique design: "Don't leave it behind" ───── */}
      <section className="super-intro-section">
        <div className="super-intro-container">
          <div className="super-intro-grid">

            {/* Left: Explainer */}
            <div className="super-intro-content">
              <p className="super-intro-eyebrow">Hidden money in your name</p>
              <h2 className="super-intro-heading">
                What is superannuation?
              </h2>
              <p className="super-intro-body">
                <strong>Superannuation</strong> (or &quot;super&quot;) is a retirement savings system in Australia. By law, your employer pays <strong>12% of your wages</strong> into a super fund on top of your salary - so you have been earning more than you think.
              </p>
              <p className="super-intro-body">
                As a working holiday maker, you can claim this money back when you leave Australia through a process called <strong>DASP - Departing Australia Superannuation Payment</strong>.
              </p>
              <p className="super-intro-body">
                The withdrawal is taxed at 65%, but the remaining 35% is still real money in your pocket. For most backpackers, this is between <strong>$2,000 and $5,000</strong> they did not know they had.
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
                    <p className="super-boarding-meta-label">Passenger</p>
                    <p className="super-boarding-meta-value">You</p>
                  </div>
                  <div>
                    <p className="super-boarding-meta-label">Status</p>
                    <p className="super-boarding-meta-value super-boarding-status-warn">
                      Leaving super behind
                    </p>
                  </div>
                </div>
                <div className="super-boarding-amount-block">
                  <p className="super-boarding-amount-label">Unclaimed super</p>
                  <p className="super-boarding-amount">$2,000 - $5,000</p>
                </div>
              </div>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">We claim your super back for you</h3>
              <p className="service-cta-sub">Free initial consultation. From identifying your funds to handling the DASP application - we manage the entire process so you do not leave your money behind in Australia.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Claim my super →
            </a>
          </div>
        </div>
      </section>

      {/* ── CLARITY - THIS IS YOUR MONEY ──────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Why choose our service</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              We help you claim back the super that's yours
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'We track down every super account', body:'Multiple jobs often mean multiple funds. We find them all so none of your super is left behind.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Claim it even after you leave', body:'We lodge your DASP entirely online and pay it to your overseas account - even years after you go home.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'It is your money, not the ATO', body:'Unclaimed super eventually transfers to the ATO. We make sure it comes back to you instead.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'DASP lodged and tax handled', body:'We prepare your Departing Australia Superannuation Payment and manage the withholding tax correctly.' },
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
              Check your super eligibility →
            </a>
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">What travellers say</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              See how travellers like you got their super back
            </h2>
          </div>
          <GoogleReviews lang="en" />
        </div>
      </section>



      {/* ── COMPARISON ── */}
      <section className="py-12 lg:py-16" style={{ background:'#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-10">
            <span className="section-label center">The easy way</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              There is a simpler way to claim your super
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Claiming your super (DASP) yourself can be slow and confusing
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Tracking down lost or multiple super funds','Complex DASP forms and ATO requirements','Getting the withholding tax wrong','No help if your claim is delayed'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Use our guided DASP service
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['We locate every super fund for you','We prepare and lodge your DASP correctly','Withholding tax handled the right way','Support until the money reaches your account'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                Claim your super →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '13.5px' }}>
              Simple, guided process from start to finish
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
              Claim your super →
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
              {[{ n:'01', label:'Passport', hint:'Your photo ID' }, { n:'02', label:'Tax File Number (TFN)', hint:'Your unique tax ID' }, { n:'03', label:'Super fund details', hint:'Or we help you find them' }, { n:'04', label:'Bank account', hint:'Where to send your refund' }].map((item, i) => (
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
                Claim your super →
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
              <span className="section-label center">FAQs</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                Superannuation questions answered
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
        heading="Check if you are eligible for Medicare"
        body="Depending on your country of origin, you may be eligible for Medicare or exempt from the Medicare levy."
        cta="Check your Medicare eligibility →"
        href="/medicare"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Super Withdrawal (DASP) for Working Holiday Visa Holders',
  description: 'Claim your Australian superannuation after leaving. Your employer paid 12% of your wages into super - we help you get it back via DASP.',
  keywords: [
    'DASP super withdrawal',
    'Departing Australia Superannuation Payment',
    'super refund working holiday',
    'claim super after leaving Australia',
    'super withdrawal 417 visa',
    'super withdrawal 462 visa',
    'backpacker super refund',
    'WHM superannuation claim',
  ],
  alternates: { canonical: '/superannuation' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://workingholidaytax.com.au/superannuation',
    siteName: 'Working Holiday Tax',
    title: 'Super Withdrawal (DASP) for Working Holiday Visa Holders',
    description: 'Claim your Australian superannuation after leaving via the DASP process.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Super Withdrawal (DASP) for Working Holiday Visa Holders',
    description: 'Claim your Australian superannuation after leaving.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'When can I claim my super?',
    answer: 'You can claim your super once you have left Australia and your visa has expired or been cancelled.',
  },
  {
    question: 'How much tax is taken from my super withdrawal?',
    answer: 'Super withdrawals for Working Holiday visa holders are taxed at 65%.',
  },
  {
    question: 'I left Australia years ago, can I still claim my super?',
    answer: 'Yes. There is no time limit to claim your superannuation. Even if your balance has been transferred to the ATO, you can still make a claim.',
  },
  {
    question: 'I worked for multiple employers - do I have multiple super accounts?',
    answer: 'You may have multiple super accounts from different employers. We help you find and combine everything before submitting your claim.',
  },
  {
    question: 'Do I receive super if I worked under an ABN?',
    answer: 'Generally, no. Superannuation is not usually paid for ABN (contractor) work. Super is typically only paid when you are classified as an employee. As a contractor working under an ABN, you are responsible for arranging your own super if you want it.',
  },
]

const STEPS = [
  { n: '1', title: 'Tell us about your situation', body: 'Share your visa and work details so we can guide you correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'Passport, TFN and super fund info - quick and simple.' },
  { n: '3', title: 'We handle everything for you',  body: 'We prepare and submit your claim correctly.' },
  { n: '4', title: 'Receive your super payment',    body: 'Your money is paid directly to your Australian bank account.' },
]

const TESTIMONIALS = [
  {
    name: "Liam O'Connor",
    from: 'Ireland · WHV 417',
    quote: 'I had multiple employers and wasn\'t sure how to claim my super. Working Holiday Tax took care of everything and helped me get it back.',
    amount: '$3,200',
    initials: 'L',
    bgColor: '#EAF6F1',
    textColor: '#0B5240',
  },
  {
    name: 'Jonas Müller',
    from: 'Germany · WHV 417',
    quote: 'Super easy process. They explained everything clearly and made sure I got all my super back. Highly recommend.',
    amount: '$4,100',
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
    { '@type': 'ListItem', position: 2, name: 'Super Withdrawal', item: 'https://workingholidaytax.com.au/superannuation' },
  ],
}

export default function SuperannuationPage() {
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
              <p className="super-boarding-warning">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '6px' }}>
                  <path d="M12 2L2 22h20L12 2z" stroke="#E9A020" strokeWidth="1.8" strokeLinejoin="round"/>
                  <line x1="12" y1="10" x2="12" y2="15" stroke="#E9A020" strokeWidth="1.8" strokeLinecap="round"/>
                  <line x1="12" y1="18" x2="12.01" y2="18" stroke="#E9A020" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Each year, millions of dollars in super remain unclaimed by working holiday makers who left Australia.
              </p>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">We claim your super back for you</h3>
              <p className="service-cta-sub">From identifying your funds to handling the DASP application - we manage the entire process so you do not leave your money behind in Australia.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Claim my super →
            </a>
          </div>
        </div>
      </section>

      {/* ── MONEY TRIGGER ─────────────────────────────────────────────────── */}
      <section className="py-8 lg:py-12" style={{ background: '#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[560px] mx-auto text-center">
            <p className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '22ch', marginBottom: '10px', textWrap: 'balance' }}>
              Don&apos;t leave your super behind.
            </p>
            <p className="font-light mx-auto text-center" style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'rgba(255,255,255,0.6)', maxWidth: '28ch', marginBottom: '20px' }}>
              You can claim your super back once you leave Australia. We take care of the entire process for you.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold transition-all"
              style={{ height: '48px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '300px', width: '100%', justifyContent: 'center' }}>
              Check your super eligibility →
            </a>
          </div>
        </div>
      </section>

      {/* ── CLARITY - THIS IS YOUR MONEY ──────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">This is your money</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              Your super belongs to you. You just need to claim it.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-8 lg:mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4"/><path d="M11 7v4.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'Employers pay it for you',
                body: 'As required by the Australian law, superannuation is paid by your employer on top of your wages.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="3" y="6" width="16" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M7 6V5a4 4 0 018 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M9 12l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                title: 'This is your money',
                body: 'Your super builds up while you work in Australia, and you can claim it when you leave the country.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 3v18M3 11h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'We claim it back for you',
                body: 'We locate your super, prepare your application, and submit your claim. You receive the payment once it\'s processed.',
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

          {/* Key facts strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-5 reveal delay-2">
            {[
              { title: 'Contribution rate',  body: '12% of your wages is paid into your super fund.' },
              { title: 'Who can claim',      body: <><span className="hidden lg:inline">Working Holiday visa holders who have left Australia and their visa has expired.</span><span className="lg:hidden">WHV holders who have left Australia and their visa has expired.</span></> },
              { title: 'Processing time',    body: 'Usually paid within 2-4 weeks after approval.' },
              { title: 'Payment method',     body: 'Paid directly to your bank account.' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-xl px-4 py-3.5 flex flex-col" style={{ border: '1px solid #C8EAE0' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ marginBottom: '8px', flexShrink: 0 }}>
                  <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                  <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="text-[12px] font-semibold text-ink mb-1">{c.title}</p>
                <p className="text-[12px] font-light text-muted leading-[1.6]">{c.body}</p>
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
            <span className="section-label center">Real results</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              See how travellers like you got their super back
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
            <span className="section-label center">How it works</span>
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
              Claim your super →
            </a>
          </div>
        </div>
      </section>

      {/* ── ELIGIBILITY + WHAT YOU NEED ───────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="reveal">
              <span className="section-label center lg:text-left">Who can claim?</span>
              <h2 className="font-serif font-black text-ink mx-auto lg:mx-0 text-center lg:text-left" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '20px', textWrap: 'balance' }}>
                You can claim your super<br />
                <em className="not-italic font-normal text-forest-400">when you leave Australia</em>
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Your visa has expired or been cancelled', body: 'You can apply once you have left Australia, no waiting period required.' },
                  { label: 'You no longer hold an Australian visa',   body: 'You must not hold another active visa in Australia.' },
                  { label: 'You have super contributions',           body: 'Make sure your employer has paid your super.' },
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
              <span className="section-label center lg:text-left">Documents required</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '18px', textWrap: 'balance' }}>
                What you need to claim your super
              </h2>
              <div className="space-y-3.5 mb-5">
                {[
                  'Your passport details',
                  'Your Tax File Number (TFN)',
                  'Your super fund name and member number',
                  'Your super fund start date',
                  'Your bank account details for payment',
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
              <span className="section-label center">FAQs</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                Superannuation questions answered.
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

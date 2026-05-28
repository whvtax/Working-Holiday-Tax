import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Working Holiday Tax Refund Australia | WHV Tax Return Service',
  description: 'Working holiday tax refund Australia — registered tax agent lodges your WHV tax return for 417 and 462 visa holders. Claim your tax back from Australia, even after you have gone home. All online, fast and simple.',
  keywords: [
    'working holiday tax refund Australia',
    'working holiday tax refund',
    'WHV tax refund',
    'WHV tax refund Australia',
    'tax refund 417 visa',
    'tax refund 462 visa',
    'backpacker tax refund Australia',
    'Australian tax refund working holiday',
    'claim tax back Australia',
    'claim tax back from Australia',
    'tax return Australia working holiday',
    'WHV tax return',
    '417 visa tax return',
    '462 visa tax return',
    'lodge tax return Australia backpacker',
    'lodge tax return from overseas',
    'tax refund after leaving Australia',
    'tax return Australia after going home',
    'working holiday maker tax refund',
    'how to claim tax refund Australia',
    'how much tax refund will I get Australia working holiday',
    'tax return for foreigners Australia',
    'working holiday tax return online',
    'registered tax agent working holiday',
    'tax deductions working holiday makers',
    'working holiday tax refund UK',
    'working holiday tax refund Germany',
    'working holiday tax refund Japan',
  ],
  alternates: { canonical: '/tax-return' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://workingholidaytax.com.au/tax-return',
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax Refund Australia | WHV Tax Return Service',
    description: 'Working holiday tax refund Australia for 417 and 462 visa holders. Registered tax agent lodges your tax return online — even after you leave Australia.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax Refund Australia | WHV Tax Return',
    description: 'Working holiday tax refund for 417 and 462 visa holders. Registered tax agent — all online.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'What is a working holiday tax refund and am I eligible?',
    answer: 'A working holiday tax refund is the money the Australian Taxation Office (ATO) pays back when more tax was withheld from your wages than you actually owe. If you worked in Australia on a 417 or 462 visa, you may be eligible if your employer withheld at the wrong rate, you have eligible work-related deductions, or you only worked part of the financial year. The only way to find out is to lodge a tax return.',
  },
  {
    question: 'Do I need to lodge a tax return if I only worked for a short time?',
    answer: 'Yes. If you earned income in Australia on your working holiday visa, you may still need to lodge a tax return, even if you only worked for a short period. A short stay often means tax was overwithheld, so lodging is usually the only way to claim back what you are owed.',
  },
  {
    question: 'What happens if I do not lodge my tax return?',
    answer: 'If you are required to lodge and do not do so, the ATO may apply penalties or take further action. You also miss the chance to claim any tax refund you are entitled to.',
  },
  {
    question: 'Can I claim my tax refund after leaving Australia?',
    answer: 'Yes. You can lodge your Australian tax return from overseas after leaving the country - whether you have returned to the UK, Germany, Japan, or anywhere else. We handle the entire process online and your refund can be paid to an Australian or overseas bank account.',
  },
  {
    question: 'How do I know if I am owed a tax refund?',
    answer: 'You will be owed a tax refund if you paid more tax than required during the year. This often happens to working holiday makers when the wrong tax rate was applied, when you did not provide your TFN early enough, or when you have eligible deductions. A registered tax agent reviews your situation and makes sure your return is lodged correctly so you do not miss anything you are entitled to.',
  },
  {
    question: 'How much working holiday tax refund will I get?',
    answer: 'The amount depends on your individual circumstances: how much you earned, how much tax was withheld, your residency status for tax purposes, your visa subclass, and the deductions you can claim. We cannot guarantee a specific refund amount - what we can do is lodge your return correctly and make sure every deduction you are entitled to is included.',
  },
  {
    question: 'How long does a working holiday tax refund take?',
    answer: 'Once your return is lodged, the ATO usually processes it within 7 to 14 business days. Processing can be longer during busy periods or if the ATO requires extra information. Your refund is then paid directly into your chosen bank account.',
  },
  {
    question: 'How do I know my tax return has been completed?',
    answer: 'Once your tax return is processed, the ATO issues a Notice of Assessment confirming the final outcome. We forward this to you as soon as it is available.',
  },
]

const DEDUCTIONS = [
  { title: 'Work uniforms and clothing',   body: 'Protective or required clothing like boots, high-vis, or uniforms.' },
  { title: 'Tools and equipment',          body: 'Work-related tools or equipment you purchased and used.' },
  { title: 'Licences and certifications',  body: 'Work licences like RSA, White Card, or similar.' },
  { title: 'Laundry and cleaning',         body: 'Cleaning and maintaining your work clothing.' },
  { title: 'Work-related travel',          body: 'Travel between job sites (not daily commute).' },
  { title: 'Charitable donations',         body: 'Donations to registered Australian charities.' },
]

const STEPS = [
  { n: '1', title: 'Tell us about your situation', body: 'Share your income and work details so we can prepare your working holiday tax return correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'Payment summaries and basic info - quick and simple, even from overseas.' },
  { n: '3', title: 'We handle everything for you',  body: 'A registered tax agent prepares and lodges your tax return directly with the ATO.' },
  { n: '4', title: 'Receive your refund',           body: 'Your tax refund is paid into your nominated Australian or overseas bank account, usually within 7-14 days.' },
]

const TESTIMONIALS = [
  {
    name: 'Anna Larsen',
    from: 'Norway · WHV 417',
    quote: 'They handled my tax return from start to finish. I had no idea what I could claim, and ended up getting way more back than expected.',
    amount: '$2,450',
    initials: 'A',
    bgColor: '#FDF0D5',
    textColor: '#7A4A00',
  },
  {
    name: 'Tobias Bauer',
    from: 'Germany · WHV 417',
    quote: 'Super easy process. They explained everything clearly and made sure I got the maximum refund back. Highly recommend.',
    amount: '$4,100',
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
    { '@type': 'ListItem', position: 2, name: 'Tax Return', item: 'https://workingholidaytax.com.au/tax-return' },
  ],
}

export default function TaxReturnPage() {
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
            <span aria-current="page">Tax Return</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Tax Return
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
                <span style={{ display:'block' }}>Working holiday tax refund</span>
                <span style={{ display:'block', color:'#0B5240' }}>fast &amp; stress-free.</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Working holiday tax refund</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>fast &amp; stress-free.</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              Registered tax agents handle your WHV tax return with the ATO.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'46ch',
                marginBottom:'0',
              }}>
              <span className="hidden lg:inline">For 417 and 462 visa holders. Most tax returns are lodged within 24 hours - even after you have left Australia.</span>
              <span className="lg:hidden" style={{ fontSize:'12.5px' }}>For 417 &amp; 462 visa holders. Most returns lodged within 24 hours - even after you leave.</span>
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Start your tax return →
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

      {/* ── WHAT IS A TAX RETURN? - Unique design: refund/money motif ─── */}
      <section className="taxret-intro-section">
        <div className="taxret-intro-container">
          <div className="taxret-intro-grid">

            {/* Left: Visual - money refund */}
            <div className="taxret-intro-visual">
              <div className="taxret-refund-card">
                <p className="taxret-refund-label">Average refund</p>
                <p className="taxret-refund-amount">$2,800</p>
                <p className="taxret-refund-detail">paid to working holiday makers</p>
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
                  <span>You</span>
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                    <path d="M1 7h18M14 2l5 5-5 5" stroke="#2FA880" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>ATO</span>
                </div>
                <div className="taxret-arrow-item taxret-arrow-back">
                  <span>You</span>
                  <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                    <path d="M19 7H1M6 2L1 7l5 5" stroke="#0B5240" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>ATO</span>
                </div>
              </div>
            </div>

            {/* Right: Explainer */}
            <div className="taxret-intro-content">
              <p className="taxret-intro-eyebrow">Most WHM holders are owed money</p>
              <h2 className="taxret-intro-heading">
                What is a working holiday tax return?
              </h2>
              <p className="taxret-intro-body">
                A <strong>tax return</strong> is the annual settlement between you and the Australian Taxation Office. You declare how much you earned, claim deductions you are entitled to, and reconcile against the tax already withheld from your paychecks.
              </p>
              <p className="taxret-intro-body">
                Many working holiday makers on 417 and 462 visas <strong>overpay tax during the year</strong>. When that happens, the ATO refunds the excess back to you - your working holiday tax refund.
              </p>
              <p className="taxret-intro-body">
                You can lodge from anywhere in the world, even after you have left Australia and gone back to the UK, Germany, Japan, or any other country. Your refund can be paid to an Australian or overseas bank account.
              </p>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">We prepare and lodge your working holiday tax return for you</h3>
              <p className="service-cta-sub">Free initial consultation. No forms, no ATO portals, no stress. We claim every deduction you are entitled to and handle everything online - even after you leave Australia.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Start my tax return →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Our Service</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '26ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              We handle your working holiday tax return from start to finish
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '36ch' }}>
              No stress, no confusion - a correctly lodged tax return and every refund you are entitled to.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 reveal delay-1">
            {[
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 10l4.5 4.5 7.5-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'We review your full tax situation',
                body: 'We assess your income, eligible deductions, and residency status to ensure everything is correctly accounted for.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="11.5" x2="11" y2="11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
                title: 'We lodge your tax return correctly',
                body: 'We prepare and submit your working holiday tax return directly to the ATO on your behalf.',
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>,
                title: 'We claim every deduction you are entitled to',
                body: <>  <span className="hidden lg:inline">We identify all eligible work-related deductions so nothing you are entitled to is missed.</span><span className="lg:hidden">We identify all eligible work-related deductions so nothing you are entitled to is missed.</span></>,
              },
              {
                icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
                title: 'No stress, no confusion',
                body: 'Simply send your details and we take care of your tax return from start to finish. No ATO portals or paperwork required.',
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
              Start your tax return →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>Takes 2 minutes&nbsp;&bull;&nbsp;No upfront fees</p>
          </div>
        </div>
      </section>

      {/* ── EARLY SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-8 lg:py-10 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">Real results</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              What working holiday makers say about us
            </h2>
          </div>
          <p className="text-center font-medium text-muted" style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(10,15,13,0.4)' }}>Backpackers from the UK, Germany, Japan and more</p>
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
            <span className="section-label center">why choose us?</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Get your working holiday tax return done properly
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto reveal delay-1">
            <div className="rounded-2xl" style={{ padding: '18px 20px', background: '#fff', border: '1px solid #E2EFE9' }}>
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-muted mb-4">Lodging it yourself via the ATO</p>
              <div className="space-y-3">
                {[
                  'Confusing ATO forms and systems',
                  'Easy to miss deductions you\'re entitled to',
                  'Takes time and effort to get it right',
                  'No support if something goes wrong',
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
              <p className="text-[12px] font-semibold tracking-[0.08em] uppercase text-forest-500 mb-4">Use our service</p>
              <div className="space-y-3">
                {[
                  'Done correctly from the start',
                  'All eligible deductions identified',
                  'No stress or confusion',
                  'Real support every step of the way',
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
              Start your tax return →
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
            <span className="section-label center">Tax rates</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Working holiday maker tax rates in Australia
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '40ch' }}>
              <span className="hidden lg:inline">Tax rates for 417 and 462 visa holders are different from Australian residents.</span>
              <span className="lg:hidden">Tax rates for 417 &amp; 462 visa holders<br />are different from Australian residents.</span>
            </p>
          </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 items-stretch">
              {[
                {
                  label: 'Working Holiday visa holders',
                  rows: [
                    ['$0 - $45,000', '15%'],
                    ['$45,001 - $135,000', '$6,750 + 30%'],
                    ['$135,001 - $190,000', '$33,750 + 37%'],
                    ['$190,001+', '$54,100 + 45%'],
                  ],
                },
                {
                  label: 'Australian residents',
                  rows: [
                    ['$0 - $18,200', 'Nil'],
                    ['$18,201 - $45,000', '16%'],
                    ['$45,001 - $135,000', '$4,288 + 30%'],
                    ['$135,001 - $190,000', '$31,288 + 37%'],
                    ['$190,001+', '$51,638 + 45%'],
                  ],
                },
              ].map((table, ti) => (
                <div key={ti} className="min-w-0 flex flex-col">
                  <h3 className="font-semibold text-ink mb-3 text-center" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>{table.label}</h3>
                  <div className="rounded-xl overflow-hidden flex-1" style={{ border: '1px solid #C8EAE0' }}>
                    <table className="w-full" style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}>
                      <thead>
                        <tr style={{ background: '#EAF6F1' }}>
                          <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '55%' }}>Taxable income</th>
                          <th className="text-left font-semibold text-ink" style={{ fontSize: '11px', padding: '8px 12px', letterSpacing: '0.02em', width: '45%' }}>Tax rate</th>
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
                If your employer is not registered as a Working Holiday employer, you could be taxed at 30% instead of 15%.
              </p>
            </div>
            <div className="text-center mt-8">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-medium transition-all"
                style={{ fontSize: '14px', color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                <span className="hidden lg:inline">Not sure if you have overpaid tax? Find out if you are entitled to a refund →</span><span className="lg:hidden">Not sure if you have overpaid tax?<br />Find out if you are entitled to a refund →</span>
              </a>
            </div>
        </div>
      </section>

      {/* ── DEDUCTIONS ────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Deductions</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '26ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Work-related deductions for working holiday makers
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '36ch' }}>
              You may be entitled to claim more than you think. We make sure nothing eligible is missed.
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
              <p><span className="hidden lg:inline">Personal expenses, fines, and daily travel to work are not claimable.</span><span className="lg:hidden">Personal expenses, fines, and daily travel to work<br />are not claimable.</span></p>
            </div>
          </div>

          <div className="text-center mt-8 reveal delay-3">
            <p className="font-light text-muted mx-auto" style={{ fontSize: '14px', lineHeight: 1.65, maxWidth: '44ch', marginBottom: '16px' }}>
              Not sure what you can claim on your working holiday tax return? We check everything for you and claim every deduction you are entitled to.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '48px', padding: '0 28px', fontSize: '14px', maxWidth: '280px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              Start your tax return →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '48px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted" style={{ fontSize: '14px' }}>
              Simple, guided process from start to finish
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
              Start your tax return →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>Takes 2 minutes&nbsp;&bull;&nbsp;No upfront cost</p>
          </div>
        </div>
      </section>

      {/* ── TIMING + DOCUMENTS ───────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            <div className="reveal text-center lg:text-left">
              <span className="section-label center lg:text-left">Timing</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                When you&apos;ll get your refund
              </h2>
              <div className="space-y-0">
                {[
                  { label: 'Our preparation',  body: <><span className="hidden lg:inline">We prepare your return within 24 hours of receiving your details.</span><span className="lg:hidden">We prepare your return within 24 hours<br />of receiving your details.</span></> },
                  { label: 'ATO processing',   body: 'The ATO usually processes returns within 7-14 business days. This can be longer during busy periods.' },
                  { label: 'Final outcome',    body: <><span className="hidden lg:inline">Once your return is processed, your refund is paid directly to your Australian bank account.</span><span className="lg:hidden">Once your return is processed, your refund is paid directly<br />to your Australian bank account.</span></> },
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
              <span className="section-label center lg:text-left">What to have ready</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-6" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                What you need to get started
              </h2>
              <div className="space-y-0">
                {[
                  { n: '01', label: 'Tax File Number (TFN)',     hint: 'Your unique tax ID' },
                  { n: '02', label: 'Personal details',           hint: 'Address & contact number' },
                  { n: '03', label: 'Australian Bank Account',    hint: 'Where to send your refund' },
                  { n: '04', label: 'Work expense receipts',      hint: 'For deductions you want to claim' },
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
              <span className="section-label center">FAQs</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                Working holiday tax refund questions
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
        heading="Do not leave your super behind"
        body="Your employer contributed super on top of your wages while you worked in Australia. When you leave, you can claim it back."
        cta="Check your super eligibility →"
        trustLine="Takes just a few minutes to check"
        href="/superannuation"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}

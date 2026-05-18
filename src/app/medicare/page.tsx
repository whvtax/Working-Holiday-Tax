import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Medicare in Australia for Working Holiday Visa Holders',
  description: 'Understand Medicare eligibility and the Medicare levy as a Working Holiday Visa holder in Australia. Get your levy exemption certificate.',
  keywords: [
    'Medicare working holiday',
    'Medicare levy exemption backpacker',
    'Medicare 417 visa',
    'Medicare 462 visa',
    'RHCA Australia',
    'Reciprocal Health Care Agreement',
    'Medicare levy exemption certificate',
  ],
  alternates: { canonical: '/medicare' },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://workingholidaytax.com.au/medicare',
    siteName: 'Working Holiday Tax',
    title: 'Medicare in Australia for Working Holiday Visa Holders',
    description: 'Understand Medicare eligibility and the Medicare levy as a Working Holiday Visa holder.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Medicare in Australia for Working Holiday Visa Holders',
    description: 'Understand Medicare eligibility and the Medicare levy.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const rhca = [
  'United Kingdom', 'New Zealand', 'Ireland', 'Sweden',
  'Netherlands', 'Finland', 'Belgium', 'Italy',
  'Malta', 'Norway', 'Slovenia',
]

const faqs = [
  {
    question: 'Do I need to register for Medicare?',
    answer: 'Only if you are from a country with a Reciprocal Health Care Agreement (RHCA) with Australia. If you are not eligible, you do not need to register and should apply for a Medicare levy exemption when lodging your tax return.',
  },
  {
    question: 'What is the Medicare levy exemption?',
    answer: 'If you are not eligible for Medicare - which applies to most Working Holiday Visa holders - you can apply to have the Medicare levy waived when you lodge your tax return. We handle this as part of our tax return service.',
  },
  {
    question: 'I am from the UK. Am I eligible for Medicare?',
    answer: 'The UK has a Reciprocal Health Care Agreement with Australia. This means UK citizens on certain visas may access some Medicare services. However, coverage is limited and a Medicare card is not always issued automatically. We recommend confirming your status when you arrive.',
  },
  {
    question: 'If I am not eligible for Medicare, do I still pay the levy?',
    answer: 'Not if you apply for an exemption. If you are not eligible for Medicare, you should claim a Medicare levy exemption on your tax return - which means you will not be charged.',
  },
  {
    question: 'What is private health insurance and do I need it?',
    answer: 'Private health insurance covers medical costs not covered by Medicare. If you are not eligible for Medicare, you may want to consider private health cover depending on your situation. This is separate from the Medicare levy.',
  },
  {
    question: 'Does my Working Holiday visa affect my Medicare eligibility?',
    answer: 'Yes. Most Working Holiday visa holders are not eligible for Medicare unless they are from a country with a Reciprocal Health Care Agreement. If you are not eligible, we apply a Medicare levy exemption as part of your tax return.',
  },
]

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
    { '@type': 'ListItem', position: 2, name: 'Medicare', item: 'https://workingholidaytax.com.au/medicare' },
  ],
}

export default function MedicarePage() {
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
                fontSize:'clamp(22px,2.9vw,40px)',
                lineHeight:1.06,
                letterSpacing:'-0.03em',
                marginBottom:'10px',
              }}>
              {/* Desktop: locked 2 lines - nowrap per line */}
              <span className="hidden lg:block">
                <span style={{ display:'block', whiteSpace:'nowrap' }}>Understand your Medicare status</span>
                <span style={{ display:'block', whiteSpace:'nowrap', color:'#0B5240' }}>before lodging your tax return</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Understand your Medicare status</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>before lodging your tax return</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              We assess your eligibility and ensure it is applied correctly in your tax return.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              
              We help you determine your correct status.
            
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Check your Medicare eligibility →
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


      {/* ── WHAT IS MEDICARE? - Unique design: 2% Levy / Exemption motif ─ */}
      <section className="medicare-intro-section">
        <div className="medicare-intro-container">
          <div className="medicare-intro-grid">

            {/* Left: Explainer */}
            <div className="medicare-intro-content">
              <p className="medicare-intro-eyebrow">Healthcare &amp; the 2% levy</p>
              <h2 className="medicare-intro-heading">
                What is Medicare?
              </h2>
              <p className="medicare-intro-body">
                <strong>Medicare</strong> is Australia&apos;s public healthcare system. It provides access to subsidised medical services and is funded partly through a <strong>2% Medicare levy</strong> automatically deducted from your taxable income.
              </p>
              <p className="medicare-intro-body">
                Most working holiday visa holders are <strong>not eligible</strong> for Medicare benefits. If you are not eligible, you should not be paying the levy - and you can claim it back.
              </p>
              <p className="medicare-intro-body">
                The way to remove the levy is through a <strong>Medicare Levy Exemption Certificate</strong>. This is applied when lodging your tax return, and can save you hundreds to thousands of dollars.
              </p>
            </div>

            {/* Right: Visual - Eligibility check card */}
            <div className="medicare-intro-visual">
              <div className="medicare-check-card">
                <div className="medicare-check-header">
                  <p className="medicare-check-title">Are you paying the 2% levy?</p>
                  <p className="medicare-check-subtitle">Most working holiday makers should not be</p>
                </div>

                <div className="medicare-check-items">
                  <div className="medicare-check-item">
                    <div className="medicare-check-icon medicare-check-x">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="#9A3412" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="medicare-check-label">Not eligible for Medicare</p>
                      <p className="medicare-check-desc">Most 417 / 462 visa holders</p>
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
                      <p className="medicare-check-label">Claim levy exemption</p>
                      <p className="medicare-check-desc">Recover the 2% paid during the year</p>
                    </div>
                  </div>
                </div>

                <div className="medicare-check-savings">
                  <p className="medicare-check-savings-label">Potential refund</p>
                  <p className="medicare-check-savings-amount">$500 - $2,000+</p>
                  <p className="medicare-check-savings-detail">depending on your income</p>
                </div>
              </div>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">We claim your Medicare levy exemption for you</h3>
              <p className="service-cta-sub">We assess your eligibility, prepare your exemption certificate, and apply it correctly when lodging your tax return - so you get back what you should not have paid.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Check my exemption →
            </a>
          </div>
        </div>
      </section>

      {/* ── SIMPLE DECISION ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Your two scenarios</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px' }}>
              You may either pay the Medicare levy or be exempt, depending on your visa and country of origin.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-8 lg:mb-10 reveal delay-1">
            <div className="bg-white rounded-2xl flex flex-col" style={{ padding: '20px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom: '12px', background: '#EAF6F1' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/>
                  <path d="M7 10l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom: '6px' }}>From an RHCA (Reciprocal Health Care Agreement) country</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '28ch', marginBottom: '10px' }}>
                If you are eligible for Medicare, we ensure it is correctly applied in your tax return so you only pay what you owe.
              </p>
            </div>

            <div className="bg-white rounded-2xl flex flex-col" style={{ padding: '20px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom: '12px', background: '#FFFCF5' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#C47E10" strokeWidth="1.4"/>
                  <path d="M10 6v5M10 13.5v.5" stroke="#C47E10" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom: '6px' }}>From a non-RHCA country</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '28ch', marginBottom: '10px' }}>
                If you are not eligible for Medicare, we ensure your Medicare levy exemption is correctly applied so you don&apos;t overpay tax.
              </p>
            </div>
          </div>

          <div className="text-center reveal delay-2" style={{ marginTop: '24px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
              style={{ fontSize: '13.5px', color: '#0B5240' }}>
              Not sure what applies to you? We&apos;ll check for you →
            </a>
          </div>
        </div>
      </section>

      {/* ── NOT SURE? - MAIN ENTRY POINT ──────────────────────────────────── */}
      <section className="py-8 lg:py-12" style={{ background: '#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[560px] mx-auto text-center">
            <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '10px' }}>
              Not sure if you&apos;re eligible for Medicare?
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              We check your eligibility and apply everything correctly
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold"
              style={{ height: '46px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px' }}>
              Check your Medicare eligibility →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────────────── */}
      <section className="py-9 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">What we do for you</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              We handle this as part of your tax return
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 reveal delay-1">
            {[
              {
                title: 'We determine your eligibility',
                body: 'We assess your visa type and country of origin to determine your Medicare eligibility.',
              },
              {
                title: 'We apply the correct treatment',
                body: 'We ensure the Medicare levy or exemption is correctly applied in your tax return.',
              },
              {
                title: 'We help you avoid paying unnecessary tax',
                body: "We ensure you are not charged the Medicare levy if you are not required to pay it.",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#EEF7F2', border: '1px solid #C8EAE0' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '6px' }}>
                  <span className="flex-shrink-0 flex items-center justify-center" style={{ width:'18px', height:'18px', borderRadius:'50%', background:'#C8EAE0', border:'1px solid #A8D5C5' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M2 5l2.5 2.5 3.5-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>{item.title}</p>
                </div>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '26ch', paddingLeft:'26px' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDICARE LEVY EXEMPTION + VIDEO ───────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center reveal">
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Medicare levy exemption
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '40ch', marginBottom: '28px' }}>
              If you are not eligible for Medicare, you may need a Medicare levy exemption before lodging your tax return.
            </p>
            {/* Mobile: portrait 9/16, Desktop: landscape 16/9 */}
            <div className="reveal delay-1 rounded-2xl overflow-hidden mx-auto w-full">
              {/* Mobile only (portrait) */}
              <div className="block sm:hidden" style={{ aspectRatio: '9/16', maxWidth: '360px', margin: '0 auto' }}>
                <iframe
                  src="https://www.youtube.com/embed/oj7ZSOHAxJk"
                  title="Medicare levy exemption explained"
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
                  title="Medicare levy exemption explained"
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
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '28px' }}>
            <span className="section-label center">FAQs</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '24ch', marginTop: '8px', textWrap: 'balance' }}>
              Common questions about Medicare
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-1">
            {[
              { q: '"Do I need to sign up for Medicare?"', a: "You only need to sign up if you're from an eligible RHCA country. Otherwise, we apply the exemption in your tax return." },
              { q: '"Why is Medicare levy showing on my tax bill?"', a: "If your Medicare status wasn't applied correctly, the levy may appear. We fix this when preparing your tax return." },
              { q: '"I don\'t use Medicare - why am I being charged?"', a: "If no exemption is applied, the ATO may charge the levy automatically. We apply the correct exemption so you don't overpay." },
              { q: '"Does travel insurance replace Medicare?"', a: "No. Travel insurance and Medicare are separate systems. If you are not eligible for Medicare, you should rely on your travel insurance for medical coverage." },
              { q: '"Does my Working Holiday visa affect Medicare?"', a: "Yes. Most Working Holiday visa holders are not eligible for Medicare, unless they are from a Reciprocal Health Care Agreement (RHCA) country. We ensure your Medicare status is correctly applied in your tax return." },
              { q: '"Can I get a Medicare card on a Working Holiday visa?"', a: "Only if you're from an eligible RHCA country. Otherwise, we apply a Medicare levy exemption instead." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding: '16px', border: '1px solid #C8EAE0', boxShadow: '0 1px 2px rgba(0,0,0,.02)' }}>
                <p className="text-[13px] font-semibold text-ink italic" style={{ marginBottom: '6px' }}>{item.q}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="You're all set to lodge your tax return"
        body="We ensure your Medicare status is correctly applied so you don't overpay tax."
        cta="Start your tax return →"
        href="/tax-return"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}

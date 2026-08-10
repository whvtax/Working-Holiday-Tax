import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: "Working Holiday Tax Refund - Lodged For You, All Online",
  description: "Get your Australian tax refund without touching myGov. Backpacker specialists process your 417/462 return to claim the Medicare levy exemption and every deduction.",
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
    'backpacker tax return specialists',
    'tax deductions working holiday makers',
    'working holiday tax refund UK',
    'working holiday tax refund Germany',
    'working holiday tax refund Japan',
  ],
  alternates: {
    canonical: '/tax-return',
    languages: {
      'en-AU': '/tax-return',
      'de': '/de/tax-return',
      'ja': '/ja/tax-return',
      'x-default': '/tax-return',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tax-return`,
    siteName: 'Working Holiday Tax',
    title: "Working Holiday Tax Refund - Lodged For You, All Online",
    description: 'Working holiday tax refund Australia for 417 and 462 visa holders. Lodged online by backpacker specialists - even after you leave Australia.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Working Holiday Tax Refund Australia | WHV Tax Return',
    description: 'Working holiday tax refund for 417 and 462 visa holders. Backpacker tax specialists - all online.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'What does it cost, and what if I turn out not to be owed anything?',
    answer: 'The fee is a fixed amount told to you before any chargeable work begins - never a percentage of your refund. If the check shows you are not entitled to a refund, the assessment fee is waived in full and you pay nothing.',
  },
  {
    question: 'I already left Australia. Is it too late?',
    answer: 'No. We lodge from overseas as a matter of routine, including for previous years you never got around to. We retrieve your income statements directly from the ATO, so lost payslips are not a problem.',
  },
  {
    question: 'Can I just lodge it myself in myTax?',
    answer: 'You can, and for a simple year it is a legitimate choice. Where it costs people money is the residency questions, the Medicare levy exemption paperwork that has to be ordered weeks in advance, and reconciling several employers - which is exactly what we handle.',
  },
  {
    question: 'What is a working holiday tax refund and am I eligible?',
    answer: 'A working holiday tax refund is the money the Australian Taxation Office (ATO) pays back when more tax was withheld from your wages than you actually owe. If you worked in Australia on a 417 or 462 visa, you may be eligible if your employer withheld at the wrong rate, you have eligible work-related deductions, or you only worked part of the financial year. The only way to find out is to lodge a tax return.',
  },
  {
    question: 'Do I need to lodge a tax return if I only worked for a short time?',
    answer: 'Yes. If you earned income in Australia on your working holiday visa, you may still need to lodge a tax return, even if you only worked for a short period. A short stay often means tax was overwithheld, so lodging is usually the only way to claim back what you are owed.',
  },
  {
    question: 'Can I claim my tax refund after leaving Australia?',
    answer: 'Yes. You can lodge your Australian tax return from overseas after leaving the country - whether you have returned to the UK, Germany, Japan, or anywhere else. We handle the entire process online. Your tax refund must be paid to an Australian bank account.',
  },
  {
    question: 'How do I know if I am owed a tax refund?',
    answer: 'You will be owed a tax refund if you paid more tax than required during the year. This often happens to working holiday makers when the wrong tax rate was applied, when you did not provide your TFN early enough, or when you have eligible deductions. Working holiday returns are all we do, so we review your situation and make sure your return is lodged correctly so you do not miss anything you are entitled to.',
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
    question: 'What is the backpacker tax rate?',
    answer: 'The backpacker tax rate is a flat 15% on the first $45,000 you earn in a financial year on a 417 or 462 visa, with no tax-free threshold. It applies from your very first dollar of income, unlike the resident tax-free threshold of $18,200. Refunds usually come from periods where the wrong rate was withheld or from eligible work-related deductions.',
  },
  {
    question: 'What documents do I need to lodge my tax return?',
    answer: 'At minimum, we need your payment summaries or income statements from each employer for the financial year, your TFN, and your Australian bank account details for the refund. If you are claiming work-related deductions, receipts or records for those expenses help maximise your refund, though we can still lodge without every receipt in hand.',
  },
  {
    question: 'What happens if I do not lodge a tax return?',
    answer: 'If you earned income in Australia, you are generally required to lodge a tax return or a non-lodgment advice for that financial year, even after you have left the country. Skipping it does not make the obligation disappear, and it also means leaving any refund you are owed unclaimed. Outstanding tax obligations can also affect future visa applications to Australia.',
  }
  ]


const STEPS = [
  { n: '1', title: 'Tell us about your situation', body: 'Share your income and work details so we can prepare your working holiday tax return correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'Payment summaries and basic info, quick and simple, even from overseas.' },
  { n: '3', title: 'We handle everything for you',  body: 'We prepare and lodge your tax return directly with the ATO' },
  { n: '4', title: 'Get your assessment',           body: 'Once your tax return is processed by the ATO, any refund you are owed is paid into your Australian bank account within 7-14 days.' },
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
    { '@type': 'ListItem', position: 2, name: 'Tax Return', item: `${SITE_URL}/tax-return` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/tax-return#service`,
  name: 'Working Holiday Tax Return Service',
  serviceType: 'Tax return preparation and lodgement',
  description: 'Australian tax return preparation and lodgement for 417 and 462 working holiday visa holders. Prepared and lodged with the ATO, all online.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462)' },
  inLanguage: 'en-AU',
}


const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/tax-return#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/tax-return`,
}

export default function TaxReturnPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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
                <span style={{ display:'block' }}>You probably overpaid tax.</span>
                <span style={{ display:'block', color:'#0B5240' }}>We get it back for you.</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>You probably overpaid tax.</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>We get it back for you.</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              Most working holiday makers are owed money and never claim it.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'46ch',
                marginBottom:'0',
              }}>
              <span>Built for backpackers - your 417 or 462 return is processed to claim the Medicare levy exemption and every deduction you are owed. No myGov, no forms - and it works from anywhere in the world.</span>
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
              {['Trusted by backpackers',<GoogleRating key="rating" variant="pill" lang="en" />,'Worldwide reach','~1 hour response time'].map((t,i) => (
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
                <p className="taxret-refund-label">Our promise</p>
                <p className="taxret-refund-amount">Every deduction you&apos;re entitled to</p>
                <p className="taxret-refund-detail">properly claimed for working holiday makers</p>
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
                A <strong>tax return</strong> is the annual settlement between you and the Australian Taxation Office. You declare how much you earned, claim deductions you are entitled to, and reconcile against the tax already withheld from your pay.
              </p>
              <p className="taxret-intro-body">
                Many working holiday makers on 417 and 462 visas <strong>overpay tax during the year</strong>. When that happens, the ATO refunds the excess back to you, your working holiday tax refund.
              </p>
              <p className="taxret-intro-body">
                You can lodge from anywhere in the world, even after you have left Australia and gone back to the UK, Germany, Japan, or any other country. Your tax refund is paid into your Australian bank account.
              </p>
            </div>

          </div>

          {/* CTA strip to OUR service */}
          <div className="service-cta-strip">
            <div className="service-cta-text">
              <h3 className="service-cta-heading">We prepare and lodge your working holiday tax return for you</h3>
              <p className="service-cta-sub">Tell us your situation and we will tell you what you are owed. No forms, no ATO portals, no stress. We claim every deduction you are entitled to and handle everything online - even after you leave Australia.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Start my tax return →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Why choose our service</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              We handle your working holiday tax return<br className="hidden lg:block" /> from start to finish
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '36ch' }}>
              No stress, no confusion - a correctly lodged tax return and every refund you are entitled to.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'We review your full tax situation', body:'We assess your income, eligible deductions, and residency status to ensure everything is correctly accounted for.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'We lodge your tax return correctly', body:'We prepare and submit your working holiday tax return directly to the ATO on your behalf.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'We claim every deduction you are entitled to', body:'We identify every eligible work-related deduction, so nothing gets missed.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'No stress, no confusion', body:'Simply send your details and we take care of your tax return from start to finish. No ATO portals or paperwork required.' },
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
            <span className="section-label center">What travellers say</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              What working holiday makers say about us
            </h2>
          </div>
          <p className="text-center font-medium text-muted" style={{ fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px', color: 'rgba(10,15,13,0.4)' }}>Backpackers from the UK, Germany, Japan and more</p>
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
              There is a simpler way to lodge your tax return
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Lodging your tax return yourself can go wrong
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Confusing ATO forms and systems','Easy to miss deductions you are entitled to','Takes time and effort to get it right','No support if something goes wrong'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF3F0" stroke="#FBD0BB" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Use our guided tax return service
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['Done correctly from the start','All eligible deductions identified','No stress or confusion','Real support every step of the way'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                Start your tax return →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-10 lg:py-12 bg-white">
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
              Start your tax return →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#8AADA3' }}>Takes 2 minutes&nbsp;&bull;&nbsp;No upfront cost</p>
          </div>
        </div>
      </section>

      {/* ── WHAT TO HAVE READY ── */}

      {/* ── RELATED GUIDES (internal links to supporting blog content) ─────── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-6">
            <span className="section-label center">Learn more</span>
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              Guides on lodging your tax return
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/blog/how-to-lodge-tax-return-working-holiday', label: 'How to lodge a working holiday tax return in Australia' },
              { href: '/blog/backpacker-tax-rate-australia', label: 'Backpacker tax rate Australia: full breakdown for 417 & 462 visas' },
              { href: '/blog/tax-deductions-working-holiday-makers', label: 'Tax deductions for working holiday makers: full guide' },
              { href: '/blog/how-long-does-tax-refund-take-australia', label: 'How long does a working holiday tax refund take?' },
              { href: '/blog/tax-residency-working-holiday-makers', label: 'Are working holiday makers tax residents of Australia?' },
              { href: '/blog/what-is-a-tax-refund-australia', label: 'What is a tax refund and how do you know if you are owed one?' },
              { href: '/uk-working-holiday-tax', label: 'UK passport holders: three years, Medicare and the Addy ruling' },
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
              <span className="section-label center">FAQs</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                Working holiday tax refund questions
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
        heading="Do not leave your super behind"
        body="Your employer contributed super on top of your wages while you worked in Australia. When you leave, you can claim it back."
        cta="Check your super eligibility →"
        trustLine="Takes just a few minutes to check"
        href="/superannuation"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
      <MobileCta href={WA_URL} lang="en" />
    </>
  )
}

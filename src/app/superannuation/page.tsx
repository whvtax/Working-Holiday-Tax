import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

export const metadata: Metadata = {
  title: "Departing Australia Superannuation Payment (DASP) | Claim Your Super Refund",
  description: "Departing Australia Superannuation Payment (DASP) - how to claim your superannuation refund after leaving Australia. Working holiday super claim process, DASP refund, 65% tax rate explained.",
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
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'Super Refund DASP for Working Holiday Visa Holders',
    description: 'Claim your Australian superannuation refund (DASP) after leaving. Your employer paid 12% of wages into super - get it back.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Super Refund DASP for Working Holiday Visa Holders',
    description: 'Claim your Australian superannuation refund after leaving.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'What does it cost, and what if there is nothing to claim?',
    answer: 'We tell you the fee before any chargeable work starts, and it is a fixed amount - never a percentage of your super. If we check and find you have no claimable balance, the assessment fee is waived in full and you pay nothing.',
  },
  {
    question: 'I do not know which super fund I was with. Is that a problem?',
    answer: 'No - it is the most common situation we deal with. We search every fund linked to your Tax File Number, including balances that have already been transferred to the ATO, so you do not need to remember employer or fund names.',
  },
  {
    question: 'Can I just do this myself through the ATO?',
    answer: 'You can. The ATO DASP portal is free and works well if you had one fund, your documents are in order and nothing is queried. Where people get stuck is multiple forgotten funds, certified copies requested from overseas, and funds that stop responding - which is exactly the part we take over.',
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
  },
  {
    question: 'I am on a working holiday visa - can I claim my super?',
    answer: 'Yes. Working holiday makers on subclass 417 or 462 visas are eligible to claim their superannuation (DASP) once they have left Australia and their visa has expired or been cancelled. You must apply from outside Australia. The DASP withholding tax rate for working holiday makers is 65% of the taxable component.',
  },
  {
    question: 'What is the superannuation tax rate for working holiday makers?',
    answer: 'Working holiday makers pay a fixed withholding tax of 65% on the taxable component of their DASP super withdrawal. This is deducted before payment is sent to you. The amount you actually receive is 35% of the taxable component (net of tax). Non-working-visa temporary residents like students pay a different rate of 35%.',
  },
  {
    question: 'How do I claim superannuation when leaving Australia?',
    answer: 'To claim superannuation (DASP) when leaving Australia, your visa must have expired or been cancelled, and you must have permanently left Australia. Contact a tax agent or lodge through the ATO DASP portal. You will need your TFN, passport details, visa information, and super fund details. Payment typically arrives within 28 days of approval.',
  },
  {
    question: 'Do working holiday makers pay Medicare Levy?',
    answer: 'No. Working holiday makers on subclass 417 and 462 visas are exempt from the Medicare Levy (2% tax). You must claim this exemption on your tax return - it is not automatic. The exemption saves you 2% of your taxable income, which adds to your tax refund at the end of the financial year.',
  },
  {
    question: 'What is DASP - the Departing Australia Superannuation Payment?',
    answer: 'DASP (Departing Australia Superannuation Payment) is the official process for withdrawing your Australian superannuation once you have permanently left the country and your visa has expired or been cancelled. It is the only way working holiday makers can access their super - it stays locked while you are still in Australia. Applications go directly to the ATO or your super fund, from anywhere in the world.',
  },
  {
    question: "I'm on a 417 or 462 visa - how do I actually get my superannuation back?",
    answer: 'Once you have left Australia and your working holiday visa has expired or been cancelled, you (or a tax agent on your behalf) submit a DASP application with your passport, visa and super fund details. Most working holiday makers have several small super accounts from casual and seasonal jobs - we search all of them under your TFN, combine the claim, and lodge it correctly the first time, so nothing is left behind and nothing is delayed by a mismatched detail.',
  },
  {
    question: 'Do I get superannuation if I worked under an ABN?',
    answer: 'Generally no. Superannuation Guarantee contributions are an employer obligation tied to PAYG employment, not ABN/contractor income - so gig, rideshare or freelance work invoiced under an ABN usually does not generate super automatically. If you were engaged as a contractor but worked more like a regular employee (set hours, tools provided, no ability to subcontract), you may still be entitled to super under the ATO’s expanded definition of "employee" - worth checking rather than assuming.',
  },
  {
    question: 'What happens if I never claim my super after leaving Australia?',
    answer: 'It is not lost. About six months after your visa expires, an unclaimed super fund is required to transfer your balance to the ATO as "ATO-held super". It still belongs to you and earns no fees while held there, and there is no deadline - you can lodge a DASP claim years later and the ATO will pay it out, though fund fees and insurance premiums along the way can quietly shrink a balance left too long before it transfers.',
  },
]

const STEPS = [
  { n: '1', title: 'Tell us about your situation', body: 'Share your visa and work details so we can guide you correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'Passport, TFN and super fund info - quick and simple.' },
  { n: '3', title: 'We handle everything for you',  body: 'We prepare and submit your claim correctly.' },
  { n: '4', title: 'Receive your super payment',    body: 'Your money is paid directly to your bank account, in Australia or overseas.' },
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
  description: 'DASP super refund claim service for 417 and 462 working holiday visa holders, handled end to end by working holiday specialists. Claim your super back after leaving Australia.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417/462) leaving Australia' },
  inLanguage: 'en-AU',
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

// HowTo schema for the 4-step claim process below (STEPS array) - gives Google
// and AI answer engines an explicit, structured procedure to extract and cite
// for "how do I claim my superannuation / DASP" style queries.
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to claim your superannuation (DASP) after leaving Australia',
  description: 'The step-by-step process working holiday makers use to claim their superannuation back through the Departing Australia Superannuation Payment (DASP) once their visa has expired or been cancelled and they have left Australia.',
  totalTime: 'P28D',
  step: STEPS.map(s => ({
    '@type': 'HowToStep',
    position: Number(s.n),
    name: s.title,
    text: s.body,
  })),
}

export default function SuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
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
                <span style={{ display:'block' }}>Your super is still in Australia.</span>
                <span style={{ display:'block', color:'#0B5240' }}>We get it back for you.</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Your super is still in Australia.</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>We get it back for you.</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              Your employer paid 12% of every wage into a super fund. It is your money and it is still sitting there.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              
              We handle the funds, the paperwork and the payment. You send four details. Most claims are paid within 28 days.
            
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
              {['Working holiday makers, worldwide',<GoogleRating key="rating" variant="pill" lang="en" />,'Registered tax agent supervision','~1 hour response time'].map((t,i) => (
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
              <p className="super-intro-body">
                Not sure what you are owed? Our{' '}
                <Link href="/calculator" className="font-semibold" style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                  free tax and super refund calculator
                </Link>{' '}
                gives working holiday makers on a 417 or 462 visa a quick estimate before you commit to anything.
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
              <p className="service-cta-sub">Tell us your situation and we will tell you what you are owed. From identifying your funds to handling the DASP application - we manage the entire process so you do not leave your money behind in Australia.</p>
            </div>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="service-cta-button">
              Claim my super →
            </a>
          </div>
        </div>
      </section>

      {/* ── HOW MUCH DO YOU GET BACK ──────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background:'#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center" style={{ marginBottom:'26px' }}>
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(21px,2.6vw,32px)', lineHeight:1.12, letterSpacing:'-0.025em', marginBottom:'10px' }}>
              How much comes back to you?
            </h2>
            <p className="font-light" style={{ fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.7, color:'rgba(10,15,13,0.58)' }}>
              Super for working holiday makers is taxed at 65% when it is paid out, so roughly 35 cents
              of every dollar reaches your account. A typical year of full-time work looks like this.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 max-w-3xl mx-auto">
            {[
              { bal:'$3,000', net:'$1,050', note:'a few months of casual work' },
              { bal:'$6,000', net:'$2,100', note:'around six months full-time' },
              { bal:'$10,000', net:'$3,500', note:'a full working holiday year' },
            ].map((r,i) => (
              <div key={i} className="rounded-2xl" style={{ padding:'20px', background:'#F7FBF9', border:'1.5px solid #E2EFE9', textAlign:'center' }}>
                <p className="font-medium" style={{ fontSize:'11px', letterSpacing:'0.06em', textTransform:'uppercase', color:'rgba(10,15,13,0.45)', marginBottom:'6px' }}>
                  Super balance
                </p>
                <p className="font-semibold text-ink" style={{ fontSize:'17px', marginBottom:'10px' }}>{r.bal}</p>
                <p className="font-serif font-black" style={{ fontSize:'clamp(24px,3vw,30px)', color:'#0B5240', lineHeight:1, marginBottom:'8px' }}>
                  {r.net}
                </p>
                <p className="font-light" style={{ fontSize:'12px', color:'rgba(10,15,13,0.55)', lineHeight:1.6 }}>
                  paid to you &middot; {r.note}
                </p>
              </div>
            ))}
          </div>

          <p className="font-light text-center" style={{ fontSize:'12.5px', color:'rgba(10,15,13,0.5)', marginTop:'18px', lineHeight:1.7 }}>
            Figures are after the 65% DASP withholding tax set by the ATO. Fund fees and insurance
            premiums reduce the balance the longer it sits unclaimed, which is why claiming early matters.
          </p>
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
      <section className="py-10 lg:py-16" style={{ background:'#F5F9F7' }}>
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
                    <p className="text-[14px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '4px' }}>{s.title}</p>
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

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">

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
            </div>

            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>


      {/* ── RELATED GUIDES (internal links to supporting blog content) ─────── */}
      <section className="py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-6">
            <span className="section-label center">Learn more</span>
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              Guides on claiming your super back
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/blog/dasp-vs-leaving-super-in-australia-pros-cons', label: 'DASP vs leaving your super in Australia: pros and cons' },
              { href: '/blog/super-for-casual-and-part-time-workers', label: 'Super for casual and part-time working holiday makers' },
              { href: '/blog/how-to-choose-super-fund', label: 'How to choose a super fund on a working holiday visa' },
              { href: '/blog/what-is-dasp-super-withdrawal', label: 'What is DASP? Departing Australia Superannuation Payment explained' },
              { href: '/blog/dasp-tax-rate-65-percent-explained', label: 'Why DASP is taxed at 65% and what it means for your refund' },
              { href: '/blog/how-long-does-dasp-take', label: 'How long does a DASP super refund take to arrive?' },
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

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What is next?"
        heading="Check if you are eligible for Medicare"
        body="Depending on your country of origin, you may be eligible for Medicare or exempt from the Medicare levy."
        cta="Check your Medicare eligibility →"
        href="/medicare"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
      <MobileCta href={WA_URL} lang="en" />
    </>
  )
}

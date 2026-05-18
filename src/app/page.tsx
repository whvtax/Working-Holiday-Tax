import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, SITE_URL, AGENT_NAME } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'

// ─── METADATA - rich SEO + AI optimized ─────────────────────────────────
export const metadata: Metadata = {
  title: 'Working Holiday Tax - Australian Tax Help for WHV Holders',
  description: 'Registered tax agents who handle TFN, tax returns, super withdrawal (DASP) and ABN for working holiday visa holders (subclass 417 and 462) in Australia.',
  keywords: [
    'working holiday tax',
    'working holiday visa tax Australia',
    'WHV tax return',
    'TFN application working holiday',
    'backpacker tax Australia',
    'DASP super refund',
    '417 visa tax',
    '462 visa tax',
    'ABN registration backpacker',
    'Australian tax for working holiday makers',
    'WHM tax rate 2025-26',
    'registered tax agent Australia',
    'super withdrawal Australia',
    'Medicare levy exemption backpacker',
  ],
  authors: [{ name: AGENT_NAME }],
  creator: AGENT_NAME,
  publisher: AGENT_NAME,
  category: 'Tax Services',
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax - Australian Tax Help for WHV Holders',
    description: 'Registered tax agents for working holiday makers in Australia. TFN, returns, super and ABN - all handled.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax - Australian tax services for backpackers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax - Australian Tax Help',
    description: 'Registered tax agents for working holiday makers in Australia.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

// ─── ICONS - relevant per service ───────────────────────────────────────
const IconTFN     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconABN     = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 8l7-5 7 5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7.5 17v-6h5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconReturn  = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16v1a1 1 0 001 1h12a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconSuper   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)

const IconMedicare = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 17.5s-6-3.5-6-8.5a3 3 0 016-2 3 3 0 016 2c0 5-6 8.5-6 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="10" y1="7" x2="10" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="7.5" y1="9.5" x2="12.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)

const IconStar  = () => (<svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const CheckIcon = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M3.5 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

// ─── DATA - colors aligned with site palette ────────────────────────────
const TESTIMONIALS = [
  { name: "Liam O'Connor", from: 'Ireland · WHV 417', quote: "I had multiple employers and no idea what to do. They handled everything and made it easy.", amount: '$3,200', initials: 'L' },
  { name: 'Anna Larsen',   from: 'Norway · WHV 417', quote: "They handled my TFN and tax return fast. I didn't have to stress about anything.", amount: '$2,450', initials: 'A' },
  { name: 'Tobias Bauer',  from: 'Germany · WHV 417', quote: "They explained everything simply and helped me claim money I didn't even know about.", amount: '$4,100', initials: 'T' },
]

const STEPS = [
  { n: '1', title: 'Tell us about your situation', body: "TFN, ABN, tax return, super - we will guide you from the start." },
  { n: '2', title: 'Send your details in minutes',  body: 'Quick checklist, no complicated forms.' },
  { n: '3', title: 'We handle everything for you',  body: 'We prepare, lodge, and manage it all.' },
  { n: '4', title: 'Get your money back',           body: 'Refund goes straight to your account.' },
]

const SERVICES = [
  { n: '01', href: '/tfn',            icon: <IconTFN />,      title: 'TFN Application',  desc: 'Start working at the correct tax rate from day one.' },
  { n: '02', href: '/abn',            icon: <IconABN />,      title: 'ABN Registration', desc: 'Register your ABN to work as a sole trader and invoice clients correctly.' },
  { n: '03', href: '/tax-return',     icon: <IconReturn />,   title: 'Tax Return',       desc: 'Lodge your tax return and get the maximum refund you are entitled to.' },
  { n: '04', href: '/superannuation', icon: <IconSuper />,    title: 'Super Withdrawal', desc: 'Claim your super back when you leave Australia.' },
  { n: '05', href: '/medicare',       icon: <IconMedicare />, title: 'Medicare Levy',    desc: 'Apply for a Medicare levy exemption when you are not eligible.' },
]

const FAQS = [
  {
    question: 'How much do your services cost?',
    answer: 'Initial enquiries and quotes are free. Our fees are flat and depend on the service. For tax returns, fees can be deducted from your refund so no upfront payment is needed. We confirm pricing before any work begins.',
  },
  {
    question: 'How quickly will you reply?',
    answer: 'During business hours (Mon-Fri, 9am-6pm AEST) we usually reply within an hour. Outside business hours, we will get back to you first thing the next morning.',
  },
  {
    question: 'Can you help me if I have already left Australia?',
    answer: 'Yes. We help working holiday makers who have left Australia lodge their tax returns and claim their super (DASP) entirely online. Everything is handled remotely - refunds go to your Australian or overseas account.',
  },
  {
    question: 'What tax rate do working holiday makers pay?',
    answer: 'Working holiday makers pay a flat 15% on the first $45,000 earned, then 30% up to $135,000, 37% up to $190,000, and 45% above that. There is no tax-free threshold. If you do not provide your TFN to your employer, they must withhold tax at 45%.',
  },
  {
    question: 'Do you only handle tax returns?',
    answer: 'No. We help with TFN applications, ABN registrations, tax returns, super withdrawal (DASP), and Medicare Levy exemption certificates - everything a working holiday maker needs.',
  },
]

export default function HomePage() {

  // ─── Schema.org ───
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Working Holiday Tax - Australian Tax for WHV Holders',
    description: 'Registered tax agents who handle TFN, tax returns, super withdrawal and ABN for working holiday visa holders in Australia.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  const aggregateRatingLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#service`,
    name: 'Working Holiday Tax Services',
    description: 'Tax services for working holiday visa holders in Australia.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: 'AU',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '300',
      bestRating: '5',
      worstRating: '1',
    },
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 pt-12 pb-10 lg:pt-14 lg:pb-12 text-center">

          <div className="inline-flex items-center gap-2 mb-4 lg:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(11,82,64,0.65)' }}>Working Holiday Visa Specialist</span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(28px, 5vw, 42px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px' }}>
            <span className="lg:whitespace-nowrap" style={{ display: 'block' }}>Confused about tax in Australia?</span>
            <span className="lg:whitespace-nowrap" style={{ display: 'block', color: '#0B5240' }}>We have got you covered.</span>
          </h1>

          <p className="font-light mx-auto"
            style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.55)', maxWidth: '34ch', marginBottom: '10px' }}>
            TFN, ABN, Tax Return &amp; Super.<br />We handle everything for you.
          </p>

          <div style={{ marginTop: '24px', marginBottom: '16px' }} className="lg:mt-8 lg:mb-4">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '300px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              Start your tax return →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 mx-auto">
            {['1,200+ backpackers helped', '4.9★ from 300+ reviews', '45+ countries served', '~1 hour response time'].map((label, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                style={{ fontSize: '12px', color: 'rgba(10,15,13,0.5)' }}>
                <CheckIcon />{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 text-center">

          <span className="section-label center">Why us?</span>

          <h2 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.12, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '10px', marginBottom: '10px' }}>
            Built for backpackers on a Working Holiday visa.
          </h2>

          <p className="font-light text-muted mx-auto"
            style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.7, maxWidth: '36ch', marginBottom: '32px', textAlign: 'center' }}>
            We have one focus, one goal:<br />to maximise your refund.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10" style={{ marginBottom: '36px' }}>
            {[
              { title: 'Backpacker tax specialists.',   body: 'We handle working holiday tax exclusively, so we know exactly how to get you the most back.' },
              { title: 'ATO compliant.',                body: 'Fully compliant with ATO rules, supervised by a registered tax agent.' },
              { title: 'Clear, simple support.',        body: 'No complicated terms. We guide you through everything, step by step.' },
              { title: 'We take care of everything.',   body: 'No paperwork, no stress. We handle everything for you from start to finish.' },
            ].map((item, i) => (
              <div key={i} className="pt-4 lg:pt-6 text-center" style={{ borderTop: '1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: 'clamp(13px, 1.2vw, 13.5px)', marginBottom: '6px', lineHeight: 1.35 }}>{item.title}</h3>
                <p className="font-light text-muted leading-[1.7]" style={{ fontSize: 'clamp(12px, 1.1vw, 13px)' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '8px' }} className="lg:mt-4">
            <Link href="#how-it-works" className="btn-ghost-dark inline-flex" style={{ height: '44px', padding: '0 24px', fontSize: '13.5px' }}>
              Start your tax return →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24" style={{ background: '#F4F9F6' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">Client results</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', maxWidth: '26ch' }}>
              See how much backpackers like you are getting back.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '18px', boxShadow: '0 1px 4px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1 line-clamp-3 lg:line-clamp-none"
                  style={{ fontSize: '13px', lineHeight: 1.7, marginBottom: '12px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between" style={{ paddingTop: '10px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                      style={{ width: '30px', height: '30px', fontSize: '11px', background: '#EAF6F1', color: '#0B5240' }}>{t.initials}</div>
                    <div>
                      <p className="font-semibold text-ink" style={{ fontSize: '12px', lineHeight: 1.2 }}>{t.name}</p>
                      <p className="text-subtle" style={{ fontSize: '10.5px', marginTop: '1px' }}>{t.from}</p>
                    </div>
                  </div>
                  <span className="font-serif font-black text-forest-500 flex-shrink-0"
                    style={{ fontSize: 'clamp(18px, 2vw, 22px)', letterSpacing: '-0.03em' }}>{t.amount}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #E2EFE9' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8">
              {[
                { n: '4.9★',   l: 'from 300+ reviews' },
                { n: '1,200+', l: 'backpackers helped' },
                { n: '< 1 hr', l: '~1 hour response time' },
                { n: '100%',   l: 'Fully online, no paperwork' },
              ].map((s, i) => (
                <div key={i} className="text-center py-2 lg:py-3">
                  <p className="font-serif font-black text-forest-500"
                    style={{ fontSize: 'clamp(18px, 2.8vw, 28px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                  <p className="text-subtle"
                    style={{ fontSize: 'clamp(11px, 1.1vw, 12.5px)', marginTop: '5px', lineHeight: 1.4 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '24ch' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.7, maxWidth: '32ch', marginBottom: '4px' }}>
              <em className="not-italic text-forest-400">Simple process, maximum refund.</em>
            </p>
          </div>

          {/* Desktop 4-step horizontal */}
          <div className="hidden lg:block" style={{ marginBottom: '56px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 25%, #0B5240 75%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-4" style={{ zIndex: 1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width: '40px', height: '40px', background: '#0B5240', fontSize: '15px', marginBottom: '20px', boxShadow: '0 0 0 5px #fff, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize: '14px', marginBottom: '8px', lineHeight: 1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize: '12.5px', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '24px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width: '30px', height: '30px', background: '#0B5240', fontSize: '13px', flexShrink: 0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="flex-1 w-px mt-2"
                      style={{ minHeight: '22px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.7 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '8px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '300px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              Start your tax return →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12px', color: '#2FA880' }}>
              Free to start&nbsp;&bull;&nbsp;No upfront fees&nbsp;&bull;&nbsp;Personal support throughout
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24" style={{ background: '#EEF7F2' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">What we help with</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '22ch' }}>
              Full tax support for working holiday makers<br />
              <em className="not-italic font-normal text-forest-400">in Australia.</em>
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', textAlign: 'center', lineHeight: 1.7, maxWidth: '36ch' }}>
              From your first job to your final refund.<br />We have got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-4">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <span className="font-medium uppercase text-subtle" style={{ fontSize: '10px', letterSpacing: '0.1em', marginBottom: '10px' }}>{s.n}</span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0"
                  style={{ marginBottom: '10px' }}>{s.icon}</span>
                <h3 className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '5px' }}>{s.title}</h3>
                <p className="font-light text-muted leading-[1.65] flex-1" style={{ fontSize: '12px', marginBottom: '12px' }}>{s.desc}</p>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3" style={{ fontSize: '12px' }}>
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-8">
            <span className="section-label center">Frequently asked</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Quick answers
            </h2>
          </div>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="home-faq" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>

          <p className="text-center" style={{ marginTop: '28px', fontSize: '14px', color: '#587066' }}>
            More questions? <Link href="/contact" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>Get in touch</Link>
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow="Start here"
        heading="Get your tax sorted"
        headingEm="in Australia or abroad."
        sub={<>We handle your TFN, tax return, super and ABN<span className="hidden sm:inline">,</span><br className="sm:hidden" /> all in one place.</>}
        primaryLabel="Start your tax return"
        trustLine=""
        clipTop
      />
    </>
  )
}

import type { Metadata } from 'next'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import Link from 'next/link'
import { WA_URL, SITE_URL, AGENT_NAME, AGENT_ABN, AGENT_TPB, EMAIL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'

// ─── METADATA - rich SEO + AI optimized ─────────────────────────────────
export const metadata: Metadata = {
  title: 'Working Holiday Tax Refund Australia | WHV & Backpacker Tax Return',
  description: 'Working holiday tax refund Australia — registered tax agents who handle your WHV tax return, TFN, super refund (DASP) and ABN for 417 and 462 visa holders. Lodge from Australia or after you go home, all online.',
  keywords: [
    // Primary refund-focused terms
    'working holiday tax refund',
    'working holiday tax refund Australia',
    'WHV tax refund Australia',
    'WHM tax refund Australia',
    'backpacker tax refund Australia',
    'Australian tax refund working holiday',
    'tax refund 417 visa',
    'tax refund 462 visa',
    'claim tax back Australia backpacker',
    'claim tax back from Australia',
    'how to get a tax refund Australia working holiday',
    'working holiday tax return',
    'WHV tax return',
    'working holiday visa tax Australia',
    'working holiday maker tax refund',
    'Australian tax return for backpackers',
    'tax back Australia working holiday',
    'tax refund after leaving Australia',
    'lodge tax return from overseas Australia',
    'tax return Australia after going home',
    'end of financial year tax return WHV',
    // Adjacent services
    'TFN application working holiday',
    'backpacker tax Australia',
    'DASP super refund Australia',
    'super refund after leaving Australia',
    '417 visa tax',
    '462 visa tax',
    'ABN registration backpacker',
    'Australian tax for working holiday makers',
    'WHM tax rate 2025-26',
    'registered tax agent Australia working holiday',
    'super withdrawal Australia backpacker',
    'Medicare levy exemption backpacker',
    // Market-specific long-tail
    'working holiday tax refund UK backpacker',
    'tax refund Australia German backpacker',
    'tax refund Australia Japanese working holiday',
  ],
  authors: [{ name: AGENT_NAME }],
  creator: AGENT_NAME,
  publisher: AGENT_NAME,
  category: 'Tax Services',
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-AU': SITE_URL,
      'de': `${SITE_URL}/de`,
      'ja': `${SITE_URL}/ja`,
      'x-default': SITE_URL,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Working Holiday Tax',
    title: 'Working Holiday Tax Refund Australia | WHV & Backpacker Tax Return',
    description: 'Working holiday tax refund Australia — registered tax agents handle your WHV tax return, TFN, super refund (DASP) and ABN for 417 and 462 visa holders. All online, even after you leave Australia.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia - tax services for backpackers on 417 and 462 visas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax Refund Australia | WHV Tax Return',
    description: 'Working holiday tax refund for 417 and 462 visa holders. Registered tax agents - all online, lodge from Australia or overseas.',
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

const STEPS = [
  { n: '1', title: 'Tell us about your situation', body: "TFN, ABN, working holiday tax return, super - we will guide you from the start." },
  { n: '2', title: 'Send your details in minutes',  body: 'Quick checklist, no complicated forms or paperwork.' },
  { n: '3', title: 'We handle everything for you',  body: 'A registered tax agent prepares and lodges your return with the ATO.' },
  { n: '4', title: 'Get your assessment',           body: 'Once the ATO processes your return, any refund you are owed is paid straight into your Australian bank account.' },
]

const SERVICES = [
  { n: '01', href: '/tfn',            icon: <IconTFN />,      title: 'TFN Application',  desc: 'Start working at the correct working holiday tax rate from day one.' },
  { n: '02', href: '/abn',            icon: <IconABN />,      title: 'ABN Registration', desc: 'Register your ABN to work as a sole trader and invoice clients correctly.' },
  { n: '03', href: '/tax-return',     icon: <IconReturn />,   title: 'Tax Return',       desc: 'Lodge your working holiday tax return and claim every refund you are entitled to.' },
  { n: '04', href: '/superannuation', icon: <IconSuper />,    title: 'Super Withdrawal', desc: 'Claim your super back through DASP when you leave Australia.' },
  { n: '05', href: '/medicare',       icon: <IconMedicare />, title: 'Medicare Levy',    desc: 'Apply for a Medicare Levy exemption when you are not eligible for Medicare.' },
]

const FAQS = [
  {
    question: 'How does a working holiday tax refund in Australia work?',
    answer: 'If you worked in Australia on a 417 or 462 working holiday visa, tax was withheld from your pay throughout the year. After 30 June, you lodge a tax return with the Australian Taxation Office (ATO), and any tax you overpaid comes back to you as a refund. The exact amount depends on your income, your tax residency status, the deductions you can claim, and whether your employer registered as a Working Holiday Maker employer. A registered tax agent can review your situation and make sure your return is lodged correctly.',
  },
  {
    question: 'How much do your services cost?',
    answer: 'Initial enquiries and quotes are free. Our fees are flat and depend on the service. For tax returns, fees can be deducted from your refund so no upfront payment is needed. We confirm pricing before any work begins.',
  },
  {
    question: 'How quickly will you reply?',
    answer: 'During business hours (Mon-Fri, 9am-6pm AEST/AEDT) we usually reply within an hour. Outside business hours, we will get back to you first thing the next morning.',
  },
  {
    question: 'Can you help me claim my tax refund after I have already left Australia?',
    answer: 'Yes. We help working holiday makers from the UK, Germany, Japan and many other countries lodge their Australian tax return and claim their super (DASP) entirely online, even years after leaving. Everything is handled remotely - tax refunds are paid to your Australian bank account (ATO rule), while super refunds (DASP) can be paid to your overseas account.',
  },
  {
    question: 'What tax rate do working holiday makers pay in Australia?',
    answer: 'Working holiday makers pay a flat 15% on the first $45,000 earned, then 30% up to $135,000, 37% up to $190,000, and 45% above that. There is no tax-free threshold for WHV holders. If you do not provide your TFN to your employer, they must withhold tax at 45% - which is one of the most common reasons backpackers end up owed a tax refund.',
  },
  {
    question: 'Do you only handle tax returns?',
    answer: 'No. We help with TFN applications, ABN registrations, working holiday tax returns, super withdrawal (DASP), and Medicare Levy exemption certificates - everything a working holiday maker on a 417 or 462 visa needs.',
  },
]

export default function HomePage() {

  // ─── Schema.org ───
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Working Holiday Tax Refund Australia | WHV Tax Return',
    description: 'Registered tax agents who handle working holiday tax refunds, TFN, tax returns, super withdrawal (DASP) and ABN for 417 and 462 visa holders in Australia.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
  }

  const aggregateRatingLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#service`,
    name: 'Working Holiday Tax Refund Services Australia',
    description: 'Working holiday tax refund and tax return services for 417 and 462 visa holders in Australia.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: 'AU',
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

  // Organization schema - core trust signal for Google E-E-A-T
  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    legalName: AGENT_NAME,
    url: SITE_URL,
    email: EMAIL,
    description: 'Registered tax agent service specialising in working holiday makers (417 and 462 visa holders) in Australia. We handle tax returns, TFN applications, super refunds (DASP) and ABN registrations.',
    identifier: [
      { '@type': 'PropertyValue', name: 'ABN', value: AGENT_ABN },
      { '@type': 'PropertyValue', name: 'TPB Registration', value: AGENT_TPB },
    ],
    areaServed: { '@type': 'Country', name: 'Australia' },
    knowsLanguage: ['en', 'de', 'ja'],
    sameAs: [
      'https://www.instagram.com/workingholidaytax',
      'https://www.tiktok.com/@workingholidaytax',
    ],
  }

  // ProfessionalService - signals to Google this is a real business offering tax services
  const professionalServiceLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#professionalservice`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    description: 'Registered tax agent for working holiday makers in Australia (417 and 462 visa holders). Tax returns, TFN, ABN, super refund (DASP).',
    areaServed: { '@type': 'Country', name: 'Australia' },
    serviceType: ['Tax return preparation', 'TFN application', 'ABN registration', 'Superannuation refund (DASP)', 'Medicare levy exemption'],
    provider: { '@id': `${SITE_URL}/#business` },
    audience: {
      '@type': 'Audience',
      audienceType: 'Working Holiday Maker (Subclass 417 and 462)',
      geographicArea: { '@type': 'Country', name: 'Australia' },
    },
    availableLanguage: ['en', 'de', 'ja'],
  }

  // BreadcrumbList - homepage breadcrumb (single level, but signals site structure)
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    ],
  }

  // WebSite schema with search action - lets Google show a sitelinks search box
  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Working Holiday Tax',
    description: 'Working holiday tax refund Australia - registered tax agents for 417 and 462 visa holders.',
    inLanguage: ['en-AU', 'de', 'ja'],
    publisher: { '@id': `${SITE_URL}/#business` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 pt-12 pb-10 lg:pt-14 lg:pb-12 text-center">

          <div className="inline-flex items-center gap-2 mb-4 lg:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(11,82,64,0.65)' }}>Working Holiday Tax Return Specialists</span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(22px, 5vw, 42px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px' }}>
            {/* Desktop H1 */}
            <span className="hidden lg:block">
              <span style={{ display: 'block', whiteSpace: 'nowrap' }}>Working holiday tax return?</span>
              <span style={{ display: 'block', color: '#0B5240' }}>We have got you covered.</span>
            </span>
            {/* Mobile H1 */}
            <span className="lg:hidden">
              <span style={{ display: 'block' }}>Tax return for</span>
              <span style={{ display: 'block', color: '#0B5240' }}>working holiday makers</span>
            </span>
          </h1>

          <p className="font-light mx-auto"
            style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.55)', maxWidth: '54ch', marginBottom: '10px' }}>
            {/* Desktop sub-copy */}
            <span className="hidden lg:inline">Tax return specialists for working holiday makers on <span style={{ whiteSpace: 'nowrap' }}>417 &amp; 462 visas</span>.<br />TFN, ABN, tax return &amp; super</span>
            {/* Mobile sub-copy */}
            <span className="lg:hidden">TFN, ABN, tax return &amp; super</span>
          </p>

          <div style={{ marginTop: '24px', marginBottom: '16px' }} className="lg:mt-8 lg:mb-4">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '300px', width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
              Start your tax return →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 mx-auto">
            {['1,200+ backpackers helped', <GoogleRating variant="pill" lang="en" />, '45+ countries served', '~1 hour response time'].map((label, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                style={{ fontSize: '12px', color: 'rgba(10,15,13,0.5)' }}>
                <CheckIcon />{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24" style={{ background: '#F5F9F7' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 text-center">

          <span className="section-label center">Why us?</span>

          <h2 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.12, letterSpacing: '-0.025em', maxWidth: '24ch', marginTop: '10px', marginBottom: '10px' }}>
            Built for backpackers on a Working Holiday Visa in Australia.
          </h2>

          <p className="font-light text-muted mx-auto"
            style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.7, maxWidth: '38ch', marginBottom: '32px', textAlign: 'center' }}>
            One focus: working holiday tax.<br />Every refund you are entitled to, properly claimed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10" style={{ marginBottom: '36px' }}>
            {[
              { title: 'Backpacker tax specialists.',   body: 'We work exclusively with working holiday makers, so we know the rules for 417 and 462 visas inside out.' },
              { title: 'ATO compliant.',                body: 'Lodged through a registered tax agent and fully compliant with current ATO rules for working holiday makers.' },
              { title: 'Clear, simple support.',        body: 'No complicated terms. We guide you through your tax return step by step, in plain English.' },
              { title: 'We take care of everything.',   body: 'No paperwork, no stress. From your TFN to your final refund, we handle it all - in Australia or after you go home.' },
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
      <section className="py-12 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '28px' }}>
            <span className="section-label center">Client results</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', maxWidth: '28ch' }}>
              What backpackers say about working with us.
            </h2>
          </div>

          <GoogleReviews lang="en" />

          <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #E2EFE9' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8">
              {[
                { n: <GoogleRating variant="number" lang="en" />, l: <GoogleRating variant="count" lang="en" /> },
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
      <section id="how-it-works" className="py-12 lg:py-24" style={{ background: '#F4F9F6' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '24ch' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(14px, 1.4vw, 16px)', lineHeight: 1.7, maxWidth: '36ch', marginBottom: '4px' }}>
              <em className="not-italic text-forest-400">Simple process. Your working holiday tax return, properly lodged.</em>
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
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px', maxWidth: '24ch' }}>
              Full tax support for working holiday makers<br />
              <em className="not-italic font-normal text-forest-400">in Australia.</em>
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize: 'clamp(13px, 1.3vw, 15px)', textAlign: 'center', lineHeight: 1.7, maxWidth: '38ch' }}>
              From your first job in Australia to your final working holiday tax refund.<br />We have got you covered.
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

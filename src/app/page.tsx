import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, SITE_URL, EMAIL, AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'

// ─── METADATA - rich SEO + AI optimized ─────────────────────────────────
export const metadata: Metadata = {
  title: 'Working Holiday Tax - Australian Tax Help for WHV Holders',
  description: 'Registered tax agent specialising in TFN applications, tax returns, super withdrawal (DASP) and ABN for working holiday visa holders (subclass 417 and 462) in Australia.',
  keywords: [
    'working holiday tax',
    'working holiday visa tax',
    'WHV tax return Australia',
    'TFN application working holiday',
    'backpacker tax Australia',
    'DASP super refund',
    '417 visa tax return',
    '462 visa tax return',
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
    description: 'Registered tax agent for working holiday makers in Australia. TFN, tax returns, super withdrawal and ABN - all handled for you.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax - Australian tax services for backpackers' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax - Australian Tax Help',
    description: 'Registered tax agent for working holiday makers in Australia.',
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

// ─── DATA ────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    href: '/tfn',
    title: 'TFN Application',
    desc: 'Get your Tax File Number issued so you can start working at the correct 15% rate from day one.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.6"/>
        <line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="13" x2="14" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="7" y1="17" x2="11" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/abn',
    title: 'ABN Registration',
    desc: 'Register an Australian Business Number to invoice clients legally as a contractor or sole trader.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 9l9-6 9 6v11a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/tax-return',
    title: 'Tax Return',
    desc: 'Lodge your annual return and claim the maximum refund you are entitled to under WHM rules.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2v15M7 12l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 19v2a1 1 0 001 1h16a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: '/superannuation',
    title: 'Super Withdrawal',
    desc: 'Claim your superannuation through the DASP process when you leave Australia for good.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: '/medicare',
    title: 'Medicare Levy',
    desc: 'Get your Medicare Levy Exemption Certificate and remove the 2% levy from your tax return.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.65A4 4 0 0119 11c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <line x1="12" y1="9" x2="12" y2="15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <line x1="9" y1="12" x2="15" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
] as const

const STEPS = [
  { n: '1', title: 'Tell us your situation', body: 'Send a quick WhatsApp with what you need - TFN, ABN, return, or super.' },
  { n: '2', title: 'Send your details',     body: 'We will tell you exactly what to send. Quick checklist, no complicated forms.' },
  { n: '3', title: 'We handle everything',  body: 'We prepare and lodge with the ATO. Usually within 24 hours.' },
  { n: '4', title: 'Get your money back',   body: 'Refund goes straight to your account, in Australia or overseas.' },
]

const WHY_US = [
  {
    title: 'Backpacker tax specialists',
    body: 'We work exclusively with working holiday visa holders. WHM tax is all we do, so we know every rule and every deduction.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M5 7h14a1 1 0 011 1v11a2 2 0 01-2 2H6a2 2 0 01-2-2V8a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.6"/>
      </svg>
    ),
  },
  {
    title: 'Registered tax agent',
    body: 'Fully compliant with ATO rules and supervised by a Tax Practitioners Board registered agent (Tax Agent No: 26233096).',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M8.5 12l2.5 2.5L16 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Fully online',
    body: 'No appointments, no offices, no paperwork. Everything happens through WhatsApp and email, even after you leave Australia.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.6"/>
        <line x1="11" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: 'Fast, real humans',
    body: 'Average reply under one hour during business hours. No bots, no scripts - real advisors who speak plainly.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const TESTIMONIALS = [
  {
    name: "Liam O'Connor",
    from: 'Ireland · 417 visa',
    quote: 'I had multiple employers and no idea what to do. They handled everything and made it easy.',
    amount: '$3,200',
    initials: 'L',
  },
  {
    name: 'Anna Larsen',
    from: 'Norway · 417 visa',
    quote: "They handled my TFN and tax return fast. I didn't have to stress about anything.",
    amount: '$2,450',
    initials: 'A',
  },
  {
    name: 'Tobias Bauer',
    from: 'Germany · 417 visa',
    quote: "They explained everything simply and helped me claim money I didn't even know about.",
    amount: '$4,100',
    initials: 'T',
  },
]

const FAQS = [
  {
    question: 'What tax rate do working holiday makers pay in Australia?',
    answer: 'Working holiday makers pay a flat 15% on the first $45,000 earned, then 30% from $45,001 to $135,000, 37% from $135,001 to $190,000, and 45% above $190,000. There is no tax-free threshold for WHM holders. If you do not provide your TFN to your employer, they must withhold tax at 45%.',
  },
  {
    question: 'How long does a TFN application take?',
    answer: 'A TFN application is processed within 28 days by the ATO. In practice, many applicants receive their Tax File Number within two weeks. Your TFN is posted to your Australian address, so make sure your address is current and your post is being checked.',
  },
  {
    question: 'Can you help me if I have already left Australia?',
    answer: 'Yes. We help working holiday makers who have left Australia lodge their tax returns and claim their super (DASP) entirely online. Everything is handled remotely - we collect documents through WhatsApp or email and refunds go to your Australian bank account or overseas account.',
  },
  {
    question: 'When can I claim my super back?',
    answer: 'You can claim your super through the Departing Australia Superannuation Payment (DASP) process once you have left Australia and your visa has expired or been cancelled. DASP for working holiday makers is taxed at 65%, so the timing matters. We handle the entire claim for you.',
  },
  {
    question: 'How much do your services cost?',
    answer: 'Initial enquiries and quotes are free. Our fees vary by service - tax returns start from a flat fee that is deducted from your refund. No upfront payment is required. We confirm pricing before any work begins.',
  },
  {
    question: 'Is there a deadline for lodging my tax return?',
    answer: 'The standard deadline for self-lodgement is 31 October following the tax year (which ends 30 June). When you lodge through a registered tax agent like us, you qualify for an extended deadline, typically into the following May. This applies even if you have already left Australia.',
  },
]

export default function HomePage() {

  // ─── Schema.org - rich, AI-friendly ───
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Working Holiday Tax - Australian Tax for WHV Holders',
    description: 'Registered tax agent specialising in TFN, tax returns, super withdrawal and ABN for working holiday visa holders in Australia.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    primaryImageOfPage: { '@id': `${SITE_URL}/#logo` },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-12 pt-10 pb-8 lg:pt-16 lg:pb-12 text-center">

          <div className="inline-flex items-center gap-2 mb-4 lg:mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.7)' }}>
              Working Holiday Visa Tax Specialists
            </span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto"
            style={{
              fontSize: 'clamp(30px, 5.2vw, 52px)',
              lineHeight: 1.06,
              letterSpacing: '-0.03em',
              marginBottom: '16px',
              maxWidth: '14ch',
            }}>
            Australian tax,<br />
            <span style={{ color: '#0B5240' }}>sorted.</span>
          </h1>

          <p className="font-light mx-auto"
            style={{
              fontSize: 'clamp(15px, 1.4vw, 17px)',
              lineHeight: 1.6,
              color: 'rgba(10,15,13,0.65)',
              maxWidth: '36ch',
              marginBottom: '28px',
            }}>
            Registered tax agents who handle TFN, returns, super and ABN for working holiday makers - all online.
          </p>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center"
            style={{ minHeight: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '320px', width: '100%' }}>
            Start your tax return →
          </a>

          <p className="mx-auto" style={{ marginTop: '14px', fontSize: '12.5px', color: '#587066' }}>
            Free quote · No upfront fees · Reply within 1 hour
          </p>
        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9' }}>
        <div className="max-w-[1100px] mx-auto px-4 md:px-8 lg:px-12 py-5 lg:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { stat: '1,200+', label: 'Backpackers helped' },
              { stat: '4.9★',   label: '300+ reviews' },
              { stat: '45+',    label: 'Countries served' },
              { stat: '~1 hr',  label: 'Average response' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: '#0B5240', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '4px' }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: '11.5px', color: '#587066', letterSpacing: '0.02em' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="text-center mb-8 lg:mb-10">
            <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              What we help with
            </p>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '10px', maxWidth: '20ch' }}>
              Full tax support for working holiday makers
            </h2>
            <p className="font-light mx-auto" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', color: '#587066', lineHeight: 1.65, maxWidth: '44ch' }}>
              From your first job to your final refund. Everything handled by registered tax agents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {SERVICES.map(s => (
              <Link key={s.href} href={s.href} className="home-service-card">
                <div className="home-service-icon">
                  {s.icon}
                </div>
                <h3 className="home-service-title">{s.title}</h3>
                <p className="home-service-desc">{s.desc}</p>
                <span className="home-service-link">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="text-center mb-10">
            <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              How it works
            </p>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '10px', maxWidth: '20ch' }}>
              Four steps to your refund
            </h2>
            <p className="font-light mx-auto" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', color: '#587066', lineHeight: 1.65, maxWidth: '40ch' }}>
              Most clients are done in under 30 minutes of their time. We do the rest.
            </p>
          </div>

          {/* Desktop horizontal */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-4 gap-6">
              {STEPS.map(s => (
                <div key={s.n} className="home-step-card">
                  <div className="home-step-number">{s.n}</div>
                  <h3 className="home-step-title">{s.title}</h3>
                  <p className="home-step-body">{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical */}
          <div className="lg:hidden flex flex-col gap-4 max-w-[480px] mx-auto">
            {STEPS.map((s, i) => (
              <div key={s.n} className="home-step-card-mobile">
                <div className="flex items-start gap-4">
                  <div className="home-step-number-mobile">{s.n}</div>
                  <div style={{ flex: 1, paddingTop: '2px' }}>
                    <h3 className="home-step-title">{s.title}</h3>
                    <p className="home-step-body">{s.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '36px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center"
              style={{ minHeight: '52px', padding: '0 32px', fontSize: '14.5px', borderRadius: '100px', maxWidth: '300px', width: '100%' }}>
              Start your tax return →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="text-center mb-8 lg:mb-10">
            <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              Why us
            </p>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '10px', maxWidth: '20ch' }}>
              Built for backpackers, not businesses
            </h2>
            <p className="font-light mx-auto" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', color: '#587066', lineHeight: 1.65, maxWidth: '46ch' }}>
              We do one thing - working holiday tax in Australia - and we do it really well.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {WHY_US.map((item, i) => (
              <div key={i} className="home-why-card">
                <div className="home-why-icon">
                  {item.icon}
                </div>
                <h3 className="home-why-title">{item.title}</h3>
                <p className="home-why-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="text-center mb-8 lg:mb-10">
            <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              Real refunds
            </p>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '10px', maxWidth: '22ch' }}>
              Backpackers like you, sorted
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="home-testimonial-card">
                <div className="flex gap-0.5 mb-3" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <svg key={si} width="14" height="14" viewBox="0 0 12 12">
                      <path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/>
                    </svg>
                  ))}
                </div>
                <p className="home-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="home-testimonial-footer">
                  <div className="home-testimonial-avatar">{t.initials}</div>
                  <div style={{ flex: 1 }}>
                    <p className="home-testimonial-name">{t.name}</p>
                    <p className="home-testimonial-from">{t.from}</p>
                  </div>
                  <span className="home-testimonial-amount">{t.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="text-center mb-8">
            <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              Frequently asked
            </p>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(26px, 3.4vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '10px' }}>
              Quick answers
            </h2>
            <p className="font-light mx-auto" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', color: '#587066', lineHeight: 1.65, maxWidth: '40ch' }}>
              The most common things working holiday makers ask us.
            </p>
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

          <p className="text-center" style={{ marginTop: '32px', fontSize: '14px', color: '#587066' }}>
            More questions? <Link href="/contact" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>Get in touch</Link>
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[640px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <p className="font-semibold uppercase mb-3" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
            Ready when you are
          </p>
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(26px, 3.6vw, 38px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px', maxWidth: '20ch' }}>
            Start your tax return today
          </h2>
          <p className="font-light mx-auto" style={{ fontSize: 'clamp(14px, 1.3vw, 16px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '28px', maxWidth: '40ch' }}>
            We will get back to you within an hour. Free quote, no upfront fees.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold"
            style={{ minHeight: '54px', padding: '0 36px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '15px', maxWidth: '300px', width: '100%' }}>
            Start your tax return →
          </a>
        </div>
      </section>
    </>
  )
}

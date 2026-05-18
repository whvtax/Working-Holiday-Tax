import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, EMAIL, PHONE_DISPLAY, SITE_URL, AGENT_NAME, AGENT_ABN, AGENT_TPB } from '@/lib/constants'
import ContactForm from './ContactForm'
import MobileStickyCTA from './MobileStickyCTA'

export const metadata: Metadata = {
  title: 'Contact Us - Working Holiday Tax',
  description: 'Get in touch with our registered tax agents. WhatsApp, email or contact form. We reply within an hour during business hours. Tax help for working holiday visa holders in Australia.',
  keywords: [
    'contact working holiday tax',
    'tax agent Australia contact',
    'backpacker tax help',
    'working holiday visa support',
    'TFN help',
    'tax return support Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Working Holiday Tax',
    description: 'Get in touch with our registered tax agents. WhatsApp, email or contact form. Fast responses from real advisors.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Working Holiday Tax',
    description: 'Get in touch with our registered tax agents.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
}

const FAQS = [
  {
    question: 'How quickly will you reply?',
    answer: 'During business hours (Mon-Fri, 9am-6pm AEST) we usually reply within an hour. Outside business hours, we will get back to you first thing the next morning.',
  },
  {
    question: 'Is there a fee just to ask a question?',
    answer: 'No. Initial questions and consultations are free. We only charge once you decide to proceed with a service like a tax return, TFN application, or super claim.',
  },
  {
    question: 'What languages do you speak?',
    answer: 'Our team handles enquiries in English. We work with working holiday makers from 45+ countries every year, so we are used to making things simple regardless of background.',
  },
  {
    question: 'Do I need to send documents straight away?',
    answer: 'No. Just send us your question first. If we need documents, we will tell you exactly what to send and how to send them securely.',
  },
  {
    question: 'Can you help me if I have already left Australia?',
    answer: 'Yes. We work with working holiday makers who are still in Australia, recently departed, or returned years ago. Everything can be handled remotely - tax returns, super claims (DASP), and ABN matters.',
  },
]

export default function ContactPage() {

  // ContactPage schema with ContactPoint
  const contactPageLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact`,
    url: `${SITE_URL}/contact`,
    name: 'Contact Working Holiday Tax',
    description: 'Get in touch with our registered tax agents for help with TFN, tax returns, super and ABN.',
    inLanguage: 'en-AU',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': `${SITE_URL}/#business`,
    },
    mainEntity: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#business`,
      name: 'Working Holiday Tax',
      legalName: AGENT_NAME,
      url: SITE_URL,
      telephone: `+${'61424513998'}`,
      email: EMAIL,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: `+${'61424513998'}`,
          email: EMAIL,
          areaServed: 'AU',
          availableLanguage: ['English'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
            validFrom: '2020-01-01',
          },
        },
        {
          '@type': 'ContactPoint',
          contactType: 'WhatsApp',
          telephone: `+${'61424513998'}`,
          areaServed: 'AU',
          availableLanguage: ['English'],
        },
      ],
      identifier: [
        { '@type': 'PropertyValue', name: 'ABN', value: AGENT_ABN },
        { '@type': 'PropertyValue', name: 'Tax Agent Number', value: AGENT_TPB },
      ],
    },
  }

  // Breadcrumb schema
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
    ],
  }

  // FAQ schema
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO + BREADCRUMBS ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-5 pb-7 lg:pt-12 lg:pb-12">

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-5 lg:mb-6">
            <ol className="flex items-center gap-2" style={{ fontSize: '13px', color: '#587066' }}>
              <li>
                <Link href="/" className="contact-breadcrumb-link">Home</Link>
              </li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Contact</li>
            </ol>
          </nav>

          <div className="max-w-[640px] mx-auto text-center">

            <div className="inline-flex items-center gap-2 mb-3 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                Get in touch
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize: 'clamp(28px,5vw,46px)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                marginBottom: '14px',
              }}>
              Got tax questions?<br />We have got answers.
            </h1>

            <p className="font-light mx-auto"
              style={{
                fontSize: 'clamp(15px,1.3vw,16px)',
                lineHeight: 1.6,
                color: 'rgba(10,15,13,0.7)',
                maxWidth: '46ch',
              }}>
              Real humans, fast replies. We will get back to you within an hour during business hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS STRIP ─────────────────────────────────────────── */}
      <section className="bg-white" style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-5 lg:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { stat: '1,200+', label: 'Backpackers' },
              { stat: '4.9★',   label: 'Rating' },
              { stat: '45+',    label: 'Countries' },
              { stat: '~1 hr',  label: 'Response' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-serif" style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: '#0B5240', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '4px' }}>
                  {item.stat}
                </div>
                <div style={{ fontSize: '11px', color: '#587066', letterSpacing: '0.02em' }}>
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN: DIRECT CONTACTS + FORM ────────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '32px', paddingBottom: '40px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="contact-main-grid">

            {/* ── Direct Contact Options ── ON MOBILE: FIRST */}
            <aside className="contact-aside">
              <div className="mb-5 lg:mb-6">
                <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
                  Reach out directly
                </p>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '6px' }}>
                  Pick your favourite
                </h2>
                <p className="font-light" style={{ fontSize: '14.5px', color: '#587066', lineHeight: 1.65 }}>
                  Real advisors, no automated bots.
                </p>
              </div>

              {/* Contact options stack */}
              <address style={{ fontStyle: 'normal' }}>

                {/* WhatsApp - primary */}
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="contact-option-card contact-option-primary">
                  <div className="contact-option-icon" style={{ background: '#22C55E' }}>
                    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="0.5"/>
                      <path d="M13.1 12.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3.12.3.42 1.26.46 1.35.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z" fill="white"/>
                    </svg>
                  </div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <p className="contact-option-label">WhatsApp</p>
                    <p className="contact-option-detail">Usually replies in under 1 hour</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="contact-option-arrow">
                    <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                {/* Phone - tel link for mobile (very prominent on mobile) */}
                <a href={`tel:+${'61424513998'}`} className="contact-option-card">
                  <div className="contact-option-icon" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" stroke="#0B5240" strokeWidth="1.6" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <p className="contact-option-label">Call us</p>
                    <p className="contact-option-detail">{PHONE_DISPLAY}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="contact-option-arrow">
                    <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                {/* Email */}
                <a href={`mailto:${EMAIL}?subject=Tax%20question%20from%20website`}
                  className="contact-option-card">
                  <div className="contact-option-icon" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                    <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                      <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="#0B5240" strokeWidth="1.3"/>
                      <path d="M1.5 6.5l6.6 4.2a1.5 1.5 0 001.8 0L16.5 6.5" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex-1" style={{ minWidth: 0 }}>
                    <p className="contact-option-label">Email</p>
                    <p className="contact-option-detail" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{EMAIL}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="contact-option-arrow">
                    <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>

                {/* Social row */}
                <div className="grid grid-cols-2 gap-3" style={{ marginTop: '12px' }}>
                  <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer"
                    className="contact-option-card-small">
                    <div className="contact-option-icon-small" style={{ background: '#F7F9F8', border: '1px solid #E2EFE9' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0B5240" aria-hidden="true">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                      </svg>
                    </div>
                    <span className="contact-option-label-small">Instagram</span>
                  </a>
                  <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer"
                    className="contact-option-card-small">
                    <div className="contact-option-icon-small" style={{ background: '#F7F9F8', border: '1px solid #E2EFE9' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0B5240" aria-hidden="true">
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z"/>
                      </svg>
                    </div>
                    <span className="contact-option-label-small">TikTok</span>
                  </a>
                </div>
              </address>

              {/* Operating hours */}
              <div className="contact-hours-block">
                <p className="contact-hours-title">
                  <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5" style={{ background: '#2FA880' }} aria-hidden="true" />
                  Business hours
                </p>
                <p className="contact-hours-detail">
                  Monday to Friday, 9am - 6pm AEST<br />
                  <span style={{ color: '#8AADA3' }}>Replies within an hour during business hours</span>
                </p>
              </div>

            </aside>

            {/* ── Contact Form ── ON MOBILE: SECOND */}
            <div className="contact-form-wrapper">
              <div className="mb-5 lg:mb-6">
                <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
                  Or send a message
                </p>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '6px' }}>
                  Tell us your situation
                </h2>
                <p className="font-light" style={{ fontSize: '14.5px', color: '#587066', lineHeight: 1.65 }}>
                  We will review and get back with clear next steps.
                </p>
              </div>

              <ContactForm />
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '60px', paddingBottom: '60px' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="text-center mb-8">
            <p className="font-semibold uppercase mb-2" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              Common questions
            </p>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
              Before you reach out
            </h2>
          </div>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ paddingTop: '60px', paddingBottom: '70px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[520px] mx-auto text-center">
            <p className="font-semibold uppercase mb-3" style={{ fontSize: '10.5px', color: '#2FA880', letterSpacing: '0.14em' }}>
              Ready when you are
            </p>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.8vw, 34px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '14px' }}>
              Start your tax return today
            </h2>
            <p className="font-light mx-auto" style={{ fontSize: '15px', color: '#587066', lineHeight: 1.7, marginBottom: '24px', maxWidth: '420px' }}>
              No paperwork, no ATO portals. We handle everything online - usually within 24 hours.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 36px', fontSize: '15px', minWidth: '260px' }}>
              Start your tax return →
            </a>
          </div>
        </div>
      </section>

      {/* ── Mobile Sticky CTA (only shown on mobile after scroll) ── */}
      <MobileStickyCTA />
    </>
  )
}

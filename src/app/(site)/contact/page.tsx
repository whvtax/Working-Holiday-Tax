import type { Metadata } from 'next'
import Link from 'next/link'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/(site)/HomeWa'
import { waUrl } from '@/lib/wa'
import { WA_NUMBER, EMAIL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact us: a real person replies',
  description: 'Message us on WhatsApp and a real person replies, usually within about an hour during business hours. No myGov, no Australian ID, no payslips needed.',
  keywords: [
    'contact working holiday tax',
    'backpacker tax help',
    'backpacker tax help Australia',
    'working holiday visa support',
    'working holiday tax refund help',
    'TFN help',
    'TFN application help Australia',
    'WhatsApp working holiday tax help',
    'tax help after leaving Australia',
    'claim Australian tax refund from UK',
    'claim Australian tax refund from Germany',
    'claim Australian tax refund from Japan',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: {
      'en-AU': `${SITE_URL}/contact`,
      'de': `${SITE_URL}/de/contact`,
      'ja': `${SITE_URL}/ja/contact`,
      'x-default': `${SITE_URL}/contact`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'Contact Working Holiday Tax',
    description: 'WhatsApp is the fastest way to reach us. A real person replies, usually within about an hour during business hours.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'en_AU',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Contact Working Holiday Tax',
    description: 'Message us on WhatsApp. A real person replies, usually within about an hour.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
}

const WA = waUrl({ topic: 'contact', lang: 'en' })

/**
 * The four things that stop somebody sending the message.
 *
 * Taken from what people actually open a chat with, not from what a marketing
 * page would guess. Each one is answered in the first three words and then in a
 * complete paragraph, because a half answer here costs a conversation.
 */
const blockers: { q: string; a: string; link?: { href: string; label: string } }[] = [
  {
    q: 'Can you help me if I have already left Australia?',
    // Blank lines split the answer into paragraphs at the render below. The
    // JSON-LD still uses the raw string, so the structured data is unchanged.
    a: 'Yes, and a lot of our work is exactly that. A return for a year that has already ended can be lodged from anywhere, and superannuation can only be claimed once you have left and your visa has lapsed.\n\nOne thing to know early: the ATO can only pay a tax refund into an Australian bank account, while super can be paid overseas. Tell us if you have already closed yours.',
  },
  {
    q: 'Do I need a myGov account?',
    a: 'No. You will never log into myGov, link an Australian ID or work out which form is which. We deal with the ATO directly.\n\nIf you already tried and got stuck at the identity check, that changes nothing.',
  },
  {
    q: 'Do I need my payslips?',
    a: 'No, and there is nothing to gather before you message. What your employers withheld and reported is visible to us through the ATO, so if you have nothing at all, write anyway.',
    link: { href: '/about', label: 'Why we start from the ATO record' },
  },
  {
    q: 'Is this legitimate?',
    a: 'Your return is reviewed and signed off by a registered tax agent before it is lodged with the ATO. The terms you would be agreeing to are published in full on our client agreement, and the reviews on our Google listing are from working holiday makers we have worked with.',
    link: { href: '/client-agreement', label: 'Read the client agreement' },
  },
]

const FAQS = [
  {
    question: 'How quickly will you reply?',
    answer: 'During business hours, Monday to Friday, 9am to 6pm AEST or AEDT, we usually reply within about an hour. Outside those hours we get back to you first thing the next working morning. If your question needs checking first, we say so straight away.',
  },
  {
    question: 'Is there a fee just to ask a question?',
    answer: 'Asking is free, and you can ask as much as you like before deciding anything. The service is a flat fee, never a percentage of your refund, confirmed with you on WhatsApp before any work begins.',
  },
  {
    question: 'What language will you reply in?',
    answer: 'The one you write to us in. English, German, Japanese or whatever language you would rather explain your situation in, and that is what comes back.',
  },
  {
    question: 'Do I need to send documents straight away?',
    answer: 'No. Send the question first and nothing else. We answer it, and if there is work worth doing we tell you what it is and what it costs before anything starts.\n\nDocuments come later, once you have decided to go ahead, and we tell you which ones and how to send them securely.',
  },
  {
    question: 'What if I do not get a refund?',
    answer: 'We start with a Tax Assessment that reviews your full situation and shows you your estimated outcome, so you know exactly where you stand before deciding whether to go ahead and lodge. Not every working holiday year produces a refund, and where yours looks unlikely we would rather say so early than take the work on and hope.',
  },
  {
    question: 'Can you help me from the UK, Germany or Japan?',
    answer: 'Yes, and those are the three places most of our clients message us from once they are home. An Australian tax return, a superannuation claim and anything still open with the ATO can all be handled from another country, entirely online.',
  },
]

const contactPageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: 'Contact Working Holiday Tax',
  description: 'Message us on WhatsApp and a real person replies, usually within about an hour during business hours.',
  inLanguage: 'en-AU',
  isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.contact-lead'] },
  mainEntity: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    email: EMAIL,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: `+${WA_NUMBER}`,
        email: EMAIL,
        areaServed: 'AU',
        availableLanguage: ['en', 'de', 'ja'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      },
    ],
  },
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
  ],
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'en-AU',
  mainEntity: [...blockers.map(b => ({ question: b.q, answer: b.a })), ...FAQS.map(f => ({ question: f.question, answer: f.answer }))]
    .map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
}

const answerStyle = { fontSize: '15px', lineHeight: 1.7, color: '#2A3C34', fontWeight: 300 } as const

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── HERO: the message is the whole job of this page ──────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-5 pb-9 lg:pt-12 lg:pb-12">

          <nav aria-label="Breadcrumb" className="mb-5 lg:mb-6">
            <ol className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459' }}>
              <li><Link href="/" className="contact-breadcrumb-link">Home</Link></li>
              <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
              <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Contact</li>
            </ol>
          </nav>

          <div className="max-w-[560px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-3 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                Get in touch
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(28px,5vw,44px)', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              Message us on WhatsApp
            </h1>

            <p className="contact-lead mx-auto"
              style={{ fontSize: 'clamp(16px,1.4vw,17px)', lineHeight: 1.6, color: '#2A3C34', maxWidth: '44ch', marginBottom: '22px' }}>
              A real person reads it and replies, usually within about an hour during business hours.
            </p>

            <WaLink href={WA} position="hero" topic="contact" lang="en"
              className="btn-primary w-full sm:w-auto inline-flex justify-center"
              style={{ minHeight: '56px', padding: '0 34px', fontSize: '16px', borderRadius: '100px', minWidth: '270px' }}>
              Open WhatsApp →
            </WaLink>

            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              Monday to Friday, 9am to 6pm
            </p>
          </div>
        </div>
      </section>

      {/* ── THE FOUR THINGS THAT STOP PEOPLE MESSAGING ──────────────────── */}
      <section className="py-11 lg:py-16" style={{ background: '#F5F9F7', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            {/* JO: the "is this legitimate" answer only works if the WhatsApp profile
                agrees with it. The customer transcripts flag that the WhatsApp Business
                name is spelled "hoiday", and that people were asking in a backpacker
                group whether the account is real. Fixing the profile name is worth more
                than anything this page can say. */}
            <span className="section-label">Before you ask</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 20px' }}>
              The four things people check first
            </h2>

            <div className="flex flex-col" style={{ gap: '12px' }}>
              {blockers.map((b, i) => (
                <div key={i} className="rounded-2xl" style={{ padding: '18px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
                  <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', lineHeight: 1.35, letterSpacing: '-0.015em', marginBottom: '8px' }}>
                    {b.q}
                  </h3>
                  {/* One <p> per paragraph. Past about 55 words a single block
                      is a wall on a phone, and these are the answers people read
                      before they decide to message. */}
                  {b.a.split('\n\n').map((para, j, all) => (
                    <p key={j} style={{ ...answerStyle, marginBottom: j === all.length - 1 ? 0 : '10px' }}>{para}</p>
                  ))}
                  {b.link && (
                    <Link href={b.link.href}
                      style={{ display: 'inline-flex', alignItems: 'center', minHeight: '44px', fontSize: '14.5px', fontWeight: 500, color: '#0B5240', textDecoration: 'underline' }}>
                      {b.link.label} →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OTHER WAYS, DELIBERATELY SECONDARY ──────────────────────────── */}
      <section className="py-11 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[560px] mx-auto">
            <span className="section-label">Other ways</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 16px' }}>
              If WhatsApp does not suit you
            </h2>
            <p style={{ ...answerStyle, marginBottom: '20px' }}>
              Email works and so do the social accounts, they are just slower.
            </p>

            <address style={{ fontStyle: 'normal' }}>
              <a href={`mailto:${EMAIL}?subject=Tax%20question%20from%20website`} className="contact-option-card">
                <div className="contact-option-icon" style={{ background: '#fff', border: '1px solid #E2EFE9' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="#0B5240" strokeWidth="1.8" />
                    <path d="M2.5 6.5L12 13.5l9.5-7" stroke="#0B5240" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="flex-1" style={{ minWidth: 0 }}>
                  <p className="contact-option-label">Email</p>
                  <p className="contact-option-detail" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{EMAIL}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="contact-option-arrow">
                  <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              <div className="grid grid-cols-2 gap-3" style={{ marginTop: '12px' }}>
                <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className="contact-option-card-small">
                  <div className="contact-option-icon-small" style={{ background: 'linear-gradient(45deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)', border: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </div>
                  <span className="contact-option-label-small">Instagram</span>
                </a>
                <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className="contact-option-card-small">
                  <div className="contact-option-icon-small" style={{ background: '#010101', border: 'none' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z" fill="white" />
                    </svg>
                  </div>
                  <span className="contact-option-label-small">TikTok</span>
                </a>
              </div>
            </address>

            <div className="contact-hours-block">
              <p className="contact-hours-title">
                <span className="w-1.5 h-1.5 rounded-full inline-block mr-1.5" style={{ background: '#2FA880' }} aria-hidden="true" />
                Business hours
              </p>
              <p className="contact-hours-detail" style={{ fontSize: '14px', color: '#4C6459' }}>
                Monday to Friday, 9am to 6pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F9F7', paddingTop: '48px', paddingBottom: '48px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-7">
            <span className="section-label center">Common questions</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Everything else people ask
            </h2>
          </div>

          <div className="flex flex-col" style={{ gap: '6px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="contact-faq" className="contact-faq-item" style={{ background: '#fff' }}>
                <summary className="contact-faq-summary" style={{ minHeight: '44px' }}>
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                {/* Same split as the home page FAQ. faqLd above still uses the
                    raw f.answer string, so the structured data is unchanged. */}
                {f.answer.split('\n\n').map((para, j) => (
                  <p key={j} className="contact-faq-answer" style={{ fontSize: '15px' }}>{para}</p>
                ))}
              </details>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240', paddingTop: '48px', paddingBottom: '56px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[520px] mx-auto text-center">
            <p className="font-medium uppercase" style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', marginBottom: '12px' }}>
              Whenever you are ready
            </p>
            <h2 className="font-serif font-black text-white" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '12px' }}>
              Send the question. That is the whole first step.
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '24px', fontWeight: 300 }}>
              Where you worked, roughly when, and whether you have left Australia. That is enough for us to tell you what is worth chasing.
            </p>
            <WaLink href={WA} position="footer" topic="contact" lang="en"
              className="btn-primary w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', minWidth: '260px' }}>
              Message us on WhatsApp →
            </WaLink>
          </div>
        </div>
      </section>

      <MobileCta href={WA} lang="en" topic="contact" />
    </>
  )
}

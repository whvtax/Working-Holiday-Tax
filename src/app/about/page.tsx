import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { WA_URL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us - Who We Are | Working Holiday Tax',
  description: 'We work with one kind of client only: working holiday makers on 417 and 462 visas. Tax returns, TFN, super (DASP) and ABN - fast answers, fully online, in your language. Who we are and how we work.',
  keywords: [
    'working holiday tax specialists',
    'backpacker tax help Australia',
    'who is working holiday tax',
    'is working holiday tax legit',
    'working holiday tax reviews',
    'backpacker tax experts 417 462',
    'working holiday visa tax help',
    'tax help for backpackers Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
    languages: {
      'en-AU': `${SITE_URL}/about`,
      'de': `${SITE_URL}/de/about`,
      'ja': `${SITE_URL}/ja/about`,
      'x-default': `${SITE_URL}/about`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    title: 'About Working Holiday Tax - Who We Are',
    description: 'One kind of client only: working holiday makers. We understand the backpacker year - multiple employers, hostel addresses, leaving mid-year - and we answer fast.',
    url: `${SITE_URL}/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'en_AU',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'About Working Holiday Tax - Who We Are',
    description: 'One kind of client only: working holiday makers. Fast answers, fully online, in your language.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'What makes you different from a normal accountant?',
    answer: 'A general accountant sees a working holiday maker a few times a year. We see nothing else. The 417/462 rate schedule, DASP super claims after departure, Medicare levy exemptions that depend on your passport, four employers across three states in one year - this is our everyday work, not an unusual case someone has to look up. That focus is what makes us fast and precise.',
  },
  {
    question: 'How fast do you actually respond?',
    answer: 'Message us on WhatsApp and a real person answers - usually within the hour during business hours. No call centres, no ticket queues, no "please allow 5-7 business days". If something needs checking, we tell you that too, straight away.',
  },
  {
    question: 'Do you understand what a backpacker year actually looks like?',
    answer: 'Yes - because it is the only thing we deal with. Hostel mailing addresses, farm payslips that look wrong, cash weeks you are not sure how to declare, a job you left without a final payslip, leaving Australia in the middle of the tax year. Whatever version of the working holiday year you had, we have almost certainly handled it before.',
  },
  {
    question: 'Do you only work with people still in Australia?',
    answer: 'No. A large share of what we do - superannuation (DASP) claims and prior-year tax returns in particular - happens after someone has already left Australia and returned home. Everything is handled remotely: documents by upload, identity and signatures electronically, and refunds paid to an Australian or overseas bank account.',
  },
  {
    question: 'What languages do you work in?',
    answer: "The site runs in English, German and Japanese, but support is not limited to those - write to us in whatever language you are comfortable in and we will work with you in it. Explaining Australian tax to someone meeting it for the first time is most of our job, in any language.",
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: 'About Working Holiday Tax',
  inLanguage: 'en-AU',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
}

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
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">About</span>
          </nav>

          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 lg:items-center">
            <div className="max-w-[560px] lg:max-w-[700px]">
              <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
                <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                  About Us
                </span>
              </div>

              <h1 className="font-serif font-black text-ink"
                style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '10px' }}>
                Built for backpackers, by people who do nothing else.
              </h1>

              <p className="about-lead font-semibold text-ink"
                style={{ fontSize: 'clamp(14px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.4 }}>
                Working Holiday Tax works with one kind of client only: people on a 417 or 462 working holiday visa. Tax returns, TFN, ABN, super and Medicare - that is the whole job, and it is why we are fast and precise at it.
              </p>

              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.58)', maxWidth: '46ch' }}>
                Message us on WhatsApp and a real person answers - usually within the hour during business hours. In Australia, or after you have already flown home.
              </p>

              <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4" style={{ marginTop: '24px', marginBottom: '20px', maxWidth: '480px' }}>
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex justify-center"
                  style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                  Ask us anything →
                </a>
                <Link href="/contact" className="inline-flex btn-ghost-dark justify-center"
                  style={{ height: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                  Contact us →
                </Link>
              </div>
            </div>

            <div className="max-w-[280px] mx-auto w-full lg:max-w-none">
              <div className="rounded-3xl overflow-hidden" style={{ aspectRatio: '532/745', border: '1.5px solid #E2EFE9', boxShadow: '0 20px 40px -20px rgba(11,82,64,0.25)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/about/team-office.jpg" alt="Young professionals working together" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS STRIP ───────────────────────────────────────────── */}
      <section className="bg-white" style={{ borderTop: '1px solid #E2EFE9', borderBottom: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 py-5 lg:py-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { stat: <GoogleRating variant="number" lang="en" />, label: 'Google rating' },
              { stat: <GoogleRating variant="count" lang="en" />, label: ' ' },
              { stat: '2020', label: 'Operating since' },
              { stat: 'Any', label: 'Language - support in yours' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="font-serif" style={{ fontSize: 'clamp(20px, 3.4vw, 26px)', fontWeight: 800, color: '#0B5240', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '4px' }}>
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

      {/* ── WE UNDERSTAND BACKPACKERS ─────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[720px] mx-auto">
            <span className="section-label">Why it works</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,32px)', lineHeight: 1.12, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              We understand the backpacker year
            </h2>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              A working holiday year does not look like a normal tax year, and we never pretend it does. Four employers across three states. A farm payslip that looks wrong. A hostel as your mailing address. A job you left without ever getting a final payslip. Leaving the country in the middle of the financial year. These are not edge cases to us - they are Tuesday.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Because we only do 417 and 462 work, nothing about your situation needs explaining twice. We know which farm employers withhold at the wrong rate, which super funds ask for certified copies, what the Medicare levy exemption is worth for your passport, and what changes when you lodge from overseas. You send your details once; we know what to do with them.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              And we move at backpacker speed. Everything is online, WhatsApp is the front door, and real people answer fast - usually within the hour during business hours. No office visits, no phone menus, no waiting a week for a reply while your flight home gets closer.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY ONE VISA CATEGORY ────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Our focus</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Why we only work with working holiday makers
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-5xl mx-auto">
            {[
              { t: 'One tax rate schedule', d: 'The 417/462 working holiday maker rate schedule (15% from the first dollar up to $45,000) is not the same as the resident rate schedule most general tax software assumes.' },
              { t: 'DASP after departure', d: 'Superannuation is claimed back through a specific process (DASP) only available once you have left Australia and your visa has lapsed - most general accountants rarely handle it.' },
              { t: 'Nationality-dependent Medicare', d: 'Whether the Medicare Levy exemption applies depends on your passport and Australia’s Reciprocal Health Care Agreements - a detail easy to get wrong from a generic checklist.' },
              { t: 'Seasonal, multi-employer income', d: 'Farm work, hospitality and delivery income spread across states and employers within one year needs a return that reconciles all of it correctly.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FBF9', border: '1.5px solid #E2EFE9' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px' }}>{c.t}</p>
                <p className="font-light" style={{ fontSize: '12.5px', color: 'rgba(10,15,13,0.6)', lineHeight: 1.7 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 reveal">
            <span className="section-label center">In their own words</span>
            <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              What working holiday makers say
            </h2>
          </div>
          <GoogleReviews lang="en" />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
            <div className="text-center">
              <span className="section-label center">FAQs</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                Questions about who we are
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                Anything else? Message us directly.
              </p>
            </div>
            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="Ready when you are"
        heading="See what you could be owed"
        body="Try the free calculator, or message us directly and we will tell you what applies to your situation."
        cta="Try the calculator →"
        href="/calculator"
      />

      <MobileCta href={WA_URL} lang="en" />
    </>
  )
}

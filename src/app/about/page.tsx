import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { ReviewsGate } from '@/components/ui/ReviewsGate'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { WaLink } from '@/app/HomeWa'
import { waUrl } from '@/lib/wa'
import { SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About us: we only do 417 and 462 tax',
  description: 'Working holiday tax is the only thing we do. Every client is on a 417 or a 462 visa. Here is the year we see, from the first payslip to the flight home.',
  keywords: [
    'working holiday tax specialists',
    'backpacker tax help Australia',
    'who is working holiday tax',
    'is working holiday tax legit',
    'working holiday tax reviews',
    '417 462 tax specialists',
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
    title: 'About Working Holiday Tax',
    description: 'One kind of client only: working holiday makers on 417 and 462 visas. The year we see, from the first payslip to the flight home.',
    url: `${SITE_URL}/about`,
    type: 'website',
    siteName: 'Working Holiday Tax',
    locale: 'en_AU',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'About Working Holiday Tax',
    description: 'Working holiday tax is the only thing we do. Every client is on a 417 or a 462.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WA = waUrl({ topic: 'general', lang: 'en' })

/**
 * The story is deliberately the reader's year, not a company history.
 *
 * Everything on this page has to be literally true, and the only year we can
 * describe truthfully in detail is the one the visitor lived. An invented
 * founder narrative would read better for about four seconds and then be a lie
 * on the page a customer trusts most. Where a real fact would carry more weight
 * than the narrative, there is a JO marker asking for it rather than a guess.
 */
const chapters = [
  {
    stage: 'Week one',
    title: 'You arrived with a plan that covered about a fortnight',
    body: 'A hostel, a SIM, a bank account and a job as soon as possible. A tax file number was somewhere on that list, so you applied for it and then got on with the rest, which is what everybody does. Nothing about the Australian tax year was explained to you at any point, and there was no reason it would be.',
  },
  {
    stage: 'Your first payslips',
    title: 'The first job started before the number came through',
    body: 'Without a tax file number on file, an employer is required to withhold at the top rate rather than the fifteen percent a working holiday maker normally pays, so those first weeks are missing close to half. Nobody at that job explained it, because explaining it was not their job. That money does not come back by itself at the end of the year. Somebody has to claim it.',
  },
  {
    stage: 'By Christmas',
    title: 'Four employers, half of them casual, none of them explaining anything',
    body: 'A hostel job, a cafe, a warehouse for three weeks, something you left without ever getting a final payslip. The Australian tax year ends in June rather than December, which nobody mentioned either. You have quietly assumed that losing those payslips matters. It does not: everything your employers reported is visible to us through the ATO, so we start from the record rather than from your inbox.',
  },
  {
    stage: 'The 88 days',
    title: 'If you did them, you drove a long way to do them',
    body: 'Somewhere west, or north, or three hours past a town you had never heard of. Accommodation came out of your wages before you ever saw them, the pay slips looked different from the city ones, and the whole stretch is the part of the year people are least confident about. It is also the part that most often needs a proper look rather than a box ticked.',
  },
  {
    stage: 'The flight home',
    title: 'You left, and the money stayed',
    body: 'Superannuation can only be claimed once you have left Australia and the visa has lapsed, so yours is still sitting with a fund you may not remember choosing. The over withheld tax from those first weeks is still sitting with the ATO. Neither of them is mentioned at the airport, in the exit lane, or by anyone you worked for.',
  },
]

const faqs = [
  {
    question: 'Who do you actually work with?',
    answer: 'Working holiday makers, and nobody else. Every client we have is in Australia on a 417 or a 462 visa, or was on one and has since gone home. We do not take on Australian residents, students, sponsored workers or businesses, so the working holiday year is not a case we occasionally see. It is the only case we see.',
  },
  {
    question: 'Can you help me if I have already left Australia?',
    answer: 'Yes, and a large share of our work is exactly that. Superannuation can only be claimed after you have left and your visa has lapsed, and a tax return for a year you have already finished can be lodged from anywhere. Everything is handled remotely. One thing to know early: the ATO can only pay a tax refund into an Australian bank account, while your super can be paid overseas. If you have already closed your Australian account, tell us in the first message.',
  },
  {
    question: 'Do I need my payslips?',
    answer: 'No. What your employers withheld and reported is visible to us through the ATO, so we work from that record rather than asking you to find paperwork from a job you left eight months ago. If something you tell us does not match what an employer reported, we deal with the difference, which is one of the reasons the record is where we start.',
  },
  {
    question: 'Do I need a myGov account?',
    answer: 'No. You will never have to log into myGov, link an Australian ID or work out which form is which. We deal with the ATO directly. If you have already tried and got stuck at the identity check, which is where most people get stuck, that changes nothing about whether we can help you.',
  },
  {
    question: 'What language will you get a reply in?',
    answer: 'The one you write to us in. Write in English, German, Japanese or whatever you are most comfortable explaining your situation in, and that is what comes back. Most of this job is explaining Australian tax to somebody meeting it for the first time, and that is hard enough in a first language.',
  },
  {
    question: 'What happens if there is no refund at the end of it?',
    answer: 'If your refund is less than our fee, we refund the difference, so you are never out of pocket. Not every working holiday year produces one, and we would rather tell you that early than take the work on and hope. Ask before you commit to anything: the questions are free and a real person answers them.',
  },
]

const aboutPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: 'About Working Holiday Tax',
  description: 'Working holiday tax is the only thing we do. Every client is on a 417 or a 462 visa.',
  inLanguage: 'en-AU',
  mainEntity: { '@id': `${SITE_URL}/#business` },
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.about-lead'] },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  inLanguage: 'en-AU',
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

const bodyStyle = { fontSize: 'clamp(15px,1.2vw,16px)', lineHeight: 1.7, color: '#2A3C34', fontWeight: 300 } as const

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-9 lg:pt-14 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/" className="transition-colors hover:text-forest-500" style={{ padding: '4px 0' }}>Home</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page" style={{ color: '#0B5240' }}>About</span>
          </nav>

          <div className="max-w-[680px]">
            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                About us
              </span>
            </div>

            {/* JO: this whole page is written as the reader's year because it is the
                only story we can tell that is true in every line. If you want a real
                origin here instead, send me two or three sentences on how the business
                actually started and I will open the page with it. */}
            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(28px,3.4vw,44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px' }}>
              You landed with a plan.<br />Nobody mentioned the tax.
            </h1>

            <p className="about-lead text-ink"
              style={{ fontSize: 'clamp(16.5px,1.5vw,18px)', fontWeight: 500, lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
              Working holiday tax is the only thing we do. If you recognise the year below, there is probably
              money still sitting in Australia with your name on it.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row" style={{ marginTop: '26px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="general" lang="en"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 30px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                Ask us anything →
              </WaLink>
              <Link href="/contact" className="inline-flex btn-ghost-dark justify-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                Other ways to reach us →
              </Link>
            </div>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              A real person replies, usually within about an hour during business hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE YEAR ──────────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-16" style={{ background: '#F5F9F7', borderTop: '1px solid #E2EFE9' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">

            <span className="section-label">The year</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(23px,2.6vw,32px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 16px' }}>
              What does a working holiday year look like to us?
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '30px' }}>
              It looks like this, with the names and the towns changed. Five things happen to almost everybody on a 417 or a 462, in roughly this order, and four of them cost money that can usually be recovered afterwards.
            </p>

            <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {chapters.map((c, i) => (
                <li key={i} style={{
                  position: 'relative',
                  paddingLeft: '20px',
                  paddingBottom: i === chapters.length - 1 ? 0 : '28px',
                  borderLeft: i === chapters.length - 1 ? 'none' : '1.5px solid #CDE3DB',
                  marginLeft: '4px',
                }}>
                  <span aria-hidden="true" style={{
                    position: 'absolute', left: '-6px', top: '5px', width: '10px', height: '10px',
                    borderRadius: '999px', background: '#16775C', border: '2px solid #F5F9F7',
                  }} />
                  <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.14em', color: '#16775C', marginBottom: '6px' }}>
                    {c.stage}
                  </p>
                  <h3 className="font-serif font-bold text-ink" style={{ fontSize: 'clamp(17px,1.7vw,20px)', lineHeight: 1.3, letterSpacing: '-0.015em', marginBottom: '8px' }}>
                    {c.title}
                  </h3>
                  <p style={bodyStyle}>{c.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── WHY WE EXIST ──────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <span className="section-label">Why we exist</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(23px,2.6vw,32px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 16px' }}>
              Why do we only work with working holiday makers?
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>
              Because it is the only year we work on. Every client we have is on a 417 or a 462, which means the things that decide your refund are not unusual cases we have to go and read about. They are what we do all day.
            </p>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>
              A general accountant meets a backpacker a few times a year, in July, between two hundred ordinary returns. The 417 and 462 rate schedule, the residency position that turns on far more than a day count, the Medicare levy exemption that depends on which passport you hold, a superannuation claim filed from a bedroom in Manchester or Munich or Osaka eleven months after you left: for us that is a Tuesday.
            </p>
            <p style={bodyStyle}>
              Anyone can press submit. The work happens before that: going through your year, working out what is true about it rather than what is quickest to tick, and then lodging it.
            </p>

            {/* JO: the honest answer to "why only backpackers" is the one thing on this
                page I cannot write for you. Two or three sentences on why you narrowed
                the business to 417 and 462, in your own words, would sit exactly here
                and would be the strongest paragraph on the page. */}

            {/* JO: the old version of this page carried a "2020, operating since" stat
                and a stock photo captioned as our team. I have removed both rather than
                assert something I cannot verify. Confirm the year the business started
                and send a real photo of you or the team and I will put them back. */}

            <div className="rounded-2xl" style={{ marginTop: '28px', padding: '20px', background: '#F2FAF7', border: '1.5px solid #C8EAE0' }}>
              <p className="font-serif font-bold text-ink" style={{ fontSize: '17px', lineHeight: 1.35, marginBottom: '8px' }}>
                If your refund is less than our fee, we refund the difference, so you are never out of pocket.
              </p>
              <p style={{ ...bodyStyle, fontSize: '15px' }}>
                Not every working holiday year produces a refund, and we will tell you if yours is unlikely to. Ask first. Questions cost nothing and a real person answers them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW YOU REACH US ──────────────────────────────────────────────── */}
      <section className="py-11 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <span className="section-label">Talking to us</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(23px,2.6vw,32px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 16px' }}>
              How do you get hold of us?
            </h2>
            <p style={{ ...bodyStyle, marginBottom: '14px' }}>
              WhatsApp. Not a bot, not a ticket number, not a form that promises five to seven business days. You can ask a single question and leave it there; nothing about messaging us commits you to anything.
            </p>
            <p style={{ ...bodyStyle, marginBottom: '22px' }}>
              Write in whatever language you would rather explain this in, and that is the language the answer comes back in. You do not need a myGov account, an Australian ID or your payslips to start the conversation, and it makes no difference whether you are still in Australia or have been home for two years.
            </p>

            <WaLink href={WA} position="section" topic="general" lang="en"
              className="btn-primary inline-flex justify-center w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', minWidth: '260px' }}>
              Message us on WhatsApp →
            </WaLink>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────────── */}
      {/* Hidden entirely when the reviews feed is empty, so the heading
          never stands alone over blank space. */}
      <ReviewsGate>
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="max-w-xl mx-auto text-center mb-8">
              <span className="section-label center">In their own words</span>
              <h2 className="font-serif font-black text-ink mt-2" style={{ fontSize: 'clamp(20px,2.04vw,26px)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
                What working holiday makers say
              </h2>
            </div>
            <GoogleReviews lang="en" />
          </div>
        </section>
      </ReviewsGate>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-start">
            <div>
              <span className="section-label">FAQs</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(20px,2.04vw,26px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '10px' }}>
                Questions people ask before they message
              </h2>
              <p style={{ ...bodyStyle, marginBottom: '22px' }}>
                Anything else, ask it on WhatsApp. It is quicker than reading.
              </p>
            </div>
            <div className="max-w-[700px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240', paddingTop: '48px', paddingBottom: '56px' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[540px] mx-auto text-center">
            <p className="font-medium uppercase" style={{ fontSize: '10.5px', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.15em', marginBottom: '12px' }}>
              Whenever you are ready
            </p>
            <h2 className="font-serif font-black text-white" style={{ fontSize: 'clamp(22px,2.8vw,32px)', lineHeight: 1.15, letterSpacing: '-0.025em', marginBottom: '12px' }}>
              Tell us about your year
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '24px', fontWeight: 300 }}>
              Where you worked, roughly when, and whether you have left. That is enough for us to tell you what is worth chasing.
            </p>
            <WaLink href={WA} position="footer" topic="general" lang="en"
              className="btn-primary w-full sm:w-auto"
              style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', minWidth: '260px' }}>
              Message us on WhatsApp →
            </WaLink>
          </div>
        </div>
      </section>

      <MobileCta href={WA} lang="en" topic="general" variant="neutral" />
    </>
  )
}

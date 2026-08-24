import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/HomeWa'

// ─── METADATA ───────────────────────────────────────────────────────────
// The head terms stay, because they rank. What changes is what the page
// claims: this page owns the cost of the gap between starting work and the
// TFN reaching the employer. No price in the title, the description or the
// schema, and no first person claim to being a registered tax agent.
export const metadata: Metadata = {
  // The root layout appends " | Working Holiday Tax", so the base title is kept
  // short enough that the whole thing still fits a mobile SERP.
  title: 'Working Holiday TFN: Avoid 45% Tax',
  description:
    'The TFN itself is free. What costs money is every payslip that lands before your employer has it, withheld at 45% instead of 15%.',
  keywords: [
    'TFN application Australia',
    'TFN application working holiday',
    'working holiday TFN',
    'Tax File Number Australia working holiday',
    'Tax File Number 417 visa',
    'Tax File Number 462 visa',
    'apply for TFN backpacker',
    'get TFN Australia',
    'how to apply for TFN Australia',
    'TFN for WHV',
    'TFN for working holiday tax refund',
    'TFN Australia processing time',
    'no TFN 45 percent tax Australia',
    'TFN 28 day rule Australia',
    'TFN application rejected working holiday',
    'register for TFN Australia backpacker',
  ],
  alternates: {
    canonical: '/tfn',
    languages: {
      'en-AU': '/tfn',
      de: '/de/tfn',
      ja: '/ja/tfn',
      'x-default': '/tfn',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'TFN application for working holiday makers in Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/tfn`,
    siteName: 'Working Holiday Tax',
    title: 'TFN for a Working Holiday Visa: Avoid the 45% Weeks',
    description:
      'The number is free. The weeks without it are not. We prepare and lodge the TFN application so it goes through first time, on a 417 or 462 visa.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'TFN for a Working Holiday Visa: Avoid the 45% Weeks',
    description: 'The number is free. The weeks before your employer has it are not.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconWhatsApp = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" />
  </svg>
)

// ─── COPY ───────────────────────────────────────────────────────────────

/** The three places a working holiday TFN application actually fails. */
const FAILURE_POINTS = [
  {
    n: '01',
    title: 'The name on the form is not the name immigration holds',
    body: 'The ATO matches your application against the record the Department of Home Affairs holds for your visa. A middle name you left out, a maiden name, a passport renewed since the visa was granted, a name written in a different order: any of those can send the application into manual checking or straight back to you. On a form you fill in once and then wait a month on, it is a slow way to find out.',
  },
  {
    n: '02',
    title: 'The address will not be holding your post in four weeks',
    body: 'Your TFN arrives as a letter, posted to an Australian address, and the ATO can take up to 28 days to issue it. Backpackers move. A hostel bed you had for six nights, a share house you left, a farm you have already finished at: the letter goes there and nobody forwards it. Choosing an address that will still work in a month is a real decision, not a form field.',
  },
  {
    n: '03',
    title: 'It was lodged before the visa was active',
    body: 'You apply for a TFN once you are in Australia on an activated working holiday visa, not before you fly. Applications lodged too early are the ones that quietly go nowhere, and the person who lodged it usually finds out weeks later, after they have already started a job and pay is coming through at the top rate.',
  },
]

/** What the service does about the gap. Nothing here is a promise about timing. */
const WHAT_WE_DO = [
  {
    title: 'We check your visa is active first',
    body: 'A one minute question that stops the most common wasted month.',
  },
  {
    title: 'We match your details to your immigration record',
    body: 'Passport, name order, date of birth and visa grant, checked against each other before anything is lodged.',
  },
  {
    title: 'We work out the address problem with you',
    body: 'Where you will actually be in four weeks, and what to do if the answer is a farm or a van.',
  },
  {
    title: 'We chase it if it stalls',
    body: 'The ATO has 28 days. Past that, someone has to ring them, and it is not going to be you from a hostel in Cairns.',
  },
  {
    title: 'We tell your employer what to do in the meantime',
    body: 'A TFN application reference number, quoted correctly, is what keeps the first pay runs off the top rate while you wait.',
  },
  {
    title: 'We claim the gap back at the end of the year',
    body: 'Anything already withheld at 45% only comes back through a tax return, and only if the return says so.',
  },
]

const FAQS = [
  {
    question: 'Can I not just do this myself on myGov?',
    answer:
      'You can, and applying for a tax file number really is a short form. What the form does not do is tell you anything about the money around it. It does not mention that you have 28 days from starting a job to give your employer the number, that every pay run before then is withheld at 45% instead of the 15% working holiday maker rate, or that the excess only comes back through a tax return that has been lodged and reconciled against every employer you had. It also does not check your name and postal address against the record immigration holds, which is what sends applications into manual review or straight back to you. That is the work, and lodging is the easy part of it. You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.',
  },
  {
    question: 'The TFN application is free on the ATO website. What am I paying for?',
    answer:
      'The number itself is free and we will always say so plainly. What we charge for is getting the application through first time and dealing with what happens if it does not. That means matching your passport and name exactly to the record immigration holds, choosing an address that will still be receiving your post in four weeks, quoting the application reference number to your employer so the first pay runs are not withheld at the top rate, and chasing the ATO if nothing has arrived after 28 days. If you would rather do all of that yourself, our guides walk through it in full and hold nothing back.',
  },
  {
    question: 'What actually happens if I start work without a TFN?',
    answer:
      'Your employer is required to withhold tax at the top rate of 45% instead of the 15% working holiday maker rate until you give them a tax file number, and you have 28 days from starting the job to do that. On a $25 an hour job that is roughly $7.50 an hour going to the ATO rather than to you, for every hour worked in that window. The money is not lost, but it does not come back automatically either: it only returns through a tax return that is lodged, and lodged correctly, after the financial year ends.',
  },
  {
    question: 'I have already been working for weeks without a TFN. Is it too late?',
    answer:
      'No. There is no deadline that closes on you here. Apply now so the top rate stops applying to future pay, and the excess already withheld comes back when your tax return is lodged for that financial year. We can usually have an application ready to lodge the same day you message us, and if you have already worked several weeks at 45% that is worth telling us about, because it changes what your return needs to say.',
  },
  {
    question: 'How long does a TFN take to arrive?',
    answer:
      'The ATO states it processes TFN applications within 28 days, and in practice most working holiday makers have theirs inside two to four weeks. It arrives as a letter posted to the Australian address on the application, which is why that address matters more than people expect. You can keep working during the wait by giving your employer the application reference number, which is what stops the 28 day clock running out on you.',
  },
  {
    question: 'Can I apply for a TFN before I arrive in Australia?',
    answer:
      'Not on a working holiday visa. You apply once you are in Australia with your 417 or 462 visa activated, because the application is matched against your arrival and visa record. You also need an Australian postal address for the letter, which is a problem worth solving before you land rather than after. Applications lodged before arrival are the ones that most often disappear without anyone being told why.',
  },
  {
    question: 'Do I need a new TFN for a second year visa?',
    answer:
      'No. A tax file number is issued to you once and stays with you for life, including across a second or third working holiday visa, a change of visa class, and any gap where you left Australia entirely. If you have lost the number rather than never had one, that is a different and much faster problem to fix, so tell us which of the two it is.',
  },
]

const GUIDES = [
  {
    href: '/blog/what-happens-without-your-tfn',
    title: 'What happens if you work without a TFN',
    desc: 'The 45% withholding, the 28 day window, and how the money comes back.',
  },
  {
    href: '/blog/tfn-reference-number-before-tfn-arrives',
    title: 'The application reference number',
    desc: 'What to give your employer while you are still waiting on the letter.',
  },
  {
    href: '/blog/how-long-does-it-take-to-get-a-tfn',
    title: 'How long a TFN takes',
    desc: 'What the ATO commits to, what usually happens, and when to chase it.',
  },
]

/**
 * The objection every lead arrives holding: "I can just do this myself."
 *
 * It is answered on the homepage in general terms. Here it has to be answered
 * about a TFN specifically, or it reads as filler and duplicates the homepage
 * for no benefit. Every row below is about the application and the weeks around
 * it. Nothing here says myGov is bad, because it is not. It does a different job.
 */
const MYGOV = [
  {
    mygov: 'The form takes the name and the postal address you type in.',
    us: 'We check both first: the name against the record immigration holds, the address against where your post will actually be in four weeks.',
  },
  {
    mygov: 'Nothing on the screen mentions the 28 days you have from starting a job to give your employer the number.',
    us: 'We give you the application reference number to hand over, which is what keeps the first pay runs off the top rate.',
  },
  {
    mygov: 'Nothing tells you the weeks before your employer had the number were withheld at 45% instead of 15%.',
    us: 'We work out what that gap is worth and claim it back through the return, because it does not come back on its own.',
  },
  {
    mygov: 'If the application stalls, there is no screen that tells you so.',
    us: 'Past 28 days somebody has to ring the ATO, and it is not going to be you from a hostel in Cairns.',
  },
]

const WA_TFN = waUrl({ topic: 'tfn', lang: 'en' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties = { fontSize: '15px', lineHeight: 1.58 }
const LEDE: CSSProperties = { fontSize: '16.5px', lineHeight: 1.62 }

export default function TFNPage() {
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/tfn#webpage`,
    url: `${SITE_URL}/tfn`,
    name: 'TFN for a Working Holiday Visa',
    description:
      'What it costs to work before your tax file number reaches your employer, why working holiday TFN applications fail, and how the excess withheld comes back.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-lede'] },
  }

  const serviceLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/tfn#service`,
    name: 'TFN Application for Working Holiday Makers',
    serviceType: 'Tax File Number application',
    description:
      'Tax file number applications prepared and lodged for holders of 417 and 462 working holiday visas, including the reference number for the employer and follow up with the ATO.',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'Country', name: 'Australia' },
    audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (Subclass 417 and 462)' },
    availableLanguage: ['en', 'de', 'ja'],
    inLanguage: 'en-AU',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en-AU',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'TFN Application', item: `${SITE_URL}/tfn` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 pt-8 pb-11 lg:pt-12 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2" style={{ fontSize: '13px', color: '#4C6459', marginBottom: '10px' }}>
            <Link href="/" className="inline-flex items-center transition-colors hover:text-forest-500" style={{ minHeight: '44px' }}>Home</Link>
            <span aria-hidden="true" style={{ color: '#CDE3DB' }}>/</span>
            <span aria-current="page">TFN</span>
          </nav>

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '14px' }}>
            Working holiday visas 417 &amp; 462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(31px, 5.2vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>The number is free.{' '}</span>
            <span style={{ display: 'block', color: '#0B5240' }}>The weeks without it are not.{' '}</span>
          </h1>

          <p className="hero-lede hero-animate-delay" style={{ ...LEDE, color: '#4C6459', maxWidth: '50ch', marginBottom: '26px' }}>
            Until your employer has the number, 45% of your pay is withheld instead of 15%. On a $25 job that is about
            $7.50 an hour, every hour, for as long as the gap runs.
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TFN} position="hero" topic="tfn" lang="en"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '54px', padding: '0 32px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
              <IconWhatsApp />
              Message us on WhatsApp
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              Replies in about an hour. Ask anything first.
            </p>
          </div>

          <div className="flex" style={{ marginTop: '20px' }}>
            <GoogleRating variant="pill" lang="en" />
          </div>
        </div>
      </section>

      {/* ── 1b. MYGOV, ABOUT THE TFN SPECIFICALLY ────────────────────────── */}
      <section className="py-11 lg:py-14 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>The easy part</p>

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '20ch', marginBottom: '14px' }}>
            <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>Nowhere in the application{' '}</span>
            <span style={{ display: 'block' }}>does anyone mention the weeks at 45%.{' '}</span>
          </h2>

          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '22px' }}>
            The form is short and myGov will take it. What that form leaves out is the money, on all four counts below.
          </p>

          <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
            {MYGOV.map((row, i) => (
              <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                  <p style={{ ...KICKER, color: '#4C6459', marginBottom: '5px' }}>On myGov</p>
                  <p style={{ ...BODY, color: '#2A3C34', overflowWrap: 'break-word' }}>{row.mygov}</p>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                  style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                  <p style={{ ...KICKER, color: '#0B5240', marginBottom: '5px' }}>With us</p>
                  <p style={{ ...BODY, color: '#080F0D', fontWeight: 500, overflowWrap: 'break-word' }}>{row.us}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '46ch', fontWeight: 700 }}>
            You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.
          </p>
        </div>
      </section>

      {/* ── 2. WHAT THE GAP COSTS ────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '22ch', marginBottom: '14px' }}>
            What does it cost to start work before your TFN arrives?
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '16px' }}>
            An employer with no tax file number on file must withhold at the top rate of 45%, not the 15% working holiday
            maker rate that applies to the first $45,000. You have 28 days from starting a job to hand it over, and
            nobody warns you when they are up.
          </p>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '28px' }}>
            The money is not gone. It sits with the ATO until a return lodged after 30 June reconciles every employer you
            had and claims it back.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '33px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>45%</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>Withheld from every dollar while no TFN is on file, instead of fifteen.</p>
            </div>
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '33px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>28 days</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>From starting a job to give your employer the number. Also what the ATO allows itself to issue it.</p>
            </div>
            <div style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
              <p className="font-serif font-black text-forest-500" style={{ fontSize: '33px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>1 return</p>
              <p style={{ ...BODY, color: '#2A3C34' }}>The only route back for anything already withheld at the wrong rate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. WHERE IT GOES WRONG ───────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Doing it yourself</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            Why do working holiday TFN applications fail?
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '60ch', marginBottom: '30px' }}>
            The form is short and most people get through it without trouble. When it does go wrong, it is almost always
            one of three things, and all three cost the same thing: another month at the top rate while you wait for a
            letter that is not coming.
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {FAILURE_POINTS.map((s) => (
              <li key={s.n} className="flex gap-4">
                <span className="font-serif font-black flex-shrink-0"
                  style={{ fontSize: '15px', color: '#16775C', width: '28px', paddingTop: '2px', letterSpacing: '-0.01em' }}
                  aria-hidden="true">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.35, marginBottom: '6px' }}>{s.title}</h3>
                  <p style={{ ...BODY, color: '#2A3C34' }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 4. WHAT WE DO ────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>The work</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '14px' }}>
            What we do about it
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '26px' }}>
            You send us your passport and your visa details on WhatsApp. Everything below happens on our side.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {WHAT_WE_DO.map((c) => (
              <div key={c.title} className="rounded-[12px]" style={{ padding: '16px 18px', background: '#F5F9F7', border: '1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.35, marginBottom: '6px' }}>{c.title}</h3>
                <p style={{ ...BODY, color: '#2A3C34' }}>{c.body}</p>
              </div>
            ))}
          </div>

          <p style={{ ...BODY, color: '#4C6459', marginTop: '22px', maxWidth: '60ch' }}>
            Already have the number and want the weeks at 45% back?{' '}
            <Link href="/tax-return" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>That is the tax return</Link>.
          </p>
        </div>
      </section>

      {/* ── 5. GUARANTEE ─────────────────────────────────────────────────── */}
      <section className="py-11 lg:py-14" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <p style={{ ...KICKER, color: '#F9D88A', marginBottom: '14px' }}>Our guarantee</p>
          <p className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(23px, 3vw, 31px)', lineHeight: 1.24, letterSpacing: '-0.02em', maxWidth: '22ch' }}>
            If your refund is less than our fee, we refund the difference, so you are never out of pocket.
          </p>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '52ch', marginTop: '16px' }}>
            The fee is flat and never a percentage of what comes back. We agree it with you on WhatsApp before any work
            starts, so nothing about it is a surprise later.
          </p>
        </div>
      </section>

      {/* ── 6. CTA ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '20ch', marginBottom: '14px' }}>
            Tell us where you are up to
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '56ch', marginBottom: '24px' }}>
            Whether you have landed yet, whether you have started a job, and whether anything has already been paid at
            45%. Three answers is enough for us to tell you what to do next.
          </p>
          <WaLink href={WA_TFN} position="section" topic="tfn" lang="en"
            className="btn-primary inline-flex items-center justify-center gap-2"
            style={{ height: '54px', padding: '0 32px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
            <IconWhatsApp />
            Message us on WhatsApp
          </WaLink>
          <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
            Replies in about an hour. Ask anything first.
          </p>
        </div>
      </section>

      {/* ── 7. TRUST ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Working holiday tax is the only thing we do.
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '58ch', marginBottom: '28px' }}>
            Every TFN application we lodge belongs to somebody on a 417 or 462 visa, which is why the same three things
            go wrong on all of them. Returns are prepared by our team, reviewed and signed off by a registered tax agent
            before they are lodged with the ATO.
          </p>
          <GoogleReviews lang="en" />
        </div>
      </section>

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            TFN questions people ask before they message us
          </h2>

          <div className="flex flex-col" style={{ gap: '4px' }}>
            {FAQS.map((f, i) => (
              <details key={i} name="tfn-faq" className="contact-faq-item">
                <summary className="contact-faq-summary">
                  <span style={{ flex: 1 }}>{f.question}</span>
                  <span className="contact-faq-plus" aria-hidden="true">+</span>
                </summary>
                <p className="contact-faq-answer" style={{ fontSize: '15px' }}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. GUIDES ────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">
          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Guides</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Read the whole answer first, if you would rather
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '24px' }}>
            Nothing is held back to make you get in touch. If the guide answers it, that is a good outcome.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-[12px] transition-all hover:shadow-lg"
                style={{ padding: '16px 18px', border: '1px solid #E2EFE9', display: 'block' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px' }}>{g.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459' }}>{g.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <NextStep
        eyebrow="What is next"
        heading="The weeks at 45% come back through a return"
        body="Once the number is on file, the second half of the job is the tax return that reconciles every employer you had and claims the excess back."
        cta="How the return works →"
        href="/tax-return"
      />

      <MobileCta href={WA_TFN} lang="en" topic="tfn" />
    </>
  )
}

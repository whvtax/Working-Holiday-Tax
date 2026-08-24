import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { GoogleReviews } from '@/components/ui/GoogleReviews'
import { MobileCta } from '@/components/ui/MobileCta'
import { SITE_URL, EMAIL } from '@/lib/constants'
import { getGoogleRating } from '@/lib/googleData'
import { waUrl } from '@/lib/wa'
import { WaLink } from './HomeWa'

// ─── METADATA ───────────────────────────────────────────────────────────
// The head terms stay, because they rank. The description changes to match
// what the page now actually says. No price, in the title, the description or
// the schema.
export const metadata: Metadata = {
  title: 'Working Holiday Tax Refund Australia | WHV & Backpacker Tax',
  description:
    'Working holiday tax returns for 417 and 462 visa holders. Residency, the weeks withheld at the wrong rate, Medicare and deductions, settled before lodging.',
  keywords: [
    'working holiday tax refund',
    'working holiday tax refund Australia',
    'WHV tax refund Australia',
    'backpacker tax refund Australia',
    'Australian tax refund working holiday',
    'tax refund 417 visa',
    'tax refund 462 visa',
    'claim tax back Australia backpacker',
    'working holiday tax return',
    'WHV tax return',
    'working holiday visa tax Australia',
    'working holiday maker tax refund',
    'Australian tax return for backpackers',
    'tax refund after leaving Australia',
    'lodge tax return from overseas Australia',
    'tax residency working holiday maker',
    'Addy non discrimination article Australia',
    'TFN application working holiday',
    'DASP super refund Australia',
    'ABN registration backpacker',
    'Medicare levy exemption backpacker',
    'working holiday tax refund UK backpacker',
    'tax refund Australia German backpacker',
    'tax refund Australia Japanese working holiday',
  ],
  authors: [{ name: 'Working Holiday Tax' }],
  creator: 'Working Holiday Tax',
  publisher: 'Working Holiday Tax',
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
    title: 'Working Holiday Tax Refund Australia | WHV & Backpacker Tax',
    description:
      'Anyone can press submit. The work happens before that. Residency, every employer, the Medicare exemption and the deductions for the work you actually did, on every 417 and 462 return.',
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia - tax returns for backpackers on 417 and 462 visas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Working Holiday Tax Refund Australia | WHV Tax Return',
    description: 'Working holiday tax returns for 417 and 462 visa holders. Residency, Medicare, deductions and every employer, worked through before anything is lodged.',
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

// ─── ICONS ──────────────────────────────────────────────────────────────
const IconTFN      = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconABN      = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 8l7-5 7 5v9a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7.5 17v-6h5v6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconReturn   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v12M6 10l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 16v1a1 1 0 001 1h12a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconSuper    = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconMedicare = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 17.5s-6-3.5-6-8.5a3 3 0 016-2 3 3 0 016 2c0 5-6 8.5-6 8.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><line x1="10" y1="7" x2="10" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><line x1="7.5" y1="9.5" x2="12.5" y2="9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconWhatsApp = () => (<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M12 2a10 10 0 0 0-8.7 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.2c-.2.6-1.2 1.2-1.7 1.2-.4 0-1 .1-3.3-.9-2.8-1.2-4.5-4-4.6-4.2-.1-.2-1.1-1.4-1.1-2.7s.7-1.9.9-2.2c.2-.2.5-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2.1.4 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.2.1.4.1.6-.1l.8-1c.2-.2.3-.2.6-.1l2 .9c.3.1.4.2.5.3.1.2.1.7-.1 1.3Z" /></svg>)

// ─── COPY ───────────────────────────────────────────────────────────────

/** Approved 22 Aug. Do not reword. */
const FIGURES = [
  {
    figure: '45%',
    body: 'The weeks before your TFN landed with your employer. Withheld at the top rate instead of fifteen. It does not come back unless someone claims it.',
  },
  {
    figure: '$18,200',
    body: 'Your residency position. British, German and Japanese passports can carry the full tax free threshold. No day count settles it. It is a judgement.',
  },
  {
    figure: '2%',
    body: 'A Medicare levy you never owed. Removable with a certificate almost nobody applies for.',
  },
]

/** The product. Five steps, in the order they actually happen. */
const ANALYSIS = [
  {
    n: '01',
    title: 'Your residency position',
    body: 'Most working holiday makers tick non resident and never look at it again. If you were a resident for tax purposes and your passport is British, German or Japanese, a non discrimination article in your country’s treaty with Australia can put you on resident rates, which is what the Addy case in the High Court turned on. It is a judgement about how you lived here, not a day count, and it is the largest single number on this page.',
  },
  {
    n: '02',
    title: 'Every employer, and every week',
    body: 'Casual and seasonal work leaves a year in pieces: four or five employers, a farm that paid you late, a job you had forgotten about by March. We reconcile the whole year against your ATO record rather than against memory, and that is usually where the weeks withheld at the top rate turn up.',
  },
  {
    n: '03',
    title: 'Medicare, if it applies to you',
    body: 'The levy is two percent of your income and it comes off by default. If you were not entitled to Medicare for part or all of the year you did not owe it for that period, but the ATO will only take it off with an exemption certificate you have to apply for first. We check whether you qualify and, if you do, we apply for it.',
  },
  {
    n: '04',
    title: 'Deductions for the work you actually did',
    body: 'A blank deductions box is not a saving, it is a decision to give something up. What a fruit picker can claim is not what a barista claims, and neither looks like a FIFO roster or a delivery rider’s kilometres. We ask what the work involved, claim what belongs to it, and leave out what does not.',
  },
  {
    n: '05',
    title: 'Then it is lodged',
    body: 'Prepared by our team, reviewed and signed off by a registered tax agent before it is lodged with the ATO. That part takes minutes. It is the four steps above that decide the number.',
  },
]

/** Approved 22 Aug. Verbatim, including the fourth row about access and effort. */
const COMPARISON = [
  { mygov: 'You tick a residency box',                     us: 'We work out which one is actually true for you' },
  { mygov: 'Nothing mentions the Medicare exemption',      us: 'We apply for the certificate if you qualify' },
  { mygov: 'Deductions are a blank box',                   us: 'We know what your line of work can claim' },
  { mygov: 'You need an account and Australian ID',        us: 'You need nothing. We deal with the ATO' },
]

const SERVICES = [
  { n: '01', href: '/tfn',            icon: <IconTFN />,      title: 'TFN Application',  desc: 'Get one before your first payslip, so the top rate never applies to you.' },
  { n: '02', href: '/abn',            icon: <IconABN />,      title: 'ABN Registration', desc: 'Invoice as a sole trader, with the tax consequences explained first.' },
  { n: '03', href: '/tax-return',     icon: <IconReturn />,   title: 'Tax Return',       desc: 'The full analysis above, then lodgement with the ATO.' },
  { n: '04', href: '/superannuation', icon: <IconSuper />,    title: 'Super Withdrawal', desc: 'Every fund found under your TFN, then one DASP claim when you leave.' },
  { n: '05', href: '/medicare',       icon: <IconMedicare />, title: 'Medicare Levy',    desc: 'The exemption certificate, if the year says you qualify for one.' },
]

const GUIDES = [
  { href: '/blog/diy-tax-return-vs-tax-agent-working-holiday', title: 'Doing it yourself or using an agent', desc: 'What each one actually costs you, written straight.' },
  { href: '/blog/tax-residency-working-holiday-makers',        title: 'Are you a resident for tax purposes',  desc: 'The question that moves the most money on a backpacker return.' },
  { href: '/blog/medicare-levy-working-holiday-makers',        title: 'The Medicare levy exemption',          desc: 'Who owes the two percent, who does not, and how it comes off.' },
  { href: '/blog/tax-deductions-working-holiday-makers',       title: 'What you can claim',                   desc: 'Deductions by the kind of work, not a generic list.' },
]

const FAQS = [
  {
    question: 'What decides how much I get back from an Australian working holiday tax return?',
    answer: 'Four things do most of the work: your tax residency position for the year, whether any of your pay was withheld at 45% before your tax file number reached your employer, whether the 2% Medicare levy came off when you were not entitled to Medicare, and the deductions that belong to the work you did. Two people who earned exactly the same amount in Australia can end up with very different refunds because of those four. That is why the analysis matters more than the lodgement, and it is what we work through before a single figure is entered on a return.',
  },
  {
    question: 'Can I not just lodge my own tax return on myGov?',
    answer: 'You can, and lodging really is the easy part. myGov will accept whatever you type into it, but it will not tell you whether you were a resident for tax purposes, whether an employer withheld at the wrong rate, whether you qualify for a Medicare levy exemption certificate, or what your line of work is allowed to claim. Those are judgements about your particular year, and they are what decides the number, so the risk in doing it yourself is not the filing, it is what goes into it.',
  },
  {
    question: 'How much do your services cost?',
    answer: 'Our fees are flat and never a percentage of your refund. We confirm the fee with you on WhatsApp before anything begins, and it is paid up front. After that we send you the full questionnaire and start the work. If your refund is less than our fee, we refund the difference, so you are never out of pocket.',
  },
  {
    question: 'Am I a resident for tax purposes on a 417 or 462 visa?',
    answer: 'It depends on how you actually lived in Australia, not on how long your visa ran for. Plenty of working holiday makers move around constantly and are not residents for tax purposes, but somebody who settled in one town, held one job and lived there as part of a community may well be. If you were a resident and your passport is from a non discrimination treaty country, which includes the United Kingdom, Germany and Japan, resident rates and the full tax free threshold can apply to your income, which is what the Addy case in the High Court established. It is a judgement rather than a checkbox, so we go through your year with you before taking a position on it.',
  },
  {
    question: 'What tax rate do working holiday makers pay in Australia?',
    answer: 'Working holiday makers are taxed at a flat 15% on the first $45,000, then 30% up to $135,000, 37% up to $190,000, and 45% above that. If you never gave your employer a tax file number, they are required to withhold at the top rate instead, which is one of the most common reasons a backpacker ends up owed money. Those rates are the starting point rather than the final word: where you were a resident for tax purposes and your passport is from a non discrimination treaty country, resident rates including the tax free threshold can apply instead.',
  },
  {
    question: 'Can you help me claim my tax refund after I have already left Australia?',
    answer: 'Yes. We work with people from the UK, Germany, Japan and many other countries who lodge their Australian tax return and claim their super (DASP) long after they have flown home, and it is all handled online. One rule to know before you close your account: the ATO can only pay a tax refund into an Australian bank account, while a super refund (DASP) can be paid overseas. If your Australian account is already closed, tell us early, because it changes the order we do things in.',
  },
  {
    question: 'How quickly will you reply?',
    answer: 'During business hours, Monday to Friday, 9am to 6pm AEST or AEDT, we usually reply within an hour. Outside those hours we come back to you first thing the next morning. You can ask a question first without committing to anything, and we reply in your own language.',
  },
  {
    question: 'Do you only handle tax returns?',
    answer: 'No. We also handle TFN applications, ABN registrations, super withdrawal (DASP) and Medicare levy exemption certificates, which covers what a working holiday maker on a 417 or 462 visa normally needs. Working holiday tax is the only thing we do, so all of it is handled by the same people rather than passed around a general practice.',
  },
]

const WA_TAX_RETURN = waUrl({ topic: 'tax-return', lang: 'en' })

// ─── SHARED INLINE STYLES ───────────────────────────────────────────────
const KICKER: CSSProperties = { fontSize: '10.5px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 500 }
const BODY: CSSProperties   = { fontSize: '15px', lineHeight: 1.58 }
const LEDE: CSSProperties   = { fontSize: '16.5px', lineHeight: 1.62 }

export default async function HomePage() {
  const gRating = await getGoogleRating()

  // ─── Schema.org ───
  const webPageLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Working Holiday Tax Refund Australia | WHV Tax Return',
    description: 'Working holiday tax returns for 417 and 462 visa holders. Residency, every employer, the Medicare levy exemption and work related deductions, worked through before lodgement.',
    inLanguage: 'en-AU',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#business` },
    primaryImageOfPage: `${SITE_URL}/og-image.png`,
  }

  // Only built when gRating.live - see googleData.ts. Never emit a fabricated
  // rating to Google as structured data.
  const aggregateRatingLd = gRating.live ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    description: 'Working holiday tax return services for 417 and 462 visa holders in Australia.',
    url: SITE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: gRating.rating.toFixed(1),
      reviewCount: gRating.count,
      bestRating: '5',
      worstRating: '1',
    },
  } : null

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: 'en-AU',
    mainEntity: FAQS.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    email: EMAIL,
    description: 'Working holiday tax is the only thing we do. Tax returns, TFN applications, super refunds (DASP), ABN registrations and Medicare levy exemptions for working holiday makers on 417 and 462 visas in Australia.',
    areaServed: { '@type': 'Country', name: 'Australia' },
    knowsLanguage: ['en', 'de', 'ja'],
    knowsAbout: [
      'Working holiday maker taxation',
      'Tax residency for working holiday makers',
      'Non discrimination articles in Australian tax treaties',
      'Tax File Number (TFN)',
      'Australian Business Number (ABN)',
      'Departing Australia Superannuation Payment (DASP)',
      'Medicare levy exemption',
      'Work related deductions',
    ],
    sameAs: [
      'https://www.instagram.com/workingholidaytax',
      'https://www.tiktok.com/@workingholidaytax',
    ],
  }

  const professionalServiceLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#professionalservice`,
    name: 'Working Holiday Tax',
    url: SITE_URL,
    telephone: '+61424513998',
    image: `${SITE_URL}/og-image.png`,
    description: 'Tax returns prepared for working holiday makers on 417 and 462 visas, then reviewed and signed off by a registered tax agent before lodgement with the ATO.',
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

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    ],
  }

  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Working Holiday Tax',
    description: 'Working holiday tax returns for 417 and 462 visa holders in Australia.',
    inLanguage: ['en-AU', 'de', 'ja'],
    publisher: { '@id': `${SITE_URL}/#business` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageLd) }} />
      {aggregateRatingLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingLd) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F2FAF7 100%)' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 pt-11 pb-11 lg:pt-14 lg:pb-14 text-center">

          <p className="hero-animate" style={{ ...KICKER, color: '#16775C', marginBottom: '16px' }}>
            Working holiday visas 417 &amp; 462
          </p>

          <h1 className="font-serif font-black text-ink hero-animate"
            style={{ fontSize: 'clamp(31px, 5.4vw, 46px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginBottom: '16px' }}>
            <span style={{ display: 'block' }}>Anyone can press submit.{' '}</span>
            <span style={{ display: 'block', color: '#0B5240' }}>The work happens before that.{' '}</span>
          </h1>

          <p className="mx-auto hero-animate-delay"
            style={{ ...LEDE, color: '#4C6459', maxWidth: '46ch', marginBottom: '26px' }}>
            Five things decide your refund. None of them are on the form.
          </p>

          <div className="hero-animate-delay-2">
            <WaLink href={WA_TAX_RETURN} position="hero" topic="tax-return" lang="en"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '54px', padding: '0 32px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
              <IconWhatsApp />
              Message us on WhatsApp
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '12px' }}>
              Replies in about an hour. Ask anything first.
            </p>
          </div>

          <div className="flex justify-center" style={{ marginTop: '20px' }}>
            <GoogleRating variant="pill" lang="en" />
          </div>
        </div>
      </section>

      {/* ── 2. THE MYGOV COMPARISON ──────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>The question everyone asks</p>

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.7vw, 31px)', lineHeight: 1.2, letterSpacing: '-0.025em', maxWidth: '24ch', marginBottom: '14px' }}>
            {/* One sentence, wrapping on its own. Forcing the two halves onto
                their own lines split it into four ragged lines at 390px. */}
            <span style={{ color: '#2A3C34', fontWeight: 400 }}>myGov accepts a wrong return </span>
            <span>as readily as a right one.</span>
          </h2>

          <p style={{ ...LEDE, color: '#4C6459', maxWidth: '54ch', marginBottom: '26px' }}>
            Nothing on the screen checks whether you were a resident, whether the levy was yours, or what your line of
            work can claim. You are the only one looking.
          </p>

          <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
            {COMPARISON.map((row, i) => (
              <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                <div style={{ padding: '15px 18px', background: '#FFFFFF' }}>
                  <p style={{ ...KICKER, color: '#4C6459', marginBottom: '5px' }}>On myGov</p>
                  <p style={{ ...BODY, color: '#2A3C34' }}>{row.mygov}</p>
                </div>
                <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                  style={{ padding: '15px 18px', background: '#F2FAF7' }}>
                  <p style={{ ...KICKER, color: '#0B5240', marginBottom: '5px' }}>With us</p>
                  <p style={{ ...BODY, color: '#080F0D', fontWeight: 500 }}>{row.us}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="font-serif" style={{ fontSize: '19px', lineHeight: 1.45, color: '#0B5240', marginTop: '26px', maxWidth: '46ch', fontWeight: 700 }}>
            You will never log into myGov, link an ID, or work out which form is which. We deal with the ATO directly.
          </p>

          <div style={{ marginTop: '22px' }}>
            <WaLink href={WA_TAX_RETURN} position="section" topic="tax-return" lang="en"
              className="btn-primary inline-flex items-center justify-center gap-2"
              style={{ height: '52px', padding: '0 30px', fontSize: '15px', borderRadius: '100px' }}>
              <IconWhatsApp />
              Message us on WhatsApp
            </WaLink>
            <p style={{ fontSize: '13.5px', color: '#4C6459', marginTop: '10px' }}>
              Replies in about an hour. Ask anything first.
            </p>
          </div>
        </div>
      </section>
      {/* ── 3. THE THREE FIGURES ─────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', maxWidth: '20ch', marginBottom: '12px' }}>
            What decides the size of a working holiday tax refund?
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '30px' }}>
            Three things, most of the time, and they are the three below.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {FIGURES.map((f) => (
              <div key={f.figure} style={{ borderTop: '2px solid #0B5240', paddingTop: '16px' }}>
                <p className="font-serif font-black text-forest-500"
                  style={{ fontSize: '33px', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '10px' }}>
                  {f.figure}
                </p>
                <p style={{ ...BODY, color: '#2A3C34' }}>{f.body}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459', marginTop: '22px', maxWidth: '62ch' }}>
            British, German and Japanese passports all sit under a non discrimination article, so the residency question
            applies to almost everyone we work with. <Link href="/tax-residency" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>How residency is decided</Link>.
          </p>
        </div>
      </section>

      {/* ── 4. THE GUARANTEE ─────────────────────────────────────────────── */}
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

      {/* ── 5. WHAT WE GO THROUGH ON EVERY RETURN ────────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-16 bg-white">
        <div className="max-w-[780px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>The work</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            What we go through on every return
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '30px' }}>
            The same five steps, in the same order, whether your year was one job or six. Four of them happen before
            anything is typed into a return.
          </p>

          <ol className="flex flex-col" style={{ gap: '22px' }}>
            {ANALYSIS.map((s) => (
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


      {/* ── 6. TFN OR TFN AND ABN ────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[880px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Which of these two was your year?
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '26px' }}>
            It changes what your return has to say, so it is the one thing worth telling us before we talk. Pick the one
            that matches and it travels with your message.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-white rounded-[14px] flex flex-col"
              style={{ padding: '22px 20px', border: '1px solid #E2EFE9', boxShadow: '0 1px 2px rgba(7,58,45,.06)' }}>
              <h3 className="font-semibold text-ink" style={{ fontSize: '16px', marginBottom: '8px' }}>TFN only</h3>
              <p style={{ ...BODY, color: '#2A3C34', marginBottom: '18px', flex: 1 }}>
                Every job put you on a payroll. You handed over a tax file number, tax came off each payslip, and each
                employer reported an income statement for you.
              </p>
              <WaLink href={waUrl({ topic: 'tax-return', lang: 'en', tier: 'tfn' })} position="inline" topic="tax-return" lang="en" tier="tfn"
                className="btn-primary inline-flex items-center justify-center gap-2"
                style={{ height: '48px', fontSize: '15px', borderRadius: '100px', width: '100%' }}>
                <IconWhatsApp />
                This was me
              </WaLink>
            </div>

            <div className="bg-white rounded-[14px] flex flex-col"
              style={{ padding: '22px 20px', border: '1px solid #E2EFE9', boxShadow: '0 1px 2px rgba(7,58,45,.06)' }}>
              <h3 className="font-semibold text-ink" style={{ fontSize: '16px', marginBottom: '8px' }}>TFN and ABN</h3>
              <p style={{ ...BODY, color: '#2A3C34', marginBottom: '18px', flex: 1 }}>
                At some point you invoiced instead of being paid through a payroll. Delivery riding, subcontracting on a
                site, a farm that paid you against an ABN. Nothing was withheld from that income, and it sits differently
                on the return.
              </p>
              <WaLink href={waUrl({ topic: 'abn', lang: 'en', tier: 'tfn-abn' })} position="inline" topic="abn" lang="en" tier="tfn-abn"
                className="btn-primary inline-flex items-center justify-center gap-2"
                style={{ height: '48px', fontSize: '15px', borderRadius: '100px', width: '100%' }}>
                <IconWhatsApp />
                This was me
              </WaLink>
            </div>
          </div>

          <p style={{ fontSize: '14px', color: '#4C6459', marginTop: '18px' }}>
            Not sure which one you were?{' '}
            <WaLink href={waUrl({ topic: 'general', lang: 'en', tier: 'unsure' })} position="inline" topic="general" lang="en" tier="unsure"
              className="inline-flex items-center"
              style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline', minHeight: '44px' }}>
              Tell us what the work looked like
            </WaLink>
          </p>
        </div>
      </section>

      {/* ── 7. WHAT WE HELP WITH ─────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>What we help with</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '26px' }}>
            From your first payslip to the money that follows you home
          </h2>

          <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-4">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding: '18px', minHeight: '44px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <span className="text-muted" style={{ ...KICKER, marginBottom: '10px' }}>{s.n}</span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0"
                  style={{ marginBottom: '10px' }}>{s.icon}</span>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '5px' }}>{s.title}</h3>
                <p className="flex-1" style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459', marginBottom: '12px' }}>{s.desc}</p>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3" style={{ fontSize: '13px' }}>
                  Learn more →
                </span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '16px' }}>
            <Link href="/uk-working-holiday-tax"
              className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 bg-white rounded-2xl transition-all hover:shadow-lg"
              style={{ padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
              <div style={{ flex: 1 }}>
                <span className="text-muted" style={KICKER}>Where you are from changes what you get back</span>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginTop: '6px', marginBottom: '4px' }}>
                  UK passport holders
                </h3>
                <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459' }}>
                  Three years instead of one, Medicare access other backpackers do not get, and the Addy ruling. The
                  British rules are not the same.
                </p>
              </div>
              <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3 flex-shrink-0" style={{ fontSize: '13px' }}>
                Read more →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 8. TRUST ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">

          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Working holiday tax is the only thing we do.
          </h2>
          <p style={{ ...BODY, color: '#2A3C34', maxWidth: '58ch', marginBottom: '28px' }}>
            Every return we prepare belongs to somebody on a 417 or 462 visa, which is why the same four questions come
            up on all of them. Prepared by our team, reviewed and signed off by a registered tax agent before it is
            lodged with the ATO.
          </p>

          <GoogleReviews lang="en" />

          <div className="rounded-[12px] flex gap-3"
            style={{ marginTop: '28px', padding: '16px 18px', background: '#FDF0D5', border: '1px solid #F9D88A' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '1px' }}>
              <path d="M12 2L2 22h20L12 2z" stroke="#B8770C" strokeWidth="1.8" strokeLinejoin="round" />
              <line x1="12" y1="10" x2="12" y2="15" stroke="#B8770C" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="12" y1="18" x2="12.01" y2="18" stroke="#B8770C" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p style={{ ...BODY, color: '#2A3C34' }}>
              <strong style={{ color: '#080F0D' }}>A tax agent will never ask for your myGov login details.</strong>{' '}
              Neither will we. We do not need them, and anyone who asks you for them is not us.
            </p>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-[820px] mx-auto px-5 md:px-8">
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '20px' }}>
            Questions people ask before they message us
          </h2>

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

          <p style={{ fontSize: '14px', color: '#4C6459', marginTop: '24px' }}>
            Something not answered here?{' '}
            <Link href="/contact" style={{ color: '#0B5240', fontWeight: 600, textDecoration: 'underline' }}>Get in touch</Link>
          </p>
        </div>
      </section>

      {/* ── 10. GUIDES ───────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 reveal">

          <p style={{ ...KICKER, color: '#16775C', marginBottom: '12px' }}>Guides</p>
          <h2 className="font-serif font-black text-ink"
            style={{ fontSize: 'clamp(23px, 2.6vw, 30px)', lineHeight: 1.22, letterSpacing: '-0.02em', marginBottom: '12px' }}>
            Read the whole answer first, if you would rather
          </h2>
          <p style={{ ...BODY, color: '#4C6459', maxWidth: '58ch', marginBottom: '24px' }}>
            We write these for the same four questions that decide a return. Nothing is held back to make you get in
            touch.
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {GUIDES.map((g) => (
              <Link key={g.href} href={g.href}
                className="group bg-white rounded-[12px] transition-all hover:shadow-lg"
                style={{ padding: '16px 18px', border: '1px solid #E2EFE9', display: 'block' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px' }}>{g.title}</h3>
                <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#4C6459' }}>{g.desc}</p>
              </Link>
            ))}
          </div>

          <p style={{ marginTop: '18px' }}>
            <Link href="/blog" className="inline-flex items-center"
              style={{ color: '#0B5240', fontWeight: 600, fontSize: '15px', textDecoration: 'underline', minHeight: '44px' }}>
              All guides →
            </Link>
          </p>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background: '#0B5240' }}>
        <div className="max-w-[780px] mx-auto px-5 md:px-8 text-center reveal">
          <h2 className="font-serif font-black text-white mx-auto"
            style={{ fontSize: 'clamp(23px, 3vw, 31px)', lineHeight: 1.24, letterSpacing: '-0.02em', maxWidth: '20ch', marginBottom: '14px' }}>
            Tell us what your year looked like
          </h2>
          <p className="mx-auto" style={{ ...BODY, color: 'rgba(255,255,255,0.72)', maxWidth: '50ch', marginBottom: '24px' }}>
            Where you worked, roughly when, and whether you ever invoiced under an ABN. That is enough for us to tell you
            where you stand.
          </p>
          <WaLink href={waUrl({ topic: 'tax-return', lang: 'en' })} position="footer" topic="tax-return" lang="en"
            className="btn-primary inline-flex items-center justify-center gap-2"
            style={{ height: '54px', padding: '0 32px', fontSize: '15.5px', borderRadius: '100px', maxWidth: '330px', width: '100%' }}>
            <IconWhatsApp />
            Message us on WhatsApp
          </WaLink>
          <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.55)', marginTop: '12px' }}>
            Replies in about an hour. Ask anything first.
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.55, color: 'rgba(255,255,255,0.45)', marginTop: '18px', maxWidth: '48ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Prepared by our team, reviewed and signed off by a registered tax agent before it is lodged with the ATO.
          </p>
        </div>
      </section>

      <MobileCta href={WA_TAX_RETURN} lang="en" topic="tax-return" />
    </>
  )
}

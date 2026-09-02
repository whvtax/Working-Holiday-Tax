import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { waUrl } from '@/lib/wa'
import { WaLink } from '@/app/(site)/HomeWa'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'

/*
 * The answer hub for the whole superannuation cluster.
 *
 * This page took 4,255 impressions and zero clicks at position 41. It was not
 * thin and it was not missing schema. It failed on intent: the H1 was a sales
 * line with no query language in it, and no H2 contained DASP, claim,
 * eligibility or timing. Twenty two narrow Super guides were competing with it
 * for the same words and outranking it.
 *
 * So the structure below is the fix. Every H2 is a question somebody actually
 * types, and every one is answered immediately in a complete paragraph that
 * stands on its own out of context. The sales layer sits underneath the answer
 * rather than in place of it.
 */

const WA = waUrl({ topic: 'super', lang: 'en' })

export const metadata: Metadata = {
  title: { absolute: 'Claim Your Super After Leaving Australia (DASP 2026)' },
  description:
    'Left Australia on a 417 or 462 visa? Your super is claimable through DASP. Eligibility, the 65% tax, documents, timing, and how we lodge it for you.',
  keywords: [
    'claim superannuation',
    'claim superannuation australia',
    'claim super after leaving Australia',
    'superannuation working holiday visa',
    'superannuation working holiday',
    'superannuation backpacker',
    'withdraw super leaving australia',
    'departing australia superannuation payment',
    'DASP claim',
    'DASP 417 visa',
    'DASP 462 visa',
    'super refund working holiday maker',
    'how to claim super when leaving Australia',
    'super tax working holiday maker',
    'claim super back',
    'lost super Australia working holiday',
    'ATO held super working holiday',
  ],
  alternates: {
    canonical: '/superannuation',
    languages: {
      'en': '/superannuation', 'en-AU': '/superannuation',
      'de': '/de/superannuation',
      'ja': '/ja/superannuation',
      'x-default': '/superannuation',
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/assets/og/og-super.png`, width: 1200, height: 630, alt: 'Working Holiday Tax' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/superannuation`,
    siteName: 'Working Holiday Tax',
    title: 'Claim Your Super After Leaving Australia (DASP 2026)',
    description:
      'Who can claim a DASP, how much survives the 65% tax, what documents you need and how long it takes.',
  },
  twitter: {
    images: [`${SITE_URL}/assets/og/og-super.png`],
    card: 'summary_large_image',
    title: 'Claim Your Super After Leaving Australia (DASP)',
    description: 'Eligibility, the 65% rate, documents, timing and multiple funds, answered.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

/* ── The jump nav. Every entry is an H2 below. ───────────────────────────── */

/**
 * The objection every lead arrives holding, answered about super specifically.
 *
 * This is now the page's only version of the argument: the two column list that
 * repeated it in section 10 has been removed, and the FAQ no longer restates it
 * either. Every row is about DASP: the portal takes one fund at a time, and only
 * the ones you can name. Nothing here says the ATO's system is bad. It does a
 * different job.
 */
const MYGOV = [
  {
    mygov: 'The claim handles one fund at a time, and only the ones you already know about.',
    us: 'We search every account linked to your tax file number, including ones an employer opened without asking.',
  },
  {
    mygov: 'Nothing tells you a balance has already left the fund and gone to the ATO as unclaimed super.',
    us: 'About six months after your visa expires that is where it goes, so we look there as well.',
  },
  {
    mygov: 'The claim is checked against your visa record, and a visa that has not ceased stops it dead.',
    us: 'We check all three conditions first, so you do not spend a fortnight on a claim that cannot be paid yet.',
  },
  {
    mygov: 'Super is one claim and your tax return is a separate one. Nothing connects them for you.',
    us: 'The return side is usually where most of the money is, so we do both.',
  },
]

const faqs = [
  {
    question: 'Can I just claim my super myself?',
    answer:
      'You can, it is free, and with one fund and clean documents we will say so. It gets harder with super spread across several funds, a fund that wants certified copies from overseas, or a visa that has not ceased.',
  },
  {
    question: 'Do you get superannuation if you worked under an ABN?',
    answer:
      'Generally no. Super guarantee contributions attach to PAYG employment, so gig, rideshare and freelance work invoiced under an ABN usually does not generate super. The exception is a contractor who really worked like an employee, where super may still be owed.',
  },
  {
    question: 'Is a DASP the same thing as a tax refund?',
    answer:
      'No, they are two separate payments. A tax refund is tax over-withheld from your wages, paid by the ATO after you lodge a return. A DASP is the super your employer paid on top of your wages, released by your fund. Most working holiday makers are owed both.',
  },
  {
    question: 'Do you need your tax file number to claim your super?',
    answer:
      'A fund can usually identify you from your name, date of birth and passport, so a lost tax file number does not stop a claim. The TFN is still the only reliable way to find every account, and recovering it is faster than searching fund by fund.',
  },
  {
    question: 'Why is the DASP rate 65% for working holiday makers and 35% for others?',
    answer:
      'The 65% rate is set in law for anyone who has ever held a subclass 417 or 462 visa, even if you later moved to a different visa. Temporary residents who never held one, such as students, pay 35% on the taxed element.',
  },
  {
    question: 'What if an employer never paid your super at all?',
    answer:
      'Where an employer should have paid super and never did, that is an unpaid super guarantee matter the ATO can investigate and recover for you. Raise it before you claim, because money recovered after your accounts close means claiming again.',
  },
  {
    question: 'Does claiming your super affect your tax return or a future Australian visa?',
    answer:
      'Neither. The withholding tax is final, so a DASP does not go on your Australian tax return, and it is not something a later visa application turns on. The one consequence is that your accounts close, so if you come back to work you start with a new fund.',
  },
]

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
    { '@type': 'ListItem', position: 2, name: 'Superannuation', item: `${SITE_URL}/superannuation` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/superannuation#service`,
  name: 'DASP superannuation claim service for working holiday makers',
  serviceType: 'Departing Australia Superannuation Payment (DASP) claim',
  description:
    'Departing Australia Superannuation Payment claims for 417 and 462 working holiday visa holders, from finding every fund linked to a tax file number through to payment into an Australian or overseas account.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'Working Holiday Maker (subclass 417 / 462) who has left Australia' },
  inLanguage: 'en-AU',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/superannuation#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/superannuation`,
}

/*
 * The HowTo describes what a DASP claim consists of and the order it happens
 * in, from the reader's point of view, so the page answers "how does claiming
 * my super work" as a source rather than as a landing page.
 *
 * It deliberately does NOT read as a set of instructions to follow. An earlier
 * version listed "Gather your details" and "Lodge a claim with each fund",
 * which is a walkthrough of a process we are engaged to run, and structured
 * data of that kind is surfaced by search engines as a step by step. Each step
 * below describes what happens, not what the reader should go and do.
 */
const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  inLanguage: 'en-AU',
  name: 'How a Departing Australia Superannuation Payment (DASP) claim works',
  description:
    'What a Departing Australia Superannuation Payment claim involves for a working holiday maker on a subclass 417 or 462 visa, from eligibility to payment.',
  step: [
    { name: 'Eligibility is confirmed', text: 'Your visa has to have expired or been cancelled and you have to have left Australia. Both conditions must be true at the same time, and a claim made before they are is the most common wasted application.' },
    { name: 'Every fund is identified', text: 'A working holiday year with several employers usually means several funds, including balances a fund has already transferred to the ATO as unclaimed super. A claim only reaches the money it is pointed at.' },
    { name: 'Each claim is prepared and evidenced', text: 'Every fund holding a balance is claimed from separately, to its own identity and certification standard. Documents that one fund accepts are not always accepted by the next.' },
    { name: 'Withholding is applied', text: 'A working holiday maker DASP is taxed at 65% on the taxable component. The fund deducts it and pays the ATO before releasing the balance, whoever lodges the claim.' },
    { name: 'The balance is released', text: 'The remaining balance is paid out, and unlike a tax refund it can be paid to an overseas bank account.' },
  ].map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.name, text: s.text })),
}

/* ── Shared section shells, so every answer looks the same ───────────────── */
const H2: React.CSSProperties = {
  fontSize: 'clamp(21px,2.6vw,30px)',
  lineHeight: 1.16,
  letterSpacing: '-0.025em',
  // 12px under a 21 to 30px serif heading is tight. Every H2 on the page runs
  // through this object, so the air goes in once.
  marginBottom: '16px',
  scrollMarginTop: '84px',
}
const BODY: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: 1.7,
  color: '#2A3C34',
  marginBottom: '14px',
}

function Answer({
  id, heading, children, tint = false,
}: { id: string; heading: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className="py-8 lg:py-11" style={{ background: tint ? '#F5F9F7' : '#fff' }}>
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="max-w-[680px] mx-auto">
          <h2 className="font-serif font-black text-ink" style={H2}>{heading}</h2>
          {children}
        </div>
      </div>
    </section>
  )
}

export default function SuperannuationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO. The determinant this page owns is how many funds your money */}
      {/*    landed in, and whether every one of them is actually found. ───── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize: '13px', color: '#4C6459' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Superannuation</span>
          </nav>

          <div className="max-w-[680px] mx-auto">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240' }}>
                Superannuation &middot; DASP
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(28px,3.4vw,44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '12px' }}>
              How to claim your superannuation after leaving Australia
            </h1>

            <p className="hero-sub font-semibold text-ink"
              style={{ fontSize: 'clamp(16px,1.6vw,18px)', lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: '12px' }}>
              Your employer paid it on top of your wages, never out of them. It is still sitting in Australia.
            </p>

            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop: '24px', marginBottom: '22px', maxWidth: '480px' }}>
              <WaLink href={WA} position="hero" topic="super" lang="en"
                className="btn-primary inline-flex justify-center"
                style={{ minHeight: '54px', padding: '0 32px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                Ask us about your super
              </WaLink>
              <a href="#who-can-claim"
                className="inline-flex btn-ghost-dark justify-center items-center"
                style={{ minHeight: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                Start with eligibility
              </a>
            </div>

            <p style={{ fontSize: '13px', color: '#4C6459' }}>
              Replies in about an hour.
            </p>
          </div>
        </div>
      </section>

      {/* ── 0b. THE OBJECTION, ANSWERED ABOUT SUPER ────────────────────────── */}
      <section className="py-8 lg:py-11" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">

            <p className="font-medium uppercase"
              style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#16775C', marginBottom: '12px' }}>
              Doing it yourself
            </p>

            <h2 className="font-serif font-black text-ink" style={H2}>
              <span style={{ display: 'block', color: '#2A3C34', fontWeight: 400 }}>The claim form has one box for a super fund.{' '}</span>
              <span style={{ display: 'block' }}>Four casual jobs can mean four.{' '}</span>
            </h2>

            <p style={{ ...BODY, color: '#4C6459', maxWidth: '56ch', marginBottom: '20px' }}>
              Two of those accounts were opened without you choosing anything.
            </p>

            {/* The two labels used to print on all eight cells, which on a phone
                is the same words repeated eight times down the screen. They print
                once, on the first row, where they read as column headings on
                desktop and as the key on mobile. The alternating ground and the
                heavier weight carry the distinction from there. Copy unchanged. */}
            <div className="rounded-[14px] overflow-hidden" style={{ border: '1px solid #CDE3DB' }}>
              {MYGOV.map((row, i) => (
                <div key={i} className="grid md:grid-cols-2" style={{ borderTop: i === 0 ? 'none' : '1px solid #E2EFE9' }}>
                  <div style={{ padding: '13px 16px', background: '#FFFFFF' }}>
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#4C6459', marginBottom: '5px' }}>
                        On the ATO portal
                      </p>
                    )}
                    <p style={{ ...BODY, marginBottom: 0, overflowWrap: 'break-word' }}>{row.mygov}</p>
                  </div>
                  <div className="border-t md:border-t-0 md:border-l border-[#E2EFE9]"
                    style={{ padding: '13px 16px', background: '#F2FAF7' }}>
                    {i === 0 && (
                      <p className="font-medium uppercase" style={{ fontSize: '10.5px', letterSpacing: '0.15em', color: '#0B5240', marginBottom: '5px' }}>
                        With us
                      </p>
                    )}
                    <p style={{ ...BODY, color: '#080F0D', fontWeight: 500, marginBottom: 0, overflowWrap: 'break-word' }}>{row.us}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-serif" style={{ fontSize: '18px', lineHeight: 1.45, color: '#0B5240', marginTop: '22px', maxWidth: '46ch', fontWeight: 700 }}>
              You will never log into myGov or work out which form is which. We deal with the ATO directly.
            </p>
          </div>
        </div>
      </section>

      {/* ── 1 ──────────────────────────────────────────────────────────────── */}
      <Answer id="who-can-claim" heading="Who can claim a DASP super refund?">
        <p style={BODY}>
          A Departing Australia Superannuation Payment is claimable once your temporary visa has expired
          or been cancelled and you have permanently left Australia. Both have to be true at once.
          Australian and New Zealand citizens and permanent residents cannot claim.
        </p>
        <p style={BODY}>
          Your visa status is checked against Department of Home Affairs records, so there is nothing
          separate to prove. A bridging visa, or still being onshore on any valid visa, blocks the claim.
        </p>
      </Answer>

      {/* ── 2 ──────────────────────────────────────────────────────────────── */}
      <Answer id="how-much" heading="How much super will you actually get back?" tint>
        <p style={BODY}>
          Working holiday makers pay 65% withholding tax on the taxable component of a DASP, so roughly 35
          cents in the dollar reaches you. The rate is fixed in law for anyone who has held a 417 or 462
          visa, and no agent or waiting can reduce it.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ margin: '20px 0 14px' }}>
          {[
            { bal: '$3,000', net: '$1,050', note: 'a few months of casual work' },
            { bal: '$6,000', net: '$2,100', note: 'around six months full time' },
            { bal: '$10,000', net: '$3,500', note: 'a full working holiday year' },
          ].map((r, i) => (
            <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #E2EFE9', textAlign: 'center' }}>
              <p className="font-medium" style={{ fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#4C6459', marginBottom: '6px' }}>
                Super balance
              </p>
              <p className="font-semibold text-ink" style={{ fontSize: '17px', marginBottom: '10px' }}>{r.bal}</p>
              <p className="font-serif font-black" style={{ fontSize: 'clamp(26px,3vw,33px)', color: '#0B5240', lineHeight: 1, marginBottom: '8px' }}>
                {r.net}
              </p>
              <p style={{ fontSize: '13px', color: '#4C6459', lineHeight: 1.55 }}>
                paid to you &middot; {r.note}
              </p>
            </div>
          ))}
        </div>

        <p style={{ ...BODY, fontSize: '13px', color: '#4C6459' }}>
          Figures are after the 65% DASP withholding, on a balance made up entirely of taxed contributions.
          An untaxed element, which some funds hold, is withheld at a higher rate, so treat these as
          illustrations rather than a quote.
        </p>
      </Answer>

      {/* ── 3 ──────────────────────────────────────────────────────────────── */}
      <Answer id="documents" heading="What documents do you need for a DASP claim?">
        <p style={BODY}>
          You need your passport, tax file number, visa details, each fund's name and ideally its member
          number, plus bank details, Australian or overseas. A missing member number is rarely fatal: a
          fund can match you from your TFN and date of birth.
        </p>
        <p style={BODY}>
          The step that stalls claims is certification. Where a single fund holds $5,000 or more it will
          usually want certified copies of your passport and visa, which takes longer from overseas than
          people expect.
        </p>
      </Answer>

      {/* ── 4 ──────────────────────────────────────────────────────────────── */}
      <Answer id="how-long" heading="How long does a DASP payment take?" tint>
        <p style={BODY}>
          Payment typically arrives within 28 days of approval. The clock starts when the fund or the ATO
          has everything it needs, not when you apply, so a claim missing a certified document can sit for
          weeks before those 28 days begin.
        </p>
        <p style={BODY}>
          If your money is spread across several funds, the claim is only as fast as the slowest of them.
          Balances already transferred to the ATO are claimed from the ATO, to the same standard.
        </p>
      </Answer>

      {/* ── 5 ──────────────────────────────────────────────────────────────── */}
      <Answer id="find-your-fund" heading="What if you do not know which super fund you were in?">
        <p style={BODY}>
          This is the normal situation. Every fund an employer paid into is linked to your tax file
          number, so the accounts can be traced from it without you remembering a single fund name.
          Balances a fund has already handed to the ATO appear in the same search.
        </p>
        <p style={BODY}>
          The claim is not automatic: finding an account lodges nothing, and each fund still needs its own
          application. The account people miss is almost always the first job.
        </p>
      </Answer>

      {/* ── 6 ──────────────────────────────────────────────────────────────── */}
      <Answer id="from-overseas" heading="Can you claim your super from the UK, Germany or Japan?" tint>
        <p style={BODY}>
          Yes, and you have to. A DASP can only be made once you have left Australia, so every claim is
          made from overseas. Where you are living now has no bearing on it.
        </p>
        <p style={BODY}>
          One thing to settle before you close your Australian bank account: not every fund transfers to
          an overseas account, and some issue a cheque, which is slow to bank. Whether your own country
          taxes the payment is a question for an adviser there.
        </p>
      </Answer>

      {/* ── 7 ──────────────────────────────────────────────────────────────── */}
      <Answer id="dasp-vs-leaving" heading="Is it better to claim your super or leave it in Australia?">
        <p style={BODY}>
          For almost every working holiday maker, claiming is better. A balance left behind receives no
          contributions but keeps paying admin fees and often insurance premiums you cannot use from
          overseas. Whatever survives eventually lands with the ATO, uninvested.
        </p>
        <p style={BODY}>
          The argument for leaving it only holds if you intend to return to Australia to live and work
          permanently. Waiting does not reduce the 65%.{' '}
          <Link href="/blog/dasp-vs-leaving-super-in-australia-pros-cons" className="font-semibold"
            style={{ color: '#0B5240', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            The full comparison is here
          </Link>.
        </p>
      </Answer>

      {/* ── 8 ──────────────────────────────────────────────────────────────── */}
      <Answer id="while-in-australia" heading="Can you claim your super while you are still in Australia?" tint>
        <p style={BODY}>
          No. Super is preserved while you hold a valid visa and are in the country, with no early release
          on a working holiday visa for leaving a job or for hardship.
        </p>
        <p style={BODY}>
          If you are flying home well before your visa runs out, the Department of Home Affairs can cancel
          the remaining visa once you have left, which usually brings the claim forward.
        </p>
      </Answer>

      {/* ── 9 ──────────────────────────────────────────────────────────────── */}
      <Answer id="never-claimed" heading="What happens to your super if you never claim it?">
        <p style={BODY}>
          It is not lost. About six months after your visa expires and you have left, a fund must transfer
          an unclaimed balance to the ATO, where it sits in your name, fee free. A claim years later is
          still a claim, at the same 65% rate.
        </p>
        <p style={BODY}>
          What is lost is whatever fees and insurance premiums took out of the balance before it
          transferred. On a small balance that can be a meaningful share.
        </p>
      </Answer>

      {/* ── 10. The sales section, deliberately last. ──────────────────────── */}
      <Answer id="with-us" heading="Claim it yourself, or have us do it" tint>
        <p style={BODY}>
          You can do it yourself. What you would be handing over is the search across every account linked
          to your tax file number, ATO held super included, certified copies arranged from overseas, a
          separate application to each fund, and the chasing when one goes quiet.
        </p>

        <div className="rounded-2xl" style={{ padding: '20px', background: '#fff', border: '1.5px solid #C8EAE0', margin: '22px 0 20px' }}>
          <p className="font-semibold text-ink" style={{ fontSize: '16px', lineHeight: 1.5, marginBottom: '8px' }}>
            We start with a Tax Assessment that reviews your full situation and shows you your estimated outcome, so you know exactly where you stand before deciding whether to go ahead and lodge.
          </p>
          <p style={{ fontSize: '14px', lineHeight: 1.65, color: '#4C6459' }}>
            Reviewed and signed off by a registered tax agent before it is lodged
            with the ATO.
          </p>
        </div>

        <WaLink href={WA} position="section" topic="super" lang="en"
          className="btn-primary flex justify-center"
          style={{ minHeight: '54px', width: '100%', maxWidth: '360px', fontSize: '15px', borderRadius: '100px' }}>
          Message us on WhatsApp
        </WaLink>
        <p style={{ fontSize: '13px', color: '#4C6459', marginTop: '10px' }}>
          Replies in about an hour.
        </p>
      </Answer>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#fff' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[680px] mx-auto">
            <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '18px' }}>
              Other questions people ask about DASP
            </h2>
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── RELATED GUIDES. The narrow guides that already rank, pointed at  */}
      {/*    from the hub rather than competing with it. ───────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[900px] mx-auto">
          <h2 className="font-serif font-black text-ink" style={{ ...H2, marginBottom: '16px' }}>
            Go deeper on one part of the claim
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/blog/how-long-does-dasp-take', label: 'How long a DASP takes, stage by stage' },
              { href: '/blog/dasp-documents-required', label: 'The documents a DASP claim needs' },
              { href: '/blog/dasp-tax-rate-65-percent-explained', label: 'Why DASP is taxed at 65%, and what is left' },
              { href: '/blog/dasp-rejected-what-to-do', label: 'What to do if your DASP claim is rejected' },
              { href: '/blog/super-multiple-funds-consolidation', label: 'Claiming when your super sits in several funds' },
              { href: '/blog/dasp-vs-leaving-super-in-australia-pros-cons', label: 'Claim now or leave it invested: the comparison' },
            ].map(g => (
              <Link key={g.href} href={g.href}
                className="block rounded-xl border border-ink/10 transition-colors hover:border-forest-500 hover:text-forest-500"
                style={{ padding: '16px', fontSize: '14px', lineHeight: 1.5, color: '#080F0D', minHeight: '44px' }}>
                {g.label}
              </Link>
            ))}
          </div>
        </div>
        </div>
      </section>

      <NextStep
        eyebrow="What is next"
        heading="The 2% Medicare levy is the other one nobody claims"
        body="Most 417 and 462 holders never owed it. It comes off with a certificate almost nobody applies for."
        cta="Read about the exemption"
        href="/medicare"
      />

      <MobileCta href={WA} lang="en" topic="super" />
    </>
  )
}

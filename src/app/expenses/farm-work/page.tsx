import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Farm Work & Fruit Picking Tax Deductions Australia',
  description: 'What working holiday makers can claim on farm and fruit-picking work - sun protection, boots, travel between sites - plus how seasonal, piece-rate and multi-employer pay works at tax time, and how farm work connects to your visa.',
  keywords: [
    'farm work tax deductions',
    'fruit picking tax return',
    'backpacker farm work tax',
    'farm work tax deductions Australia',
    'seasonal farm work tax Australia',
    'piece rate tax Australia',
    'fruit picking deductions ATO',
    'multiple farm employers tax',
    'working holiday maker farm employer',
    'regional work visa tax',
    '417 second year farm work',
    'harvest trail tax return',
    'itinerant worker car expenses',
    'travel between farms tax deduction',
    'specified work tax Australia',
  ],
  alternates: {
    canonical: `${SITE_URL}/expenses/farm-work`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/farm-work`,
      'de': `${SITE_URL}/de/expenses/farm-work`,
      'ja': `${SITE_URL}/ja/expenses/farm-work`,
      'x-default': `${SITE_URL}/expenses/farm-work`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/expenses/farm-work`,
    siteName: 'Working Holiday Tax',
    title: 'Farm Work & Fruit Picking Tax Deductions Australia',
    description: 'Sun protection, boots and travel between sites are deductible; ordinary clothing and your first trip of the day are not. What farm and fruit-picking work means for your tax return, and for your visa.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Farm Work & Fruit Picking Tax Deductions Australia',
    description: 'What backpackers can claim on farm and fruit-picking work, and how it connects to your working holiday visa.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const WHY_DIFFERENT = [
  {
    t: 'Seasonal',
    d: 'Harvests run for weeks at a time, not the whole year. Many pickers move from region to region, or crop to crop, following the season rather than staying in one job.',
  },
  {
    t: 'Itinerant',
    d: 'It is common to work across several blocks, sheds or properties, sometimes more than one in the same day, with no single fixed workplace to speak of.',
  },
  {
    t: 'Piece-rate pay',
    d: 'Pay is often worked out per bin, bucket, tray or kilo picked, rather than a flat hourly rate - still wages, just calculated differently.',
  },
  {
    t: 'Multiple employers',
    d: 'A season can mean a handful of different farms, contractors or labour-hire companies, each one a separate employer for tax purposes.',
  },
]

const faqs = [
  {
    question: 'I worked on three different farms this year - do I need separate tax returns?',
    answer: 'No. One tax return covers the full financial year, from 1 July to 30 June, no matter how many farms or employers you worked for during that time. Every employer reports your wages and tax withheld separately to the ATO, and all of it is combined into the one return. The main risk with several short jobs is forgetting one, especially a quick one-week stint, which is exactly the kind of thing checked before a return is lodged under the supervision of a registered tax agent.',
  },
  {
    question: 'Can I claim fuel or car costs driving between farms?',
    answer: 'Yes, if you are travelling between two different farms or work sites on the same working day, since farm work is often treated as itinerant with no single fixed workplace. What is not deductible is the very first trip of the day, from home to the first farm you go to, which counts as ordinary commuting the same as it would for any job. The deduction itself is worked out using the cents-per-kilometre method or a logbook, covered on our expenses page.',
  },
  {
    question: 'Does piece-rate pay get taxed differently?',
    answer: 'No. However your pay is worked out, per bin, per bucket, per tray, or per hour, it is all just wages once it reaches your bank account. Your employer reports the total to the ATO and withholds tax from it under the working holiday maker rates, and it gets added into your total income like any other pay when you lodge your return.',
  },
  {
    question: 'Does farm work count toward a second (or third) working holiday visa?',
    answer: 'For many working holiday makers, yes - completing specified, eligible work in regional Australia is one of the main ways to qualify for a further 417 or 462 visa, and farm work is one of the most common ways people complete it. Exactly which jobs, regions and time periods count is set by the Department of Home Affairs, not by us, and the rules have changed before, so check the current official guidance or speak with a registered migration agent before relying on a particular job counting. What we can help with is making sure the income from that work is taxed and reported correctly.',
  },
  {
    question: 'How do I know if a farm employer is registered as a working holiday maker employer?',
    answer: 'Ask when you start - it is a reasonable question and most farms are used to hearing it. A registered employer withholds at the correct 15% working holiday maker rate from your first dollar, while an unregistered one is required to withhold at the higher foreign resident rate instead, which starts above 30%. Either way any excess comes back once you lodge your tax return, but it changes how much lands in your account each week through the season.',
  },
  {
    question: 'I do not have payslips from every farm I worked at. Is that a problem?',
    answer: 'Usually not. Most employers report your pay to the ATO through Single Touch Payroll, so it shows up as an income statement even if you never received or kept a payslip. It still helps to keep a simple note of which farm, what dates, and roughly what you were paid as you go, particularly across a season with several short jobs, so there is something to check the numbers against later.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Expenses', item: `${SITE_URL}/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Farm Work', item: `${SITE_URL}/expenses/farm-work` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Farm Work & Fruit Picking Tax Deductions Australia',
  description: 'What working holiday makers can claim on farm and fruit-picking work, how seasonal, piece-rate and multi-employer pay works at tax time, and how farm work connects to a further working holiday visa.',
  url: `${SITE_URL}/expenses/farm-work`,
  inLanguage: 'en-AU',
  author: { '@type': 'Organization', name: 'Working Holiday Tax' },
  publisher: { '@type': 'Organization', name: 'Working Holiday Tax', url: SITE_URL },
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

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/expenses/farm-work#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/expenses/farm-work`,
}

export default function FarmWorkExpensesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />

      <main style={{ background: '#fff', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden pt-[68px]" style={{background:'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)'}}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-5 lg:pt-9 lg:pb-7">

            <nav aria-label="Breadcrumb" className="mb-4 lg:mb-5">
              <ol className="flex items-center gap-2" style={{ fontSize: '12.5px', color: '#587066' }}>
                <li><Link href="/" style={{ color: '#587066' }}>Home</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li><Link href="/expenses" style={{ color: '#587066' }}>Expenses</Link></li>
                <li aria-hidden="true" style={{ color: '#CDE3DB' }}>/</li>
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Farm Work</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '26ch' }}>
                Farm work tax deductions, and what counts toward your <span style={{ color: '#0B5240' }}>visa</span>
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '54ch' }}>
                Fruit picking and farm work come with tax questions few other backpacker jobs do - seasonal work, piece-rate pay, several employers in one year - plus, for many working holiday makers, a real connection to their visa.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHY FARM WORK IS DIFFERENT ──────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Why farm work gets taxed a little differently
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                Four things about farm and fruit-picking work that come up far less in most other backpacker jobs.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
              {WHY_DIFFERENT.map((c, i) => (
                <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#F7FBF9', border: '1.5px solid #E2EFE9' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px' }}>{c.t}</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#587066', lineHeight: 1.7 }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE VISA CONNECTION (unique hook for this page) ─────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <span className="section-label">The visa connection</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(21px,2.6vw,30px)', lineHeight: 1.15, letterSpacing: '-0.025em', margin: '10px 0 18px' }}>
              Farm work and a further working holiday visa
            </h2>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Farm work is tied to something no other backpacker job really is: your visa itself. Completing specified, eligible work in regional Australia is one of the main ways working holiday makers on a 417 or 462 visa become eligible to apply for a further working holiday visa, and a large share of that eligible work happens on farms, orchards, and in agriculture and horticulture more broadly. It is a big part of why so many working holiday makers end up doing at least one farm job during their time in Australia.
            </p>

            <div className="rounded-2xl" style={{ padding: '20px 22px', background: '#FDF0D5', border: '1.5px solid #F9D88A', borderLeft: '4px solid #E9A020', margin: '22px 0' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                This is an immigration matter, not a tax one.
              </p>
              <p className="font-light" style={{ fontSize: '13px', color: '#587066', lineHeight: 1.75 }}>
                Exactly which industries, which postcodes or regions, and which date ranges count as eligible work, and how many days you need, are set by the Department of Home Affairs, not by tax law, and the rules have changed more than once over the years. Keeping track of that is not our area of expertise as a tax agent. Before you rely on a particular job counting toward your visa, check the current official guidance on the{' '}
                <a href="https://immi.homeaffairs.gov.au/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: '#0B5240' }}>Department of Home Affairs website</a>
                {' '}or speak with a registered migration agent.
              </p>
            </div>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              What we can help with is the tax side of that work. Whatever ends up counting for your visa, the income you earn from it still needs to be reported and taxed correctly, and keeping a simple record of which farm, which dates, and what you earned is useful for your tax return either way - and it often doubles as a handy record if you ever need to show what work you did and when.
            </p>
          </div>
        </section>

        {/* ── SEASONAL, ITINERANT, PIECE-RATE: THE TAX DETAIL ─────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Seasonal, itinerant, and paid by the bin
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                None of this changes the basics of how Australian tax works, but it does change how easy it is to get right.
              </p>
            </div>

            <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              A new TFN declaration for every farm
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '24px' }}>
              Each new farm, contractor or labour-hire company you work for is a separate employer, and every new employer needs its own Tax File Number Declaration form - your TFN does not carry across automatically just because you filled one in at the last place. On every one of these forms, a working holiday maker should select working holiday maker for residency and no to the tax-free threshold question; that concession belongs to Australian residents and never applies to income taxed under the working holiday maker rates, no matter how many employers you have during the year. Filling in one of these forms on autopilot, ticking yes to the threshold, or selecting the wrong residency box out of habit, is a genuinely common way an unexpected tax bill turns up, and it is an easier mistake to make when you are repeating the process at several farms in one season. See our <Link href="/tfn" style={{ color: '#0B5240', textDecoration: 'underline' }}>TFN page</Link> for more on getting the declaration right each time.
            </p>

            <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Piece-rate pay is still just wages
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '24px' }}>
              Being paid per bin, per bucket, per tray or per kilo instead of by the hour does not change how the money is taxed. Whatever the total comes to, your employer reports it to the ATO and withholds tax from it the same way as an hourly wage, under the working holiday maker rates, and it gets added into your income like any other pay when you lodge your return. The real difference piece-rate work creates is a record-keeping one: with pay that varies day to day and a season spent moving between farms, it is worth keeping your own simple note of which farm, what dates, and roughly what you were paid, so you have something to check your income statements against later.
            </p>

            <h3 className="font-serif font-bold text-ink" style={{ fontSize: '17px', letterSpacing: '-0.01em', marginBottom: '8px' }}>
              Ask whether the farm is a registered WHM employer
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '8px' }}>
              Whether an employer is registered with the ATO as an employer of working holiday makers changes how much tax comes out of your pay through the season. Registered employers withhold at the correct 15% working holiday maker rate from your first dollar; unregistered ones are required to apply the higher foreign resident rate instead, which starts above 30%. Either way you are not permanently out of pocket, since any excess withheld comes back once you lodge your tax return, but it makes a real difference to what actually lands in your account each week, so it is worth asking each new farm employer directly.
            </p>

            <div className="taxres-savings-box" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div>
                <p className="taxres-savings-heading">Keep a simple record as you go</p>
                <p className="taxres-savings-body">
                  A running note with the farm name, the dates you worked, and roughly what you were paid at each one takes a minute to update and can save a lot of hassle later - whether you are checking your income statements add up, chasing a payslip that never arrived, or just trying to remember which farms you worked at by the time tax season comes around.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CANNOT CLAIM ──────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '20px' }}>
          <div className="max-w-[1040px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                What you can (and cannot) claim
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                The same two ATO tests apply here as for any occupation: you have to have paid for it yourself without being reimbursed, and it has to be genuinely related to earning your income rather than something you would have bought anyway.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6" style={{ marginBottom: '20px', alignItems: 'stretch' }}>

              <div className="exp-card">
                <p className="exp-card-label exp-card-label-yes">✓ You may be able to claim</p>

                <div style={{ marginBottom: '18px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>Sun protection</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    If your job has you outdoors for all or part of the day, picking, pruning, or packing in an open shed, a wide-brim hat, sunscreen and sunglasses are deductible. The ATO accepts these specifically because of the direct, ongoing UV exposure the work creates, which is a different situation to buying sunscreen for a weekend off.
                  </p>
                </div>

                <div style={{ marginBottom: '18px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>Protective gloves and boots</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    Picking gloves, gumboots or other protective boots that guard against the specific hazards of the job, thorns, chemicals, mud, handling produce, uneven ground, are deductible as protective items your work requires.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>Travel between farms or sites</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    Moving between different blocks, sheds or properties during the same working day is deductible, because farm work is often itinerant and there is rarely one single fixed workplace. This is worked out using the cents-per-kilometre method or a logbook; see our <Link href="/expenses" style={{ color: '#0B5240', textDecoration: 'underline' }}>expenses guide</Link> for how each one works.
                  </p>
                </div>
              </div>

              <div className="exp-card">
                <p className="exp-card-label exp-card-label-no">✕ Usually not deductible</p>

                <div style={{ marginBottom: '18px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>General clothing</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    Ordinary clothing, jeans, t-shirts, a jumper for cold morning starts, is never deductible, even if it gets torn, stained or worn out picking fruit or handling produce all day. The ATO treats normal wear and tear on everyday clothes as a private expense, the same as it would for any other job; there is no farm-work exception just because the clothes happen to get dirty.
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px', letterSpacing: '-0.01em' }}>The first trip of the day</p>
                  <p className="font-light" style={{ fontSize: '12.5px', color: '#2A3C34', lineHeight: 1.7 }}>
                    The drive from home to the first farm or site you go to each day is ordinary commuting, no matter how far it is or how early you leave, and that is true for every occupation, not just farm work. Only the travel between sites once you are already at work is deductible, never the trip that gets you there in the first place.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── WHAT'S NEXT (internal links) ─────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <span className="section-label center">What is next?</span>
            <h2 className="font-serif font-black text-ink"
              style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
              Once you know what to claim
            </h2>
            <p className="font-light text-muted max-w-[640px] mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '20px' }}>
              Here is where most farm and seasonal workers go next.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[900px] mx-auto">
              <Link href="/expenses" className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                See deductions for every other backpacker job
              </Link>
              <Link href="/tfn" className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                Get a TFN sorted for a new farm job
              </Link>
              <Link href="/tax-return" className="block rounded-xl border border-ink/10 p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                Lodge one tax return for the whole season
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQs</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Farm work tax questions
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

        {/* ── DISCLAIMER ───────────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '8px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7 }}>
              This is general information, not personal tax advice, and it is not immigration or migration advice. Everyone&apos;s farm season looks a little different - which employers, which regions, how the visa side fits in. When you lodge with us, your return is prepared under the supervision of a registered tax agent, who will go through your specific employers and circumstances to make sure you claim everything you&apos;re entitled to, and nothing you&apos;re not.
            </p>
          </div>
        </section>

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="Ready when you are"
          heading="Get every farm and every payslip into one return"
          body="Whether it was one long harvest or five short jobs across three states, we pull together every employer's income statement and check your withholding along the way."
          cta="Start your tax return →"
          href="/tax-form"
        />

      </main>
      <MobileCta href="/tax-form" lang="en" />
    </>
  )
}

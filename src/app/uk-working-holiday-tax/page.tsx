import type { Metadata } from 'next'
import Link from 'next/link'
import { GoogleRating } from '@/components/ui/GoogleRating'
import { NextStep } from '@/components/ui/NextStep'
import { WA_URL, SITE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Australian Tax for UK Working Holiday Makers | 417 Visa, Super & Medicare',
  description: 'British passport holders get three years in Australia, Medicare access and a possible Addy refund. The rules are not the same as for other backpackers. We handle the tax return, super and Medicare side.',
  keywords: [
    'australian tax for uk citizens working holiday',
    'uk working holiday visa australia tax',
    'tax back australia for brits',
    'british backpacker tax refund australia',
    'do uk citizens pay the medicare levy in australia',
    'medicare levy uk working holiday',
    'reciprocal health care agreement australia uk',
    'addy v commissioner of taxation refund',
    'backpacker tax uk citizens claim back',
    'uk working holiday visa 3 years tax',
    'working holiday visa age 35 uk',
    'superannuation refund uk working holiday',
    'australian tax year vs uk tax year',
    'claim australian tax back from the uk',
  ],
  alternates: {
    canonical: '/uk-working-holiday-tax',
    languages: { 'en-AU': '/uk-working-holiday-tax', 'x-default': '/uk-working-holiday-tax' },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Australian tax for UK working holiday makers' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/uk-working-holiday-tax`,
    siteName: 'Working Holiday Tax',
    title: 'Australian Tax for UK Working Holiday Makers',
    description: 'Three years, Medicare access and the Addy ruling. Why British passport holders are taxed differently in Australia.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Australian Tax for UK Working Holiday Makers',
    description: 'Three years, Medicare access and the Addy ruling. The British rules are different.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const faqs = [
  {
    question: 'Do UK citizens pay the Medicare levy in Australia?',
    answer: 'Often yes, and this is where British travellers differ from most other backpackers. The UK has a Reciprocal Health Care Agreement with Australia, so UK passport holders can enrol in Medicare. Being entitled to Medicare generally removes the levy exemption that other working holiday makers claim. Whether you actually pay depends on your residency for tax purposes, so it needs to be checked case by case rather than assumed.',
  },
  {
    question: 'How many working holiday visas can a UK passport holder get?',
    answer: 'Up to three. For applications lodged on or after 1 July 2024, UK passport holders can apply up to and including age 35, and are not required to complete specified regional work to be granted a second or third visa. That is up to three years in Australia.',
  },
  {
    question: 'What is the Addy ruling and does it apply to me?',
    answer: 'Catherine Addy was a British working holiday maker who challenged the backpacker tax and won in the High Court in November 2021. The court found the tax breached the non-discrimination article of the UK-Australia tax treaty. The ATO applies the decision to working holiday makers who were residents of Australia for tax purposes and who are nationals of the UK, Chile, Finland, Germany, Japan, Norway or Turkey. Residency is the deciding factor and most travellers do not meet it, but people who settled in one place for a long stretch sometimes do.',
  },
  {
    question: 'What tax rate do I pay on a 417 visa?',
    answer: 'Working holiday makers are taxed at 15% on the first $45,000 for 2025-26, then 30 cents in the dollar to $135,000, 37 cents to $190,000 and 45 cents above that. This applies whether or not you are a resident for tax purposes. One thing to watch: your employer must be registered with the ATO as an employer of working holiday makers for the 15% rate to apply. If they are not registered they must withhold 30% from your first dollar.',
  },
  {
    question: 'I stayed three years. Do I lodge three tax returns?',
    answer: 'Yes. The Australian tax year runs 1 July to 30 June, so a three year stay usually spans three or four separate tax years and each one needs its own return. If you left without lodging, those years are still open and we can go back and lodge them.',
  },
  {
    question: 'Do I have to tell HMRC about my Australian income?',
    answer: 'It depends on your UK residence position for the years involved, which is a separate question from your Australian one. The two tax years do not line up either, since the UK year runs 6 April to 5 April and the Australian year 1 July to 30 June. We deal with the Australian side and will tell you plainly where the UK side needs its own advice.',
  },
  {
    question: 'How much superannuation will I have after three years?',
    answer: 'Your employer pays 12% of your ordinary earnings into a super fund on top of your wages, never deducted from them. Over three years of steady work that builds into a meaningful balance. When you leave and your visa ceases you can claim it as a Departing Australia Superannuation Payment, and 65% is withheld from a working holiday maker claim. On a $9,000 balance that leaves roughly $3,150.',
  },
  {
    question: 'Can I still claim after I have gone home to the UK?',
    answer: 'Yes. Both the tax return and the super claim can be handled from anywhere, and the super claim can only be made after you have left and your visa has ceased. There is no deadline on the super claim, and the five year limit you may have read about does not exist.',
  },
]

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
    { '@type': 'ListItem', position: 2, name: 'UK working holiday tax', item: `${SITE_URL}/uk-working-holiday-tax` },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}/uk-working-holiday-tax#service`,
  name: 'Australian Tax Service for UK Working Holiday Makers',
  serviceType: 'Tax return, superannuation and Medicare levy handling for UK passport holders on 417 visas',
  description: 'Australian tax returns, DASP superannuation claims and Medicare levy treatment for British working holiday makers, including multi year stays under the UK-Australia free trade arrangements.',
  provider: { '@id': `${SITE_URL}/#business` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  audience: { '@type': 'Audience', audienceType: 'UK passport holders on a Working Holiday visa (Subclass 417)' },
  inLanguage: 'en-AU',
}

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/uk-working-holiday-tax#webpage`,
  speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.hero-sub'] },
  url: `${SITE_URL}/uk-working-holiday-tax`,
}

const rateRows = [
  ['0 - $45,000', '15c for each $1'],
  ['$45,001 - $135,000', '$6,750 plus 30c for each $1 over $45,000'],
  ['$135,001 - $190,000', '$33,750 plus 37c for each $1 over $135,000'],
  ['$190,001 and over', '$54,100 plus 45c for each $1 over $190,000'],
]

export default function UKWorkingHolidayTaxPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px]" style={{ background: 'linear-gradient(160deg,#fff 0%,#F7FBF9 100%)' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-14 lg:pb-14">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">UK working holiday tax</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[720px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>
                UK passport holders
              </span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px,3.2vw,44px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '10px' }}>
              <span className="hidden lg:block">
                <span style={{ display: 'block', whiteSpace: 'nowrap' }}>British? Your Australian tax</span>
                <span style={{ display: 'block', whiteSpace: 'nowrap', color: '#0B5240' }}>does not work like everyone else&apos;s.</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display: 'block', fontSize: '22px' }}>British? Your Australian tax</span>
                <span style={{ display: 'block', color: '#0B5240', fontSize: '22px' }}>does not work like everyone else&apos;s.</span>
              </span>
            </h1>

            <p className="hero-sub font-semibold text-ink" style={{ fontSize: 'clamp(14px,1.5vw,17px)', letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.4 }}>
              Three years instead of one, Medicare access other backpackers do not get, and a High Court ruling brought by a British traveller. Most guides treat every working holiday maker the same. You are not the same.
            </p>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.65, color: 'rgba(10,15,13,0.58)', maxWidth: '46ch', marginBottom: 0 }}>
              We are an Australian tax practice working only with temporary visa holders. Tell us your years and we will tell you where you stand.
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4" style={{ marginTop: '24px', marginBottom: '20px', maxWidth: '480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex justify-center"
                style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', flex: '1', width: '100%' }}>
                Check what you are owed →
              </a>
              <Link href="/calculator" className="inline-flex btn-ghost-dark justify-center"
                style={{ height: '52px', padding: '0 24px', fontSize: '15px', flex: '1', width: '100%' }}>
                Free estimate →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['Trusted by backpackers', <GoogleRating key="rating" variant="pill" lang="en" />, 'Worldwide reach', '~1 hour response time'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5" /><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOUR DIFFERENCES ──────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Where you are from changes what you get back</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px' }}>
              Four things that are different for a British passport
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 reveal delay-1">
            {[
              { t: 'Three years, not one', d: 'Up to three working holiday visas, up to age 35, with no regional work required. Three years usually means three or four Australian tax years.' },
              { t: 'You can have Medicare', d: 'The UK is one of eleven countries with a Reciprocal Health Care Agreement. That changes the levy question entirely and most sites get it backwards.' },
              { t: 'The Addy ruling is yours', d: 'The case that overturned the backpacker tax was brought by a British working holiday maker and the UK is on the ATO list.' },
              { t: 'Two tax years to juggle', d: 'The UK runs 6 April to 5 April, Australia runs 1 July to 30 June. They never line up and people miss returns because of it.' },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding: '18px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
                <p className="text-[14px] font-semibold text-ink" style={{ marginBottom: '6px' }}>{c.t}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THREE YEARS ───────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[760px] mx-auto reveal">
            <span className="section-label">Three years, three tax returns</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '14px' }}>
              The free trade agreement changed the maths
            </h2>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              For applications lodged on or after 1 July 2024, UK passport holders can apply for a Working Holiday visa up to and including age 35, and can be granted up to three of them without completing any specified regional work. Nobody else gets that.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              For tax it means three things. Your stay will usually cross three or four Australian tax years, and each one needs its own return. Your superannuation builds for three years rather than one, so the amount waiting for you at the end is several times larger. And people arriving in their thirties tend to earn more, which means more of them pass $45,000 and move into the second bracket where the rate steps up to 30 cents.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '20px' }}>
              The most common problem we see is someone who lodged in their first year, then stopped. Those later years stay open, and they are usually the ones with the money in them.
            </p>

            <div className="bg-white rounded-2xl overflow-hidden" style={{ border: '1px solid #C8EAE0' }}>
              <div style={{ padding: '14px 18px', borderBottom: '1px solid #EAF6F1' }}>
                <p className="text-[13px] font-semibold text-ink">Working holiday maker rates 2025-26</p>
                <p className="text-[12px] font-light text-muted">Applies whether or not you are a resident for tax purposes</p>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {rateRows.map((r, i) => (
                    <tr key={i} style={{ borderTop: i ? '1px solid #F0F5F3' : 'none' }}>
                      <td className="text-[12.5px] font-semibold text-ink" style={{ padding: '10px 18px', width: '38%' }}>{r[0]}</td>
                      <td className="text-[12.5px] font-light text-muted" style={{ padding: '10px 18px' }}>{r[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[12.5px] font-light text-muted leading-[1.7]" style={{ marginTop: '10px' }}>
              Your employer has to be registered with the ATO as an employer of working holiday makers for the 15% to apply. If they are not registered they must withhold 30% from your first dollar. Full breakdown on our <Link href="/tax-return" className="underline hover:text-forest-500">tax return page</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── MEDICARE, THE REVERSAL ────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[760px] mx-auto reveal">
            <span className="section-label">Medicare works the other way round for you</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '14px' }}>
              Do UK citizens pay the Medicare levy?
            </h2>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              You will read everywhere that working holiday makers are exempt from the 2% Medicare levy. For a German or Japanese traveller that is usually right. For you it usually is not.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              The UK is one of eleven countries with a Reciprocal Health Care Agreement with Australia, so a British visitor can enrol in Medicare and is treated in a public hospital. Being entitled to Medicare is exactly what removes the exemption other backpackers claim. Copying their advice and claiming an exemption you are not entitled to is not a small paperwork error.
            </p>
            <div className="rounded-2xl" style={{ background: '#F5F9F7', border: '1px solid #C8EAE0', padding: '18px', marginBottom: '12px' }}>
              <p className="text-[13px] font-semibold text-ink" style={{ marginBottom: '6px' }}>The part that actually decides it</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.7]">
                The levy only applies to residents for tax purposes in the first place. A British traveller moving around the country is often a foreign resident and pays no levy regardless. A British traveller who settled in one city for two years is often a resident, is entitled to Medicare, and does pay it. Same passport, opposite answers, and the difference is worth about $500 on $25,000 earned.
              </p>
            </div>
            <p className="text-[14px] font-light text-muted leading-[1.75]">
              This is one of the reasons we look at British files individually rather than applying a template. More on how the levy works on our <Link href="/medicare" className="underline hover:text-forest-500">Medicare page</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── ADDY ──────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[760px] mx-auto reveal">
            <span className="section-label">Addy v Commissioner of Taxation</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '14px' }}>
              A British backpacker took this to the High Court and won
            </h2>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              Catherine Addy came to Australia on a working holiday visa, worked in Sydney, and was taxed under the backpacker rules. In November 2021 the High Court held that taxing her more heavily than an Australian doing the same work in the same place breached the non-discrimination article of the UK-Australia tax treaty. She was entitled to be taxed at resident rates.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              The ATO applies the decision to working holiday makers who were residents of Australia for tax purposes and who are nationals of the UK, Chile, Finland, Germany, Japan, Norway or Turkey. Residency is the hurdle, and most travellers do not clear it. People who stayed in one place and built a life there sometimes do, and under the new three year arrangements more British travellers will fall into that group than before.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]">
              Where it applies it is not a small amount, because it restores the tax free threshold and the lower resident rates for those years. It is also possible to go back and amend previous returns within the standard amendment window. If you were here for more than a year and stayed put, it is worth having someone look at it properly rather than assuming it does not apply to you.
            </p>
          </div>
        </div>
      </section>

      {/* ── SUPER ─────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[760px] mx-auto reveal">
            <span className="section-label">Superannuation after a long stay</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '14px' }}>
              Three years of super is not three times the hassle, it is three times the money
            </h2>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              Your employer pays 12% of your ordinary earnings into a superannuation fund on top of your wages. It is never taken out of your pay, and it is owed from the first dollar you earn, with no minimum monthly amount. Since 1 July 2026 it also has to be paid with every pay run and reach the fund within seven business days, which means an employer skipping it shows up in weeks rather than after a quarter.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              When you leave Australia and your visa ceases you claim it back as a Departing Australia Superannuation Payment. 65% is withheld from a working holiday maker claim, so on a $9,000 balance built over three years you receive roughly $3,150. It is worth claiming, and a lot of people do not because they have heard the 65% figure and assumed there was nothing left.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]">
              After three years and several jobs you will often have several fund accounts, each charging its own fees. There is no deadline on the claim, and the five year limit you may have read about does not exist. More on our <Link href="/superannuation" className="underline hover:text-forest-500">superannuation page</Link>, or get a figure from the <Link href="/calculator" className="underline hover:text-forest-500">free calculator</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* ── TWO TAX YEARS ─────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[760px] mx-auto reveal">
            <span className="section-label">The two tax years do not line up</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '14px' }}>
              6 April in Britain, 1 July in Australia
            </h2>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              The UK tax year runs 6 April to 5 April. The Australian year runs 1 July to 30 June. Nothing about them matches, and it catches people out in both directions. Arriving in February means your first Australian year is only a few months long, which changes what your refund looks like. Leaving in September means you have an Australian year that is still open after you have gone home.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]" style={{ marginBottom: '12px' }}>
              Australian returns can be lodged from 1 July, the deadline is 31 October, and going through a tax agent usually extends that to 15 May the following year. None of it requires you to be in the country.
            </p>
            <p className="text-[14px] font-light text-muted leading-[1.75]">
              Whether your Australian income also needs reporting to HMRC depends on your UK residence position for the years involved, which is a separate question with its own rules. We handle the Australian side and will say plainly when something belongs to a UK adviser rather than guessing at it.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '28px' }}>
            <span className="section-label center">FAQs</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '26ch', marginTop: '8px', textWrap: 'balance' }}>
              Questions British travellers ask us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal delay-1 max-w-[1000px] mx-auto">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding: '16px', border: '1px solid #C8EAE0', boxShadow: '0 1px 2px rgba(0,0,0,.02)' }}>
                <p className="text-[13px] font-semibold text-ink" style={{ marginBottom: '6px' }}>{item.question}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED ───────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#F5F9F7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-6">
            <span className="section-label center">Learn more</span>
            <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Related pages and guides
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[900px] mx-auto">
            {[
              { href: '/tax-return', label: 'Working holiday tax return: rates and how it works' },
              { href: '/superannuation', label: 'Superannuation and DASP for working holiday makers' },
              { href: '/medicare', label: 'Medicare levy and the exemption explained' },
              { href: '/tfn', label: 'Tax File Number: why 45% is being withheld' },
              { href: '/calculator', label: 'Free refund and super calculator, no signup' },
            ].map((g) => (
              <Link key={g.href} href={g.href}
                className="block rounded-xl border border-ink/10 bg-white p-4 text-[13.5px] font-light text-ink leading-[1.5] transition-colors hover:border-forest-500 hover:text-forest-500">
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What is next?"
        heading="Tell us your years and we will tell you where you stand"
        body="Whether you are still here or went home three years ago, send us the years you worked. We will come back with what is open, what is claimable and what it is likely to be worth."
        cta="Start with a message"
        href={WA_URL}
        external
        trustLine="Working holiday tax specialists. No obligation."
      />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { RelatedServices } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Labourer Tax Deductions Australia: Warehouse & Labour Hire Work',
  description: 'What backpackers working through labour hire and staffing agencies can claim on tax - warehouses, removalists, landscaping, factory and event work - plus what changes once you are registered with more than one agency at once.',
  keywords: [
    'labour hire tax deductions',
    'warehouse job tax deductions Australia',
    'removalist tax deductions backpacker',
    'labour hire agency tax working holiday',
    'staffing agency tax deductions Australia',
    'general labourer tax deductions Australia',
    'multiple employers tax free threshold Australia',
    'itinerant worker travel deduction ATO',
    'backpacker warehouse job tax',
    'WHV labour hire tax return',
  ],
  alternates: {
    canonical: `${SITE_URL}/expenses/labouring`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/labouring`,
      'de': `${SITE_URL}/de/expenses/labouring`,
      'ja': `${SITE_URL}/ja/expenses/labouring`,
      'x-default': `${SITE_URL}/expenses/labouring`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/expenses/labouring`,
    siteName: 'Working Holiday Tax',
    title: 'Labourer Tax Deductions Australia: Warehouse & Labour Hire Work',
    description: 'What backpackers working through labour hire and staffing agencies can claim on tax, and what changes once more than one agency is involved.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Labourer Tax Deductions Australia: Warehouse & Labour Hire Work',
    description: 'What backpackers working through labour hire and staffing agencies can claim on tax, and what changes once more than one agency is involved.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const CAN_CLAIM = [
  {
    title: 'Protective clothing and safety gear',
    body: "Steel-capped boots, gloves, hi-vis clothing and safety glasses are deductible when the specific host role requires them. The test the ATO applies is whether the item protects you from an identifiable risk of injury on that particular job, not how physical the work feels in general, so what you can claim follows the actual role you were doing that day, whether that's a warehouse, a landscaping crew, or an event bump-in.",
  },
  {
    title: 'Licences and tickets you renew, not first obtain',
    body: "If a role calls for a forklift licence, an EWP (elevated work platform) ticket, or a similar operating ticket, and you already hold it and use it for the job, the cost of renewing that ticket is deductible. Getting the licence for the very first time isn't, because that cost is what makes you eligible to apply for the role in the first place, not a cost of doing a job you already have. It's the same principle as a first driver's licence, or a first White Card for someone starting out in construction.",
  },
  {
    title: 'Tools and equipment you buy yourself',
    body: "Some labour hire roles expect you to bring basic tools of your own. Anything you buy and aren't reimbursed for is deductible: items costing $300 or less can be claimed in full in the year you buy them, while anything over $300 is depreciated, claimed gradually over its effective life, instead of all at once.",
  },
]

const CANNOT_CLAIM_TEXT = "A few things trip people up regardless of which agency or site you're working through that week. Ordinary clothing - plain work pants, a t-shirt, or non-specialised boots - isn't deductible even if it gets dirty, torn or worn out on the job; the ATO treats it as a normal clothing cost everyone has, not a work-specific one. Your trip from home to a single regular workplace is ordinary commuting, not the itinerant travel described above, even if it's a long drive. And anything your agency reimburses you for, or provides for you outright - a uniform, safety gear, tools - can't be claimed again on your return. You can only claim what genuinely came out of your own pocket."

const faqs = [
  {
    question: "I'm registered with two or three labour hire agencies at once - what do I need to know for tax?",
    answer: "Each agency is legally treated as a separate employer, so you'll have a separate TFN declaration and a separate income statement from each one at tax time, even if they send you to overlapping sites. Your wages as a working holiday maker are usually taxed under the working holiday maker rate rather than the resident tax-free threshold, so the classic 'only claim the threshold from one payer' issue matters less for your actual withholding. What genuinely matters with several agencies running at once is simpler: keeping a record of which agency, which sites and which dates you worked, so nothing gets missed when your return is prepared.",
  },
  {
    question: 'Can I claim travel between different job sites?',
    answer: "Yes, in most cases. Travel between two or more separate work locations - for example, if an agency sends you to one warehouse in the morning and a different site in the afternoon - is deductible, unlike your ordinary trip from home to a single regular workplace. The more genuinely itinerant your work pattern is (no fixed base, regularly different host sites through the week), the stronger the case for claiming more of that travel, though it depends on the specific facts of your roster.",
  },
  {
    question: "What's the difference between labouring and construction work for tax purposes?",
    answer: "The underlying deduction tests are the same, but the specific items differ. Building-site work usually requires a White Card and standard site PPE like steel-caps and hi-vis, while general labour hire covers a much wider range of settings - warehouses, removals, landscaping, events, production lines - where the required gear depends on the actual host role, and a White Card usually isn't required unless the work is genuinely on a construction site. If your placements are specifically on building sites, our construction page covers that in more depth.",
  },
  {
    question: 'Do I need a forklift licence for warehouse work, and can I claim it?',
    answer: "Not every warehouse role requires one, but many do. If you already hold a forklift licence or a similar operating ticket and you use it for the job, renewing it is deductible. Getting the licence for the first time generally isn't, because that cost is what makes you eligible for the role in the first place, rather than a cost of doing a job you already have.",
  },
  {
    question: 'What protective gear can I claim across different labour hire jobs?',
    answer: "Steel-capped boots, gloves, hi-vis clothing and safety glasses are generally deductible when the specific host role requires them, because the test is whether the item protects you from an identifiable risk of injury on that job. Ordinary clothing - plain work pants or a t-shirt that gets dirty or worn out - isn't deductible under ATO rules, however physical the work is. And if your agency reimburses you or provides the gear itself, you can't claim it again on your own return.",
  },
  {
    question: 'I only worked a handful of casual shifts through an agency - is it still worth claiming deductions?',
    answer: "Usually yes, provided you genuinely spent the money yourself and weren't reimbursed for it. Even a few shifts can involve real costs - boots, gloves, a licence renewal, travel between sites - and any of that reduces the tax you're calculated as owing. The requirement is the same regardless of how many shifts you did: work-related, unreimbursed, and something you can show a record for.",
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Expenses', item: `${SITE_URL}/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Labouring', item: `${SITE_URL}/expenses/labouring` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Labour Hire & Warehouse Work Tax Deductions Australia',
  description: 'What backpackers working through labour hire and staffing agencies can claim on tax, and what changes once more than one agency is involved.',
  url: `${SITE_URL}/expenses/labouring`,
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
  '@id': `${SITE_URL}/expenses/labouring#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/expenses/labouring`,
}

export default function LabouringExpensesPage() {
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
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Labouring</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '27ch' }}>
                What can labour hire and warehouse workers <span style={{ color: '#0B5240' }}>claim on tax</span>?
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '58ch' }}>
                Warehouses, removals, landscaping, factory work, event bump-in and out - the varied physical work labour hire and staffing agencies place backpackers into. Here&apos;s what you can claim, and how tax works once more than one agency is involved.
              </p>
            </div>
          </div>
        </section>

        {/* ── MULTIPLE AGENCIES, MULTIPLE WORKSITES (unique hook) ─────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Multiple agencies, multiple worksites
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                What makes labour hire genuinely different from a normal single job, and what it actually means for your tax.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                Each agency is a separate employer, even if the work looks the same
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                When you sign on with a labour hire or staffing agency, you complete a TFN declaration with that agency specifically, not with the businesses it places you at. Legally, the agency is your employer, and the host business - the warehouse, the removalist company, the events venue - is simply where the agency has sent you to work that day. Register with a second or third agency to fill out your roster, and each one is a separate TFN declaration and a separate PAYG withholding relationship, even though from your side it can feel like one continuous run of casual work.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '22px' }}>
                Every TFN declaration asks whether you want to claim the tax-free threshold, and the standard rule is that you can only do this with one payer at a time. For most working holiday makers this matters less than it would for an Australian resident juggling two jobs, because your wages as a 417 or 462 visa holder are usually taxed under the working holiday maker rate - a flat 15% up to $45,000 - rather than the resident tax-free threshold, so that answer typically shouldn&apos;t change how much any one agency withholds. What actually matters with two or three agencies running at once is more basic: making sure each one shows up correctly on your income statements, that each is withholding at the right rate for a working holiday maker, and that nothing gets missed when your return is prepared. Our <Link href="/tfn" style={{ color: '#0B5240', textDecoration: 'underline' }}>TFN page</Link> covers how the declaration and withholding rate actually work.
              </p>

              <h3 className="font-serif font-bold text-ink" style={{ fontSize: '18px', letterSpacing: '-0.01em', marginBottom: '10px', lineHeight: 1.3 }}>
                Travelling between assignments can be deductible - your regular commute isn&apos;t
              </h3>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                The ATO&apos;s general rule is that travel from home to a single, regular workplace is ordinary commuting, and it&apos;s never deductible, no matter how far you live from the job. Labour hire work often doesn&apos;t fit that pattern. If an agency sends you to one site in the morning and a different site in the afternoon, or your assignments genuinely shift from warehouse to warehouse, event to event, or client to client through the week with no fixed base, the travel between those work locations - not your very first trip from home - is generally deductible.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                The more genuinely itinerant your work pattern is, the stronger the case for claiming more of that travel: how often the site changes, whether you have one main base you return to, and how the work is actually structured all affect the answer, so it depends on the specific facts of your roster rather than being automatic. It&apos;s worth keeping a simple note of the dates, sites and distances involved. Car expenses themselves are calculated using the cents-per-kilometre or logbook method - see our <Link href="/expenses" style={{ color: '#0B5240', textDecoration: 'underline' }}>expenses guide</Link> for how those are worked out.
              </p>
            </div>

            <div className="taxres-savings-box" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center', maxWidth: '680px', marginLeft: 'auto', marginRight: 'auto' }}>
              <div>
                <p className="taxres-savings-heading">One habit that pays off with more than one agency</p>
                <p className="taxres-savings-body">
                  Keep a simple note of which agency, which site, and which dates you worked, plus receipts for any gear, licence renewals or travel you paid for yourself. With a single agency this barely matters. Across two or three running through the same financial year, it&apos;s what stops an income statement being missed, or your return needing to be corrected later.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CAN'T CLAIM ───────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '40px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-8">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                What you can claim - and what you can&apos;t
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                The same rules that apply to every manual job on this site, applied specifically to warehouses, removals, landscaping, factory lines and events.
              </p>
            </div>

            <div className="max-w-[680px] mx-auto">
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '24px' }}>
                The same three tests apply to every deduction on this page: you paid for it yourself and weren&apos;t reimbursed, it&apos;s directly related to the work you were actually doing, and you can show a record of it. (Our <Link href="/expenses" style={{ color: '#0B5240', textDecoration: 'underline' }}>expenses guide</Link> covers these tests in more depth - they apply across every occupation, not just labour hire.) Applied specifically to warehouse, removalist, landscaping, factory and event work, here&apos;s what tends to hold up, and what doesn&apos;t.
              </p>

              <p className="exp-card-label exp-card-label-yes" style={{ marginBottom: '12px' }}>✓ Usually deductible</p>
              {CAN_CLAIM.map((item, i) => (
                <div key={i} style={{ marginBottom: '18px' }}>
                  <h3 className="font-serif font-bold text-ink" style={{ fontSize: '16.5px', letterSpacing: '-0.01em', marginBottom: '6px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                    {item.body}
                  </p>
                </div>
              ))}

              <p className="exp-card-label exp-card-label-no" style={{ marginTop: '8px', marginBottom: '12px' }}>✕ Usually not deductible</p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '22px' }}>
                {CANNOT_CLAIM_TEXT}
              </p>

              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                If your placements are specifically on building or construction sites rather than general labour hire, our <Link href="/expenses/construction" style={{ color: '#0B5240', textDecoration: 'underline' }}>construction page</Link> covers White Card costs and site-specific PPE in more depth.
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="py-10 lg:py-14 bg-white">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQs</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Labour hire tax questions
                </h2>
                <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7, marginBottom: '24px' }}>
                  Still unsure how your agencies affect your return? Message us directly.
                </p>
              </div>
              <div className="max-w-[700px]">
                <Accordion items={faqs} />
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED PAGES ────────────────────────────────────────────────── */}
        <RelatedServices items={[
          { label: 'All occupations', desc: 'The full guide to what backpackers can claim, by job type', href: '/expenses' },
          { label: 'Sort your TFN', desc: 'How your TFN declaration and withholding rate actually work', href: '/tfn' },
          { label: 'Lodge your tax return', desc: 'Get your return prepared and lodged, even from overseas', href: '/tax-return' },
          { label: 'On a construction site instead?', desc: 'White Card costs and building-site specific gear', href: '/expenses/construction' },
        ]} />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              This is general information, not personal tax advice. Which agencies you&apos;re registered with, how your assignments are structured, and how itinerant your work pattern genuinely is all affect what you can claim, so treat the examples on this page as a starting point rather than a final answer. When you lodge with us, your return is prepared by a team that works only with working holiday makers, and we go through your actual agencies, sites and receipts to make sure you claim everything you&apos;re entitled to, and nothing you&apos;re not.
            </p>
            <Link href="/tax-form" className="inline-flex items-center justify-center font-semibold"
              style={{ minHeight: '52px', padding: '0 36px', background: '#0B5240', color: '#fff', borderRadius: '100px', fontSize: '15px', textDecoration: 'none' }}>
              Claim Your Tax Refund →
            </Link>
          </div>
        </section>

      </main>
      <MobileCta href="/tax-form" lang="en" />
    </>
  )
}

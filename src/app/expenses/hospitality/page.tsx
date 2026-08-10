import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { Accordion } from '@/components/ui/Accordion'
import { MobileCta } from '@/components/ui/MobileCta'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Hospitality Tax Deductions Australia: RSA, Uniforms & Tips',
  description: 'What bar, café and restaurant staff can claim on tax: RSA certificates, non-slip shoes, uniform laundering. Plus the tax-free threshold mistake that catches working holiday makers running two or three casual jobs at once, and whether tips count as taxable income.',
  keywords: [
    'hospitality tax deductions Australia',
    'bartender tax deductions',
    'waitress tax deductions Australia',
    'RSA certificate tax deductible',
    'can I claim my work shoes tax',
    'are tips taxable Australia',
    'working two jobs tax Australia',
    'tax-free threshold multiple employers',
    'working holiday hospitality tax',
    '417 462 visa hospitality job tax',
    'backpacker bar job tax return',
    'casual hospitality tax deductions',
  ],
  alternates: {
    canonical: `${SITE_URL}/expenses/hospitality`,
    languages: {
      'en-AU': `${SITE_URL}/expenses/hospitality`,
      'de': `${SITE_URL}/de/expenses/hospitality`,
      'ja': `${SITE_URL}/ja/expenses/hospitality`,
      'x-default': `${SITE_URL}/expenses/hospitality`,
    },
  },
  openGraph: {
    images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: 'Working Holiday Tax Refund Australia' }],
    type: 'website',
    locale: 'en_AU',
    url: `${SITE_URL}/expenses/hospitality`,
    siteName: 'Working Holiday Tax',
    title: 'Hospitality Tax Deductions Australia: RSA, Uniforms & Tips',
    description: 'What bar, café and restaurant workers can claim on tax, and the tax-free threshold mistake that catches working holiday makers with more than one casual job.',
  },
  twitter: {
    images: [`${SITE_URL}/og-image.png`],
    card: 'summary_large_image',
    title: 'Hospitality Tax Deductions Australia: RSA, Uniforms & Tips',
    description: 'What bar, café and restaurant workers can claim on tax, and the tax-free threshold mistake that catches working holiday makers with more than one casual job.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
}

const EMPLOYER_CHECKLIST = [
  'Your TFN and a completed Tax File Number Declaration for that specific employer - it does not carry across automatically just because another employer already has it on file.',
  'Working Holiday Maker selected as your residency status on the form, which is what your payroll system uses to identify you as eligible for the working holiday maker withholding rate.',
  'The tax-free threshold question answered No, at every employer, every time - including the one paying you the most.',
]

const faqs = [
  {
    question: 'Can I claim my black work shoes and pants?',
    answer: "Plain black clothing or shoes with no logo are not deductible, even if your venue's dress code requires them - the ATO treats these as ordinary clothing, not a uniform. Non-slip, enclosed shoes are different: if you genuinely need them for a wet bar floor or a busy kitchen pass, they count as protective footwear and are deductible regardless of their colour.",
  },
  {
    question: 'I work at two bars at once - what do I need to tell each employer?',
    answer: "Give each employer your TFN and complete a separate Tax File Number Declaration for every one of them - your TFN doesn't transfer across automatically. On each form, select Working Holiday Maker as your residency status and answer No to the tax-free threshold question, at every employer, not just your main one. Because the working holiday maker rate is a flat 15% up to $45,000, none of your jobs should ever apply the $18,200 resident tax-free threshold.",
  },
  {
    question: 'Are my tips taxable?',
    answer: "Yes. Tips and service charges paid through your employer's payroll, including pooled or tronc tips, are included in your wages, already taxed, and shown on your income statement. Cash tips handed to you directly are just as taxable, but nobody tracks them for you - you're responsible for keeping a simple record and declaring the total yourself.",
  },
  {
    question: 'Do I get superannuation on a casual hospitality job?',
    answer: "Yes. Your employer has to pay 12% super on top of your wages for casual work the same as any other job, from your very first dollar - there's no minimum monthly earnings threshold anymore. Work more than one venue and each employer pays super independently, so your contributions may end up spread across more than one fund.",
  },
  {
    question: 'One of my employers is withholding a lot more tax than the others - why?',
    answer: "That usually means that employer doesn't have your Tax File Number Declaration on file yet, or isn't registered to withhold at working holiday maker rates - either way, they're required to withhold at a higher default rate until it's sorted. It isn't lost money: once all your employers' income is combined on your tax return, the correct 15% rate applies to your total earnings and the extra comes back.",
  },
  {
    question: 'Can I claim my RSA or First Aid certificate?',
    answer: "Yes. The cost of getting or renewing an RSA (Responsible Service of Alcohol) certificate is deductible if your role requires it, and the same applies to a First Aid certificate if holding one is part of your job. Keep the receipt from the training provider as your evidence.",
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Expenses', item: `${SITE_URL}/expenses` },
    { '@type': 'ListItem', position: 3, name: 'Hospitality', item: `${SITE_URL}/expenses/hospitality` },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Hospitality Tax Deductions Australia: RSA, Uniforms & Tips',
  description: 'What bar, café and restaurant workers can claim on tax, and the tax-free threshold mistake that catches working holiday makers running more than one casual job.',
  url: `${SITE_URL}/expenses/hospitality`,
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
  '@id': `${SITE_URL}/expenses/hospitality#webpage`,
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', '.hero-sub'],
  },
  url: `${SITE_URL}/expenses/hospitality`,
}

const linkStyle = { color: '#0B5240', textDecoration: 'underline' }

export default function HospitalityExpensesPage() {
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
                <li aria-current="page" style={{ color: '#0B5240', fontWeight: 500 }}>Hospitality</li>
              </ol>
            </nav>

            <div className="text-center">
              <h1 className="font-serif font-black text-ink mx-auto"
                style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '24ch' }}>
                What can <span style={{ color: '#0B5240' }}>hospitality workers</span> claim on tax?
              </h1>
              <p className="font-semibold mx-auto hero-sub" style={{ fontSize: 'clamp(15px, 1.6vw, 18px)', lineHeight: 1.6, color: '#0B5240', maxWidth: '50ch' }}>
                Bar, café and restaurant pay is usually simple. The real catch for working holiday makers is juggling two or three casual jobs at once - starting with the tax-free threshold question on your TFN declaration.
              </p>
            </div>
          </div>
        </section>

        {/* ── WORKING MORE THAN ONE JOB (this page's unique hook) ──────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[900px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Working more than one hospitality job at once
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '58ch' }}>
                It&apos;s common in hospitality to stack two or three casual jobs in the same week - a few lunch shifts at one café, evening service at a restaurant, a weekend shift behind a bar. That&apos;s completely normal and isn&apos;t a problem on its own. What it does mean is getting one form right with every single employer, not just your main one.
              </p>
            </div>

            <p className="font-semibold text-center" style={{ fontSize: '13px', color: '#0B5240', marginBottom: '16px' }}>
              Every new employer needs three things from you:
            </p>
            <div className="max-w-[680px] mx-auto" style={{ marginBottom: '28px' }}>
              <div className="flex flex-col gap-3">
                {EMPLOYER_CHECKLIST.map((c, i) => (
                  <div key={i} className="taxres-condition-item">
                    <span className="taxres-condition-num">{i + 1}</span>
                    <p className="taxres-condition-text">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="max-w-[680px] mx-auto">
              <div className="taxres-savings-box">
                <div>
                  <p className="taxres-savings-heading">Not the same rule as an Australian resident&apos;s</p>
                  <p className="taxres-savings-body">
                    You might hear from an Australian friend or coworker that you should only claim the tax-free threshold from your highest-paying job. That advice is for tax residents, who get their first $18,200 of income tax-free each year. It doesn&apos;t apply to you on a 417 or 462 visa - working holiday makers don&apos;t get a tax-free threshold at all, from any employer, so the correct answer on every TFN declaration you fill in is No. Answering Yes anywhere, even for your smallest shift, causes that employer to under-withhold, and the shortfall turns into a bill once your tax return is lodged.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-[680px] mx-auto" style={{ marginTop: '22px' }}>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Two different things can go wrong here, and they don&apos;t feel the same at the time. Answer Yes to the tax-free threshold question anywhere, and that employer under-withholds for as long as you work there - the shortfall becomes a bill once your <Link href="/tax-return" style={linkStyle}>tax return</Link> is lodged. Miss submitting a declaration to a new employer, or end up at one that isn&apos;t registered with the ATO to withhold at working holiday maker rates, and the opposite happens: too much tax comes out of that job specifically. Nothing is lost - once every employer&apos;s income statement is combined on your return, the correct 15% rate applies to your total earnings and the extra comes back as part of your refund.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
                Superannuation works independently of all this. Each employer has to pay <Link href="/superannuation" style={linkStyle}>12% super</Link> on top of your wages for casual hospitality work the same as any other job, from your very first dollar - there hasn&apos;t been a minimum monthly earnings threshold since July 2022. Work more than one venue and don&apos;t be surprised if your super ends up spread across more than one fund; it&apos;s all still yours, and something we can help track down before you leave Australia.
              </p>
              <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
                If you&apos;re not sure your TFN declaration is set up correctly at each job, our <Link href="/tfn" style={linkStyle}>TFN page</Link> walks through exactly what each employer needs and why.
              </p>
            </div>
          </div>
        </section>

        {/* ── TIPS, PENALTY RATES & CASUAL LOADING ─────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '38px', paddingBottom: '38px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-6">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                Are tips, penalty rates and casual loading taxable?
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '54ch' }}>
                Short answer: yes, all of it. Here&apos;s how each type of hospitality pay is actually treated.
              </p>
            </div>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Casual loading and penalty rates for evenings, weekends and public holidays aren&apos;t a separate or informal payment - they&apos;re ordinary wages, taxed the same as the rest of your pay and already included in the gross figure on your payslip and income statement.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Tips and service charges work the same way. If your venue pools tips or adds a service charge to bills and pays it out through payroll, sometimes called a tronc system, that amount is part of your wages: tax is withheld from it along with everything else, and it&apos;s already reflected in your income statement. There&apos;s nothing extra for you to do with it when your <Link href="/tax-return" style={linkStyle}>tax return</Link> is prepared.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              Cash handed to you directly by a customer is taxable too, it just isn&apos;t tracked by anyone else. You&apos;re responsible for keeping a simple record of what you receive - a running note of the date and a rough amount is enough - and declaring the total as income at tax time.
            </p>
          </div>
        </section>

        {/* ── WHAT YOU CAN / CAN'T CLAIM ───────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
          <div className="max-w-[760px] mx-auto px-5 md:px-8 lg:px-12 reveal">
            <div className="text-center mb-7">
              <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(22px, 3vw, 30px)', letterSpacing: '-0.02em', marginBottom: '10px' }}>
                What you can and can&apos;t claim
              </h2>
              <p className="font-medium mx-auto" style={{ fontSize: '14px', color: '#587066', lineHeight: 1.6, maxWidth: '56ch' }}>
                A short, genuine list of work-related expenses - and why plain black work clothes don&apos;t make the cut, even when your venue requires them.
              </p>
            </div>

            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Beyond your wages, there&apos;s a short, genuine list of work-related expenses hospitality workers can claim. The test is the same one that applies to every occupation: you paid for it yourself, it&apos;s directly connected to earning your income, and you can show a receipt. Clothing has its own extra test on top of that, and it&apos;s where most hospitality workers get caught out.
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#0B5240', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              RSA and First Aid certificates
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              If your role requires you to hold a current RSA (Responsible Service of Alcohol) certificate, the cost of getting it and renewing it is deductible. The same applies to a First Aid certificate if holding one is a requirement of your job. Both are direct costs of being qualified to do the work you&apos;re paid for, which is exactly what the deduction test is looking for - not a general skill you&apos;d have picked up anyway.
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#0B5240', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Protective, non-slip footwear
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Non-slip, enclosed shoes are deductible if you genuinely need them for the job - a wet floor behind a bar, spills around a coffee machine, carrying hot plates through a kitchen pass. These count as protective footwear, a different category to ordinary shoes, because they&apos;re doing a specific safety job rather than just meeting a dress code.
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#0B5240', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              Laundering a compulsory uniform
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              If your employer requires you to wear a uniform carrying their logo, the cost of laundering it is deductible. The logo is what makes it a uniform for tax purposes rather than ordinary clothing - it&apos;s a compulsory, distinctive item you wouldn&apos;t choose to wear outside work.
            </p>

            <h3 className="font-serif font-black" style={{ fontSize: 'clamp(16px,1.7vw,19px)', color: '#B54708', letterSpacing: '-0.015em', margin: '26px 0 8px', lineHeight: 1.3 }}>
              What you can&apos;t claim
            </h3>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              Plain black pants, a plain black shirt, or plain black shoes with no logo are not deductible, even when your venue&apos;s dress code requires them. This is the one that catches the most people out, because it feels unfair - you only bought the outfit for work, and probably wouldn&apos;t have chosen all-black otherwise. But the ATO doesn&apos;t look at why you bought something, it looks at what the item actually is. Plain black clothing is ordinary, everyday clothing that anyone could wear anywhere, regardless of what your employer&apos;s dress code says about it.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)', marginBottom: '14px' }}>
              For an item to count as a deductible uniform, it has to be either occupation-specific or protective, like the non-slip shoes above, or a compulsory uniform that&apos;s genuinely distinctive, like a logo. Your employer being strict about a dress code doesn&apos;t move an item from one category to the other - a plain black shirt is still a plain black shirt, worn anywhere, by anyone, whether or not a manager insists on it.
            </p>
            <p className="font-light" style={{ fontSize: 'clamp(13px,1.2vw,15px)', lineHeight: 1.8, color: 'rgba(10,15,13,0.62)' }}>
              Work a different job on the side, or curious how other occupations compare? See the full <Link href="/expenses" style={linkStyle}>deductions by occupation</Link> guide.
            </p>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section style={{ background: '#F5F9F7', paddingTop: '40px', paddingBottom: '40px' }} className="lg:py-14">
          <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-8 lg:items-center">
              <div className="text-center">
                <span className="section-label center">FAQs</span>
                <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                  Hospitality tax questions
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

        {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
        <NextStep
          eyebrow="What's next?"
          heading="Working more than one job? Good."
          body="Once your TFN declarations are correct at every employer, the next step is lodging a tax return that brings all of your hospitality income together."
          cta="Continue to your tax return →"
          href="/tax-return"
        />

        {/* ── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
        <section className="bg-white" style={{ paddingTop: '38px', paddingBottom: '48px' }}>
          <div className="max-w-[680px] mx-auto px-5 md:px-8 lg:px-12 text-center">
            <p className="font-light" style={{ fontSize: '12.5px', color: '#8AADA3', lineHeight: 1.7, marginBottom: '26px' }}>
              This is general information, not personal tax advice. Everyone&apos;s situation is a little different, especially once you add more than one employer into the mix. When you lodge with us, we&apos;ll go through your specific payslips and income statements, prepared by our working-holiday-only team, to make sure your tax-free threshold answers, deductions and tips are all accounted for correctly.
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

import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'GST for Self-Employed Workers in Australia | ABN & GST Guide',
  description: 'Understand when you need to register for GST as a self-employed contractor in Australia. Know what happens when you cross the $75,000 threshold.',
  alternates: { canonical: '/gst' },
}

const faqs = [
  {
    question: 'Do I need to register for GST as a Working Holiday visa holder?',
    answer: 'Only if your ABN income exceeds $75,000 in a 12-month period. Most backpackers working under an ABN earn well below this threshold and are not required to register.',
  },
  {
    question: 'What happens if I go over $75,000 and do not register?',
    answer: 'You are required by law to register within 21 days of crossing the threshold. If you do not, the ATO may require you to pay GST on all sales from the point you should have registered — even if you did not collect it from clients.',
  },
  {
    question: 'Can I voluntarily register for GST below $75,000?',
    answer: 'Yes. Voluntary registration is allowed. Some contractors do this to claim GST credits on business purchases. However, once registered, you must collect and remit GST on your invoices.',
  },
  {
    question: 'Does GST affect my income tax?',
    answer: 'GST is separate from income tax. You collect GST on behalf of the ATO and pass it on through a Business Activity Statement (BAS). It does not form part of your taxable income. However, your ABN income (excluding GST) is still assessable for income tax.',
  },
  {
    question: 'Do I add GST to all my invoices once registered?',
    answer: 'Yes. If you are GST-registered, you must add 10% GST to all taxable supplies. You then report this on your BAS and pay the net amount to the ATO (GST collected minus GST on your business expenses).',
  },
  {
    question: 'What is a BAS?',
    answer: 'A Business Activity Statement. Once registered for GST, you report your GST collected, GST paid on purchases, and any other tax obligations to the ATO on a quarterly basis via a BAS.',
  },
  {
    question: 'I drive for a rideshare platform. Do I need GST?',
    answer: 'Yes. Rideshare drivers (Uber, DiDi, Ola etc.) must register for GST regardless of their income — the $75,000 threshold does not apply to taxi and rideshare services. This is a specific ATO rule.',
  },
]

export default function GSTPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">GST for Self-Employed</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">
            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                GST &amp; ABN
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(22px,2.9vw,40px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'10px' }}>
              <span className="hidden lg:block">
                <span style={{ display:'block', whiteSpace:'nowrap' }}>GST for self-employed workers</span>
                <span style={{ display:'block', whiteSpace:'nowrap', color:'#0B5240' }}>when do you need to register?</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>GST for self-employed workers</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>when do you need to register?</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              Most backpackers with an ABN do not need to register for GST — but there are exceptions.
            </p>

            <p className="font-light"
              style={{ fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.65, color:'rgba(10,15,13,0.58)', maxWidth:'44ch', marginBottom:'0' }}>
              If your ABN income crosses $75,000 in a year, registration becomes mandatory. Miss it and the ATO can come after you for the unpaid amount.
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Ask us about GST →
              </a>
              <a href="#threshold"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1', width:'100%' }}>
                See the $75K rule →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:items-center lg:gap-y-0 lg:gap-x-7">
              {['1,200+ backpackers helped','4.9★ from 300+ reviews','45+ countries served.','Most replies within 1 hour'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                  style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS GST ───────────────────────────────────────────────────── */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-12 text-center">
          <div className="mx-auto" style={{ maxWidth:'520px' }}>
            <p className="font-serif font-black text-white"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', letterSpacing:'-0.025em', lineHeight:1.15, marginBottom:'10px' }}>
              GST is a 10% tax on goods and services
            </p>
            <p className="font-light" style={{ fontSize:'14px', color:'rgba(255,255,255,0.68)', lineHeight:1.75 }}>
              If you are registered for GST, you add 10% to your invoices, collect it from clients, and pass it on to the ATO. You also get to claim back the GST paid on your own business expenses.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE $75,000 THRESHOLD ─────────────────────────────────────────── */}
      <section id="threshold" className="py-10 lg:py-16" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'32px' }}>
            <span className="section-label center">The registration threshold</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'8px' }}>
              You must register once you pass $75,000
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize:'13.5px', lineHeight:1.65, maxWidth:'38ch' }}>
              The ATO requires registration within 21 days of crossing the threshold. The $75,000 is measured over any 12-month rolling period — not just the financial year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 max-w-3xl mx-auto reveal delay-1">
            <div className="bg-white rounded-2xl flex flex-col" style={{ padding:'20px', border:'1px solid #C8EAE0', boxShadow:'0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom:'12px', background:'#EAF6F1' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/>
                  <path d="M7 10l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom:'6px' }}>Under $75,000</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ marginBottom:'10px' }}>
                GST registration is optional. You do not charge GST and do not submit a BAS. This is where most ABN contractors sit.
              </p>
              <p className="text-[11.5px] font-medium text-forest-500">No GST obligations — your income is taxed as normal ABN income</p>
            </div>

            <div className="bg-white rounded-2xl flex flex-col" style={{ padding:'20px', border:'1px solid #FECACA', boxShadow:'0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom:'12px', background:'#FEF2F2' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#C47E10" strokeWidth="1.4"/>
                  <path d="M10 6v5M10 13.5v.5" stroke="#C47E10" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom:'6px' }}>Over $75,000</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ marginBottom:'10px' }}>
                You must register for GST within 21 days. Once registered, you add 10% to all invoices and submit a quarterly BAS to the ATO.
              </p>
              <p className="text-[11.5px] font-medium" style={{ color:'#C47E10' }}>Mandatory registration — failure to register can result in backdated GST liability</p>
            </div>
          </div>

          <div className="mt-6 rounded-xl max-w-3xl mx-auto reveal delay-2"
            style={{ background:'#FEF2F2', border:'1px solid #FECACA', padding:'14px 18px', textAlign:'center' }}>
            <p className="font-light" style={{ fontSize:'13.5px', lineHeight:1.65, color:'#991B1B' }}>
              <strong style={{ fontWeight:600 }}>Rideshare exception:</strong> If you drive for Uber, DiDi, or any rideshare platform, you must register for GST <em>immediately</em> — the $75,000 threshold does not apply to taxi and rideshare services.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS WHEN YOU CROSS ───────────────────────────────────── */}
      <section className="py-9 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'32px' }}>
            <span className="section-label center">What changes when you register</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px' }}>
              Three things that happen once you are GST-registered
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 max-w-4xl mx-auto reveal delay-1">
            {[
              {
                n:'1',
                title:'You charge GST on all invoices',
                body:'Every invoice you issue must include 10% GST on top of your rate. Your client pays it, you hold it and pass it to the ATO.',
              },
              {
                n:'2',
                title:'You claim GST credits on expenses',
                body:'GST registered businesses can claim back the 10% GST paid on business purchases — equipment, software, phone bills, and more.',
              },
              {
                n:'3',
                title:'You submit a BAS every quarter',
                body:'A Business Activity Statement reports your GST collected minus GST credits. You pay the net amount to the ATO quarterly.',
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl bg-white flex flex-col gap-3" style={{ padding:'20px', border:'1px solid #C8EAE0' }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white text-sm"
                  style={{ background:'#0B5240' }}>{item.n}</div>
                <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing:'-0.01em' }}>{item.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GST vs INCOME TAX ─────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'28px' }}>
            <span className="section-label center">Common confusion</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', maxWidth:'28ch' }}>
              GST and income tax are completely separate
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto reveal delay-1">
            {[
              { title:'GST is not your income', body:'The 10% GST you collect is not yours to keep — it belongs to the ATO. Never include it in your income calculations.' },
              { title:'ABN income is still taxable', body:'Your ABN earnings (excluding GST) are taxable income. At 15% for WHV holders on the first $45,000, just like employment income.' },
              { title:'No PAYG withholding on ABN', body:'Unlike employees, clients do not withhold tax from ABN payments. You are responsible for setting aside tax throughout the year.' },
              { title:'We handle both at tax time', body:'When you lodge your return, we include your ABN income, deduct any business expenses, and make sure GST is handled correctly.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding:'16px', border:'1px solid #C8EAE0' }}>
                <p className="text-[13.5px] font-semibold text-ink" style={{ marginBottom:'6px' }}>{item.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'28px' }}>
            <span className="section-label center">Common questions</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px' }}>
              GST FAQs for ABN workers
            </h2>
          </div>
          <div className="max-w-2xl mx-auto reveal delay-1">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand />

      <NextStep
        eyebrow="What's next?"
        heading="Working with an ABN?"
        body="We handle your ABN income, deductions, and GST\ncorrectly in your tax return"
        cta="Start your tax return →"
        href="/tax-return"
      />
    </>
  )
}

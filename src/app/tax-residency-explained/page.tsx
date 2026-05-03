import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Tax Residency in Australia — WHV, Student & Resident Explained',
  description: 'Understand the difference between Working Holiday, Student, and Australian resident tax status. Your category determines your tax rate and what you can claim.',
  alternates: { canonical: '/tax-residency-explained' },
}

const faqs = [
  {
    question: 'Can I switch from Working Holiday tax status to resident status?',
    answer: 'In some cases, yes. If you meet all four residency conditions — including 183 days in Australia and ordinary place of residence being Australia — you may qualify. This is complex and must be assessed individually.',
  },
  {
    question: 'I am on a student visa. Am I taxed as a resident?',
    answer: 'Yes. Student visa holders (subclass 500) are generally treated as Australian residents for tax purposes. This means you benefit from the tax-free threshold of $18,200 and lower rates on income above that.',
  },
  {
    question: 'What is the tax-free threshold and can WHV holders claim it?',
    answer: 'The tax-free threshold is $18,200 — the amount Australian residents can earn before paying any income tax. Working Holiday visa holders are not eligible for this threshold. They are taxed at 15% from the first dollar earned.',
  },
  {
    question: 'What is an NDA country and why does it matter?',
    answer: 'NDA stands for Non-Discrimination Article. Australia has tax treaties with certain countries — including the UK, Germany, France, Japan, and others — that may allow WHV holders from those countries to be treated as residents for tax purposes if they meet the residency conditions.',
  },
  {
    question: 'What is the Addy case and does it affect me?',
    answer: 'The Addy case was a High Court ruling in 2021 confirming that WHV holders from NDA countries could be taxed as residents if they met the residency conditions. The ATO now applies resident rates to these individuals, which can result in a larger refund.',
  },
  {
    question: 'If I qualify as a resident, do I need to tell the ATO?',
    answer: 'Yes. Your employer will generally still withhold tax at the WHV rate unless you inform them otherwise. At tax time, we assess your situation and apply the correct rates when lodging your return.',
  },
]

const WHV_ROWS = [
  ['$0 – $45,000',        '15%'],
  ['$45,001 – $135,000',  '$6,750 + 30%'],
  ['$135,001 – $190,000', '$33,750 + 37%'],
  ['$190,001+',           '$54,100 + 45%'],
]

const RESIDENT_ROWS = [
  ['$0 – $18,200',        'Nil'],
  ['$18,201 – $45,000',   '16%'],
  ['$45,001 – $135,000',  '$4,288 + 30%'],
  ['$135,001 – $190,000', '$31,288 + 37%'],
  ['$190,001+',           '$51,638 + 45%'],
]

const NDA_COUNTRIES = ['Chile','Finland','Germany','Israel','Japan','Norway','Turkey','United Kingdom','France','Austria','Belgium','Denmark','Ireland','Italy','Malta','Netherlands','New Zealand','Poland','Romania','South Korea','Spain','Sweden','Switzerland','USA']

const RESIDENCY_CONDITIONS = [
  'Your visa was obtained on a passport from an NDA country',
  'Your ordinary place of residence is in Australia',
  'You intend to live in Australia (not just visit)',
  'You stay in Australia for a cumulative 183 days in the tax year',
]

function TaxTable({ label, rows, accent }: { label: string; rows: string[][]; accent?: boolean }) {
  return (
    <div className="min-w-0 flex flex-col">
      <h3 className="font-semibold text-ink mb-3 text-center" style={{ fontSize:'13px', letterSpacing:'-0.01em' }}>
        {label}
      </h3>
      <div className="rounded-xl overflow-hidden flex-1" style={{ border:'1px solid #C8EAE0' }}>
        <table className="w-full" style={{ borderCollapse:'collapse', tableLayout:'fixed' }}>
          <thead>
            <tr style={{ background: accent ? '#0B5240' : '#EAF6F1' }}>
              <th className={`text-left font-semibold ${accent ? 'text-white' : 'text-ink'}`} style={{ fontSize:'11px', padding:'8px 12px', letterSpacing:'0.02em', width:'55%' }}>Taxable income</th>
              <th className={`text-left font-semibold ${accent ? 'text-white' : 'text-ink'}`} style={{ fontSize:'11px', padding:'8px 12px', letterSpacing:'0.02em', width:'45%' }}>Tax rate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([income, rate], i) => (
              <tr key={i} style={{ borderTop:'1px solid #E2EFE9', background: i % 2 === 0 ? '#ffffff' : '#F7FCF9' }}>
                <td className="font-light text-body" style={{ fontSize:'11.5px', padding:'8px 12px' }}>{income}</td>
                <td className="font-medium text-ink" style={{ fontSize:'11.5px', padding:'8px 12px' }}>{rate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function TaxResidencyExplainedPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Tax Residency Explained</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">
            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Tax Residency
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(22px,2.9vw,40px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'10px' }}>
              <span className="hidden lg:block">
                <span style={{ display:'block', whiteSpace:'nowrap' }}>WHV, Student or Resident —</span>
                <span style={{ display:'block', whiteSpace:'nowrap', color:'#0B5240' }}>your tax status explained</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>WHV, Student or Resident —</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>your tax status explained</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              Your tax residency status determines your tax rate — and the difference can be hundreds of dollars.
            </p>

            <p className="font-light"
              style={{ fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.65, color:'rgba(10,15,13,0.58)', maxWidth:'44ch', marginBottom:'0' }}>
              Not everyone is taxed the same way. Your visa, your country of origin, and how long you have been in Australia all matter.
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Check my tax status →
              </a>
              <a href="#rates"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1', width:'100%' }}>
                See the tax rates →
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

      {/* ── THREE CATEGORIES ──────────────────────────────────────────────── */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-12">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom:'24px' }}>
            <p className="font-serif font-black text-white"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', letterSpacing:'-0.025em', lineHeight:1.15, marginBottom:'8px' }}>
              Three types of taxpayer in Australia
            </p>
            <p className="font-light" style={{ fontSize:'14px', color:'rgba(255,255,255,0.65)', lineHeight:1.75 }}>
              The ATO puts every person into one of three categories. Which one you fall into determines everything about your tax.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { label:'Working Holiday Maker', visa:'Visa 417 or 462', desc:'Taxed at 15% from the first dollar. No tax-free threshold. Most backpackers fall here.' },
              { label:'Australian Resident', visa:'Any visa + residency conditions', desc:'Tax-free threshold of $18,200. Lower rates above that. NDA country WHV holders may qualify.' },
              { label:'Student Visa Holder', visa:'Visa 500', desc:'Treated as a resident for tax purposes. Eligible for the tax-free threshold and resident rates.' },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl" style={{ padding:'18px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)' }}>
                <p className="font-semibold text-white" style={{ fontSize:'13.5px', marginBottom:'4px' }}>{c.label}</p>
                <p className="font-medium" style={{ fontSize:'11px', color:'#E9A020', marginBottom:'8px', letterSpacing:'0.02em' }}>{c.visa}</p>
                <p className="font-light" style={{ fontSize:'12.5px', color:'rgba(255,255,255,0.7)', lineHeight:1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAX RATE TABLES ───────────────────────────────────────────────── */}
      <section id="rates" className="py-10 lg:py-16" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'32px' }}>
            <span className="section-label center">Tax rates 2024–25</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'8px' }}>
              How much tax you pay at each status
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize:'13.5px', lineHeight:1.65, maxWidth:'38ch' }}>
              On the same $45,000 income, a resident saves over $2,400 compared to a WHV holder.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-7 items-stretch max-w-3xl mx-auto reveal delay-1">
            <TaxTable label="Working Holiday Maker (417 / 462)" rows={WHV_ROWS} />
            <TaxTable label="Australian resident for tax purposes" rows={RESIDENT_ROWS} accent />
          </div>

          <div className="mt-6 rounded-xl flex gap-3 items-start max-w-3xl mx-auto reveal delay-2"
            style={{ background:'#FEF2F2', border:'1px solid #FECACA', padding:'14px 18px', justifyContent:'center', textAlign:'center' }}>
            <p className="font-light" style={{ fontSize:'13.5px', lineHeight:1.65, color:'#991B1B' }}>
              On an income of $45,000 — a resident pays approximately <strong style={{ fontWeight:600 }}>$2,462 less tax</strong> than a WHV holder. If you qualify as a resident, this can come back as a refund.
            </p>
          </div>

          <p className="text-center font-light text-muted mt-4" style={{ fontSize:'12px' }}>
            Student visa holders (500) are taxed as residents and are eligible for these resident rates.
          </p>
        </div>
      </section>

      {/* ── CAN YOU QUALIFY AS RESIDENT ───────────────────────────────────── */}
      <section className="py-9 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
            <div className="reveal">
              <span className="section-label">WHV holders from NDA countries</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'16px', maxWidth:'24ch' }}>
                You may qualify for resident tax rates
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>Working Holiday visa holders from Non-Discrimination Article (NDA) countries may be treated as Australian residents for tax purposes — if they meet all four conditions below.</p>
                <p>This is the result of the 2021 Addy High Court ruling. The ATO confirmed that NDA country passport holders who establish genuine residency in Australia cannot be taxed at a higher rate than residents.</p>
                <p>If you qualify, the difference can be returned as a tax refund when you lodge your return.</p>
              </div>
              <div className="mt-5 space-y-3">
                {RESIDENCY_CONDITIONS.map((c, i) => (
                  <div key={i} className="flex gap-2 bg-white rounded-xl items-start" style={{ padding:'10px 14px', border:'1px solid #C8EAE0' }}>
                    <span className="font-bold flex-shrink-0 mt-0.5" style={{ fontSize:'13px', color:'#0B5240' }}>✓</span>
                    <p className="font-light text-body" style={{ fontSize:'12.5px', lineHeight:1.55 }}>{c}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal delay-1">
              <p className="font-semibold text-ink" style={{ fontSize:'12.5px', marginBottom:'10px' }}>NDA Countries — WHV holders from these countries may qualify:</p>
              <div className="flex gap-1.5" style={{ flexWrap:'wrap', marginBottom:'20px' }}>
                {NDA_COUNTRIES.map((c) => (
                  <span key={c} className="font-medium"
                    style={{ fontSize:'10px', background:'#EAF6F1', color:'#065F46', padding:'3px 9px', borderRadius:'999px', whiteSpace:'nowrap', border:'1px solid #C8EAE0' }}>
                    {c}
                  </span>
                ))}
              </div>
              <div className="info-block">
                <p>Not sure if you qualify? Tell us your visa details and we will check your status before lodging your return.</p>
              </div>
              <div className="mt-4">
                <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex btn-primary"
                  style={{ height:'48px', padding:'0 28px', fontSize:'14px', borderRadius:'100px' }}>
                  Check my residency status →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STUDENT VISA ──────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'28px' }}>
            <span className="section-label center">Student visa holders</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', maxWidth:'28ch' }}>
              Student visa (500) — taxed as a resident
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-1 max-w-4xl mx-auto">
            {[
              { q:'Do I get the tax-free threshold?', a:'Yes. Student visa holders are treated as residents and can claim the $18,200 tax-free threshold.' },
              { q:'Can I work while studying?', a:'Yes. Most student visas allow up to 48 hours of work per fortnight during study, and full-time during holidays.' },
              { q:'Do I pay the Medicare levy?', a:'Generally yes, as a resident for tax purposes. However, if you are not eligible for Medicare, you may be able to apply for an exemption.' },
              { q:'Is my tax rate the same as a WHV holder?', a:'No. Student visa holders use resident rates, which are lower and include a tax-free threshold. WHV holders are taxed at 15% from the first dollar.' },
              { q:'What if I had both student and WHV in the same year?', a:'If you changed visa during the year, your tax situation is split. We assess each period separately when we lodge your return.' },
              { q:'Can I claim work-related deductions?', a:'Yes. Student visa holders, like residents, can claim deductions for work-related expenses, study costs in some cases, and other eligible items.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding:'16px', border:'1px solid #C8EAE0', boxShadow:'0 1px 2px rgba(0,0,0,.02)' }}>
                <p className="text-[13px] font-semibold text-ink italic" style={{ marginBottom:'6px' }}>{item.q}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]">{item.a}</p>
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
              Tax residency FAQs
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
        heading="Ready to lodge your tax return"
        body="We check your residency status and apply the correct rates\nso you don't pay more than you should"
        cta="Start your tax return →"
        href="/tax-return"
      />
    </>
  )
}

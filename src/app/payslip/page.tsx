import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'How to Read Your Australian Payslip | YTD, Tax & Super Explained',
  description: 'Understand every line on your Australian payslip. Learn what YTD means, how PAYG tax is calculated, and what your employer must include by law.',
  alternates: { canonical: '/payslip' },
}

const faqs = [
  {
    question: 'What does YTD mean on my payslip?',
    answer: 'YTD stands for Year to Date. It shows the total amount you have earned (or been taxed) from 1 July — the start of the Australian financial year — up to the date of your current payslip. It helps you track your total income and tax across the full year.',
  },
  {
    question: 'Why is YTD important for my tax return?',
    answer: 'Your tax return is based on your total annual income — not just one week\'s pay. YTD figures give you a running total so you can see how much you have earned and how much tax has been withheld across the whole year. Your payment summary at year-end should match the final YTD figures.',
  },
  {
    question: 'Does my employer have to give me a payslip?',
    answer: 'Yes. Under the Fair Work Act, employers must give employees a payslip within one working day of each pay date. It can be provided electronically (email or app).',
  },
  {
    question: 'What if the tax on my payslip looks wrong?',
    answer: 'Your employer withholds PAYG based on the information in your TFN declaration and the ATO\'s tax tables. If you did not provide a TFN or declared you are a resident when you are not, the withholding may be wrong. We fix this at tax return time.',
  },
  {
    question: 'Why is my gross pay different from my bank deposit?',
    answer: 'Your bank receives your net pay — that is your gross pay after PAYG tax has been deducted. Super is usually paid separately to your super fund and does not come from your net pay (it is an employer obligation on top of your wages).',
  },
  {
    question: 'What is the difference between ordinary hours and overtime?',
    answer: 'Ordinary hours are your standard contracted hours at the base rate. Overtime is any extra hours worked above the ordinary threshold, which is usually paid at a higher rate (e.g. 1.5x or 2x the ordinary rate).',
  },
  {
    question: 'My payslip shows super — do I get that now?',
    answer: 'No. Superannuation goes directly into your super fund and is only accessible when you leave Australia (via DASP) or meet certain other conditions. It does not appear in your bank account with your regular pay.',
  },
  {
    question: 'I worked cash in hand — will I get a payslip?',
    answer: 'You should. Employers are legally required to provide payslips regardless of how you are paid. If you worked cash in hand with no payslips or tax records, this can cause problems at tax time and you should speak to us about your situation.',
  },
]

const PAYSLIP_FIELDS = [
  { term:'Employer name & ABN', desc:'Your employer\'s legal name and Australian Business Number. Required on every payslip.' },
  { term:'Employee name', desc:'Your full name as registered with the employer.' },
  { term:'Pay period', desc:'The dates this payslip covers — e.g. 1 June to 7 June. Also shows the date of payment.' },
  { term:'Gross earnings', desc:'Your total earnings before any deductions. Includes base pay, casual loading, and any allowances.' },
  { term:'PAYG tax withheld', desc:'The income tax your employer deducted on behalf of the ATO. This reduces your net pay.' },
  { term:'Net pay', desc:'What you actually receive. Gross earnings minus PAYG tax (and any other deductions).' },
  { term:'Superannuation', desc:'The 11.5% (2024–25) your employer contributes to your super fund. Paid separately to your super account, not included in net pay.' },
  { term:'YTD Gross', desc:'Your total gross earnings from 1 July to the date of this payslip.' },
  { term:'YTD Tax', desc:'Total PAYG tax withheld from 1 July to the date of this payslip. This is what the ATO has received on your behalf.' },
  { term:'Ordinary hours / rate', desc:'The number of hours worked at the standard rate and the rate itself (e.g. 38 hrs × $28.50/hr).' },
  { term:'Casual loading', desc:'If you are a casual employee, this shows the 25% loading on top of the base rate.' },
  { term:'Leave balances (if permanent)', desc:'Shows your accrued annual leave and personal leave balances. Not applicable for casual employees.' },
]

export default function PayslipPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">How to Read Your Payslip</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">
            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Payslip Guide
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(22px,2.9vw,40px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'10px' }}>
              <span className="hidden lg:block">
                <span style={{ display:'block', whiteSpace:'nowrap' }}>How to read your Australian payslip</span>
                <span style={{ display:'block', whiteSpace:'nowrap', color:'#0B5240' }}>and understand every line</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>How to read your payslip</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>and understand every line</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              YTD, PAYG, gross, net, casual loading — explained in plain English.
            </p>

            <p className="font-light"
              style={{ fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.65, color:'rgba(10,15,13,0.58)', maxWidth:'44ch', marginBottom:'0' }}>
              Your payslip is also the key to your tax return. Knowing what each figure means helps you spot errors and understand what you will get back.
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Start my tax return →
              </a>
              <a href="#fields"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1', width:'100%' }}>
                See payslip breakdown →
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

      {/* ── YTD EXPLAINED ─────────────────────────────────────────────────── */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-12">
          <div className="max-w-2xl mx-auto">
            <p className="font-serif font-black text-white text-center"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', letterSpacing:'-0.025em', lineHeight:1.15, marginBottom:'16px' }}>
              What does YTD mean?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label:'YTD stands for', value:'Year to Date', desc:'From 1 July to the date on your current payslip' },
                { label:'YTD Gross shows', value:'Your total earnings', desc:'All income earned since the start of the financial year' },
                { label:'YTD Tax shows', value:'Tax withheld so far', desc:'All PAYG tax sent to the ATO since 1 July' },
              ].map((c, i) => (
                <div key={i} className="rounded-2xl text-center" style={{ padding:'16px', background:'rgba(255,255,255,0.09)', border:'1px solid rgba(255,255,255,0.15)' }}>
                  <p style={{ fontSize:'10px', color:'rgba(255,255,255,0.5)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:'4px' }}>{c.label}</p>
                  <p className="font-bold text-white" style={{ fontSize:'15px', marginBottom:'4px' }}>{c.value}</p>
                  <p className="font-light" style={{ fontSize:'12px', color:'rgba(255,255,255,0.65)', lineHeight:1.5 }}>{c.desc}</p>
                </div>
              ))}
            </div>
            <p className="font-light text-center mt-4" style={{ fontSize:'13px', color:'rgba(255,255,255,0.55)', lineHeight:1.6 }}>
              The Australian financial year runs from 1 July to 30 June. At the end of the year, the YTD totals on your final payslip should match your payment summary.
            </p>
          </div>
        </div>
      </section>

      {/* ── GROSS vs NET ──────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'32px' }}>
            <span className="section-label center">The most important numbers</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'8px' }}>
              Gross pay, tax withheld, and net pay
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize:'13.5px', lineHeight:1.65, maxWidth:'38ch' }}>
              These three numbers are the core of every payslip. Understanding them means you can immediately check if something looks wrong.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 max-w-4xl mx-auto reveal delay-1">
            {[
              {
                label:'Gross Pay',
                example:'e.g. $1,200.00',
                color:'#0B5240',
                bg:'#EAF6F1',
                desc:'Your total earnings before anything is taken out. Includes base pay, casual loading, allowances, and any bonuses.',
              },
              {
                label:'PAYG Tax Withheld',
                example:'e.g. − $180.00',
                color:'#991B1B',
                bg:'#FEF2F2',
                desc:'The income tax your employer sends to the ATO on your behalf. For most WHV holders this is 15% of gross (on the first $45,000).',
              },
              {
                label:'Net Pay',
                example:'e.g. $1,020.00',
                color:'#1E3A5F',
                bg:'#EFF6FF',
                desc:'The amount deposited into your bank account. Gross pay minus PAYG tax (and any other deductions like salary sacrifice).',
              },
            ].map((c, i) => (
              <div key={i} className="bg-white rounded-2xl text-center flex flex-col" style={{ padding:'20px', border:`1px solid ${c.bg}`, boxShadow:'0 1px 4px rgba(0,0,0,.03)' }}>
                <div className="rounded-xl mb-3 mx-auto" style={{ background:c.bg, padding:'6px 14px', display:'inline-block' }}>
                  <p className="font-bold" style={{ fontSize:'12px', color:c.color, letterSpacing:'0.01em' }}>{c.example}</p>
                </div>
                <p className="font-bold text-ink" style={{ fontSize:'14px', marginBottom:'8px' }}>{c.label}</p>
                <p className="font-light text-muted" style={{ fontSize:'12.5px', lineHeight:1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl max-w-4xl mx-auto reveal delay-2"
            style={{ background:'#fff', border:'1px solid #C8EAE0', padding:'14px 20px', textAlign:'center' }}>
            <p className="font-light" style={{ fontSize:'13px', lineHeight:1.7, color:'rgba(10,15,13,0.6)' }}>
              <strong style={{ fontWeight:600, color:'#0B5240' }}>Super is separate.</strong> Your employer also pays 11.5% of your gross into your super fund — but this does not come out of your net pay. It is an obligation on top of your wages.
            </p>
          </div>
        </div>
      </section>

      {/* ── ALL PAYSLIP FIELDS ────────────────────────────────────────────── */}
      <section id="fields" className="py-9 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'32px' }}>
            <span className="section-label center">Full payslip glossary</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px' }}>
              Every term on your payslip — explained
            </h2>
          </div>

          <div className="max-w-3xl mx-auto reveal delay-1 rounded-2xl overflow-hidden" style={{ border:'1px solid #C8EAE0' }}>
            <table className="w-full" style={{ borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#0B5240' }}>
                  <th className="text-left font-semibold text-white" style={{ fontSize:'11.5px', padding:'10px 16px', width:'35%', letterSpacing:'0.03em' }}>Term</th>
                  <th className="text-left font-semibold text-white" style={{ fontSize:'11.5px', padding:'10px 16px', width:'65%', letterSpacing:'0.03em' }}>What it means</th>
                </tr>
              </thead>
              <tbody>
                {PAYSLIP_FIELDS.map(({ term, desc }, i) => (
                  <tr key={i} style={{ borderTop:'1px solid #E2EFE9', background: i % 2 === 0 ? '#ffffff' : '#F7FCF9' }}>
                    <td className="font-semibold text-ink" style={{ fontSize:'12px', padding:'10px 16px', verticalAlign:'top' }}>{term}</td>
                    <td className="font-light text-body" style={{ fontSize:'12px', padding:'10px 16px', lineHeight:1.6 }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── HOW THIS CONNECTS TO YOUR TAX RETURN ─────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'28px' }}>
            <span className="section-label center">At tax time</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', maxWidth:'28ch' }}>
              How your payslip connects to your tax return
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-1 max-w-4xl mx-auto">
            {[
              { title:'Your payment summary = final YTD', body:'At the end of the financial year, your employer issues a payment summary showing total gross income and total PAYG tax. It should match the YTD totals on your last payslip.' },
              { title:'Tax already paid reduces what you owe', body:'The PAYG tax withheld throughout the year is credited against your tax liability. If too much was taken, you get a refund. If not enough, you pay the difference.' },
              { title:'Multiple employers, multiple summaries', body:'If you worked for more than one employer, you will have a payment summary from each. We combine all of them into one tax return.' },
              { title:'Super is not on your tax return', body:'Super goes to your fund separately and is not part of your income tax return — unless you are claiming a DASP (super withdrawal) after leaving Australia.' },
              { title:'Keep your payslips', body:'If a payment summary is wrong, your payslips are evidence of what you were actually paid and what tax was withheld. Keep them until your return is lodged.' },
              { title:'We handle everything', body:'You just share your payment summaries with us. We do the calculation, apply the correct tax rate, and lodge your return with the ATO.' },
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
              Payslip &amp; YTD FAQs
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
        body="Share your payslips or payment summary\nand we handle everything from there"
        cta="Start your tax return →"
        href="/tax-return"
      />
    </>
  )
}

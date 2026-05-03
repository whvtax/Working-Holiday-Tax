import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Permanent vs Casual Employee in Australia | Working Holiday Tax',
  description: 'Understand the difference between permanent and casual employment in Australia and how it affects your tax, pay rate, and entitlements as a Working Holiday visa holder.',
  alternates: { canonical: '/permanent-vs-casual' },
}

const faqs = [
  {
    question: 'Can a Working Holiday visa holder be a permanent employee?',
    answer: 'Yes. There is no restriction on Working Holiday visa holders being employed as full-time or part-time permanent employees. However, most backpackers are hired as casuals due to the flexible nature of their stay.',
  },
  {
    question: 'Do casuals get paid more per hour?',
    answer: 'Yes. Casuals receive a casual loading of at least 25% on top of the base rate. This compensates for not having paid leave entitlements like annual leave or sick leave.',
  },
  {
    question: 'Do I get annual leave as a casual?',
    answer: 'No. Casual employees are not entitled to paid annual leave or sick leave. If you need time off, you simply do not work — and do not get paid for that time.',
  },
  {
    question: 'Do I get superannuation as a casual?',
    answer: 'Yes. Super is paid on all employment types, including casual. Your employer must pay 11.5% of your ordinary earnings into a super fund regardless of your employment type.',
  },
  {
    question: 'What is a casual conversion?',
    answer: 'If you have been working as a casual for 12 months on a regular and systematic basis, you may have the right to request conversion to permanent employment. However, this is rarely relevant for Working Holiday visa holders given the length of their stay.',
  },
  {
    question: 'How does my employment type affect my tax return?',
    answer: 'It does not directly affect your tax rate — your visa type determines the rate. However, casuals often have variable income across the year, which affects your total taxable income and the amount of any refund.',
  },
]

const COMPARE = [
  { label: 'Pay rate',         casual: '25% casual loading on top of base',  permanent: 'Base rate only' },
  { label: 'Annual leave',     casual: 'Not included',                         permanent: '4 weeks paid per year' },
  { label: 'Sick leave',       casual: 'Not included',                         permanent: '10 days paid per year' },
  { label: 'Notice period',    casual: 'None required',                        permanent: 'Required (usually 1–4 weeks)' },
  { label: 'Superannuation',   casual: 'Yes — 11.5% of earnings',              permanent: 'Yes — 11.5% of earnings' },
  { label: 'Work schedule',    casual: 'Variable, no guaranteed hours',        permanent: 'Fixed hours each week' },
  { label: 'Tax withholding',  casual: 'PAYG withheld by employer',            permanent: 'PAYG withheld by employer' },
]

export default function PermanentVsCasualPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Permanent vs Casual</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">
            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Employment Types
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(22px,2.9vw,40px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'10px' }}>
              <span className="hidden lg:block">
                <span style={{ display:'block', whiteSpace:'nowrap' }}>Permanent vs casual employee</span>
                <span style={{ display:'block', whiteSpace:'nowrap', color:'#0B5240' }}>what's the difference in Australia?</span>
              </span>
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Permanent vs casual employee</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>what's the difference?</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              Most backpackers work casually — but knowing the difference matters for your pay and tax return.
            </p>

            <p className="font-light"
              style={{ fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.65, color:'rgba(10,15,13,0.58)', maxWidth:'44ch', marginBottom:'0' }}>
              Your employment type affects your pay rate, leave entitlements, and how your income looks at tax time.
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Ask us about your situation →
              </a>
              <a href="#compare"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1', width:'100%' }}>
                See the comparison →
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

      {/* ── INTRO BANNER ──────────────────────────────────────────────────── */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-12 text-center">
          <div className="mx-auto" style={{ maxWidth:'520px' }}>
            <p className="font-serif font-black text-white"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', letterSpacing:'-0.025em', lineHeight:1.15, marginBottom:'10px' }}>
              Both types have the same tax rate on your visa
            </p>
            <p className="font-light"
              style={{ fontSize:'14px', color:'rgba(255,255,255,0.68)', lineHeight:1.75 }}>
              Whether you are permanent or casual, the ATO taxes you as a Working Holiday Maker at 15% on the first $45,000. The difference is in your pay rate and entitlements — not your tax rate.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ──────────────────────────────────────────────── */}
      <section id="compare" className="py-10 lg:py-16" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'32px' }}>
            <span className="section-label center">Side by side</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'8px' }}>
              Casual vs permanent — what actually changes
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize:'13.5px', lineHeight:1.65, maxWidth:'38ch' }}>
              The biggest practical difference is the 25% casual loading versus paid leave entitlements.
            </p>
          </div>

          <div className="reveal delay-1 rounded-2xl overflow-hidden mx-auto" style={{ maxWidth:'760px', border:'1px solid #C8EAE0' }}>
            <table className="w-full" style={{ borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ background:'#0B5240' }}>
                  <th className="text-left font-semibold text-white" style={{ fontSize:'11.5px', padding:'10px 16px', width:'36%', letterSpacing:'0.03em' }}></th>
                  <th className="text-left font-semibold text-white" style={{ fontSize:'11.5px', padding:'10px 16px', width:'32%', letterSpacing:'0.03em' }}>Casual</th>
                  <th className="text-left font-semibold text-white" style={{ fontSize:'11.5px', padding:'10px 16px', width:'32%', letterSpacing:'0.03em' }}>Permanent</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(({ label, casual, permanent }, i) => (
                  <tr key={i} style={{ borderTop:'1px solid #E2EFE9', background: i % 2 === 0 ? '#ffffff' : '#F7FCF9' }}>
                    <td className="font-semibold text-ink" style={{ fontSize:'12px', padding:'10px 16px' }}>{label}</td>
                    <td className="font-light text-body" style={{ fontSize:'12px', padding:'10px 16px', lineHeight:1.5 }}>{casual}</td>
                    <td className="font-light text-body" style={{ fontSize:'12px', padding:'10px 16px', lineHeight:1.5 }}>{permanent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CASUAL LOADING EXPLAINED ──────────────────────────────────────── */}
      <section className="py-9 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
            <div className="reveal">
              <span className="section-label">The casual loading</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'16px', maxWidth:'22ch' }}>
                Why casuals get paid more per hour
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>Casual employees receive a minimum 25% loading on top of the base hourly rate. This loading exists because casuals do not receive paid annual leave, sick leave, or other entitlements that permanent employees receive.</p>
                <p>For example, if the base rate for a role is $24.00 per hour, a casual employee would receive at least $30.00 per hour (base + 25%).</p>
                <p>This loading is included in your total wages and is subject to the same tax withholding as the rest of your income.</p>
              </div>
            </div>

            <div className="reveal delay-1 grid grid-cols-1 gap-4">
              {[
                { title:'Base rate example', body:'A role paying $24.00/hr base → casual rate is at least $30.00/hr (25% loading included)' },
                { title:'No paid leave', body:'When a casual takes a day off, there is no pay for that day. The loading compensates for this over time.' },
                { title:'Super still applies', body:'Your employer pays 11.5% super on your gross casual earnings. Both permanent and casual receive super.' },
                { title:'Tax is the same', body:'PAYG is withheld by your employer regardless of your employment type. Your tax rate depends on your visa, not your contract.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl flex flex-col" style={{ padding:'14px 16px', border:'1px solid #C8EAE0', boxShadow:'0 1px 2px rgba(0,0,0,.02)' }}>
                  <p className="text-[12.5px] font-semibold text-ink" style={{ marginBottom:'3px' }}>{c.title}</p>
                  <p className="text-[12px] font-light text-muted leading-[1.6]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TAX RETURN IMPACT ─────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom:'28px' }}>
            <span className="section-label center">At tax time</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', maxWidth:'26ch', marginTop:'8px' }}>
              How your employment type affects your tax return
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 reveal delay-1 max-w-4xl mx-auto">
            {[
              { title:'Your income is the same to the ATO', body:'Whether you earned $40,000 as a casual or permanent employee, the ATO sees the same taxable income. Your visa type sets your tax rate.' },
              { title:'Multiple employers is common for casuals', body:'Casuals often work multiple jobs. We collect your income from all employers and lodge everything correctly in one tax return.' },
              { title:'Payment summaries from each employer', body:'You will receive a payment summary (or it will appear in myGov) for each employer you worked with during the year.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding:'20px', background:'#fff', border:'1px solid #C8EAE0' }}>
                <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing:'-0.01em', marginBottom:'6px' }}>{item.title}</p>
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
              Permanent vs casual — FAQs
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
        body="We handle everything — whether you worked casually, permanently, or both"
        cta="Start your tax return →"
        href="/tax-return"
      />
    </>
  )
}

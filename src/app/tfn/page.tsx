import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'TFN Application for Working Holiday Visa Holders',
  description: 'Get your Tax File Number sorted fast. Apply correctly the first time with step-by-step guidance from a registered tax agent.',
}

const faqs = [
  { question:'Can I start work before I receive my TFN?', answer:'Yes. You can start working, but you must provide your TFN within 28 days. Until then, your employer may withhold tax at a higher rate.' },
  { question:'Where will my TFN be sent?', answer:'Your TFN is sent by post to your Australian address. Make sure you use an address where you can receive mail.' },
  { question:'Can I get a TFN on a tourist visa?', answer:'No. You need a valid work visa, such as a Working Holiday visa 417 or 462.' },
  { question:'What if I lose my TFN?', answer:'You can find your TFN in previous tax returns, request it from the ATO, or ask your tax agent.' },
  { question:'What is a TFN Declaration Form?', answer:'A form you complete when starting a job. It tells your employer how much tax to withhold from your pay.' },
]

const STEPS = [
  { n:'1', title:'Tell us about your situation', body:'Share your visa details so we can guide you correctly.' },
  { n:'2', title:'Send your details in minutes',  body:'Passport and basic info - quick and simple.' },
  { n:'3', title:'We handle everything for you',  body:'We prepare and submit your TFN correctly.' },
  { n:'4', title:'Receive your TFN',             body:'You receive your TFN by post or phone within a week.' },
]

const TESTIMONIALS = [
  { name:"Liam O'Brien", from:'Ireland · WHV 417', quote:'I had multiple employers and no idea what to do. They guided me through everything and made the process simple.', amount:'$3,200', initials:'L', bgColor:'#DBEAFE', textColor:'#1E40AF' },
  { name:'Emma T.', from:'United Kingdom · WHV 417', quote:'Got my TFN sorted in just two days, and everything was handled clearly from start to finish. No stress, just a smooth and easy process.', amount:'$2,450', initials:'E', bgColor:'#FCE7F3', textColor:'#9D174D' },
]

const IconStar  = () => (<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const CheckIcon = () => (<svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

export default function TFNPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      {/*
        Mobile:  left-aligned, stacked, full-width buttons, 2×2 badge grid
        Desktop: wider column (max-w-[720px]), more vertical spacing
      */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12
                        pt-10 pb-10
                        lg:pt-20 lg:pb-20">

          <nav aria-label="Breadcrumb"
            className="flex items-center gap-2 mb-5 lg:mb-8"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN Application</span>
          </nav>

          {/* Desktop: wider column, left-aligned */}
          <div className="max-w-[560px] lg:max-w-[720px]">

            <div className="inline-flex items-center gap-2 mb-4 lg:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                TFN Application
              </span>
            </div>

            {/* Desktop: max-width keeps headline at 2 clean lines */}
            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize:'clamp(24px, 3.23vw, 44px)',
                lineHeight:1.07,
                letterSpacing:'-0.03em',
                marginBottom:'14px',
                maxWidth:'18ch',
              }}>
              Get your TFN sorted quickly and start working sooner
            </h1>

            {/* Subheading */}
            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px, 1.4vw, 16px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              We make sure your TFN is done correctly the first time
            </p>

            {/* Supporting paragraph — mobile: 2 lines; desktop: natural */}
            <p className="font-light"
              style={{
                fontSize:'clamp(13.5px, 1.25vw, 15px)',
                lineHeight:1.7,
                color:'rgba(10,15,13,0.6)',
                maxWidth:'36ch',
                marginBottom:'0',
              }}>
              Without a TFN, you may be taxed at a higher rate.<br />
              Takes just a few minutes to get started.
            </p>

            {/* CTA buttons — mobile: stacked full-width; desktop: equal-width side-by-side */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'52px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1' }}>
                Start your TFN application →
              </a>
              <a href="#how-to-apply"
                className="btn-ghost-dark inline-flex justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1' }}>
                See how it works →
              </a>
            </div>

            {/* Trust badges — mobile: 2×2 grid; desktop: single row */}
            <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-x-6 lg:gap-x-8 gap-y-2.5 lg:gap-y-2"
              style={{ maxWidth:'380px' }}>
              {['1,200+ travellers helped','Most replies within 1 hour','ATO compliant','Handled by a registered tax agent'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5"
                  style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <CheckIcon />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENCY ───────────────────────────────────────────────────────── */}
      {/*
        Mobile:  py-10, heading on 2 balanced lines, clear CTA spacing
        Desktop: py-16, narrower text block, premium spacing
      */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12
                        py-10 lg:py-16 text-center">
          <div className="mx-auto" style={{ maxWidth:'460px' }}>
            <p className="font-serif font-black text-white"
              style={{
                fontSize:'clamp(18px, 2.21vw, 28px)',
                letterSpacing:'-0.025em',
                lineHeight:1.15,
                marginBottom:'12px',
              }}>
              Without a TFN, you could be taxed<br className="hidden lg:block" /> at a much higher rate
            </p>
            <p className="font-light"
              style={{
                fontSize:'clamp(13px, 1.3vw, 15px)',
                color:'rgba(255,255,255,0.68)',
                maxWidth:'34ch',
                margin:'0 auto',
                lineHeight:1.75,
              }}>
              Getting your TFN sorted early helps you avoid<br className="hidden lg:block" /> unnecessary deductions and delays
            </p>
            <div style={{ marginTop:'22px' }} className="lg:mt-8">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold"
                style={{ height:'50px', padding:'0 32px', background:'#E9A020', color:'#1A2822', borderRadius:'100px', fontSize:'15px', maxWidth:'320px', width:'100%' }}>
                Start your TFN application →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      {/*
        Mobile:  py-12, gap-5 between cards, bigger card padding
        Desktop: py-20, wider container, equal-height cards, more intro space
      */}
      <section className="py-12 lg:py-20" style={{ background:'#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl lg:max-w-2xl mx-auto text-center mb-8 lg:mb-14">
            <span className="section-label center">Why use our service</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.21vw, 30px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'10px' }}>
              We handle your TFN from start to finish
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize:'clamp(13px, 1.3vw, 15px)', lineHeight:1.7 }}>
              No ATO portals, no confusing forms, and no unnecessary delays
            </p>
          </div>

          {/* Cards — mobile: gap-5; desktop: gap-6, equal height via items-stretch */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6"
            style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'Done correctly the first time', body:'We check everything before submission to avoid errors or delays.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Start working at the correct tax rate', body:'Get your TFN sorted early so everything is set up correctly from day one.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'No ATO forms or confusion', body:"We take care of the process so you don't need to deal with government systems." },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'Fast, guided, and fully online', body:'Tell us your details and we handle everything from there.' },
            ].map((item,i) => (
              <div key={i} className="bg-white rounded-2xl flex gap-4"
                style={{
                  padding:'20px',
                  /* Desktop: more padding */
                  boxShadow:'0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)',
                }}>
                <div className="flex items-start justify-center flex-shrink-0 text-forest-500"
                  style={{ width:'36px', height:'36px', minWidth:'36px', background:'#EAF6F1', borderRadius:'8px', paddingTop:'9px', paddingLeft:'9px' }}>
                  {item.icon}
                </div>
                <div style={{ paddingTop:'2px' }}>
                  <p className="font-semibold text-ink"
                    style={{ fontSize:'clamp(13px, 1.2vw, 14px)', letterSpacing:'-0.01em', marginBottom:'6px', lineHeight:1.35 }}>
                    {item.title}
                  </p>
                  <p className="font-light text-muted"
                    style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.7 }}>
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 lg:mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height:'52px', padding:'0 36px', fontSize:'15px', maxWidth:'320px', width:'100%', marginLeft:'auto', marginRight:'auto' }}>
              Start your TFN application →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      {/*
        Mobile:  py-10, more card padding, quote → footer spacing
        Desktop: py-18, heading wider, cards equal height, larger refund amount
      */}
      <section className="py-10 lg:py-18 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

          <div className="text-center mb-7 lg:mb-10">
            <span className="section-label center">What travellers say</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(17px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', maxWidth:'30ch' }}>
              See how backpackers like you got their TFN sorted quickly
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto"
            style={{ alignItems:'stretch' }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.07)', border:'1px solid #E2EFE9' }}>
                <div className="flex gap-0.5" style={{ marginBottom:'10px' }}>
                  {Array.from({length:5}).map((_,si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1"
                  style={{ fontSize:'clamp(12.5px, 1.2vw, 14px)', lineHeight:1.78, marginBottom:'16px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between"
                  style={{ paddingTop:'14px', borderTop:'1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                      style={{ width:'34px', height:'34px', fontSize:'11px', background:t.bgColor, color:t.textColor }}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-ink" style={{ fontSize:'12px', lineHeight:1.2 }}>{t.name}</p>
                      <p className="text-subtle" style={{ fontSize:'11px', marginTop:'2px' }}>{t.from}</p>
                    </div>
                  </div>
                  {/* Desktop: larger and more prominent refund amount */}
                  <span className="font-serif font-black text-forest-500 flex-shrink-0"
                    style={{ fontSize:'clamp(18px, 2vw, 22px)', letterSpacing:'-0.03em' }}>
                    {t.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────────────────── */}
      {/*
        Mobile:  py-12, gap-5, more padding, better line-height
        Desktop: py-20, equal-height cards, wider container, stronger CTA
      */}
      <section className="py-12 lg:py-20" style={{ background:'#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-12">
            <span className="section-label center">Why not do it yourself</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(17px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              There&apos;s a simpler way to get your TFN sorted
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto"
            style={{ alignItems:'stretch' }}>

            {/* Left card */}
            <div className="rounded-2xl"
              style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted"
                style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Apply through the ATO yourself
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Confusing government forms and steps','Small mistakes can delay your TFN','No support if something goes wrong','You handle the whole process on your own'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}>
                      <circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/>
                      <path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right card */}
            <div className="rounded-2xl flex flex-col"
              style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500"
                style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Use our guided TFN service
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['Simple, guided process from start to finish','We check everything before submission','Done correctly the first time','Real support if you need help at any step'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}>
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                Start your TFN application →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      {/*
        Mobile:  py-12, step gap 24px, connecting line visible, CTA margin-top
        Desktop: py-20, bigger step circles, thicker line, wider spread, more intro space
      */}
      <section id="how-to-apply" className="py-12 lg:py-20" style={{ background:'#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-10 lg:mb-16">
            <span className="section-label center">How to apply</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.21vw, 30px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'10px' }}>
              Apply in minutes.<br />
              <em className="not-italic font-normal text-forest-400">Start working sooner.</em>
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize:'clamp(13px, 1.3vw, 15px)', lineHeight:1.7 }}>
              Simple, guided process from start to finish
            </p>
          </div>

          {/* ── Desktop: horizontal 4-step ── */}
          <div className="hidden lg:block" style={{ marginBottom:'56px' }}>
            <div className="relative flex items-start">
              {/* Thicker, more refined connecting line */}
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background:'linear-gradient(90deg, #C8EAE0 0%, #0B5240 20%, #0B5240 80%, #C8EAE0 100%)', zIndex:0 }}
                aria-hidden="true" />
              {STEPS.map((s,i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex:1 }}>
                  {/* Larger circle on desktop */}
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width:'40px', height:'40px', background:'#0B5240', fontSize:'15px', marginBottom:'20px', boxShadow:'0 0 0 5px #EEF7F2, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize:'14px', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.3 }}>
                    {s.title}
                  </p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize:'12.5px', lineHeight:1.7 }}>
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Mobile: vertical steps ── */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom:'32px', gap:'0' }}>
            {STEPS.map((s,i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length-1 ? '24px':'0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width:'30px', height:'30px', background:'#0B5240', fontSize:'13px', flexShrink:0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length-1 && (
                    <div className="flex-1 w-[2px] mt-2"
                      style={{ minHeight:'22px', background:'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop:'4px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize:'14px', marginBottom:'4px', lineHeight:1.3 }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize:'13px', lineHeight:1.7 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary"
              style={{ height:'52px', padding:'0 40px', fontSize:'15px', maxWidth:'320px', width:'100%', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
              Start your TFN application →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      {/*
        Mobile:  py-12, text-center left col
        Desktop: py-20, wider gap between left and accordion, accordion rows taller
      */}
      <section className="py-12 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-14 items-start">

            <div className="text-center">
              <span className="section-label center">Questions</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(17px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                TFN questions, answered.
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'clamp(12.5px, 1.2vw, 14px)', lineHeight:1.7, marginBottom:'24px' }}>
                Have a question? Message us on WhatsApp.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 28px', fontSize:'14px', width:'100%', maxWidth:'220px' }}>
                Get help now →
              </a>
            </div>

            <div className="max-w-[680px]" style={{ paddingTop:'4px' }}>
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Already have your TFN?"
        body="If you're working as a contractor or freelancer, you may also need an ABN to invoice correctly"
        cta="Check your ABN eligibility →"
        href="/abn"
      />
    </>
  )
}

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
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN Application</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                TFN Application
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{ fontSize:'clamp(24px,3.2vw,44px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'10px' }}>
              {/* Desktop: 2 lines — line 1 black, line 2 green */}
              <span className="hidden lg:block">
                <span style={{ display:'block', whiteSpace:'nowrap' }}>Get your TFN sorted quickly &amp;</span>
                <span style={{ display:'block', whiteSpace:'nowrap', color:'#0B5240' }}>start working sooner</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block' }}>Get your TFN sorted quickly &amp;</span>
                <span style={{ display:'block', color:'#0B5240' }}>start working sooner</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              We make sure your TFN is done correctly the first time.
            </p>

            <p className="font-light"
              style={{ fontSize:'clamp(13px,1.2vw,15px)', lineHeight:1.65, color:'rgba(10,15,13,0.58)', maxWidth:'44ch', marginBottom:'0' }}>
              Without a TFN, you may be taxed at a higher rate.
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Apply for a TFN →
              </a>
              <a href="#how-to-apply"
                className="inline-flex btn-ghost-dark justify-center"
                style={{ height:'52px', padding:'0 24px', fontSize:'15px', flex:'1', width:'100%' }}>
                See how it works →
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

      {/* ── URGENCY ───────────────────────────────────────────────────────── */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-10 lg:py-16 text-center">
          <div className="mx-auto" style={{ maxWidth:'460px' }}>
            <p className="font-serif font-black text-white"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', letterSpacing:'-0.025em', lineHeight:1.15, marginBottom:'12px' }}>
              Without a TFN, you could be taxed<br className="hidden lg:block" /> at a much higher rate
            </p>
            <p className="font-light"
              style={{ fontSize:'clamp(13px, 1.3vw, 15px)', color:'rgba(255,255,255,0.68)', maxWidth:'34ch', margin:'0 auto', lineHeight:1.75 }}>
              Getting your TFN sorted early helps you avoid<br className="hidden lg:block" /> unnecessary deductions and delays
            </p>
            <div style={{ marginTop:'22px' }} className="lg:mt-8">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold"
                style={{ height:'50px', padding:'0 32px', background:'#E9A020', color:'#1A2822', borderRadius:'100px', fontSize:'15px', maxWidth:'320px', width:'100%' }}>
                Apply for a TFN →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-20" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl lg:max-w-2xl mx-auto text-center mb-8 lg:mb-14">
            <span className="section-label center">Why use our service</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'10px' }}>
              We handle your TFN from start to finish
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize:'clamp(13px, 1.3vw, 15px)', lineHeight:1.7 }}>
              No ATO portals, no confusing forms, and no unnecessary delays
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'Done correctly the first time', body:'We check everything before submission to avoid errors or delays.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Start working at the correct tax rate', body:'Get your TFN sorted early so everything is set up correctly from day one.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'No ATO forms or confusion', body:"We handle everything for you so you don't need to deal with government systems." },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'Fast, guided, and fully online', body:'Tell us your details and we handle everything for you from there.' },
            ].map((item,i) => (
              <div key={i} className="bg-white rounded-2xl flex gap-4"
                style={{ padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)' }}>
                <div className="flex items-start justify-center flex-shrink-0 text-forest-500"
                  style={{ width:'36px', height:'36px', minWidth:'36px', background:'#EAF6F1', borderRadius:'8px', paddingTop:'9px', paddingLeft:'9px' }}>
                  {item.icon}
                </div>
                <div style={{ paddingTop:'2px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize:'clamp(13px, 1.2vw, 14px)', letterSpacing:'-0.01em', marginBottom:'6px', lineHeight:1.35 }}>{item.title}</p>
                  <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.7 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 lg:mt-10">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
              style={{ height:'52px', padding:'0 36px', fontSize:'15px', maxWidth:'320px', width:'100%', marginLeft:'auto', marginRight:'auto' }}>
              Apply for a TFN →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-18 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center mb-7 lg:mb-10">
            <span className="section-label center">What travellers say</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', maxWidth:'30ch' }}>
              See how backpackers like you got their TFN sorted quickly
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
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
                <div className="flex items-center justify-between" style={{ paddingTop:'14px', borderTop:'1px solid #E2EFE9' }}>
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
      <section className="py-12 lg:py-20" style={{ background:'#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-12">
            <span className="section-label center">Why not do it yourself</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px' }}>
              There&apos;s a simpler way to get your TFN sorted
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-3xl lg:max-w-4xl mx-auto" style={{ alignItems:'stretch' }}>
            <div className="rounded-2xl" style={{ padding:'22px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Apply through the ATO yourself
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
                {['Confusing government forms and steps','Small mistakes can delay your TFN','No support if something goes wrong','You handle the whole process on your own'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl flex flex-col" style={{ padding:'22px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'18px' }}>
                Use our guided TFN service
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:'12px', marginBottom:'24px', flex:'1' }}>
                {['Simple, guided process from start to finish','We check everything before submission','Done correctly the first time','Real support if you need help at any step'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'3px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'clamp(12px, 1.1vw, 13px)', lineHeight:1.75 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex"
                style={{ height:'50px', padding:'0 24px', fontSize:'14px', width:'100%', justifyContent:'center' }}>
                Apply for a TFN →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-to-apply" className="py-12 lg:py-20" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center mb-10 lg:mb-16">
            <span className="section-label center">How to apply</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'10px' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted" style={{ fontSize:'clamp(13px, 1.3vw, 15px)', lineHeight:1.7 }}>
              Simple, guided process from start to finish
            </p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom:'56px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background:'linear-gradient(90deg, #C8EAE0 0%, #0B5240 20%, #0B5240 80%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s,i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-3" style={{ zIndex:1 }}>
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width:'40px', height:'40px', background:'#0B5240', fontSize:'15px', marginBottom:'18px', boxShadow:'0 0 0 5px #EEF7F2, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize:'14px', marginBottom:'7px', letterSpacing:'-0.01em', lineHeight:1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize:'12.5px', lineHeight:1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom:'28px', gap:'0' }}>
            {STEPS.map((s,i) => (
              <div key={i} className="flex gap-3.5" style={{ paddingBottom: i < STEPS.length-1 ? '18px':'0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width:'28px', height:'28px', background:'#0B5240', fontSize:'12px', flexShrink:0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length-1 && (
                    <div className="flex-1 mt-1.5"
                      style={{ width:'1px', minHeight:'18px', background:'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop:'3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize:'13.5px', marginBottom:'3px', letterSpacing:'-0.01em', lineHeight:1.3 }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize:'12.5px', lineHeight:1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 lg:mt-12">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary"
              style={{ height:'52px', padding:'0 40px', fontSize:'15px', maxWidth:'320px', width:'100%', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
              Apply for a TFN →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center">
              <span className="section-label center">Questions</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
                TFN questions, answered.
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13.5px', lineHeight:1.7, marginBottom:'24px' }}>
                Have a question? Message us on WhatsApp.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 28px', fontSize:'14px', width:'100%', maxWidth:'220px' }}>
                Get help now →
              </a>
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
        heading="Already have your TFN?"
        body="If you're working as a contractor or freelancer, you may also need an ABN to invoice correctly"
        cta="Check your ABN eligibility →"
        href="/abn"
      />
    </>
  )
}

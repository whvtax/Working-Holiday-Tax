import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Working Holiday Tax - Australian Tax Help for WHV Holders',
  description: 'TFN, tax return, super withdrawal and ABN for Working Holiday Visa holders in Australia. Registered tax agent. Ask us anything - free.',
}

const IconDoc   = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconLock  = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="6" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6.5 6V5a3.5 3.5 0 017 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M7.5 11l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconClock = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconPlus  = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6.5v7M7 10h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconStar  = () => (<svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const CheckIcon = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M3.5 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

const TESTIMONIALS = [
  { name:"Liam O'Brien", from:'Ireland · WHV 417', quote:"I had multiple employers and no idea what to do. They handled everything and made it easy.", amount:'$3,200', initials:'L', bgColor:'#DBEAFE', textColor:'#1E40AF' },
  { name:'Emma T.',      from:'United Kingdom · WHV 417', quote:"They handled my TFN and tax return fast. I didn't have to stress about anything.", amount:'$2,450', initials:'E', bgColor:'#FCE7F3', textColor:'#9D174D' },
  { name:'Max Fischer',  from:'Germany · WHV 417', quote:"They explained everything simply and helped me claim money I didn't even know about.", amount:'$4,100', initials:'M', bgColor:'#D1FAE5', textColor:'#065F46' },
]

const STEPS = [
  { n:'1', title:'Tell us about your situation', body:"TFN, tax return, super - we'll guide you." },
  { n:'2', title:'Send your details in minutes',  body:'Quick checklist, no complicated forms.' },
  { n:'3', title:'We handle everything for you',  body:'We prepare, lodge, and manage it all.' },
  { n:'4', title:'Get your money back',           body:'Refund goes straight to your account.' },
]

const SERVICES = [
  { n:'01', href:'/tfn',            icon:<IconDoc />,   title:'TFN Application',  desc:'Start working at the correct tax rate from day one.' },
  { n:'02', href:'/abn',            icon:<IconPlus />,  title:'ABN Registration',  desc:'Set up your ABN so you can work and invoice properly.' },
  { n:'03', href:'/tax-return',     icon:<IconLock />,  title:'Tax Return',        desc:'Get your tax refund handled correctly with the ATO.' },
  { n:'04', href:'/superannuation', icon:<IconClock />, title:'Super Withdrawal',  desc:'Claim your super back when you leave Australia.' },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        {/* Mobile: compact padding · Desktop: generous padding */}
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 pt-12 pb-10 lg:pt-14 lg:pb-12 text-center">

          <div className="inline-flex items-center gap-2 mb-4 lg:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize:'10px', letterSpacing:'0.18em', color:'rgba(11,82,64,0.65)' }}>Working Holiday Visa Specialist</span>
          </div>

          {/* Mobile: natural wrap · Desktop: explicit 2-line break */}
          <h1 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize:'clamp(20px, 3.06vw, 42px)', lineHeight:1.1, letterSpacing:'-0.03em', marginBottom:'14px' }}>
              {/* Desktop: locked 2 lines - nowrap per line */}
              <span className="hidden lg:block">
                <span style={{ display:'block', whiteSpace:'nowrap' }}>Confused about tax in Australia?</span>
                <span style={{ display:'block', whiteSpace:'nowrap', color:'#0B5240' }}>We’ve got you covered.</span>
              </span>

              <span className="lg:hidden" style={{ display:'block' }}>
                <span style={{ display:'block', whiteSpace:'nowrap', fontSize:'22px' }}>Confused about tax in Australia?</span>
                <span style={{ display:'block', color:'#0B5240', whiteSpace:'nowrap', fontSize:'22px' }}>We’ve got you covered.</span>
              </span>
            </h1>

          {/* Mobile: shorter maxWidth to keep 2-3 lines · Desktop: wider */}
          <p className="font-light mx-auto"
            style={{ fontSize:'16px', lineHeight:1.7, color:'rgba(10,15,13,0.55)', maxWidth:'34ch', marginBottom:'10px' }}>
            <span className="hidden lg:block">TFN, ABN, Tax Return &amp; Super<br />we handle everything for you</span>
            <span className="lg:hidden">TFN, ABN, Tax Return &amp; Super -<br />we handle everything for you</span>
          </p>

          {/* Mobile: tighter top margin · Desktop: more breathing room */}
          <div style={{ marginTop:'24px', marginBottom:'16px' }} className="lg:mt-8 lg:mb-4">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height:'52px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', maxWidth:'300px', width:'100%', marginLeft:'auto', marginRight:'auto' }}>
              Start your tax return →
            </a>
          </div>

          {/* Mobile: 2×2 grid · Desktop: single row */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 lg:flex lg:flex-row lg:flex-nowrap lg:justify-center lg:items-center lg:gap-y-0 lg:gap-x-7 mx-auto">
            {['1,200+ backpackers helped','4.9★ from 300+ reviews','45+ countries served.','Most replies within 1 hour'].map((label,i) => (
              <span key={i} className="inline-flex items-center gap-1.5 whitespace-nowrap"
                style={{ fontSize:'12px', color:'rgba(10,15,13,0.5)' }}>
                <CheckIcon />{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENCY STRIP ────────────────────────────────────────────────── */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 py-10 lg:py-14 text-center">
          {/* Desktop: tighter maxWidth for 2-line break */}
          <p className="font-serif font-black text-white mx-auto"
            style={{ fontSize:'clamp(19px, 2.04vw, 26px)', letterSpacing:'-0.025em', lineHeight:1.15, marginBottom:'10px', maxWidth:'22ch' }}>
            Without a TFN, you lose 47% of your income.
          </p>
          <p className="font-light mx-auto"
            style={{ fontSize:'clamp(13px, 1.5vw, 15px)', color:'rgba(255,255,255,0.65)', maxWidth:'34ch', marginBottom:'0', textAlign:'center', lineHeight:1.7 }}>
            Most backpackers lose money before they even realise it. Don&apos;t be one of them.
          </p>
          <div style={{ marginTop:'20px' }} className="lg:mt-8">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold transition-all"
              style={{ height:'48px', padding:'0 28px', background:'#E9A020', color:'#1A2822', borderRadius:'100px', fontSize:'14px', maxWidth:'320px', width:'100%' }}>
              Stop losing money, get your TFN →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 text-center">

          <span className="section-label center">Why us</span>

          <h2 className="font-serif font-black text-ink mx-auto"
            style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.12, letterSpacing:'-0.025em', maxWidth:'22ch', marginTop:'10px', marginBottom:'10px' }}>
            Built for backpackers on a Working Holiday visa.
          </h2>

          <p className="font-light text-muted mx-auto"
            style={{ fontSize:'clamp(14px, 1.5vw, 16px)', lineHeight:1.7, maxWidth:'36ch', marginBottom:'32px', textAlign:'center' }}>
            We deal with this every day - and know exactly how to maximise your refund.
          </p>

          {/* Mobile: 1-col · Desktop: 4-col with bigger padding and gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-10" style={{ marginBottom:'36px' }}>
            {[
              { title:'Backpacker tax refund experts',   body:<>We focus only on working holiday tax,<br />so we know how to get you the most back.</> },
              { title:'ATO Compliant Service',             body:<>Fully compliant with ATO rules,<br />under a registered tax agent&apos;s supervision.</> },
              { title:'Real support, no tax jargon',     body:<>We guide you step by step and explain<br />everything clearly in simple English.</> },
              { title:'We handle everything for you',    body:<>No paperwork or stress, we handle<br />everything for you from start to finish.</> },
            ].map((item,i) => (
              <div key={i} className="pt-4 lg:pt-6 text-center" style={{ borderTop:'1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis" style={{ fontSize:'clamp(13px, 1.2vw, 13.5px)', marginBottom:'6px', lineHeight:1.35 }}>{item.title}</h3>
                <p className="font-light text-muted leading-[1.7]" style={{ fontSize:'clamp(12px, 1.1vw, 13px)' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop:'8px' }} className="lg:mt-4">
            <Link href="#how-it-works" className="btn-ghost-dark inline-flex" style={{ height:'44px', padding:'0 24px', fontSize:'13.5px' }}>
              Start your tax return →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24" style={{ background:'#F4F9F6' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom:'28px' }}>
            <span className="section-label center">Client stories</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', maxWidth:'26ch' }}>
              See how much backpackers like you are getting back.
            </h2>
          </div>

          {/* Mobile: 1-col · Desktop: 3-col with bigger padding and gap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding:'18px', boxShadow:'0 1px 4px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)' }}
                /* Desktop inline override for bigger padding */
              >
                <div style={{ padding:'0', boxShadow:'none' }} className="hidden lg:block" />
                <div className="flex gap-0.5" style={{ marginBottom:'10px' }}>
                  {Array.from({length:5}).map((_,si) => <IconStar key={si} />)}
                </div>
                {/* Mobile: short text, max ~2 lines via line-clamp */}
                <p className="font-light text-body flex-1 line-clamp-3 lg:line-clamp-none"
                  style={{ fontSize:'13px', lineHeight:1.7, marginBottom:'12px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between" style={{ paddingTop:'10px', borderTop:'1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                      style={{ width:'30px', height:'30px', fontSize:'11px', background:t.bgColor, color:t.textColor }}>{t.initials}</div>
                    <div>
                      <p className="font-semibold text-ink" style={{ fontSize:'12px', lineHeight:1.2 }}>{t.name}</p>
                      <p className="text-subtle" style={{ fontSize:'10.5px', marginTop:'1px' }}>{t.from}</p>
                    </div>
                  </div>
                  {/* Mobile: larger amount · Desktop: even larger */}
                  <span className="font-serif font-black text-forest-500 flex-shrink-0"
                    style={{ fontSize:'clamp(18px, 2vw, 22px)', letterSpacing:'-0.03em' }}>{t.amount}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats - mobile 2×2 grid, desktop 4-col, bigger numbers on desktop */}
          <div style={{ marginTop:'28px', paddingTop:'24px', borderTop:'1px solid #E2EFE9' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-8">
              {[
                {n:'4.9★', l:'from 300+ reviews'},
                {n:'1,200+', l:'backpackers helped'},
                {n:'< 1 hr', l:'Most replies within 1 hour'},
                {n:'100%', l:'Fully online, no paperwork'},
              ].map((s,i) => (
                <div key={i} className="text-center py-2 lg:py-3">
                  <p className="font-serif font-black text-forest-500"
                    style={{ fontSize:'clamp(18px, 2.8vw, 28px)', letterSpacing:'-0.03em', lineHeight:1 }}>{s.n}</p>
                  <p className="text-subtle"
                    style={{ fontSize:'clamp(11px, 1.1vw, 12.5px)', marginTop:'5px', lineHeight:1.4 }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-12 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom:'36px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'10px', maxWidth:'24ch' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize:'clamp(14px, 1.4vw, 16px)', lineHeight:1.7, maxWidth:'32ch', marginBottom:'4px' }}>
              <em className="not-italic text-forest-400">We handle everything for you, you just get paid.</em>
            </p>

          </div>

          {/* Desktop 4-step horizontal - bigger circles, thicker connector */}
          <div className="hidden lg:block" style={{ marginBottom:'56px' }}>
            <div className="relative flex items-start">
              {/* Thicker, darker connector line */}
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-5 h-[2px]"
                style={{ background:'linear-gradient(90deg, #C8EAE0 0%, #0B5240 25%, #0B5240 75%, #C8EAE0 100%)' }}
                aria-hidden="true" />
              {STEPS.map((s,i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-4" style={{ zIndex:1 }}>
                  {/* Bigger step circles on desktop */}
                  <div className="rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ width:'40px', height:'40px', background:'#0B5240', fontSize:'15px', marginBottom:'20px', boxShadow:'0 0 0 5px #fff, 0 0 0 6px #C8EAE0' }}>
                    {s.n}
                  </div>
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize:'14px', marginBottom:'8px', lineHeight:1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize:'12.5px', lineHeight:1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile vertical steps - bigger circles, more spacing */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom:'32px' }}>
            {STEPS.map((s,i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length-1 ? '24px':'0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  {/* Slightly bigger on mobile too */}
                  <div className="rounded-full flex items-center justify-center font-bold text-white"
                    style={{ width:'30px', height:'30px', background:'#0B5240', fontSize:'13px', flexShrink:0 }}>
                    {s.n}
                  </div>
                  {i < STEPS.length-1 && (
                    <div className="flex-1 w-px mt-2"
                      style={{ minHeight:'22px', background:'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }}
                      aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop:'3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize:'14px', marginBottom:'4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize:'13px', lineHeight:1.7 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center" style={{ marginTop:'8px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height:'52px', padding:'0 36px', fontSize:'15px', maxWidth:'300px', width:'100%', marginLeft:'auto', marginRight:'auto' }}>
              Start your tax return →
            </a>
            <p style={{ marginTop:'10px', fontSize:'12px', color:'#2FA880' }}>
              Free to start&nbsp;&bull;&nbsp;No upfront fees&nbsp;&bull;&nbsp;Personal support throughout
            </p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-24" style={{ background:'#EEF7F2' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">

          <div className="text-center" style={{ marginBottom:'28px' }}>
            <span className="section-label center">What we help with</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px, 2.04vw, 26px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'10px', maxWidth:'22ch' }}>
              Everything you need<br />
              <em className="not-italic font-normal text-forest-400">to manage your tax in Australia.</em>
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize:'clamp(13px, 1.3vw, 15px)', textAlign:'center', lineHeight:1.7, maxWidth:'36ch' }}>
              From your first job to your final refund, we handle everything for you.
            </p>
          </div>

          {/* Desktop: bigger padding inside cards, larger gap between cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding:'18px', boxShadow:'0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <span className="font-medium uppercase text-subtle" style={{ fontSize:'10px', letterSpacing:'0.1em', marginBottom:'10px' }}>{s.n}</span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0"
                  style={{ marginBottom:'10px' }}>{s.icon}</span>
                <h3 className="font-semibold text-ink" style={{ fontSize:'13.5px', marginBottom:'5px' }}>{s.title}</h3>
                <p className="font-light text-muted leading-[1.65] flex-1" style={{ fontSize:'12px', marginBottom:'12px' }}>{s.desc}</p>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3" style={{ fontSize:'12px' }}>
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Start here"
        heading="Get your tax sorted properly"
        headingEm="in Australia or abroad."
        sub={<>We handle your TFN, tax return, super and ABN<span className="hidden lg:inline"> - all in one place.</span><span className="lg:hidden"><br />all in one place.</span></>}
        primaryLabel="Start your tax return"
        trustLine="We usually respond within 1 hour"
        clipTop
      />
    </>
  )
}

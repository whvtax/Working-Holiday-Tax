import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'

export const metadata: Metadata = {
  title: 'Working Holiday Tax - Australian Tax Help for WHV Holders',
  description: 'TFN, tax return, super withdrawal and ABN for Working Holiday Visa holders in Australia. Registered tax agent. Ask us anything - free.',
}

const IconDoc = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><line x1="6" y1="7.5" x2="14" y2="7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="10.5" x2="11" y2="10.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><line x1="6" y1="13.5" x2="9" y2="13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>)
const IconLock = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="6" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.4"/><path d="M6.5 6V5a3.5 3.5 0 017 0v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M7.5 11l2 2 3.5-3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconClock = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>)
const IconPlus = () => (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6.5v7M7 10h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>)
const IconStar = () => (<svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const CheckIcon = () => (<svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M3.5 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

const TESTIMONIALS = [
  { name:"Liam O'Brien", from:'Ireland · WHV 417', quote:'I was stressed about my super - four months, three different employers. They guided me through everything and helped me get it all back.', amount:'$3,200', initials:'L', bgColor:'#DBEAFE', textColor:'#1E40AF' },
  { name:'Emma T.', from:'United Kingdom · WHV 417', quote:'Got my TFN sorted in two days, and they handled my entire tax return when I left. No stress, just money back in my account.', amount:'$2,450', initials:'E', bgColor:'#FCE7F3', textColor:'#9D174D' },
  { name:'Max Fischer', from:'Germany · WHV 417', quote:'Fast, clear, and genuinely helpful. They explained everything simply and helped me get my super back after I left.', amount:'$4,100', initials:'M', bgColor:'#D1FAE5', textColor:'#065F46' },
]

const STEPS = [
  { n:'1', title:'Tell us what you need', body:'TFN, ABN, tax return or super.' },
  { n:'2', title:'Send your details',     body:'A short checklist. Takes a few minutes.' },
  { n:'3', title:'We handle everything',  body:'We prepare, lodge and keep you updated.' },
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
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 pt-16 pb-14 text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize:'10px', letterSpacing:'0.18em', color:'rgba(11,82,64,0.65)' }}>Working Holiday Visa Specialist</span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto" style={{ fontSize:'clamp(23px, 3.06vw, 37px)', lineHeight:1.1, letterSpacing:'-0.03em', marginBottom:'16px' }}>
            Confused about tax in Australia?<br />
            <span style={{ color:'#0B5240' }}>We&apos;ve got you covered.</span>
          </h1>

          <p className="font-light mx-auto" style={{ fontSize:'16px', lineHeight:1.65, color:'rgba(10,15,13,0.55)', maxWidth:'38ch', marginBottom:'28px' }}>
            TFN, ABN, Tax Return &amp; Super - we handle everything for you, so you don&apos;t have to stress about paperwork.
          </p>

          <div style={{ marginBottom:'20px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height:'52px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', maxWidth:'300px', width:'100%', marginLeft:'auto', marginRight:'auto' }}>
              Get help with your tax →
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {['4.9★ Google rating','1,200+ clients helped','ATO compliant','By a registered tax agent'].map((label,i) => (
              <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize:'12px', color:'rgba(10,15,13,0.5)' }}>
                <CheckIcon />{label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── URGENCY STRIP ────────────────────────────────────────────────── */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 py-10 text-center">
          <p className="font-serif font-black text-white mx-auto" style={{ fontSize:'clamp(17px, 2.38vw, 27px)', letterSpacing:'-0.025em', lineHeight:1.1, marginBottom:'8px' }}>
            Without a TFN, 47% tax is withheld<br />from every payslip.
          </p>
          <p className="font-light mx-auto" style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', maxWidth:'36ch', marginBottom:'20px', textAlign:'center' }}>
            Most backpackers overpay tax in Australia<br />we make sure you don&apos;t.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold transition-all"
            style={{ height:'48px', padding:'0 28px', background:'#E9A020', color:'#1A2822', borderRadius:'100px', fontSize:'14px', maxWidth:'300px', width:'100%' }}>
            Get your TFN sorted now →
          </a>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10 text-center">
          <span className="section-label center">Why us</span>
          <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize:'clamp(17px, 2.17vw, 27px)', lineHeight:1.08, letterSpacing:'-0.025em', maxWidth:'26ch', marginTop:'10px', marginBottom:'12px' }}>
            Built for Working Holiday travellers.<br />
            <em className="not-italic font-normal text-forest-400">We understand exactly what you need.</em>
          </h2>
          <p className="font-light text-muted mx-auto" style={{ fontSize:'15px', lineHeight:1.65, maxWidth:'38ch', marginBottom:'48px', textAlign:'center' }}>
            We work with Working Holiday travellers every day,<br />so we know what works.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" style={{ marginBottom:'40px' }}>
            {[
              { title:'WHV tax specialists',       body:'Working Holiday tax is all we do. We handle your situation every day.' },
              { title:'Registered. Compliant.',    body:'Under the supervision of a registered tax agent.' },
              { title:'Real people, fast answers', body:'Real people who respond quickly and guide you through the process.' },
              { title:'We make it simple',         body:'No forms, no stress, no confusion. We handle it and keep you updated.' },
            ].map((item,i) => (
              <div key={i} className="pt-5 text-center" style={{ borderTop:'1px solid #E2EFE9' }}>
                <h3 className="font-semibold text-ink" style={{ fontSize:'13.5px', marginBottom:'6px' }}>{item.title}</h3>
                <p className="font-light text-muted leading-[1.65]" style={{ fontSize:'12.5px' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <Link href="#how-it-works" className="btn-ghost-dark inline-flex" style={{ height:'44px', padding:'0 24px', fontSize:'13.5px' }}>
            See how it works →
          </Link>
        </div>
      </section>

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background:'#F4F9F6' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="text-center" style={{ marginBottom:'36px' }}>
            <span className="section-label center">Client stories</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize:'clamp(19px, 2.38vw, 29px)', lineHeight:1.08, letterSpacing:'-0.025em', marginTop:'10px' }}>
              Real experiences from backpackers like you.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding:'20px', boxShadow:'0 1px 4px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)' }}>
                <div className="flex gap-0.5" style={{ marginBottom:'12px' }}>
                  {Array.from({length:5}).map((_,si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1" style={{ fontSize:'13px', lineHeight:1.75, marginBottom:'14px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between" style={{ paddingTop:'12px', borderTop:'1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{ width:'32px', height:'32px', fontSize:'11px', background:t.bgColor, color:t.textColor }}>{t.initials}</div>
                    <div>
                      <p className="font-semibold text-ink" style={{ fontSize:'12px', lineHeight:1.2 }}>{t.name}</p>
                      <p className="text-subtle" style={{ fontSize:'11px', marginTop:'2px' }}>{t.from}</p>
                    </div>
                  </div>
                  <span className="font-serif font-black text-forest-500 flex-shrink-0" style={{ fontSize:'17px', letterSpacing:'-0.03em' }}>{t.amount}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop:'32px', paddingTop:'28px', borderTop:'1px solid #E2EFE9' }}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[{n:'4.9★',l:'Google rating'},{n:'1,200+',l:'WHV clients helped'},{n:'<1 hr',l:'Response time'},{n:'100%',l:'Online service'}].map((s,i) => (
                <div key={i} className="text-center">
                  <p className="font-serif font-black text-forest-500" style={{ fontSize:'clamp(17px, 2.55vw, 22px)', letterSpacing:'-0.03em', lineHeight:1 }}>{s.n}</p>
                  <p className="text-subtle" style={{ fontSize:'11.5px', marginTop:'4px' }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="text-center" style={{ marginBottom:'48px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize:'clamp(20px, 2.55vw, 32px)', lineHeight:1.08, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
              4 simple steps.<br />
              <em className="not-italic font-normal text-forest-400">We take care of it for you.</em>
            </h2>
            <p className="font-light text-muted" style={{ fontSize:'15px' }}>You send us your details and we take care of the rest.</p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom:'48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(16.6%)] right-[calc(16.6%)] top-4 h-px" style={{ background:'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
              {STEPS.map((s,i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex:1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background:'#0B5240', fontSize:'13px', marginBottom:'16px', boxShadow:'0 0 0 4px #fff, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize:'13.5px', marginBottom:'6px' }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize:'12px', lineHeight:1.65 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ gap:'0', marginBottom:'32px' }}>
            {STEPS.map((s,i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length-1 ? '20px':'0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white" style={{ background:'#0B5240', fontSize:'12px' }}>{s.n}</div>
                  {i < STEPS.length-1 && <div className="flex-1 w-px mt-2" style={{ minHeight:'20px', background:'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop:'3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize:'13.5px', marginBottom:'4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize:'12.5px', lineHeight:1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex" style={{ height:'52px', padding:'0 32px', fontSize:'15px', maxWidth:'300px', width:'100%', marginLeft:'auto', marginRight:'auto' }}>
              Get help with your tax →
            </a>
            <p style={{ marginTop:'10px', fontSize:'12px', color:'#2FA880' }}>Free to start&nbsp;•&nbsp;No upfront fees&nbsp;•&nbsp;Personal support throughout</p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20" style={{ background:'#EEF7F2' }}>
        <div className="max-w-5xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="text-center" style={{ marginBottom:'36px' }}>
            <span className="section-label center">What we help with</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize:'clamp(20px, 2.55vw, 32px)', lineHeight:1.08, letterSpacing:'-0.025em', marginTop:'10px', marginBottom:'12px' }}>
              Everything you need<br />
              <em className="not-italic font-normal text-forest-400">to sort your tax in Australia.</em>
            </h2>
            <p className="font-light text-muted" style={{ fontSize:'15px', textAlign:'center' }}>From your first job to your final refund,<br />we take care of it for you.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)' }}>
                <span className="font-medium uppercase text-subtle" style={{ fontSize:'10px', letterSpacing:'0.1em', marginBottom:'10px' }}>{s.n}</span>
                <span className="w-8 h-8 rounded-lg flex items-center justify-center text-forest-500 bg-forest-50 transition-all group-hover:bg-forest-500 group-hover:text-white flex-shrink-0" style={{ marginBottom:'12px' }}>{s.icon}</span>
                <h3 className="font-semibold text-ink" style={{ fontSize:'13.5px', marginBottom:'6px' }}>{s.title}</h3>
                <p className="font-light text-muted leading-[1.65] flex-1" style={{ fontSize:'12px', marginBottom:'14px' }}>{s.desc}</p>
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
        heading="Get your tax done right."
        headingEm="From anywhere in Australia or overseas."
        sub="TFN, ABN, tax return, and super handled for Working Holiday travellers."
        primaryLabel="Get help with your tax"
        clipTop
      />
    </>
  )
}

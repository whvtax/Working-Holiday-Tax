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
  { n:'1', title:'Tell us what you need', body:'Share your visa details and situation.' },
  { n:'2', title:'Send your details',     body:'Passport and basic info. Takes minutes.' },
  { n:'3', title:'We handle everything',  body:'We submit your application correctly.' },
]

const TESTIMONIALS = [
  { name:"Liam O'Brien", from:'Ireland · WHV 417', quote:'I was stressed about my super - four months, three different employers. They guided me through everything and helped me get it all back.', amount:'$3,200', initials:'L', bgColor:'#DBEAFE', textColor:'#1E40AF' },
  { name:'Emma T.', from:'United Kingdom · WHV 417', quote:'Got my TFN sorted in two days, and they handled my entire tax return when I left. No stress, just money back in my account.', amount:'$2,450', initials:'E', bgColor:'#FCE7F3', textColor:'#9D174D' },
]

const IconStar = () => (<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const CheckIcon = () => (<svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>)

export default function TFNPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 pt-10 pb-10 lg:pt-14 lg:pb-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6" style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">TFN Application</span>
          </nav>

          <div className="max-w-[640px] mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>TFN Application</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize:'clamp(24px, 3.23vw, 41px)', lineHeight:1.06, letterSpacing:'-0.03em', marginBottom:'14px' }}>
              Get your TFN sorted quickly{' '}
              <span style={{ color:'#0B5240' }}>and start working sooner.</span>
            </h1>

            <p className="font-semibold text-ink" style={{ fontSize:'15px', letterSpacing:'-0.01em', marginBottom:'6px' }}>
              We make sure your application is correct the first time.
            </p>

            <p className="font-light mx-auto" style={{ fontSize:'14.5px', lineHeight:1.65, color:'rgba(10,15,13,0.6)', maxWidth:'40ch', marginBottom:'24px' }}>
              Without a TFN you pay 47% tax. Apply before you start work.
            </p>

            {/* Mobile: primary only. Desktop (sm+): primary + How it works */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3" style={{ marginBottom:'20px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center w-full sm:w-auto"
                style={{ height:'52px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', maxWidth:'280px' }}>
                Start your TFN →
              </a>
              <a href="#how-to-apply" className="hidden sm:inline-flex btn-ghost-dark justify-center" style={{ height:'52px', padding:'0 24px', fontSize:'15px' }}>
                How it works →
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 mx-auto" style={{ maxWidth:'300px' }}>
              {['1,200+ travellers helped','Response within 1 hour','ATO compliant','By a registered tax agent'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <CheckIcon />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── URGENCY ───────────────────────────────────────────────────────── */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10 py-8 lg:py-10 text-center">
          <div className="max-w-[560px] mx-auto">
            <p className="font-serif font-black text-white" style={{ fontSize:'clamp(17px, 2.21vw, 26px)', letterSpacing:'-0.025em', lineHeight:1.1, marginBottom:'8px' }}>
              Without a TFN, 47% tax is withheld<br />from every payslip.
            </p>
            <p className="font-light" style={{ fontSize:'14px', color:'rgba(255,255,255,0.65)', marginBottom:'20px', maxWidth:'38ch', margin:'0 auto 20px' }}>
              Apply before you start work to pay the correct rate<br />from day one.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold"
              style={{ height:'46px', padding:'0 24px', background:'#E9A020', color:'#1A2822', borderRadius:'100px', fontSize:'14px' }}>
              Apply now →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ──────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background:'#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom:'32px' }}>
            <span className="section-label center">Why use our service</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize:'clamp(19px, 2.21vw, 27px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'8px' }}>
              We handle everything for you.
            </h2>
            <p className="font-light text-muted" style={{ fontSize:'14px', lineHeight:1.65 }}>
              No ATO portals, no confusing forms, no risk of mistakes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ marginBottom:'32px' }}>
            {[
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M10 2v8l5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/></svg>, title:'Done correctly the first time', body:'We check everything before submission. No errors, no re-submissions, no delays.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 10h14M10 3l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'Start working at the correct rate immediately', body:'Get your TFN fast and start earning without overpaying tax from day one.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><rect x="2" y="2" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2.5 2.5 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>, title:'No ATO forms or confusion', body:'We handle the process so you never need to touch a government portal.' },
              { icon:<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.4"/><path d="M10 6v4.5l3 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>, title:'Fast, guided, and fully online', body:'Tell us your details and we take care of the rest. Reply within the hour.' },
            ].map((item,i) => (
              <div key={i} className="bg-white rounded-2xl flex gap-4" style={{ padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)' }}>
                <div className="flex items-center justify-center flex-shrink-0 text-forest-500" style={{ width:'36px', height:'36px', minWidth:'36px', background:'#EAF6F1', borderRadius:'8px' }}>{item.icon}</div>
                <div>
                  <p className="font-semibold text-ink" style={{ fontSize:'13.5px', letterSpacing:'-0.01em', marginBottom:'4px' }}>{item.title}</p>
                  <p className="font-light text-muted" style={{ fontSize:'12.5px', lineHeight:1.65 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex" style={{ height:'52px', padding:'0 32px', fontSize:'15px', maxWidth:'300px', width:'100%', marginLeft:'auto', marginRight:'auto' }}>
              Start your TFN →
            </a>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom:'28px' }}>
            <span className="section-label center">What travellers say</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize:'clamp(17px, 2.04vw, 24px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px' }}>
              Real experiences from backpackers like you.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {TESTIMONIALS.map((t,i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding:'20px', boxShadow:'0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.07)', border:'1px solid #E2EFE9' }}>
                <div className="flex gap-0.5" style={{ marginBottom:'10px' }}>{Array.from({length:5}).map((_,si) => <IconStar key={si} />)}</div>
                <p className="font-light text-body flex-1" style={{ fontSize:'13px', lineHeight:1.75, marginBottom:'14px' }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between" style={{ paddingTop:'12px', borderTop:'1px solid #E2EFE9' }}>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{ width:'32px', height:'32px', fontSize:'11px', background:t.bgColor, color:t.textColor }}>{t.initials}</div>
                    <div>
                      <p className="font-semibold text-ink" style={{ fontSize:'12px', lineHeight:1.2 }}>{t.name}</p>
                      <p className="text-subtle" style={{ fontSize:'11px', marginTop:'2px' }}>{t.from}</p>
                    </div>
                  </div>
                  <span className="font-serif font-black text-forest-500 flex-shrink-0" style={{ fontSize:'16px', letterSpacing:'-0.03em' }}>{t.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16" style={{ background:'#F4F9F6' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom:'28px' }}>
            <span className="section-label center">Why not do it yourself</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize:'clamp(17px, 2.04vw, 24px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px' }}>
              There is a better way.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="rounded-2xl" style={{ padding:'20px', background:'#fff', border:'1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'16px' }}>Apply via ATO yourself</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
                {['Confusing government forms','Risk of mistakes that cause delays','No guidance if something goes wrong','You figure out the process alone'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'2px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    <p className="font-light text-muted" style={{ fontSize:'12.5px', lineHeight:1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl" style={{ padding:'20px', background:'#EAF6F1', border:'1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize:'11px', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:'16px' }}>Use our guided service</p>
              <div style={{ display:'flex', flexDirection:'column', gap:'10px', marginBottom:'20px' }}>
                {['Fast, guided process from start to finish','No errors - we check everything for you','Done correctly the first time','Real support if you have any questions'].map((item,i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink:0, marginTop:'2px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <p className="font-semibold text-ink" style={{ fontSize:'12.5px', lineHeight:1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex" style={{ height:'46px', padding:'0 22px', fontSize:'13.5px', width:'100%', justifyContent:'center' }}>
                Start your TFN →
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section id="how-to-apply" className="py-12 lg:py-16" style={{ background:'#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom:'40px' }}>
            <span className="section-label center">How to apply</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize:'clamp(19px, 2.21vw, 27px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'8px' }}>
              Apply in minutes.<br />
              <em className="not-italic font-normal text-forest-400">Start working sooner.</em>
            </h2>
            <p className="font-light text-muted" style={{ fontSize:'14px' }}>Free to apply. Simple and fully guided.</p>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom:'40px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(16.6%)] right-[calc(16.6%)] top-4 h-px" style={{ background:'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)', zIndex:0 }} aria-hidden="true" />
              {STEPS.map((s,i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex:1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background:'#0B5240', fontSize:'13px', marginBottom:'16px', boxShadow:'0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize:'13.5px', letterSpacing:'-0.01em', marginBottom:'6px' }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize:'12px', lineHeight:1.65 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom:'32px' }}>
            {STEPS.map((s,i) => (
              <div key={i} className="flex gap-3" style={{ paddingBottom:i < STEPS.length-1 ? '20px':'0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background:'#0B5240', fontSize:'12px' }}>{s.n}</div>
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
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height:'52px', padding:'0 32px', fontSize:'15px', maxWidth:'300px', width:'100%', display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
              Start your TFN →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-6 lg:gap-7 items-start">
            <div className="text-center">
              <span className="section-label center">Questions</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize:'clamp(17px, 2.04vw, 24px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'10px' }}>
                TFN questions, answered.
              </h2>
              <p className="font-light text-muted" style={{ fontSize:'13px', lineHeight:1.65, marginBottom:'24px' }}>
                Have a question? Message us on WhatsApp.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 24px', fontSize:'14px', width:'100%', maxWidth:'200px' }}>
                Get help now →
              </a>
            </div>
            <div className="max-w-[680px]">
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Do you already have your TFN?"
        body="If you are working as a contractor or freelancer, you may also need an ABN to invoice clients correctly."
        cta="Check if you need an ABN →"
        href="/abn"
      />
    </>
  )
}

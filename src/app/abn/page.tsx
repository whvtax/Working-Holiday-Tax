import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'ABN Registration for Working Holiday Visa Holders',
  description: 'Set up your ABN correctly as a Working Holiday contractor. We handle registration and tax obligations - simple, fast, online.',
}

const faqs = [
  { question: 'Can I have both a TFN and an ABN?', answer: 'Yes. You can have both, one for employment and one for contract work.' },
  { question: 'Can I get an ABN without a TFN?', answer: 'No. You must have a TFN before applying for an ABN.' },
  { question: 'Do I need to register for GST?', answer: 'Only if you earn over $75,000 per year. Most people on a Working Holiday do not need GST.' },
  { question: 'What happens to my ABN when I leave Australia?', answer: 'You can cancel your ABN when you stop working in Australia. This can be done online.' },
  { question: 'Can my ABN be rejected?', answer: 'Yes. If your details do not match your work, your ABN may be rejected.' },
]

const MISTAKES = [
  { title: 'Working as an employee with an ABN', body: 'If your employer controls your work, you may not actually need an ABN.' },
  { title: 'Choosing the wrong business activity', body: 'Your ABN setup should match the work you actually do.' },
  { title: 'Not tracking your income properly',   body: 'You need to track your income and set money aside for tax.' },
  { title: 'Not lodging your tax return',         body: 'Your ABN income still needs to be reported correctly.' },
]

const STEPS = [
  { n: '1', title: 'Tell us about your work',       body: 'Share your work and visa details so we can guide you correctly.' },
  { n: '2', title: 'Send your details in minutes',  body: 'TFN and passport info - quick and simple.' },
  { n: '3', title: 'We handle everything for you',  body: 'We prepare and submit your ABN correctly.' },
  { n: '4', title: 'Get your ABN and start working', body: 'Receive your ABN within an hour and start invoicing straight away.' },
]

const CheckSVG = () => (
  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
    <circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
    <path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ABNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN Registration</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                ABN Registration
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize:'clamp(24px,3.2vw,44px)',
                lineHeight:1.06,
                letterSpacing:'-0.03em',
                marginBottom:'10px',
                maxWidth:'18ch',
              }}>
              Set up your ABN and start working as a contractor
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.3vw,15.5px)', letterSpacing:'-0.01em', marginBottom:'6px', lineHeight:1.4 }}>
              We make sure your ABN is set up correctly for the work you do
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,14.5px)',
                lineHeight:1.7,
                color:'rgba(10,15,13,0.6)',
                maxWidth:'38ch',
                marginBottom:'0',
              }}>
              No rejections or delays - everything set up correctly from the start
            </p>

            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4"
              style={{ marginTop:'22px', marginBottom:'18px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1' }}>
                Register your ABN →
              </a>
              <a href="#how-to-register"
                className="hidden lg:inline-flex btn-ghost-dark justify-center"
                style={{ height:'54px', padding:'0 24px', fontSize:'15px', flex:'1' }}>
                See how it works →
              </a>
            </div>

            <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-x-5 lg:gap-x-7 gap-y-2"
              style={{ maxWidth:'380px' }}>
              {['1,200+ backpackers helped','4.9★ from 300+ reviews','Registered Australian tax agent','Most replies within 1 hour'].map((t,i) => (
                <span key={i} className="inline-flex items-center gap-1.5"
                  style={{ fontSize:'12px', color:'rgba(10,15,13,0.45)' }}>
                  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true"><circle cx="6.5" cy="6.5" r="6" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4 6.5l2 2 3.5-3.5" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ── URGENCY STRIP ─────────────────────────────────────────────────── */}
      {/* Mobile: py-8 · Desktop: py-12 */}
      <section style={{ background:'#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 py-8 lg:py-12 text-center">
          <div className="mx-auto" style={{ maxWidth:'480px' }}>
            <p className="font-serif font-black text-white"
              style={{ fontSize:'clamp(17px,2.2vw,26px)', letterSpacing:'-0.025em', lineHeight:1.15, marginBottom:'8px' }}>
              Not sure if you need an ABN or TFN?
            </p>
            <p className="font-light"
              style={{ fontSize:'clamp(13px,1.3vw,14.5px)', color:'rgba(255,255,255,0.68)', marginBottom:'0', lineHeight:1.7, maxWidth:'36ch', margin:'0 auto' }}>
              We&apos;ll tell you exactly what you need based on your situation
            </p>
            <div style={{ marginTop:'16px' }} className="lg:mt-7">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold"
                style={{ height:'50px', padding:'0 28px', background:'#E9A020', color:'#1A2822', borderRadius:'100px', fontSize:'14px', maxWidth:'320px', width:'100%' }}>
                Get help choosing the right setup →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE HELP ───────────────────────────────────────────────────── */}
      {/* Mobile: py-10 · Desktop: py-16 */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-12">
            <span className="section-label center">How we help</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(19px,2.2vw,30px)', lineHeight:1.1, letterSpacing:'-0.025em', maxWidth:'22ch', marginTop:'8px', marginBottom:'8px', textWrap:'balance' }}>
              We help you choose the right setup
            </h2>
            <p className="font-semibold mx-auto"
              style={{ fontSize:'clamp(14px,1.4vw,16px)', lineHeight:1.4, color:'#0B5240', maxWidth:'28ch', margin:'6px auto 10px', letterSpacing:'-0.01em' }}>
              Then we handle everything for you
            </p>
            <p className="font-light text-muted"
              style={{ fontSize:'clamp(12.5px,1.1vw,13.5px)', lineHeight:1.7, maxWidth:'30ch', margin:'0 auto', color:'rgba(10,15,13,0.5)' }}>
              Simple, clear, and set up correctly from the start
            </p>
          </div>

          {/* Cards — equal height via items-stretch; mobile gap-4, desktop gap-6 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6" style={{ marginBottom:'28px', alignItems:'stretch' }}>
            {[
              { n:'01', title:'We help you choose the right setup', body:'Not sure if you need an ABN? We check your situation and give you a clear answer.' },
              { n:'02', title:'We set up your ABN correctly', body:'We handle the registration so your ABN matches your work - no delays or issues.' },
              { n:'03', title:'Set up correctly from day one', body:'Everything is done properly so you can start working without issues.' },
            ].map((item,i) => (
              <div key={i} className="rounded-2xl flex flex-col"
                style={{ padding:'18px', background:'#F7FCF9', border:'1px solid #C8EAE0' }}
                /* Desktop: larger padding */>
                <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-subtle block"
                  style={{ marginBottom:'10px' }}>{item.n}</span>
                <h3 className="font-semibold text-ink"
                  style={{ fontSize:'clamp(13px,1.2vw,14px)', letterSpacing:'-0.01em', marginBottom:'6px', lineHeight:1.35 }}>
                  {item.title}
                </h3>
                <p className="font-light text-muted leading-[1.7] flex-1"
                  style={{ fontSize:'clamp(12px,1.1vw,13px)' }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-6 lg:mt-8">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex"
              style={{ height:'52px', padding:'0 36px', fontSize:'15px', maxWidth:'320px', width:'100%' }}>
              Register your ABN →
            </a>
            <p style={{ marginTop:'10px', fontSize:'12px', color:'rgba(10,15,13,0.4)' }}>
              Australian Business Register compliant
            </p>
          </div>
        </div>
      </section>

      {/* ── COMMON MISTAKES ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background:'#FFFDF7' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-7 lg:mb-10">
            <span className="section-label center">Common mistakes</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(17px,2.04vw,26px)', lineHeight:1.1, letterSpacing:'-0.025em', maxWidth:'22ch', marginTop:'8px', marginBottom:'8px', textWrap:'balance' }}>
              Setting up your ABN incorrectly<br /><em className="not-italic font-normal text-forest-400">can cause problems later</em>
            </h2>
            <p className="font-light text-muted mx-auto"
              style={{ fontSize:'clamp(12.5px,1.1vw,13.5px)', lineHeight:1.7, maxWidth:'32ch' }}>
              These are common mistakes that can delay your setup or create issues later
            </p>
          </div>

          {/* Mobile: gap-3; desktop: gap-5, equal height */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5" style={{ alignItems:'stretch' }}>
            {MISTAKES.map((m,i) => (
              <div key={i} className="rounded-xl flex flex-col"
                style={{ padding:'16px', background:'#FFFCF5', border:'1.5px solid #F0D99A', boxShadow:'0 1px 4px rgba(0,0,0,.03)' }}>
                <div className="flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ width:'28px', height:'28px', background:'#FDF0D5', border:'1px solid #F0D99A', marginBottom:'10px' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M6 2v4M6 8.5v.5" stroke="#C47E10" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="font-semibold text-ink" style={{ fontSize:'13px', marginBottom:'5px', lineHeight:1.35 }}>{m.title}</p>
                <p className="font-light text-muted leading-[1.65] flex-1" style={{ fontSize:'12px' }}>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW TO REGISTER ───────────────────────────────────────────────── */}
      <section id="how-to-register" className="py-10 lg:py-16" style={{ background:'#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">

          <div className="max-w-xl mx-auto text-center mb-8 lg:mb-14">
            <span className="section-label center">Step by step</span>
            <h2 className="font-serif font-black text-ink mx-auto"
              style={{ fontSize:'clamp(17px,2.04vw,26px)', lineHeight:1.1, letterSpacing:'-0.025em', maxWidth:'22ch', marginTop:'8px', marginBottom:'8px', textWrap:'balance' }}>
              How it works in 4 simple steps
            </h2>
            <p className="font-light text-muted"
              style={{ fontSize:'clamp(13px,1.2vw,14.5px)', lineHeight:1.7 }}>
              Simple, guided process from start to finish
            </p>
          </div>

          {/* Desktop — full-width spread, thicker line, bigger circles */}
          <div className="hidden lg:block" style={{ marginBottom:'48px' }}>
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
                  <p className="font-semibold text-ink text-center"
                    style={{ fontSize:'14px', marginBottom:'7px', letterSpacing:'-0.01em', lineHeight:1.3 }}>{s.title}</p>
                  <p className="font-light text-muted text-center"
                    style={{ fontSize:'12.5px', lineHeight:1.7 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile — compact vertical, subtle line */}
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
        </div>
      </section>

      {/* ── WHAT IS AN ABN ────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          {/* Desktop: tighter gap between columns */}
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-10 items-start">

            <div className="text-center lg:text-left">
              <span className="section-label center">What is an ABN?</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(15px,1.87vw,22px)', lineHeight:1.1, letterSpacing:'-0.025em', maxWidth:'22ch', marginTop:'8px', marginBottom:'16px', textWrap:'balance' }}>
                An Australian Business Number (ABN) lets you work<br /><em className="not-italic font-normal text-forest-400">and invoice legally in Australia.</em>
              </h2>
              {/* Mobile: tighter maxWidth; desktop: 36ch */}
              <div>
                <p className="font-light text-body leading-[1.75] mx-auto lg:mx-0"
                  style={{ maxWidth:'34ch', marginBottom:'14px', fontSize:'13.5px' }}>
                  An ABN is an 11-digit number that identifies you when working as a contractor or freelancer in Australia. You include it on every invoice you send.
                </p>
                <p className="font-light text-body leading-[1.75] mx-auto lg:mx-0"
                  style={{ maxWidth:'34ch', fontSize:'13.5px' }}>
                  With an ABN, you get paid the full amount with no tax withheld automatically. You stay in control of your income and manage your own tax.
                </p>
              </div>
            </div>

            <div>
              <span className="section-label block" style={{ marginBottom:'10px' }}>When you need one</span>
              {/* Mobile: tighter gap */}
              <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
                {[
                  ['Freelance work', '(design, photography, writing)'],
                  ['Contract or casual jobs', 'where you invoice'],
                  ['Farm or harvest work', 'paid on ABN'],
                  ['Remote work', 'for Australian clients'],
                  ['Any job', 'where you invoice instead of receiving payslips'],
                ].map(([bold, rest],i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0 mt-0.5">
                      <circle cx="7" cy="7" r="6.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M4.5 7l2 2 3-3" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-light text-body leading-[1.5]" style={{ fontSize:'12.5px' }}>
                      <span className="font-semibold">{bold}</span> {rest}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background:'#F4F9F6' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          {/* Desktop: tighter gap between left col and accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 lg:gap-10 items-start">

            <div className="text-center lg:text-left">
              <span className="section-label center">Questions</span>
              <h2 className="font-serif font-black text-ink"
                style={{ fontSize:'clamp(17px,2.04vw,24px)', lineHeight:1.1, letterSpacing:'-0.025em', marginTop:'8px', marginBottom:'10px' }}>
                ABN questions, answered.
              </h2>
              <p className="font-light text-muted"
                style={{ fontSize:'13px', lineHeight:1.65, marginBottom:'20px' }}>
                Have a question? Message us on WhatsApp.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center"
                style={{ height:'48px', padding:'0 24px', fontSize:'14px', width:'100%', maxWidth:'200px', marginTop:'4px' }}>
                Ask us now →
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
        heading="Next step: your tax return"
        body="When the financial year ends, you'll need to lodge your tax return and declare your ABN income."
        cta="Start your tax return →"
        href="/tax-return"
      />
    </>
  )
}

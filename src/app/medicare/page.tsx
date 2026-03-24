import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { NextStep } from '@/components/ui/NextStep'

export const metadata: Metadata = {
  title: 'Medicare in Australia for Working Holiday Visa Holders',
  description: 'Understand Medicare eligibility and the Medicare levy as a Working Holiday Visa holder in Australia.',
}

const rhca = [
  'United Kingdom', 'New Zealand', 'Ireland', 'Sweden',
  'Netherlands', 'Finland', 'Belgium', 'Italy',
  'Malta', 'Norway', 'Slovenia',
]

const faqs = [
  {
    question: 'Do I need to register for Medicare?',
    answer: 'Only if you are from a country with a Reciprocal Health Care Agreement (RHCA) with Australia. If you are not eligible, you do not need to register and should apply for a Medicare levy exemption when lodging your tax return.',
  },
  {
    question: 'What is the Medicare levy exemption?',
    answer: 'If you are not eligible for Medicare - which applies to most Working Holiday Visa holders - you can apply to have the Medicare levy waived when you lodge your tax return. We handle this as part of our tax return service.',
  },
  {
    question: 'I am from the UK. Am I eligible for Medicare?',
    answer: 'The UK has a Reciprocal Health Care Agreement with Australia. This means UK citizens on certain visas may access some Medicare services. However, coverage is limited and a Medicare card is not always issued automatically. We recommend confirming your status when you arrive.',
  },
  {
    question: 'If I am not eligible for Medicare, do I still pay the levy?',
    answer: 'Not if you apply for an exemption. If you are not eligible for Medicare, you should claim a Medicare levy exemption on your tax return - which means you will not be charged.',
  },
  {
    question: 'What is private health insurance and do I need it?',
    answer: 'Private health insurance covers medical costs not covered by Medicare. If you are not eligible for Medicare, you may want to consider private health cover depending on your situation. This is separate from the Medicare levy.',
  },
  {
    question: 'Does my Working Holiday visa affect my Medicare eligibility?',
    answer: 'Yes. Most Working Holiday visa holders are not eligible for Medicare unless they are from a country with a Reciprocal Health Care Agreement. If you are not eligible, we apply a Medicare levy exemption as part of your tax return.',
  },
]

export default function MedicarePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-6 pb-8 lg:pt-16 lg:pb-16">

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-4 lg:mb-6"
            style={{ fontSize:'12px', color:'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color:'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Medicare</span>
          </nav>

          <div className="max-w-[560px] lg:max-w-[700px]">

            <div className="inline-flex items-center gap-2 mb-3 lg:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase"
                style={{ fontSize:'10px', letterSpacing:'0.16em', color:'rgba(11,82,64,0.65)' }}>
                Guide
              </span>
            </div>

            <h1 className="font-serif font-black text-ink"
              style={{
                fontSize:'clamp(22px,2.9vw,40px)',
                lineHeight:1.06,
                letterSpacing:'-0.03em',
                marginBottom:'10px',
              }}>
              {/* Desktop: locked 2 lines - nowrap per line */}
              <span className="hidden lg:block">
                <span style={{ display:'block', whiteSpace:'nowrap' }}>Understand your Medicare status</span>
                <span style={{ display:'block', whiteSpace:'nowrap', color:'#0B5240' }}>before you lodge your tax return</span>
              </span>
              {/* Mobile: 2 lines with green second line */}
              <span className="lg:hidden">
                <span style={{ display:'block', fontSize:'22px' }}>Understand your Medicare status</span>
                <span style={{ display:'block', color:'#0B5240', fontSize:'22px' }}>before you lodge your tax return</span>
              </span>
            </h1>

            <p className="font-semibold text-ink"
              style={{ fontSize:'clamp(14px,1.5vw,17px)', letterSpacing:'-0.01em', marginBottom:'8px', lineHeight:1.4 }}>
              
              We check your eligibility and apply everything correctly.
            
            </p>

            <p className="font-light"
              style={{
                fontSize:'clamp(13px,1.2vw,15px)',
                lineHeight:1.65,
                color:'rgba(10,15,13,0.58)',
                maxWidth:'44ch',
                marginBottom:'0',
              }}>
              
              Not everyone is eligible, we help you understand your status..
            
            </p>

            <div className="hero-cta-pair flex flex-col gap-3 lg:flex-row lg:gap-4"
              style={{ marginTop:'24px', marginBottom:'20px', maxWidth:'480px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height:'54px', padding:'0 36px', fontSize:'15px', borderRadius:'100px', flex:'1', width:'100%' }}>
                Check your Medicare eligibility →
              </a>
              <a href="#how-it-works"
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


      {/* ── NOT SURE? - MAIN ENTRY POINT ──────────────────────────────────── */}
      <section className="py-8 lg:py-12" style={{ background: '#0B5240' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[560px] mx-auto text-center">
            <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '10px' }}>
              Not sure if you&apos;re eligible for Medicare?
            </p>
            <p className="font-light" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '20px' }}>
              We check your eligibility and apply everything correctly
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold"
              style={{ height: '46px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px' }}>
              Check your Medicare eligibility →
            </a>
          </div>
        </div>
      </section>

      {/* ── SIMPLE DECISION ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Your two scenarios</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '8px', marginBottom: '8px' }}>
              You either pay the Medicare levy{' '}
              <em className="not-italic font-normal text-forest-400">or you may be exempt</em>
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '36ch' }}>
              Eligibility depends on your visa and country of origin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 mb-8 lg:mb-10 reveal delay-1">
            <div className="bg-white rounded-2xl flex flex-col" style={{ padding: '20px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom: '12px', background: '#EAF6F1' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#0B5240" strokeWidth="1.4"/>
                  <path d="M7 10l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom: '6px' }}>From an RHCA country</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '28ch', marginBottom: '10px' }}>
                If you have Medicare, we apply it correctly to your tax return
              </p>
              <p className="text-[11.5px] font-medium text-forest-500">You may be eligible for limited Medicare services</p>
            </div>

            <div className="bg-white rounded-2xl flex flex-col" style={{ padding: '20px', border: '1px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.03)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ marginBottom: '12px', background: '#FFFCF5' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="#C47E10" strokeWidth="1.4"/>
                  <path d="M10 6v5M10 13.5v.5" stroke="#C47E10" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <p className="text-[14px] font-bold text-ink" style={{ marginBottom: '6px' }}>From a non-RHCA country</p>
              <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '28ch', marginBottom: '10px' }}>
                If you&apos;re not eligible, we apply a Medicare levy exemption so you don&apos;t overpay
              </p>
              <p className="text-[11.5px] font-medium" style={{ color: '#C47E10' }}>We apply your Medicare levy exemption correctly</p>
            </div>
          </div>

          <div className="text-center reveal delay-2" style={{ marginTop: '24px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium transition-colors hover-forest-light"
              style={{ fontSize: '13.5px', color: '#0B5240' }}>
              Not sure what applies to you? We&apos;ll check for you →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ────────────────────────────────────────────────────── */}
      <section className="py-9 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '32px' }}>
            <span className="section-label center">What we do for you</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '0', textWrap: 'balance' }}>
              We handle this as part of your tax return
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5 reveal delay-1">
            {[
              {
                title: 'We determine your eligibility',
                body: 'We check your visa and country to confirm your Medicare status',
              },
              {
                title: 'We apply the correct treatment',
                body: 'We apply the levy or exemption correctly in your tax return',
              },
              {
                title: 'Avoid paying extra tax',
                body: "We make sure you don&apos;t pay the Medicare levy if you&apos;re not required to",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl" style={{ padding: '20px', background: '#EEF7F2', border: '1px solid #C8EAE0' }}>
                <p className="text-[13.5px] font-semibold text-ink" style={{ letterSpacing: '-0.01em', marginBottom: '6px' }}>{item.title}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]" style={{ maxWidth: '26ch' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEDICARE LEVY EXEMPTION + VIDEO ───────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center reveal">
            <span className="section-label center">Medicare levy exemption</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '22ch', marginTop: '8px', marginBottom: '8px', textWrap: 'balance' }}>
              Medicare levy exemption
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '13.5px', lineHeight: 1.65, maxWidth: '32ch', marginBottom: '28px' }}>
              If you&apos;re not eligible for Medicare,<br />you may need a Medicare levy exemption before lodging your tax return
            </p>
            <div className="reveal delay-1 rounded-2xl flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px] mx-auto"
              style={{ background: '#ffffff', border: '1px solid #C8EAE0', width: '100%', maxWidth: '640px' }}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                style={{ background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7 5.5l8 4.5-8 4.5V5.5z" fill="#0B5240" />
                </svg>
              </div>
              <p className="font-medium text-muted" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>Video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IS MEDICARE (DETAIL) ─────────────────────────────────────── */}
      <section className="py-9 lg:py-14 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-start">
            <div className="reveal text-left">
              <span className="section-label">What is Medicare?</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '20ch', marginTop: '8px', marginBottom: '18px', textWrap: 'balance' }}>
                Medicare is Australia&apos;s public health system
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>Medicare gives access to subsidised healthcare in Australia and is partly funded by a 2% levy on taxable income</p>
                <p>Eligibility depends on your visa and country - not everyone needs to pay the levy</p>
                <p>Most Working Holiday visa holders are not eligible and may qualify for a Medicare levy exemption</p>
              </div>
              <div className="info-block">
                <p>You can only access Medicare if you&apos;re from an eligible RHCA country</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 reveal delay-1" style={{ alignSelf: 'start' }}>
              {[
                { title: 'Administered by',  body: 'Services Australia (Australian Government)' },
                { title: 'What it covers',   body: 'GP visits, public hospitals, and some specialist services' },
                { title: 'Medicare levy',    body: '2% of your taxable income (only if applicable)' },
                { title: 'If not eligible',  body: 'You may be able to apply for a Medicare levy exemption' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl flex flex-col" style={{ padding: '14px 16px', border: '1px solid #C8EAE0', boxShadow: '0 1px 2px rgba(0,0,0,.02)' }}>
                  <p className="text-[12.5px] font-semibold text-ink" style={{ marginBottom: '3px' }}>{c.title}</p>
                  <p className="text-[12px] font-light text-muted leading-[1.6]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON CONFUSION ─────────────────────────────────────────────── */}
      <section className="py-10 lg:py-16" style={{ background: '#EEF7F2' }}>
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-xl mx-auto text-center reveal" style={{ marginBottom: '28px' }}>
            <span className="section-label center">Common confusion</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(19px, 2.04vw, 26px)', lineHeight: 1.1, letterSpacing: '-0.025em', maxWidth: '24ch', marginTop: '8px', textWrap: 'balance' }}>
              Common questions about Medicare
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 reveal delay-1">
            {[
              { q: '"Do I need to sign up for Medicare?"', a: "You only need to sign up if you're from an eligible RHCA country. Otherwise, we apply the exemption in your tax return." },
              { q: '"Why is Medicare levy showing on my tax bill?"', a: "If your Medicare status wasn't applied correctly, the levy may appear. We fix this when preparing your tax return." },
              { q: '"I don\'t use Medicare - why am I being charged?"', a: "If no exemption is applied, the ATO may charge the levy automatically. We apply the correct exemption so you don't overpay." },
              { q: '"Does my travel insurance replace Medicare?"', a: "No - travel insurance and Medicare are separate. If you're not eligible, travel insurance covers your medical costs." },
              { q: '"Does my Working Holiday visa affect my Medicare?"', a: "Yes - most WHV holders are not eligible unless from an RHCA country. We handle this correctly in your tax return." },
              { q: '"Can I get a Medicare card on a Working Holiday visa?"', a: "Only if you're from an eligible RHCA country. Otherwise, we apply a Medicare levy exemption instead." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl" style={{ padding: '16px', border: '1px solid #C8EAE0', boxShadow: '0 1px 2px rgba(0,0,0,.02)' }}>
                <p className="text-[13px] font-semibold text-ink italic" style={{ marginBottom: '6px' }}>{item.q}</p>
                <p className="text-[12.5px] font-light text-muted leading-[1.65]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEXT STEP ─────────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Ready to lodge your tax return"
        body="We apply your Medicare status correctly\nso you don't overpay tax"
        cta="Start your tax return →"
        href="/tax-return"
      />

      {/* ── RELATED SERVICES ──────────────────────────────────────────────── */}
    </>
  )
}

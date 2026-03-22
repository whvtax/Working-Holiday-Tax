import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { CtaBand } from '@/components/ui/CtaBand'
import { Accordion } from '@/components/ui/Accordion'

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
    answer: 'If you are not eligible for Medicare  -  which applies to most Working Holiday Visa holders  -  you can apply to have the Medicare levy waived when you lodge your tax return. We handle this as part of our tax return service.',
  },
  {
    question: 'I am from the UK. Am I eligible for Medicare?',
    answer: 'The UK has a Reciprocal Health Care Agreement with Australia. This means UK citizens on certain visas may access some Medicare services. However, coverage is limited and a Medicare card is not always issued automatically. We recommend confirming your status when you arrive.',
  },
  {
    question: 'If I am not eligible for Medicare, do I still pay the levy?',
    answer: 'Not if you apply for an exemption. If you are not eligible for Medicare, you should claim a Medicare levy exemption on your tax return  -  which means you will not be charged.',
  },
  {
    question: 'What is private health insurance and do I need it?',
    answer: 'Private health insurance covers medical costs not covered by Medicare. If you are not eligible for Medicare, you may want to consider private health cover depending on your situation. This is separate from the Medicare levy.',
  },
]

export default function MedicarePage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-8 lg:py-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] mb-6" style={{ color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Medicare</span>
          </nav>
          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Guide</span>
            </div>
            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(20px,3vw,32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Medicare in Australia for WHV<br /><span style={{ color: '#0B5240' }}>what you need to know.</span>
            </h1>
            <p className="font-semibold text-ink mb-3" style={{ fontSize: '14.5px', letterSpacing: '-0.01em' }}>
              Not everyone is eligible. We help you understand where you stand.
            </p>
            <p className="font-light leading-[1.75] mb-6" style={{ fontSize: '13.5px', color: 'rgba(10,15,13,0.55)', maxWidth: '420px' }}>
              Medicare is Australia&apos;s public health system. Eligibility depends on your visa type and country of origin.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-stretch sm:items-center mb-5">
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: '46px', padding: '0 22px', fontSize: '13.5px' }}>
                Check your eligibility
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
            <p className="text-[10.5px] sm:text-[11.5px]" style={{ color: 'rgba(10,15,13,0.38)' }}>
              Handled under a registered tax agent&nbsp;•&nbsp;Fully ATO compliant
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT IS MEDICARE ─────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 lg:gap-20 items-start">
            <div className="reveal">
              <span className="section-label">What is Medicare?</span>
              <h2 className="font-serif font-black text-ink mt-1.5 mb-3" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Australia&apos;s public<br /><em className="not-italic font-normal text-forest-400">health system.</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>Medicare is Australia&apos;s publicly funded healthcare system. It provides access to subsidised medical services for eligible individuals. It is partly funded through the Medicare levy - a 2% charge on taxable income.</p>
                <p>Eligibility depends on your visa type and country of origin. Not everyone is required to pay the levy.</p>
              </div>
              <div className="info-block">
                <p>Most Working Holiday visa holders are not eligible for Medicare and may be able to apply for a Medicare levy exemption.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 reveal delay-1">
              {[
                { title: 'Administered by',   body: 'Services Australia, on behalf of the Australian Government.' },
                { title: 'What it covers',    body: 'GP visits, public hospital treatment, and some specialist and diagnostic services for eligible individuals.' },
                { title: 'Medicare levy',     body: '2% of your taxable income. Applies only to those eligible for Medicare.' },
                { title: 'If not eligible',   body: 'You may be able to apply for a Medicare levy exemption when lodging your tax return.' },
              ].map((c, i) => (
                <div key={i} className="bg-white rounded-xl px-4 py-3" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                  <p className="text-[13px] font-semibold text-ink mb-0.5">{c.title}</p>
                  <p className="text-[12.5px] font-light text-muted leading-[1.65]">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IS ELIGIBLE ──────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">

            <div className="reveal">
              <span className="section-label">Eligibility</span>
              <h2 className="font-serif font-black text-ink mt-1.5 mb-3" style={{ fontSize: 'clamp(17px,2.1vw,24px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                Who can access<br /><em className="not-italic font-normal text-forest-400">Medicare?</em>
              </h2>
              <div className="prose-wht max-w-[480px]">
                <p>Working Holiday visa holders can only access Medicare if they are from an eligible country with a Reciprocal Health Care Agreement (RHCA) with Australia.</p>
              </div>
              <div className="mt-6">
                <p className="text-[13px] font-semibold text-ink mb-3" style={{ letterSpacing: '-0.01em' }}>Countries with an RHCA:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {rhca.map((country, i) => (
                    <div key={i} className="rounded-lg px-3 py-2 text-[12.5px] font-medium text-forest-500" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal delay-1">
              <span className="section-label">Working Holiday Visa holders</span>
              <h2 className="font-serif font-black text-ink mt-1.5 mb-3" style={{ fontSize: 'clamp(17px,2.1vw,24px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
                What this means<br /><em className="not-italic font-normal text-forest-400">for you.</em>
              </h2>
              <div className="space-y-0">
                {[
                  {
                    label: 'From an RHCA country',
                    body: 'If you have Medicare, provide your details or a copy of your Medicare card, or any other proof of Medicare you have. This allows us to apply it correctly to your tax return.',
                  },
                  {
                    label: 'From a non-RHCA country',
                    body: 'If you are not eligible for Medicare, you will need to provide proof of a Medicare levy exemption. If it is not approved, the 2% levy may apply.',
                  },
                  {
                    label: 'Not sure?',
                    body: 'We can help you determine your status and apply the correct treatment when we prepare your tax return.',
                  },
                ].map((item, i) => (
                  <div key={i} className="py-4" style={{ borderTop: '1px solid #E2EFE9' }}>
                    <p className="text-[13px] font-semibold text-ink mb-0.5" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.75]">{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEDICARE LEVY EXEMPTION ──────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center reveal">
            <span className="section-label center">Medicare levy exemption</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(18px,2.4vw,28px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Medicare levy exemption.
            </h2>
            <p className="font-light text-muted leading-[1.7] mb-8 mx-auto" style={{ fontSize: '13.5px', maxWidth: '520px' }}>
              If you are not from a country eligible for Medicare, you will need a Medicare levy exemption before lodging your tax return.
            </p>

            {/* Video placeholder */}
            <div className="reveal delay-1 rounded-2xl flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px] mx-auto"
              style={{
                background: '#EEF7F2',
                border: '1.5px solid #C8EAE0',
                width: '100%',
                maxWidth: '640px',
              }}>
              {/* Play icon */}
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                style={{ background: '#ffffff', border: '1.5px solid #C8EAE0', boxShadow: '0 2px 8px rgba(11,82,64,0.08)' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7 5.5l8 4.5-8 4.5V5.5z" fill="#0B5240" />
                </svg>
              </div>
              <p className="font-medium text-muted" style={{ fontSize: '13px', letterSpacing: '-0.01em' }}>Video coming soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMMON CONFUSION ─────────────────────────────────────────────── */}
      <section className="py-7 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-7 reveal">
            <span className="section-label center">Common confusion</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(17px,2.1vw,26px)', lineHeight: 1.1, letterSpacing: '-0.025em' }}>
              Questions we hear<br /><em className="not-italic font-normal text-forest-400">all the time.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto reveal delay-1">
            {[
              {
                q: 'Can I apply for Medicare after arriving in Australia?',
                a: 'You can apply once you arrive if you are from an eligible country. Approval depends on your visa and agreement status.',
              },
              {
                q: 'What documents are needed to prove Medicare eligibility?',
                a: 'You may be asked to provide your passport, visa details, and proof of eligibility under your country\'s agreement.',
              },
              {
                q: 'How long does Medicare approval take?',
                a: 'Processing times can vary. In most cases, eligibility is confirmed shortly after submitting your application.',
              },
              {
                q: 'Can I use Medicare immediately after approval?',
                a: 'Once approved, you can start using Medicare services. Some services may still require out of pocket payments.',
              },
              {
                q: 'What happens if my Medicare status changes?',
                a: 'If your visa or eligibility changes, your Medicare access may also change. It is important to keep your details updated.',
              },
              {
                q: 'Do I need to renew my Medicare access?',
                a: 'In some cases yes. Continued access depends on your visa and eligibility conditions at the time.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-5" style={{ border: '1px solid #C8EAE0', boxShadow: '0 1px 3px rgba(0,0,0,.03)' }}>
                <p className="text-[13.5px] font-semibold text-ink mb-2">{item.q}</p>
                <p className="text-[13px] font-light text-muted leading-[1.7]">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CtaBand
        eyebrow="Not sure?"
        heading="Not sure about your Medicare status?"
        headingEm=""
        sub="We determine your Medicare eligibility as part of your tax return and apply the correct treatment."
        primaryLabel="Check your eligibility"
      />
    </>
  )
}

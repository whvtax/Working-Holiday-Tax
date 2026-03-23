import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'ABN Registration for Farm, Construction & Contractor Work | Working Holiday Tax',
  description: 'Working on a farm, labour hire or as a contractor? You need an ABN registered correctly. Wrong details cause rejections and tax problems.',
}

const faqs = [
  { question: 'Can I have both a TFN and an ABN?', answer: 'Yes. A TFN is for employment income (wages with a payslip). An ABN is for contractor income (invoicing clients directly). Most travellers who do both need both.' },
  { question: 'Can I get an ABN without a TFN?', answer: 'No. You must have a TFN before applying for an ABN. If you need both, get your TFN sorted first.' },
  { question: 'Do I need to register for GST?', answer: 'Only if you earn over $75,000 per year from ABN income. Most Working Holiday travellers do not need to register for GST.' },
  { question: 'What happens to my ABN when I leave Australia?', answer: 'You can cancel your ABN online when you stop working in Australia. We can advise on the right time to do this.' },
  { question: 'Does ABN income need to go in my tax return?', answer: 'Yes. All ABN income must be declared in your tax return at the end of the financial year. We can handle your return as well as your ABN registration.' },
]

const STEPS = [
  { n: '1', title: 'Tell us about your work', body: 'Type of work, who you invoice, and your visa subclass.' },
  { n: '2', title: 'Send your details', body: 'Passport and TFN. Takes 5 minutes.' },
  { n: '3', title: 'We prepare and submit', body: 'Correct activity code and visa type confirmed before submission.' },
  { n: '4', title: 'ABN confirmed', body: 'Active and ready to use — we send it as soon as it is issued.' },
]

const IconStar  = () => <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>
const CrossIcon = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/></svg>
const TickIcon  = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>

export default function ABNPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">ABN Registration</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" stroke="#DC2626" strokeWidth="1.2"/><path d="M6 3.5v3M6 8.5v.3" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#991B1B' }}>Wrong registration causes rejection and tax problems</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Working on a farm, construction site, or as a contractor?{' '}
              <span style={{ color: '#0B5240' }}>You probably need an ABN — registered correctly.</span>
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '46ch', marginBottom: '12px', fontWeight: 300 }}>
              If your employer asks you to invoice them instead of issuing a payslip, you need an ABN. Getting the activity code or visa type wrong causes rejections and creates tax problems later. We check your situation first and submit correctly.
            </p>

            <div className="rounded-xl" style={{ padding: '12px 16px', background: '#F7FCF9', border: '1px solid #C8EAE0', marginBottom: '26px', maxWidth: '44ch' }}>
              <p style={{ fontSize: '13px', color: '#587066', lineHeight: 1.6, fontWeight: 500, marginBottom: '8px' }}>Common situations where you need an ABN:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {['Farm or harvest work paid by invoice', 'Construction or labour hire', 'Photography, design, or freelance work', 'Cleaning, childcare, or domestic services', 'Any job where you invoice instead of receiving a payslip'].map((t, i) => (
                  <p key={i} style={{ fontSize: '12.5px', color: '#587066' }}>· {t}</p>
                ))}
              </div>
            </div>

            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex justify-center w-full sm:w-auto"
              style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '280px', marginBottom: '16px' }}>
              Register my ABN correctly →
            </a>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {['1,200+ WHV travellers helped', 'TPB registered oversight', 'No myGov account needed'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.45)' }}>
                  <TickIcon />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WAGES VS ABN CALLOUT ─────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10">
          <div className="max-w-2xl">
            <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(18px, 2.5vw, 26px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '10px' }}>
              Not sure if you need an ABN or just a TFN?
            </p>
            <p style={{ fontSize: '14.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginBottom: '16px' }}>
              <strong style={{ color: 'rgba(255,255,255,0.9)' }}>Wages (TFN):</strong> Your employer issues a payslip, withholds your tax, and pays it to the ATO. You just provide your TFN.<br />
              <strong style={{ color: 'rgba(255,255,255,0.9)' }}>ABN work:</strong> You invoice the client directly. No tax is withheld — you manage your own. You need an ABN to do this legally.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold w-full sm:w-auto"
              style={{ height: '46px', padding: '0 24px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '260px' }}>
              Check if I need an ABN →
            </a>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', maxWidth: '30ch' }}>
              Why not apply through the ABR directly?
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '48ch', marginTop: '12px' }}>
              You can — but wrong activity codes, incorrect visa type, or a details mismatch will cause a rejection. A rejected ABN leaves you unable to invoice until it is resubmitted correctly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '36px', alignItems: 'stretch' }}>
            {[
              { title: 'Correct activity code matched to your work', body: 'The activity code must match what you actually do. We verify this before submission — wrong codes cause rejection.' },
              { title: 'Visa type confirmed before submission', body: 'The ABR cross-checks your visa details. A mismatch causes immediate rejection. We check this first.' },
              { title: 'Ready to invoice immediately', body: 'Once issued, your ABN appears on the ABN Lookup register. Your clients can verify it is real and active.' },
              { title: 'ABN income explained', body: 'ABN income must be declared in your tax return. We explain what to keep track of and handle your return too.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)', height: '100%' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</p>
                <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
              Register my ABN correctly →
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT IS AN ABN ───────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '14px' }}>What an ABN is.</h2>
              <p className="font-light text-body" style={{ fontSize: '14.5px', lineHeight: 1.75 }}>
                An Australian Business Number (ABN) is an 11-digit identifier used when working as a contractor or running a business. You include it on every invoice you send to clients. Without one, your clients are legally required to withhold 47% of your payment.
              </p>
              <p className="font-light text-body" style={{ fontSize: '14.5px', lineHeight: 1.75, marginTop: '12px' }}>
                Unlike wages where your employer handles tax, ABN income comes to you in full. You are responsible for setting aside enough to cover your tax return at the end of the year.
              </p>
            </div>
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '14px' }}>When you need one.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Farm or harvest work paid by invoice', 'Construction, scaffolding, or labour hire', 'Photography, videography, or design work', 'Cleaning, childcare, or domestic work', 'Remote work for Australian clients', 'Any job where you invoice instead of receiving a payslip'].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <TickIcon />
                    <p className="font-light text-body" style={{ fontSize: '14px', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>One message. ABN registered.</h2>
          </div>
          <div className="hidden lg:block" style={{ marginBottom: '48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px" style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0" style={{ background: '#0B5240', fontSize: '13px', marginBottom: '16px', boxShadow: '0 0 0 4px #EEF7F2, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize: '13.5px', marginBottom: '6px' }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#0B5240', fontSize: '12px' }}>{s.n}</div>
                  {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
              Register my ABN correctly →
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '12px' }}>ABN questions, answered.</h2>
              <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.65, marginBottom: '24px' }}>Different question? Message us on WhatsApp — we reply within 24 hours.</p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>Ask us on WhatsApp →</a>
            </div>
            <div style={{ alignSelf: 'start' }}><Accordion items={faqs} /></div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#0B5240', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '24ch' }}>
            A rejected ABN delays your first invoice. Get it right before you start.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '42ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            Remember: ABN income must be declared in your tax return. We can handle both.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '54px', padding: '0 44px', fontSize: '16px', maxWidth: '280px', margin: '0 auto' }}>
            Register my ABN correctly →
          </a>
        </div>
      </section>

      <NextStep eyebrow="Also need this?" heading="ABN income must be declared in your tax return." body="At the end of the financial year, all ABN income is declared and taxed. We handle your return as well as your registration." cta="Learn about tax returns →" href="/tax-return" />
    </>
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Tax Return in Australia for WHV Holders',
  description: 'Get your Australian tax return done correctly. Clear process, personal guidance, and professional oversight for working holiday travellers.',
}

const faqs = [
  {
    question: 'Do I need to lodge a tax return if I only worked for a short time?',
    answer: 'Yes. If you earned income in Australia, you may still need to lodge a tax return, even if you only worked for a short period.',
  },
  {
    question: 'What happens if I do not lodge my tax return?',
    answer: 'If you are required to lodge and do not do so, the ATO may apply penalties or take further action.',
  },
  {
    question: 'Can I lodge my tax return after leaving Australia?',
    answer: 'Yes. You can lodge your tax return from overseas after you leave Australia.',
  },
  {
    question: 'What documents do I need to complete my tax return?',
    answer: 'You will need your TFN, income details, and any records for work-related expenses you want to claim.',
  },
  {
    question: 'How do I know if my tax return has been completed?',
    answer: 'Once your tax return is processed, the ATO issues a Notice of Assessment confirming the final outcome.',
  },
]

const DEDUCTIONS = [
  { title: 'Work-related expenses',      body: 'Only valid work expenses are included.' },
  { title: 'Tools and equipment',        body: 'Items required for your job.' },
  { title: 'Licences and certifications', body: 'Relevant work-related licences.' },
  { title: 'Work-related travel',        body: 'Travel required for your job.' },
  { title: 'Laundry and uniforms',       body: 'If required for your work.' },
  { title: 'Charitable donations',       body: 'Eligible registered donations.' },
]

const STEPS = [
  { n: '1', title: 'Submit your details',    body: 'Quick form with basic information.' },
  { n: '2', title: 'We review everything',   body: 'Checked with professional oversight.' },
  { n: '3', title: 'We prepare and lodge',   body: 'Handled correctly with the ATO.' },
  { n: '4', title: 'You receive your outcome', body: 'We guide you until completion.' },
]

const BENEFITS = [
  { title: 'Clear review of your situation',  body: 'We check your details to avoid mistakes.' },
  { title: 'Prepared and lodged correctly',   body: 'Handled with professional oversight.' },
  { title: 'Simple, guided process',          body: 'Everything explained step by step.' },
  { title: 'Ongoing support if needed',       body: "We're here if you have questions." },
]

const TESTIMONIALS = [
  { name: 'Emma', from: 'Ireland', quote: 'Clear and simple process. I understood everything.', initials: 'E', bgColor: '#FCE7F3', textColor: '#9D174D' },
  { name: 'Max',  from: 'Germany', quote: 'Professional and easy to follow. Felt confident throughout.', initials: 'M', bgColor: '#D1FAE5', textColor: '#065F46' },
]

const DIY = ['Confusing forms and rules', 'Risk of mistakes or missing details', 'No support if something goes wrong']
const OUR = ['Clear guided process', 'Done correctly the first time', 'Support when you need help']

const IconStar  = () => (<svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>)
const TickIcon  = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const CrossIcon = () => (<svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/></svg>)

export default function TaxReturnPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-10 pb-12 lg:pt-14 lg:pb-14">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-6" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.35)' }}>
            <Link href="/" className="transition-colors hover:text-forest-500">Home</Link>
            <span aria-hidden="true" style={{ color: 'rgba(10,15,13,0.18)' }}>/</span>
            <span aria-current="page">Tax Return</span>
          </nav>

          <div className="max-w-[640px]">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.16em', color: 'rgba(11,82,64,0.65)' }}>Tax Return</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Get your Australian tax return done properly,{' '}
              <span style={{ color: '#0B5240' }}>without the stress.</span>
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '44ch', marginBottom: '28px', fontWeight: 300 }}>
              We guide you through the process and handle the lodgement with professional oversight.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center" style={{ marginBottom: '20px' }}>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex justify-center"
                style={{ height: '52px', padding: '0 32px', fontSize: '15px', borderRadius: '100px' }}>
                Start your tax return →
              </a>
              <Link href="#how-it-works" className="btn-ghost-dark inline-flex justify-center" style={{ height: '52px', padding: '0 24px', fontSize: '15px' }}>
                How it works →
              </Link>
            </div>

            <p style={{ fontSize: '13px', color: 'rgba(10,15,13,0.4)' }}>
              Used by working holiday travellers across Australia
            </p>
          </div>
        </div>
      </section>

      {/* ── GREEN STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 text-center">
          <p className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '8px' }}>
            Not sure if your tax is done correctly?
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '46ch', margin: '0 auto 20px', lineHeight: 1.65, fontWeight: 300 }}>
            We help you understand your situation and make sure everything is handled properly.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold w-full sm:w-auto"
            style={{ height: '48px', padding: '0 28px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '240px', margin: '0 auto' }}>
            Check your situation →
          </a>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">What we do for you</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Handled correctly, from start to finish.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '36px', alignItems: 'stretch' }}>
            {BENEFITS.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)', height: '100%' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</p>
                <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '52px', padding: '0 32px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
              Start your tax return →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '32px' }}>
            <span className="section-label center">What travellers say</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              Real experiences from travellers like you.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto" style={{ alignItems: 'stretch' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.07)', border: '1px solid #E2EFE9', height: '100%' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '12px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1" style={{ fontSize: '14px', lineHeight: 1.75, marginBottom: '16px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2.5" style={{ paddingTop: '14px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                    style={{ width: '32px', height: '32px', fontSize: '11px', background: t.bgColor, color: t.textColor }}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '12px', lineHeight: 1.2 }}>{t.name}</p>
                    <p className="text-subtle" style={{ fontSize: '11px', marginTop: '2px' }}>{t.from}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '32px' }}>
            <span className="section-label center">Why not do it yourself?</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              There is a better way.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="rounded-2xl" style={{ padding: '24px', background: '#fff', border: '1.5px solid #E2EFE9', height: '100%' }}>
              <p className="font-semibold text-muted" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>Lodge yourself</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DIY.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CrossIcon />
                    <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl" style={{ padding: '24px', background: '#EAF6F1', border: '1.5px solid #C8EAE0', height: '100%' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>Use our service</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {OUR.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <TickIcon />
                    <p className="font-semibold text-ink" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex w-full justify-center"
                style={{ height: '48px', padding: '0 22px', fontSize: '14px' }}>
                Start your tax return →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── DEDUCTIONS ───────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">Deductions</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '8px' }}>
              Work-related deductions.
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '14px', lineHeight: 1.65, maxWidth: '40ch' }}>
              You may be able to claim expenses related to your work. We review what applies to your situation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{ marginBottom: '20px', alignItems: 'stretch' }}>
            {DEDUCTIONS.map((d, i) => (
              <div key={i} className="bg-white rounded-xl flex flex-col"
                style={{ padding: '18px 20px', border: '1px solid #E2EFE9', boxShadow: '0 1px 3px rgba(0,0,0,.03)', height: '100%' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '6px' }}>{d.title}</p>
                <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{d.body}</p>
              </div>
            ))}
          </div>

          <p className="text-center font-light text-subtle" style={{ fontSize: '12px' }}>
            Eligibility depends on your individual situation.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              4 simple steps.
            </h2>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block" style={{ marginBottom: '48px' }}>
            <div className="relative flex items-start">
              <div className="absolute left-[calc(12.5%)] right-[calc(12.5%)] top-4 h-px"
                style={{ background: 'linear-gradient(90deg, #C8EAE0 0%, #0B5240 30%, #0B5240 70%, #C8EAE0 100%)' }} aria-hidden="true" />
              {STEPS.map((s, i) => (
                <div key={i} className="flex-1 flex flex-col items-center px-5" style={{ zIndex: 1 }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ background: '#0B5240', fontSize: '13px', marginBottom: '16px', boxShadow: '0 0 0 4px #fff, 0 0 0 5px #C8EAE0' }}>{s.n}</div>
                  <p className="font-semibold text-ink text-center" style={{ fontSize: '13.5px', marginBottom: '6px' }}>{s.title}</p>
                  <p className="font-light text-muted text-center" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '32px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: '#0B5240', fontSize: '12px' }}>{s.n}</div>
                  {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2"
                    style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
              Start your tax return →
            </a>
          </div>
        </div>
      </section>

      {/* ── TIMING + DOCUMENTS ───────────────────────────────────────────── */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            <div>
              <span className="section-label">Timing</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '24px' }}>
                What to expect.
              </h2>
              <div>
                {[
                  { label: 'Review and preparation', body: 'Usually begins shortly after submission.' },
                  { label: 'ATO processing',          body: 'ATO processing times may vary depending on the period.' },
                  { label: 'Final outcome',           body: 'Confirmed once the ATO issues a Notice of Assessment.' },
                ].map((item, i) => (
                  <div key={i} style={{ paddingTop: '16px', paddingBottom: '16px', borderTop: '1px solid #E2EFE9' }}>
                    <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '4px' }}>{item.label}</p>
                    <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.75 }}>{item.body}</p>
                  </div>
                ))}
                <div style={{ borderTop: '1px solid #E2EFE9' }} />
              </div>
            </div>

            <div>
              <span className="section-label">Documents</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '24px' }}>
                What you may need.
              </h2>
              <div className="flex flex-col" style={{ gap: '14px' }}>
                {[
                  'Tax File Number',
                  'Income summary',
                  'Bank details (if applicable)',
                  'Relevant receipts (if claiming deductions)',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}>
                      <circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/>
                      <path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-light text-body" style={{ fontSize: '13.5px', lineHeight: 1.65 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12 items-start">
            <div>
              <span className="section-label">Questions</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '12px' }}>
                Tax return questions, answered.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.65, marginBottom: '24px' }}>
                Still unsure? We&apos;re happy to help.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
                style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>
                Get help →
              </a>
            </div>
            <div className="max-w-[680px]" style={{ alignSelf: 'start' }}>
              <Accordion items={faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#1A5C44', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '24ch' }}>
            Get your tax return sorted, the right way.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '42ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            Clear process, guidance, and support from start to finish.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '54px', padding: '0 40px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
            Start your tax return →
          </a>
        </div>
      </section>

      {/* ── SUPER STRIP ──────────────────────────────────────────────────── */}
      <NextStep
        eyebrow="What's next?"
        heading="Leaving Australia? You may have super to claim."
        body="We can help you understand your options."
        cta="Learn about super →"
        href="/superannuation"
      />
    </>
  )
}

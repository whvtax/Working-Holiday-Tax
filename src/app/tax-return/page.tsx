import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'
import { NextStep } from '@/components/ui/NextStep'
import { Accordion } from '@/components/ui/Accordion'

export const metadata: Metadata = {
  title: 'Tax Return Australia — Claim Back Overpaid Tax | Working Holiday Tax',
  description: 'Most WHV holders overpay tax during the year. A tax return corrects it. We prepare and lodge from anywhere in the world. WHV specialists.',
}

const faqs = [
  { question: 'Do I need to lodge even if I only worked for a few months?', answer: 'Yes. If you earned income in Australia, you need to lodge a tax return — even for a short period. This is also how you recover any overpaid tax.' },
  { question: 'Can I lodge from overseas after I have left Australia?', answer: 'Yes. This is one of the most common situations we handle. The entire process is online via WhatsApp. You never need to be in Australia.' },
  { question: 'What if I worked for multiple employers?', answer: 'We consolidate income from all employers into a single correct return. Multiple employers is very common and not a problem — but it is important to get right so no overpayment is missed.' },
  { question: 'When is the deadline to lodge?', answer: 'The Australian tax year runs from 1 July to 30 June. Returns are generally due by 31 October for the previous year. If you use a tax agent, extended deadlines may apply. Contact us and we can advise based on your situation.' },
  { question: 'What documents do I need?', answer: 'Your TFN, payment summaries or payslips from each employer, and any receipts for work-related expenses. We will send you a short checklist once you message us.' },
]

const STEPS = [
  { n: '1', title: 'Message us on WhatsApp', body: 'Tell us your visa type and the year(s) you worked.' },
  { n: '2', title: 'Send your payslips', body: 'Payment summaries from each employer — we tell you exactly what we need.' },
  { n: '3', title: 'We prepare and lodge', body: 'Correct rate applied, deductions reviewed, lodged with the ATO.' },
  { n: '4', title: 'Outcome confirmed', body: 'Notice of Assessment issued — refund or balance confirmed.' },
]

const IconStar  = () => <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>
const CrossIcon = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#FEF2F2" stroke="#FECACA" strokeWidth="0.5"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/></svg>
const TickIcon  = () => <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: '2px' }}><circle cx="8" cy="8" r="7.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M5 8l2.5 2.5 4-4" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>

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
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full" style={{ background: '#FDF0D5', border: '1px solid #F0D99A' }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true"><circle cx="6" cy="6" r="5.5" stroke="#C47E10" strokeWidth="1.2"/><path d="M6 3.5v3M6 8.5v.3" stroke="#C47E10" strokeWidth="1.3" strokeLinecap="round"/></svg>
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#92600A' }}>Most WHV holders overpay tax — a return gets the difference back</span>
            </div>

            <h1 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(28px, 3.8vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              Most working holiday travellers overpay tax during the year.{' '}
              <span style={{ color: '#0B5240' }}>A tax return is how you get it back.</span>
            </h1>

            <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '46ch', marginBottom: '10px', fontWeight: 300 }}>
              If your employer withheld more than the 15% WHM rate, the difference comes back when you lodge. We prepare and lodge your return — correctly, from anywhere in the world.
            </p>

            <div className="rounded-xl" style={{ padding: '12px 16px', background: '#EAF6F1', border: '1px solid #C8EAE0', marginBottom: '26px', maxWidth: '44ch' }}>
              <p style={{ fontSize: '13.5px', color: '#0B5240', lineHeight: 1.6 }}>
                <strong>Example:</strong> If you earned $28,000 and your employer withheld $7,000, your correct tax at 15% is $4,200. The $2,800 difference comes back in your return.
              </p>
            </div>

            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex justify-center w-full sm:w-auto"
              style={{ height: '54px', padding: '0 36px', fontSize: '15px', borderRadius: '100px', maxWidth: '300px', marginBottom: '16px' }}>
              See how much I can get back →
            </a>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {['Works from anywhere in the world', 'TPB registered oversight', 'Returns ready in 1–2 days'].map((t, i) => (
                <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12px', color: 'rgba(10,15,13,0.45)' }}>
                  <TickIcon />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GREEN STRIP ──────────────────────────────────────────────────── */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10 text-center">
          <p className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: '8px' }}>
            If you worked in Australia this year, you probably overpaid.
          </p>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '48ch', margin: '0 auto 20px', lineHeight: 1.65, fontWeight: 300 }}>
            The 15% WHM rate is lower than most employers apply. A tax return corrects it. Not sure? Use the calculator on our homepage to get an instant estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold w-full sm:w-auto"
              style={{ height: '48px', padding: '0 28px', background: '#E9A020', color: '#1A2822', borderRadius: '100px', fontSize: '14px', maxWidth: '260px', margin: '0 auto' }}>
              Check my refund →
            </a>
            <Link href="/" className="inline-flex items-center justify-center font-medium w-full sm:w-auto"
              style={{ height: '48px', padding: '0 24px', border: '1.5px solid rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.75)', borderRadius: '100px', fontSize: '14px', maxWidth: '220px', margin: '0 auto' }}>
              Use the calculator →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', maxWidth: '28ch' }}>
              We don&apos;t just lodge a return — we make sure the right amount is calculated.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ marginBottom: '36px', alignItems: 'stretch' }}>
            {[
              { title: 'We calculate the correct WHM rate', body: 'Most employers over-withhold. We identify the correct amount based on your visa type and income.' },
              { title: 'All employers consolidated', body: '4 jobs? 6 payslips? We consolidate every employer into a single correct return — nothing missed.' },
              { title: 'Deductions reviewed automatically', body: 'Work tools, travel, uniforms, eligible donations — we check everything that applies to your situation.' },
              { title: 'Lodged with the ATO on your behalf', body: 'No myGov account needed. We lodge directly and send you the confirmation once the ATO processes it.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 10px rgba(11,82,64,.05)', height: '100%' }}>
                <p className="font-semibold text-ink" style={{ fontSize: '13.5px', marginBottom: '8px', lineHeight: 1.3 }}>{item.title}</p>
                <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.65 }}>{item.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '300px', margin: '0 auto' }}>
              See how much I can get back →
            </a>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto" style={{ alignItems: 'stretch' }}>
            {[
              { tag: 'multiple employers corrected', quote: "I had 4 different employers across 8 months and no idea if any of them used the right rate. They went through everything and lodged a single return. Clear result, fast process.", name: "Emma", from: "Ireland · WHV 417", initials: "E", bg: "#FCE7F3", fg: "#9D174D" },
              { tag: 'lodged from overseas', quote: "Already back in Germany. They handled everything on WhatsApp — sent my payslips, they did the rest. I didn't need to touch the ATO website at all.", name: "Max", from: "Germany · WHV 417", initials: "M", bg: "#D1FAE5", fg: "#065F46" },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col" style={{ padding: '22px', border: '1px solid #E2EFE9', boxShadow: '0 2px 12px rgba(11,82,64,.06)', height: '100%' }}>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0', marginBottom: '12px', width: 'fit-content' }}>
                  <p style={{ fontSize: '11px', fontWeight: 600, color: '#0B5240' }}>{t.tag}</p>
                </div>
                <div className="flex gap-0.5" style={{ marginBottom: '10px' }}>{Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}</div>
                <p className="font-light text-body flex-1" style={{ fontSize: '14px', lineHeight: 1.75, marginBottom: '16px' }}>&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-2.5" style={{ paddingTop: '12px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0" style={{ width: '32px', height: '32px', fontSize: '11px', background: t.bg, color: t.fg }}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '12px' }}>{t.name}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <div className="rounded-2xl" style={{ padding: '24px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>Lodge yourself via ATO</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Requires myGov account and identity verification', 'Easy to apply the wrong visa or residency type', 'No one to review deductions before you submit', 'No support if the ATO comes back with questions'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5"><CrossIcon /><p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item}</p></div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl" style={{ padding: '24px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px' }}>Use our service</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {['No myGov — we lodge directly with the ATO', 'Correct visa type confirmed before lodgement', 'All deductions reviewed — nothing overlooked', 'We handle any ATO correspondence on your behalf'].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5"><TickIcon /><p className="font-semibold text-ink" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item}</p></div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full justify-center" style={{ height: '48px', fontSize: '14px' }}>
                See how much I can get back →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section id="how-it-works" style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>One message. Return lodged in 1–2 days.</h2>
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
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '52px', padding: '0 36px', fontSize: '15px', maxWidth: '300px', margin: '0 auto' }}>
              See how much I can get back →
            </a>
            <p style={{ marginTop: '9px', fontSize: '12px', color: '#8AADA3' }}>Free first conversation · No commitment</p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-8 lg:gap-12 items-start">
            <div>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.5vw, 30px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '12px' }}>Tax return questions, answered.</h2>
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
            The overpayment is recoverable. Lodge before the window closes.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', maxWidth: '42ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            Tax year ends 30 June. Returns lodged after the deadline may incur penalties.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex w-full sm:w-auto justify-center" style={{ height: '54px', padding: '0 44px', fontSize: '16px', maxWidth: '320px', margin: '0 auto' }}>
            See how much I can get back →
          </a>
        </div>
      </section>

      <NextStep eyebrow="Don't forget" heading="Your super is separate from your tax return." body="Your employer paid 12% of your wages into a super fund. That money is yours to claim when you leave Australia — it is not part of your tax return." cta="Check my super balance →" href="/superannuation" />
    </>
  )
}

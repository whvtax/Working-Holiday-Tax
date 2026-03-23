import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Working Holiday Tax - Australian Tax Help for WHV Holders',
  description: 'TFN, tax return and super for working holiday makers in Australia. Professional oversight, personal guidance, fully online. Used by 1,200+ travellers.',
}

/* ─── SVG helpers ──────────────────────────────────────────────── */
const IconStar   = () => <svg width="13" height="13" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1l1.35 2.73L10.5 4.2l-2.25 2.2.53 3.1L6 8.03 3.22 9.5l.53-3.1L1.5 4.2l3.15-.47z" fill="#E9A020"/></svg>
const CheckIcon  = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="6.5" fill="#EAF6F1" stroke="#C8EAE0" strokeWidth="0.5"/><path d="M4.5 7l2 2 3-3" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
const TickGreen  = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8.5" fill="#EAF6F1"/><path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
const CrossRed   = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="8.5" fill="#FEF2F2"/><path d="M6 12l6-6M12 12L6 6" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/></svg>

/* ─── Data ─────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    quote: "I had 4 jobs in Australia and had no idea my tax was wrong. They sorted everything — TFN, return, and super — in less than a week.",
    name: "Liam O.",
    from: "Ireland · WHV 417",
    initials: "L",
    bg: "#DBEAFE",
    color: "#1E40AF",
  },
  {
    quote: "I left Australia without claiming my super. Contacted them from Germany, they handled everything online. I had no idea it would be that simple.",
    name: "Max F.",
    from: "Germany · WHV 417",
    initials: "M",
    bg: "#D1FAE5",
    color: "#065F46",
  },
  {
    quote: "I started working without a TFN and got taxed 47%. They fixed my tax return at the end of the year and got most of it corrected. Should have come here first.",
    name: "Emma T.",
    from: "United Kingdom · WHV 417",
    initials: "E",
    bg: "#FCE7F3",
    color: "#9D174D",
  },
]

const SERVICES = [
  {
    href: '/tfn',
    num: '01',
    title: 'TFN Application',
    problem: 'Without a TFN, employers withhold tax at 47%.',
    fix: 'We guide your application correctly the first time.',
  },
  {
    href: '/tax-return',
    num: '02',
    title: 'Tax Return',
    problem: 'Most WHV holders overpay tax during the year.',
    fix: 'We lodge your return and make sure the right amount is calculated.',
  },
  {
    href: '/superannuation',
    num: '03',
    title: 'Super Withdrawal',
    problem: 'Super sits unclaimed after most travellers leave.',
    fix: 'We submit your DASP claim after you leave Australia.',
  },
  {
    href: '/abn',
    num: '04',
    title: 'ABN Registration',
    problem: 'Registering with wrong details causes rejections and delays.',
    fix: 'We ensure your ABN matches your work situation correctly.',
  },
]

const WHY_US = [
  {
    title: "We only work with WHV holders",
    body: "This is all we do. Not general tax, not business tax — just working holiday makers. We know your situation, your visa, and your questions.",
  },
  {
    title: "One contact, everything handled",
    body: "Send us your details on WhatsApp. No forms to navigate, no ATO portal to figure out. One conversation and we take it from there.",
  },
  {
    title: "Professional oversight on every file",
    body: "Every lodgement is prepared under the supervision of a registered tax professional. Your file is handled correctly, not guessed at.",
  },
  {
    title: "Works from anywhere in the world",
    body: "Leaving Australia? Already left? Doesn't matter. The process is fully online and we've helped travellers from 40+ countries.",
  },
]

const DIY_PROBLEMS = [
  "ATO portal requires a myGov account and identity verification",
  "Wrong visa type selection causes incorrect tax calculations",
  "Missing deductions you didn't know you could claim",
  "Super left unclaimed because the DASP process is unclear",
  "No one to ask when something doesn't look right",
]

const OUR_SOLUTION = [
  "One WhatsApp message to start — no accounts or portals needed",
  "We confirm your visa type and apply the correct tax rates",
  "We review your situation and identify what applies to you",
  "We handle your super claim with the correct forms and process",
  "Real person available if you have questions at any point",
]

const STEPS = [
  { n: '1', title: 'Message us on WhatsApp',    body: 'Tell us what you need — TFN, tax return, super, or ABN. Takes 2 minutes.' },
  { n: '2', title: 'We review your situation',  body: 'We confirm your visa type, income, and what applies to you.' },
  { n: '3', title: 'We prepare everything',     body: 'Your return, application, or claim — prepared correctly with oversight.' },
  { n: '4', title: 'Done. You get the outcome', body: 'Your TFN, lodgement confirmation, or payment. We stay available if needed.' },
]

const FAQS = [
  {
    q: "I already left Australia. Can I still do my tax return and claim super?",
    a: "Yes. Most of our clients are overseas when they come to us. The entire process is online and works from anywhere in the world. You can lodge a tax return and claim your super after leaving — there is no hard deadline for super claims.",
  },
  {
    q: "I worked for multiple employers. Is that more complicated?",
    a: "Not for you. It's more work on our end — we consolidate your income from all employers — but you just send us your details and we take care of the rest.",
  },
  {
    q: "How does this actually work? Do I need to sign anything or create an account?",
    a: "No accounts, no portals. You message us on WhatsApp, send your details, and we handle the preparation and lodgement. We'll let you know if we need anything specific.",
  },
  {
    q: "What's the difference between a tax return and claiming super?",
    a: "A tax return is filed with the ATO to settle your income tax for the year — this may result in a refund or a small amount owing. Super (DASP) is a separate claim for the employer contributions that were paid into your superannuation fund while you worked. They are two different processes and we handle both.",
  },
  {
    q: "I wasn't taxed the right amount during the year. Can that be fixed?",
    a: "Yes. If you were on the wrong tax rate — for example, taxed at 32.5% instead of the WHM rate of 15% — or if you were taxed at 47% without a TFN, your tax return is how that gets corrected. We review your payment summaries and lodge accordingly.",
  },
  {
    q: "How much does this cost?",
    a: "Fees depend on the service. Message us to get a clear answer based on your situation. There is no obligation to proceed after the initial conversation.",
  },
]

export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          1. HERO — Problem-first, specific, action-driven
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        {/* Subtle background gradient */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(11,82,64,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-14 pb-16 md:pt-20 md:pb-24 text-center" style={{ position: 'relative', zIndex: 1 }}>

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span style={{ fontSize: '11px', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0B5240' }}>
              Working Holiday Visa Specialist · Australia
            </span>
          </div>

          {/* Headline — specific, addresses real fear */}
          <h1 className="font-serif font-black text-ink mx-auto" style={{
            fontSize: 'clamp(30px, 5.5vw, 58px)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: '22px',
            maxWidth: '16ch',
          }}>
            Your Australian tax,{' '}
            <span style={{ color: '#0B5240' }}>handled correctly.</span>
          </h1>

          {/* Sub — concrete, not fluffy */}
          <p style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            lineHeight: 1.65,
            color: 'rgba(10,15,13,0.6)',
            maxWidth: '44ch',
            margin: '0 auto 12px',
            fontWeight: 300,
          }}>
            TFN, tax return, and super — handled by people who work exclusively with working holiday travellers, every day.
          </p>

          {/* Social proof micro-line */}
          <p style={{ fontSize: '13px', color: '#0B5240', fontWeight: 500, marginBottom: '32px' }}>
            1,200+ travellers helped · 4.9★ average rating
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center" style={{ marginBottom: '28px' }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto justify-center"
              style={{ height: '56px', padding: '0 44px', fontSize: '16px', maxWidth: '320px' }}>
              Start on WhatsApp — it's free →
            </a>
            <Link href="/calculator" className="btn-ghost-dark w-full sm:w-auto justify-center"
              style={{ height: '56px', padding: '0 28px', fontSize: '15px', maxWidth: '240px' }}>
              Estimate my refund
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {[
              'No accounts or portals needed',
              'Works from anywhere in the world',
              'Professional oversight on every file',
            ].map((t, i) => (
              <span key={i} className="inline-flex items-center gap-1.5" style={{ fontSize: '12.5px', color: 'rgba(10,15,13,0.5)' }}>
                <CheckIcon />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. PROBLEM STRIP — Agitate the real pain before solving it
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#0B5240' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { stat: '47%', label: 'Tax rate without a TFN', note: 'Nearly half of every payslip withheld until it\'s sorted' },
              { stat: '15%', label: 'Correct WHM tax rate', note: 'The rate you should pay — once registered and set up correctly' },
              { stat: '12%', label: 'Of wages paid as super', note: 'Sitting in a fund, waiting — most travellers never claim it' },
            ].map((item, i) => (
              <div key={i}>
                <p className="font-serif font-black text-white" style={{ fontSize: 'clamp(32px, 5vw, 48px)', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '6px' }}>{item.stat}</p>
                <p className="font-semibold text-white" style={{ fontSize: '13px', marginBottom: '4px' }}>{item.label}</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. REFUND CALCULATOR CTA — High-intent hook
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — copy */}
            <div>
              <span className="section-label" style={{ marginBottom: '12px', display: 'inline-flex' }}>Tax refund calculator</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '16px' }}>
                Find out if you're owed a refund — in 30 seconds.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '15px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '40ch' }}>
                Enter your income and the tax your employer withheld. The calculator applies the correct Working Holiday Maker rate and shows your estimated position.
              </p>
              <div className="flex flex-col gap-3" style={{ maxWidth: '320px' }}>
                <p style={{ fontSize: '12.5px', color: '#587066' }}>✓ Based on current ATO rates</p>
                <p style={{ fontSize: '12.5px', color: '#587066' }}>✓ No personal data stored</p>
                <p style={{ fontSize: '12.5px', color: '#587066' }}>✓ Instant, free estimate</p>
              </div>
            </div>

            {/* Right — calculator card */}
            <div className="rounded-2xl bg-white" style={{ padding: '28px', border: '1px solid #C8EAE0', boxShadow: '0 4px 24px rgba(11,82,64,0.08)' }}>
              <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '20px' }}>Estimate your tax refund</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 500, color: '#587066', display: 'block', marginBottom: '6px' }}>Total income earned in Australia (AUD)</label>
                  <div className="input-base" style={{ display: 'flex', alignItems: 'center', pointerEvents: 'none', color: '#8AADA3', fontSize: '14px' }}>e.g. 25,000</div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 500, color: '#587066', display: 'block', marginBottom: '6px' }}>Total tax withheld by employers (AUD)</label>
                  <div className="input-base" style={{ display: 'flex', alignItems: 'center', pointerEvents: 'none', color: '#8AADA3', fontSize: '14px' }}>e.g. 7,500</div>
                </div>
              </div>

              <Link href="/calculator"
                className="btn-primary w-full justify-center"
                style={{ height: '50px', fontSize: '14.5px' }}>
                Calculate my refund →
              </Link>

              <p style={{ fontSize: '11.5px', color: '#8AADA3', textAlign: 'center', marginTop: '12px' }}>
                Estimate only. Your exact outcome is confirmed after review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. SERVICES — Problem + solution framing per card
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-label center">What we help with</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginTop: '10px', marginBottom: '10px' }}>
              Four things most WHV travellers need to sort.
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '44ch' }}>
              We handle all of them. You can come to us for one or all four.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" style={{ alignItems: 'stretch' }}>
            {SERVICES.map((s) => (
              <Link key={s.href} href={s.href}
                className="group bg-white rounded-2xl flex flex-col transition-all hover:shadow-lg"
                style={{ padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,.04), 0 2px 12px rgba(11,82,64,.06)', height: '100%' }}>
                <span className="font-medium text-subtle uppercase" style={{ fontSize: '10px', letterSpacing: '0.1em', marginBottom: '12px' }}>{s.num}</span>
                <h3 className="font-semibold text-ink" style={{ fontSize: '14.5px', marginBottom: '10px' }}>{s.title}</h3>
                {/* Problem */}
                <div className="flex items-start gap-2" style={{ marginBottom: '8px' }}>
                  <CrossRed />
                  <p className="font-light text-muted" style={{ fontSize: '12.5px', lineHeight: 1.6 }}>{s.problem}</p>
                </div>
                {/* Solution */}
                <div className="flex items-start gap-2 flex-1">
                  <TickGreen />
                  <p className="font-light text-body" style={{ fontSize: '12.5px', lineHeight: 1.6 }}>{s.fix}</p>
                </div>
                <span className="flex items-center gap-1.5 font-medium text-forest-600 transition-all group-hover:gap-3 mt-4" style={{ fontSize: '12.5px' }}>
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. WHY US — Concrete differentiators, not generic claims
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '40px' }}>
            <span className="section-label center">Why choose us</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginTop: '10px', marginBottom: '10px' }}>
              We don't do general tax.<br />
              <span style={{ color: '#0B5240' }}>We do working holiday tax.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ marginBottom: '40px' }}>
            {WHY_US.map((item, i) => (
              <div key={i} className="flex gap-4 rounded-2xl"
                style={{ padding: '22px', background: '#F7FCF9', border: '1px solid #C8EAE0' }}>
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                  style={{ background: '#0B5240', fontSize: '12px', marginTop: '2px' }}>
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '6px' }}>{item.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DIY vs Us comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="rounded-2xl" style={{ padding: '24px', background: '#fff', border: '1.5px solid #E2EFE9' }}>
              <p className="font-semibold text-muted" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Doing it yourself</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DIY_PROBLEMS.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CrossRed />
                    <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl" style={{ padding: '24px', background: '#EAF6F1', border: '1.5px solid #C8EAE0' }}>
              <p className="font-semibold text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '16px' }}>Using our service</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {OUR_SOLUTION.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <TickGreen />
                    <p className="font-semibold text-ink" style={{ fontSize: '13px', lineHeight: 1.6 }}>{item}</p>
                  </div>
                ))}
              </div>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex w-full justify-center"
                style={{ height: '48px', fontSize: '14px' }}>
                Start on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          6. TESTIMONIALS — Story-driven, specific, credible
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#F4F9F6', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">Real experiences</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginTop: '10px' }}>
              From people exactly like you.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: '48px', alignItems: 'stretch' }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl flex flex-col"
                style={{ padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,.04), 0 4px 20px rgba(11,82,64,.06)', height: '100%' }}>
                <div className="flex gap-0.5" style={{ marginBottom: '14px' }}>
                  {Array.from({ length: 5 }).map((_, si) => <IconStar key={si} />)}
                </div>
                <p className="font-light text-body flex-1" style={{ fontSize: '14px', lineHeight: 1.75, marginBottom: '18px' }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2.5" style={{ paddingTop: '14px', borderTop: '1px solid #E2EFE9' }}>
                  <div className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
                    style={{ width: '34px', height: '34px', fontSize: '12px', background: t.bg, color: t.color }}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '13px' }}>{t.name}</p>
                    <p className="text-subtle" style={{ fontSize: '11.5px', marginTop: '1px' }}>{t.from}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { n: '4.9★', l: 'Average rating' },
              { n: '1,200+', l: 'Travellers helped' },
              { n: '< 24h', l: 'Response time' },
              { n: '40+', l: 'Countries served' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-serif font-black text-forest-500" style={{ fontSize: 'clamp(20px, 2.8vw, 26px)', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.n}</p>
                <p className="text-subtle" style={{ fontSize: '12px', marginTop: '4px' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. HOW IT WORKS — Demystify the process, remove friction
      ══════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label center">How it works</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginTop: '10px', marginBottom: '10px' }}>
              One message is all it takes to start.
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '40ch' }}>
              No forms to fill in, no accounts to create. Just a WhatsApp conversation and we guide you from there.
            </p>
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
          <div className="lg:hidden flex flex-col" style={{ marginBottom: '36px' }}>
            {STEPS.map((s, i) => (
              <div key={i} className="flex gap-4" style={{ paddingBottom: i < STEPS.length - 1 ? '20px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: '#0B5240', fontSize: '12px' }}>{s.n}</div>
                  {i < STEPS.length - 1 && <div className="flex-1 w-px mt-2"
                    style={{ minHeight: '20px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                </div>
                <div style={{ paddingTop: '3px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '4px' }}>{s.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px', lineHeight: 1.65 }}>{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="btn-primary inline-flex w-full sm:w-auto justify-center"
              style={{ height: '54px', padding: '0 44px', fontSize: '16px', maxWidth: '340px', margin: '0 auto' }}>
              Start on WhatsApp — it's free →
            </a>
            <p style={{ marginTop: '10px', fontSize: '12.5px', color: '#587066' }}>
              No commitment to proceed · Response within 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          8. FAQ — Remove the last objections before they leave
      ══════════════════════════════════════════════════════════════ */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-16 items-start">

            <div>
              <span className="section-label">Common questions</span>
              <h2 className="font-serif font-black text-ink" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '14px' }}>
                Questions we hear every day.
              </h2>
              <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.65, marginBottom: '24px' }}>
                Don't see your question here? Message us — it usually takes a few minutes to get an answer.
              </p>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex w-full sm:w-auto justify-center"
                style={{ height: '48px', padding: '0 24px', fontSize: '14px' }}>
                Ask us on WhatsApp →
              </a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {FAQS.map((faq, i) => (
                <div key={i} style={{ borderTop: '1px solid #C8EAE0', padding: '18px 0' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '14px', marginBottom: '8px', lineHeight: 1.4 }}>{faq.q}</p>
                  <p className="font-light text-muted" style={{ fontSize: '13.5px', lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #C8EAE0' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          9. FINAL CTA — Strong close, repeat the core promise
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#0B5240', padding: '80px 0' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 80% at 100% 50%, rgba(233,160,32,0.12) 0%, transparent 60%)',
        }} />
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center" style={{ position: 'relative', zIndex: 1 }}>

          <p className="font-semibold uppercase" style={{ fontSize: '11px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
            Ready to get started?
          </p>

          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(26px, 4vw, 48px)', lineHeight: 1.06, letterSpacing: '-0.03em', marginBottom: '16px', maxWidth: '22ch' }}>
            Your Australian tax, sorted correctly — from anywhere in the world.
          </h2>

          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', maxWidth: '44ch', margin: '0 auto 32px', lineHeight: 1.7, fontWeight: 300 }}>
            One WhatsApp message to start. No accounts, no portals, no confusion. We take it from there.
          </p>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '56px', padding: '0 48px', fontSize: '16px', maxWidth: '360px', margin: '0 auto 16px' }}>
            Start on WhatsApp — it's free →
          </a>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2" style={{ marginTop: '16px' }}>
            {['No commitment required', 'Response within 24 hours', '1,200+ travellers already helped'].map((t, i) => (
              <span key={i} style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.5)' }}>
                ✓ {t}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

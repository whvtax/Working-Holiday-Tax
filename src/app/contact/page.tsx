import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact — Working Holiday Tax',
  description: 'Tell us your situation and we\'ll guide you from there. Clear, personal guidance for working holiday travellers across Australia.',
}

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 pt-14 pb-14 md:pt-20 md:pb-20 text-center">
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
            <span className="font-medium uppercase" style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(11,82,64,0.65)' }}>Get in touch</span>
          </div>

          <h1 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(28px, 4vw, 48px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '18px', maxWidth: '20ch' }}>
            Tell us your situation.{' '}
            <span style={{ color: '#0B5240' }}>We&apos;ll guide you from there.</span>
          </h1>

          <p style={{ fontSize: '16px', lineHeight: 1.7, color: 'rgba(10,15,13,0.6)', maxWidth: '46ch', margin: '0 auto 32px', fontWeight: 300 }}>
            Send us your details and we&apos;ll explain the next steps clearly. No obligation to proceed.
          </p>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '54px', padding: '0 40px', fontSize: '16px', borderRadius: '100px', maxWidth: '320px', margin: '0 auto' }}>
            Start with a quick check →
          </a>
        </div>
      </section>

      {/* ── CONTACT OPTIONS ──────────────────────────────────────────────── */}
      <section style={{ background: '#EEF7F2', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="text-center" style={{ marginBottom: '36px' }}>
            <span className="section-label center">How to reach us</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px', marginBottom: '8px' }}>
              Choose how you want to contact us.
            </h2>
            <p className="font-light text-muted mx-auto" style={{ fontSize: '15px', lineHeight: 1.65, maxWidth: '36ch' }}>
              We respond quickly and keep things simple.
            </p>
          </div>

          <div className="max-w-2xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* WhatsApp — primary */}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between w-full rounded-2xl transition-all hover:shadow-md group"
              style={{ background: '#ffffff', border: '1.5px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.04)', padding: '20px 24px' }}>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#22C55E' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="rgba(255,255,255,0.2)"/>
                    <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" stroke="white" strokeWidth="0.5"/>
                    <path d="M13.1 12.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3.12.3.42 1.26.46 1.35.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '15px', letterSpacing: '-0.01em', marginBottom: '2px' }}>Chat with us on WhatsApp</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px' }}>Quick replies during business hours</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-forest-500 group-hover:gap-3 transition-all flex-shrink-0">
                <span className="font-medium hidden sm:block" style={{ fontSize: '13px' }}>Message us</span>
                <ArrowIcon />
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${EMAIL}`}
              className="flex items-center justify-between w-full rounded-2xl transition-all hover:shadow-md group"
              style={{ background: '#ffffff', border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)', padding: '20px 24px' }}>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="#0B5240" strokeWidth="1.3"/>
                    <path d="M1.5 6.5l6.6 4.2a1.5 1.5 0 001.8 0L16.5 6.5" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-ink" style={{ fontSize: '15px', letterSpacing: '-0.01em', marginBottom: '2px' }}>Send us an email</p>
                  <p className="font-light text-muted" style={{ fontSize: '13px' }}>We&apos;ll respond with clear next steps</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-forest-500 group-hover:gap-3 transition-all flex-shrink-0">
                <span className="font-medium hidden sm:block" style={{ fontSize: '13px' }}>Send email</span>
                <ArrowIcon />
              </div>
            </a>

            {/* Social row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl transition-all hover:shadow-md group"
                style={{ background: '#ffffff', border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)', padding: '20px 24px' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '14px', letterSpacing: '-0.01em', marginBottom: '2px' }}>Message us on Instagram</p>
                    <p className="font-light text-muted" style={{ fontSize: '12.5px' }}>Simple questions or quick help</p>
                  </div>
                </div>
                <ArrowIcon />
              </a>

              <a href="https://tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl transition-all hover:shadow-md group"
                style={{ background: '#ffffff', border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)', padding: '20px 24px' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#010101' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-ink" style={{ fontSize: '14px', letterSpacing: '-0.01em', marginBottom: '2px' }}>Reach out via TikTok</p>
                    <p className="font-light text-muted" style={{ fontSize: '12.5px' }}>We&apos;ll guide you from there</p>
                  </div>
                </div>
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ────────────────────────────────────────────── */}
      <section className="bg-white" style={{ padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8">
          <div className="max-w-xl mx-auto text-center" style={{ marginBottom: '48px' }}>
            <span className="section-label center">What happens next</span>
            <h2 className="font-serif font-black text-ink mx-auto" style={{ fontSize: 'clamp(24px, 2.8vw, 32px)', lineHeight: 1.08, letterSpacing: '-0.025em', marginTop: '10px' }}>
              What happens after you contact us.
            </h2>
          </div>

          <div className="max-w-2xl mx-auto">
            {[
              { n: '1', title: 'We review your situation',   body: 'We look at your details and understand what you need.' },
              { n: '2', title: 'You get clear guidance',     body: 'We explain your options in simple terms.' },
              { n: '3', title: 'You decide how to proceed',  body: 'No pressure, you choose what to do next.' },
            ].map((item, i, arr) => (
              <div key={i} className="flex gap-5" style={{ paddingBottom: i < arr.length - 1 ? '28px' : '0' }}>
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                    style={{ background: '#0B5240', fontSize: '13px' }}>{item.n}</div>
                  {i < arr.length - 1 && (
                    <div className="flex-1 w-px mt-2" style={{ minHeight: '24px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />
                  )}
                </div>
                <div style={{ paddingTop: '4px' }}>
                  <p className="font-semibold text-ink" style={{ fontSize: '15px', marginBottom: '4px', letterSpacing: '-0.01em' }}>{item.title}</p>
                  <p className="font-light text-muted" style={{ fontSize: '14px', lineHeight: 1.65 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ background: '#1A5C44', padding: '80px 0' }}>
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 text-center">
          <h2 className="font-serif font-black text-white mx-auto" style={{ fontSize: 'clamp(24px, 3.2vw, 40px)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '14px', maxWidth: '22ch' }}>
            Start with a quick check.
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)', maxWidth: '38ch', margin: '0 auto 28px', lineHeight: 1.7, fontWeight: 300 }}>
            Tell us your situation and we&apos;ll guide you clearly.
          </p>
          <a href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary inline-flex w-full sm:w-auto justify-center"
            style={{ height: '54px', padding: '0 40px', fontSize: '15px', maxWidth: '280px', margin: '0 auto' }}>
            Check your eligibility →
          </a>
        </div>
      </section>
    </>
  )
}

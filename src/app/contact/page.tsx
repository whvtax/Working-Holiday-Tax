import type { Metadata } from 'next'
import Link from 'next/link'
import { WA_URL, EMAIL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Working Holiday Tax',
  description: 'Get in touch with Working Holiday Tax. Ask anything about TFN, tax returns, super, or ABN. We reply fast.',
}

export default function ContactPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-[68px] bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10 py-10 lg:py-14">
          <div className="max-w-[640px] mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-forest-500 animate-pulse-dot" aria-hidden="true" />
              <span className="font-medium uppercase text-forest-500" style={{ fontSize: '11px', letterSpacing: '0.16em' }}>Get in touch</span>
            </div>
            <h1 className="font-serif font-black text-ink mb-4" style={{ fontSize: 'clamp(22px, 2.98vw, 36px)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Get clear answers
            </h1>
            <p className="font-light leading-[1.75] mx-auto" style={{ fontSize: '15px', color: 'rgba(10,15,13,0.58)', maxWidth: '440px' }}>
              Send us your details. We will review your situation and explain the next steps clearly. No obligation to proceed.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT OPTIONS ──────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-7 reveal">
            <span className="section-label center" style={{textAlign:"center",display:"flex",justifyContent:"center"}}>How to reach us</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(17px, 1.7vw, 19px)', lineHeight: 1.1, letterSpacing: '-0.025em', textAlign:'center' }}>
              Contact options
            </h2>
            <p className="font-light text-muted text-center" style={{ fontSize:'14px' }}>We respond quickly across all channels.</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-3 reveal delay-1">

            {/* WhatsApp  -  primary, most prominent */}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between w-full rounded-2xl p-6 transition-all hover:shadow-md group"
              style={{ background: '#ffffff', border: '1.5px solid #C8EAE0', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#22C55E' }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="rgba(255,255,255,0.2)"/>
                    <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" stroke="white" strokeWidth="0.5"/>
                    <path d="M13.1 12.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3.12.3.42 1.26.46 1.35.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>WhatsApp</p>
                  <p className="text-[13px] font-light text-muted">Replies within the hour  -  real person, no bots</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-forest-500 group-hover:gap-3 transition-all">
                <span className="text-[13px] font-medium hidden sm:block">Message us</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </a>

            {/* Email */}
            <a href={`mailto:${EMAIL}`}
              className="flex items-center justify-between w-full rounded-2xl p-6 transition-all hover:shadow-md group"
              style={{ background: '#ffffff', border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#EAF6F1', border: '1px solid #C8EAE0' }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <rect x="1.5" y="3.5" width="15" height="11" rx="2" stroke="#0B5240" strokeWidth="1.3"/>
                    <path d="M1.5 6.5l6.6 4.2a1.5 1.5 0 001.8 0L16.5 6.5" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>Email</p>
                  <p className="text-[13px] font-light text-muted">{EMAIL}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-forest-500 group-hover:gap-3 transition-all">
                <span className="text-[13px] font-medium hidden sm:block">Send email</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2.5 7h9M8.5 4l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </a>

            {/* Social row */}
            <div className="grid grid-cols-2 gap-4">
              <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl p-5 transition-all hover:shadow-md group"
                style={{ background: '#ffffff', border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>Instagram</p>
                    <p className="text-[12.5px] font-light text-muted">@workingholidaytax</p>
                  </div>
                </div>
              </a>
              <a href="https://tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl p-5 transition-all hover:shadow-md group"
                style={{ background: '#ffffff', border: '1.5px solid #E2EFE9', boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#010101' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.76a4.85 4.85 0 01-1.02-.07z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>TikTok</p>
                    <p className="text-[12.5px] font-light text-muted">@workingholidaytax</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ───────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-7 reveal">
              <span className="section-label center">What to expect</span>
              <h2 className="font-serif font-black text-ink mt-2 mb-3" style={{ fontSize: 'clamp(17px, 1.7vw, 19px)', lineHeight: 1.1, letterSpacing: '-0.025em', textAlign:'center' }}>
                What happens when you contact us
              </h2>
            </div>
            <div className="flex flex-col reveal delay-1" style={{ gap: '0' }}>
              {[
                { n: '1', label: 'Tell us what you need', body: 'Share your situation — TFN, return, super or ABN.' },
                { n: '2', label: 'We review your case',   body: 'A real person responds within 24 hours.' },
                { n: '3', label: 'We handle everything',  body: 'No commitment. You decide how to proceed.' },
              ].map((item, i, arr) => (
                <div key={i} className="flex gap-4" style={{ paddingBottom: i < arr.length - 1 ? '18px' : '0' }}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white" style={{ background: '#0B5240', fontSize: '12px' }}>{item.n}</div>
                    {i < arr.length - 1 && <div className="flex-1 w-px mt-2" style={{ minHeight: '18px', background: 'linear-gradient(180deg, #0B5240 0%, #C8EAE0 100%)' }} aria-hidden="true" />}
                  </div>
                  <div style={{ paddingTop: '3px' }}>
                    <p className="text-[13px] font-semibold text-ink mb-0.5" style={{ letterSpacing: '-0.01em' }}>{item.label}</p>
                    <p className="text-[13px] font-light text-muted leading-[1.65]">{item.body}</p>
                  </div>
                </div>
              ))}
              <div style={{ borderTop: '1px solid #E2EFE9', marginTop: '18px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
      <section className="py-10 lg:py-14" style={{ background: '#EEF7F2' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-10">
          <div className="max-w-lg mx-auto text-center reveal">
            <span className="section-label center mb-4 block">Ready?</span>
            <h2 className="font-serif font-black text-ink mt-2 mb-4" style={{ fontSize: 'clamp(17px, 2.12vw, 24px)', lineHeight: 1.08, letterSpacing: '-0.025em' }}>
              Start with a quick check.
            </h2>
            <p className="font-light text-muted leading-[1.75] mb-6" style={{ fontSize: '15px', maxWidth: '360px' }}>
              Tell us your situation. We will review it and outline your options clearly.
            </p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn-primary mx-auto" style={{ height: '46px', padding: '0 22px', fontSize: '13.5px', display: 'flex' }}>
              Check your eligibility →
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

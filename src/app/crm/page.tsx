'use client'

import { useState, useEffect } from 'react'
import { CrmLogoMark, NavIcons } from '@/components/crm/Shell'

// The idle-logout redirect in the CRM layout lands here as /crm?timeout=1.
// It is not an error the user made, so it is toned as a warning, not a failure.
const TIMEOUT_MSG = 'You were logged out after 30 minutes of inactivity. Please log in again.'

export default function CrmLoginPage() {
  const [step, setStep]         = useState<'password'|'otp'>('password')
  const [password, setPassword] = useState('')
  const [otp, setOtp]           = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('timeout') === '1') {
      setError(TIMEOUT_MSG)
    }
  }, [])

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch('/api/crm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (data.ok && data.otpSent) {
        setStep('otp')
      } else {
        setError(data.message || 'Incorrect password.')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleOtp(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch('/api/crm/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: otp }),
      })
      const data = await res.json()
      if (data.ok) {
        window.location.replace('/crm/dashboard')
      } else {
        setError(data.message || 'Invalid or expired code.')
      }
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  // Presentation only — the state itself is untouched.
  const tone = error === TIMEOUT_MSG ? 'var(--warn)' : 'var(--crit)'

  return (
    // The .crm-scope default is the flex row that carries the side rail; this
    // screen has no rail, so the one screen that is a single centred card
    // overrides the layout here rather than in the shared stylesheet.
    <div
      className="crm-scope"
      style={{
        display: 'grid',
        placeItems: 'center',
        padding: 20,
        /* Jo's photo, full-bleed behind the whole screen. `cover` and a fixed
           centre so it fills any window without distorting; the source is
           831×508, so on a wide monitor it is upscaled and will read soft —
           there is no more detail in the file to show. */
        backgroundImage: 'url(/assets/crm-login.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* A scrim between the photo and the card. Without it the card's own
          shadow disappears against a busy image and the edges go mushy; with
          it the card reads as sitting above the picture rather than pasted on.
          Dark enough to seat the card, light enough that the photo is still
          clearly the photo. */}
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(20,24,30,.34)' }} aria-hidden="true" />
      <div
        className="modal"
        style={{
          maxWidth: 340,
          textAlign: 'center',
          padding: 20,
          position: 'relative',   /* above the scrim */
          boxShadow: '0 24px 70px rgba(12,16,22,.45)',
        }}
      >
        <div>
        <div className="slogo" style={{ justifyContent: 'center', padding: '2px 0 14px' }}>
          <CrmLogoMark />
        </div>

        {step === 'password' ? (
          <>
            <h1 className="vt">WHV Tax CRM</h1>
            <div className="vsub">Enter your password to continue</div>
            <form onSubmit={handlePassword}>
              {/* type="password" is outside the shared input selector list, so
                  it asks for .inp by name. */}
              <input
                className="inp"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
                required
                style={{ textAlign: 'center', marginBottom: 12 }}
              />
              <button
                className="btn take lg"
                type="submit"
                disabled={loading || !password}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {loading ? 'Checking…' : 'Continue →'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="vt">Check your email</h1>
            <div className="vsub">
              We sent an 8-digit code to<br/>
              <span style={{ fontWeight: 600, color: 'var(--brand1)' }}>info@workingholidaytax.com.au</span>
            </div>
            <form onSubmit={handleOtp}>
              <input
                className="inp code"
                type="text"
                inputMode="numeric"
                placeholder="00000000"
                maxLength={8}
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                autoFocus
                required
                style={{ marginBottom: 12 }}
              />
              <button
                className="btn take lg"
                type="submit"
                disabled={loading || otp.length < 8}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {loading ? 'Verifying…' : 'Sign in →'}
              </button>
            </form>
            <button
              type="button"
              className="btn quiet sm"
              onClick={() => { setStep('password'); setError(''); setOtp('') }}
              style={{ marginTop: 12 }}
            >
              <span className="ic">{NavIcons.back}</span>Back
            </button>
          </>
        )}

        {error && (
          <div
            style={{
              marginTop: 13,
              padding: '8px 11px',
              borderRadius: 9,
              fontSize: 11.5,
              lineHeight: 1.5,
              textAlign: 'left',
              color: tone,
              background: `color-mix(in srgb, ${tone} 9%, transparent)`,
              border: `1px solid color-mix(in srgb, ${tone} 28%, transparent)`,
            }}
          >
            {error}
          </div>
        )}
        </div>{/* end fields block */}
      </div>
    </div>
  )
}

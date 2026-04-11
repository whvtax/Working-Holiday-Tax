'use client'

import { useState } from 'react'

export default function CrmLoginPage() {
  const [step, setStep]         = useState<'password'|'otp'>('password')
  const [password, setPassword] = useState('')
  const [otp, setOtp]           = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handlePassword(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch('/api/crm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
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
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
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

  return (
    <>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#0E5C42;font-family:'DM Sans',system-ui,sans-serif;}
        .wrap{min-height:100dvh;display:flex;align-items:center;justify-content:center;padding:24px;}
        .card{background:#fff;border-radius:24px;padding:36px 32px;width:100%;max-width:360px;text-align:center;}
        .icon{width:56px;height:56px;border-radius:16px;background:#e8f5f0;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
        .title{font-size:22px;font-weight:700;color:#0a1410;margin-bottom:6px;letter-spacing:-0.3px;}
        .subtitle{font-size:13px;color:#7a8a82;line-height:1.6;margin-bottom:24px;}
        .email-hint{font-size:13px;font-weight:600;color:#0E5C42;}
        .inp{display:block;width:100%;padding:13px 14px;font-size:15px;font-family:inherit;color:#0a1410;background:#f7fbf9;border:1.5px solid #e4ede8;border-radius:12px;outline:none;text-align:center;letter-spacing:0.05em;transition:border-color .15s;margin-bottom:16px;}
        .inp:focus{border-color:#0E5C42;background:#fff;}
        .inp-otp{font-size:28px;font-weight:700;letter-spacing:0.25em;}
        .btn{display:flex;align-items:center;justify-content:center;width:100%;height:50px;background:#0E5C42;color:#fff;font-size:15px;font-weight:600;font-family:inherit;border:none;border-radius:12px;cursor:pointer;transition:opacity .15s;}
        .btn:disabled{opacity:0.6;cursor:not-allowed;}
        .err{background:#fef2f2;border:1px solid #fca5a5;border-radius:10px;padding:10px 14px;font-size:13px;color:#c0392b;margin-top:14px;}
        .back{background:none;border:none;font-size:12px;color:#7a8a82;cursor:pointer;margin-top:14px;font-family:inherit;}
        .back:hover{color:#0E5C42;}
      `}</style>
      <div className="wrap">
        <div className="card">
          <div className="icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="11" rx="2.5" stroke="#0E5C42" strokeWidth="1.8"/>
              <path d="M8 11V7.5a4 4 0 018 0V11" stroke="#0E5C42" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>

          {step === 'password' ? (
            <>
              <div className="title">WHV Tax CRM</div>
              <div className="subtitle">Enter your password to continue</div>
              <form onSubmit={handlePassword}>
                <input
                  className="inp"
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoFocus
                  required
                />
                <button className="btn" type="submit" disabled={loading || !password}>
                  {loading ? 'Checking…' : 'Continue →'}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="title">Check your email</div>
              <div className="subtitle">
                We sent an 8-digit code to<br/>
                <span className="email-hint">info@workingholidaytax.com.au</span>
              </div>
              <form onSubmit={handleOtp}>
                <input
                  className="inp inp-otp"
                  type="text"
                  inputMode="numeric"
                  placeholder="00000000"
                  maxLength={8}
                  value={otp}
                  onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                  autoFocus
                  required
                />
                <button className="btn" type="submit" disabled={loading || otp.length < 8}>
                  {loading ? 'Verifying…' : 'Sign in →'}
                </button>
              </form>
              <button className="back" onClick={() => { setStep('password'); setError(''); setOtp('') }}>
                ← Back
              </button>
            </>
          )}

          {error && <div className="err">{error}</div>}
        </div>
      </div>
    </>
  )
}

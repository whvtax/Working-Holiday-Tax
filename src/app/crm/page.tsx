'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CrmLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
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
      if (!data.ok) {
        setError(data.message ?? 'Incorrect password.')
      } else {
        window.location.href = '/crm/dashboard'
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        .crm-root{min-height:100vh;background:#0E5C42;display:flex;align-items:center;justify-content:center;font-family:'DM Sans',system-ui,sans-serif;padding:20px;}
        .crm-card{background:#fff;border-radius:28px;padding:48px 44px 40px;width:100%;max-width:420px;box-shadow:0 40px 120px rgba(0,0,0,0.22);animation:cardIn 0.4s cubic-bezier(0.16,1,0.3,1) both;}
        @keyframes cardIn{from{opacity:0;transform:translateY(16px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        .crm-icon{width:68px;height:68px;border-radius:20px;background:#0E5C42;display:flex;align-items:center;justify-content:center;margin:0 auto 22px;box-shadow:0 8px 28px rgba(14,92,66,0.38);}
        .crm-title{font-size:24px;font-weight:600;color:#0a1410;text-align:center;margin:0 0 6px;letter-spacing:-0.4px;}
        .crm-sub{font-size:14px;color:#7a8a82;text-align:center;margin:0 0 28px;}
        .crm-div{height:1px;background:#f0f0f0;margin:0 -44px 22px;}
        .crm-err{font-size:13px;color:#c0392b;text-align:center;margin-bottom:10px;min-height:18px;}
        .crm-input{width:100%;border:1.5px solid #e4eeea;border-radius:14px;padding:15px 18px;font-size:15px;font-family:'DM Sans',system-ui,sans-serif;background:#f5faf7;color:#0a1410;outline:none;transition:border-color 0.18s,background 0.18s;box-sizing:border-box;margin-bottom:12px;}
        .crm-input:focus{border-color:#0E5C42;background:#edf7f2;}
        .crm-input::placeholder{color:#b0c2b8;font-weight:300;}
        .crm-btn{width:100%;padding:15px;background:#0E5C42;color:#fff;border:none;border-radius:14px;font-size:15px;font-weight:500;font-family:'DM Sans',system-ui,sans-serif;cursor:pointer;transition:opacity 0.18s,transform 0.1s;}
        .crm-btn:hover:not(:disabled){opacity:0.88;}
        .crm-btn:active:not(:disabled){transform:scale(0.985);}
        .crm-btn:disabled{opacity:0.45;cursor:not-allowed;}
        .crm-footer{display:flex;align-items:center;justify-content:center;gap:6px;margin-top:18px;font-size:12px;color:#a8b8b0;}
      `}</style>
      <div className="crm-root">
        <div className="crm-card">
          <div className="crm-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <rect x="5" y="11" width="14" height="11" rx="2.5" fill="white" fillOpacity=".92"/>
              <path d="M8 11V7.5a4 4 0 018 0V11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="16.5" r="1.5" fill="#0E5C42"/>
            </svg>
          </div>
          <h1 className="crm-title">WHV Tax CRM</h1>
          <p className="crm-sub">Internal system — authorised access only</p>
          <div className="crm-div" />
          <div className="crm-err">{error}</div>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              className="crm-input"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              autoFocus
            />
            <button type="submit" className="crm-btn" disabled={loading || !password}>
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <div className="crm-footer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L4 7v5c0 5.25 3.5 10.15 8 11 4.5-.85 8-5.75 8-11V7L12 3z" stroke="#a8b8b0" strokeWidth="1.8"/>
            </svg>
            Password protected · Auto-locks after 8 hours
          </div>
        </div>
      </div>
    </>
  )
}

'use client'
import { useState } from 'react'

export default function ReviewerLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    const res = await fetch('/api/crm/reviewer-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    const data = await res.json()
    if (data.ok) {
      window.location.href = '/crm/reviewer/dashboard'
    } else {
      setError(data.locked ? 'Too many attempts. Try again in 30 minutes.' : 'Incorrect password.')
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#F4F9F6' }}>
      <div style={{ width:'100%', maxWidth:'360px', padding:'0 20px' }}>
        <div style={{ textAlign:'center', marginBottom:'32px' }}>
          <div style={{ width:48, height:48, background:'#0B5240', borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4M21 12c0 4.97-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3s9 4.03 9 9z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <h1 style={{ fontFamily:'Georgia,serif', fontSize:24, fontWeight:900, color:'#0D1B17', letterSpacing:'-0.03em' }}>Review Portal</h1>
          <p style={{ fontSize:13, color:'#587066', fontWeight:300, marginTop:6 }}>Working Holiday Tax</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:12 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ border:'1.5px solid #D4EAE2', borderRadius:10, padding:'12px 14px', fontSize:14, fontFamily:'inherit', outline:'none', width:'100%' }}
          />
          {error && <p style={{ fontSize:12, color:'#DC2626', textAlign:'center' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading}
            style={{ background:'#0B5240', color:'#fff', border:'none', borderRadius:100, height:48, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  )
}

'use client'
import React, { useState, useEffect, useCallback, useRef } from 'react'

declare global {
  interface Window {
    fbAsyncInit?: () => void
    FB?: {
      init: (opts: Record<string, unknown>) => void
      login: (
        callback: (response: { authResponse?: { code?: string } }) => void,
        opts: Record<string, unknown>
      ) => void
    }
  }
}

const S = {
  shell: { minHeight:'100vh', background:'#f0f4f1', fontFamily:'"DM Sans",system-ui,sans-serif', padding:'40px 20px' } as React.CSSProperties,
  card: { maxWidth:640, margin:'0 auto', background:'#fff', borderRadius:16, border:'1px solid #e4ede8', padding:'32px 36px' },
  title: { fontSize:20, fontWeight:700, color:'#0a1410', marginBottom:6 },
  sub: { fontSize:13, color:'#7a8a82', marginBottom:24, lineHeight:1.5 },
  btn: { display:'inline-flex', alignItems:'center', gap:8, padding:'12px 22px', background:'#0E5C42', color:'#fff', border:'none', borderRadius:10, fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'inherit' },
  btnDisabled: { opacity:0.5, cursor:'not-allowed' },
  resultBox: { marginTop:24, padding:18, background:'#f7fbf9', border:'1px solid #cde3db', borderRadius:12 },
  field: { marginBottom:14 },
  label: { fontSize:11, fontWeight:700, color:'#4a5a52', textTransform:'uppercase' as const, letterSpacing:'0.04em', marginBottom:4 },
  value: { fontSize:12.5, fontFamily:'Consolas,monospace', color:'#0a1410', background:'#fff', border:'1px solid #e4ede8', borderRadius:7, padding:'8px 10px', wordBreak:'break-all' as const },
  warn: { marginTop:18, padding:14, background:'#fff7e8', border:'1px solid #f0d99a', borderRadius:10, fontSize:12.5, color:'#7a5a10', lineHeight:1.5 },
}

// These two are safe to expose client-side (they're not secrets — the
// Configuration ID and App ID are visible in any embedded signup URL).
const APP_ID = process.env.NEXT_PUBLIC_META_APP_ID
const CONFIG_ID = process.env.NEXT_PUBLIC_META_CONFIG_ID

function Field({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div style={S.field}>
      <div style={S.label}>{label}</div>
      <div
        style={{...S.value, cursor:'pointer'}}
        onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1200) }}
        title="Click to copy"
      >
        {value} {copied && <span style={{color:'#0E5C42', fontWeight:600}}>✓ copied</span>}
      </div>
    </div>
  )
}

export default function ConnectClient() {
  const [sdkReady, setSdkReady] = useState(false)
  const [sdkError, setSdkError] = useState('')
  const [status, setStatus] = useState<'idle' | 'connecting' | 'exchanging' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [wabaId, setWabaId] = useState('')
  const [phoneNumberId, setPhoneNumberId] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const sessionData = useRef<{ wabaId?: string; phoneNumberId?: string }>({})

  // Load the Facebook JS SDK once.
  useEffect(() => {
    if (!APP_ID) return

    // If the script already loaded (e.g. from a previous navigation) and FB
    // is already on window, skip straight to init instead of waiting for a
    // callback that will never fire again.
    if (window.FB) {
      window.FB.init({ appId: APP_ID, autoLogAppEvents: true, xfbml: true, cookie: true, version: 'v21.0' })
      setSdkReady(true)
      return
    }

    window.fbAsyncInit = () => {
      window.FB?.init({ appId: APP_ID, autoLogAppEvents: true, xfbml: true, cookie: true, version: 'v21.0' })
      setSdkReady(true)
    }

    if (!document.getElementById('fb-sdk')) {
      const script = document.createElement('script')
      script.id = 'fb-sdk'
      script.src = 'https://connect.facebook.net/en_US/sdk.js'
      script.async = true
      script.defer = true
      script.onerror = () => setSdkError('Failed to load Facebook\u2019s script. This is usually an ad blocker or browser privacy extension blocking connect.facebook.net \u2014 try disabling it for this site, or use a private/incognito window.')
      document.body.appendChild(script)
    }

    // If nothing has called back within 8 seconds, something is silently
    // blocking the SDK (ad blocker, tracker blocker, corporate firewall).
    // Show that on the page itself instead of requiring devtools.
    const timeout = setTimeout(() => {
      setSdkReady(ready => {
        if (!ready) {
          setSdkError('The Facebook signup script did not load after 8 seconds. This is usually caused by an ad blocker, privacy extension, or corporate network filter blocking connect.facebook.net. Try disabling any ad/privacy blocker for this site, or open this page in a private/incognito window, then reload.')
        }
        return ready
      })
    }, 8000)

    return () => clearTimeout(timeout)
  }, [])

  // Meta posts progress/result events to the window during the signup
  // popup flow — this is how we learn the WABA ID and Phone Number ID
  // without asking the user to hunt for them manually afterwards.
  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (!event.origin.endsWith('facebook.com')) return
      try {
        const data = JSON.parse(event.data)
        if (data.type !== 'WA_EMBEDDED_SIGNUP') return
        if (data.event === 'FINISH' || data.event === 'FINISH_ONLY_WABA') {
          sessionData.current.wabaId = data.data?.waba_id
          sessionData.current.phoneNumberId = data.data?.phone_number_id
          if (data.data?.waba_id) setWabaId(data.data.waba_id)
          if (data.data?.phone_number_id) setPhoneNumberId(data.data.phone_number_id)
        }
      } catch {
        // Not JSON / not ours — ignore.
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  const startSignup = useCallback(() => {
    if (!window.FB || !CONFIG_ID) return
    setStatus('connecting')
    setError('')

    // If the callback below hasn't fired within 25s, the popup almost
    // certainly opened but couldn't "phone home" — the classic symptom of
    // third-party cookies being blocked (Chrome's default posture as of
    // 2025+). Surface that on the page instead of hanging forever.
    const stuckTimeout = setTimeout(() => {
      setStatus(s => {
        if (s === 'connecting') {
          setError('The signup window opened but never completed. This is almost always third-party cookies being blocked for facebook.com in this browser. Try: Chrome address bar \u2192 the icon left of the URL (site info) \u2192 Cookies \u2192 allow third-party cookies for this site, then reload and try again. Also check you don\u2019t have a popup window hidden behind this one.')
          return 'error'
        }
        return s
      })
    }, 25_000)

    // Handles the exchange after we already have the code — kept as a
    // separate async function so the callback passed to FB.login itself is
    // a plain (non-async) function. Meta's SDK does an internal type check
    // that rejects native async functions passed directly as the callback
    // ("Expression is of type asyncfunction, not function") — this sidesteps
    // that entirely.
    async function handleLoginResponse(response: { authResponse?: { code?: string } }) {
      clearTimeout(stuckTimeout)
      const code = response.authResponse?.code
      const respStatus = (response as { status?: string }).status
      if (!code) {
        setStatus('error')
        setError(
          respStatus
            ? `Signup did not complete (status: "${respStatus}"). If a popup never appeared at all, your browser or an OS-level pop-up blocker likely blocked it silently before it could open — check your browser's pop-up settings for this site, and check the taskbar/dock for a hidden window.`
            : 'No authorization code returned. The signup window may have been closed early.'
        )
        return
      }
      setStatus('exchanging')
      try {
        const r = await fetch('/api/whatsapp/exchange-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            wabaId: sessionData.current.wabaId,
            phoneNumberId: sessionData.current.phoneNumberId,
          }),
        })
        const d = await r.json()
        if (!d.ok) throw new Error(d.error || 'Token exchange failed')
        setAccessToken(d.accessToken)
        if (d.wabaId) setWabaId(d.wabaId)
        if (d.phoneNumberId) setPhoneNumberId(d.phoneNumberId)
        setStatus('done')
      } catch (e) {
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Token exchange failed')
      }
    }

    try {
      window.FB.login(
        // Plain function — do NOT make this `async` (see comment above).
        function (response) {
          void handleLoginResponse(response)
        },
        {
          config_id: CONFIG_ID,
          response_type: 'code',
          override_default_response_type: true,
          extras: { setup: {}, sessionInfoVersion: '3' },
        }
      )
    } catch (e) {
      // FB.login() threw synchronously — this happens if the popup was
      // blocked before it could even open (some OS-level or enterprise
      // pop-up blockers do this), or if the config_id / app setup is
      // invalid. Either way, nothing will ever open, so fail fast instead
      // of waiting out the 25s timeout with a misleading message.
      clearTimeout(stuckTimeout)
      setStatus('error')
      setError(
        `The signup window could not be opened at all: ${e instanceof Error ? e.message : String(e)}. ` +
        'This usually means a pop-up blocker (browser or OS-level) stopped it before it could appear. ' +
        'Check your browser\u2019s address bar for a "pop-up blocked" icon and allow pop-ups for this site, then try again.'
      )
    }
  }, [])

  if (!APP_ID || !CONFIG_ID) {
    return (
      <div style={S.shell}>
        <div style={S.card}>
          <div style={S.title}>Missing configuration</div>
          <div style={S.sub}>
            Set <code>NEXT_PUBLIC_META_APP_ID</code> and <code>NEXT_PUBLIC_META_CONFIG_ID</code> in your environment
            variables, then redeploy, before using this page.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={S.shell}>
      <div style={S.card}>
        <div style={S.title}>Connect WhatsApp (Embedded Signup)</div>
        <div style={S.sub}>
          This runs Meta&rsquo;s official signup flow. When asked, choose <strong>&ldquo;Yes, I have a WhatsApp
          Business App&rdquo;</strong> and <strong>&ldquo;Connect an existing number&rdquo;</strong> — never
          &ldquo;Create a new number.&rdquo; Your existing app and number are never disconnected by this flow.
        </div>

        <button
          onClick={startSignup}
          disabled={!sdkReady || status === 'connecting' || status === 'exchanging'}
          style={{...S.btn, ...((!sdkReady || status === 'connecting' || status === 'exchanging') ? S.btnDisabled : {})}}
        >
          {status === 'connecting' && 'Waiting for signup window…'}
          {status === 'exchanging' && 'Finishing up…'}
          {(status === 'idle' || status === 'done' || status === 'error') && 'Connect WhatsApp Number'}
        </button>

        {!sdkReady && !sdkError && (
          <div style={{fontSize:12.5, color:'#7a8a72', marginTop:10}}>Loading Facebook signup script…</div>
        )}

        {sdkError && (
          <div style={{...S.warn, background:'#fdeceb', borderColor:'#f3b7b0', color:'#8a2318'}}>
            <strong>The button isn&rsquo;t working because:</strong> {sdkError}
          </div>
        )}

        {status === 'error' && (
          <div style={{...S.warn, background:'#fdeceb', borderColor:'#f3b7b0', color:'#8a2318'}}>{error}</div>
        )}

        {status === 'done' && accessToken && (
          <div style={S.resultBox}>
            <div style={{fontSize:13, fontWeight:700, color:'#0E5C42', marginBottom:14}}>
              ✓ Connected — copy these into your environment variables now
            </div>
            <Field label="WHATSAPP_ACCESS_TOKEN" value={accessToken} />
            {wabaId && <Field label="WHATSAPP_WABA_ID" value={wabaId} />}
            {phoneNumberId && <Field label="WHATSAPP_PHONE_NUMBER_ID" value={phoneNumberId} />}
            <div style={S.warn}>
              This access token will not be shown again. Copy it into your hosting platform&rsquo;s environment
              variables (e.g. Vercel → Settings → Environment Variables) right now, then redeploy. This page never
              saves it anywhere.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

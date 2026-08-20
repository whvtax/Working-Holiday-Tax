'use client';
// "Connect WhatsApp" — Embedded Signup (Facebook popup, no SMS / no Business
// Settings) plus a manual token-paste fallback. Both save working credentials
// straight to the DB, so the channel goes live with no redeploy.
import { useCallback, useEffect, useRef, useState } from 'react';

const APP_ID = process.env.NEXT_PUBLIC_META_APP_ID || '1388978866435944';
const CONFIG_ID = process.env.NEXT_PUBLIC_META_EMBEDDED_CONFIG_ID || '1723636208969628';
const GRAPH_VERSION = 'v21.0';

declare global { interface Window { FB?: unknown; fbAsyncInit?: () => void } }

type Status = { kind: 'idle' | 'working' | 'ok' | 'error'; msg?: string };

export default function ConnectWhatsApp() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const [sdkReady, setSdkReady] = useState(false);
  const signup = useRef<{ phoneNumberId?: string; wabaId?: string }>({});

  // Load the Facebook JS SDK once.
  useEffect(() => {
    if (document.getElementById('fb-jssdk')) { setSdkReady(true); return; }
    window.fbAsyncInit = function () {
      // @ts-expect-error FB injected by the SDK
      window.FB.init({ appId: APP_ID, autoLogAppEvents: true, xfbml: true, version: GRAPH_VERSION });
      setSdkReady(true);
    };
    const s = document.createElement('script');
    s.id = 'fb-jssdk'; s.async = true; s.crossOrigin = 'anonymous';
    s.src = 'https://connect.facebook.net/en_US/sdk.js';
    document.body.appendChild(s);
  }, []);

  // The Embedded Signup popup posts the selected phone number id + WABA id here.
  useEffect(() => {
    const onMsg = (event: MessageEvent) => {
      if (!/facebook\.com$/.test(new URL(event.origin).hostname)) return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data?.type === 'WA_EMBEDDED_SIGNUP' && data?.data) {
          if (data.data.phone_number_id) signup.current.phoneNumberId = data.data.phone_number_id;
          if (data.data.waba_id) signup.current.wabaId = data.data.waba_id;
        }
      } catch { /* not our message */ }
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const post = useCallback(async (payload: Record<string, unknown>) => {
    setStatus({ kind: 'working', msg: 'Connecting to Meta…' });
    try {
      const res = await fetch('/api/will/whatsapp/connect', {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload),
      });
      const d = await res.json();
      if (d.ok) setStatus({ kind: 'ok', msg: `Connected! Sending is now live for ${d.displayPhoneNumber} (phone id ${d.phoneNumberId}).` });
      else setStatus({ kind: 'error', msg: d.error || 'Connection failed' });
    } catch (e) {
      setStatus({ kind: 'error', msg: (e as Error).message });
    }
  }, []);

  const launch = useCallback(() => {
    if (!window.FB) { setStatus({ kind: 'error', msg: 'Facebook SDK not loaded yet, try again in a second' }); return; }
    signup.current = {};
    setStatus({ kind: 'working', msg: 'Opening Facebook…' });
    // @ts-expect-error FB injected by the SDK
    window.FB.login((response: { authResponse?: { code?: string } }) => {
      const code = response?.authResponse?.code;
      if (!code) { setStatus({ kind: 'error', msg: 'Sign-in was cancelled or returned no code' }); return; }
      post({ code, phoneNumberId: signup.current.phoneNumberId, wabaId: signup.current.wabaId });
    }, {
      config_id: CONFIG_ID,
      response_type: 'code',
      override_default_response_type: true,
      extras: { setup: {}, featureType: '', sessionInfoVersion: '3' },
    });
  }, [post]);

  // Manual fallback
  const [token, setToken] = useState('');
  const [phoneId, setPhoneId] = useState('');

  return (
    <div style={{ maxWidth: 640, margin: '40px auto', padding: 24, fontFamily: 'system-ui, sans-serif', color: '#1f2328' }}>
      <h1 style={{ fontSize: 22, marginBottom: 4 }}>Connect WhatsApp</h1>
      <p style={{ color: '#5c6572', fontSize: 14, marginTop: 0 }}>
        Link your real WhatsApp number so Will can send. This uses Facebook login — no SMS, no Business Settings.
      </p>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, marginTop: 20 }}>
        <h2 style={{ fontSize: 16, margin: '0 0 8px' }}>Option 1 — one click (recommended)</h2>
        <p style={{ color: '#5c6572', fontSize: 13, marginTop: 0 }}>Click, log in with Facebook, pick your number, approve. That’s it.</p>
        <button onClick={launch} disabled={!sdkReady || status.kind === 'working'}
          style={{ background: '#0E5C42', color: '#fff', border: 'none', borderRadius: 8, padding: '11px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', opacity: sdkReady ? 1 : 0.6 }}>
          {sdkReady ? 'Connect WhatsApp with Facebook' : 'Loading Facebook…'}
        </button>
      </div>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, marginTop: 16 }}>
        <h2 style={{ fontSize: 16, margin: '0 0 8px' }}>Option 2 — paste a token (fallback)</h2>
        <p style={{ color: '#5c6572', fontSize: 13, marginTop: 0 }}>If you already have a working access token + phone number id, paste them here.</p>
        <input placeholder="Access token" value={token} onChange={(e) => setToken(e.target.value)}
          style={{ width: '100%', padding: 9, border: '1px solid #d1d5db', borderRadius: 7, fontSize: 13, marginBottom: 8, boxSizing: 'border-box' }} />
        <input placeholder="Phone number id" value={phoneId} onChange={(e) => setPhoneId(e.target.value)}
          style={{ width: '100%', padding: 9, border: '1px solid #d1d5db', borderRadius: 7, fontSize: 13, marginBottom: 10, boxSizing: 'border-box' }} />
        <button onClick={() => post({ token: token.trim(), phoneNumberId: phoneId.trim() })}
          disabled={!token.trim() || !phoneId.trim() || status.kind === 'working'}
          style={{ background: '#1f2328', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          Save & verify token
        </button>
      </div>

      {status.kind !== 'idle' && (
        <div style={{
          marginTop: 18, padding: 14, borderRadius: 10, fontSize: 14,
          background: status.kind === 'ok' ? 'rgba(37,211,102,.12)' : status.kind === 'error' ? 'rgba(208,59,59,.10)' : 'rgba(0,0,0,.04)',
          color: status.kind === 'ok' ? '#0a7d3c' : status.kind === 'error' ? '#c0202a' : '#5c6572',
        }}>
          {status.kind === 'working' ? '⏳ ' : status.kind === 'ok' ? '✓ ' : '⚠ '}{status.msg}
        </div>
      )}
    </div>
  );
}

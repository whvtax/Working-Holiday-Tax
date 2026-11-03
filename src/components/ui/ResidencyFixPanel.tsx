'use client'

/**
 * The residency correction link (Jo, 3 Nov). Shown on the tax-residency page ONLY
 * when it is opened with a valid one-time correction link (?k=). It lets the
 * customer answer that one question again. Nothing else on their record is
 * reachable from here, and without the link the page looks exactly as before.
 * The questionnaire components are not touched: this sits beside them.
 */

import { useEffect, useState } from 'react'

type L = 'en' | 'de' | 'ja'
const T: Record<L, { title: string; intro: string; resident: string; whm: string; pick: string; save: string; saving: string; done: string; doneBody: string; used: string; usedBody: string; err: string }> = {
  en: { title: 'Update your answer', intro: 'Please choose the option that best describes you. Our team reviews it as part of preparing your return, and the ATO makes the final decision.', resident: 'Australian tax resident', whm: 'Working holiday maker', pick: 'Please choose one option to continue.', save: 'Save my answer', saving: 'Saving...', done: 'Thank you, your answer has been updated.', doneBody: 'You do not need to do anything else. Our team will take it from here.', used: 'This link has already been used.', usedBody: 'If something still needs changing, message us on WhatsApp and we will help.', err: 'Something went wrong. Please message us on WhatsApp and we will fix it for you.' },
  de: { title: 'Angabe aktualisieren', intro: 'Bitte wähle die Option, die am besten auf dich zutrifft. Unser Team prüft das bei der Vorbereitung deiner Steuererklärung, und das ATO entscheidet am Ende.', resident: 'Australischer Steuerresident', whm: 'Working Holiday Maker', pick: 'Bitte wähle eine Option, um fortzufahren.', save: 'Antwort speichern', saving: 'Wird gespeichert...', done: 'Danke, deine Angabe wurde aktualisiert.', doneBody: 'Du musst nichts weiter tun. Unser Team übernimmt ab hier.', used: 'Dieser Link wurde bereits verwendet.', usedBody: 'Wenn noch etwas geändert werden muss, schreib uns auf WhatsApp, wir helfen dir.', err: 'Etwas ist schiefgelaufen. Schreib uns bitte auf WhatsApp, wir kümmern uns darum.' },
  ja: { title: 'ご回答の更新', intro: '最も当てはまるものをお選びください。申告書の作成時に当チームが確認し、最終的な判断はATOが行います。', resident: 'オーストラリアの税務居住者', whm: 'ワーキングホリデーメーカー', pick: '続けるには1つお選びください。', save: '回答を保存する', saving: '保存中...', done: 'ありがとうございます。ご回答を更新しました。', doneBody: 'これ以上のお手続きは不要です。以降は当チームが対応します。', used: 'このリンクはすでに使用されています。', usedBody: '変更が必要な場合は、WhatsAppでご連絡ください。対応いたします。', err: 'エラーが発生しました。WhatsAppでご連絡ください。こちらで対応いたします。' },
}

type State = 'checking' | 'none' | 'ok' | 'used' | 'saving' | 'done'

export default function ResidencyFixPanel({ lang = 'en' }: { lang?: L }) {
  const c = T[lang]
  const [state, setState] = useState<State>('checking')
  const [token, setToken] = useState('')
  const [pick, setPick] = useState<'resident' | 'whm' | ''>('')
  const [error, setError] = useState('')

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('k') ?? ''
    if (!k) { setState('none'); return }
    setToken(k)
    let alive = true
    fetch(`/api/tax-form/link?k=${encodeURIComponent(k)}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((j: { state?: string; purpose?: string }) => {
        if (!alive) return
        if (j.purpose !== 'fix') setState('none')
        else setState(j.state === 'ok' ? 'ok' : j.state === 'used' ? 'used' : 'none')
      })
      .catch(() => alive && setState('none'))
    return () => { alive = false }
  }, [])

  if (state === 'checking' || state === 'none') return null

  const submit = async () => {
    if (!pick) { setError(c.pick); return }
    setError('')
    setState('saving')
    try {
      const res = await fetch('/api/tax-form/fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ k: token, status: pick }),
      })
      const j = await res.json().catch(() => ({})) as { ok?: boolean; error?: string }
      if (res.ok && j.ok) { setState('done'); return }
      if (j.error === 'link_used') { setState('used'); return }
      setError(c.err)
      setState('ok')
    } catch {
      setError(c.err)
      setState('ok')
    }
  }

  const box: React.CSSProperties = { maxWidth: 560, margin: '24px auto', width: 'calc(100% - 32px)', padding: '20px', border: '1px solid #d9dee5', borderRadius: 8, background: '#fff' }
  const opt = (active: boolean): React.CSSProperties => ({
    display: 'block', width: '100%', textAlign: 'left', padding: '14px 16px', marginTop: 10, borderRadius: 8,
    border: `2px solid ${active ? '#0f6e56' : '#d9dee5'}`, background: active ? '#eef8f4' : '#fff', cursor: 'pointer', fontSize: 16,
  })

  if (state === 'done') {
    return <div style={box} role="status"><strong>{c.done}</strong><p style={{ marginTop: 8 }}>{c.doneBody}</p></div>
  }
  if (state === 'used') {
    return <div style={box} role="status"><strong>{c.used}</strong><p style={{ marginTop: 8 }}>{c.usedBody}</p></div>
  }
  return (
    <div style={box}>
      <strong>{c.title}</strong>
      <p style={{ marginTop: 8 }}>{c.intro}</p>
      <button type="button" style={opt(pick === 'resident')} onClick={() => { setPick('resident'); setError('') }} aria-pressed={pick === 'resident'}>{c.resident}</button>
      <button type="button" style={opt(pick === 'whm')} onClick={() => { setPick('whm'); setError('') }} aria-pressed={pick === 'whm'}>{c.whm}</button>
      {error && <p role="alert" style={{ color: '#b42318', marginTop: 10 }}>{error}</p>}
      <button type="button" onClick={submit} disabled={state === 'saving'}
        style={{ marginTop: 16, padding: '12px 20px', borderRadius: 8, border: 0, background: '#0f6e56', color: '#fff', fontSize: 16, cursor: 'pointer' }}>
        {state === 'saving' ? c.saving : c.save}
      </button>
    </div>
  )
}

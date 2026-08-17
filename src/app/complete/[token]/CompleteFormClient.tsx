'use client'

/**
 * Form 2 — the completion form at /complete/<token>.
 *
 * Collects only what form 1 didn't, then hands over to the existing residency
 * step for the declaration and submit. The token in the URL is the identity:
 * there's no login and nothing to type to prove who you are, and equally
 * nothing already on file is ever displayed back - whoever holds this link can
 * add details, never read them.
 *
 * Merges into the same task form 1 created, so the finished record is
 * identical to one made through /tax-form, which is untouched.
 */

import { useEffect, useState, useRef } from 'react'
import { WA_URL, WA_NUMBER } from '@/lib/constants'
import { formStrings, type FormLang } from '@/lib/formStrings'
import { isValidEmail } from '@/lib/validate'
import ResidencyStep from '@/components/ui/ResidencyStep'
import { setTaxFormHandoff, takeTaxFormSubmitted } from '@/lib/tax-form-handoff'

type UploadState = { file: File | null; preview: string | null }
type LinkState = 'checking' | 'ok' | 'not_found' | 'expired' | 'used'

const COPY = {
  en: {
    hi: 'Hi',
    title: 'Just a few last details',
    sub: 'so we can finish your return',
    cont: 'Continue →',
    time: '⏱ Takes about 2 minutes',
    deadTitle: 'This link is no longer active',
    deadBody: 'Completion links stay open for 14 days and can only be used once. Send us a message and we\u2019ll issue a new one.',
    wa: 'Message us on WhatsApp',
    checking: 'Loading…',
  },
  de: {
    hi: 'Hallo',
    title: 'Nur noch ein paar Angaben',
    sub: 'damit wir deine Erklärung abschließen können',
    cont: 'Weiter →',
    time: '⏱ Dauert etwa 2 Minuten',
    deadTitle: 'Dieser Link ist nicht mehr aktiv',
    deadBody: 'Links sind 14 Tage gültig und können nur einmal verwendet werden. Schreib uns, dann schicken wir dir einen neuen.',
    wa: 'Schreib uns auf WhatsApp',
    checking: 'Wird geladen…',
  },
  ja: {
    hi: 'こんにちは',
    title: '最後にいくつかのご入力',
    sub: '申告を完了するために必要です',
    cont: '次へ →',
    time: '⏱ 約2分で完了',
    deadTitle: 'このリンクは有効ではありません',
    deadBody: 'リンクの有効期間は14日間で、1回のみご利用いただけます。メッセージをお送りいただければ、新しいリンクをお送りします。',
    wa: 'WhatsAppでメッセージを送る',
    checking: '読み込み中…',
  },
} as const

/**
 * Defined at module scope, not inside the form.
 *
 * A component declared in the render body is a new function on every render,
 * so React tears the whole subtree down and rebuilds it after each keystroke -
 * the input loses focus and only one character can be typed at a time.
 */
function Field({ label, error, hint, children }: {
  label: React.ReactNode
  error?: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="cf-fg">
      <label className="cf-label">{label}<span className="cf-req">*</span></label>
      {hint && <div className="cf-hint">{hint}</div>}
      {children}
      {error && <p className="cf-err">{error}</p>}
    </div>
  )
}

export function CompleteFormClient({ token }: { token: string }) {
  const [linkState, setLinkState] = useState<LinkState>('checking')
  const [lang, setLang] = useState<FormLang>('en')
  const [firstName, setFirstName] = useState('')
  const [showResidency, setShowResidency] = useState(false)

  const T = (k: keyof typeof formStrings) => {
    const entry = formStrings[k] as Record<FormLang, string>
    return entry?.[lang] ?? entry?.en ?? ''
  }
  const c = COPY[lang] ?? COPY.en

  const [justSubmitted, setJustSubmitted] = useState<string | null>(null)

  useEffect(() => {
    // Coming back from a successful submit: the token is spent by design, so
    // check this first or the client would be shown "link no longer active"
    // immediately after succeeding.
    const doneName = takeTaxFormSubmitted()
    if (doneName !== null) {
      setJustSubmitted(doneName)
      setLinkState('ok')
      return
    }

    let cancelled = false
    fetch(`/api/complete/${token}`, { cache: 'no-store' })
      .then(r => r.json().then(d => ({ ok: r.ok, d })))
      .then(({ ok, d }) => {
        if (cancelled) return
        if (ok && d?.ok) {
          setFirstName(d.firstName ?? '')
          if (['en', 'de', 'ja'].includes(d.lang)) setLang(d.lang as FormLang)
          setLinkState('ok')
        } else {
          setLinkState((d?.reason as LinkState) ?? 'not_found')
        }
      })
      .catch(() => { if (!cancelled) setLinkState('not_found') })
    return () => { cancelled = true }
  }, [token])

  const [auPhone, setAuPhone]       = useState('')
  const [email, setEmail]           = useState('')
  const [address, setAddress]       = useState('')
  const [marital, setMarital]       = useState<'Single' | 'Married' | ''>('')
  const [primaryJob, setPrimaryJob] = useState('')
  const [howHeard, setHowHeard]     = useState('')
  const [terms, setTerms]           = useState(false)
  const [bank, setBank]             = useState<UploadState>({ file: null, preview: null })
  const [errors, setErrors]         = useState<Record<string, string>>({})
  const bankInput = useRef<HTMLInputElement>(null)

  const pickBank = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBank({ file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null })
    setErrors(p => ({ ...p, bank: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!auPhone.trim())    e.auPhone    = T('required')
    if (!email.trim())      e.email      = T('required')
    else if (!isValidEmail(email)) e.email = T('invalidEmail')
    if (!address.trim())    e.address    = T('required')
    if (!marital)           e.marital    = T('required')
    if (!primaryJob.trim()) e.primaryJob = T('required')
    if (!howHeard.trim())   e.howHeard   = T('required')
    if (!bank.file)         e.bank       = T('required')
    if (!terms)             e.terms      = T('required')
    return e
  }

  /**
   * Hands over to the residency step, which owns the declaration and the
   * submit. The payload it carries is shaped for that component; only the
   * fields this form collects are real, and its submit is redirected to
   * /api/complete via submitUrl below.
   */
  const goToResidency = async () => {
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors({})

    setTaxFormHandoff({
      lang,
      formUrl: `/complete/${token}`,
      submitUrl: `/api/complete/${token}`,
      payload: {
        waNumber: '', auPhone, fullName: firstName, lastName: '', address, email,
        country: '', dob: '', marital, hasMedicare: '', tfn: '', primaryJob,
        hasExpenses: '', taxYears: [], howHeard, refCode: '',
        declared: terms ? 'yes' : '',
        bankStatement: bank.file,
        selfiePassport: null,
      },
      previews: { bankStatement: bank.preview, selfiePassport: null },
    })
    setShowResidency(true)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  /* Success screen — copied from the original form so both flows end
     identically: same icon, same WhatsApp CTA, same social links. */
  if (justSubmitted !== null) {
    const waMsg = encodeURIComponent("Hi! I just filled out the form and I'd like to check my eligibility 😊")
    const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`
    return (
      <>
        <style>{styles}</style>
        <div className="cf-success-wrap">
          <div className="cf-success-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="#0B5240" strokeWidth="1.5"/>
              <path d="M12 20l6 6 10-12" stroke="#0B5240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="cf-success-title">{T('thankYou')}, {justSubmitted}! 🎉</h1>
          <p className="cf-success-body">{T('successBody')}</p>

          <a href={waHref} target="_blank" rel="noopener noreferrer" className="cf-success-wa-btn">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="rgba(255,255,255,0.25)"/>
              <path d="M13.1 12.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3l.46 1.35c.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z" fill="white"/>
            </svg>
            {T('msgWhatsApp')}
          </a>

          <div className="cf-success-divider" />

          <p className="cf-success-follow-label">{T('followUs')}<br />{T('followSub')}<br />{T('followGuides')}</p>
          <div className="cf-success-socials">
            <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className="cf-success-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.03a4.85 4.85 0 01-1-.34z"/>
              </svg>
              TikTok
            </a>
            <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className="cf-success-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </>
    )
  }

  if (linkState === 'checking') {
    return <div className="cf-wrap"><style>{styles}</style><div className="cf-card cf-msg"><p className="cf-msg-body">{c.checking}</p></div></div>
  }

  if (linkState !== 'ok') {
    return (
      <div className="cf-wrap">
        <style>{styles}</style>
        <div className="cf-card cf-msg">
          <h1 className="cf-msg-title">{c.deadTitle}</h1>
          <p className="cf-msg-body">{c.deadBody}</p>
          <a className="cf-btn cf-btn-primary" href={WA_URL} target="_blank" rel="noopener noreferrer">{c.wa}</a>
        </div>
      </div>
    )
  }

  if (showResidency) {
    return (
      <ResidencyStep
        lang={lang}
        onSubmitted={name => {
          setJustSubmitted(name)
          setShowResidency(false)
          window.scrollTo({ top: 0, behavior: 'auto' })
        }}
      />
    )
  }


  return (
    <div className="cf-wrap">
      <style>{styles}</style>
      <div className="cf-card">
        <div className="cf-header">
          <h1 className="cf-title">{firstName ? `${c.hi} ${firstName}` : c.title}</h1>
          <p className="cf-title-sub">{firstName ? c.title.toLowerCase() : c.sub}</p>
        </div>

        <form onSubmit={e => { e.preventDefault(); void goToResidency() }} noValidate>
          <Field label={T('auPhone')} error={errors.auPhone}>
            <input className={`cf-input ${errors.auPhone ? 'cf-input-err' : ''}`} type="tel"
                   placeholder="04XX XXX XXX" autoComplete="tel" inputMode="tel" maxLength={30}
                   value={auPhone}
                   onChange={e => { setAuPhone(e.target.value.replace(/[^0-9+\s\-()]/g, '')); setErrors(p => ({ ...p, auPhone: '' })) }}
                   onKeyDown={e => { if (!/^[0-9+\s]$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key) && !(e.ctrlKey || e.metaKey)) e.preventDefault() }} />
          </Field>

          <Field label={T('email')} error={errors.email}>
            <input className={`cf-input ${errors.email ? 'cf-input-err' : ''}`} type="email"
                   placeholder="your@email.com" autoComplete="email" inputMode="email" maxLength={200}
                   value={email}
                   onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }} />
          </Field>

          <Field label={T('addressShort')} error={errors.address}>
            <input className={`cf-input ${errors.address ? 'cf-input-err' : ''}`} type="text"
                   placeholder="e.g. 12 Smith Street, Bondi NSW 2026" autoComplete="street-address" maxLength={300}
                   value={address}
                   onChange={e => { setAddress(e.target.value); setErrors(p => ({ ...p, address: '' })) }} />
          </Field>

          <Field label={T('marital')} error={errors.marital}>
            <div className="cf-radios">
              {(['Single', 'Married'] as const).map(opt => (
                <label key={opt} className={`cf-radio${marital === opt ? ' is-on' : ''}`}>
                  <input type="radio" name="marital" checked={marital === opt}
                         onChange={() => { setMarital(opt); setErrors(p => ({ ...p, marital: '' })) }} hidden />
                  <span className={`cf-dot${marital === opt ? ' is-on' : ''}`} />{opt}
                </label>
              ))}
            </div>
          </Field>

          <Field label={T('primaryJob')} error={errors.primaryJob}>
            <input className={`cf-input ${errors.primaryJob ? 'cf-input-err' : ''}`} type="text"
                   placeholder="e.g. Farm worker, Barista"
                   value={primaryJob}
                   onChange={e => { setPrimaryJob(e.target.value); setErrors(p => ({ ...p, primaryJob: '' })) }} />
          </Field>

          <Field label={T('howHeard')} error={errors.howHeard}>
            <input className={`cf-input ${errors.howHeard ? 'cf-input-err' : ''}`} type="text"
                   placeholder="e.g. Instagram, TikTok, friend..."
                   value={howHeard}
                   onChange={e => { setHowHeard(e.target.value); setErrors(p => ({ ...p, howHeard: '' })) }} />
          </Field>

          <Field label={T('bankStatements')} hint={T('bankStatementHint')} error={errors.bank}>
            <div className="cf-drop" onClick={() => bankInput.current?.click()}>
              {bank.preview
                // eslint-disable-next-line @next/next/no-img-element
                ? <img className="cf-preview" src={bank.preview} alt="" />
                : <div className="cf-drop-icon">+</div>}
              <div className="cf-drop-label">{bank.file ? bank.file.name : T('uploadBankStatement')}</div>
              <div className="cf-drop-sub">{T('tapToChoose')}</div>
            </div>
            <input ref={bankInput} type="file" accept="image/*,application/pdf" hidden onChange={pickBank} />
          </Field>

          <div className="cf-fg">
            <div className={`cf-decl${errors.terms ? ' is-err' : ''}`}>
              <label className="cf-decl-row">
                <input type="checkbox" checked={terms} onChange={e => { setTerms(e.target.checked); setErrors(p => ({ ...p, terms: '' })) }} hidden />
                <span className={`cf-check${terms ? ' is-on' : ''}`}>
                  {terms && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <span className="cf-decl-text">
                  {lang === 'de' ? (
                    <>Ich habe die <a className="cf-link" href="/de/client-agreement" target="_blank" rel="noopener noreferrer">Mandantenvereinbarung</a> &amp; <a className="cf-link" href="/de/privacy" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a> gelesen &amp; stimme zu.</>
                  ) : lang === 'ja' ? (
                    <><a className="cf-link" href="/ja/client-agreement" target="_blank" rel="noopener noreferrer">クライアント規約</a>・<a className="cf-link" href="/ja/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>を読み、同意します。</>
                  ) : (
                    <>I&apos;ve read &amp; agree to the <a className="cf-link" href="/client-agreement" target="_blank" rel="noopener noreferrer">Client Agreement</a> &amp; <a className="cf-link" href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.</>
                  )}
                </span>
              </label>
            </div>
            {errors.terms && <p className="cf-err">{errors.terms}</p>}
          </div>

          <button type="submit" className="cf-btn cf-btn-primary">{c.cont}</button>
          <p className="cf-note">{c.time}</p>
        </form>
      </div>
    </div>
  )
}

export default CompleteFormClient

const styles = `
  .cf-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; padding: 26px 16px 50px; }
  .cf-card { width: 100%; max-width: 480px; background: #fff; border-radius: 24px; box-shadow: 0 2px 24px rgba(11,82,64,0.07); overflow: hidden; }
  .cf-header { padding: 24px 20px 10px; text-align: center; }
  .cf-title { font-size: 24px; font-weight: 800; color: #080F0D; letter-spacing: -0.025em; line-height: 1.2; margin-bottom: 6px; }
  .cf-title-sub { font-size: 14px; font-weight: 500; color: #587066; line-height: 1.4; }
  form { padding: 14px 24px 32px; }
  .cf-fg { margin-bottom: 14px; }
  .cf-label { display: block; font-size: 13px; font-weight: 600; color: #1A2822; margin-bottom: 6px; }
  .cf-req { color: #0B5240; margin-left: 3px; }
  .cf-hint { font-size: 12px; color: #5A7B70; margin-bottom: 6px; line-height: 1.4; }
  .cf-link { color: #0B5240; text-decoration: underline; }
  .cf-input { display: block; width: 100%; padding: 12px 14px; font-size: 14px; font-family: inherit; color: #080F0D; background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 12px; outline: none; transition: border-color .15s; -webkit-appearance: none; }
  .cf-input-err { border-color: #FCA5A5 !important; background: #FFF5F5 !important; }
  .cf-input::placeholder { color: #9DB5AC; }
  .cf-input:focus { border-color: #0B5240; }
  /* Copied verbatim from the original form: without the min-height a date
     input renders shorter than every other field, and without the 16px
     override iOS zooms the whole page in when it gets focus. */
  input[type="date"].cf-input { min-height: 47px; line-height: 1.4; }
  @media (max-width: 640px) {
    .cf-input, input[type="text"], input[type="email"], input[type="tel"], input[type="date"] { font-size: 16px !important; }
  }
  .cf-radios { display: flex; flex-direction: column; gap: 8px; }
  .cf-radio { display: inline-flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px; border: 1.5px solid #D4EAE2; font-size: 13px; font-weight: 500; color: #587066; background: #F5F9F7; cursor: pointer; }
  .cf-radio.is-on { background: #EAF6F1; border-color: #0B5240; color: #0B5240; font-weight: 600; }
  .cf-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #C8EAE0; background: #fff; flex-shrink: 0; }
  .cf-dot.is-on { border-color: #0B5240; background: #0B5240; }
  .cf-drop { border: 1.5px dashed #C8EAE0; border-radius: 14px; background: #F5F9F7; padding: 20px 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
  .cf-drop-icon { width: 44px; height: 44px; border-radius: 12px; background: #EAF6F1; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #0B5240; }
  .cf-drop-label { font-size: 13px; font-weight: 600; color: #1A2822; text-align: center; word-break: break-all; }
  .cf-drop-sub { font-size: 11px; color: #8AADA3; }
  .cf-preview { width: 84px; height: 84px; object-fit: cover; border-radius: 12px; }
  .cf-decl { background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 14px; padding: 13px 14px; }
  .cf-decl.is-err { border-color: #DC2626; }
  .cf-decl-row { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .cf-check { width: 20px; height: 20px; border-radius: 6px; border: 2px solid #D4EAE2; background: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .cf-check.is-on { background: #0B5240; border-color: #0B5240; }
  .cf-decl-text { font-size: 12px; color: #1A2822; line-height: 1.5; }
  .cf-err { font-size: 12px; color: #DC2626; margin-top: 6px; font-weight: 500; }
  .cf-btn { display: flex; align-items: center; justify-content: center; width: 100%; height: 56px; border-radius: 100px; font-size: 15px; font-weight: 600; font-family: inherit; border: none; cursor: pointer; text-decoration: none; }
  .cf-btn-primary { background: #0B5240; color: #fff; margin-top: 24px; }
  .cf-note { text-align: center; font-size: 11px; color: #8AADA3; margin-top: 14px; }
  .cf-success-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 28px; text-align: center; }
  .cf-success-icon { width: 80px; height: 80px; border-radius: 50%; background: #EAF6F1; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
  .cf-success-title { font-size: 26px; font-weight: 900; color: #080F0D; letter-spacing: -0.02em; margin: 0 0 10px; }
  .cf-success-body { font-size: 14px; color: #587066; line-height: 1.65; max-width: 28ch; margin: 0 0 24px; }
  .cf-success-wa-btn { display: inline-flex; align-items: center; gap: 8px; background: #22C55E; color: #fff; font-size: 14px; font-weight: 600; padding: 13px 26px; border-radius: 100px; text-decoration: none; font-family: inherit; }
  .cf-success-divider { width: 40px; height: 1px; background: #D4EAE2; margin: 28px auto; }
  .cf-success-follow-label { font-size: 13px; color: #587066; line-height: 1.8; margin: 0 0 16px; font-weight: 600; }
  .cf-success-socials { display: flex; gap: 10px; justify-content: center; }
  .cf-success-social-btn { display: inline-flex; align-items: center; gap: 7px; padding: 10px 18px; border-radius: 100px; border: 1.5px solid #D4EAE2; font-size: 13px; font-weight: 600; color: #0B5240; text-decoration: none; background: #fff; font-family: inherit; }
  .cf-msg { padding: 40px 24px 34px; text-align: center; }
  .cf-done-icon { width: 60px; height: 60px; border-radius: 50%; background: #EAF6F1; border: 1.5px solid #C8EAE0; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
  .cf-msg-title { font-size: 20px; font-weight: 800; color: #080F0D; letter-spacing: -0.02em; margin-bottom: 10px; }
  .cf-msg-body { font-size: 13.5px; color: #587066; line-height: 1.65; margin-bottom: 22px; }
  .cf-msg .cf-btn-primary { margin-top: 0; }
`

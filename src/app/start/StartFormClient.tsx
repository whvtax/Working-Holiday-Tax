'use client'

/**
 * Form 1 — the short public intake at /start.
 *
 * Collects only what's needed to decide whether to continue: identity, TFN,
 * WhatsApp, country, the two yes/no questions, and the passport selfie. You
 * review it in the CRM and, if it's worth continuing, issue a completion link
 * for form 2.
 *
 * Written as its own component rather than a variant of the original form:
 * /tax-form is running live for partner referrals and must not change by a
 * single character. The styling is copied so the two look identical.
 *
 * The tax year isn't asked - the server sets it from the current date.
 */

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { WA_URL } from '@/lib/constants'
import { formStrings, type FormLang } from '@/lib/formStrings'
import { isValidTfn, isPlausibleDob } from '@/lib/validate'
import { FormLanguageToggle } from '@/components/ui/FormLanguageToggle'
import { GoogleReviewsBadge } from '@/components/ui/GoogleReviewsBadge'
import { compressImage, MAX_UPLOAD_BYTES } from '@/lib/compress-image'

type UploadState = { file: File | null; preview: string | null }

const COPY = {
  en: {
    title: 'Answer a few quick questions',
    sub: 'to check your eligibility',
    submit: 'Submit →',
    submitting: 'Submitting…',
    time: '⏱ Takes about 1 minute',
    doneTitle: 'Thank you',
    doneBody: 'We\u2019ve received your details and will review them shortly. We\u2019ll be in touch on WhatsApp.',
    doneWa: 'Message us on WhatsApp',
    waHint: 'The WhatsApp number you\u2019re currently using.',
  },
  de: {
    title: 'Beantworte ein paar kurze Fragen',
    sub: 'um deinen Anspruch zu prüfen',
    submit: 'Absenden →',
    submitting: 'Wird abgeschickt…',
    time: '⏱ Dauert etwa 1 Minute',
    doneTitle: 'Danke',
    doneBody: 'Wir haben deine Angaben erhalten und prüfen sie in Kürze. Wir melden uns per WhatsApp.',
    doneWa: 'Schreib uns auf WhatsApp',
    waHint: 'Die WhatsApp-Nummer, die du gerade nutzt.',
  },
  ja: {
    title: 'かんたんな質問にお答えください',
    sub: '対象かどうかを確認します',
    submit: '送信 →',
    submitting: '送信中…',
    time: '⏱ 約1分で完了',
    doneTitle: 'ありがとうございます',
    doneBody: 'ご入力内容を受け付けました。確認のうえ、WhatsAppでご連絡します。',
    doneWa: 'WhatsAppでメッセージを送る',
    waHint: '現在お使いのWhatsApp番号をご記入ください。',
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
    <div className="sf-fg">
      <label className="sf-label">{label}<span className="sf-req">*</span></label>
      {hint && <div className="sf-hint">{hint}</div>}
      {children}
      {error && <p className="sf-err">{error}</p>}
    </div>
  )
}

export function StartFormClient({ lang: initialLang = 'en' }: { lang?: FormLang }) {
  const [lang, setLang] = useState<FormLang>(initialLang)
  const T = (k: keyof typeof formStrings) => {
    const entry = formStrings[k] as Record<FormLang, string>
    return entry?.[lang] ?? entry?.en ?? ''
  }
  const c = COPY[lang] ?? COPY.en

  const searchParams = useSearchParams()
  const [refCode, setRefCode] = useState('')
  useEffect(() => { setRefCode(searchParams.get('ref') ?? '') }, [searchParams])

  const [fullName, setFullName]   = useState('')
  const [lastName, setLastName]   = useState('')
  const [dob, setDob]             = useState('')
  const [tfn, setTfn]             = useState('')
  const [waNumber, setWaNumber]   = useState('')
  const [country, setCountry]     = useState('')
  const [hasMedicare, setHasMedicare] = useState<'yes' | 'no' | ''>('')
  const [hasExpenses, setHasExpenses] = useState<'yes' | 'no' | ''>('')
  const [selfie, setSelfie]       = useState<UploadState>({ file: null, preview: null })

  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const selfieInput = useRef<HTMLInputElement>(null)

  const pickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setSelfie({ file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null })
    setErrors(p => ({ ...p, selfie: '' }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!fullName.trim())      e.fullName    = T('required')
    if (!lastName.trim())      e.lastName    = T('required')
    if (!dob)                  e.dob         = T('required')
    else if (!isPlausibleDob(dob)) e.dob     = T('invalidDob')
    if (!tfn.trim())           e.tfn         = T('required')
    else if (!isValidTfn(tfn)) e.tfn         = T('invalidTfn')
    if (!waNumber.trim())      e.waNumber    = T('required')
    if (!country.trim())       e.country     = T('required')
    if (!hasMedicare)          e.hasMedicare = T('required')
    if (!hasExpenses)          e.hasExpenses = T('required')
    if (!selfie.file)          e.selfie      = T('required')
    return e
  }

  const uploadSelfie = async (file: File): Promise<string | null> => {
    let f = await compressImage(file)
    if (f.size > MAX_UPLOAD_BYTES) return null
    let contentType = f.type
    if (!contentType || contentType === 'application/octet-stream') contentType = 'image/jpeg'
    if (contentType === 'image/heic' || contentType === 'image/heif') contentType = 'image/jpeg'

    for (let i = 0; i < 3; i++) {
      try {
        const r = await fetch(`/api/tax-form/upload?filename=${encodeURIComponent(f.name)}`, {
          method: 'POST', body: f, headers: { 'Content-Type': contentType },
        })
        const data = await r.json().catch(() => ({}))
        if (!r.ok) throw new Error(data?.error || String(r.status))
        return data?.url ?? null
      } catch (err) {
        console.error('[start upload]', err)
        if (i === 2) return null
        await new Promise(res => setTimeout(res, 800 * (i + 1)))
      }
    }
    return null
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors({})
    setLoading(true)

    const url = selfie.file ? await uploadSelfie(selfie.file) : null
    if (!url) {
      setLoading(false)
      setErrors({ selfie: T('fileTooLarge') })
      return
    }

    const fd = new FormData()
    fd.append('fullName', `${fullName} ${lastName}`.trim())
    fd.append('dob', dob)
    fd.append('tfn', tfn)
    fd.append('waNumber', waNumber)
    fd.append('country', country)
    fd.append('hasMedicare', hasMedicare === 'yes' ? 'Yes' : 'No')
    fd.append('hasExpenses', hasExpenses === 'yes' ? 'Yes' : 'No')
    fd.append('lang', lang)
    if (refCode) fd.append('refCode', refCode)
    fd.append('fileUrls', JSON.stringify([url]))

    try {
      const res = await fetch('/api/start', { method: 'POST', body: fd })
      if (res.ok) { setSubmitted(true); return }
      setErrors({ form: 'Something went wrong. Please try again or contact us directly.' })
    } catch {
      setErrors({ form: 'Something went wrong. Please try again or contact us directly.' })
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="sf-wrap">
        <style>{styles}</style>
        <div className="sf-card sf-done">
          <div className="sf-done-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 13l4 4L19 7" stroke="#0B5240" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="sf-done-title">{c.doneTitle}{fullName ? `, ${fullName.split(' ')[0]}` : ''}</h1>
          <p className="sf-done-body">{c.doneBody}</p>
          <a className="sf-btn sf-btn-primary" href={WA_URL} target="_blank" rel="noopener noreferrer">{c.doneWa}</a>
        </div>
      </div>
    )
  }


  return (
    <div className="sf-wrap">
      <style>{styles}</style>
      <div className="sf-card">
        <div className="sf-header">
          <FormLanguageToggle lang={lang} onChange={setLang} />
          <h1 className={`sf-title sf-title-${lang}`}>{c.title}</h1>
          <p className="sf-title-sub">{c.sub}</p>
          <div className="sf-trust">
            <GoogleReviewsBadge lang={lang} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="sf-seal" src="/assets/tpb-registered.png" alt={`${T('registeredAgentNo')} 26233096`}
                 width={260} height={164} loading="lazy" decoding="async" />
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <Field label={T('givenNames')} error={errors.fullName}>
            <input className={`sf-input ${errors.fullName ? 'sf-input-err' : ''}`} type="text"
                   placeholder="As it appears on passport" autoComplete="given-name" maxLength={60}
                   value={fullName}
                   onChange={e => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: '' })) }} />
          </Field>

          <Field label={T('lastName')} error={errors.lastName}>
            <input className={`sf-input ${errors.lastName ? 'sf-input-err' : ''}`} type="text"
                   placeholder="e.g. Smith" autoComplete="family-name" maxLength={60}
                   value={lastName}
                   onChange={e => { setLastName(e.target.value); setErrors(p => ({ ...p, lastName: '' })) }} />
          </Field>

          <Field label={T('dob')} error={errors.dob}>
            <input className={`sf-input ${errors.dob ? 'sf-input-err' : ''}`} type="date" autoComplete="bday"
                   value={dob} onChange={e => { setDob(e.target.value); setErrors(p => ({ ...p, dob: '' })) }} />
          </Field>

          <Field label={T('tfnRequired')} error={errors.tfn}>
            <input className={`sf-input ${errors.tfn ? 'sf-input-err' : ''}`} type="text"
                   placeholder="XXX XXX XXX" inputMode="numeric"
                   value={tfn}
                   onChange={e => { setTfn(e.target.value.replace(/[^0-9\s]/g, '')); setErrors(p => ({ ...p, tfn: '' })) }}
                   onKeyDown={e => { if (!/^[0-9\s]$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key) && !(e.ctrlKey || e.metaKey)) e.preventDefault() }} />
          </Field>

          <Field label={T('whatsapp')} hint={c.waHint} error={errors.waNumber}>
            <input className={`sf-input ${errors.waNumber ? 'sf-input-err' : ''}`} type="tel"
                   placeholder="+44 7XXX XXXXXX" autoComplete="tel" inputMode="tel" maxLength={30}
                   value={waNumber}
                   onChange={e => { setWaNumber(e.target.value); setErrors(p => ({ ...p, waNumber: '' })) }}
                   onKeyDown={e => { if (!/^[0-9+\s]$/.test(e.key) && !['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key) && !(e.ctrlKey || e.metaKey)) e.preventDefault() }} />
          </Field>

          <Field label={T('homeCountry')} error={errors.country}>
            <input className={`sf-input ${errors.country ? 'sf-input-err' : ''}`} type="text"
                   placeholder="e.g. United Kingdom" maxLength={60}
                   value={country}
                   onChange={e => { setCountry(e.target.value); setErrors(p => ({ ...p, country: '' })) }} />
          </Field>

          <Field label={T('hasMedicare')} error={errors.hasMedicare}>
            <div className="sf-radios">
              {(['no', 'yes'] as const).map(opt => (
                <label key={opt} className={`sf-radio${hasMedicare === opt ? ' is-on' : ''}`}>
                  <input type="radio" name="hasMedicare" checked={hasMedicare === opt}
                         onChange={() => { setHasMedicare(opt); setErrors(p => ({ ...p, hasMedicare: '' })) }} hidden />
                  <span className={`sf-dot${hasMedicare === opt ? ' is-on' : ''}`} />
                  {opt === 'yes' ? 'Yes' : 'No'}
                </label>
              ))}
            </div>
          </Field>

          <div className="sf-fg">
            <label className="sf-label">
              {lang === 'de' ? (
                <>Hast du <a className="sf-link" href="/de/expenses" target="_blank" rel="noopener noreferrer">arbeitsbezogene Ausgaben</a>?</>
              ) : lang === 'ja' ? (
                <><a className="sf-link" href="/ja/expenses" target="_blank" rel="noopener noreferrer">業務関連の経費</a>はありますか？</>
              ) : (
                <>Do you have <a className="sf-link" href="/expenses" target="_blank" rel="noopener noreferrer">work-related expenses</a>?</>
              )}
              <span className="sf-req">*</span>
            </label>
            <div className="sf-radios">
              {(['yes', 'no'] as const).map(opt => (
                <label key={opt} className={`sf-radio${hasExpenses === opt ? ' is-on' : ''}`}>
                  <input type="radio" name="hasExpenses" checked={hasExpenses === opt}
                         onChange={() => { setHasExpenses(opt); setErrors(p => ({ ...p, hasExpenses: '' })) }} hidden />
                  <span className={`sf-dot${hasExpenses === opt ? ' is-on' : ''}`} />
                  {opt === 'yes' ? 'Yes' : 'No'}
                </label>
              ))}
            </div>
            {errors.hasExpenses && <p className="sf-err">{errors.hasExpenses}</p>}
            {hasExpenses === 'yes' && (
              <div className="sf-invoices">
                <p className="sf-invoices-title">{T('emailInvoicesTitle')}</p>
                <div className="sf-invoices-num">+61 424 513 998</div>
              </div>
            )}
          </div>

          <Field label={T('selfieWithPassport')} hint={T('selfieHint')} error={errors.selfie}>
            <div className="sf-drop" onClick={() => selfieInput.current?.click()}>
              {selfie.preview
                // eslint-disable-next-line @next/next/no-img-element
                ? <img className="sf-preview" src={selfie.preview} alt="" />
                : <div className="sf-drop-icon">+</div>}
              <div className="sf-drop-label">{selfie.file ? selfie.file.name : T('uploadSelfie')}</div>
              <div className="sf-drop-sub">{T('tapToChoose')}</div>
            </div>
            <input ref={selfieInput} type="file" accept="image/*" hidden onChange={pickFile} />
          </Field>

          {errors.form && <p className="sf-err sf-err-form">{errors.form}</p>}

          <button type="submit" className="sf-btn sf-btn-primary" disabled={loading}>
            {loading ? c.submitting : c.submit}
          </button>
          <p className="sf-note">{c.time}</p>
        </form>
      </div>
    </div>
  )
}

export default StartFormClient

/* Mirrors /tax-form's card so the two are visually identical. */
const styles = `
  .sf-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; padding: 26px 16px 50px; }
  .sf-card { width: 100%; max-width: 480px; background: #fff; border-radius: 24px; box-shadow: 0 2px 24px rgba(11,82,64,0.07); overflow: hidden; }
  .sf-header { padding: 20px 14px 10px; text-align: center; }
  .sf-title { font-weight: 800; color: #080F0D; letter-spacing: -0.02em; line-height: 1.25; margin-bottom: 4px; white-space: nowrap; }
  .sf-title-en { font-size: clamp(14px, 5.0vw, 22px); }
  .sf-title-de { font-size: clamp(12px, 4.2vw, 20px); }
  .sf-title-ja { font-size: clamp(15px, 5.2vw, 24px); letter-spacing: 0; }
  .sf-title-sub { font-size: 14px; font-weight: 500; color: #587066; line-height: 1.4; margin-bottom: 10px; }
  .sf-trust { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 10px 16px; margin-top: 16px; margin-bottom: 4px; }
  .sf-seal { display: block; width: 112px; height: auto; }
  form { padding: 14px 24px 32px; }
  .sf-fg { margin-bottom: 14px; }
  .sf-label { display: block; font-size: 13px; font-weight: 600; color: #1A2822; margin-bottom: 6px; }
  .sf-req { color: #0B5240; margin-left: 3px; }
  .sf-hint { font-size: 12px; color: #5A7B70; margin-bottom: 6px; line-height: 1.4; }
  .sf-link { color: #0B5240; text-decoration: underline; }
  .sf-input { display: block; width: 100%; padding: 12px 14px; font-size: 14px; font-family: inherit; color: #080F0D; background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 12px; outline: none; transition: border-color .15s; -webkit-appearance: none; }
  .sf-input-err { border-color: #FCA5A5 !important; background: #FFF5F5 !important; }
  .sf-input::placeholder { color: #9DB5AC; }
  .sf-input:focus { border-color: #0B5240; }
  /* Copied verbatim from the original form: without the min-height a date
     input renders shorter than every other field, and without the 16px
     override iOS zooms the whole page in when it gets focus. */
  input[type="date"].sf-input { min-height: 47px; line-height: 1.4; }
  @media (max-width: 640px) {
    .sf-input, input[type="text"], input[type="email"], input[type="tel"], input[type="date"] { font-size: 16px !important; }
  }
  .sf-radios { display: flex; flex-direction: column; gap: 8px; }
  .sf-radio { display: inline-flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px; border: 1.5px solid #D4EAE2; font-size: 13px; font-weight: 500; color: #587066; background: #F5F9F7; cursor: pointer; width: 100%; }
  .sf-radio.is-on { background: #EAF6F1; border-color: #0B5240; color: #0B5240; font-weight: 600; }
  .sf-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #C8EAE0; background: #fff; flex-shrink: 0; }
  .sf-dot.is-on { border-color: #0B5240; background: #0B5240; }
  .sf-invoices { background: #EAF6F1; border: 1.5px solid #A7D9C5; border-radius: 14px; padding: 16px; margin-top: 10px; }
  .sf-invoices-title { font-size: 13px; font-weight: 700; color: #0B5240; margin-bottom: 10px; text-align: center; }
  .sf-invoices-num { background: #fff; border: 1.5px solid #C8EAE0; border-radius: 10px; padding: 10px 14px; text-align: center; font-size: 14px; font-weight: 700; color: #0B5240; }
  .sf-drop { border: 1.5px dashed #C8EAE0; border-radius: 14px; background: #F5F9F7; padding: 20px 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
  .sf-drop-icon { width: 44px; height: 44px; border-radius: 12px; background: #EAF6F1; display: flex; align-items: center; justify-content: center; font-size: 20px; color: #0B5240; }
  .sf-drop-label { font-size: 13px; font-weight: 600; color: #1A2822; text-align: center; word-break: break-all; }
  .sf-drop-sub { font-size: 11px; color: #8AADA3; }
  .sf-preview { width: 84px; height: 84px; object-fit: cover; border-radius: 12px; }
  .sf-err { font-size: 12px; color: #DC2626; margin-top: 6px; font-weight: 500; }
  .sf-err-form { text-align: center; }
  .sf-btn { display: flex; align-items: center; justify-content: center; width: 100%; height: 56px; border-radius: 100px; font-size: 15px; font-weight: 600; font-family: inherit; border: none; cursor: pointer; text-decoration: none; }
  .sf-btn-primary { background: #0B5240; color: #fff; margin-top: 24px; }
  .sf-btn-primary:disabled { opacity: .6; cursor: not-allowed; }
  .sf-note { text-align: center; font-size: 11px; color: #8AADA3; margin-top: 14px; }
  .sf-done { padding: 40px 24px 34px; text-align: center; }
  .sf-done-icon { width: 60px; height: 60px; border-radius: 50%; background: #EAF6F1; border: 1.5px solid #C8EAE0; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
  .sf-done-title { font-size: 22px; font-weight: 800; color: #080F0D; letter-spacing: -0.02em; margin-bottom: 10px; }
  .sf-done-body { font-size: 13.5px; color: #587066; line-height: 1.65; margin-bottom: 22px; }
  .sf-done .sf-btn-primary { margin-top: 0; }
`

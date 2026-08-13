'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { WA_URL, WA_NUMBER } from '@/lib/constants'
import { formStrings, type FormLang } from '@/lib/formStrings'
import { isValidEmail, isValidTfn, isPlausibleDob } from '@/lib/validate'
import { FormLanguageToggle } from '@/components/ui/FormLanguageToggle'
import { setTaxFormHandoff, getTaxFormHandoff, clearTaxFormHandoff, takeTaxFormSubmitted } from '@/lib/tax-form-handoff'

/* ── Types ── */
type UploadState = { file: File | null; preview: string | null }
type MultiUploadState = { files: File[]; previews: (string | null)[] }

/* ── Field wrapper ── */
function Field({ label, required, children, error, hint }: { label: string; required?: boolean; children: React.ReactNode; error?: string; hint?: string }) {
  return (
    <div style={{marginBottom:'14px'}}>
      <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#1A2822',marginBottom:'6px'}}>
        {label}
        {required && <span style={{color:'#0B5240',marginLeft:'3px'}}>*</span>}
      </label>
      {hint && <div style={{fontSize:'12px',color:'#5A7B70',marginBottom:'6px',lineHeight:1.4}}>{hint}</div>}
      {children}
      {error && <span className="err-msg">{error}</span>}
    </div>
  )
}

/* ── File upload button ── */
function FileUpload({
  id, label, accept, value, onChange, lang
}: {
  id: string; label: string; accept: string
  value: UploadState; onChange: (v: UploadState) => void; lang: FormLang
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    onChange({ file, preview })
  }

  const handleRemove = () => {
    if (value.preview) URL.revokeObjectURL(value.preview)
    onChange({ file: null, preview: null })
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="file-zone" onClick={() => !value.file && inputRef.current?.click()}>
      <input ref={inputRef} id={id} type="file" accept={accept} className="hidden" onChange={handleChange} />
      {value.file ? (
        <div className="file-selected">
          {value.preview
            ? <img src={value.preview} alt="preview" loading="lazy" decoding="async" className="file-img-preview" />
            : <div className="file-icon-box">📄</div>
          }
          <div className="file-meta">
            <span className="file-name">{value.file.name}</span>
            <span className="file-size">{(value.file.size / 1024).toFixed(0)} KB</span>
          </div>
          <button type="button" className="file-remove" onClick={(e) => { e.stopPropagation(); handleRemove() }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      ) : (
        <div className="file-empty">
          <div className="file-upload-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V8M8 12l4-4 4 4" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="#C8EAE0" strokeWidth="1.2"/>
            </svg>
          </div>
          <span className="file-upload-label">{label}</span>
          <span className="file-upload-sub">{formStrings.tapToChoose[lang]}</span>
        </div>
      )}
    </div>
  )
}

function MultiFileUpload({
  id, label, accept, value, onChange, maxFiles = 15
}: {
  id: string; label: string; accept: string
  value: MultiUploadState; onChange: (v: MultiUploadState) => void
  maxFiles?: number
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? [])
    if (!selected.length) return
    const remaining = maxFiles - value.files.length
    const toAdd = selected.slice(0, remaining)
    const newPreviews = toAdd.map(f => f.type.startsWith('image/') ? URL.createObjectURL(f) : null)
    onChange({
      files: [...value.files, ...toAdd],
      previews: [...value.previews, ...newPreviews],
    })
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleRemove = (i: number) => {
    const p = value.previews[i]
    if (p) URL.revokeObjectURL(p)
    onChange({
      files: value.files.filter((_, idx) => idx !== i),
      previews: value.previews.filter((_, idx) => idx !== i),
    })
  }

  const canAdd = value.files.length < maxFiles

  return (
    <div>
      {value.files.map((f, i) => (
        <div key={i} className="file-zone" style={{marginBottom: 8, cursor:'default'}}>
          <div className="file-selected">
            {value.previews[i]
              ? <img src={value.previews[i]!} alt="preview" loading="lazy" decoding="async" className="file-img-preview" />
              : <div className="file-icon-box">📄</div>
            }
            <div className="file-meta">
              <span className="file-name">{f.name}</span>
              <span className="file-size">{(f.size / 1024).toFixed(0)} KB</span>
            </div>
            <button type="button" className="file-remove" onClick={() => handleRemove(i)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      ))}
      {canAdd && (
        <div className="file-zone" onClick={() => inputRef.current?.click()} style={{cursor:'pointer'}}>
          <input ref={inputRef} id={id} type="file" accept={accept} multiple className="hidden" onChange={handleChange} />
          <div className="file-empty">
            <div className="file-upload-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V8M8 12l4-4 4 4" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#C8EAE0" strokeWidth="1.2"/>
              </svg>
            </div>
            <span className="file-upload-label">{label}</span>
            <span className="file-upload-sub">
              {value.files.length === 0
                ? `Tap to add files (max ${maxFiles})`
                : `Add more (${value.files.length}/${maxFiles})`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Main Form ── */
export function FormClient({ defaultLang = 'en' }: { defaultLang?: FormLang } = {}) {
  const [lang, setLang] = useState<FormLang>(defaultLang)
  const T = (key: keyof typeof formStrings) => formStrings[key][lang]
  // Personal
  const [waNumber, setWaNumber]       = useState('')
  const [auPhone, setAuPhone]         = useState('')
  const [fullName, setFullName]       = useState('')
  const [lastName, setLastName]        = useState('')
  const [step, setStep] = useState<1 | 2>(1)
  const [address, setAddress]         = useState('')
  const [email, setEmail]             = useState('')
  const [country, setCountry]         = useState('')
  const [dob, setDob]                 = useState('')
  const [marital, setMarital]         = useState<'Single'|'Married'|''>('')
  const [hasMedicare, setHasMedicare] = useState<'yes'|'no'|''>('')
  const [tfn, setTfn]                 = useState('')
  const [primaryJob, setPrimaryJob]   = useState('')

  // Files
  const [bankStatement, setBankStatement] = useState<UploadState>({ file: null, preview: null })
  const [selfiePassport, setSelfiePassport] = useState<UploadState>({ file: null, preview: null })

  const [hasExpenses, setHasExpenses] = useState<'yes'|'no'|''>('')

  // Declarations
  const [taxStatus, setTaxStatus]     = useState<'resident'|'whm'|''>('')
  const [declared, setDeclared]       = useState<'yes'|'no'|''>('')
  // Default to the most recently COMPLETED AU tax year (Jul-Jun cycle) - the
  // year people actually lodge for. E.g. lodging in August 2026 targets 2025-26,
  // not the in-progress 2026-27.
  const [taxYears, setTaxYears] = useState<string[]>(() => {
    const now = new Date()
    const y = now.getFullYear()
    const lastCompleted = now.getMonth() >= 6 ? `${y-1}-${String(y).slice(2)}` : `${y-2}-${String(y-1).slice(2)}`
    return [lastCompleted]
  })
  const [terms, setTerms]             = useState(false)
  // ABN
  const [howHeard, setHowHeard]       = useState('')

  // Referral: read ?ref= from URL
  const searchParams = useSearchParams()
  const refCode = searchParams.get('ref') ?? ''

  // UI
  const [submitted, setSubmitted]     = useState(false)
  const [loading, setLoading]         = useState(false)
  const [errors, setErrors]           = useState<Record<string, string>>({})

  // ── Funnel analytics (no external service - logs straight into Supabase,
  //    see form_funnel_events / migration 012). One stable id per form
  //    visit, generated once, so a view → step1_complete → submit_success
  //    chain can be tied together and the conversion rate measured. Never
  //    allowed to affect the actual form - every call is fire-and-forget.
  const sessionIdRef = useRef<string>('')
  if (!sessionIdRef.current) {
    sessionIdRef.current = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
  const trackFunnelEvent = (eventType: 'view' | 'step1_complete' | 'submit_success') => {
    try {
      fetch('/api/analytics/funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formName: 'tax-form', eventType, sessionId: sessionIdRef.current, lang }),
        keepalive: true,
      }).catch(() => {})
    } catch {}
  }
  useEffect(() => { trackFunnelEvent('view') }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const residencyUrl = lang === 'de' ? '/de/tax-residency' : lang === 'ja' ? '/ja/tax-residency' : '/tax-residency'
  const formUrl      = lang === 'de' ? '/de/tax-form'      : lang === 'ja' ? '/ja/tax-form'      : '/tax-form'
  const SNAPSHOT_KEY = 'whv_taxform_return'

  // Restore the form when the client comes back from the tax-residency page.
  //
  // Two paths, in order of fidelity:
  //  1. The in-memory hand-off - survives client-side navigation and carries
  //     everything, including the uploaded files and the TFN.
  //  2. The sessionStorage snapshot - the fallback for a hard refresh. Text
  //     fields only: files can't be serialised and the TFN is deliberately
  //     never written to browser storage.
  useEffect(() => {
    // Came back from a successful submit on the residency page → success screen.
    const doneName = takeTaxFormSubmitted()
    if (doneName !== null) {
      setFullName(doneName)
      setSubmitted(true)
      try { sessionStorage.removeItem(SNAPSHOT_KEY) } catch {}
      return
    }

    const h = getTaxFormHandoff()
    if (h) {
      const p = h.payload
      setWaNumber(p.waNumber);   setAuPhone(p.auPhone);       setFullName(p.fullName)
      setLastName(p.lastName);   setAddress(p.address);       setEmail(p.email)
      setCountry(p.country);     setDob(p.dob);               setMarital(p.marital)
      setHasMedicare(p.hasMedicare); setTfn(p.tfn);           setPrimaryJob(p.primaryJob)
      setHasExpenses(p.hasExpenses); setTaxYears(p.taxYears); setHowHeard(p.howHeard)
      setDeclared(p.declared)
      setBankStatement({ file: p.bankStatement,  preview: h.previews.bankStatement })
      setSelfiePassport({ file: p.selfiePassport, preview: h.previews.selfiePassport })
      setStep(2)
      clearTaxFormHandoff()
      try { sessionStorage.removeItem(SNAPSHOT_KEY) } catch {}
      return
    }

    let raw: string | null = null
    try { raw = sessionStorage.getItem(SNAPSHOT_KEY) } catch {}
    if (!raw) return
    try { sessionStorage.removeItem(SNAPSHOT_KEY) } catch {}
    try {
      const s = JSON.parse(raw)
      // Ignore stale snapshots (> 2h old)
      if (!s || typeof s.t !== 'number' || Date.now() - s.t > 2 * 60 * 60 * 1000) return
      const d = s.data || {}
      const setIf = (v: unknown, setter: (x: any) => void) => { if (v !== undefined) setter(v) }
      setIf(d.waNumber, setWaNumber);   setIf(d.auPhone, setAuPhone);     setIf(d.fullName, setFullName)
      setIf(d.lastName, setLastName);   setIf(d.address, setAddress);     setIf(d.email, setEmail)
      setIf(d.country, setCountry);     setIf(d.dob, setDob);             setIf(d.marital, setMarital)
      setIf(d.hasMedicare, setHasMedicare)
      setIf(d.primaryJob, setPrimaryJob)
      setIf(d.hasExpenses, setHasExpenses)
      setIf(d.declared, setDeclared)
      setIf(d.taxYears, setTaxYears);   setIf(d.terms, setTerms)
      setIf(d.howHeard, setHowHeard)
      // The snapshot is only ever written on the way to the residency page,
      // i.e. from step 2, so restoring it lands them back on step 2.
      setStep(2)
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Final step of the form: everything is filled in, so hand the whole thing
  // over to the tax-residency page, where the client reads what residency
  // actually means, declares their status and submits.
  //
  // The hand-off is in-memory and the navigation is client-side on purpose -
  // that's what keeps the uploaded files (and the TFN) alive across the trip.
  // The sessionStorage snapshot below is only a hard-refresh safety net, and
  // still deliberately excludes the TFN: TFN + identity details together are
  // an identity-theft kit, so the TFN never touches browser storage.
  const goToResidency = () => {
    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setErrors({})

    setTaxFormHandoff({
      lang,
      formUrl,
      payload: {
        waNumber, auPhone, fullName, lastName, address, email, country, dob, marital,
        hasMedicare, tfn, primaryJob, hasExpenses, taxYears, howHeard, refCode, declared,
        bankStatement: bankStatement.file,
        selfiePassport: selfiePassport.file,
      },
      previews: {
        bankStatement: bankStatement.preview,
        selfiePassport: selfiePassport.preview,
      },
    })

    try {
      const data = {
        waNumber, auPhone, fullName, lastName, address, email, country, dob, marital,
        hasMedicare, primaryJob, hasExpenses, declared, taxYears, terms, howHeard,
      }
      sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify({ t: Date.now(), data }))
    } catch {}

    router.push(residencyUrl)
  }

  /* ── Validation ── */
  const validate = () => {
    const e: Record<string, string> = {}
    if (!waNumber.trim())    e.waNumber    = T('required')
    if (!auPhone.trim())     e.auPhone     = T('required')
    if (!fullName.trim())    e.fullName    = T('required')
    if (!lastName.trim())     e.lastName     = T('required')
    if (!email.trim())       e.email       = T('required')
    else if (!isValidEmail(email)) e.email = T('invalidEmail')
    if (!address.trim())     e.address     = T('required')
    if (!country.trim())     e.country     = T('required')
    if (!dob.trim())         e.dob         = T('required')
    else if (!isPlausibleDob(dob)) e.dob   = T('invalidDob')
    if (!marital)            e.marital     = T('required')
    if (!hasMedicare)        e.hasMedicare = T('required')
    if (!tfn.trim())         e.tfn         = T('required')
    else if (!isValidTfn(tfn)) e.tfn       = T('invalidTfn')
    if (!primaryJob.trim())  e.primaryJob  = T('required')
    if (!bankStatement.file)  e.bankStatement  = T('required')
    if (!selfiePassport.file) e.selfiePassport = T('required')
    if (!declared)            e.declared       = T('required')
    if (declared === 'no')    e.declared       = 'You must agree to submit'
    if (!howHeard.trim())     e.howHeard       = T('required')
    if (!hasExpenses)         e.hasExpenses    = T('required')
    return e
  }

  // Step 1 covers just the quick-entry fields (contact + identity + TFN);
  // everything else (residency, expenses, declaration, documents) is step 2.
  const validateStep1 = () => {
    const e: Record<string, string> = {}
    if (!waNumber.trim())    e.waNumber    = T('required')
    if (!auPhone.trim())     e.auPhone     = T('required')
    if (!fullName.trim())    e.fullName    = T('required')
    if (!lastName.trim())    e.lastName    = T('required')
    if (!dob.trim())         e.dob         = T('required')
    else if (!isPlausibleDob(dob)) e.dob   = T('invalidDob')
    if (!tfn.trim())         e.tfn         = T('required')
    else if (!isValidTfn(tfn)) e.tfn       = T('invalidTfn')
    if (!email.trim())       e.email       = T('required')
    else if (!isValidEmail(email)) e.email = T('invalidEmail')
    if (!address.trim())     e.address     = T('required')
    if (!primaryJob.trim())  e.primaryJob  = T('required')
    return e
  }

  const goToStep2 = () => {
    const errs = validateStep1()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    trackFunnelEvent('step1_complete')
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  /* ── Success screen ── */
  if (submitted) {
    const firstName = fullName.split(' ')[0]
    const waMsg = encodeURIComponent("Hi! I just filled out the form and I'd like to check my eligibility 😊")
    const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`
    return (
      <>
        <style>{styles}</style>
        <div className="form-success-wrap">
          <div className="success-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="#0B5240" strokeWidth="1.5"/>
              <path d="M12 20l6 6 10-12" stroke="#0B5240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="success-title">{T('thankYou')}, {firstName}! 🎉</h1>
          <p className="success-body">{T('successBody')}</p>

          <a href={waHref} target="_blank" rel="noopener noreferrer" className="success-wa-btn">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="rgba(255,255,255,0.25)"/>
              <path d="M13.1 12.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3l.46 1.35c.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z" fill="white"/>
            </svg>
            {T('msgWhatsApp')}
          </a>

          <div className="success-divider" />

          <p className="success-follow-label">{T('followUs')}<br />{T('followSub')}<br />{T('followGuides')}</p>
          <div className="success-socials">
            <a href="https://www.tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className="success-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.03a4.85 4.85 0 01-1-.34z"/>
              </svg>
              TikTok
            </a>
            <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className="success-social-btn">
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

  const err = (k: string) => errors[k] ? <span className="err-msg">{errors[k]}</span> : null

  return (
    <>
      <style>{styles}</style>
      <div className="form-page-wrap">
        <div className="form-card">
          <div className="form-header">
            <FormLanguageToggle lang={lang} onChange={setLang} />

          <h1 className="form-title">{T('titleTax')}</h1>

            <div className="form-trust-row">
              <div className="form-trust-circle" title={T('secureForm')}>
                <svg width="19" height="21" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M8 1L2 3.5V8c0 3.5 2.5 6.7 6 7.5 3.5-.8 6-4 6-7.5V3.5L8 1z" fill="#EAF6F1" stroke="#0B5240" strokeWidth="1.2" strokeLinejoin="round"/>
                  <path d="M5.5 8.5l2 2 3-3" stroke="#0B5240" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="form-trust-circle" title={T('registeredTaxAgent')}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="7" cy="6.5" r="3" stroke="#0B5240" strokeWidth="1.2"/>
                  <path d="M1.8 16.5c0-2.9 2.3-5.2 5.2-5.2s5.2 2.3 5.2 5.2" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="14" cy="7.5" r="2.4" stroke="#0B5240" strokeWidth="1.1"/>
                  <path d="M13.2 12.6c2.8 0 5 2 5 4.4" stroke="#0B5240" strokeWidth="1.1" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="form-trust-circle" title={T('fullyOnline')}>
                <svg width="21" height="21" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="9" cy="9" r="7.3" stroke="#0B5240" strokeWidth="1.2"/>
                  <path d="M9 1.7c3 2.9 3 11.7 0 14.6M9 1.7c-3 2.9-3 11.7 0 14.6" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M1.9 9h14.2" stroke="#0B5240" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
          </div>

        <form ref={formRef} onSubmit={e => e.preventDefault()} noValidate>

          {step === 1 && (
          <div>

            <Field label={T('whatsapp')} required error={errors.waNumber}
              hint={lang === 'de' ? 'Die WhatsApp-Nummer, die du gerade nutzt.'
                : lang === 'ja' ? '現在お使いのWhatsApp番号をご記入ください。'
                : 'The WhatsApp number you\u2019re currently using.'}>
              <input className={`inp ${errors.waNumber ? 'inp-err' : ''}`} type="tel" placeholder="+44 7XXX XXXXXX" autoComplete="tel" inputMode="tel" maxLength={30}
                value={waNumber} onChange={e => { setWaNumber(e.target.value); setErrors(p => ({...p, waNumber: ''})) }}  onKeyDown={e=>{if(!/^[0-9+\s]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
            </Field>

            <Field label={T('auPhone')} required error={errors.auPhone}>
              <input className={`inp ${errors.auPhone ? 'inp-err' : ''}`} type="tel" placeholder="04XX XXX XXX" autoComplete="tel" inputMode="tel" maxLength={30}
                value={auPhone} onChange={e => { setAuPhone(e.target.value.replace(/[^0-9+\s\-()]/g, '')); setErrors(p => ({...p, auPhone: ''})) }}  onKeyDown={e=>{if(!/^[0-9+\s]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
            </Field>

            <Field label={T('givenNames')} required error={errors.fullName}>
              <input className={`inp ${errors.fullName ? 'inp-err' : ''}`} type="text" placeholder="As it appears on passport" autoComplete="given-name" maxLength={60}
                value={fullName} onChange={e => { setFullName(e.target.value); setErrors(p => ({...p, fullName: ''})) }} />
            </Field>
            <Field label={T('lastName')} required error={errors.lastName}>
              <input className={`inp ${errors.lastName ? 'inp-err' : ''}`} type="text" placeholder="e.g. Smith" autoComplete="family-name" maxLength={60}
                value={lastName} onChange={e => { setLastName(e.target.value); setErrors(p => ({...p, lastName: ''})) }} />
            </Field>

            <Field label={T('dob')} required error={errors.dob}>
              <input className={`inp ${errors.dob ? 'inp-err' : ''}`} type="date" autoComplete="bday"
                value={dob} onChange={e => { setDob(e.target.value); setErrors(p => ({...p, dob: ''})) }} />
            </Field>

            <Field label={T('tfn')} required error={errors.tfn}>
              <input className={`inp ${errors.tfn ? 'inp-err' : ''}`} type="text" placeholder="XXX XXX XXX" inputMode="numeric"
                value={tfn} onChange={e => { setTfn(e.target.value.replace(/[^0-9\s]/g, '')); setErrors(p => ({...p, tfn: ''})) }}  onKeyDown={e=>{if(!/^[0-9\s]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
            </Field>

            <Field label={T('email')} required error={errors.email}>
              <input className={`inp ${errors.email ? 'inp-err' : ''}`} type="email" placeholder="your@email.com" autoComplete="email" inputMode="email" maxLength={200}
                value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})) }} />
            </Field>

            <Field label={T('addressShort')} required error={errors.address}>
              <input className={`inp ${errors.address ? 'inp-err' : ''}`} type="text" placeholder="e.g. 12 Smith Street, Bondi NSW 2026" autoComplete="street-address" maxLength={300}
                value={address} onChange={e => { setAddress(e.target.value); setErrors(p => ({...p, address: ''})) }} />
            </Field>

            <Field label={T('primaryJob')} required error={errors.primaryJob}>
              <input className={`inp ${errors.primaryJob ? 'inp-err' : ''}`} type="text" placeholder="e.g. Farm worker, Barista"
                value={primaryJob} onChange={e => { setPrimaryJob(e.target.value); setErrors(p => ({...p, primaryJob: ''})) }} />
            </Field>

            {Object.values(errors).some(v => v) && (
              <div className="errors-banner">
                <strong>{T('fixBeforeSubmit')}</strong>
                <ul style={{margin:'6px 0 0',paddingLeft:'18px'}}>
                  {(Object.entries(errors) as [string, string][]).filter(([,v]) => v).map(([k, v]) => (
                    <li key={k} style={{fontSize:'12px',marginBottom:'2px'}}>{v === T('required') ? `${({
                      waNumber:'Phone Number',auPhone:'Australian Phone',fullName:'Full Name',lastName:'Last Name',
                      dob:'Date of Birth',tfn:'TFN',email:'Email Address',address:'Australian Address',primaryJob:'Primary Job',
                    } as Record<string,string>)[k] || k} is required` : v}</li>
                  ))}
                </ul>
              </div>
            )}

            <button type="button" className="submit-btn" onClick={goToStep2}>
              {T('continueButton')}
            </button>
            <p className="form-footer-note" style={{marginTop:10}}>{T('timeEstimate')}</p>
          </div>
          )}

          {step === 2 && (
          <div>

            <Field label={T('hasMedicare')} required error={errors.hasMedicare}>
              <div className="radio-group">
                {([{ val: 'no', label: 'No' }, { val: 'yes', label: 'Yes' }] as const).map(opt => (
                  <label key={opt.val} className={`radio-card ${hasMedicare === opt.val ? 'radio-card-active' : ''}`}>
                    <input type="radio" name="hasMedicare" value={opt.val} checked={hasMedicare === opt.val}
                      onChange={() => { setHasMedicare(opt.val); setErrors(p => ({...p, hasMedicare: ''})) }} className="hidden" />
                    <div className={`radio-dot ${hasMedicare === opt.val ? 'radio-dot-active' : ''}`} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Field>

            <Field label={T('marital')} required error={errors.marital}>
              <div className="radio-group">
                {(['Single', 'Married'] as const).map(opt => (
                  <label key={opt} className={`radio-card ${marital === opt ? 'radio-card-active' : ''}`}>
                    <input type="radio" name="marital" value={opt} checked={marital === opt}
                      onChange={() => { setMarital(opt); setErrors(p => ({...p, marital: ''})) }} className="hidden" />
                    <div className={`radio-dot ${marital === opt ? 'radio-dot-active' : ''}`} />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="" required error={errors.hasExpenses}>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#1A2822',marginBottom:'6px'}}>
                {lang === 'de' ? (
                  <>Hast du{' '}<a href="/de/expenses" target="_blank" rel="noopener noreferrer" style={{color:'#0B5240',textDecoration:'underline'}}>arbeitsbezogene Ausgaben</a>?</>
                ) : lang === 'ja' ? (
                  <><a href="/ja/expenses" target="_blank" rel="noopener noreferrer" style={{color:'#0B5240',textDecoration:'underline'}}>業務関連の経費</a>はありますか？</>
                ) : (
                  <>Do you have{' '}<a href="/expenses" target="_blank" rel="noopener noreferrer" style={{color:'#0B5240',textDecoration:'underline'}}>work-related expenses</a>?</>
                )}<span style={{color:'#0B5240',marginLeft:'3px'}}>*</span>
              </label>
              <div className="radio-group">
                {(['yes','no'] as const).map(opt => (
                  <label key={opt} className={`radio-card ${hasExpenses === opt ? 'radio-card-active' : ''}`}>
                    <input type="radio" name="hasExpenses" value={opt} checked={hasExpenses === opt}
                      onChange={() => { setHasExpenses(opt); setErrors(p => ({...p, hasExpenses: ''})) }} className="hidden" />
                    <div className={`radio-dot ${hasExpenses === opt ? 'radio-dot-active' : ''}`} />
                    {opt === 'yes' ? 'Yes' : 'No'}
                  </label>
                ))}
              </div>
            </Field>

            {hasExpenses === 'yes' && (
              <div style={{ background: '#EAF6F1', border: '1.5px solid #A7D9C5', borderRadius: 14, padding: '16px', marginTop: 10 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#0B5240', marginBottom: 10, textAlign: 'center' }}>
                  {T('emailInvoicesTitle')}
                </p>
                <div style={{ background: '#fff', border: '1.5px solid #C8EAE0', borderRadius: 10, padding: '10px 14px', textAlign: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#0B5240', letterSpacing: '0.01em' }}>
                    +61 424 513 998
                  </span>
                </div>
              </div>
            )}
          </div>
          )}

          {step === 2 && (
          <div>

            <Field label={T('homeCountry')} required error={errors.country}>
              <input className={`inp ${errors.country ? 'inp-err' : ''}`} type="text" placeholder="e.g. United Kingdom" autoComplete="country-name" maxLength={60}
                value={country} onChange={e => { setCountry(e.target.value); setErrors(p => ({...p, country: ''})) }} />
            </Field>

            <Field label={T('howHeard')} required error={errors.howHeard}>
              <input className={`inp ${errors.howHeard ? 'inp-err' : ''}`} type="text" placeholder="e.g. Instagram, TikTok, friend..."
                value={howHeard} onChange={e => { setHowHeard(e.target.value); setErrors(p => ({...p, howHeard: ''})) }} />
            </Field>

            <Field label={T('bankStatements')} required error={errors.bankStatement} hint={T('bankStatementHint')}>
              <FileUpload id="bankStatement" label={T('uploadBankStatement')} accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp"
                value={bankStatement} onChange={(v) => { setBankStatement(v); setErrors(p => ({...p, bankStatement: ''})) }} lang={lang} />
            </Field>

            <Field label={T('selfieWithPassport')} required error={errors.selfiePassport} hint={T('selfieHint')}>
              <FileUpload id="selfiePassport" label={T('uploadSelfie')} accept=".jpg,.jpeg,.png,.pdf,.heic,.heif,.webp"
                value={selfiePassport} onChange={(v) => { setSelfiePassport(v); setErrors(p => ({...p, selfiePassport: ''})) }} lang={lang} />
            </Field>

          </div>
          )}

          {step === 2 && (
          <>
          <div>

            <Field label="" required error={errors.declared}>
              {/* One line, one action: the sentence IS the checkbox label, so
                  there's no separate "I confirm this declaration" row repeating
                  it. "&" instead of "and" to keep it on a single line. */}
              <div className={`declaration-box${errors.declared ? ' decl-error' : ''}`}>
                <label className="decl-row">
                  <input type="checkbox" checked={declared === 'yes'} onChange={e => { setDeclared(e.target.checked ? 'yes' : ''); setErrors(p => ({...p, declared: ''})) }} className="hidden"/>
                  <div className={`check-box${declared === 'yes' ? ' checked' : ''}`}>{declared === 'yes' && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
                  <span className="decl-text">
                    {lang === 'de' ? (
                      <>Ich habe die{' '}<a href="/de/client-agreement" target="_blank" rel="noopener noreferrer" className="decl-link">Mandantenvereinbarung</a>{' & '}<a href="/de/privacy" target="_blank" rel="noopener noreferrer" className="decl-link">Datenschutzerklärung</a>{' '}gelesen &amp; stimme zu.</>
                    ) : lang === 'ja' ? (
                      <><a href="/ja/client-agreement" target="_blank" rel="noopener noreferrer" className="decl-link">クライアント規約</a>{'・'}<a href="/ja/privacy" target="_blank" rel="noopener noreferrer" className="decl-link">プライバシーポリシー</a>{'を読み、同意します。'}</>
                    ) : (
                      <>I&apos;ve read &amp; agree to the{' '}<a href="/client-agreement" target="_blank" rel="noopener noreferrer" className="decl-link">Client Agreement</a>{' & '}<a href="/privacy" target="_blank" rel="noopener noreferrer" className="decl-link">Privacy Policy</a>.</>
                    )}
                  </span>
                </label>
              </div>
            </Field>
          </div>

          {Object.values(errors).some(v => v) && (
            <div className="errors-banner">
              <strong>{T('fixBeforeSubmit')}</strong>
              <ul style={{margin:'6px 0 0',paddingLeft:'18px'}}>
                {(Object.entries(errors) as [string, string][]).filter(([,v]) => v).map(([k, v]) => (
                  <li key={k} style={{fontSize:'12px',marginBottom:'2px'}}>{v === T('required') ? `${({
                    waNumber:'Phone Number',auPhone:'Australian Phone',fullName:'Full Name',
                    email:'Email Address',address:'Australian Address',country:'Home Country',
                    dob:'Date of Birth',marital:'Marital Status',hasMedicare:'Medicare',tfn:'TFN',
                    primaryJob:'Primary Job',bankStatement:'Bank Statement',selfiePassport:'Selfie with Passport',
                    taxStatus:'Tax Residency Status',declared:'Declaration',howHeard:'How did you hear about us'
                  } as Record<string,string>)[k] || k} is required` : v}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="button" className="back-btn" onClick={() => { setStep(1); setErrors({}); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            {T('backButton')}
          </button>

          <button type="button" className="submit-btn" onClick={goToResidency}>
            {T('checkResidency')}
          </button>

          <p className="form-footer-note" style={{marginTop:10}}>{T('checkResidencyNote')}</p>
          <p className="form-footer-note">{T('secureNote')}</p>
          </>
          )}

        </form>
        </div>
      </div>
    </>
  )
}

/* ── Styles ── */
const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .hidden { display: none !important; }
  .form-page-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; padding: 100px 16px 60px; }
  .form-card { width: 100%; max-width: 480px; background: #fff; border-radius: 24px; box-shadow: 0 2px 24px rgba(11,82,64,0.07); overflow: hidden; }
  .form-header { background: #fff; padding: 22px 24px 22px; text-align: center; }
  .form-trust-row { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 14px; }
  .form-trust-circle { width: 44px; height: 44px; border-radius: 50%; background: #EAF6F1; border: 1px solid #C8EAE0; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .form-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; color: rgba(11,82,64,0.65); text-transform: uppercase; margin-bottom: 8px; }
  .form-title { font-size: 24px; font-weight: 800; color: #080F0D; letter-spacing: -0.02em; margin-bottom: 10px; }
  .form-intro { font-size: 13px; color: #587066; line-height: 1.65; max-width: 30ch; margin-left: auto; margin-right: auto; }
  form { padding: 20px 24px 32px; }
  .field-group { margin-bottom: 14px; }
  .field-label { display: block; font-size: 13px; font-weight: 600; color: #1A2822; margin-bottom: 6px; }
  .req-dot { color: #0B5240; margin-left: 3px; }
  .field-error { display: block; font-size: 11px; color: #DC2626; margin-top: 4px; }
  .inp { display: block; width: 100%; padding: 12px 14px; font-size: 14px; font-family: inherit; color: #080F0D; background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 12px; outline: none; transition: border-color .15s; -webkit-appearance: none; }
  input[type="date"].inp { min-height: 47px; line-height: 1.4; }
  .inp:focus { border-color: #0B5240; background: #fff; }
  .inp-err { border-color: #FCA5A5 !important; background: #FFF5F5 !important; }
  .form-textarea { min-height: 80px; resize: vertical; }
  /* Prevent iOS auto-zoom on input focus (fires when font-size < 16px) */
  @media (max-width: 640px) {
    .inp, .form-input, .form-textarea, input[type="number"], input[type="text"], input[type="email"], input[type="date"], textarea { font-size: 16px !important; }
  }
  .radio-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .radio-group-col { flex-direction: column; }
  .radio-card { display: inline-flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px; border: 1.5px solid #D4EAE2; font-size: 13px; font-weight: 500; color: #587066; cursor: pointer; transition: all .15s; background: #F5F9F7; width: 100%; }
  .radio-card-active { background: #EAF6F1; border-color: #0B5240; color: #0B5240; font-weight: 600; }
  .radio-card-no { }
  .radio-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #C8EAE0; flex-shrink: 0; transition: all .15s; background: #fff; }
  .radio-dot-active { border-color: #0B5240; background: #0B5240; }
  .declaration-box { background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 14px; padding: 13px 14px; }
  .decl-row { display: flex; align-items: center; gap: 10px; cursor: pointer; }
  .decl-text { font-size: 12px; color: #1A2822; line-height: 1.5; }
  .decl-link { color: #0B5240; text-decoration: underline; }
  .err-msg { display: block; font-size: 11px; color: #DC2626; margin-top: 4px; }
  .section-chip { display: inline-flex; align-items: center; background: #EAF6F1; color: #0B5240; font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 5px 12px; border-radius: 100px; margin-bottom: 16px; }
  .file-zone { border: 1.5px dashed #C8EAE0; border-radius: 14px; background: #F5F9F7; overflow: hidden; cursor: pointer; transition: border-color .15s; }
  .file-zone:hover { border-color: #0B5240; }
  .file-empty { padding: 20px 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .file-upload-icon { width: 44px; height: 44px; border-radius: 12px; background: #EAF6F1; display: flex; align-items: center; justify-content: center; margin-bottom: 2px; }
  .file-upload-label { font-size: 13px; font-weight: 600; color: #1A2822; }
  .file-upload-sub { font-size: 11px; color: #8AADA3; }
  .file-selected { display: flex; align-items: center; gap: 12px; padding: 12px 14px; }
  .file-img-preview { width: 48px; height: 48px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
  .file-icon-box { width: 48px; height: 48px; border-radius: 8px; background: #EAF6F1; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
  .file-meta { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
  .file-name { font-size: 12.5px; font-weight: 600; color: #080F0D; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .file-size { font-size: 11px; color: #8AADA3; }
  .file-remove { width: 30px; height: 30px; border-radius: 8px; background: #FEE2E2; color: #ef4444; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; flex-shrink: 0; }
  .check-box { width: 20px; height: 20px; border-radius: 6px; border: 2px solid #D4EAE2; background: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; transition: all .15s; }
  .check-box.checked { background: #0B5240; border-color: #0B5240; }
  .check-label { font-size: 13px; color: #1A2822; font-weight: 500; line-height: 1.5; }
  .check-row { display: flex; align-items: center; gap: 10px; margin-top: 10px; cursor: pointer; }
  .errors-banner { background: #FFF5F5; border: 1px solid #FCA5A5; border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #DC2626; font-weight: 500; margin-top: 16px; }
  .submit-btn { display: flex; align-items: center; justify-content: center; width: 100%; height: 56px; background: #0B5240; color: #fff; font-size: 15px; font-weight: 600; font-family: inherit; border: none; border-radius: 100px; cursor: pointer; margin-top: 24px; transition: opacity .15s, transform .1s; }
  .submit-btn:active { transform: scale(.98); opacity: .9; }
  .submit-btn:disabled { opacity: .6; cursor: not-allowed; }
  .back-btn { display: flex; align-items: center; justify-content: center; width: 100%; height: 48px; background: #fff; color: #0B5240; font-size: 14px; font-weight: 600; font-family: inherit; border: 1.5px solid #D4EAE2; border-radius: 100px; cursor: pointer; margin-top: 14px; transition: opacity .15s, transform .1s; }
  .back-btn:active { transform: scale(.98); opacity: .85; }
  .btn-loading { display: flex; align-items: center; gap: 8px; }
  .spin { animation: spin .8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .form-footer-note { text-align: center; font-size: 11px; color: #8AADA3; margin-top: 14px; line-height: 1.6; }
  .form-success-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 28px; text-align: center; }
  .success-icon { width: 80px; height: 80px; border-radius: 50%; background: #EAF6F1; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
  .success-title { font-size: 26px; font-weight: 900; color: #080F0D; letter-spacing: -0.02em; margin: 0 0 10px; }
  .success-body { font-size: 14px; color: #587066; line-height: 1.65; max-width: 28ch; margin: 0 0 24px; }
  .success-wa-btn { display: inline-flex; align-items: center; gap: 8px; background: #22C55E; color: #fff; font-size: 14px; font-weight: 600; padding: 13px 26px; border-radius: 100px; text-decoration: none; font-family: inherit; }
  .success-divider { width: 40px; height: 1px; background: #D4EAE2; margin: 28px auto; }
  .success-follow-label { font-size: 13px; color: #587066; line-height: 1.8; margin: 0 0 16px; font-weight: 600; }
  .success-socials { display: flex; gap: 10px; justify-content: center; }
  .success-social-btn { display: inline-flex; align-items: center; gap: 7px; padding: 10px 18px; border-radius: 100px; border: 1.5px solid #D4EAE2; font-size: 13px; font-weight: 600; color: #0B5240; text-decoration: none; background: #fff; font-family: inherit; }
`
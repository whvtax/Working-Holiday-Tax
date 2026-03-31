'use client'
import { useState, useRef } from 'react'

type UploadState = { file: File | null; preview: string | null }

function Field({ label, required, children, error }: { label: string; required?: boolean; children: React.ReactNode; error?: string }) {
  return (
    <div className="field-group">
      <label className="field-label">{label}{required && <span className="req-dot">*</span>}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}

function FileUpload({ id, label, accept, value, onChange }: { id: string; label: string; accept: string; value: UploadState; onChange: (v: UploadState) => void }) {
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
          {value.preview ? <img src={value.preview} alt="preview" className="file-img-preview" /> : <div className="file-icon-box">📄</div>}
          <div className="file-meta"><span className="file-name">{value.file.name}</span><span className="file-size">{(value.file.size / 1024).toFixed(0)} KB</span></div>
          <button type="button" className="file-remove" onClick={(e) => { e.stopPropagation(); handleRemove() }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      ) : (
        <div className="file-empty">
          <div className="file-upload-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 16V8M8 12l4-4 4 4" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="#C8EAE0" strokeWidth="1.2"/></svg></div>
          <span className="file-upload-label">{label}</span>
          <span className="file-upload-sub">Tap to choose a file</span>
        </div>
      )}
    </div>
  )
}

export default function TFNFormPage() {
  const [firstName, setFirstName]   = useState('')
  const [lastName, setLastName]     = useState('')
  const [country, setCountry]       = useState('')
  const [passport, setPassport]     = useState('')
  const [email, setEmail]           = useState('')
  const [dob, setDob]               = useState('')
  const [whatsapp, setWhatsapp]     = useState('')
  const [auPhone, setAuPhone]       = useState('')
  const [gender, setGender]         = useState<'Female'|'Male'|''>('')
  const [marital, setMarital]       = useState<'Single'|'Married'|''>('')
  const [address, setAddress]       = useState('')
  const [declared, setDeclared]     = useState(false)
  const [terms, setTerms]           = useState(false)
  const [selfie, setSelfie]         = useState<UploadState>({ file: null, preview: null })
  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [errors, setErrors]         = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!firstName.trim()) e.firstName = 'Required'
    if (!lastName.trim())  e.lastName  = 'Required'
    if (!country.trim())   e.country   = 'Required'
    if (!passport.trim())  e.passport  = 'Required'
    if (!email.trim())     e.email     = 'Required'
    if (!dob.trim())       e.dob       = 'Required'
    if (!whatsapp.trim())  e.whatsapp  = 'Required'
    if (!auPhone.trim())   e.auPhone   = 'Required'
    if (!gender)           e.gender    = 'Required'
    if (!marital)          e.marital   = 'Required'
    if (!address.trim())   e.address   = 'Required'
    if (!selfie.file)      e.selfie    = 'Required'
    if (!declared)         e.declared  = 'You must confirm this declaration'
    if (!terms)            e.terms     = 'You must accept the terms'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const fd = new FormData()
    fd.append('formType',  'tfn')
    fd.append('firstName', firstName)
    fd.append('lastName',  lastName)
    fd.append('country',   country)
    fd.append('passport',  passport)
    fd.append('email',     email)
    fd.append('dob',       dob)
    fd.append('whatsapp',  whatsapp)
    fd.append('auPhone',   auPhone)
    fd.append('gender',    gender)
    fd.append('marital',   marital)
    fd.append('address',   address)
    fd.append('declared', declared ? '✓ I confirm: first visit to Australia, never married/changed name/gender, no Australian assets, no TFN issued' : '')
    fd.append('terms',    terms ? '✓ I have read and accept the Client Agreement & Privacy Policy' : '')
        if (selfie.file) fd.append('selfiePassport', selfie.file)
    try {
      const res = await fetch('/api/tfn-form', { method: 'POST', body: fd })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        if (res.status === 429) alert('Too many submissions. Please wait 15 minutes and try again.')
        else if (data?.error === 'invalid_file') alert(`File error: ${data.message || 'Please upload a valid image or PDF under 10MB.'}`)
        else alert('Something went wrong. Please try again.')
      }
    } catch { alert('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  if (submitted) {
    const displayName = firstName || 'there'
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
          <h1 className="success-title">Thank you, {displayName}! 🎉</h1>
          <p className="success-body">We&apos;ve received your details and will be in touch shortly via WhatsApp.</p>
          <a href="https://wa.me/61424513998" target="_blank" rel="noopener noreferrer" className="success-wa-btn">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="rgba(255,255,255,0.25)"/>
              <path d="M13.1 12.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3l.46 1.35c.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z" fill="white"/>
            </svg>
            Message us on WhatsApp
          </a>
          <div className="success-divider" />
          <p className="success-follow-label">Learn something new about Australian tax for WHV holders — one tip a day 🇦🇺</p>
          <div className="success-socials">
            <a href="https://tiktok.com/@workingholidaytax" target="_blank" rel="noopener noreferrer" className="success-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.16 8.16 0 004.77 1.52V7.03a4.85 4.85 0 01-1-.34z"/></svg>
              TikTok
            </a>
            <a href="https://instagram.com/workingholidaytax" target="_blank" rel="noopener noreferrer" className="success-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </a>
          </div>
        </div>
      </>
    )
  }

  return (
    <><style>{css}</style>
    <div className="form-page-wrap">
      <div className="form-card">
        <div className="form-header">
          <div className="form-brand">Working Holiday Tax</div>
          
          <h1 className="form-title">TFN Application</h1>
          <p className="form-intro">Please fill out the form in English exactly as it appears on your passport. We&apos;re here to help if you have any questions.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-section-title">Personal details</div>

          <Field label="First name (including middle name)" required error={errors.firstName}>
            <input className={`form-input${errors.firstName?' input-error':''}`} placeholder="e.g. John Michael" value={firstName} onChange={e=>setFirstName(e.target.value)}/>
          </Field>
          <Field label="Last name" required error={errors.lastName}>
            <input className={`form-input${errors.lastName?' input-error':''}`} placeholder="e.g. Smith" value={lastName} onChange={e=>setLastName(e.target.value)}/>
          </Field>
          <Field label="Country of passport" required error={errors.country}>
            <input className={`form-input${errors.country?' input-error':''}`} placeholder="e.g. France" value={country} onChange={e=>setCountry(e.target.value)}/>
          </Field>
          <Field label="Passport number" required error={errors.passport}>
            <input className={`form-input${errors.passport?' input-error':''}`} placeholder="e.g. AB1234567" value={passport} onChange={e=>setPassport(e.target.value)}/>
          </Field>
          <Field label="Email address" required error={errors.email}>
            <input type="email" className={`form-input${errors.email?' input-error':''}`} placeholder="e.g. john@email.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          </Field>
          <Field label="Date of birth" required error={errors.dob}>
            <input type="date" className={`form-input${errors.dob?' input-error':''}`} value={dob} onChange={e=>setDob(e.target.value)}/>
          </Field>
          <Field label="WhatsApp Number" required error={errors.whatsapp}>
            <input type="tel" className={`form-input${errors.whatsapp?' input-error':''}`} placeholder="+33 6 12 34 56 78" value={whatsapp} onChange={e=>setWhatsapp(e.target.value)}/>
          </Field>
          <Field label="Australian phone number" required error={errors.auPhone}>
            <input type="tel" className={`form-input${errors.auPhone?' input-error':''}`} placeholder="+61 4XX XXX XXX" value={auPhone} onChange={e=>setAuPhone(e.target.value)}/>
          </Field>

          <Field label="Gender as shown in passport" required error={errors.gender}>
            <div className="radio-group">
              {(['Female','Male'] as const).map(g => (
                <label key={g} className={`radio-pill${gender===g?' selected':''}`}>
                  <input type="radio" name="gender" value={g} checked={gender===g} onChange={()=>setGender(g)} className="hidden"/>
                  {g}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Marital status" required error={errors.marital}>
            <div className="radio-group">
              {(['Single','Married'] as const).map(m => (
                <label key={m} className={`radio-pill${marital===m?' selected':''}`}>
                  <input type="radio" name="marital" value={m} checked={marital===m} onChange={()=>setMarital(m)} className="hidden"/>
                  {m}
                </label>
              ))}
            </div>
          </Field>

          <Field label="Full Australian address (state, city, street, number, postcode)" required error={errors.address}>
            <textarea className={`form-input form-textarea${errors.address?' input-error':''}`} placeholder="e.g. NSW, Sydney, 42 Bondi Rd, 2026" value={address} onChange={e=>setAddress(e.target.value)}/>
          </Field>

          <div className="form-section-title">Documents</div>
          <Field label="Selfie with passport" required error={errors.selfie}>
            <FileUpload id="selfie" label="Upload selfie with passport" accept="image/*,.pdf" value={selfie} onChange={setSelfie}/>
          </Field>

          <div className="form-section-title">Declaration</div>
          <div className={`declaration-box${errors.declared?' decl-error':''}`}>
            <p className="decl-text">I confirm I am currently in Australia on my first visit, have never been married or changed my name or gender, do not own assets in Australia, and have not been issued a TFN.</p>
            <label className="check-row">
              <input type="checkbox" checked={declared} onChange={e=>setDeclared(e.target.checked)} className="hidden"/>
              <div className={`check-box${declared?' checked':''}`}>{declared && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
              <span className="check-label">I confirm this declaration</span>
            </label>
            {errors.declared && <span className="field-error">{errors.declared}</span>}
          </div>

          <div className={`declaration-box${errors.terms?' decl-error':''}`} style={{marginTop:10}}>
            <label className="check-row">
              <input type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)} className="hidden"/>
              <div className={`check-box${terms?' checked':''}`}>{terms && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
              <span className="check-label">I have read and accept the <a href="/client-agreement" target="_blank" className="decl-link">Client Agreement</a> &amp; <a href="/privacy" target="_blank" className="decl-link">Privacy Policy</a></span>
            </label>
            {errors.terms && <span className="field-error">{errors.terms}</span>}
          </div>

          {Object.values(errors).some(v => v) && (
            <div className="errors-banner">
              <strong>Please fix the following before submitting:</strong>
              <ul style={{margin:'6px 0 0',paddingLeft:'18px'}}>
                {(Object.entries(errors) as [string, string][]).filter(([,v]) => v).map(([k, v]) => (
                  <li key={k} style={{fontSize:'12px',marginBottom:'2px'}}>{v === 'Required' ? `${({
                    firstName:'First Name',lastName:'Last Name',country:'Country',
                    passport:'Passport Number',email:'Email Address',dob:'Date of Birth',
                    whatsapp:'WhatsApp Number',auPhone:'Australian Phone',gender:'Gender',
                    marital:'Marital Status',address:'Australian Address',selfie:'Selfie with Passport'
                  } as Record<string,string>)[k] || k} is required` : v}</li>
                ))}
              </ul>
            </div>
          )}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="btn-loading"><svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2.5" strokeDasharray="40" strokeDashoffset="10"/></svg>Submitting…</span> : 'Submit TFN Application →'}
          </button>
          <p className="form-footer-note">Your information is kept secure and private.</p>
        </form>
      </div>
    </div></>
  )
}

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .hidden { display: none !important; }
  .form-page-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; padding: 100px 16px 60px; }
  .form-card { width: 100%; max-width: 480px; background: #fff; border-radius: 24px; padding: 28px 24px 32px; box-shadow: 0 2px 24px rgba(11,82,64,0.07); }
  .form-header { margin-bottom: 24px; text-align: center; }
  .form-brand { font-size: 11px; font-weight: 600; color: #0B5240; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 10px; }
  .form-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; color: rgba(11,82,64,0.65); text-transform: uppercase; margin-bottom: 8px; }
  .form-title { font-size: 24px; font-weight: 800; color: #080F0D; letter-spacing: -0.02em; margin-bottom: 10px; }
  .form-intro { font-size: 13px; color: #587066; line-height: 1.65; }
  .form-section-title { font-size: 11px; font-weight: 700; color: #0B5240; text-transform: uppercase; letter-spacing: 0.06em; margin: 22px 0 14px; border-bottom: 1px solid #EAF6F1; padding-bottom: 8px; }
  .field-group { margin-bottom: 14px; }
  .field-label { display: block; font-size: 13px; font-weight: 600; color: #1A2822; margin-bottom: 6px; }
  .req-dot { color: #0B5240; margin-left: 3px; }
  .field-error { display: block; font-size: 11px; color: #DC2626; margin-top: 4px; }
  .form-input { display: block; width: 100%; padding: 12px 14px; font-size: 14px; font-family: inherit; color: #080F0D; background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 12px; outline: none; transition: border-color .15s; -webkit-appearance: none; }
  .form-input:focus { border-color: #0B5240; background: #fff; }
  .input-error { border-color: #FCA5A5 !important; background: #FFF5F5 !important; }
  .form-textarea { min-height: 80px; resize: vertical; }
  .radio-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .radio-pill { display: inline-flex; align-items: center; padding: 9px 18px; border-radius: 100px; border: 1.5px solid #D4EAE2; font-size: 13px; font-weight: 500; color: #587066; cursor: pointer; transition: all .15s; background: #F5F9F7; }
  .radio-pill.selected { background: #0B5240; border-color: #0B5240; color: #fff; font-weight: 600; }
  .declaration-box { background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 14px; padding: 16px; }
  .decl-error { border-color: #FCA5A5 !important; background: #FFF5F5 !important; }
  .decl-text { font-size: 12px; color: #587066; line-height: 1.7; margin-bottom: 12px; }
  .decl-link { color: #0B5240; text-decoration: underline; }
  .check-row { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; }
  .check-box { width: 20px; height: 20px; border-radius: 6px; border: 2px solid #D4EAE2; background: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; transition: all .15s; }
  .check-box.checked { background: #0B5240; border-color: #0B5240; }
  .check-label { font-size: 13px; color: #1A2822; font-weight: 500; line-height: 1.5; }
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
  .errors-banner { background: #FFF5F5; border: 1px solid #FCA5A5; border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #DC2626; font-weight: 500; margin-top: 16px; }
  .submit-btn { display: flex; align-items: center; justify-content: center; width: 100%; height: 56px; background: #0B5240; color: #fff; font-size: 15px; font-weight: 600; font-family: inherit; border: none; border-radius: 100px; cursor: pointer; margin-top: 24px; transition: opacity .15s, transform .1s; }
  .submit-btn:active { transform: scale(.98); opacity: .9; }
  .submit-btn:disabled { opacity: .6; cursor: not-allowed; }
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
  .success-follow-label { font-size: 13px; color: #587066; line-height: 1.6; max-width: 26ch; margin: 0 0 16px; }
  .success-socials { display: flex; gap: 10px; justify-content: center; }
  .success-social-btn { display: inline-flex; align-items: center; gap: 7px; padding: 10px 18px; border-radius: 100px; border: 1.5px solid #D4EAE2; font-size: 13px; font-weight: 600; color: #0B5240; text-decoration: none; background: #fff; font-family: inherit; }
`

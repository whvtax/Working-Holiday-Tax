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
    if (selfie.file) fd.append('selfiePassport', selfie.file)
    try {
      const res = await fetch('/api/tfn-form', { method: 'POST', body: fd })
      if (res.ok) setSubmitted(true)
      else throw new Error()
    } catch { alert('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }

  if (submitted) return (
    <><style>{css}</style>
    <div className="form-success-wrap">
      <div className="success-icon"><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19" stroke="#0B5240" strokeWidth="1.5"/><path d="M12 20l6 6 10-12" stroke="#0B5240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
      <h1 className="success-title">Application submitted!</h1>
      <p className="success-body">Thank you. Our team will process your TFN application and contact you shortly.</p>
    </div></>
  )

  return (
    <><style>{css}</style>
    <div className="form-page-wrap">
      <div className="form-card">
        <div className="form-header">
          <div className="form-brand">Simple | tax services</div>
          <h1 className="form-title">TFN Application</h1>
          <p className="form-intro">Dear client, please fill in the form accurately as it appears in your passport, in English only. Our expert team is available for any questions.</p>
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
          <Field label="WhatsApp number" required error={errors.whatsapp}>
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
            <p className="decl-text">I declare that this is my first visit to Australia and I am currently residing here. I have never been married, changed my first name, last name, and/or gender. I do not own any assets in Australia and have never been issued a TFN. All details in this application are true, complete and accurate. I understand that if any detail is found to be false, I will be subject to penalties under Australian tax law.</p>
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
              <span className="check-label">I have read and accept the <a href="/client-agreement" target="_blank" className="decl-link">Terms of Service</a> &amp; <a href="/privacy" target="_blank" className="decl-link">Privacy Policy</a></span>
            </label>
            {errors.terms && <span className="field-error">{errors.terms}</span>}
          </div>

          {Object.keys(errors).length > 0 && <div className="errors-banner">Please fill in all required fields above.</div>}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="btn-loading"><svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2.5" strokeDasharray="40" strokeDashoffset="10"/></svg>Submitting…</span> : 'Submit TFN Application →'}
          </button>
          <p className="form-footer-note">Simple | tax services · Your information is kept secure and private</p>
        </form>
      </div>
    </div></>
  )
}

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .hidden { display: none !important; }
  .form-page-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; padding: 32px 16px 60px; }
  .form-card { width: 100%; max-width: 480px; background: #fff; border-radius: 24px; padding: 28px 24px 32px; box-shadow: 0 2px 24px rgba(11,82,64,0.07); }
  .form-header { margin-bottom: 24px; text-align: center; }
  .form-brand { font-size: 11px; font-weight: 600; color: #0B5240; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 10px; }
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
  .success-icon { width: 80px; height: 80px; border-radius: 50%; background: #EAF6F1; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; }
  .success-title { font-size: 26px; font-weight: 900; color: #080F0D; letter-spacing: -0.02em; margin: 0 0 12px; }
  .success-body { font-size: 14px; color: #587066; line-height: 1.65; max-width: 30ch; margin: 0; }
`

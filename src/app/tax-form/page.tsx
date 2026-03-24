'use client'

import { useState, useRef } from 'react'

/* ── Types ── */
type UploadState = { file: File | null; preview: string | null }

/* ── Field wrapper ── */
function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="field-group">
      <label className="field-label">
        {label}
        {required && <span className="req-dot">*</span>}
      </label>
      {children}
    </div>
  )
}

/* ── File upload button ── */
function FileUpload({
  id, label, accept, value, onChange
}: {
  id: string; label: string; accept: string
  value: UploadState; onChange: (v: UploadState) => void
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
            ? <img src={value.preview} alt="preview" className="file-img-preview" />
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
          <span className="file-upload-sub">Tap to choose a file</span>
        </div>
      )}
    </div>
  )
}

/* ── Main Form ── */
export default function TaxFormPage() {
  // Personal
  const [waNumber, setWaNumber]       = useState('')
  const [auPhone, setAuPhone]         = useState('')
  const [fullName, setFullName]       = useState('')
  const [address, setAddress]         = useState('')
  const [email, setEmail]             = useState('')
  const [country, setCountry]         = useState('')
  const [dob, setDob]                 = useState('')
  const [marital, setMarital]         = useState<'Single'|'Married'|''>('')
  const [tfn, setTfn]                 = useState('')
  const [primaryJob, setPrimaryJob]   = useState('')
  const [bankDetails, setBankDetails] = useState('')

  // Files
  const [bankStatement, setBankStatement] = useState<UploadState>({ file: null, preview: null })
  const [selfiePassport, setSelfiePassport] = useState<UploadState>({ file: null, preview: null })
  const [invoices, setInvoices]         = useState<UploadState>({ file: null, preview: null })

  // Declarations
  const [taxStatus, setTaxStatus]     = useState<'resident'|'whm'|''>('')
  const [declared, setDeclared]       = useState<'yes'|'no'|''>('')
  const [taxYear, setTaxYear]         = useState('2024-25')
  const [howHeard, setHowHeard]       = useState('')

  // UI
  const [submitted, setSubmitted]     = useState(false)
  const [loading, setLoading]         = useState(false)
  const [errors, setErrors]           = useState<Record<string, string>>({})

  /* ── Validation ── */
  const validate = () => {
    const e: Record<string, string> = {}
    if (!waNumber.trim())    e.waNumber    = 'Required'
    if (!auPhone.trim())     e.auPhone     = 'Required'
    if (!fullName.trim())    e.fullName    = 'Required'
    if (!email.trim())       e.email       = 'Required'
    if (!address.trim())     e.address     = 'Required'
    if (!country.trim())     e.country     = 'Required'
    if (!dob.trim())         e.dob         = 'Required'
    if (!marital)            e.marital     = 'Required'
    if (!tfn.trim())         e.tfn         = 'Required'
    if (!primaryJob.trim())  e.primaryJob  = 'Required'
    if (!bankDetails.trim()) e.bankDetails = 'Required'
    if (!bankStatement.file) e.bankStatement  = 'Required'
    if (!selfiePassport.file) e.selfiePassport = 'Required'
    if (!taxStatus)          e.taxStatus   = 'Required'
    if (!declared)           e.declared    = 'Required'
    if (declared === 'no')   e.declared    = 'You must agree to submit'
    if (!howHeard.trim())    e.howHeard    = 'Required'
    return e
  }

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)

    // Build FormData for file uploads
    const fd = new FormData()
    fd.append('waNumber',    waNumber)
    fd.append('auPhone',     auPhone)
    fd.append('fullName',    fullName)
    fd.append('address',     address)
    fd.append('email',       email)
    fd.append('country',     country)
    fd.append('dob',         dob)
    fd.append('marital',     marital)
    fd.append('tfn',         tfn)
    fd.append('primaryJob',  primaryJob)
    fd.append('bankDetails', bankDetails)
    fd.append('taxStatus',   taxStatus)
    fd.append('taxYear',     taxYear)
    fd.append('howHeard',    howHeard)
    if (bankStatement.file)  fd.append('bankStatement',  bankStatement.file)
    if (selfiePassport.file) fd.append('selfiePassport', selfiePassport.file)
    if (invoices.file)       fd.append('invoices',       invoices.file)

    try {
      const res = await fetch('/api/tax-form', { method: 'POST', body: fd })
      if (res.ok) setSubmitted(true)
      else throw new Error('Server error')
    } catch {
      alert('Something went wrong. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  /* ── Success screen ── */
  if (submitted) {
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
          <h1 className="success-title">Form submitted!</h1>
          <p className="success-body">Thank you {fullName.split(' ')[0]}. We've received your details and will be in touch shortly.</p>
        </div>
      </>
    )
  }

  const err = (k: string) => errors[k] ? <span className="err-msg">{errors[k]}</span> : null

  return (
    <>
      <style>{styles}</style>
      <div className="form-page">

        {/* Header */}
        <div className="form-header">
          <div className="form-header-dot" />
          <span className="form-header-label">Working Holiday Tax</span>
          <h1 className="form-title">Tax Return Form</h1>
          <p className="form-subtitle">
            Please complete all required fields (<span className="req-dot">*</span>). This helps us process your return quickly and accurately.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="form-body">

          {/* ── Section: Contact ── */}
          <div className="form-section">
            <div className="section-chip">Contact Details</div>

            <Field label="Phone Number" required>
              <input className={`inp ${errors.waNumber ? 'inp-err' : ''}`} type="tel" placeholder="+61 4XX XXX XXX"
                value={waNumber} onChange={e => { setWaNumber(e.target.value); setErrors(p => ({...p, waNumber: ''})) }} />
              {err('waNumber')}
            </Field>

            <Field label="Australian Phone Number" required>
              <input className={`inp ${errors.auPhone ? 'inp-err' : ''}`} type="tel" placeholder="04XX XXX XXX"
                value={auPhone} onChange={e => { setAuPhone(e.target.value); setErrors(p => ({...p, auPhone: ''})) }} />
              {err('auPhone')}
            </Field>

            <Field label="Full Name (including middle name)" required>
              <input className={`inp ${errors.fullName ? 'inp-err' : ''}`} type="text" placeholder="As it appears on passport"
                value={fullName} onChange={e => { setFullName(e.target.value); setErrors(p => ({...p, fullName: ''})) }} />
              {err('fullName')}
            </Field>

            <Field label="Email Address" required>
              <input className={`inp ${errors.email ? 'inp-err' : ''}`} type="email" placeholder="your@email.com"
                value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})) }} />
              {err('email')}
            </Field>

            <Field label="Full Address in Australia" required>
              <input className={`inp ${errors.address ? 'inp-err' : ''}`} type="text" placeholder="Street, suburb, state, postcode"
                value={address} onChange={e => { setAddress(e.target.value); setErrors(p => ({...p, address: ''})) }} />
              {err('address')}
            </Field>
          </div>

          {/* ── Section: Personal ── */}
          <div className="form-section">
            <div className="section-chip">Personal Information</div>

            <Field label="Home Country" required>
              <input className={`inp ${errors.country ? 'inp-err' : ''}`} type="text" placeholder="e.g. France"
                value={country} onChange={e => { setCountry(e.target.value); setErrors(p => ({...p, country: ''})) }} />
              {err('country')}
            </Field>

            <Field label="Date of Birth" required>
              <input className={`inp ${errors.dob ? 'inp-err' : ''}`} type="date"
                value={dob} onChange={e => { setDob(e.target.value); setErrors(p => ({...p, dob: ''})) }} />
              {err('dob')}
            </Field>

            <Field label="Marital Status" required>
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
              {err('marital')}
            </Field>
          </div>

          {/* ── Section: Tax ── */}
          <div className="form-section">
            <div className="section-chip">Tax Information</div>

            <Field label="Tax File Number (TFN)" required>
              <input className={`inp ${errors.tfn ? 'inp-err' : ''}`} type="text" placeholder="XXX XXX XXX" inputMode="numeric"
                value={tfn} onChange={e => { setTfn(e.target.value); setErrors(p => ({...p, tfn: ''})) }} />
              {err('tfn')}
            </Field>

            <Field label="Primary job in the past year" required>
              <input className={`inp ${errors.primaryJob ? 'inp-err' : ''}`} type="text" placeholder="e.g. Farm worker, Barista"
                value={primaryJob} onChange={e => { setPrimaryJob(e.target.value); setErrors(p => ({...p, primaryJob: ''})) }} />
              {err('primaryJob')}
            </Field>

            <Field label="Bank account details for tax refund" required>
              <input className={`inp ${errors.bankDetails ? 'inp-err' : ''}`} type="text" placeholder="Name, account number & BSB"
                value={bankDetails} onChange={e => { setBankDetails(e.target.value); setErrors(p => ({...p, bankDetails: ''})) }} />
              {err('bankDetails')}
            </Field>
          </div>

          {/* ── Section: Documents ── */}
          <div className="form-section">
            <div className="section-chip">Documents</div>

            <Field label="Bank statements (to verify name)" required>
              <FileUpload id="bankStatement" label="Upload bank statement" accept=".pdf,.jpg,.jpeg,.png"
                value={bankStatement} onChange={(v) => { setBankStatement(v); setErrors(p => ({...p, bankStatement: ''})) }} />
              {err('bankStatement')}
            </Field>

            <Field label="Selfie holding your passport" required>
              <FileUpload id="selfiePassport" label="Upload selfie + passport" accept=".jpg,.jpeg,.png"
                value={selfiePassport} onChange={(v) => { setSelfiePassport(v); setErrors(p => ({...p, selfiePassport: ''})) }} />
              {err('selfiePassport')}
            </Field>

            <Field label="Work-related expense invoices">
              <FileUpload id="invoices" label="Upload invoices" accept=".pdf,.jpg,.jpeg,.png"
                value={invoices} onChange={setInvoices} />
            </Field>
          </div>

          {/* ── Section: Declaration ── */}
          <div className="form-section">
            <div className="section-chip">Declaration</div>

            <Field label="I confirm I have reviewed all relevant ATO information and declare that I am:" required>
              <div className="radio-group radio-group-col">
                {([
                  { val: 'resident', label: 'Australian resident for tax purposes' },
                  { val: 'whm',      label: 'Working holiday maker for tax purposes' },
                ] as const).map(opt => (
                  <label key={opt.val} className={`radio-card ${taxStatus === opt.val ? 'radio-card-active' : ''}`}>
                    <input type="radio" name="taxStatus" value={opt.val} checked={taxStatus === opt.val}
                      onChange={() => { setTaxStatus(opt.val); setErrors(p => ({...p, taxStatus: ''})) }} className="hidden" />
                    <div className={`radio-dot ${taxStatus === opt.val ? 'radio-dot-active' : ''}`} />
                    {opt.label}
                  </label>
                ))}
              </div>
              {err('taxStatus')}
            </Field>

            <Field label="" required>
              <p style={{fontSize:'12px',color:'#587066',lineHeight:'1.7',marginBottom:'10px'}}>
                I declare that all information provided is true, complete, and accurate. I understand that providing false information may result in penalties under Australian tax law, and confirm that I have read and accept the{' '}
                <a href="/client-agreement" target="_blank" style={{color:'#0B5240',textDecoration:'underline'}}>Client Agreement</a>
                {' '}&amp;{' '}
                <a href="/privacy" target="_blank" style={{color:'#0B5240',textDecoration:'underline'}}>Privacy Policy</a>.
              </p>
              <div className="radio-group radio-group-col">
                {([
                  { val: 'yes', label: 'Yes, I agree' },
                  { val: 'no',  label: 'No' },
                ] as const).map(opt => (
                  <label key={opt.val} className={`radio-card ${declared === opt.val ? 'radio-card-active' : ''} ${opt.val === 'no' ? 'radio-card-no' : ''}`}>
                    <input type="radio" name="declared" value={opt.val} checked={declared === opt.val}
                      onChange={() => { setDeclared(opt.val); setErrors(p => ({...p, declared: ''})) }} className="hidden" />
                    <div className={`radio-dot ${declared === opt.val ? 'radio-dot-active' : ''}`} />
                    {opt.label}
                  </label>
                ))}
              </div>
              {err('declared')}
            </Field>
          </div>

          {/* ── Section: How heard ── */}
          <div className="form-section">
            <Field label="How did you hear about us?" required>
              <input className={`inp ${errors.howHeard ? 'inp-err' : ''}`} type="text" placeholder="e.g. Instagram, TikTok, friend..."
                value={howHeard} onChange={e => { setHowHeard(e.target.value); setErrors(p => ({...p, howHeard: ''})) }} />
              {err('howHeard')}
            </Field>
          </div>

          {/* Submit */}
          {Object.keys(errors).length > 0 && (
            <div className="errors-banner">Please fill in all required fields above.</div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="40" strokeDashoffset="10"/>
                </svg>
                Submitting…
              </span>
            ) : 'Submit Tax Return Form →'}
          </button>

          <p className="form-footer-note">Your information is encrypted and securely stored. We will never share your data with third parties.</p>

        </form>
      </div>
    </>
  )
}

/* ── Styles ── */
const styles = `
  .form-page {
    min-height: 100dvh;
    background: #F5F9F7;
    padding-bottom: 48px;
  }

  .form-header {
    background: #0B5240;
    padding: 52px 24px 36px;
    text-align: left;
  }

  .form-header-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #E9A020;
    margin-bottom: 10px;
    animation: pulse-dot 2.4s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%,100% { opacity:1; transform:scale(1); }
    50% { opacity:.5; transform:scale(.7); }
  }

  .form-header-label {
    display: block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    margin-bottom: 10px;
  }

  .form-title {
    font-family: var(--font-serif), Georgia, serif;
    font-size: 28px;
    font-weight: 900;
    color: #fff;
    line-height: 1.08;
    letter-spacing: -0.02em;
    margin: 0 0 10px;
  }

  .form-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.6);
    line-height: 1.6;
    margin: 0;
    max-width: 36ch;
  }

  .req-dot {
    color: #E9A020;
    margin-left: 2px;
    font-weight: 700;
  }

  .form-body {
    padding: 0 16px;
    margin-top: -1px;
  }

  .form-section {
    background: #fff;
    border-radius: 20px;
    border: 1px solid #E2EFE9;
    padding: 20px 16px;
    margin-top: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,.03), 0 2px 12px rgba(11,82,64,.04);
  }

  .section-chip {
    display: inline-flex;
    align-items: center;
    background: #EAF6F1;
    color: #0B5240;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 100px;
    margin-bottom: 18px;
  }

  .field-group {
    margin-bottom: 16px;
  }
  .field-group:last-child { margin-bottom: 0; }

  .field-label {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
    color: #1A2822;
    letter-spacing: -0.01em;
    margin-bottom: 7px;
    line-height: 1.4;
  }

  .inp {
    width: 100%;
    height: 48px;
    padding: 0 14px;
    font-size: 14px;
    font-family: var(--font-sans), sans-serif;
    color: #080F0D;
    background: #F5F9F7;
    border: 1.5px solid #C8EAE0;
    border-radius: 12px;
    outline: none;
    transition: border-color .15s, box-shadow .15s;
    -webkit-appearance: none;
  }
  .inp::placeholder { color: #8AADA3; }
  .inp:focus {
    border-color: #0B5240;
    box-shadow: 0 0 0 3px rgba(11,82,64,.08);
    background: #fff;
  }
  .inp-err {
    border-color: #ef4444 !important;
    background: #fff5f5 !important;
  }

  .err-msg {
    display: block;
    font-size: 11px;
    color: #ef4444;
    margin-top: 4px;
    font-weight: 500;
  }

  /* Radio cards */
  .radio-group {
    display: flex;
    gap: 10px;
  }
  .radio-group-col {
    flex-direction: column;
    gap: 8px;
  }

  .radio-card {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 14px;
    border: 1.5px solid #C8EAE0;
    border-radius: 12px;
    font-size: 13.5px;
    font-weight: 500;
    color: #2A3C34;
    cursor: pointer;
    background: #F5F9F7;
    transition: border-color .15s, background .15s;
  }
  .radio-card-active {
    border-color: #0B5240;
    background: #EAF6F1;
    color: #0B5240;
  }
  .radio-card-no { color: #587066; }

  .radio-dot {
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 2px solid #C8EAE0;
    flex-shrink: 0;
    transition: border-color .15s, background .15s;
    position: relative;
  }
  .radio-dot-active {
    border-color: #0B5240;
    background: #0B5240;
  }
  .radio-dot-active::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: #fff;
  }

  /* File upload */
  .file-zone {
    border: 1.5px dashed #C8EAE0;
    border-radius: 14px;
    background: #F5F9F7;
    overflow: hidden;
    cursor: pointer;
    transition: border-color .15s;
  }
  .file-zone:hover { border-color: #0B5240; }

  .file-empty {
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .file-upload-icon {
    width: 44px; height: 44px;
    border-radius: 12px;
    background: #EAF6F1;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 2px;
  }
  .file-upload-label {
    font-size: 13px;
    font-weight: 600;
    color: #1A2822;
  }
  .file-upload-sub {
    font-size: 11px;
    color: #8AADA3;
  }

  .file-selected {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
  }
  .file-img-preview {
    width: 48px; height: 48px;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
  }
  .file-icon-box {
    width: 48px; height: 48px;
    border-radius: 8px;
    background: #EAF6F1;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }
  .file-meta {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }
  .file-name {
    font-size: 12.5px;
    font-weight: 600;
    color: #080F0D;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .file-size {
    font-size: 11px;
    color: #8AADA3;
  }
  .file-remove {
    width: 30px; height: 30px;
    border-radius: 8px;
    background: #FEE2E2;
    color: #ef4444;
    display: flex; align-items: center; justify-content: center;
    border: none;
    cursor: pointer;
    flex-shrink: 0;
  }

  /* Errors banner */
  .errors-banner {
    background: #FFF5F5;
    border: 1px solid #FCA5A5;
    border-radius: 12px;
    padding: 12px 16px;
    font-size: 13px;
    color: #DC2626;
    font-weight: 500;
    margin-top: 16px;
  }

  /* Submit button */
  .submit-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    background: #0B5240;
    color: #fff;
    font-size: 15px;
    font-weight: 600;
    font-family: var(--font-sans), sans-serif;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    margin-top: 24px;
    letter-spacing: -0.01em;
    transition: opacity .15s, transform .1s;
    -webkit-tap-highlight-color: transparent;
  }
  .submit-btn:active { transform: scale(.98); opacity: .9; }
  .submit-btn:disabled { opacity: .6; cursor: not-allowed; }

  .btn-loading {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .spin {
    animation: spin .8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .form-footer-note {
    text-align: center;
    font-size: 11px;
    color: #8AADA3;
    margin-top: 14px;
    padding: 0 8px;
    line-height: 1.6;
  }

  /* Success */
  .form-success-wrap {
    min-height: 100dvh;
    background: #F5F9F7;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 28px;
    text-align: center;
  }
  .success-icon {
    width: 80px; height: 80px;
    border-radius: 50%;
    background: #EAF6F1;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
  }
  .success-title {
    font-family: var(--font-serif), Georgia, serif;
    font-size: 26px;
    font-weight: 900;
    color: #080F0D;
    letter-spacing: -0.02em;
    margin: 0 0 12px;
  }
  .success-body {
    font-size: 14px;
    color: #587066;
    line-height: 1.65;
    max-width: 30ch;
    margin: 0;
  }
`

'use client'

import { useState, useRef } from 'react'

/* ── Types ── */
type UploadState = { file: File | null; preview: string | null }
type MultiUploadState = { files: File[]; previews: (string | null)[] }

/* ── Field wrapper ── */
function Field({ label, required, children, error }: { label: string; required?: boolean; children: React.ReactNode; error?: string }) {
  return (
    <div style={{marginBottom:'14px'}}>
      <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#1A2822',marginBottom:'6px'}}>
        {label}
        {required && <span style={{color:'#0B5240',marginLeft:'3px'}}>*</span>}
      </label>
      {children}
      {error && <span className="err-msg">{error}</span>}
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

/* ── Multi File Upload (up to 15 files) ── */
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
              ? <img src={value.previews[i]!} alt="preview" className="file-img-preview" />
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
  const [invoices, setInvoices] = useState<MultiUploadState>({ files: [], previews: [] })

  // Declarations
  const [taxStatus, setTaxStatus]     = useState<'resident'|'whm'|''>('')
  const [declared, setDeclared]       = useState<'yes'|'no'|''>('')
  const [taxYear, setTaxYear]         = useState('2024-25')
  const [terms, setTerms]             = useState(false)
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
    if (!bankStatement.file)  e.bankStatement  = 'Required'
    if (!selfiePassport.file) e.selfiePassport = 'Required'
    if (!taxStatus)           e.taxStatus      = 'Required'
    if (!declared)            e.declared       = 'Required'
    if (declared === 'no')    e.declared       = 'You must agree to submit'
    if (!howHeard.trim())     e.howHeard       = 'Required'
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
    invoices.files.forEach((f, i) => fd.append(`invoices_${i}`, f))

    try {
      const res = await fetch('/api/tax-form', { method: 'POST', body: fd })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        if (res.status === 429) alert('Too many submissions. Please wait 15 minutes and try again.')
        else if (data?.error === 'invalid_file') alert(`File error: ${data.message || 'Please upload a valid image or PDF under 10MB.'}`)
        else alert('Something went wrong. Please try again or contact us directly.')
      }
    } catch {
      alert('Something went wrong. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  }

  /* ── Success screen ── */
  if (submitted) {
    const firstName = fullName.split(' ')[0]
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
          <h1 className="success-title">Thank you, {firstName}! 🎉</h1>
          <p className="success-body">We've received your details and will be in touch shortly via WhatsApp.</p>

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
            <div className="form-brand">Working Holiday Tax</div>
            <p className="form-eyebrow">WORKING HOLIDAY TAX</p>
          <h1 className="form-title">Tax Return Form</h1>
            <p className="form-intro">Please fill out the form in English exactly as it appears on your passport. We&apos;re here to help if you have any questions.</p>
          </div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-section-title">Contact details</div>
          <div>

            <Field label="Phone Number" required error={errors.waNumber}>
              <input className={`inp ${errors.waNumber ? 'inp-err' : ''}`} type="tel" placeholder="+61 4XX XXX XXX"
                value={waNumber} onChange={e => { setWaNumber(e.target.value); setErrors(p => ({...p, waNumber: ''})) }} />
              {err('waNumber')}
            </Field>

            <Field label="Australian Phone Number" required error={errors.auPhone}>
              <input className={`inp ${errors.auPhone ? 'inp-err' : ''}`} type="tel" placeholder="04XX XXX XXX"
                value={auPhone} onChange={e => { setAuPhone(e.target.value); setErrors(p => ({...p, auPhone: ''})) }} />
              {err('auPhone')}
            </Field>

            <Field label="Full Name (including middle name)" required error={errors.fullName}>
              <input className={`inp ${errors.fullName ? 'inp-err' : ''}`} type="text" placeholder="As it appears on passport"
                value={fullName} onChange={e => { setFullName(e.target.value); setErrors(p => ({...p, fullName: ''})) }} />
              {err('fullName')}
            </Field>

            <Field label="Email Address" required error={errors.email}>
              <input className={`inp ${errors.email ? 'inp-err' : ''}`} type="email" placeholder="your@email.com"
                value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})) }} />
              {err('email')}
            </Field>

            <Field label="Full Address in Australia" required error={errors.address}>
              <input className={`inp ${errors.address ? 'inp-err' : ''}`} type="text" placeholder="Street, suburb, state, postcode"
                value={address} onChange={e => { setAddress(e.target.value); setErrors(p => ({...p, address: ''})) }} />
              {err('address')}
            </Field>
          </div>

          <div className="form-section-title">Personal information</div>
          <div>

            <Field label="Home Country" required error={errors.country}>
              <input className={`inp ${errors.country ? 'inp-err' : ''}`} type="text" placeholder="e.g. France"
                value={country} onChange={e => { setCountry(e.target.value); setErrors(p => ({...p, country: ''})) }} />
              {err('country')}
            </Field>

            <Field label="Date of Birth" required error={errors.dob}>
              <input className={`inp ${errors.dob ? 'inp-err' : ''}`} type="date"
                value={dob} onChange={e => { setDob(e.target.value); setErrors(p => ({...p, dob: ''})) }} />
              {err('dob')}
            </Field>

            <Field label="Marital Status" required error={errors.marital}>
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

          <div className="form-section-title">Tax information</div>
          <div>

            <Field label="Tax File Number (TFN)" required error={errors.tfn}>
              <input className={`inp ${errors.tfn ? 'inp-err' : ''}`} type="text" placeholder="XXX XXX XXX" inputMode="numeric"
                value={tfn} onChange={e => { setTfn(e.target.value); setErrors(p => ({...p, tfn: ''})) }} />
              {err('tfn')}
            </Field>

            <Field label="Primary job in the past year" required error={errors.primaryJob}>
              <input className={`inp ${errors.primaryJob ? 'inp-err' : ''}`} type="text" placeholder="e.g. Farm worker, Barista"
                value={primaryJob} onChange={e => { setPrimaryJob(e.target.value); setErrors(p => ({...p, primaryJob: ''})) }} />
              {err('primaryJob')}
            </Field>

            <Field label="Bank account details for tax refund" required error={errors.bankDetails}>
              <input className={`inp ${errors.bankDetails ? 'inp-err' : ''}`} type="text" placeholder="Name, account number & BSB"
                value={bankDetails} onChange={e => { setBankDetails(e.target.value); setErrors(p => ({...p, bankDetails: ''})) }} />
              {err('bankDetails')}
            </Field>
          </div>

          <div className="form-section-title">Documents</div>
          <div>

            <Field label="Bank statements (to verify name)" required error={errors.bankStatement}>
              <FileUpload id="bankStatement" label="Upload bank statement" accept=".pdf,.jpg,.jpeg,.png"
                value={bankStatement} onChange={(v) => { setBankStatement(v); setErrors(p => ({...p, bankStatement: ''})) }} />
              {err('bankStatement')}
            </Field>

            <Field label="Selfie holding your passport" required error={errors.selfiePassport}>
              <FileUpload id="selfiePassport" label="Upload selfie + passport" accept=".jpg,.jpeg,.png,.pdf"
                value={selfiePassport} onChange={(v) => { setSelfiePassport(v); setErrors(p => ({...p, selfiePassport: ''})) }} />
              {err('selfiePassport')}
            </Field>

            <Field label="Work-related expense invoices">
              <MultiFileUpload id="invoices" label="Upload invoices" accept=".pdf,.jpg,.jpeg,.png"
                value={invoices} onChange={setInvoices} maxFiles={15} />
            </Field>
          </div>

          <div className="form-section-title">Declaration</div>
          <div>

            <Field label="" required error={errors.taxStatus}>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#1A2822',marginBottom:'10px'}}>
                I confirm that I have reviewed the{' '}
                <a href="/tax-residency" target="_blank" style={{color:'#0B5240',textDecoration:'underline'}}>Tax Residency Explained</a>
                {' '}section and all relevant ATO information, and I declare that I am:<span style={{color:'#0B5240',marginLeft:'3px'}}>*</span>
              </label>
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
            </Field>

            <Field label="" required error={errors.declared}>
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
                  <label key={opt.val} className={`radio-card ${declared === opt.val ? 'radio-card-active' : ''}`}>
                    <input type="radio" name="declared" value={opt.val} checked={declared === opt.val}
                      onChange={() => { setDeclared(opt.val); setErrors(p => ({...p, declared: ''})) }} className="hidden" />
                    <div className={`radio-dot ${declared === opt.val ? 'radio-dot-active' : ''}`} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Field>
          </div>

          <div className="form-section-title">How did you hear about us?</div>
          <div>
            <Field label="How did you hear about us?" required error={errors.howHeard}>
              <input className={`inp ${errors.howHeard ? 'inp-err' : ''}`} type="text" placeholder="e.g. Instagram, TikTok, friend..."
                value={howHeard} onChange={e => { setHowHeard(e.target.value); setErrors(p => ({...p, howHeard: ''})) }} />
            </Field>
          </div>

          {Object.values(errors).some(v => v) && (
            <div className="errors-banner">
              <strong>Please fix the following before submitting:</strong>
              <ul style={{margin:'6px 0 0',paddingLeft:'18px'}}>
                {(Object.entries(errors) as [string, string][]).filter(([,v]) => v).map(([k, v]) => (
                  <li key={k} style={{fontSize:'12px',marginBottom:'2px'}}>{v === 'Required' ? `${({
                    waNumber:'Phone Number',auPhone:'Australian Phone',fullName:'Full Name',
                    email:'Email Address',address:'Australian Address',country:'Home Country',
                    dob:'Date of Birth',marital:'Marital Status',tfn:'TFN',
                    primaryJob:'Primary Job',bankDetails:'Bank Details',
                    bankStatement:'Bank Statement',selfiePassport:'Selfie with Passport',
                    taxStatus:'Tax Residency Status',declared:'Declaration',howHeard:'How did you hear about us'
                  } as Record<string,string>)[k] || k} is required` : v}</li>
                ))}
              </ul>
            </div>
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

          <p className="form-footer-note">Working Holiday Tax · Your information is kept secure and private</p>

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
  .form-header { background: #fff; padding: 32px 24px 24px; text-align: center; border-bottom: 1px solid #EAF6F1; }
  .form-brand { font-size: 11px; font-weight: 600; color: #0B5240; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 10px; }
  .form-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.16em; color: rgba(11,82,64,0.65); text-transform: uppercase; margin-bottom: 8px; }
  .form-title { font-size: 24px; font-weight: 800; color: #080F0D; letter-spacing: -0.02em; margin-bottom: 10px; }
  .form-intro { font-size: 13px; color: #587066; line-height: 1.65; max-width: 30ch; margin-left: auto; margin-right: auto; }
  form { padding: 20px 24px 32px; }
  .form-section-title { font-size: 11px; font-weight: 700; color: #0B5240; text-transform: uppercase; letter-spacing: 0.06em; margin: 20px 0 12px; border-bottom: 1px solid #EAF6F1; padding-bottom: 8px; }
  .field-group { margin-bottom: 14px; }
  .field-label { display: block; font-size: 13px; font-weight: 600; color: #1A2822; margin-bottom: 6px; }
  .req-dot { color: #0B5240; margin-left: 3px; }
  .field-error { display: block; font-size: 11px; color: #DC2626; margin-top: 4px; }
  .inp { display: block; width: 100%; padding: 12px 14px; font-size: 14px; font-family: inherit; color: #080F0D; background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 12px; outline: none; transition: border-color .15s; -webkit-appearance: none; }
  .inp:focus { border-color: #0B5240; background: #fff; }
  .inp-err { border-color: #FCA5A5 !important; background: #FFF5F5 !important; }
  .form-textarea { min-height: 80px; resize: vertical; }
  .radio-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .radio-group-col { flex-direction: column; }
  .radio-card { display: inline-flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px; border: 1.5px solid #D4EAE2; font-size: 13px; font-weight: 500; color: #587066; cursor: pointer; transition: all .15s; background: #F5F9F7; width: 100%; }
  .radio-card-active { background: #EAF6F1; border-color: #0B5240; color: #0B5240; font-weight: 600; }
  .radio-card-no { }
  .radio-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #C8EAE0; flex-shrink: 0; transition: all .15s; background: #fff; }
  .radio-dot-active { border-color: #0B5240; background: #0B5240; }
  .declaration-box { background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 14px; padding: 16px; }
  .decl-text { font-size: 12px; color: #587066; line-height: 1.7; margin-bottom: 12px; }
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
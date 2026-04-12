'use client'

import { useState, useRef } from 'react'

type UploadState = { file: File | null; preview: string | null }
type MultiUploadState = { files: File[]; previews: (string | null)[] }

function Field({ label, required, children, error }: {
  label: string; required?: boolean; children: React.ReactNode; error?: string
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A2822', marginBottom: 6 }}>
        {label}{required && <span style={{ color: '#0B5240', marginLeft: 3 }}>*</span>}
      </label>
      {children}
      {error && <span style={{ display: 'block', fontSize: 11, color: '#DC2626', marginTop: 4 }}>{error}</span>}
    </div>
  )
}

function FileUpload({ id, label, accept, value, onChange }: {
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
            : <div className="file-icon-box">📄</div>}
          <div className="file-meta">
            <span className="file-name">{value.file.name}</span>
            <span className="file-size">{(value.file.size / 1024).toFixed(0)} KB</span>
          </div>
          <button type="button" className="file-remove" onClick={e => { e.stopPropagation(); handleRemove() }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="file-empty">
          <div className="file-upload-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V8M8 12l4-4 4 4" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="#C8EAE0" strokeWidth="1.2" />
            </svg>
          </div>
          <span className="file-upload-label">{label}</span>
          <span className="file-upload-sub">Tap to choose a file</span>
        </div>
      )}
    </div>
  )
}

function MultiFileUpload({ id, label, accept, value, onChange, maxFiles = 10 }: {
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
    onChange({ files: [...value.files, ...toAdd], previews: [...value.previews, ...newPreviews] })
    if (inputRef.current) inputRef.current.value = ''
  }
  const handleRemove = (i: number) => {
    const p = value.previews[i]
    if (p) URL.revokeObjectURL(p)
    onChange({ files: value.files.filter((_, idx) => idx !== i), previews: value.previews.filter((_, idx) => idx !== i) })
  }
  const canAdd = value.files.length < maxFiles
  return (
    <div>
      {value.files.map((f, i) => (
        <div key={i} className="file-zone" style={{ marginBottom: 8, cursor: 'default' }}>
          <div className="file-selected">
            {value.previews[i]
              ? <img src={value.previews[i]!} alt="preview" className="file-img-preview" />
              : <div className="file-icon-box">📄</div>}
            <div className="file-meta">
              <span className="file-name">{f.name}</span>
              <span className="file-size">{(f.size / 1024).toFixed(0)} KB</span>
            </div>
            <button type="button" className="file-remove" onClick={() => handleRemove(i)}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      {canAdd && (
        <div className="file-zone" onClick={() => inputRef.current?.click()} style={{ cursor: 'pointer' }}>
          <input ref={inputRef} id={id} type="file" accept={accept} multiple className="hidden" onChange={handleChange} />
          <div className="file-empty">
            <div className="file-upload-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 16V8M8 12l4-4 4 4" stroke="#0B5240" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="#C8EAE0" strokeWidth="1.2" />
              </svg>
            </div>
            <span className="file-upload-label">{label}</span>
            <span className="file-upload-sub">
              {value.files.length === 0 ? `Tap to add files (max ${maxFiles})` : `Add more (${value.files.length}/${maxFiles})`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function TaxFormPage() {
  // Personal
  const [waNumber, setWaNumber]   = useState('')
  const [auPhone, setAuPhone]     = useState('')
  const [fullName, setFullName]   = useState('')
  const [lastName, setLastName]   = useState('')
  const [email, setEmail]         = useState('')
  const [address, setAddress]     = useState('')
  const [country, setCountry]     = useState('')
  const [dob, setDob]             = useState('')
  const [marital, setMarital]     = useState<'Single' | 'Married' | ''>('')
  const [tfn, setTfn]             = useState('')
  const [primaryJob, setPrimaryJob] = useState('')
  // Bank
  const [bankName, setBankName]       = useState('')
  const [bankHolder, setBankHolder]   = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [bankBsb, setBankBsb]         = useState('')
  // Files
  const [selfiePassport, setSelfiePassport] = useState<UploadState>({ file: null, preview: null })
  const [bankStatement, setBankStatement]   = useState<UploadState>({ file: null, preview: null })
  const [invoices, setInvoices]             = useState<MultiUploadState>({ files: [], previews: [] })
  // ABN
  const [hasAbn, setHasAbn]           = useState<'yes' | 'no' | ''>('')
  const [abnNumber, setAbnNumber]     = useState('')
  const [abnIncome, setAbnIncome]     = useState('')
  const [abnInvoices, setAbnInvoices] = useState<MultiUploadState>({ files: [], previews: [] })
  // Declarations
  const [taxStatus, setTaxStatus]     = useState<'resident' | 'whm' | ''>('')
  const [declared, setDeclared]       = useState(false)
  const [declaredIncome, setDeclaredIncome] = useState(false)
  const [taxYear, setTaxYear]         = useState('2024-25')
  const [howHeard, setHowHeard]       = useState('')
  // UI
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [errors, setErrors]       = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!waNumber.trim())    e.waNumber    = 'Required'
    if (!auPhone.trim())     e.auPhone     = 'Required'
    if (!fullName.trim())    e.fullName    = 'Required'
    if (!lastName.trim())    e.lastName    = 'Required'
    if (!email.trim())       e.email       = 'Required'
    if (!address.trim())     e.address     = 'Required'
    if (!country.trim())     e.country     = 'Required'
    if (!dob.trim())         e.dob         = 'Required'
    if (!marital)            e.marital     = 'Required'
    if (!tfn.trim())         e.tfn         = 'Required'
    if (!primaryJob.trim())  e.primaryJob  = 'Required'
    if (!hasAbn)             e.hasAbn      = 'Required'
    if (hasAbn === 'yes') {
      if (!abnNumber.trim()) e.abnNumber   = 'Required'
      if (!abnIncome.trim()) e.abnIncome   = 'Required'
    }
    if (!bankName.trim())    e.bankName    = 'Required'
    if (!bankHolder.trim())  e.bankHolder  = 'Required'
    if (!bankAccount.trim()) e.bankAccount = 'Required'
    if (!bankBsb.trim())     e.bankBsb     = 'Required'
    if (!selfiePassport.file) e.selfiePassport = 'Required'
    if (!bankStatement.file)  e.bankStatement  = 'Required'
    if (!taxStatus)           e.taxStatus      = 'Required'
    if (!declared)            e.declared       = 'You must confirm this declaration'
    if (!declaredIncome)      e.declaredIncome = 'You must confirm this declaration'
    if (!howHeard.trim())     e.howHeard       = 'Required'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)

    try {
      // Upload selfie — one file, one request (same pattern as TFN form)
      const fdSelfie = new FormData()
      fdSelfie.append('selfiePassport', selfiePassport.file!)
      const selfieRes = await fetch('/api/tax-form', { method: 'POST', body: fdSelfie })
      if (!selfieRes.ok) {
        const d = await selfieRes.json().catch(() => ({}))
        if (selfieRes.status === 429) { alert('Too many submissions. Please wait 15 minutes.'); return }
        alert(`Selfie upload failed: ${d.message || 'Please upload a valid photo and try again.'}`)
        return
      }
      const { url: selfieUrl } = await selfieRes.json()

      // Upload bank statement — one file, one request
      const fdBank = new FormData()
      fdBank.append('file', bankStatement.file!)
      const bankRes = await fetch('/api/tax-form/invoice-upload', { method: 'POST', body: fdBank })
      if (!bankRes.ok) {
        const d = await bankRes.json().catch(() => ({}))
        alert(`Bank statement upload failed: ${d.message || 'Please upload a valid photo or PDF and try again.'}`)
        return
      }
      const { url: bankUrl } = await bankRes.json()

      // Upload invoices one by one
      const allInvoiceFiles = [...invoices.files, ...abnInvoices.files]
      const invoiceUrls: string[] = []
      for (const f of allInvoiceFiles) {
        const fdi = new FormData()
        fdi.append('file', f)
        const r = await fetch('/api/tax-form/invoice-upload', { method: 'POST', body: fdi })
        if (!r.ok) {
          const d = await r.json().catch(() => ({}))
          alert(`Failed to upload "${f.name}": ${d.message || 'Please try again.'}`)
          return
        }
        const { url } = await r.json()
        if (url) invoiceUrls.push(url)
      }

      // Finalize — send all text fields + file URLs (no files, tiny request)
      const allFileUrls = [
        ...(selfieUrl ? [selfieUrl] : []),
        ...(bankUrl   ? [bankUrl]   : []),
        ...invoiceUrls,
      ]
      const fdFinal = new FormData()
      fdFinal.append('waNumber',       waNumber)
      fdFinal.append('auPhone',        auPhone)
      fdFinal.append('fullName',       `${fullName} ${lastName}`.trim())
      fdFinal.append('email',          email)
      fdFinal.append('address',        address)
      fdFinal.append('country',        country)
      fdFinal.append('dob',            dob)
      fdFinal.append('marital',        marital)
      fdFinal.append('tfn',            tfn)
      fdFinal.append('primaryJob',     primaryJob)
      fdFinal.append('hasAbn',         hasAbn === 'yes' ? 'Yes' : 'No')
      if (hasAbn === 'yes') {
        fdFinal.append('abnNumber', abnNumber)
        fdFinal.append('abnIncome', abnIncome)
      }
      fdFinal.append('bankDetails',    `Bank: ${bankName} | Name: ${bankHolder} | Account: ${bankAccount} | BSB: ${bankBsb}`)
      fdFinal.append('taxStatus',      taxStatus === 'resident' ? 'Australian resident for tax purposes' : 'Working holiday maker for tax purposes')
      fdFinal.append('taxYear',        taxYear)
      fdFinal.append('howHeard',       howHeard)
      fdFinal.append('declared',       declared ? '✓ I declare that all information provided is true, complete, and accurate. I understand that providing false information may result in penalties under Australian tax law, and confirm that I have read and accept the Client Agreement & Privacy Policy.' : '')
      fdFinal.append('declaredIncome', declaredIncome ? '✓ I declare under my full legal responsibility that all income earned in Australia and abroad during the relevant tax year has been truthfully and completely disclosed.' : '')
      fdFinal.append('invoiceUrls',    JSON.stringify(allFileUrls))

      const finalRes = await fetch('/api/tax-form/finalize', { method: 'POST', body: fdFinal })
      if (finalRes.ok) {
        window.scrollTo({ top: 0, behavior: 'instant' }); setSubmitted(true)
      } else {
        alert('Something went wrong saving your submission. Please try again.')
      }
    } catch {
      alert('Something went wrong. Please try again or contact us directly.')
    } finally {
      setLoading(false)
    }
  if (submitted) {
    const firstName = fullName.split(' ')[0]
    return (
      <>
        <style>{styles}</style>
        <div className="form-success-wrap">
          <div className="success-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="#0B5240" strokeWidth="1.5" />
              <path d="M12 20l6 6 10-12" stroke="#0B5240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="success-title">Thank you, {firstName}! 🎉</h1>
          <p className="success-body">We've received your details and will be in touch shortly.</p>
          <a href="https://wa.me/61424513998" target="_blank" rel="noopener noreferrer" className="success-wa-btn">
            Message us on WhatsApp
          </a>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{styles}</style>
      <div className="form-page-wrap">
        <div className="form-card">
          <div className="form-header">
            <div className="form-brand">Working Holiday Tax</div>
            <h1 className="form-title">Tax Return Form</h1>
            <p className="form-intro">Please fill out the form in English exactly as it appears on your passport.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>

            <div className="section-title">Contact details</div>
            <Field label="WhatsApp Number" required error={errors.waNumber}>
              <input className={`inp${errors.waNumber ? ' inp-err' : ''}`} type="tel" placeholder="+61 4XX XXX XXX"
                value={waNumber} onChange={e => { setWaNumber(e.target.value); setErrors(p => ({ ...p, waNumber: '' })) }} />
            </Field>
            <Field label="Australian Phone Number" required error={errors.auPhone}>
              <input className={`inp${errors.auPhone ? ' inp-err' : ''}`} type="tel" placeholder="04XX XXX XXX"
                value={auPhone} onChange={e => { setAuPhone(e.target.value); setErrors(p => ({ ...p, auPhone: '' })) }} />
            </Field>
            <Field label="First name (including middle name)" required error={errors.fullName}>
              <input className={`inp${errors.fullName ? ' inp-err' : ''}`} type="text" placeholder="As it appears on passport"
                value={fullName} onChange={e => { setFullName(e.target.value); setErrors(p => ({ ...p, fullName: '' })) }} />
            </Field>
            <Field label="Last name" required error={errors.lastName}>
              <input className={`inp${errors.lastName ? ' inp-err' : ''}`} type="text" placeholder="e.g. Smith"
                value={lastName} onChange={e => { setLastName(e.target.value); setErrors(p => ({ ...p, lastName: '' })) }} />
            </Field>
            <Field label="Email Address" required error={errors.email}>
              <input className={`inp${errors.email ? ' inp-err' : ''}`} type="email" placeholder="your@email.com"
                value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })) }} />
            </Field>
            <Field label="Full Australian address" required error={errors.address}>
              <input className={`inp${errors.address ? ' inp-err' : ''}`} type="text" placeholder="Street, suburb, state, postcode"
                value={address} onChange={e => { setAddress(e.target.value); setErrors(p => ({ ...p, address: '' })) }} />
            </Field>

            <div className="section-title">Personal information</div>
            <Field label="Home Country" required error={errors.country}>
              <input className={`inp${errors.country ? ' inp-err' : ''}`} type="text" placeholder="e.g. France"
                value={country} onChange={e => { setCountry(e.target.value); setErrors(p => ({ ...p, country: '' })) }} />
            </Field>
            <Field label="Date of Birth" required error={errors.dob}>
              <input className={`inp${errors.dob ? ' inp-err' : ''}`} type="date"
                value={dob} onChange={e => { setDob(e.target.value); setErrors(p => ({ ...p, dob: '' })) }} />
            </Field>
            <Field label="Marital Status" required error={errors.marital}>
              <div className="radio-group">
                {(['Single', 'Married'] as const).map(opt => (
                  <label key={opt} className={`radio-card${marital === opt ? ' radio-card-active' : ''}`}>
                    <input type="radio" name="marital" value={opt} checked={marital === opt}
                      onChange={() => { setMarital(opt); setErrors(p => ({ ...p, marital: '' })) }} className="hidden" />
                    <div className={`radio-dot${marital === opt ? ' radio-dot-active' : ''}`} />
                    {opt}
                  </label>
                ))}
              </div>
            </Field>

            <div className="section-title">Tax information</div>
            <Field label="Tax File Number (TFN)" required error={errors.tfn}>
              <input className={`inp${errors.tfn ? ' inp-err' : ''}`} type="text" placeholder="XXX XXX XXX" inputMode="numeric"
                value={tfn} onChange={e => { setTfn(e.target.value); setErrors(p => ({ ...p, tfn: '' })) }} />
            </Field>
            <Field label="Primary job in the past year" required error={errors.primaryJob}>
              <input className={`inp${errors.primaryJob ? ' inp-err' : ''}`} type="text" placeholder="e.g. Farm worker, Barista"
                value={primaryJob} onChange={e => { setPrimaryJob(e.target.value); setErrors(p => ({ ...p, primaryJob: '' })) }} />
            </Field>

            <div className="section-title">ABN (Australian Business Number)</div>
            <Field label="Do you have an ABN?" required error={errors.hasAbn}>
              <div className="radio-group">
                {([{ val: 'no' as const, label: 'No' }, { val: 'yes' as const, label: 'Yes' }]).map(opt => (
                  <label key={opt.val} className={`radio-card${hasAbn === opt.val ? ' radio-card-active' : ''}`}>
                    <input type="radio" name="hasAbn" value={opt.val} checked={hasAbn === opt.val}
                      onChange={() => { setHasAbn(opt.val); setErrors(p => ({ ...p, hasAbn: '' })) }} className="hidden" />
                    <div className={`radio-dot${hasAbn === opt.val ? ' radio-dot-active' : ''}`} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Field>
            {hasAbn === 'yes' && (<>
              <Field label="ABN number" required error={errors.abnNumber}>
                <input className={`inp${errors.abnNumber ? ' inp-err' : ''}`} type="text" placeholder="e.g. 12 345 678 901" inputMode="numeric"
                  value={abnNumber} onChange={e => { setAbnNumber(e.target.value); setErrors(p => ({ ...p, abnNumber: '' })) }} />
              </Field>
              <Field label="Total annual income under ABN (AUD)" required error={errors.abnIncome}>
                <input className={`inp${errors.abnIncome ? ' inp-err' : ''}`} type="text" placeholder="e.g. 15,000" inputMode="numeric"
                  value={abnIncome} onChange={e => { setAbnIncome(e.target.value); setErrors(p => ({ ...p, abnIncome: '' })) }} />
              </Field>
              <Field label="Business expense invoices (up to 10)">
                <MultiFileUpload id="abnInvoices" label="Upload expense invoices"
                  accept=".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf" maxFiles={10}
                  value={abnInvoices} onChange={setAbnInvoices} />
              </Field>
            </>)}

            <div className="section-title">Bank account details</div>
            <Field label="Bank name" required error={errors.bankName}>
              <input className={`inp${errors.bankName ? ' inp-err' : ''}`} type="text" placeholder="e.g. Commonwealth Bank"
                value={bankName} onChange={e => { setBankName(e.target.value); setErrors(p => ({ ...p, bankName: '' })) }} />
            </Field>
            <Field label="Account holder full name" required error={errors.bankHolder}>
              <input className={`inp${errors.bankHolder ? ' inp-err' : ''}`} type="text" placeholder="As it appears on the bank account"
                value={bankHolder} onChange={e => { setBankHolder(e.target.value); setErrors(p => ({ ...p, bankHolder: '' })) }} />
            </Field>
            <Field label="Account number" required error={errors.bankAccount}>
              <input className={`inp${errors.bankAccount ? ' inp-err' : ''}`} type="text" placeholder="e.g. 12345678"
                value={bankAccount} onChange={e => { setBankAccount(e.target.value); setErrors(p => ({ ...p, bankAccount: '' })) }} />
            </Field>
            <Field label="BSB" required error={errors.bankBsb}>
              <input className={`inp${errors.bankBsb ? ' inp-err' : ''}`} type="text" placeholder="e.g. 062-000"
                value={bankBsb} onChange={e => { setBankBsb(e.target.value); setErrors(p => ({ ...p, bankBsb: '' })) }} />
            </Field>

            <div className="section-title">Documents</div>
            <Field label="Selfie holding your passport" required error={errors.selfiePassport}>
              <FileUpload id="selfiePassport" label="Upload selfie + passport"
                accept=".jpg,.jpeg,.png,.heic,.heif,.webp,.pdf"
                value={selfiePassport} onChange={v => { setSelfiePassport(v); setErrors(p => ({ ...p, selfiePassport: '' })) }} />
            </Field>
            <Field label="Bank statement (to verify name)" required error={errors.bankStatement}>
              <FileUpload id="bankStatement" label="Upload bank statement"
                accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp"
                value={bankStatement} onChange={v => { setBankStatement(v); setErrors(p => ({ ...p, bankStatement: '' })) }} />
            </Field>
            <Field label="Work-related expense invoices (up to 10)">
              <MultiFileUpload id="invoices" label="Upload invoices"
                accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif"
                value={invoices} onChange={setInvoices} maxFiles={10} />
            </Field>

            <div className="section-title">Declaration</div>
            <Field label="" required error={errors.taxStatus}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#1A2822', marginBottom: 10 }}>
                I declare that I am:<span style={{ color: '#0B5240', marginLeft: 3 }}>*</span>
              </label>
              <div className="radio-group" style={{ flexDirection: 'column' }}>
                {([
                  { val: 'resident' as const, label: 'Australian resident for tax purposes' },
                  { val: 'whm' as const,      label: 'Working holiday maker for tax purposes' },
                ]).map(opt => (
                  <label key={opt.val} className={`radio-card${taxStatus === opt.val ? ' radio-card-active' : ''}`}>
                    <input type="radio" name="taxStatus" value={opt.val} checked={taxStatus === opt.val}
                      onChange={() => { setTaxStatus(opt.val); setErrors(p => ({ ...p, taxStatus: '' })) }} className="hidden" />
                    <div className={`radio-dot${taxStatus === opt.val ? ' radio-dot-active' : ''}`} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Field>

            <Field label="" required error={errors.declared}>
              <div className={`decl-box${errors.declared ? ' decl-err' : ''}`}>
                <p className="decl-text">
                  I declare that all information provided is true, complete, and accurate. I understand that providing false
                  information may result in penalties under Australian tax law, and confirm that I have read and accept the{' '}
                  <a href="/client-agreement" target="_blank" style={{ color: '#0B5240' }}>Client Agreement</a> &amp;{' '}
                  <a href="/privacy" target="_blank" style={{ color: '#0B5240' }}>Privacy Policy</a>.
                </p>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={declared} onChange={e => { setDeclared(e.target.checked); setErrors(p => ({ ...p, declared: '' })) }} className="hidden" />
                  <div className={`check-box${declared ? ' checked' : ''}`}>
                    {declared && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <span style={{ fontSize: 13, color: '#1A2822', fontWeight: 500 }}>I confirm this declaration</span>
                </label>
              </div>
            </Field>

            <Field label="" required error={errors.declaredIncome}>
              <div className={`decl-box${errors.declaredIncome ? ' decl-err' : ''}`}>
                <p className="decl-text">
                  I declare under my full legal responsibility that all income earned in Australia and abroad during the relevant
                  tax year has been truthfully and completely disclosed.
                </p>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={declaredIncome} onChange={e => { setDeclaredIncome(e.target.checked); setErrors(p => ({ ...p, declaredIncome: '' })) }} className="hidden" />
                  <div className={`check-box${declaredIncome ? ' checked' : ''}`}>
                    {declaredIncome && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                  <span style={{ fontSize: 13, color: '#1A2822', fontWeight: 500 }}>I confirm this declaration</span>
                </label>
              </div>
            </Field>

            <div className="section-title">How did you hear about us?</div>
            <Field label="How did you hear about us?" required error={errors.howHeard}>
              <input className={`inp${errors.howHeard ? ' inp-err' : ''}`} type="text" placeholder="e.g. Instagram, TikTok, friend..."
                value={howHeard} onChange={e => { setHowHeard(e.target.value); setErrors(p => ({ ...p, howHeard: '' })) }} />
            </Field>

            {Object.values(errors).some(v => v) && (
              <div className="errors-banner">
                <strong>Please fix the errors above before submitting.</strong>
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="40" strokeDashoffset="10" />
                  </svg>
                  Submitting…
                </span>
              ) : 'Submit Tax Return Form →'}
            </button>
            <p style={{ textAlign: 'center', fontSize: 11, color: '#8AADA3', marginTop: 14 }}>Your information is kept secure and private.</p>

          </form>
        </div>
      </div>
    </>
  )
}

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .hidden { display: none !important; }
  .form-page-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; padding: 100px 16px 60px; }
  .form-card { width: 100%; max-width: 480px; background: #fff; border-radius: 24px; box-shadow: 0 2px 24px rgba(11,82,64,0.07); overflow: hidden; }
  .form-header { background: #fff; padding: 32px 24px 24px; text-align: center; border-bottom: 1px solid #EAF6F1; }
  .form-brand { font-size: 11px; font-weight: 600; color: #0B5240; letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 10px; }
  .form-title { font-size: 24px; font-weight: 800; color: #080F0D; letter-spacing: -0.02em; margin-bottom: 10px; }
  .form-intro { font-size: 13px; color: #587066; line-height: 1.65; }
  form { padding: 20px 24px 32px; }
  .section-title { font-size: 11px; font-weight: 700; color: #0B5240; text-transform: uppercase; letter-spacing: 0.06em; margin: 20px 0 12px; border-bottom: 1px solid #EAF6F1; padding-bottom: 8px; }
  .inp { display: block; width: 100%; padding: 12px 14px; font-size: 14px; font-family: inherit; color: #080F0D; background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 12px; outline: none; transition: border-color .15s; -webkit-appearance: none; }
  .inp:focus { border-color: #0B5240; background: #fff; }
  .inp-err { border-color: #FCA5A5 !important; background: #FFF5F5 !important; }
  .radio-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .radio-card { display: inline-flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 12px; border: 1.5px solid #D4EAE2; font-size: 13px; font-weight: 500; color: #587066; cursor: pointer; background: #F5F9F7; width: 100%; }
  .radio-card-active { background: #EAF6F1; border-color: #0B5240; color: #0B5240; font-weight: 600; }
  .radio-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #C8EAE0; flex-shrink: 0; background: #fff; }
  .radio-dot-active { border-color: #0B5240; background: #0B5240; }
  .decl-box { background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 14px; padding: 16px; }
  .decl-err { border-color: #FCA5A5 !important; }
  .decl-text { font-size: 12px; color: #587066; line-height: 1.7; }
  .check-box { width: 20px; height: 20px; border-radius: 6px; border: 2px solid #D4EAE2; background: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .check-box.checked { background: #0B5240; border-color: #0B5240; }
  .file-zone { border: 1.5px dashed #C8EAE0; border-radius: 14px; background: #F5F9F7; overflow: hidden; cursor: pointer; }
  .file-zone:hover { border-color: #0B5240; }
  .file-empty { padding: 20px 16px; display: flex; flex-direction: column; align-items: center; gap: 6px; }
  .file-upload-icon { width: 44px; height: 44px; border-radius: 12px; background: #EAF6F1; display: flex; align-items: center; justify-content: center; }
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
  .submit-btn { display: flex; align-items: center; justify-content: center; width: 100%; height: 56px; background: #0B5240; color: #fff; font-size: 15px; font-weight: 600; font-family: inherit; border: none; border-radius: 100px; cursor: pointer; margin-top: 24px; }
  .submit-btn:disabled { opacity: .6; cursor: not-allowed; }
  .spin { animation: spin .8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .form-success-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 28px; text-align: center; }
  .success-icon { width: 80px; height: 80px; border-radius: 50%; background: #EAF6F1; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
  .success-title { font-size: 26px; font-weight: 900; color: #080F0D; margin: 0 0 10px; }
  .success-body { font-size: 14px; color: #587066; line-height: 1.65; margin: 0 0 24px; }
  .success-wa-btn { display: inline-flex; align-items: center; gap: 8px; background: #22C55E; color: #fff; font-size: 14px; font-weight: 600; padding: 13px 26px; border-radius: 100px; text-decoration: none; }
`

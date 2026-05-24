'use client'

import { useState, useRef } from 'react'
import { WA_URL } from '@/lib/constants'

/* ── Types ── */
type UploadState = { file: File | null; preview: string | null }
type MultiUploadState = { files: File[]; previews: (string | null)[] }
// `id` is a stable identifier used as React key — using array index as key causes
// state shuffling when items in the middle are removed.
type InvoiceItem = { id: string; amount: string; description: string; file: File | null; preview: string | null }

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
          <span className="file-upload-sub">Tap to choose a file</span>
        </div>
      )}
    </div>
  )
}

/* ── Multi File Upload (up to 15 files) ── */
function InvoiceManager({
  label, invoices, onChange, maxItems = 10
}: {
  label: string
  invoices: InvoiceItem[]
  onChange: (items: InvoiceItem[]) => void
  maxItems?: number
}) {
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const addInvoice = () => {
    if (invoices.length >= maxItems) return
    // Stable unique id so React's diff key doesn't drift when middle rows are removed
    const id = `inv-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    onChange([...invoices, { id, amount: '', description: '', file: null, preview: null }])
  }

  const removeInvoice = (i: number) => {
    const inv = invoices[i]
    if (inv.preview) URL.revokeObjectURL(inv.preview)
    onChange(invoices.filter((_, idx) => idx !== i))
  }

  const updateInvoice = (i: number, patch: Partial<InvoiceItem>) => {
    onChange(invoices.map((inv, idx) => idx === i ? { ...inv, ...patch } : inv))
  }

  const handleFile = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const oldPreview = invoices[i].preview
    if (oldPreview) URL.revokeObjectURL(oldPreview)
    const preview = file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    updateInvoice(i, { file, preview })
  }

  const total = invoices.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0)

  return (
    <div style={{ marginTop: 10 }}>
      <div style={{ background: '#EAF6F1', border: '1.5px solid #A7D9C5', borderRadius: 12, padding: '10px 14px', marginBottom: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
        <span style={{ color: '#0B5240', fontWeight: 600 }}>📋 {label}</span>
        {invoices.length > 0 && (
          <span style={{ color: '#0B5240', fontWeight: 700 }}>${total.toFixed(2)} ({invoices.length}/{maxItems})</span>
        )}
      </div>

      {invoices.map((inv, i) => (
        <div key={inv.id} style={{ background: '#fff', border: '1.5px solid #D4EAE2', borderRadius: 12, padding: 12, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#0B5240' }}>Invoice #{i + 1}</span>
            <button type="button" onClick={() => removeInvoice(i)}
              style={{ background: 'none', border: 'none', color: '#c0392b', cursor: 'pointer', fontSize: 18, padding: 2, lineHeight: 1 }}>
              ✕
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, marginBottom: 8 }}>
            <input type="number" step="0.01" placeholder="Amount ($)"
              value={inv.amount}
              onChange={e => updateInvoice(i, { amount: e.target.value })}
              className="form-input" style={{ fontSize: 13, padding: '8px 10px' }} />
            <input type="text" placeholder="Description (e.g. Tools, uniforms)"
              value={inv.description}
              maxLength={100}
              onChange={e => updateInvoice(i, { description: e.target.value })}
              className="form-input" style={{ fontSize: 13, padding: '8px 10px' }} />
          </div>
          <input
            ref={el => { fileInputRefs.current[i] = el }}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.webp,.heic,.heif"
            style={{ display: 'none' }}
            onChange={e => handleFile(i, e)}
          />
          {inv.file ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: '#f7fbf9', border: '1px solid #D4EAE2', borderRadius: 8 }}>
              {inv.preview ? (
                <img src={inv.preview} alt="receipt" loading="lazy" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6 }} />
              ) : (
                <div style={{ width: 36, height: 36, background: '#EAF6F1', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📄</div>
              )}
              <div style={{ flex: 1, minWidth: 0, fontSize: 12 }}>
                <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inv.file.name}</div>
                <div style={{ fontSize: 11, color: '#7a8a82' }}>{(inv.file.size / 1024).toFixed(0)} KB</div>
              </div>
              <button type="button" onClick={() => fileInputRefs.current[i]?.click()}
                style={{ background: '#fff', border: '1px solid #D4EAE2', borderRadius: 6, padding: '4px 10px', fontSize: 11, color: '#0B5240', cursor: 'pointer', fontWeight: 600 }}>
                Change
              </button>
            </div>
          ) : (
            <button type="button" onClick={() => fileInputRefs.current[i]?.click()}
              style={{ width: '100%', padding: '10px', background: '#f7fbf9', border: '1.5px dashed #A7D9C5', borderRadius: 8, color: '#0B5240', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              📎 Attach invoice / receipt
            </button>
          )}
        </div>
      ))}

      {invoices.length < maxItems && (
        <button type="button" onClick={addInvoice}
          style={{ width: '100%', padding: '12px', background: '#fff', border: '1.5px dashed #0B5240', borderRadius: 12, color: '#0B5240', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          Add invoice {invoices.length > 0 ? `(${invoices.length}/${maxItems})` : `(up to ${maxItems})`}
        </button>
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
export function FormClient() {
  // Personal
  const [waNumber, setWaNumber]       = useState('')
  const [auPhone, setAuPhone]         = useState('')
  const [fullName, setFullName]       = useState('')
  const [lastName, setLastName]        = useState('')
  const [address, setAddress]         = useState('')
  const [email, setEmail]             = useState('')
  const [country, setCountry]         = useState('')
  const [dob, setDob]                 = useState('')
  const [marital, setMarital]         = useState<'Single'|'Married'|''>('')
  const [tfn, setTfn]                 = useState('')
  const [primaryJob, setPrimaryJob]   = useState('')
  const [bankName, setBankName]           = useState('')
  const [bankHolder, setBankHolder]       = useState('')
  const [bankAccount, setBankAccount]     = useState('')
  const [bankBsb, setBankBsb]             = useState('')

  // Files
  const [bankStatement, setBankStatement] = useState<UploadState>({ file: null, preview: null })
  const [selfiePassport, setSelfiePassport] = useState<UploadState>({ file: null, preview: null })

  const [hasExpenses, setHasExpenses] = useState<'yes'|'no'|''>('')

  // Declarations
  const [taxStatus, setTaxStatus]     = useState<'resident'|'whm'|''>('')
  const [declared, setDeclared]       = useState<'yes'|'no'|''>('')
  const [declaredIncome, setDeclaredIncome] = useState(false)
  // Default to current AU tax year (Jul-Jun cycle). User can select multiple years.
  const [taxYears, setTaxYears] = useState<string[]>(() => {
    const now = new Date()
    const y = now.getFullYear()
    const current = now.getMonth() >= 6 ? `${y}-${String(y+1).slice(2)}` : `${y-1}-${String(y).slice(2)}`
    return [current]
  })
  const [terms, setTerms]             = useState(false)
  // ABN
  const [hasAbn, setHasAbn]           = useState<'yes'|'no'|''>('')
  const [abnNumber, setAbnNumber]     = useState('')
  const [abnIncome, setAbnIncome]     = useState('')
  const [abnWork, setAbnWork]         = useState('')
  const [howHeard, setHowHeard]       = useState('')

  // Invoices/Expenses
  const [tfnInvoices, setTfnInvoices] = useState<InvoiceItem[]>([])
  const [abnInvoices, setAbnInvoices] = useState<InvoiceItem[]>([])

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
    if (!lastName.trim())     e.lastName     = 'Required'
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
      if (!abnWork.trim())   e.abnWork     = 'Required'
    }
    if (!bankName.trim())    e.bankName    = 'Required'
    if (!bankHolder.trim())  e.bankHolder  = 'Required'
    if (!bankAccount.trim()) e.bankAccount = 'Required'
    if (!bankBsb.trim())     e.bankBsb     = 'Required'
    if (!bankStatement.file)  e.bankStatement  = 'Required'
    if (!selfiePassport.file) e.selfiePassport = 'Required'
    if (!taxStatus)           e.taxStatus      = 'Required'
    if (!declared)            e.declared       = 'Required'
    if (declared === 'no')    e.declared       = 'You must agree to submit'
    if (!declaredIncome)      e.declaredIncome = 'You must confirm this declaration to proceed'
    if (!howHeard.trim())     e.howHeard       = 'Required'
    if (!hasExpenses)         e.hasExpenses    = 'Required'
    if (hasExpenses === 'yes') {
      const validInvoices = [...tfnInvoices, ...abnInvoices].filter(inv =>
        inv.file && parseFloat(inv.amount) > 0 && inv.description.trim()
      )
      if (validInvoices.length === 0) {
        e.hasExpenses = 'Please add at least one expense with amount, description, and receipt'
      }
    }
    if (taxYears.length === 0) e.taxYear       = 'Please select at least one tax year'
    return e
  }

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)

    // Pre-upload all files client-side for faster, more reliable submission
    const uploadOne = async (f: File): Promise<string | null> => {
      if (f.size > 10 * 1024 * 1024) {
        alert(`File "${f.name}" is too large (max 10MB). Please compress it and try again.`)
        return null
      }
      const attempt = async () => {
        // Normalize content-type for iOS HEIC photos
        let contentType = f.type || 'image/jpeg'
        if (!contentType || contentType === 'application/octet-stream') contentType = 'image/jpeg'
        if (contentType === 'image/heic' || contentType === 'image/heif') contentType = 'image/jpeg'
        const r = await fetch(
          `/api/tax-form/upload?filename=${encodeURIComponent(f.name)}`,
          { method: 'POST', body: f, headers: { 'Content-Type': contentType } }
        )
        const data = await r.json().catch(() => ({}))
        if (!r.ok) throw new Error(data?.error || String(r.status))
        return data
      }
      for (let i = 0; i < 3; i++) {
        try { const res = await attempt(); return res?.url ?? null }
        catch (e) {
          console.error('[uploadOne]', f.name, 'attempt', i+1, 'error:', e)
          if (i === 2) {
            alert(`Upload failed for "${f.name}": ${e instanceof Error ? e.message : 'Unknown error'}`)
            return null
          }
          await new Promise(r => setTimeout(r, 800 * (i + 1)))
        }
      }
      return null
    }

    // Upload bankStatement + selfiePassport sequentially to avoid rate-limiting
    const coreUploads: { label: string; file: File }[] = []
    if (bankStatement.file)  coreUploads.push({ label: 'bankStatement',  file: bankStatement.file })
    if (selfiePassport.file) coreUploads.push({ label: 'selfiePassport', file: selfiePassport.file })
    const coreResults: (string | null)[] = []
    for (const { file: f } of coreUploads) {
      const result = await uploadOne(f)
      coreResults.push(result)
      await new Promise(r => setTimeout(r, 300))
    }
    const coreFailed = coreResults.filter(r => !r).length
    if (coreFailed > 0) {
      setLoading(false)
      alert('Failed to upload required files. Please check your documents are images or PDFs under 10MB and try again.')
      return
    }
    const coreUrls: Record<string, string> = {}
    coreUploads.forEach(({ label }, i) => { if (coreResults[i]) coreUrls[label] = coreResults[i]! })

    // Build FormData (no file blobs — URLs only)
    const fd = new FormData()
    fd.append('waNumber',    waNumber)
    fd.append('auPhone',     auPhone)
    fd.append('fullName',    `${fullName} ${lastName}`.trim())
    fd.append('address',     address)
    fd.append('email',       email)
    fd.append('country',     country)
    fd.append('dob',         dob)
    fd.append('marital',     marital)
    fd.append('tfn',         tfn)
    fd.append('primaryJob',  primaryJob)
    fd.append('hasAbn',      hasAbn === 'yes' ? 'Yes' : hasAbn === 'no' ? 'No' : '')
    fd.append('hasExpenses',  hasExpenses === 'yes' ? 'Yes' : hasExpenses === 'no' ? 'No' : '')
    if (hasAbn === 'yes') {
      fd.append('abnNumber',   abnNumber)
      fd.append('abnIncome',   abnIncome)
      fd.append('abnWork',     abnWork)
    }
    fd.append('bankDetails', `Bank: ${bankName} | Name: ${bankHolder} | Account: ${bankAccount} | BSB: ${bankBsb}`)
    fd.append('taxStatus',   taxStatus === 'resident' ? 'Australian resident for tax purposes' : taxStatus === 'whm' ? 'Working holiday maker for tax purposes' : taxStatus)
    fd.append('taxYear',     taxYears.join(', '))
    fd.append('howHeard',    howHeard)
    fd.append('declared',    declared === 'yes' ? '✓ I declare that all information provided is true, complete, and accurate. I understand that providing false information may result in penalties under Australian tax law, and confirm that I have read and accept the Client Agreement & Privacy Policy.' : declared === 'no' ? '✗ No' : '')
    fd.append('declaredIncome', declaredIncome ? '✓ I declare under my full legal responsibility that all income earned in Australia and abroad during the relevant tax year has been truthfully and completely disclosed.' : '')
    if (coreUrls['bankStatement'])  fd.append('bankStatementUrl',  coreUrls['bankStatement'])
    if (coreUrls['selfiePassport']) fd.append('selfiePassportUrl', coreUrls['selfiePassport'])

    const invoiceUrls: string[] = []
    const invoiceMetadata: { type: 'tfn' | 'abn'; amount: string; description: string; url?: string }[] = []
    const allInvoiceItems = [
      ...tfnInvoices.map(inv => ({ ...inv, type: 'tfn' as const })),
      ...abnInvoices.map(inv => ({ ...inv, type: 'abn' as const })),
    ].filter(inv => inv.file || inv.amount || inv.description)

    const allInvoiceFiles = allInvoiceItems.filter(inv => inv.file).map(inv => inv.file as File)

    if (allInvoiceFiles.length > 0) {
      // Upload in batches of 3 to avoid rate-limiting
      const results: (string | null)[] = []
      for (let i = 0; i < allInvoiceFiles.length; i += 3) {
        const batch = allInvoiceFiles.slice(i, i + 3)
        const batchResults = await Promise.all(batch.map(f => uploadOne(f)))
        results.push(...batchResults)
        // Small delay between batches to ease pressure on Supabase
        if (i + 3 < allInvoiceFiles.length) {
          await new Promise(r => setTimeout(r, 300))
        }
      }
      const failedFiles = results
        .map((r, idx) => r ? null : allInvoiceFiles[idx]?.name)
        .filter((n): n is string => !!n)
      if (failedFiles.length > 0) {
        setLoading(false)
        const list = failedFiles.slice(0, 5).join('\n• ')
        const more = failedFiles.length > 5 ? `\n• ... and ${failedFiles.length - 5} more` : ''
        alert(`Failed to upload ${failedFiles.length} invoice file(s):\n\n• ${list}${more}\n\nPlease check they are images or PDFs under 10MB and try again.`)
        return
      }
      // Preserve order: invoiceUrls[i] matches allInvoiceFiles[i]
      results.forEach(url => { if (url) invoiceUrls.push(url) })
    }

    // Build metadata array: each invoice has type/amount/description/url
    let urlIdx = 0
    allInvoiceItems.forEach(inv => {
      invoiceMetadata.push({
        type: inv.type,
        amount: inv.amount,
        description: inv.description,
        url: inv.file ? invoiceUrls[urlIdx++] : undefined,
      })
    })
    if (invoiceMetadata.length > 0) {
      fd.append('invoiceDetails', JSON.stringify(invoiceMetadata))
    }

    // Combine all uploaded URLs
    const allFileUrls = [
      ...Object.values(coreUrls),
      ...invoiceUrls,
    ]
    if (allFileUrls.length > 0) fd.append('invoiceUrls', JSON.stringify(allFileUrls))

    try {
      const res = await fetch('/api/tax-form', { method: 'POST', body: fd })
      if (res.ok) {
        window.scrollTo({top:0,behavior:"instant"}); setSubmitted(true)
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

        <canvas id="fw-canvas" className="fireworks-canvas" />
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
  var c=document.getElementById('fw-canvas');
  if(!c)return;
  var ctx=c.getContext('2d');
  var W=c.width=window.innerWidth,H=c.height=window.innerHeight;
  window.addEventListener('resize',function(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;});
  var particles=[];
  var trails=[];
  var colors=['#FFD700','#FF6B35','#FF6B6B','#E91E8C','#4ECDC4','#45B7D1','#7C4DFF','#00E676','#FFEA00','#FF1744','#00BCD4','#76FF03','#FF9800','#E040FB','#00BFA5'];
  function Particle(x,y,color,type){
    this.x=x; this.y=y; this.color=color; this.type=type||'circle';
    this.r=Math.random()*5+2;
    var angle=Math.random()*Math.PI*2;
    var speed=Math.random()*13+4;
    this.vx=Math.cos(angle)*speed;
    this.vy=Math.sin(angle)*speed-5;
    this.alpha=1;
    this.gravity=0.2;
    this.spin=Math.random()*0.4-0.2;
    this.rot=Math.random()*Math.PI*2;
    this.trail=[];
  }
  Particle.prototype.update=function(){
    this.trail.push({x:this.x,y:this.y,a:this.alpha});
    if(this.trail.length>6)this.trail.shift();
    this.x+=this.vx; this.y+=this.vy;
    this.vy+=this.gravity;
    this.vx*=0.97;
    this.alpha-=0.012;
    this.rot+=this.spin;
  };
  Particle.prototype.draw=function(){
    for(var t=0;t<this.trail.length;t++){
      var tr=this.trail[t];
      ctx.save();ctx.globalAlpha=tr.a*0.3*(t/this.trail.length);
      ctx.fillStyle=this.color;
      ctx.beginPath();ctx.arc(tr.x,tr.y,this.r*0.5,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }
    ctx.save(); ctx.globalAlpha=Math.max(0,this.alpha);
    ctx.fillStyle=this.color;
    ctx.translate(this.x,this.y); ctx.rotate(this.rot);
    if(this.type==='star'){
      ctx.beginPath();
      for(var i=0;i<5;i++){
        ctx.lineTo(Math.cos((18+i*72)*Math.PI/180)*this.r, -Math.sin((18+i*72)*Math.PI/180)*this.r);
        ctx.lineTo(Math.cos((54+i*72)*Math.PI/180)*this.r*0.4, -Math.sin((54+i*72)*Math.PI/180)*this.r*0.4);
      }
      ctx.closePath(); ctx.fill();
    } else if(this.type==='spark'){
      ctx.fillRect(-this.r*2.5,-this.r*0.4,this.r*5,this.r*0.8);
    } else if(this.type==='ring'){
      ctx.strokeStyle=this.color;ctx.lineWidth=2;
      ctx.beginPath();ctx.arc(0,0,this.r,0,Math.PI*2);ctx.stroke();
    } else {
      ctx.beginPath(); ctx.arc(0,0,this.r,0,Math.PI*2); ctx.fill();
    }
    ctx.restore();
  };
  function Trail(x,y,tx,ty,color){
    this.x=x;this.y=y;this.tx=tx;this.ty=ty;this.color=color;
    this.progress=0;this.speed=0.06;
  }
  Trail.prototype.update=function(){this.progress=Math.min(1,this.progress+this.speed);};
  Trail.prototype.draw=function(){
    var cx=this.x+(this.tx-this.x)*this.progress;
    var cy=this.y+(this.ty-this.y)*this.progress;
    ctx.save();ctx.strokeStyle=this.color;ctx.lineWidth=2;
    ctx.globalAlpha=1-this.progress;
    ctx.beginPath();ctx.moveTo(this.x,this.y);ctx.lineTo(cx,cy);ctx.stroke();
    ctx.restore();
    if(this.progress>=1){
      burst(this.tx,this.ty);return true;
    }
    return false;
  };
  function burst(x,y){
    var count=110;
    var types=['circle','circle','circle','star','star','spark','ring'];
    for(var i=0;i<count;i++){
      var type=types[Math.floor(Math.random()*types.length)];
      particles.push(new Particle(x,y,colors[Math.floor(Math.random()*colors.length)],type));
    }
  }
  var shots=0; var maxShots=16; var shotInterval=280;
  function fireRandom(){
    if(shots>=maxShots)return;
    var tx=Math.random()*W*0.8+W*0.1;
    var ty=Math.random()*H*0.5+H*0.05;
    if(shots<3){
      burst(tx,ty);
    } else {
      trails.push(new Trail(tx,H,tx,ty,colors[Math.floor(Math.random()*colors.length)]));
    }
    shots++;
    if(shots<maxShots) setTimeout(fireRandom, shotInterval);
  }
  setTimeout(fireRandom, 60);
  function loop(){
    ctx.clearRect(0,0,W,H);
    trails=trails.filter(function(tr){return !tr.update()&&(tr.draw(),true)||(tr.draw(),false);});
    particles=particles.filter(function(p){return p.alpha>0;});
    particles.forEach(function(p){p.update();p.draw();});
    if(particles.length>0||shots<maxShots||trails.length>0) requestAnimationFrame(loop);
  }
  loop();
})();
        ` }} />
          <div className="success-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="#0B5240" strokeWidth="1.5"/>
              <path d="M12 20l6 6 10-12" stroke="#0B5240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="success-title">Thank you, {firstName}! 🎉</h1>
          <p className="success-body">We've received your details and will be in touch shortly.</p>

          <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="success-wa-btn">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C5.6 2 2 5.6 2 10c0 1.4.36 2.72.99 3.87L2 18l4.18-.98C7.3 17.65 8.62 18 10 18c4.4 0 8-3.6 8-8s-3.6-8-8-8z" fill="rgba(255,255,255,0.25)"/>
              <path d="M13.1 12.8c-.12.32-.77.64-1.06.67-.28.03-.55.14-1.83-.48-1.56-.73-2.57-2.32-2.64-2.43-.07-.11-.66-.98-.66-1.87s.48-1.32.64-1.5c.16-.18.36-.22.48-.22h.35c.11 0 .25 0 .37.3l.46 1.35c.04.09.05.2 0 .32l-.33.44c-.09.11-.18.23-.07.44.11.21.48.86 1.01 1.34.53.48.99.68 1.19.76.2.09.28.07.37-.05l.34-.48c.09-.13.2-.11.33-.06.13.06.86.48 1.01.57.15.09.25.14.28.21.04.3-.07.83-.18 1.12z" fill="white"/>
            </svg>
            Message us on WhatsApp
          </a>

          <div className="success-divider" />

          <p className="success-follow-label">Tax, Super &amp; Workers' rights<br />Learn one thing every day 🙋<br />Free guides below ⬇️</p>
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
            <div className="form-brand">Working Holiday Tax</div>
            
          <h1 className="form-title">Tax Return Form</h1>
            <p className="form-intro">Please fill out the form in English only.</p>
          </div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="form-section-title">Contact details</div>
          <div>

            <Field label="WhatsApp Number" required error={errors.waNumber}>
              <input className={`inp ${errors.waNumber ? 'inp-err' : ''}`} type="tel" placeholder="+61 4XX XXX XXX" autoComplete="tel" inputMode="tel" maxLength={30}
                value={waNumber} onChange={e => { setWaNumber(e.target.value); setErrors(p => ({...p, waNumber: ''})) }}  onKeyDown={e=>{if(!/^[0-9+\s]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
            </Field>

            <Field label="Australian Phone Number" required error={errors.auPhone}>
              <input className={`inp ${errors.auPhone ? 'inp-err' : ''}`} type="tel" placeholder="04XX XXX XXX" autoComplete="tel" inputMode="tel" maxLength={30}
                value={auPhone} onChange={e => { setAuPhone(e.target.value.replace(/[^0-9+\s\-()]/g, '')); setErrors(p => ({...p, auPhone: ''})) }}  onKeyDown={e=>{if(!/^[0-9+\s]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
            </Field>

            <Field label="First name (including middle name)" required error={errors.fullName}>
              <input className={`inp ${errors.fullName ? 'inp-err' : ''}`} type="text" placeholder="As it appears on passport" autoComplete="given-name" maxLength={60}
                value={fullName} onChange={e => { setFullName(e.target.value); setErrors(p => ({...p, fullName: ''})) }} />
            </Field>
            <Field label="Last name" required error={errors.lastName}>
              <input className={`inp ${errors.lastName ? 'inp-err' : ''}`} type="text" placeholder="e.g. Smith" autoComplete="family-name" maxLength={60}
                value={lastName} onChange={e => { setLastName(e.target.value); setErrors(p => ({...p, lastName: ''})) }} />
            </Field>

            <Field label="Email Address" required error={errors.email}>
              <input className={`inp ${errors.email ? 'inp-err' : ''}`} type="email" placeholder="your@email.com" autoComplete="email" inputMode="email" maxLength={200}
                value={email} onChange={e => { setEmail(e.target.value); setErrors(p => ({...p, email: ''})) }} />
            </Field>

            <Field label="Full Australian address (street, suburb, state, postcode)" required error={errors.address}>
              <input className={`inp ${errors.address ? 'inp-err' : ''}`} type="text" placeholder="Street, suburb, state, postcode" autoComplete="street-address" maxLength={300}
                value={address} onChange={e => { setAddress(e.target.value); setErrors(p => ({...p, address: ''})) }} />
            </Field>
          </div>

          <div className="form-section-title">Personal information</div>
          <div>

            <Field label="Home Country" required error={errors.country}>
              <input className={`inp ${errors.country ? 'inp-err' : ''}`} type="text" placeholder="e.g. United Kingdom" autoComplete="country-name" maxLength={60}
                value={country} onChange={e => { setCountry(e.target.value); setErrors(p => ({...p, country: ''})) }} />
            </Field>

            <Field label="Date of Birth" required error={errors.dob}>
              <input className={`inp ${errors.dob ? 'inp-err' : ''}`} type="date"
                value={dob} onChange={e => { setDob(e.target.value); setErrors(p => ({...p, dob: ''})) }} />
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
            </Field>
          </div>

          <div className="form-section-title">Tax information</div>
          <div>

            <Field label="Tax File Number (TFN)" required error={errors.tfn}>
              <input className={`inp ${errors.tfn ? 'inp-err' : ''}`} type="text" placeholder="XXX XXX XXX" inputMode="numeric"
                value={tfn} onChange={e => { setTfn(e.target.value.replace(/[^0-9\s]/g, '')); setErrors(p => ({...p, tfn: ''})) }}  onKeyDown={e=>{if(!/^[0-9\s]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
            </Field>

            <Field label="Primary job in the past year" required error={errors.primaryJob}>
              <input className={`inp ${errors.primaryJob ? 'inp-err' : ''}`} type="text" placeholder="e.g. Farm worker, Barista"
                value={primaryJob} onChange={e => { setPrimaryJob(e.target.value); setErrors(p => ({...p, primaryJob: ''})) }} />
            </Field>

          <div className="form-section-title">ABN (Australian Business Number)</div>

            <Field label="Do you have an ABN?" required error={errors.hasAbn}>
              <div className="radio-group">
                {([{ val: 'no', label: 'No' }, { val: 'yes', label: 'Yes' }] as const).map(opt => (
                  <label key={opt.val} className={`radio-card ${hasAbn === opt.val ? 'radio-card-active' : ''}`}>
                    <input type="radio" name="hasAbn" value={opt.val} checked={hasAbn === opt.val}
                      onChange={() => { setHasAbn(opt.val); setErrors(p => ({...p, hasAbn: ''})) }} className="hidden" />
                    <div className={`radio-dot ${hasAbn === opt.val ? 'radio-dot-active' : ''}`} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </Field>

            {hasAbn === 'yes' && (<>
              <Field label="ABN number" required error={errors.abnNumber}>
                <input className={`inp ${errors.abnNumber ? 'inp-err' : ''}`} type="text" placeholder="e.g. 12 345 678 901" inputMode="numeric"
                  value={abnNumber} onChange={e => { setAbnNumber(e.target.value.replace(/[^0-9\s]/g, '')); setErrors(p => ({...p, abnNumber: ''})) }}  onKeyDown={e=>{if(!/^[0-9\s]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
              </Field>

              <Field label="Total annual income under ABN (AUD)" required error={errors.abnIncome}>
                <input className={`inp ${errors.abnIncome ? 'inp-err' : ''}`} type="text" placeholder="e.g. 15,000" inputMode="numeric"
                  value={abnIncome} onChange={e => { setAbnIncome(e.target.value.replace(/[^0-9.]/g, '')); setErrors(p => ({...p, abnIncome: ''})) }}  onKeyDown={e=>{if(!/^[0-9.]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
              </Field>

              <Field label="What work did you do under your ABN?" required error={errors.abnWork}>
                <input className={`inp ${errors.abnWork ? 'inp-err' : ''}`} type="text" placeholder="e.g. Delivery driver, Freelance photographer"
                  value={abnWork} onChange={e => { setAbnWork(e.target.value); setErrors(p => ({...p, abnWork: ''})) }} />
              </Field>
            </>)}

          <div className="form-section-title">Bank account details</div>
            <Field label="Bank name" required error={errors.bankName}>
              <input className={`inp ${errors.bankName ? 'inp-err' : ''}`} type="text" placeholder="e.g. Commonwealth Bank, NAB, ANZ"
                value={bankName} onChange={e => { setBankName(e.target.value); setErrors(p => ({...p, bankName: ''})) }} />
            </Field>
            <Field label="Account holder full name" required error={errors.bankHolder}>
              <input className={`inp ${errors.bankHolder ? 'inp-err' : ''}`} type="text" placeholder="As it appears on the bank account"
                value={bankHolder} onChange={e => { setBankHolder(e.target.value); setErrors(p => ({...p, bankHolder: ''})) }} />
            </Field>
            <Field label="Account number" required error={errors.bankAccount}>
              <input className={`inp ${errors.bankAccount ? 'inp-err' : ''}`} type="text" placeholder="e.g. 12345678"
                value={bankAccount} onChange={e => { setBankAccount(e.target.value.replace(/[^0-9\s]/g, '')); setErrors(p => ({...p, bankAccount: ''})) }}  onKeyDown={e=>{if(!/^[0-9\s]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
            </Field>
            <Field label="BSB" required error={errors.bankBsb}>
              <input className={`inp ${errors.bankBsb ? 'inp-err' : ''}`} type="text" placeholder="e.g. 062-000"
                value={bankBsb} onChange={e => { setBankBsb(e.target.value.replace(/[^0-9\s]/g, '')); setErrors(p => ({...p, bankBsb: ''})) }}  onKeyDown={e=>{if(!/^[0-9\s]$/.test(e.key)&&!['Backspace','Delete','ArrowLeft','ArrowRight','Tab','Home','End'].includes(e.key)&&!(e.ctrlKey||e.metaKey))e.preventDefault()}}/>
            </Field>
          </div>

          <div className="form-section-title">Documents</div>
          <div>

            <Field label="Bank statements" required error={errors.bankStatement}>
              <FileUpload id="bankStatement" label="Upload bank statement" accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp"
                value={bankStatement} onChange={(v) => { setBankStatement(v); setErrors(p => ({...p, bankStatement: ''})) }} />
            </Field>

            <Field label="Selfie holding your passport" required error={errors.selfiePassport}>
              <FileUpload id="selfiePassport" label="Upload selfie + passport" accept=".jpg,.jpeg,.png,.pdf,.heic,.heif,.webp"
                value={selfiePassport} onChange={(v) => { setSelfiePassport(v); setErrors(p => ({...p, selfiePassport: ''})) }} />
            </Field>


            <Field label="Do you have work-related or ABN expenses?" required error={errors.hasExpenses}>
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

            {hasExpenses === 'yes' && (<>
              <InvoiceManager
                label="TFN Work-Related Expenses"
                invoices={tfnInvoices}
                onChange={setTfnInvoices}
                maxItems={10}
              />
              {hasAbn === 'yes' && (
                <InvoiceManager
                  label="ABN Business Expenses"
                  invoices={abnInvoices}
                  onChange={setAbnInvoices}
                  maxItems={10}
                />
              )}
            </>)}
          </div>

          <div className="form-section-title">Tax year</div>
          <div>
            <Field label="Please select the tax year(s) you want to file" required error={errors.taxYear}>
              <div style={{fontSize:12,color:'#587066',marginBottom:10,lineHeight:1.55,background:'#f7fbf9',border:'1px solid #d4eae2',borderRadius:8,padding:'10px 12px'}}>
                💡 In Australia, the tax year runs from <strong>1 July to 30 June</strong>.<br/>
                You can select <strong>more than one year</strong> if you haven&apos;t filed in previous years.
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))',gap:8}}>
                {(() => {
                  const now = new Date()
                  const y = now.getFullYear()
                  const currentYear = now.getMonth() >= 6 ? `${y}-${String(y+1).slice(2)}` : `${y-1}-${String(y).slice(2)}`
                  const startYear = parseInt(currentYear.split('-')[0], 10)
                  const years = Array.from({length: 4}, (_, i) => {
                    const yy = startYear - i
                    return { code: `${yy}-${String(yy+1).slice(2)}`, range: `1.7.${yy} – 30.6.${yy+1}` }
                  })
                  return years.map(({code, range}) => {
                    const isSelected = taxYears.includes(code)
                    return (
                      <label key={code} className={`radio-card ${isSelected ? 'radio-card-active' : ''}`} style={{flexDirection:'column',alignItems:'flex-start',gap:4,padding:'10px 12px'}}>
                        <input type="checkbox" name="taxYear" value={code} checked={isSelected}
                          onChange={() => {
                            setTaxYears(prev => isSelected ? prev.filter(y => y !== code) : [...prev, code])
                            setErrors(p => ({...p, taxYear: ''}))
                          }} className="hidden" />
                        <div style={{display:'flex',alignItems:'center',gap:8,width:'100%'}}>
                          <div className={`check-box${isSelected ? ' checked' : ''}`} style={{flexShrink:0}}>
                            {isSelected && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <span style={{fontWeight:600,fontSize:13}}>FY {code}{code === currentYear ? ' (current)' : ''}</span>
                        </div>
                        <span style={{fontSize:10.5,color:'#587066',marginLeft:24}}>{range}</span>
                      </label>
                    )
                  })
                })()}
              </div>
              {taxYears.length > 1 && (
                <div style={{fontSize:11,color:'#0E5C42',marginTop:8,fontWeight:500}}>
                  ✓ {taxYears.length} tax years selected: {taxYears.sort().join(', ')}
                </div>
              )}
            </Field>
          </div>

          <div>
            <Field label="How did you hear about us?" required error={errors.howHeard}>
              <input className={`inp ${errors.howHeard ? 'inp-err' : ''}`} type="text" placeholder="e.g. Instagram, TikTok, friend..."
                value={howHeard} onChange={e => { setHowHeard(e.target.value); setErrors(p => ({...p, howHeard: ''})) }} />
            </Field>
          </div>

          <div className="form-section-title">Declaration</div>
          <div>

            <Field label="" required error={errors.taxStatus}>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#1A2822',marginBottom:'10px'}}>
                I confirm that I have reviewed the{' '}
                <a href="/tax-residency" target="_self" style={{color:'#0B5240',textDecoration:'underline'}}>Tax Residency Explained</a>
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
              <div className={`declaration-box${errors.declared ? ' decl-error' : ''}`}>
                <p className="decl-text">
                  I declare that all information provided is true, complete, and accurate. I understand that providing false information may result in penalties under Australian tax law, and confirm that I have read and accept the{' '}
                  <a href="/client-agreement" target="_blank" rel="noopener noreferrer" className="decl-link">Client Agreement</a>
                  {' '}&amp;{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="decl-link">Privacy Policy</a>.
                </p>
                <label style={{display:'flex',alignItems:'center',gap:10,marginTop:10,cursor:'pointer'}}>
                  <input type="checkbox" checked={declared === 'yes'} onChange={e => { setDeclared(e.target.checked ? 'yes' : ''); setErrors(p => ({...p, declared: ''})) }} className="hidden"/>
                  <div className={`check-box${declared === 'yes' ? ' checked' : ''}`}>{declared === 'yes' && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
                  <span className="check-label">I confirm this declaration</span>
                </label>
              </div>
            </Field>

            <Field label="" required error={errors.declaredIncome}>
              <div className={`declaration-box${errors.declaredIncome ? ' decl-error' : ''}`}>
                <p className="decl-text">I declare under my full legal responsibility that all income earned in Australia and abroad during the relevant tax year has been truthfully and completely disclosed. I understand that any false, misleading, or incomplete declaration may constitute a tax offence under Australian law, and that Working Holiday Tax bears no liability for inaccuracies arising from information provided by me.</p>
                <label style={{display:'flex',alignItems:'center',gap:10,marginTop:10,cursor:'pointer'}}>
                  <input type="checkbox" checked={declaredIncome} onChange={e => { setDeclaredIncome(e.target.checked); setErrors(p => ({...p, declaredIncome: ''})) }} className="hidden"/>
                  <div className={`check-box${declaredIncome ? ' checked' : ''}`}>{declaredIncome && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
                  <span className="check-label">I confirm this declaration</span>
                </label>
              </div>
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
                    primaryJob:'Primary Job',hasAbn:'Has ABN',abnNumber:'ABN Number',abnIncome:'ABN Annual Income',abnWork:'ABN Work Type',bankName:'Bank Name',bankHolder:'Account Holder Name',bankAccount:'Account Number',bankBsb:'BSB',
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

          <p className="form-footer-note">Your information is kept secure and private.</p>

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
  .check-box { width: 20px; height: 20px; border-radius: 6px; border: 2px solid #D4EAE2; background: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; transition: all .15s; }
  .check-box.checked { background: #0B5240; border-color: #0B5240; }
  .check-label { font-size: 13px; color: #1A2822; font-weight: 500; line-height: 1.5; }
  .check-row { display: flex; align-items: center; gap: 10px; margin-top: 10px; cursor: pointer; }
  .errors-banner { background: #FFF5F5; border: 1px solid #FCA5A5; border-radius: 12px; padding: 12px 16px; font-size: 13px; color: #DC2626; font-weight: 500; margin-top: 16px; }
  .submit-btn { display: flex; align-items: center; justify-content: center; width: 100%; height: 56px; background: #0B5240; color: #fff; font-size: 15px; font-weight: 600; font-family: inherit; border: none; border-radius: 100px; cursor: pointer; margin-top: 24px; transition: opacity .15s, transform .1s; }
  .submit-btn:active { transform: scale(.98); opacity: .9; }
  .submit-btn:disabled { opacity: .6; cursor: not-allowed; }
  .btn-loading { display: flex; align-items: center; gap: 8px; }
  .spin { animation: spin .8s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .form-footer-note { text-align: center; font-size: 11px; color: #8AADA3; margin-top: 14px; line-height: 1.6; }
  .fireworks-canvas { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999; }
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
'use client'

import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { WA_URL, WA_NUMBER } from '@/lib/constants'
import { formStrings, type FormLang } from '@/lib/formStrings'
import { FormLanguageToggle } from '@/components/ui/FormLanguageToggle'
import { compressImage, MAX_UPLOAD_BYTES } from '@/lib/compress-image'
import { isNdaCountry } from '@/lib/nda-countries'

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
  const [selfiePassport, setSelfiePassport] = useState<UploadState>({ file: null, preview: null })

  const [hasExpenses, setHasExpenses] = useState<'yes'|'no'|''>('')

  // Declarations
  const [taxStatus, setTaxStatus]     = useState<'resident'|'whm'|''>('')
  const [declared, setDeclared]       = useState<'yes'|'no'|''>('')
  // Default to current AU tax year (Jul-Jun cycle). User can select multiple years.
  const [taxYears, setTaxYears] = useState<string[]>(() => {
    const now = new Date()
    const y = now.getFullYear()
    const current = now.getMonth() >= 6 ? `${y}-${String(y+1).slice(2)}` : `${y-1}-${String(y).slice(2)}`
    return [current]
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

  // ── Funnel analytics (no external service — logs straight into Supabase,
  //    see form_funnel_events / migration 012). One stable id per form
  //    visit, generated once, so a view → step1_complete → submit_success
  //    chain can be tied together and the conversion rate measured. Never
  //    allowed to affect the actual form — every call is fire-and-forget.
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

  // ── Tax-residency confirmation prompt (shown for the one risky pick:
  //    NDA country selecting Working Holiday Maker) ──────────────────────
  const [showResidencyPrompt, setShowResidencyPrompt] = useState(false)
  const [showWhmBlockModal, setShowWhmBlockModal] = useState(false)
  const taxStatusRef = useRef<HTMLDivElement>(null)
  const residencyUrl = lang === 'de' ? '/de/tax-residency' : lang === 'ja' ? '/ja/tax-residency' : '/tax-residency'
  const SNAPSHOT_KEY = 'whv_taxform_return'

  // Restore the form when the user comes back from the tax-residency page (via
  // the prompt's "No" button), so nothing they already filled is lost, and jump
  // straight back to the tax-residency-status question where they left off.
  useEffect(() => {
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
      setIf(d.tfn, setTfn);             setIf(d.primaryJob, setPrimaryJob)
      setIf(d.hasExpenses, setHasExpenses); setIf(d.taxStatus, setTaxStatus)
      setIf(d.declared, setDeclared)
      setIf(d.taxYears, setTaxYears);   setIf(d.terms, setTerms)
      setIf(d.howHeard, setHowHeard)
      // This snapshot only ever gets saved from within the step-2 section
      // (the residency question), so restoring it must also jump back to
      // step 2 — otherwise the scroll target below doesn't even exist yet.
      setStep(2)
      // Scroll back to the tax-residency question after the DOM settles
      setTimeout(() => taxStatusRef.current?.scrollIntoView({ behavior: 'auto', block: 'center' }), 60)
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Triggered when the user picks a tax-residency status.
  // Only one combination needs an interruption: picking "Working Holiday
  // Maker" while being from an NDA country, since that's the costly mistake
  // this feature exists to catch (a bigger refund being left on the table).
  // Picking "Resident" is always the desired outcome, so it never prompts.
  const handleTaxStatusPick = (val: 'resident'|'whm') => {
    setTaxStatus(val)
    setErrors(p => ({ ...p, taxStatus: '' }))
    if (val === 'whm' && isNdaCountry(country)) setShowResidencyPrompt(true)
  }

  // "No" → save everything and send them to the tax-residency explainer page.
  const goReadResidency = () => {
    try {
      const data = {
        waNumber, auPhone, fullName, lastName, address, email, country, dob, marital,
        hasMedicare,
        tfn, primaryJob, hasExpenses,
        taxStatus, declared, taxYears, terms, howHeard,
      }
      sessionStorage.setItem(SNAPSHOT_KEY, JSON.stringify({ t: Date.now(), data }))
    } catch {}
    window.location.href = residencyUrl
  }

  /* ── Validation ── */
  const validate = () => {
    const e: Record<string, string> = {}
    if (!waNumber.trim())    e.waNumber    = T('required')
    if (!auPhone.trim())     e.auPhone     = T('required')
    if (!fullName.trim())    e.fullName    = T('required')
    if (!lastName.trim())     e.lastName     = T('required')
    if (!email.trim())       e.email       = T('required')
    if (!address.trim())     e.address     = T('required')
    if (!country.trim())     e.country     = T('required')
    if (!dob.trim())         e.dob         = T('required')
    if (!marital)            e.marital     = T('required')
    if (!hasMedicare)        e.hasMedicare = T('required')
    if (!tfn.trim())         e.tfn         = T('required')
    if (!primaryJob.trim())  e.primaryJob  = T('required')
    if (!selfiePassport.file) e.selfiePassport = T('required')
    if (!taxStatus)           e.taxStatus      = T('required')
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
    if (!tfn.trim())         e.tfn         = T('required')
    if (!email.trim())       e.email       = T('required')
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

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    // Hard block: clients who select "Working Holiday Maker" tax status cannot
    // submit the form. Visa type and income level don't determine tax residency -
    // only the actual residency tests do - so this stops people from locking in
    // a worse tax outcome (15% flat, no refund) without at least reading the
    // tax-residency explainer first. The form stays fully filled either way.
    if (taxStatus === 'whm') { setShowWhmBlockModal(true); return }

    setLoading(true)

    // Pre-upload all files client-side for faster, more reliable submission
    const uploadOne = async (f: File): Promise<string | null> => {
      f = await compressImage(f)
      if (f.size > MAX_UPLOAD_BYTES) {
        alert(T('fileTooLarge'))
        return null
      }
      const attempt = async () => {
        // Normalize content-type for upload. Some browsers/file-pickers (esp. on
        // Android, e.g. picking a PDF from Google Drive/Downloads) report an
        // empty or generic 'application/octet-stream' MIME type. Previously we
        // defaulted that straight to 'image/jpeg', which meant a real PDF bank
        // statement would be declared as a JPEG - the server's magic-byte check
        // then correctly rejected it ("File content does not match declared
        // type"), failing the upload. Fall back to the file extension instead so
        // PDFs (and other non-JPEG types) are labelled correctly.
        let contentType = f.type
        if (!contentType || contentType === 'application/octet-stream') {
          const name = f.name.toLowerCase()
          if (name.endsWith('.pdf'))               contentType = 'application/pdf'
          else if (name.endsWith('.png'))           contentType = 'image/png'
          else if (name.endsWith('.webp'))          contentType = 'image/webp'
          else if (name.endsWith('.gif'))           contentType = 'image/gif'
          else if (name.endsWith('.heic'))          contentType = 'image/heic'
          else if (name.endsWith('.heif'))          contentType = 'image/heif'
          else                                      contentType = 'image/jpeg' // covers .jpg/.jpeg and unknown extensions
        }
        // iOS sends HEIC photos with a .heic/.heif type even after our client-side
        // JPEG re-encode step normally converts them; if compression didn't run
        // (e.g. decode unsupported), send the true bytes but declare them as jpeg
        // since the server accepts HEIC signatures under an image/jpeg label.
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

    // Upload selfiePassport (bank statement no longer collected here — bank
    // details are now gathered separately via WhatsApp instead)
    const coreUploads: { label: string; file: File }[] = []
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

    // Build FormData (no file blobs - URLs only)
    const fd = new FormData()
    fd.append('waNumber',    waNumber)
    fd.append('auPhone',     auPhone)
    fd.append('fullName',    `${fullName} ${lastName}`.trim())
    fd.append('address',     address)
    fd.append('email',       email)
    fd.append('country',     country)
    fd.append('dob',         dob)
    fd.append('marital',     marital)
    fd.append('hasMedicare', hasMedicare === 'yes' ? 'Yes' : hasMedicare === 'no' ? 'No' : '')
    fd.append('tfn',         tfn)
    fd.append('primaryJob',  primaryJob)
    fd.append('hasExpenses',  hasExpenses === 'yes' ? 'Yes' : hasExpenses === 'no' ? 'No' : '')
    fd.append('taxStatus',   taxStatus === 'resident' ? 'Australian resident for tax purposes' : taxStatus)
    fd.append('taxYear',     taxYears.join(', '))
    fd.append('howHeard',    howHeard)
    if (refCode) fd.append('refCode', refCode)
    fd.append('declared',    declared === 'yes' ? '✓ I confirm I\u2019ve read and agree to the Client Agreement and Privacy Policy.' : declared === 'no' ? '✗ No' : '')
    if (coreUrls['selfiePassport']) fd.append('selfiePassportUrl', coreUrls['selfiePassport'])

    // Combine all uploaded URLs (core files only - invoices are sent by email)
    const allFileUrls = [...Object.values(coreUrls)]
    if (allFileUrls.length > 0) fd.append('invoiceUrls', JSON.stringify(allFileUrls))

    try {
      const res = await fetch('/api/tax-form', { method: 'POST', body: fd })
      if (res.ok) {
        trackFunnelEvent('submit_success')
        window.scrollTo({top:0,behavior:"instant"}); setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        if (res.status === 429) alert(T('tooMany'))
        else if (data?.error === 'invalid_file') alert(`${T('fileErrorPrefix')}${data.message || T('fileErrorGeneric')}`)
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
    const waMsg = encodeURIComponent("Hi! I just filled out the form and I'd love a free eligibility check 😊")
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/tpb-logo.svg" alt="Tax Practitioners Board" width={36} height={36} style={{ objectFit: 'contain' }} />
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

        <form onSubmit={handleSubmit} noValidate>

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

            <Field label={T('hasExpenses')} required error={errors.hasExpenses}>
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
          <div ref={taxStatusRef} style={{scrollMarginTop:'80px'}}>

            <Field label="" required error={errors.taxStatus}>
              <label style={{display:'block',fontSize:'13px',fontWeight:600,color:'#1A2822',marginBottom:'10px'}}>
                {lang === 'de' ? (
                  <>Nach Prüfung des Abschnitts{' '}<a href="/de/tax-residency" target="_self" style={{color:'#0B5240',textDecoration:'underline'}}>Steuerresidenz erklärt</a>{' '}und der relevanten ATO-Informationen erkläre ich, dass ich bin:</>
                ) : lang === 'ja' ? (
                  <>{'「'}<a href="/ja/tax-residency" target="_self" style={{color:'#0B5240',textDecoration:'underline'}}>税務上の居住者ステータスについて</a>{'」'}のセクションと関連するATO情報を確認した上で、以下に該当することを宣言します：</>
                ) : (
                  <>Having reviewed the{' '}<a href="/tax-residency" target="_self" style={{color:'#0B5240',textDecoration:'underline'}}>Tax Residency Explained</a>{' '}page and the relevant ATO information, I declare that I am:</>
                )}<span style={{color:'#0B5240',marginLeft:'3px'}}>*</span>
              </label>
              <div className="radio-group radio-group-col">
                {([
                  { val: 'resident', label: T('australianTaxResident'),
                    hint: lang === 'de' ? 'Steuerfrei bis $18.200'
                        : lang === 'ja' ? '$18,200まで非課税'
                        : 'Tax-free up to $18,200' },
                  { val: 'whm',      label: T('workingHolidayMakerTax'),
                    hint: lang === 'de' ? 'Besteuerung mit 15% ab dem ersten Dollar'
                        : lang === 'ja' ? '$0から15%課税'
                        : 'Taxed at 15% from the first dollar' },
                ] as const).map(opt => (
                  <label key={opt.val} className={`radio-card ${taxStatus === opt.val ? 'radio-card-active' : ''}`} style={{flexDirection:'column',alignItems:'flex-start',gap:2}}>
                    <span style={{display:'flex',alignItems:'center',gap:10}}>
                      <input type="radio" name="taxStatus" value={opt.val} checked={taxStatus === opt.val}
                        onChange={() => handleTaxStatusPick(opt.val)} className="hidden" />
                      <span className={`radio-dot ${taxStatus === opt.val ? 'radio-dot-active' : ''}`} />
                      {opt.label}
                    </span>
                    <span style={{fontSize:11,color:'#7a8a82',marginLeft:24,fontWeight:400}}>{opt.hint}</span>
                  </label>
                ))}
              </div>
            </Field>
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
              <div className={`declaration-box${errors.declared ? ' decl-error' : ''}`}>
                <p className="decl-text">
                  {lang === 'de' ? (
                    <>Ich bestätige, dass ich die{' '}<a href="/de/client-agreement" target="_blank" rel="noopener noreferrer" className="decl-link">Mandantenvereinbarung</a>{' '}und die{' '}<a href="/de/privacy" target="_blank" rel="noopener noreferrer" className="decl-link">Datenschutzerklärung</a> gelesen habe und ihnen zustimme.</>
                  ) : lang === 'ja' ? (
                    <>{'私は'}<a href="/ja/client-agreement" target="_blank" rel="noopener noreferrer" className="decl-link">クライアント規約</a>{'および'}<a href="/ja/privacy" target="_blank" rel="noopener noreferrer" className="decl-link">プライバシーポリシー</a>{'を読み、同意することを確認します。'}</>
                  ) : (
                    <>I confirm I&apos;ve read and agree to the{' '}<a href="/client-agreement" target="_blank" rel="noopener noreferrer" className="decl-link">Client Agreement</a>{' '}and{' '}<a href="/privacy" target="_blank" rel="noopener noreferrer" className="decl-link">Privacy Policy</a>.</>
                  )}
                </p>
                <label style={{display:'flex',alignItems:'center',gap:10,marginTop:10,cursor:'pointer'}}>
                  <input type="checkbox" checked={declared === 'yes'} onChange={e => { setDeclared(e.target.checked ? 'yes' : ''); setErrors(p => ({...p, declared: ''})) }} className="hidden"/>
                  <div className={`check-box${declared === 'yes' ? ' checked' : ''}`}>{declared === 'yes' && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}</div>
                  <span className="check-label">{T('declConfirm')}</span>
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
                    primaryJob:'Primary Job',selfiePassport:'Selfie with Passport',
                    taxStatus:'Tax Residency Status',declared:'Declaration',howHeard:'How did you hear about us'
                  } as Record<string,string>)[k] || k} is required` : v}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="button" className="back-btn" onClick={() => { setStep(1); setErrors({}); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            {T('backButton')}
          </button>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <span className="btn-loading">
                <svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="40" strokeDashoffset="10"/>
                </svg>
                {T('submitting')}
              </span>
            ) : T('submitTax')}
          </button>

          <p className="form-footer-note">{T('secureNote')}</p>
          </>
          )}

        </form>

        {showResidencyPrompt && (() => {
          const txt = lang === 'de'
            ? { icon: '💰', title: 'Warte, das solltest du wissen',
                body: <>Basierend auf deinem Heimatland (<strong>{country}</strong>) könntest du als australischer Steuerresident für steuerliche Zwecke gelten. Wenn du den Working Holiday Maker Steuerstatus wählst, zahlst du in der Regel 15% Steuer ab dem ersten verdienten Dollar. Zum Beispiel könntest du bei einem zu versteuernden Einkommen von $45.000 etwa $2.462 mehr Steuer zahlen als jemand, der als australischer Steuerresident gilt. Bist du sicher, dass der Working Holiday Maker Steuerstatus richtig für dich ist?</>,
                link: 'Steuerresidenz erklärt', yes: 'Ja, ich bin sicher', no: 'Nein, Resident-Status prüfen' }
            : lang === 'ja'
            ? { icon: '💰', title: '待ってください',
                body: <>あなたの出身国（<strong>{country}</strong>）に基づくと、税務上のオーストラリア居住者として認定される可能性があります。Working Holiday Makerの税務ステータスを選択すると、通常は最初の1ドルから15%の税金が課されます。例えば、課税所得が$45,000の場合、オーストラリア税務居住者として認定される人と比べて、約$2,462多く税金を支払う可能性があります。本当にWorking Holiday Makerの税務ステータスで正しいですか？</>,
                link: '税務上の居住者ステータスについて', yes: 'はい、確実です', no: 'いいえ、居住者資格を確認する' }
            : { icon: '💰', title: 'Wait, check this first',
                body: <>Based on your home country (<strong>{country}</strong>), you may qualify as an Australian resident for tax purposes. If you choose the Working Holiday Maker tax status, you will generally pay tax at 15% from the first dollar earned. For example, on a taxable income of $45,000, you could pay approximately $2,462 more in tax compared to someone who qualifies as an Australian tax resident. Are you sure the Working Holiday Maker tax status is right for you?</>,
                link: 'Tax Residency Explained', yes: "Yes, I'm sure", no: 'No, let me check Resident status' }

          // The "go check" path is the prominent green button, and "I'm sure"
          // is demoted to a plain low-emphasis button - so the path of least
          // resistance is to actually go check, not to reflexively dismiss.
          const dismissBtnStyle: React.CSSProperties =
            {minHeight:44,borderRadius:100,border:'1.5px solid #E2E8E4',background:'#fff',color:'#587066',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}
          const goCheckBtnStyle: React.CSSProperties =
            {minHeight:50,borderRadius:100,border:'none',background:'#0B5240',color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}

          return (
            <div role="dialog" aria-modal="true"
              style={{position:'fixed',inset:0,background:'rgba(8,15,13,0.55)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000,padding:20}}>
              <div style={{background:'#fff',borderRadius:18,maxWidth:440,width:'100%',padding:'26px 24px',boxShadow:'0 24px 70px rgba(0,0,0,0.32)',textAlign:'center'}}>
                <div style={{fontSize:30,marginBottom:10}}>{txt.icon}</div>
                <h3 style={{fontFamily:'inherit',fontSize:17,fontWeight:800,color:'#92400e',margin:'0 0 10px'}}>{txt.title}</h3>
                <p style={{fontSize:14,color:'#1A2822',lineHeight:1.6,margin:'0 0 6px'}}>{txt.body}</p>
                <a href={residencyUrl} target="_self" style={{display:'inline-block',fontSize:13,color:'#0B5240',textDecoration:'underline',fontWeight:600,marginBottom:20}}>{txt.link} →</a>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <button type="button" onClick={goReadResidency} style={goCheckBtnStyle}>{txt.no}</button>
                  <button type="button" onClick={() => setShowResidencyPrompt(false)} style={dismissBtnStyle}>
                    {txt.yes}
                  </button>
                </div>
              </div>
            </div>
          )
        })()}

        {showWhmBlockModal && (() => {
          const txt = lang === 'de'
            ? { icon: '🛑', title: 'Bevor du absendest',
                body: <>Deine Visumart und deine Einkommenshöhe bestimmen nicht deine Steuerresidenz. Deine Steuerresidenz wird durch die Steuerresidenz-Tests bestimmt, die auf der Seite zur Steuerresidenz erklärt werden.</>,
                body2: <>Basierend auf deinen Angaben giltst du für steuerliche Zwecke als Working Holiday Maker. Da du während des Jahres die korrekten 15% Steuer gezahlt hast, hast du dieses Jahr keinen Anspruch auf eine Steuerrückerstattung.</>,
                thanks: 'Danke!', link: 'Steuerresidenz erklärt', close: 'Schließen' }
            : lang === 'ja'
            ? { icon: '🛑', title: '送信する前に',
                body: <>あなたのビザの種類や所得額は、税務上の居住区分を決定するものではありません。あなたの税務上の居住区分は、税務居住区分ページに記載されている居住テストによって決定されます。</>,
                body2: <>ご回答の内容に基づき、税法上ワーキングホリデーメーカーとみなされます。年間を通じて正しい15%の税金を納めているため、今回は税金の還付を受ける資格がありません。</>,
                thanks: 'ありがとうございます！', link: '税務上の居住区分について', close: '閉じる' }
            : { icon: '🛑', title: 'Before you submit',
                body: <>Your visa and income level don&apos;t determine your tax residency. Your tax residency is determined by the tax residency tests explained on the Tax Residency page.</>,
                body2: <>Based on your answers, you&apos;re considered a Working Holiday Maker for tax purposes. Since you paid the correct 15% tax during the year, you aren&apos;t eligible for a tax refund this year.</>,
                thanks: 'Thank you!', link: 'Tax Residency Explained', close: 'Close' }

          return (
            <div role="dialog" aria-modal="true"
              style={{position:'fixed',inset:0,background:'rgba(8,15,13,0.55)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000,padding:20}}>
              <div style={{background:'#fff',borderRadius:18,maxWidth:440,width:'100%',padding:'26px 24px',boxShadow:'0 24px 70px rgba(0,0,0,0.32)',textAlign:'center'}}>
                <div style={{fontSize:30,marginBottom:10}}>{txt.icon}</div>
                <h3 style={{fontFamily:'inherit',fontSize:17,fontWeight:800,color:'#92400e',margin:'0 0 10px'}}>{txt.title}</h3>
                <p style={{fontSize:14,color:'#1A2822',lineHeight:1.6,margin:'0 0 10px'}}>{txt.body}</p>
                <button type="button" onClick={goReadResidency}
                  style={{display:'inline-block',fontSize:13,color:'#0B5240',textDecoration:'underline',fontWeight:600,marginBottom:14,background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',padding:0}}>{txt.link} →</button>
                <p style={{fontSize:14,color:'#1A2822',lineHeight:1.6,margin:'0 0 10px'}}>{txt.body2}</p>
                <p style={{fontSize:14,color:'#1A2822',fontWeight:600,margin:'0 0 20px'}}>{txt.thanks}</p>
                <button type="button" onClick={() => setShowWhmBlockModal(false)}
                  style={{minHeight:50,width:'100%',borderRadius:100,border:'none',background:'#0B5240',color:'#fff',fontSize:14,fontWeight:700,cursor:'pointer',fontFamily:'inherit'}}>
                  {txt.close}
                </button>
              </div>
            </div>
          )
        })()}
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
'use client'
import React, { useState, useRef } from 'react'

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
  // Cleanup object URL when preview changes or component unmounts (prevents memory leak)
  React.useEffect(() => {
    return () => { if (value.preview) URL.revokeObjectURL(value.preview) }
  }, [value.preview])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return
    onChange({ file, preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null })
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
          <div className="file-meta"><span className="file-name">{value.file.name}</span><span className="file-size">{(value.file.size/1024).toFixed(0)} KB</span></div>
          <button type="button" className="file-remove" onClick={e=>{e.stopPropagation();handleRemove()}}><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
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

export default function SuperFormPage() {
  const [firstName, setFirstName]   = useState('')
  const [lastName, setLastName]     = useState('')
  const [dob, setDob]               = useState('')
  const [passport, setPassport]     = useState('')
  const [passportCountry, setPassportCountry] = useState('')
  const [smsPhone, setSmsPhone]     = useState('')
  const [email, setEmail]           = useState('')
  const [auAddress, setAuAddress]   = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [tfn, setTfn]               = useState('')
  const [superFunds, setSuperFunds] = useState('')
  const [bankName, setBankName]       = useState('')
  const [bankHolder, setBankHolder]   = useState('')
  const [bankAccount, setBankAccount] = useState('')
  const [bankBsb, setBankBsb]         = useState('')
  const [terms, setTerms]           = useState(false)
  const [selfie, setSelfie]         = useState<UploadState>({ file: null, preview: null })
  const [submitted, setSubmitted]   = useState(false)
  const [loading, setLoading]       = useState(false)
  const [errors, setErrors]         = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!firstName.trim())      e.firstName      = 'Required'
    if (!lastName.trim())       e.lastName       = 'Required'
    if (!dob.trim())            e.dob            = 'Required'
    if (!passport.trim())       e.passport       = 'Required'
    if (!passportCountry.trim()) e.passportCountry = 'Required'
    if (!smsPhone.trim())       e.smsPhone       = 'Required'
    if (!email.trim())          e.email          = 'Required'
    if (!auAddress.trim())      e.auAddress      = 'Required'
    if (!homeAddress.trim())    e.homeAddress    = 'Required'
    if (!tfn.trim())            e.tfn            = 'Required'
    if (!superFunds.trim())     e.superFunds     = 'Required'
    if (!bankName.trim())    e.bankName    = 'Required'
    if (!bankHolder.trim())  e.bankHolder  = 'Required'
    if (!bankAccount.trim()) e.bankAccount = 'Required'
    if (!bankBsb.trim())     e.bankBsb     = 'Required'
    if (!selfie.file)           e.selfie         = 'Required'
    if (!terms)                 e.terms          = 'You must confirm this declaration to proceed'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    const fd = new FormData()
    fd.append('formType', 'super')
    fd.append('firstName', firstName); fd.append('lastName', lastName)
    fd.append('dob', dob); fd.append('passport', passport)
    fd.append('passportCountry', passportCountry); fd.append('smsPhone', smsPhone)
    fd.append('email', email); fd.append('auAddress', auAddress)
    fd.append('homeAddress', homeAddress); fd.append('tfn', tfn)
    fd.append('superFunds', superFunds)
    fd.append('bankDetails', `Bank: ${bankName} | Name: ${bankHolder} | Account: ${bankAccount} | BSB: ${bankBsb}`)
    fd.append('declared',    terms ? '✓ I have read and accept the Client Agreement & Privacy Policy' : '')
    fd.append('declaredText', 'I have read and accept the Client Agreement & Privacy Policy.')
    if (selfie.file) fd.append('selfiePassport', selfie.file)
    try {
      const res = await fetch('/api/super-form', { method: 'POST', body: fd })
      if (res.ok) {
        window.scrollTo({top:0,behavior:'instant'}); setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        if (res.status === 429) alert('Too many submissions. Please wait 15 minutes and try again.')
        else if (data?.error === 'invalid_file') alert(`File error: ${data.message || 'Please upload a valid image or PDF under 10MB.'}`)
        else alert('Something went wrong. Please try again.')
      }
    } catch { alert('Something went wrong. Please try again.') }
    finally { setLoading(false) }
  }


  // Fireworks animation on success
  React.useEffect(() => {
    if (!submitted) return
    const c = document.getElementById('fw-canvas') as HTMLCanvasElement | null
    if (!c) return
    const ctx = c.getContext('2d')!
    let W = (c.width = window.innerWidth), H = (c.height = window.innerHeight)
    const onResize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight }
    window.addEventListener('resize', onResize)
    const colors = ['#FFD700','#FF6B35','#FF6B6B','#E91E8C','#4ECDC4','#45B7D1','#7C4DFF','#00E676','#FFEA00','#FF1744','#00BCD4','#76FF03']
    type PType = { x:number;y:number;color:string;type:string;r:number;vx:number;vy:number;alpha:number;gravity:number;spin:number;rot:number }
    const particles: PType[] = []
    function mkParticle(x:number,y:number,color:string,type:string): PType {
      const angle = Math.random()*Math.PI*2, speed = Math.random()*10+3
      return { x,y,color,type,r:Math.random()*4+2,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed-4,alpha:1,gravity:0.18,spin:Math.random()*0.3-0.15,rot:Math.random()*Math.PI*2 }
    }
    function burst(x:number,y:number){ const types=['circle','circle','star','spark']; for(let i=0;i<90;i++) particles.push(mkParticle(x,y,colors[Math.floor(Math.random()*colors.length)],types[Math.floor(Math.random()*types.length)])) }
    let shots=0; const maxShots=12
    function fireRandom(){ if(shots>=maxShots)return; burst(Math.random()*W*0.8+W*0.1,Math.random()*H*0.55+H*0.05); shots++; if(shots<maxShots)setTimeout(fireRandom,350) }
    setTimeout(fireRandom, 80)
    let raf: number
    function loop(){
      ctx.clearRect(0,0,W,H)
      for(let i=particles.length-1;i>=0;i--){
        const p=particles[i]; p.x+=p.vx;p.y+=p.vy;p.vy+=p.gravity;p.vx*=0.98;p.alpha-=0.013;p.rot+=p.spin
        if(p.alpha<=0){particles.splice(i,1);continue}
        ctx.save();ctx.globalAlpha=Math.max(0,p.alpha);ctx.fillStyle=p.color;ctx.translate(p.x,p.y);ctx.rotate(p.rot)
        if(p.type==='star'){ctx.beginPath();for(let j=0;j<5;j++){ctx.lineTo(Math.cos((18+j*72)*Math.PI/180)*p.r,-Math.sin((18+j*72)*Math.PI/180)*p.r);ctx.lineTo(Math.cos((54+j*72)*Math.PI/180)*p.r*0.4,-Math.sin((54+j*72)*Math.PI/180)*p.r*0.4)}ctx.closePath();ctx.fill()}
        else if(p.type==='spark'){ctx.fillRect(-p.r*2,-p.r*0.4,p.r*4,p.r*0.8)}
        else{ctx.beginPath();ctx.arc(0,0,p.r,0,Math.PI*2);ctx.fill()}
        ctx.restore()
      }
      if(particles.length>0||shots<maxShots) raf=requestAnimationFrame(loop)
    }
    raf=requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize',onResize) }
  }, [submitted])

  if (submitted) {
    const displayName = firstName || 'there'
    return (
      <>
        <style>{css}</style>
        <div className="form-success-wrap">
        <canvas id="fw-canvas" className="fireworks-canvas" />
        <div className="success-icon">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" stroke="#0B5240" strokeWidth="1.5"/>
              <path d="M12 20l6 6 10-12" stroke="#0B5240" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="success-title">Thank you, {displayName}! 🎉</h1>
          <p className="success-body">We&apos;ve received your details and will be in touch shortly.</p>
          <a href="https://wa.me/61424513998" target="_blank" rel="noopener noreferrer" className="success-wa-btn">
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
          
          <h1 className="form-title">Superannuation Refund</h1>
          <p className="form-intro">Please fill out the form in English exactly as it appears on your passport.</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-section-title">Personal details</div>
          <Field label="First name (including middle name)" required error={errors.firstName}>
            <input className={`form-input${errors.firstName?' input-error':''}`} placeholder="e.g. John Michael" value={firstName} onChange={e=>{ setFirstName(e.target.value); setErrors(p=>({...p,firstName:''})) }}/>
          </Field>
          <Field label="Last name" required error={errors.lastName}>
            <input className={`form-input${errors.lastName?' input-error':''}`} placeholder="e.g. Smith" value={lastName} onChange={e=>{ setLastName(e.target.value); setErrors(p=>({...p,lastName:''})) }}/>
          </Field>
          <Field label="Date of birth" required error={errors.dob}>
            <input type="date" className={`form-input${errors.dob?' input-error':''}`} value={dob} onChange={e=>{ setDob(e.target.value); setErrors(p=>({...p,dob:''})) }}/>
          </Field>
          <Field label="Passport number" required error={errors.passport}>
            <input className={`form-input${errors.passport?' input-error':''}`} placeholder="e.g. AB1234567" value={passport} onChange={e=>{ setPassport(e.target.value); setErrors(p=>({...p,passport:''})) }}/>
          </Field>
          <Field label="Country that issued the passport (with visa attached)" required error={errors.passportCountry}>
            <input className={`form-input${errors.passportCountry?' input-error':''}`} placeholder="e.g. France" value={passportCountry} onChange={e=>{ setPassportCountry(e.target.value); setErrors(p=>({...p,passportCountry:''})) }}/>
          </Field>

          <div className="form-section-title">Contact details</div>
          <Field label="WhatsApp Number" required error={errors.smsPhone}>
            <input type="tel" className={`form-input${errors.smsPhone?' input-error':''}`} placeholder="+61 4XX XXX XXX" value={smsPhone} onChange={e=>{ setSmsPhone(e.target.value); setErrors(p=>({...p,smsPhone:''})) }}/>
          </Field>
          <Field label="Email address" required error={errors.email}>
            <input type="email" className={`form-input${errors.email?' input-error':''}`} placeholder="e.g. john@email.com" value={email} onChange={e=>{ setEmail(e.target.value); setErrors(p=>({...p,email:''})) }}/>
          </Field>
          <Field label="Full Australian address (street, suburb, state, postcode)" required error={errors.auAddress}>
            <textarea className={`form-input form-textarea${errors.auAddress?' input-error':''}`} placeholder="e.g. 42 Bondi Rd, Bondi, NSW, 2026" value={auAddress} onChange={e=>{ setAuAddress(e.target.value); setErrors(p=>({...p,auAddress:''})) }}/>
          </Field>
          <Field label="Full home country address" required error={errors.homeAddress}>
            <textarea className={`form-input form-textarea${errors.homeAddress?' input-error':''}`} placeholder="e.g. 12 Rue de Paris, 75001 Paris, France" value={homeAddress} onChange={e=>{ setHomeAddress(e.target.value); setErrors(p=>({...p,homeAddress:''})) }}/>
          </Field>

          <div className="form-section-title">Tax & super fund details</div>
          <Field label="TFN (Tax File Number)" required error={errors.tfn}>
            <input className={`form-input${errors.tfn?' input-error':''}`} placeholder="e.g. 123 456 789" value={tfn} onChange={e=>{ setTfn(e.target.value); setErrors(p=>({...p,tfn:''})) }}/>
          </Field>
          <Field label="Super fund details (fund name, member number, account opening date)" required error={errors.superFunds}>
            <textarea className={`form-input form-textarea${errors.superFunds?' input-error':''}`} style={{minHeight:100}} placeholder={"e.g. AustralianSuper — Member No: 123456789 — Opened: 01/03/2023\nHostPlus — Member No: 987654321 — Opened: 15/06/2022"} value={superFunds} onChange={e=>{ setSuperFunds(e.target.value); setErrors(p=>({...p,superFunds:''})) }}/>
          </Field>
          <div className="form-section-title">Bank account details</div>
          <Field label="Bank name" required error={errors.bankName}>
            <input className={`form-input${errors.bankName?' input-error':''}`} type="text" placeholder="e.g. Commonwealth Bank, NAB, ANZ" value={bankName} onChange={e=>{ setBankName(e.target.value); setErrors(p=>({...p,bankName:''})) }}/>
          </Field>
          <Field label="Account holder full name" required error={errors.bankHolder}>
            <input className={`form-input${errors.bankHolder?' input-error':''}`} type="text" placeholder="As it appears on the bank account" value={bankHolder} onChange={e=>{ setBankHolder(e.target.value); setErrors(p=>({...p,bankHolder:''})) }}/>
          </Field>
          <Field label="Account number" required error={errors.bankAccount}>
            <input className={`form-input${errors.bankAccount?' input-error':''}`} type="text" placeholder="e.g. 12345678" value={bankAccount} onChange={e=>{ setBankAccount(e.target.value); setErrors(p=>({...p,bankAccount:''})) }}/>
          </Field>
          <Field label="BSB" required error={errors.bankBsb}>
            <input className={`form-input${errors.bankBsb?' input-error':''}`} type="text" placeholder="e.g. 062-000" value={bankBsb} onChange={e=>{ setBankBsb(e.target.value); setErrors(p=>({...p,bankBsb:''})) }}/>
          </Field>

          <div className="form-section-title">Documents</div>
          <Field label="Selfie with passport" required error={errors.selfie}>
            <FileUpload id="selfie" label="Upload selfie with passport" accept=".jpg,.jpeg,.png,.webp,.pdf" value={selfie} onChange={v=>{ setSelfie(v); setErrors(p=>({...p,selfie:''})) }}/>
          </Field>

          <div className="form-section-title">Declaration</div>


          <div className={`declaration-box${errors.terms?' decl-error':''}`} style={{marginTop:10}}>
            <label className="check-row">
              <input type="checkbox" checked={terms} onChange={e=>{ setTerms(e.target.checked); setErrors(p=>({...p,terms:''})) }} className="hidden"/>
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
                    firstName:'First Name',lastName:'Last Name',dob:'Date of Birth',
                    passport:'Passport Number',passportCountry:'Passport Country',
                    smsPhone:'Phone Number',email:'Email Address',auAddress:'Australian Address',
                    homeAddress:'Home Country Address',tfn:'TFN',superFunds:'Super Fund Details',
                    bankName:'Bank Name',bankHolder:'Account Holder Name',bankAccount:'Account Number',bankBsb:'BSB',selfie:'Selfie with Passport'
                  } as Record<string,string>)[k] || k} is required` : v}</li>
                ))}
              </ul>
            </div>
          )}
          <button type="submit" className="submit-btn" disabled={loading || !terms}>
            {loading ? <span className="btn-loading"><svg className="spin" width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2.5" strokeDasharray="40" strokeDashoffset="10"/></svg>Submitting…</span> : 'Submit Super Application →'}
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

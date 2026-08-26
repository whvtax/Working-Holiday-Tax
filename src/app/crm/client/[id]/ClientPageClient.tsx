'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { CrmSide, crmNav, NavIcons } from '@/components/crm/Shell'

type TaxYear = string
type Client = {
  id:string; fullName:string; dob:string; whatsapp:string; email:string; country:string
  address:string; tfn:string; bankDetails:string; primaryJob:string; marital:string
  taxStatus:string; howHeard:string; auPhone:string; taxYear:TaxYear
  submittedAt:string; handled:boolean; notes:string
  files:{bankStatement:string|null;selfiePassport:string|null;invoices:string|null}
}
// Calculate tax years dynamically: 5 back + current + 5 forward
const _now = new Date()
const _cy = _now.getFullYear()
const _currentTaxStart = _now.getMonth() >= 6 ? _cy : _cy - 1
const TAX_YEARS: TaxYear[] = Array.from({length:11},(_,i)=>{
  const y = _currentTaxStart + 5 - i  // newest first
  return `${y}-${String(y+1).slice(2)}`
})

export default function ClientPageClient({ id }: { id: string }) {
  const router  = useRouter()
  const [client, setClient]               = useState<Client|null>(null)
  const [loading, setLoading]             = useState(true)
  const [editing, setEditing]             = useState(false)
  const [form, setForm]                   = useState<Partial<Client>>({})
  const [saving, setSaving]               = useState(false)
  const [showClear, setShowClear]         = useState(false)
  const [showHandle, setShowHandle]       = useState(false)
  const [toast, setToast]                 = useState('')
  const [notes, setNotes]                 = useState('')
  const [notesSaving, setNotesSaving]     = useState(false)
  const [notesSaved, setNotesSaved]       = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res  = await fetch(`/api/crm/clients/${id}`)
      if (res.status === 401) { router.replace('/crm'); return }
      const data = await res.json()
      if (data.ok) { setClient(data.client); setForm(data.client); setNotes(data.client.notes ?? '') }
      else router.push('/crm/dashboard')
    } catch { router.push('/crm/dashboard') }
    setLoading(false)
  }, [id, router])
  useEffect(() => { load() }, [load])

  function showMsg(msg:string) { setToast(msg); setTimeout(()=>setToast(''),3000) }

  async function saveNotes() {
    setNotesSaving(true)
    await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'update',data:{...client,notes}})})
    setNotesSaving(false)
    setNotesSaved(true)
    setTimeout(()=>setNotesSaved(false), 2500)
  }

  async function save() {
    setSaving(true)
    const res  = await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'update',data:form})})
    const data = await res.json()
    if (data.ok) { setClient(data.client); setEditing(false); showMsg('Changes saved') }
    setSaving(false)
  }
  async function doClear() {
    const res  = await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'clear'})})
    const data = await res.json()
    if (data.ok) { await load(); showMsg('Sensitive details cleared') }
    setShowClear(false)
  }
  async function doHandle() {
    const res  = await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'handle'})})
    const data = await res.json()
    if (data.ok) { await load(); showMsg('Marked as handled') }
    setShowHandle(false)
  }

  if (loading) return (
    <div className="crm-scope">
      <CrmSide items={crmNav()} activeKey="clients" />
      <main>
        <div className="pbody">
          <div className="empty"><div className="eh">Loading…</div></div>
        </div>
      </main>
    </div>
  )
  if (!client) return null

  const initials = client.fullName.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()
  const fmtDate  = (iso:string) => new Date(iso).toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'})

  return (
    <div className="crm-scope">
      <CrmSide items={crmNav()} activeKey="clients" />

      <main>
        <div className="phead">
          <div className="hrow">
            <button className="btn quiet" onClick={()=>router.push('/crm/dashboard')}>
              <span className="ic">{NavIcons.back}</span>Back
            </button>
            <div className="ticon" style={{width:34,height:34,fontSize:12,fontWeight:700}}>{initials}</div>
            <div style={{minWidth:0}}>
              <h1 className="vt">{displayName(client.fullName)}</h1>
              <div className="vsub" style={{marginBottom:0,display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
                <span>🌍 {client.country}</span>
                <span>Tax year: <strong>{client.taxYear}</strong></span>
                {client.handled
                  ? <span className="chip good">✓ Handled</span>
                  : <span className="chip warn">⏳ Pending</span>}
                <span>Submitted: {fmtDate(client.submittedAt)}</span>
              </div>
            </div>
            <div className="hspacer" />
            {!client.handled && <button className="btn take" onClick={()=>setShowHandle(true)}>✓ Mark handled</button>}
            {editing
              ? <><button className="btn quiet" onClick={()=>{setEditing(false);setForm(client)}}>Cancel</button>
                  <button className="btn take" onClick={save} disabled={saving}>{saving?'Saving…':'Save changes'}</button></>
              : <button className="btn quiet" onClick={()=>setEditing(true)}>Edit</button>
            }
          </div>
        </div>

        <div className="pbody">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
            <Section title="Personal details">
              <Row label="Full name"     value={client.fullName}  field="fullName"  editing={editing} form={form} setForm={setForm}/>
              <Row label="Date of birth" value={client.dob}       field="dob"       editing={editing} form={form} setForm={setForm} type="date"/>
              <Row label="Country"       value={client.country}   field="country"   editing={editing} form={form} setForm={setForm}/>
              <Row label="Marital"       value={client.marital}   field="marital"   editing={editing} form={form} setForm={setForm}/>
            </Section>
            <Section title="Contact details">
              <Row label="WhatsApp"  value={client.whatsapp}  field="whatsapp" editing={editing} form={form} setForm={setForm} ltr/>
              <Row label="AU phone"  value={client.auPhone}   field="auPhone"  editing={editing} form={form} setForm={setForm} ltr/>
              <Row label="Email"     value={client.email}     field="email"    editing={editing} form={form} setForm={setForm} ltr/>
              <Row label="Address"   value={client.address}   field="address"  editing={editing} form={form} setForm={setForm}/>
            </Section>
            <Section title="Tax & employment">
              <Row label="TFN 🔒"        value={client.tfn}         field="tfn"         editing={editing} form={form} setForm={setForm} ltr/>
              <Row label="Bank 🔒"       value={client.bankDetails} field="bankDetails" editing={editing} form={form} setForm={setForm} ltr/>
              <Row label="Employer"      value={client.primaryJob}  field="primaryJob"  editing={editing} form={form} setForm={setForm}/>
              <Row label="Tax status"    value={client.taxStatus}   field="taxStatus"   editing={editing} form={form} setForm={setForm}/>
            </Section>
            <Section title="Other info">
              {editing ? (
                <div className="frow">
                  <div className="fk">Tax year</div>
                  <div className="fv">
                    <select value={(form.taxYear??'')} onChange={e=>setForm({...form,taxYear:e.target.value as TaxYear})} style={{direction:'ltr'}}>
                      {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>
              ) : (
                <Row label="Tax year"    value={client.taxYear}  field="taxYear"  editing={false} form={form} setForm={setForm} ltr/>
              )}
              <Row label="How they heard" value={client.howHeard} field="howHeard" editing={editing} form={form} setForm={setForm}/>
            </Section>
          </div>

          <div className="panel" style={{marginBottom:12}}>
            <h3>
              <span style={{color:'var(--brand1)',lineHeight:0}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </span>
              Internal notes
            </h3>
            <textarea
              placeholder="Add private notes about this client - follow-ups, reminders, anything relevant..."
              value={notes}
              onChange={e => { setNotes(e.target.value); setNotesSaved(false) }}
            />
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:9,marginTop:8}}>
              {notesSaved
                ? <span className="chip good">✓ Saved</span>
                : <span style={{fontSize:11,color:'var(--ink3)'}}>Only visible to you</span>
              }
              <button
                className="btn take"
                onClick={saveNotes}
                disabled={notesSaving || notes === (client?.notes ?? '')}
              >
                {notesSaving ? 'Saving…' : 'Save notes'}
              </button>
            </div>
          </div>

          <div className="panel" style={{border:'1px dashed color-mix(in srgb, var(--crit) 45%, transparent)'}}>
            <h3 style={{color:'var(--crit)'}}>⚠️ Danger zone</h3>
            <p className="psub">Once the return is processed, clear all sensitive details. Kept: full name, date of birth, and WhatsApp only.</p>
            <button className="btn danger" onClick={()=>setShowClear(true)}>Clear sensitive details</button>
          </div>
        </div>
      </main>

      {toast && <div className="toast show">{toast}</div>}

      {showClear && (
        <div className="overlay">
          <div className="modal">
            <div className="mh"><span style={{fontSize:20,lineHeight:1}}>🗑️</span><b>Clear sensitive details?</b></div>
            <div className="msub">Permanently deletes email, address, TFN, bank details, employer and documents.<br/><br/><strong>Kept:</strong> full name, date of birth, WhatsApp.</div>
            <div className="mfoot">
              <button className="btn quiet" onClick={()=>setShowClear(false)}>Cancel</button>
              <button className="btn danger" onClick={doClear}>Yes, clear</button>
            </div>
          </div>
        </div>
      )}

      {showHandle && (
        <div className="overlay">
          <div className="modal">
            <div className="mh"><span style={{fontSize:20,lineHeight:1}}>✅</span><b>Mark as handled?</b></div>
            <div className="msub">This client will move to the Handled tab.</div>
            <div className="mfoot">
              <button className="btn quiet" onClick={()=>setShowHandle(false)}>Cancel</button>
              <button className="btn take" onClick={doHandle}>Yes, mark handled</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Section({title,children}:{title:string;children:React.ReactNode}) {
  return <div className="card"><div className="sechead">{title}</div>{children}</div>
}

// Displays a stored "First Middle... Last" name as "Last, First Middle..." for consistent CRM display
function displayName(name:string) {
  const parts = (name||'').trim().split(/\s+/).filter(Boolean)
  if (parts.length < 2) return name
  const last = parts[parts.length-1]
  const rest = parts.slice(0,-1).join(' ')
  return `${last}, ${rest}`
}

// Groups digits into blocks of 3 for readability (TFN), preserving a leading "+"
function groupDigits(val:string) {
  if (!val) return val
  const hasPlus = val.trim().startsWith('+')
  const digits = val.replace(/\D/g,'')
  if (!digits) return val
  const groups = digits.match(/.{1,3}/g)?.join(' ') || digits
  return hasPlus ? `+${groups}` : groups
}
// Formats phone numbers the way they actually appear in WhatsApp/real life, using each
// country's own convention. NANP numbers (+1, US/Canada) are a special case: WhatsApp
// shows them as "+1 (XXX) XXX-XXXX" rather than the plain international grouping.
function formatPhoneNumber(val:string) {
  if (!val) return val
  let cleaned = val.trim()
  if (!cleaned) return val

  // "00" is the common international dialing prefix used outside the NANP
  // (North America) - treat it the same as a leading "+".
  if (/^00\d/.test(cleaned)) cleaned = `+${cleaned.slice(2)}`

  const applyFormat = (p: ReturnType<typeof parsePhoneNumberFromString>) =>
    p!.countryCallingCode === '1' ? `+1 ${p!.formatNational()}` : p!.formatInternational()

  if (cleaned.startsWith('+')) {
    const p = parsePhoneNumberFromString(cleaned)
    if (p) return applyFormat(p)
  } else {
    const digits = cleaned.replace(/\D/g, '')
    // Looks like a local AU number (starts with a trunk "0")
    if (digits.startsWith('0')) {
      const p = parsePhoneNumberFromString(digits, 'AU')
      if (p && p.isValid()) return p.formatNational()
    }
    // No "+" and no leading "0" - people often type/paste the number with
    // the country code but forget the "+" (e.g. "61491570156"). Try
    // treating the digits as an international number with an implied "+".
    if (digits.length >= 8) {
      const p = parsePhoneNumberFromString(`+${digits}`)
      if (p && p.isValid()) return applyFormat(p)
    }
    // Last resort AU parse without requiring strict validity, in case it's
    // a slightly malformed but clearly AU-shaped number.
    if (digits.startsWith('0')) {
      const p = parsePhoneNumberFromString(digits, 'AU')
      if (p) return p.formatNational()
    }
  }

  // Nothing parsed - fall back to plain 3-digit grouping so it's at least readable
  const hasPlus = cleaned.startsWith('+')
  const digits = cleaned.replace(/\D/g, '')
  const groups = digits.match(/.{1,3}/g)?.join(' ') || digits
  return hasPlus ? `+${groups}` : groups
}

function Row({label,value,field,editing,form,setForm,type='text',ltr=false}:{
  label:string;value:string;field:string;editing:boolean
  form:Record<string,unknown>;setForm:(f:Record<string,unknown>)=>void
  type?:string;ltr?:boolean
}) {
  const phoneFields = ['whatsapp','auPhone']
  const display = phoneFields.includes(field) ? formatPhoneNumber(value) : field === 'tfn' ? groupDigits(value) : field === 'fullName' ? displayName(value) : value
  return (
    <div className="frow">
      <div className="fk">{label}</div>
      {editing
        ? <div className="fv">
            <input type={type} value={(form[field] as string)??''} onChange={e=>setForm({...form,[field]:e.target.value})} style={{direction:ltr?'ltr':'inherit'}}/>
          </div>
        : <div className="fv" style={{direction:ltr?'ltr':'inherit',...(value?{}:{color:'var(--ink3)'})}}>{display||'-'}</div>
      }
    </div>
  )
}

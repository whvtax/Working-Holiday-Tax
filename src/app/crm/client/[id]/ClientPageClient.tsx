'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type TaxYear = '2019-20'|'2020-21'|'2021-22'|'2022-23'|'2023-24'|'2024-25'
type Client = {
  id:string; fullName:string; dob:string; whatsapp:string; email:string; country:string
  address:string; tfn:string; bankDetails:string; primaryJob:string; marital:string
  taxStatus:string; howHeard:string; auPhone:string; taxYear:TaxYear
  submittedAt:string; handled:boolean
  files:{bankStatement:string|null;selfiePassport:string|null;invoices:string|null}
}
const TAX_YEARS:TaxYear[] = ['2024-25','2023-24','2022-23','2021-22','2020-21','2019-20']

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

  async function load() {
    setLoading(true)
    const res  = await fetch(`/api/crm/clients/${id}`)
    const data = await res.json()
    if (data.ok) { setClient(data.client); setForm(data.client) }
    else router.push('/crm/dashboard')
    setLoading(false)
  }
  useEffect(() => { load() }, [id])

  function showMsg(msg:string) { setToast(msg); setTimeout(()=>setToast(''),3000) }

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

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'system-ui',color:'#7a8a82'}}>Loading…</div>
  if (!client) return null

  const initials = client.fullName.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()
  const fmtDate  = (iso:string) => new Date(iso).toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'})

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        .cp{min-height:100vh;background:#f4f6f5;font-family:'DM Sans',system-ui,sans-serif;padding:24px 28px;max-width:880px;margin:0 auto;}
        .cp-topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
        .cp-back{background:#fff;border:1px solid #e4eae7;border-radius:9px;padding:8px 14px;font-size:13px;font-weight:500;cursor:pointer;color:#333;font-family:inherit;}
        .cp-btns{display:flex;gap:7px;}
        .cp-btn-edit{padding:8px 14px;border:1px solid #e4eae7;border-radius:9px;font-size:12px;font-weight:500;color:#333;background:#fff;cursor:pointer;font-family:inherit;}
        .cp-btn-cancel{padding:8px 14px;border:1px solid #fca5a5;border-radius:9px;font-size:12px;font-weight:500;color:#c0392b;background:#fff;cursor:pointer;font-family:inherit;}
        .cp-btn-save{padding:8px 14px;border:none;border-radius:9px;font-size:12px;font-weight:600;color:#fff;background:#059669;cursor:pointer;font-family:inherit;}
        .cp-btn-handle{padding:8px 14px;border:none;border-radius:9px;font-size:12px;font-weight:600;color:#fff;background:#0E5C42;cursor:pointer;font-family:inherit;}
        .cp-profile{background:#fff;border-radius:16px;padding:22px 26px;margin-bottom:16px;border:1px solid #e8eeeb;display:flex;align-items:center;gap:18px;}
        .cp-avatar{width:58px;height:58px;border-radius:16px;background:linear-gradient(135deg,#0E5C42,#1a9a6a);color:#fff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700;flex-shrink:0;}
        .cp-name{font-size:20px;font-weight:600;color:#0a1410;margin-bottom:5px;letter-spacing:-0.3px;}
        .cp-meta{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:#7a8a82;margin-bottom:3px;}
        .cp-date{font-size:11px;color:#aabab2;}
        .cp-tag-p{background:#fffbeb;color:#b45309;border:1px solid #fde68a;border-radius:6px;padding:2px 8px;font-size:10px;font-weight:600;}
        .cp-tag-d{background:#ecfdf5;color:#059669;border:1px solid #a7f3d0;border-radius:6px;padding:2px 8px;font-size:10px;font-weight:600;}
        .cp-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;}
        .cp-section{background:#fff;border-radius:13px;border:1px solid #e8eeeb;overflow:hidden;}
        .cp-sec-head{font-size:12px;font-weight:600;color:#0E5C42;padding:11px 18px;background:#f7fbf9;border-bottom:1px solid #edf3ef;}
        .cp-row{display:flex;align-items:center;padding:9px 18px;border-bottom:1px solid #f5f7f6;gap:10px;}
        .cp-row:last-child{border-bottom:none;}
        .cp-lbl{font-size:11px;color:#aabab2;font-weight:500;min-width:100px;flex-shrink:0;}
        .cp-val{font-size:12px;color:#0a1410;flex:1;}
        .cp-val.ltr{direction:ltr;text-align:right;}
        .cp-val.empty{color:#ccc;}
        .cp-input{flex:1;padding:5px 10px;border:1.5px solid #0E5C42;border-radius:7px;font-size:12px;outline:none;font-family:inherit;background:#edf7f2;color:#0a1410;}
        .cp-danger{background:#fff;border-radius:13px;padding:18px 22px;border:1px dashed #fca5a5;}
        .cp-danger-title{font-size:13px;font-weight:600;color:#c0392b;margin-bottom:5px;}
        .cp-danger-text{font-size:12px;color:#7a8a82;margin-bottom:12px;line-height:1.6;}
        .cp-danger-btn{padding:8px 16px;border:1px solid #fca5a5;border-radius:8px;background:#fff;color:#c0392b;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;}
        .cp-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:999;}
        .cp-modal{background:#fff;border-radius:20px;padding:30px 28px;max-width:360px;width:90%;text-align:center;}
        .cp-modal-icon{font-size:36px;margin-bottom:10px;}
        .cp-modal-title{font-size:17px;font-weight:600;margin:0 0 8px;color:#0a1410;}
        .cp-modal-text{font-size:13px;color:#7a8a82;line-height:1.65;margin-bottom:18px;}
        .cp-modal-btns{display:flex;gap:9px;justify-content:center;}
        .cp-modal-cancel{padding:9px 18px;border-radius:9px;border:1px solid #e4eae7;background:#fff;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;}
        .cp-modal-del{padding:9px 18px;border-radius:9px;border:none;background:#c0392b;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}
        .cp-modal-ok{padding:9px 18px;border-radius:9px;border:none;background:#0E5C42;color:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;}
        .cp-toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:#0a1410;color:#fff;border-radius:10px;padding:11px 22px;font-size:13px;font-weight:500;z-index:1000;white-space:nowrap;font-family:'DM Sans',system-ui,sans-serif;}
      `}</style>

      {toast && <div className="cp-toast">{toast}</div>}

      {showClear && (
        <div className="cp-overlay">
          <div className="cp-modal">
            <div className="cp-modal-icon">🗑️</div>
            <h2 className="cp-modal-title">Clear sensitive details?</h2>
            <p className="cp-modal-text">Permanently deletes email, address, TFN, bank details, employer and documents.<br/><br/><strong>Kept:</strong> full name, date of birth, WhatsApp.</p>
            <div className="cp-modal-btns">
              <button className="cp-modal-cancel" onClick={()=>setShowClear(false)}>Cancel</button>
              <button className="cp-modal-del" onClick={doClear}>Yes, clear</button>
            </div>
          </div>
        </div>
      )}

      {showHandle && (
        <div className="cp-overlay">
          <div className="cp-modal">
            <div className="cp-modal-icon">✅</div>
            <h2 className="cp-modal-title">Mark as handled?</h2>
            <p className="cp-modal-text">This client will move to the Handled tab.</p>
            <div className="cp-modal-btns">
              <button className="cp-modal-cancel" onClick={()=>setShowHandle(false)}>Cancel</button>
              <button className="cp-modal-ok" onClick={doHandle}>Yes, mark handled</button>
            </div>
          </div>
        </div>
      )}

      <div className="cp">
        <div className="cp-topbar">
          <button className="cp-back" onClick={()=>router.push('/crm/dashboard')}>← Back</button>
          <div className="cp-btns">
            {!client.handled && <button className="cp-btn-handle" onClick={()=>setShowHandle(true)}>✓ Mark handled</button>}
            {editing
              ? <><button className="cp-btn-cancel" onClick={()=>{setEditing(false);setForm(client)}}>Cancel</button>
                  <button className="cp-btn-save" onClick={save} disabled={saving}>{saving?'Saving…':'Save changes'}</button></>
              : <button className="cp-btn-edit" onClick={()=>setEditing(true)}>Edit</button>
            }
          </div>
        </div>

        <div className="cp-profile">
          <div className="cp-avatar">{initials}</div>
          <div>
            <div className="cp-name">{client.fullName}</div>
            <div className="cp-meta">
              <span>🌍 {client.country}</span>
              <span>Tax year: <strong>{client.taxYear}</strong></span>
              {client.handled ? <span className="cp-tag-d">✓ Handled</span> : <span className="cp-tag-p">⏳ Pending</span>}
            </div>
            <div className="cp-date">Submitted: {fmtDate(client.submittedAt)}</div>
          </div>
        </div>

        <div className="cp-grid">
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
              <div className="cp-row">
                <span className="cp-lbl">Tax year</span>
                <select className="cp-input" value={(form.taxYear??'')} onChange={e=>setForm({...form,taxYear:e.target.value as TaxYear})} style={{direction:'ltr'}}>
                  {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            ) : (
              <Row label="Tax year"    value={client.taxYear}  field="taxYear"  editing={false} form={form} setForm={setForm} ltr/>
            )}
            <Row label="How they heard" value={client.howHeard} field="howHeard" editing={editing} form={form} setForm={setForm}/>
          </Section>
        </div>

        <div className="cp-danger">
          <div className="cp-danger-title">⚠️ Danger zone</div>
          <p className="cp-danger-text">Once the return is processed, clear all sensitive details. Kept: full name, date of birth, and WhatsApp only.</p>
          <button className="cp-danger-btn" onClick={()=>setShowClear(true)}>Clear sensitive details</button>
        </div>
      </div>
    </>
  )
}

function Section({title,children}:{title:string;children:React.ReactNode}) {
  return <div className="cp-section"><div className="cp-sec-head">{title}</div>{children}</div>
}

function Row({label,value,field,editing,form,setForm,type='text',ltr=false}:{
  label:string;value:string;field:string;editing:boolean
  form:Record<string,unknown>;setForm:(f:Record<string,unknown>)=>void
  type?:string;ltr?:boolean
}) {
  return (
    <div className="cp-row">
      <span className="cp-lbl">{label}</span>
      {editing
        ? <input type={type} className="cp-input" value={(form[field] as string)??''} onChange={e=>setForm({...form,[field]:e.target.value})} style={{direction:ltr?'ltr':'inherit'}}/>
        : <span className={`cp-val${ltr?' ltr':''}${!value?' empty':''}`}>{value||'—'}</span>
      }
    </div>
  )
}

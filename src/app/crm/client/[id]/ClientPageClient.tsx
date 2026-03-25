'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type TaxYear = '2019-20'|'2020-21'|'2021-22'|'2022-23'|'2023-24'|'2024-25'
type Client = {
  id:string; fullName:string; dob:string; whatsapp:string; email:string; country:string
  address:string; tfn:string; bankDetails:string; primaryJob:string; marital:string
  taxStatus:string; howHeard:string; auPhone:string; taxYear:TaxYear
  submittedAt:string; handled:boolean; notes:string
  files:{bankStatement:string|null;selfiePassport:string|null;invoices:string|null}
}
type ClientFile = {
  id: string; client_id: string; blob_url: string; label: string
  file_name: string; file_size: number; mime_type: string; uploaded_at: string
}
const TAX_YEARS:TaxYear[] = ['2024-25','2023-24','2022-23','2021-22','2020-21','2019-20']
const CSRF_HEADERS_BASE = { 'X-Requested-With': 'XMLHttpRequest' } as const
const CSRF_HEADERS = { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' } as const

export default function ClientPageClient({ id }: { id: string }) {
  const router  = useRouter()
  const [client, setClient]             = useState<Client|null>(null)
  const [loading, setLoading]           = useState(true)
  const [editing, setEditing]           = useState(false)
  const [form, setForm]                 = useState<Partial<Client>>({})
  const [saving, setSaving]             = useState(false)
  const [showClear, setShowClear]       = useState(false)
  const [showHandle, setShowHandle]     = useState(false)
  const [toast, setToast]               = useState('')
  const [notes, setNotes]               = useState('')
  const [notesSaving, setNotesSaving]   = useState(false)
  const [notesSaved, setNotesSaved]     = useState(false)

  // Files state
  const [files, setFiles]               = useState<ClientFile[]>([])
  const [filesLoading, setFilesLoading] = useState(false)
  const [uploading, setUploading]       = useState(false)
  const [uploadLabel, setUploadLabel]   = useState('')
  const [confirmDelFile, setConfirmDelFile] = useState<ClientFile|null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Secure viewer state
  const [viewerFile, setViewerFile]         = useState<ClientFile|null>(null)
  const [viewerUrl, setViewerUrl]           = useState<string>('')

  function openViewer(file: ClientFile) {
    // Use secure proxy — never exposes the real blob URL to the browser
    setViewerFile(file)
    setViewerUrl(`/api/crm/clients/${id}/files/view?fileId=${encodeURIComponent(file.id)}`)
  }

  function closeViewer() { setViewerFile(null); setViewerUrl('') }

  async function load() {
    setLoading(true)
    try {
      const res  = await fetch(`/api/crm/clients/${id}`)
      if (res.status === 401) { router.replace('/crm'); return }
      const data = await res.json()
      if (data.ok) { setClient(data.client); setForm(data.client); setNotes(data.client.notes ?? '') }
      else router.push('/crm/dashboard')
    } catch { router.push('/crm/dashboard') }
    setLoading(false)
  }

  async function loadFiles() {
    setFilesLoading(true)
    try {
      const res  = await fetch(`/api/crm/clients/${id}/files`)
      if (res.ok) { const d = await res.json(); if (d.ok) setFiles(d.files) }
    } catch {}
    setFilesLoading(false)
  }

  useEffect(() => { load(); loadFiles() }, [id])

  function showMsg(msg:string) { setToast(msg); setTimeout(()=>setToast(''),3000) }

  async function saveNotes() {
    setNotesSaving(true)
    await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:CSRF_HEADERS,body:JSON.stringify({action:'update',data:{...client,notes}})})
    setNotesSaving(false); setNotesSaved(true); setTimeout(()=>setNotesSaved(false), 2500)
  }

  async function save() {
    setSaving(true)
    const res  = await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:CSRF_HEADERS,body:JSON.stringify({action:'update',data:form})})
    const data = await res.json()
    if (data.ok) { setClient(data.client); setEditing(false); showMsg('Changes saved') }
    setSaving(false)
  }

  async function doClear() {
    const res  = await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:CSRF_HEADERS,body:JSON.stringify({action:'clear'})})
    const data = await res.json()
    if (data.ok) { await load(); showMsg('Sensitive details cleared') }
    setShowClear(false)
  }

  async function doHandle() {
    const res  = await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:CSRF_HEADERS,body:JSON.stringify({action:'handle'})})
    const data = await res.json()
    if (data.ok) { await load(); showMsg('Marked as handled') }
    setShowHandle(false)
  }

  async function uploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('label', uploadLabel.trim() || file.name)
      const res = await fetch(`/api/crm/clients/${id}/files`, {
        method: 'POST',
        headers: CSRF_HEADERS_BASE,
        body: fd,
      })
      const data = await res.json()
      if (data.ok) { setFiles(prev => [data.file, ...prev]); setUploadLabel(''); showMsg('File uploaded') }
      else showMsg(data.error || 'Upload failed')
    } catch { showMsg('Upload failed') }
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  async function deleteFile(file: ClientFile) {
    try {
      const res = await fetch(`/api/crm/clients/${id}/files`, {
        method: 'DELETE',
        headers: CSRF_HEADERS,
        body: JSON.stringify({ fileId: file.id }),
      })
      const data = await res.json()
      if (data.ok) { setFiles(prev => prev.filter(f => f.id !== file.id)); showMsg('File deleted') }
      else showMsg('Delete failed')
    } catch { showMsg('Delete failed') }
    setConfirmDelFile(null)
  }

  function fmtSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024*1024) return `${(bytes/1024).toFixed(0)} KB`
    return `${(bytes/(1024*1024)).toFixed(1)} MB`
  }

  function fileIcon(mime: string) {
    if (mime.startsWith('image/')) return '🖼️'
    if (mime === 'application/pdf') return '📄'
    return '📎'
  }

  if (loading) return <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'system-ui',color:'#7a8a82'}}>Loading…</div>
  if (!client) return null

  const initials = client.fullName.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()
  const fmtDate  = (iso:string) => new Date(iso).toLocaleDateString('en-AU',{day:'numeric',month:'long',year:'numeric'})

  return (
    <>
      <style>{`
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
        .cp-notes{background:#fff;border-radius:13px;padding:18px 22px;border:1px solid #e8eeeb;margin-bottom:12px;}
        .cp-notes-title{font-size:12px;font-weight:600;color:#0E5C42;margin-bottom:10px;display:flex;align-items:center;gap:7px;}
        .cp-notes-textarea{width:100%;border:1.5px solid #e4ede8;border-radius:10px;padding:12px 14px;font-size:13px;font-family:'DM Sans',system-ui,sans-serif;background:#f7fbf9;color:#0a1410;outline:none;resize:vertical;min-height:100px;line-height:1.6;transition:border-color 0.18s;}
        .cp-notes-textarea:focus{border-color:#0E5C42;background:#edf7f2;}
        .cp-notes-textarea::placeholder{color:#b0c2b8;font-weight:300;}
        .cp-notes-footer{display:flex;align-items:center;justify-content:space-between;margin-top:8px;}
        .cp-notes-hint{font-size:11px;color:#aabab2;}
        .cp-notes-save{padding:6px 14px;border:none;border-radius:8px;background:#0E5C42;color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;transition:opacity 0.15s;}
        .cp-notes-save:disabled{opacity:0.45;cursor:not-allowed;}
        .cp-notes-saved{font-size:11px;color:#059669;font-weight:500;}
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

        /* Files section */
        .cp-files{background:#fff;border-radius:13px;border:1px solid #e8eeeb;overflow:hidden;margin-bottom:12px;}
        .cp-files-head{font-size:12px;font-weight:600;color:#0E5C42;padding:11px 18px;background:#f7fbf9;border-bottom:1px solid #edf3ef;display:flex;align-items:center;justify-content:space-between;}
        .cp-files-body{padding:14px 18px;}
        .cp-upload-row{display:flex;gap:8px;margin-bottom:14px;align-items:center;flex-wrap:wrap;}
        .cp-upload-label-input{flex:1;min-width:140px;padding:7px 10px;border:1.5px solid #e4ede8;border-radius:8px;font-size:12px;font-family:inherit;outline:none;color:#0a1410;background:#f7fbf9;}
        .cp-upload-label-input:focus{border-color:#0E5C42;background:#edf7f2;}
        .cp-upload-btn{padding:7px 14px;border:1.5px dashed #0E5C42;border-radius:8px;background:#edf7f2;color:#0E5C42;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;white-space:nowrap;}
        .cp-upload-btn:disabled{opacity:0.5;cursor:not-allowed;}
        .cp-file-list{display:flex;flex-direction:column;gap:8px;}
        .cp-file-item{display:flex;align-items:center;gap:10px;padding:10px 12px;background:#f7fbf9;border-radius:9px;border:1px solid #edf3ef;}
        .cp-file-icon{font-size:20px;flex-shrink:0;line-height:1;}
        .cp-file-info{flex:1;min-width:0;}
        .cp-file-name{font-size:13px;font-weight:500;color:#0a1410;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .cp-file-meta{font-size:11px;color:#aabab2;margin-top:2px;}
        .cp-file-actions{display:flex;gap:6px;flex-shrink:0;}
        .cp-file-view{padding:5px 11px;border:1px solid #0E5C42;border-radius:7px;background:#edf7f2;color:#0E5C42;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:4px;}
        .cp-file-dl{padding:5px 11px;border:1px solid #0E5C42;border-radius:7px;background:#fff;color:#0E5C42;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;text-decoration:none;display:inline-flex;align-items:center;gap:4px;}
        .cp-file-del{padding:5px 10px;border:1px solid #fca5a5;border-radius:7px;background:#fff;color:#c0392b;font-size:11px;font-weight:600;cursor:pointer;font-family:inherit;}
        .cp-files-empty{font-size:13px;color:#aabab2;text-align:center;padding:20px 0;}

        /* Secure Viewer */
        .cp-viewer-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.82);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;z-index:1100;padding:20px;}
        .cp-viewer-bar{width:100%;max-width:900px;display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
        .cp-viewer-title{font-size:14px;font-weight:600;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:calc(100% - 120px);}
        .cp-viewer-actions{display:flex;gap:8px;flex-shrink:0;}
        .cp-viewer-dl{padding:7px 14px;border:1px solid rgba(255,255,255,0.3);border-radius:8px;background:rgba(255,255,255,0.1);color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;text-decoration:none;display:inline-flex;align-items:center;gap:5px;}
        .cp-viewer-close{padding:7px 14px;border:none;border-radius:8px;background:rgba(255,255,255,0.15);color:#fff;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;}
        .cp-viewer-frame{width:100%;max-width:900px;flex:1;border-radius:12px;overflow:hidden;background:#fff;max-height:calc(100vh - 100px);}
        .cp-viewer-img{max-width:100%;max-height:calc(100vh - 100px);border-radius:12px;object-fit:contain;display:block;margin:0 auto;}
        .cp-viewer-pdf{width:100%;height:calc(100vh - 100px);border:none;border-radius:12px;}
        .cp-viewer-unsupported{color:#fff;text-align:center;padding:40px;font-size:14px;}
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

      {confirmDelFile && (
        <div className="cp-overlay">
          <div className="cp-modal">
            <div className="cp-modal-icon">🗂️</div>
            <h2 className="cp-modal-title">Delete file?</h2>
            <p className="cp-modal-text">"{confirmDelFile.label}" will be permanently deleted from the server and cannot be recovered.</p>
            <div className="cp-modal-btns">
              <button className="cp-modal-cancel" onClick={()=>setConfirmDelFile(null)}>Cancel</button>
              <button className="cp-modal-del" onClick={()=>deleteFile(confirmDelFile)}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Secure File Viewer — uses /api proxy, never exposes blob URL */}
      {viewerFile && viewerUrl && (
        <div className="cp-viewer-overlay" onClick={e=>{if(e.target===e.currentTarget)closeViewer()}}>
          <div className="cp-viewer-bar">
            <span className="cp-viewer-title">👁 {viewerFile.label}</span>
            <div className="cp-viewer-actions">
              <a
                className="cp-viewer-dl"
                href={viewerUrl}
                download={viewerFile.file_name}
              >
                ↓ Download
              </a>
              <button className="cp-viewer-close" onClick={closeViewer}>✕ Close</button>
            </div>
          </div>
          {viewerFile.mime_type.startsWith('image/') ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              className="cp-viewer-img"
              src={viewerUrl}
              alt={viewerFile.label}
            />
          ) : viewerFile.mime_type === 'application/pdf' ? (
            <iframe
              className="cp-viewer-pdf"
              src={viewerUrl}
              title={viewerFile.label}
            />
          ) : (
            <div className="cp-viewer-unsupported">
              Preview not available for this file type.<br/>
              <a className="cp-viewer-dl" style={{marginTop:16,display:'inline-flex'}} href={viewerUrl} download={viewerFile.file_name}>↓ Download file</a>
            </div>
          )}
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

        {/* ── Files section ── */}
        <div className="cp-files">
          <div className="cp-files-head">
            <span>📁 Documents & files</span>
            <span style={{fontSize:'11px',color:'#aabab2',fontWeight:400}}>{files.length} file{files.length!==1?'s':''}</span>
          </div>
          <div className="cp-files-body">
            {/* Upload row */}
            <div className="cp-upload-row">
              <input
                className="cp-upload-label-input"
                placeholder="Label (optional, e.g. Passport, Bank Statement…)"
                value={uploadLabel}
                onChange={e=>setUploadLabel(e.target.value)}
                disabled={uploading}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf"
                style={{display:'none'}}
                onChange={uploadFile}
              />
              <button
                className="cp-upload-btn"
                disabled={uploading}
                onClick={()=>fileInputRef.current?.click()}
              >
                {uploading ? 'Uploading…' : '+ Upload file'}
              </button>
            </div>

            {/* File list */}
            {filesLoading ? (
              <div className="cp-files-empty">Loading files…</div>
            ) : files.length === 0 ? (
              <div className="cp-files-empty">No documents uploaded yet</div>
            ) : (
              <div className="cp-file-list">
                {files.map(f => (
                  <div key={f.id} className="cp-file-item">
                    <span className="cp-file-icon">{fileIcon(f.mime_type)}</span>
                    <div className="cp-file-info">
                      <div className="cp-file-name">{f.label}</div>
                      <div className="cp-file-meta">{f.file_name} · {fmtSize(f.file_size)} · {new Date(f.uploaded_at).toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'})}</div>
                    </div>
                    <div className="cp-file-actions">
                      <button
                        className="cp-file-view"
                        onClick={()=>openViewer(f)}
                        title="View file"
                      >
                        👁 View
                      </button>
                      <a
                        className="cp-file-dl"
                        href={`/api/crm/clients/${id}/files/view?fileId=${encodeURIComponent(f.id)}`}
                        download={f.file_name}
                        title="Download file"
                      >
                        ↓ Download
                      </a>
                      <button className="cp-file-del" onClick={()=>setConfirmDelFile(f)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="cp-notes">
          <div className="cp-notes-title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#0E5C42" strokeWidth="1.8"/>
              <path d="M8 13h8M8 17h5" stroke="#0E5C42" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Internal notes
          </div>
          <textarea
            className="cp-notes-textarea"
            placeholder="Add private notes about this client — follow-ups, reminders, anything relevant..."
            value={notes}
            onChange={e => { setNotes(e.target.value); setNotesSaved(false) }}
          />
          <div className="cp-notes-footer">
            {notesSaved
              ? <span className="cp-notes-saved">✓ Saved</span>
              : <span className="cp-notes-hint">Only visible to you</span>
            }
            <button
              className="cp-notes-save"
              onClick={saveNotes}
              disabled={notesSaving || notes === (client?.notes ?? '')}
            >
              {notesSaving ? 'Saving…' : 'Save notes'}
            </button>
          </div>
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

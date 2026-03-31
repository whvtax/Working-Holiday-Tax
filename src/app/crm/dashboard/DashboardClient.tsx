'use client'
import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

type TaskType = 'tax-return'|'super'|'tfn'|'abn'
type TaxReturn     = { year:string; refundAmount:number; type:'refund'|'owed'; completedAt:string }
type SuperReturn   = { year:string; amount:number; completedAt:string }
type ServiceRecord = { done:boolean; completedAt:string; notes:string }
type Task = {
  id:string; clientId:string; clientName:string; taskType:TaskType
  whatsapp:string; email:string; country:string; dob:string; taxYear:string
  submittedAt:string; done:boolean; address:string; tfn:string; bankDetails:string
  primaryJob:string; marital:string; taxStatus:string; howHeard:string; auPhone:string; notes:string
  fileUrls:string[]
}
type Client = {
  id:string; fullName:string; dob:string; whatsapp:string; email:string
  country:string; howHeard:string; notes:string; createdAt:string
  taxReturns:TaxReturn[]; superReturns:SuperReturn[]
  tfnService:ServiceRecord; abnService:ServiceRecord
  archived?: boolean
  yearlyCheckins?: Record<string, boolean>
}
type View = 'tasks'|'clients'|'client-detail'|'archive'

const CY = new Date().getFullYear()
const TAX_YEARS = Array.from({length:9},(_,i)=>`${CY-2+i}-${String(CY-1+i).slice(2)}`)
const TASK_LABELS: Record<TaskType,string> = {
  'tax-return':'Tax Return','super':'Super Refund','tfn':'TFN Application','abn':'ABN Application'
}
const TASK_COLORS: Record<TaskType,string> = {
  'tax-return':'#0E5C42','super':'#2563eb','tfn':'#7c3aed','abn':'#c2410c'
}


function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: copied ? '#059669' : '#c8d8d0', padding: '2px 3px',
        borderRadius: 4, display: 'flex', alignItems: 'center',
        flexShrink: 0, lineHeight: 1, transition: 'color 0.2s',
      }}
      title="Copy"
    >
      {copied
        ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
      }
    </button>
  )
}

export default function DashboardClient() {
  const router = useRouter()
  const [view, setView]           = useState<View>('tasks')
  const [archivedClients, setArchivedClients] = useState<Client[]>([])
  const [checkinYear, setCheckinYear] = useState('2024-25')
  const [checkinFilter, setCheckinFilter] = useState<'all'|'done'|'pending'>('all')
  const [taskView, setTaskView]   = useState<'list'|'detail'>('list')
  const [tasks, setTasks]         = useState<Task[]>([])
  const [clients, setClients]     = useState<Client[]>([])
  const [activeTask, setActiveTask] = useState<Task|null>(null)
  const [activeClient, setActiveClient] = useState<Client|null>(null)
  const [taskNotes, setTaskNotes] = useState('')
  const [notesSaved, setNotesSaved] = useState(false)
  const [clientNotes, setClientNotes] = useState('')
  const [clientNotesSaved, setClientNotesSaved] = useState(false)
  const [search, setSearch]       = useState('')
  const [yearFilter, setYearFilter] = useState('all')
  const [howHeardFilter, setHowHeardFilter] = useState<Set<string>>(new Set())
  const [countryFilter, setCountryFilter] = useState<Set<string>>(new Set())
  const [archiveSearch, setArchiveSearch] = useState('')
  const [openDropdown, setOpenDropdown] = useState<string|null>(null)
  const [archiveYearFilter, setArchiveYearFilter] = useState('all')
  const [archiveHowHeardFilter, setArchiveHowHeardFilter] = useState<Set<string>>(new Set())
  const [archiveCountryFilter, setArchiveCountryFilter] = useState<Set<string>>(new Set())
  const [loading, setLoading]     = useState(true)
  const [previewUrl, setPreviewUrl] = useState<string|null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string|null>(null)
  const [confirmDeleteClient, setConfirmDeleteClient] = useState<string|null>(null)
  const [confirmComplete, setConfirmComplete] = useState<string|null>(null)
  // Add forms
  const [showAddTax, setShowAddTax]     = useState(false)
  const [showAddSuper, setShowAddSuper] = useState(false)
  const [newTaxYear, setNewTaxYear]     = useState('')
  const [newTaxAmt, setNewTaxAmt]       = useState('')
  const [newTaxType, setNewTaxType]     = useState<'refund'|'owed'>('refund')
  const [newSuperYear, setNewSuperYear] = useState('')
  const [newSuperAmt, setNewSuperAmt]   = useState('')
  const [newClient, setNewClient]       = useState({fullName:'',whatsapp:'',email:'',country:'',dob:'',taxYear:'2024-25' as string})

  const loadTasks   = useCallback(async()=>{
    try {
      const r=await fetch('/api/crm/tasks')
      if(r.status===401){ window.location.replace('/crm'); return }
      const d=await r.json(); if(d.ok) setTasks(d.tasks)
    } catch(e){ console.error('[loadTasks]',e) }
  },[])
  const loadClients = useCallback(async()=>{
    try {
      const r=await fetch('/api/crm/clients')
      if(r.status===401){ window.location.replace('/crm'); return }
      const d=await r.json(); if(d.ok) setClients(d.clients)
    } catch(e){ console.error('[loadClients]',e) }
  },[])

  const loadArchived = useCallback(async()=>{
    try {
      const r=await fetch('/api/crm/clients?archived=true')
      const d=await r.json(); if(d.ok) setArchivedClients(d.clients)
    } catch(e){ console.error('[loadArchived]',e) }
  },[])

  useEffect(()=>{ Promise.all([loadTasks(),loadClients(),loadArchived()]).finally(()=>setLoading(false)) },[loadTasks,loadClients,loadArchived])

  async function lockAndExit() { await fetch('/api/crm/logout',{method:'POST'}); window.location.replace('/crm') }

  async function archiveClient(id: string) {
    await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'archive'})})
    await loadClients(); await loadArchived()
  }
  async function unarchiveClient(id: string) {
    await fetch(`/api/crm/clients/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'unarchive'})})
    await loadClients(); await loadArchived()
  }
  async function toggleCheckin(clientId: string, year: string, current: boolean) {
    await fetch(`/api/crm/clients/${clientId}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'checkin',year,done:!current})})
    await loadClients()
  }

  async function markDone(id:string) {
    await fetch(`/api/crm/tasks/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'done'})})
    // Remove task from view immediately — all PII has been wiped server-side
    setTasks(prev => prev.filter(t => t.id !== id))
    setActiveTask(null)
    setTaskView('list')
    setConfirmComplete(null)
    await loadClients()
  }

  async function saveTaskNotes() {
    if(!activeTask) return
    await fetch(`/api/crm/tasks/${activeTask.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'notes',notes:taskNotes})})
    setNotesSaved(true); setTimeout(()=>setNotesSaved(false),2500)
  }

  async function deleteTask(id:string) {
    await fetch(`/api/crm/tasks/${id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'delete'})})
    setActiveTask(null); setTaskView('list'); setConfirmDelete(null)
    await Promise.all([loadTasks(),loadClients(),loadArchived()])
  }

  async function saveClientNotes() {
    if(!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'notes',notes:clientNotes})})
    setClientNotesSaved(true); setTimeout(()=>setClientNotesSaved(false),2500)
  }

  async function addTaxReturn() {
    if(!activeClient||!newTaxYear||!newTaxAmt) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({action:'add-tax',data:{year:newTaxYear,refundAmount:parseFloat(newTaxAmt),type:newTaxType,completedAt:new Date().toISOString()}})})
    setNewTaxYear(''); setNewTaxAmt(''); setNewTaxType('refund'); setShowAddTax(false)
    refreshClient()
  }

  async function removeTaxReturn(year:string) {
    if(!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'remove-tax',year})})
    refreshClient()
  }

  async function addSuperReturn() {
    if(!activeClient||!newSuperYear||!newSuperAmt) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({action:'add-super',data:{year:newSuperYear,amount:parseFloat(newSuperAmt),completedAt:new Date().toISOString()}})})
    setNewSuperYear(''); setNewSuperAmt(''); setShowAddSuper(false)
    refreshClient()
  }

  async function removeSuperReturn(year:string) {
    if(!activeClient) return
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'remove-super',year})})
    refreshClient()
  }

  async function toggleService(service:'tfn'|'abn', current:ServiceRecord) {
    if(!activeClient) return
    const updated = { ...current, done:!current.done, completedAt:!current.done?new Date().toISOString():'' }
    await fetch(`/api/crm/clients/${activeClient.id}`,{method:'PATCH',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({action:'service',service,data:updated})})
    refreshClient()
  }

  async function refreshClient() {
    if(!activeClient) return
    const r=await fetch(`/api/crm/clients/${activeClient.id}`)
    const d=await r.json()
    if(d.ok){ setActiveClient(d.client); await loadClients() }
  }

  async function deleteClient(id:string) {
    await fetch(`/api/crm/clients/${id}`,{method:'DELETE'})
    setActiveClient(null); setView('clients'); setConfirmDeleteClient(null)
    await loadClients()
  }

  async function addClient(e:React.FormEvent) {
    e.preventDefault()
    // Add as a task for now
    await fetch('/api/crm/tasks',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        clientName:newClient.fullName, taskType:'tax-return',
        whatsapp:newClient.whatsapp, email:newClient.email, country:newClient.country,
        dob:newClient.dob, taxYear:newClient.taxYear, submittedAt:new Date().toISOString(),
        address:'',tfn:'',bankDetails:'',primaryJob:'',marital:'',taxStatus:'Working Holiday Maker',
        howHeard:'',auPhone:'',notes:'',fileUrls:[],
      })})
    setNewClient({fullName:'',whatsapp:'',email:'',country:'',dob:'',taxYear:'2024-25'})
    setShowAddModal(false); await loadTasks()
  }

  const fmtDate   = (iso:string) => iso ? new Date(iso).toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric'}) : '—'
  const fmtDateTime = (iso:string) => iso ? new Date(iso).toLocaleString('en-AU',{
    day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit',timeZone:'Australia/Sydney'
  }) + ' AEST' : '—'

  const downloadTaskPdf = (task: Task) => {
    console.log('[PDF] downloadTaskPdf called with task:', task?.id, task?.clientName)
    const GREEN = '#0B5240'
    const LIGHT_GREEN = '#EAF6F1'
    const esc = (s: string) => (s || '—').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

    // Build form fields matching exact form layout
    const formField = (label: string, value: string, required = true) =>
      '<div style="margin-bottom:16px">'
      + '<label style="display:block;font-size:13px;font-weight:600;color:#1A2822;margin-bottom:6px">'
      + esc(label) + (required ? '<span style="color:' + GREEN + ';margin-left:3px">*</span>' : '')
      + '</label>'
      + '<div style="width:100%;padding:12px 14px;font-size:14px;color:#0a1410;background:#f7fbf9;border:1.5px solid #d0e8de;border-radius:10px;min-height:44px;word-break:break-word">'
      + esc(value) + '</div></div>'

    const sectionTitle = (title: string) =>
      '<div style="font-size:11px;font-weight:700;color:' + GREEN + ';text-transform:uppercase;letter-spacing:0.06em;margin:20px 0 12px;border-bottom:1.5px solid ' + LIGHT_GREEN + ';padding-bottom:8px">'
      + title + '</div>'

    const fileListHtml = (task.fileUrls ?? []).map((url, i) => {
      let name = url.split('/').pop() ?? ('file-' + (i + 1))
      try { name = decodeURIComponent(name) } catch {}
      name = name.replace(/^\d+_/, '').slice(0, 80)
      const icon = url.toLowerCase().endsWith('.pdf') ? '📄' : '🖼️'
      return '<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#f7fbf9;border:1px solid #d0e8de;border-radius:8px;margin-bottom:8px">'
        + '<span style="font-size:13px;color:#0a1410">' + icon + ' ' + esc(name) + '</span>'
        + '<a href="' + url + '" style="font-size:11px;color:' + GREEN + ';background:' + LIGHT_GREEN + ';border:1px solid #c8eadf;border-radius:6px;padding:3px 10px;text-decoration:none;font-weight:600">View ↗</a>'
        + '</div>'
    }).join('')

    // Form-specific fields based on taskType
    const taskTitles: Record<string,string> = {
      'tax-return': 'Tax Return Form',
      'super': 'Superannuation Refund',
      'tfn': 'TFN Application',
      'abn': 'ABN Application',
    }

    let formBody = ''

    if (task.taskType === 'tax-return') {
      const taxDecl = (task.notes || '').match(/Declaration: ([^|]+)/)?.[1]?.trim() || ''
      formBody = sectionTitle('Contact details')
        + formField('WhatsApp / Phone Number', task.whatsapp)
        + formField('Australian Phone Number', task.auPhone)
        + formField('Full Name (including middle name)', task.clientName)
        + formField('Email Address', task.email)
        + formField('Full Address in Australia', task.address)
        + sectionTitle('Personal information')
        + formField('Home Country', task.country)
        + formField('Date of Birth', task.dob)
        + formField('Marital Status', task.marital)
        + sectionTitle('Tax information')
        + formField('Tax File Number (TFN)', task.tfn)
        + formField('Tax Year', task.taxYear)
        + formField('Tax Status', task.taxStatus)
        + formField('Primary job in the past year', task.primaryJob)
        + formField('Bank details', task.bankDetails)
        + sectionTitle('How did you hear about us?')
        + formField('How did you hear about us?', task.howHeard)
        + (taxDecl ? sectionTitle('Declaration') + formField('Tax residency declaration', taxDecl) : '')
    } else if (task.taskType === 'super') {
      const notes = task.notes || ''
      const passport = notes.match(/Passport No: ([^|]+)/)?.[1]?.trim() || '—'
      const superFunds = notes.match(/Super Funds: ([^|]+)/)?.[1]?.trim() || '—'
      const homeAddress = notes.match(/Home Country Address: ([^|]+)/)?.[1]?.trim() || '—'
      const superDecl = notes.match(/Declaration: ([^|]+)/)?.[1]?.trim() || ''
      formBody = sectionTitle('Personal details')
        + formField('First name (including middle name)', task.clientName.split(' ').slice(0,-1).join(' ') || task.clientName)
        + formField('Last name', task.clientName.split(' ').pop() || '')
        + formField('Date of birth', task.dob)
        + formField('Passport number', passport)
        + formField('Country that issued the passport', task.country)
        + sectionTitle('Contact details')
        + formField('Phone number for SMS', task.whatsapp)
        + formField('Email address', task.email)
        + formField('Full Australian address', task.address)
        + formField('Full home country address', homeAddress)
        + sectionTitle('Tax & super fund details')
        + formField('TFN (Tax File Number)', task.tfn)
        + formField('Super fund details', superFunds)
        + formField('Bank details', task.bankDetails)
        + (superDecl ? sectionTitle('Declaration') + formField('Client agreement', superDecl) : '')
    } else if (task.taskType === 'tfn') {
      const notes = task.notes || ''
      const passport = notes.match(/Passport No: ([^|]+)/)?.[1]?.trim() || '—'
      const gender = notes.match(/Gender: ([^|]+)/)?.[1]?.trim() || '—'
      const tfnDecl = notes.match(/Declaration: ([^|]+)/)?.[1]?.trim() || ''
      const tfnTerms = notes.match(/Terms: ([^|]+)/)?.[1]?.trim() || ''
      formBody = sectionTitle('Personal details')
        + formField('First name (including middle name)', task.clientName.split(' ').slice(0,-1).join(' ') || task.clientName)
        + formField('Last name', task.clientName.split(' ').pop() || '')
        + formField('Country of passport', task.country)
        + formField('Passport number', passport)
        + formField('Email address', task.email)
        + formField('Date of birth', task.dob)
        + formField('WhatsApp number', task.whatsapp)
        + formField('Australian phone number', task.auPhone)
        + formField('Gender as shown in passport', gender)
        + formField('Marital status', task.marital)
        + formField('Full Australian address', task.address)
        + (tfnDecl || tfnTerms ? sectionTitle('Declaration')
          + (tfnDecl ? formField('Personal declaration', tfnDecl) : '')
          + (tfnTerms ? formField('Client agreement', tfnTerms) : '') : '')
    } else if (task.taskType === 'abn') {
      const notes = task.notes || ''
      const gender = notes.match(/Gender: ([^|]+)/)?.[1]?.trim() || '—'
      const abnDecl = notes.match(/Declaration: ([^|]+)/)?.[1]?.trim() || ''
      const abnTerms = notes.match(/Terms: ([^|]+)/)?.[1]?.trim() || ''
      formBody = sectionTitle('Personal details')
        + formField('First name (including middle name)', task.clientName.split(' ').slice(0,-1).join(' ') || task.clientName)
        + formField('Last name', task.clientName.split(' ').pop() || '')
        + formField('Date of birth', task.dob)
        + formField('Gender as shown in passport', gender)
        + formField('WhatsApp number', task.whatsapp)
        + formField('Australian phone number', task.auPhone)
        + formField('Email address', task.email)
        + formField('Full Australian address', task.address)
        + formField('TFN (Tax File Number)', task.tfn)
        + formField('Brief description of business activity', task.primaryJob)
        + (abnDecl || abnTerms ? sectionTitle('Declaration')
          + (abnDecl ? formField('Business declaration', abnDecl) : '')
          + (abnTerms ? formField('Client agreement', abnTerms) : '') : '')
    }

    const html = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>'
      + '<title>' + (taskTitles[task.taskType] ?? task.taskType) + ' — ' + esc(task.clientName) + '</title>'
      + '<style>'
      + '*{box-sizing:border-box;margin:0;padding:0}'
      + 'body{font-family:-apple-system,"Helvetica Neue",Arial,sans-serif;background:#fff;color:#0a1410;padding:32px 36px;max-width:680px;margin:0 auto}'
      + '@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.no-print{display:none!important}}'
      + '</style></head><body>'

      // Header — exactly like the form
      + '<div style="text-align:center;margin-bottom:28px;padding-bottom:20px;border-bottom:2px solid ' + LIGHT_GREEN + '">'
      + '<div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:8px">'
      + '<div style="width:40px;height:40px;background:' + GREEN + ';border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0">'
      + '<svg width="22" height="22" viewBox="0 0 34 34" fill="none"><rect x="2" y="2" width="19" height="19" rx="4.5" stroke="#5BB88A" stroke-width="2" fill="none"/><rect x="13" y="13" width="19" height="19" rx="4.5" fill="white"/><path d="M2 21L13 13" stroke="#5BB88A" stroke-width="2" stroke-linecap="round"/><path d="M22.5 16.5L27.3 18.7L27.3 23.5Q27.3 27.3 22.5 29.3Q17.7 27.3 17.7 23.5L17.7 18.7Z" fill="rgba(11,82,64,0.12)" stroke="' + GREEN + '" stroke-width="1.3" stroke-linejoin="round"/><polyline points="20.4,23 22.2,25 25,21.5" fill="none" stroke="' + GREEN + '" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</div>'
      + '<span style="font-size:14px;font-weight:700;color:' + GREEN + '">Working Holiday Tax</span>'
      + '</div>'
      + '<h1 style="font-size:26px;font-weight:800;color:#080F0D;letter-spacing:-0.02em;margin-bottom:6px">' + (taskTitles[task.taskType] ?? task.taskType) + '</h1>'
      + '<p style="font-size:12px;color:#6b7f76">Submitted: ' + fmtDateTime(task.submittedAt) + '</p>'
      + '</div>'

      + formBody

      + ((task.fileUrls ?? []).length > 0
        ? sectionTitle('Documents uploaded') + fileListHtml
        : '')

      + (task.notes
        ? sectionTitle('Internal notes')
          + '<div style="padding:12px 14px;background:#fffbeb;border:1px solid #fde68a;border-radius:8px;font-size:13px;color:#0a1410">' + esc(task.notes) + '</div>'
        : '')

      + '<div style="margin-top:32px;padding-top:12px;border-top:1px solid #e8f0eb;display:flex;justify-content:space-between">'
      + '<div style="font-size:10px;color:#aabab2">Generated ' + new Date().toLocaleString('en-AU', {timeZone:'Australia/Sydney'}) + ' AEST</div>'
      + '<div style="font-size:10px;color:#aabab2">Working Holiday Tax · workingholidaytax.com.au</div>'
      + '</div>'

      + '<script class="no-print">window.onload=function(){window.print()}<\/script>'
      + '</body></html>'

    // Download as HTML file — works everywhere, no popup blocker issues
    console.log('[PDF] HTML generated, length:', html.length, 'creating blob...')
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = ((task.clientName || 'form').replace(/[^a-z0-9]/gi, '_') + '_' + task.taskType + '.html').toLowerCase()
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  }
  const fmtCur    = (n:number)   => new Intl.NumberFormat('en-AU',{style:'currency',currency:'AUD',maximumFractionDigits:0}).format(n)
  const initials  = (name:string) => name.split(' ').map((n:string)=>n[0]).join('').slice(0,2).toUpperCase()
  const avatarColors = [['#e8f5f0','#0E5C42'],['#eef3fb','#2563eb'],['#fef3e8','#c2410c'],['#f3eefe','#7c3aed'],['#fef0f0','#dc2626'],['#f0fdf4','#16a34a']]
  const avColor   = (name:string) => avatarColors[name.charCodeAt(0)%avatarColors.length]

  const pendingTasks = tasks.filter(t=>!t.done)
  const doneTasks    = tasks.filter(t=>t.done)
  const visibleClients = clients.filter(c=>{
    const ms = !search || c.fullName.toLowerCase().includes(search.toLowerCase()) || c.email?.includes(search) || c.whatsapp?.includes(search)
    const my = yearFilter==='all' || c.taxReturns.some(r=>r.year===yearFilter) || c.superReturns.some(r=>r.year===yearFilter)
    const checkinDone = c.yearlyCheckins?.[checkinYear] ?? false
    const mc = checkinFilter==='all' || (checkinFilter==='done' && checkinDone) || (checkinFilter==='pending' && !checkinDone)
    const mh = howHeardFilter.size===0 || howHeardFilter.has(c.howHeard||'Unknown')
    const mcountry = countryFilter.size===0 || countryFilter.has(c.country||'')
    return ms && my && mc && mh && mcountry
  })
  // Generic dropdown button component (avoids <details> which has cross-browser issues)
  const DropBtn = ({id,label,icon,active,onClear,children}:{id:string;label:string;icon:React.ReactNode;active:boolean;onClear:()=>void;children:React.ReactNode}) => {
    const isOpen = openDropdown === id
    return (
      <div style={{flexShrink:0,position:'relative'}}>
        <button
          onClick={()=>setOpenDropdown(isOpen?null:id)}
          style={{height:'38px',padding:'0 12px',border:`1.5px solid ${active?'#0E5C42':'#d8e4dc'}`,borderRadius:9,fontSize:13,background:active?'#e8f5f0':'#fff',color:active?'#0E5C42':'#4a5568',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',gap:6,whiteSpace:'nowrap' as const,fontWeight:active?600:400}}>
          {icon}
          {label}

          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" style={{marginLeft:2,opacity:.5,transform:isOpen?'rotate(180deg)':'rotate(0deg)',transition:'transform 0.15s'}}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        {isOpen && <>
          <div style={{position:'fixed',inset:0,zIndex:98}} onClick={()=>setOpenDropdown(null)}/>
          <div style={{position:'absolute',top:'calc(100% + 6px)',left:0,zIndex:99,background:'#fff',border:'1.5px solid #e4ede8',borderRadius:10,padding:'10px 12px',minWidth:200,boxShadow:'0 8px 24px rgba(0,0,0,0.1)'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,paddingBottom:6,borderBottom:'1px solid #f0f4f1'}}>
              <span style={{fontSize:11,fontWeight:700,color:'#7a8a82',textTransform:'uppercase' as const,letterSpacing:'0.08em'}}>{label}</span>
              {active && <button style={{fontSize:11,color:'#0E5C42',background:'none',border:'none',cursor:'pointer',fontFamily:'inherit',fontWeight:600}} onClick={e=>{e.stopPropagation();onClear()}}>Clear</button>}
            </div>
            {children}
          </div>
        </>}
      </div>
    )
  }

  const howHeardStats = clients.reduce((acc:Record<string,number>,c)=>{ const k=c.howHeard||'Unknown'; acc[k]=(acc[k]||0)+1; return acc },{})
  const archiveHowHeardStats = archivedClients.reduce((acc:Record<string,number>,c)=>{ const k=c.howHeard||'Unknown'; acc[k]=(acc[k]||0)+1; return acc },{})
  const visibleArchived = archivedClients.filter(c=>{
    const ms = !archiveSearch || c.fullName.toLowerCase().includes(archiveSearch.toLowerCase()) || c.whatsapp?.includes(archiveSearch) || c.email?.includes(archiveSearch)
    const my = archiveYearFilter==='all' || c.taxReturns?.some(r=>r.year===archiveYearFilter) || c.superReturns?.some(r=>r.year===archiveYearFilter)
    const mh = archiveHowHeardFilter.size===0 || archiveHowHeardFilter.has(c.howHeard||'Unknown')
    const mc = archiveCountryFilter.size===0 || archiveCountryFilter.has(c.country||'')
    return ms && my && mh && mc
  })

  const S: Record<string,React.CSSProperties> = {
    shell:{display:'flex',minHeight:'100vh',fontFamily:'"DM Sans",system-ui,sans-serif'},
    sb:{width:212,background:'#0E5C42',display:'flex',flexDirection:'column',justifyContent:'space-between',flexShrink:0,position:'sticky',top:0,height:'100vh'},
    sbLogo:{display:'flex',alignItems:'center',gap:10,padding:'18px 14px 14px'},
    sbIcon:{width:34,height:34,borderRadius:9,background:'rgba(255,255,255,0.14)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0},
    sbTitle:{fontSize:13,fontWeight:600,color:'#fff'},
    sbSub:{fontSize:10,color:'rgba(255,255,255,0.38)',marginTop:1},
    sbDiv:{height:1,background:'rgba(255,255,255,0.1)',margin:'0 12px 8px'},
    sbNav:{display:'flex',flexDirection:'column',gap:2,padding:'0 7px'},
    sbBtn:{display:'flex',alignItems:'center',gap:9,padding:'9px 11px',borderRadius:8,fontSize:12,fontWeight:500,color:'rgba(255,255,255,0.5)',cursor:'pointer',border:'none',background:'none',fontFamily:'inherit',width:'100%',transition:'all 0.15s'},
    sbBtnOn:{background:'rgba(255,255,255,0.16)',color:'#fff',fontWeight:600},
    sbBadge:{marginLeft:'auto',background:'#f59e0b',color:'#78350f',borderRadius:20,padding:'1px 6px',fontSize:10,fontWeight:700},
    sbLock:{display:'flex',alignItems:'center',gap:7,padding:'9px 11px 16px',fontSize:11,color:'rgba(255,255,255,0.4)',cursor:'pointer',border:'none',background:'none',fontFamily:'inherit',width:'100%'},
    main:{flex:1,background:'#f0f4f1',overflowY:'auto'},
    page:{padding:'26px 26px 32px'},
    pgTitle:{fontSize:19,fontWeight:600,color:'#0a1410',marginBottom:2,letterSpacing:'-0.3px'},
    pgSub:{fontSize:12,color:'#7a8a82',marginBottom:18},
    card:{background:'#fff',borderRadius:13,border:'1px solid #e4ede8'},
    secHead:{fontSize:11,fontWeight:700,color:'#0E5C42',padding:'10px 16px',background:'#f7fbf9',borderBottom:'1px solid #edf3ef',borderRadius:'13px 13px 0 0',display:'flex',alignItems:'center',justifyContent:'space-between'},
    row:{display:'flex',padding:'8px 16px',borderBottom:'1px solid #f8f8f8',gap:10,alignItems:'center'},
    lbl:{fontSize:11,color:'#aabab2',fontWeight:500,minWidth:110,flexShrink:0},
    val:{fontSize:12,color:'#0a1410',flex:1},
    taskCard:{background:'#fff',borderRadius:12,padding:'12px 14px',border:'1px solid #e4ede8',display:'flex',alignItems:'center',gap:11,cursor:'pointer',transition:'border-color 0.15s,box-shadow 0.15s',marginBottom:6},
    returnRow:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 13px',background:'#f7fbf9',borderRadius:9,marginBottom:6,border:'1px solid #e4ede8'},
    totalRow:{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 13px',background:'#e8f5f0',borderRadius:9,border:'1px solid #b0d8c8'},
    addForm:{background:'#f7fbf9',borderRadius:10,padding:'12px',border:'1px solid #e4ede8',marginTop:8,display:'flex',gap:8,alignItems:'flex-end',flexWrap:'wrap' as const},
    addBtn:{display:'flex',alignItems:'center',gap:5,padding:'5px 11px',background:'#0E5C42',border:'none',borderRadius:7,fontSize:11,fontWeight:600,color:'#fff',cursor:'pointer',fontFamily:'inherit'},
    backBtn:{display:'flex',alignItems:'center',gap:6,background:'none',border:'none',fontSize:12,color:'#0E5C42',cursor:'pointer',fontFamily:'inherit',fontWeight:500,marginBottom:18,padding:0},
    checkRow:{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px'},
    checkbox:{width:20,height:20,borderRadius:6,border:'2px solid',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0},
    overlay:{position:'fixed' as const,inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:999},
    modal:{background:'#fff',borderRadius:20,padding:'28px',width:'100%',maxWidth:400},
    mTitle:{fontSize:17,fontWeight:600,color:'#0a1410',marginBottom:5},
    mSub:{fontSize:13,color:'#7a8a82',marginBottom:18},
    mInput:{border:'1.5px solid #e4ede8',borderRadius:10,padding:'10px 12px',fontSize:13,fontFamily:'inherit',background:'#f7fbf9',color:'#0a1410',outline:'none',width:'100%',boxSizing:'border-box' as const},
    mFooter:{display:'flex',gap:8,marginTop:12},
    mCancel:{flex:1,padding:10,border:'1px solid #e4ede8',borderRadius:10,fontSize:13,cursor:'pointer',background:'#fff',fontFamily:'inherit',color:'#333'},
    mSave:{flex:2,padding:10,border:'none',borderRadius:10,fontSize:13,fontWeight:600,cursor:'pointer',background:'#0E5C42',color:'#fff',fontFamily:'inherit'},
    mDel:{flex:2,padding:10,border:'none',borderRadius:10,fontSize:13,fontWeight:600,cursor:'pointer',background:'#c0392b',color:'#fff',fontFamily:'inherit'},
  }

  const SbButton = ({v,label,icon,badge}:{v:View,label:string,icon:React.ReactNode,badge?:number})=>(
    <button style={{...S.sbBtn,...(view===v?S.sbBtnOn:{})}} onClick={()=>{setView(v);setTaskView('list');setActiveTask(null);setActiveClient(null)}}>
      {icon}{label}
      {badge!=null && badge>0 && <span style={S.sbBadge}>{badge}</span>}
    </button>
  )

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} body{background:#f0f4f1;font-family:"DM Sans",system-ui,sans-serif;}`}</style>

      <div style={S.shell}>
        {/* Sidebar */}
        <aside style={S.sb}>
          <div>
            <div style={S.sbLogo}>
              <div style={S.sbIcon}><svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 12L2 7M12 12l10-5M12 12v10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg></div>
              <div><div style={S.sbTitle}>WHV Tax CRM</div><div style={S.sbSub}>Admin Portal</div></div>
            </div>
            <div style={S.sbDiv}/>
            <nav style={S.sbNav}>
              <SbButton v="tasks" label="Tasks" badge={pendingTasks.length}
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/></svg>}/>
              <SbButton v="clients" label="Clients"
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}/>
              <SbButton v="archive" label="Archive" badge={archivedClients.length||undefined}
                icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 8v13H3V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 3H1v5h22V3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}/>
            </nav>
          </div>
          <button style={S.sbLock} onClick={lockAndExit}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="5" y="11" width="14" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8"/><path d="M8 11V7.5a4 4 0 018 0V11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
            Lock &amp; Exit
          </button>
        </aside>

        <main style={S.main}>

          {/* ── TASK LIST ── */}
          {view==='tasks' && taskView==='list' && (
            <div style={S.page}>
              <div style={S.pgTitle}>Tasks</div>
              <div style={S.pgSub}>Tax return submissions awaiting processing</div>

              {pendingTasks.length>0 && <>
                <div style={{fontSize:11,fontWeight:600,color:'#7a8a82',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:8,display:'flex',alignItems:'center',gap:6}}>
                  <span style={{color:'#d97706',fontSize:8}}>●</span> Pending — {pendingTasks.length}
                </div>
                {pendingTasks.map(t=>(
                  <div key={t.id} style={{...S.taskCard}} onClick={()=>{setActiveTask(t);setTaskNotes(t.notes);setTaskView('detail')}}>
                    <div style={{width:9,height:9,borderRadius:'50%',background:'#f59e0b',flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:500,color:'#0a1410',marginBottom:2}}>{t.clientName}</div>
                      <div style={{fontSize:11,color:'#7a8a82'}}>{t.country} · <span style={{background:TASK_COLORS[t.taskType]+'22',color:TASK_COLORS[t.taskType],borderRadius:5,padding:'1px 6px',fontSize:10,fontWeight:700}}>{TASK_LABELS[t.taskType]}</span></div>
                    </div>
                    <div style={{fontSize:11,color:'#aabab2'}}>{fmtDate(t.submittedAt)}</div>
                  </div>
                ))}
              </>}

              {doneTasks.length>0 && <>
                <div style={{fontSize:11,fontWeight:600,color:'#7a8a82',textTransform:'uppercase',letterSpacing:'0.5px',margin:'14px 0 8px',display:'flex',alignItems:'center',gap:6}}>
                  <span style={{color:'#059669',fontSize:8}}>●</span> Done — {doneTasks.length}
                </div>
                {doneTasks.map(t=>(
                  <div key={t.id} style={{...S.taskCard,opacity:0.65}} onClick={()=>{setActiveTask(t);setTaskNotes(t.notes);setTaskView('detail')}}>
                    <div style={{width:9,height:9,borderRadius:'50%',background:'#059669',flexShrink:0}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:500,color:'#0a1410',marginBottom:2}}>{t.clientName}</div>
                      <div style={{fontSize:11,color:'#7a8a82'}}>{t.country} · <span style={{background:TASK_COLORS[t.taskType]+'22',color:TASK_COLORS[t.taskType],borderRadius:5,padding:'1px 6px',fontSize:10,fontWeight:700}}>{TASK_LABELS[t.taskType]}</span></div>
                    </div>
                    <div style={{fontSize:11,color:'#aabab2',marginRight:8}}>{fmtDate(t.submittedAt)}</div>
                    <button onClick={e=>{e.stopPropagation();setConfirmDelete(t.id)}} style={{padding:'4px 10px',background:'#fff',border:'1px solid #fca5a5',borderRadius:7,fontSize:11,fontWeight:600,color:'#c0392b',cursor:'pointer',fontFamily:'inherit'}}>Delete</button>
                  </div>
                ))}
              </>}

              {tasks.length===0 && <div style={{background:'#fff',borderRadius:13,padding:48,textAlign:'center',color:'#aabab2',fontSize:14,border:'1px solid #e4ede8'}}>No tasks yet.</div>}
            </div>
          )}

          {/* ── TASK DETAIL ── */}
          {view==='tasks' && taskView==='detail' && activeTask && (
            <div style={S.page}>
              <button style={S.backBtn} onClick={()=>setTaskView('list')}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Back to Tasks
              </button>

              {/* Header */}
              <div style={{...S.card,padding:'18px 20px',marginBottom:14,display:'flex',alignItems:'center',gap:14}}>
                <div style={{width:50,height:50,borderRadius:14,background:TASK_COLORS[activeTask.taskType],color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,flexShrink:0}}>{initials(activeTask.clientName)}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:18,fontWeight:600,color:'#0a1410',letterSpacing:'-0.2px'}}>{activeTask.clientName}</div>
                  <div style={{fontSize:12,color:'#7a8a82',marginTop:3,display:'flex',alignItems:'center',gap:8}}>
                    <span>{activeTask.country}</span>
                    <span style={{background:TASK_COLORS[activeTask.taskType]+'22',color:TASK_COLORS[activeTask.taskType],borderRadius:5,padding:'1px 8px',fontSize:11,fontWeight:700}}>{TASK_LABELS[activeTask.taskType]}</span>
                    <span>{activeTask.taxYear}</span>
                    <span>· Submitted {fmtDate(activeTask.submittedAt)}</span>
                  </div>
                </div>
                {activeTask.done
                  ? <span style={{background:'#ecfdf5',color:'#059669',border:'1px solid #a7f3d0',borderRadius:8,padding:'4px 12px',fontSize:12,fontWeight:600}}>✓ Done</span>
                  : <span style={{background:'#fffbeb',color:'#b45309',border:'1px solid #fde68a',borderRadius:8,padding:'4px 12px',fontSize:12,fontWeight:600}}>⏳ Pending</span>
                }
              </div>

              {/* 4 sections */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
                <div style={S.card}>
                  <div style={S.secHead}><span>Personal details</span></div>
                  {[['Full name',activeTask.clientName],['Date of birth',activeTask.dob],['Country',activeTask.country],['Marital',activeTask.marital]].map(([l,v])=>(
                    <div key={l} style={S.row}><span style={S.lbl}>{l}</span><span style={S.val}>{v||'—'}</span>{v&&<CopyBtn text={v}/>}</div>
                  ))}
                </div>
                <div style={S.card}>
                  <div style={S.secHead}><span>Contact details</span></div>
                  {[['WhatsApp',activeTask.whatsapp],['AU Phone',activeTask.auPhone],['Email',activeTask.email],['Address',activeTask.address]].map(([l,v])=>(
                    <div key={l} style={S.row}><span style={S.lbl}>{l}</span><span style={{...S.val,direction:'ltr',textAlign:'right'}}>{v||'—'}</span>{v&&<CopyBtn text={v}/>}</div>
                  ))}
                </div>
                <div style={S.card}>
                  <div style={S.secHead}><span>Tax & employment</span></div>
                  {[['TFN 🔒',activeTask.tfn],['Bank 🔒',activeTask.bankDetails],['Employer',activeTask.primaryJob],['Tax status',activeTask.taxStatus]].map(([l,v])=>(
                    <div key={l} style={S.row}><span style={S.lbl}>{l}</span><span style={{...S.val,direction:'ltr',textAlign:'right'}}>{v||'—'}</span>{v&&<CopyBtn text={v}/>}</div>
                  ))}
                </div>
                <div style={S.card}>
                  <div style={S.secHead}><span>Documents uploaded</span></div>
                  {(activeTask.fileUrls ?? []).length === 0 ? (
                    <div style={{fontSize:12,color:'#aabab2',padding:'8px 0'}}>No files uploaded</div>
                  ) : (activeTask.fileUrls ?? []).map((url, i) => {
                    const rawName = url.split('/').pop() ?? `file-${i+1}`
                    let name = rawName
                    try { name = decodeURIComponent(rawName) } catch { name = rawName }
                    name = name.replace(/^\d+_/, '').replace(/[/\\<>:"'|?*]/g, '_').slice(0, 100)
                    const isPdf = url.toLowerCase().endsWith('.pdf')
                    return (
                      <div key={url} style={{...S.row,justifyContent:'space-between',alignItems:'center'}}>
                        <span style={{fontSize:12,color:'#0a1410',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'60%'}}>{isPdf ? '📄' : '🖼️'} {name}</span>
                        <div style={{display:'flex',gap:6}}>
                          <button onClick={()=>setPreviewUrl(url)} style={{fontSize:11,color:'#0E5C42',background:'#eaf6f1',border:'1px solid #c8eadf',borderRadius:6,padding:'2px 9px',fontWeight:600,whiteSpace:'nowrap',cursor:'pointer',fontFamily:'inherit'}}>View</button>
                          <button onClick={async()=>{
                            try {
                              const res = await fetch(url)
                              const blob = await res.blob()
                              const a = document.createElement('a')
                              a.href = URL.createObjectURL(blob)
                              a.download = name
                              a.click()
                              URL.revokeObjectURL(a.href)
                            } catch { window.open(url,'_blank') }
                          }} style={{fontSize:11,color:'#fff',background:'#0E5C42',border:'1px solid #0B5240',borderRadius:6,padding:'2px 9px',fontWeight:600,whiteSpace:'nowrap',cursor:'pointer',fontFamily:'inherit'}}>Download ↓</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              {/* Notes */}
              <div style={{...S.card,padding:'14px 16px',marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:600,color:'#0a1410',marginBottom:8}}>Internal notes</div>
                <textarea style={{width:'100%',border:'1.5px solid #e4ede8',borderRadius:9,padding:'9px 11px',fontSize:12,fontFamily:'inherit',background:'#f7fbf9',color:'#0a1410',outline:'none',resize:'vertical',minHeight:72,lineHeight:1.55,boxSizing:'border-box'}}
                  placeholder="Add notes..." value={taskNotes} onChange={e=>{setTaskNotes(e.target.value);setNotesSaved(false)}}/>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:6}}>
                  {notesSaved?<span style={{fontSize:11,color:'#059669',fontWeight:500}}>✓ Saved</span>:<span/>}
                  <button style={{padding:'5px 13px',border:'none',borderRadius:7,background:'#0E5C42',color:'#fff',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit',opacity:taskNotes===activeTask.notes?0.4:1}} disabled={taskNotes===activeTask.notes} onClick={saveTaskNotes}>Save notes</button>
                </div>
              </div>

              {/* Actions */}
              <div style={{display:'flex',gap:10,marginBottom:8}}>
                <button style={{flex:1,padding:'12px',border:'1.5px solid #0E5C42',borderRadius:11,fontSize:14,fontWeight:600,background:'#fff',color:'#0E5C42',cursor:'pointer',fontFamily:'inherit',display:'flex',alignItems:'center',justifyContent:'center',gap:6}} onClick={()=>downloadTaskPdf(activeTask)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 20h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  Download PDF
                </button>
                {!activeTask.done && <button style={{flex:1,padding:'12px',border:'1.5px solid #d8e4dc',borderRadius:11,fontSize:14,fontWeight:600,background:'#fff',color:'#0a1410',cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setConfirmComplete(activeTask.id)}>✓ Mark as done</button>}
                <button style={{flex:1,padding:'12px',border:'1px solid #fca5a5',borderRadius:11,fontSize:14,fontWeight:600,background:'#fff',color:'#c0392b',cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setConfirmDelete(activeTask.id)}>🗑️ Delete &amp; archive client</button>
              </div>
              <div style={{fontSize:11,color:'#aabab2',textAlign:'center',marginTop:8}}>Deleting removes all sensitive data and creates/updates the client card</div>
            </div>
          )}

          {/* ── CLIENTS LIST ── */}
          {view==='clients' && !activeClient && (
            <div style={S.page}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,gap:12}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={S.pgTitle}>Clients</div>
                  <span style={{background:'#e8f5f0',color:'#0E5C42',borderRadius:20,padding:'3px 11px',fontSize:12,fontWeight:600}}>{visibleClients.length}{clients.length!==visibleClients.length?` of ${clients.length}`:''} total</span>
                </div>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <div style={{display:'flex',alignItems:'center',gap:6,background:'#f7fbf9',border:'1px solid #d8e4dc',borderRadius:9,padding:'5px 10px'}}>
                    <span style={{fontSize:11,color:'#7a8a82',fontWeight:500}}>✓ Year:</span>
                    <select value={checkinYear} onChange={e=>setCheckinYear(e.target.value)} style={{border:'none',background:'none',fontSize:12,fontWeight:600,color:'#0E5C42',cursor:'pointer',outline:'none',fontFamily:'inherit'}}>
                      {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                    </select>
                    <select value={checkinFilter} onChange={e=>setCheckinFilter(e.target.value as any)} style={{border:'none',background:'none',fontSize:11,color:'#555',cursor:'pointer',outline:'none',fontFamily:'inherit'}}>
                      <option value="all">All</option>
                      <option value="done">✓ Done</option>
                      <option value="pending">⏳ Pending</option>
                    </select>
                  </div>
                  <button style={{...S.addBtn,padding:'8px 14px',fontSize:13}} onClick={()=>setShowAddModal(true)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
                    Add Client
                  </button>
                </div>
              </div>

              {/* Filters row */}
              <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap',alignItems:'center'}}>
                <div style={{position:'relative',flex:3,minWidth:200}}>
                  <svg style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}} width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#aabab2" strokeWidth="1.8"/><path d="M21 21l-4.35-4.35" stroke="#aabab2" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <input style={{width:'100%',height:'38px',padding:'0 12px 0 32px',border:'1px solid #d8e4dc',borderRadius:9,fontSize:13,background:'#fff',outline:'none',fontFamily:'inherit',color:'#0a1410',boxSizing:'border-box'}} placeholder="Search by name, WhatsApp or email…" value={search} onChange={e=>setSearch(e.target.value)}/>
                </div>
                <select value={yearFilter} onChange={e=>setYearFilter(e.target.value)} style={{height:'38px',padding:'0 12px',border:'1px solid #d8e4dc',borderRadius:9,fontSize:13,background:'#fff',outline:'none',color:'#333',cursor:'pointer',fontFamily:'inherit',flexShrink:0}}>
                  <option value="all">All tax years</option>
                  {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                </select>
                {Object.keys(howHeardStats).length>0 && (
                  <DropBtn id="cl-hh" label="How heard" active={howHeardFilter.size>0} onClear={()=>setHowHeardFilter(new Set())}
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    {Object.keys(howHeardStats).sort().map(src=>{const checked=howHeardFilter.has(src);return(
                      <label key={src} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 2px',cursor:'pointer'}}>
                        <input type="checkbox" checked={checked} onChange={()=>{const s=new Set(howHeardFilter);checked?s.delete(src):s.add(src);setHowHeardFilter(s)}} style={{width:14,height:14,accentColor:'#0E5C42'}}/>
                        <span style={{fontSize:13,color:'#0a1410',flex:1}}>{src}</span>
                        <span style={{fontSize:11,color:'#aabab2'}}>{howHeardStats[src]}</span>
                      </label>
                    )})}
                  </DropBtn>
                )}
                {Array.from(new Set(clients.map(c=>c.country||'').filter(Boolean))).length>0 && (
                  <DropBtn id="cl-country" label="Country" active={countryFilter.size>0} onClear={()=>setCountryFilter(new Set())}
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    {Array.from(new Set(clients.map(c=>c.country||'').filter(Boolean))).sort().map(c=>{const checked=countryFilter.has(c);const cnt=clients.filter(cl=>cl.country===c).length;return(
                      <label key={c} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 2px',cursor:'pointer'}}>
                        <input type="checkbox" checked={checked} onChange={()=>{const s=new Set(countryFilter);checked?s.delete(c):s.add(c);setCountryFilter(s)}} style={{width:14,height:14,accentColor:'#0E5C42'}}/>
                        <span style={{fontSize:13,color:'#0a1410',flex:1}}>{c}</span>
                        <span style={{fontSize:11,color:'#aabab2'}}>{cnt}</span>
                      </label>
                    )})}
                  </DropBtn>
                )}
                {(howHeardFilter.size>0||countryFilter.size>0||yearFilter!=='all'||search) && (
                  <button style={{height:'38px',padding:'0 12px',border:'1px solid #fca5a5',borderRadius:9,fontSize:13,background:'#fff',color:'#c0392b',cursor:'pointer',fontFamily:'inherit',flexShrink:0}} onClick={()=>{setHowHeardFilter(new Set());setCountryFilter(new Set());setYearFilter('all');setSearch('')}}>
                    ✕ Clear
                  </button>
                )}
              </div>
              {/* Table */}
              {visibleClients.length===0 ? (
                <div style={{...S.card,padding:48,textAlign:'center',color:'#aabab2',fontSize:14}}>No clients yet.</div>
              ) : (
                <div style={S.card}>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead>
                      <tr>
                        {['Name','Country','Tax Year','WhatsApp','Email','✓',''].map(h=>(
                          <th key={h} style={{padding:'9px 14px',fontSize:10,fontWeight:600,color:'#7a8a82',textAlign:'left',background:'#f7fbf9',borderBottom:'1px solid #e4ede8',textTransform:'uppercase',letterSpacing:'0.4px',...(h===''?{paddingLeft:0}:{})}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleClients.map(cl=>{
                        const [bg,fg]=avColor(cl.fullName)
                        return (
                          <tr key={cl.id} style={{cursor:'pointer'}} onClick={()=>{setActiveClient(cl);setClientNotes(cl.notes||'');setView('clients')}}>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1'}}>
                              <div style={{display:'flex',alignItems:'center',gap:9}}>
                                <div style={{width:32,height:32,borderRadius:9,background:bg,color:fg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>{initials(cl.fullName)}</div>
                                <div style={{fontSize:12,fontWeight:500,color:'#0a1410'}}>{cl.fullName}</div>
                                {cl.whatsapp && (
                                  <a href={`https://wa.me/${cl.whatsapp.replace(/[^0-9+]/g,'')}`} target="_blank" rel="noopener noreferrer"
                                    onClick={e=>e.stopPropagation()}
                                    style={{flexShrink:0,color:'#25D366',display:'flex',alignItems:'center'}} title="Open WhatsApp">
                                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.546 4.122 1.588 5.905L.057 23.813a.5.5 0 00.63.63l5.908-1.531A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.555 9.555 0 01-4.87-1.336l-.35-.208-3.624.94.96-3.524-.228-.363A9.6 9.6 0 0112 2.4c5.295 0 9.6 4.305 9.6 9.6S17.295 21.6 12 21.6z"/></svg>
                                  </a>
                                )}
                              </div>
                            </td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#333'}}>{cl.country||'—'}</td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#555'}}>{cl.createdAt ? cl.createdAt.slice(0,4) : '—'}</td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:11,color:'#333',direction:'ltr'}}>{cl.whatsapp||'—'}</td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:11,color:'#555'}}>{cl.email||'—'}</td>
                            <td style={{padding:'6px 10px',borderBottom:'1px solid #f0f4f1',textAlign:'center'}} onClick={e=>e.stopPropagation()}>
                              {(()=>{const done=cl.yearlyCheckins?.[checkinYear]??false; return (
                                <button onClick={()=>toggleCheckin(cl.id,checkinYear,done)}
                                  style={{width:22,height:22,borderRadius:5,border:`2px solid ${done?'#0E5C42':'#d8e4dc'}`,background:done?'#0E5C42':'#fff',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',transition:'all 0.15s'}}>
                                  {done && <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                                </button>
                              )})()}
                            </td>
                            <td style={{padding:'11px 10px',borderBottom:'1px solid #f0f4f1'}} onClick={e=>e.stopPropagation()}>
                              <div style={{display:'flex',gap:4}}>
                                <button style={{padding:'4px 10px',background:'#f0f4f1',border:'1px solid #d8e4dc',borderRadius:7,fontSize:11,fontWeight:600,color:'#333',cursor:'pointer',fontFamily:'inherit'}} onClick={e=>{e.stopPropagation();setActiveClient(cl);setClientNotes(cl.notes||'')}}>View →</button>
                                <button style={{padding:'4px 8px',background:'#fff',border:'1px solid #e4ede8',borderRadius:7,fontSize:11,color:'#7a8a82',cursor:'pointer',fontFamily:'inherit'}} title="Archive" onClick={()=>archiveClient(cl.id)}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M21 8v13H3V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 3H1v5h22V3z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── ARCHIVE ── */}
          {view==='archive' && (
            <div style={S.page}>
              {/* Header */}
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14,gap:12}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <div style={S.pgTitle}>Archive</div>
                  <span style={{background:'#f0f4f1',color:'#7a8a82',borderRadius:20,padding:'3px 11px',fontSize:12,fontWeight:600}}>
                    {visibleArchived.length}{archivedClients.length!==visibleArchived.length?` of ${archivedClients.length}`:''} clients
                  </span>
                </div>
              </div>
              {/* Filters row */}
              <div style={{display:'flex',gap:8,marginBottom:14,flexWrap:'wrap',alignItems:'center'}}>
                <div style={{position:'relative',flex:3,minWidth:200}}>
                  <svg style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}} width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#aabab2" strokeWidth="1.8"/><path d="M21 21l-4.35-4.35" stroke="#aabab2" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <input style={{width:'100%',height:'38px',padding:'0 12px 0 32px',border:'1px solid #d8e4dc',borderRadius:9,fontSize:13,background:'#fff',outline:'none',fontFamily:'inherit',color:'#0a1410',boxSizing:'border-box'}} placeholder="Search by name, WhatsApp or email…" value={archiveSearch} onChange={e=>setArchiveSearch(e.target.value)}/>
                </div>
                <select value={archiveYearFilter} onChange={e=>setArchiveYearFilter(e.target.value)} style={{height:'38px',padding:'0 12px',border:'1px solid #d8e4dc',borderRadius:9,fontSize:13,background:'#fff',outline:'none',color:'#333',cursor:'pointer',fontFamily:'inherit',flexShrink:0}}>
                  <option value="all">All tax years</option>
                  {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                </select>
                {Object.keys(archiveHowHeardStats).length>0 && (
                  <DropBtn id="ar-hh" label="How heard" active={archiveHowHeardFilter.size>0} onClear={()=>setArchiveHowHeardFilter(new Set())}
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    {Object.keys(archiveHowHeardStats).sort().map(src=>{const checked=archiveHowHeardFilter.has(src);return(
                      <label key={src} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 2px',cursor:'pointer'}}>
                        <input type="checkbox" checked={checked} onChange={()=>{const s=new Set(archiveHowHeardFilter);checked?s.delete(src):s.add(src);setArchiveHowHeardFilter(s)}} style={{width:14,height:14,accentColor:'#0E5C42'}}/>
                        <span style={{fontSize:13,color:'#0a1410',flex:1}}>{src}</span>
                        <span style={{fontSize:11,color:'#aabab2'}}>{archiveHowHeardStats[src]}</span>
                      </label>
                    )})}
                  </DropBtn>
                )}
                {Array.from(new Set(archivedClients.map(c=>c.country||'').filter(Boolean))).length>0 && (
                  <DropBtn id="ar-country" label="Country" active={archiveCountryFilter.size>0} onClear={()=>setArchiveCountryFilter(new Set())}
                    icon={<svg width="13" height="13" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>}>
                    {Array.from(new Set(archivedClients.map(c=>c.country||'').filter(Boolean))).sort().map(c=>{const checked=archiveCountryFilter.has(c);const cnt=archivedClients.filter(cl=>cl.country===c).length;return(
                      <label key={c} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 2px',cursor:'pointer'}}>
                        <input type="checkbox" checked={checked} onChange={()=>{const s=new Set(archiveCountryFilter);checked?s.delete(c):s.add(c);setArchiveCountryFilter(s)}} style={{width:14,height:14,accentColor:'#0E5C42'}}/>
                        <span style={{fontSize:13,color:'#0a1410',flex:1}}>{c}</span>
                        <span style={{fontSize:11,color:'#aabab2'}}>{cnt}</span>
                      </label>
                    )})}
                  </DropBtn>
                )}
                {(archiveHowHeardFilter.size>0||archiveCountryFilter.size>0||archiveYearFilter!=='all'||archiveSearch) && (
                  <button style={{height:'38px',padding:'0 12px',border:'1px solid #fca5a5',borderRadius:9,fontSize:13,background:'#fff',color:'#c0392b',cursor:'pointer',fontFamily:'inherit',flexShrink:0}} onClick={()=>{setArchiveHowHeardFilter(new Set());setArchiveCountryFilter(new Set());setArchiveYearFilter('all');setArchiveSearch('')}}>
                    ✕ Clear
                  </button>
                )}
              </div>
              {/* Table */}
              {visibleArchived.length===0?(
                <div style={{...S.card,padding:48,textAlign:'center',color:'#aabab2',fontSize:14}}>{archivedClients.length===0?'No archived clients yet.':'No clients match the current filters.'}</div>
              ):(
                <div style={S.card}>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>
                      {['Name','Country','Tax Year','WhatsApp','Email',''].map(h=>(
                        <th key={h} style={{padding:'9px 14px',fontSize:10,fontWeight:600,color:'#7a8a82',textAlign:'left',background:'#f7fbf9',borderBottom:'1px solid #e4ede8',textTransform:'uppercase',letterSpacing:'0.4px'}}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {visibleArchived.map(cl=>{
                        const [bg,fg]=avColor(cl.fullName)
                        return(
                          <tr key={cl.id}>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1'}}>
                              <div style={{display:'flex',alignItems:'center',gap:9}}>
                                <div style={{width:32,height:32,borderRadius:9,background:bg,color:fg,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,flexShrink:0}}>{initials(cl.fullName)}</div>
                                <div style={{fontSize:12,fontWeight:500,color:'#7a8a82'}}>{cl.fullName}</div>
                                {cl.whatsapp&&<a href={`https://wa.me/${cl.whatsapp.replace(/[^0-9+]/g,'')}`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{flexShrink:0,color:'#25D366',display:'flex',alignItems:'center'}}><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.546 4.122 1.588 5.905L.057 23.813a.5.5 0 00.63.63l5.908-1.531A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.6a9.555 9.555 0 01-4.87-1.336l-.35-.208-3.624.94.96-3.524-.228-.363A9.6 9.6 0 0112 2.4c5.295 0 9.6 4.305 9.6 9.6S17.295 21.6 12 21.6z"/></svg></a>}
                              </div>
                            </td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#555'}}>{cl.country||'—'}</td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:12,color:'#555'}}>{cl.createdAt?cl.createdAt.slice(0,4):'—'}</td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:11,color:'#333',direction:'ltr'}}>{cl.whatsapp||'—'}</td>
                            <td style={{padding:'11px 14px',borderBottom:'1px solid #f0f4f1',fontSize:11,color:'#555'}}>{cl.email||'—'}</td>
                            <td style={{padding:'11px 10px',borderBottom:'1px solid #f0f4f1'}}>
                              <button style={{padding:'4px 10px',background:'#e8f5f0',border:'1px solid #c8eadf',borderRadius:7,fontSize:11,fontWeight:600,color:'#0E5C42',cursor:'pointer',fontFamily:'inherit'}} onClick={()=>unarchiveClient(cl.id)}>↩ Restore</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ── CLIENT DETAIL ── */}
          {view==='clients' && activeClient && (
            <div style={S.page}>
              <button style={S.backBtn} onClick={()=>setActiveClient(null)}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Back to Clients
              </button>

              {/* Profile */}
              <div style={{...S.card,padding:'18px 20px',marginBottom:14}}>
                <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:14}}>
                  <div style={{width:50,height:50,borderRadius:14,background:'linear-gradient(135deg,#0E5C42,#1a9a6a)',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:17,fontWeight:700,flexShrink:0}}>{initials(activeClient.fullName)}</div>
                  <div>
                    <div style={{fontSize:18,fontWeight:600,color:'#0a1410',letterSpacing:'-0.2px'}}>{activeClient.fullName}</div>
                    <div style={{fontSize:12,color:'#7a8a82',marginTop:3}}>{activeClient.country} · Client since {fmtDate(activeClient.createdAt)}</div>
                  </div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:0}}>
                  {[['Date of birth',activeClient.dob],['WhatsApp',activeClient.whatsapp],['Email',activeClient.email],['Country',activeClient.country],['How they heard',activeClient.howHeard]].map(([l,v])=>(
                    <div key={l} style={{display:'flex',padding:'7px 0',borderBottom:'1px solid #f5f5f5',gap:12}}>
                      <span style={{fontSize:11,color:'#aabab2',fontWeight:500,minWidth:120}}>{l}</span>
                      <span style={{fontSize:12,color:'#0a1410'}}>{v||'—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 1. Tax Returns */}
              <div style={{...S.card,marginBottom:12}}>
                <div style={S.secHead}>
                  <span>💰 Tax Returns</span>
                  <button style={S.addBtn} onClick={()=>setShowAddTax(v=>!v)}>+ Add year</button>
                </div>
                <div style={{padding:'12px 14px'}}>
                  {showAddTax && (
                    <div style={S.addForm}>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:100}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Tax year</label>
                        <input style={{...S.mInput,padding:'7px 10px'}} placeholder="e.g. 2023-24" value={newTaxYear} onChange={e=>setNewTaxYear(e.target.value)}/>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:4,minWidth:130}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Type</label>
                        <div style={{display:'flex',border:'1.5px solid #e4ede8',borderRadius:8,overflow:'hidden',background:'#fff'}}>
                          <button onClick={()=>setNewTaxType('refund')} style={{flex:1,padding:'7px 8px',border:'none',background:newTaxType==='refund'?'#0E5C42':'#fff',color:newTaxType==='refund'?'#fff':'#555',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Refund</button>
                          <button onClick={()=>setNewTaxType('owed')} style={{flex:1,padding:'7px 8px',border:'none',background:newTaxType==='owed'?'#c0392b':'#fff',color:newTaxType==='owed'?'#fff':'#555',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}>Tax owed</button>
                        </div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:110}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Amount (AUD)</label>
                        <input style={{...S.mInput,padding:'7px 10px'}} type="number" placeholder="e.g. 2500" value={newTaxAmt} onChange={e=>setNewTaxAmt(e.target.value)}/>
                      </div>
                      <button style={{...S.addBtn,padding:'7px 13px'}} onClick={addTaxReturn}>Save</button>
                      <button style={{padding:'7px 10px',border:'1px solid #e4ede8',borderRadius:8,background:'#fff',color:'#333',fontSize:12,cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setShowAddTax(false)}>✕</button>
                    </div>
                  )}
                  {activeClient.taxReturns.length===0 && !showAddTax && <div style={{fontSize:13,color:'#aabab2',textAlign:'center',padding:'16px 0'}}>No tax returns recorded yet.</div>}
                  {[...activeClient.taxReturns].sort((a,b)=>b.year.localeCompare(a.year)).map(r=>(
                    <div key={r.year} style={{...S.returnRow,background:r.type==='owed'?'#fff8f7':'#f7fbf9',borderColor:r.type==='owed'?'#fca5a5':'#e4ede8',marginTop:showAddTax?8:0}}>
                      <div style={{display:'flex',alignItems:'center',gap:9}}>
                        <div>
                          <div style={{fontSize:12,fontWeight:600,color:r.type==='owed'?'#c0392b':'#0E5C42'}}>{r.year}</div>
                          <div style={{fontSize:10,color:'#aabab2'}}>{fmtDate(r.completedAt)}</div>
                        </div>
                        <span style={{background:r.type==='owed'?'#fef0f0':'#e8f5f0',color:r.type==='owed'?'#c0392b':'#0E5C42',border:`1px solid ${r.type==='owed'?'#fca5a5':'#b0d8c8'}`,borderRadius:5,padding:'1px 7px',fontSize:10,fontWeight:700}}>{r.type==='owed'?'Tax owed':'Refund'}</span>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <span style={{fontSize:13,fontWeight:600,color:r.type==='owed'?'#c0392b':'#0a1410'}}>{r.type==='owed'?'-':''}{fmtCur(r.refundAmount)}</span>
                        <button style={{background:'none',border:'none',color:'#fca5a5',cursor:'pointer',fontSize:16,padding:'0 2px',lineHeight:1}} onClick={()=>removeTaxReturn(r.year)}>×</button>
                      </div>
                    </div>
                  ))}
                  {activeClient.taxReturns.length>0 && (
                    <div style={{...S.totalRow,marginTop:8}}>
                      <span style={{fontSize:12,fontWeight:600,color:'#0E5C42'}}>Total refunds</span>
                      <span style={{fontSize:14,fontWeight:700,color:'#0E5C42'}}>{fmtCur(activeClient.taxReturns.reduce((s,r)=>s+(r.type==='owed'?-r.refundAmount:r.refundAmount),0))}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Super Returns */}
              <div style={{...S.card,marginBottom:12}}>
                <div style={S.secHead}>
                  <span>🏦 Superannuation Refund</span>
                  <button style={S.addBtn} onClick={()=>setShowAddSuper(v=>!v)}>+ Add year</button>
                </div>
                <div style={{padding:'12px 14px'}}>
                  {showAddSuper && (
                    <div style={S.addForm}>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:100}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Tax year</label>
                        <input style={{...S.mInput,padding:'7px 10px'}} placeholder="e.g. 2023-24" value={newSuperYear} onChange={e=>setNewSuperYear(e.target.value)}/>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',gap:4,flex:1,minWidth:110}}>
                        <label style={{fontSize:11,fontWeight:500,color:'#555'}}>Amount received (AUD)</label>
                        <input style={{...S.mInput,padding:'7px 10px'}} type="number" placeholder="e.g. 4200" value={newSuperAmt} onChange={e=>setNewSuperAmt(e.target.value)}/>
                      </div>
                      <button style={{...S.addBtn,padding:'7px 13px'}} onClick={addSuperReturn}>Save</button>
                      <button style={{padding:'7px 10px',border:'1px solid #e4ede8',borderRadius:8,background:'#fff',color:'#333',fontSize:12,cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setShowAddSuper(false)}>✕</button>
                    </div>
                  )}
                  {activeClient.superReturns.length===0 && !showAddSuper && <div style={{fontSize:13,color:'#aabab2',textAlign:'center',padding:'16px 0'}}>No superannuation refunds recorded yet.</div>}
                  {[...activeClient.superReturns].sort((a,b)=>b.year.localeCompare(a.year)).map(r=>(
                    <div key={r.year} style={{...S.returnRow,marginTop:showAddSuper?8:0}}>
                      <div><div style={{fontSize:12,fontWeight:600,color:'#2563eb'}}>{r.year}</div><div style={{fontSize:10,color:'#aabab2'}}>{fmtDate(r.completedAt)}</div></div>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <span style={{fontSize:13,fontWeight:600,color:'#0a1410'}}>{fmtCur(r.amount)}</span>
                        <button style={{background:'none',border:'none',color:'#fca5a5',cursor:'pointer',fontSize:16,padding:'0 2px',lineHeight:1}} onClick={()=>removeSuperReturn(r.year)}>×</button>
                      </div>
                    </div>
                  ))}
                  {activeClient.superReturns.length>0 && (
                    <div style={{...S.totalRow,marginTop:8,background:'#eff6ff',borderColor:'#bfdbfe'}}>
                      <span style={{fontSize:12,fontWeight:600,color:'#2563eb'}}>Total super refunded</span>
                      <span style={{fontSize:14,fontWeight:700,color:'#2563eb'}}>{fmtCur(activeClient.superReturns.reduce((s,r)=>s+r.amount,0))}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. TFN + 4. ABN side by side */}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
                {/* TFN */}
                <div style={S.card}>
                  <div style={S.secHead}><span>📋 TFN Application</span></div>
                  <div style={S.checkRow}>
                    <div>
                      <div style={{fontSize:13,fontWeight:500,color:'#0a1410'}}>Applied for TFN</div>
                      <div style={{fontSize:11,color:'#aabab2',marginTop:2}}>
                        {activeClient.tfnService.done ? `Done · ${fmtDate(activeClient.tfnService.completedAt)}` : 'Not yet done'}
                      </div>
                    </div>
                    <div
                      style={{...S.checkbox,borderColor:activeClient.tfnService.done?'#0E5C42':'#d8e4dc',background:activeClient.tfnService.done?'#0E5C42':'#fff'}}
                      onClick={()=>toggleService('tfn',activeClient.tfnService)}>
                      {activeClient.tfnService.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                </div>

                {/* ABN */}
                <div style={S.card}>
                  <div style={S.secHead}><span>🏢 ABN Application</span></div>
                  <div style={S.checkRow}>
                    <div>
                      <div style={{fontSize:13,fontWeight:500,color:'#0a1410'}}>Applied for ABN</div>
                      <div style={{fontSize:11,color:'#aabab2',marginTop:2}}>
                        {activeClient.abnService.done ? `Done · ${fmtDate(activeClient.abnService.completedAt)}` : 'Not yet done'}
                      </div>
                    </div>
                    <div
                      style={{...S.checkbox,borderColor:activeClient.abnService.done?'#0E5C42':'#d8e4dc',background:activeClient.abnService.done?'#0E5C42':'#fff'}}
                      onClick={()=>toggleService('abn',activeClient.abnService)}>
                      {activeClient.abnService.done && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div style={{...S.card,padding:'14px 16px',marginBottom:12}}>
                <div style={{fontSize:12,fontWeight:600,color:'#0a1410',marginBottom:8,display:'flex',alignItems:'center',gap:7}}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#0E5C42" strokeWidth="1.8"/><path d="M8 13h8M8 17h5" stroke="#0E5C42" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  Internal notes
                </div>
                <textarea style={{width:'100%',border:'1.5px solid #e4ede8',borderRadius:9,padding:'9px 11px',fontSize:12,fontFamily:'inherit',background:'#f7fbf9',color:'#0a1410',outline:'none',resize:'vertical',minHeight:72,lineHeight:1.55,boxSizing:'border-box'}}
                  placeholder="Notes about this client..." value={clientNotes} onChange={e=>{setClientNotes(e.target.value);setClientNotesSaved(false)}}/>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:6}}>
                  {clientNotesSaved?<span style={{fontSize:11,color:'#059669',fontWeight:500}}>✓ Saved</span>:<span style={{fontSize:11,color:'#aabab2'}}>Only visible to you</span>}
                  <button style={{padding:'5px 13px',border:'none',borderRadius:7,background:'#0E5C42',color:'#fff',fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit',opacity:clientNotes===(activeClient.notes||'')?0.4:1}} disabled={clientNotes===(activeClient.notes||'')} onClick={saveClientNotes}>Save notes</button>
                </div>
              </div>

              {/* Danger */}
              <div style={{background:'#fff',borderRadius:13,padding:'14px 18px',border:'1px dashed #fca5a5'}}>
                <div style={{fontSize:12,fontWeight:600,color:'#c0392b',marginBottom:4}}>⚠️ Delete client</div>
                <div style={{fontSize:12,color:'#7a8a82',marginBottom:10}}>Permanently removes this client and all their history.</div>
                <button style={{padding:'7px 14px',border:'1px solid #fca5a5',borderRadius:8,background:'#fff',color:'#c0392b',fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}} onClick={()=>setConfirmDeleteClient(activeClient.id)}>Delete client</button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div style={S.overlay} onClick={e=>{if(e.target===e.currentTarget)setShowAddModal(false)}}>
          <div style={S.modal}>
            <div style={S.mTitle}>Add new client task</div>
            <div style={S.mSub}>Creates a new task in the Tasks tab</div>
            <form onSubmit={addClient}>
              {[['Full name *','text','e.g. Sophie Lambert','fullName'],['WhatsApp','text','+33612345678','whatsapp'],['Email','email','sophie@email.com','email'],['Country','text','e.g. France','country'],['Date of birth','date','','dob']].map(([l,t,p,k])=>(
                <div key={k} style={{marginBottom:10}}>
                  <label style={{fontSize:12,fontWeight:500,color:'#555',display:'block',marginBottom:4}}>{l}</label>
                  <input type={t} style={S.mInput} placeholder={p} value={(newClient as Record<string,string>)[k]} onChange={e=>setNewClient({...newClient,[k]:e.target.value})} required={k==='fullName'}/>
                </div>
              ))}
              <div style={{marginBottom:10}}>
                <label style={{fontSize:12,fontWeight:500,color:'#555',display:'block',marginBottom:4}}>Tax year</label>
                <select style={S.mInput} value={newClient.taxYear} onChange={e=>setNewClient({...newClient,taxYear:e.target.value})}>
                  {TAX_YEARS.map(y=><option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div style={S.mFooter}>
                <button type="button" style={S.mCancel} onClick={()=>setShowAddModal(false)}>Cancel</button>
                <button type="submit" style={S.mSave}>Add client</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirm delete task */}
      {/* ── Complete task confirmation modal ──────────────────────────── */}
      {confirmComplete && (
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000}}>
          <div style={{background:'#fff',borderRadius:20,padding:'32px 28px',maxWidth:380,width:'90%',textAlign:'center',fontFamily:'inherit'}}>
            <div style={{fontSize:40,marginBottom:12}}>✅</div>
            <div style={{fontSize:18,fontWeight:700,color:'#0a1410',marginBottom:8}}>Mark task as complete?</div>
            <div style={{fontSize:13,color:'#7a8a82',lineHeight:1.65,marginBottom:22}}>
              This will permanently delete all sensitive data:<br/>
              <strong>TFN, bank details, address, AU phone and documents.</strong><br/><br/>
              Kept: <strong>name, date of birth, email, WhatsApp and country.</strong>
            </div>
            <div style={{display:'flex',gap:10,justifyContent:'center'}}>
              <button
                onClick={()=>setConfirmComplete(null)}
                style={{padding:'10px 20px',borderRadius:10,border:'1px solid #e4eae7',background:'#fff',fontSize:13,fontWeight:500,cursor:'pointer',fontFamily:'inherit'}}
              >Cancel</button>
              <button
                onClick={()=>markDone(confirmComplete)}
                style={{padding:'10px 20px',borderRadius:10,border:'none',background:'#0E5C42',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:'inherit'}}
              >✓ Yes, complete & wipe data</button>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div style={S.overlay} onClick={e=>{if(e.target===e.currentTarget)setConfirmDelete(null)}}>
          <div style={{...S.modal,maxWidth:360,textAlign:'center'}}>
            <div style={{fontSize:34,marginBottom:10}}>🗑️</div>
            <div style={S.mTitle}>Delete &amp; archive?</div>
            <div style={{fontSize:13,color:'#7a8a82',lineHeight:1.6,marginBottom:18}}>All sensitive data (TFN, bank, address, documents) will be deleted.<br/>The client will be moved to the Clients tab with basic info only.</div>
            <div style={S.mFooter}>
              <button style={S.mCancel} onClick={()=>setConfirmDelete(null)}>Cancel</button>
              <button style={S.mDel} onClick={()=>deleteTask(confirmDelete)}>Yes, delete &amp; archive</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm delete client */}
      {confirmDeleteClient && (
        <div style={S.overlay} onClick={e=>{if(e.target===e.currentTarget)setConfirmDeleteClient(null)}}>
          <div style={{...S.modal,maxWidth:340,textAlign:'center'}}>
            <div style={{fontSize:34,marginBottom:10}}>🗑️</div>
            <div style={S.mTitle}>Delete client?</div>
            <div style={{fontSize:13,color:'#7a8a82',marginBottom:18}}>This permanently removes the client and all their history.</div>
            <div style={S.mFooter}>
              <button style={S.mCancel} onClick={()=>setConfirmDeleteClient(null)}>Cancel</button>
              <button style={S.mDel} onClick={()=>deleteClient(confirmDeleteClient)}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── File preview modal ── */}
      {previewUrl && (
        <div onClick={()=>setPreviewUrl(null)} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:24}}>
          <div onClick={e=>e.stopPropagation()} style={{background:'#fff',borderRadius:16,overflow:'hidden',width:'50vw',maxWidth:700,maxHeight:'70vh',display:'flex',flexDirection:'column',boxShadow:'0 20px 60px rgba(0,0,0,0.3)'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px',borderBottom:'1px solid #e4ede8',background:'#f7fbf9'}}>
              <span style={{fontSize:12,fontWeight:600,color:'#0a1410',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'80%'}}>{previewUrl.split('/').pop()?.replace(/^\d+_/,'') ?? 'File'}</span>
              <div style={{display:'flex',gap:8,flexShrink:0}}>
                <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{fontSize:11,color:'#0E5C42',background:'#eaf6f1',border:'1px solid #c8eadf',borderRadius:6,padding:'3px 10px',textDecoration:'none',fontWeight:600}}>Open ↗</a>
                <button onClick={()=>setPreviewUrl(null)} style={{background:'none',border:'none',fontSize:18,cursor:'pointer',color:'#7a8a82',padding:'0 4px',lineHeight:1}}>✕</button>
              </div>
            </div>
            <div style={{flex:1,overflow:'auto',display:'flex',alignItems:'center',justifyContent:'center',background:'#f0f4f1',minHeight:200}}>
              {previewUrl.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)
                ? <img src={previewUrl} alt="preview" style={{maxWidth:'100%',maxHeight:'60vh',objectFit:'contain'}}/>
                : previewUrl.toLowerCase().endsWith('.pdf')
                  ? <iframe src={previewUrl} style={{width:'100%',height:'60vh',border:'none'}} title="PDF preview"/>
                  : <div style={{padding:32,textAlign:'center',color:'#7a8a82'}}>
                      <div style={{fontSize:32,marginBottom:12}}>📄</div>
                      <div style={{fontSize:13}}>Cannot preview this file type</div>
                      <a href={previewUrl} target="_blank" rel="noopener noreferrer" style={{color:'#0E5C42',fontSize:13,fontWeight:600}}>Open in new tab ↗</a>
                    </div>
              }
            </div>
          </div>
        </div>
      )}
    </>
  )
}

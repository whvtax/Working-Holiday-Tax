'use client'
import React, { useState, useEffect, useCallback } from 'react'

type ReviewStatus = 'pending' | 'approved' | 'rejected'

type Task = {
  id: string; clientName: string; taskType: string; submittedAt: string
  whatsapp: string; email: string; country: string; dob: string; taxYear: string
  address: string; tfn: string; bankDetails: string; primaryJob: string
  marital: string; taxStatus: string; notes: string; fileUrls: string[]
  done: boolean; reviewStatus: ReviewStatus; reviewerNote: string; reviewedAt: string
  auPhone?: string
}

const G = '#0B5240'

const TYPE_LABEL: Record<string, string> = {
  'tax-return': 'Tax Return',
  'super': 'Super Refund',
  'tfn': 'TFN Application',
  'abn': 'ABN Application',
}

// Declaration texts exactly as shown in the forms
const DECL_TEXTS: Record<string, string> = {
  'tfn-confirm':   'I confirm I am currently in Australia on my first visit, have never been married or changed my name or gender, do not own assets in Australia, and have not been issued a TFN.',
  'abn-confirm':   'I declare that I do not own any assets in Australia and do not have, nor have I ever been issued, an ABN. I intend to establish a business as a sole trader, where I will be the sole owner, with operations based in Australia.',
  'terms':         'I have read and accept the Client Agreement & Privacy Policy.',
  'tax-accuracy':  'I declare that all information provided is true, complete, and accurate. I understand that providing false information may result in penalties under Australian tax law, and confirm that I have read and accept the Client Agreement & Privacy Policy.',
  'tax-income':    'I declare under my full legal responsibility that all income earned in Australia and abroad during the relevant tax year has been truthfully and completely disclosed. I understand that any false, misleading, or incomplete declaration may constitute a tax offence under Australian law, and that Working Holiday Tax bears no liability for inaccuracies arising from information provided by me.',
}

type DeclItem = { text: string; checkLabel: string; checked: boolean; isRadio?: boolean; radioOptions?: string[]; selectedOption?: string }

function parseNotes(notes: string, taskType?: string): { declarations: DeclItem[]; extras: string[] } {
  if (!notes) return { declarations: [], extras: [] }
  const parts = notes.split(' | ').map((s: string) => s.trim()).filter(Boolean)
  const declarations: DeclItem[] = []
  const extras: string[] = []

  for (const p of parts) {
    const isDecl = p.startsWith('→') || p.startsWith('✓') || p.match(/^I (confirm|declare|have read)/)
    if (!isDecl) { extras.push(p); continue }
    const clean = p.replace(/^→\s*/, '').replace(/^[✓✗]\s*/, '')

    // Tax residency radio (→ Australian resident... or → Working holiday maker...)
    if (p.startsWith('→ Australian') || p.startsWith('→ Working holiday') || p.startsWith('→ resident') || p.startsWith('→ whm')) {
      const val = p.replace('→ ','').replace('resident','Australian resident for tax purposes').replace('whm','Working holiday maker for tax purposes')
      declarations.push({
        text: 'I confirm that I have reviewed the Tax Residency Explained section and all relevant ATO information, and I declare that I am:',
        checkLabel: '',
        checked: true,
        isRadio: true,
        radioOptions: ['Australian resident for tax purposes','Working holiday maker for tax purposes'],
        selectedOption: val,
      })
      continue
    }

    // Tax accuracy declaration (Yes/No)
    if (p.includes('Yes, I agree') || p.includes('✓ Yes') || p.includes('✗ No')) {
      const agreed = p.includes('Yes')
      declarations.push({
        text: DECL_TEXTS['tax-accuracy'],
        checkLabel: agreed ? 'Yes, I agree' : 'No',
        checked: agreed,
      })
      continue
    }

    // Income declaration (tax-return only)
    if (p.includes('I declare under my full legal responsibility') || p.includes('legal responsibility')) {
      declarations.push({ text: DECL_TEXTS['tax-income'], checkLabel: 'I confirm this declaration', checked: true })
      continue
    }

    // TFN confirm
    if (p.includes('first visit') || p.includes('not been issued a TFN')) {
      declarations.push({ text: DECL_TEXTS['tfn-confirm'], checkLabel: 'I confirm this declaration', checked: true })
      continue
    }

    // ABN confirm
    if (p.includes('sole trader') || p.includes('been issued, an ABN')) {
      declarations.push({ text: DECL_TEXTS['abn-confirm'], checkLabel: 'I confirm this declaration', checked: true })
      continue
    }

    // Terms / Client Agreement
    if (p.includes('Client Agreement') || p.includes('Privacy Policy') || p.includes('I have read')) {
      declarations.push({ text: DECL_TEXTS['terms'], checkLabel: 'I confirm this declaration', checked: !p.includes('✗') })
      continue
    }

    // Generic fallback
    declarations.push({ text: '', checkLabel: clean, checked: !p.includes('✗') })
  }

  return { declarations, extras }
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E2EDE8', borderRadius: 12, overflow: 'hidden', marginBottom: 10 }}>
      <div style={{ padding: '8px 16px', background: '#F0F7F4', borderBottom: '1px solid #E2EDE8' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: G, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{title}</span>
      </div>
      <div>{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '9px 16px', borderBottom: '1px solid #F4FAF7' }}>
      <span style={{ fontSize: 11, color: '#8DA89A', width: 120, flexShrink: 0, paddingTop: 1, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 13, color: '#1A2822', lineHeight: 1.5, flex: 1, wordBreak: 'break-word' }}>{value}</span>
    </div>
  )
}
function BankRows({ raw }: { raw?: string | null }) {
  if (!raw) return null
  const parts = (raw || '').split(' | ')
  const bankName    = parts.find(p=>p.startsWith('Bank:'))?.replace('Bank: ','').trim()    || ''
  const bankHolder  = parts.find(p=>p.startsWith('Name:'))?.replace('Name: ','').trim()    || ''
  const bankAccount = parts.find(p=>p.startsWith('Account:'))?.replace('Account: ','').trim() || ''
  const bankBsb     = parts.find(p=>p.startsWith('BSB:'))?.replace('BSB: ','').trim()      || ''
  const [copied, setCopied] = React.useState<string|null>(null)
  function copy(val: string, key: string) {
    navigator.clipboard.writeText(val).then(() => { setCopied(key); setTimeout(()=>setCopied(null),1500) })
  }
  const G = '#0B5240'
  const fields: [string, string, string][] = [
    ['Bank name', bankName, 'name'],
    ['Account holder', bankHolder, 'holder'],
    ['Account number', bankAccount, 'account'],
    ['BSB', bankBsb, 'bsb'],
  ]
  return (
    <div style={{ borderBottom: '1px solid #F4FAF7' }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '7px 16px', background: '#F0F7F4', borderBottom: '1px solid #E2EDE8' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Bank account 🔒</span>
      </div>
      {fields.map(([label, value, key]) => !value ? null : (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 8px 24px', borderBottom: '1px solid #F4FAF7' }}>
          <span style={{ fontSize: 11, color: '#8DA89A', width: 110, flexShrink: 0, fontWeight: 500 }}>{label}</span>
          <span style={{ fontSize: 13, color: '#1A2822', flex: 1, fontFamily: 'monospace', letterSpacing: '0.02em' }}>{value}</span>
          <button onClick={() => copy(value, key)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied===key ? '#059669' : '#C8D8D0', padding: '2px 3px', borderRadius: 4, flexShrink: 0, lineHeight: 1 }} title="Copy">
            {copied===key
              ? <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            }
          </button>
        </div>
      ))}
    </div>
  )
}


function DeclRow({ item, isLast }: { item: DeclItem; isLast: boolean }) {
  if (item.isRadio) {
    return (
      <div style={{ padding: '12px 16px', borderBottom: isLast ? 'none' : '1px solid #F4FAF7' }}>
        <p style={{ fontSize: 12, color: '#587066', lineHeight: 1.7, marginBottom: 10 }}>{item.text}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {(item.radioOptions || []).map(opt => {
            const active = opt === item.selectedOption
            return (
              <div key={opt} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, border: `1.5px solid ${active ? G : '#D4EAE2'}`, background: active ? '#EAF6F1' : '#F5F9F7' }}>
                <div style={{ width: 14, height: 14, borderRadius: '50%', border: `2px solid ${active ? G : '#D4EAE2'}`, background: active ? G : '#fff', flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? G : '#587066' }}>{opt}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div style={{ padding: '12px 16px', borderBottom: isLast ? 'none' : '1px solid #F4FAF7' }}>
      {item.text && <p style={{ fontSize: 12, color: '#587066', lineHeight: 1.7, marginBottom: 10 }}>{item.text}</p>}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${item.checked ? G : '#D4EAE2'}`, background: item.checked ? G : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
          {item.checked && <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        </div>
        <span style={{ fontSize: 13, color: '#1A2822', fontWeight: 500, lineHeight: 1.5 }}>{item.checkLabel}</span>
      </div>
    </div>
  )
}

function Countdown({ seconds, onDone }: { seconds: number; onDone: () => void }) {
  const onDoneRef = React.useRef(onDone)
  onDoneRef.current = onDone
  useEffect(() => {
    const t = setTimeout(() => onDoneRef.current(), seconds * 1000)
    return () => clearTimeout(t)
  }, [])
  return null
}

function TaskCard({
  task, expanded, onToggle, onSetStatus, acting,
  setViewUrl, notes, setNotes, savingNote, onSaveNote, saveNoteError,
}: {
  task: Task; expanded: boolean; onToggle: () => void
  onSetStatus: (id: string, s: ReviewStatus) => void; acting: string | null
  setViewUrl: (u: string | null) => void
  notes: Record<string, string>; setNotes: React.Dispatch<React.SetStateAction<Record<string, string>>>
  savingNote: string | null; onSaveNote: (id: string, note: string) => void
  saveNoteError: string | null
}) {
  const [hiding, setHiding] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [showCountdown, setShowCountdown] = useState(false)
  const isDone = task.reviewStatus === 'approved' || task.reviewStatus === 'rejected'

  useEffect(() => {
    if (isDone && !hiding && !hidden && !showCountdown) {
      setShowCountdown(true)
    }
  }, [task.reviewStatus])

  const handleDone = useCallback(() => {
    setHiding(true)
    setTimeout(() => setHidden(true), 600)
  }, []) // stable ref — never changes

  if (hidden) return null

  const { declarations, extras } = parseNotes(task.notes, task.taskType)

  const statusMap: Record<string, { bg: string; color: string; label: string }> = {
    pending:  { bg: '#FFF8EC', color: '#B45309', label: 'Pending' },
    approved: { bg: '#EAF6F1', color: '#059669', label: 'Approved' },
    rejected: { bg: '#FEF2F2', color: '#DC2626', label: 'Rejected' },
  }
  const statusInfo = statusMap[task.reviewStatus] || statusMap['pending']

  return (
    <div style={{
      background: '#fff', border: '1.5px solid #E2EDE8', borderRadius: 16,
      marginBottom: 12, overflow: 'hidden',
      opacity: hiding ? 0 : 1,
      transform: hiding ? 'translateY(-10px) scale(0.97)' : 'none',
      transition: 'opacity 0.5s ease, transform 0.5s ease',
    }}>
      {/* Header — not clickable once decided */}
      <div
        onClick={isDone ? undefined : onToggle}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', cursor: isDone ? 'default' : 'pointer',
          background: '#fff',
          opacity: isDone ? 0.7 : 1,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: '#0D1B17' }}>{task.clientName || '—'}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: '#EAF6F1', color: G }}>{TYPE_LABEL[task.taskType] || task.taskType}</span>
            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 9px', borderRadius: 100, background: statusInfo.bg, color: statusInfo.color }}>{statusInfo.label}</span>
          </div>
          <div style={{ fontSize: 11, color: '#8DA89A' }}>
            {[task.country, task.taxYear, task.submittedAt ? `Submitted ${new Date(task.submittedAt).toLocaleDateString('en-AU')}` : ''].filter(Boolean).join(' · ')}
          </div>
        </div>
        {!isDone && (
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: '0.2s', flexShrink: 0, marginLeft: 12 }}>
            <path d="M6 9l6 6 6-6" stroke="#8DA89A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Body — only show if pending and expanded */}
      {!isDone && expanded && (
        <div style={{ padding: 14, background: '#F4F9F6' }}>

          {/* ── TFN Application ── */}
          {task.taskType === 'tfn' && (<>
            <Section title="Personal details">
              <Row label="Full name"    value={task.clientName} />
              <Row label="Date of birth" value={task.dob} />
              <Row label="Country of birth / passport" value={task.country} />
              <Row label="Gender"       value={extras.find(e=>e.startsWith('Gender:'))?.split(':')[1]?.trim()} />
              <Row label="Passport No"  value={extras.find(e=>e.startsWith('Passport No:'))?.split(':').slice(1).join(':').trim()} />
              <Row label="Marital status" value={task.marital} />
            </Section>
            <Section title="Contact &amp; location">
              <Row label="WhatsApp"     value={task.whatsapp} />
              <Row label="AU Phone"     value={task.auPhone} />
              <Row label="Email"        value={task.email} />
              <Row label="AU Address"   value={task.address} />
            </Section>
            <Section title="Tax details">
              <Row label="TFN (if existing)" value={task.tfn} />
              <Row label="Primary employer"  value={task.primaryJob} />
              <BankRows raw={task.bankDetails} />
            </Section>
          </>)}

          {/* ── ABN Application ── */}
          {task.taskType === 'abn' && (<>
            <Section title="Personal details">
              <Row label="Full name"    value={task.clientName} />
              <Row label="Date of birth" value={task.dob} />
              <Row label="Country"      value={task.country} />
              <Row label="Gender"       value={extras.find(e=>e.startsWith('Gender:'))?.split(':')[1]?.trim()} />
              <Row label="Marital status" value={task.marital} />
            </Section>
            <Section title="Contact &amp; location">
              <Row label="WhatsApp"     value={task.whatsapp} />
              <Row label="AU Phone"     value={task.auPhone} />
              <Row label="Email"        value={task.email} />
              <Row label="AU Address"   value={task.address} />
            </Section>
            <Section title="Business details">
              <Row label="TFN"          value={task.tfn} />
              <Row label="Business description" value={task.primaryJob} />
              <BankRows raw={task.bankDetails} />
            </Section>
          </>)}

          {/* ── Super Refund ── */}
          {task.taskType === 'super' && (<>
            <Section title="Personal details">
              <Row label="Full name"    value={task.clientName} />
              <Row label="Date of birth" value={task.dob} />
              <Row label="Country"      value={task.country} />
              <Row label="Passport No"  value={extras.find(e=>e.startsWith('Passport No:'))?.split(':').slice(1).join(':').trim()} />
              <Row label="Marital status" value={task.marital} />
            </Section>
            <Section title="Contact &amp; location">
              <Row label="WhatsApp"     value={task.whatsapp} />
              <Row label="AU Phone"     value={task.auPhone} />
              <Row label="Email"        value={task.email} />
              <Row label="AU Address"   value={task.address} />
              <Row label="Home country address" value={extras.find(e=>e.startsWith('Home Country Address:'))?.split(':').slice(1).join(':').trim()} />
            </Section>
            <Section title="Super &amp; financial details">
              <Row label="TFN"          value={task.tfn} />
              <BankRows raw={task.bankDetails} />
              <Row label="Super funds"  value={extras.find(e=>e.startsWith('Super Funds:'))?.split(':').slice(1).join(':').trim()} />
            </Section>
          </>)}

          {/* ── Tax Return ── */}
          {task.taskType === 'tax-return' && (<>
            <Section title="Personal details">
              <Row label="Full name"    value={task.clientName} />
              <Row label="Date of birth" value={task.dob} />
              <Row label="Country"      value={task.country} />
              <Row label="Marital status" value={task.marital} />
              <Row label="Tax year"     value={task.taxYear} />
            </Section>
            <Section title="Contact &amp; location">
              <Row label="WhatsApp"     value={task.whatsapp} />
              <Row label="AU Phone"     value={task.auPhone} />
              <Row label="Email"        value={task.email} />
              <Row label="AU Address"   value={task.address} />
            </Section>
            <Section title="Tax &amp; income details">
              <Row label="Tax status"   value={task.taxStatus} />
              <Row label="TFN"          value={task.tfn} />
              <BankRows raw={task.bankDetails} />
              <Row label="Primary job / employer" value={task.primaryJob} />
              {(()=>{
                const abnVal = extras.find(e=>e.startsWith('ABN:'))?.split(':').slice(1).join(':').trim()
                const abnNum = extras.find(e=>e.startsWith('ABN Number:'))?.split(':').slice(1).join(':').trim()
                const abnInc = extras.find(e=>e.startsWith('ABN Income:'))?.split(':').slice(1).join(':').trim()
                if (abnVal === 'No') return <Row label="Has ABN" value="No — client does not have an ABN" />
                if (abnVal === 'Yes') return (<>
                  <Row label="Has ABN"      value="Yes" />
                  <Row label="ABN Number"   value={abnNum || '—'} />
                  <Row label="ABN Income"   value={abnInc ? `AUD ${abnInc}` : '—'} />
                </>)
                return null
              })()}
            </Section>
          </>)}

          {declarations.length > 0 && (
            <Section title="Declarations">
              {declarations.map((item, i) => <DeclRow key={i} item={item} isLast={i === declarations.length - 1} />)}
            </Section>
          )}

          {task.fileUrls?.length > 0 && (
            <Section title="Documents uploaded">
              {task.fileUrls.map((url, i) => {
                const raw = url.split('/').pop() ?? `file-${i + 1}`
                const name = decodeURIComponent(raw).replace(/^\d+_[a-z0-9]+_/i, '').slice(0, 50)
                const isPdf = url.toLowerCase().includes('.pdf')
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: i < task.fileUrls.length - 1 ? '1px solid #F4FAF7' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <span style={{ width: 32, height: 32, borderRadius: 8, background: isPdf ? '#FEF2F2' : '#EAF6F1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, flexShrink: 0 }}>{isPdf ? '📄' : '🖼️'}</span>
                      <span style={{ fontSize: 12, color: '#1A2822', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                    </div>
                    <button onClick={() => setViewUrl(url)} style={{ height: 32, padding: '0 16px', borderRadius: 100, border: '1.5px solid #D4EAE2', background: '#fff', color: G, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0, marginLeft: 12 }}>View</button>
                  </div>
                )
              })}
            </Section>
          )}

          {/* Note to admin */}
          <div style={{ background: '#fff', border: '1px solid #E2EDE8', borderRadius: 12, overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ padding: '8px 16px', background: '#F0F7F4', borderBottom: '1px solid #E2EDE8' }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: G, textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>Note to admin</span>
            </div>
            <div style={{ padding: 12, display: 'flex', gap: 8 }}>
              <textarea
                value={notes[task.id] || ''}
                onChange={e => setNotes(p => ({ ...p, [task.id]: e.target.value }))}
                placeholder="Leave a note for the admin..."
                rows={2}
                style={{ flex: 1, border: '1.5px solid #D4EAE2', borderRadius: 10, padding: '8px 12px', fontSize: 13, fontFamily: 'inherit', resize: 'vertical', outline: 'none', color: '#1A2822' }}
              />
              <button
                onClick={() => onSaveNote(task.id, notes[task.id] || '')}
                disabled={savingNote === task.id}
                style={{ height: 38, padding: '0 14px', background: '#EAF6F1', color: G, border: '1px solid #C8EAE0', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', alignSelf: 'flex-end', opacity: savingNote === task.id ? 0.6 : 1 }}
              >
                {savingNote === task.id ? '...' : 'Save'}
              </button>
            </div>
            {saveNoteError === task.id && (
              <p style={{ fontSize: 11, color: '#c0392b', margin: '4px 0 0', padding: '0 4px' }}>
                ⚠️ Failed to save note. Please try again.
              </p>
            )}
          </div>

          {/* Action buttons */}
          {task.reviewStatus === 'pending' && (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', paddingTop: 2 }}>
              <button
                onClick={() => onSetStatus(task.id, 'rejected')}
                disabled={acting === task.id}
                style={{ height: 38, padding: '0 20px', borderRadius: 100, border: '1.5px solid #FECACA', background: '#fff', color: '#DC2626', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, transition: 'background 0.15s', opacity: acting === task.id ? 0.6 : 1 }}
              >
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/></svg>
                Reject
              </button>
              <button
                onClick={() => onSetStatus(task.id, 'approved')}
                disabled={acting === task.id}
                style={{ height: 38, padding: '0 20px', borderRadius: 100, border: 'none', background: G, color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 1px 8px rgba(11,82,64,0.20)', transition: 'opacity 0.15s', opacity: acting === task.id ? 0.6 : 1 }}
              >
                <svg width={14} height={14} viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5L12 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Approve
              </button>
            </div>
          )}

          {task.reviewStatus !== 'pending' && !showCountdown && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, paddingTop: 2 }}>
              <button onClick={() => onSetStatus(task.id, 'pending')} style={{ height: 34, padding: '0 16px', borderRadius: 100, border: '1.5px solid #D4EAE2', background: '#fff', color: '#8DA89A', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>
                ↩ Reset decision
              </button>

            </div>
          )}
        </div>
      )}

      {showCountdown && isDone && !hiding && !hidden && (
        <Countdown seconds={72 * 60 * 60} onDone={handleDone} />
      )}
    </div>
  )
}

export default function ReviewerClient() {
  const [tasks, setTasks]           = useState<Task[]>([])
  const [loading, setLoading]       = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [notes, setNotes]           = useState<Record<string, string>>({})
  const [savingNote, setSavingNote]     = useState<string | null>(null)
  const [saveNoteError, setSaveNoteError] = useState<string | null>(null)
  const [expanded, setExpanded]         = useState<string | null>(null)

  const [acting, setActing]         = useState<string | null>(null)
  const [viewUrl, setViewUrl]       = useState<string | null>(null)

  const loadTasks = useCallback(async () => {
    try {
      const r = await fetch('/api/crm/tasks', { cache: 'no-store' })
      const d = await r.json()
      if (d.ok) {
        const active = d.tasks.filter((t: Task) => !t.done)
        setTasks(active)
        setNewTaskCount(0)
        prevCountRef.current = active.filter((t: Task) => t.reviewStatus === 'pending').length
      }
    } catch {}
    setLoading(false)
  }, [])

  const [newTaskCount, setNewTaskCount] = useState(0)
  const prevCountRef = React.useRef(0)

  useEffect(() => { loadTasks() }, [loadTasks])

  // Auto-poll every 20s — full sync, keeps multiple reviewers in sync
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const r = await fetch('/api/crm/tasks', { cache: 'no-store' })
        const d = await r.json()
        if (d.ok) {
          const active = d.tasks.filter((t: Task) => !t.done)
          const pendingCount = active.filter((t: Task) => t.reviewStatus === 'pending').length
          // Show badge if new tasks arrived
          if (pendingCount > prevCountRef.current && prevCountRef.current > 0) {
            setNewTaskCount(pendingCount - prevCountRef.current)
          }
          prevCountRef.current = pendingCount
          // Merge: keep local status changes, add new tasks from server
          setTasks(prev => {
            const localById = new Map(prev.map(t => [t.id, t]))
            return active.map((t: Task) => {
              const local = localById.get(t.id)
              // Prefer local reviewStatus if it's more recent (not pending)
              if (local && local.reviewStatus !== 'pending') return { ...t, reviewStatus: local.reviewStatus }
              return t
            })
          })
        }
      } catch {}
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  async function setStatus(taskId: string, status: ReviewStatus) {
    setActing(taskId)
    // Close card immediately
    setExpanded(null)
    // Optimistic update — move to bottom of list
    setTasks(prev => {
      const updated = prev.map(t => t.id === taskId ? { ...t, reviewStatus: status } : t)
      const decided = updated.find(t => t.id === taskId)!
      const rest = updated.filter(t => t.id !== taskId)
      return [...rest, decided]
    })
    setActing(null)
    // Await API — rollback optimistic update on failure
    try {
      const res = await fetch('/api/crm/review', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ taskId, status }),
      })
      if (!res.ok) throw new Error('Server error')
    } catch {
      // Rollback
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, reviewStatus: 'pending' } : t))
      alert('Failed to update status. Please try again.')
    }
  }

  async function saveNote(taskId: string, note: string) {
    setSavingNote(taskId)
    setSaveNoteError(null)
    try {
      const res = await fetch('/api/crm/review', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ taskId, note }),
      })
      if (!res.ok) throw new Error('Server error')
    } catch {
      setSaveNoteError(taskId)
    } finally {
      setSavingNote(null)
    }
  }

  async function logout() {
    await fetch('/api/crm/reviewer-logout', { method: 'POST', headers: {'X-Requested-With': 'XMLHttpRequest'} })
    window.location.href = '/crm/reviewer'
  }

  // Hide decided tasks from reviewer after 48 hours
  const HIDE_AFTER_MS = 48 * 60 * 60 * 1000
  const visibleTasks = tasks.filter(t => {
    if (t.reviewStatus === 'pending') return true
    const decidedAt = t.reviewedAt ? new Date(t.reviewedAt).getTime() : null
    if (!decidedAt) return true // no timestamp yet — keep visible
    return Date.now() - decidedAt < HIDE_AFTER_MS
  })

  const counts = { pending: visibleTasks.filter(t => t.reviewStatus === 'pending').length }
  const filtered = [...visibleTasks].sort((a, b) => {
    const statusOrder = { pending: 0, approved: 1, rejected: 1 }
    const statusDiff = (statusOrder[a.reviewStatus] ?? 0) - (statusOrder[b.reviewStatus] ?? 0)
    if (statusDiff !== 0) return statusDiff
    // Pending: oldest first. Decided: newest first (most recently decided at top of decided section)
    const dir = a.reviewStatus === 'pending' ? 1 : -1
    return dir * (new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F4F9F6', fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif' }}>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      <style>{`
        .rv-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 20px; height: 54px; }
        .rv-btns { display: flex; gap: 8px; }
        .rv-btns button { min-width: 90px; }
        @media (max-width: 600px) {
          .rv-nav { flex-direction: column; height: auto; padding: 12px 16px 0; align-items: stretch; }
          .rv-btns { padding-bottom: 12px; }
          .rv-btns button { flex: 1; min-width: 0; }
        }
      `}</style>
      <div style={{ background: G }} className="rv-nav">
        {/* Logo + title */}
        <button
          onClick={() => { setExpanded(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', padding: '8px 0' }}
        >
          <div style={{ width: 34, height: 34, borderRadius: 9, flexShrink: 0, overflow: 'hidden' }}>
            <svg width="34" height="34" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="100" fill="#0B5240"/>
              <g transform="translate(100,100) scale(3.57) translate(-17,-17)">
                <rect x="2" y="2" width="19" height="19" rx="4.5" stroke="#5BB88A" strokeWidth="2" fill="none"/>
                <rect x="13" y="13" width="19" height="19" rx="4.5" fill="white"/>
                <line x1="2" y1="2" x2="13" y2="13" stroke="#E9A020" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="2" cy="2" r="1.8" fill="#E9A020"/>
                <path d="M22.5 16.5L27.3 18.7L27.3 23.5Q27.3 27.3 22.5 29.3Q17.7 27.3 17.7 23.5L17.7 18.7Z" fill="rgba(11,82,64,0.12)" stroke="#0B5240" strokeWidth="1.3" strokeLinejoin="round"/>
                <polyline points="20.4,23 22.2,25 25,21.5" fill="none" stroke="#0B5240" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </g>
            </svg>
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, letterSpacing: '-0.2px', lineHeight: 1.2 }}>Review Portal</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Working Holiday Tax</div>
          </div>
          {newTaskCount > 0 && (
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 20, height: 20, borderRadius: 100, background: '#F59E0B', color: '#fff', fontSize: 10, fontWeight: 800, padding: '0 5px', marginLeft: 4 }}>
              +{newTaskCount}
            </span>
          )}
        </button>
        {/* Buttons */}
        <div className="rv-btns">
          <button
            onClick={async () => { setRefreshing(true); await loadTasks(); setRefreshing(false) }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, height: 34, padding: '0 14px', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: refreshing ? 'default' : 'pointer', fontFamily: 'inherit' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{ animation: refreshing ? 'spin 0.7s linear infinite' : 'none', flexShrink: 0 }}>
              <path d="M23 4v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
          <button
            onClick={logout}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 34, padding: '0 14px', background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 100, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto', padding: '24px 16px' }}>
        <div style={{ marginBottom: 20 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', height: 34, padding: '0 16px', borderRadius: 100, background: G, color: '#fff', fontSize: 12, fontWeight: 600 }}>
            Pending ({counts.pending})
          </span>
        </div>

        {loading
          ? <p style={{ textAlign: 'center', padding: '60px 20px', color: '#8DA89A', fontSize: 14 }}>Loading...</p>
          : filtered.length === 0
          ? <p style={{ textAlign: 'center', padding: '60px 20px', color: '#8DA89A', fontSize: 14 }}>No tasks found.</p>
          : filtered.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              expanded={expanded === task.id}
              onToggle={() => setExpanded(expanded === task.id ? null : task.id)}
              onSetStatus={setStatus}
              acting={acting}
              notes={notes}
              setNotes={setNotes}
              savingNote={savingNote}
              onSaveNote={saveNote}
              saveNoteError={saveNoteError}
              setViewUrl={setViewUrl}

            />
          ))
        }
      </div>

      {viewUrl && (
        <div onClick={() => setViewUrl(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', maxWidth: '90vw', maxHeight: '90vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid #EAF6F1' }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0D1B17' }}>Document Preview</span>
              <button onClick={() => setViewUrl(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#587066', lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', minHeight: 400 }}>
              {viewUrl.toLowerCase().includes('.pdf')
                ? <iframe src={viewUrl} style={{ width: '100%', height: '80vh', border: 'none' }} title="Document" />
                : <img src={viewUrl} alt="Document" style={{ width: '100%', height: 'auto', display: 'block' }} />
              }
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

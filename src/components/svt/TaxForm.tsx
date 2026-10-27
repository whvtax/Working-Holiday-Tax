'use client'

/**
 * Student Visa Tax tax form (decision 003).
 *
 * One page, the same data the WHT form collects, sent through the SAME shared
 * pipeline (submitTaxForm: uploads with retries, then /api/tax-form). The
 * server decides the brand from the host; nothing here claims a brand.
 * Residency (Jo, 26 Oct): the form explains the student rule, the customer
 * marks resident or foreign resident, and the reviewer confirms it before
 * anything is lodged.
 */
import { useEffect, useId, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { dobInputRange, isPlausibleDob, isPlausiblePhone, isValidEmail, isValidTfn } from '@/lib/validate'
import { MAX_UPLOAD_BYTES } from '@/lib/compress-image'
import { MAX_INVOICES, submitTaxForm, type TaxFormPayload } from '@/lib/submit-tax-form'
import { currentTaxYearStart } from '@/lib/tax-year'
import { svtWhatsappUrl } from '@/lib/svt/brand-public'
import { LinkButton } from './Button'
import styles from './TaxForm.module.css'

type YesNo = 'yes' | 'no' | ''

/** The last 4 completed financial years, newest first. Computed at render. */
function completedYears(): string[] {
  const start = currentTaxYearStart() - 1
  return [0, 1, 2, 3].map(i => `${start - i}-${String(start - i + 1).slice(2)}`)
}

const VISA_OPTIONS = ['Student 500', 'Graduate 485', 'Other'] as const
const RESIDENCY_OPTIONS = ['Australian resident for tax', 'Foreign resident for tax'] as const

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  children: (a11y: { id: string; 'aria-invalid': boolean; 'aria-describedby'?: string }) => React.ReactNode
}

function Field({ id, label, hint, error, children }: FieldProps) {
  const describedBy = [hint ? `${id}-hint` : '', error ? `${id}-err` : ''].filter(Boolean).join(' ') || undefined
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>{label}</label>
      {hint ? <p id={`${id}-hint`} className={styles.hint}>{hint}</p> : null}
      {children({ id, 'aria-invalid': !!error, 'aria-describedby': describedBy })}
      {error ? <p id={`${id}-err`} className={styles.error}>{error}</p> : null}
    </div>
  )
}

function Choice({ name, legend, options, value, onChange, error }: {
  name: string; legend: string; options: readonly string[]; value: string; onChange: (v: string) => void; error?: string
}) {
  return (
    <fieldset className={styles.group} aria-describedby={error ? `${name}-err` : undefined} data-field={name}>
      <legend className={styles.label}>{legend}</legend>
      <div className={styles.options}>
        {options.map(o => (
          <label key={o} className={styles.option}>
            <input className={styles.radio} type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
            <span className={styles.pill}>{o.charAt(0).toUpperCase() + o.slice(1)}</span>
          </label>
        ))}
      </div>
      {error ? <p id={`${name}-err`} className={styles.error}>{error}</p> : null}
    </fieldset>
  )
}

const REQUIRED = 'Please fill this in.'
const TOO_BIG_PDF = 'This PDF is over 4 MB. Upload just the first page, or a screenshot showing your name, BSB and account number.'
const DOB_RANGE = dobInputRange()

export function TaxForm() {
  const uid = useId()
  const f = (name: string) => `${uid}-${name}`
  const formRef = useRef<HTMLFormElement>(null)
  const years = completedYears()

  const [v, setV] = useState({
    fullName: '', lastName: '', email: '', waNumber: '', auPhone: '', dob: '', country: '', address: '',
    visa: '', residency: '', tfn: '', primaryJob: '', marital: '' as 'Single' | 'Married' | '',
    hasMedicare: '' as YesNo, hasExpenses: '' as YesNo, abnWork: '' as YesNo, howHeard: '',
  })
  const [taxYears, setTaxYears] = useState<string[]>([years[0]])
  const [bankStatement, setBank] = useState<File | null>(null)
  const [selfiePassport, setSelfie] = useState<File | null>(null)
  const [invoices, setInvoices] = useState<File[]>([])
  const [declared, setDeclared] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle')
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  const [submitError, setSubmitError] = useState('')
  const doneRef = useRef<HTMLHeadingElement>(null)
  // WCAG 2.4.3: the submit button is gone after sending, so move focus to the result.
  useEffect(() => { if (state === 'done') doneRef.current?.focus({ preventScroll: true }) }, [state])

  /** A fixed field loses its error message straight away. */
  const clear = (k: string) => setErrors(prev => (k in prev ? Object.fromEntries(Object.entries(prev).filter(([x]) => x !== k)) : prev))
  const set = <K extends keyof typeof v>(k: K) => (value: (typeof v)[K]) => { setV(prev => ({ ...prev, [k]: value })); clear(k) }
  const text = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setV(prev => ({ ...prev, [k]: e.target.value })); clear(k) }

  function validate(): Record<string, string> {
    const e: Record<string, string> = {}
    if (!v.fullName.trim()) e.fullName = REQUIRED
    if (!v.lastName.trim()) e.lastName = REQUIRED
    if (!v.email.trim()) e.email = REQUIRED
    else if (!isValidEmail(v.email)) e.email = 'Check your email address.'
    if (!v.waNumber.trim()) e.waNumber = REQUIRED
    else if (!isPlausiblePhone(v.waNumber)) e.waNumber = 'Check the number, including the country code.'
    if (!v.dob.trim()) e.dob = REQUIRED
    else if (!isPlausibleDob(v.dob)) e.dob = 'Check your date of birth.'
    if (!v.country.trim()) e.country = REQUIRED
    if (!v.address.trim()) e.address = REQUIRED
    if (!v.visa) e.visa = 'Choose one.'
    if (!v.residency) e.residency = 'Choose one.'
    if (!taxYears.length) e.taxYears = 'Choose at least one year.'
    if (!v.tfn.trim()) e.tfn = REQUIRED
    else if (!isValidTfn(v.tfn)) e.tfn = 'A TFN has 8 or 9 digits.'
    if (!v.primaryJob.trim()) e.primaryJob = REQUIRED
    if (!v.abnWork) e.abnWork = 'Choose one.'
    if (!v.hasMedicare) e.hasMedicare = 'Choose one.'
    if (!v.marital) e.marital = 'Choose one.'
    if (!v.hasExpenses) e.hasExpenses = 'Choose one.'
    if (v.hasExpenses === 'yes' && invoices.length === 0) e.invoices = 'Add at least one receipt, or choose No.'
    if (!bankStatement) e.bankStatement = 'Add your bank statement.'
    else if (bankStatement.type === 'application/pdf' && bankStatement.size > MAX_UPLOAD_BYTES) e.bankStatement = TOO_BIG_PDF
    if (!selfiePassport) e.selfiePassport = 'Add the photo of you holding your passport.'
    if (!declared) e.declared = 'Please read and agree to continue.'
    return e
  }

  function focusFirstError(e: Record<string, string>) {
    const first = Object.keys(e)[0]
    if (!first) return
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"] input, #${CSS.escape(f(first))}`)
    el?.focus()
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    if (state === 'sending') return
    const e = validate()
    // Render the errors first, so the field being focused already carries its
    // message and aria-invalid when the screen reader reads it.
    flushSync(() => setErrors(e))
    if (Object.keys(e).length) { focusFirstError(e); return }
    setState('sending')
    setSubmitError('')
    const payload: TaxFormPayload = {
      waNumber: v.waNumber, auPhone: v.auPhone, fullName: v.fullName, lastName: v.lastName, address: v.address,
      email: v.email, country: v.country, dob: v.dob, marital: v.marital, hasMedicare: v.hasMedicare,
      tfn: v.tfn, primaryJob: v.abnWork === 'yes' ? `${v.primaryJob} (also ABN work)` : v.primaryJob,
      hasExpenses: v.hasExpenses, taxYears, howHeard: v.howHeard || 'Not given', refCode: '',
      declared: 'yes', bankStatement, selfiePassport, invoices: v.hasExpenses === 'yes' ? invoices : [],
      extraNotes: [`Visa: ${v.visa}`, `Residency chosen by the customer: ${v.residency} (reviewer to confirm)`, `ABN work: ${v.abnWork === 'yes' ? 'Yes' : 'No'}`],
    }
    const res = await submitTaxForm(payload, v.residency === RESIDENCY_OPTIONS[1] ? 'foreign' : 'resident', 'en', '/api/tax-form', (done, total) => setProgress({ done, total }))
    setProgress(null)
    if (res.ok) { setState('done'); window.scrollTo({ top: 0 }); return }
    setState('idle')
    setSubmitError(res.error || 'Something went wrong. Your details are still here; please try again.')
  }

  if (state === 'done') {
    return (
      <div className={styles.done} role="status">
        <h2 ref={doneRef} tabIndex={-1} className={styles.doneTitle}>Thank you, we have your form</h2>
        <p>We review everything within about 24 hours and message you on WhatsApp with your estimate.</p>
        <LinkButton href={svtWhatsappUrl('Hi, I have just sent my tax form.')} size="md">Message us on WhatsApp</LinkButton>
      </div>
    )
  }

  const err = (k: string) => errors[k]

  return (
    <form ref={formRef} className={styles.form} onSubmit={onSubmit} noValidate data-svt-form="">
      <section className={styles.block} aria-labelledby={f('s1')}>
        <h2 id={f('s1')} className={styles.blockTitle}>About you</h2>
        <div className={styles.row}>
          <Field id={f('fullName')} label="First name" error={err('fullName')}>{a => <input {...a} className={styles.input} autoComplete="given-name" value={v.fullName} onChange={text('fullName')} />}</Field>
          <Field id={f('lastName')} label="Last name" error={err('lastName')}>{a => <input {...a} className={styles.input} autoComplete="family-name" value={v.lastName} onChange={text('lastName')} />}</Field>
        </div>
        <Field id={f('email')} label="Email" error={err('email')}>{a => <input {...a} className={styles.input} type="email" autoComplete="email" inputMode="email" value={v.email} onChange={text('email')} />}</Field>
        <Field id={f('waNumber')} label="WhatsApp number" hint="With the country code, for example +61 4XX XXX XXX." error={err('waNumber')}>{a => <input {...a} className={styles.input} type="tel" autoComplete="tel" inputMode="tel" value={v.waNumber} onChange={text('waNumber')} />}</Field>
        <Field id={f('auPhone')} label="Australian phone number (if different)" error={err('auPhone')}>{a => <input {...a} className={styles.input} type="tel" inputMode="tel" value={v.auPhone} onChange={text('auPhone')} />}</Field>
        <div className={styles.row}>
          <Field id={f('dob')} label="Date of birth" error={err('dob')}>{a => <input {...a} className={styles.input} type="date" autoComplete="bday" {...DOB_RANGE} value={v.dob} onChange={text('dob')} />}</Field>
          <Field id={f('country')} label="Passport country" error={err('country')}>{a => <input {...a} className={styles.input} autoComplete="country-name" value={v.country} onChange={text('country')} />}</Field>
        </div>
        <Field id={f('address')} label="Your address in Australia" error={err('address')}>{a => <textarea {...a} className={styles.input} rows={2} autoComplete="street-address" value={v.address} onChange={text('address')} />}</Field>
      </section>

      <section className={styles.block} aria-labelledby={f('s2')}>
        <h2 id={f('s2')} className={styles.blockTitle}>Your visa and study</h2>
        <Choice name="visa" legend="Your visa" options={VISA_OPTIONS} value={v.visa} onChange={set('visa')} error={err('visa')} />
        <div className={styles.explain}>
          <p className={styles.explainTitle}>Are you a resident for tax?</p>
          <p>If you are studying in Australia on a course that lasts 6 months or more, you may be an Australian resident for tax purposes. Residents pay no tax on the first $18,200 a year, or on only part of it in the year they arrive or leave.</p>
          <p>If your course is shorter than 6 months, or you are only here for a short stay, you are usually a foreign resident, and tax applies from the first dollar.</p>
          <p>Choose the one that fits you. We check it before anything is lodged.</p>
        </div>
        <Choice name="residency" legend="For tax, I am" options={RESIDENCY_OPTIONS} value={v.residency} onChange={set('residency')} error={err('residency')} />
        <fieldset className={styles.group} data-field="taxYears" aria-describedby={err('taxYears') ? `taxYears-err` : undefined}>
          <legend className={styles.label}>Which years do you need a return for?</legend>
          <p className={styles.hint}>A financial year runs from 1 July to 30 June.</p>
          <div className={styles.options}>
            {years.map(y => (
              <label key={y} className={styles.option}>
                <input className={styles.radio} type="checkbox" checked={taxYears.includes(y)} onChange={e => { setTaxYears(cur => e.target.checked ? [...cur, y] : cur.filter(x => x !== y)); clear('taxYears') }} />
                <span className={styles.pill}>{y}</span>
              </label>
            ))}
          </div>
          {err('taxYears') ? <p id="taxYears-err" className={styles.error}>{err('taxYears')}</p> : null}
        </fieldset>
      </section>

      <section className={styles.block} aria-labelledby={f('s3')}>
        <h2 id={f('s3')} className={styles.blockTitle}>Your work and tax</h2>
        <Field id={f('tfn')} label="Tax file number (TFN)" error={err('tfn')}>{a => <input {...a} className={styles.input} inputMode="numeric" autoComplete="off" value={v.tfn} onChange={text('tfn')} />}</Field>
        <Field id={f('primaryJob')} label="Your main job this year" hint="For example: café, warehouse, tutoring." error={err('primaryJob')}>{a => <input {...a} className={styles.input} value={v.primaryJob} onChange={text('primaryJob')} />}</Field>
        <Choice name="abnWork" legend="Did you also do ABN work, such as Uber Eats or DoorDash?" options={['yes', 'no']} value={v.abnWork} onChange={x => set('abnWork')(x as YesNo)} error={err('abnWork')} />
        <Choice name="hasMedicare" legend="Did you have a Medicare card in Australia? (Overseas student health cover is not Medicare.)" options={['yes', 'no']} value={v.hasMedicare} onChange={x => set('hasMedicare')(x as YesNo)} error={err('hasMedicare')} />
        <Choice name="marital" legend="Relationship status (choose Married if you live with a partner, even if you are not married)" options={['Single', 'Married']} value={v.marital} onChange={x => set('marital')(x as 'Single' | 'Married')} error={err('marital')} />
        <Choice name="hasExpenses" legend="Did you have work costs to claim?" options={['yes', 'no']} value={v.hasExpenses} onChange={x => { set('hasExpenses')(x as YesNo); if (x === 'no') clear('invoices') }} error={err('hasExpenses')} />
        {v.hasExpenses === 'yes' ? (
          <Field id={f('invoices')} label={`Receipts (up to ${MAX_INVOICES})`} hint="Photos or PDFs." error={err('invoices')}>
            {a => <input {...a} className={styles.file} type="file" multiple accept="image/*,application/pdf" onChange={e => { setInvoices(Array.from(e.target.files ?? []).slice(0, MAX_INVOICES)); clear('invoices') }} />}
          </Field>
        ) : null}
      </section>

      <section className={styles.block} aria-labelledby={f('s4')}>
        <h2 id={f('s4')} className={styles.blockTitle}>Two documents</h2>
        <Field id={f('bankStatement')} label="Bank statement" hint="A PDF or a screenshot of your Australian bank statement showing your name, BSB and account number. This is the account the ATO uses for your return." error={err('bankStatement')}>
          {a => <input {...a} className={styles.file} type="file" accept="application/pdf,image/*" onChange={e => {
            const file = e.target.files?.[0] ?? null
            setBank(file)
            // Tell people now, not after the other uploads, that a PDF is too big.
            setErrors(p => { const n = { ...p }; if (file && file.type === 'application/pdf' && file.size > MAX_UPLOAD_BYTES) n.bankStatement = TOO_BIG_PDF; else delete n.bankStatement; return n })
          }} />}
        </Field>
        <Field id={f('selfiePassport')} label="Photo of you holding your passport" hint="This confirms it is you. It is kept private and deleted after it has been checked." error={err('selfiePassport')}>
          {a => <input {...a} className={styles.file} type="file" accept="image/*" onChange={e => { setSelfie(e.target.files?.[0] ?? null); clear('selfiePassport') }} />}
        </Field>
      </section>

      <section className={styles.block} aria-labelledby={f('s5')}>
        <h2 id={f('s5')} className={styles.blockTitle}>Last step</h2>
        <Field id={f('howHeard')} label="How did you hear about us? (optional)">{a => <input {...a} className={styles.input} value={v.howHeard} onChange={text('howHeard')} />}</Field>
        <div className={styles.check} data-field="declared">
          <input id={f('declared')} type="checkbox" checked={declared} onChange={e => { setDeclared(e.target.checked); clear('declared') }} aria-invalid={!!err('declared')} aria-describedby={err('declared') ? `${f('declared')}-err` : undefined} />
          <label htmlFor={f('declared')}>
            I have read and agree to the <a href="/client-agreement" target="_blank" rel="noopener">Client Agreement</a> and the <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a>, and the details above are true.
          </label>
        </div>
        {err('declared') ? <p id={`${f('declared')}-err`} className={styles.error}>{err('declared')}</p> : null}

        {/* Always in the page: a live region added together with its text is often not announced. */}
        <p className={styles.error} role="status">{Object.keys(errors).length ? (Object.keys(errors).length === 1 ? '1 answer above still needs checking.' : `${Object.keys(errors).length} answers above still need checking.`) : ''}</p>
        {submitError ? <p className={styles.submitError} role="alert">{submitError}</p> : null}
        <button type="submit" className={styles.submit} disabled={state === 'sending'} aria-busy={state === 'sending'}>
          {state === 'sending' ? (progress ? `Uploading ${progress.done} of ${progress.total}` : 'Sending') : 'Send my form'}
        </button>
        {progress ? <progress className={styles.progress} max={progress.total} value={progress.done} aria-hidden="true" /> : null}
        <p className={styles.hint} role="status">{state === 'sending' ? (progress ? `Uploading file ${progress.done} of ${progress.total}. Please keep this page open.` : 'Sending your form. Please keep this page open.') : ''}</p>
        <p className={styles.hint}>Reviewed and signed off by a registered tax agent before it is lodged with the ATO.</p>
      </section>
    </form>
  )
}

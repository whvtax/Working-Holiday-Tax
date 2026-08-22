'use client'

/**
 * The tax-residency declaration + Submit button.
 *
 * Lives at the bottom of /tax-residency (and the /de and /ja versions) rather
 * than inside the form: the client fills everything in on /tax-form, is sent
 * here to actually read what tax residency means, and only then declares their
 * status and submits - so the declaration is made after reading, not before.
 *
 * Renders nothing at all unless there's a form in flight (see
 * tax-form-handoff.ts). That matters: this is a public, indexed SEO page and
 * must look completely normal to anyone arriving from search.
 */

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formStrings, type FormLang } from '@/lib/formStrings'
import { submitTaxForm } from '@/lib/submit-tax-form'
import {
  getTaxFormHandoff,
  markTaxFormSubmitted,
  type TaxFormHandoff,
} from '@/lib/tax-form-handoff'
import { WhmNoRefundScreen } from '@/components/ui/WhmNoRefundScreen'

type Status = 'resident' | 'whm' | ''

const COPY = {
  en: {
    intro: 'After reviewing this page and the relevant ATO information, I declare that I am:',
    residentLabel: 'Australian tax resident',
    whmLabel: 'Working holiday maker',
    pickOne: 'Please choose your tax residency status',
    secure: 'Your information is kept secure and private.',
    checkQuestion: 'Are you sure you are a working holiday maker for tax purposes?',
    checkYes: 'Yes, I am sure',
    checkNo: 'No, let me read again',
    confirmLabel: 'I confirm the above is correct',
  },
  de: {
    intro: 'Nach Prüfung dieser Seite und der relevanten ATO-Informationen erkläre ich, dass ich bin:',
    residentLabel: 'Australischer Steuerresident',
    whmLabel: 'Working Holiday Maker',
    pickOne: 'Bitte wähle deinen Steuerresidenz-Status',
    secure: 'Deine Daten werden sicher und vertraulich behandelt.',
    checkQuestion: 'Bist du sicher, dass du steuerlich ein Working Holiday Maker bist?',
    checkYes: 'Ja, ich bin sicher',
    checkNo: 'Nein, ich lese nochmal',
    confirmLabel: 'Ich bestätige, dass die obigen Angaben korrekt sind',
  },
  ja: {
    intro: 'このページと関連するATO情報を確認した上で、以下に該当することを宣言します：',
    residentLabel: 'オーストラリア税務居住者',
    whmLabel: 'ワーキングホリデーメーカー',
    pickOne: '税務上の居住区分を選択してください',
    secure: 'お客様の情報は安全に、非公開で管理されます。',
    checkQuestion: '税務上ワーキングホリデーメーカーで間違いありませんか？',
    checkYes: 'はい、間違いありません',
    checkNo: 'いいえ、もう一度読みます',
    confirmLabel: '上記の内容が正しいことを確認します',
  },
} as const

export default function ResidencyDeclaration({ lang = 'en', onSubmitted, quizStatus }: {
  lang?: FormLang
  /**
   * Called instead of navigating, when the caller is already rendering this
   * step inside its own page. The two-stage flow needs it: there, formUrl is
   * the page we're on, and router.push to the current URL doesn't remount the
   * component - the success screen would never appear.
   */
  onSubmitted?: (firstName: string) => void
  /**
   * When the caller (the eligibility quiz) has already determined the status,
   * the manual "I declare I am" radio is replaced by a single confirm checkbox.
   * The submission itself is unchanged: it still runs through submitTaxForm with
   * this exact status, so the CRM record and the PDF are byte-for-byte identical
   * to the manual path.
   */
  quizStatus?: 'resident' | 'whm'
}) {
  const router = useRouter()
  const [handoff, setHandoff] = useState<TaxFormHandoff | null>(null)
  const [status, setStatus] = useState<Status>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showWhmCheck, setShowWhmCheck] = useState(false)
  const [whmAnswered, setWhmAnswered] = useState(false)
  const [whmBlocked, setWhmBlocked] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  // Read the hand-off after mount only: it lives in the JS heap, so the server
  // render knows nothing about it and rendering it directly would hydrate-mismatch.
  useEffect(() => { setHandoff(getTaxFormHandoff()) }, [])

  if (!handoff) return null

  const t = (k: keyof typeof formStrings) => {
    const entry = formStrings[k] as Record<FormLang, string>
    return entry?.[lang] ?? entry?.en ?? ''
  }
  const c = COPY[lang] ?? COPY.en

  const doSubmit = async (picked: 'resident' | 'whm') => {
    setLoading(true)
    setError('')
    const res = await submitTaxForm(handoff.payload, picked, handoff.lang, handoff.submitUrl)
    if (res.ok) {
      const firstName = handoff.payload.fullName.split(' ')[0] || ''
      markTaxFormSubmitted(firstName)
      if (onSubmitted) onSubmitted(firstName)
      else router.push(handoff.formUrl)
      return
    }
    setLoading(false)
    setError(res.error)
  }

  /**
   * A working-holiday-maker declaration doesn't get lodged.
   *
   * If they paid the correct 15% and have no significant work-related
   * expenses there is no refund to claim, so instead of submitting we explain
   * that and stop - nothing is sent, nothing is stored. The exceptions
   * (overpaid tax, real expenses) are told to message us.
   *
   * The switch is read here rather than at page load, so turning it on in the
   * CRM lets the next client straight through without them reloading. It
   * fails closed: any error keeps the block in place.
   */
  // The form is now sent only AFTER payment, so every WHM who reaches this step
  // has already paid and must be submitted and processed like anyone else. The
  // old "block WHM submissions" override (and its CRM toggle) is therefore gone,
  // and WHM submissions always go through. Kept as a function so the call site is
  // unchanged and the CRM record + PDF pipeline stay byte-for-byte identical.
  const whmSubmissionsAllowed = async (): Promise<boolean> => true

  /** Anonymous count only: no name, no TFN, no documents. */
  const trackBlocked = () => {
    try {
      fetch('/api/analytics/funnel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'tax-form',
          eventType: 'whm_blocked',
          sessionId: `whm-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          lang: handoff.lang,
        }),
        keepalive: true,
      }).catch(() => {})
    } catch {}
  }

  const handleSubmit = () => {
    // The quiz's verdict wins when present; otherwise the manual radio choice.
    const picked: Status = quizStatus ?? status
    if (!picked) { setError(c.pickOne); return }
    if (picked !== 'whm') { void doSubmit(picked); return }

    setLoading(true)
    void whmSubmissionsAllowed().then(allowed => {
      if (allowed) { void doSubmit('whm'); return }
      setLoading(false)
      trackBlocked()
      setWhmBlocked(true)
      window.scrollTo({ top: 0, behavior: 'auto' })
    })
  }

  // Picking WHM raises a short prompt, since visa type alone doesn't decide
  // tax residency. Either answer dismisses it for good.
  const pick = (val: 'resident' | 'whm') => {
    setStatus(val)
    setError('')
    setShowWhmCheck(val === 'whm' && !whmAnswered)
  }

  // No sub-labels: the tax consequence of each option is already spelled out
  // twice above (the "why it matters" box and the $6,750 / $4,288 comparison),
  // so repeating it at the point of choice is noise.
  const options: { val: 'resident' | 'whm'; label: string }[] = [
    { val: 'resident', label: c.residentLabel },
    { val: 'whm',      label: c.whmLabel },
  ]

  // Retry keeps the hand-off intact, so they land back on this page with
  // every field still filled in and can read it through again.
  if (whmBlocked) {
    return (
      <WhmNoRefundScreen
        lang={lang}
        onRetry={() => {
          setWhmBlocked(false)
          setStatus('')
          setWhmAnswered(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    )
  }

  // Quiz mode: the status is already decided, so replace the manual radio with a
  // single confirm checkbox. The submit path (submitTaxForm -> CRM + PDF) is the
  // same one the manual radio uses; only the way `picked` is chosen differs.
  if (quizStatus) {
    return (
      <div className="resdecl-wrap">
        <style>{styles}</style>

        <label className="resdecl-confirm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={e => { setConfirmed(e.target.checked); setError('') }}
            className="resdecl-confirm-box"
          />
          <span className="resdecl-confirm-label">{c.confirmLabel}</span>
        </label>

        {error && <p className="resdecl-error">{error}</p>}

        <button
          type="button"
          className="resdecl-submit"
          onClick={handleSubmit}
          disabled={loading || !confirmed}
        >
          {loading ? t('submitting') : t('submitTax')}
        </button>

        <p className="resdecl-secure">{c.secure}</p>
      </div>
    )
  }

  return (
    <div className="resdecl-wrap">
      <style>{styles}</style>

      <p className="resdecl-intro">
        {c.intro}<span className="resdecl-req">*</span>
      </p>

      <div className="resdecl-options">
        {options.map(opt => (
          <label key={opt.val} className={`resdecl-card${status === opt.val ? ' resdecl-card-active' : ''}`}>
            <span className="resdecl-row">
              <input
                type="radio"
                name="residencyStatus"
                value={opt.val}
                checked={status === opt.val}
                onChange={() => pick(opt.val)}
                className="resdecl-input"
              />
              <span className={`resdecl-dot${status === opt.val ? ' resdecl-dot-active' : ''}`} />
              <span className="resdecl-label">{opt.label}</span>
            </span>
          </label>
        ))}
      </div>

      {showWhmCheck && (
        <div className="resdecl-check">
          <p className="resdecl-check-q">{c.checkQuestion}</p>
          <div className="resdecl-check-actions">
            <button
              type="button"
              className="resdecl-check-yes"
              onClick={() => { setWhmAnswered(true); setShowWhmCheck(false) }}
            >
              {c.checkYes}
            </button>
            <button
              type="button"
              className="resdecl-check-no"
              onClick={() => {
                setWhmAnswered(true)
                setShowWhmCheck(false)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              {c.checkNo}
            </button>
          </div>
        </div>
      )}

      {error && <p className="resdecl-error">{error}</p>}

      <button type="button" className="resdecl-submit" onClick={handleSubmit} disabled={loading}>
        {loading ? t('submitting') : t('submitTax')}
      </button>

      <p className="resdecl-secure">{c.secure}</p>

    </div>
  )
}

const styles = `
  .resdecl-wrap { max-width: 560px; margin: 0 auto; text-align: left; }
  .resdecl-intro { font-size: 14px; font-weight: 600; color: #1A2822; line-height: 1.6; margin-bottom: 14px; }
  .resdecl-req { color: #0B5240; margin-left: 3px; }
  .resdecl-options { display: flex; flex-direction: column; gap: 10px; }
  .resdecl-card { display: flex; align-items: center; padding: 15px 16px; border-radius: 12px; border: 1.5px solid #D4EAE2; background: #F5F9F7; cursor: pointer; transition: all .15s; }
  .resdecl-card-active { background: #EAF6F1; border-color: #0B5240; }
  .resdecl-row { display: flex; align-items: center; gap: 10px; }
  .resdecl-input { display: none; }
  .resdecl-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid #C8EAE0; background: #fff; flex-shrink: 0; transition: all .15s; }
  .resdecl-dot-active { border-color: #0B5240; background: #0B5240; }
  .resdecl-label { font-size: 14px; font-weight: 500; color: #587066; }
  .resdecl-card-active .resdecl-label { color: #0B5240; font-weight: 600; }
  .resdecl-error { font-size: 12.5px; color: #DC2626; margin-top: 10px; font-weight: 500; }
  .resdecl-submit { display: flex; align-items: center; justify-content: center; width: 100%; height: 56px; margin-top: 20px; background: #0B5240; color: #fff; font-size: 15px; font-weight: 600; font-family: inherit; border: none; border-radius: 100px; cursor: pointer; transition: opacity .15s, transform .1s; }
  .resdecl-submit:active { transform: scale(.98); opacity: .9; }
  .resdecl-submit:disabled { opacity: .6; cursor: not-allowed; }
  .resdecl-secure { font-size: 11.5px; color: #7a8a82; text-align: center; margin-top: 12px; }
  .resdecl-confirm { display: flex; align-items: flex-start; gap: 10px; margin-top: 18px; cursor: pointer; }
  .resdecl-confirm-box { width: 18px; height: 18px; margin: 1px 0 0; accent-color: #0B5240; flex-shrink: 0; cursor: pointer; }
  .resdecl-confirm-label { font-size: 13px; font-weight: 600; color: #1A2822; line-height: 1.5; }
  .resdecl-check { margin-top: 12px; background: #FFF8EC; border: 1.5px solid #F0D9A8; border-radius: 12px; padding: 13px 14px; }
  .resdecl-check-q { font-size: 12.5px; font-weight: 600; color: #7A5A16; line-height: 1.5; margin: 0 0 10px; }
  .resdecl-check-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .resdecl-check-yes { flex: 1; min-width: 120px; min-height: 38px; border-radius: 100px; border: none; background: #0B5240; color: #fff; font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer; }
  .resdecl-check-no { flex: 1; min-width: 120px; min-height: 38px; border-radius: 100px; border: 1.5px solid #E2E8E4; background: #fff; color: #587066; font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer; }
`

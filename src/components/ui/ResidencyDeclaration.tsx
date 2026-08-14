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
  },
} as const

export default function ResidencyDeclaration({ lang = 'en' }: { lang?: FormLang }) {
  const router = useRouter()
  const [handoff, setHandoff] = useState<TaxFormHandoff | null>(null)
  const [status, setStatus] = useState<Status>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showWhmCheck, setShowWhmCheck] = useState(false)
  const [whmAnswered, setWhmAnswered] = useState(false)

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
    const res = await submitTaxForm(handoff.payload, picked, handoff.lang)
    if (res.ok) {
      markTaxFormSubmitted(handoff.payload.fullName.split(' ')[0] || '')
      router.push(handoff.formUrl)
      return
    }
    setLoading(false)
    setError(res.error)
  }

  // Nothing gates the submit: whichever status the client picks, and whatever
  // they answer to the WHM prompt below, the return goes through as declared.
  const handleSubmit = () => {
    if (!status) { setError(c.pickOne); return }
    void doSubmit(status)
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
  .resdecl-check { margin-top: 12px; background: #FFF8EC; border: 1.5px solid #F0D9A8; border-radius: 12px; padding: 13px 14px; }
  .resdecl-check-q { font-size: 12.5px; font-weight: 600; color: #7A5A16; line-height: 1.5; margin: 0 0 10px; }
  .resdecl-check-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .resdecl-check-yes { flex: 1; min-width: 120px; min-height: 38px; border-radius: 100px; border: none; background: #0B5240; color: #fff; font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer; }
  .resdecl-check-no { flex: 1; min-width: 120px; min-height: 38px; border-radius: 100px; border: 1.5px solid #E2E8E4; background: #fff; color: #587066; font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer; }
`

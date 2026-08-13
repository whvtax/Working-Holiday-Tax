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
import { isNdaCountry } from '@/lib/nda-countries'
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
    ndaBlock: 'Please read again who qualifies as an Australian tax resident',
    secure: 'Your information is kept secure and private.',
    modalTitle: 'Before you submit',
    modalBody: 'Your visa and income level don\u2019t determine your tax residency. Your tax residency is determined by the tax residency tests explained on this page.',
    modalBody2: 'Based on your answers, you\u2019re considered a Working Holiday Maker for tax purposes. Since you paid the correct 15% tax during the year, you aren\u2019t eligible for a tax refund this year unless you have work-related expenses you\u2019d like to claim.',
    modalThanks: 'Thank you!',
    modalReread: 'No, let me read it again',
    modalSure: 'I\u2019m sure I\u2019m a WHM for tax purposes',
  },
  de: {
    intro: 'Nach Prüfung dieser Seite und der relevanten ATO-Informationen erkläre ich, dass ich bin:',
    residentLabel: 'Australischer Steuerresident',
    whmLabel: 'Working Holiday Maker',
    pickOne: 'Bitte wähle deinen Steuerresidenz-Status',
    ndaBlock: 'Bitte lies noch einmal, wer als australischer Steuerresident gilt',
    secure: 'Deine Daten werden sicher und vertraulich behandelt.',
    modalTitle: 'Bevor du absendest',
    modalBody: 'Deine Visumart und deine Einkommenshöhe bestimmen nicht deine Steuerresidenz. Deine Steuerresidenz wird durch die auf dieser Seite erklärten Steuerresidenz-Tests bestimmt.',
    modalBody2: 'Basierend auf deinen Angaben giltst du für steuerliche Zwecke als Working Holiday Maker. Da du während des Jahres die korrekten 15% Steuer gezahlt hast, hast du dieses Jahr keinen Anspruch auf eine Steuerrückerstattung - es sei denn, du hast berufsbezogene Ausgaben, die du geltend machen möchtest.',
    modalThanks: 'Danke!',
    modalReread: 'Nein, ich lese es noch einmal',
    modalSure: 'Ich bin sicher, ich bin steuerlich ein WHM',
  },
  ja: {
    intro: 'このページと関連するATO情報を確認した上で、以下に該当することを宣言します：',
    residentLabel: 'オーストラリア税務居住者',
    whmLabel: 'ワーキングホリデーメーカー',
    pickOne: '税務上の居住区分を選択してください',
    ndaBlock: 'オーストラリアの税務上の居住者に該当する条件をもう一度ご確認ください',
    secure: 'お客様の情報は安全に、非公開で管理されます。',
    modalTitle: '送信する前に',
    modalBody: 'あなたのビザの種類や所得額は、税務上の居住区分を決定するものではありません。税務上の居住区分は、このページで説明している居住テストによって決定されます。',
    modalBody2: 'ご回答の内容に基づき、税法上ワーキングホリデーメーカーとみなされます。年間を通じて正しい15%の税金を納めているため、申請したい業務関連の経費がある場合を除き、今回は税金の還付を受ける資格がありません。',
    modalThanks: 'ありがとうございます！',
    modalReread: 'いいえ、もう一度読みます',
    modalSure: '税務上WHMで間違いありません',
  },
} as const

export default function ResidencyDeclaration({ lang = 'en' }: { lang?: FormLang }) {
  const router = useRouter()
  const [handoff, setHandoff] = useState<TaxFormHandoff | null>(null)
  const [status, setStatus] = useState<Status>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showWhmModal, setShowWhmModal] = useState(false)
  const [whmConfirmed, setWhmConfirmed] = useState(false)

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

  const handleSubmit = () => {
    if (!status) { setError(c.pickOne); return }
    // Hard stop: someone from an NDA country claiming WHM status is the costly
    // mistake this whole page exists to catch.
    if (status === 'whm' && isNdaCountry(handoff.payload.country)) {
      setError(c.ndaBlock)
      return
    }
    // Soft stop: confirm WHM once, since visa type alone doesn't decide residency.
    if (status === 'whm' && !whmConfirmed) { setShowWhmModal(true); return }
    void doSubmit(status)
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
                onChange={() => { setStatus(opt.val); setError('') }}
                className="resdecl-input"
              />
              <span className={`resdecl-dot${status === opt.val ? ' resdecl-dot-active' : ''}`} />
              <span className="resdecl-label">{opt.label}</span>
            </span>
          </label>
        ))}
      </div>

      {error && <p className="resdecl-error">{error}</p>}

      <button type="button" className="resdecl-submit" onClick={handleSubmit} disabled={loading}>
        {loading ? t('submitting') : t('submitTax')}
      </button>

      <p className="resdecl-secure">{c.secure}</p>

      {showWhmModal && (
        <div role="dialog" aria-modal="true" className="resdecl-modal-bg">
          <div className="resdecl-modal">
            <div className="resdecl-modal-icon">🛑</div>
            <h3 className="resdecl-modal-title">{c.modalTitle}</h3>
            <p className="resdecl-modal-body">{c.modalBody}</p>
            <p className="resdecl-modal-body">{c.modalBody2}</p>
            <p className="resdecl-modal-thanks">{c.modalThanks}</p>
            <div className="resdecl-modal-actions">
              <button
                type="button"
                className="resdecl-modal-primary"
                onClick={() => {
                  setShowWhmModal(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                {c.modalReread}
              </button>
              <button
                type="button"
                className="resdecl-modal-secondary"
                onClick={() => {
                  setWhmConfirmed(true)
                  setShowWhmModal(false)
                  void doSubmit('whm')
                }}
              >
                {c.modalSure}
              </button>
            </div>
          </div>
        </div>
      )}
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
  .resdecl-modal-bg { position: fixed; inset: 0; background: rgba(8,15,13,0.55); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
  .resdecl-modal { background: #fff; border-radius: 18px; max-width: 440px; width: 100%; padding: 26px 24px; box-shadow: 0 24px 70px rgba(0,0,0,0.32); text-align: center; }
  .resdecl-modal-icon { font-size: 30px; margin-bottom: 10px; }
  .resdecl-modal-title { font-size: 17px; font-weight: 800; color: #92400e; margin: 0 0 10px; }
  .resdecl-modal-body { font-size: 14px; color: #1A2822; line-height: 1.6; margin: 0 0 10px; }
  .resdecl-modal-thanks { font-size: 14px; color: #1A2822; font-weight: 600; margin: 0 0 20px; }
  .resdecl-modal-actions { display: flex; flex-direction: column; gap: 10px; }
  .resdecl-modal-primary { min-height: 50px; border-radius: 100px; border: none; background: #0B5240; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; }
  .resdecl-modal-secondary { min-height: 44px; border-radius: 100px; border: 1.5px solid #E2E8E4; background: #fff; color: #587066; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; }
`

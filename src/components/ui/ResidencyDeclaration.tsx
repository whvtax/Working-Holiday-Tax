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
import { isNdaCountry } from '@/lib/nda-countries'
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
    answerAll: 'Please answer all questions to continue.',
    // Shown before submit ONLY when the person is from a treaty (NDA) country
    // yet their answers came out as a Working Holiday Maker — so they may be
    // giving up a residency (and the tax-free threshold) they could claim.
    confirmLead: 'Based on your answers, you will be lodged as a Working Holiday Maker. Please confirm you understand that this means:',
    confirmP1pre: 'You are ', confirmP1strong: 'not an Australian resident for tax purposes', confirmP1post: '.',
    confirmP2pre: 'You are ', confirmP2strong: 'not entitled to the $18,200 tax-free threshold', confirmP2post: '.',
    confirmNote: 'People from your country can sometimes qualify as a resident and keep the tax-free threshold. If that might apply to you, review your answers first.',
    confirmYes: 'Yes, I understand. Submit this way',
    confirmNo: 'Let me review again',
  },
  de: {
    intro: 'Nach Prüfung dieser Seite und der relevanten ATO-Informationen erkläre ich, dass ich bin:',
    residentLabel: 'Australischer Steuerresident',
    whmLabel: 'Working Holiday Maker',
    pickOne: 'Bitte wähle deinen Steuerresidenz-Status',
    secure: 'Deine Daten werden sicher und vertraulich behandelt.',
    answerAll: 'Bitte beantworte alle Fragen, um fortzufahren.',
    confirmLead: 'Basierend auf deinen Antworten wirst du als Working Holiday Maker eingereicht. Bitte bestätige, dass dir Folgendes bewusst ist:',
    confirmP1pre: 'Du bist ', confirmP1strong: 'kein australischer Steuerresident', confirmP1post: '.',
    confirmP2pre: 'Du hast ', confirmP2strong: 'keinen Anspruch auf den steuerfreien Betrag von $18.200', confirmP2post: '.',
    confirmNote: 'Menschen aus deinem Land können unter Umständen als Steuerresident gelten und den steuerfreien Betrag behalten. Falls das auf dich zutreffen könnte, prüfe zuerst deine Antworten.',
    confirmYes: 'Ja, ich verstehe. So einreichen',
    confirmNo: 'Nochmal überprüfen',
  },
  ja: {
    intro: 'このページと関連するATO情報を確認した上で、以下に該当することを宣言します：',
    residentLabel: 'オーストラリア税務居住者',
    whmLabel: 'ワーキングホリデーメーカー',
    pickOne: '税務上の居住区分を選択してください',
    secure: 'お客様の情報は安全に、非公開で管理されます。',
    answerAll: '続行するにはすべての質問にお答えください。',
    confirmLead: 'ご回答に基づき、ワーキングホリデーメーカーとして申告されます。以下の点をご確認ください：',
    confirmP1pre: 'あなたは', confirmP1strong: 'オーストラリアの税務居住者ではありません', confirmP1post: '。',
    confirmP2pre: '', confirmP2strong: '$18,200の非課税枠は適用されません', confirmP2post: '。',
    confirmNote: 'あなたの国の方は、居住者として非課税枠を受けられる場合があります。該当する可能性がある場合は、まず回答をご確認ください。',
    confirmYes: 'はい、理解しました。この内容で申告する',
    confirmNo: 'もう一度確認する',
  },
} as const

export default function ResidencyDeclaration({ lang = 'en', onSubmitted, autoStatus }: {
  lang?: FormLang
  /**
   * Called instead of navigating, when the caller is already rendering this
   * step inside its own page. The two-stage flow needs it: there, formUrl is
   * the page we're on, and router.push to the current URL doesn't remount the
   * component - the success screen would never appear.
   */
  onSubmitted?: (firstName: string) => void
  /**
   * The eligibility quiz's verdict. When it changes, it PRE-SELECTS the matching
   * option — the client can still change it. Everything downstream (submit, CRM,
   * PDF) is identical to a manual selection.
   */
  autoStatus?: 'resident' | 'whm'
}) {
  const router = useRouter()
  const [handoff, setHandoff] = useState<TaxFormHandoff | null>(null)
  const [status, setStatus] = useState<Status>('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null)
  // Set true to gate the submit behind a confirmation, for the one case that
  // warrants it: a Working Holiday Maker result for someone from a treaty (NDA)
  // country, who may be giving up a residency and the $18,200 threshold they
  // could otherwise claim.
  const [confirming, setConfirming] = useState(false)

  // Read the hand-off after mount only: it lives in the JS heap, so the server
  // render knows nothing about it and rendering it directly would hydrate-mismatch.
  useEffect(() => { setHandoff(getTaxFormHandoff()) }, [])

  // The quiz decides the status; the client cannot change it by hand (owner rule).
  // The declaration is display-only and follows the quiz verdict.
  useEffect(() => { if (autoStatus) setStatus(autoStatus) }, [autoStatus])

  if (!handoff) return null

  const t = (k: keyof typeof formStrings) => {
    const entry = formStrings[k] as Record<FormLang, string>
    return entry?.[lang] ?? entry?.en ?? ''
  }
  const c = COPY[lang] ?? COPY.en

  const doSubmit = async (picked: 'resident' | 'whm') => {
    setLoading(true)
    setProgress(null)
    setError('')
    // "3 of 12" instead of a static label. Uploads run one at a time with
    // retries, so a dozen files on a slow connection is a long, silent minute
    // behind an unchanging button, at the exact moment of commitment.
    const res = await submitTaxForm(
      handoff.payload, picked, handoff.lang, handoff.submitUrl,
      (done, total) => { if (total > 1) setProgress({ done, total }) },
    )
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

  // The quiz decides resident vs WHM; both are submitted the same way, through the
  // identical submitTaxForm path (CRM + PDF unchanged). The client cannot change
  // the choice by hand, and cannot submit until the quiz has produced a status
  // (which only happens once all questions are answered).
  const handleSubmit = () => {
    if (!status) { setError(c.pickOne); return }
    // The one confirmation: a WHM result for someone from a treaty (NDA) country.
    // They might qualify as a resident (with the tax-free threshold), so make the
    // consequence explicit and let them go back before it is lodged. Everyone
    // else submits straight through, unchanged.
    if (status === 'whm' && isNdaCountry((handoff.payload as { country?: string }).country)) {
      setConfirming(true)
      return
    }
    void doSubmit(status)
  }

  const options: { val: 'resident' | 'whm'; label: string }[] = [
    { val: 'resident', label: c.residentLabel },
    { val: 'whm',      label: c.whmLabel },
  ]

  return (
    <div className="resdecl-wrap">
      <style>{styles}</style>

      {/* Display-only: the active card (green highlight, no dot) is the quiz's
          verdict. There is no radio and no click handler — it cannot be changed. */}
      <div className="resdecl-options">
        {options.map(opt => (
          <div key={opt.val} className={`resdecl-card${status === opt.val ? ' resdecl-card-active' : ''}`}>
            <span className="resdecl-row">
              {/* A tick box that fills with a checkmark on the option the quiz
                  worked out — for whichever of the two it is. */}
              <span className={`resdecl-tick${status === opt.val ? ' is-checked' : ''}`}>{status === opt.val ? '✓' : ''}</span>
              <span className="resdecl-label">{opt.label}</span>
            </span>
          </div>
        ))}
      </div>

      {error && <p className="resdecl-error">{error}</p>}

      {/* Disabled until the quiz has produced a status (all questions answered). */}
      <button type="button" className="resdecl-submit" onClick={handleSubmit} disabled={loading || !status}>
        {loading
          ? (progress && progress.done < progress.total
            ? `${t('submitting')} ${progress.done}/${progress.total}`
            : t('submitting'))
          : t('submitTax')}
      </button>

      {!status && !loading && <p className="resdecl-hint">{c.answerAll}</p>}

      <p className="resdecl-secure">{c.secure}</p>

      {/* WHM + treaty-country confirmation. Explicit consequence, then a clear
          choice: submit as declared, or go back and re-read. Nothing is lodged
          until they confirm. */}
      {confirming && (
        <div className="resdecl-overlay" onClick={(e) => { if (e.target === e.currentTarget) setConfirming(false) }}>
          <div className="resdecl-modal" role="dialog" aria-modal="true">
            <p className="resdecl-modal-lead">{c.confirmLead}</p>
            <ul className="resdecl-modal-points">
              <li>{c.confirmP1pre}<strong>{c.confirmP1strong}</strong>{c.confirmP1post}</li>
              <li>{c.confirmP2pre}<strong>{c.confirmP2strong}</strong>{c.confirmP2post}</li>
            </ul>
            <p className="resdecl-modal-note">{c.confirmNote}</p>
            <div className="resdecl-modal-btns">
              <button
                type="button"
                className="resdecl-submit"
                onClick={() => { setConfirming(false); void doSubmit('whm') }}
              >{c.confirmYes}</button>
              <button
                type="button"
                className="resdecl-modal-back"
                onClick={() => setConfirming(false)}
              >{c.confirmNo}</button>
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
  .resdecl-card { display: flex; align-items: center; padding: 15px 16px; border-radius: 12px; border: 1.5px solid #CDE3DB; background: #F5F9F7; cursor: default; transition: all .15s; }
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
  .resdecl-tick { width: 20px; height: 20px; border-radius: 6px; border: 1.5px solid #C8EAE0; background: #fff; flex-shrink: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; transition: background .18s ease, border-color .18s ease; }
  .resdecl-tick.is-checked { background: #0B5240; border-color: #0B5240; color: #fff; animation: resdeclTickPop .22s ease; }
  .resdecl-card { transition: background .18s ease, border-color .18s ease; }
  @keyframes resdeclTickPop { 0% { transform: scale(.7); } 60% { transform: scale(1.12); } 100% { transform: scale(1); } }
  .resdecl-hint { font-size: 12px; color: #9AA99F; text-align: center; margin-top: 8px; }
  @media (prefers-reduced-motion: reduce) { .resdecl-tick.is-checked { animation: none; } .resdecl-tick, .resdecl-card { transition: none; } }
  .resdecl-check { margin-top: 12px; background: #FFF8EC; border: 1.5px solid #F0D9A8; border-radius: 12px; padding: 13px 14px; }
  .resdecl-check-q { font-size: 12.5px; font-weight: 600; color: #7A5A16; line-height: 1.5; margin: 0 0 10px; }
  .resdecl-check-actions { display: flex; gap: 8px; flex-wrap: wrap; }
  .resdecl-check-yes { flex: 1; min-width: 120px; min-height: 38px; border-radius: 100px; border: none; background: #0B5240; color: #fff; font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer; }
  .resdecl-check-no { flex: 1; min-width: 120px; min-height: 38px; border-radius: 100px; border: 1.5px solid #E2E8E4; background: #fff; color: #587066; font-size: 12.5px; font-weight: 600; font-family: inherit; cursor: pointer; }
  /* WHM + treaty-country confirmation modal */
  .resdecl-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(11,20,17,.5); display: flex; align-items: center; justify-content: center; padding: 18px; }
  .resdecl-modal { width: 100%; max-width: 420px; background: #fff; border-radius: 20px; box-shadow: 0 12px 48px rgba(11,20,17,.28); padding: 22px 20px; text-align: left; }
  .resdecl-modal-lead { font-size: 14px; font-weight: 600; color: #1A2822; line-height: 1.55; margin: 0 0 12px; }
  .resdecl-modal-points { margin: 0 0 12px; padding: 0 0 0 2px; list-style: none; display: flex; flex-direction: column; gap: 8px; }
  .resdecl-modal-points li { position: relative; padding-left: 20px; font-size: 13.5px; color: #1A2822; line-height: 1.5; }
  .resdecl-modal-points li::before { content: ''; position: absolute; left: 4px; top: 8px; width: 6px; height: 6px; border-radius: 50%; background: #D08A00; }
  .resdecl-modal-points strong { font-weight: 700; color: #0B3B2E; }
  .resdecl-modal-note { font-size: 12.5px; color: #587066; line-height: 1.55; margin: 0 0 16px; background: #F5F9F7; border-radius: 10px; padding: 10px 12px; }
  .resdecl-modal-btns { display: flex; flex-direction: column; gap: 8px; }
  .resdecl-modal-btns .resdecl-submit { margin-top: 0; height: 50px; }
  .resdecl-modal-back { width: 100%; height: 46px; border-radius: 100px; border: 1.5px solid #E2E8E4; background: #fff; color: #587066; font-size: 14px; font-weight: 600; font-family: inherit; cursor: pointer; }
  .resdecl-modal-back:active { transform: scale(.98); }
`

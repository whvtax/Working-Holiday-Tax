'use client'

/**
 * WhmNoRefundScreen
 * -----------------
 * Shown instead of submitting when someone declares themselves a working
 * holiday maker for tax purposes: if they paid the correct 15% and have no
 * significant work-related expenses, there is no refund to claim, so lodging
 * would create work with no outcome for either side.
 *
 * Nothing is submitted and nothing reaches the CRM - no name, no TFN, no
 * uploaded documents. The only thing recorded is an anonymous funnel event so
 * the volume of people landing here is knowable.
 *
 * Two ways out: message us (for the genuine exceptions - overpaid tax, real
 * expenses), or go back to the residency page with everything still filled in
 * and read it again.
 */

import { WA_URL } from '@/lib/constants'
import type { FormLang } from '@/lib/formStrings'

const COPY = {
  en: {
    title: "Based on your answers, there's no refund to claim",
    p1: "You've read through what tax residency means in Australia and concluded that you're a working holiday maker for tax purposes. If you paid the correct 15% tax during the year and don't have significant work-related expenses, there's no refund owing to you this year.",
    p2: "If you think you may have misread something, you're welcome to go through the questionnaire again. And if you paid more than 15%, or you do have significant work-related expenses, send us a message. Those are the cases where there may still be something to claim.",
    wa: 'Message us on WhatsApp',
    again: 'Fill in the questionnaire again',
    note: 'Nothing has been submitted.',
  },
  de: {
    title: 'Nach deinen Angaben gibt es keine Rückerstattung',
    p1: 'Du hast gelesen, was Steuerresidenz in Australien bedeutet, und bist zu dem Schluss gekommen, dass du steuerlich ein Working Holiday Maker bist. Wenn du im Laufe des Jahres die korrekten 15% Steuer gezahlt hast und keine wesentlichen berufsbezogenen Ausgaben hast, steht dir dieses Jahr keine Rückerstattung zu.',
    p2: 'Falls du etwas falsch verstanden haben solltest, kannst du den Fragebogen gerne noch einmal ausfüllen. Und wenn du mehr als 15% gezahlt hast oder doch wesentliche berufsbezogene Ausgaben hast, schreib uns. In diesen Fällen könnte es trotzdem etwas zu holen geben.',
    wa: 'Schreib uns auf WhatsApp',
    again: 'Fragebogen noch einmal ausfüllen',
    note: 'Es wurde nichts abgeschickt.',
  },
  ja: {
    title: 'ご回答の内容では、還付の対象になりません',
    p1: 'オーストラリアの税務上の居住区分について確認したうえで、税務上はワーキングホリデーメーカーに該当すると判断されました。年間を通じて正しい15%の税金を納めており、業務関連の大きな経費がない場合、今年度の還付はありません。',
    p2: 'もし理解に行き違いがあったと思われる場合は、もう一度アンケートにお答えいただけます。15%を超える税金を支払った場合や、業務関連の大きな経費がある場合は、メッセージをお送りください。そのような場合は還付を受けられる可能性があります。',
    wa: 'WhatsAppでメッセージを送る',
    again: 'もう一度アンケートに答える',
    note: 'フォームは送信されていません。',
  },
} as const

export function WhmNoRefundScreen({ lang = 'en', onRetry }: { lang?: FormLang; onRetry: () => void }) {
  const c = COPY[lang] ?? COPY.en

  return (
    <div className="whmns">
      <style>{styles}</style>

      <div className="whmns-card">
        <div className="whmns-icon">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="#0B5240" strokeWidth="1.8" />
            <path d="M12 11v5" stroke="#0B5240" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="7.8" r="1.1" fill="#0B5240" />
          </svg>
        </div>

        <h1 className="whmns-title">{c.title}</h1>
        <p className="whmns-p">{c.p1}</p>
        <p className="whmns-p whmns-p-last">{c.p2}</p>

        <a className="whmns-btn whmns-wa" href={WA_URL} target="_blank" rel="noopener noreferrer">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5s-.6-1.5-.9-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-1 1-1.2 2.3-.4 3.7 1.4 2.4 2.6 3.6 5.3 4.8 1.9.8 2.6.9 3.5.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
            <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
          </svg>
          {c.wa}
        </a>

        <button type="button" className="whmns-btn whmns-again" onClick={onRetry}>
          {c.again}
        </button>

        <p className="whmns-note">{c.note}</p>
      </div>
    </div>
  )
}

export default WhmNoRefundScreen

const styles = `
  .whmns { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 26px 16px; }
  .whmns-card { width: 100%; max-width: 480px; background: #fff; border-radius: 24px; box-shadow: 0 2px 24px rgba(11,82,64,0.07); padding: 32px 22px 26px; text-align: center; }
  /* Green, not red: this is an answer, not an error. */
  .whmns-icon { width: 56px; height: 56px; border-radius: 50%; background: #EAF6F1; border: 1.5px solid #C8EAE0; display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
  .whmns-title { font-size: 20px; font-weight: 800; color: #080F0D; letter-spacing: -0.02em; line-height: 1.28; margin-bottom: 14px; text-wrap: balance; }
  /* Left-aligned: these paragraphs are too long to centre readably. */
  .whmns-p { font-size: 13px; color: #587066; line-height: 1.65; margin-bottom: 12px; text-align: left; }
  .whmns-p-last { margin-bottom: 22px; }
  .whmns-btn { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; height: 54px; border-radius: 100px; font-size: 14.5px; font-weight: 600; font-family: inherit; border: none; cursor: pointer; text-decoration: none; }
  .whmns-wa { background: #0B5240; color: #fff; margin-bottom: 10px; }
  .whmns-again { background: #fff; color: #0B5240; border: 1.5px solid #D4EAE2; }
  .whmns-note { font-size: 11.5px; color: #9DB5AC; margin-top: 14px; }
`

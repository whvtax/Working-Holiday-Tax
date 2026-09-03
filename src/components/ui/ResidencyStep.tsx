'use client'

/**
 * The tax-residency step.
 *
 * This used to be a standalone marketing page. It's now a step of the tax
 * form that happens to live at its own URL: same card, same palette, same
 * widths as /tax-form, no breadcrumbs, no hero, no site chrome below it.
 *
 * Written mobile-first - effectively all traffic here is on a phone. The
 * title is sized to hold one line and the intro two, at every phone width
 * and in all three languages, so the top of the card stays a fixed shape.
 *
 * Wording note: the public copy says "Australian tax resident", the everyday
 * phrase, rather than the ATO's "Australian resident for tax purposes". The
 * value actually submitted to the CRM is unchanged (see submit-tax-form.ts).
 */

import { useEffect, useState } from 'react'
import type { FormLang } from '@/lib/formStrings'
import { getTaxFormHandoff } from '@/lib/tax-form-handoff'
import ResidencyDeclaration from '@/components/ui/ResidencyDeclaration'
import { FormStepper } from '@/components/ui/FormStepper'


const COPY = {
  en: {
    titleLead: 'Let’s confirm your ',
    titleAccent: 'tax residency',
    titleTail: '',
    intro: 'Tax residency determines which tax rates apply to your income.',
    introEmph: 'It is separate from your immigration status.',
    whyTitle: 'Why it matters?',
    whyBody: 'If you qualify as an Australian tax resident, the first $18,200 of your taxable income is tax-free, meaning any 15% tax paid on that amount may be refunded.',
    compareCaption: 'Tax on $45,000 of income',
    whmName: 'Working holiday maker',
    residentName: 'Australian tax resident',
    compareFoot: '$2,462 more in your pocket',
    condIntro: 'You may qualify as an Australian tax resident if you meet the following criteria:',
    conditions: [
      'You hold a passport from: United Kingdom, Germany, Japan, Chile, Finland, Israel, Norway or Turkey.',
      'Your ordinary place of residence is in Australia.',
      'You have an intention to live in Australia.',
      'You have ongoing ties to Australia - a home, ongoing employment, or personal connections.',
    ],
    note: 'If you\u2019re not from one of these countries but meet the other requirements, you can still qualify for Australian tax residency and a refund of up to $700.',
    quizIntro: 'To be considered an Australian tax resident, meaning the first $18,200 of your income is tax-free for the financial year you are lodging your tax return for, at least 4 of the 5 points below need to genuinely apply to you.',
    yearNote: 'These apply to the tax year you’re lodging.',
    yesLabel: 'Yes',
    noLabel: 'No',
    questions: [
      'You have lived in Australia for 6 months or more',
      'Your usual home is in Australia',
      'You plan to continue living in Australia',
      'You have ongoing work in Australia',
      'You have personal or family ties in Australia',
    ],
    whmResult: 'Based on your answers, you are considered a WHM for tax purposes, so the $18,200 tax-free threshold does not apply to you.',
    nonNdaResult: 'Based on your answers, you may be an Australian tax resident, but the $18,200 tax-free threshold does not apply. You may still be entitled to the Low Income Tax Offset of up to $700.',
      sessionLost: 'Your session timed out, so your details need entering again. Nothing was sent.',
    sessionLostCta: 'Back to the form',
    warn: {
      title: 'Please read this carefully',
      leadPre: 'Based on your answers, you are ',
      leadEmph: 'not',
      leadPost: ' considered an Australian resident for tax purposes.',
      meansLabel: 'This means',
      b1: 'The tax-free threshold does not apply, so the first $18,200 of your income is not tax-free.',
      b2: 'You are not entitled to the Low Income Tax Offset of up to $700.',
      notePre: 'Your tax residency status is ',
      noteEmph: 'completely separate',
      notePost: ' from your immigration (visa) status.',
      read: 'Please make sure you have read and understood every question, and answered only for the tax year you are lodging.',
      btnReview: 'Review my answers',
      btnConfirm: 'I understand, this is correct',
    },
  },
  de: {
    titleLead: 'Bestätigen wir deine ',
    titleAccent: 'Steuerresidenz',
    titleTail: '',
    intro: 'Die Steuerresidenz bestimmt deinen Steuersatz.',
    introEmph: 'Sie ist nicht dasselbe wie dein Aufenthaltsstatus.',
    whyTitle: 'Warum ist das wichtig?',
    whyBody: 'Wenn du als australischer Steuerresident giltst, sind die ersten $18.200 deines zu versteuernden Einkommens steuerfrei - die darauf gezahlte 15%-Steuer kann erstattet werden.',
    compareCaption: 'Steuer auf $45.000 Einkommen',
    whmName: 'Working Holiday Maker',
    residentName: 'Australischer Steuerresident',
    compareFoot: '$2.462 mehr für dich',
    condIntro: 'Du kannst als australischer Steuerresident gelten, wenn du die folgenden Kriterien erfüllst:',
    conditions: [
      'Du hast einen Reisepass aus: Großbritannien, Deutschland, Japan, Chile, Finnland, Israel, Norwegen oder Türkei.',
      'Dein gewöhnlicher Wohnsitz ist in Australien.',
      'Du hast die Absicht, in Australien zu leben.',
      'Du hast dauerhafte Bindungen zu Australien - ein Zuhause, eine feste Arbeit oder persönliche Beziehungen.',
    ],
    note: 'Wenn du nicht aus einem dieser Länder kommst, aber die anderen Voraussetzungen erfüllst, kannst du trotzdem als australischer Steuerresident gelten und bis zu $700 zurückbekommen.',
    quizIntro: 'Um als australischer Steuerresident zu gelten, was bedeutet, dass die ersten $18.200 deines Einkommens für das Steuerjahr, für das du deine Steuererklärung einreichst, steuerfrei sind, müssen mindestens 4 der 5 folgenden Punkte wirklich auf dich zutreffen.',
    yearNote: 'Diese Punkte gelten für das Steuerjahr, das du einreichst.',
    yesLabel: 'Ja',
    noLabel: 'Nein',
    questions: [
      'Du hast 6 Monate oder länger in Australien gelebt',
      'Dein gewöhnlicher Wohnsitz ist in Australien',
      'Du beabsichtigst, weiterhin in Australien zu leben',
      'Du hast eine laufende Arbeit in Australien',
      'Du hast persönliche oder familiäre Bindungen in Australien',
    ],
    whmResult: 'Basierend auf deinen Antworten bist du steuerlich ein Working Holiday Maker, daher gilt der steuerfreie Betrag von $18.200 nicht. Unser Team bestätigt dies bei der Erstellung deiner Steuererklärung.',
    nonNdaResult: 'Basierend auf deinen Antworten bist du möglicherweise australischer Steuerresident, aber der steuerfreie Betrag von $18.200 gilt nicht. Möglicherweise hast du trotzdem Anspruch auf den Low Income Tax Offset von bis zu $700.',
      sessionLost: 'Deine Sitzung ist abgelaufen, deine Angaben müssen noch einmal eingegeben werden. Es wurde nichts gesendet.',
    sessionLostCta: 'Zurück zum Formular',
    warn: {
      title: 'Bitte lies das aufmerksam',
      leadPre: 'Basierend auf deinen Antworten giltst du steuerlich ',
      leadEmph: 'nicht',
      leadPost: ' als australischer Steuerresident.',
      meansLabel: 'Das bedeutet',
      b1: 'Der steuerfreie Betrag gilt nicht, die ersten $18.200 deines Einkommens sind nicht steuerfrei.',
      b2: 'Du hast keinen Anspruch auf den Low Income Tax Offset von bis zu $700.',
      notePre: 'Deine Steuerresidenz ist ',
      noteEmph: 'völlig getrennt',
      notePost: ' von deinem Aufenthalts- bzw. Visastatus.',
      read: 'Bitte stelle sicher, dass du jede Frage gelesen und verstanden hast und nur für das Steuerjahr antwortest, das du einreichst.',
      btnReview: 'Antworten überprüfen',
      btnConfirm: 'Ich verstehe, das ist korrekt',
    },
  },
  ja: {
    titleLead: '',
    titleAccent: '税務上の居住区分',
    titleTail: 'を確認しましょう',
    intro: '税務上の居住区分は、所得に適用される税率を決めるものです。',
    introEmph: '在留資格とは異なります。',
    whyTitle: 'なぜ重要なのか？',
    whyBody: 'オーストラリア税務居住者に該当する場合、課税所得の最初の$18,200は非課税となり、その分に支払った15%の税金が還付される可能性があります。',
    compareCaption: '所得$45,000にかかる税額',
    whmName: 'ワーキングホリデーメーカー',
    residentName: 'オーストラリア税務居住者',
    compareFoot: '$2,462があなたの手元に',
    condIntro: '以下の条件を満たす場合、オーストラリア税務居住者に該当する可能性があります：',
    conditions: [
      '以下の国のパスポートを所持：イギリス、ドイツ、日本、チリ、フィンランド、イスラエル、ノルウェー、トルコ。',
      '通常の居住地がオーストラリアにあること。',
      'オーストラリアに居住する意思があること。',
      '住居、継続的な仕事、個人的なつながりなど、オーストラリアとの結びつきがあること。',
    ],
    note: 'これらの国の出身でなくても、他の条件を満たしていれば、オーストラリア税務居住者として最大$700の還付を受けられる場合があります。',
    quizIntro: '申告する会計年度についてオーストラリア税務居住者と見なされ、その年度の最初の$18,200の所得が非課税となるには、以下の5つの項目のうち少なくとも4つが本当に当てはまる必要があります。',
    yearNote: '今回申告する税務年度についてご確認ください。',
    yesLabel: 'はい',
    noLabel: 'いいえ',
    questions: [
      'オーストラリアに6か月以上住んでいる',
      '普段の住まいがオーストラリアにある',
      '今後もオーストラリアに住み続ける予定である',
      'オーストラリアで継続的な仕事がある',
      'オーストラリアに個人的または家族的なつながりがある',
    ],
    whmResult: 'ご回答に基づくと、税務上あなたはワーキングホリデーメーカーであるため、$18,200の非課税枠は適用されません。申告書作成時に当チームが確認します。',
    nonNdaResult: 'ご回答に基づくと、あなたはオーストラリア税務居住者である可能性がありますが、$18,200の非課税枠は適用されません。低所得者税額控除（Low Income Tax Offset）として最大$700を受けられる可能性があります。',
      sessionLost: 'セッションの有効期限が切れたため、もう一度ご入力をお願いします。送信はされていません。',
    sessionLostCta: 'フォームに戻る',
    warn: {
      title: '重要：必ずお読みください',
      leadPre: 'ご回答に基づくと、あなたはオーストラリアの税務居住者には',
      leadEmph: '該当しません',
      leadPost: '。',
      meansLabel: 'これは次を意味します',
      b1: '非課税枠は適用されず、所得の最初の$18,200は非課税になりません。',
      b2: '最大$700の低所得者税額控除（Low Income Tax Offset）を受けられません。',
      notePre: '税務上の居住区分は、在留資格（ビザ）とは',
      noteEmph: 'まったく別のもの',
      notePost: 'です。',
      read: '各質問をよく読んで理解し、申告する税務年度についてのみお答えください。',
      btnReview: '回答を確認する',
      btnConfirm: '理解しました、これで正しいです',
    },
  },
} as const

export default function ResidencyStep({ lang = 'en', onSubmitted }: {
  lang?: FormLang
  /** Forwarded to the declaration; see ResidencyDeclaration. */
  onSubmitted?: (firstName: string) => void
}) {
  const c = COPY[lang] ?? COPY.en

  // The form hand-off (present post-payment). Read after mount because it lives
  // in the JS heap and the server render can't see it. Gives us the step
  // indicator and the client's home country (for the NDA branch below).
  const [handoff, setHandoff] = useState<ReturnType<typeof getTaxFormHandoff>>(null)
  useEffect(() => { setHandoff(getTaxFormHandoff()) }, [])
  const hasForm = !!handoff

  return (
    <div className="resstep-wrap">
      <style>{styles}</style>

      <div className="resstep-card">
        <div className="resstep-header">
          {/* Progress indicator at the very top, before the title. Only while a
              form is in flight: a stray visitor isn't on step 3 of anything. */}
          {hasForm && (
            <div style={{ marginBottom: 14 }}>
              <FormStepper step={3} lang={lang} />
            </div>
          )}
          <h1 className={`resstep-title${lang === 'ja' ? ' resstep-title-ja' : ''}`}>
            {c.titleLead}<span className="resstep-accent">{c.titleAccent}</span>{c.titleTail}
          </h1>
          <p className="resstep-intro">{c.intro} <strong>{c.introEmph}</strong></p>
        </div>

        <div className="resstep-body">
          {/* The green box now holds the quiz instruction itself (the old
              "Why it matters?" copy was removed). */}
          <div className="resstep-why">
            <p className="resstep-why-body">{c.quizIntro}</p>
          </div>

          {/* Reference only: the criteria to consider, no Yes/No. The client
              declares their status by hand below (Jo, 3 Sep). */}
          <div className="resstep-quiz">
            {c.questions.map((q, i) => (
              <div key={i} className="resq resq-static">
                <span className="resq-dot" aria-hidden="true" />
                <span className="resq-text">{q}</span>
              </div>
            ))}
          </div>

          <div className="resstep-divider" />

          {/* The client selects their status by hand (no auto-scoring). */}
          <ResidencyDeclaration lang={lang} onSubmitted={onSubmitted} />

          {/* WHEN THE FORM IS GONE, SAY SO.
              The hand-off between the form and this page is an in-memory
              singleton, deliberately: File objects cannot be serialised and the
              TFN must never touch browser storage. The cost is that a refresh,
              a back/forward restore, or iOS discarding a backgrounded tab wipes
              it. The declaration then rendered `null`, so the customer was left
              on the last screen before conversion looking at a quiz with no
              submit button and no explanation, with their TFN and uploads gone.
              They assume the site is broken, and they are not wrong.
              A dead end with an exit is recoverable; a dead end without one is
              a lost lead. */}
          {!hasForm && (
            <div className="resstep-whmnote" style={{ marginTop: 18 }}>
              <p style={{ margin: 0 }}>{c.sessionLost}</p>
              <a
                href={lang === 'de' ? '/de/tax-form' : lang === 'ja' ? '/ja/tax-form' : '/tax-form'}
                className="resdecl-submit"
                style={{ textDecoration: 'none', marginTop: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >{c.sessionLostCta}</a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

/* Mirrors the tax-form card so this reads as one continuous flow. */
const styles = `
  .resstep-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; padding: 28px 16px 60px; }
  .resstep-card { width: 100%; max-width: 480px; background: #fff; border-radius: 24px; box-shadow: 0 2px 24px rgba(11,82,64,0.07); overflow: hidden; }
  .resstep-header { padding: 26px 18px 18px; text-align: center; }

  /* Sized to hold one line down to a 320px phone, in every language. */
  .resstep-title { font-size: clamp(13px, 4.05vw, 22px); font-weight: 800; color: #080F0D; letter-spacing: -0.02em; line-height: 1.3; margin: 0 0 10px; white-space: nowrap; }
  .resstep-title-ja { font-size: clamp(14px, 4.6vw, 22px); letter-spacing: 0; }
  .resstep-accent { color: #0B5240; }

  /* Two lines at every phone width - see note above. */
  .resstep-intro { font-size: 12px; color: #587066; line-height: 1.6; margin: 0; }
  .resstep-intro strong { font-weight: 700; color: #1A2822; }

  .resstep-body { padding: 4px 18px 30px; }

  /* --- Eligibility quiz (flowing list, Yes/No toggle on the right) --- */
  .resstep-quiz-intro { font-size: 12.5px; font-weight: 600; color: #1A2822; line-height: 1.55; margin: 4px 0 6px; }
  .resstep-progress { text-align: right; font-size: 11px; font-weight: 700; color: #9AA99F; margin: 0 2px 4px; letter-spacing: .3px; }
  /* Hug the text and sit centred, instead of a full-width bar with an empty
     right half on wider screens (Jo, 30 Aug). */
  .resstep-yearnote { width: fit-content; max-width: 100%; font-size: 12px; color: #7A5A16; background: #FFF8EC; border: 1px solid #F0D9A8; border-radius: 8px; padding: 8px 14px; margin: 2px auto 10px; line-height: 1.5; }
  .resstep-quiz { display: flex; flex-direction: column; }
  .resq { display: flex; align-items: center; gap: 12px; padding: 13px 2px; border-bottom: 1px solid #EEF3F1; }
  .resq:last-child { border-bottom: none; }
  .resq-text { flex: 1; font-size: 13px; color: #1A2822; line-height: 1.4; }
  .resq-toggle { flex-shrink: 0; display: inline-flex; border: 1.5px solid #D9E7E1; border-radius: 100px; overflow: hidden; }
  .resq-seg { min-width: 52px; min-height: 44px; text-align: center; padding: 0 4px; font-size: 13px; font-weight: 700; color: #7A8A82; background: #fff; cursor: pointer; border: none; font-family: inherit; transition: background .18s ease, color .18s ease; }
  .resq-seg:active { transform: scale(.97); }
  .resq-seg + .resq-seg { border-left: 1.5px solid #D9E7E1; }
  .resq-yes.is-on { background: #0B5240; color: #fff; }
  .resq-no.is-on { background: #587066; color: #fff; }
  /* Reference criteria list (no Yes/No): a small dot + the text. */
  .resq-static { gap: 10px; }
  .resq-dot { flex-shrink: 0; width: 6px; height: 6px; border-radius: 50%; background: #0B5240; }
  .resstep-whmnote { margin-top: 16px; background: #FFF8EC; border: 1.5px solid #F0D9A8; border-radius: 12px; padding: 12px 14px; font-size: 12.5px; color: #4A5C54; line-height: 1.55; }
  @keyframes resstepFade { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
  .resstep-fade { animation: resstepFade .35s ease both; }
  @media (prefers-reduced-motion: reduce) { .resstep-fade { animation: none; } .resq-seg { transition: none; } }

  .resstep-why { background: #EAF6F1; border: 1.5px solid #C8EAE0; border-radius: 14px; padding: 14px 15px; margin-bottom: 14px; }
  .resstep-why-title { font-size: 13px; font-weight: 700; color: #0B5240; margin: 0 0 6px; }
  .resstep-why-body { font-size: 12.5px; color: #1A2822; line-height: 1.6; margin: 0; }

  .resstep-compare { border: 1.5px solid #CDE3DB; border-radius: 14px; padding: 12px 12px 10px; margin-bottom: 22px; }
  .resstep-compare-cap { font-size: 11.5px; font-weight: 600; color: #587066; text-align: center; margin: 0 0 10px; }
  .resstep-compare-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .resstep-col { background: #F5F9F7; border: 1.5px solid #E2ECE7; border-radius: 11px; padding: 10px 8px; text-align: center; }
  .resstep-col-win { background: #EAF6F1; border-color: #0B5240; }
  .resstep-col-name { font-size: 11px; font-weight: 600; color: #587066; line-height: 1.35; margin: 0 0 6px; min-height: 30px; display: flex; align-items: center; justify-content: center; }
  .resstep-col-win .resstep-col-name { color: #0B5240; }
  .resstep-col-val { font-size: 20px; font-weight: 800; color: #1A2822; letter-spacing: -0.02em; margin: 0; }
  .resstep-col-win .resstep-col-val { color: #0B5240; }
  .resstep-compare-foot { font-size: 12.5px; font-weight: 700; color: #0B5240; text-align: center; margin: 10px 0 0; }

  .resstep-cond-intro { font-size: 13px; font-weight: 600; color: #1A2822; line-height: 1.55; margin: 0 0 10px; }
  .resstep-conditions { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .resstep-condition { display: flex; align-items: flex-start; gap: 9px; background: #F5F9F7; border: 1.5px solid #CDE3DB; border-radius: 12px; padding: 10px 12px; text-decoration: none; color: inherit; -webkit-tap-highlight-color: transparent; transition: background .15s, border-color .15s; }
  .resstep-condition:hover, .resstep-condition:active { background: #EAF6F1; border-color: #0B5240; }
  .resstep-condition:focus-visible { outline: 2px solid #0B5240; outline-offset: 2px; }
  /* Muted and vertically centred: enough to read as tappable, not enough to
     compete with the text. Turns green only on hover/press. */
  .resstep-ext { flex-shrink: 0; align-self: center; color: #A8BDB4; transition: color .15s; }
  .resstep-condition:hover .resstep-ext, .resstep-condition:active .resstep-ext { color: #0B5240; }
  .resstep-num { flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%; background: #0B5240; color: #fff; font-size: 10.5px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin-top: 1px; }
  .resstep-cond-text { font-size: 12px; color: #1A2822; line-height: 1.55; }
  .resstep-note { font-size: 12px; color: #587066; line-height: 1.55; margin: 12px 0 0; }
  .resstep-divider { height: 1px; background: #E6F0EB; margin: 22px 0 20px; }

  @media (min-width: 420px) {
    .resstep-header { padding: 26px 24px 18px; }
    .resstep-body { padding: 4px 24px 32px; }
    .resstep-intro { font-size: 13px; }
    .resstep-why-body, .resstep-cond-text, .resstep-note { font-size: 13px; }
  }

  /* --- One-time blocking residency warning (Jo, 31 Aug) --- */
  .reswarn-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(8,15,13,.62); display: flex; align-items: center; justify-content: center; padding: 18px; }
  .reswarn-modal { width: 100%; max-width: 390px; max-height: calc(100dvh - 36px); overflow-y: auto; background: #fff; border-radius: 22px; box-shadow: 0 18px 60px rgba(0,0,0,.35); animation: reswarnPop .28s ease both; }
  @keyframes reswarnPop { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: none; } }
  .reswarn-top { background: #FFF8EC; border-bottom: 1px solid #F0D9A8; padding: 18px 20px 14px; text-align: center; }
  .reswarn-icon { width: 44px; height: 44px; border-radius: 50%; background: #fff; border: 1.5px solid #F0D9A8; display: flex; align-items: center; justify-content: center; margin: 0 auto 8px; }
  .reswarn-icon svg { width: 24px; height: 24px; color: #7A5A16; }
  .reswarn-title { font-size: 16px; font-weight: 800; color: #080F0D; margin: 0; letter-spacing: -.01em; }
  .reswarn-body { padding: 16px 20px 20px; }
  .reswarn-lead { font-size: 13.5px; color: #1A2822; line-height: 1.55; margin: 0 0 12px; }
  .reswarn-lead strong { color: #B23B2E; font-weight: 800; }
  .reswarn-means-label { font-size: 12px; font-weight: 700; color: #587066; text-transform: uppercase; letter-spacing: .4px; margin: 0 0 8px; }
  .reswarn-means { list-style: none; margin: 0 0 14px; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .reswarn-means li { display: flex; gap: 10px; align-items: flex-start; background: #FBEDEB; border: 1px solid #F0C9C3; border-radius: 11px; padding: 10px 12px; }
  .reswarn-x { flex-shrink: 0; width: 18px; height: 18px; border-radius: 50%; background: #B23B2E; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; margin-top: 1px; }
  .reswarn-means span { font-size: 12.5px; color: #1A2822; line-height: 1.5; }
  .reswarn-note { background: #EAF6F1; border: 1.5px solid #C8EAE0; border-radius: 12px; padding: 11px 13px; margin: 0 0 10px; }
  .reswarn-note p { margin: 0; font-size: 12.5px; color: #1A2822; line-height: 1.55; }
  .reswarn-note strong { color: #0B5240; font-weight: 800; }
  .reswarn-read { font-size: 12.5px; color: #587066; line-height: 1.55; margin: 0 0 16px; }
  .reswarn-btns { display: flex; flex-direction: column; gap: 9px; }
  .reswarn-btn { width: 100%; min-height: 48px; border-radius: 12px; font-size: 14px; font-weight: 800; cursor: pointer; font-family: inherit; border: none; }
  .reswarn-btn-primary { background: #0B5240; color: #fff; }
  .reswarn-btn-ghost { background: #fff; color: #587066; border: 1.5px solid #D9E7E1; font-weight: 700; }
  .reswarn-btn:active { transform: scale(.99); }
  @media (prefers-reduced-motion: reduce) { .reswarn-modal { animation: none; } .reswarn-btn:active { transform: none; } }
`

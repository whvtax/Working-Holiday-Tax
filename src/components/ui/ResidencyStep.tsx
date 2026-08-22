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
    titleLead: 'Are you an ',
    titleAccent: 'Australian tax resident',
    titleTail: '?',
    intro: 'Tax residency determines which tax rates apply to your income.',
    introEmph: 'It is different from immigration status.',
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
    quizIntro: 'To be considered an Australian tax resident and have the first $18,200 of your income taxed at 0%, answer "Yes" to the questions below.',
    yesLabel: 'Yes',
    noLabel: 'No',
    questions: [
      'Have you lived in Australia for 6 months or more?',
      'Is your usual home in Australia?',
      'Do you intend to continue living in Australia?',
      'Do you have ongoing work in Australia?',
      'Do you have personal or family ties in Australia?',
    ],
    resultYesTitle: 'Great news!',
    resultYesBody: 'Based on your answers, you are likely to be considered an Australian tax resident. That means the first $18,200 of your income may be tax free, and you could be due a solid refund. Our team will confirm this when we prepare your return.',
    resultPartialTitle: 'You may still be eligible',
    resultPartialBody: 'Because you are not from an eligible country, you would not get the $18,200 tax free threshold. However, based on your answers you may still be considered a tax resident and eligible for around $700 through the low income tax offset. Our team will confirm this when we prepare your return.',
    resultNoTitle: 'You are a Working Holiday Maker',
    resultNoBody: 'Based on your answers, you are classed as a Working Holiday Maker for tax purposes. Good news: you may still be due a tax refund, and our team checks every deduction to get you the maximum back.',
  },
  de: {
    titleLead: 'Bist du ',
    titleAccent: 'australischer Steuerresident',
    titleTail: '?',
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
    quizIntro: 'Um als australischer Steuerresident zu gelten und die ersten $18.200 deines Einkommens mit 0% zu versteuern, beantworte die folgenden Fragen mit "Ja".',
    yesLabel: 'Ja',
    noLabel: 'Nein',
    questions: [
      'Hast du 6 Monate oder länger in Australien gelebt?',
      'Ist dein gewöhnlicher Wohnsitz in Australien?',
      'Beabsichtigst du, weiterhin in Australien zu leben?',
      'Hast du eine laufende Arbeit in Australien?',
      'Hast du persönliche oder familiäre Bindungen in Australien?',
    ],
    resultYesTitle: 'Gute Nachrichten!',
    resultYesBody: 'Basierend auf deinen Antworten wirst du wahrscheinlich als australischer Steuerresident betrachtet. Das bedeutet, die ersten $18.200 deines Einkommens können steuerfrei sein, und dir könnte eine gute Rückerstattung zustehen. Unser Team bestätigt dies bei der Erstellung deiner Steuererklärung.',
    resultPartialTitle: 'Du könntest trotzdem Anspruch haben',
    resultPartialBody: 'Da du nicht aus einem berechtigten Land kommst, erhältst du nicht den steuerfreien Betrag von $18.200. Basierend auf deinen Antworten könntest du jedoch trotzdem als Steuerresident gelten und Anspruch auf rund $700 durch den Steuerfreibetrag für geringes Einkommen haben. Unser Team bestätigt dies bei der Erstellung deiner Steuererklärung.',
    resultNoTitle: 'Du bist ein Working Holiday Maker',
    resultNoBody: 'Basierend auf deinen Antworten giltst du steuerlich als Working Holiday Maker. Gute Nachrichten: Dir könnte trotzdem eine Steuerrückerstattung zustehen, und unser Team prüft jeden Abzug, um das Maximum für dich herauszuholen.',
  },
  ja: {
    titleLead: 'あなたは',
    titleAccent: '税務上の居住者',
    titleTail: 'ですか？',
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
    quizIntro: 'オーストラリア税務居住者と見なされ、最初の$18,200の所得が0%課税となるには、以下の質問に「はい」とお答えください。',
    yesLabel: 'はい',
    noLabel: 'いいえ',
    questions: [
      'オーストラリアに6か月以上住んでいますか？',
      '普段の住まいはオーストラリアにありますか？',
      '今後もオーストラリアに住み続ける予定ですか？',
      'オーストラリアで継続的な仕事はありますか？',
      'オーストラリアに個人的または家族的なつながりはありますか？',
    ],
    resultYesTitle: '朗報です！',
    resultYesBody: 'ご回答に基づくと、あなたはオーストラリア税務居住者と見なされる可能性が高いです。つまり、最初の$18,200の所得が非課税となり、しっかりとした還付が受けられる可能性があります。申告書作成時に当チームが確認します。',
    resultPartialTitle: 'それでも対象となる可能性があります',
    resultPartialBody: '対象国の出身ではないため、$18,200の非課税枠は適用されません。ただし、ご回答に基づくと、税務居住者と見なされ、低所得者税額控除により約$700の対象となる可能性があります。申告書作成時に当チームが確認します。',
    resultNoTitle: 'あなたはワーキングホリデーメーカーです',
    resultNoBody: 'ご回答に基づくと、税務上あなたはワーキングホリデーメーカーに分類されます。朗報です：それでも税還付を受けられる可能性があり、当チームがあらゆる控除を確認して最大限の還付を目指します。',
  },
} as const

// Non-Discrimination-Agreement countries: their working holiday makers can be
// taxed as residents (the Addy decision). The home country is free text on the
// form, so match on normalised whole words plus common aliases. Short codes
// (uk, gb) are matched as whole words only, so "Ukraine" is never a false hit.
const NDA_MULTI = ['united kingdom', 'great britain', 'northern ireland']
const NDA_WORDS = new Set([
  'uk', 'gb', 'britain', 'england', 'scotland', 'wales',
  'germany', 'deutschland', 'german',
  'japan', 'nippon', '日本',
  'chile',
  'finland', 'suomi',
  'israel', 'ישראל',
  'norway', 'norge',
  'turkey', 'turkiye',
])
function isNdaCountry(raw: string): boolean {
  const s = (raw || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')            // strip diacritics (turkiye)
    .replace(/[^a-z\u0590-\u05ff\u3040-\u30ff\u4e00-\u9fff ]/g, ' ')
    .trim()
  if (!s) return false
  if (NDA_MULTI.some((k) => s.includes(k))) return true
  return s.split(/\s+/).some((w) => NDA_WORDS.has(w))
}

export default function ResidencyStep({ lang = 'en', onSubmitted }: {
  lang?: FormLang
  /** Forwarded to the declaration; see ResidencyDeclaration. */
  onSubmitted?: (firstName: string) => void
}) {
  const c = COPY[lang] ?? COPY.en

  // Whether there's a form mid-flight. Checked after mount because the
  // hand-off lives in the JS heap and the server render can't see it.
  //
  // The content itself is never gated on this: a client whose hand-off is gone
  // (a reload, or the link opened later) must still see the page they were
  // sent to, not a blank card. The flag only controls the step indicator.
  const [handoff, setHandoff] = useState<ReturnType<typeof getTaxFormHandoff>>(null)
  useEffect(() => { setHandoff(getTaxFormHandoff()) }, [])
  const hasForm = !!handoff
  const homeCountry = (handoff?.payload as { country?: string } | undefined)?.country ?? ''

  // Eligibility quiz. 4 of 5 "Yes" = meets the residency conditions. The home
  // country (pre-filled from the form) then decides WHICH resident result applies:
  // an NDA country gets the $18,200 threshold; a non-NDA country is still a resident
  // but gets the ~$700 low-income result. Fewer than 4 "Yes" = Working Holiday Maker.
  // The status sent to the CRM is only 'resident' or 'whm' — the submit + PDF
  // pipeline is byte-for-byte unchanged.
  const [answers, setAnswers] = useState<Array<'yes' | 'no' | null>>(
    () => c.questions.map(() => null),
  )
  const allAnswered = answers.length > 0 && answers.every((a) => a !== null)
  const yesCount = answers.filter((a) => a === 'yes').length
  const meetsConditions = allAnswered && yesCount >= 4
  // A stray SEO visitor with no hand-off has no country; treat as eligible, since
  // without a hand-off there is nothing to submit anyway (the result is educational).
  const eligibleCountry = homeCountry ? isNdaCountry(homeCountry) : true
  const resultKind: 'resident' | 'partial' | 'whm' =
    !meetsConditions ? 'whm' : eligibleCountry ? 'resident' : 'partial'
  const quizStatus: 'resident' | 'whm' = meetsConditions ? 'resident' : 'whm'
  const setAnswer = (i: number, val: 'yes' | 'no') =>
    setAnswers((prev) => { const next = [...prev]; next[i] = val; return next })

  return (
    <div className="resstep-wrap">
      <style>{styles}</style>

      <div className="resstep-card">
        <div className="resstep-header">
          {/* Progress indicator at the very top, before the title and copy, so the
              customer sees where they are before reading anything. Only while a
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
          <p className="resstep-quiz-intro">{c.quizIntro}</p>

          <div className="resstep-quiz">
            {c.questions.map((q, i) => (
              <div key={i} className="resstep-q">
                <p className="resstep-q-text">
                  <span className="resstep-q-num">{i + 1}</span>{q}
                </p>
                <div className="resstep-q-opts">
                  {(['yes', 'no'] as const).map((val) => (
                    <button
                      key={val}
                      type="button"
                      aria-pressed={answers[i] === val}
                      className={`resstep-q-btn resstep-q-${val}${answers[i] === val ? ' is-on' : ''}`}
                      onClick={() => setAnswer(i, val)}
                    >
                      {val === 'yes' ? c.yesLabel : c.noLabel}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {allAnswered && (
            <>
              <div className={`resstep-result${resultKind === 'resident' ? ' is-win' : resultKind === 'partial' ? ' is-partial' : ''}`}>
                <p className="resstep-result-title">
                  {resultKind === 'resident' ? '🎉 ' : ''}
                  {resultKind === 'resident' ? c.resultYesTitle : resultKind === 'partial' ? c.resultPartialTitle : c.resultNoTitle}
                </p>
                <p className="resstep-result-body">
                  {resultKind === 'resident' ? c.resultYesBody : resultKind === 'partial' ? c.resultPartialBody : c.resultNoBody}
                </p>
              </div>

              {/* Same submission as before: this drives ResidencyDeclaration with the
                  quiz's verdict, but the CRM submit + PDF run through the identical
                  submitTaxForm path. Nothing about the pipeline changes. */}
              <ResidencyDeclaration
                lang={lang}
                quizStatus={quizStatus}
                onSubmitted={onSubmitted}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* Mirrors the tax-form card so this reads as one continuous flow. */
const styles = `
  .resstep-wrap { min-height: 100dvh; background: #F5F9F7; display: flex; flex-direction: column; align-items: center; padding: 100px 16px 60px; }
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

  /* --- Eligibility quiz --- */
  .resstep-quiz-intro { font-size: 13px; font-weight: 600; color: #1A2822; line-height: 1.55; margin: 6px 0 16px; }
  .resstep-quiz { display: flex; flex-direction: column; gap: 12px; }
  .resstep-q { background: #F5F9F7; border: 1.5px solid #E2EFEA; border-radius: 14px; padding: 13px 14px; }
  .resstep-q-text { font-size: 13px; font-weight: 500; color: #1A2822; line-height: 1.5; margin: 0 0 10px; display: flex; gap: 8px; }
  .resstep-q-num { flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; background: #0B5240; color: #fff; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; }
  .resstep-q-opts { display: flex; gap: 8px; }
  .resstep-q-btn { flex: 1; min-height: 40px; border-radius: 100px; border: 1.5px solid #D9E7E1; background: #fff; color: #587066; font-size: 13px; font-weight: 600; font-family: inherit; cursor: pointer; transition: all .15s; }
  .resstep-q-btn:hover { border-color: #0B5240; }
  .resstep-q-yes.is-on { background: #0B5240; border-color: #0B5240; color: #fff; }
  .resstep-q-no.is-on { background: #587066; border-color: #587066; color: #fff; }

  /* --- Quiz result banner --- */
  .resstep-result { margin-top: 18px; border-radius: 16px; padding: 16px 16px; border: 1.5px solid #F0D9A8; background: #FFF8EC; }
  .resstep-result.is-win { border-color: #A7D9C5; background: #EAF6F1; }
  .resstep-result.is-partial { border-color: #A9CBE8; background: #EAF2FB; }
  .resstep-result-title { font-size: 15px; font-weight: 800; color: #7A5A16; line-height: 1.35; margin: 0 0 6px; }
  .resstep-result.is-win .resstep-result-title { color: #0B5240; }
  .resstep-result.is-partial .resstep-result-title { color: #1E5490; }
  .resstep-result-body { font-size: 12.5px; color: #4A5C54; line-height: 1.6; margin: 0; }
  .resstep-result.is-win .resstep-result-body { color: #235347; }
  .resstep-result.is-partial .resstep-result-body { color: #234B70; }

  .resstep-why { background: #EAF6F1; border: 1.5px solid #C8EAE0; border-radius: 14px; padding: 14px 15px; margin-bottom: 14px; }
  .resstep-why-title { font-size: 13px; font-weight: 700; color: #0B5240; margin: 0 0 6px; }
  .resstep-why-body { font-size: 12.5px; color: #1A2822; line-height: 1.6; margin: 0; }

  .resstep-compare { border: 1.5px solid #D4EAE2; border-radius: 14px; padding: 12px 12px 10px; margin-bottom: 22px; }
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
  .resstep-condition { display: flex; align-items: flex-start; gap: 9px; background: #F5F9F7; border: 1.5px solid #D4EAE2; border-radius: 12px; padding: 10px 12px; text-decoration: none; color: inherit; -webkit-tap-highlight-color: transparent; transition: background .15s, border-color .15s; }
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
`

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

/**
 * Each criterion links to the ATO page it comes from, so someone unsure can
 * check the source rather than message us. The ATO publishes these in English
 * only, so all three languages point at the same URLs.
 */
const ATO_LINKS = [
  // NDA countries + the Addy decision that created this entitlement
  'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/coming-to-australia/taxation-of-australian-resident-whms-from-nda-countries',
  // The resides test - "ordinary place of residence"
  'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/residency-tests/residency-the-resides-test',
  // Worked examples - a 170-paragraph ruling helps nobody at this point in the
  // form, but people do recognise themselves in the scenarios (e.g. Janine,
  // the British backpacker on 12 months' leave).
  'https://www.ato.gov.au/individuals-and-families/coming-to-australia-or-going-overseas/residency-tests/australian-and-foreign-resident-examples',
  // The ATO's own decision tool - the most useful place to send someone unsure
  'https://www.ato.gov.au/calculators-and-tools/tax-return-work-out-your-tax-residency',
] as const

const COPY = {
  en: {
    titleLead: 'Are you an ',
    titleAccent: 'Australian tax resident',
    titleTail: '?',
    intro: 'Tax residency determines which tax rates apply to your income. It is different from immigration status.',
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
  },
  de: {
    titleLead: 'Bist du ',
    titleAccent: 'australischer Steuerresident',
    titleTail: '?',
    intro: 'Die Steuerresidenz bestimmt deinen Steuersatz - sie ist nicht dasselbe wie dein Aufenthaltsstatus.',
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
  },
  ja: {
    titleLead: 'あなたは',
    titleAccent: '税務上の居住者',
    titleTail: 'ですか？',
    intro: '税務上の居住区分は、所得に適用される税率を決めるものです。在留資格とは異なります。',
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
  },
} as const

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
  const [hasForm, setHasForm] = useState(false)
  useEffect(() => { setHasForm(!!getTaxFormHandoff()) }, [])

  return (
    <div className="resstep-wrap">
      <style>{styles}</style>

      <div className="resstep-card">
        <div className="resstep-header">
          <h1 className={`resstep-title${lang === 'ja' ? ' resstep-title-ja' : ''}`}>
            {c.titleLead}<span className="resstep-accent">{c.titleAccent}</span>{c.titleTail}
          </h1>
          <p className="resstep-intro">{c.intro}</p>
          {/* Only while a form is in flight: a stray visitor isn't on step 3 of anything. */}
          {hasForm && <FormStepper step={3} lang={lang} />}
        </div>

        <div className="resstep-body">
          <div className="resstep-why">
            <p className="resstep-why-title">{c.whyTitle}</p>
            <p className="resstep-why-body">{c.whyBody}</p>
          </div>

          {/* Two numbers, side by side - the whole argument in one glance. */}
          <div className="resstep-compare">
            <p className="resstep-compare-cap">{c.compareCaption}</p>
            <div className="resstep-compare-grid">
              <div className="resstep-col">
                <p className="resstep-col-name">{c.whmName}</p>
                <p className="resstep-col-val">$6,750</p>
              </div>
              <div className="resstep-col resstep-col-win">
                <p className="resstep-col-name">{c.residentName}</p>
                <p className="resstep-col-val">$4,288</p>
              </div>
            </div>
            <p className="resstep-compare-foot">↓ {c.compareFoot}</p>
          </div>

          <p className="resstep-cond-intro">{c.condIntro}</p>

          <ol className="resstep-conditions">
            {c.conditions.map((text, i) => (
              <li key={i}>
                <a
                  className="resstep-condition"
                  href={ATO_LINKS[i]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="resstep-num">{i + 1}</span>
                  <span className="resstep-cond-text">{text}</span>
                  <svg className="resstep-ext" width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M4.5 1.5h6v6M10.5 1.5L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 8v2.5h-7v-7H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </li>
            ))}
          </ol>

          <p className="resstep-note">{c.note}</p>

          <div className="resstep-divider" />

          <ResidencyDeclaration lang={lang} onSubmitted={onSubmitted} />
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

  .resstep-body { padding: 4px 18px 30px; }
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

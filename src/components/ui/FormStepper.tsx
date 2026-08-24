'use client'

/**
 * FormStepper
 * -----------
 * The three-step progress indicator for the tax return flow:
 *   1. the form's first screen   2. the form's second screen
 *   3. the tax-residency page, where the declaration and submit live.
 *
 * Deliberately not interactive. It looks like a stepper you could tap, but the
 * flow only runs forwards - there's no way back once a step is done - so the
 * circles are inert and marked aria-hidden, with the real state announced once
 * in a visually-hidden line.
 *
 * Only the current step is named. Labels under every circle don't fit in the
 * ~295px a phone gives us, least of all in German.
 */

import type { FormLang } from '@/lib/formStrings'

type Step = 1 | 2 | 3

const STEPS: Record<FormLang, [string, string, string]> = {
  en: ['Your details', 'Your income', 'Tax residency'],
  de: ['Deine Daten', 'Dein Einkommen', 'Steuerresidenz'],
  ja: ['基本情報', '収入について', '税務上の居住区分'],
}

const OF: Record<FormLang, (s: number, t: number) => string> = {
  en: (s, t) => `Step ${s} of ${t}`,
  de: (s, t) => `Schritt ${s} von ${t}`,
  ja: (s, t) => `ステップ ${s}/${t}`,
}

function Tick() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function FormStepper({ step, lang = 'en' }: { step: Step; lang?: FormLang }) {
  const labels = STEPS[lang] ?? STEPS.en
  const of = (OF[lang] ?? OF.en)(step, 3)

  return (
    <div className="stepper">
      <style>{styles}</style>

      <div className="stepper-row" aria-hidden="true">
        {([1, 2, 3] as const).map(i => (
          <div key={i} className="stepper-node">
            <div className={`stepper-circle ${i < step ? 'is-done' : i === step ? 'is-now' : 'is-todo'}`}>
              {i < step ? <Tick /> : i}
            </div>
            {i < 3 && <div className={`stepper-line${i < step ? ' is-done' : ''}`} />}
          </div>
        ))}
      </div>

      {/* Labels sit right under the circles in most steppers; here the step's
          content is directly below anyway, so the words only cost height. The
          step is still announced to screen readers. */}
      <span className="stepper-sr">{`${of} - ${labels[step - 1]}`}</span>
    </div>
  )
}

export default FormStepper

const styles = `
  .stepper { margin-top: 14px; }
  .stepper-row { display: flex; align-items: center; justify-content: center; }
  .stepper-node { display: flex; align-items: center; }
  .stepper-circle { width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; transition: background .25s, color .25s, border-color .25s; }
  .stepper-circle.is-done { background: #0B5240; color: #fff; }
  .stepper-circle.is-now  { background: #fff; color: #0B5240; border: 2px solid #0B5240; }
  /* #9DB5AC on #EAF6F1 is 1.97:1. The step number is visible text, so it has
     to meet AA whatever the circle is doing; subtle #587066 is 4.78:1 here. */
  .stepper-circle.is-todo { background: #EAF6F1; color: #587066; }
  .stepper-line { width: 34px; height: 2px; background: #EAF6F1; transition: background .25s; }
  .stepper-line.is-done { background: #0B5240; }
  .stepper-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
`

'use client'

import { useId, useState } from 'react'
import { priceCheck, visasFor, worksFor, type VisaId, type WorkId } from '@/lib/svt/price-check'
import { UI, type SvtLocale } from '@/lib/svt/i18n'
import { LinkButton } from './Button'
import choice from './Choice.module.css'
import styles from './PriceCheck.module.css'

/**
 * "Which price fits me?". Two radio groups; the result, the note and the
 * prefilled WhatsApp message update as you choose. Without JavaScript the
 * radios still render and the button opens WhatsApp with the default message.
 */
export function PriceCheck({ locale = 'en' }: { locale?: SvtLocale }) {
  const t = UI[locale].priceCheck
  const [visa, setVisa] = useState<VisaId>('500')
  const [work, setWork] = useState<WorkId>('tfn')
  const id = useId()
  const r = priceCheck(visa, work, locale)

  return (
    <div className={styles.wrap}>
      <fieldset className={choice.group}>
        <legend className={choice.legend}>{t.yourVisa}</legend>
        <div className={choice.options}>
          {visasFor(locale).map(v => (
            <label key={v.id} className={choice.option}>
              <input className={choice.input} type="radio" name={`${id}-visa`} value={v.id} checked={visa === v.id} onChange={() => setVisa(v.id)} />
              <span className={choice.pill}>{v.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className={choice.group}>
        <legend className={choice.legend}>{t.yourWork}</legend>
        <div className={choice.options}>
          {worksFor(locale).map(w => (
            <label key={w.id} className={choice.option}>
              <input className={choice.input} type="radio" name={`${id}-work`} value={w.id} checked={work === w.id} onChange={() => setWork(w.id)} />
              <span className={choice.pill}>{w.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className={styles.result}>
        <p className={styles.price} aria-live="polite" aria-atomic="true">
          <span className={styles.amount}>{r.priceLabel}</span> <span data-mono-words="">{t.perYear}</span>
        </p>
        <p className={styles.note}>{r.note}</p>
        <p className={styles.preview}>
          <span className="svt-visually-hidden">{t.messageWillOpen}</span>
          {r.message}
        </p>
        <LinkButton href={r.whatsappHref} size="md" data-wa-pos="calculator-result">{t.send}</LinkButton>
      </div>
    </div>
  )
}

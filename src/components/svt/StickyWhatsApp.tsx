import { svtWhatsappUrl } from '@/lib/svt/brand-public'
import { UI, type SvtLocale } from '@/lib/svt/i18n'
import { LinkButton } from './Button'
import styles from './StickyWhatsApp.module.css'

export function StickyWhatsApp({ locale = 'en' }: { locale?: SvtLocale }) {
  return (
    // An <aside> landmark: axe "region" (26 Oct). Named by its own button text.
    <aside className={styles.bar} data-sticky-wa="" aria-label={UI[locale].whatsappCta}>
      <LinkButton href={svtWhatsappUrl(UI[locale].whatsappHello)} size="md" data-wa-pos="sticky">{UI[locale].whatsappCta}</LinkButton>
    </aside>
  )
}

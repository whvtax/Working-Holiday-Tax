import Link from 'next/link'
import { PagePhoto } from './PagePhoto'
import styles from './TfnAbnBlocks.module.css'

/** Local classes for the TFN and ABN pages (pairs grid, inline link). */
export const tb = styles

/** Breadcrumb row under the fixed header. */
export function Crumbs({ homeHref, home, current }: { homeHref: string; home: string; current: string }) {
  return (
    <nav aria-label="Breadcrumb" className={styles.crumbs}>
      <Link href={homeHref}>{home}</Link>
      <span aria-hidden="true" className={styles.sep}>/</span>
      <span aria-current="page">{current}</span>
    </nav>
  )
}

/** The page photo, in a container. Empty (no padding) until the scene file exists. */
export function PhotoBand({ page, locale }: { page: string; locale: 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es' }) {
  return (
    <div className={styles.photoWrap}>
      <PagePhoto page={page} locale={locale} />
    </div>
  )
}

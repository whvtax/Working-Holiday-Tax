import Link from 'next/link'
import { PagePhoto } from './PagePhoto'
import { blocks } from './Blocks'
import styles from './CoreBlocks.module.css'

export const coreBlocks = styles

/** Breadcrumb trail above the hero. The last item is the current page. */
export function Crumb({ home, current, label = 'Breadcrumb', href = '/' }: { home: string; current: string; label?: string; href?: string }) {
  return (
    <nav aria-label={label} className={styles.crumb}>
      <Link href={href}>{home}</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  )
}

/** The one photo of an inner page, in the page frame. Renders nothing until its file exists. */
export function PhotoFrame({ page, locale }: { page: string; locale: 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es' }) {
  return (
    <div className={styles.frame}>
      <PagePhoto page={page} locale={locale} />
    </div>
  )
}

/** Hairline list of whole-row links with a title only. */
export function TitleLinks({ items }: { items: { href: string; label: string }[] }) {
  return (
    <div>
      {items.map(it => (
        <Link key={it.href} href={it.href} className={blocks.linkRow}>
          <span className={blocks.text}>{it.label}</span>
        </Link>
      ))}
    </div>
  )
}

/** Hairline list of titled paragraphs (no link, no number). */
export function PlainRows({ items }: { items: { label: string; body: string }[] }) {
  return (
    <ul className={styles.plain}>
      {items.map(it => (
        <li key={it.label} className={styles.plainItem}>
          <h3 className={blocks.rowTitle}>{it.label}</h3>
          <p className={blocks.rowBody}>{it.body}</p>
        </li>
      ))}
    </ul>
  )
}

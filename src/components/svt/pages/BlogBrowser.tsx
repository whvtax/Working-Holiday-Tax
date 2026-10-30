'use client'

import { useState } from 'react'
import styles from './BlogHub.module.css'

export interface BlogCard {
  slug: string
  href: string
  category: string
  categoryLabel: string
  title: string
  description: string
  updated: string
  minRead: string
}

export interface BlogBrowserLabels {
  all: string
  topicsAria: string
  updated: string
  previous: string
  next: string
  pageOf: string
  paginationAria: string
}

/** Cards a visitor sees at once, like the WHT blog page (Jo, 27 Oct). */
const PER_PAGE = 12

/**
 * Topic filter and pages for the articles hub. Every card is in the HTML from
 * the server, so search and AI crawlers read every link; a visitor sees one
 * topic and one page at a time. Without JavaScript the first page shows and
 * every article is still reachable from the sitemap and the guides.
 */
export function BlogBrowser({ cards, topics, labels }: {
  cards: readonly BlogCard[]
  topics: ReadonlyArray<{ key: string; label: string; count: number }>
  labels: BlogBrowserLabels
}) {
  const [topic, setTopic] = useState<string>('')
  const [page, setPage] = useState(1)
  const shown = topic ? cards.filter(c => c.category === topic) : cards
  const pages = Math.max(1, Math.ceil(shown.length / PER_PAGE))
  const current = Math.min(page, pages)
  const visible = new Set(shown.slice((current - 1) * PER_PAGE, current * PER_PAGE).map(c => c.slug))

  const go = (n: number) => {
    setPage(n)
    document.getElementById('articles')?.scrollIntoView({ block: 'start' })
  }
  const pick = (key: string) => { setTopic(key); setPage(1) }

  return (
    <>
      <nav aria-label={labels.topicsAria} className={styles.pills}>
        <button type="button" className={topic === '' ? styles.pillActive : undefined} aria-pressed={topic === ''} onClick={() => pick('')}>
          {labels.all} <span>{cards.length}</span>
        </button>
        {topics.map(tp => (
          <button key={tp.key} type="button" className={topic === tp.key ? styles.pillActive : undefined} aria-pressed={topic === tp.key} onClick={() => pick(tp.key)}>
            {tp.label} <span>{tp.count}</span>
          </button>
        ))}
      </nav>
      <ul className={styles.grid}>
        {cards.map(a => (
          <li key={a.slug} hidden={!visible.has(a.slug)}>
            <a className={styles.card} href={a.href}>
              <span className={styles.cardTop}>
                <span className={styles.tag}>{a.categoryLabel}</span>
                <span data-mono-words="">{a.minRead}</span>
              </span>
              <span className={styles.title}>{a.title}</span>
              <span className={styles.desc}>{a.description}</span>
              <time className={styles.date} dateTime={a.updated} data-mono-words="">{labels.updated} {a.updated}</time>
            </a>
          </li>
        ))}
      </ul>
      {pages > 1 ? (
        <nav aria-label={labels.paginationAria} className={styles.pager}>
          <button type="button" onClick={() => go(current - 1)} disabled={current === 1}>{labels.previous}</button>
          <span aria-live="polite" data-mono-words="">{labels.pageOf.replace('{i}', String(current)).replace('{n}', String(pages))}</span>
          <button type="button" onClick={() => go(current + 1)} disabled={current === pages}>{labels.next}</button>
        </nav>
      ) : null}
    </>
  )
}

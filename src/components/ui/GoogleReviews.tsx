'use client'

/**
 * GoogleReviews
 * -------------
 * Real Google reviews, styled like Google, in a self-scrolling infinite
 * carousel with a Google rating badge on top.
 *
 * Data comes from our own /api/google-reviews route (server-side proxy of
 * the free Featurable API), so there are no browser CORS / ad-blocker
 * issues. Reviews refresh automatically (the server cache revalidates
 * hourly; Featurable itself refreshes from Google ~every 48h).
 *
 * No third-party client library and no extra npm install required.
 */

import { useState } from 'react'
import { useGoogleData, type RGReview, type GoogleData } from '@/lib/googleSummary'

type Lang = 'en' | 'de' | 'ja'

const T: Record<Lang, { based: (n: number) => string; view: string; more: string; less: string }> = {
  en: { based: (n) => `Based on ${n} Google review${n === 1 ? '' : 's'}`, view: 'View us on Google', more: 'Read more', less: 'Show less' },
  de: { based: (n) => `Basierend auf ${n} Google-Bewertung${n === 1 ? '' : 'en'}`, view: 'Auf Google ansehen', more: 'Mehr lesen', less: 'Weniger anzeigen' },
  ja: { based: (n) => `${n}件のGoogleレビューに基づく`, view: 'Googleで見る', more: 'もっと読む', less: '閉じる' },
}

const STAR_GOLD = '#FBBC04'
const BORDER = '#E2EFE9'

function relativeDate(iso: string | null, lang: Lang): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d.getTime())) return ''
  const diffMs = Date.now() - d.getTime()
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: 'auto' })
  const min = Math.round(diffMs / 60000)
  const hr = Math.round(diffMs / 3600000)
  const day = Math.round(diffMs / 86400000)
  if (Math.abs(day) >= 365) return rtf.format(-Math.round(day / 365), 'year')
  if (Math.abs(day) >= 30) return rtf.format(-Math.round(day / 30), 'month')
  if (Math.abs(day) >= 7) return rtf.format(-Math.round(day / 7), 'week')
  if (Math.abs(day) >= 1) return rtf.format(-day, 'day')
  if (Math.abs(hr) >= 1) return rtf.format(-hr, 'hour')
  return rtf.format(-min, 'minute')
}

const AVATAR_COLORS = [
  ['#B5D4F4', '#0C447C'],
  ['#9FE1CB', '#085041'],
  ['#F5C4B3', '#712B13'],
  ['#F4C0D1', '#72243E'],
  ['#FAC775', '#633806'],
  ['#CECBF6', '#26215C'],
]

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.94 21.94 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  )
}

function Stars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <span style={{ letterSpacing: '1px', fontSize: size, lineHeight: 1 }} aria-label={`${rating} / 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} style={{ color: i < Math.round(rating) ? STAR_GOLD : '#DADCE0' }}>★</span>
      ))}
    </span>
  )
}

function initialsFor(name: string) {
  const a = name.trim().split(/\s+/)[0]?.[0] || '?'
  return a.toUpperCase()
}

function ReviewCard({ r, idx, lang }: { r: RGReview; idx: number; lang: Lang }) {
  const [open, setOpen] = useState(false)
  const [imgOk, setImgOk] = useState(true)
  const t = T[lang]
  const showPhoto = !r.reviewer.isAnonymous && !!r.reviewer.profilePhotoUrl && imgOk
  const [bg, fg] = AVATAR_COLORS[idx % AVATAR_COLORS.length]
  const long = r.comment.length > 170
  const text = open || !long ? r.comment : r.comment.slice(0, 170).trim() + '…'

  return (
    <div style={{ width: 300, flex: '0 0 auto', background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: 18, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        {showPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={r.reviewer.profilePhotoUrl} alt="" referrerPolicy="no-referrer" onError={() => setImgOk(false)} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flex: '0 0 auto' }} />
        ) : (
          <div style={{ width: 40, height: 40, borderRadius: '50%', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 15, background: bg, color: fg }}>
            {initialsFor(r.reviewer.displayName)}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#1F2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.reviewer.displayName}</div>
          <div style={{ fontSize: 12, color: '#70757A' }}>{relativeDate(r.updateTime || r.createTime, lang)}</div>
        </div>
        <GoogleG size={20} />
      </div>
      <div style={{ marginBottom: 8 }}><Stars rating={r.starRating} /></div>
      <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#3C4043', margin: 0, whiteSpace: 'pre-line' }}>{text}</p>
      {long && (
        <button onClick={() => setOpen((v) => !v)} style={{ alignSelf: 'flex-start', marginTop: 8, background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#70757A', fontSize: 12.5, fontWeight: 600 }}>
          {open ? t.less : t.more}
        </button>
      )}
    </div>
  )
}

function Carousel({ data, lang }: { data: GoogleData; lang: Lang }) {
  const clean = data.reviews.filter((r) => r.comment && r.comment.trim().length > 0)
  if (clean.length === 0) return null

  const avg = data.rating || clean.reduce((s, r) => s + r.starRating, 0) / clean.length

  let base = clean
  while (base.length < 6) base = base.concat(clean)
  const track = base.concat(base)
  const duration = `${Math.max(24, base.length * 7)}s`

  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes grMarquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.gr-wrap { overflow: hidden; -webkit-mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
.gr-track { display: flex; gap: 16px; width: max-content; animation: grMarquee ${duration} linear infinite; }
.gr-wrap:hover .gr-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .gr-track { animation: none; } }
`,
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <GoogleG size={22} />
          <span style={{ fontSize: 15, fontWeight: 600, color: '#1F2937' }}>Google Reviews</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}>
          <span style={{ fontSize: 34, fontWeight: 700, color: '#1F2937', lineHeight: 1 }}>{avg.toFixed(1)}</span>
          <Stars rating={avg} size={22} />
        </div>
      </div>

      <div className="gr-wrap">
        <div className="gr-track">
          {track.map((r, i) => (
            <ReviewCard key={`${r.reviewId || 'r'}-${i}`} r={r} idx={i} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function GoogleReviews({ lang = 'en' }: { lang?: Lang }) {
  const data = useGoogleData()
  if (!data || data.reviews.filter((r) => r.comment && r.comment.trim()).length === 0) return null
  return (
    <div className="reveal delay-1">
      <Carousel data={data} lang={lang} />
    </div>
  )
}

export default GoogleReviews

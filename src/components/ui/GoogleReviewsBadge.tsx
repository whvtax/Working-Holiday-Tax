'use client'

/**
 * GoogleReviewsBadge
 * ------------------
 * The familiar Google-reviews trust mark: the G, the wordmark, the score and
 * five stars.
 *
 * Deliberately static, unlike <GoogleRating />, which fetches the live rating
 * and review count. On the form we want a trust mark that always renders
 * instantly and identically - a number that arrives a beat late, or not at all
 * behind an ad-blocker, is worse than no number.
 *
 * The trade-off: RATING below is a hard-coded figure. If the real Google
 * rating ever moves off 5.0, change it here - it will not update itself.
 */

const RATING = '5.0'

const LABEL: Record<'en' | 'de' | 'ja', string> = {
  en: 'Google Reviews',
  de: 'Google Bewertungen',
  ja: 'Googleの口コミ',
}

function Star() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#FBBC04" aria-hidden="true">
      <path d="M12 2.3l2.9 6.06 6.6.9-4.8 4.6 1.2 6.54L12 17.3l-5.9 3.1 1.2-6.54-4.8-4.6 6.6-.9L12 2.3z" />
    </svg>
  )
}

export function GoogleReviewsBadge({ lang = 'en' }: { lang?: 'en' | 'de' | 'ja' }) {
  return (
    // role="img" so the aria-label is honoured. Without a role the label on a
    // plain div is dropped and the badge is announced as the loose characters
    // "Google Reviews 5.0 ★★★★★".
    <div className="gbadge" role="img" aria-label={`${RATING} ${LABEL[lang]}`}>
      <style>{styles}</style>

      <div className="gbadge-top">
        {/* Google's four-colour G */}
        <svg width="15" height="15" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2.1 5-4.4 6.6v5.5h7.1c4.2-3.8 6.6-9.5 6.6-16.1z" />
          <path fill="#34A853" d="M24 46c6 0 11-2 14.5-5.4l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.6-3.9-12.3-9.1H4.3v5.7C7.8 41.1 15.3 46 24 46z" />
          <path fill="#FBBC04" d="M11.7 28.1c-.4-1.3-.7-2.7-.7-4.1s.2-2.8.7-4.1v-5.7H4.3C2.8 17.2 2 20.5 2 24s.8 6.8 2.3 9.8l7.4-5.7z" />
          <path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.2 30 2 24 2 15.3 2 7.8 6.9 4.3 14.2l7.4 5.7c1.7-5.2 6.6-9.1 12.3-9.1z" />
        </svg>
        <span className="gbadge-label">{LABEL[lang]}</span>
      </div>

      <div className="gbadge-bottom">
        <span className="gbadge-score">{RATING}</span>
        <span className="gbadge-stars">
          {[0, 1, 2, 3, 4].map(i => <Star key={i} />)}
        </span>
      </div>
    </div>
  )
}

export default GoogleReviewsBadge

const styles = `
  .gbadge { display: inline-flex; flex-direction: column; align-items: center; gap: 3px; }
  .gbadge-top { display: flex; align-items: center; gap: 6px; }
  .gbadge-label { font-size: 11.5px; font-weight: 600; color: #1A2822; }
  .gbadge-bottom { display: flex; align-items: center; gap: 7px; }
  .gbadge-score { font-size: 18px; font-weight: 700; color: #1A2822; letter-spacing: -0.01em; line-height: 1; }
  .gbadge-stars { display: inline-flex; gap: 1px; }
`

import { NextResponse } from 'next/server'

// Server-side proxy for Google reviews (via the free Featurable API).
// Fetching on the server avoids browser CORS / ad-blocker issues that
// can block a direct client-side request to featurable.com.

const WIDGET_ID =
  process.env.NEXT_PUBLIC_FEATURABLE_ID || 'e9befa26-d16a-4bc5-90e8-a857cb8cbb0c'

export const revalidate = 3600 // cache for 1 hour, then refresh

function cleanComment(c: string): string {
  if (!c) return ''
  // Google sometimes returns "(Translated by Google) <en> (Original) <orig>".
  // Keep just the translated text.
  if (c.includes('(Translated by Google)')) {
    const en = c.split('(Original)')[0]
    return en.replace('(Translated by Google)', '').trim()
  }
  return c.trim()
}

export async function GET() {
  try {
    const res = await fetch(`https://featurable.com/api/v1/widgets/${WIDGET_ID}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return NextResponse.json({ ok: false })
    const d: any = await res.json()
    if (!d || d.success === false) return NextResponse.json({ ok: false })

    const reviews = Array.isArray(d.reviews)
      ? d.reviews.map((r: any) => ({
          reviewId: r.reviewId ?? null,
          reviewer: {
            profilePhotoUrl: r.reviewer?.profilePhotoUrl ?? '',
            displayName: r.reviewer?.displayName ?? '',
            isAnonymous: !!r.reviewer?.isAnonymous,
          },
          starRating: Number(r.starRating) || 0,
          comment: cleanComment(typeof r.comment === 'string' ? r.comment : ''),
          createTime: r.createTime ?? null,
          updateTime: r.updateTime ?? null,
        }))
      : []

    return NextResponse.json({
      ok: true,
      rating: Number(d.averageRating) || 0,
      count: Number(d.totalReviewCount) || reviews.length,
      profileUrl: typeof d.profileUrl === 'string' ? d.profileUrl : '',
      reviews,
    })
  } catch {
    return NextResponse.json({ ok: false })
  }
}

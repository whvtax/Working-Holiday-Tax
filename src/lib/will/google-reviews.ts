// ============================================================
// Google reviews, read from the Featurable widget feed (11 Oct).
//
// The site already proxies this feed for its reviews carousel
// (app/api/google-reviews). The review system reads the same feed nightly to
// notice a review a customer we asked has written (first name + date), thank
// them, stop the reminder and count it, so Jo no longer ticks +1 by hand.
// ============================================================

const WIDGET_ID = process.env.NEXT_PUBLIC_FEATURABLE_ID || 'e9befa26-d16a-4bc5-90e8-a857cb8cbb0c';

export interface GoogleReview { reviewer: string; starRating: number; createTime: string | null; comment: string }

export async function fetchGoogleReviews(): Promise<GoogleReview[]> {
  try {
    const res = await fetch(`https://featurable.com/api/v1/widgets/${WIDGET_ID}`, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) return [];
    const d = await res.json() as { success?: boolean; reviews?: Array<{ reviewer?: { displayName?: string }; starRating?: number | string; createTime?: string; comment?: string }> };
    if (!d || d.success === false || !Array.isArray(d.reviews)) return [];
    return d.reviews.map((r) => ({
      reviewer: r.reviewer?.displayName ?? '',
      starRating: Number(r.starRating) || 0,
      createTime: r.createTime ?? null,
      comment: r.comment ?? '',
    }));
  } catch {
    return [];
  }
}

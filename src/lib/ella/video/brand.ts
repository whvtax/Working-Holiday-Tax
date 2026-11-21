/**
 * Student Visa Tax brand for everything burned into the video.
 * Values copied (read only) from the site's src/app/(svt)/tokens.css:
 *   ink #12161F, white, lime #D6FF3D only as a highlighter behind ink text or
 *   as text on ink, never lime text on white. Font: Be Vietnam Pro.
 * Safe zone from the Ella script bible s12 (1080 x 1920 frame): key text
 * between y 270 and 1220 and between x 120 and 860, clear of the TikTok and
 * Reels buttons on the right. Text is centred on that zone, not on the frame.
 */
const safe = { top: 270, bottom: 1220, left: 120, right: 860 }

export const BRAND = {
  ink: '#12161F',
  ink2: '#3C4350',
  white: '#FFFFFF',
  lime: '#D6FF3D',
  limePale: '#F5FAE3',
  font: 'Be Vietnam Pro',
  frame: { width: 1080, height: 1920, fps: 30 },
  safe,
  centreX: (safe.left + safe.right) / 2,
  maxTextWidth: safe.right - safe.left,
  /** On-screen headline (bible: up to 5 words): ink on white, key word on lime. */
  headline: { size: 62, minSize: 46, weight: 700, top: 330, padX: 28, padY: 14, radius: 22 },
  /** Spoken captions: white on ink, the emphasised word in lime. */
  caption: { size: 58, minSize: 48, weight: 700, bottom: 1180, padX: 24, padY: 12, radius: 18 },
  /** The small series tag, top left inside the safe zone, the whole video. No AI label on the video (Jo). */
  tag: { size: 26, weight: 700, x: 120, y: 274, padX: 14, padY: 8, radius: 14 },
} as const

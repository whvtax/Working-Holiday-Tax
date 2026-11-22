/**
 * Every number and list here comes from the Ella script bible (v2 adds
 * section 7a, spoken punctuation). Change a rule in the bible first, then
 * here, then bump BIBLE_VERSION.
 */
export const BIBLE_VERSION = 'v2'

export const LIMITS = {
  coreMessageWords: 15,           // s6
  hookWords: 12,                  // s9; Jo: the hook names the viewer, so it can be a little longer
  hookWordsWithNumber: 11,        // s9
  hookEndsBy: 4.0,                // s9, seconds
  ctaWords: 8,                    // s10
  sentenceWords: 12,              // s7
  onScreenWords: 5,               // s11, s12
  shotMin: 2.5,                   // s8, s12
  shotMax: 4.0,
  targetMax: 40,                  // s8, seconds; over needs a logged reason (Jo: at least 30)
  hardMax: 50,
  planningWpm: 125,               // s7, s8
  maxSpeakingWpm: 145,            // s7
  hashtagsMax: 4,                 // s13, plan v2: 4 topic labels
  /** Jo, Nov 21: never shorter. */
  minSeconds: 30,
  /** Real speaking rate of the finished voice until it is measured (1.1 speed). */
  defaultWpm: 190,
  rewriteAttempts: 3,             // s14, s17
  keyTermLookback: 10,            // s14
  maxSceneWords: 13,              // s7a: about 4 s at the real voice speed
  bodyMeanWords: 8,               // s7a: body sentences average at least this
  bodyMeanSoft: 9,                // s7a: warn below this
  minSceneWordsSoft: 6,           // s7a: warn below this (real shot may run under 2.5 s)
  maxClaimsPerSentence: 2,        // s7a
  maxEllaRunSeconds: 5,          // Jo: at most 5 seconds of Ella in a row before an AI clip
  maxClips: 6,                    // safety cap only; Jo, Nov 21: as many as look natural, never overdone
  maxClipSeconds: 22,
} as const

/** s7a: spoken punctuation (the voice-over is one take). */
export const HEDGE = /\b(usually|may|might|could|often|some|generally|can(?!['’]t))\b/i
export const EDGE_SMALL = new Set(['a', 'an', 'the', 'to', 'of', 'for', 'on', 'in', 'at', 'your', 'my', 'and', 'or', 'is', 'if', 'with', 'by', 'from', 'so', 'but', 'because', 'when', 'that', 'who'])
export const FILLER = /\b(honestly|basically|literally|trust me|here'?s the thing|okay so|you know|um|uh)\b/i
export const HARD_CONNECTOR = /\b(although|though|whereas|unless|however|therefore|which)\b/i
/** The only audio tag Jo may add by hand when fixing a take (never written by the model). */
export const PAUSE_TAG = /\[pause\]/gi

export const HOOK_TYPES = ['If you', 'Common mistake', 'Myth vs fact', 'One number', 'Yes or no question', 'Deadline', 'Show first'] as const
export const CTA_TYPES = ['Send', 'Save', 'Comment', 'Follow', 'WhatsApp'] as const
export type HookType = (typeof HOOK_TYPES)[number]
export type CtaType = (typeof CTA_TYPES)[number]

export const DISCLAIMER = 'General information only, not tax advice.'

export const APPROVED_HASHTAGS = [
  '#internationalstudentsaustralia', '#australiantaxreturn', '#abnincome', '#studentvisa', '#studyinaustralia',
] as const

/** s10: the only WhatsApp line allowed in a video. */
export const WHATSAPP_VIDEO_LINE = 'Message us on WhatsApp'

/** s13: official sources for facts (.gov.au, matching the site rule). */
export const ALLOWED_SOURCE_HOSTS = [
  'ato.gov.au', 'tpb.gov.au', 'servicesaustralia.gov.au', 'fairwork.gov.au', 'abr.gov.au', 'business.gov.au', 'abr.business.gov.au',
]

interface Ban { re: RegExp; why: string }
const b = (re: RegExp, why: string): Ban => ({ re, why })

/** s13 iron rules and risky words, s3, s7, s9, s10. Applied to every text the viewer sees or hears. */
export const BANNED: readonly Ban[] = [
  b(/[–—]/, 'em or en dash'),
  b(/working holiday|backpacker/i, 'mentions the other brand'),
  b(/\b(we are|we're|i am|i'm)\s+(a\s+)?(registered\s+)?(tax\s+agents?|accountants?|tax\s+advisers?|tax\s+experts?)/i, 'claims to be a tax agent or adviser'),
  b(/\btax experts?\b|\btax advice\b|\bwe advise\b/i, 'adviser wording (the disclaimer is removed before this check)'),
  b(/get your refund|guaranteed|money back|refund back|maximi[sz]e|biggest refund|fast refund|free money|\$\s?\d[\d,]*\s+back/i, 'refund promise'),
  b(/refund the difference|fee guarantee|you can'?t lose|never out of pocket/i, 'fee guarantee'),
  b(/\b(you are|you're|students are)\s+(a\s+)?(tax\s+)?residents?\b/i, 'definite residency claim'),
  b(/\b(usually|often|always)\s+(a\s+)?(tax\s+)?residents?\b/i, 'residency must be "may be" only'),
  b(/no medicare levy for students/i, 'Medicare levy overstatement'),
  b(/ato[- ]approved|\bofficial\b/i, 'implies official status'),
  b(/within 24 hours|in \d+ days/i, 'processing time promise'),
  b(/\b(jail|prison|illegal|in trouble)\b/i, 'fear wording'),
  b(/\bhey guys\b|\bhi,? i'?m ella\b|\bwelcome back\b|\bin this video\b|\bgreat question\b|\babsolutely\b/i, 'banned filler or greeting'),
  b(/\bno deadline\b|\bno penalty\b|\banytime\b/i, 'no-deadline wording'),
  b(/(comment|send|share|post|dm|message)\b[^.?!]{0,30}\b(your\s+)?(tfn|t-f-n|tax file number|passport|visa number|bank details?)/i, 'asks for personal data'),
  b(/\bi lodged\b|\bwhen i was a student\b|\bmy client\b|\bmy tax return\b|\bmy refund\b/i, 'Ella speaks as a real person'),
  b(/\bsubmit(ted|ting)?\b/i, 'say "lodge", not "submit"'),
  b(/start your return/i, '"Start your return" belongs in the bio only'),
  b(/#taxrefund|#ato\b|#ai\b|#aigenerated/i, 'banned hashtag'),
]

/** s12: what a shot prompt must not request. */
export const SHOT_BANS: readonly Ban[] = [
  b(/\b(logo|logos|myGov|ATO|government|banknotes?|currency notes?)\b/i, 'requests a logo, government branding or money close-up'),
  b(/\b(text|words|numbers|writing)\s+(on|reading|that says)\b|\bsays\s+"/i, 'requests text from the video model'),
  b(/\bno\s+\w+/i, 'negative phrasing: describe what should happen instead'),
  b(/cartoon|illustration|animated|anime|3d render/i, 'not photoreal'),
]

export const SHOT_LABELS = ['STYLE:', 'SUBJECT:', 'ACTION:', 'SETTING:', 'CAMERA:', 'LIGHT:'] as const

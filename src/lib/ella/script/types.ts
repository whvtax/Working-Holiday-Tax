import type { CtaType, HookType } from './rules'

/** One scene row, bible section 11. */
export interface Scene {
  scene: number
  start: number
  end: number
  ellaInFrame: boolean
  voice: string
  emphasis: string
  onScreen: string
  visual: string
  action: string
  syncWord: string
  shotPrompt: string
  continuity: string
  /** Claim id from `claims`, or "none". */
  claimRef: string
  /** What the viewer sees: Ella talking, a brand graphic drawn by code (free), or an AI clip (paid). */
  shot?: ShotType
  /** For shot "graphic": the card to draw. */
  graphic?: GraphicSpec
}

export type ShotType = 'ella' | 'graphic' | 'clip'
export const GRAPHIC_TYPES = ['number', 'checklist', 'myth_fact', 'definition'] as const
export type GraphicType = (typeof GRAPHIC_TYPES)[number]
/** A brand card: a title (5 words or fewer) and up to 4 short lines. */
export interface GraphicSpec { type: GraphicType | 'none'; title: string; lines: string[] }

/** A scene's shot; older scripts only carry ellaInFrame. */
export const shotOf = (s: Pick<Scene, 'shot' | 'ellaInFrame'>): ShotType => s.shot ?? (s.ellaInFrame ? 'ella' : 'clip')

export const TEMPLATES = ['MYTH_FLIP', 'CHECKLIST_3', 'WHICH_ONE_ARE_YOU'] as const
export const SERIES = ['MYTH OR FACT', 'YOUR JOB YOUR TAX', 'TAX WORD'] as const

export interface Claim {
  id: string
  text: string
  /** Exact line from the blog that supports it. */
  blogLine: string
  /** "fact" needs an official .gov.au URL; "tip" is a habit tip with no tax claim. */
  kind: 'fact' | 'tip'
  source: string
}

export interface ScriptDraft {
  coreMessage: string
  keyTerm: string
  audienceSlice: string
  pillar: string
  hookType: HookType
  hookOptions: string[]
  ctaType: CtaType
  ellaLook: string
  ideas: Array<{ idea: string; surprise: number; stakes: number; clarity: number; safety: number }>
  scenes: Scene[]
  claims: Claim[]
  captions: { instagram: string; tiktok: string }
  testChangeApplied: string
  /** Structure template (code picks from the blog; the writer follows it). */
  template?: (typeof TEMPLATES)[number]
  /** The named series shown on screen. */
  series?: (typeof SERIES)[number]
  /** Required only when the video runs over 35 seconds. */
  lengthReason?: string
}

export interface Issue {
  code: string
  message: string
  scene?: number
  /** "warn" never fails a script and is not sent back to the model; it is shown to Jo. */
  severity?: 'warn'
}

/** What the validator needs to know beyond the draft itself. */
export interface ValidationContext {
  articleText: string
  previousHookType: string | null
  /** CTA types of the most recent episodes, newest first. */
  recentCtaTypes: string[]
  /** Launch gate: written sign-off from the supervising registered tax agent. */
  agentSignoffConfirmed: boolean
  /** Decision: price in captions only if Jo turns it on. */
  allowPrice: boolean
  /** Category of the source article, for the super rule. */
  articleCategory: string
  /** s7a group 2 (flow) blocks instead of warning. Off for the first 10 real drafts (shadow mode). */
  flowStrict?: boolean
  /** Jo's hand fix of a take may add [pause]; the model may not. */
  allowPauseTag?: boolean
}

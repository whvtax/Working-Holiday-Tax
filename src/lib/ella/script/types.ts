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
}

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
  /** Required only when the video runs over 35 seconds. */
  lengthReason?: string
}

export interface Issue {
  code: string
  message: string
  scene?: number
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
}

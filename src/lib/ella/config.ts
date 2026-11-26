// Ella's settings, stored in ella_settings under "config" and edited in Atlas.
// Defaults are safe: Ella is switched off, nothing is published without Jo's
// approval, and paid promotion is off until Jo turns it on.

import { ELLA_LOOKS } from './looks'

export interface Slot { dow: number; time: string }   // dow: 0 Sunday .. 6 Saturday, local time "HH:MM"

export interface EllaConfig {
  /** Master switch. Off: the scheduler does nothing at all. */
  enabled: boolean
  /** Make the video as soon as a script passes every check (Jo still approves the video). */
  autoProduce: boolean
  /** Quiet background music from HeyGen's music library, under Ella's voice. */
  music: boolean
  /** A video that passes every check goes straight to Ready to post, without waiting for Jo. */
  autoApproveVideo: boolean
  /** Jo's production rules for scripts: 30 s or more at the real speed, a question hook naming the viewer, 2 or more AI clips. */
  strictScripts: boolean
  /** Account names, for the two phones on the overview and the profile links. */
  handles: { instagram: string; tiktok: string }
  timezone: string
  slots: Slot[]
  /** Scripts and videos kept ready ahead of the next slots. */
  bufferAhead: number
  voiceId: string
  ellaLooks: Array<{ id: string; path: string }>
  /** Launch gate (bible s16): written sign-off from the supervising agent before any WhatsApp CTA. */
  agentSignoffConfirmed: boolean
  allowPrice: boolean
  budgets: { videoUsdPerMonth: number; maxUsdPerVideo: number }
  /** locationId: Facebook Page IDs of places to tag on Reels, comma separated (one picked at random). Empty: Ella finds Sydney CBD places herself (publish/places.ts). */
  instagram: { enabled: boolean; mode: 'auto' | 'manual'; trialReels: boolean; aiLabel: boolean; locationId: string }
  tiktok: { enabled: boolean; mode: 'auto' | 'manual'; audited: boolean; aiLabel: boolean }
  ads: {
    enabled: boolean
    autoPropose: boolean
    dailyBudgetAud: number
    totalCapAud: number
    days: number
    maxCostPerConversationAud: number
    monthlyCapAud: number
    /** Meta special ad category. Jo decides; "NONE" unless Meta says tax services count as financial. */
    specialAdCategory: 'NONE' | 'FINANCIAL_PRODUCTS_SERVICES'
    ageMin: number
    ageMax: number
  }
  ids: { igUserId: string; fbPageId: string; adAccountId: string; whatsappNumber: string }
}

export const DEFAULT_CONFIG: EllaConfig = {
  enabled: false,
  autoProduce: false,
  music: true,
  autoApproveVideo: true,
  strictScripts: true,
  handles: { instagram: 'studentvisatax1', tiktok: '' },
  timezone: 'Australia/Sydney',
  // Evenings when students scroll; three a week to start (inference, tune from data).
  slots: [{ dow: 0, time: '18:30' }, { dow: 2, time: '19:30' }, { dow: 3, time: '19:30' }, { dow: 4, time: '19:30' }],
  bufferAhead: 2,
  voiceId: '',
  // Code-owned (looks.ts): a new photo goes live with the deploy, whatever was saved before.
  ellaLooks: ELLA_LOOKS.map(l => ({ id: l.id, path: l.path })),
  agentSignoffConfirmed: false,
  allowPrice: false,
  budgets: { videoUsdPerMonth: 50, maxUsdPerVideo: 6 },
  instagram: { enabled: true, mode: 'auto', trialReels: false, aiLabel: false, locationId: '' },
  tiktok: { enabled: true, mode: 'manual', audited: false, aiLabel: true },
  ads: {
    enabled: false, autoPropose: true, dailyBudgetAud: 10, totalCapAud: 70, days: 7,
    maxCostPerConversationAud: 15, monthlyCapAud: 280, specialAdCategory: 'NONE', ageMin: 18, ageMax: 40,
  },
  ids: { igUserId: '', fbPageId: '', adAccountId: '', whatsappNumber: '' },
}

type Obj = Record<string, unknown>
const isObj = (x: unknown): x is Obj => !!x && typeof x === 'object' && !Array.isArray(x)

/** Deep-merges saved values over the defaults, keeping only known keys of the right type. */
export function mergeConfig(saved: unknown, base: EllaConfig = DEFAULT_CONFIG): EllaConfig {
  const walk = (b: unknown, s: unknown): unknown => {
    if (isObj(b)) {
      const out: Obj = {}
      for (const k of Object.keys(b)) out[k] = walk(b[k], isObj(s) ? s[k] : undefined)
      return out
    }
    if (Array.isArray(b)) return Array.isArray(s) ? s : b
    if (s === undefined || s === null) return b
    return typeof s === typeof b ? s : b
  }
  const merged = walk(base, saved) as EllaConfig
  // The wardrobe always comes from code, never from an old saved copy.
  merged.ellaLooks = base.ellaLooks.map(l => ({ ...l }))
  return merged
}

/** Problems that block a setting from being saved. */
export function checkConfig(c: EllaConfig): string[] {
  const p: string[] = []
  if (!c.slots.length) p.push('At least one posting slot is needed')
  for (const s of c.slots) if (!(s.dow >= 0 && s.dow <= 6) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(s.time)) p.push(`Bad slot ${JSON.stringify(s)}`)
  if (c.budgets.maxUsdPerVideo <= 0 || c.budgets.maxUsdPerVideo > 20) p.push('Video cap must be between 0 and 20 USD')
  if (c.budgets.videoUsdPerMonth < 0 || c.budgets.videoUsdPerMonth > 500) p.push('Monthly video budget must be 0 to 500 USD')
  const a = c.ads
  if (a.dailyBudgetAud < 5 || a.dailyBudgetAud > 100) p.push('Daily ad budget must be 5 to 100 AUD')
  if (a.totalCapAud < a.dailyBudgetAud || a.totalCapAud > 1000) p.push('Ad total cap must be at least one day and at most 1000 AUD')
  if (a.monthlyCapAud > 2000) p.push('Monthly ad cap must be at most 2000 AUD')
  if (a.days < 1 || a.days > 30) p.push('Ad length must be 1 to 30 days')
  if (a.ageMin < 18 || a.ageMax > 65 || a.ageMin > a.ageMax) p.push('Ad ages must be 18 to 65')
  if (c.tiktok.mode === 'auto' && !c.tiktok.audited) p.push('TikTok auto posting needs the TikTok app audit first (until then posts would be private)')
  return p
}

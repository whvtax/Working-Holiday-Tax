/**
 * Automatic checks for one script, bible sections 7 to 15.
 * Returns a list of issues; an empty list means the script passes.
 * What a machine cannot judge (is the idea surprising, does the voice sound
 * natural) stays with the review agents and with Jo.
 */
import {
  ALLOWED_SOURCE_HOSTS, APPROVED_HASHTAGS, BANNED, CTA_TYPES, DISCLAIMER, HOOK_TYPES,
  LIMITS, SHOT_BANS, SHOT_LABELS, WHATSAPP_VIDEO_LINE,
} from './rules'
import { containsLine, countWords, hasNumber, norm, sentences, wpm } from './text'
import type { Issue, ScriptDraft, ValidationContext } from './types'

const TOL = 0.051

export function validateScript(d: ScriptDraft, ctx: ValidationContext): Issue[] {
  const out: Issue[] = []
  const add = (code: string, message: string, scene?: number) => out.push({ code, message, scene })
  const scenes = [...(d.scenes ?? [])].sort((a, b) => a.scene - b.scene)

  // ── Message (s6) ───────────────────────────────────────────────────────────
  if (!d.coreMessage?.trim()) add('message.missing', 'Core message is empty')
  else if (countWords(d.coreMessage) > LIMITS.coreMessageWords)
    add('message.long', `Core message has ${countWords(d.coreMessage)} words; max ${LIMITS.coreMessageWords}`)
  if (!d.keyTerm?.trim()) add('message.keyterm', 'Key term is empty')
  if (!d.pillar?.trim()) add('message.pillar', 'Pillar tag is missing')
  if (!Array.isArray(d.ideas) || d.ideas.length === 0 || d.ideas.length > 5) add('message.ideas', 'List 1 to 5 scored candidate ideas')
  for (const i of d.ideas ?? []) {
    for (const k of ['surprise', 'stakes', 'clarity', 'safety'] as const)
      if (!(Number.isInteger(i[k]) && i[k] >= 1 && i[k] <= 5)) { add('message.score', `Idea "${i.idea}" has a bad ${k} score`); break }
  }

  if (scenes.length < 3) { add('scenes.few', 'A script needs at least a hook, a value scene and a CTA'); return out }

  // ── Required fields (s11) ─────────────────────────────────────────────────
  for (const s of scenes) {
    for (const f of ['voice', 'emphasis', 'visual', 'action', 'syncWord', 'shotPrompt', 'continuity', 'claimRef'] as const)
      if (typeof s[f] !== 'string' || !s[f].trim()) add('field.empty', `Field "${f}" is empty`, s.scene)
    if (typeof s.onScreen !== 'string') add('field.empty', 'Field "onScreen" is missing (use "" for none)', s.scene)
  }

  // ── Timing (s8, s12, s7) ──────────────────────────────────────────────────
  if (Math.abs(scenes[0].start) > TOL) add('time.start', 'First scene must start at 0.0', scenes[0].scene)
  for (let i = 0; i < scenes.length; i++) {
    const s = scenes[i]
    const dur = s.end - s.start
    if (i > 0 && Math.abs(s.start - scenes[i - 1].end) > TOL) add('time.gap', 'Scene does not start where the last one ended', s.scene)
    if (dur < LIMITS.shotMin - TOL || dur > LIMITS.shotMax + TOL)
      add('time.shot', `Shot runs ${dur.toFixed(1)} s; must be ${LIMITS.shotMin} to ${LIMITS.shotMax} s`, s.scene)
    const r = wpm(countWords(s.voice ?? ''), dur)
    if (r > LIMITS.maxSpeakingWpm + 0.5) add('time.pace', `Voice line runs at ${Math.round(r)} words per minute; max ${LIMITS.maxSpeakingWpm}`, s.scene)
  }
  const total = scenes[scenes.length - 1].end
  const words = scenes.reduce((n, s) => n + countWords(s.voice ?? ''), 0)
  const planned = (words / LIMITS.planningWpm) * 60
  if (total > LIMITS.hardMax + TOL) add('time.hardmax', `Video runs ${total.toFixed(1)} s; never over ${LIMITS.hardMax} s`)
  else if (total > LIMITS.targetMax + TOL && !d.lengthReason?.trim())
    add('time.target', `Video runs ${total.toFixed(1)} s; over ${LIMITS.targetMax} s needs a logged reason`)
  if (planned > total + 2) add('time.understated', `${words} words need about ${planned.toFixed(1)} s at ${LIMITS.planningWpm} wpm, but the script says ${total.toFixed(1)} s`)

  // ── Voice and language (s7) ───────────────────────────────────────────────
  for (const s of scenes) {
    for (const sen of sentences(s.voice ?? ''))
      if (countWords(sen) > LIMITS.sentenceWords) add('voice.sentence', `Sentence has ${countWords(sen)} words; max ${LIMITS.sentenceWords}: "${sen}"`, s.scene)
    if (/\d/.test(s.voice ?? '')) add('voice.digits', 'Ella says numbers in words; digits belong on screen only', s.scene)
    if (/\b(TFN|ABN|ATO)\b/.test(s.voice ?? '')) add('voice.acronym', 'Spell acronyms in the voice line: T-F-N, A-B-N, A-T-O', s.scene)
    const em = (s.emphasis ?? '').trim()
    if (em && countWords(em) > 2) add('voice.emphasis', 'Emphasis is 1 or 2 words', s.scene)
  }

  // ── Hook (s9) ─────────────────────────────────────────────────────────────
  const hook = scenes[0]
  const hookWords = countWords(hook.voice ?? '')
  const hookCap = hasNumber(hook.voice ?? '') ? LIMITS.hookWordsWithNumber : LIMITS.hookWords
  if (!hook.ellaInFrame) add('hook.ella', 'Ella must be in frame for the hook', hook.scene)
  if (hookWords > hookCap) add('hook.long', `Hook has ${hookWords} words; max ${hookCap}`, hook.scene)
  if (hook.end > LIMITS.hookEndsBy + TOL) add('hook.late', `Hook ends at ${hook.end} s; must end by ${LIMITS.hookEndsBy} s`, hook.scene)
  if (!hook.onScreen?.trim()) add('hook.text', 'Hook keyword must be on screen from frame one', hook.scene)
  if (!(HOOK_TYPES as readonly string[]).includes(d.hookType)) add('hook.type', `Unknown hook type "${d.hookType}"`)
  if (ctx.previousHookType && d.hookType === ctx.previousHookType) add('hook.repeat', 'Same hook type as the previous episode')
  if (!Array.isArray(d.hookOptions) || d.hookOptions.length !== 3) add('hook.options', 'Give exactly 3 hook options')

  // ── Key term in hook and payoff (s7) ──────────────────────────────────────
  const kt = norm(d.keyTerm ?? '')
  const said = (i: number) => {
    const s = scenes[i]
    return !!kt && ` ${norm(`${s.voice} ${s.onScreen}`)} `.includes(` ${kt} `)
  }
  if (kt && !said(0)) add('keyterm.hook', `Key term "${d.keyTerm}" is not in the hook`, hook.scene)
  if (kt && !scenes.slice(-3, -1).some((_, j) => said(scenes.length - 3 + j)))
    add('keyterm.payoff', `Key term "${d.keyTerm}" is not in the payoff`)

  // ── CTA (s10) ─────────────────────────────────────────────────────────────
  const cta = scenes[scenes.length - 1]
  const ctaWords = countWords(cta.voice ?? '')
  if (!cta.ellaInFrame) add('cta.ella', 'Ella must say the CTA on camera', cta.scene)
  if (ctaWords > LIMITS.ctaWords) add('cta.long', `CTA has ${ctaWords} words; max ${LIMITS.ctaWords}`, cta.scene)
  if (!(CTA_TYPES as readonly string[]).includes(d.ctaType)) add('cta.type', `Unknown CTA type "${d.ctaType}"`)
  const ctaLike = /\b(send this|save this|follow (for|us)|comment\b|message us)/i
  for (const s of scenes.slice(0, -1)) if (ctaLike.test(s.voice ?? '')) add('cta.early', 'A CTA appears before the end', s.scene)
  if (d.ctaType === 'WhatsApp' && !(cta.voice ?? '').includes(WHATSAPP_VIDEO_LINE))
    add('cta.whatsapp', `WhatsApp CTA must say "${WHATSAPP_VIDEO_LINE}."`, cta.scene)
  if ((d.ctaType === 'Comment' || d.ctaType === 'Follow') && ctx.recentCtaTypes.slice(0, 2).includes(d.ctaType))
    add('cta.frequency', `${d.ctaType} CTA is allowed in at most 1 video in 3`)

  // ── On-screen text (s11, s12) ─────────────────────────────────────────────
  for (const s of scenes)
    if (s.onScreen && countWords(s.onScreen) > LIMITS.onScreenWords)
      add('screen.long', `On-screen text has ${countWords(s.onScreen)} words; max ${LIMITS.onScreenWords}`, s.scene)

  // ── Visual (s12) ──────────────────────────────────────────────────────────
  for (const s of scenes) {
    const p = s.shotPrompt ?? ''
    for (const label of SHOT_LABELS) if (!p.includes(label)) add('shot.template', `Shot prompt misses ${label}`, s.scene)
    for (const ban of SHOT_BANS) if (ban.re.test(p)) add('shot.ban', `Shot prompt: ${ban.why}`, s.scene)
    if (s.ellaInFrame && d.ellaLook && !p.includes(d.ellaLook)) add('shot.look', `Ella's look ${d.ellaLook} is not named in the prompt`, s.scene)
    if (s.syncWord && !norm(s.voice ?? '').split(' ').includes(norm(s.syncWord)))
      add('shot.sync', `Sync word "${s.syncWord}" is not in the voice line`, s.scene)
  }

  // ── Claims and grounding (s13, s14 step 6) ────────────────────────────────
  const ids = new Set((d.claims ?? []).map(c => c.id))
  for (const s of scenes)
    if (s.claimRef && s.claimRef !== 'none' && !ids.has(s.claimRef)) add('claim.ref', `Claim "${s.claimRef}" does not exist`, s.scene)
  for (const c of d.claims ?? []) {
    if (!containsLine(ctx.articleText, c.blogLine)) add('claim.ungrounded', `Claim "${c.id}": blog line not found in the article`)
    if (c.kind === 'fact') {
      let host = ''
      try { host = new URL(c.source).hostname.replace(/^www\./, '') } catch { /* not a URL */ }
      if (!ALLOWED_SOURCE_HOSTS.some(h => host === h || host.endsWith(`.${h}`)))
        add('claim.source', `Claim "${c.id}" needs an official .gov.au URL`)
    }
  }

  // ── Captions (s10, s11, s13) ──────────────────────────────────────────────
  for (const platform of ['instagram', 'tiktok'] as const) {
    const cap = d.captions?.[platform] ?? ''
    if (!cap.trim()) { add('caption.missing', `${platform} caption is missing`); continue }
    if (!cap.includes(DISCLAIMER)) add('caption.disclaimer', `${platform} caption lacks "${DISCLAIMER}"`)
    const tags = cap.match(/#[a-z0-9_]+/gi) ?? []
    if (tags.length > LIMITS.hashtagsMax) add('caption.hashtags', `${platform} caption has ${tags.length} hashtags; max ${LIMITS.hashtagsMax}`)
    for (const t of tags) if (!(APPROVED_HASHTAGS as readonly string[]).includes(t.toLowerCase())) add('caption.hashtag', `${platform}: ${t} is not on the approved list`)
    if (!ctx.allowPrice && /\$\s?\d/.test(cap)) add('caption.price', `${platform} caption shows a price; price is off`)
  }

  // ── Compliance scan on everything the viewer sees or hears (s13) ──────────
  const viewer: Array<[string, string, number | undefined]> = []
  for (const s of scenes) { viewer.push(['voice', s.voice ?? '', s.scene]); viewer.push(['screen', s.onScreen ?? '', s.scene]) }
  for (const p of ['instagram', 'tiktok'] as const) viewer.push([p, (d.captions?.[p] ?? '').split(DISCLAIMER).join(' '), undefined])
  for (const [where, text, sc] of viewer)
    for (const ban of BANNED) if (ban.re.test(text)) add('compliance', `${where}: ${ban.why}`, sc)
  // Dashes anywhere in the stored script, prompts included.
  if (/[–—]/.test(JSON.stringify(d))) add('compliance.dash', 'Em or en dash somewhere in the script')

  // Launch gate and super rule.
  const all = viewer.map(v => v[1]).join(' ')
  if (/whatsapp/i.test(all) && !ctx.agentSignoffConfirmed)
    add('gate.agent', 'Nothing may point to WhatsApp until the supervising registered tax agent signs off in writing')
  const superTopic = ctx.articleCategory === 'Super' || /\b(super|superannuation|dasp)\b/i.test(scenes.map(s => s.voice).join(' '))
  if (superTopic && d.ctaType === 'WhatsApp') add('super.cta', 'Super and DASP videos carry no WhatsApp CTA')

  return out
}

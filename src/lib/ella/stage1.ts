/**
 * Stage 1, end to end: sync the library, draw one unused blog, write its
 * script, store the result. Bible section 14. Nothing is filmed, generated
 * or published here.
 */
import { trace } from './trace'
import type { SourceArticle } from './library'
import { pillarWeights, recentKeyTerms, toRegistry } from './registry'
import { advanceStudio, newStudio, studioOutcome, STUDIO_STAGES_LABEL, type StudioOutcome, type StudioState } from './script/studio'
import type { Llm } from './script/llm'
import { BIBLE_VERSION, LIMITS } from './script/rules'
import type { EllaStore } from './store'

export interface Stage1Settings {
  bible: string
  ellaLooks: string[]
  /** One variable only; none until 10 episodes are logged (bible s17 step 1). */
  testChange?: string
  agentSignoffConfirmed: boolean
  allowPrice: boolean
  learnings?: string
  actor?: string
  /** Epoch ms the script writer must finish by. */
  deadline?: number
  /** Ella's measured speaking rate (words per minute). */
  wpm?: number
  /** True when Jo stopped the work since this run began. */
  stopped?: () => Promise<boolean>
}

export type Stage1Outcome =
  | { status: 'library_empty' }
  | { status: 'scripting'; productionId: string; slug: string; phase: string }
  | { status: 'script_ready' | 'needs_jo'; productionId: string; slug: string; scriptVersion: number; result: StudioOutcome }
  | { status: 'gave_up'; productionId: string; slug: string; reason: string }
  | { status: 'stopped' }

/** Full fresh starts from research before a blog is given up (Jo: a script that breaks a rule never reaches him). */
export const STUDIO_RESTARTS = 2

/** Where a script in progress is saved between runs. */
export const studioKey = (productionId: string) => `script_work:${productionId}`

type Deps = { store: EllaStore; library: readonly SourceArticle[]; llm: Llm; now?: () => number }

/** Draws one blog and starts its script in the studio. */
export async function runStage1(deps: Deps, s: Stage1Settings): Promise<Stage1Outcome> {
  const { store, library } = deps
  const actor = s.actor ?? 'ella-stage1'
  // Stopped: no blog is drawn and no script is started.
  if (s.stopped && (await s.stopped())) return { status: 'stopped' }

  // 1. Sync at the start of every job (idempotent).
  await store.syncRegistry(toRegistry(library))

  // 2. Draw with pillar weights and the recent key term filter.
  const recent = await store.recentProductions(LIMITS.keyTermLookback)
  const claim = await store.claimBlog(pillarWeights(recent.map(r => r.pillar)), recentKeyTerms(recent), actor)
  if (!claim) return { status: 'library_empty' }

  const article = library.find(a => a.slug === claim.slug)
  if (!article) throw new Error(`Claimed slug ${claim.slug} is not in the library`)
  await store.setStatus(claim.productionId, 'scripting')

  const state = newStudio({
    productionId: claim.productionId, slug: claim.slug, pillar: claim.pillar,
    recentKeyTerms: recentKeyTerms(recent),
    testChange: recent.length >= 10 ? (s.testChange ?? 'none') : 'none (fewer than 10 episodes logged)',
    ctx: {
      articleText: article.text,
      articleCategory: article.category,
      previousHookType: recent.find(r => r.hookType)?.hookType ?? null,
      recentCtaTypes: recent.map(r => r.ctaType).filter((x): x is string => !!x),
      agentSignoffConfirmed: s.agentSignoffConfirmed,
      allowPrice: s.allowPrice,
      // Bible 7a: flow rules only warn until 10 real scripts exist, then they block.
      flowStrict: recent.filter(r => r.hookType).length >= 10,
      // Jo, Nov 21: at least 30 seconds at the real speed, and the hook is always a question.
      ...(s.wpm ? { wpm: s.wpm, minSeconds: LIMITS.minSeconds, hookQuestion: true } : {}),
    },
  }, new Date((deps.now ?? Date.now)()))
  await store.setSettings({ [studioKey(claim.productionId)]: state })
  return continueStudio(deps, state, s)
}

/** Runs the next studio stages for a script in progress, saves them, and finishes the script when it is done. */
export async function continueStudio(deps: Deps, state: StudioState, s: Stage1Settings): Promise<Stage1Outcome> {
  const { store, library, llm } = deps
  const actor = s.actor ?? 'ella-stage1'
  const article = library.find(a => a.slug === state.slug)
  if (!article) throw new Error(`Slug ${state.slug} is not in the library`)
  // Jo cancelled this script: do not spend on another step, and do not write its status back.
  const current = await store.production(state.productionId)
  if (current?.status === 'cancelled') return { status: 'stopped' }

  let next: StudioState = state
  let halted = false
  // Each new studio stage is written to the Log tab once (Jo, Nov 22).
  let logged = state.log.length
  try {
    const r = await advanceStudio({ state, article, settings: { bible: s.bible, ellaLooks: s.ellaLooks, learnings: s.learnings }, llm, deadline: s.deadline, now: deps.now, stopped: s.stopped, onStep: async x => {
      await store.setSettings({ [studioKey(state.productionId)]: x })
      for (const entry of x.log.slice(logged)) await trace(store, actor, 'studio:stage', { productionId: state.productionId, slug: state.slug, entry: entry as unknown as Record<string, unknown> })
      logged = x.log.length
    } })
    next = r.state
    halted = !!r.stopped
    for (const u of r.usage) await store.logUsage({ productionId: state.productionId, feature: 'video_script', ...u })
  } catch (err) {
    // A failed call counts as a failed stage; the studio stops after 3 in a row.
    next = structuredClone(state)
    next.log.push({ phase: next.phase, at: new Date().toISOString(), seconds: 0, ok: false, note: `Model call failed: ${String((err as Error)?.message ?? err).slice(0, 300)}` })
    next.updatedAt = new Date((deps.now ?? Date.now)()).toISOString()
    if (++next.failures >= 3) next.phase = 'done'
    await store.audit(actor, 'script_error', { productionId: state.productionId, error: String(err).slice(0, 500) })
  }
  await store.setSettings({ [studioKey(state.productionId)]: next })
  if (halted) return { status: 'stopped' }
  // Keep the production fresh so it is never treated as stuck while work goes on.
  if (next.phase !== 'done') {
    await store.setStatus(state.productionId, 'scripting')
    return { status: 'scripting', productionId: state.productionId, slug: state.slug, phase: STUDIO_STAGES_LABEL[next.phase] }
  }

  // Done. A script that still breaks a rule never reaches Jo: the studio starts
  // again from research (a new angle), and after that the blog is given up and
  // goes back into the draw; that is a flow problem, shown as an alert.
  const result = studioOutcome(next)
  const modelBroke = next.failures >= 3
  if (!result.passed) {
    const reason = result.issues.filter(i => i.severity !== 'warn').slice(0, 3).map(i => i.message).join('; ') || (modelBroke ? 'the model kept failing' : 'checks failed')
    if ((next.restarts ?? 0) < STUDIO_RESTARTS) {
      const again: StudioState = {
        ...next, phase: 'research', research: undefined, drafts: [], rewrites: 0, failures: 0, restarts: (next.restarts ?? 0) + 1,
        log: [...next.log, { phase: 'done', at: new Date((deps.now ?? Date.now)()).toISOString(), seconds: 0, ok: false, note: `Still failing (${reason}); starting again from research` }],
      }
      await store.setSettings({ [studioKey(state.productionId)]: again })
      await store.setStatus(state.productionId, 'scripting')
      return { status: 'scripting', productionId: state.productionId, slug: state.slug, phase: 'Starting again from research' }
    }
    await store.setStatus(state.productionId, 'cancelled', { note: `Gave up after ${STUDIO_RESTARTS + 1} full attempts: ${reason}`.slice(0, 500) })
    // The blog stays claimed: a blog that broke every check is not drawn again by itself (that cost three full attempts each time).
    // Jo starts over (the red box) or releases it by hand; the claim is the memory.
    await store.audit(actor, 'script_gave_up', { productionId: state.productionId, slug: state.slug, reason })
    return { status: 'gave_up', productionId: state.productionId, slug: state.slug, reason }
  }
  const scriptVersion = await store.saveScript({
    productionId: state.productionId, bibleVersion: BIBLE_VERSION,
    script: result.draft, issues: result.issues, passed: result.passed, attempts: result.attempts,
  })
  const status = result.passed ? 'script_ready' : 'needs_jo'
  if (result.passed) await store.audit(actor, 'script_ready', { productionId: state.productionId, slug: state.slug, hook: result.draft?.scenes?.[0]?.voice ?? '' })
  await store.setStatus(state.productionId, status, {
    keyTerm: result.draft?.keyTerm, hookType: result.draft?.hookType, ctaType: result.draft?.ctaType, scriptVersion,
  })
  return { status, productionId: state.productionId, slug: state.slug, scriptVersion, result }
}
